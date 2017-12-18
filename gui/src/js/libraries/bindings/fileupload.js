
define(
    [
        'jquery',
        'leq'
    ],
    function ( $, leq ) {
        leq.data.bindingHandlers.FileUpload = {

            init: function (element, valueAccessor) {

                var observable = valueAccessor();

                $(element).change(function () {
                    var file = this.files[0];
                    if (leq.data.isObservable(observable)) {
                        observable(file);
                    }
                });
            },
            update: function (element, valueAccessor, allBindingsAccessor) {

                var observable = valueAccessor(),
                    file = leq.data.unwrap(observable),
                    bindings = allBindingsAccessor();


                if (bindings.fileBinaryData && leq.data.isObservable(bindings.fileBinaryData)) {

                    if (!file) {
                        bindings.fileBinaryData(null);
                    } else {
                        var reader = new FileReader();

                        reader.onload = function (e) {
                            bindings.fileBinaryData(e.target.result);
                        };
                         reader.readAsBinaryString(file) ;
                    }
                }
                if(bindings.formatData && leq.data.isObservable(bindings.formatData)){
                    if(!file){
                        bindings.formatData(null);
                    }else{

                      // var formData= new FormData();
                       // formData.append("file", file);
                        //bindings.formatData(formData);
                    }
                }
                if (bindings.fileObjectURL && leq.data.isObservable(bindings.fileObjectURL)) {

                     var oldUrl = bindings.fileObjectURL();

                    if(oldUrl){
                    };
                }
            }

        };
    }
);
