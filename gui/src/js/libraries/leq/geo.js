
define(
    [
        'library/leq/core'
    ],
    function ( leq ) {
        leq.geo = leq.geo || {};

        var RMAJOR = 6378137.0,             // Ellipsoid Equatorial Radius (WGS84)
            RMINOR = 6356752.314245179,     // Ellipsoid Equatorial Radius (WGS84)
            F = 298.257223563,              // Flattening, 1/f = (a-b)/a , a=RMAJOR, b=RMINOR
            RADII = RMINOR / RMAJOR,
            ECCENT = Math.sqrt(1.0 - (RADII * RADII));

        function projphi2 ( ts, e ) {
            var N_ITER = 15,
                HALFPI = Math.PI / 2,
                TOL = 0.0000000001,
                eccnth = 0.5 * e,
                phi = HALFPI - 2.0 * Math.atan(ts),
                i = N_ITER,
                con,
                dphi;

            do
            {
                con = e * Math.sin(phi);
                dphi = HALFPI - 2.0 * Math.atan(ts * Math.pow((1.0 - con) / (1.0 + con), eccnth)) - phi;
                phi += dphi;
            }
            while (Math.abs(dphi) > TOL && --i);

            return phi;
        }

        leq.extend(leq.geo, {
            latLonToSphericalMercator: function ( lat, lon ) {
                var x = RMAJOR * leq.math.deg2rad(lon),
                    y = RMAJOR * Math.log((Math.sin(lat) + 1) / Math.cos(lat));

                return leq.math.Point.create(x, y);
            },

            sphericalMercatorToLatLon: function ( x, y ) {
                var lon = leq.math.rad2deg(x / RMAJOR),
                    lat = 180 / Math.PI * Math.log(Math.tan(Math.PI / 4 + y * (Math.PI / 180) * 0.5));

                return leq.math.Point.create(lon, lat);
            },

            latLonToEllipticalMercator: function ( lat, lon ) {
                if (lat > 89.5) {
                    lat = 89.5;
                }
                if (lat < -89.5) {
                    lat = -89.5;
                }

                var x = RMAJOR * leq.math.deg2rad(lon),
                    phi = leq.math.deg2rad(lat),
                    sinphi = Math.sin(phi),
                    con = ECCENT * sinphi,
                    com = 0.5 * ECCENT,
                    con2 = Math.pow((1.0-con)/(1.0+con), com),
                    ts = Math.tan(0.5 * (Math.PI * 0.5 - phi)) / con2,
                    y = 0 - RMAJOR * Math.log(ts);

                return {
                    'x': +x,
                    'y': +y
                };
            },

            ellipticalMercatorToLatLon: function ( x, y ) {
                var lon = leq.math.rad2deg(x / RMAJOR),
                    lat = leq.math.rad2deg(projphi2(Math.exp(0 - (y / RMAJOR)), ECCENT));

                return {
                    'lon': +lon,
                    'lat': +lat
                };
            },

            getCurrentPosition: function ( success, error ) {
                if (leq.support.features.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        success,
                        error,
                        {
                            timeout: (5 * 1000),
                            maximumAge: (1000 * 60 * 15),
                            enableHighAccuracy: true
                        }
                    );
                }
            }
        });
    }
);