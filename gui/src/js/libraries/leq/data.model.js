
define(
    [
        'library/leq/core',
        'library/leq/data'
    ],
    function ( leq ) {
        leq.data = leq.data || {};

        /**
         * default values for every type allowed in a model
         * @type {Object}
         */
        var defaultValues = {
            'array':    function ( ) { return []; },
            'boolean':  function ( ) { return false; },
            'date':     function ( ) { return new Date(); },
            'default':  function ( ) { return ''; },
            'number':   function ( ) { return 0; },
            'object':   function ( ) { return undefined; },
            'string':   function ( ) { return ''; }
        };

        /**
         * helper function to normalize fields
         * @param field
         * @return {*}
         */
        function normalizeField ( field ) {
            return leq.extend({
                nullable: false,
                type: leq.STRING,
                editable: false,
                observable: true
            },
            field);
        }

        /**
         * helper function to extract a value from data based on the model properties
         * @param data
         * @param model
         * @param field
         * @param name
         * @return {*}
         */
        function fetchValueFromData ( data, model, field, name ) {
            var mapping = field.mapping,
                type = field.type || leq.STRING,
                nullable = field.nullable || false,
                defaultValue = (model.defaults && model.defaults[name]) || defaultValues[type],
                value;

            if (data) {
                value = leq.data.unwrap(data, name);

                if (value !== undefined) {
                    // create a new instance of model if necessary
                    if (field.model) {
                        if (type === leq.ARRAY) {
                            value = leq.map(value, function ( val ) {
                                return new field.model(val);
                            });
                        }
                        else {
                            value = new field.model(value);
                        }
                    }
                }
                else if (mapping) {
                    // value was not found, try the mapping
                    if (leq.isFunction(mapping)) {
                        value = mapping.call(model, data);
                    }
                    else {
                        value = leq.data.unwrap(data, mapping);
                    }
                }
            }

            if ((value === null || value === undefined) && !nullable) {
                value = leq.isFunction(defaultValue) ?
                    defaultValue.call(defaultValue) :
                    defaultValue;
            }

            if (type === leq.NUMBER && value !== null && value !== undefined) {
                value = leq.parseFloat(value);
            }

            return value;
        }

        /**
         * helper function to map data to a model
         * @param model
         * @param data
         */
        function mapFieldsFromData ( model, data ) {
            if (leq.isFunction(model.fields)) {
                // the function will return all the fields definition
                model.fields = model.fields.call(model, data) || {};

                for (var name in model.fields) {
                    if (leq.has(model.fields, name)) {
                        model.fields[name] = normalizeField(model.fields[name]);
                    }
                }
            }
            else {
                for (var name in model.fields) {
                    if (leq.has(model.fields, name)) {
                        var field = model.fields[name],
                            observable = field.observable,
                            type = field.type,
                            value = fetchValueFromData(data, model, model.fields[name], name);

                        model[name] = observable ?
                            (type === leq.ARRAY ?
                                leq.data.observableArray(value) :
                                leq.data.observable(value)) :
                            value;
                    }
                }
            }

            model.uid = leq.guid();
        }

        function autoGenerateFieldsFromData ( model, data ) {
            var type,
                parsedFloat,
                value;

            model.fields = {};

            for (var name in data) {
                if (leq.has(data, name)) {
                    value = data[name];
                    name = name.toCamelCase();

                    if (model.exceptions && leq.has(model.exceptions, name)) {
                        value = fetchValueFromData(data, model, model.exceptions[name], name);
                    }
                    else if (leq.isArray(value)) {
                        value = leq.map(value, function ( item ) {
                            return new model.constructor(item);
                        });
                    }
                    else if (leq.isObject(value) && !leq.isClass(value)) {
                        value = new model.constructor(value);
                    }
                    else if (leq.isNumeric(parsedFloat = leq.parseFloat(value))) {
                        if (parsedFloat === +value) {
                            value = parsedFloat;
                        }
                    }

                    type = leq.getType(value);

                    model.fields[name] = normalizeField({
                        nullable: false,
                        type: type,
                        editable: (type !== leq.ARRAY && type !== leq.OBJECT)
                    });

                    model[name] = (type === leq.ARRAY) ?
                        leq.data.observableArray(value) :
                        leq.data.observable(value);
                }
            }
        }


        function assignValueToModel ( model, value, name ) {
            if (value) {
                // set it automatically if the current value was not truish
                if (!model.getValue(name)) {
                    model.setValue(name, value);
                }
                else {
                    // if the new value is a class, assign it
                    if (leq.isClass(value)) {
                        for (var data in value) {
                            if (leq.has(value, data)) {
                                assignValueToModel(model.getValue(name[data]), value[data], data);
                            }
                        }
                    }
                    else {
                        model.setValue(name, value);
                    }
                }
            }
        }

        function convertToJson ( value ) {
            if (leq.isClass(value)) {
                value = value.toJson();
            }
            else if (leq.isArray(value)) {
                value = leq.map(value, function ( item ) {
                    return convertToJson(item);
                });
            }

            return value;
        }

        /**
         * The base Model
         * @type {*}
         */
        var Model = leq.Observable.extend({
            initialize: function ( data ) {
                var self = this;

                leq.Observable.fn.initialize.call(self);

                if (self.autoGenerateFieldsFromData) {
                    autoGenerateFieldsFromData(self, data);
                }
                else {
                    mapFieldsFromData(self, data);
                }
            },

            autoGenerateFieldsFromData: false,

            setData: function ( data ) {
                var self = this;

                for (var name in self.fields) {
                    if (leq.has(self.fields, name)) {
                        var value = fetchValueFromData(data, self, self.fields[name], name);

//>>includeStart("debug", pragmas.debug);
                        if (leq.isFunction(self.fields[name])) {
                            throw new Error('setData: field cannot be a function');
                        }
//>>includeEnd("debug");

                        assignValueToModel(self, value, name);
                    }
                }
            },

            /**
             * helper method to unwrap a member, if necessary, and return its value
             * @param field
             * @return {*}
             */
            getValue: function ( field ) {
                return leq.data.unwrap(this, field);
            },

            /**
             * helper method to set a member's value
             * @param field
             * @param value
             */
            setValue: function ( field, value ) {
                var context = leq.data.getContext(this, field);

                if (leq.data.isObservable(context.data[field])) {
                    context.data[field](value);
                }
                else {
                    context.data[field] = value;
                }
            },

            toJson: function ( ) {
                var self = this,
                    value,
                    json = {};

                for (var name in self.fields) {
                    if (leq.has(self.fields, name)) {
                        value = self.getValue(name);

                        json[name] = convertToJson(value);
                    }
                }

                return json;
            }
        });

        /**
         * helper function to create a new Model class
         * @param options
         *
         autoGenerateFieldsFromData: false,
         fields: {
             'id': {
                 [nullable: false]
                 [mapping: 'ID' || function ( data ) {...}]
                 [type: 'number']
                 [defaultValue: 0]
                 [editable: true]
                 [observable: true]
                 [model: Class]
                 [validation: {...}] // TODO
                 || function () {}
             }
         },
         defaults: {
            'id': '',
         }
         *
         * @return {*}
         */
        Model.define = function ( options ) {
            options = leq.extend({ defaults: {} }, options);

            for (var name in options.fields) {
                if (leq.has(options.fields, name)) {
                    var field = options.fields[name],
                        value = null;

                    if (!leq.isFunction(field)) {
                        field = options.fields[name] = normalizeField(field);

                        if (!field.nullable) {
                            // create default when field is not nullable
                            value = field.defaultValue !== undefined ?
                                field.defaultValue :
                                defaultValues[field.type];
                        }

                        if (options.defaults[name] === undefined) {
                            options.defaults[name] = value;
                        }
                    }
                }
            }

            return Model.extend(options);
        };


        leq.extend(leq.data, {
            Model: Model
        });
    }
);