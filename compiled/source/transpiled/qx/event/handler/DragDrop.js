(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.event.handler.Gesture": {
        "require": true,
        "defer": "runtime"
      },
      "qx.event.handler.Keyboard": {
        "require": true,
        "defer": "runtime"
      },
      "qx.event.handler.Capture": {
        "require": true,
        "defer": "runtime"
      },
      "qx.core.Environment": {
        "defer": "load",
        "usage": "dynamic",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.event.IEventHandler": {
        "require": true
      },
      "qx.core.IDisposable": {
        "require": true
      },
      "qx.event.Registration": {
        "construct": true,
        "defer": "runtime",
        "require": true
      },
      "qx.event.Utils": {},
      "qx.Promise": {},
      "qx.event.type.Drag": {},
      "qx.ui.core.Widget": {},
      "qx.ui.core.DragDropCursor": {},
      "qx.bom.element.Style": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "qx.promise": {
          "load": true
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * Event handler, which supports drag events on DOM elements.
   *
   * NOTE: Instances of this class must be disposed of after use
   *
   * @require(qx.event.handler.Gesture)
   * @require(qx.event.handler.Keyboard)
   * @require(qx.event.handler.Capture)
   */
  qx.Class.define("qx.event.handler.DragDrop", {
    extend: qx.core.Object,
    implement: [qx.event.IEventHandler, qx.core.IDisposable],

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param manager {qx.event.Manager} Event manager for the window to use
     */
    construct: function construct(manager) {
      qx.core.Object.constructor.call(this); // Define shorthands

      this.__manager__P_94_0 = manager;
      this.__root__P_94_1 = manager.getWindow().document.documentElement; // Initialize listener

      this.__manager__P_94_0.addListener(this.__root__P_94_1, "longtap", this._onLongtap, this);

      this.__manager__P_94_0.addListener(this.__root__P_94_1, "pointerdown", this._onPointerdown, this, true);

      qx.event.Registration.addListener(window, "blur", this._onWindowBlur, this); // Initialize data structures

      this.__rebuildStructures__P_94_2();
    },

    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */
    statics: {
      /** @type {Integer} Priority of this handler */
      PRIORITY: qx.event.Registration.PRIORITY_NORMAL,

      /** @type {Map} Supported event types */
      SUPPORTED_TYPES: {
        dragstart: 1,
        dragend: 1,
        dragover: 1,
        dragleave: 1,
        drop: 1,
        drag: 1,
        dragchange: 1,
        droprequest: 1
      },

      /** @type {Integer} Whether the method "canHandleEvent" must be called */
      IGNORE_CAN_HANDLE: true,

      /**
       * Array of strings holding the names of the allowed mouse buttons
       * for Drag & Drop. The default is "left" but could be extended with
       * "middle" or "right"
       */
      ALLOWED_BUTTONS: ["left"],

      /**
       * The distance needed to change the mouse position before a drag session start.
       */
      MIN_DRAG_DISTANCE: 5
    },
    properties: {
      /**
       * Widget instance of the drag & drop cursor. If non is given, the default
       * {@link qx.ui.core.DragDropCursor} will be used.
       */
      cursor: {
        check: "qx.ui.core.Widget",
        nullable: true,
        init: null
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __manager__P_94_0: null,
      __root__P_94_1: null,
      __dropTarget__P_94_3: null,
      __dragTarget__P_94_4: null,
      __types__P_94_5: null,
      __actions__P_94_6: null,
      __keys__P_94_7: null,
      __cache__P_94_8: null,
      __currentType__P_94_9: null,
      __currentAction__P_94_10: null,
      __sessionActive__P_94_11: false,
      __validDrop__P_94_12: false,
      __validAction__P_94_13: false,
      __dragTargetWidget__P_94_14: null,
      __startConfig__P_94_15: null,

      /*
      ---------------------------------------------------------------------------
        EVENT HANDLER INTERFACE
      ---------------------------------------------------------------------------
      */
      // interface implementation
      canHandleEvent: function canHandleEvent(target, type) {},
      // interface implementation
      registerEvent: function registerEvent(target, type, capture) {// Nothing needs to be done here
      },
      // interface implementation
      unregisterEvent: function unregisterEvent(target, type, capture) {// Nothing needs to be done here
      },

      /*
      ---------------------------------------------------------------------------
        PUBLIC METHODS
      ---------------------------------------------------------------------------
      */

      /**
       * Registers a supported type
       *
       * @param type {String} The type to add
       */
      addType: function addType(type) {
        this.__types__P_94_5[type] = true;
      },

      /**
       * Registers a supported action. One of <code>move</code>,
       * <code>copy</code> or <code>alias</code>.
       *
       * @param action {String} The action to add
       */
      addAction: function addAction(action) {
        this.__actions__P_94_6[action] = true;
      },

      /**
       * Whether the current drag target supports the given type
       *
       * @param type {String} Any type
       * @return {Boolean} Whether the type is supported
       */
      supportsType: function supportsType(type) {
        return !!this.__types__P_94_5[type];
      },

      /**
       * Whether the current drag target supports the given action
       *
       * @param type {String} Any type
       * @return {Boolean} Whether the action is supported
       */
      supportsAction: function supportsAction(type) {
        return !!this.__actions__P_94_6[type];
      },

      /**
       * Whether the current drop target allows the current drag target.
       *
       * @param isAllowed {Boolean} False if a drop should be disallowed
       */
      setDropAllowed: function setDropAllowed(isAllowed) {
        this.__validDrop__P_94_12 = isAllowed;

        this.__detectAction__P_94_16();
      },

      /**
       * Returns the data of the given type during the <code>drop</code> event
       * on the drop target. This method fires a <code>droprequest</code> at
       * the drag target which should be answered by calls to {@link #addData}.
       *
       * Note that this is a synchronous method and if any of the drag and drop
       * events handlers are implemented using Promises, this may fail; @see
       * `getDataAsync`.
       *
       * @param type {String} Any supported type
       * @return {var} The result data in a promise
       */
      getData: function getData(type) {
        if (!this.__validDrop__P_94_12 || !this.__dropTarget__P_94_3) {
          throw new Error("This method must not be used outside the drop event listener!");
        }

        if (!this.__types__P_94_5[type]) {
          throw new Error("Unsupported data type: " + type + "!");
        }

        if (!this.__cache__P_94_8[type]) {
          this.__currentType__P_94_9 = type;

          this.__fireEvent__P_94_17("droprequest", this.__dragTarget__P_94_4, this.__dropTarget__P_94_3, false, false);
        }

        if (!this.__cache__P_94_8[type]) {
          throw new Error("Please use a droprequest listener to the drag source to fill the manager with data!");
        }

        return this.__cache__P_94_8[type] || null;
      },

      /**
       * Returns the data of the given type during the <code>drop</code> event
       * on the drop target. This method fires a <code>droprequest</code> at
       * the drag target which should be answered by calls to {@link #addData}.
       *
       * @param type {String} Any supported type
       * @return {qx.Promise} The result data in a promise
       */
      getDataAsync: function getDataAsync(type) {
        if (!this.__validDrop__P_94_12 || !this.__dropTarget__P_94_3) {
          throw new Error("This method must not be used outside the drop event listener!");
        }

        if (!this.__types__P_94_5[type]) {
          throw new Error("Unsupported data type: " + type + "!");
        }

        var tracker = {};
        var self = this;

        if (!this.__cache__P_94_8[type]) {
          qx.event.Utils.then(tracker, function () {
            self.__currentType__P_94_9 = type;
            return self.__fireEvent__P_94_17("droprequest", self.__dragTarget__P_94_4, self.__dropTarget__P_94_3, false);
          });
        }

        return qx.event.Utils.then(tracker, function () {
          if (!this.__cache__P_94_8[type]) {
            throw new Error("Please use a droprequest listener to the drag source to fill the manager with data!");
          }

          return this.__cache__P_94_8[type] || null;
        });
      },

      /**
       * Returns the currently selected action (by user keyboard modifiers)
       *
       * @return {String} One of <code>move</code>, <code>copy</code> or
       *    <code>alias</code>
       */
      getCurrentAction: function getCurrentAction() {
        this.__detectAction__P_94_16();

        return this.__currentAction__P_94_10;
      },

      /**
       * Returns the currently selected action (by user keyboard modifiers)
       *
       * @return {qx.Promise|String} One of <code>move</code>, <code>copy</code> or
       *    <code>alias</code>
       */
      getCurrentActionAsync: qx.core.Environment.select("qx.promise", {
        "true": function _true() {
          var self = this;
          return qx.Promise.resolve(self.__detectAction__P_94_16()).then(function () {
            return self.__currentAction__P_94_10;
          });
        },
        "false": function _false() {
          throw new Error(this.classname + ".getCurrentActionAsync not supported because qx.promise==false");
        }
      }),

      /**
       * Returns the widget which has been the target of the drag start.
       * @return {qx.ui.core.Widget} The widget on which the drag started.
       */
      getDragTarget: function getDragTarget() {
        return this.__dragTargetWidget__P_94_14;
      },

      /**
       * Adds data of the given type to the internal storage. The data
       * is available until the <code>dragend</code> event is fired.
       *
       * @param type {String} Any valid type
       * @param data {var} Any data to store
       */
      addData: function addData(type, data) {
        this.__cache__P_94_8[type] = data;
      },

      /**
       * Returns the type which was requested last.
       *
       * @return {String} The last requested data type
       */
      getCurrentType: function getCurrentType() {
        return this.__currentType__P_94_9;
      },

      /**
       * Returns if a drag session is currently active
       *
       * @return {Boolean} active drag session
       */
      isSessionActive: function isSessionActive() {
        return this.__sessionActive__P_94_11;
      },

      /*
      ---------------------------------------------------------------------------
        INTERNAL UTILS
      ---------------------------------------------------------------------------
      */

      /**
       * Rebuilds the internal data storage used during a drag&drop session
       */
      __rebuildStructures__P_94_2: function __rebuildStructures__P_94_2() {
        this.__types__P_94_5 = {};
        this.__actions__P_94_6 = {};
        this.__keys__P_94_7 = {};
        this.__cache__P_94_8 = {};
      },

      /**
       * Detects the current action and stores it under the private
       * field <code>__currentAction</code>. Also fires the event
       * <code>dragchange</code> on every modification.
       *
       * @return {qx.Promise|null}
       */
      __detectAction__P_94_16: function __detectAction__P_94_16() {
        if (this.__dragTarget__P_94_4 == null) {
          {
            return qx.Promise.reject();
          }
        }

        var actions = this.__actions__P_94_6;
        var keys = this.__keys__P_94_7;
        var current = null;

        if (this.__validDrop__P_94_12) {
          if (keys.Shift && keys.Control && actions.alias) {
            current = "alias";
          } else if (keys.Shift && keys.Alt && actions.copy) {
            current = "copy";
          } else if (keys.Shift && actions.move) {
            current = "move";
          } else if (keys.Alt && actions.alias) {
            current = "alias";
          } else if (keys.Control && actions.copy) {
            current = "copy";
          } else if (actions.move) {
            current = "move";
          } else if (actions.copy) {
            current = "copy";
          } else if (actions.alias) {
            current = "alias";
          }
        }

        var self = this;
        var tracker = {};
        var old = this.__currentAction__P_94_10;

        if (current != old) {
          if (this.__dropTarget__P_94_3) {
            qx.event.Utils["catch"](function () {
              self.__validAction__P_94_13 = false;
              current = null;
            });
            qx.event.Utils.then(tracker, function () {
              self.__currentAction__P_94_10 = current;
              return self.__fireEvent__P_94_17("dragchange", self.__dropTarget__P_94_3, self.__dragTarget__P_94_4, true);
            });
            qx.event.Utils.then(tracker, function (validAction) {
              self.__validAction__P_94_13 = validAction;

              if (!validAction) {
                current = null;
              }
            });
          }
        }

        return qx.event.Utils.then(tracker, function () {
          if (current != old) {
            self.__currentAction__P_94_10 = current;
            return self.__fireEvent__P_94_17("dragchange", self.__dragTarget__P_94_4, self.__dropTarget__P_94_3, false);
          }
        });
      },

      /**
       * Wrapper for {@link qx.event.Registration#fireEvent} for drag&drop events
       * needed in this class.
       *
       * @param type {String} Event type
       * @param target {Object} Target to fire on
       * @param relatedTarget {Object} Related target, i.e. drag or drop target
       *    depending on the drag event
       * @param cancelable {Boolean} Whether the event is cancelable
       * @param original {qx.event.type.Pointer} Original pointer event
       * @return {qx.Promise|Boolean} <code>true</code> if the event's default behavior was
       * not prevented
       */
      __fireEvent__P_94_17: function __fireEvent__P_94_17(type, target, relatedTarget, cancelable, original, async) {
        var Registration = qx.event.Registration;
        var dragEvent = Registration.createEvent(type, qx.event.type.Drag, [cancelable, original]);

        if (target !== relatedTarget) {
          dragEvent.setRelatedTarget(relatedTarget);
        }

        var result = Registration.dispatchEvent(target, dragEvent);
        {
          if (async === undefined || async) {
            return qx.Promise.resolve(result).then(function () {
              return !dragEvent.getDefaultPrevented();
            });
          } else {
            {
              if (qx.Promise.isPromise(result)) {
                this.error('DragDrop event "' + type + '" returned a promise but a synchronous event was required, drag and drop may not work as expected (consider using getDataAsync)');
              }
            }
            return result;
          }
        }
      },

      /**
       * Finds next draggable parent of the given element. Maybe the element itself as well.
       *
       * Looks for the attribute <code>qxDraggable</code> with the value <code>on</code>.
       *
       * @param elem {Element} The element to query
       * @return {Element} The next parent element which is draggable. May also be <code>null</code>
       */
      __findDraggable__P_94_18: function __findDraggable__P_94_18(elem) {
        while (elem && elem.nodeType == 1) {
          if (elem.getAttribute("qxDraggable") == "on") {
            return elem;
          }

          elem = elem.parentNode;
        }

        return null;
      },

      /**
       * Finds next droppable parent of the given element. Maybe the element itself as well.
       *
       * Looks for the attribute <code>qxDroppable</code> with the value <code>on</code>.
       *
       * @param elem {Element} The element to query
       * @return {Element} The next parent element which is droppable. May also be <code>null</code>
       */
      __findDroppable__P_94_19: function __findDroppable__P_94_19(elem) {
        while (elem && elem.nodeType == 1) {
          if (elem.getAttribute("qxDroppable") == "on") {
            return elem;
          }

          elem = elem.parentNode;
        }

        return null;
      },

      /**
       * Cleans up a drag&drop session when <code>dragstart</code> was fired before.
       *
       * @return {qx.Promise?} promise, if one was created by event handlers
       */
      clearSession: function clearSession() {
        //this.debug("clearSession");
        // Deregister from root events
        this.__manager__P_94_0.removeListener(this.__root__P_94_1, "pointermove", this._onPointermove, this);

        this.__manager__P_94_0.removeListener(this.__root__P_94_1, "pointerup", this._onPointerup, this, true);

        this.__manager__P_94_0.removeListener(this.__root__P_94_1, "keydown", this._onKeyDown, this, true);

        this.__manager__P_94_0.removeListener(this.__root__P_94_1, "keyup", this._onKeyUp, this, true);

        this.__manager__P_94_0.removeListener(this.__root__P_94_1, "keypress", this._onKeyPress, this, true);

        this.__manager__P_94_0.removeListener(this.__root__P_94_1, "roll", this._onRoll, this, true);

        var tracker = {};
        var self = this; // Fire dragend event

        if (this.__dragTarget__P_94_4) {
          qx.event.Utils.then(tracker, function () {
            return self.__fireEvent__P_94_17("dragend", self.__dragTarget__P_94_4, self.__dropTarget__P_94_3, false);
          });
        }

        return qx.event.Utils.then(tracker, function () {
          // Cleanup
          self.__validDrop__P_94_12 = false;
          self.__dropTarget__P_94_3 = null;

          if (self.__dragTargetWidget__P_94_14) {
            self.__dragTargetWidget__P_94_14.removeState("drag");

            self.__dragTargetWidget__P_94_14 = null;
          } // Clear init
          //self.debug("Clearing drag target");


          self.__dragTarget__P_94_4 = null;
          self.__sessionActive__P_94_11 = false;
          self.__startConfig__P_94_15 = null;

          self.__rebuildStructures__P_94_2();
        });
      },

      /*
      ---------------------------------------------------------------------------
        EVENT HANDLERS
      ---------------------------------------------------------------------------
      */

      /**
       * Handler for long tap which takes care of starting the drag & drop session for
       * touch interactions.
       * @param e {qx.event.type.Tap} The longtap event.
       */
      _onLongtap: function _onLongtap(e) {
        // only for touch
        if (e.getPointerType() != "touch") {
          return;
        } // prevent scrolling


        this.__manager__P_94_0.addListener(this.__root__P_94_1, "roll", this._onRoll, this, true);

        return this._start(e);
      },

      /**
       * Helper to start the drag & drop session. It is responsible for firing the
       * dragstart event and attaching the key listener.
       * @param e {qx.event.type.Pointer} Either a longtap or pointermove event.
       *
       * @return {Boolean} Returns <code>false</code> if drag session should be
       * canceled.
       */
      _start: function _start(e) {
        // only for primary pointer and allowed buttons
        var isButtonOk = qx.event.handler.DragDrop.ALLOWED_BUTTONS.indexOf(e.getButton()) !== -1;

        if (!e.isPrimary() || !isButtonOk) {
          return false;
        } // start target can be none as the drag & drop handler might
        // be created after the first start event


        var target = this.__startConfig__P_94_15 ? this.__startConfig__P_94_15.target : e.getTarget();

        var draggable = this.__findDraggable__P_94_18(target);

        if (draggable) {
          // This is the source target
          //this.debug("Setting dragtarget = " + draggable);
          this.__dragTarget__P_94_4 = draggable;
          var widgetOriginalTarget = qx.ui.core.Widget.getWidgetByElement(this.__startConfig__P_94_15.original);

          while (widgetOriginalTarget && widgetOriginalTarget.isAnonymous()) {
            widgetOriginalTarget = widgetOriginalTarget.getLayoutParent();
          }

          if (widgetOriginalTarget) {
            this.__dragTargetWidget__P_94_14 = widgetOriginalTarget;
            widgetOriginalTarget.addState("drag");
          } // fire cancelable dragstart


          var self = this;
          var tracker = {};
          qx.event.Utils["catch"](function () {
            //self.debug("dragstart FAILED, setting __sessionActive=false");
            self.__sessionActive__P_94_11 = false;
          });
          qx.event.Utils.then(tracker, function () {
            return self.__fireEvent__P_94_17("dragstart", self.__dragTarget__P_94_4, self.__dropTarget__P_94_3, true, e);
          });
          return qx.event.Utils.then(tracker, function (validAction) {
            if (!validAction) {
              return;
            } //self.debug("dragstart ok, setting __sessionActive=true")


            self.__manager__P_94_0.addListener(self.__root__P_94_1, "keydown", self._onKeyDown, self, true);

            self.__manager__P_94_0.addListener(self.__root__P_94_1, "keyup", self._onKeyUp, self, true);

            self.__manager__P_94_0.addListener(self.__root__P_94_1, "keypress", self._onKeyPress, self, true);

            self.__sessionActive__P_94_11 = true;
          });
        }
      },

      /**
       * Event handler for the pointerdown event which stores the initial targets and the coordinates.
       * @param e {qx.event.type.Pointer} The pointerdown event.
       */
      _onPointerdown: function _onPointerdown(e) {
        if (e.isPrimary()) {
          this.__startConfig__P_94_15 = {
            target: e.getTarget(),
            original: e.getOriginalTarget(),
            left: e.getDocumentLeft(),
            top: e.getDocumentTop()
          };

          this.__manager__P_94_0.addListener(this.__root__P_94_1, "pointermove", this._onPointermove, this);

          this.__manager__P_94_0.addListener(this.__root__P_94_1, "pointerup", this._onPointerup, this, true);
        }
      },

      /**
       * Event handler for the pointermove event which starts the drag session and
       * is responsible for firing the drag, dragover and dragleave event.
       * @param e {qx.event.type.Pointer} The pointermove event.
       */
      _onPointermove: function _onPointermove(e) {
        // only allow drag & drop for primary pointer
        if (!e.isPrimary()) {
          return;
        } //this.debug("_onPointermove: start");


        var self = this;
        var tracker = {};
        qx.event.Utils["catch"](function () {
          return self.clearSession();
        }); // start the drag session for mouse

        if (!self.__sessionActive__P_94_11 && e.getPointerType() == "mouse") {
          var delta = self._getDelta(e); // if the mouse moved a bit in any direction


          var distance = qx.event.handler.DragDrop.MIN_DRAG_DISTANCE;

          if (delta && (Math.abs(delta.x) > distance || Math.abs(delta.y) > distance)) {
            //self.debug("_onPointermove: outside min drag distance");
            qx.event.Utils.then(tracker, function () {
              return self._start(e);
            });
          }
        }

        return qx.event.Utils.then(tracker, function () {
          // check if the session has been activated
          if (!self.__sessionActive__P_94_11) {
            //self.debug("not active");
            return;
          }

          var tracker = {};
          qx.event.Utils.then(tracker, function () {
            //self.debug("active, firing drag");
            return self.__fireEvent__P_94_17("drag", self.__dragTarget__P_94_4, self.__dropTarget__P_94_3, true, e);
          });
          qx.event.Utils.then(tracker, function (validAction) {
            if (!validAction) {
              this.clearSession();
            } //self.debug("drag");
            // find current hovered droppable


            var el = e.getTarget();

            if (self.__startConfig__P_94_15.target === el) {
              // on touch devices the native events return wrong elements as target (its always the element where the dragging started)
              el = e.getNativeEvent().view.document.elementFromPoint(e.getDocumentLeft(), e.getDocumentTop());
            }

            var cursor = self.getCursor();

            if (!cursor) {
              cursor = qx.ui.core.DragDropCursor.getInstance();
            }

            var cursorEl = cursor.getContentElement().getDomElement();

            if (cursorEl && (el === cursorEl || cursorEl.contains(el))) {
              var display = qx.bom.element.Style.get(cursorEl, "display"); // get the cursor out of the way

              qx.bom.element.Style.set(cursorEl, "display", "none");
              el = e.getNativeEvent().view.document.elementFromPoint(e.getDocumentLeft(), e.getDocumentTop());
              qx.bom.element.Style.set(cursorEl, "display", display);
            }

            if (el !== cursorEl) {
              var droppable = self.__findDroppable__P_94_19(el); // new drop target detected


              if (droppable && droppable != self.__dropTarget__P_94_3) {
                var dropLeaveTarget = self.__dropTarget__P_94_3;
                self.__validDrop__P_94_12 = true; // initial value should be true

                self.__dropTarget__P_94_3 = droppable;
                var innerTracker = {};
                qx.event.Utils["catch"](innerTracker, function () {
                  self.__dropTarget__P_94_3 = null;
                  self.__validDrop__P_94_12 = false;
                }); // fire dragleave for previous drop target

                if (dropLeaveTarget) {
                  qx.event.Utils.then(innerTracker, function () {
                    return self.__fireEvent__P_94_17("dragleave", dropLeaveTarget, self.__dragTarget__P_94_4, false, e);
                  });
                }

                qx.event.Utils.then(innerTracker, function () {
                  return self.__fireEvent__P_94_17("dragover", droppable, self.__dragTarget__P_94_4, true, e);
                });
                return qx.event.Utils.then(innerTracker, function (validDrop) {
                  self.__validDrop__P_94_12 = validDrop;
                });
              } // only previous drop target
              else if (!droppable && self.__dropTarget__P_94_3) {
                var innerTracker = {};
                qx.event.Utils.then(innerTracker, function () {
                  return self.__fireEvent__P_94_17("dragleave", self.__dropTarget__P_94_3, self.__dragTarget__P_94_4, false, e);
                });
                return qx.event.Utils.then(innerTracker, function () {
                  self.__dropTarget__P_94_3 = null;
                  self.__validDrop__P_94_12 = false;
                  return self.__detectAction__P_94_16();
                });
              }
            }
          });
          return qx.event.Utils.then(tracker, function () {
            // Reevaluate current action
            var keys = self.__keys__P_94_7;
            keys.Control = e.isCtrlPressed();
            keys.Shift = e.isShiftPressed();
            keys.Alt = e.isAltPressed();
            return self.__detectAction__P_94_16();
          });
        });
      },

      /**
       * Helper function to compute the delta between current cursor position from given event
       * and the stored coordinates at {@link #_onPointerdown}.
       *
       * @param e {qx.event.type.Pointer} The pointer event
       *
       * @return {Map} containing the deltaX as x, and deltaY as y.
       */
      _getDelta: function _getDelta(e) {
        if (!this.__startConfig__P_94_15) {
          return null;
        }

        var deltaX = e.getDocumentLeft() - this.__startConfig__P_94_15.left;

        var deltaY = e.getDocumentTop() - this.__startConfig__P_94_15.top;

        return {
          x: deltaX,
          y: deltaY
        };
      },

      /**
       * Handler for the pointerup event which is responsible fore firing the drop event.
       * @param e {qx.event.type.Pointer} The pointerup event
       */
      _onPointerup: function _onPointerup(e) {
        if (!e.isPrimary()) {
          return;
        }

        var tracker = {};
        var self = this; // Fire drop event in success case

        if (this.__validDrop__P_94_12 && this.__validAction__P_94_13) {
          qx.event.Utils.then(tracker, function () {
            return self.__fireEvent__P_94_17("drop", self.__dropTarget__P_94_3, self.__dragTarget__P_94_4, false, e);
          });
        }

        return qx.event.Utils.then(tracker, function () {
          // Stop event
          if (e.getTarget() == self.__dragTarget__P_94_4) {
            e.stopPropagation();
          } // Clean up


          return self.clearSession();
        });
      },

      /**
       * Roll listener to stop scrolling on touch devices.
       * @param e {qx.event.type.Roll} The roll event.
       */
      _onRoll: function _onRoll(e) {
        e.stop();
      },

      /**
       * Event listener for window's <code>blur</code> event
       *
       * @param e {qx.event.type.Event} Event object
       */
      _onWindowBlur: function _onWindowBlur(e) {
        return this.clearSession();
      },

      /**
       * Event listener for root's <code>keydown</code> event
       *
       * @param e {qx.event.type.KeySequence} Event object
       */
      _onKeyDown: function _onKeyDown(e) {
        var iden = e.getKeyIdentifier();

        switch (iden) {
          case "Alt":
          case "Control":
          case "Shift":
            if (!this.__keys__P_94_7[iden]) {
              this.__keys__P_94_7[iden] = true;
              return this.__detectAction__P_94_16();
            }

        }
      },

      /**
       * Event listener for root's <code>keyup</code> event
       *
       * @param e {qx.event.type.KeySequence} Event object
       */
      _onKeyUp: function _onKeyUp(e) {
        var iden = e.getKeyIdentifier();

        switch (iden) {
          case "Alt":
          case "Control":
          case "Shift":
            if (this.__keys__P_94_7[iden]) {
              this.__keys__P_94_7[iden] = false;
              return this.__detectAction__P_94_16();
            }

        }
      },

      /**
       * Event listener for root's <code>keypress</code> event
       *
       * @param e {qx.event.type.KeySequence} Event object
       */
      _onKeyPress: function _onKeyPress(e) {
        var iden = e.getKeyIdentifier();

        switch (iden) {
          case "Escape":
            return this.clearSession();
        }
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      qx.event.Registration.removeListener(window, "blur", this._onWindowBlur, this); // Clear fields

      this.__dragTarget__P_94_4 = this.__dropTarget__P_94_3 = this.__manager__P_94_0 = this.__root__P_94_1 = this.__types__P_94_5 = this.__actions__P_94_6 = this.__keys__P_94_7 = this.__cache__P_94_8 = null;
    },

    /*
    *****************************************************************************
       DEFER
    *****************************************************************************
    */
    defer: function defer(statics) {
      qx.event.Registration.addHandler(statics);
    }
  });
  qx.event.handler.DragDrop.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=DragDrop.js.map?dt=1652417296336