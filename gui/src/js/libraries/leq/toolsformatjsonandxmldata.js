
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


        leq.toolformatjsonandxmldata = leq.toolformatjsonandxmldata || {};

        leq.extend( leq.toolformatjsonandxmldata,{


           formatXml: function (xml) {

                var formatted = '',
                reg = /(>)(<)(\/*)/g,
                pad = 0;
                xml = xml.replace(reg, '$1\r\n$2$3');
                $.each(xml.split('\r\n'), function(index, node) {
                    var indent = 0;
                    if (node.match( /.+<\/\w[^>]*>$/ )) {
                        indent = 0;
                    } else if (node.match( /^<\/\w/ )) {
                        if (pad != 0) {
                            pad -= 1;
                        }
                    } else if (node.match( /^<\w[^>]*[^\/]>.*$/ )) {
                        indent = 1;
                    } else {
                        indent = 0;
                    }
                    var padding = '';
                    for (var i = 0; i < pad; i++) {
                        padding += '  ';
                    }
                    formatted += padding + node + '\r\n';
                    pad += indent;
                });

                return formatted;
           },

           formatJson:  function (json) {

                if (typeof json != 'string') {
                    json = JSON.stringify(json, undefined, 2);
                }
                json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
                    var cls = 'number';
                    if (/^"/.test(match)) {
                        if (/:$/.test(match)) {
                            cls = 'key';
                        } else {
                            cls = 'string';
                        }
                    } else if (/true|false/.test(match)) {
                        cls = 'boolean';
                    } else if (/null/.test(match)) {
                        cls = 'null';
                    }
                    return  match ;
                    // return '<span class="' + cls + '">' + match + '</span>';
                });
            }

            //
//                        function xmlToString(xmlData) {
//
//                            var xmlString;
//                            //IE
//                            if (window.ActiveXObject){
//                                xmlString = xmlData.xml;
//                            }
//                            // code for Mozilla, Firefox, Opera, etc.
//                            else{
//                                xmlString = (new XMLSerializer()).serializeToString(xmlData);
//                            }
//                            return xmlString;
//                        }

        });

    }
);
