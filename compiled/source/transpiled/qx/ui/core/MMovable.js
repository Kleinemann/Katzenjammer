(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.Widget": {},
      "qx.core.Init": {},
      "qx.Class": {},
      "qx.ui.window.IDesktop": {}
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
   * Provides move behavior to any widget.
   *
   * The widget using the mixin must register a widget as move handle so that
   * the pointer events needed for moving it are attached to this widget).
   * <pre class='javascript'>this._activateMoveHandle(widget);</pre>
   */
  qx.Mixin.define("qx.ui.core.MMovable", {
    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /** Whether the widget is movable */
      movable: {
        check: "Boolean",
        init: true
      },

      /** Whether to use a frame instead of the original widget during move sequences */
      useMoveFrame: {
        check: "Boolean",
        init: false
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __moveHandle__P_194_0: null,
      __moveFrame__P_194_1: null,
      __dragRange__P_194_2: null,
      __dragLeft__P_194_3: null,
      __dragTop__P_194_4: null,
      __parentLeft__P_194_5: null,
      __parentTop__P_194_6: null,
      __blockerAdded__P_194_7: false,
      __oldBlockerColor__P_194_8: null,
      __oldBlockerOpacity__P_194_9: 0,

      /*
      ---------------------------------------------------------------------------
        CORE FEATURES
      ---------------------------------------------------------------------------
      */

      /**
       * Configures the given widget as a move handle
       *
       * @param widget {qx.ui.core.Widget} Widget to activate as move handle
       */
      _activateMoveHandle: function _activateMoveHandle(widget) {
        if (this.__moveHandle__P_194_0) {
          throw new Error("The move handle could not be redefined!");
        }

        this.__moveHandle__P_194_0 = widget;
        widget.addListener("pointerdown", this._onMovePointerDown, this);
        widget.addListener("pointerup", this._onMovePointerUp, this);
        widget.addListener("pointermove", this._onMovePointerMove, this);
        widget.addListener("losecapture", this.__onMoveLoseCapture__P_194_10, this);
      },

      /**
       * Get the widget, which draws the resize/move frame.
       *
       * @return {qx.ui.core.Widget} The resize frame
       */
      __getMoveFrame__P_194_11: function __getMoveFrame__P_194_11() {
        var frame = this.__moveFrame__P_194_1;

        if (!frame) {
          frame = this.__moveFrame__P_194_1 = new qx.ui.core.Widget();
          frame.setAppearance("move-frame");
          frame.exclude();
          qx.core.Init.getApplication().getRoot().add(frame);
        }

        return frame;
      },

      /**
       * Creates, shows and syncs the frame with the widget.
       */
      __showMoveFrame__P_194_12: function __showMoveFrame__P_194_12() {
        var location = this.getContentLocation();
        var bounds = this.getBounds();

        var frame = this.__getMoveFrame__P_194_11();

        frame.setUserBounds(location.left, location.top, bounds.width, bounds.height);
        frame.show();
        frame.setZIndex(this.getZIndex() + 1);
      },

      /*
      ---------------------------------------------------------------------------
        MOVE SUPPORT
      ---------------------------------------------------------------------------
      */

      /**
       * Computes the new drag coordinates
       *
       * @param e {qx.event.type.Pointer} Pointer event
       * @return {Map} A map with the computed drag coordinates
       */
      __computeMoveCoordinates__P_194_13: function __computeMoveCoordinates__P_194_13(e) {
        var range = this.__dragRange__P_194_2;
        var pointerLeft = Math.max(range.left, Math.min(range.right, e.getDocumentLeft()));
        var pointerTop = Math.max(range.top, Math.min(range.bottom, e.getDocumentTop()));
        var viewportLeft = this.__dragLeft__P_194_3 + pointerLeft;
        var viewportTop = this.__dragTop__P_194_4 + pointerTop;
        return {
          viewportLeft: parseInt(viewportLeft, 10),
          viewportTop: parseInt(viewportTop, 10),
          parentLeft: parseInt(viewportLeft - this.__parentLeft__P_194_5, 10),
          parentTop: parseInt(viewportTop - this.__parentTop__P_194_6, 10)
        };
      },

      /*
      ---------------------------------------------------------------------------
        MOVE EVENT HANDLERS
      ---------------------------------------------------------------------------
      */

      /**
       * Roll handler which prevents the scrolling via tap & move on parent widgets
       * during the move of the widget.
       * @param e {qx.event.type.Roll} The roll event
       */
      _onMoveRoll: function _onMoveRoll(e) {
        e.stop();
      },

      /**
       * Enables the capturing of the caption bar and prepares the drag session and the
       * appearance (translucent, frame or opaque) for the moving of the window.
       *
       * @param e {qx.event.type.Pointer} pointer down event
       */
      _onMovePointerDown: function _onMovePointerDown(e) {
        if (!this.getMovable() || this.hasState("maximized")) {
          return;
        }

        this.addListener("roll", this._onMoveRoll, this); // Compute drag range

        var parent = this.getLayoutParent();
        var parentLocation = parent.getContentLocation();
        var parentBounds = parent.getBounds(); // Added a blocker, this solves the issue described in [BUG #1462]

        if (qx.Class.implementsInterface(parent, qx.ui.window.IDesktop)) {
          if (!parent.isBlocked()) {
            this.__oldBlockerColor__P_194_8 = parent.getBlockerColor();
            this.__oldBlockerOpacity__P_194_9 = parent.getBlockerOpacity();
            parent.setBlockerColor(null);
            parent.setBlockerOpacity(1);
            parent.blockContent(this.getZIndex() - 1);
            this.__blockerAdded__P_194_7 = true;
          }
        }

        this.__dragRange__P_194_2 = {
          left: parentLocation.left,
          top: parentLocation.top,
          right: parentLocation.left + parentBounds.width,
          bottom: parentLocation.top + parentBounds.height
        }; // Compute drag positions

        var widgetLocation = this.getContentLocation();
        this.__parentLeft__P_194_5 = parentLocation.left;
        this.__parentTop__P_194_6 = parentLocation.top;
        this.__dragLeft__P_194_3 = widgetLocation.left - e.getDocumentLeft();
        this.__dragTop__P_194_4 = widgetLocation.top - e.getDocumentTop(); // Add state

        this.addState("move"); // Enable capturing

        this.__moveHandle__P_194_0.capture(); // Enable drag frame


        if (this.getUseMoveFrame()) {
          this.__showMoveFrame__P_194_12();
        } // Stop event


        e.stop();
      },

      /**
       * Does the moving of the window by rendering the position
       * of the window (or frame) at runtime using direct dom methods.
       *
       * @param e {qx.event.type.Pointer} pointer move event
       */
      _onMovePointerMove: function _onMovePointerMove(e) {
        // Only react when dragging is active
        if (!this.hasState("move")) {
          return;
        } // Apply new coordinates using DOM


        var coords = this.__computeMoveCoordinates__P_194_13(e);

        if (this.getUseMoveFrame()) {
          this.__getMoveFrame__P_194_11().setDomPosition(coords.viewportLeft, coords.viewportTop);
        } else {
          var insets = this.getLayoutParent().getInsets();
          this.setDomPosition(coords.parentLeft - (insets.left || 0), coords.parentTop - (insets.top || 0));
        }

        e.stopPropagation();
      },

      /**
       * Disables the capturing of the caption bar and moves the window
       * to the last position of the drag session. Also restores the appearance
       * of the window.
       *
       * @param e {qx.event.type.Pointer} pointer up event
       */
      _onMovePointerUp: function _onMovePointerUp(e) {
        if (this.hasListener("roll")) {
          this.removeListener("roll", this._onMoveRoll, this);
        } // Only react when dragging is active


        if (!this.hasState("move")) {
          return;
        } // Remove drag state


        this.removeState("move"); // Removed blocker, this solves the issue described in [BUG #1462]

        var parent = this.getLayoutParent();

        if (qx.Class.implementsInterface(parent, qx.ui.window.IDesktop)) {
          if (this.__blockerAdded__P_194_7) {
            parent.unblock();
            parent.setBlockerColor(this.__oldBlockerColor__P_194_8);
            parent.setBlockerOpacity(this.__oldBlockerOpacity__P_194_9);
            this.__oldBlockerColor__P_194_8 = null;
            this.__oldBlockerOpacity__P_194_9 = 0;
            this.__blockerAdded__P_194_7 = false;
          }
        } // Disable capturing


        this.__moveHandle__P_194_0.releaseCapture(); // Apply them to the layout


        var coords = this.__computeMoveCoordinates__P_194_13(e);

        var insets = this.getLayoutParent().getInsets();
        this.setLayoutProperties({
          left: coords.parentLeft - (insets.left || 0),
          top: coords.parentTop - (insets.top || 0)
        }); // Hide frame afterwards

        if (this.getUseMoveFrame()) {
          this.__getMoveFrame__P_194_11().exclude();
        }

        e.stopPropagation();
      },

      /**
       * Event listener for <code>losecapture</code> event.
       *
       * @param e {qx.event.type.Event} Lose capture event
       */
      __onMoveLoseCapture__P_194_10: function __onMoveLoseCapture__P_194_10(e) {
        // Check for active move
        if (!this.hasState("move")) {
          return;
        } // Remove drag state


        this.removeState("move"); // Hide frame afterwards

        if (this.getUseMoveFrame()) {
          this.__getMoveFrame__P_194_11().exclude();
        }
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this._disposeObjects("__moveFrame__P_194_1", "__moveHandle__P_194_0");

      this.__dragRange__P_194_2 = null;
    }
  });
  qx.ui.core.MMovable.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MMovable.js.map?dt=1652417300583