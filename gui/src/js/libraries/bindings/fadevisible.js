
define(
    [
        'jquery',
        'leq'
    ],
    function ( $, leq ) {
        var test = function () {
            return 1;
        };

        leq.data.bindingHandlers.fadeVisible = {
            init: function( element, valueAccessor, allBindingsAccessor, viewModel ) {
                var observable = valueAccessor(),
                    bindingValue = leq.data.unwrap(observable),
                    allBindings = allBindingsAccessor();

                var value = test();

                $(element).toggle(bindingValue);
            },

            update: function( element, valueAccessor, allBindingsAccessor, viewModel, bindingContext ) {
                var bindingValue = leq.data.unwrap(valueAccessor()),
                    allBindings = allBindingsAccessor();

                bindingValue ?
                    $(element).fadeIn(allBindings.speed) :
                    $(element).fadeOut(allBindings.speed);
            }
        };
    }
);