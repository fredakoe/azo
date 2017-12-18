
define(
    [
        'leq'
    ],
    function ( leq ) {
        var ViewModel = leq.Class.extend({
            initialize: function ( options ) {

            },

            formatNumber: function ( value, unit, round ) {
                round = round || 'n2';
                return leq.format('{0:' + round + '} {1}', +leq.data.unwrap(value), leq.data.unwrap(unit));
            },

            formatDate: function ( date, pattern ) {
                return leq.toString(leq.data.unwrap(date), pattern ? pattern : 'ddd MMM dd yyyy HH:mm:ss');
            }
        });

        leq.extend(leq.extensions, {
            ViewModel: ViewModel
        });
    }
);