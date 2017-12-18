define(
    [
        'leq'

    ],
    function (leq) {

        var OffreStore = leq.data.DataStore.create({ data:[],autoFetch:true })

        return OffreStore;
    }
);
