
define(
    [
        'jquery',
        'leq'
    ],
    function ( $, leq ) {
        leq.data.bindingHandlers.dragAndDrop = {
            init: function( element, valueAccessor, allBindingsAccessor, viewModel ) {
                var observable = valueAccessor(),
                    bindingValue = leq.data.unwrap(observable),
                    allBindings = allBindingsAccessor();

                $(element).on('dragover', function ( e ) {
                    leq.dom.cancelEvent(e);
                    e.originalEvent.dataTransfer.dropEffect = 'copy';
                });
                $(element).on('drop', function ( e ) {
                    var files = e.originalEvent.dataTransfer.files;

                    leq.dom.cancelEvent(e);

                    for (var i = 0, f; f = files[i]; i++) {
                        if (allBindings.dragAndDropType && !f.name.match(allBindings.dragAndDropType)) {
                            continue;
                        }

                        var reader = new FileReader();
                        reader.onload = (function ( file ) {
                            return function ( e ) {
                                observable(e.target.result);
                                observable(null);
                            };
                        })(f);

                        reader.readAsText(f);
                    }
                });
            }
        };
    }
);