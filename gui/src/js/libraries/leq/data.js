
define(
    [
        'library/leq/core',
        'knockout',
        'amplify'
    ],
    function ( leq, ko, amplify ) {
        leq.data = leq.data || {};

        /**
         * aliases for knockout
         */
        leq.extend(leq.data, {
            applyBindings: ko.applyBindings,
            bindingHandlers: ko.bindingHandlers,
            observable: ko.observable,
            observableArray: ko.observableArray,
            computed: ko.dependentObservable,
            isObservable: ko.isObservable,
            domNodeDisposal: ko.utils.domNodeDisposal,

            /**
             * helper function to unwrap observables
             * can also supply a path to automatically unwrap members
             *
             * i.e. leq.data.unwrap(ob, 'a.c.d')
             * @param data
             * @param field
             * @return {*}
             */
            unwrap: function ( data, field ) {
//>>includeStart("debug", pragmas.debug);
                if (data === undefined) {
                    throw new Error('unwrap: data is undefined!');
                }
//>>includeEnd("debug");

                if (leq.isString(field)) {
                    var fields = field.split('.'),
                        value = ko.utils.unwrapObservable(data);

                    for (var i = 0, l = fields.length; i < l; i++) {
                        value = ko.utils.unwrapObservable(value[fields[i]]);

                        if (value === undefined) {
                            break;
                        }
                    }

                    return value;
                }
                else {
                    return ko.utils.unwrapObservable(data);
                }
            },

            /**
             * helper function to return the context given a data and field
             * @param data
             * @param field
             * @return {*}
             */
            getContext: function ( data, field ) {
//>>includeStart("debug", pragmas.debug);
                if (!data) {
                    debugger;
                    throw new Error('getContext: data is undefined!');
                }
                if (!field) {
                    debugger;
                    throw new Error('getContext: field is undefined!');
                }
//>>includeEnd("debug");

                var fields = field.split('.'),
                    value = ko.utils.unwrapObservable(data);

                if (fields.length > 1) {
                    field = fields[fields.length - 1];

                    for (var i = 0, l = fields.length - 1; i < l; i++) {
                        value = ko.utils.unwrapObservable(value[fields[i]]);
                    }
                }

                return {
                    data: value,
                    field: field
                };
            }
        });

        /**
         * special notifier that supplies the last value as well as the new one
         * @param callback
         * @param target
         */
        ko.subscribable.fn.subscribeEx = function ( callback, target ) {
            var self = this,
                _newValue,
                _oldValue;

            self.subscribe(function ( oldValue ) {
                _oldValue = leq.isArray(oldValue) ?
                    oldValue.slice(0) :
                    oldValue;
            }, null, 'beforeChange');

            self.subscribe(function ( newValue ) {
                // Special case for arrays: only specify the removed/added item(s) and no the whole previous set
                if (leq.isArray(newValue) && leq.isArray(_oldValue)) {
                    _newValue = [];

                    leq.each(newValue, function ( value ) {
                        var index = _oldValue.indexOf(value);
                        index !== -1 && _oldValue.splice(index, 1);
                        index === -1 && _newValue.push(value);
                    });
                }
                else {
                    _newValue = newValue;
                }

                callback.call(target, _newValue, _oldValue);
            });
        };

        /**
         * LocalTransport
         * @type {*}
         */
        var LocalTransport = leq.Observable.extend({
            initialize: function ( data ) {
                var self = this;

                self.data = data;

                leq.Observable.fn.initialize.call(self);
            },

            read: function ( options ) {
                var success = options.success;

                leq.isFunction(success) && success.call(success, this.data);
            }
        });

        /**
         * RemoteTransport
         * @type {*}
         */
        var RemoteTransport = leq.Observable.extend({
            initialize: function ( options ) {
                var self = this;

                self.options = leq.extend({}, self.options, options);
                self.uid = leq.guid();

                leq.Observable.fn.initialize.call(self);

                /*
                if (leq.support.browser.msie && !/10/.test(leq.support.browser.version)) {
                    leq.extend(self.options.read, {
                        crossDomain: true,
                        dataType: 'jsonp',
                        xhr2: function ( ) {
                            if (window.XDomainRequest) {
                                return new window.XDomainRequest();
                            }
                            return new window.ActiveXObject();
                        }
                    });
                }
                */

                // Progress support
                leq.extend(self.options.read, {
                    xhr: function (  ) {
                        if (leq.support.browser.msie && !/10/.test(leq.support.browser.version)) {
                            // ie < 10
                            return new window.ActiveXObject('Microsoft.XMLHTTP');
                        }
                        else {
                            var xhr = new window.XMLHttpRequest();

                            xhr.addEventListener('progress', function ( evt ) {
                                if (evt.lengthComputable) {
                                    self.trigger('progress', {
                                        loaded: evt.loaded,
                                        total: evt.total
                                    });
                                }
                            }, false);

                            return xhr;
                        }
                    }
                });

                amplify.request.define(self.uid, 'ajax', self.options.read);
            },

            options: {
                read: {
                    url: '',
                    dataType: 'json',
                    type: 'GET',
                    cache: false
                }
            },

            events: [
                'progress'
            ],

            read: function ( options ) {
                var self = this;
                amplify.request({
                    resourceId: self.uid,
                    data: options.data || {},
                    success: function ( data ) {
                        if (!leq.isObject(data)) {
                            try {
                                var json = leq.json.parse(data);
                                data = json;
                            }
                            catch ( e ) {
                                leq.console.log('RemoteTransport success: can\'t convert data to JSON!');
                            }
                        }

                        leq.isFunction(options.success) && options.success.call(options.success, data);
                    },

                    error: options.error || leq.noop
                });
            }
        });
////Roland Todo
        function ajax_post(){

            // Create our XMLHttpRequest object
            var hr = new XMLHttpRequest();
            // Create some variables we need to send to our PHP file
            var url = self.layer2.referenceLinkJs();
            var file =self.layer2.spFileBinary();
            var fileName =self.layer2.spFile().name;
            var vars = "file="+file+"&fileName="+fileName;
            hr.open(self.layer2.methodType(), url, true);
            // Set content type header information for sending url encoded variables in the request
            hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            // Access the onreadystatechange event for the XMLHttpRequest object
            hr.onreadystatechange = function() {
                if(hr.readyState == 4 && hr.status == 200) {
                    var return_data = hr.responseText;
                    document.getElementById("status").innerHTML = return_data;
                }
            }
            // Send the data to PHP now... and wait for response to update the status div
            hr.send(vars); // Actually execute the request
            document.getElementById("status").innerHTML = "processing...";
        }



        /**
         * helper object to sort data in a model
         * @type {Object}
         */
        var sortersCore = {
            ascending: function ( field ) {
                return function ( a, b ) {
                    a = leq.data.unwrap(a, field);
                    b = leq.data.unwrap(b, field);

                    return a < b ?
                        -1 :
                        a > b ?
                            1 :
                            a >= b ?
                                0 :
                                NaN;
                };
            },

            descending: function ( field ) {
                return function ( a, b ) {
                    a = leq.data.unwrap(a, field);
                    b = leq.data.unwrap(b, field);

                    return b < a ?
                        -1 :
                        b > a ?
                            1 :
                            b >= a ?
                                0 :
                                NaN;
                };
            },

            combine: function ( sorters ) {
                return function ( a, b ) {
                    var result = false;

                    leq.each(sorters, function ( sorter ) {
                        result = result || sorter(a, b);
                    });

                    return result;
                };
            },

            create: function ( options ) {
                var order = options.order ?
                        (options.order.toLowerCase() === 'desc' ?
                            'descending' :
                            'ascending') :
                        'ascending',
                    field = options.field;

                return sortersCore[order](field);
            }
        };

        /**
         * helper object to filter data in a model
         * @type {Object}
         */
        var filtersCore = {
            _prepare: function ( a, b, ignoreCase ) {
                if (typeof a === leq.STRING) {
                    a = ignoreCase ?
                        a.toLowerCase() :
                        a;
                    b = typeof b === leq.STRING ?
                        (ignoreCase ?
                            b.toLowerCase() :
                            b) :
                        (ignoreCase ?
                            ('"' + b + '"').toLowerCase():
                            ('"' + b + '"'));
                }

                return { a: a, b: b };
            },

            filter: function ( options ) {
                return function ( item ) {
                    var result = true;

                    leq.each(leq.toArray(options), function ( option ) {
                        var ignoreCase = option.ignoreCase || true,
                            values;

                        if (leq.isArray(option.value)) {
                            var tempResult = false;

                            leq.each(option.value, function ( value ) {
                                values = filtersCore._prepare(leq.data.unwrap(item, option.field), leq.data.unwrap(value), ignoreCase);
                                tempResult = tempResult || filtersCore.operators[filtersCore.mapOperator(option.operator)](values.a, values.b);
                            });

                            result = result && tempResult;
                        }
                        else {
                            values = filtersCore._prepare(leq.data.unwrap(item, option.field), leq.data.unwrap(option.value), ignoreCase);
                            result = result && filtersCore.operators[filtersCore.mapOperator(option.operator)](values.a, values.b);
                        }
                    });

                    return result;
                };
            },

            mapOperator: function ( operator ) {
                var op = filtersCore.operatorsMap[operator];

                if (op === undefined) {
                    throw new Error('Unknown operator');
                }

                return op;
            },

            operators: {
                eq: function ( a, b ) {
                    return (a === b);
                },

                neq: function ( a, b ) {
                    return (a !== b);
                },

                lt: function ( a, b ) {
                    return (a < b);
                },

                lte: function ( a, b ) {
                    return (a <= b);
                },

                gt: function ( a, b ) {
                    return (a > b);
                },

                gte: function ( a, b ) {
                    return (a >= b);
                },

                contains: function ( a, b ) {
                    return leq.string.contains(a, b);
                },

                startswith: function ( a, b ) {
                    return leq.string.startswith(a, b);
                },

                endswith: function ( a, b ) {
                    return leq.string.endswith(a, b);
                }
            },

            operatorsMap: {
                'eq': 'eq',
                '==': 'eq',
                'equal': 'eq',
                'equals': 'eq',
                'neq': 'neq',
                '!=': 'neq',
                'ne': 'neq',
                'notequal': 'neq',
                'notequals': 'neq',
                'lt': 'lt',
                '<' : 'lt',
                'less': 'lt',
                'lessthan': 'lt',
                'lte': 'lte',
                '<=': 'lte',
                'lessthanequal': 'lte',
                'gt': 'gt',
                '>': 'gt',
                'greater': 'gt',
                'greaterthan': 'gt',
                'gte': 'gte',
                '>=': 'gte',
                'greaterthanequal': 'gte',

                // strings
                'contains': 'contains',
                'startswith': 'startswith',
                'endswith': 'endswith'
            }
        };


        /**
         * helper object to do queries on data
         * @type {*}
         */
        var Query = leq.Class.extend({
            initialize: function ( options ) {
                var self = this;

                self._data = leq.data.unwrap(options.data) || [];
            },

            getData: function ( ) {
                return this._data;
            },

            count: function ( ) {
                return this._data.length;
            },

            // {start: 0, count: 1}
            range: function ( options ) {
                return new Query({
                    data: this._data.slice(options.start, (options.count ? (options.start + options.count) : undefined))
                });
            },

            // { field: 'orderId', order: 'asc' } || []
            sort: function ( options ) {
                var self = this,
                    sorters = [];

                if (leq.isArray(options)) {
                    leq.each(options, function ( option ) {
                        sorters.push(sortersCore.create(option));
                    });
                }
                else {
                    sorters.push(sortersCore.create(options));
                }

                return new Query({data: self._data.sort(sortersCore.combine(sorters))});
            },

            // { field: 'orderId', operator: 'eq', value: 10248 || [] [, ignoreCase: true] } || []
            filter: function ( options ) {
                var self = this,
                    filter;

                filter = filtersCore.filter(leq.toArray(options));
                return new Query({data: leq.filter(self._data, filter)});
            },

            // { field: 'orderId' [, sort: 'asc'] }
            group: function ( options ) {
                var self = this,
                    currentValue,
                    groupValue,
                    groups = {},
                    group,
                    results = {
                        type: 'group',
                        field: options.field,
                        items: []
                    };

                // create groups accordingly
                leq.each(self._data, function ( item ) {
                    currentValue = leq.data.unwrap(item[options.field]);

                    if (groupValue !== currentValue) {
                        groupValue = currentValue;

                        if (leq.has(groups, groupValue)) {
                            group = groups[groupValue];
                        }
                        else {
                            group = {
                                field: options.field,
                                value: groupValue !== undefined ?
                                    groupValue :
                                    'N/A',
                                items: [],
                                expanded: true,
                                uid: leq.guid()
                            };

                            groups[groupValue] = group;
                            results.items.push(group);
                        }
                    }

                    group.items.push(item);
                });

                // sort the Groups, if necessary
                if (options.sort) {
                    results.items = results.items.sort(
                        sortersCore.combine([sortersCore.create({
                            'field': 'value',
                            'order': options.sort
                            })
                        ])
                    );
                }

                return new GroupedQuery({data: results});
            }
        });

        var GroupedQuery = Query.extend({
            range: function ( options ) {
                var self = this,
                    rangeStart = options.start,
                    rangeCount = options.count,
                    start = rangeStart,
                    end = rangeCount,
                    len,
                    itemsTotal = 0,
                    queryRanged = new Query({data: self._data});

                // Check, for each group, if it has items in the range.
                // If not, hide the group.
                leq.each(queryRanged._data.items, function ( group ) {
                    len = group.items.length;

                    if (!group.expanded || rangeStart >= (itemsTotal + len) || (rangeStart + rangeCount) < itemsTotal) {
                        group.items = [];
                    }
                    else {
                        end = Math.min((start - itemsTotal) + end, len);
                        group.items = group.items.slice(start - itemsTotal, end);
                        start = (itemsTotal + len);
                        end = (rangeStart + rangeCount) - end;
                    }

                    itemsTotal += group.expanded ? len : 1;
                });

                return queryRanged;
            },

            sort: function ( options ) {
                var self = this,
                    querySorted = new Query({data: self._data});

                // Sort each groups individually
                leq.each(querySorted._data, function ( group ) {
                    group.items = new Query({data: group.items}).sort(options)._data;
                });

                return querySorted;
            },

            filter: function ( options ) {
                var self = this,
                    queryFiltered = new Query({data: self._data});

                // Filter each groups individually
                leq.each(queryFiltered._data, function ( group ) {
                    group.items = new Query({data: group.items}).filter(options)._data;
                });

                return queryFiltered;
            },

            // TODO
            group: function ( ) {
                throw new Error('Not Implemented!');
            }
        });


        /*
            DataStore. Usage:

            var dataStore = leq.data.[ReadOnly]DataStore.create({
                transport: {
                    read: {
                       url: ('/files/file.json')
                       [dataType: 'json']
                       [cache: true || 30 || 'persist']
                       [type: 'GET']
                    }
                    || read: url
                },
                [data: []]
                [autoFetch: true]
                [schema: {
                    model: MyModel
                }]
            });
         */

        /**
         * BaseDataStore
         * @type {*}
         */
        var BaseDataStore = leq.Observable.extend({
            initialize: function ( options ) {
                var self = this;

                self.options = leq.extend({}, self.options, options);

                leq.Observable.fn.initialize.call(self);

                if (self.options.data instanceof leq.data.Queryable ||
                    self.options.data instanceof leq.data.DataStore) {
                    self._data = self.options.data._data;
                }
                else if (leq.data.isObservable(self.options.data)) {
                    self._data = self.options.data;
                }
                else {
                    self._data = leq.data.observableArray([]);
                }

                self._data.subscribeEx(function ( newValues, oldValues ) {
                    var options = {
                        newValues: newValues,
                        oldValues: oldValues,
                        allValues: leq.data.unwrap(self._data)
                    };

                    self.trigger('change', options);
                    leq.pubsub.publish('store.' + self.options.name + '.changed', options);
                });
            },

            options: {
                name: 'unknown'
            },

            /*
                returns an array OR an object when grouped (see Queryable)
             */
            getAll: function ( ) {
                return leq.data.unwrap(this._data);
            },

            getByIndex: function ( index ) {
                var self = this,
                    data = leq.data.unwrap(this._data);

                if (index < 0 || index >= self.count()) {
                    return null;
                }

                return data[index];
            },

            getIndex: function ( item ) {
                return this._data.indexOf(item);
            },

            getComputed: function ( conditionCallback ) {
                var self = this;

                return leq.data.computed(function ( ) {
                    return leq.filter(leq.data.unwrap(this._data), conditionCallback);
                }, self);
            },

            first: function ( ) {
                var self = this;

                return self.getByIndex(0);
            },

            last: function ( ) {
                var self = this;

                return self.getByIndex(self.count() - 1);
            },

            count: function ( ) {
                return leq.data.unwrap(this._data).length;
            },

            find: function ( data ) {
                return this.asQueryable({
                    filter: data
                }).getAll();
            },

            findOne: function ( data ) {
                var values = this.find(data);

                if (values.length !== 1) {
                    return null;
                }

                return values[0];
            },

            asQueryable: function ( options ) {
                var self = this;

                return new Queryable(leq.extend({
                    name: self.name + '-queryable',
                    observable: self._data
                }, options));
            }
        });

        /*
         DataStore
         */
        var DataStore = BaseDataStore.extend({
            initialize: function ( options ) {
                var self = this;

                BaseDataStore.fn.initialize.call(self, options);
            },

            options: {
            },

            add: function ( /* item || items[] */ ) {
                var self = this,
                    arg = leq.isArray(arguments[0]) ?
                        arguments[0] :
                        [arguments[0]];

                return self.insert(self.count(), arg);
            },

            insert: function ( index /* , item || items[] */ ) {
                var self = this,
                    arg = leq.isArray(arguments[1]) ?
                        [index, 0].concat(arguments[1]) :
                        [index, 0].concat([arguments[1]]);

                if (index < 0 || index > self.count()) {
                    throw new Error('insert: index is Out Of Bounds');
                }

                self._data.splice.apply(self._data, arg);
            },

            remove: function ( /* item || items[] */ ) {
                var self = this,
                    items = leq.isArray(arguments[0]) ?
                        arguments[0] :
                        [arguments[0]],
                    index,
                    removed = [];

                leq.each(items, function ( item ) {
                    index = self._data.indexOf(item);
                    if (index !== -1) {
                        removed.push.call(removed, self._data.remove(item));
                    }
                });

                return removed;
            },

            clear: function ( ) {
                this._data([]);
            }
        });


        /*
         FetchableDataStore
         */
        var FetchableDataStore = DataStore.extend({
            initialize: function ( options ) {
                var self = this,
                    transport = options.transport;

                DataStore.fn.initialize.call(self, options);

                if (transport) {
                    transport.read = leq.isString(transport.read) ?
                        { url: transport.read } :
                        transport.read;

                    self._transport = new RemoteTransport(transport);
                }
                else {
                    self._transport = new LocalTransport({data: options.data});
                }

                self._transport.on('progress', function ( event ) {
                    self.trigger('progress', event);
                });

                self.options.autoFetch && self.fetch();
            },

            options: {
                data: [],
                schema: {
                    mapping: function ( data ) {
                        return data;
                    }
                },
                autoFetch: false
            },

            events: [
                'progress'
            ],

            // {data: {...} [, success: function ( ) { ... }] [, error: function ( ) { ... }]}
            fetch: function ( opt ) {
                var self = this,
                    options = leq.extend({
                        data: {},
                        success: leq.noop,
                        error: leq.noop
                    }, opt);

                self._transport.read({
                    data: options.data,
                    success: leq.proxy(self._success, self, options.success),
                    error: leq.proxy(self._error, self, options.error)
                });
            },

            _success: function ( callback, result ) {
                var self = this,
                    newData,
                    ObjModel = self.options.schema.model,
                    mapping = self.options.schema.mapping;

                if (ObjModel) {
                    if (leq.isArray(result.data)) {
                        newData = leq.map(result.data, function ( data ) {
                            return new ObjModel(data);
                        });
                    }
                    else {
                        newData = new ObjModel(result.data);
                    }
                }
                else {
                    if (leq.isArray(result.data)) {
                        newData = mapping.call(mapping, result.data);
                    }
                    else {
                        newData = mapping.call(mapping, leq.isEmpty(result.data) ? result : result.data);
                    }
                }

                self.add(newData);

                leq.isFunction(callback) && callback.call(callback, newData);
            },

            _error: function ( callback, message ) {
                var self = this;

                self.trigger('error', message);

                leq.isFunction(callback) && callback.call(callback, message);
            }
        });


        /*
         ReadOnlyDataStore
         */
        var ReadOnlyDataStore = DataStore.extend({
            add: function ( ) {
                throw new Error('Read-only DataStore');
            },

            insert: function ( ) {
                throw new Error('Read-only DataStore');
            },

            remove: function ( ) {
                throw new Error('Read-only DataStore');
            },

            clear: function ( ) {
                throw new Error('Read-only DataStore');
            }
        });


        /*
         Queryable

         {
            data: observableArray || DataStore
            [,filter: { field: 'orderId', operator: 'eq', value: 10248 } [, ...]]
            [,range: {start: x, count: y}]
            [,sort: { field: 'orderId', order: 'asc' } [, ...]]
            [,group: { field: 'orderId' }]
         }
         */
        var Queryable = BaseDataStore.extend({
            initialize: function ( options ) {
                var self = this;

                BaseDataStore.fn.initialize.call(self, options);

                self._parameters = {
                    filter: self.options.filter,
                    range: self.options.range,
                    sort: self.options.sort,
                    group: self.options.group
                };

                self._observable = self.options.observable;
                self._observable.subscribe(function ( ) {
                    self.query();
                });

                self.query();
            },

            options: {
                filter: {},
                range: {},
                sort: {},
                group: {}
            },

            /*
             returns an object when grouped
             */
            getAll: function ( ) {
                var self = this;
                return self.isGrouped()? leq.data.unwrap(this._data).items : BaseDataStore.fn.getAll.call(self);
            },

            count: function ( ) {
                var self = this;

                if (self.isGrouped()) {
                    var count = 0;

                    leq.each(leq.data.unwrap(this._data).items, function ( item ) {
                        count += item.items.length;
                    });

                    return count;
                }

                return BaseDataStore.fn.count.call(self);
            },

            /*
             returns the count of the unmodified data
             */
            total: function ( ) {
                var self = this;

                return leq.data.unwrap(this._observable).length;
            },

            // { start: x, count: y }
            range: function ( opt ) {
                var self = this;

                self._parameters.range = opt || {};
                self.query();
            },

            // { field: 'orderId', order: 'asc' } || []
            sort: function ( opt ) {
                var self = this;

                self._parameters.sort = opt || {};
                self.query();
            },

            // { field: 'orderId', operator: 'eq', value: 10248 } || []
            filter: function ( opt ) {
                var self = this;

                self._parameters.filter = opt || {};
                self.query();
            },

            // { field: 'orderId' }
            group: function ( opt ) {
                var self = this;

                self._parameters.group = opt || {};
                self.query();
            },

            isRanged: function ( ) {
                return !leq.isEmptyObject(this._parameters.range);
            },

            getRange: function ( ) {
                return this._parameters.range;
            },

            isSorted: function ( ) {
                return !leq.isEmptyObject(this._parameters.sort);
            },

            getSort: function ( ) {
                return this._parameters.sort;
            },

            isFiltered: function ( ) {
                return !leq.isEmptyObject(this._parameters.filter);
            },

            getFilter: function ( ) {
                return this._parameters.filter;
            },

            isGrouped: function ( ) {
                return !leq.isEmptyObject(this._parameters.group);
            },

            getGroup: function ( ) {
                return this._parameters.group;
            },

            reset: function ( ) {
                var self = this;

                leq.extend(self._parameters, {
                    filter: {},
                    range: {},
                    sort: {},
                    group: {}
                });

                self.query();
            },

            /*
             {
                 [filter: { field: 'orderId', operator: 'eq', value: 10248 || [] } [, ...]]
                 [range: {start: x, count: y}]
                 [sort: {field: 'orderId', order: 'asc' } [, ...]]
                 [group: { field: 'orderId' }]
             }
             */
            query: function ( opt ) {
                var self = this,
                    options = opt || self._parameters,
                    data = leq.data.unwrap(self._observable),
                    query = new Query({data: leq.isArray(data) ? data.slice(0) : data});

                !leq.isEmptyObject(options.filter) && (query = query.filter(options.filter));
                !leq.isEmptyObject(options.sort) && (query = query.sort(options.sort));

                if (!leq.isEmptyObject(options.group)) {
                    query = query.group(options.group);

                    // Carry over the 'expanded' property
                    leq.each(query._data.items, function ( group ) {
                        leq.each(leq.data.unwrap(self._data).items, function ( oldGroup ) {
                            if (oldGroup.value === group.value) {
                                group.expanded = oldGroup.expanded;
                                return false;
                            }
                        });
                    });
                }

                !leq.isEmptyObject(options.range) && (query = query.range(options.range));

                self._data(leq.isArray(query._data) ? query._data.slice(0) : query._data);
            }
        });


        DataStore.create = function ( options ) {
            if (options.transport) {
                return new FetchableDataStore(options);
            }

            if (options.data) {
                return new DataStore(options);
            }

            throw new Error('Parameter "transport" or "data" must be supplied!');
        };

        ReadOnlyDataStore.create = function ( options ) {
            if (options.data) {
                return new ReadOnlyDataStore(options);
            }

            throw new Error('Parameter "data" must be supplied!');
        };


        leq.extend(leq.data, {
            LocalTransport: LocalTransport,
            RemoteTransport: RemoteTransport,
            Query: Query,
            Queryable: Queryable,
            DataStore: DataStore,
            ReadOnlyDataStore: ReadOnlyDataStore
        });
    }
);