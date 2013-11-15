(function () {
    'use strict';

    var app = angular.module('ngRentalService');

    app.service('MapService', ['$http', '$templateCache', '$interpolate', 'Common',
        function ($http, $templateCache, $interpolate, Common) {
            var service = {};

            var geocoder;
            var map;
            var myMarkers = [];
            var google = window.google;
            var geoCache = {};
            var defaultAnimation = google.maps.Animation.DROP;

            bindEvents();

            service.initMap = function (mapId, options) {
                map = new google.maps.Map(document.getElementById(mapId), options);
            };

            service.clearMap = function () {
                service.closeInfoWindows();
                angular.forEach(myMarkers, function (marker, key) {
                    marker.setMap(null);
                });
                myMarkers = [];
            };

            service.panTo = function (latLng) {
                map.panTo(latLng);
            };

            service.offsetMap = function (options) {
                if (options.offsetRight) {
                    Common.$timeout(function () {
                        map.panBy((-1 * options.offsetRight), 0);
                    }, 0);
                } else if (options.offsetLeft) {
                    Common.$timeout(function () {
                        map.panBy(options.offsetLeft, 0);
                    }, 0);
                } else if (options.offsetTop) {
                    Common.$timeout(function () {
                        map.panBy(0, (-1 * options.offsetTop));
                    }, 0);
                } else if (options.offsetBottom) {
                    Common.$timeout(function () {
                        map.panBy(0, options.offsetBottom);
                    }, 0);
                }
            };

            service.convertToGoogleLatLng = function (lat, lng) {
                return new google.maps.LatLng(lat, lng);
            };

            service.geocodeAddress = function (address) {
                var deferred = Common.$q.defer();

                if (geoCache[address]) {
                    deferred.resolve(geoCache[address]);
                }
                else {
                    if (angular.isUndefined(geocoder)) {
                        geocoder = new google.maps.Geocoder();
                    }

                    geocoder.geocode({
                        'address': address
                    }, geocodeCallback);
                }

                function geocodeCallback(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
                            if (results && results[0] && results[0].geometry && results[0].geometry.viewport) {
                                geoCache[address] = results[0].geometry.location;
                                deferred.resolve(geoCache[address]);
                            }
                        }
                        else {
                            deferred.reject("No results found");
                        }
                    }
                    else {
                        deferred.reject("Geocode was not successful for the following reason: " + status);
                    }
                };

                return deferred.promise;
            };

            service.createMarker = function (googleLatLng, icon, animation) {
                var optMap = {
                    map: map,
                    position: googleLatLng
                };
                if (icon)
                    optMap.icon = icon;

                if (animation)
                    optMap.animation = animation;

                var marker = new google.maps.Marker(optMap);

                return marker;
            };

            service.plot = function (point, model, options) {
                if (options.clearPrevious)
                    service.clearMap();

                var marker = service.createMarker(point, null, google.maps.Animation.DROP);

                if (options.infoBoxTemplate && model)
                    createInfoBox(marker, options, model);

                myMarkers.push(marker);
            };

            service.plotPoints = function (points, options) {
                if (options.clearPrevious)
                    service.clearMap();

                angular.forEach(points, function (value) {
                    var marker = service.createMarker(value[0], null, google.maps.Animation.DROP);

                    if (options.infoBoxTemplate && value[1])
                        createInfoBox(marker, options, value[1]);

                    myMarkers.push(marker);
                });

                fitMarkerBoundsDebounced();
            };
            
            service.getMarkerModels = function(markers){
                return _.map(myMarkers, function(marker){return marker.model});                
            }

            service.openMarkerInfo = function (fnFindMarker) {
                if (!myMarkers.length)
                    return;

                var currentMarker = myMarkers.filter(function (marker) {
                    return fnFindMarker(marker);
                });

                if (currentMarker.length == 0)
                    return;

                service.closeInfoWindows();
                service.panTo(currentMarker[0].getPosition());
                currentMarker[0].InfoBox.open(map, currentMarker[0]);
            };

            service.closeInfoWindows = function () {
                angular.forEach(myMarkers, function (marker, key) {
                    if (marker.InfoBox)
                        marker.InfoBox.close();
                });
            };

            service.createPolygon = function (points) {
                var invisColor = "#000000";
                var outlineColor = "#0ABA02";

                points = points.map(function (latLong) {
                    return new google.maps.LatLng(latLong[0], latLong[1]);
                }); // Construct the polygon
                var polygon = new google.maps.Polygon({
                    paths: points,
                    strokeColor: outlineColor,
                    strokeOpacity: 1,
                    strokeWeight: 2,
                    fillColor: invisColor,
                    fillOpacity: 0.1
                });

                polygon.setMap(map);
            };

            service.convertPlaceResultToPlace = function (placeResult) {
                var place = {
                    streetNumber: find('street_number'),
                    route: find('route'),
                    locality: find('locality'),
                    state: find('administrative_area_level_1'),
                    country: find('country'),
                    postalCode: find('postal_code')
                };

                return place;

                function find(typeName) {
                    var found = _.find(placeResult.address_components, function(val) {
                        return val.types.indexOf(typeName) > -1;
                    });
                    
                    return (found) ? found.long_name : '';
                }
            };

            function createInfoBox(marker, options, model) {

                $http.get(options.infoBoxTemplate, {
                    cache: $templateCache
                }).success(function (tplContent) {
                    var compiledTemplate = $interpolate(tplContent)(model);

                    var offSet = (options.width) ? -1 * (options.width / 2) : -140;

                    var myOptions = {
                        content: compiledTemplate,
                        disableAutoPan: false,
                        maxWidth: 0,
                        pixelOffset: new google.maps.Size(offSet, 0),
                        zIndex: null,
                        boxStyle: {
                            width: (options.width) ? options.width + 'px' : "280px"
                        },
                        closeBoxMargin: "5px 5px 5px 0",
                        closeBoxURL: options.closeImageUrl || "http://cdn1.iconfinder.com/data/icons/mimiGlyphs/16/close_delete.png",
                        infoBoxClearance: new google.maps.Size(1, 1),
                        isHidden: false,
                        pane: "floatPane",
                        enableEventPropagation: false
                    };
                    // end example code for custom infobox
                    var ib = new InfoBox(myOptions);

                    marker.InfoBox = ib;

                    marker.model = model;

                    google.maps.event.addListener(marker, "click", function (e) {
                        service.closeInfoWindows();
                        ib.open(map, this);
                    });
                });
            }

            var fitMarkerBoundsDebounced = _.debounce(fitMarkerBounds, 250);

            function fitMarkerBounds() {
                var latlngbounds = new google.maps.LatLngBounds();
                for (var i = 0; i < myMarkers.length; i++) {
                    latlngbounds.extend(myMarkers[i].getPosition());
                }
                map.fitBounds(latlngbounds);
            }

            function bindEvents() {
                Common.$on(Common.events.PANEL_OPEN, function() {
                    service.closeInfoWindows();
                });
            }

            return service;
        }
    ]);
})()