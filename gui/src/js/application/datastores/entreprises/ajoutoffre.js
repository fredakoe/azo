define(
    [
        'leq'

    ],
    function ( leq) {

        var AjoutOffreDataStore = leq.data.DataStore.create({ data: [],autoFetch:true});

        return AjoutOffreDataStore;

    }
);

