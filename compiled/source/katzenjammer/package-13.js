(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "usage": "dynamic",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.layout.Abstract": {
        "construct": true,
        "require": true
      },
      "qx.ui.layout.Util": {},
      "qx.theme.manager.Decoration": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "qx.debug": {
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
   * A vertical box layout.
   *
   * The vertical box layout lays out widgets in a vertical column, from top
   * to bottom.
   *
   * *Features*
   *
   * * Minimum and maximum dimensions
   * * Prioritized growing/shrinking (flex)
   * * Margins (with vertical collapsing)
   * * Auto sizing (ignoring percent values)
   * * Percent heights (not relevant for size hint)
   * * Alignment (child property {@link qx.ui.core.LayoutItem#alignY} is ignored)
   * * Vertical spacing (collapsed with margins)
   * * Reversed children layout (from last to first)
   * * Horizontal children stretching (respecting size hints)
   *
   * *Item Properties*
   *
   * <ul>
   * <li><strong>flex</strong> <em>(Integer)</em>: The flexibility of a layout item determines how the container
   *   distributes remaining empty space among its children. If items are made
   *   flexible, they can grow or shrink accordingly. Their relative flex values
   *   determine how the items are being resized, i.e. the larger the flex ratio
   *   of two items, the larger the resizing of the first item compared to the
   *   second.
   *
   *   If there is only one flex item in a layout container, its actual flex
   *   value is not relevant. To disallow items to become flexible, set the
   *   flex value to zero.
   * </li>
   * <li><strong>height</strong> <em>(String)</em>: Allows to define a percent
   *   height for the item. The height in percent, if specified, is used instead
   *   of the height defined by the size hint. The minimum and maximum height still
   *   takes care of the element's limits. It has no influence on the layout's
   *   size hint. Percent values are mostly useful for widgets which are sized by
   *   the outer hierarchy.
   * </li>
   * </ul>
   *
   * *Example*
   *
   * Here is a little example of how to use the vertical box layout.
   *
   * <pre class="javascript">
   * var layout = new qx.ui.layout.VBox();
   * layout.setSpacing(4); // apply spacing
   *
   * var container = new qx.ui.container.Composite(layout);
   *
   * container.add(new qx.ui.core.Widget());
   * container.add(new qx.ui.core.Widget());
   * container.add(new qx.ui.core.Widget());
   * </pre>
   *
   * *External Documentation*
   *
   * See <a href='https://qooxdoo.org/documentation/#/desktop/layout/box.md'>extended documentation</a>
   * and links to demos for this layout.
   *
   */
  qx.Class.define("qx.ui.layout.VBox", {
    extend: qx.ui.layout.Abstract,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param spacing {Integer?0} The spacing between child widgets {@link #spacing}.
     * @param alignY {String?"top"} Vertical alignment of the whole children
     *     block {@link #alignY}.
     * @param separator {String|qx.ui.decoration.IDecorator?} A separator to be rendered between the items
     */
    construct: function construct(spacing, alignY, separator) {
      qx.ui.layout.Abstract.constructor.call(this);

      if (spacing) {
        this.setSpacing(spacing);
      }

      if (alignY) {
        this.setAlignY(alignY);
      }

      if (separator) {
        this.setSeparator(separator);
      }
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /**
       * Vertical alignment of the whole children block. The vertical
       * alignment of the child is completely ignored in VBoxes (
       * {@link qx.ui.core.LayoutItem#alignY}).
       */
      alignY: {
        check: ["top", "middle", "bottom"],
        init: "top",
        apply: "_applyLayoutChange"
      },

      /**
       * Horizontal alignment of each child. Can be overridden through
       * {@link qx.ui.core.LayoutItem#alignX}.
       */
      alignX: {
        check: ["left", "center", "right"],
        init: "left",
        apply: "_applyLayoutChange"
      },

      /** Vertical spacing between two children */
      spacing: {
        check: "Integer",
        init: 0,
        apply: "_applyLayoutChange"
      },

      /** Separator lines to use between the objects */
      separator: {
        check: "Decorator",
        nullable: true,
        apply: "_applyLayoutChange"
      },

      /** Whether the actual children list should be laid out in reversed order. */
      reversed: {
        check: "Boolean",
        init: false,
        apply: "_applyReversed"
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __heights__P_163_0: null,
      __flexs__P_163_1: null,
      __enableFlex__P_163_2: null,
      __children__P_163_3: null,

      /*
      ---------------------------------------------------------------------------
        HELPER METHODS
      ---------------------------------------------------------------------------
      */
      // property apply
      _applyReversed: function _applyReversed() {
        // easiest way is to invalidate the cache
        this._invalidChildrenCache = true; // call normal layout change

        this._applyLayoutChange();
      },

      /**
       * Rebuilds caches for flex and percent layout properties
       */
      __rebuildCache__P_163_4: function __rebuildCache__P_163_4() {
        var children = this._getLayoutChildren();

        var length = children.length;
        var enableFlex = false;
        var reuse = this.__heights__P_163_0 && this.__heights__P_163_0.length != length && this.__flexs__P_163_1 && this.__heights__P_163_0;
        var props; // Sparse array (keep old one if lengths has not been modified)

        var heights = reuse ? this.__heights__P_163_0 : new Array(length);
        var flexs = reuse ? this.__flexs__P_163_1 : new Array(length); // Reverse support

        if (this.getReversed()) {
          children = children.concat().reverse();
        } // Loop through children to preparse values


        for (var i = 0; i < length; i++) {
          props = children[i].getLayoutProperties();

          if (props.height != null) {
            heights[i] = parseFloat(props.height) / 100;
          }

          if (props.flex != null) {
            flexs[i] = props.flex;
            enableFlex = true;
          } else {
            // reset (in case the index of the children changed: BUG #3131)
            flexs[i] = 0;
          }
        } // Store data


        if (!reuse) {
          this.__heights__P_163_0 = heights;
          this.__flexs__P_163_1 = flexs;
        }

        this.__enableFlex__P_163_2 = enableFlex;
        this.__children__P_163_3 = children; // Clear invalidation marker

        delete this._invalidChildrenCache;
      },

      /*
      ---------------------------------------------------------------------------
        LAYOUT INTERFACE
      ---------------------------------------------------------------------------
      */
      // overridden
      verifyLayoutProperty: qx.core.Environment.select("qx.debug", {
        "true": function _true(item, name, value) {
          if (name == "height") {
            this.assertMatch(value, qx.ui.layout.Util.PERCENT_VALUE);
          } else if (name == "flex") {
            // flex
            this.assertNumber(value);
            this.assert(value >= 0);
          } else if (name == "flexShrink") {
            this.assertBoolean(value);
          } else {
            this.assert(false, "The property '" + name + "' is not supported by the VBox layout!");
          }
        },
        "false": null
      }),
      // overridden
      renderLayout: function renderLayout(availWidth, availHeight, padding) {
        // Rebuild flex/height caches
        if (this._invalidChildrenCache) {
          this.__rebuildCache__P_163_4();
        } // Cache children


        var children = this.__children__P_163_3;
        var length = children.length;
        var util = qx.ui.layout.Util; // Compute gaps

        var spacing = this.getSpacing();
        var separator = this.getSeparator();
        var gaps;

        if (separator) {
          gaps = util.computeVerticalSeparatorGaps(children, spacing, separator);
        } else {
          gaps = util.computeVerticalGaps(children, spacing, true);
        } // First run to cache children data and compute allocated height


        var i, child, height, percent;
        var heights = [],
            hint;
        var allocatedHeight = gaps;

        for (i = 0; i < length; i += 1) {
          percent = this.__heights__P_163_0[i];
          hint = children[i].getSizeHint();
          height = percent != null ? Math.floor((availHeight - gaps) * percent) : hint.height; // Limit computed value

          if (height < hint.minHeight) {
            height = hint.minHeight;
          } else if (height > hint.maxHeight) {
            height = hint.maxHeight;
          }

          heights.push(height);
          allocatedHeight += height;
        } // Flex support (growing/shrinking)


        if (this.__enableFlex__P_163_2 && allocatedHeight != availHeight) {
          var flexibles = {};
          var flex, offset;
          var notEnoughSpace = allocatedHeight > availHeight;

          for (i = 0; i < length; i += 1) {
            flex = this.__flexs__P_163_1[i];

            if (flex > 0) {
              hint = children[i].getSizeHint();
              flexibles[i] = {
                min: hint.minHeight,
                value: heights[i],
                max: hint.maxHeight,
                flex: flex
              };

              if (notEnoughSpace) {
                var props = children[i].getLayoutProperties();

                if (props && props.flexShrink) {
                  flexibles[i].min = 0;
                }
              }
            }
          }

          var result = util.computeFlexOffsets(flexibles, availHeight, allocatedHeight);

          for (i in result) {
            offset = result[i].offset;
            heights[i] += offset;
            allocatedHeight += offset;
          }
        } // Start with top coordinate


        var top = children[0].getMarginTop(); // Alignment support

        if (allocatedHeight < availHeight && this.getAlignY() != "top") {
          top = availHeight - allocatedHeight;

          if (this.getAlignY() === "middle") {
            top = Math.round(top / 2);
          }
        } // Layouting children


        var hint, left, width, height, marginBottom, marginLeft, marginRight; // Pre configure separators

        this._clearSeparators(); // Compute separator height


        if (separator) {
          var separatorInsets = qx.theme.manager.Decoration.getInstance().resolve(separator).getInsets();
          var separatorHeight = separatorInsets.top + separatorInsets.bottom;
        } // Render children and separators


        for (i = 0; i < length; i += 1) {
          child = children[i];
          height = heights[i];
          hint = child.getSizeHint();
          marginLeft = child.getMarginLeft();
          marginRight = child.getMarginRight(); // Find usable width

          width = Math.max(hint.minWidth, Math.min(availWidth - marginLeft - marginRight, hint.maxWidth)); // Respect horizontal alignment

          left = util.computeHorizontalAlignOffset(child.getAlignX() || this.getAlignX(), width, availWidth, marginLeft, marginRight); // Add collapsed margin

          if (i > 0) {
            // Whether a separator has been configured
            if (separator) {
              // add margin of last child and spacing
              top += marginBottom + spacing; // then render the separator at this position

              this._renderSeparator(separator, {
                top: top + padding.top,
                left: padding.left,
                height: separatorHeight,
                width: availWidth
              }); // and finally add the size of the separator, the spacing (again) and the top margin


              top += separatorHeight + spacing + child.getMarginTop();
            } else {
              // Support margin collapsing when no separator is defined
              top += util.collapseMargins(spacing, marginBottom, child.getMarginTop());
            }
          } // Layout child


          child.renderLayout(left + padding.left, top + padding.top, width, height); // Add height

          top += height; // Remember bottom margin (for collapsing)

          marginBottom = child.getMarginBottom();
        }
      },
      // overridden
      _computeSizeHint: function _computeSizeHint() {
        // Rebuild flex/height caches
        if (this._invalidChildrenCache) {
          this.__rebuildCache__P_163_4();
        }

        var util = qx.ui.layout.Util;
        var children = this.__children__P_163_3; // Initialize

        var minHeight = 0,
            height = 0,
            percentMinHeight = 0;
        var minWidth = 0,
            width = 0;
        var child, hint, margin; // Iterate over children

        for (var i = 0, l = children.length; i < l; i += 1) {
          child = children[i];
          hint = child.getSizeHint(); // Sum up heights

          height += hint.height; // Detect if child is shrinkable or has percent height and update minHeight

          var flex = this.__flexs__P_163_1[i];
          var percent = this.__heights__P_163_0[i];

          if (flex) {
            minHeight += hint.minHeight;
          } else if (percent) {
            percentMinHeight = Math.max(percentMinHeight, Math.round(hint.minHeight / percent));
          } else {
            minHeight += hint.height;
          } // Build horizontal margin sum


          margin = child.getMarginLeft() + child.getMarginRight(); // Find biggest width

          if (hint.width + margin > width) {
            width = hint.width + margin;
          } // Find biggest minWidth


          if (hint.minWidth + margin > minWidth) {
            minWidth = hint.minWidth + margin;
          }
        }

        minHeight += percentMinHeight; // Respect gaps

        var spacing = this.getSpacing();
        var separator = this.getSeparator();
        var gaps;

        if (separator) {
          gaps = util.computeVerticalSeparatorGaps(children, spacing, separator);
        } else {
          gaps = util.computeVerticalGaps(children, spacing, true);
        } // Return hint


        return {
          minHeight: minHeight + gaps,
          height: height + gaps,
          minWidth: minWidth,
          width: width
        };
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this.__heights__P_163_0 = this.__flexs__P_163_1 = this.__children__P_163_3 = null;
    }
  });
  qx.ui.layout.VBox.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Interface": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2017 Martijn Evers, The Netherlands
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martijn Evers (mever)
  
  ************************************************************************ */

  /**
   * Field interface.
   *
   * This interface allows any value to be set as long as the following constraint
   * is met: any value returned by {@link getValue} can be set by {@link setValue}.
   *
   * This specifies the interface for handling the model value of a field.
   * The model value is always in a consistent state (see duration example), and
   * should only handle model values of a type that correctly represents the
   * data available through its UI. E.g.: duration can ideally be modeled by a number
   * of time units, like seconds. When using a date the duration may be
   * unclear (since Unix time?). Type conversions should be handled by data binding.
   *
   * The model value is not necessary what is shown to the end-user
   * by implementing class. A good example is the {@link qx.ui.form.TextField}
   * which is able to operate with or without live updating the model value.
   *
   * Duration example: a field for duration may use two date pickers for begin
   * and end dates. When the end date is before the start date the model is in
   * inconsistent state. getValue should never return such state. And calling
   * it must result in either null or the last consistent value (depending
   * on implementation or setting).
   */
  qx.Interface.define("qx.ui.form.IField", {
    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */
    events: {
      /** Fired when the model value was modified */
      changeValue: "qx.event.type.Data"
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      /*
      ---------------------------------------------------------------------------
        VALUE PROPERTY
      ---------------------------------------------------------------------------
      */

      /**
       * Sets the field model value. Should also update the UI.
       *
       * @param value {var|null} Updates the field with the new model value.
       * @return {null|Error} Should return an error when the type of
       *  model value is not compatible with the implementing class (the concrete field).
       */
      setValue: function setValue(value) {
        return arguments.length == 1;
      },

      /**
       * Resets the model value to its initial value. Should also update the UI.
       */
      resetValue: function resetValue() {},

      /**
       * Returns a consistent and up-to-date model value.
       *
       * Note: returned value can also be a promise of type <code>Promise&lt;*|null&gt;</code>.
       *
       * @return {var|null} The model value plain or as promise.
       */
      getValue: function getValue() {}
    }
  });
  qx.ui.form.IField.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Interface": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.form.IField": {
        "require": true
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
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * Form interface for all form widgets which have strings as their primary
   * data type like textfield's.
   */
  qx.Interface.define("qx.ui.form.IStringForm", {
    extend: qx.ui.form.IField,

    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */
    events: {
      /** Fired when the value was modified */
      changeValue: "qx.event.type.Data"
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      /*
      ---------------------------------------------------------------------------
        VALUE PROPERTY
      ---------------------------------------------------------------------------
      */

      /**
       * Sets the element's value.
       *
       * @param value {String|null} The new value of the element.
       */
      setValue: function setValue(value) {
        return arguments.length == 1;
      },

      /**
       * Resets the element's value to its initial value.
       */
      resetValue: function resetValue() {},

      /**
       * The element's user set value.
       *
       * @return {String|null} The value.
       */
      getValue: function getValue() {}
    }
  });
  qx.ui.form.IStringForm.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "usage": "dynamic",
        "require": true
      },
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "qx.locale.Manager": {
        "construct": true
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "qx.dynlocale": {
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
       2004-2009 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * Mixin handling the valid and required properties for the form widgets.
   */
  qx.Mixin.define("qx.ui.form.MForm", {
    construct: function construct() {
      {
        qx.locale.Manager.getInstance().addListener("changeLocale", this.__onChangeLocale__P_166_0, this);
      }
    },
    properties: {
      /**
       * Flag signaling if a widget is valid. If a widget is invalid, an invalid
       * state will be set.
       */
      valid: {
        check: "Boolean",
        init: true,
        apply: "_applyValid",
        event: "changeValid"
      },

      /**
       * Flag signaling if a widget is required.
       */
      required: {
        check: "Boolean",
        init: false,
        event: "changeRequired"
      },

      /**
       * Message which is shown in an invalid tooltip.
       */
      invalidMessage: {
        check: "String",
        init: "",
        event: "changeInvalidMessage"
      },

      /**
       * Message which is shown in an invalid tooltip if the {@link #required} is
       * set to true.
       */
      requiredInvalidMessage: {
        check: "String",
        nullable: true,
        event: "changeInvalidMessage"
      }
    },
    members: {
      // apply method
      _applyValid: function _applyValid(value, old) {
        value ? this.removeState("invalid") : this.addState("invalid");
      },

      /**
       * Locale change event handler
       *
       * @signature function(e)
       * @param e {Event} the change event
       */
      __onChangeLocale__P_166_0: qx.core.Environment.select("qx.dynlocale", {
        "true": function _true(e) {
          // invalid message
          var invalidMessage = this.getInvalidMessage();

          if (invalidMessage && invalidMessage.translate) {
            this.setInvalidMessage(invalidMessage.translate());
          } // required invalid message


          var requiredInvalidMessage = this.getRequiredInvalidMessage();

          if (requiredInvalidMessage && requiredInvalidMessage.translate) {
            this.setRequiredInvalidMessage(requiredInvalidMessage.translate());
          }
        },
        "false": null
      })
    },
    destruct: function destruct() {
      {
        qx.locale.Manager.getInstance().removeListener("changeLocale", this.__onChangeLocale__P_166_0, this);
      }
    }
  });
  qx.ui.form.MForm.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "construct": true,
        "usage": "dynamic",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.Widget": {
        "construct": true,
        "require": true
      },
      "qx.ui.form.IStringForm": {
        "require": true
      },
      "qx.ui.form.IForm": {
        "require": true
      },
      "qx.ui.form.MForm": {
        "require": true
      },
      "qx.bom.client.Engine": {
        "require": true
      },
      "qx.bom.client.Browser": {
        "require": true
      },
      "qx.theme.manager.Color": {},
      "qx.theme.manager.Appearance": {},
      "qx.theme.manager.Font": {},
      "qx.lang.Object": {},
      "qx.ui.style.Stylesheet": {
        "defer": "runtime"
      },
      "qx.bom.client.Css": {
        "construct": true,
        "require": true
      },
      "qx.locale.Manager": {
        "construct": true,
        "defer": "runtime"
      },
      "qx.html.Input": {},
      "qx.util.ResourceManager": {},
      "qx.bom.webfonts.WebFont": {},
      "qx.bom.Font": {},
      "qx.html.Element": {},
      "qx.bom.Label": {},
      "qx.ui.core.queue.Layout": {},
      "qx.lang.Type": {},
      "qx.event.type.Data": {},
      "qx.html.Label": {},
      "qx.bom.Stylesheet": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "engine.name": {
          "className": "qx.bom.client.Engine"
        },
        "browser.name": {
          "className": "qx.bom.client.Browser"
        },
        "engine.version": {
          "className": "qx.bom.client.Engine"
        },
        "css.placeholder": {
          "construct": true,
          "className": "qx.bom.client.Css"
        },
        "browser.documentmode": {
          "className": "qx.bom.client.Browser"
        },
        "qx.dynlocale": {
          "load": true
        },
        "browser.version": {
          "className": "qx.bom.client.Browser"
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
       * Andreas Ecker (ecker)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * This is a basic form field with common functionality for
   * {@link TextArea} and {@link TextField}.
   *
   * On every keystroke the value is synchronized with the
   * value of the textfield. Value changes can be monitored by listening to the
   * {@link #input} or {@link #changeValue} events, respectively.
   */
  qx.Class.define("qx.ui.form.AbstractField", {
    extend: qx.ui.core.Widget,
    implement: [qx.ui.form.IStringForm, qx.ui.form.IForm],
    include: [qx.ui.form.MForm],
    type: "abstract",
    statics: {
      /** Stylesheet needed to style the native placeholder element. */
      __stylesheet__P_165_0: null,
      __addedPlaceholderRules__P_165_1: false,

      /**
       * Adds the CSS rules needed to style the native placeholder element.
       */
      __addPlaceholderRules__P_165_2: function __addPlaceholderRules__P_165_2() {
        if (qx.ui.form.AbstractField.__addedPlaceholderRules__P_165_1) {
          return;
        }

        qx.ui.form.AbstractField.__addedPlaceholderRules__P_165_1 = true;
        var engine = qx.core.Environment.get("engine.name");
        var browser = qx.core.Environment.get("browser.name");
        var colorManager = qx.theme.manager.Color.getInstance();
        var appearanceProperties = qx.theme.manager.Appearance.getInstance().styleFrom("textfield", {
          showingPlaceholder: true
        });
        var styles = {};
        var color = null;
        var font = null;

        if (appearanceProperties) {
          color = appearanceProperties["textColor"] ? colorManager.resolve(appearanceProperties["textColor"]) : null;
          font = appearanceProperties["font"] ? qx.theme.manager.Font.getInstance().resolve(appearanceProperties["font"]) : null;
        }

        if (!color) {
          color = colorManager.resolve("text-placeholder");
        }

        if (color) {
          styles.color = color + " !important";
        }

        if (font) {
          qx.lang.Object.mergeWith(styles, font.getStyles(), false);
        }

        var selector;

        if (engine == "gecko") {
          // see https://developer.mozilla.org/de/docs/CSS/:-moz-placeholder for details
          if (parseFloat(qx.core.Environment.get("engine.version")) >= 19) {
            selector = "input::-moz-placeholder, textarea::-moz-placeholder";
          } else {
            selector = "input:-moz-placeholder, textarea:-moz-placeholder";
          }
        } else if (engine == "webkit" && browser != "edge") {
          selector = "input.qx-placeholder-color::-webkit-input-placeholder, textarea.qx-placeholder-color::-webkit-input-placeholder";
        } else if (engine == "mshtml" || browser == "edge") {
          var separator = browser == "edge" ? "::" : ":";
          selector = ["input.qx-placeholder-color", "-ms-input-placeholder, textarea.qx-placeholder-color", "-ms-input-placeholder"].join(separator);
          qx.ui.style.Stylesheet.getInstance().addRule(selector, "color: " + color + " !important");
        }
      }
    },

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param value {String} initial text value of the input field ({@link #setValue}).
     */
    construct: function construct(value) {
      qx.ui.core.Widget.constructor.call(this); // shortcut for placeholder feature detection

      this.__useQxPlaceholder__P_165_3 = !qx.core.Environment.get("css.placeholder");

      if (value != null) {
        this.setValue(value);
      }

      this.getContentElement().addListener("change", this._onChangeContent, this); // use qooxdoo placeholder if no native placeholder is supported

      if (this.__useQxPlaceholder__P_165_3) {
        // assign the placeholder text after the appearance has been applied
        this.addListener("syncAppearance", this._syncPlaceholder, this);
      } else {
        // add rules for native placeholder color
        qx.ui.form.AbstractField.__addPlaceholderRules__P_165_2(); // add a class to the input to restrict the placeholder color


        this.getContentElement().addClass("qx-placeholder-color");
      } // translation support


      {
        qx.locale.Manager.getInstance().addListener("changeLocale", this._onChangeLocale, this);
      }
    },

    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */
    events: {
      /**
       * The event is fired on every keystroke modifying the value of the field.
       *
       * The method {@link qx.event.type.Data#getData} returns the
       * current value of the text field.
       */
      input: "qx.event.type.Data",

      /**
       * The event is fired each time the text field looses focus and the
       * text field values has changed.
       *
       * If you change {@link #liveUpdate} to true, the changeValue event will
       * be fired after every keystroke and not only after every focus loss. In
       * that mode, the changeValue event is equal to the {@link #input} event.
       *
       * The method {@link qx.event.type.Data#getData} returns the
       * current text value of the field.
       */
      changeValue: "qx.event.type.Data"
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /**
       * Alignment of the text
       */
      textAlign: {
        check: ["left", "center", "right"],
        nullable: true,
        themeable: true,
        apply: "_applyTextAlign"
      },

      /** Whether the field is read only */
      readOnly: {
        check: "Boolean",
        apply: "_applyReadOnly",
        event: "changeReadOnly",
        init: false
      },
      // overridden
      selectable: {
        refine: true,
        init: true
      },
      // overridden
      focusable: {
        refine: true,
        init: true
      },

      /** Maximal number of characters that can be entered in the TextArea. */
      maxLength: {
        apply: "_applyMaxLength",
        check: "PositiveInteger",
        init: Infinity
      },

      /**
       * Whether the {@link #changeValue} event should be fired on every key
       * input. If set to true, the changeValue event is equal to the
       * {@link #input} event.
       */
      liveUpdate: {
        check: "Boolean",
        init: false
      },

      /**
       * Fire a {@link #changeValue} event whenever the content of the
       * field matches the given regular expression. Accepts both regular
       * expression objects as well as strings for input.
       */
      liveUpdateOnRxMatch: {
        check: "RegExp",
        transform: "_string2RegExp",
        init: null
      },

      /**
       * String value which will be shown as a hint if the field is all of:
       * unset, unfocused and enabled. Set to null to not show a placeholder
       * text.
       */
      placeholder: {
        check: "String",
        nullable: true,
        apply: "_applyPlaceholder"
      },

      /**
       * RegExp responsible for filtering the value of the textfield. the RegExp
       * gives the range of valid values.
       * Note: The regexp specified is applied to each character in turn,
       * NOT to the entire string. So only regular expressions matching a
       * single character make sense in the context.
       * The following example only allows digits in the textfield.
       * <pre class='javascript'>field.setFilter(/[0-9]/);</pre>
       */
      filter: {
        check: "RegExp",
        nullable: true,
        init: null
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    /* eslint-disable @qooxdoo/qx/no-refs-in-members */
    members: {
      __nullValue__P_165_4: true,
      _placeholder: null,
      __oldValue__P_165_5: null,
      __oldInputValue__P_165_6: null,
      __useQxPlaceholder__P_165_3: true,
      __font__P_165_7: null,
      __webfontListenerId__P_165_8: null,

      /*
      ---------------------------------------------------------------------------
        WIDGET API
      ---------------------------------------------------------------------------
      */
      // overridden
      getFocusElement: function getFocusElement() {
        var el = this.getContentElement();

        if (el) {
          return el;
        }
      },

      /**
       * Creates the input element. Derived classes may override this
       * method, to create different input elements.
       *
       * @return {qx.html.Input} a new input element.
       */
      _createInputElement: function _createInputElement() {
        return new qx.html.Input("text");
      },
      // overridden
      renderLayout: function renderLayout(left, top, width, height) {
        var updateInsets = this._updateInsets;
        var changes = qx.ui.form.AbstractField.superclass.prototype.renderLayout.call(this, left, top, width, height); // Directly return if superclass has detected that no
        // changes needs to be applied

        if (!changes) {
          return;
        }

        var inner = changes.size || updateInsets;
        var pixel = "px";

        if (inner || changes.local || changes.margin) {
          var innerWidth = width;
          var innerHeight = height;
        }

        var input = this.getContentElement(); // we don't need to update positions on native placeholders

        if (updateInsets && this.__useQxPlaceholder__P_165_3) {
          if (this.__useQxPlaceholder__P_165_3) {
            var insets = this.getInsets();

            this._getPlaceholderElement().setStyles({
              paddingTop: insets.top + pixel,
              paddingRight: insets.right + pixel,
              paddingBottom: insets.bottom + pixel,
              paddingLeft: insets.left + pixel
            });
          }
        }

        if (inner || changes.margin) {
          // we don't need to update dimensions on native placeholders
          if (this.__useQxPlaceholder__P_165_3) {
            var insets = this.getInsets();

            this._getPlaceholderElement().setStyles({
              width: innerWidth - insets.left - insets.right + pixel,
              height: innerHeight - insets.top - insets.bottom + pixel
            });
          }

          input.setStyles({
            width: innerWidth + pixel,
            height: innerHeight + pixel
          });

          this._renderContentElement(innerHeight, input);
        }

        if (changes.position) {
          if (this.__useQxPlaceholder__P_165_3) {
            this._getPlaceholderElement().setStyles({
              left: left + pixel,
              top: top + pixel
            });
          }
        }
      },

      /**
       * Hook into {@link qx.ui.form.AbstractField#renderLayout} method.
       * Called after the contentElement has a width and an innerWidth.
       *
       * Note: This was introduced to fix BUG#1585
       *
       * @param innerHeight {Integer} The inner height of the element.
       * @param element {Element} The element.
       */
      _renderContentElement: function _renderContentElement(innerHeight, element) {//use it in child classes
      },
      // overridden
      _createContentElement: function _createContentElement() {
        // create and add the input element
        var el = this._createInputElement(); // initialize the html input


        el.setSelectable(this.getSelectable());
        el.setEnabled(this.getEnabled()); // Add listener for input event

        el.addListener("input", this._onHtmlInput, this); // Disable HTML5 spell checking

        el.setAttribute("spellcheck", "false");
        el.addClass("qx-abstract-field"); // IE8 in standard mode needs some extra love here to receive events.

        if (qx.core.Environment.get("engine.name") == "mshtml" && qx.core.Environment.get("browser.documentmode") == 8) {
          el.setStyles({
            backgroundImage: "url(" + qx.util.ResourceManager.getInstance().toUri("qx/static/blank.gif") + ")"
          });
        }

        return el;
      },
      // overridden
      _applyEnabled: function _applyEnabled(value, old) {
        qx.ui.form.AbstractField.superclass.prototype._applyEnabled.call(this, value, old);

        this.getContentElement().setEnabled(value);

        if (this.__useQxPlaceholder__P_165_3) {
          if (value) {
            this._showPlaceholder();
          } else {
            this._removePlaceholder();
          }
        } else {
          var input = this.getContentElement(); // remove the placeholder on disabled input elements

          input.setAttribute("placeholder", value ? this.getPlaceholder() : "");
        }
      },
      // default text sizes

      /**
       * @lint ignoreReferenceField(__textSize)
       */
      __textSize__P_165_9: {
        width: 16,
        height: 16
      },
      // overridden
      _getContentHint: function _getContentHint() {
        return {
          width: this.__textSize__P_165_9.width * 10,
          height: this.__textSize__P_165_9.height || 16
        };
      },
      // overridden
      _applyFont: function _applyFont(value, old) {
        if (old && this.__font__P_165_7 && this.__webfontListenerId__P_165_8) {
          this.__font__P_165_7.removeListenerById(this.__webfontListenerId__P_165_8);

          this.__webfontListenerId__P_165_8 = null;
        } // Apply


        var styles;

        if (value) {
          this.__font__P_165_7 = qx.theme.manager.Font.getInstance().resolve(value);

          if (this.__font__P_165_7 instanceof qx.bom.webfonts.WebFont) {
            this.__webfontListenerId__P_165_8 = this.__font__P_165_7.addListener("changeStatus", this._onWebFontStatusChange, this);
          }

          styles = this.__font__P_165_7.getStyles();
        } else {
          styles = qx.bom.Font.getDefaultStyles();
        } // check if text color already set - if so this local value has higher priority


        if (this.getTextColor() != null) {
          delete styles["color"];
        } // apply the font to the content element
        // IE 8 - 10 (but not 11 Preview) will ignore the lineHeight value
        // unless it's applied directly.


        if (qx.core.Environment.get("engine.name") == "mshtml" && qx.core.Environment.get("browser.documentmode") < 11) {
          qx.html.Element.flush();
          this.getContentElement().setStyles(styles, true);
        } else {
          this.getContentElement().setStyles(styles);
        } // the font will adjust automatically on native placeholders


        if (this.__useQxPlaceholder__P_165_3) {
          // don't apply the color to the placeholder
          delete styles["color"]; // apply the font to the placeholder

          this._getPlaceholderElement().setStyles(styles);
        } // Compute text size


        if (value) {
          this.__textSize__P_165_9 = qx.bom.Label.getTextSize("A", styles);
        } else {
          delete this.__textSize__P_165_9;
        } // Update layout


        qx.ui.core.queue.Layout.add(this);
      },
      // overridden
      _applyTextColor: function _applyTextColor(value, old) {
        if (value) {
          this.getContentElement().setStyle("color", qx.theme.manager.Color.getInstance().resolve(value));
        } else {
          this.getContentElement().removeStyle("color");
        }
      },
      // property apply
      _applyMaxLength: function _applyMaxLength(value, old) {
        if (value) {
          this.getContentElement().setAttribute("maxLength", value);
        } else {
          this.getContentElement().removeAttribute("maxLength");
        }
      },
      // property transform
      _string2RegExp: function _string2RegExp(value, old) {
        if (qx.lang.Type.isString(value)) {
          value = new RegExp(value);
        }

        return value;
      },
      // overridden
      tabFocus: function tabFocus() {
        qx.ui.form.AbstractField.superclass.prototype.tabFocus.call(this);
        this.selectAllText();
      },

      /**
       * Returns the text size.
       * @return {Map} The text size.
       */
      _getTextSize: function _getTextSize() {
        return this.__textSize__P_165_9;
      },

      /*
      ---------------------------------------------------------------------------
        EVENTS
      ---------------------------------------------------------------------------
      */

      /**
       * Event listener for native input events. Redirects the event
       * to the widget. Also checks for the filter and max length.
       *
       * @param e {qx.event.type.Data} Input event
       */
      _onHtmlInput: function _onHtmlInput(e) {
        var value = e.getData();
        var fireEvents = true;
        this.__nullValue__P_165_4 = false; // value unchanged; Firefox fires "input" when pressing ESC [BUG #5309]

        if (this.__oldInputValue__P_165_6 && this.__oldInputValue__P_165_6 === value) {
          fireEvents = false;
        } // check for the filter


        if (this.getFilter() != null) {
          var filteredValue = this._validateInput(value);

          if (filteredValue != value) {
            fireEvents = this.__oldInputValue__P_165_6 !== filteredValue;
            value = filteredValue;
            this.getContentElement().setValue(value);
          }
        } // fire the events, if necessary


        if (fireEvents) {
          // store the old input value
          this.fireDataEvent("input", value, this.__oldInputValue__P_165_6);
          this.__oldInputValue__P_165_6 = value; // check for the live change event

          if (this.getLiveUpdate()) {
            this.__fireChangeValueEvent__P_165_10(value);
          } // check for the liveUpdateOnRxMatch change event
          else {
            var fireRx = this.getLiveUpdateOnRxMatch();

            if (fireRx && value.match(fireRx)) {
              this.__fireChangeValueEvent__P_165_10(value);
            }
          }
        }
      },

      /**
       * Triggers text size recalculation after a web font was loaded
       *
       * @param ev {qx.event.type.Data} "changeStatus" event
       */
      _onWebFontStatusChange: function _onWebFontStatusChange(ev) {
        if (ev.getData().valid === true) {
          var styles = this.__font__P_165_7.getStyles();

          this.__textSize__P_165_9 = qx.bom.Label.getTextSize("A", styles);
          qx.ui.core.queue.Layout.add(this);
        }
      },

      /**
       * Handles the firing of the changeValue event including the local cache
       * for sending the old value in the event.
       *
       * @param value {String} The new value.
       */
      __fireChangeValueEvent__P_165_10: function __fireChangeValueEvent__P_165_10(value) {
        var old = this.__oldValue__P_165_5;
        this.__oldValue__P_165_5 = value;

        if (old != value) {
          this.fireNonBubblingEvent("changeValue", qx.event.type.Data, [value, old]);
        }
      },

      /*
      ---------------------------------------------------------------------------
        TEXTFIELD VALUE API
      ---------------------------------------------------------------------------
      */

      /**
       * Sets the value of the textfield to the given value.
       *
       * @param value {String} The new value
       */
      setValue: function setValue(value) {
        if (this.isDisposed()) {
          return null;
        } // handle null values


        if (value === null) {
          // just do nothing if null is already set
          if (this.__nullValue__P_165_4) {
            return value;
          }

          value = "";
          this.__nullValue__P_165_4 = true;
        } else {
          this.__nullValue__P_165_4 = false; // native placeholders will be removed by the browser

          if (this.__useQxPlaceholder__P_165_3) {
            this._removePlaceholder();
          }
        }

        if (qx.lang.Type.isString(value)) {
          var elem = this.getContentElement();

          if (elem.getValue() != value) {
            var oldValue = elem.getValue();
            elem.setValue(value);
            var data = this.__nullValue__P_165_4 ? null : value;
            this.__oldValue__P_165_5 = oldValue;

            this.__fireChangeValueEvent__P_165_10(data); // reset the input value on setValue calls [BUG #6892]


            this.__oldInputValue__P_165_6 = this.__oldValue__P_165_5;
          } // native placeholders will be shown by the browser


          if (this.__useQxPlaceholder__P_165_3) {
            this._showPlaceholder();
          }

          return value;
        }

        throw new Error("Invalid value type: " + value);
      },

      /**
       * Returns the current value of the textfield.
       *
       * @return {String|null} The current value
       */
      getValue: function getValue() {
        return this.isDisposed() || this.__nullValue__P_165_4 ? null : this.getContentElement().getValue();
      },

      /**
       * Resets the value to the default
       */
      resetValue: function resetValue() {
        this.setValue(null);
      },

      /**
       * Event listener for change event of content element
       *
       * @param e {qx.event.type.Data} Incoming change event
       */
      _onChangeContent: function _onChangeContent(e) {
        this.__nullValue__P_165_4 = e.getData() === null;

        this.__fireChangeValueEvent__P_165_10(e.getData());
      },

      /*
      ---------------------------------------------------------------------------
        TEXTFIELD SELECTION API
      ---------------------------------------------------------------------------
      */

      /**
       * Returns the current selection.
       * This method only works if the widget is already created and
       * added to the document.
       *
       * @return {String|null}
       */
      getTextSelection: function getTextSelection() {
        return this.getContentElement().getTextSelection();
      },

      /**
       * Returns the current selection length.
       * This method only works if the widget is already created and
       * added to the document.
       *
       * @return {Integer|null}
       */
      getTextSelectionLength: function getTextSelectionLength() {
        return this.getContentElement().getTextSelectionLength();
      },

      /**
       * Returns the start of the text selection
       *
       * @return {Integer|null} Start of selection or null if not available
       */
      getTextSelectionStart: function getTextSelectionStart() {
        return this.getContentElement().getTextSelectionStart();
      },

      /**
       * Returns the end of the text selection
       *
       * @return {Integer|null} End of selection or null if not available
       */
      getTextSelectionEnd: function getTextSelectionEnd() {
        return this.getContentElement().getTextSelectionEnd();
      },

      /**
       * Set the selection to the given start and end (zero-based).
       * If no end value is given the selection will extend to the
       * end of the textfield's content.
       * This method only works if the widget is already created and
       * added to the document.
       *
       * @param start {Integer} start of the selection (zero-based)
       * @param end {Integer} end of the selection
       */
      setTextSelection: function setTextSelection(start, end) {
        this.getContentElement().setTextSelection(start, end);
      },

      /**
       * Clears the current selection.
       * This method only works if the widget is already created and
       * added to the document.
       *
       */
      clearTextSelection: function clearTextSelection() {
        this.getContentElement().clearTextSelection();
      },

      /**
       * Selects the whole content
       *
       */
      selectAllText: function selectAllText() {
        this.setTextSelection(0);
      },

      /*
      ---------------------------------------------------------------------------
        PLACEHOLDER HELPERS
      ---------------------------------------------------------------------------
      */
      // overridden
      setLayoutParent: function setLayoutParent(parent) {
        qx.ui.form.AbstractField.superclass.prototype.setLayoutParent.call(this, parent);

        if (this.__useQxPlaceholder__P_165_3) {
          if (parent) {
            this.getLayoutParent().getContentElement().add(this._getPlaceholderElement());
          } else {
            var placeholder = this._getPlaceholderElement();

            placeholder.getParent().remove(placeholder);
          }
        }
      },

      /**
       * Helper to show the placeholder text in the field. It checks for all
       * states and possible conditions and shows the placeholder only if allowed.
       */
      _showPlaceholder: function _showPlaceholder() {
        var fieldValue = this.getValue() || "";
        var placeholder = this.getPlaceholder();

        if (placeholder != null && fieldValue == "" && !this.hasState("focused") && !this.hasState("disabled")) {
          if (this.hasState("showingPlaceholder")) {
            this._syncPlaceholder();
          } else {
            // the placeholder will be set as soon as the appearance is applied
            this.addState("showingPlaceholder");
          }
        }
      },

      /**
       * Remove the fake placeholder
       */
      _onPointerDownPlaceholder: function _onPointerDownPlaceholder() {
        window.setTimeout(function () {
          this.focus();
        }.bind(this), 0);
      },

      /**
       * Helper to remove the placeholder. Deletes the placeholder text from the
       * field and removes the state.
       */
      _removePlaceholder: function _removePlaceholder() {
        if (this.hasState("showingPlaceholder")) {
          if (this.__useQxPlaceholder__P_165_3) {
            this._getPlaceholderElement().setStyle("visibility", "hidden");
          }

          this.removeState("showingPlaceholder");
        }
      },

      /**
       * Updates the placeholder text with the DOM
       */
      _syncPlaceholder: function _syncPlaceholder() {
        if (this.hasState("showingPlaceholder") && this.__useQxPlaceholder__P_165_3) {
          this._getPlaceholderElement().setStyle("visibility", "visible");
        }
      },

      /**
       * Returns the placeholder label and creates it if necessary.
       */
      _getPlaceholderElement: function _getPlaceholderElement() {
        if (this._placeholder == null) {
          // create the placeholder
          this._placeholder = new qx.html.Label();
          var colorManager = qx.theme.manager.Color.getInstance();

          this._placeholder.setStyles({
            zIndex: 11,
            position: "absolute",
            color: colorManager.resolve("text-placeholder"),
            whiteSpace: "normal",
            // enable wrap by default
            cursor: "text",
            visibility: "hidden"
          });

          this._placeholder.addListener("pointerdown", this._onPointerDownPlaceholder, this);
        }

        return this._placeholder;
      },

      /**
       * Locale change event handler
       *
       * @signature function(e)
       * @param e {Event} the change event
       */
      _onChangeLocale: qx.core.Environment.select("qx.dynlocale", {
        "true": function _true(e) {
          var content = this.getPlaceholder();

          if (content && content.translate) {
            this.setPlaceholder(content.translate());
          }
        },
        "false": null
      }),
      // overridden
      _onChangeTheme: function _onChangeTheme() {
        qx.ui.form.AbstractField.superclass.prototype._onChangeTheme.call(this);

        if (this._placeholder) {
          // delete the placeholder element because it uses a theme dependent color
          this._placeholder.dispose();

          this._placeholder = null;
        }

        if (!this.__useQxPlaceholder__P_165_3 && qx.ui.form.AbstractField.__stylesheet__P_165_0) {
          qx.bom.Stylesheet.removeSheet(qx.ui.form.AbstractField.__stylesheet__P_165_0);
          qx.ui.form.AbstractField.__stylesheet__P_165_0 = null;

          qx.ui.form.AbstractField.__addPlaceholderRules__P_165_2();
        }
      },

      /**
       * Validates the the input value.
       *
       * @param value {Object} The value to check
       * @returns The checked value
       */
      _validateInput: function _validateInput(value) {
        var filteredValue = value;
        var filter = this.getFilter(); // If no filter is set return just the value

        if (filter !== null) {
          filteredValue = "";
          var index = value.search(filter);
          var processedValue = value;

          while (index >= 0 && processedValue.length > 0) {
            filteredValue = filteredValue + processedValue.charAt(index);
            processedValue = processedValue.substring(index + 1, processedValue.length);
            index = processedValue.search(filter);
          }
        }

        return filteredValue;
      },

      /*
      ---------------------------------------------------------------------------
        PROPERTY APPLY ROUTINES
      ---------------------------------------------------------------------------
      */
      // property apply
      _applyPlaceholder: function _applyPlaceholder(value, old) {
        if (this.__useQxPlaceholder__P_165_3) {
          this._getPlaceholderElement().setValue(value);

          if (value != null) {
            this.addListener("focusin", this._removePlaceholder, this);
            this.addListener("focusout", this._showPlaceholder, this);

            this._showPlaceholder();
          } else {
            this.removeListener("focusin", this._removePlaceholder, this);
            this.removeListener("focusout", this._showPlaceholder, this);

            this._removePlaceholder();
          }
        } else {
          // only apply if the widget is enabled
          if (this.getEnabled()) {
            this.getContentElement().setAttribute("placeholder", value);

            if (qx.core.Environment.get("browser.name") === "firefox" && parseFloat(qx.core.Environment.get("browser.version")) < 36 && this.getContentElement().getNodeName() === "textarea" && !this.getContentElement().getDomElement()) {
              /* qx Bug #8870: Firefox 35 will not display a text area's
                 placeholder text if the attribute is set before the
                 element is added to the DOM. This is fixed in FF 36. */
              this.addListenerOnce("appear", function () {
                this.getContentElement().getDomElement().removeAttribute("placeholder");
                this.getContentElement().getDomElement().setAttribute("placeholder", value);
              }, this);
            }
          }
        }
      },
      // property apply
      _applyTextAlign: function _applyTextAlign(value, old) {
        this.getContentElement().setStyle("textAlign", value);
      },
      // property apply
      _applyReadOnly: function _applyReadOnly(value, old) {
        var element = this.getContentElement();
        element.setAttribute("readOnly", value);

        if (value) {
          this.addState("readonly");
          this.setFocusable(false);
        } else {
          this.removeState("readonly");
          this.setFocusable(true);
        }
      }
    },
    defer: function defer(statics) {
      var css = "border: none;padding: 0;margin: 0;display : block;background : transparent;outline: none;appearance: none;position: absolute;autoComplete: off;resize: none;border-radius: 0;";
      qx.ui.style.Stylesheet.getInstance().addRule(".qx-abstract-field", css);
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      if (this._placeholder) {
        this._placeholder.removeListener("pointerdown", this._onPointerDownPlaceholder, this);

        var parent = this._placeholder.getParent();

        if (parent) {
          parent.remove(this._placeholder);
        }

        this._placeholder.dispose();
      }

      this._placeholder = this.__font__P_165_7 = null;
      {
        qx.locale.Manager.getInstance().removeListener("changeLocale", this._onChangeLocale, this);
      }

      if (this.__font__P_165_7 && this.__webfontListenerId__P_165_8) {
        this.__font__P_165_7.removeListenerById(this.__webfontListenerId__P_165_8);
      }

      this.getContentElement().removeListener("input", this._onHtmlInput, this);
    }
  });
  qx.ui.form.AbstractField.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.form.AbstractField": {
        "require": true
      },
      "qx.bom.client.Engine": {
        "require": true
      },
      "qx.bom.client.Browser": {
        "require": true
      },
      "qx.bom.client.Device": {
        "require": true
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "engine.name": {
          "className": "qx.bom.client.Engine"
        },
        "engine.version": {
          "className": "qx.bom.client.Engine"
        },
        "browser.documentmode": {
          "className": "qx.bom.client.Browser"
        },
        "device.type": {
          "className": "qx.bom.client.Device"
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
       * Andreas Ecker (ecker)
       * Fabian Jakobs (fjakobs)
       * Adrian Olaru (adrianolaru)
  
  ************************************************************************ */

  /**
   * The TextField is a single-line text input field.
   */
  qx.Class.define("qx.ui.form.TextField", {
    extend: qx.ui.form.AbstractField,

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      // overridden
      appearance: {
        refine: true,
        init: "textfield"
      },
      // overridden
      allowGrowY: {
        refine: true,
        init: false
      },
      // overridden
      allowShrinkY: {
        refine: true,
        init: false
      }
    },
    members: {
      // overridden
      _renderContentElement: function _renderContentElement(innerHeight, element) {
        if (qx.core.Environment.get("engine.name") == "mshtml" && (parseInt(qx.core.Environment.get("engine.version"), 10) < 9 || qx.core.Environment.get("browser.documentmode") < 9)) {
          element.setStyles({
            "line-height": innerHeight + "px"
          });
        }
      },
      // overridden
      _createContentElement: function _createContentElement() {
        var el = qx.ui.form.TextField.superclass.prototype._createContentElement.call(this);

        var deviceType = qx.core.Environment.get("device.type");

        if (deviceType == "tablet" || deviceType == "mobile") {
          el.addListener("keypress", this._onKeyPress, this);
        }

        return el;
      },

      /**
       * Close the virtual keyboard if the Enter key is pressed.
       * @param evt {qx.event.type.KeySequence} the keypress event.
       */
      _onKeyPress: function _onKeyPress(evt) {
        // On return
        if (evt.getKeyIdentifier() == "Enter") {
          if (this.isFocusable()) {
            this.blur();
          } else {
            // When the text field is not focusable, blur() will raise an exception on
            // touch devices and the virtual keyboard is not closed. To work around this
            // issue, we're enabling the focus just for the blur() call.
            this.setFocusable(true);
            this.blur();
            this.setFocusable(false);
          }
        }
      }
    },
    destruct: function destruct() {
      this.getContentElement().removeListener("keypress", this._onKeyPress, this);
    }
  });
  qx.ui.form.TextField.$$dbClassInfo = $$dbClassInfo;
})();
//# sourceMappingURL=package-13.js.map?dt=1651479039730
qx.$$packageData['13'] = {
  "locales": {},
  "resources": {},
  "translations": {}
};
