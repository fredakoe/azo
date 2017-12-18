
define(
    [
        'jquery',
        'leq'
    ],
    function ( $, leq ) {
        leq.data.bindingHandlers.element = {
            init: function( element, valueAccessor, allBindingsAccessor, viewModel ) {
                var observable = valueAccessor(),
                    bindingValue = leq.data.unwrap(observable),
                    allBindings = allBindingsAccessor();

                observable($(element));
            }
        };
    }
);