
define(
    [
        'library/leq/base'
    ],
    function ( leq ) {
        /**
         * base class of all classes.
         * @constructor
         */
        function Class ( ) {}

        /**
         * extend functionality for all classes
         * @param proto
         * @return {Function}
         */
        Class.extend = function ( proto ) {
            var self = this,
                Base = function ( ) {},
                member,
                subclass = proto && proto.initialize ?
                    proto.initialize :
                    function ( ) {
                        self.apply(this, arguments);
                    },
                fn;

            Base.prototype = self.prototype;
            fn = subclass.fn = subclass.prototype = new Base();
            fn[leq.PROTO] = {};
            fn._uid = leq.guid();

            for (member in proto) {
                if (typeof proto[member] === leq.OBJECT && !(proto[member] instanceof Array) && proto[member] !== null) {
                    // merge object members
                    fn[member] = leq.extend(true, {}, Base.prototype[member], proto[member]);
                } else {
                    // assign arrays and functions
                    fn[member] = proto[member];
                }
            }

            // make sure there is a 'destroy' function
            fn.destroy = fn.destroy || leq.noop;

            fn.constructor = subclass;
            subclass.extend = self.extend;

            return subclass;
        };


        /**
         * base class for Observable objects
         * @type {Function}
         */
        var Observable = Class.extend({
            initialize: function ( ) {
                var self = this;

                self._events = {};

                self.on(self.events, self.options.events);
            },

            options: {
                events: {}
            },

            events: [
            ],

            destroy: function ( ) {
                var self = this;

                leq.each(self._events, function ( eventName ) {
                    self.off(eventName);
                });
            },

            on: function ( eventName, handlers, one ) {
                var self = this,
                    index,
                    eventNames = leq.isArray(eventName) ? eventName : [eventName],
                    length,
                    handler,
                    original,
                    events;

                for (index = 0, length = eventNames.length; index < length; index++) {
                    eventName = eventNames[index];

                    handler = leq.isFunction(handlers) ? handlers : handlers[eventName];

                    if (handler) {
                        if (one) {
                            original = handler;
                            handler = function() {
                                self.off(eventName, handler);
                                original.apply(self, arguments);
                            };
                        }
                        events = self._events[eventName] = self._events[eventName] || [];
                        events.push(handler);
                    }
                }

                return self;
            },


            one: function ( eventName, handlers ) {
                return this.on(eventName, handlers, true);
            },

            off: function ( eventName, handler ) {
                var self = this,
                    events = self._events[eventName],
                    index,
                    length;

                if (events) {
                    if (handler) {
                        for (index = 0, length = events.length; index < length; index++) {
                            if (events[index] === handler) {
                                events.splice(index, 1);
                            }
                        }
                    } else {
                        self._events[eventName] = [];
                    }
                }

                return self;
            },

            trigger: function ( eventName, options ) {
                var self = this,
                    events = self._events[eventName] ? self._events[eventName].slice() : [],
                    isDefaultPrevented = false,
                    args = leq.extend(options, {
                        preventDefault: function() {
                            isDefaultPrevented = true;
                        },
                        isDefaultPrevented: function() {
                            return isDefaultPrevented;
                        }
                    }),
                    index,
                    length;

                if (events) {
                    for (index = 0, length = events.length; index < length; index++) {
                        events[index].call(self, args);
                    }
                }

                return isDefaultPrevented;
            }
        });

        leq.extend(leq, {
            Class: Class,
            Observable: Observable
        });
    }
);