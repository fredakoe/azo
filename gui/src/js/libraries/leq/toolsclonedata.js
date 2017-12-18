
define(
    [
        'jquery',
        'library/leq/core'
    ],
    function ($, leq) {

//        myApp.Notepad = function(defaultFont) {
//            var  that = {};
//            that.writeable = true;
//            that.font = defaultFont;
//            that.setFont = function(theFont) {
//                that.font = theFont;
//            }
//            return that;
//        }
//
//        myApp.notepad1 =  myApp.Notepad('helvetica');


        leq.toolclonedata = leq.toolclonedata || {};

        leq.extend( leq.toolclonedata,{




            clone :  function (obj) {
                if (null == obj || "object" != typeof obj) return obj;
                var copy = obj.constructor();
                for (var attr in obj) {
                    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
                }
                return copy;
            },

            cloneAll: function (obj) {
                // Handle the 3 simple types, and null or undefined
                if (null == obj || "object" != typeof obj) return obj;

                // Handle Date
                if (obj instanceof Date) {
                    var copyDate = new Date();
                    copyDate.setTime(obj.getTime());
                    return copyDate;
                }

                // Handle Array
                if (obj instanceof Array) {
                    var copyArray = [];
                    for (var i = 0, len = obj.length; i < len; i++) {
                        copyArray[i] = leq.toolclonedata.cloneAll(obj[i]);
                    }
                    return copyArray;
                }

                // Handle Object
                if (obj instanceof Object) {
                    var copyObject = {};
                    for (var attr in obj) {
                        if (obj.hasOwnProperty(attr)) copyObject[attr] = leq.toolclonedata.cloneAll(obj[attr]);
                    }
                    return copyObject;
                }

                throw new Error("Unable to copy obj! Its type isn't supported.");
            }

        });

    }
);
