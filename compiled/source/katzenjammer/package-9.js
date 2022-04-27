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

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "construct": true,
        "require": true
      },
      "qx.core.IDisposable": {
        "require": true
      },
      "qx.event.Emitter": {
        "construct": true
      },
      "qx.util.Uri": {},
      "qx.bom.client.Engine": {},
      "qx.bom.client.Browser": {}
    },
    "environment": {
      "provided": ["qx.debug.io"],
      "required": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Tristan Koch (tristankoch)
  
  ************************************************************************ */

  /**
   * Script loader with interface similar to
   * <a href="http://www.w3.org/TR/XMLHttpRequest/">XmlHttpRequest</a>.
   *
   * The script loader can be used to load scripts from arbitrary sources.
   * <span class="desktop">
   * For JSONP requests, consider the {@link qx.bom.request.Jsonp} transport
   * that derives from the script loader.
   * </span>
   *
   * <div class="desktop">
   * Example:
   *
   * <pre class="javascript">
   *  var req = new qx.bom.request.Script();
   *  req.onload = function() {
   *    // Script is loaded and parsed and
   *    // globals set are available
   *  }
   *
   *  req.open("GET", url);
   *  req.send();
   * </pre>
   * </div>
   *
   * @ignore(qx.core, qx.core.Environment.*)
   * @require(qx.bom.request.Script#_success)
   * @require(qx.bom.request.Script#abort)
   * @require(qx.bom.request.Script#dispose)
   * @require(qx.bom.request.Script#isDisposed)
   * @require(qx.bom.request.Script#getAllResponseHeaders)
   * @require(qx.bom.request.Script#getResponseHeader)
   * @require(qx.bom.request.Script#setDetermineSuccess)
   * @require(qx.bom.request.Script#setRequestHeader)
   *
   * @group (IO)
   */
  qx.Bootstrap.define("qx.bom.request.Script", {
    implement: [qx.core.IDisposable],
    construct: function construct() {
      this.__initXhrProperties__P_169_0();

      this.__onNativeLoadBound__P_169_1 = qx.Bootstrap.bind(this._onNativeLoad, this);
      this.__onNativeErrorBound__P_169_2 = qx.Bootstrap.bind(this._onNativeError, this);
      this.__onTimeoutBound__P_169_3 = qx.Bootstrap.bind(this._onTimeout, this);
      this.__headElement__P_169_4 = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
      this._emitter = new qx.event.Emitter(); // BUGFIX: Browsers not supporting error handler
      // Set default timeout to capture network errors
      //
      // Note: The script is parsed and executed, before a "load" is fired.

      this.timeout = this.__supportsErrorHandler__P_169_5() ? 0 : 15000;
    },
    events: {
      /** Fired at ready state changes. */
      readystatechange: "qx.bom.request.Script",

      /** Fired on error. */
      error: "qx.bom.request.Script",

      /** Fired at loadend. */
      loadend: "qx.bom.request.Script",

      /** Fired on timeouts. */
      timeout: "qx.bom.request.Script",

      /** Fired when the request is aborted. */
      abort: "qx.bom.request.Script",

      /** Fired on successful retrieval. */
      load: "qx.bom.request.Script"
    },
    members: {
      /**
       * @type {Number} Ready state.
       *
       * States can be:
       * UNSENT:           0,
       * OPENED:           1,
       * LOADING:          2,
       * LOADING:          3,
       * DONE:             4
       *
       * Contrary to {@link qx.bom.request.Xhr#readyState}, the script transport
       * does not receive response headers. For compatibility, another LOADING
       * state is implemented that replaces the HEADERS_RECEIVED state.
       */
      readyState: null,

      /**
       * @type {Number} The status code.
       *
       * Note: The script transport cannot determine the HTTP status code.
       */
      status: null,

      /**
       * @type {String} The status text.
       *
       * The script transport does not receive response headers. For compatibility,
       * the statusText property is set to the status casted to string.
       */
      statusText: null,

      /**
       * @type {Number} Timeout limit in milliseconds.
       *
       * 0 (default) means no timeout.
       */
      timeout: null,

      /**
       * @type {Function} Function that is executed once the script was loaded.
       */
      __determineSuccess__P_169_6: null,

      /**
       * Add an event listener for the given event name.
       *
       * @param name {String} The name of the event to listen to.
       * @param listener {Function} The function to execute when the event is fired
       * @param ctx {var?} The context of the listener.
       * @return {qx.bom.request.Script} Self for chaining.
       */
      on: function on(name, listener, ctx) {
        this._emitter.on(name, listener, ctx);

        return this;
      },

      /**
       * Initializes (prepares) request.
       *
       * @param method {String}
       *   The HTTP method to use.
       *   This parameter exists for compatibility reasons. The script transport
       *   does not support methods other than GET.
       * @param url {String}
       *   The URL to which to send the request.
       */
      open: function open(method, url) {
        if (this.__disposed__P_169_7) {
          return;
        } // Reset XHR properties that may have been set by previous request


        this.__initXhrProperties__P_169_0();

        this.__abort__P_169_8 = null;
        this.__url__P_169_9 = url;

        if (this.__environmentGet__P_169_10("qx.debug.io")) {
          qx.Bootstrap.debug(qx.bom.request.Script, "Open native request with url: " + url);
        }

        this._readyStateChange(1);
      },

      /**
       * Appends a query parameter to URL.
       *
       * This method exists for compatibility reasons. The script transport
       * does not support request headers. However, many services parse query
       * parameters like request headers.
       *
       * Note: The request must be initialized before using this method.
       *
       * @param key {String}
       *  The name of the header whose value is to be set.
       * @param value {String}
       *  The value to set as the body of the header.
       * @return {qx.bom.request.Script} Self for chaining.
       */
      setRequestHeader: function setRequestHeader(key, value) {
        if (this.__disposed__P_169_7) {
          return null;
        }

        var param = {};

        if (this.readyState !== 1) {
          throw new Error("Invalid state");
        }

        param[key] = value;
        this.__url__P_169_9 = qx.util.Uri.appendParamsToUrl(this.__url__P_169_9, param);
        return this;
      },

      /**
       * Sends request.
       * @return {qx.bom.request.Script} Self for chaining.
       */
      send: function send() {
        if (this.__disposed__P_169_7) {
          return null;
        }

        var script = this.__createScriptElement__P_169_11(),
            head = this.__headElement__P_169_4,
            that = this;

        if (this.timeout > 0) {
          this.__timeoutId__P_169_12 = window.setTimeout(this.__onTimeoutBound__P_169_3, this.timeout);
        }

        if (this.__environmentGet__P_169_10("qx.debug.io")) {
          qx.Bootstrap.debug(qx.bom.request.Script, "Send native request");
        } // Attach script to DOM


        head.insertBefore(script, head.firstChild); // The resource is loaded once the script is in DOM.
        // Assume HEADERS_RECEIVED and LOADING and dispatch async.

        window.setTimeout(function () {
          that._readyStateChange(2);

          that._readyStateChange(3);
        });
        return this;
      },

      /**
       * Aborts request.
       * @return {qx.bom.request.Script} Self for chaining.
       */
      abort: function abort() {
        if (this.__disposed__P_169_7) {
          return null;
        }

        this.__abort__P_169_8 = true;

        this.__disposeScriptElement__P_169_13();

        this._emit("abort");

        return this;
      },

      /**
       * Helper to emit events and call the callback methods.
       * @param event {String} The name of the event.
       */
      _emit: function _emit(event) {
        this["on" + event]();

        this._emitter.emit(event, this);
      },

      /**
       * Event handler for an event that fires at every state change.
       *
       * Replace with custom method to get informed about the communication progress.
       */
      onreadystatechange: function onreadystatechange() {},

      /**
       * Event handler for XHR event "load" that is fired on successful retrieval.
       *
       * Note: This handler is called even when an invalid script is returned.
       *
       * Warning: Internet Explorer < 9 receives a false "load" for invalid URLs.
       * This "load" is fired about 2 seconds after sending the request. To
       * distinguish from a real "load", consider defining a custom check
       * function using {@link #setDetermineSuccess} and query the status
       * property. However, the script loaded needs to have a known impact on
       * the global namespace. If this does not work for you, you may be able
       * to set a timeout lower than 2 seconds, depending on script size,
       * complexity and execution time.
       *
       * Replace with custom method to listen to the "load" event.
       */
      onload: function onload() {},

      /**
       * Event handler for XHR event "loadend" that is fired on retrieval.
       *
       * Note: This handler is called even when a network error (or similar)
       * occurred.
       *
       * Replace with custom method to listen to the "loadend" event.
       */
      onloadend: function onloadend() {},

      /**
       * Event handler for XHR event "error" that is fired on a network error.
       *
       * Note: Some browsers do not support the "error" event.
       *
       * Replace with custom method to listen to the "error" event.
       */
      onerror: function onerror() {},

      /**
       * Event handler for XHR event "abort" that is fired when request
       * is aborted.
       *
       * Replace with custom method to listen to the "abort" event.
       */
      onabort: function onabort() {},

      /**
       * Event handler for XHR event "timeout" that is fired when timeout
       * interval has passed.
       *
       * Replace with custom method to listen to the "timeout" event.
       */
      ontimeout: function ontimeout() {},

      /**
       * Get a single response header from response.
       *
       * Note: This method exists for compatibility reasons. The script
       * transport does not receive response headers.
       *
       * @param key {String}
       *  Key of the header to get the value from.
       * @return {String|null} Warning message or <code>null</code> if the request
       * is disposed
       */
      getResponseHeader: function getResponseHeader(key) {
        if (this.__disposed__P_169_7) {
          return null;
        }

        if (this.__environmentGet__P_169_10("qx.debug")) {
          qx.Bootstrap.debug("Response header cannot be determined for requests made with script transport.");
        }

        return "unknown";
      },

      /**
       * Get all response headers from response.
       *
       * Note: This method exists for compatibility reasons. The script
       * transport does not receive response headers.
       * @return {String|null} Warning message or <code>null</code> if the request
       * is disposed
       */
      getAllResponseHeaders: function getAllResponseHeaders() {
        if (this.__disposed__P_169_7) {
          return null;
        }

        if (this.__environmentGet__P_169_10("qx.debug")) {
          qx.Bootstrap.debug("Response headers cannot be determined forrequests made with script transport.");
        }

        return "Unknown response headers";
      },

      /**
       * Determine if loaded script has expected impact on global namespace.
       *
       * The function is called once the script was loaded and must return a
       * boolean indicating if the response is to be considered successful.
       *
       * @param check {Function} Function executed once the script was loaded.
       *
       */
      setDetermineSuccess: function setDetermineSuccess(check) {
        this.__determineSuccess__P_169_6 = check;
      },

      /**
       * Dispose object.
       */
      dispose: function dispose() {
        var script = this.__scriptElement__P_169_14;

        if (!this.__disposed__P_169_7) {
          // Prevent memory leaks
          if (script) {
            script.onload = script.onreadystatechange = null;

            this.__disposeScriptElement__P_169_13();
          }

          if (this.__timeoutId__P_169_12) {
            window.clearTimeout(this.__timeoutId__P_169_12);
          }

          this.__disposed__P_169_7 = true;
        }
      },

      /**
       * Check if the request has already beed disposed.
       * @return {Boolean} <code>true</code>, if the request has been disposed.
       */
      isDisposed: function isDisposed() {
        return !!this.__disposed__P_169_7;
      },

      /*
      ---------------------------------------------------------------------------
        PROTECTED
      ---------------------------------------------------------------------------
      */

      /**
       * Get URL of request.
       *
       * @return {String} URL of request.
       */
      _getUrl: function _getUrl() {
        return this.__url__P_169_9;
      },

      /**
       * Get script element used for request.
       *
       * @return {Element} Script element.
       */
      _getScriptElement: function _getScriptElement() {
        return this.__scriptElement__P_169_14;
      },

      /**
       * Handle timeout.
       */
      _onTimeout: function _onTimeout() {
        this.__failure__P_169_15();

        if (!this.__supportsErrorHandler__P_169_5()) {
          this._emit("error");
        }

        this._emit("timeout");

        if (!this.__supportsErrorHandler__P_169_5()) {
          this._emit("loadend");
        }
      },

      /**
       * Handle native load.
       */
      _onNativeLoad: function _onNativeLoad() {
        var script = this.__scriptElement__P_169_14,
            determineSuccess = this.__determineSuccess__P_169_6,
            that = this; // Aborted request must not fire load

        if (this.__abort__P_169_8) {
          return;
        } // BUGFIX: IE < 9
        // When handling "readystatechange" event, skip if readyState
        // does not signal loaded script


        if (this.__environmentGet__P_169_10("engine.name") === "mshtml" && this.__environmentGet__P_169_10("browser.documentmode") < 9) {
          if (!/loaded|complete/.test(script.readyState)) {
            return;
          } else {
            if (this.__environmentGet__P_169_10("qx.debug.io")) {
              qx.Bootstrap.debug(qx.bom.request.Script, "Received native readyState: loaded");
            }
          }
        }

        if (this.__environmentGet__P_169_10("qx.debug.io")) {
          qx.Bootstrap.debug(qx.bom.request.Script, "Received native load");
        } // Determine status by calling user-provided check function


        if (determineSuccess) {
          // Status set before has higher precedence
          if (!this.status) {
            this.status = determineSuccess() ? 200 : 500;
          }
        }

        if (this.status === 500) {
          if (this.__environmentGet__P_169_10("qx.debug.io")) {
            qx.Bootstrap.debug(qx.bom.request.Script, "Detected error");
          }
        }

        if (this.__timeoutId__P_169_12) {
          window.clearTimeout(this.__timeoutId__P_169_12);
        }

        window.setTimeout(function () {
          that._success();

          that._readyStateChange(4);

          that._emit("load");

          that._emit("loadend");
        });
      },

      /**
       * Handle native error.
       */
      _onNativeError: function _onNativeError() {
        this.__failure__P_169_15();

        this._emit("error");

        this._emit("loadend");
      },

      /*
      ---------------------------------------------------------------------------
        PRIVATE
      ---------------------------------------------------------------------------
      */

      /**
       * @type {Element} Script element
       */
      __scriptElement__P_169_14: null,

      /**
       * @type {Element} Head element
       */
      __headElement__P_169_4: null,

      /**
       * @type {String} URL
       */
      __url__P_169_9: "",

      /**
       * @type {Function} Bound _onNativeLoad handler.
       */
      __onNativeLoadBound__P_169_1: null,

      /**
       * @type {Function} Bound _onNativeError handler.
       */
      __onNativeErrorBound__P_169_2: null,

      /**
       * @type {Function} Bound _onTimeout handler.
       */
      __onTimeoutBound__P_169_3: null,

      /**
       * @type {Number} Timeout timer iD.
       */
      __timeoutId__P_169_12: null,

      /**
       * @type {Boolean} Whether request was aborted.
       */
      __abort__P_169_8: null,

      /**
       * @type {Boolean} Whether request was disposed.
       */
      __disposed__P_169_7: null,

      /*
      ---------------------------------------------------------------------------
        HELPER
      ---------------------------------------------------------------------------
      */

      /**
       * Initialize properties.
       */
      __initXhrProperties__P_169_0: function __initXhrProperties__P_169_0() {
        this.readyState = 0;
        this.status = 0;
        this.statusText = "";
      },

      /**
       * Change readyState.
       *
       * @param readyState {Number} The desired readyState
       */
      _readyStateChange: function _readyStateChange(readyState) {
        this.readyState = readyState;

        this._emit("readystatechange");
      },

      /**
       * Handle success.
       */
      _success: function _success() {
        this.__disposeScriptElement__P_169_13();

        this.readyState = 4; // By default, load is considered successful

        if (!this.status) {
          this.status = 200;
        }

        this.statusText = "" + this.status;
      },

      /**
       * Handle failure.
       */
      __failure__P_169_15: function __failure__P_169_15() {
        this.__disposeScriptElement__P_169_13();

        this.readyState = 4;
        this.status = 0;
        this.statusText = null;
      },

      /**
       * Looks up whether browser supports error handler.
       *
       * @return {Boolean} Whether browser supports error handler.
       */
      __supportsErrorHandler__P_169_5: function __supportsErrorHandler__P_169_5() {
        var isLegacyIe = this.__environmentGet__P_169_10("engine.name") === "mshtml" && this.__environmentGet__P_169_10("browser.documentmode") < 9;
        var isOpera = this.__environmentGet__P_169_10("engine.name") === "opera";
        return !(isLegacyIe || isOpera);
      },

      /**
       * Create and configure script element.
       *
       * @return {Element} Configured script element.
       */
      __createScriptElement__P_169_11: function __createScriptElement__P_169_11() {
        var script = this.__scriptElement__P_169_14 = document.createElement("script");
        script.src = this.__url__P_169_9;
        script.onerror = this.__onNativeErrorBound__P_169_2;
        script.onload = this.__onNativeLoadBound__P_169_1; // BUGFIX: IE < 9
        // Legacy IEs do not fire the "load" event for script elements.
        // Instead, they support the "readystatechange" event

        if (this.__environmentGet__P_169_10("engine.name") === "mshtml" && this.__environmentGet__P_169_10("browser.documentmode") < 9) {
          script.onreadystatechange = this.__onNativeLoadBound__P_169_1;
        }

        return script;
      },

      /**
       * Remove script element from DOM.
       */
      __disposeScriptElement__P_169_13: function __disposeScriptElement__P_169_13() {
        var script = this.__scriptElement__P_169_14;

        if (script && script.parentNode) {
          this.__headElement__P_169_4.removeChild(script);
        }
      },

      /**
       * Proxy Environment.get to guard against env not being present yet.
       *
       * @param key {String} Environment key.
       * @return {var} Value of the queried environment key
       * @lint environmentNonLiteralKey(key)
       */
      __environmentGet__P_169_10: function __environmentGet__P_169_10(key) {
        if (qx && qx.core && qx.core.Environment) {
          return qx.core.Environment.get(key);
        } else {
          if (key === "engine.name") {
            return qx.bom.client.Engine.getName();
          }

          if (key === "browser.documentmode") {
            return qx.bom.client.Browser.getDocumentMode();
          }

          if (key == "qx.debug.io") {
            return false;
          }

          throw new Error("Unknown environment key at this phase");
        }
      }
    },
    defer: function defer() {
      if (qx && qx.core && qx.core.Environment) {
        qx.core.Environment.add("qx.debug.io", false);
      }
    }
  });
  qx.bom.request.Script.$$dbClassInfo = $$dbClassInfo;
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
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.core.IDisposable": {
        "require": true
      },
      "qx.lang.Function": {
        "construct": true
      },
      "qx.lang.Type": {},
      "qx.Bootstrap": {},
      "qx.bom.request.Script": {
        "require": true
      },
      "qx.Promise": {},
      "qx.lang.String": {},
      "qx.type.BaseError": {},
      "qx.lang.Object": {},
      "qx.event.type.Data": {},
      "qx.util.Request": {},
      "qx.core.Assert": {},
      "qx.util.Serializer": {},
      "qx.lang.Json": {},
      "qx.util.Uri": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "qx.debug.io": {
          "className": "qx.bom.request.Script"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Tristan Koch (tristankoch)
  
  ************************************************************************ */

  /**
   * AbstractRequest serves as a base class for {@link qx.io.request.Xhr}
   * and {@link qx.io.request.Jsonp}. It contains methods to conveniently
   * communicate with transports found in {@link qx.bom.request}.
   *
   * The general procedure to derive a new request is to choose a
   * transport (override {@link #_createTransport}) and link
   * the transport’s response (override {@link #_getParsedResponse}).
   * The transport must implement {@link qx.bom.request.IRequest}.
   *
   * To adjust the behavior of {@link #send} override
   * {@link #_getConfiguredUrl} and {@link #_getConfiguredRequestHeaders}.
   *
   * NOTE: Instances of this class must be disposed of after use
   *
   */
  qx.Class.define("qx.io.request.AbstractRequest", {
    type: "abstract",
    extend: qx.core.Object,
    implement: [qx.core.IDisposable],

    /**
     * @param url {String?} The URL of the resource to request.
     */
    construct: function construct(url) {
      qx.core.Object.constructor.call(this);

      if (url !== undefined) {
        this.setUrl(url);
      }

      this.__requestHeaders__P_167_0 = {};

      var transport = this._transport = this._createTransport();

      this._setPhase("unsent");

      this.__onReadyStateChangeBound__P_167_1 = qx.lang.Function.bind(this._onReadyStateChange, this);
      this.__onLoadBound__P_167_2 = qx.lang.Function.bind(this._onLoad, this);
      this.__onLoadEndBound__P_167_3 = qx.lang.Function.bind(this._onLoadEnd, this);
      this.__onAbortBound__P_167_4 = qx.lang.Function.bind(this._onAbort, this);
      this.__onTimeoutBound__P_167_5 = qx.lang.Function.bind(this._onTimeout, this);
      this.__onErrorBound__P_167_6 = qx.lang.Function.bind(this._onError, this);
      transport.onreadystatechange = this.__onReadyStateChangeBound__P_167_1;
      transport.onload = this.__onLoadBound__P_167_2;
      transport.onloadend = this.__onLoadEndBound__P_167_3;
      transport.onabort = this.__onAbortBound__P_167_4;
      transport.ontimeout = this.__onTimeoutBound__P_167_5;
      transport.onerror = this.__onErrorBound__P_167_6;
    },
    events: {
      /**
       * Fired on every change of the transport’s readyState.
       */
      readyStateChange: "qx.event.type.Event",

      /**
       * Fired when request completes without error and transport’s status
       * indicates success.
       */
      success: "qx.event.type.Event",

      /**
       * Fired when request completes without error.
       */
      load: "qx.event.type.Event",

      /**
       * Fired when request completes with or without error.
       */
      loadEnd: "qx.event.type.Event",

      /**
       * Fired when request is aborted.
       */
      abort: "qx.event.type.Event",

      /**
       * Fired when request reaches timeout limit.
       */
      timeout: "qx.event.type.Event",

      /**
       * Fired when request completes with error.
       */
      error: "qx.event.type.Event",

      /**
       * Fired when request completes without error but erroneous HTTP status.
       */
      statusError: "qx.event.type.Event",

      /**
       * Fired when the configured parser runs into an unrecoverable error.
       */
      parseError: "qx.event.type.Data",

      /**
       * Fired on timeout, error or remote error.
       *
       * This event is fired for convenience. Usually, it is recommended
       * to handle error related events in a more fine-grained approach.
       */
      fail: "qx.event.type.Event",

      /**
       * Fired on change of the parsed response.
       *
       * This event allows to use data binding with the
       * parsed response as source.
       *
       * For example, to bind the response to the value of a label:
       *
       * <pre class="javascript">
       * // req is an instance of qx.io.request.*,
       * // label an instance of qx.ui.basic.Label
       * req.bind("response", label, "value");
       * </pre>
       *
       * The response is parsed (and therefore changed) only
       * after the request completes successfully. This means
       * that when a new request is made the initial empty value
       * is ignored, instead only the final value is bound.
       *
       */
      changeResponse: "qx.event.type.Data",

      /**
       * Fired on change of the phase.
       */
      changePhase: "qx.event.type.Data"
    },
    properties: {
      /**
       * The URL of the resource to request.
       *
       * Note: Depending on the configuration of the request
       * and/or the transport chosen, query params may be appended
       * automatically.
       */
      url: {
        check: "String"
      },

      /**
       * Timeout limit in milliseconds. Default (0) means no limit.
       */
      timeout: {
        check: "Number",
        nullable: true,
        init: 0
      },

      /**
       * Data to be sent as part of the request.
       *
       * Supported types:
       *
       * * String
       * * Map
       * * qooxdoo Object
       * * Blob
       * * ArrayBuffer
       * * FormData
       *
       * For maps, Arrays and qooxdoo objects, a URL encoded string
       * with unsafe characters escaped is internally generated and sent
       * as part of the request.
       *
       * Depending on the underlying transport and its configuration, the request
       * data is transparently included as URL query parameters or embedded in the
       * request body as form data.
       *
       * If a string is given the user must make sure it is properly formatted and
       * escaped. See {@link qx.util.Serializer#toUriParameter}.
       *
       */
      requestData: {
        check: function check(value) {
          return qx.lang.Type.isString(value) || qx.Class.isSubClassOf(value.constructor, qx.core.Object) || qx.lang.Type.isObject(value) || qx.lang.Type.isArray(value) || qx.Bootstrap.getClass(value) == "Blob" || qx.Bootstrap.getClass(value) == "ArrayBuffer" || qx.Bootstrap.getClass(value) == "FormData";
        },
        nullable: true
      },

      /**
       * Authentication delegate.
       *
       * The delegate must implement {@link qx.io.request.authentication.IAuthentication}.
       */
      authentication: {
        check: "qx.io.request.authentication.IAuthentication",
        nullable: true
      }
    },
    members: {
      /**
       * Bound handlers.
       */
      __onReadyStateChangeBound__P_167_1: null,
      __onLoadBound__P_167_2: null,
      __onLoadEndBound__P_167_3: null,
      __onAbortBound__P_167_4: null,
      __onTimeoutBound__P_167_5: null,
      __onErrorBound__P_167_6: null,

      /**
       * Parsed response.
       */
      __response__P_167_7: null,

      /**
       * Abort flag.
       */
      __abort__P_167_8: null,

      /**
       * Current phase.
       */
      __phase__P_167_9: null,

      /**
       * Request headers.
       */
      __requestHeaders__P_167_0: null,

      /**
       * Request headers (deprecated).
       */
      __requestHeadersDeprecated__P_167_10: null,

      /**
       * Holds transport.
       */
      _transport: null,

      /**
       * Holds information about the parser status for the last request.
       */
      _parserFailed: false,

      /*
      ---------------------------------------------------------------------------
        CONFIGURE TRANSPORT
      ---------------------------------------------------------------------------
      */

      /**
       * Create and return transport.
       *
       * This method MUST be overridden, unless the constructor is overridden as
       * well. It is called by the constructor and should return the transport that
       * is to be interfaced.
       *
       * @return {qx.bom.request} Transport.
       */
      _createTransport: function _createTransport() {
        throw new Error("Abstract method call");
      },

      /**
       * Get configured URL.
       *
       * A configured URL typically includes a query string that
       * encapsulates transport specific settings such as request
       * data or no-cache settings.
       *
       * This method MAY be overridden. It is called in {@link #send}
       * before the request is initialized.
       *
       * @return {String} The configured URL.
       */
      _getConfiguredUrl: function _getConfiguredUrl() {},

      /**
       * Get configuration related request headers.
       *
       * This method MAY be overridden to add request headers for features limited
       * to a certain transport.
       *
       * @return {Map} Map of request headers.
       */
      _getConfiguredRequestHeaders: function _getConfiguredRequestHeaders() {},

      /**
       * Get parsed response.
       *
       * Is called in the {@link #_onReadyStateChange} event handler
       * to parse and store the transport’s response.
       *
       * This method MUST be overridden.
       *
       * @return {String} The parsed response of the request.
       */
      _getParsedResponse: function _getParsedResponse() {
        throw new Error("Abstract method call");
      },

      /**
       * Get method.
       *
       * This method MAY be overridden. It is called in {@link #send}
       * before the request is initialized.
       *
       * @return {String} The method.
       */
      _getMethod: function _getMethod() {
        return "GET";
      },

      /**
       * Whether async.
       *
       * This method MAY be overridden. It is called in {@link #send}
       * before the request is initialized.
       *
       * @return {Boolean} Whether to process asynchronously.
       */
      _isAsync: function _isAsync() {
        return true;
      },

      /*
      ---------------------------------------------------------------------------
        INTERACT WITH TRANSPORT
      ---------------------------------------------------------------------------
      */

      /**
       * Send request.
       */
      send: function send() {
        var transport = this._transport,
            url,
            method,
            async,
            requestData; //
        // Open request
        //

        url = this._getConfiguredUrl(); // Drop fragment (anchor) from URL as per
        // http://www.w3.org/TR/XMLHttpRequest/#the-open-method

        if (/\#/.test(url)) {
          url = url.replace(/\#.*/, "");
        }

        transport.timeout = this.getTimeout(); // Support transports with enhanced feature set

        method = this._getMethod();
        async = this._isAsync(); // Open

        if (qx.core.Environment.get("qx.debug.io")) {
          this.debug("Open low-level request with method: " + method + ", url: " + url + ", async: " + async);
        }

        transport.open(method, url, async);

        this._setPhase("opened"); //
        // Send request
        //


        requestData = this.getRequestData();

        if (["ArrayBuffer", "Blob", "FormData"].indexOf(qx.Bootstrap.getClass(requestData)) == -1) {
          requestData = this._serializeData(requestData);
        }

        this._setRequestHeaders(); // Send


        if (qx.core.Environment.get("qx.debug.io")) {
          this.debug("Send low-level request");
        }

        method == "GET" ? transport.send() : transport.send(requestData);

        this._setPhase("sent");
      },

      /**
       * The same as send() but also return a `qx.Promise` object. The promise
       * is resolved to this object if the request is successful.
       *
       * Calling `abort()` on the request object, rejects the promise. Calling
       * `cancel()` on the promise aborts the request if the request is not in a
       * final state.
       * If the promise has other listener paths, then cancelation of one path will
       * not have any effect on the request and consequently that call will not
       * affect the other paths.
       *
       * @param context {Object?} optional context to bind the qx.Promise.
       * @return {qx.Promise} The qx.Promise object
       * @throws {qx.type.BaseError} If the environment setting `qx.promise` is set to false
       */
      sendWithPromise: function sendWithPromise(context) {
        {
          context = context || this; // save this object's context

          var req = this;
          var promise = new qx.Promise(function (resolve, reject) {
            var listeners = [];
            var changeResponseListener = req.addListener("success", function (e) {
              listeners.forEach(req.removeListenerById.bind(req));
              resolve(req);
            }, this);
            listeners.push(changeResponseListener);
            var statusErrorListener = req.addListener("statusError", function (e) {
              listeners.forEach(req.removeListenerById.bind(req));
              var failMessage = qx.lang.String.format("%1: %2.", [req.getStatus(), req.getStatusText()]);
              var err = new qx.type.BaseError("statusError", failMessage);
              reject(err);
            }, this);
            listeners.push(statusErrorListener);
            var timeoutListener = req.addListener("timeout", function (e) {
              listeners.forEach(req.removeListenerById.bind(req));
              var failMessage = qx.lang.String.format("Request failed with timeout after %1 ms.", [req.getTimeout()]);
              var err = new qx.type.BaseError("timeout", failMessage);
              reject(err);
            }, this);
            listeners.push(timeoutListener);
            var parseErrorListener = req.addListener("parseError", function (e) {
              listeners.forEach(req.removeListenerById.bind(req));
              var failMessage = "Error parsing the response.";
              var err = new qx.type.BaseError("parseError", failMessage);
              reject(err);
            }, this);
            listeners.push(parseErrorListener);
            var abortListener = req.addListener("abort", function (e) {
              listeners.forEach(req.removeListenerById.bind(req));
              var failMessage = "Request aborted.";
              var err = new qx.type.BaseError("abort", failMessage);
              reject(err);
            }, this);
            listeners.push(abortListener);
            var errorListener = req.addListener("error", function (e) {
              listeners.forEach(req.removeListenerById.bind(req));
              var failMessage = "Request failed.";
              var err = new qx.type.BaseError("error", failMessage);
              reject(err);
            }, this);
            listeners.push(errorListener);
            req.send();
          }, context)["finally"](function () {
            if (req.getReadyState() !== 4) {
              req.abort();
            }
          });
          return promise; // eslint-disable-next-line no-else-return
        }
      },

      /**
       * Abort request.
       */
      abort: function abort() {
        if (qx.core.Environment.get("qx.debug.io")) {
          this.debug("Abort request");
        }

        this.__abort__P_167_8 = true; // Update phase to "abort" before user handler are invoked [BUG #5485]

        this.__phase__P_167_9 = "abort";

        this._transport.abort();
      },

      /*
      ---------------------------------------------------------------------------
       REQUEST HEADERS
      ---------------------------------------------------------------------------
      */

      /**
       * Apply configured request headers to transport.
       *
       * This method MAY be overridden to customize application of request headers
       * to transport.
       */
      _setRequestHeaders: function _setRequestHeaders() {
        var transport = this._transport,
            requestHeaders = this._getAllRequestHeaders();

        for (var key in requestHeaders) {
          transport.setRequestHeader(key, requestHeaders[key]);
        }
      },

      /**
       * Get all request headers.
       *
       * @return {Map} All request headers.
       */
      _getAllRequestHeaders: function _getAllRequestHeaders() {
        var requestHeaders = {}; // Transport specific headers

        qx.lang.Object.mergeWith(requestHeaders, this._getConfiguredRequestHeaders()); // Authentication delegate

        qx.lang.Object.mergeWith(requestHeaders, this.__getAuthRequestHeaders__P_167_11()); // User-defined, requestHeaders property (deprecated)

        qx.lang.Object.mergeWith(requestHeaders, this.__requestHeadersDeprecated__P_167_10); // User-defined

        qx.lang.Object.mergeWith(requestHeaders, this.__requestHeaders__P_167_0);
        return requestHeaders;
      },

      /**
       * Retrieve authentication headers from auth delegate.
       *
       * @return {Map} Authentication related request headers.
       */
      __getAuthRequestHeaders__P_167_11: function __getAuthRequestHeaders__P_167_11() {
        var auth = this.getAuthentication(),
            headers = {};

        if (auth) {
          auth.getAuthHeaders().forEach(function (header) {
            headers[header.key] = header.value;
          });
          return headers;
        }
      },

      /**
       * Set a request header.
       *
       * Note: Setting request headers has no effect after the request was send.
       *
       * @param key {String} Key of the header.
       * @param value {String} Value of the header.
       */
      setRequestHeader: function setRequestHeader(key, value) {
        this.__requestHeaders__P_167_0[key] = value;
      },

      /**
       * Get a request header.
       *
       * @param key {String} Key of the header.
       * @return {String} The value of the header.
       */
      getRequestHeader: function getRequestHeader(key) {
        return this.__requestHeaders__P_167_0[key];
      },

      /**
       * Remove a request header.
       *
       * Note: Removing request headers has no effect after the request was send.
       *
       * @param key {String} Key of the header.
       */
      removeRequestHeader: function removeRequestHeader(key) {
        if (this.__requestHeaders__P_167_0[key]) {
          delete this.__requestHeaders__P_167_0[key];
        }
      },

      /*
      ---------------------------------------------------------------------------
       QUERY TRANSPORT
      ---------------------------------------------------------------------------
      */

      /**
       * Get low-level transport.
       *
       * Note: To be used with caution!
       *
       * This method can be used to query the transport directly,
       * but should be used with caution. Especially, it
       * is not advisable to call any destructive methods
       * such as <code>open</code> or <code>send</code>.
       *
       * @return {Object} An instance of a class found in
       *  <code>qx.bom.request.*</code>
       */
      // This method mainly exists so that some methods found in the
      // low-level transport can be deliberately omitted here,
      // but still be accessed should it be absolutely necessary.
      //
      // Valid use cases include to query the transport’s responseXML
      // property if performance is critical and any extra parsing
      // should be avoided at all costs.
      //
      getTransport: function getTransport() {
        return this._transport;
      },

      /**
       * Get current ready state.
       *
       * States can be:
       * UNSENT:           0,
       * OPENED:           1,
       * HEADERS_RECEIVED: 2,
       * LOADING:          3,
       * DONE:             4
       *
       * @return {Number} Ready state.
       */
      getReadyState: function getReadyState() {
        return this._transport.readyState;
      },

      /**
       * Get current phase.
       *
       * A more elaborate version of {@link #getReadyState}, this method indicates
       * the current phase of the request. Maps to stateful (i.e. deterministic)
       * events (success, abort, timeout, statusError) and intermediate
       * readyStates (unsent, configured, loading, load).
       *
       * When the requests is successful, it progresses the states:<br>
       * 'unsent', 'opened', 'sent', 'loading', 'load', 'success'
       *
       * In case of failure, the final state is one of:<br>
       * 'abort', 'timeout', 'statusError'
       *
       * For each change of the phase, a {@link #changePhase} data event is fired.
       *
       * @return {String} Current phase.
       *
       */
      getPhase: function getPhase() {
        return this.__phase__P_167_9;
      },

      /**
       * Get status code.
       *
       * @return {Number} The transport’s status code.
       */
      getStatus: function getStatus() {
        return this._transport.status;
      },

      /**
       * Get status text.
       *
       * @return {String} The transport’s status text.
       */
      getStatusText: function getStatusText() {
        return this._transport.statusText;
      },

      /**
       * Get raw (unprocessed) response.
       *
       * @return {String} The raw response of the request.
       */
      getResponseText: function getResponseText() {
        return this._transport.responseText;
      },

      /**
       * Get all response headers from response.
       *
       * @return {String} All response headers.
       */
      getAllResponseHeaders: function getAllResponseHeaders() {
        return this._transport.getAllResponseHeaders();
      },

      /**
       * Get a single response header from response.
       *
       * @param key {String}
       *   Key of the header to get the value from.
       * @return {String}
       *   Response header.
       */
      getResponseHeader: function getResponseHeader(key) {
        return this._transport.getResponseHeader(key);
      },

      /**
       * Override the content type response header from response.
       *
       * @param contentType {String}
       *   Content type for overriding.
       * @see qx.bom.request.Xhr#overrideMimeType
       */
      overrideResponseContentType: function overrideResponseContentType(contentType) {
        return this._transport.overrideMimeType(contentType);
      },

      /**
       * Get the content type response header from response.
       *
       * @return {String}
       *   Content type response header.
       */
      getResponseContentType: function getResponseContentType() {
        return this.getResponseHeader("Content-Type");
      },

      /**
       * Whether request completed (is done).
       */
      isDone: function isDone() {
        return this.getReadyState() === 4;
      },

      /*
      ---------------------------------------------------------------------------
        RESPONSE
      ---------------------------------------------------------------------------
      */

      /**
       * Get parsed response.
       *
       * @return {String} The parsed response of the request.
       */
      getResponse: function getResponse() {
        return this.__response__P_167_7;
      },

      /**
       * Set response.
       *
       * @param response {String} The parsed response of the request.
       */
      _setResponse: function _setResponse(response) {
        var oldResponse = response;

        if (this.__response__P_167_7 !== response) {
          this.__response__P_167_7 = response;
          this.fireEvent("changeResponse", qx.event.type.Data, [this.__response__P_167_7, oldResponse]);
        }
      },

      /*
      ---------------------------------------------------------------------------
        EVENT HANDLING
      ---------------------------------------------------------------------------
      */

      /**
       * Handle "readyStateChange" event.
       */
      _onReadyStateChange: function _onReadyStateChange() {
        var readyState = this.getReadyState();

        if (qx.core.Environment.get("qx.debug.io")) {
          this.debug("Fire readyState: " + readyState);
        }

        this.fireEvent("readyStateChange"); // Transport switches to readyState DONE on abort and may already
        // have successful HTTP status when response is served from cache.
        //
        // Not fire custom event "loading" (or "success", when cached).

        if (this.__abort__P_167_8) {
          return;
        }

        if (readyState === 3) {
          this._setPhase("loading");
        }

        if (this.isDone()) {
          this.__onReadyStateDone__P_167_12();
        }
      },

      /**
       * Called internally when readyState is DONE.
       */
      __onReadyStateDone__P_167_12: function __onReadyStateDone__P_167_12() {
        if (qx.core.Environment.get("qx.debug.io")) {
          this.debug("Request completed with HTTP status: " + this.getStatus());
        } // Event "load" fired in onLoad


        this._setPhase("load"); // Successful HTTP status


        if (qx.util.Request.isSuccessful(this.getStatus())) {
          // Parse response
          if (qx.core.Environment.get("qx.debug.io")) {
            this.debug("Response is of type: '" + this.getResponseContentType() + "'");
          }

          this._setResponse(this._getParsedResponse());

          if (this._parserFailed) {
            this.fireEvent("fail");
          } else {
            this._fireStatefulEvent("success");
          } // Erroneous HTTP status

        } else {
          try {
            this._setResponse(this._getParsedResponse());
          } catch (e) {// ignore if it does not work
          } // A remote error failure


          if (this.getStatus() !== 0) {
            this._fireStatefulEvent("statusError");

            this.fireEvent("fail");
          }
        }
      },

      /**
       * Handle "load" event.
       */
      _onLoad: function _onLoad() {
        this.fireEvent("load");
      },

      /**
       * Handle "loadEnd" event.
       */
      _onLoadEnd: function _onLoadEnd() {
        this.fireEvent("loadEnd");
      },

      /**
       * Handle "abort" event.
       */
      _onAbort: function _onAbort() {
        this._fireStatefulEvent("abort");
      },

      /**
       * Handle "timeout" event.
       */
      _onTimeout: function _onTimeout() {
        this._fireStatefulEvent("timeout"); // A network error failure


        this.fireEvent("fail");
      },

      /**
       * Handle "error" event.
       */
      _onError: function _onError() {
        this.fireEvent("error"); // A network error failure

        this.fireEvent("fail");
      },

      /*
      ---------------------------------------------------------------------------
        INTERNAL / HELPERS
      ---------------------------------------------------------------------------
      */

      /**
       * Fire stateful event.
       *
       * Fires event and sets phase to name of event.
       *
       * @param evt {String} Name of the event to fire.
       */
      _fireStatefulEvent: function _fireStatefulEvent(evt) {
        {
          qx.core.Assert.assertString(evt);
        }

        this._setPhase(evt);

        this.fireEvent(evt);
      },

      /**
       * Set phase.
       *
       * @param phase {String} The phase to set.
       */
      _setPhase: function _setPhase(phase) {
        var previousPhase = this.__phase__P_167_9;
        {
          qx.core.Assert.assertString(phase);
          qx.core.Assert.assertMatch(phase, /^(unsent)|(opened)|(sent)|(loading)|(load)|(success)|(abort)|(timeout)|(statusError)$/);
        }
        this.__phase__P_167_9 = phase;
        this.fireDataEvent("changePhase", phase, previousPhase);
      },

      /**
       * Serialize data.
       *
       * @param data {String|Map|qx.core.Object} Data to serialize.
       * @return {String|null} Serialized data.
       */
      _serializeData: function _serializeData(data) {
        var isPost = typeof this.getMethod !== "undefined" && this.getMethod() == "POST",
            isJson = /application\/.*\+?json/.test(this.getRequestHeader("Content-Type"));

        if (!data) {
          return null;
        }

        if (qx.lang.Type.isString(data)) {
          return data;
        }

        if (qx.Class.isSubClassOf(data.constructor, qx.core.Object)) {
          return qx.util.Serializer.toUriParameter(data);
        }

        if (isJson && (qx.lang.Type.isObject(data) || qx.lang.Type.isArray(data))) {
          return qx.lang.Json.stringify(data);
        }

        if (qx.lang.Type.isObject(data)) {
          return qx.util.Uri.toParameter(data, isPost);
        }

        return null;
      }
    },
    environment: {
      "qx.debug.io": false
    },
    destruct: function destruct() {
      var transport = this._transport,
          noop = function noop() {};

      if (this._transport) {
        transport.onreadystatechange = transport.onload = transport.onloadend = transport.onabort = transport.ontimeout = transport.onerror = noop; // [BUG #8315] dispose asynchronously to work with Sinon.js fake server

        window.setTimeout(function () {
          transport.dispose();
        }, 0);
      }

      this.__response__P_167_7 = null;
    }
  });
  qx.io.request.AbstractRequest.$$dbClassInfo = $$dbClassInfo;
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
      "qx.io.request.AbstractRequest": {
        "construct": true,
        "require": true
      },
      "qx.lang.Type": {},
      "qx.bom.request.Xhr": {},
      "qx.util.Uri": {},
      "qx.util.Request": {},
      "qx.Bootstrap": {},
      "qx.bom.request.Script": {
        "require": true
      },
      "qx.util.ResponseParser": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "qx.debug.io": {
          "className": "qx.bom.request.Script"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Tristan Koch (tristankoch)
  
  ************************************************************************ */

  /**
   * Send HTTP requests and handle responses using the HTTP client API.
   *
   * Configuration of the request is done with properties. Events are fired for
   * various states in the life cycle of a request, such as "success". Request
   * data is transparently processed.
   *
   * Here is how to request a JSON file and listen to the "success" event:
   *
   * <pre class="javascript">
   * var req = new qx.io.request.Xhr("/some/path/file.json");
   *
   * req.addListener("success", function(e) {
   *   var req = e.getTarget();
   *
   *   // Response parsed according to the server's
   *   // response content type, e.g. JSON
   *   req.getResponse();
   * }, this);
   *
   * // Send request
   * req.send();
   * </pre>
   *
   * Some noteable features:
   *
   * * Abstraction of low-level request
   * * Convenient setup using properties
   * * Fine-grained events
   * * Symbolic phases
   * * Transparent processing of request data
   * * Stream-lined authentication
   * * Automagic parsing of response based on content type
   *
   * Cross-origin requests are supported, but require browser support
   * (see <a href="http://caniuse.com/#search=CORS">caniuse.com</a>) and backend configuration
   * (see <a href="https://developer.mozilla.org/en-US/docs/docs/HTTP/Access_control_CORS>MDN</a>).
   * Note that IE's <code>XDomainRequest</code> is not currently supported.
   * For a cross-browser alternative, consider {@link qx.io.request.Jsonp}.
   *
   * In order to debug requests, set the environment flag
   * <code>qx.debug.io</code>.
   *
   * Internally uses {@link qx.bom.request.Xhr}.
   */
  qx.Class.define("qx.io.request.Xhr", {
    extend: qx.io.request.AbstractRequest,

    /**
     * @param url {String?} The URL of the resource to request.
     * @param method {String?} The HTTP method.
     */
    construct: function construct(url, method) {
      if (method !== undefined) {
        this.setMethod(method);
      }

      qx.io.request.AbstractRequest.constructor.call(this, url);
      this._parser = this._createResponseParser();
    },
    // Only document events with transport specific details.
    // For a complete list of events, refer to AbstractRequest.
    events: {
      /**
       * Fired on every change of the transport’s readyState.
       *
       * See {@link qx.bom.request.Xhr} for available readyStates.
       */
      readyStateChange: "qx.event.type.Event",

      /**
       * Fired when request completes without error and transport status
       * indicates success.
       *
       * Refer to {@link qx.util.Request#isSuccessful} for a list of HTTP
       * status considered successful.
       */
      success: "qx.event.type.Event",

      /**
       * Fired when request completes without error.
       *
       * Every request not canceled or aborted completes. This means that
       * even requests receiving a response with erroneous HTTP status
       * fire a "load" event. If you are only interested in successful
       * responses, listen to the {@link #success} event instead.
       */
      load: "qx.event.type.Event",

      /**
       * Fired when request completes without error but erroneous HTTP status.
       *
       * Refer to {@link qx.util.Request#isSuccessful} for a list of HTTP
       * status considered successful.
       */
      statusError: "qx.event.type.Event"
    },
    properties: {
      /**
       * The HTTP method.
       */
      method: {
        init: "GET"
      },

      /**
       * Whether the request should be executed asynchronously.
       */
      async: {
        check: "Boolean",
        init: true
      },

      /**
       * The content type to accept. By default, every content type
       * is accepted.
       *
       * Note: Some backends send distinct representations of the same
       * resource depending on the content type accepted. For instance,
       * a backend may respond with either a JSON (the accept header
       * indicates so) or a HTML representation (the default, no accept
       * header given).
       */
      accept: {
        check: "String",
        nullable: true
      },

      /**
       * Whether to allow request to be answered from cache.
       *
       * Allowed values:
       *
       * * <code>true</code>: Allow caching (Default)
       * * <code>false</code>: Prohibit caching. Appends nocache parameter to URL.
       * * <code>String</code>: Any Cache-Control request directive
       *
       * If a string is given, it is inserted in the request's Cache-Control
       * header. A request’s Cache-Control header may contain a number of directives
       * controlling the behavior of any caches in between client and origin
       * server.
       *
       * * <code>"no-cache"</code>: Force caches to submit request in order to
       *   validate the freshness of the representation. Note that the requested
       *   resource may still be served from cache if the representation is
       *   considered fresh. Use this directive to ensure freshness but save
       *   bandwidth when possible.
       * * <code>"no-store"</code>: Do not keep a copy of the representation under
       *   any conditions.
       *
       * See <a href="http://www.mnot.net/cache_docs/#CACHE-CONTROL">
       * Caching tutorial</a> for an excellent introduction to Caching in general.
       * Refer to the corresponding section in the
       * <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.9">
       * HTTP 1.1 specification</a> for more details and advanced directives.
       *
       * It is recommended to choose an appropriate Cache-Control directive rather
       * than prohibit caching using the nocache parameter.
       */
      cache: {
        check: function check(value) {
          return qx.lang.Type.isBoolean(value) || qx.lang.Type.isString(value);
        },
        init: true
      }
    },
    members: {
      /**
       * @type {Function} Parser.
       */
      _parser: null,

      /*
      ---------------------------------------------------------------------------
        CONFIGURE TRANSPORT
      ---------------------------------------------------------------------------
      */

      /**
       * Create XHR transport.
       *
       * @return {qx.bom.request.Xhr} Transport.
       */
      _createTransport: function _createTransport() {
        return new qx.bom.request.Xhr();
      },

      /**
       * Get configured URL.
       *
       * Append request data to URL if HTTP method is GET. Append random
       * string to URL if required by value of {@link #cache}.
       *
       * @return {String} The configured URL.
       */
      _getConfiguredUrl: function _getConfiguredUrl() {
        var url = this.getUrl(),
            serializedData;

        if (this.getMethod() === "GET" && this.getRequestData()) {
          serializedData = this._serializeData(this.getRequestData());
          url = qx.util.Uri.appendParamsToUrl(url, serializedData);
        }

        if (this.getCache() === false) {
          // Make sure URL cannot be served from cache and new request is made
          url = qx.util.Uri.appendParamsToUrl(url, {
            nocache: new Date().valueOf()
          });
        }

        return url;
      },
      // overridden
      _getConfiguredRequestHeaders: function _getConfiguredRequestHeaders() {
        var headers = {},
            isAllowsBody = qx.util.Request.methodAllowsRequestBody(this.getMethod()),
            isFormData = qx.Bootstrap.getClass(this.getRequestData()) == "FormData"; // Follow convention to include X-Requested-With header when same origin

        if (!qx.util.Request.isCrossDomain(this.getUrl())) {
          headers["X-Requested-With"] = "XMLHttpRequest";
        } // Include Cache-Control header if configured


        if (qx.lang.Type.isString(this.getCache())) {
          headers["Cache-Control"] = this.getCache();
        } // By default, set content-type urlencoded for requests with body


        if (this.getRequestData() && isAllowsBody && !isFormData) {
          headers["Content-Type"] = "application/x-www-form-urlencoded";
        } // What representations to accept


        if (this.getAccept()) {
          if (qx.core.Environment.get("qx.debug.io")) {
            this.debug("Accepting: '" + this.getAccept() + "'");
          }

          headers["Accept"] = this.getAccept();
        }

        return headers;
      },
      // overridden
      _getMethod: function _getMethod() {
        return this.getMethod();
      },
      // overridden
      _isAsync: function _isAsync() {
        return this.isAsync();
      },

      /*
      ---------------------------------------------------------------------------
        PARSING
      ---------------------------------------------------------------------------
      */

      /**
       * Create response parser.
       *
       * @return {qx.util.ResponseParser} parser.
       */
      _createResponseParser: function _createResponseParser() {
        return new qx.util.ResponseParser();
      },

      /**
       * Returns response parsed with parser determined by content type.
       *
       * @return {String|Object} The parsed response of the request.
       */
      _getParsedResponse: function _getParsedResponse() {
        var response = this._transport.responseType === "blob" ? this._transport.response : this._transport.responseText,
            contentType = this.getResponseContentType() || "",
            parsedResponse = "";

        try {
          parsedResponse = this._parser.parse(response, contentType);
          this._parserFailed = false;
        } catch (e) {
          this._parserFailed = true;
          this.fireDataEvent("parseError", {
            error: e,
            response: response
          });
        }

        return parsedResponse;
      },

      /**
       * Set parser used to parse response once request has
       * completed successfully.
       *
       * @see qx.util.ResponseParser#setParser
       *
       * @param parser {String|Function}
       * @return {Function} The parser function
       */
      setParser: function setParser(parser) {
        return this._parser.setParser(parser);
      }
    }
  });
  qx.io.request.Xhr.$$dbClassInfo = $$dbClassInfo;
})();
//# sourceMappingURL=package-9.js.map?dt=1651047783791
qx.$$packageData['9'] = {
  "locales": {},
  "resources": {},
  "translations": {}
};
