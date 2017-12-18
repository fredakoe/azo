/*
    minicolorpicker v1.0.0
    Usage:
        $('selector').minicolorpicker({
            color: '#ffffff',
            change: function ( hex, rgb ) { ... },
            commit: function ( hex, rgb ) { ... }
        });
*/

define(
    [
        'jquery',
        'leq'
    ],
    function ( $, leq ) {
        var MiniColorPicker = leq.ui.Widget.extend({
            initialize: function ( element, options ) {
                var self = this;

                leq.ui.Widget.fn.initialize.call(self, element, options);

                self.$element.addClass('minicolorpicker');
                self.$element
                    .data('hsb', leq.media.hex2hsb(self.options.color))
                    .data('change', self.options.change)
                    .data('commit', self.options.commit);

                self.options.disabled && self.$element.attr('disabled', 'disabled');

                self.$element
                    .on('click.minicolorpicker', leq.proxy(self.show, self))
                    .on('blur.minicolorpicker', leq.proxy(self.hide, self));
            },

            options: {
                name: 'MiniColorPicker',
                color: '#FFFFFF',
                disabled: false,
                change: leq.noop,
                commit: leq.noop
            },

            show: function ( ) {
                var self = this,
                    $selector = $('<div class="minicolorpicker-selector"></div>'),
                    colorPosition = self.$element.data('colorposition'),
                    huePosition = self.$element.data('hueposition');

                // Hide all instances
                $('.minicolorpicker').minicolorpicker('hide');

                // Create the selector
                $selector
                    .append('<div class="minicolorpicker-colors" style="background-color: #FFF;"><div class="minicolorpicker-colorpicker"></div></div>')
                    .append('<div class="minicolorpicker-hues"><div class="minicolorpicker-huepicker"></div></div>')
                    .css({
                        top: self.$element.offset().top + self.$element.outerHeight(),
                        left: self.$element.offset().left,
                        display: 'none'
                    });

                // Set background for colors
                var hsb = self.$element.data('hsb');
                $selector
                    .find('.minicolorpicker-colors')
                    .css('backgroundColor', '#' + leq.media.hsb2hex({ h: hsb.h, s: 100, b: 100 }));

                // Set colorPicker position
                colorPosition = colorPosition || self.getColorPositionFromHSB(hsb);
                $selector
                    .find('.minicolorpicker-colorpicker')
                    .css('top', colorPosition.y + 'px')
                    .css('left', colorPosition.x + 'px');

                // Set huepicker position
                huePosition = huePosition || self.getHuePositionFromHSB(hsb);
                $selector
                    .find('.minicolorpicker-huepicker')
                    .css('top', huePosition.y + 'px');

                // Set input data
                self.$element
                    .data('selector', $selector)
                    .data('huepicker', $selector.find('.minicolorpicker-huepicker'))
                    .data('colorpicker', $selector.find('.minicolorpicker-colorpicker'))
                    .data('mousebutton', 0);

                $('body').append($selector);
                $selector.fadeIn(100);

                // Prevent text selection in IE
                $selector.on('selectstart', function ( ) { return false; });

                $(document).bind('mousedown.minicolorpicker touchstart.minicolorpicker', function ( event ) {
                    self.$element.data('mousebutton', 1);

                    if ($(event.target).parents().andSelf().hasClass('minicolorpicker-colors')) {
                        event.preventDefault();
                        self.$element.data('moving', 'colors');
                        self._moveColor(event);
                    }

                    if ($(event.target).parents().andSelf().hasClass('minicolorpicker-hues')) {
                        event.preventDefault();
                        self.$element.data('moving', 'hues');
                        self._moveHue(event);
                    }

                    if ($(event.target).parents().andSelf().hasClass('minicolorpicker-selector')) {
                        event.preventDefault();
                        return;
                    }

                    if ($(event.target).parents().andSelf().hasClass('minicolorpicker')) {
                        return;
                    }

                    self.hide.call(self);
                });

                $(document)
                    .bind('mouseup.minicolorpicker touchend.minicolorpicker', function(event) {
                        event.preventDefault();
                        self.$element
                            .data('mousebutton', 0)
                            .removeData('moving');
                    })
                    .bind('mousemove.minicolorpicker touchmove.minicolorpicker', function(event) {
                        event.preventDefault();
                        if ( self.$element.data('mousebutton') === 1 ) {
                            if ( self.$element.data('moving') === 'colors' ) {
                                self._moveColor.call(self, event);
                            }
                            if ( self.$element.data('moving') === 'hues' ) {
                                self._moveHue.call(self, event);
                            }
                        }
                    });

                return self;
            },

            hide: function ( ) {
                var self = this,
                    $selector = self.$element.data('selector'),
                    callback = self.$element.data('commit');

                if ($selector) {
                    self.$element.removeData('selector');
                    $selector.fadeOut(100, function ( ) {
                        $selector.remove();
                    });

                    // Fire commit callback
                    if (callback) {
                        var hsb = self.$element.data('hsb');

                        callback.call(self.$element.get(0), '#' + leq.media.hsb2hex(hsb), leq.media.hsb2rgb(hsb));
                    }
                }

                $(document).unbind('.minicolorpicker');

                return self;
            },

            _moveColor: function ( event ) {
                var self = this,
                    colorPicker = self.$element.data('colorpicker');

                colorPicker.hide();

                var position = {
                    x: event.pageX,
                    y: event.pageY
                };

                // Touch support
                if( event.originalEvent.changedTouches ) {
                    position.x = event.originalEvent.changedTouches[0].pageX;
                    position.y = event.originalEvent.changedTouches[0].pageY;
                }
                position.x = position.x - self.$element.data('selector').find('.minicolorpicker-colors').offset().left - 5;
                position.y = position.y - self.$element.data('selector').find('.minicolorpicker-colors').offset().top - 5;

                if( position.x <= -5 ) position.x = -5;
                if( position.x >= 144 ) position.x = 144;
                if( position.y <= -5 ) position.y = -5;
                if( position.y >= 144 ) position.y = 144;

                self.$element.data('colorposition', position);
                colorPicker.css('left', position.x).css('top', position.y).show();

                // Calculate saturation
                var s = Math.round((position.x + 5) * 0.67);
                if( s < 0 ) s = 0;
                if( s > 100 ) s = 100;

                // Calculate brightness
                var b = 100 - Math.round((position.y + 5) * 0.67);
                if( b < 0 ) b = 0;
                if( b > 100 ) b = 100;

                // Update HSB values
                var hsb = self.$element.data('hsb');
                hsb.s = s;
                hsb.b = b;

                // Set color
                self.setColor.call(self, leq.media.hsb2hex(hsb));
            },

            _moveHue: function ( event ) {
                var self = this,
                    huePicker = self.$element.data('huepicker');

                huePicker.hide();

                var position = {
                    y: event.pageY
                };

                // Touch support
                if( event.originalEvent.changedTouches ) {
                    position.y = event.originalEvent.changedTouches[0].pageY;
                }

                position.y = position.y - self.$element.data('selector').find('.minicolorpicker-colors').offset().top - 1;
                if( position.y <= -1 ) position.y = -1;
                if( position.y >= 149 ) position.y = 149;

                self.$element.data('hueposition', position);
                huePicker.css('top', position.y).show();

                // Calculate hue
                var h = Math.round((150 - position.y - 1) * 2.4);
                if( h < 0 ) h = 0;
                if( h > 360 ) h = 360;

                // Update HSB values
                var hsb = self.$element.data('hsb');
                hsb.h = h;

                // Set color
                self.setColor.call(self, leq.media.hsb2hex(hsb));
            },

            setColor: function ( hex ) {
                var self = this,
                    hsb = leq.media.hex2hsb(hex),
                    callback = self.$element.data('change');

                self.$element.data('hsb', hsb);

                if (self.$element.data('selector')) {
                    self.$element
                        .data('selector')
                        .find('.minicolorpicker-colors')
                        .css('backgroundColor', '#' + leq.media.hsb2hex({ h: hsb.h, s: 100, b: 100 }));
                }

                // Fire change callback
                if (callback) {
                    if (hex === self.$element.data('lastchange')) {
                        return;
                    }

                    callback.call(self.$element.get(0), '#' + hex, leq.media.hsb2rgb(hsb));

                    self.$element.data('lastchange', hex);
                }

                return self;
            },

            // Utilities

            getColorPositionFromHSB: function ( hsb ) {
                var x = Math.ceil(hsb.s / 0.67),
                    y = 150 - Math.ceil(hsb.b / 0.67);

                if( x < 0 ) x = 0;
                if( x > 150 ) x = 150;

                if( y < 0 ) y = 0;
                if( y > 150 ) y = 150;

                return { x: x - 5, y: y - 5 };
            },

            getHuePositionFromHSB: function ( hsb ) {
                var y = 150 - (hsb.h / 2.4);
                if( y < 0 ) h = 0;
                if( y > 150 ) h = 150;

                return { y: y - 1 };
            }
        });

        // Register the Widget
        leq.ui.registerWidget(MiniColorPicker);
});