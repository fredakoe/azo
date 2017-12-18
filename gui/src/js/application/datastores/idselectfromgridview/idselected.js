define(
    [
        'leq'

    ],
    function (leq) {

        var IdSelected = leq.data.DataStore.create({ data:[],autoFetch:true });

        return IdSelected;
    }
);