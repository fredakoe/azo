
require.config({
    baseUrl: 'src/js/',
    waitSeconds: 20,

    // cache buster
    urlArgs: 'bust=' +  (new Date()).getTime(),

    paths: {
        // frameworks
        'amplify': 'vendors/amplify/amplify-1.1.0',
        'bootstrap': 'vendors/bootstrap/js/bootstrap',
        'd3': 'vendors/d3/d3-2.9.1',
        'jquery': 'require-jquery',
        'knockout': 'vendors/knockout/knockout-2.1.0',
        'less': 'vendors/less/less-1.3.0',
        'modernizr': 'vendors/modernizr/modernizr-2.6.1',
        'socket.io': 'vendors/socket.io/socket.io-0.9.6',
        'underscore': 'vendors/underscore/underscore-1.3.3',
        'underscore.string': 'vendors/underscore/underscore.string-2.2.0',
        'xmltojson': 'vendors/xmltojson/xml2json-1.1.4',
        'nodvalidator':'vendors/nodvalidator/nod-1.0.3',
        //'fine':        'vendors/jquery/s3.jquery.fine-uploader',
        'fine':        'vendors/jquery/jquery.fineuploader',


        // requireJS plugins
        'async': 'vendors/require/async-0.1.1',
        'domReady': 'vendors/require/domReady-2.0.1',
        'i18n': 'vendors/require/i18n-2.0.1',
        'json': 'vendors/require/json-0.2.1',
        'text': 'vendors/require/text-2.0.3',

        // application core
        'main': 'application/main',
        'mm': 'application/core/module.manager',

        // libraries
        'library': 'libraries',
        'leq': 'libraries/leq/leq-all',

        // application prefixes
       'datastore': 'application/datastores',
        'extension': 'application/extensions',
        'model': 'application/models',
        'module': 'application/modules',
        'service': 'application/services',
        'template': 'application/templates'
    },

    shim: {
        'amplify': {
            deps: ['jquery'],
            exports: 'amplify'
        }
    },

    packages: [
        {name: 'module/about', location: 'application/modules/about', main: 'controller'},
        {name: 'module/application', location: 'application/modules/application', main: 'controller'},
        {name: 'module/authentication', location: 'application/modules/authentication', main: 'controller'},
        {name: 'module/bootstrapper', location: 'application/modules/bootstrapper', main: 'controller'},
        {name: 'module/core.domeventhandler', location: 'application/modules/core.domeventhandler', main: 'controller'},
        {name: 'module/core.errorsplash', location: 'application/modules/core.errorsplash', main: 'controller'},
        {name: 'module/core.initiator', location: 'application/modules/core.initiator', main: 'controller'},
        {name: 'module/core.loadingsplash', location: 'application/modules/core.loadingsplash', main: 'controller'},
        {name: 'module/core.modulemanager', location: 'application/modules/core.modulemanager', main: 'controller'},
        {name: 'module/core.pubsubeventhandler', location: 'application/modules/core.pubsubeventhandler', main: 'controller'},
        {name: 'module/entreprises', location: 'application/modules/entreprises', main: 'controller'},
        {name: 'module/candidats', location: 'application/modules/candidats', main: 'controller'},
        {name: 'module/offres', location: 'application/modules/offres', main: 'controller'},
        //{name: 'module/list',       location: 'application/modules/offres/list', main: 'controller'},
       // {name: 'module/descriptif', location: 'application/modules/offres/descriptif', main: 'controller'},
        {name: 'module/cv', location: 'application/modules/candidats/cv', main: 'controller'},
        {name: 'module/profil', location: 'application/modules/candidats/profil', main: 'controller'},
        {name: 'module/emplois_postules', location: 'application/modules/candidats/emplois_postules', main: 'controller'},
        {name: 'module/candidatures', location: 'application/modules/entreprises/candidatures', main: 'controller'},
        {name: 'module/informations', location: 'application/modules/entreprises/informations', main: 'controller'},
        {name: 'module/offres_entreprises', location: 'application/modules/entreprises/offres_entreprises', main: 'controller'},
        {name: 'module/ajouter_une_offre', location: 'application/modules/ajouter_une_offre', main: 'controller'},
        {name: 'module/ajouter_une_offre_entreprise', location: 'application/modules/entreprises/ajouter_une_offre', main: 'controller'},
        {name: 'module/creer_compte_entreprise', location: 'application/modules/creer_compte_entreprise', main: 'controller'},
        {name: 'module/creer_compte_candidat', location: 'application/modules/creer_compte_candidat', main: 'controller'}
    ]
});

define(
    [
        'application/core/bootstrapper'
    ],
    function ( ) {
    }
);