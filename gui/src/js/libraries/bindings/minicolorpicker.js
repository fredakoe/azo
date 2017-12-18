
define(
    [
        'jquery',
        'leq',

        'library/widgets/minicolorpicker/minicolorpicker'
    ],
    function ( $, leq ) {
        leq.data.bindingHandlers.miniColorPicker = {
            init: function( element, valueAccessor, allBindingsAccessor, viewModel ) {
                var observable = valueAccessor(),
                    bindingValue = leq.data.unwrap(observable);

                $(element).minicolorpicker({
                    'color': bindingValue,
                    'commit': function ( hex, rgb ) {
                        observable(hex);
                    }
                });
            },

            update: function( element, valueAccessor, allBindingsAccessor, viewModel, bindingContext ) {
                var bindingValue = leq.data.unwrap(valueAccessor());

                $(element).minicolorpicker('setColor', bindingValue);
            }
        };
    }
);