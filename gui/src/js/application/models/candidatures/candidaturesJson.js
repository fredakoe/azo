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
        return leq.data.Model.define({

            fields: {

                'titre': {
                    nullable: false,
                    type: leq.STRING,
                    editable: false
                },
                'idOffre': {
                    nullable: false,
                    type: leq.STRING,
                    editable: false
                },
                'nom': {
                    nullable: false,
                    type: leq.STRING,
                    editable: false
                },
                'prenom': {
                    nullable: false,
                    type: leq.STRING,
                    editable: false
                },
                'url': {
                    nullable: false,
                    type: leq.STRING,
                    editable: false
                },
                'description': {
                    nullable: false,
                    type: leq.STRING,
                    editable: false
                },
                'idCand': {
                    nullable: false,
                    type: leq.STRING,
                    editable: false
                }
            }
        });
    }
);