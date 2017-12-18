
define(
    [
        'jquery',
        'leq',

        'library/widgets/propertysheet/propertysheet'
    ],
    function ( $, leq ) {
        leq.data.bindingHandlers.propertySheet = {
            init: function( element, valueAccessor, allBindingsAccessor, viewModel ) {
                var observable = valueAccessor(),
                    bindingValue = leq.data.unwrap(observable);

                $(element).propertysheet(bindingValue);
            }
        };
    }
);