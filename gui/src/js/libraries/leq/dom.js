
define(
    [
        'library/leq/core'
    ],
    function ( leq ) {
        leq.dom = leq.dom || {};

        var events = {
            DRAGSTART: 'dragstart',
            DRAGMOVE: 'dragmove',
            DRAGEND: 'dragend',
            HOLD: 'hold',
            TRANSFORMSTART: 'transformstart',
            TRANSFORM: 'transform',  // pinch zoom and rotation
            TRANSFORMEND: 'transformend'
        };

        if (!leq.support.features.touch) {
            // mouse events
            leq.extend(events, {
                MOUSEDOWN: 'mousedown',
                MOUSEMOVE: 'mousemove',
                MOUSEUP: 'mouseup',
                CANCEL: 'mouseup',
                CLICK: 'click',
                DBLCLICK: 'dblclick',
                SCROLL: 'scroll',

                MOUSEOVER: 'mouseover',
                MOUSEOUT: 'mouseout',
                MOUSEWHEEL: 'mousewheel',
                MOZMOUSEWHEEL: 'DOMMouseScroll'
            });
        }
        else {
            // touch events
            leq.extend(events, {
                MOUSEDOWN: 'touchstart',
                MOUSEMOVE: 'touchmove',
                MOUSEUP: 'touchend',
                CANCEL: 'touchcancel',
                CLICK: 'tap',
                DBLCLICK: 'dbltap',
                SCROLL: 'touchmove'
            });
        }

        function getPositionEvent ( event ) {
            var posX = event.pageX || event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft,
                posY = event.pageY || event.clientY + document.body.scrollTop + document.documentElement.scrollTop;

            return leq.math.Point.create(posX, posY);
        }

        function getOffsetPositionEvent ( element, event ) {
            var point = getPositionEvent(event),
                offsetX = 0,
                offsetY = 0;

            if (event.offsetX !== undefined && event.offsetY !== undefined) {
                point.x = event.offsetX;
                point.y = event.offsetY;
            }
            else {
                do {
                    offsetX += element.offsetLeft;
                    offsetY += element.offsetTop;
                } while ((element = element.offsetParent));

                point = point.substract(offsetX, offsetY);
            }

            return point;
        }

        leq.extend(leq.dom, {
            events: events,

            on: function ( element, events, callback ) {
                events = leq.toArray(events);

                leq.each(events, function ( event ) {
                    if (element.addEventListener) {
                        element.addEventListener(event, callback, false);
                    }

                    else if (element.attachEvent) {
                        element.attachEvent('on' + event, callback);
                    }
                });
            },

            off: function ( element, events, callback ) {
                events = leq.toArray(events);

                leq.each(events, function ( event ) {
                    if (element.removeEventListener) {
                        element.removeEventListener(event, callback, false);
                    }

                    else if (element.detachEvent) {
                        element.detachEvent('on' + event, callback);
                    }
                });
            },

            /**
             * cancel an event
             * @param event
             */
            cancelEvent: function ( event ) {
                if (event.preventDefault && event.stopPropagation){
                    event.preventDefault();
                    event.stopPropagation();
                }

                else {
                    event.returnValue = false;
                    event.cancelBubble = true;
                }
            },

            getPositionFromEvent: function ( event, relative ) {
                var element = event.srcElement;

                // mouse
                if (!leq.support.features.touch) {
                    return [
                        relative ? getPositionEvent(event) : getOffsetPositionEvent(element, event)
                    ];
                }

                // multitouch
                else {
                    var pos = [],
                        src,
                        touches = event.touches.length > 0 ?
                            event.touches :
                            event.changedTouches;

                    for (var t = 0, l = touches.length; t < l; t++) {
                        src = touches[t];
                        pos.push(relative ? getPositionEvent(src) : getOffsetPositionEvent(element, src));
                    }

                    return pos;
                }
            },

            getElementById: function ( id ) {
                return document.getElementById(id);
            }
        });


        /**
         * angle to direction
         * @param  float    angle
         * @return string   direction
         */
        function getDirectionFromAngle ( angle ) {
            var directions = {
                down: angle >= 45 && angle < 135,       // 90
                left: angle >= 135 || angle <= -135,    // 180
                up: angle < -45 && angle > -135,        // 270
                right: angle >= -45 && angle <= 45      // 0
            };

            var direction, key;
            for (key in directions) {
                if (directions[key]){
                    direction = key;
                    break;
                }
            }

            return direction;
        }

        /**
         * count the number of fingers in the event
         * when no fingers are detected, one finger is returned (mouse pointer)
         * @param  event
         * @return int  fingers
         */
        function countFingers ( event ) {
            // there is a bug on android (until v4?) that touches is always 1,
            // so no multitouch is supported, e.g. no pinch zoom and rotation...
            return event.touches ? event.touches.length : 1;
        }

        /**
         * calculate the scale size between two fingers
         * @param fingersStart
         * @param fingersMove
         * @return {Number}
         */
        function calculateScale ( fingersStart, fingersMove ) {
            if (fingersStart.length === 2 && fingersMove.length === 2) {
                var x,
                    y,
                    startDistance,
                    endDistance;

                x = fingersStart[0].x - fingersStart[1].x;
                y = fingersStart[0].y - fingersStart[1].y;
                startDistance = Math.sqrt((x * x) + (y * y));

                x = fingersMove[0].x - fingersMove[1].x;
                y = fingersMove[0].y - fingersMove[1].y;
                endDistance = Math.sqrt((x * x) + (y * y));

                return endDistance / startDistance;
            }

            return 1.0;
        }

        /**
         * calculate the rotation degrees between two fingers
         * @param fingersStart
         * @param fingersMove
         * @return {Number}
         */
        function calculateRotation ( fingersStart, fingersMove ) {
            if (fingersStart.length === 2 && fingersMove.length === 2) {
                var x,
                    y,
                    startRotation,
                    endRotation;

                x = fingersStart[0].x - fingersStart[1].x;
                y = fingersStart[0].y - fingersStart[1].y;
                startRotation = Math.atan2(y, x) * 180 / Math.PI;

                x = fingersMove[0].x - fingersMove[1].x;
                y = fingersMove[0].y - fingersMove[1].y;
                endRotation = Math.atan2(y, x) * 180 / Math.PI;

                return endRotation / startRotation;
            }

            return 0;
        }

        /**
         * borrowed from jquery offset https://github.com/jquery/jquery/blob/master/src/offset.js
         * @param element
         */
        function calculateElementOffset ( element ) {
            var box = element.getBoundingClientRect(),
                clientTop  = element.clientTop  || document.body.clientTop  || 0,
                clientLeft = element.clientLeft || document.body.clientLeft || 0,
                scrollTop  = window.pageYOffset || element.scrollTop  || document.body.scrollTop,
                scrollLeft = window.pageXOffset || element.scrollLeft || document.body.scrollLeft;

            return {
                top: box.top + scrollTop - clientTop,
                left: box.left + scrollLeft - clientLeft
            };
        }

        /**
         * event handler
         * @type {*}
         */
        var EventHandler = leq.Observable.extend({
            initialize: function ( element, options ) {
                var self = this;

                self.options = leq.extend(true, {}, self.options, options);

                leq.Observable.fn.initialize.call(self, options);

                if (leq.isString(element)) {
                    element = leq.dom.getElementById(element);
                }

                self.element = element;
                self._reset.call(self);

                // mouse and touch events
                leq.dom.on(
                    self.element,
                    leq.dom.events.MOUSEDOWN,
                    leq.proxy(self._onMouseDown, self)
                );
                leq.dom.on(
                    self.element,
                    leq.dom.events.MOUSEMOVE,
                    leq.proxy(self._onMouseMove, self)
                );
                leq.dom.on(
                    self.element,
                    [leq.dom.events.MOUSEUP, leq.dom.events.CANCEL],
                    leq.proxy(self._onMouseUp, self)
                );
                leq.dom.on(
                    self.element,
                    leq.dom.events.DBLCLICK,
                    leq.proxy(self._onMouseDoubleClick, self)
                );
                leq.dom.on(
                    self.element,
                    leq.dom.events.SCROLL,
                    leq.proxy(self._onScroll, self)
                );

                // mouse only events
                if (!leq.support.features.touch) {
                    leq.dom.on(
                        self.element,
                        leq.dom.events.MOUSEOVER,
                        leq.proxy(self._onMouseOver, self)
                    );
                    leq.dom.on(
                        self.element,
                        leq.dom.events.MOUSEOUT,
                        leq.proxy(self._onMouseOut, self)
                    );
                    leq.dom.on(
                        self.element,
                        [leq.dom.events.MOUSEWHEEL, leq.dom.events.MOZMOUSEWHEEL],
                        leq.proxy(self._onMouseWheel, self)
                    );
                }
            },

            options: {
                /**
                 * minimum distance (px) before the drag event starts
                 */
                dragTreshold: 5,

                /**
                 * minimum scale before the scale event starts
                 */
                scaleTreshold: 0.1,

                /**
                 * minimum degrees before the rotation event starts
                 */
                rotationTreshold: 5,

                /**
                 * time limit (ms) before the hold event starts
                 */
                holdTreshold: 500
            },

            events: [
                leq.dom.events.MOUSEDOWN,
                leq.dom.events.MOUSEMOVE,
                leq.dom.events.MOUSEUP,
                leq.dom.events.CLICK,
                leq.dom.events.DBLCLICK,
                leq.dom.events.SCROLL,

                leq.dom.events.MOUSEOVER,
                leq.dom.events.MOUSEOUT,
                leq.dom.events.MOUSEWHEEL,

                leq.dom.events.DRAGSTART,
                leq.dom.events.DRAGMOVE,
                leq.dom.events.DRAGEND,
                leq.dom.events.HOLD,
                leq.dom.events.TRANSFORMSTART,
                leq.dom.events.TRANSFORM,
                leq.dom.events.TRANSFORMEND
            ],

            _reset: function ( ) {
                var self = this;

                self.fingers = 1;
                self.distance = 0;
                self.angle = 0;
                self.direction = 0;
                self.startTime = 0;
                self.startEvent = null;
                self.startPosition = [];
                self.moveEvent = null;
                self.movePosition = [];
                self.endEvent = null;
                self.endPosition = [];
                self.offset = {top: 0, left: 0};

                self.mouseDown = false;
                self.dragging = false;
                self.transforming = false;
                self.held = false;

                self.holdTimer = null;
            },

            _onMouseDown: function ( event ) {
                var self = this;

                self.mouseDown = true;
                self.fingers = countFingers(event);
                self.startTime = new Date().getTime();
                self.startEvent = event;
                self.startPosition = leq.dom.getPositionFromEvent(event);
                self.offset = calculateElementOffset(self.element);

                // initiate hold gesture
                self._doHold.call(self);

                if (leq.support.features.touch) {
                    leq.dom.cancelEvent(event);
                }

                self.trigger(leq.dom.events.MOUSEDOWN, {
                    type: leq.dom.events.MOUSEDOWN,
                    originalEvent: event,
                    fingers: self.fingers,
                    position: self.startPosition
                });
            },

            _onMouseMove: function ( event ) {
                var self = this;

                self.moveEvent = event;
                self.movePosition = leq.dom.getPositionFromEvent(event);

                if (self.mouseDown) {
                    if (!self._doDrag(event)) {
                        self._doTransform(event);
                    }
                }

                else {
                    self.dragging = false;

                    // only trigger mousemove/touchmove when mousedown if false
                    self.trigger(leq.dom.events.MOUSEMOVE, {
                        type: leq.dom.events.MOUSEMOVE,
                        originalEvent: event,
                        fingers: self.fingers,
                        position: self.movePosition
                    });
                }

                if (leq.support.features.touch) {
                    leq.dom.cancelEvent(event);
                }
            },

            _onMouseUp: function ( event ) {
                var self = this,
                    held = self.held;

                // cancel hold gesture
                self._cancelHold.call(self);

                self.endEvent = event;
                self.endPosition = leq.dom.getPositionFromEvent(event);

                if (self.dragging) {
                    self._doDrag(event, true);
                }

                else if (self.transforming) {
                    self._doTransform(event, true);
                }

                else {
                    self.trigger(leq.dom.events.MOUSEUP, {
                        type: leq.dom.events.MOUSEUP,
                        originalEvent: event,
                        fingers: self.fingers,
                        position: self.endPosition
                    });

                    if (!held) {
                        self.trigger(leq.dom.events.CLICK, {
                            type: leq.dom.events.CLICK,
                            originalEvent: event,
                            position: self.endPosition[0]
                        });
                    }
                }

                if (leq.support.features.touch) {
                    leq.dom.cancelEvent(event);
                }

                self._reset.call(self);
            },

            _onMouseDoubleClick: function ( event ) {
                var self = this;

                self.trigger(leq.dom.events.DBLCLICK, {
                    type: leq.dom.events.DBLCLICK,
                    originalEvent: event,
                    position: leq.dom.getPositionFromEvent(event)[0]
                });
            },

            _onScroll: function ( event ) {
                var self = this;

                self.trigger(leq.dom.events.SCROLL, {
                    type: leq.dom.events.SCROLL,
                    originalEvent: event,
                    position: leq.dom.getPositionFromEvent(event)[0]
                });
            },

            _onMouseOver: function ( event ) {
                var self = this;

                self.trigger(leq.dom.events.MOUSEOVER, {
                    type: leq.dom.events.MOUSEOVER,
                    originalEvent: event,
                    position: leq.dom.getPositionFromEvent(event)[0]
                });
            },

            _onMouseOut: function ( event ) {
                var self = this;

                self.trigger(leq.dom.events.MOUSEOUT, {
                    type: leq.dom.events.MOUSEOUT,
                    originalEvent: event,
                    position: leq.dom.getPositionFromEvent(event)[0]
                });
            },

            _onMouseWheel: function ( event ) {
                var self = this,
                    wheel = event.wheelDelta ?
                        event.wheelDelta / 120 :
                        event.detail ?
                            -event.detail / 3 :
                            0;

                self.trigger(leq.dom.events.MOUSEWHEEL, {
                    type: leq.dom.events.MOUSEWHEEL,
                    originalEvent: event,
                    wheel: wheel,
                    position: leq.dom.getPositionFromEvent(event)[0]
                });
            },

            // gestures

            _doHold: function ( event ) {
                var self = this;

                self._cancelHold.call(self);

                self.holdTimer = leq.setTimeout(
                    leq.proxy(self._onHold, self, event),
                    self.options.holdTreshold
                );
            },

            _cancelHold: function ( ) {
                var self = this;

                self.holdTimer && leq.clearTimeout(self.holdTimer);
                self.holdTimer = null;
                self.held = false;
            },

            _onHold: function ( event ) {
                var self = this;

                self.trigger(leq.dom.events.HOLD, {
                    type: leq.dom.events.HOLD,
                    originalEvent: event,
                    position: self.startPosition
                });

                self.held = true;
            },

            _doDrag: function ( event, end ) {
                var self = this;

                if (self.fingers === 1) {
                    var distanceX = self.movePosition[0].x - self.startPosition[0].x,
                        distanceY = self.movePosition[0].y - self.startPosition[0].y,
                        distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY),
                        evt = {
                            originalEvent: event,
                            position: self.movePosition[0],
                            distanceX: distanceX,
                            distanceY: distanceY,
                            distance: distance
                        };

                    if (!self.dragging) {
                        if (distance > self.options.dragTreshold) {
                            self.dragging = true;

                            // cancel hold gesture
                            self._cancelHold.call(self);

                            self.trigger(
                                leq.dom.events.DRAGSTART,
                                leq.extend(evt, {type: leq.dom.events.DRAGSTART})
                            );
                        }
                    }

                    else {
                        if (!end) {
                            self.trigger(
                                leq.dom.events.DRAGMOVE,
                                leq.extend(evt, {type: leq.dom.events.DRAGMOVE})
                            );
                        }

                        else {
                            self.trigger(
                                leq.dom.events.DRAGEND,
                                leq.extend(evt, {type: leq.dom.events.DRAGEND})
                            );
                        }
                    }

                    return true;
                }

                return false;
            },

            _doTransform: function ( event, end ) {
                var self = this,
                    scale = calculateScale(self.startPosition, self.movePosition),
                    rotation = calculateRotation(self.startPosition, self.movePosition),
                    firstTransform = !self.transforming;

                self.transforming = self.transforming ||
                    Math.abs(1.0 - scale) > self.options.scaleTreshold ||
                    Math.abs(rotation) > self.options.rotationTreshold;

                if (self.transforming) {
                    var position = leq.math.Point.create(
                        ((self.movePosition[0].x + self.movePosition[1].x) / 2),
                        ((self.movePosition[0].y + self.movePosition[1].y) / 2)
                    );

                    var evt = {
                        originalEvent: event,
                        position: position,
                        scale: scale,
                        rotation: rotation
                    };

                    if (firstTransform) {
                        // cancel hold gesture
                        self._cancelHold.call(self);

                        self.trigger(
                            leq.dom.events.TRANSFORMSTART,
                            leq.extend(evt, {type: leq.dom.events.TRANSFORMSTART})
                        );
                    }

                    else {
                        if (!end) {
                            self.trigger(
                                leq.dom.events.TRANSFORM,
                                leq.extend(evt, {type: leq.dom.events.TRANSFORM})
                            );
                        }

                        else {
                            self.trigger(
                                leq.dom.events.TRANSFORMEND,
                                leq.extend(evt, {type: leq.dom.events.TRANSFORMEND})
                            );
                        }
                    }

                    return true;
                }

                return false;
            }
        });


        leq.extend(leq.dom, {
            EventHandler: EventHandler
        });
    }
);