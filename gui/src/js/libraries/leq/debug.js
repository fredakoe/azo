
define(
    [
        'library/leq/base'
    ],
    function ( leq ) {
        leq.console = leq.console || {};

        leq.console.logLevels = {
            INFO: 1,
            WARNING: 2,
            ERROR: 4
        };

        leq.extend(leq.console, {
            logLevel: leq.console.logLevels.INFO,

            log: function ( /*text [, text2, ...]*/ ) {
                if (typeof window.console !== "undefined" && window.console.log) {
                    window.console.log.apply(window.console, arguments);
                }
            }
        });

//>>includeStart("debug", pragmas.debug);
        leq.extend(leq, {
            debugBuffer: [],

            // see leq.format in leq.globalization
            debug: function ( ) {
                var message = leq.format.apply(leq, arguments);

                leq.debugBuffer.push(message);
                leq.console.log('DEBUG', message);
            }
        });
//>>includeEnd("debug");
    }
);