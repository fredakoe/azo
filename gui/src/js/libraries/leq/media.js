
define(
    [
        'library/leq/base'
    ],
    function ( leq ) {
        leq.media = leq.media || {};

        leq.extend(leq.media, {
            cleanHex: function ( hex ) {
                return hex.replace(/[^A-F0-9]/ig, '');
            },

            expandHex: function ( hex ) {
                hex = leq.media.cleanHex(hex);
                if( !hex ) {
                    return null;
                }
                if( hex.length === 3 ) {
                    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
                }

                return hex.length === 6 ? hex : null;
            },

            /**
             * returns a hex color, without the #!
             * @return {String}
             */
            randomHex: function ( ) {
                return ((1<<24)*(Math.random()+1)|0).toString(16).substr(1);
            },

            hsb2rgb: function ( hsb ) {
                var rgb = {},
                    h = Math.round(hsb.h),
                    s = Math.round(hsb.s*255/100),
                    v = Math.round(hsb.b*255/100);

                if(s === 0) {
                    rgb.r = rgb.g = rgb.b = v;
                } else {
                    var t1 = v,
                        t2 = (255 - s) * v / 255,
                        t3 = (t1 - t2) * (h % 60) / 60;

                    if( h === 360 ) { h = 0; }
                    if( h < 60 ) { rgb.r = t1; rgb.b = t2; rgb.g = t2 + t3; }
                    else if( h < 120 ) {rgb.g = t1; rgb.b = t2; rgb.r = t1 - t3; }
                    else if( h < 180 ) {rgb.g = t1; rgb.r = t2; rgb.b = t2 + t3; }
                    else if( h < 240 ) {rgb.b = t1; rgb.r = t2; rgb.g = t1 - t3; }
                    else if( h < 300 ) {rgb.b = t1; rgb.g = t2; rgb.r = t2 + t3; }
                    else if( h < 360 ) {rgb.r = t1; rgb.g = t2; rgb.b = t1 - t3; }
                    else { rgb.r = 0; rgb.g = 0; rgb.b = 0; }
                }

                return {
                    r: Math.round(rgb.r),
                    g: Math.round(rgb.g),
                    b: Math.round(rgb.b)
                };
            },

            hex2rgb: function ( hex ) {
                hex = parseInt(((hex.indexOf('#') > -1) ? hex.substring(1) : hex), 16);

                return {
                    r: hex >> 16,
                    g: (hex & 0x00FF00) >> 8,
                    b: (hex & 0x0000FF)
                };
            },

            rgb2hex: function ( rgb ) {
                var hex = [
                    rgb.r.toString(16),
                    rgb.g.toString(16),
                    rgb.b.toString(16)
                ];

                leq.each(hex, function ( val, nr ) {
                    if (val.length === 1) {
                        hex[nr] = '0' + val;
                    }
                });

                return hex.join('');
            },

            rgb2hsb: function ( rgb ) {
                var hsb = { h: 0, s: 0, b: 0 },
                    min = Math.min(rgb.r, rgb.g, rgb.b),
                    max = Math.max(rgb.r, rgb.g, rgb.b),
                    delta = max - min;

                hsb.b = max;
                hsb.s = max !== 0 ? 255 * delta / max : 0;
                if( hsb.s !== 0 ) {
                    if( rgb.r === max ) {
                        hsb.h = (rgb.g - rgb.b) / delta;
                    } else if( rgb.g === max ) {
                        hsb.h = 2 + (rgb.b - rgb.r) / delta;
                    } else {
                        hsb.h = 4 + (rgb.r - rgb.g) / delta;
                    }
                } else {
                    hsb.h = -1;
                }
                hsb.h *= 60;
                if( hsb.h < 0 ) {
                    hsb.h += 360;
                }
                hsb.s *= 100/255;
                hsb.b *= 100/255;

                return hsb;
            },

            hex2hsb: function ( hex ) {
                var self = this,
                    hsb = self.rgb2hsb(self.hex2rgb(hex));

                // Zero out hue marker for black, white, and grays (saturation === 0)
                if( hsb.s === 0 ) {
                    hsb.h = 360;
                }
                return hsb;
            },

            hsb2hex: function ( hsb ) {
                var self = this;

                return self.rgb2hex(self.hsb2rgb(hsb));
            },

            /**
             * returns the contrast of the given hex color (white or black)
             * @param hexcolor
             * @return {String}
             */
            getContrastYIQ: function ( hexcolor ){
                var self = this,
                    hex = self.hex2rgb(hexcolor),
                    yiq = ((hex.r * 299) + (hex.g * 587) + (hex.b * 114)) / 1000;

                return (yiq >= 128) ? '#000000' : '#FFFFFF';
            }
        });
    }
);