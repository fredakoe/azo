
/*
    var worker = new window.Worker('/js/libraries/leq/webworker.datastore.js');
    worker.onmessage = function ( event ) {
        console.log('Message received: ' + event.data);
    };
    worker.postMessage('test'); // start the worker.
  */

importScripts('/js/vendors/require/require-2.0.6.js');

require(
    {
        baseUrl: '/js/',
        paths: {
            'underscore': 'vendors/underscore/underscore-1.3.3'
        }
    },
    [
        'underscore'
    ],
    function ( _ ) {
        var self = this;

        self.onmessage = function ( event ) {
            self.postMessage('Command received: ' + event.data);
        };

        self.onerror = function ( event ) {
            self.postMessage('Error: ' + event.data);
        };
    }
);