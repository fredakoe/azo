
// TODO CONVERT TO VIEW
define(
    [
        'jquery'
    ],
    function ( $ ) {
        return function ( ) {
            var $loadingPane = $('#2847d270-930c-4e7c-a061-932184215fd3'),
                $content = $('#81b763df-8340-482f-82aa-5bbe35c48052'),
                $loadingProgressbar = $loadingPane.find('.bar'),
                width = 0,
                defaultStep = 20;

            return {
                reset: function () {
                    width = 0;
                    $loadingProgressbar.width(width + '%');
                },

                step: function ( value ) {
                    width = width + (value || defaultStep);
                    $loadingProgressbar.width(width + '%');
                },

                show: function () {
                    $content.fadeOut('slow');
                    $loadingPane.fadeIn('slow');
                },

                hide: function () {
                    $content.fadeIn('slow');
                    $loadingPane.fadeOut('fast');
                    $(window).resize();
                }
            };
        };
    }
);