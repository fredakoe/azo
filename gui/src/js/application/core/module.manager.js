
define(
    [
        'leq'
    ],
    function ( leq ) {
        var collection = {};

        var mm = {
            register: function ( id, Module ) {
                if (!leq.has(collection, id)) {
                    collection[id] = {
                        Module: Module,
                        instance: null
                    };
                }
                else {
                    throw new Error('Module "' + id + '" is already registered!');
                }

                return this;
            },

            start: function ( id ) {
                if (leq.has(collection, id)) {
                    var obj = collection[id];

                    if (obj.instance) {
                        this.stop(id);
                    }

                    obj.instance = new obj.Module();
                }
                else {
                    throw new Error('Module "' + id + '" was not found!');
                }

                return this;
            },

            stop: function ( id ) {
                if (leq.has(collection, id)) {
                    var obj = collection[id];

                    if (obj.instance) {
                        obj.instance.destroy();
                        delete obj.instance;
                        obj.instance = null;
                    }
                }
                else {
                    throw new Error('Module "' + id + '" was not found!');
                }

                return this;
            },

            stopAll: function () {
                for (var id in collection) {
                    if (leq.has(collection, id)) {
                        this.stop(id);
                    }
                }

                return this;
            }
        };

        leq.pubsub.subscribe('application.close', function ( ) {
            mm.stopAll();
        });

        return mm;
    }
);