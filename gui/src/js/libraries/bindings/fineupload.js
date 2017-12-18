define(
    [
        'jquery',
        'leq',
        'fine'
    ],
    function ( $, leq, fine) {

        leq.data.bindingHandlers.contractuploader = {
            init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                var observable = valueAccessor();
                $(element).fineUploader({
                    request: {
                        endpoint: '/azo14/includes/offres/',
                        params: observable,
                        validation: {
                            allowedExtensions: ['doc', 'docx', 'pdf']
                        },
                        callbacks: {
                            onSuccess: function (data) {
                            },
                            onError: function (id, name, reason, xhr) {
                                toastr.error(reason);
                            }
                        }
                    },
                    button: $(".my-custom-class")
                }).on('complete', function (event, id, fileName, responseJSON) {
                    if (responseJSON.success) {

                    }
                });
            },
            update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                // This will be called once when the binding is first applied to an element,
                // and again whenever the associated observable changes value.
                // Update the DOM element based on the supplied values here.
            }
        };
    }
);
