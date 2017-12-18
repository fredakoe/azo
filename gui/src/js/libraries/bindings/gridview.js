
define(
    [
        'jquery',
        'leq',

        'library/widgets/gridview/gridview'
    ],
    function ( $, leq ) {
        leq.data.bindingHandlers.gridView = {
            init: function( element, valueAccessor, allBindingsAccessor, viewModel ) {
                var observable = valueAccessor(),
                    bindingValue = leq.data.unwrap(observable),
                    allBindings = allBindingsAccessor();

                $(element).gridview(bindingValue);
            }
        };
    }
);