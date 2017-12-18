
define(
    [
        'underscore',
        'underscore.string',
        'library/leq/reset'
    ],
    function ( _, _str ) {
        var leq = {};

//>>includeStart("debug", pragmas.debug);
        if (!!(typeof window !== "undefined" && navigator && document)) {
            window.leq = leq;
        }
//>>includeEnd("debug");

        /**
         * CYME prototype to help identify CYME classes
         * @type {String}
         */
        leq.PROTO = '__leq_proto__';

        /**
         * extend underscore to include more functionalities
         */
        _.mixin({
            /**
             * determines if obj is a window object.
             * copied from jQuery.
             * @param obj
             * @return true|false
             */
            isWindow: function ( obj ) {
                return obj && _.isObject(obj) && "setInterval" in obj;
            },

            /**
             * determines if obj is a regular object.
             * copied from jQuery.
             * @param obj
             * @return true|false
             */
            isPlainObject: function ( obj ) {
                // Must be an Object.
                // Because of IE, we also have to check the presence of the constructor property.
                // Make sure that DOM nodes and window objects don't pass through, as well
                if ( !obj || !_.isObject(obj) || obj.nodeType || _.isWindow( obj ) ) {
                    return false;
                }

                try {
                    // Not own constructor property must be Object
                    if ( obj.constructor &&
                        !_.has.call(obj, "constructor") &&
                        !_.has.call(obj.constructor.prototype, "isPrototypeOf") ) {
                        return false;
                    }
                } catch ( e ) {
                    // IE8,9 Will throw exceptions on certain host objects #9897
                    return false;
                }

                // Own properties are enumerated firstly, so to speed up,
                // if last one is own, then all properties are own.
                var key;
                for ( key in obj ) {}

                return key === undefined || _.has.call( obj, key );
            },

            /**
             * merges the second element into the first one.
             * cpied from jQuery.
             * @param first
             * @param second
             * @return {*}
             */
            merge: function ( first, second ) {
                var i = first.length,
                    j = 0;

                if ( typeof second.length === "number" ) {
                    for ( var l = second.length; j < l; j++ ) {
                        first[ i++ ] = second[ j ];
                    }

                } else {
                    while ( second[j] !== undefined ) {
                        first[ i++ ] = second[ j++ ];
                    }
                }

                first.length = i;

                return first;
            },

            /**
             * merge the contents of two or more objects together into the first object.
             * copied from jQuery.
             *
             * extend( target [, object1] [, objectN] )
             * extend( [deep], target, object1 [, objectN] )
             * @return {*}
             */
            extend: function ( ) {
                var options, name, src, copy, copyIsArray, clone,
                    target = arguments[0] || {},
                    i = 1,
                    length = arguments.length,
                    deep = false;

                // Handle a deep copy situation
                if ( typeof target === "boolean" ) {
                    deep = target;
                    target = arguments[1] || {};
                    // skip the boolean and the target
                    i = 2;
                }

                // Handle case when target is a string or something (possible in deep copy)
                if ( typeof target !== "object" && !_.isFunction(target) ) {
                    target = {};
                }

                // extend jQuery itself if only one argument is passed
                if ( length === i ) {
                    target = this;
                    --i;
                }

                for ( ; i < length; i++ ) {
                    // Only deal with non-null/undefined values
                    if ( (options = arguments[ i ]) != null ) {
                        // Extend the base object
                        for ( name in options ) {
                            src = target[ name ];
                            copy = options[ name ];

                            // Prevent never-ending loop
                            if ( target === copy ) {
                                continue;
                            }

                            // Recurse if we're merging plain objects or arrays
                            if ( deep && copy && ( _.isPlainObject(copy) || (copyIsArray = _.isArray(copy)) ) ) {
                                if ( copyIsArray ) {
                                    copyIsArray = false;
                                    clone = src && _.isArray(src) ? src : [];

                                } else {
                                    clone = src && _.isPlainObject(src) ? src : {};
                                }

                                // Never move original objects, clone them
                                target[ name ] = _.extend( deep, clone, copy );

                                // Don't bring in undefined values
                            } else if ( copy !== undefined ) {
                                target[ name ] = copy;
                            }
                        }
                    }
                }

                // Return the modified object
                return target;
            },

            /**
             * takes a function and returns a new one that will always have a particular context.
             *
             * proxy( obj, context[, arg1,...] )
             * @param obj
             * @return {Object}
             */
            proxy: function ( obj ) {
                var args = Array.prototype.slice.call(arguments, 1);
                return Function.prototype.bind.apply(obj, args);
            },

            /**
             * the empty function.
             */
            noop: function ( ) {},

            /**
             * extract the selected elements and return the result in a new array.
             *
             * slice( arr, start [, end] )
             * @param arr
             * @return {*}
             */
            slice: function ( arr ) {
                var args = Array.prototype.slice.call(arguments, 1);
                return Array.prototype.slice.apply(arr, args);
            },

            /**
             * check to see if the passed url is local.
             * @param url
             * @return {*}
             */
            isLocalUrl: function ( url ) {
                return url && !/^([a-z]+:)?\/\//i.test(url);
            },

            /**
             * returns the passed object as an array if it is not already
             * @param obj
             * @return {*}
             */
            toArray: function ( obj ) {
                return leq.isArray(obj) ?
                    obj :
                    [obj];
            },

            /**
             * aliases.
             */
            isNumeric: _.isNumber,
            isEmptyObject: _.isEmpty
        });

        /**
         * extend the CYME object using underscore.
         */
        _.extend(leq, _, {
            FUNCTION: 'function',
            STRING: 'string',
            NUMBER: 'number',
            OBJECT: 'object',
            ARRAY: 'array',
            ERROR: 'error',
            NULL: 'null',
            BOOLEAN: 'boolean',
            MIXED: 'mixed',
            DATE: 'date',

            EMPTY: '',
            POINT: '.',
            COMMA: ',',
            ZERO: '0',
            SHARP: '#',

            keys: {
                DELETE: 46,
                BACKSPACE: 8,
                TAB: 9,
                ENTER: 13,
                ESC: 27,
                LEFT: 37,
                UP: 38,
                RIGHT: 39,
                DOWN: 40,
                END: 35,
                HOME: 36,
                SPACEBAR: 32,
                PAGEUP: 33,
                PAGEDOWN: 34
            },

            /**
             * string functions.
             * see https://github.com/edtsech/underscore.string
             */
            string: _str,

            /**
             * JSON helper functions
             */
            json: {
                parse: JSON.parse,
                stringify: JSON.stringify
            },

            /**
             * generates a GUID.
             * @return {String}
             */
            guid: function ( ) {
                var S4 = function ( ) {
                    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
                };
                return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
            },

            /**
             * encodes a string to HTML.
             * @param html
             * @return {String}
             */
            encodeHtml: function ( html ) {
                return encodeURIComponent(html);
            },

            /**
             * determines if obj is a CYME class
             * @param obj
             * @return {*}
             */
            isClass: function ( obj ) {
                return _.isObject(obj) && obj[leq.PROTO] !== undefined;
            },

            /**
             * setTimeout
             */
            setTimeout: (typeof window !== 'undefined') ?
                _.proxy(window.setTimeout, window) :
                _.noop,

            /**
             * clearTimeout
             */
            clearTimeout: (typeof window !== 'undefined') ?
                _.proxy(window.clearTimeout, window) :
                _.noop,

            /**
             * setInterval
             */
            setInterval: (typeof window !== 'undefined') ?
                _.proxy(window.setInterval, window) :
                _.noop,

            /**
             * clearInterval
             */
            clearInterval: (typeof window !== 'undefined') ?
                _.proxy(window.clearInterval, window) :
                _.noop,

            /**
             * determines the type of inst
             * @param inst
             * @return {String}
             */
            getType: function ( inst ) {
                if (leq.isString(inst)) {
                    return leq.STRING;
                }
                if (leq.isNumeric(inst)) {
                    return leq.NUMBER;
                }
                if (leq.isArray(inst)) {
                    return leq.ARRAY;
                }
                if (leq.isObject(inst) || leq.isClass(inst)) {
                    return leq.OBJECT;
                }
                if (leq.isFunction(inst)) {
                    return leq.FUNCTION;
                }
                if (leq.isBoolean(inst)) {
                    return leq.BOOLEAN;
                }
                if (leq.isDate(inst)) {
                    return leq.DATE;
                }

                // defaults to string
                return leq.STRING;
            }
        });

        return leq;
    }
);