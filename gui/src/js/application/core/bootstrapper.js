
define(
    [
        'domReady!',
        'mm',   // module manager

        'bootstrap',
        'extension/extensions',
        'application/core/startup'
    ],
    function ( doc, mm ) {
        mm.start('module/core.modulemanager');
        mm.start('module/core.domeventhandler');
        mm.start('module/core.pubsubeventhandler');
        mm.start('module/core.errorsplash');
        mm.start('module/core.loadingsplash');
        mm.start('module/core.initiator');
    }
);