/**
 * Created with JetBrains PhpStorm.
 * User: rquenum
 * Date: 11/15/13
 * Time: 1:52 PM
 * To change this template use File | Settings | File Templates.
 */

define(
    [
        'leq'
    ],
    function ( leq ) {
        var Offres = leq.data.Model.define({
            fields: {
                'offre': {
                    nullable: false,
                    type: leq.STRING,
                    editable: false
                },
                'entreprise': {
                    nullable: false,
                    type: leq.STRING,
                    editable: false
                },
                'date': {
                    nullable: false,
                    type: leq.DATE,
                    editable: false
                },
                'statut': {
                    nullable: false,
                    type: leq.STRING,
                    editable: false
                },
                'idOffre': {
                    nullable: false,
                    type: leq.STRING,
                    editable: false
                },
                'description': {
                    nullable: false,
                    type: leq.STRING,
                    editable: false
                }
            }
        });

        return Offres;
    }
);