
define(
    [
        'jquery',
        'leq'
    ],
    function ( $, leq ) {
        /**
         * Classical View
         */
        var View = leq.Class.extend({
            initialize: function ( options ) {
                var self = this;

                self.options = leq.extend({}, self.options, options);

                if (!self.options.target) {
                    throw new Error('Target not specified!');
                }
                if (!self.options.template) {
                    throw new Error('Template not specified!');
                }
                if (!self.options.templateId) {
                    throw new Error('Template Id not specified!');
                }
                if (!self.options.viewModel) {
                    throw new Error('ViewModel not specified!');
                }
                if (self.options.insertionMethod !== 'append' && self.options.insertionMethod !== 'prepend' &&
                    self.options.insertionMethod !== 'html') {
                    throw new Error('Invalid insertion method!');
                }

                leq.pubsub.subscribe('application.resize', self, self.resize);

                // Compile the template
                self.$template = $(leq.template(self.options.template)(self.options.data));
                self.$element = self.$template.closest(self.options.templateId);

                // Render
                self._render();
                self._applyBindings();
            },

            options: {
                // append, prepend, html
                insertionMethod: 'append',
                data: {}
            },

            getViewModel: function ( ) {
                return this.options.viewModel;
            },

            getTemplateId: function ( ) {
                return this.options.templateId;
            },

            getTarget: function ( ) {
                return this.options.target;
            },

            triggerResize: function ( ) {
                $(window).resize();
            },

            resizeElements: function ( $els, windowHeight ) {
                $els.each(function ( ) {
                    var $this = $(this);
                    $this.css('height', windowHeight - ($this.offset().top + 36));
                });
            },

            resize: leq.noop,

            _render: function ( ) {
                var self = this,
                    $target = $(self.options.target),
                    insertionMethod = self.options.insertionMethod;

                $target[insertionMethod](self.$template);
                $target.data('view', self);
            },

            _applyBindings: function ( ) {
                var self = this;

                leq.data.applyBindings(self.options.viewModel, self.$element[0]);
            }
        });


        /**
         * View inside a Tab
         */
        var TabView = View.extend({
            initialize: function ( options ) {
                var self = this;

                leq.extensions.View.fn.initialize.call(self, leq.extend({}, {insertionMethod: 'html'}, options));
            },

            _render: function ( ) {
                var self = this,
                    $target = $(self.options.target);

                leq.extensions.View.fn._render.call(self);

                // Activate the tab upon rendering
                $target.addClass('active in');
            }
        });


        leq.extend(leq.extensions, {
            TabView: TabView,
            View: View
        });
    }
);