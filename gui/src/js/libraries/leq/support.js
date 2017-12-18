
define(
    [
        'jquery',
        'library/leq/base',
        'modernizr'
    ],
    function ( $, leq, modernizr, undefined ) {
        leq.support = leq.support || {};

        leq.extend(leq.support, {
            scrollbar: (function ( ) {
                var div = document.createElement("div");

                div.style.cssText = "overflow:scroll;overflow-x:hidden;zoom:1";
                div.innerHTML = "&nbsp;";
                document.body.appendChild(div);

                var scrollbarSize = div.offsetWidth - div.scrollWidth;

                document.body.removeChild(div);
                return scrollbarSize;
            })(),

            DEFAULTSCROLLBARSIZE: 17.0,

            zoomLevel: function() {
                return leq.support.features.touch ?
                    (document.documentElement.clientWidth / window.innerWidth) :
                    1.0;
            },

            devicePixelRatio: window.devicePixelRatio === undefined ?
                1 :
                window.devicePixelRatio,

            browser: $.browser
        });

        /**
         * Feature detection by Modernizr
         */
        leq.support.features = leq.support.features || {};

        leq.each(modernizr, function ( value, key ) {
            if (!leq.isFunction(value) && !leq.string.startsWith(key, '_')) {
                leq.support.features[key] = value;
            }
        });

        // Touch events integration into jQuery
        /*leq.each(["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap"], function ( value ) {
            $.fn[value] = function ( callback ) {
                return this.bind(value, callback);
            };
        });*/

        /**
         * Enable cross-site scripting in jQuery
         */
        $.support.cors = true;
    }
);