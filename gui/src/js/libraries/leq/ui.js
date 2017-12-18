
define(
    [
        'jquery',
        'library/leq/core'
    ],
    function ( $, leq, undefined ) {
        /**
         * base class for Widget objects.
         * @type {*}
         */
        var Widget = leq.Observable.extend({
            initialize: function ( element, options ) {
                var self = this;

                self.$element = $(element);
                self.element = self.$element[0];
                self.options = leq.extend(true, {}, self.options, options);

                self.$element.data('widget', self);

                leq.Observable.fn.initialize.call(self);
            },

            options: {
            },

            events: [
            ],

            setOptions: function ( options ) {
                var self = this;

                leq.extend(self.options, options);
                return self;
            }
        });

        // { target: ... [, css: {}]
        var BusyIndicator = leq.Class.extend({
            initialize: function ( options ) {
                var self = this;

                self.options = leq.extend(true, {}, self.options, options);

                self._template = leq.template(self.options.template);
                self.$element = $(self._template());
                self.offset = self.options.target.offset();

                self.show();
            },

            options: {
                css: {},
                template:
                    '<div class="busy-indicator">' +
                        '<div class="mask-backdrop">' +
                            '<div class="busy-container">' +
                                '<div class="loading-image"></div>' +
                            '</div>' +
                        '</div>' +
                    '</div>'
            },

            show: function ( ) {
                var self = this,
                    target = self.options.target;

                target.prepend(self.$element);
                self.$element.data('resize', $(window).bind('resize.window.busy', function ( ) {
                    self.update.call(self);
                }));

                self.update();
            },

            update: function ( ) {
                var self = this,
                    target = self.options.target;

                self.$element
                    .find('.mask-backdrop')
                    .css(leq.extend({}, {
                        top: target[0].scrollHeight > target.innerHeight() ?
                            target.scrollTop() :
                            self.offset.top,
                        left: target.scrollWidth > target.innerWidth() ?
                            target.scrollLeft() :
                            self.offset.left,
                        width: target.width(),
                        height: target.height()
                    },
                    self.options.css));
            },

            destroy: function ( ) {
                var self = this;

                $(window).unbind('window.busy');
                self.$element.remove();
            }
        });

        leq.ui = leq.ui || {};

        leq.extend(leq.ui, {
            Widget: Widget,

            busy: function ( target, show, css ) {
                target = $(target);

                var $busyIndicator = target.data('busyIndicator');

                if (show) {
                    if (!$busyIndicator) {
                        $busyIndicator = new BusyIndicator({
                            target: target,
                            css: css
                        });

                        target.data('busyIndicator', $busyIndicator);
                    }
                } else {
                    if ($busyIndicator) {
                        $busyIndicator.destroy();
                        target.removeData('busyIndicator');
                    }
                }
            },

            registerWidget: function ( Wdg ) {
                var name = Wdg.fn.options.name;

                if (name === undefined) {
                    throw new Error('Unknown Widget');
                }

                // Keep in leq.ui
                leq.ui[name] = Wdg;

                // create a new jQuery instanciator
                name = name.toLowerCase();
                $.fn[name] = function ( option ) {
                    var args = leq.slice( arguments, 1 );

                    return this.each(function ( ) {
                        var $el = $(this),
                            wdg = $el.data(name),
                            options = typeof option === leq.OBJECT && option;

                        if (!wdg) {
                            $el.data(name, (wdg = new Wdg(this, options)));
                        }

                        if (typeof option === leq.STRING) {
                            wdg[option].apply(wdg, args);
                        }
                    });
                };
            }
        });
    }
);