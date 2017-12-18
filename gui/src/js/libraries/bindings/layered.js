
define(
    [
        'jquery',
        'leq'
    ],
    function ( $, leq ) {
        var layerScrollPositions = {};

        leq.data.bindingHandlers.layered = {
            update: function( element, valueAccessor, allBindingsAccessor, viewModel, bindingContext ) {
                var bindingValue = leq.data.unwrap(valueAccessor()),
                    $element = $('#' + bindingValue),
                    $active = $(element).children('.active'),
                    transition = $.support.transition && $element.hasClass('fade');

                function next ( ) {
                    $active.removeClass('active');

                    $element.addClass('active');

                    if (transition) {
                        $element[0].offsetWidth; // reflow for transition
                        $element.addClass('in');
                    } else {
                        $element.removeClass('fade');
                    }

                    $(window).resize();
                    $(window).scrollTop(layerScrollPositions[bindingValue] || 0);
                }

                // keep track of last layer's scroll position
                layerScrollPositions[$active.attr('id')] = $(window).scrollTop();

                transition && $active.hasClass('in') ?
                    $active.one($.support.transition.end, next) :
                    next();

                $active.removeClass('in');
            }
        };
    }
);