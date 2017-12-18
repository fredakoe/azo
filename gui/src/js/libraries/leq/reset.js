
define(
    function ( ) {
        // Create the 'Object.create' function if it doesn't exist
        if (typeof Object.create !== 'function') {
            Object.create = function ( o ) {
                function F ( ) {}
                F.prototype = o.prototype;
                return new F();
            };
        }

        // Create the 'Object.keys' function if it doesn't exist
        if (typeof Object.keys !== 'function') {
            Object.keys = (function () {
                var hasOwnProperty = Object.prototype.hasOwnProperty,
                    hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
                    dontEnums = [
                      'toString',
                      'toLocaleString',
                      'valueOf',
                      'hasOwnProperty',
                      'isPrototypeOf',
                      'propertyIsEnumerable',
                      'constructor'
                    ],
                    dontEnumsLength = dontEnums.length;

                return function ( obj ) {
                    if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) {
                        throw new TypeError('Object.keys called on non-object');
                    }

                    var result = [];

                    for (var prop in obj) {
                        if (hasOwnProperty.call(obj, prop)) {
                            result.push(prop);
                        }
                    }

                    if (hasDontEnumBug) {
                        for (var i=0; i < dontEnumsLength; i++) {
                            if (hasOwnProperty.call(obj, dontEnums[i])) {
                                result.push(dontEnums[i]);
                            }
                        }
                    }
                    return result;
                };
            })();
        }

        // Create the 'Function.prototype.bind' function if it doesn't exist
        if (typeof Function.prototype.bind !== 'function') {
            Function.prototype.bind = function (oThis) {
                if (typeof this !== "function") {
                    // closest thing possible to the ECMAScript 5 internal IsCallable function
                    throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
                }

                var aArgs = Array.prototype.slice.call(arguments, 1),
                    fToBind = this,
                    fNOP = function () {},
                    fBound = function () {
                      return fToBind.apply(this instanceof fNOP ?
                                             this :
                                             oThis || window,
                                           aArgs.concat(Array.prototype.slice.call(arguments)));
                    };

                fNOP.prototype = this.prototype;
                fBound.prototype = new fNOP();

                return fBound;
            };
        }

        // Create the 'String.prototype.toCamelCase' function if it doesn't exist
        if (typeof String.prototype.toCamelCase !== 'function') {
            String.prototype.toCamelCase = function ( ) {
                var self = this,
                    lastCapital = 0;

                return self
                    .replace(/(?:^\w|[A-Z]|\b\w)/g, function ( letter, index ) {
                        if (index === 0 || ((index - 1) === lastCapital && (!self[index+1] || !/[a-z]/.test(self[index+1])))) {
                            lastCapital = index;
                            return letter.toLowerCase();
                        }

                        lastCapital = index;
                        return letter.toUpperCase();
                    })
                    .replace(/\s+|_/g, '');
            };
        }

        // Create the 'Array.prototype.indexOf' function if it doesn't exist
        if (typeof Array.prototype.indexOf !== 'function') {
            Array.prototype.indexOf = function ( searchElement /*, fromIndex */ ) {
                "use strict";
                if (this === null) {
                    throw new TypeError();
                }
                var t = Object(this);
                var len = t.length >>> 0;
                if (len === 0) {
                    return -1;
                }
                var n = 0;
                if (arguments.length > 0) {
                    n = Number(arguments[1]);
                    if (n !== n) { // shortcut for verifying if it's NaN
                        n = 0;
                    } else if (n !== 0 && n !== Infinity && n !== -Infinity) {
                        n = (n > 0 || -1) * Math.floor(Math.abs(n));
                    }
                }
                if (n >= len) {
                    return -1;
                }
                var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
                for (; k < len; k++) {
                    if (k in t && t[k] === searchElement) {
                        return k;
                    }
                }
                return -1;
            };
        }

        // Create the 'String.prototype.visualLength' function if it doesn't exist
        if (typeof String.prototype.visualLength !== 'function') {
            String.prototype.visualLength = function ( ) {
                var ruler = document.createElement('div'),
                    len;

                ruler.style.cssText = 'visibility: hidden; white-space: nowrap; display: inline; padding: 0 4px;';
                ruler.innerHTML = this;
                document.body.appendChild(ruler);

                len = ruler.offsetWidth;

                document.body.removeChild(ruler);
                return len;
            };
        }

        if (!!(typeof window !== "undefined" && navigator && document)) {
            // http://whattheheadsaid.com/2011/04/internet-explorer-9s-problematic-console-object
            if (Function.prototype.bind && window.console && typeof window.console.log === "object") {
                [
                    "log","info","warn","error","assert","dir","clear","profile","profileEnd"
                ]
                .forEach(function ( method ) {
                    window.console[method] = this.call(window.console[method], window.console);
                }, Function.prototype.bind);
            }
        }
    }
);