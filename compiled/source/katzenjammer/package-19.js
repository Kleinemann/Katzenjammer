(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
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
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * This mixin redirects all children handling methods to a child widget of the
   * including class. This is e.g. used in {@link qx.ui.window.Window} to add
   * child widgets directly to the window pane.
   *
   * The including class must implement the method <code>getChildrenContainer</code>,
   * which has to return the widget, to which the child widgets should be added.
   */
  qx.Mixin.define("qx.ui.core.MRemoteChildrenHandling", {
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      /**
       * Forward the call with the given function name to the children container
       *
       * @param functionName {String} name of the method to forward
       * @param a1 {var?} first argument of the method to call
       * @param a2 {var?} second argument of the method to call
       * @param a3 {var?} third argument of the method to call
       * @return {var} The return value of the forward method
       */
      __forward__P_213_0: function __forward__P_213_0(functionName, a1, a2, a3) {
        var container = this.getChildrenContainer();

        if (container === this) {
          functionName = "_" + functionName;
        }

        return container[functionName](a1, a2, a3);
      },

      /**
       * Returns the children list
       *
       * @return {qx.ui.core.LayoutItem[]} The children array (Arrays are
       *   reference types, please do not modify them in-place)
       */
      getChildren: function getChildren() {
        return this.__forward__P_213_0("getChildren");
      },

      /**
       * Whether the widget contains children.
       *
       * @return {Boolean} Returns <code>true</code> when the widget has children.
       */
      hasChildren: function hasChildren() {
        return this.__forward__P_213_0("hasChildren");
      },

      /**
       * Adds a new child widget.
       *
       * The supported keys of the layout options map depend on the layout manager
       * used to position the widget. The options are documented in the class
       * documentation of each layout manager {@link qx.ui.layout}.
       *
       * @param child {qx.ui.core.LayoutItem} the item to add.
       * @param options {Map?null} Optional layout data for item.
       * @return {qx.ui.core.Widget} This object (for chaining support)
       */
      add: function add(child, options) {
        return this.__forward__P_213_0("add", child, options);
      },

      /**
       * Remove the given child item.
       *
       * @param child {qx.ui.core.LayoutItem} the item to remove
       * @return {qx.ui.core.Widget} This object (for chaining support)
       */
      remove: function remove(child) {
        return this.__forward__P_213_0("remove", child);
      },

      /**
       * Remove all children.
       * @return {Array} An array containing the removed children.
       */
      removeAll: function removeAll() {
        return this.__forward__P_213_0("removeAll");
      },

      /**
       * Returns the index position of the given item if it is
       * a child item. Otherwise it returns <code>-1</code>.
       *
       * This method works on the widget's children list. Some layout managers
       * (e.g. {@link qx.ui.layout.HBox}) use the children order as additional
       * layout information. Other layout manager (e.g. {@link qx.ui.layout.Grid})
       * ignore the children order for the layout process.
       *
       * @param child {qx.ui.core.LayoutItem} the item to query for
       * @return {Integer} The index position or <code>-1</code> when
       *   the given item is no child of this layout.
       */
      indexOf: function indexOf(child) {
        return this.__forward__P_213_0("indexOf", child);
      },

      /**
       * Add a child at the specified index
       *
       * This method works on the widget's children list. Some layout managers
       * (e.g. {@link qx.ui.layout.HBox}) use the children order as additional
       * layout information. Other layout manager (e.g. {@link qx.ui.layout.Grid})
       * ignore the children order for the layout process.
       *
       * @param child {qx.ui.core.LayoutItem} item to add
       * @param index {Integer} Index, at which the item will be inserted
       * @param options {Map?null} Optional layout data for item.
       */
      addAt: function addAt(child, index, options) {
        this.__forward__P_213_0("addAt", child, index, options);
      },

      /**
       * Add an item before another already inserted item
       *
       * This method works on the widget's children list. Some layout managers
       * (e.g. {@link qx.ui.layout.HBox}) use the children order as additional
       * layout information. Other layout manager (e.g. {@link qx.ui.layout.Grid})
       * ignore the children order for the layout process.
       *
       * @param child {qx.ui.core.LayoutItem} item to add
       * @param before {qx.ui.core.LayoutItem} item before the new item will be inserted.
       * @param options {Map?null} Optional layout data for item.
       */
      addBefore: function addBefore(child, before, options) {
        this.__forward__P_213_0("addBefore", child, before, options);
      },

      /**
       * Add an item after another already inserted item
       *
       * This method works on the widget's children list. Some layout managers
       * (e.g. {@link qx.ui.layout.HBox}) use the children order as additional
       * layout information. Other layout manager (e.g. {@link qx.ui.layout.Grid})
       * ignore the children order for the layout process.
       *
       * @param child {qx.ui.core.LayoutItem} item to add
       * @param after {qx.ui.core.LayoutItem} item, after which the new item will be inserted
       * @param options {Map?null} Optional layout data for item.
       */
      addAfter: function addAfter(child, after, options) {
        this.__forward__P_213_0("addAfter", child, after, options);
      },

      /**
       * Remove the item at the specified index.
       *
       * This method works on the widget's children list. Some layout managers
       * (e.g. {@link qx.ui.layout.HBox}) use the children order as additional
       * layout information. Other layout manager (e.g. {@link qx.ui.layout.Grid})
       * ignore the children order for the layout process.
       *
       * @param index {Integer} Index of the item to remove.
       * @return {qx.ui.core.LayoutItem} The removed item
       */
      removeAt: function removeAt(index) {
        return this.__forward__P_213_0("removeAt", index);
      }
    }
  });
  qx.ui.core.MRemoteChildrenHandling.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.Widget": {
        "construct": true,
        "require": true
      },
      "qx.ui.core.MRemoteChildrenHandling": {
        "require": true
      },
      "qx.ui.form.MForm": {
        "require": true
      },
      "qx.ui.form.IForm": {
        "require": true
      },
      "qx.ui.layout.HBox": {
        "construct": true
      },
      "qx.ui.form.List": {},
      "qx.ui.popup.Popup": {},
      "qx.ui.layout.VBox": {},
      "qx.bom.String": {}
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
       * Sebastian Werner (wpbasti)
       * Jonathan Weiß (jonathan_rass)
  
  ************************************************************************ */

  /**
   * Basic class for a selectbox like lists. Basically supports a popup
   * with a list and the whole children management.
   *
   * @childControl list {qx.ui.form.List} list component of the selectbox
   * @childControl popup {qx.ui.popup.Popup} popup which shows the list
   *
   */
  qx.Class.define("qx.ui.form.AbstractSelectBox", {
    extend: qx.ui.core.Widget,
    include: [qx.ui.core.MRemoteChildrenHandling, qx.ui.form.MForm],
    implement: [qx.ui.form.IForm],
    type: "abstract",

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qx.ui.core.Widget.constructor.call(this); // set the layout

      var layout = new qx.ui.layout.HBox();

      this._setLayout(layout);

      layout.setAlignY("middle"); // ARIA attrs

      var contentEl = this.getContentElement();
      contentEl.setAttribute("role", "button");
      contentEl.setAttribute("aria-haspopup", "listbox");
      contentEl.setAttribute("aria-expanded", false); // Register listeners

      this.addListener("keypress", this._onKeyPress);
      this.addListener("blur", this._onBlur, this); // register the resize listener

      this.addListener("resize", this._onResize, this);
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      // overridden
      focusable: {
        refine: true,
        init: true
      },
      // overridden
      width: {
        refine: true,
        init: 120
      },

      /**
       * The maximum height of the list popup. Setting this value to
       * <code>null</code> will set cause the list to be auto-sized.
       */
      maxListHeight: {
        check: "Number",
        apply: "_applyMaxListHeight",
        nullable: true,
        init: 200
      },

      /**
       * Formatter which format the value from the selected <code>ListItem</code>.
       * Uses the default formatter {@link #_defaultFormat}.
       */
      format: {
        check: "Function",
        init: function init(item) {
          return this._defaultFormat(item);
        },
        nullable: true
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id, hash) {
        var control;

        switch (id) {
          case "list":
            {
              control = new qx.ui.form.List().set({
                focusable: false,
                keepFocus: true,
                height: null,
                width: null,
                maxHeight: this.getMaxListHeight(),
                selectionMode: "one",
                quickSelection: true
              });
              var listId = "list-" + control.toHashCode();
              var childrenContainerEl = control.getChildrenContainer().getContentElement();
              childrenContainerEl.setAttribute("id", listId);
              childrenContainerEl.setAttribute("role", "listbox");
              this.getContentElement().setAttribute("aria-owns", listId);
              control.addListener("addItem", this._onListAddItem, this);
              control.addListener("changeSelection", this._onListChangeSelection, this);
              control.addListener("pointerdown", this._onListPointerDown, this);
              control.getChildControl("pane").addListener("tap", this.close, this);
              break;
            }

          case "popup":
            control = new qx.ui.popup.Popup(new qx.ui.layout.VBox());
            control.setAutoHide(false);
            control.setKeepActive(true);
            control.add(this.getChildControl("list"));
            control.addListener("changeVisibility", this._onPopupChangeVisibility, this);
            break;
        }

        return control || qx.ui.form.AbstractSelectBox.superclass.prototype._createChildControlImpl.call(this, id);
      },

      /*
      ---------------------------------------------------------------------------
        APPLY ROUTINES
      ---------------------------------------------------------------------------
      */
      // property apply
      _applyMaxListHeight: function _applyMaxListHeight(value, old) {
        this.getChildControl("list").setMaxHeight(value);
      },

      /*
      ---------------------------------------------------------------------------
        PUBLIC METHODS
      ---------------------------------------------------------------------------
      */

      /**
       * Returns the list widget.
       * @return {qx.ui.form.List} the list
       */
      getChildrenContainer: function getChildrenContainer() {
        return this.getChildControl("list");
      },

      /*
      ---------------------------------------------------------------------------
        LIST STUFF
      ---------------------------------------------------------------------------
      */

      /**
       * Shows the list popup.
       */
      open: function open() {
        var popup = this.getChildControl("popup");
        popup.placeToWidget(this, true);
        popup.show();
      },

      /**
       * Hides the list popup.
       */
      close: function close() {
        this.getChildControl("popup").hide();
      },

      /**
       * Toggles the popup's visibility.
       */
      toggle: function toggle() {
        var isListOpen = this.getChildControl("popup").isVisible();

        if (isListOpen) {
          this.close();
        } else {
          this.open();
        }
      },

      /*
      ---------------------------------------------------------------------------
        FORMAT HANDLING
      ---------------------------------------------------------------------------
      */

      /**
       * Return the formatted label text from the <code>ListItem</code>.
       * The formatter removes all HTML tags and converts all HTML entities
       * to string characters when the rich property is <code>true</code>.
       *
       * @param item {qx.ui.form.IListItem} The list item to format.
       * @return {String} The formatted text.
       */
      _defaultFormat: function _defaultFormat(item) {
        var valueLabel = item ? item.getLabel() : "";
        var rich = item ? item.getRich() : false;

        if (rich) {
          valueLabel = valueLabel.replace(/<[^>]+?>/g, "");
          valueLabel = qx.bom.String.unescape(valueLabel);
        }

        return valueLabel;
      },

      /*
      ---------------------------------------------------------------------------
        EVENT LISTENERS
      ---------------------------------------------------------------------------
      */

      /**
       * Handler for the blur event of the current widget.
       *
       * @param e {qx.event.type.Focus} The blur event.
       */
      _onBlur: function _onBlur(e) {
        this.close();
      },

      /**
       * Reacts on special keys and forwards other key events to the list widget.
       *
       * @param e {qx.event.type.KeySequence} Keypress event
       */
      _onKeyPress: function _onKeyPress(e) {
        // get the key identifier
        var identifier = e.getKeyIdentifier();
        var listPopup = this.getChildControl("popup"); // disabled pageUp and pageDown keys

        if (listPopup.isHidden() && (identifier == "PageDown" || identifier == "PageUp")) {
          e.stopPropagation();
        } // hide the list always on escape and tab
        else if (!listPopup.isHidden() && (identifier == "Escape" || identifier == "Tab")) {
          this.close();
          e.stop();
        } // forward the rest of the events to the list
        else {
          this.getChildControl("list").handleKeyPress(e);
        }
      },

      /**
       * Updates list minimum size.
       *
       * @param e {qx.event.type.Data} Data event
       */
      _onResize: function _onResize(e) {
        this.getChildControl("popup").setMinWidth(e.getData().width);
      },

      /**
       * Sets ARIA attributes on the item
       *
       * @param e {qx.event.type.Data} Data Event
       */
      _onListAddItem: function _onListAddItem(e) {
        var item = e.getData();
        var contentEl = item.getContentElement();
        contentEl.setAttribute("id", "list-item-" + item.toHashCode());
        contentEl.setAttribute("role", "option");
        var ariaSelected = contentEl.getAttribute("aria-selected"); // aria-selected may be already set from changeSelection listener

        if (ariaSelected === null || ariaSelected === undefined) {
          contentEl.setAttribute("aria-selected", false);
        }
      },

      /**
       * Syncs the own property from the list change
       *
       * @param e {qx.event.type.Data} Data Event
       */
      _onListChangeSelection: function _onListChangeSelection(e) {
        throw new Error("Abstract method: _onListChangeSelection()");
      },

      /**
       * Redirects pointerdown event from the list to this widget.
       *
       * @param e {qx.event.type.Pointer} Pointer Event
       */
      _onListPointerDown: function _onListPointerDown(e) {
        throw new Error("Abstract method: _onListPointerDown()");
      },

      /**
       * Redirects changeVisibility event from the list to this widget.
       *
       * @param e {qx.event.type.Data} Property change event
       */
      _onPopupChangeVisibility: function _onPopupChangeVisibility(e) {
        var visible = e.getData() == "visible";
        visible ? this.addState("popupOpen") : this.removeState("popupOpen"); // ARIA attrs

        this.getContentElement().setAttribute("aria-expanded", visible);
      }
    }
  });
  qx.ui.form.AbstractSelectBox.$$dbClassInfo = $$dbClassInfo;
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
       2004-2009 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Christian Hagendorn (chris_schmidt)
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * Each object, which should support single selection have to
   * implement this interface.
   */
  qx.Interface.define("qx.ui.core.ISingleSelection", {
    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */
    events: {
      /** Fires after the selection was modified */
      changeSelection: "qx.event.type.Data"
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      /**
       * Returns an array of currently selected items.
       *
       * Note: The result is only a set of selected items, so the order can
       * differ from the sequence in which the items were added.
       *
       * @return {qx.ui.core.Widget[]} List of items.
       */
      getSelection: function getSelection() {
        return true;
      },

      /**
       * Replaces current selection with the given items.
       *
       * @param items {qx.ui.core.Widget[]} Items to select.
       * @throws {Error} if the item is not a child element.
       */
      setSelection: function setSelection(items) {
        return arguments.length == 1;
      },

      /**
       * Clears the whole selection at once.
       */
      resetSelection: function resetSelection() {
        return true;
      },

      /**
       * Detects whether the given item is currently selected.
       *
       * @param item {qx.ui.core.Widget} Any valid selectable item
       * @return {Boolean} Whether the item is selected.
       * @throws {Error} if the item is not a child element.
       */
      isSelected: function isSelected(item) {
        return arguments.length == 1;
      },

      /**
       * Whether the selection is empty.
       *
       * @return {Boolean} Whether the selection is empty.
       */
      isSelectionEmpty: function isSelectionEmpty() {
        return true;
      },

      /**
       * Returns all elements which are selectable.
       *
       * @param all {Boolean} true for all selectables, false for the
       *   selectables the user can interactively select
       * @return {qx.ui.core.Widget[]} The contained items.
       */
      getSelectables: function getSelectables(all) {
        return arguments.length == 1;
      }
    }
  });
  qx.ui.core.ISingleSelection.$$dbClassInfo = $$dbClassInfo;
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
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * This interface should be used in all objects managing a set of items
   * implementing {@link qx.ui.form.IModel}.
   */
  qx.Interface.define("qx.ui.form.IModelSelection", {
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      /**
       * Tries to set the selection using the given array containing the
       * representative models for the selectables.
       *
       * @param value {Array} An array of models.
       */
      setModelSelection: function setModelSelection(value) {},

      /**
       * Returns an array of the selected models.
       *
       * @return {Array} An array containing the models of the currently selected
       *   items.
       */
      getModelSelection: function getModelSelection() {}
    }
  });
  qx.ui.form.IModelSelection.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.Widget": {},
      "qx.ui.core.SingleSelectionManager": {}
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
       * Christian Hagendorn (chris_schmidt)
  
  ************************************************************************ */

  /**
   * This mixin links all methods to manage the single selection.
   *
   * The class which includes the mixin has to implements two methods:
   *
   * <ul>
   * <li><code>_getItems</code>, this method has to return a <code>Array</code>
   *    of <code>qx.ui.core.Widget</code> that should be managed from the manager.
   * </li>
   * <li><code>_isAllowEmptySelection</code>, this method has to return a
   *    <code>Boolean</code> value for allowing empty selection or not.
   * </li>
   * </ul>
   */
  qx.Mixin.define("qx.ui.core.MSingleSelectionHandling", {
    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */
    events: {
      /** Fires after the value was modified */
      changeValue: "qx.event.type.Data",

      /** Fires after the selection was modified */
      changeSelection: "qx.event.type.Data"
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      /** @type {qx.ui.core.SingleSelectionManager} the single selection manager */
      __manager__P_188_0: null,

      /*
      ---------------------------------------------------------------------------
        PUBLIC API
      ---------------------------------------------------------------------------
      */

      /**
       * setValue implements part of the {@link qx.ui.form.IField} interface.
       *
       * @param item {null|qx.ui.core.Widget} Item to set as selected value.
       * @returns {null|TypeError} The status of this operation.
       */
      setValue: function setValue(item) {
        if (null === item) {
          this.resetSelection();
          return null;
        }

        if (item instanceof qx.ui.core.Widget) {
          this.__getManager__P_188_1().setSelected(item);

          return null;
        } else {
          return new TypeError("Given argument is not null or a {qx.ui.core.Widget}.");
        }
      },

      /**
       * getValue implements part of the {@link qx.ui.form.IField} interface.
       *
       * @returns {null|qx.ui.core.Widget} The currently selected widget or null if there is none.
       */
      getValue: function getValue() {
        return this.__getManager__P_188_1().getSelected() || null;
      },

      /**
       * resetValue implements part of the {@link qx.ui.form.IField} interface.
       */
      resetValue: function resetValue() {
        this.__getManager__P_188_1().resetSelected();
      },

      /**
       * Returns an array of currently selected items.
       *
       * Note: The result is only a set of selected items, so the order can
       * differ from the sequence in which the items were added.
       *
       * @return {qx.ui.core.Widget[]} List of items.
       */
      getSelection: function getSelection() {
        var selected = this.__getManager__P_188_1().getSelected();

        if (selected) {
          return [selected];
        } else {
          return [];
        }
      },

      /**
       * Replaces current selection with the given items.
       *
       * @param items {qx.ui.core.Widget[]} Items to select.
       * @throws {Error} if one of the items is not a child element and if
       *    items contains more than one elements.
       */
      setSelection: function setSelection(items) {
        switch (items.length) {
          case 0:
            this.resetSelection();
            break;

          case 1:
            this.__getManager__P_188_1().setSelected(items[0]);

            break;

          default:
            throw new Error("Could only select one item, but the selection array contains " + items.length + " items!");
        }
      },

      /**
       * Clears the whole selection at once.
       */
      resetSelection: function resetSelection() {
        this.__getManager__P_188_1().resetSelected();
      },

      /**
       * Detects whether the given item is currently selected.
       *
       * @param item {qx.ui.core.Widget} Any valid selectable item.
       * @return {Boolean} Whether the item is selected.
       * @throws {Error} if one of the items is not a child element.
       */
      isSelected: function isSelected(item) {
        return this.__getManager__P_188_1().isSelected(item);
      },

      /**
       * Whether the selection is empty.
       *
       * @return {Boolean} Whether the selection is empty.
       */
      isSelectionEmpty: function isSelectionEmpty() {
        return this.__getManager__P_188_1().isSelectionEmpty();
      },

      /**
       * Returns all elements which are selectable.
       *
       * @param all {Boolean} true for all selectables, false for the
       *   selectables the user can interactively select
       * @return {qx.ui.core.Widget[]} The contained items.
       */
      getSelectables: function getSelectables(all) {
        return this.__getManager__P_188_1().getSelectables(all);
      },

      /*
      ---------------------------------------------------------------------------
        EVENT HANDLER
      ---------------------------------------------------------------------------
      */

      /**
       * Event listener for <code>changeSelected</code> event on single
       * selection manager.
       *
       * @param e {qx.event.type.Data} Data event.
       */
      _onChangeSelected: function _onChangeSelected(e) {
        var newValue = e.getData();
        var oldValue = e.getOldData();
        this.fireDataEvent("changeValue", newValue, oldValue);
        newValue == null ? newValue = [] : newValue = [newValue];
        oldValue == null ? oldValue = [] : oldValue = [oldValue];
        this.fireDataEvent("changeSelection", newValue, oldValue);
      },

      /**
       * Return the selection manager if it is already exists, otherwise creates
       * the manager.
       *
       * @return {qx.ui.core.SingleSelectionManager} Single selection manager.
       */
      __getManager__P_188_1: function __getManager__P_188_1() {
        if (this.__manager__P_188_0 == null) {
          var that = this;
          this.__manager__P_188_0 = new qx.ui.core.SingleSelectionManager({
            getItems: function getItems() {
              return that._getItems();
            },
            isItemSelectable: function isItemSelectable(item) {
              if (that._isItemSelectable) {
                return that._isItemSelectable(item);
              } else {
                return item.isVisible();
              }
            }
          });

          this.__manager__P_188_0.addListener("changeSelected", this._onChangeSelected, this);
        }

        this.__manager__P_188_0.setAllowEmptySelection(this._isAllowEmptySelection());

        return this.__manager__P_188_0;
      }
    },

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this._disposeObjects("__manager__P_188_0");
    }
  });
  qx.ui.core.MSingleSelectionHandling.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "qx.data.Array": {
        "construct": true
      },
      "qx.lang.Array": {}
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
   * This mixin offers the selection of the model properties.
   * It can only be included if the object including it implements the
   * {@link qx.ui.core.ISingleSelection} interface and the selectables implement
   * the {@link qx.ui.form.IModel} interface.
   */
  qx.Mixin.define("qx.ui.form.MModelSelection", {
    construct: function construct() {
      // create the selection array
      this.__modelSelection__P_189_0 = new qx.data.Array(); // listen to the changes

      this.__modelSelection__P_189_0.addListener("change", this.__onModelSelectionArrayChange__P_189_1, this);

      this.addListener("changeSelection", this.__onModelSelectionChange__P_189_2, this);
    },
    events: {
      /**
       * Pseudo event. It will never be fired because the array itself can not
       * be changed. But the event description is needed for the data binding.
       */
      changeModelSelection: "qx.event.type.Data"
    },
    members: {
      __modelSelection__P_189_0: null,
      __inSelectionChange__P_189_3: false,

      /**
       * Handler for the selection change of the including class e.g. SelectBox,
       * List, ...
       * It sets the new modelSelection via {@link #setModelSelection}.
       */
      __onModelSelectionChange__P_189_2: function __onModelSelectionChange__P_189_2() {
        if (this.__inSelectionChange__P_189_3) {
          return;
        }

        var data = this.getSelection(); // create the array with the modes inside

        var modelSelection = [];

        for (var i = 0; i < data.length; i++) {
          var item = data[i]; // fallback if getModel is not implemented

          var model = item.getModel ? item.getModel() : null;

          if (model !== null) {
            modelSelection.push(model);
          }
        }

        try {
          this.setModelSelection(modelSelection);
        } catch (e) {
          throw new Error("Could not set the model selection. Maybe your models are not unique? " + e);
        }
      },

      /**
       * Listener for the change of the internal model selection data array.
       */
      __onModelSelectionArrayChange__P_189_1: function __onModelSelectionArrayChange__P_189_1() {
        this.__inSelectionChange__P_189_3 = true;
        var selectables = this.getSelectables(true);
        var itemSelection = [];

        var modelSelection = this.__modelSelection__P_189_0.toArray();

        for (var i = 0; i < modelSelection.length; i++) {
          var model = modelSelection[i];

          for (var j = 0; j < selectables.length; j++) {
            var selectable = selectables[j]; // fallback if getModel is not implemented

            var selectableModel = selectable.getModel ? selectable.getModel() : null;

            if (model === selectableModel) {
              itemSelection.push(selectable);
              break;
            }
          }
        }

        this.setSelection(itemSelection);
        this.__inSelectionChange__P_189_3 = false; // check if the setting has worked

        var currentSelection = this.getSelection();

        if (!qx.lang.Array.equals(currentSelection, itemSelection)) {
          // if not, set the actual selection
          this.__onModelSelectionChange__P_189_2();
        }
      },

      /**
       * Returns always an array of the models of the selected items. If no
       * item is selected or no model is given, the array will be empty.
       *
       * *CAREFUL!* The model selection can only work if every item item in the
       * selection providing widget has a model property!
       *
       * @return {qx.data.Array} An array of the models of the selected items.
       */
      getModelSelection: function getModelSelection() {
        return this.__modelSelection__P_189_0;
      },

      /**
       * Takes the given models in the array and searches for the corresponding
       * selectables. If an selectable does have that model attached, it will be
       * selected.
       *
       * *Attention:* This method can have a time complexity of O(n^2)!
       *
       * *CAREFUL!* The model selection can only work if every item item in the
       * selection providing widget has a model property!
       *
       * @param modelSelection {Array} An array of models, which should be
       *   selected.
       */
      setModelSelection: function setModelSelection(modelSelection) {
        // check for null values
        if (!modelSelection) {
          this.__modelSelection__P_189_0.removeAll();

          return;
        }

        {
          this.assertArray(modelSelection, "Please use an array as parameter.");
        } // add the first two parameter

        modelSelection.unshift(this.__modelSelection__P_189_0.getLength()); // remove index

        modelSelection.unshift(0); // start index

        var returnArray = this.__modelSelection__P_189_0.splice.apply(this.__modelSelection__P_189_0, modelSelection);

        returnArray.dispose();
      }
    },
    destruct: function destruct() {
      this._disposeObjects("__modelSelection__P_189_0");
    }
  });
  qx.ui.form.MModelSelection.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.form.AbstractSelectBox": {
        "construct": true,
        "require": true
      },
      "qx.ui.core.ISingleSelection": {
        "require": true
      },
      "qx.ui.form.IModelSelection": {
        "require": true
      },
      "qx.ui.form.IField": {
        "require": true
      },
      "qx.ui.core.MSingleSelectionHandling": {
        "require": true
      },
      "qx.ui.form.MModelSelection": {
        "require": true
      },
      "qx.ui.core.Spacer": {},
      "qx.ui.basic.Atom": {},
      "qx.ui.basic.Image": {},
      "qx.bom.Viewport": {}
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
       * Sebastian Werner (wpbasti)
       * Jonathan Weiß (jonathan_rass)
       * Christian Hagendorn (chris_schmidt)
  
  ************************************************************************ */

  /**
   * A form widget which allows a single selection. Looks somewhat like
   * a normal button, but opens a list of items to select when tapping on it.
   *
   * Keep in mind that the SelectBox widget has always a selected item (due to the
   * single selection mode). Right after adding the first item a <code>changeSelection</code>
   * event is fired.
   *
   * <pre class='javascript'>
   * var selectBox = new qx.ui.form.SelectBox();
   *
   * selectBox.addListener("changeSelection", function(e) {
   *   // ...
   * });
   *
   * // now the 'changeSelection' event is fired
   * selectBox.add(new qx.ui.form.ListItem("Item 1"));
   * </pre>
   *
   * @childControl spacer {qx.ui.core.Spacer} flexible spacer widget
   * @childControl atom {qx.ui.basic.Atom} shows the text and icon of the content
   * @childControl arrow {qx.ui.basic.Image} shows the arrow to open the popup
   */
  qx.Class.define("qx.ui.form.SelectBox", {
    extend: qx.ui.form.AbstractSelectBox,
    implement: [qx.ui.core.ISingleSelection, qx.ui.form.IModelSelection, qx.ui.form.IField],
    include: [qx.ui.core.MSingleSelectionHandling, qx.ui.form.MModelSelection],

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qx.ui.form.AbstractSelectBox.constructor.call(this);

      this._createChildControl("atom");

      this._createChildControl("spacer");

      this._createChildControl("arrow"); // Register listener


      this.addListener("pointerover", this._onPointerOver, this);
      this.addListener("pointerout", this._onPointerOut, this);
      this.addListener("tap", this._onTap, this);
      this.addListener("keyinput", this._onKeyInput, this);
      this.addListener("changeSelection", this.__onChangeSelection__P_222_0, this);
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      // overridden
      appearance: {
        refine: true,
        init: "selectbox"
      },
      rich: {
        init: false,
        check: "Boolean",
        apply: "_applyRich"
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    /* eslint-disable @qooxdoo/qx/no-refs-in-members */
    members: {
      /** @type {qx.ui.basic.Atom} instance */
      __preSelectedItem__P_222_1: null,

      /*
      ---------------------------------------------------------------------------
        WIDGET API
      ---------------------------------------------------------------------------
      */
      _applyRich: function _applyRich(value, oldValue) {
        this.getChildControl("atom").setRich(value);
      },
      // overridden
      _defaultFormat: function _defaultFormat(item) {
        if (item) {
          if (typeof item.isRich == "function" && item.isRich()) {
            this.setRich(true);
          }

          return item.getLabel();
        }

        return null;
      },
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id, hash) {
        var control;

        switch (id) {
          case "spacer":
            control = new qx.ui.core.Spacer();

            this._add(control, {
              flex: 1
            });

            break;

          case "atom":
            control = new qx.ui.basic.Atom(" ");
            control.setCenter(false);
            control.setAnonymous(true);

            this._add(control, {
              flex: 1
            });

            break;

          case "arrow":
            control = new qx.ui.basic.Image();
            control.setAnonymous(true);

            this._add(control);

            break;
        }

        return control || qx.ui.form.SelectBox.superclass.prototype._createChildControlImpl.call(this, id);
      },
      // overridden

      /**
       * @lint ignoreReferenceField(_forwardStates)
       */
      _forwardStates: {
        focused: true
      },

      /*
      ---------------------------------------------------------------------------
        HELPER METHODS FOR SELECTION API
      ---------------------------------------------------------------------------
      */

      /**
       * Returns the list items for the selection.
       *
       * @return {qx.ui.basic.Atom[]} List items to select.
       */
      _getItems: function _getItems() {
        return this.getChildrenContainer().getChildren();
      },

      /**
       * Returns if the selection could be empty or not.
       *
       * @return {Boolean} <code>true</code> If selection could be empty,
       *    <code>false</code> otherwise.
       */
      _isAllowEmptySelection: function _isAllowEmptySelection() {
        return this.getChildrenContainer().getSelectionMode() !== "one";
      },

      /**
       * Event handler for <code>changeSelection</code>.
       *
       * @param e {qx.event.type.Data} Data event.
       */
      __onChangeSelection__P_222_0: function __onChangeSelection__P_222_0(e) {
        var listItem = e.getData()[0];
        var list = this.getChildControl("list");

        if (list.getSelection()[0] != listItem) {
          if (listItem) {
            list.setSelection([listItem]);
          } else {
            list.resetSelection();
          }
        }

        this.__updateIcon__P_222_2();

        this.__updateLabel__P_222_3(); // ARIA attrs


        var old = e.getOldData() ? e.getOldData()[0] : null;
        var current = this.getSelection()[0];

        if (old && old !== current) {
          old.getContentElement().setAttribute("aria-selected", false);
        }

        if (current) {
          current.getContentElement().setAttribute("aria-selected", true);
        }
      },

      /**
       * Sets the icon inside the list to match the selected ListItem.
       */
      __updateIcon__P_222_2: function __updateIcon__P_222_2() {
        var listItem = this.getChildControl("list").getSelection()[0];
        var atom = this.getChildControl("atom");
        var icon = listItem ? listItem.getIcon() : "";
        icon == null ? atom.resetIcon() : atom.setIcon(icon);
      },

      /**
       * Sets the label inside the list to match the selected ListItem.
       */
      __updateLabel__P_222_3: function __updateLabel__P_222_3() {
        var listItem = this.getChildControl("list").getSelection()[0];
        var atom = this.getChildControl("atom");
        var label = listItem ? listItem.getLabel() : "";
        var format = this.getFormat();

        if (format != null && listItem) {
          label = format.call(this, listItem);
        } // check for translation


        if (label && label.translate) {
          label = label.translate();
        }

        label == null ? atom.resetLabel() : atom.setLabel(label);
      },

      /*
      ---------------------------------------------------------------------------
        EVENT LISTENERS
      ---------------------------------------------------------------------------
      */

      /**
       * Listener method for "pointerover" event
       * <ul>
       * <li>Adds state "hovered"</li>
       * <li>Removes "abandoned" and adds "pressed" state (if "abandoned" state is set)</li>
       * </ul>
       *
       * @param e {qx.event.type.Pointer} Pointer event
       */
      _onPointerOver: function _onPointerOver(e) {
        if (!this.isEnabled() || e.getTarget() !== this) {
          return;
        }

        if (this.hasState("abandoned")) {
          this.removeState("abandoned");
          this.addState("pressed");
        }

        this.addState("hovered");
      },

      /**
       * Listener method for "pointerout" event
       * <ul>
       * <li>Removes "hovered" state</li>
       * <li>Adds "abandoned" and removes "pressed" state (if "pressed" state is set)</li>
       * </ul>
       *
       * @param e {qx.event.type.Pointer} Pointer event
       */
      _onPointerOut: function _onPointerOut(e) {
        if (!this.isEnabled() || e.getTarget() !== this) {
          return;
        }

        this.removeState("hovered");

        if (this.hasState("pressed")) {
          this.removeState("pressed");
          this.addState("abandoned");
        }
      },

      /**
       * Toggles the popup's visibility.
       *
       * @param e {qx.event.type.Pointer} Pointer event
       */
      _onTap: function _onTap(e) {
        this.toggle();
      },
      // overridden
      _onKeyPress: function _onKeyPress(e) {
        var iden = e.getKeyIdentifier();

        if ((iden == "Down" || iden == "Up") && e.isAltPressed()) {
          this.toggle();
          e.stop();
        } else if (iden == "Enter" || iden == "Space") {
          // Apply pre-selected item (translate quick selection to real selection)
          if (this.__preSelectedItem__P_222_1) {
            this.setSelection([this.__preSelectedItem__P_222_1]);
            this.__preSelectedItem__P_222_1 = null;
          }

          this.toggle();
          e.stop();
        } else {
          qx.ui.form.SelectBox.superclass.prototype._onKeyPress.call(this, e);
        }
      },

      /**
       * Forwards key event to list widget.
       *
       * @param e {qx.event.type.KeyInput} Key event
       */
      _onKeyInput: function _onKeyInput(e) {
        // clone the event and re-calibrate the event
        var clone = e.clone();
        clone.setTarget(this._list);
        clone.setBubbles(false); // forward it to the list

        this.getChildControl("list").dispatchEvent(clone);
      },
      // overridden
      _onListPointerDown: function _onListPointerDown(e) {
        // Apply pre-selected item (translate quick selection to real selection)
        if (this.__preSelectedItem__P_222_1) {
          this.setSelection([this.__preSelectedItem__P_222_1]);
          this.__preSelectedItem__P_222_1 = null;
        }
      },
      // overridden
      _onListChangeSelection: function _onListChangeSelection(e) {
        var current = e.getData();
        var old = e.getOldData(); // Remove old listeners for icon and label changes.

        if (old && old.length > 0) {
          old[0].removeListener("changeIcon", this.__updateIcon__P_222_2, this);
          old[0].removeListener("changeLabel", this.__updateLabel__P_222_3, this);
        }

        if (current.length > 0) {
          // Ignore quick context (e.g. pointerover)
          // and configure the new value when closing the popup afterwards
          var popup = this.getChildControl("popup");
          var list = this.getChildControl("list");
          var context = list.getSelectionContext();

          if (popup.isVisible() && (context == "quick" || context == "key")) {
            this.__preSelectedItem__P_222_1 = current[0];
          } else {
            this.setSelection([current[0]]);
            this.__preSelectedItem__P_222_1 = null;
          } // Add listeners for icon and label changes


          current[0].addListener("changeIcon", this.__updateIcon__P_222_2, this);
          current[0].addListener("changeLabel", this.__updateLabel__P_222_3, this);
        } else {
          this.resetSelection();
        } // Set aria-activedescendant


        var contentEl = this.getContentElement();

        if (!contentEl) {
          return;
        }

        var currentContentEl = current && current[0] ? current[0].getContentElement() : null;

        if (currentContentEl) {
          contentEl.setAttribute("aria-activedescendant", currentContentEl.getAttribute("id"));
        } else {
          contentEl.removeAttribute("aria-activedescendant");
        }
      },
      // overridden
      _onPopupChangeVisibility: function _onPopupChangeVisibility(e) {
        qx.ui.form.SelectBox.superclass.prototype._onPopupChangeVisibility.call(this, e); // Synchronize the current selection to the list selection
        // when the popup is closed. The list selection may be invalid
        // because of the quick selection handling which is not
        // directly applied to the selectbox


        var popup = this.getChildControl("popup");

        if (!popup.isVisible()) {
          var list = this.getChildControl("list"); // check if the list has any children before selecting

          if (list.hasChildren()) {
            list.setSelection(this.getSelection());
          }
        } else {
          // ensure that the list is never bigger that the max list height and
          // the available space in the viewport
          var distance = popup.getLayoutLocation(this);
          var viewPortHeight = qx.bom.Viewport.getHeight(); // distance to the bottom and top borders of the viewport

          var toTop = distance.top;
          var toBottom = viewPortHeight - distance.bottom;
          var availableHeigth = toTop > toBottom ? toTop : toBottom;
          var maxListHeight = this.getMaxListHeight();
          var list = this.getChildControl("list");

          if (maxListHeight == null || maxListHeight > availableHeigth) {
            list.setMaxHeight(availableHeigth);
          } else if (maxListHeight < availableHeigth) {
            list.setMaxHeight(maxListHeight);
          }
        }
      }
    },

    /*
    *****************************************************************************
       DESTRUCT
    *****************************************************************************
    */
    destruct: function destruct() {
      this.__preSelectedItem__P_222_1 = null;
    }
  });
  qx.ui.form.SelectBox.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.basic.Atom": {
        "construct": true,
        "require": true
      },
      "qx.ui.form.IModel": {
        "require": true
      },
      "qx.ui.form.IListItem": {
        "require": true
      },
      "qx.ui.form.MModelProperty": {
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
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
  
  ************************************************************************ */

  /**
   * A item for a list. Could be added to all List like widgets but also
   * to the {@link qx.ui.form.SelectBox} and {@link qx.ui.form.ComboBox}.
   */
  qx.Class.define("qx.ui.form.ListItem", {
    extend: qx.ui.basic.Atom,
    implement: [qx.ui.form.IModel, qx.ui.form.IListItem],
    include: [qx.ui.form.MModelProperty],

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param label {String} Label to use
     * @param icon {String?null} Icon to use
     * @param model {String?null} The items value
     */
    construct: function construct(label, icon, model) {
      qx.ui.basic.Atom.constructor.call(this, label, icon);

      if (model != null) {
        this.setModel(model);
      }

      this.addListener("pointerover", this._onPointerOver, this);
      this.addListener("pointerout", this._onPointerOut, this);
    },

    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */
    events: {
      /** (Fired by {@link qx.ui.form.List}) */
      action: "qx.event.type.Event"
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      appearance: {
        refine: true,
        init: "listitem"
      }
    },

    /* eslint-disable @qooxdoo/qx/no-refs-in-members */
    members: {
      // overridden

      /**
       * @lint ignoreReferenceField(_forwardStates)
       */
      _forwardStates: {
        focused: true,
        hovered: true,
        selected: true,
        dragover: true
      },

      /**
       * Event handler for the pointer over event.
       */
      _onPointerOver: function _onPointerOver() {
        this.addState("hovered");
      },

      /**
       * Event handler for the pointer out event.
       */
      _onPointerOut: function _onPointerOut() {
        this.removeState("hovered");
      }
    },
    destruct: function destruct() {
      this.removeListener("pointerover", this._onPointerOver, this);
      this.removeListener("pointerout", this._onPointerOut, this);
    }
  });
  qx.ui.form.ListItem.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.dom.Element": {},
      "qx.bom.client.Css": {
        "require": true
      },
      "qx.bom.client.Html": {
        "require": true
      },
      "qx.bom.element.Style": {},
      "qx.core.Assert": {},
      "qx.bom.element.Attribute": {},
      "qx.bom.element.Dimension": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "css.textoverflow": {
          "className": "qx.bom.client.Css"
        },
        "html.xul": {
          "className": "qx.bom.client.Html"
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
   * Cross browser abstractions to work with labels.
   */
  qx.Bootstrap.define("qx.bom.Label", {
    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */
    statics: {
      /** @type {Map} Contains all supported styles */
      __styles__P_101_0: {
        fontFamily: 1,
        fontSize: 1,
        fontWeight: 1,
        fontStyle: 1,
        lineHeight: 1,
        wordBreak: 1,
        letterSpacing: 1
      },

      /**
       * Generates the helper DOM element for text measuring
       *
       * @return {Element} Helper DOM element
       */
      __prepareText__P_101_1: function __prepareText__P_101_1() {
        var el = this.__createMeasureElement__P_101_2(false);

        document.body.insertBefore(el, document.body.firstChild);
        return this._textElement = el;
      },

      /**
       * Generates the helper DOM element for HTML measuring
       *
       * @return {Element} Helper DOM element
       */
      __prepareHtml__P_101_3: function __prepareHtml__P_101_3() {
        var el = this.__createMeasureElement__P_101_2(true);

        document.body.insertBefore(el, document.body.firstChild);
        return this._htmlElement = el;
      },

      /**
       * Creates the measure element
       *
       * @param html {Boolean?false} Whether HTML markup should be used.
       * @return {Element} The measure element
       */
      __createMeasureElement__P_101_2: function __createMeasureElement__P_101_2(html) {
        var el = qx.dom.Element.create("div");
        var style = el.style;
        style.width = style.height = "auto";
        style.left = style.top = "-1000px";
        style.visibility = "hidden";
        style.position = "absolute";
        style.overflow = "visible";
        style.display = "block";

        if (html) {
          style.whiteSpace = "normal";
        } else {
          style.whiteSpace = "nowrap";

          if (!qx.core.Environment.get("css.textoverflow") && qx.core.Environment.get("html.xul")) {
            var inner = document.createElementNS("http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul", "label"); // Force style inheritance for font styles to omit usage of
            // CSS "label" selector, See bug #1349 for details.

            var style = inner.style;
            style.padding = "0";
            style.margin = "0";
            style.width = "auto";

            for (var key in this.__styles__P_101_0) {
              style[key] = "inherit";
            }

            el.appendChild(inner);
          }
        }

        return el;
      },

      /**
       * Returns a map of all styles which should be applied as
       * a basic set.
       *
       * @param html {Boolean?false} Whether HTML markup should be used.
       * @return {Map} Initial styles which should be applied to a label element.
       */
      __getStyles__P_101_4: function __getStyles__P_101_4(html) {
        var styles = {};
        styles.overflow = "hidden";

        if (html) {
          styles.whiteSpace = "normal";
        } else if (!qx.core.Environment.get("css.textoverflow") && qx.core.Environment.get("html.xul")) {
          styles.display = "block";
        } else {
          styles.whiteSpace = "nowrap";
          styles[qx.core.Environment.get("css.textoverflow")] = "ellipsis";
        }

        return styles;
      },

      /**
       * Creates a label.
       *
       * The default mode is 'text' which means that the overlapping text is cut off
       * using ellipsis automatically. Text wrapping is disabled in this mode
       * as well. Spaces are normalized. Umlauts and other special symbols are only
       * allowed in unicode mode as normal characters.
       *
       * In the HTML mode you can insert any HTML, but loose the capability to cut
       * of overlapping text. Automatic text wrapping is enabled by default.
       *
       * It is not possible to modify the mode afterwards.
       *
       * @param content {String} Content of the label
       * @param html {Boolean?false} Whether HTML markup should be used.
       * @param win {Window?null} Window to create the element for
       * @return {Element} The created iframe node
       */
      create: function create(content, html, win) {
        if (!win) {
          win = window;
        }

        var el = win.document.createElement("div");

        if (html) {
          el.useHtml = true;
        }

        if (!qx.core.Environment.get("css.textoverflow") && qx.core.Environment.get("html.xul")) {
          // Gecko as of Firefox 2.x and 3.0 does not support ellipsis
          // for text overflow. We use this feature from XUL instead.
          var xulel = win.document.createElementNS("http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul", "label");
          var style = xulel.style;
          style.cursor = "inherit";
          style.color = "inherit";
          style.overflow = "hidden";
          style.maxWidth = "100%";
          style.padding = "0";
          style.margin = "0";
          style.width = "auto"; // Force style inheritance for font styles to omit usage of
          // CSS "label" selector, See bug #1349 for details.

          for (var key in this.__styles__P_101_0) {
            xulel.style[key] = "inherit";
          }

          xulel.setAttribute("crop", "end");
          el.appendChild(xulel);
        } else {
          qx.bom.element.Style.setStyles(el, this.__getStyles__P_101_4(html));
        }

        if (content) {
          this.setValue(el, content);
        }

        return el;
      },

      /** Sanitizer function */
      __sanitizer__P_101_5: null,

      /**
       * Sets a function to sanitize values. It will be used by {@link #setValue}.
       * The function to sanitize will get the <code>string</code> value and
       * should return a sanitized / cleared <code>string</code>.
       *
       * @param func {Function | null} Function to sanitize / clean HTML code
       *  from given string parameter
       */
      setSanitizer: function setSanitizer(func) {
        {
          if (func) {
            qx.core.Assert.assertFunction(func);
          }
        }
        qx.bom.Label.__sanitizer__P_101_5 = func;
      },

      /**
       * Sets the content of the element.
       *
       * The possibilities of the value depends on the mode
       * defined using {@link #create}.
       *
       * @param element {Element} DOM element to modify.
       * @param value {String} Content to insert.
       */
      setValue: function setValue(element, value) {
        value = value || "";

        if (element.useHtml) {
          if (qx.bom.Label.__sanitizer__P_101_5 && typeof qx.bom.Label.__sanitizer__P_101_5 === "function") {
            value = qx.bom.Label.__sanitizer__P_101_5(value);
          }

          element.innerHTML = value;
        } else if (!qx.core.Environment.get("css.textoverflow") && qx.core.Environment.get("html.xul")) {
          element.firstChild.setAttribute("value", value);
        } else {
          qx.bom.element.Attribute.set(element, "text", value);
        }
      },

      /**
       * Returns the content of the element.
       *
       * @param element {Element} DOM element to query.
       * @return {String} Content stored in the element.
       */
      getValue: function getValue(element) {
        if (element.useHtml) {
          return element.innerHTML;
        } else if (!qx.core.Environment.get("css.textoverflow") && qx.core.Environment.get("html.xul")) {
          return element.firstChild.getAttribute("value") || "";
        } else {
          return qx.bom.element.Attribute.get(element, "text");
        }
      },

      /**
       * Returns the preferred dimensions of the given HTML content.
       *
       * @param content {String} The HTML markup to measure
       * @param styles {Map?null} Optional styles to apply
       * @param width {Integer} To support width for height it is possible to limit the width
       * @return {Map} A map with preferred <code>width</code> and <code>height</code>.
       */
      getHtmlSize: function getHtmlSize(content, styles, width) {
        var element = this._htmlElement || this.__prepareHtml__P_101_3(); // apply width


        element.style.width = width != undefined ? width + "px" : "auto"; // insert content

        element.innerHTML = content;
        return this.__measureSize__P_101_6(element, styles);
      },

      /**
       * Returns the preferred dimensions of the given text.
       *
       * @param text {String} The text to measure
       * @param styles {Map} Optional styles to apply
       * @return {Map} A map with preferred <code>width</code> and <code>height</code>.
       */
      getTextSize: function getTextSize(text, styles) {
        var element = this._textElement || this.__prepareText__P_101_1();

        if (!qx.core.Environment.get("css.textoverflow") && qx.core.Environment.get("html.xul")) {
          element.firstChild.setAttribute("value", text);
        } else {
          qx.bom.element.Attribute.set(element, "text", text);
        }

        return this.__measureSize__P_101_6(element, styles);
      },

      /**
       * Measure the size of the given element
       *
       * @param element {Element} The element to measure
       * @param styles {Map?null} Optional styles to apply
       * @return {Map} A map with preferred <code>width</code> and <code>height</code>.
       */
      __measureSize__P_101_6: function __measureSize__P_101_6(element, styles) {
        // sync styles
        var keys = this.__styles__P_101_0;

        if (!styles) {
          styles = {};
        }

        for (var key in keys) {
          element.style[key] = styles[key] || "";
        } // detect size


        var size = qx.bom.element.Dimension.getSize(element); // all modern browser are needing one more pixel for width

        size.width++;
        return size;
      }
    }
  });
  qx.bom.Label.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "usage": "dynamic",
        "require": true
      },
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.scroll.ScrollBar": {}
    },
    "environment": {
      "provided": ["qx.nativeScrollBars"],
      "required": {}
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
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */
  qx.core.Environment.add("qx.nativeScrollBars", false);
  /**
   * Include this widget if you want to create scrollbars depending on the global
   * "qx.nativeScrollBars" setting.
   */

  qx.Mixin.define("qx.ui.core.scroll.MScrollBarFactory", {
    members: {
      /**
       * Creates a new scrollbar. This can either be a styled qooxdoo scrollbar
       * or a native browser scrollbar.
       *
       * @param orientation {String?"horizontal"} The initial scroll bar orientation
       * @return {qx.ui.core.scroll.IScrollBar} The scrollbar instance
       */
      _createScrollBar: function _createScrollBar(orientation) {
        {
          return new qx.ui.core.scroll.ScrollBar(orientation);
        }
      }
    }
  });
  qx.ui.core.scroll.MScrollBarFactory.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
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
       2004-2014 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * Mixin holding the handler for roll event. Please
   * keep in mind that the including widget has to have the scroll bars
   * implemented as child controls named <code>scrollbar-x</code> and
   * <code>scrollbar-y</code> to get the handler working. Also, you have to
   * attach the listener yourself.
   */
  qx.Mixin.define("qx.ui.core.scroll.MRoll", {
    members: {
      _cancelRoll: null,

      /**
       * Responsible for adding the event listener needed for scroll handling.
       */
      _addRollHandling: function _addRollHandling() {
        this.addListener("roll", this._onRoll, this);
        this.addListener("pointerdown", this._onPointerDownForRoll, this);
      },

      /**
       * Responsible for removing the event listener needed for scroll handling.
       */
      _removeRollHandling: function _removeRollHandling() {
        this.removeListener("roll", this._onRoll, this);
        this.removeListener("pointerdown", this._onPointerDownForRoll, this);
      },

      /**
       * Handler for the pointerdown event which simply stops the momentum scrolling.
       *
       * @param e {qx.event.type.Pointer} pointerdown event
       */
      _onPointerDownForRoll: function _onPointerDownForRoll(e) {
        this._cancelRoll = e.getPointerId();
      },

      /**
       * Roll event handler
       *
       * @param e {qx.event.type.Roll} Roll event
       */
      _onRoll: function _onRoll(e) {
        // only wheel and touch
        if (e.getPointerType() == "mouse") {
          return;
        }

        if (this._cancelRoll && e.getMomentum()) {
          e.stopMomentum();
          this._cancelRoll = null;
          return;
        }

        this._cancelRoll = null;

        var showX = this._isChildControlVisible("scrollbar-x");

        var showY = this._isChildControlVisible("scrollbar-y");

        var scrollbarY = showY ? this.getChildControl("scrollbar-y", true) : null;
        var scrollbarX = showX ? this.getChildControl("scrollbar-x", true) : null;
        var deltaY = e.getDelta().y;
        var deltaX = e.getDelta().x;
        var endY = !showY;
        var endX = !showX; // y case

        if (scrollbarY) {
          if (deltaY !== 0) {
            scrollbarY.scrollBy(parseInt(deltaY, 10));
          }

          var position = scrollbarY.getPosition();
          var max = scrollbarY.getMaximum(); // pass the event to the parent if the scrollbar is at an edge

          if (deltaY < 0 && position <= 0 || deltaY > 0 && position >= max) {
            endY = true;
          }
        } // x case


        if (scrollbarX) {
          if (deltaX !== 0) {
            scrollbarX.scrollBy(parseInt(deltaX, 10));
          }

          var position = scrollbarX.getPosition();
          var max = scrollbarX.getMaximum(); // pass the event to the parent if the scrollbar is at an edge

          if (deltaX < 0 && position <= 0 || deltaX > 0 && position >= max) {
            endX = true;
          }
        }

        if (endX && endY) {
          e.stopMomentum();
        } // pass the event to the parent if both scrollbars are at the end


        if (!endY && deltaX === 0 || !endX && deltaY === 0 || (!endX || !endY) && deltaX !== 0 && deltaY !== 0) {
          // Stop bubbling and native event only if a scrollbar is visible
          e.stop();
        }
      }
    }
  });
  qx.ui.core.scroll.MRoll.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.bom.element.Scroll": {},
      "qx.bom.client.OperatingSystem": {
        "require": true
      },
      "qx.bom.client.Browser": {
        "require": true
      },
      "qx.bom.client.Event": {
        "require": true
      }
    },
    "environment": {
      "provided": ["os.scrollBarOverlayed", "qx.mobile.nativescroll"],
      "required": {
        "os.name": {
          "className": "qx.bom.client.OperatingSystem"
        },
        "browser.version": {
          "className": "qx.bom.client.Browser"
        },
        "browser.name": {
          "className": "qx.bom.client.Browser"
        },
        "os.version": {
          "className": "qx.bom.client.OperatingSystem"
        },
        "event.mspointer": {
          "className": "qx.bom.client.Event"
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
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * This class is responsible for checking the scrolling behavior of the client.
   *
   * This class is used by {@link qx.core.Environment} and should not be used
   * directly. Please check its class comment for details how to use it.
   *
   * @internal
   */
  qx.Bootstrap.define("qx.bom.client.Scroll", {
    statics: {
      /**
       * Check if the scrollbars should be positioned on top of the content. This
       * is true of OSX Lion when the scrollbars disappear automatically.
       *
       * @internal
       *
       * @return {Boolean} <code>true</code> if the scrollbars should be
       *   positioned on top of the content.
       */
      scrollBarOverlayed: function scrollBarOverlayed() {
        var scrollBarWidth = qx.bom.element.Scroll.getScrollbarWidth();
        var osx = qx.bom.client.OperatingSystem.getName() === "osx";
        var nativeScrollBars = false;
        return scrollBarWidth === 0 && osx && nativeScrollBars;
      },

      /**
       * Checks if native scroll can be used for the current mobile device.
       *
       * @internal
       *
       * @return {Boolean} <code>true</code> if the current device is capable to
       * use native scroll.
       */
      getNativeScroll: function getNativeScroll() {
        // iOS 8+
        if (qx.core.Environment.get("os.name") == "ios" && parseInt(qx.core.Environment.get("browser.version"), 10) > 7) {
          return true;
        } // Firefox


        if (qx.core.Environment.get("browser.name") == "firefox") {
          return true;
        } // Android 4.4+


        if (qx.core.Environment.get("os.name") == "android") {
          var osVersion = qx.core.Environment.get("os.version");
          var splitVersion = osVersion.split(".");

          if (splitVersion[0] > 4 || splitVersion.length > 1 && splitVersion[0] > 3 && splitVersion[1] > 3) {
            return true;
          }
        } // IE 10+


        if (qx.core.Environment.get("event.mspointer")) {
          return true;
        }

        return false;
      }
    },
    defer: function defer(statics) {
      qx.core.Environment.add("os.scrollBarOverlayed", statics.scrollBarOverlayed);
      qx.core.Environment.add("qx.mobile.nativescroll", statics.getNativeScroll);
    }
  });
  qx.bom.client.Scroll.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "construct": true,
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
      "qx.ui.core.scroll.MScrollBarFactory": {
        "require": true
      },
      "qx.ui.core.scroll.MRoll": {
        "require": true
      },
      "qx.ui.core.MDragDropScrolling": {
        "require": true
      },
      "qx.bom.client.Scroll": {
        "construct": true,
        "require": true
      },
      "qx.ui.layout.Canvas": {
        "construct": true
      },
      "qx.ui.layout.Grid": {
        "construct": true
      },
      "qx.ui.core.scroll.ScrollPane": {},
      "qx.ui.core.queue.Manager": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "os.scrollBarOverlayed": {
          "construct": true,
          "className": "qx.bom.client.Scroll"
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
   * The ScrollArea provides a container widget with on demand scroll bars
   * if the content size exceeds the size of the container.
   *
   * @childControl pane {qx.ui.core.scroll.ScrollPane} pane which holds the content to scroll
   * @childControl scrollbar-x {qx.ui.core.scroll.ScrollBar?qx.ui.core.scroll.NativeScrollBar} horizontal scrollbar
   * @childControl scrollbar-y {qx.ui.core.scroll.ScrollBar?qx.ui.core.scroll.NativeScrollBar} vertical scrollbar
   * @childControl corner {qx.ui.core.Widget} corner where no scrollbar is shown
   */
  qx.Class.define("qx.ui.core.scroll.AbstractScrollArea", {
    extend: qx.ui.core.Widget,
    include: [qx.ui.core.scroll.MScrollBarFactory, qx.ui.core.scroll.MRoll, qx.ui.core.MDragDropScrolling],
    type: "abstract",

    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */
    statics: {
      /**
       * The default width which is used for the width of the scroll bar if
       * overlaid.
       */
      DEFAULT_SCROLLBAR_WIDTH: 14
    },

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qx.ui.core.Widget.constructor.call(this);

      if (qx.core.Environment.get("os.scrollBarOverlayed")) {
        // use a plain canvas to overlay the scroll bars
        this._setLayout(new qx.ui.layout.Canvas());
      } else {
        // Create 'fixed' grid layout
        var grid = new qx.ui.layout.Grid();
        grid.setColumnFlex(0, 1);
        grid.setRowFlex(0, 1);

        this._setLayout(grid);
      } // since the scroll container disregards the min size of the scrollbars
      // we have to set the min size of the scroll area to ensure that the
      // scrollbars always have an usable size.


      var size = qx.ui.core.scroll.AbstractScrollArea.DEFAULT_SCROLLBAR_WIDTH * 2 + 14;
      this.set({
        minHeight: size,
        minWidth: size
      }); // Roll listener for scrolling

      this._addRollHandling();
    },
    events: {
      /** Fired as soon as the scroll animation in X direction ends. */
      scrollAnimationXEnd: "qx.event.type.Event",

      /** Fired as soon as the scroll animation in Y direction ends. */
      scrollAnimationYEnd: "qx.event.type.Event"
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      // overridden
      appearance: {
        refine: true,
        init: "scrollarea"
      },
      // overridden
      width: {
        refine: true,
        init: 0
      },
      // overridden
      height: {
        refine: true,
        init: 0
      },

      /**
       * The policy, when the horizontal scrollbar should be shown.
       * <ul>
       *   <li><b>auto</b>: Show scrollbar on demand</li>
       *   <li><b>on</b>: Always show the scrollbar</li>
       *   <li><b>off</b>: Never show the scrollbar</li>
       * </ul>
       */
      scrollbarX: {
        check: ["auto", "on", "off"],
        init: "auto",
        themeable: true,
        apply: "_computeScrollbars"
      },

      /**
       * The policy, when the horizontal scrollbar should be shown.
       * <ul>
       *   <li><b>auto</b>: Show scrollbar on demand</li>
       *   <li><b>on</b>: Always show the scrollbar</li>
       *   <li><b>off</b>: Never show the scrollbar</li>
       * </ul>
       */
      scrollbarY: {
        check: ["auto", "on", "off"],
        init: "auto",
        themeable: true,
        apply: "_computeScrollbars"
      },

      /**
       * Group property, to set the overflow of both scroll bars.
       */
      scrollbar: {
        group: ["scrollbarX", "scrollbarY"]
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      /*
      ---------------------------------------------------------------------------
        CHILD CONTROL SUPPORT
      ---------------------------------------------------------------------------
      */
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id, hash) {
        var control;

        switch (id) {
          case "pane":
            control = new qx.ui.core.scroll.ScrollPane();
            control.addListener("update", this._computeScrollbars, this);
            control.addListener("scrollX", this._onScrollPaneX, this);
            control.addListener("scrollY", this._onScrollPaneY, this);

            if (qx.core.Environment.get("os.scrollBarOverlayed")) {
              this._add(control, {
                edge: 0
              });
            } else {
              this._add(control, {
                row: 0,
                column: 0
              });
            }

            break;

          case "scrollbar-x":
            control = this._createScrollBar("horizontal");
            control.setMinWidth(0);
            control.exclude();
            control.addListener("scroll", this._onScrollBarX, this);
            control.addListener("changeVisibility", this._onChangeScrollbarXVisibility, this);
            control.addListener("scrollAnimationEnd", this._onScrollAnimationEnd.bind(this, "X"));

            if (qx.core.Environment.get("os.scrollBarOverlayed")) {
              control.setMinHeight(qx.ui.core.scroll.AbstractScrollArea.DEFAULT_SCROLLBAR_WIDTH);

              this._add(control, {
                bottom: 0,
                right: 0,
                left: 0
              });
            } else {
              this._add(control, {
                row: 1,
                column: 0
              });
            }

            break;

          case "scrollbar-y":
            control = this._createScrollBar("vertical");
            control.setMinHeight(0);
            control.exclude();
            control.addListener("scroll", this._onScrollBarY, this);
            control.addListener("changeVisibility", this._onChangeScrollbarYVisibility, this);
            control.addListener("scrollAnimationEnd", this._onScrollAnimationEnd.bind(this, "Y"));

            if (qx.core.Environment.get("os.scrollBarOverlayed")) {
              control.setMinWidth(qx.ui.core.scroll.AbstractScrollArea.DEFAULT_SCROLLBAR_WIDTH);

              this._add(control, {
                right: 0,
                bottom: 0,
                top: 0
              });
            } else {
              this._add(control, {
                row: 0,
                column: 1
              });
            }

            break;

          case "corner":
            control = new qx.ui.core.Widget();
            control.setWidth(0);
            control.setHeight(0);
            control.exclude();

            if (!qx.core.Environment.get("os.scrollBarOverlayed")) {
              // only add for non overlayed scroll bars
              this._add(control, {
                row: 1,
                column: 1
              });
            }

            break;
        }

        return control || qx.ui.core.scroll.AbstractScrollArea.superclass.prototype._createChildControlImpl.call(this, id);
      },

      /*
      ---------------------------------------------------------------------------
        PANE SIZE
      ---------------------------------------------------------------------------
      */

      /**
       * Returns the dimensions of the pane.
       *
       * @return {Map|null} The pane dimension in pixel. Contains
       *    the keys <code>width</code> and <code>height</code>.
       */
      getPaneSize: function getPaneSize() {
        return this.getChildControl("pane").getInnerSize();
      },

      /*
      ---------------------------------------------------------------------------
        ITEM LOCATION SUPPORT
      ---------------------------------------------------------------------------
      */

      /**
       * Returns the top offset of the given item in relation to the
       * inner height of this widget.
       *
       * @param item {qx.ui.core.Widget} Item to query
       * @return {Integer} Top offset
       */
      getItemTop: function getItemTop(item) {
        return this.getChildControl("pane").getItemTop(item);
      },

      /**
       * Returns the top offset of the end of the given item in relation to the
       * inner height of this widget.
       *
       * @param item {qx.ui.core.Widget} Item to query
       * @return {Integer} Top offset
       */
      getItemBottom: function getItemBottom(item) {
        return this.getChildControl("pane").getItemBottom(item);
      },

      /**
       * Returns the left offset of the given item in relation to the
       * inner width of this widget.
       *
       * @param item {qx.ui.core.Widget} Item to query
       * @return {Integer} Top offset
       */
      getItemLeft: function getItemLeft(item) {
        return this.getChildControl("pane").getItemLeft(item);
      },

      /**
       * Returns the left offset of the end of the given item in relation to the
       * inner width of this widget.
       *
       * @param item {qx.ui.core.Widget} Item to query
       * @return {Integer} Right offset
       */
      getItemRight: function getItemRight(item) {
        return this.getChildControl("pane").getItemRight(item);
      },

      /*
      ---------------------------------------------------------------------------
        SCROLL SUPPORT
      ---------------------------------------------------------------------------
      */

      /**
       * Scrolls the element's content to the given left coordinate
       *
       * @param value {Integer} The vertical position to scroll to.
       * @param duration {Number?} The time in milliseconds the scroll to should take.
       */
      scrollToX: function scrollToX(value, duration) {
        // First flush queue before scroll
        qx.ui.core.queue.Manager.flush();
        this.getChildControl("scrollbar-x").scrollTo(value, duration);
      },

      /**
       * Scrolls the element's content by the given left offset
       *
       * @param value {Integer} The vertical position to scroll to.
       * @param duration {Number?} The time in milliseconds the scroll to should take.
       */
      scrollByX: function scrollByX(value, duration) {
        // First flush queue before scroll
        qx.ui.core.queue.Manager.flush();
        this.getChildControl("scrollbar-x").scrollBy(value, duration);
      },

      /**
       * Returns the scroll left position of the content
       *
       * @return {Integer} Horizontal scroll position
       */
      getScrollX: function getScrollX() {
        var scrollbar = this.getChildControl("scrollbar-x", true);
        return scrollbar ? scrollbar.getPosition() : 0;
      },

      /**
       * Scrolls the element's content to the given top coordinate
       *
       * @param value {Integer} The horizontal position to scroll to.
       * @param duration {Number?} The time in milliseconds the scroll to should take.
       */
      scrollToY: function scrollToY(value, duration) {
        // First flush queue before scroll
        qx.ui.core.queue.Manager.flush();
        this.getChildControl("scrollbar-y").scrollTo(value, duration);
      },

      /**
       * Scrolls the element's content by the given top offset
       *
       * @param value {Integer} The horizontal position to scroll to.
       * @param duration {Number?} The time in milliseconds the scroll to should take.
       */
      scrollByY: function scrollByY(value, duration) {
        // First flush queue before scroll
        qx.ui.core.queue.Manager.flush();
        this.getChildControl("scrollbar-y").scrollBy(value, duration);
      },

      /**
       * Returns the scroll top position of the content
       *
       * @return {Integer} Vertical scroll position
       */
      getScrollY: function getScrollY() {
        var scrollbar = this.getChildControl("scrollbar-y", true);
        return scrollbar ? scrollbar.getPosition() : 0;
      },

      /**
       * In case a scroll animation is currently running in X direction,
       * it will be stopped. If not, the method does nothing.
       */
      stopScrollAnimationX: function stopScrollAnimationX() {
        var scrollbar = this.getChildControl("scrollbar-x", true);

        if (scrollbar) {
          scrollbar.stopScrollAnimation();
        }
      },

      /**
       * In case a scroll animation is currently running in X direction,
       * it will be stopped. If not, the method does nothing.
       */
      stopScrollAnimationY: function stopScrollAnimationY() {
        var scrollbar = this.getChildControl("scrollbar-y", true);

        if (scrollbar) {
          scrollbar.stopScrollAnimation();
        }
      },

      /*
      ---------------------------------------------------------------------------
        EVENT LISTENERS
      ---------------------------------------------------------------------------
      */

      /**
       * Event handler for the scroll animation end event for both scroll bars.
       *
       * @param direction {String} Either "X" or "Y".
       */
      _onScrollAnimationEnd: function _onScrollAnimationEnd(direction) {
        this.fireEvent("scrollAnimation" + direction + "End");
      },

      /**
       * Event handler for the scroll event of the horizontal scrollbar
       *
       * @param e {qx.event.type.Data} The scroll event object
       */
      _onScrollBarX: function _onScrollBarX(e) {
        this.getChildControl("pane").scrollToX(e.getData());
      },

      /**
       * Event handler for the scroll event of the vertical scrollbar
       *
       * @param e {qx.event.type.Data} The scroll event object
       */
      _onScrollBarY: function _onScrollBarY(e) {
        this.getChildControl("pane").scrollToY(e.getData());
      },

      /**
       * Event handler for the horizontal scroll event of the pane
       *
       * @param e {qx.event.type.Data} The scroll event object
       */
      _onScrollPaneX: function _onScrollPaneX(e) {
        var scrollbar = this.getChildControl("scrollbar-x");

        if (scrollbar) {
          scrollbar.updatePosition(e.getData());
        }
      },

      /**
       * Event handler for the vertical scroll event of the pane
       *
       * @param e {qx.event.type.Data} The scroll event object
       */
      _onScrollPaneY: function _onScrollPaneY(e) {
        var scrollbar = this.getChildControl("scrollbar-y");

        if (scrollbar) {
          scrollbar.updatePosition(e.getData());
        }
      },

      /**
       * Event handler for visibility changes of horizontal scrollbar.
       *
       * @param e {qx.event.type.Event} Property change event
       */
      _onChangeScrollbarXVisibility: function _onChangeScrollbarXVisibility(e) {
        var showX = this._isChildControlVisible("scrollbar-x");

        var showY = this._isChildControlVisible("scrollbar-y");

        if (!showX) {
          this.scrollToX(0);
        }

        showX && showY ? this._showChildControl("corner") : this._excludeChildControl("corner");
      },

      /**
       * Event handler for visibility changes of horizontal scrollbar.
       *
       * @param e {qx.event.type.Event} Property change event
       */
      _onChangeScrollbarYVisibility: function _onChangeScrollbarYVisibility(e) {
        var showX = this._isChildControlVisible("scrollbar-x");

        var showY = this._isChildControlVisible("scrollbar-y");

        if (!showY) {
          this.scrollToY(0);
        }

        showX && showY ? this._showChildControl("corner") : this._excludeChildControl("corner");
      },

      /*
      ---------------------------------------------------------------------------
        HELPER METHODS
      ---------------------------------------------------------------------------
      */

      /**
       * Computes the visibility state for scrollbars.
       *
       */
      _computeScrollbars: function _computeScrollbars() {
        var pane = this.getChildControl("pane");
        var content = pane.getChildren()[0];

        if (!content) {
          this._excludeChildControl("scrollbar-x");

          this._excludeChildControl("scrollbar-y");

          return;
        }

        var innerSize = this.getInnerSize();
        var paneSize = pane.getInnerSize();
        var scrollSize = pane.getScrollSize(); // if the widget has not yet been rendered, return and try again in the
        // resize event

        if (!paneSize || !scrollSize) {
          return;
        }

        var scrollbarX = this.getScrollbarX();
        var scrollbarY = this.getScrollbarY();

        if (scrollbarX === "auto" && scrollbarY === "auto") {
          // Check if the container is big enough to show
          // the full content.
          var showX = scrollSize.width > innerSize.width;
          var showY = scrollSize.height > innerSize.height; // Dependency check
          // We need a special intelligence here when only one
          // of the autosized axis requires a scrollbar
          // This scrollbar may then influence the need
          // for the other one as well.

          if ((showX || showY) && !(showX && showY)) {
            if (showX) {
              showY = scrollSize.height > paneSize.height;
            } else if (showY) {
              showX = scrollSize.width > paneSize.width;
            }
          }
        } else {
          var showX = scrollbarX === "on";
          var showY = scrollbarY === "on"; // Check auto values afterwards with already
          // corrected client dimensions

          if (scrollSize.width > (showX ? paneSize.width : innerSize.width) && scrollbarX === "auto") {
            showX = true;
          }

          if (scrollSize.height > (showX ? paneSize.height : innerSize.height) && scrollbarY === "auto") {
            showY = true;
          }
        } // Update scrollbars


        if (showX) {
          var barX = this.getChildControl("scrollbar-x");
          barX.show();
          barX.setMaximum(Math.max(0, scrollSize.width - paneSize.width));
          barX.setKnobFactor(scrollSize.width === 0 ? 0 : paneSize.width / scrollSize.width);
        } else {
          this._excludeChildControl("scrollbar-x");
        }

        if (showY) {
          var barY = this.getChildControl("scrollbar-y");
          barY.show();
          barY.setMaximum(Math.max(0, scrollSize.height - paneSize.height));
          barY.setKnobFactor(scrollSize.height === 0 ? 0 : paneSize.height / scrollSize.height);
        } else {
          this._excludeChildControl("scrollbar-y");
        }
      }
    }
  });
  qx.ui.core.scroll.AbstractScrollArea.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
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
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * This mixin defines the <code>contentPadding</code> property, which is used
   * by widgets like the window or group box, which must have a property, which
   * defines the padding of an inner pane.
   *
   * The including class must implement the method
   * <code>_getContentPaddingTarget</code>, which must return the widget on which
   * the padding should be applied.
   */
  qx.Mixin.define("qx.ui.core.MContentPadding", {
    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /** Top padding of the content pane */
      contentPaddingTop: {
        check: "Integer",
        init: 0,
        apply: "_applyContentPadding",
        themeable: true
      },

      /** Right padding of the content pane */
      contentPaddingRight: {
        check: "Integer",
        init: 0,
        apply: "_applyContentPadding",
        themeable: true
      },

      /** Bottom padding of the content pane */
      contentPaddingBottom: {
        check: "Integer",
        init: 0,
        apply: "_applyContentPadding",
        themeable: true
      },

      /** Left padding of the content pane */
      contentPaddingLeft: {
        check: "Integer",
        init: 0,
        apply: "_applyContentPadding",
        themeable: true
      },

      /**
       * The 'contentPadding' property is a shorthand property for setting 'contentPaddingTop',
       * 'contentPaddingRight', 'contentPaddingBottom' and 'contentPaddingLeft'
       * at the same time.
       *
       * If four values are specified they apply to top, right, bottom and left respectively.
       * If there is only one value, it applies to all sides, if there are two or three,
       * the missing values are taken from the opposite side.
       */
      contentPadding: {
        group: ["contentPaddingTop", "contentPaddingRight", "contentPaddingBottom", "contentPaddingLeft"],
        mode: "shorthand",
        themeable: true
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    /* eslint-disable @qooxdoo/qx/no-refs-in-members */
    members: {
      /**
       * @type {Map} Maps property names of content padding to the setter of the padding
       *
       * @lint ignoreReferenceField(__contentPaddingSetter)
       */
      __contentPaddingSetter__P_173_0: {
        contentPaddingTop: "setPaddingTop",
        contentPaddingRight: "setPaddingRight",
        contentPaddingBottom: "setPaddingBottom",
        contentPaddingLeft: "setPaddingLeft"
      },

      /**
       * @type {Map} Maps property names of content padding to the themed setter of the padding
       *
       * @lint ignoreReferenceField(__contentPaddingThemedSetter)
       */
      __contentPaddingThemedSetter__P_173_1: {
        contentPaddingTop: "setThemedPaddingTop",
        contentPaddingRight: "setThemedPaddingRight",
        contentPaddingBottom: "setThemedPaddingBottom",
        contentPaddingLeft: "setThemedPaddingLeft"
      },

      /**
       * @type {Map} Maps property names of content padding to the resetter of the padding
       *
       * @lint ignoreReferenceField(__contentPaddingResetter)
       */
      __contentPaddingResetter__P_173_2: {
        contentPaddingTop: "resetPaddingTop",
        contentPaddingRight: "resetPaddingRight",
        contentPaddingBottom: "resetPaddingBottom",
        contentPaddingLeft: "resetPaddingLeft"
      },
      // property apply
      _applyContentPadding: function _applyContentPadding(value, old, name, variant) {
        var target = this._getContentPaddingTarget();

        if (value == null) {
          var resetter = this.__contentPaddingResetter__P_173_2[name];
          target[resetter]();
        } else {
          // forward the themed sates if case the apply was invoked by a theme
          if (variant == "setThemed" || variant == "resetThemed") {
            var setter = this.__contentPaddingThemedSetter__P_173_1[name];
            target[setter](value);
          } else {
            var setter = this.__contentPaddingSetter__P_173_0[name];
            target[setter](value);
          }
        }
      }
    }
  });
  qx.ui.core.MContentPadding.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.scroll.AbstractScrollArea": {
        "construct": true,
        "require": true
      },
      "qx.ui.core.MContentPadding": {
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
       * Sebastian Werner (wpbasti)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * Container, which allows vertical and horizontal scrolling if the contents is
   * larger than the container.
   *
   * Note that this class can only have one child widget. This container has a
   * fixed layout, which cannot be changed.
   *
   * *Example*
   *
   * Here is a little example of how to use the widget.
   *
   * <pre class='javascript'>
   *   // create scroll container
   *   var scroll = new qx.ui.container.Scroll().set({
   *     width: 300,
   *     height: 200
   *   });
   *
   *   // add a widget which is larger than the container
   *   scroll.add(new qx.ui.core.Widget().set({
   *     width: 600,
   *     minWidth: 600,
   *     height: 400,
   *     minHeight: 400
   *   }));
   *
   *   this.getRoot().add(scroll);
   * </pre>
   *
   * This example creates a scroll container and adds a widget, which is larger
   * than the container. This will cause the container to display vertical
   * and horizontal toolbars.
   *
   * *External Documentation*
   *
   * <a href='http://qooxdoo.org/docs/#desktop/widget/scroll.md' target='_blank'>
   * Documentation of this widget in the qooxdoo manual.</a>
   */
  qx.Class.define("qx.ui.container.Scroll", {
    extend: qx.ui.core.scroll.AbstractScrollArea,
    include: [qx.ui.core.MContentPadding],

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param content {qx.ui.core.LayoutItem?null} The content widget of the scroll
     *    container.
     */
    construct: function construct(content) {
      qx.ui.core.scroll.AbstractScrollArea.constructor.call(this);

      if (content) {
        this.add(content);
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      /**
       * Sets the content of the scroll container. Scroll containers
       * may only have one child, so it always replaces the current
       * child with the given one.
       *
       * @param widget {qx.ui.core.Widget} Widget to insert
       */
      add: function add(widget) {
        this.getChildControl("pane").add(widget);
      },

      /**
       * Returns the content of the scroll area.
       *
       * @param widget {qx.ui.core.Widget} Widget to remove
       */
      remove: function remove(widget) {
        this.getChildControl("pane").remove(widget);
      },

      /**
       * Returns the content of the scroll container.
       *
       * Scroll containers may only have one child. This
       * method returns an array containing the child or an empty array.
       *
       * @return {Object[]} The child array
       */
      getChildren: function getChildren() {
        return this.getChildControl("pane").getChildren();
      },

      /**
       * Returns the element, to which the content padding should be applied.
       *
       * @return {qx.ui.core.Widget} The content padding target.
       */
      _getContentPaddingTarget: function _getContentPaddingTarget() {
        return this.getChildControl("pane");
      }
    }
  });
  qx.ui.container.Scroll.$$dbClassInfo = $$dbClassInfo;
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
      "qx.util.ResourceManager": {},
      "qx.bom.client.Engine": {
        "require": true
      },
      "qx.bom.client.Browser": {
        "require": true
      },
      "qx.event.Timer": {},
      "qx.lang.Array": {},
      "qx.bom.client.OperatingSystem": {
        "require": true
      },
      "qx.bom.Stylesheet": {},
      "qx.bom.webfonts.Validator": {}
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
        "browser.name": {
          "className": "qx.bom.client.Browser"
        },
        "browser.version": {
          "className": "qx.bom.client.Browser"
        },
        "os.name": {
          "className": "qx.bom.client.OperatingSystem"
        },
        "os.version": {
          "className": "qx.bom.client.OperatingSystem"
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
  
  ************************************************************************ */

  /**
   * Manages font-face definitions, making sure that each rule is only applied
   * once. It supports adding fonts of the same family but with different style
   * and weight. For instance, the following declaration uses 4 different source
   * files and combine them in a single font family.
   *
   * <pre class='javascript'>
   *   sources: [
   *     {
   *       family: "Sansation",
   *       source: [
   *         "fonts/Sansation-Regular.ttf"
   *       ]
   *     },
   *     {
   *       family: "Sansation",
   *       fontWeight: "bold",
   *       source: [
   *         "fonts/Sansation-Bold.ttf",
   *       ]
   *     },
   *     {
   *       family: "Sansation",
   *       fontStyle: "italic",
   *       source: [
   *         "fonts/Sansation-Italic.ttf",
   *       ]
   *     },
   *     {
   *       family: "Sansation",
   *       fontWeight: "bold",
   *       fontStyle: "italic",
   *       source: [
   *         "fonts/Sansation-BoldItalic.ttf",
   *       ]
   *     }
   *   ]
   * </pre>
   *
   * This class does not need to be disposed, except when you want to abort the loading
   * and validation process.
   */
  qx.Class.define("qx.bom.webfonts.Manager", {
    extend: qx.core.Object,
    type: "singleton",

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      this.__createdStyles__P_126_0 = [];
      this.__validators__P_126_1 = {};
      this.__queue__P_126_2 = [];
      this.__preferredFormats__P_126_3 = this.getPreferredFormats();
    },

    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */
    statics: {
      /**
       * List of known font definition formats (i.e. file extensions). Used to
       * identify the type of each font file configured for a web font.
       */
      FONT_FORMATS: ["eot", "woff2", "woff", "ttf", "svg"],

      /**
       * Timeout (in ms) to wait before deciding that a web font was not loaded.
       */
      VALIDATION_TIMEOUT: 5000
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __createdStyles__P_126_0: null,
      __styleSheet__P_126_4: null,
      __validators__P_126_1: null,
      __preferredFormats__P_126_3: null,
      __queue__P_126_2: null,
      __queueInterval__P_126_5: null,

      /*
      ---------------------------------------------------------------------------
        PUBLIC API
      ---------------------------------------------------------------------------
      */

      /**
       * Adds the necessary font-face rule for a web font to the document. Also
       * creates a web font Validator ({@link qx.bom.webfonts.Validator}) that
       * checks if the webFont was applied correctly.
       *
       * @param familyName {String} Name of the web font
       * @param sourcesList {Object} List of source URLs along with their style
       * (e.g. fontStyle: "italic") and weight (e.g. fontWeight: "bold").
       * For maximum compatibility, this should include EOT, WOFF and TTF versions
       * of the font.
       * @param callback {Function?} Optional event listener callback that will be
       * executed once the validator has determined whether the webFont was
       * applied correctly.
       * See {@link qx.bom.webfonts.Validator#changeStatus}
       * @param context {Object?} Optional context for the callback function
       */
      require: function require(familyName, sourcesList, callback, context) {
        var sourceUrls = sourcesList.source;
        var comparisonString = sourcesList.comparisonString;
        var version = sourcesList.version;
        var fontWeight = sourcesList.fontWeight;
        var fontStyle = sourcesList.fontStyle;
        var sources = [];

        for (var i = 0, l = sourceUrls.length; i < l; i++) {
          var split = sourceUrls[i].split("#");
          var src = qx.util.ResourceManager.getInstance().toUri(split[0]);

          if (split.length > 1) {
            src = src + "#" + split[1];
          }

          sources.push(src);
        } // old IEs need a break in between adding @font-face rules


        if (qx.core.Environment.get("engine.name") == "mshtml" && (parseInt(qx.core.Environment.get("engine.version")) < 9 || qx.core.Environment.get("browser.documentmode") < 9)) {
          if (!this.__queueInterval__P_126_5) {
            this.__queueInterval__P_126_5 = new qx.event.Timer(100);

            this.__queueInterval__P_126_5.addListener("interval", this.__flushQueue__P_126_6, this);
          }

          if (!this.__queueInterval__P_126_5.isEnabled()) {
            this.__queueInterval__P_126_5.start();
          }

          this.__queue__P_126_2.push([familyName, sources, fontWeight, fontStyle, comparisonString, version, callback, context]);
        } else {
          this.__require__P_126_7(familyName, sources, fontWeight, fontStyle, comparisonString, version, callback, context);
        }
      },

      /**
       * Removes a font's font-face definition from the style sheet. This means
       * the font will no longer be available and any elements using it will
       * fall back to the their regular font-families.
       *
       * @param familyName {String} font-family name
       * @param fontWeight {String} the font-weight.
       * @param fontStyle {String} the font-style.
       */
      remove: function remove(familyName, fontWeight, fontStyle) {
        var fontLookupKey = this.__createFontLookupKey__P_126_8(familyName, fontWeight, fontStyle);

        var index = null;

        for (var i = 0, l = this.__createdStyles__P_126_0.length; i < l; i++) {
          if (this.__createdStyles__P_126_0[i] == fontLookupKey) {
            index = i;

            this.__removeRule__P_126_9(familyName, fontWeight, fontStyle);

            break;
          }
        }

        if (index !== null) {
          qx.lang.Array.removeAt(this.__createdStyles__P_126_0, index);
        }

        if (fontLookupKey in this.__validators__P_126_1) {
          this.__validators__P_126_1[fontLookupKey].dispose();

          delete this.__validators__P_126_1[fontLookupKey];
        }
      },

      /**
       * Returns the preferred font format(s) for the currently used browser. Some
       * browsers support multiple formats, e.g. WOFF and TTF or WOFF and EOT. In
       * those cases, WOFF is considered the preferred format.
       *
       * @return {String[]} List of supported font formats ordered by preference
       * or empty Array if none could be determined
       */
      getPreferredFormats: function getPreferredFormats() {
        var preferredFormats = [];
        var browser = qx.core.Environment.get("browser.name");
        var browserVersion = qx.core.Environment.get("browser.version");
        var os = qx.core.Environment.get("os.name");
        var osVersion = qx.core.Environment.get("os.version");

        if (browser == "edge" && browserVersion >= 14 || browser == "firefox" && browserVersion >= 69 || browser == "chrome" && browserVersion >= 36) {
          preferredFormats.push("woff2");
        }

        if (browser == "ie" && qx.core.Environment.get("browser.documentmode") >= 9 || browser == "edge" && browserVersion >= 12 || browser == "firefox" && browserVersion >= 3.6 || browser == "chrome" && browserVersion >= 6) {
          preferredFormats.push("woff");
        }

        if (browser == "edge" && browserVersion >= 12 || browser == "opera" && browserVersion >= 10 || browser == "safari" && browserVersion >= 3.1 || browser == "firefox" && browserVersion >= 3.5 || browser == "chrome" && browserVersion >= 4 || browser == "mobile safari" && os == "ios" && osVersion >= 4.2) {
          preferredFormats.push("ttf");
        }

        if (browser == "ie" && browserVersion >= 4) {
          preferredFormats.push("eot");
        }

        if (browser == "mobileSafari" && os == "ios" && osVersion >= 4.1) {
          preferredFormats.push("svg");
        }

        return preferredFormats;
      },

      /**
       * Removes the styleSheet element used for all web font definitions from the
       * document. This means all web fonts declared by the manager will no longer
       * be available and elements using them will fall back to their regular
       * font-families
       */
      removeStyleSheet: function removeStyleSheet() {
        this.__createdStyles__P_126_0 = [];

        if (this.__styleSheet__P_126_4) {
          qx.bom.Stylesheet.removeSheet(this.__styleSheet__P_126_4);
        }

        this.__styleSheet__P_126_4 = null;
      },

      /*
      ---------------------------------------------------------------------------
        PRIVATE API
      ---------------------------------------------------------------------------
      */

      /**
       * Creates a lookup key to index the created fonts.
       * @param familyName {String} font-family name
       * @param fontWeight {String} the font-weight.
       * @param fontStyle {String} the font-style.
       * @return {string} the font lookup key
       */
      __createFontLookupKey__P_126_8: function __createFontLookupKey__P_126_8(familyName, fontWeight, fontStyle) {
        var lookupKey = familyName + "_" + (fontWeight ? fontWeight : "normal") + "_" + (fontStyle ? fontStyle : "normal");
        return lookupKey;
      },

      /**
       * Does the actual work of adding stylesheet rules and triggering font
       * validation
       *
       * @param familyName {String} Name of the web font
       * @param sources {String[]} List of source URLs. For maximum compatibility,
       * this should include EOT, WOFF and TTF versions of the font.
       * @param fontWeight {String} the web font should be registered using a
       * fontWeight font weight.
       * @param fontStyle {String} the web font should be registered using an
       * fontStyle font style.
       * @param comparisonString {String} String to check whether the font has loaded or not
       * @param version {String?} Optional version that is appended to the font URL to be able to override caching
       * @param callback {Function?} Optional event listener callback that will be
       * executed once the validator has determined whether the webFont was
       * applied correctly.
       * @param context {Object?} Optional context for the callback function
       */
      __require__P_126_7: function __require__P_126_7(familyName, sources, fontWeight, fontStyle, comparisonString, version, callback, context) {
        var fontLookupKey = this.__createFontLookupKey__P_126_8(familyName, fontWeight, fontStyle);

        if (!this.__createdStyles__P_126_0.includes(fontLookupKey)) {
          var sourcesMap = this.__getSourcesMap__P_126_10(sources);

          var rule = this.__getRule__P_126_11(familyName, fontWeight, fontStyle, sourcesMap, version);

          if (!rule) {
            throw new Error("Couldn't create @font-face rule for WebFont " + familyName + "!");
          }

          if (!this.__styleSheet__P_126_4) {
            this.__styleSheet__P_126_4 = qx.bom.Stylesheet.createElement();
          }

          try {
            this.__addRule__P_126_12(rule);
          } catch (ex) {
            {
              this.warn("Error while adding @font-face rule:", ex.message);
              return;
            }
          }

          this.__createdStyles__P_126_0.push(fontLookupKey);
        }

        if (!this.__validators__P_126_1[fontLookupKey]) {
          this.__validators__P_126_1[fontLookupKey] = new qx.bom.webfonts.Validator(familyName, comparisonString, fontWeight, fontStyle);

          this.__validators__P_126_1[fontLookupKey].setTimeout(qx.bom.webfonts.Manager.VALIDATION_TIMEOUT);

          this.__validators__P_126_1[fontLookupKey].addListenerOnce("changeStatus", this.__onFontChangeStatus__P_126_13, this);
        }

        if (callback) {
          var cbContext = context || window;

          this.__validators__P_126_1[fontLookupKey].addListenerOnce("changeStatus", callback, cbContext);
        }

        this.__validators__P_126_1[fontLookupKey].validate();
      },

      /**
       * Processes the next item in the queue
       */
      __flushQueue__P_126_6: function __flushQueue__P_126_6() {
        if (this.__queue__P_126_2.length == 0) {
          this.__queueInterval__P_126_5.stop();

          return;
        }

        var next = this.__queue__P_126_2.shift();

        this.__require__P_126_7.apply(this, next);
      },

      /**
       * Removes the font-face declaration if a font could not be validated
       *
       * @param ev {qx.event.type.Data} qx.bom.webfonts.Validator#changeStatus
       */
      __onFontChangeStatus__P_126_13: function __onFontChangeStatus__P_126_13(ev) {
        var result = ev.getData();

        if (result.valid === false) {
          qx.event.Timer.once(function () {
            this.remove(result.family);
          }, this, 250);
        }
      },

      /**
       * Uses a naive regExp match to determine the format of each defined source
       * file for a webFont. Returns a map with the format names as keys and the
       * corresponding source URLs as values.
       *
       * @param sources {String[]} Array of source URLs
       * @return {Map} Map of formats and URLs
       */
      __getSourcesMap__P_126_10: function __getSourcesMap__P_126_10(sources) {
        var formats = qx.bom.webfonts.Manager.FONT_FORMATS;
        var sourcesMap = {};
        var reg = new RegExp(".(" + formats.join("|") + ")");

        for (var i = 0, l = sources.length; i < l; i++) {
          var match = reg.exec(sources[i]);

          if (match) {
            var type = match[1];
            sourcesMap[type] = sources[i];
          }
        }

        return sourcesMap;
      },

      /**
       * Assembles the body of a font-face rule for a single webFont.
       *
       * @param familyName {String} Font-family name
       * @param fontWeight {String} the web font should be registered using a
       * fontWeight font weight.
       * @param fontStyle {String} the web font should be registered using an
       * fontStyle font style.
       * @param sourcesMap {Map} Map of font formats and sources
       * @param version {String?} Optional version to be appended to the URL
       * @return {String} The computed CSS rule
       */
      __getRule__P_126_11: function __getRule__P_126_11(familyName, fontWeight, fontStyle, sourcesMap, version) {
        var rules = [];
        var formatList = this.__preferredFormats__P_126_3.length > 0 ? this.__preferredFormats__P_126_3 : qx.bom.webfonts.Manager.FONT_FORMATS;

        for (var i = 0, l = formatList.length; i < l; i++) {
          var format = formatList[i];

          if (sourcesMap[format]) {
            rules.push(this.__getSourceForFormat__P_126_14(format, sourcesMap[format], version));
          }
        }

        var rule = "src: " + rules.join(",\n") + ";";
        rule = "font-family: " + familyName + ";\n" + rule;
        rule = rule + "\nfont-style: " + (fontStyle ? fontStyle : "normal") + ";";
        rule = rule + "\nfont-weight: " + (fontWeight ? fontWeight : "normal") + ";";
        return rule;
      },

      /**
       * Returns the full src value for a given font URL depending on the type
       * @param format {String} The font format, one of eot, woff2, woff, ttf, svg
       * @param url {String} The font file's URL
       * @param version {String?} Optional version to be appended to the URL
       * @return {String} The src directive
       */
      __getSourceForFormat__P_126_14: function __getSourceForFormat__P_126_14(format, url, version) {
        if (version) {
          url += "?" + version;
        }

        switch (format) {
          case "eot":
            return "url('" + url + "');" + "src: url('" + url + "?#iefix') format('embedded-opentype')";

          case "woff2":
            return "url('" + url + "') format('woff2')";

          case "woff":
            return "url('" + url + "') format('woff')";

          case "ttf":
            return "url('" + url + "') format('truetype')";

          case "svg":
            return "url('" + url + "') format('svg')";

          default:
            return null;
        }
      },

      /**
       * Adds a font-face rule to the document
       *
       * @param rule {String} The body of the CSS rule
       */
      __addRule__P_126_12: function __addRule__P_126_12(rule) {
        var completeRule = "@font-face {" + rule + "}\n";

        if (qx.core.Environment.get("browser.name") == "ie" && qx.core.Environment.get("browser.documentmode") < 9) {
          var cssText = this.__fixCssText__P_126_15(this.__styleSheet__P_126_4.cssText);

          cssText += completeRule;
          this.__styleSheet__P_126_4.cssText = cssText;
        } else {
          this.__styleSheet__P_126_4.insertRule(completeRule, this.__styleSheet__P_126_4.cssRules.length);
        }
      },

      /**
       * Removes the font-face declaration for the given font-family from the
       * stylesheet
       *
       * @param familyName {String} The font-family name
       * @param fontWeight {String} fontWeight font-weight.
       * @param fontStyle {String} fontStyle font-style.
       */
      __removeRule__P_126_9: function __removeRule__P_126_9(familyName, fontWeight, fontStyle) {
        // In IE and edge even if the rule was added with font-style first
        // and font-weight second, it is not guaranteed that the attributes
        // remain in that order. Therefore we check for both version,
        // style first, weight second and weight first, style second.
        // Without this fix the rule isn't found and removed reliable.
        var regtext = "@font-face.*?" + familyName + "(.*font-style: *" + (fontStyle ? fontStyle : "normal") + ".*font-weight: *" + (fontWeight ? fontWeight : "normal") + ")|" + "(.*font-weight: *" + (fontWeight ? fontWeight : "normal") + ".*font-style: *" + (fontStyle ? fontStyle : "normal") + ")";
        var reg = new RegExp(regtext, "m");

        for (var i = 0, l = document.styleSheets.length; i < l; i++) {
          var sheet = document.styleSheets[i];

          if (sheet.cssText) {
            var cssText = sheet.cssText.replace(/\n/g, "").replace(/\r/g, "");
            cssText = this.__fixCssText__P_126_15(cssText);

            if (reg.exec(cssText)) {
              cssText = cssText.replace(reg, "");
            }

            sheet.cssText = cssText;
          } else if (sheet.cssRules) {
            for (var j = 0, m = sheet.cssRules.length; j < m; j++) {
              var cssText = sheet.cssRules[j].cssText.replace(/\n/g, "").replace(/\r/g, "");

              if (reg.exec(cssText)) {
                this.__styleSheet__P_126_4.deleteRule(j);

                return;
              }
            }
          }
        }
      },

      /**
       * IE 6 and 7 omit the trailing quote after the format name when
       * querying cssText. This needs to be fixed before cssText is replaced
       * or all rules will be invalid and no web fonts will work any more.
       *
       * @param cssText {String} CSS text
       * @return {String} Fixed CSS text
       */
      __fixCssText__P_126_15: function __fixCssText__P_126_15(cssText) {
        return cssText.replace("'eot)", "'eot')").replace("('embedded-opentype)", "('embedded-opentype')");
      }
    },

    /*
    *****************************************************************************
      DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      if (this.__queueInterval__P_126_5) {
        this.__queueInterval__P_126_5.stop();

        this.__queueInterval__P_126_5.dispose();
      }

      delete this.__createdStyles__P_126_0;
      this.removeStyleSheet();

      for (var prop in this.__validators__P_126_1) {
        this.__validators__P_126_1[prop].dispose();
      }

      qx.bom.webfonts.Validator.removeDefaultHelperElements();
    }
  });
  qx.bom.webfonts.Manager.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
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
       2009 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Fabian Jakobs (fjakobs)
       * Christian Hagendorn (chris_schmidt)
  
  ************************************************************************ */

  /**
   * Abstract class to compute the position of an object on one axis.
   */
  qx.Bootstrap.define("qx.util.placement.AbstractAxis", {
    extend: Object,
    statics: {
      /**
       * Computes the start of the object on the axis
       *
       * @param size {Integer} Size of the object to align
       * @param target {Map} Location of the object to align the object to. This map
       *   should have the keys <code>start</code> and <code>end</code>.
       * @param offsets {Map} Map with all offsets on each side.
       *   Comes with the keys <code>start</code> and <code>end</code>.
       * @param areaSize {Integer} Size of the axis.
       * @param position {String} Alignment of the object on the target. Valid values are
       *   <ul>
       *   <li><code>edge-start</code> The object is placed before the target</li>
       *   <li><code>edge-end</code> The object is placed after the target</li>
       *   <li><code>align-start</code>The start of the object is aligned with the start of the target</li>
       *   <li><code>align-center</code>The center of the object is aligned with the center of the target</li>
       *   <li><code>align-end</code>The end of the object is aligned with the end of the object</li>
       *   </ul>
       * @return {Integer} The computed start position of the object.
       * @abstract
       */
      computeStart: function computeStart(size, target, offsets, areaSize, position) {
        throw new Error("abstract method call!");
      },

      /**
       * Computes the start of the object by taking only the attachment and
       * alignment into account. The object by be not fully visible.
       *
       * @param size {Integer} Size of the object to align
       * @param target {Map} Location of the object to align the object to. This map
       *   should have the keys <code>start</code> and <code>end</code>.
       * @param offsets {Map} Map with all offsets on each side.
       *   Comes with the keys <code>start</code> and <code>end</code>.
       * @param position {String} Accepts the same values as the <code> position</code>
       *   argument of {@link #computeStart}.
       * @return {Integer} The computed start position of the object.
       */
      _moveToEdgeAndAlign: function _moveToEdgeAndAlign(size, target, offsets, position) {
        switch (position) {
          case "edge-start":
            return target.start - offsets.end - size;

          case "edge-end":
            return target.end + offsets.start;

          case "align-start":
            return target.start + offsets.start;

          case "align-center":
            return target.start + parseInt((target.end - target.start - size) / 2, 10) + offsets.start;

          case "align-end":
            return target.end - offsets.end - size;
        }
      },

      /**
       * Whether the object specified by <code>start</code> and <code>size</code>
       * is completely inside of the axis' range..
       *
       * @param start {Integer} Computed start position of the object
       * @param size {Integer} Size of the object
       * @param areaSize {Integer} The size of the axis
       * @return {Boolean} Whether the object is inside of the axis' range
       */
      _isInRange: function _isInRange(start, size, areaSize) {
        return start >= 0 && start + size <= areaSize;
      }
    }
  });
  qx.util.placement.AbstractAxis.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.util.placement.AbstractAxis": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2009 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Fabian Jakobs (fjakobs)
       * Christian Hagendorn (chris_schmidt)
  
  ************************************************************************ */

  /**
   * Places the object directly at the specified position. It is not moved if
   * parts of the object are outside of the axis' range.
   */
  qx.Bootstrap.define("qx.util.placement.DirectAxis", {
    statics: {
      /**
       * Computes the start of the object by taking only the attachment and
       * alignment into account. The object by be not fully visible.
       *
       * @param size {Integer} Size of the object to align
       * @param target {Map} Location of the object to align the object to. This map
       *   should have the keys <code>start</code> and <code>end</code>.
       * @param offsets {Map} Map with all offsets on each side.
       *   Comes with the keys <code>start</code> and <code>end</code>.
       * @param position {String} Accepts the same values as the <code> position</code>
       *   argument of {@link #computeStart}.
       * @return {Integer} The computed start position of the object.
       */
      _moveToEdgeAndAlign: qx.util.placement.AbstractAxis._moveToEdgeAndAlign,

      /**
       * Computes the start of the object on the axis
       *
       * @param size {Integer} Size of the object to align
       * @param target {Map} Location of the object to align the object to. This map
       *   should have the keys <code>start</code> and <code>end</code>.
       * @param offsets {Map} Map with all offsets on each side.
       *   Comes with the keys <code>start</code> and <code>end</code>.
       * @param areaSize {Integer} Size of the axis.
       * @param position {String} Alignment of the object on the target. Valid values are
       *   <ul>
       *   <li><code>edge-start</code> The object is placed before the target</li>
       *   <li><code>edge-end</code> The object is placed after the target</li>
       *   <li><code>align-start</code>The start of the object is aligned with the start of the target</li>
       *   <li><code>align-center</code>The center of the object is aligned with the center of the target</li>
       *   <li><code>align-end</code>The end of the object is aligned with the end of the object</li>
       *   </ul>
       * @return {Integer} The computed start position of the object.
       */
      computeStart: function computeStart(size, target, offsets, areaSize, position) {
        return this._moveToEdgeAndAlign(size, target, offsets, position);
      }
    }
  });
  qx.util.placement.DirectAxis.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.util.placement.AbstractAxis": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2009 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Fabian Jakobs (fjakobs)
       * Christian Hagendorn (chris_schmidt)
  
  ************************************************************************ */

  /**
   * Places the object to the target. If parts of the object are outside of the
   * range this class places the object at the best "edge", "alignment"
   * combination so that the overlap between object and range is maximized.
   */
  qx.Bootstrap.define("qx.util.placement.KeepAlignAxis", {
    statics: {
      /**
       * Computes the start of the object by taking only the attachment and
       * alignment into account. The object by be not fully visible.
       *
       * @param size {Integer} Size of the object to align
       * @param target {Map} Location of the object to align the object to. This map
       *   should have the keys <code>start</code> and <code>end</code>.
       * @param offsets {Map} Map with all offsets on each side.
       *   Comes with the keys <code>start</code> and <code>end</code>.
       * @param position {String} Accepts the same values as the <code> position</code>
       *   argument of {@link #computeStart}.
       * @return {Integer} The computed start position of the object.
       */
      _moveToEdgeAndAlign: qx.util.placement.AbstractAxis._moveToEdgeAndAlign,

      /**
       * Whether the object specified by <code>start</code> and <code>size</code>
       * is completely inside of the axis' range..
       *
       * @param start {Integer} Computed start position of the object
       * @param size {Integer} Size of the object
       * @param areaSize {Integer} The size of the axis
       * @return {Boolean} Whether the object is inside of the axis' range
       */
      _isInRange: qx.util.placement.AbstractAxis._isInRange,

      /**
       * Computes the start of the object on the axis
       *
       * @param size {Integer} Size of the object to align
       * @param target {Map} Location of the object to align the object to. This map
       *   should have the keys <code>start</code> and <code>end</code>.
       * @param offsets {Map} Map with all offsets on each side.
       *   Comes with the keys <code>start</code> and <code>end</code>.
       * @param areaSize {Integer} Size of the axis.
       * @param position {String} Alignment of the object on the target. Valid values are
       *   <ul>
       *   <li><code>edge-start</code> The object is placed before the target</li>
       *   <li><code>edge-end</code> The object is placed after the target</li>
       *   <li><code>align-start</code>The start of the object is aligned with the start of the target</li>
       *   <li><code>align-center</code>The center of the object is aligned with the center of the target</li>
       *   <li><code>align-end</code>The end of the object is aligned with the end of the object</li>
       *   </ul>
       * @return {Integer} The computed start position of the object.
       */
      computeStart: function computeStart(size, target, offsets, areaSize, position) {
        var start = this._moveToEdgeAndAlign(size, target, offsets, position);

        var range1End, range2Start;

        if (this._isInRange(start, size, areaSize)) {
          return start;
        }

        if (position == "edge-start" || position == "edge-end") {
          range1End = target.start - offsets.end;
          range2Start = target.end + offsets.start;
        } else {
          range1End = target.end - offsets.end;
          range2Start = target.start + offsets.start;
        }

        if (range1End > areaSize - range2Start) {
          start = Math.max(0, range1End - size);
        } else {
          start = range2Start;
        }

        return start;
      }
    }
  });
  qx.util.placement.KeepAlignAxis.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.util.placement.AbstractAxis": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2009 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Fabian Jakobs (fjakobs)
       * Christian Hagendorn (chris_schmidt)
  
  ************************************************************************ */

  /**
   * Places the object according to the target. If parts of the object are outside
   * of the axis' range the object's start is adjusted so that the overlap between
   * the object and the axis is maximized.
   */
  qx.Bootstrap.define("qx.util.placement.BestFitAxis", {
    statics: {
      /**
       * Whether the object specified by <code>start</code> and <code>size</code>
       * is completely inside of the axis' range..
       *
       * @param start {Integer} Computed start position of the object
       * @param size {Integer} Size of the object
       * @param areaSize {Integer} The size of the axis
       * @return {Boolean} Whether the object is inside of the axis' range
       */
      _isInRange: qx.util.placement.AbstractAxis._isInRange,

      /**
       * Computes the start of the object by taking only the attachment and
       * alignment into account. The object by be not fully visible.
       *
       * @param size {Integer} Size of the object to align
       * @param target {Map} Location of the object to align the object to. This map
       *   should have the keys <code>start</code> and <code>end</code>.
       * @param offsets {Map} Map with all offsets on each side.
       *   Comes with the keys <code>start</code> and <code>end</code>.
       * @param position {String} Accepts the same values as the <code> position</code>
       *   argument of {@link #computeStart}.
       * @return {Integer} The computed start position of the object.
       */
      _moveToEdgeAndAlign: qx.util.placement.AbstractAxis._moveToEdgeAndAlign,

      /**
       * Computes the start of the object on the axis
       *
       * @param size {Integer} Size of the object to align
       * @param target {Map} Location of the object to align the object to. This map
       *   should have the keys <code>start</code> and <code>end</code>.
       * @param offsets {Map} Map with all offsets on each side.
       *   Comes with the keys <code>start</code> and <code>end</code>.
       * @param areaSize {Integer} Size of the axis.
       * @param position {String} Alignment of the object on the target. Valid values are
       *   <ul>
       *   <li><code>edge-start</code> The object is placed before the target</li>
       *   <li><code>edge-end</code> The object is placed after the target</li>
       *   <li><code>align-start</code>The start of the object is aligned with the start of the target</li>
       *   <li><code>align-center</code>The center of the object is aligned with the center of the target</li>
       *   <li><code>align-end</code>The end of the object is aligned with the end of the object</li>
       *   </ul>
       * @return {Integer} The computed start position of the object.
       */
      computeStart: function computeStart(size, target, offsets, areaSize, position) {
        var start = this._moveToEdgeAndAlign(size, target, offsets, position);

        if (this._isInRange(start, size, areaSize)) {
          return start;
        }

        if (start < 0) {
          start = Math.min(0, areaSize - size);
        }

        if (start + size > areaSize) {
          start = Math.max(0, areaSize - size);
        }

        return start;
      }
    }
  });
  qx.util.placement.BestFitAxis.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "construct": true,
        "require": true
      },
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.event.Emitter": {
        "require": true
      },
      "qx.bom.client.CssAnimation": {
        "construct": true,
        "require": true
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "css.animation": {
          "construct": true,
          "className": "qx.bom.client.CssAnimation"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (wittemann)
  
  ************************************************************************ */

  /**
   * This is a simple handle, which will be returned when an animation is
   * started using the {@link qx.bom.element.Animation#animate} method. It
   * basically controls the animation.
   *
   * @ignore(qx.bom.element.AnimationJs)
   */
  qx.Bootstrap.define("qx.bom.element.AnimationHandle", {
    extend: qx.event.Emitter,
    construct: function construct() {
      var css = qx.core.Environment.get("css.animation");
      this.__playState__P_158_0 = css && css["play-state"];
      this.__playing__P_158_1 = true;
      this.addListenerOnce("end", this.__setEnded__P_158_2, this);
    },
    events: {
      /** Fired when the animation started via {@link qx.bom.element.Animation}. */
      start: "Element",

      /**
       * Fired when the animation started via {@link qx.bom.element.Animation} has
       * ended.
       */
      end: "Element",

      /** Fired on every iteration of the animation. */
      iteration: "Element"
    },
    members: {
      __playState__P_158_0: null,
      __playing__P_158_1: false,
      __ended__P_158_3: false,

      /**
       * Accessor of the playing state.
       * @return {Boolean} <code>true</code>, if the animations is playing.
       */
      isPlaying: function isPlaying() {
        return this.__playing__P_158_1;
      },

      /**
       * Accessor of the ended state.
       * @return {Boolean} <code>true</code>, if the animations has ended.
       */
      isEnded: function isEnded() {
        return this.__ended__P_158_3;
      },

      /**
       * Accessor of the paused state.
       * @return {Boolean} <code>true</code>, if the animations is paused.
       */
      isPaused: function isPaused() {
        return this.el.style[this.__playState__P_158_0] == "paused";
      },

      /**
       * Pauses the animation, if running. If not running, it will be ignored.
       */
      pause: function pause() {
        if (this.el) {
          this.el.style[this.__playState__P_158_0] = "paused";
          this.el.$$animation.__playing__P_158_1 = false; // in case the animation is based on JS

          if (this.animationId && qx.bom.element.AnimationJs) {
            qx.bom.element.AnimationJs.pause(this);
          }
        }
      },

      /**
       * Resumes an animation. This does not start the animation once it has ended.
       * In this case you need to start a new Animation.
       */
      play: function play() {
        if (this.el) {
          this.el.style[this.__playState__P_158_0] = "running";
          this.el.$$animation.__playing__P_158_1 = true; // in case the animation is based on JS

          if (this.i != undefined && qx.bom.element.AnimationJs) {
            qx.bom.element.AnimationJs.play(this);
          }
        }
      },

      /**
       * Stops the animation if running.
       */
      stop: function stop() {
        if (this.el && qx.core.Environment.get("css.animation") && !this.jsAnimation) {
          this.el.style[this.__playState__P_158_0] = "";
          this.el.style[qx.core.Environment.get("css.animation").name] = "";
          this.el.$$animation.__playing__P_158_1 = false;
          this.el.$$animation.__ended__P_158_3 = true;
        } // in case the animation is based on JS
        else if (this.jsAnimation) {
          this.stopped = true;
          qx.bom.element.AnimationJs.stop(this);
        }
      },

      /**
       * Set the animation state to ended
       */
      __setEnded__P_158_2: function __setEnded__P_158_2() {
        this.__playing__P_158_1 = false;
        this.__ended__P_158_3 = true;
      }
    }
  });
  qx.bom.element.AnimationHandle.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.bom.Style": {},
      "qx.core.Environment": {
        "defer": "runtime"
      }
    },
    "environment": {
      "provided": ["css.transform", "css.transform.3d"],
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
       * Martin Wittemann (wittemann)
  
  ************************************************************************ */

  /**
   * Responsible for checking all relevant CSS transform properties.
   *
   * Specs:
   * http://www.w3.org/TR/css3-2d-transforms/
   * http://www.w3.org/TR/css3-3d-transforms/
   *
   * @internal
   */
  qx.Bootstrap.define("qx.bom.client.CssTransform", {
    statics: {
      /**
       * Main check method which returns an object if CSS animations are
       * supported. This object contains all necessary keys to work with CSS
       * animations.
       * <ul>
       *  <li><code>name</code> The name of the css transform style</li>
       *  <li><code>style</code> The name of the css transform-style style</li>
       *  <li><code>origin</code> The name of the transform-origin style</li>
       *  <li><code>3d</code> Whether 3d transforms are supported</li>
       *  <li><code>perspective</code> The name of the perspective style</li>
       *  <li><code>perspective-origin</code> The name of the perspective-origin style</li>
       *  <li><code>backface-visibility</code> The name of the backface-visibility style</li>
       * </ul>
       *
       * @internal
       * @return {Object|null} The described object or null, if animations are
       *   not supported.
       */
      getSupport: function getSupport() {
        var name = qx.bom.client.CssTransform.getName();

        if (name != null) {
          return {
            name: name,
            style: qx.bom.client.CssTransform.getStyle(),
            origin: qx.bom.client.CssTransform.getOrigin(),
            "3d": qx.bom.client.CssTransform.get3D(),
            perspective: qx.bom.client.CssTransform.getPerspective(),
            "perspective-origin": qx.bom.client.CssTransform.getPerspectiveOrigin(),
            "backface-visibility": qx.bom.client.CssTransform.getBackFaceVisibility()
          };
        }

        return null;
      },

      /**
       * Checks for the style name used to set the transform origin.
       * @internal
       * @return {String|null} The name of the style or null, if the style is
       *   not supported.
       */
      getStyle: function getStyle() {
        return qx.bom.Style.getPropertyName("transformStyle");
      },

      /**
       * Checks for the style name used to set the transform origin.
       * @internal
       * @return {String|null} The name of the style or null, if the style is
       *   not supported.
       */
      getPerspective: function getPerspective() {
        return qx.bom.Style.getPropertyName("perspective");
      },

      /**
       * Checks for the style name used to set the perspective origin.
       * @internal
       * @return {String|null} The name of the style or null, if the style is
       *   not supported.
       */
      getPerspectiveOrigin: function getPerspectiveOrigin() {
        return qx.bom.Style.getPropertyName("perspectiveOrigin");
      },

      /**
       * Checks for the style name used to set the backface visibility.
       * @internal
       * @return {String|null} The name of the style or null, if the style is
       *   not supported.
       */
      getBackFaceVisibility: function getBackFaceVisibility() {
        return qx.bom.Style.getPropertyName("backfaceVisibility");
      },

      /**
       * Checks for the style name used to set the transform origin.
       * @internal
       * @return {String|null} The name of the style or null, if the style is
       *   not supported.
       */
      getOrigin: function getOrigin() {
        return qx.bom.Style.getPropertyName("transformOrigin");
      },

      /**
       * Checks for the style name used for transforms.
       * @internal
       * @return {String|null} The name of the style or null, if the style is
       *   not supported.
       */
      getName: function getName() {
        return qx.bom.Style.getPropertyName("transform");
      },

      /**
       * Checks if 3D transforms are supported.
       * @internal
       * @return {Boolean} <code>true</code>, if 3D transformations are supported
       */
      get3D: function get3D() {
        return qx.bom.client.CssTransform.getPerspective() != null;
      }
    },
    defer: function defer(statics) {
      qx.core.Environment.add("css.transform", statics.getSupport);
      qx.core.Environment.add("css.transform.3d", statics.get3D);
    }
  });
  qx.bom.client.CssTransform.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "usage": "dynamic",
        "require": true
      },
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.bom.client.CssTransform": {
        "require": true
      },
      "qx.bom.Style": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "css.transform": {
          "load": true,
          "className": "qx.bom.client.CssTransform"
        },
        "css.transform.3d": {
          "className": "qx.bom.client.CssTransform"
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
       * Martin Wittemann (wittemann)
  
  ************************************************************************ */

  /**
   * This class is responsible for applying CSS3 transforms to plain DOM elements.
   * The implementation is mostly a cross browser wrapper for applying the
   * transforms.
   * The API is keep to the spec as close as possible.
   *
   * http://www.w3.org/TR/css3-3d-transforms/
   */
  qx.Bootstrap.define("qx.bom.element.Transform", {
    statics: {
      /** Internal storage of the CSS names */
      __cssKeys__P_159_0: qx.core.Environment.get("css.transform"),

      /**
       * Method to apply multiple transforms at once to the given element. It
       * takes a map containing the transforms you want to apply plus the values
       * e.g.<code>{scale: 2, rotate: "5deg"}</code>.
       * The values can be either singular, which means a single value will
       * be added to the CSS. If you give an array, the values will be split up
       * and each array entry will be used for the X, Y or Z dimension in that
       * order e.g. <code>{scale: [2, 0.5]}</code> will result in a element
       * double the size in X direction and half the size in Y direction.
       * The values can be either singular, which means a single value will
       * be added to the CSS. If you give an array, the values will be join to
       * a string.
       * 3d suffixed properties will be taken for translate and scale if they are
       * available and an array with three values is given.
       * Make sure your browser supports all transformations you apply.
       *
       * @param el {Element} The element to apply the transformation.
       * @param transforms {Map} The map containing the transforms and value.
       */
      transform: function transform(el, transforms) {
        var transformCss = this.getTransformValue(transforms);

        if (this.__cssKeys__P_159_0 != null) {
          var style = this.__cssKeys__P_159_0["name"];
          el.style[style] = transformCss;
        }
      },

      /**
       * Translates the given element by the given value. For further details, take
       * a look at the {@link #transform} method.
       * @param el {Element} The element to apply the transformation.
       * @param value {String|Array} The value to translate e.g. <code>"10px"</code>.
       */
      translate: function translate(el, value) {
        this.transform(el, {
          translate: value
        });
      },

      /**
       * Scales the given element by the given value. For further details, take
       * a look at the {@link #transform} method.
       * @param el {Element} The element to apply the transformation.
       * @param value {Number|Array} The value to scale.
       */
      scale: function scale(el, value) {
        this.transform(el, {
          scale: value
        });
      },

      /**
       * Rotates the given element by the given value. For further details, take
       * a look at the {@link #transform} method.
       * @param el {Element} The element to apply the transformation.
       * @param value {String|Array} The value to rotate e.g. <code>"90deg"</code>.
       */
      rotate: function rotate(el, value) {
        this.transform(el, {
          rotate: value
        });
      },

      /**
       * Skews the given element by the given value. For further details, take
       * a look at the {@link #transform} method.
       * @param el {Element} The element to apply the transformation.
       * @param value {String|Array} The value to skew e.g. <code>"90deg"</code>.
       */
      skew: function skew(el, value) {
        this.transform(el, {
          skew: value
        });
      },

      /**
       * Converts the given map to a string which could be added to a css
       * stylesheet.
       * @param transforms {Map} The transforms map. For a detailed description,
       * take a look at the {@link #transform} method.
       * @return {String} The CSS value.
       */
      getCss: function getCss(transforms) {
        var transformCss = this.getTransformValue(transforms);

        if (this.__cssKeys__P_159_0 != null) {
          var style = this.__cssKeys__P_159_0["name"];
          return qx.bom.Style.getCssName(style) + ":" + transformCss + ";";
        }

        return "";
      },

      /**
       * Sets the transform-origin property of the given element.
       *
       * Spec: http://www.w3.org/TR/css3-3d-transforms/#transform-origin-property
       * @param el {Element} The dom element to set the property.
       * @param value {String} CSS position values like <code>50% 50%</code> or
       *   <code>left top</code>.
       */
      setOrigin: function setOrigin(el, value) {
        if (this.__cssKeys__P_159_0 != null) {
          el.style[this.__cssKeys__P_159_0["origin"]] = value;
        }
      },

      /**
       * Returns the transform-origin property of the given element.
       *
       * Spec: http://www.w3.org/TR/css3-3d-transforms/#transform-origin-property
       * @param el {Element} The dom element to read the property.
       * @return {String} The set property, e.g. <code>50% 50%</code>
       */
      getOrigin: function getOrigin(el) {
        if (this.__cssKeys__P_159_0 != null) {
          return el.style[this.__cssKeys__P_159_0["origin"]];
        }

        return "";
      },

      /**
       * Sets the transform-style property of the given element.
       *
       * Spec: http://www.w3.org/TR/css3-3d-transforms/#transform-style-property
       * @param el {Element} The dom element to set the property.
       * @param value {String} Either <code>flat</code> or <code>preserve-3d</code>.
       */
      setStyle: function setStyle(el, value) {
        if (this.__cssKeys__P_159_0 != null) {
          el.style[this.__cssKeys__P_159_0["style"]] = value;
        }
      },

      /**
       * Returns the transform-style property of the given element.
       *
       * Spec: http://www.w3.org/TR/css3-3d-transforms/#transform-style-property
       * @param el {Element} The dom element to read the property.
       * @return {String} The set property, either <code>flat</code> or
       *   <code>preserve-3d</code>.
       */
      getStyle: function getStyle(el) {
        if (this.__cssKeys__P_159_0 != null) {
          return el.style[this.__cssKeys__P_159_0["style"]];
        }

        return "";
      },

      /**
       * Sets the perspective property of the given element.
       *
       * Spec: http://www.w3.org/TR/css3-3d-transforms/#perspective-property
       * @param el {Element} The dom element to set the property.
       * @param value {Number} The perspective layer. Numbers between 100
       *   and 5000 give the best results.
       */
      setPerspective: function setPerspective(el, value) {
        if (this.__cssKeys__P_159_0 != null) {
          el.style[this.__cssKeys__P_159_0["perspective"]] = value + "px";
        }
      },

      /**
       * Returns the perspective property of the given element.
       *
       * Spec: http://www.w3.org/TR/css3-3d-transforms/#perspective-property
       * @param el {Element} The dom element to read the property.
       * @return {String} The set property, e.g. <code>500</code>
       */
      getPerspective: function getPerspective(el) {
        if (this.__cssKeys__P_159_0 != null) {
          return el.style[this.__cssKeys__P_159_0["perspective"]];
        }

        return "";
      },

      /**
       * Sets the perspective-origin property of the given element.
       *
       * Spec: http://www.w3.org/TR/css3-3d-transforms/#perspective-origin-property
       * @param el {Element} The dom element to set the property.
       * @param value {String} CSS position values like <code>50% 50%</code> or
       *   <code>left top</code>.
       */
      setPerspectiveOrigin: function setPerspectiveOrigin(el, value) {
        if (this.__cssKeys__P_159_0 != null) {
          el.style[this.__cssKeys__P_159_0["perspective-origin"]] = value;
        }
      },

      /**
       * Returns the perspective-origin property of the given element.
       *
       * Spec: http://www.w3.org/TR/css3-3d-transforms/#perspective-origin-property
       * @param el {Element} The dom element to read the property.
       * @return {String} The set property, e.g. <code>50% 50%</code>
       */
      getPerspectiveOrigin: function getPerspectiveOrigin(el) {
        if (this.__cssKeys__P_159_0 != null) {
          var value = el.style[this.__cssKeys__P_159_0["perspective-origin"]];

          if (value != "") {
            return value;
          } else {
            var valueX = el.style[this.__cssKeys__P_159_0["perspective-origin"] + "X"];
            var valueY = el.style[this.__cssKeys__P_159_0["perspective-origin"] + "Y"];

            if (valueX != "") {
              return valueX + " " + valueY;
            }
          }
        }

        return "";
      },

      /**
       * Sets the backface-visibility property of the given element.
       *
       * Spec: http://www.w3.org/TR/css3-3d-transforms/#backface-visibility-property
       * @param el {Element} The dom element to set the property.
       * @param value {Boolean} <code>true</code> if the backface should be visible.
       */
      setBackfaceVisibility: function setBackfaceVisibility(el, value) {
        if (this.__cssKeys__P_159_0 != null) {
          el.style[this.__cssKeys__P_159_0["backface-visibility"]] = value ? "visible" : "hidden";
        }
      },

      /**
       * Returns the backface-visibility property of the given element.
       *
       * Spec: http://www.w3.org/TR/css3-3d-transforms/#backface-visibility-property
       * @param el {Element} The dom element to read the property.
       * @return {Boolean} <code>true</code>, if the backface is visible.
       */
      getBackfaceVisibility: function getBackfaceVisibility(el) {
        if (this.__cssKeys__P_159_0 != null) {
          return el.style[this.__cssKeys__P_159_0["backface-visibility"]] == "visible";
        }

        return true;
      },

      /**
       * Converts the given transforms map to a valid CSS string.
       *
       * @param transforms {Map} A map containing the transforms.
       * @return {String} The CSS transforms.
       */
      getTransformValue: function getTransformValue(transforms) {
        var value = "";
        var properties3d = ["translate", "scale"];

        for (var property in transforms) {
          var params = transforms[property]; // if an array is given

          if (qx.Bootstrap.isArray(params)) {
            // use 3d properties for translate and scale if all 3 parameter are given
            if (params.length === 3 && properties3d.indexOf(property) > -1 && qx.core.Environment.get("css.transform.3d")) {
              value += this._compute3dProperty(property, params);
            } // use axis related properties
            else {
              value += this._computeAxisProperties(property, params);
            } // case for single values given

          } else {
            // single value case
            value += property + "(" + params + ") ";
          }
        }

        return value.trim();
      },

      /**
       * Helper function to create 3d property.
       *
       * @param property {String} Property of transform, e.g. translate
       * @param params {Array} Array with three values, each one stands for an axis.
       *
       * @return {String} Computed property and its value
       */
      _compute3dProperty: function _compute3dProperty(property, params) {
        var cssValue = "";
        property += "3d";

        for (var i = 0; i < params.length; i++) {
          if (params[i] == null) {
            params[i] = 0;
          }
        }

        cssValue += property + "(" + params.join(", ") + ") ";
        return cssValue;
      },

      /**
       * Helper function to create axis related properties.
       *
       * @param property {String} Property of transform, e.g. rotate
       * @param params {Array} Array with values, each one stands for an axis.
       *
       * @return {String} Computed property and its value
       */
      _computeAxisProperties: function _computeAxisProperties(property, params) {
        var value = "";
        var dimensions = ["X", "Y", "Z"];

        for (var i = 0; i < params.length; i++) {
          if (params[i] == null || i == 2 && !qx.core.Environment.get("css.transform.3d")) {
            continue;
          }

          value += property + dimensions[i] + "(";
          value += params[i];
          value += ") ";
        }

        return value;
      }
    }
  });
  qx.bom.element.Transform.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "require": true
      },
      "qx.event.IEventHandler": {
        "require": true
      },
      "qx.event.Registration": {
        "defer": "runtime",
        "require": true
      },
      "qx.event.GlobalError": {
        "usage": "dynamic",
        "require": true
      },
      "qx.bom.Iframe": {},
      "qx.event.type.Data": {}
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
   * This handler provides a "load" event for iframes
   */
  qx.Class.define("qx.event.handler.Iframe", {
    extend: qx.core.Object,
    implement: qx.event.IEventHandler,

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
        load: 1,
        navigate: 1
      },

      /** @type {Integer} Which target check to use */
      TARGET_CHECK: qx.event.IEventHandler.TARGET_DOMNODE,

      /** @type {Integer} Whether the method "canHandleEvent" must be called */
      IGNORE_CAN_HANDLE: false,

      /**
       * Internal function called by iframes created using {@link qx.bom.Iframe}.
       *
       * @signature function(target)
       * @internal
       * @param target {Element} DOM element which is the target of this event
       */
      onevent: qx.event.GlobalError.observeMethod(function (target) {
        // Fire navigate event when actual URL diverges from stored URL
        var currentUrl = qx.bom.Iframe.queryCurrentUrl(target);

        if (currentUrl !== target.$$url) {
          qx.event.Registration.fireEvent(target, "navigate", qx.event.type.Data, [currentUrl]);
          target.$$url = currentUrl;
        } // Always fire load event


        qx.event.Registration.fireEvent(target, "load");
      })
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      /*
      ---------------------------------------------------------------------------
        EVENT HANDLER INTERFACE
      ---------------------------------------------------------------------------
      */
      // interface implementation
      canHandleEvent: function canHandleEvent(target, type) {
        return target.tagName.toLowerCase() === "iframe";
      },
      // interface implementation
      registerEvent: function registerEvent(target, type, capture) {// Nothing needs to be done here
      },
      // interface implementation
      unregisterEvent: function unregisterEvent(target, type, capture) {// Nothing needs to be done here
      }
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
  qx.event.handler.Iframe.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.event.handler.Iframe": {
        "require": true
      },
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.lang.Object": {},
      "qx.dom.Element": {},
      "qx.dom.Hierarchy": {},
      "qx.bom.client.Engine": {
        "require": true
      },
      "qx.bom.client.OperatingSystem": {
        "require": true
      },
      "qx.log.Logger": {},
      "qx.bom.Event": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "engine.name": {
          "className": "qx.bom.client.Engine"
        },
        "os.name": {
          "className": "qx.bom.client.OperatingSystem"
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
       * Jonathan Weiß (jonathan_rass)
       * Christian Hagendorn (Chris_schmidt)
  
  ************************************************************************ */

  /**
   * Cross browser abstractions to work with iframes.
   *
   * @require(qx.event.handler.Iframe)
   */
  qx.Class.define("qx.bom.Iframe", {
    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */
    statics: {
      /**
       * @type {Map} Default attributes for creation {@link #create}.
       */
      DEFAULT_ATTRIBUTES: {
        frameBorder: 0,
        frameSpacing: 0,
        marginWidth: 0,
        marginHeight: 0,
        hspace: 0,
        vspace: 0,
        border: 0,
        allowTransparency: true
      },

      /**
       * Creates an DOM element.
       *
       * Attributes may be given directly with this call. This is critical
       * for some attributes e.g. name, type, ... in many clients.
       *
       * @param attributes {Map?null} Map of attributes to apply
       * @param win {Window?null} Window to create the element for
       * @return {Element} The created iframe node
       */
      create: function create(attributes, win) {
        // Work on a copy to not modify given attributes map
        var attributes = attributes ? qx.lang.Object.clone(attributes) : {};
        var initValues = qx.bom.Iframe.DEFAULT_ATTRIBUTES;

        for (var key in initValues) {
          if (!(key in attributes)) {
            attributes[key] = initValues[key];
          }
        }

        var elem = qx.dom.Element.create("iframe", attributes, win);

        if (!("onload" in attributes)) {
          elem.onload = function () {
            qx.event.handler.Iframe.onevent(elem);
          };
        }

        return elem;
      },

      /**
       * Get the DOM window object of an iframe.
       *
       * @param iframe {Element} DOM element of the iframe.
       * @return {Window?null} The DOM window object of the iframe or null.
       * @signature function(iframe)
       */
      getWindow: function getWindow(iframe) {
        try {
          return iframe.contentWindow;
        } catch (ex) {
          return null;
        }
      },

      /**
       * Get the DOM document object of an iframe.
       *
       * @param iframe {Element} DOM element of the iframe.
       * @return {Document} The DOM document object of the iframe.
       */
      getDocument: function getDocument(iframe) {
        if ("contentDocument" in iframe) {
          try {
            return iframe.contentDocument;
          } catch (ex) {
            return null;
          }
        }

        try {
          var win = this.getWindow(iframe);
          return win ? win.document : null;
        } catch (ex) {
          return null;
        }
      },

      /**
       * Get the HTML body element of the iframe.
       *
       * @param iframe {Element} DOM element of the iframe.
       * @return {Element} The DOM node of the <code>body</code> element of the iframe.
       */
      getBody: function getBody(iframe) {
        try {
          var doc = this.getDocument(iframe);
          return doc ? doc.getElementsByTagName("body")[0] : null;
        } catch (ex) {
          return null;
        }
      },

      /**
       * Sets iframe's source attribute to given value
       *
       * @param iframe {Element} DOM element of the iframe.
       * @param source {String} URL to be set.
       * @signature function(iframe, source)
       */
      setSource: function setSource(iframe, source) {
        try {
          // the guru says ...
          // it is better to use 'replace' than 'src'-attribute, since 'replace'
          // does not interfere with the history (which is taken care of by the
          // history manager), but there has to be a loaded document
          if (this.getWindow(iframe) && qx.dom.Hierarchy.isRendered(iframe)) {
            /*
              Some gecko users might have an exception here:
              Exception... "Component returned failure code: 0x805e000a
              [nsIDOMLocation.replace]"  nsresult: "0x805e000a (<unknown>)"
            */
            try {
              // Webkit on Mac can't set the source when the iframe is still
              // loading its current page
              if (qx.core.Environment.get("engine.name") == "webkit" && qx.core.Environment.get("os.name") == "osx") {
                var contentWindow = this.getWindow(iframe);

                if (contentWindow) {
                  contentWindow.stop();
                }
              }

              this.getWindow(iframe).location.replace(source);
            } catch (ex) {
              iframe.src = source;
            }
          } else {
            iframe.src = source;
          } // This is a programmer provided source. Remember URL for this source
          // for later comparison with current URL. The current URL can diverge
          // if the end-user navigates in the Iframe.


          this.__rememberUrl__P_160_0(iframe);
        } catch (ex) {
          qx.log.Logger.warn("Iframe source could not be set!");
        }
      },

      /**
       * Returns the current (served) URL inside the iframe
       *
       * @param iframe {Element} DOM element of the iframe.
       * @return {String} Returns the location href or null (if a query is not possible/allowed)
       */
      queryCurrentUrl: function queryCurrentUrl(iframe) {
        var doc = this.getDocument(iframe);

        try {
          if (doc && doc.location) {
            return doc.location.href;
          }
        } catch (ex) {}

        return "";
      },

      /**
       * Remember actual URL of iframe.
       *
       * @param iframe {Element} DOM element of the iframe.
       */
      __rememberUrl__P_160_0: function __rememberUrl__P_160_0(iframe) {
        // URL can only be detected after load. Retrieve and store URL once.
        var callback = function callback() {
          qx.bom.Event.removeNativeListener(iframe, "load", callback);
          iframe.$$url = qx.bom.Iframe.queryCurrentUrl(iframe);
        };

        qx.bom.Event.addNativeListener(iframe, "load", callback);
      }
    }
  });
  qx.bom.Iframe.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "usage": "dynamic",
        "require": true
      },
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Assert": {},
      "qx.lang.Object": {},
      "qx.dom.Element": {},
      "qx.lang.Type": {},
      "qx.bom.client.Engine": {
        "require": true
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "engine.name": {
          "className": "qx.bom.client.Engine",
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
       * Andreas Ecker (ecker)
  
     ======================================================================
  
     This class contains code based on the following work:
  
     * jQuery
       http://jquery.com
       Version 1.3.1
  
       Copyright:
         2009 John Resig
  
       License:
         MIT: http://www.opensource.org/licenses/mit-license.php
  
  ************************************************************************ */

  /**
   * Cross browser abstractions to work with input elements.
   */
  qx.Bootstrap.define("qx.bom.Input", {
    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */
    statics: {
      /** @type {Map} Internal data structures with all supported input types */
      __types__P_161_0: {
        text: 1,
        textarea: 1,
        select: 1,
        checkbox: 1,
        radio: 1,
        password: 1,
        hidden: 1,
        submit: 1,
        image: 1,
        file: 1,
        search: 1,
        reset: 1,
        button: 1
      },

      /**
       * Creates an DOM input/textarea/select element.
       *
       * Attributes may be given directly with this call. This is critical
       * for some attributes e.g. name, type, ... in many clients.
       *
       * Note: <code>select</code> and <code>textarea</code> elements are created
       * using the identically named <code>type</code>.
       *
       * @param type {String} Any valid type for HTML, <code>select</code>
       *   and <code>textarea</code>
       * @param attributes {Map} Map of attributes to apply
       * @param win {Window} Window to create the element for
       * @return {Element} The created input node
       */
      create: function create(type, attributes, win) {
        {
          qx.core.Assert.assertKeyInMap(type, this.__types__P_161_0, "Unsupported input type.");
        } // Work on a copy to not modify given attributes map

        var attributes = attributes ? qx.lang.Object.clone(attributes) : {};
        var tag;

        if (type === "textarea" || type === "select") {
          tag = type;
        } else {
          tag = "input";
          attributes.type = type;
        }

        return qx.dom.Element.create(tag, attributes, win);
      },

      /**
       * Applies the given value to the element.
       *
       * Normally the value is given as a string/number value and applied
       * to the field content (textfield, textarea) or used to
       * detect whether the field is checked (checkbox, radiobutton).
       *
       * Supports array values for selectboxes (multiple-selection)
       * and checkboxes or radiobuttons (for convenience).
       *
       * Please note: To modify the value attribute of a checkbox or
       * radiobutton use {@link qx.bom.element.Attribute#set} instead.
       *
       * @param element {Element} element to update
       * @param value {String|Number|Array} the value to apply
       */
      setValue: function setValue(element, value) {
        var tag = element.nodeName.toLowerCase();
        var type = element.type;
        var Type = qx.lang.Type;

        if (typeof value === "number") {
          value += "";
        }

        if (type === "checkbox" || type === "radio") {
          if (Type.isArray(value)) {
            element.checked = value.includes(element.value);
          } else {
            element.checked = element.value == value;
          }
        } else if (tag === "select") {
          var isArray = Type.isArray(value);
          var options = element.options;
          var subel, subval;

          for (var i = 0, l = options.length; i < l; i++) {
            subel = options[i];
            subval = subel.getAttribute("value");

            if (subval == null) {
              subval = subel.text;
            }

            subel.selected = isArray ? value.includes(subval) : value == subval;
          }

          if (isArray && value.length == 0) {
            element.selectedIndex = -1;
          }
        } else if ((type === "text" || type === "textarea") && qx.core.Environment.get("engine.name") == "mshtml") {
          // These flags are required to detect self-made property-change
          // events during value modification. They are used by the Input
          // event handler to filter events.
          element.$$inValueSet = true;
          element.value = value;
          element.$$inValueSet = null;
        } else {
          element.value = value;
        }
      },

      /**
       * Returns the currently configured value.
       *
       * Works with simple input fields as well as with
       * select boxes or option elements.
       *
       * Returns an array in cases of multi-selection in
       * select boxes but in all other cases a string.
       *
       * @param element {Element} DOM element to query
       * @return {String|Array} The value of the given element
       */
      getValue: function getValue(element) {
        var tag = element.nodeName.toLowerCase();

        if (tag === "option") {
          return (element.attributes.value || {}).specified ? element.value : element.text;
        }

        if (tag === "select") {
          var index = element.selectedIndex; // Nothing was selected

          if (index < 0) {
            return null;
          }

          var values = [];
          var options = element.options;
          var one = element.type == "select-one";
          var clazz = qx.bom.Input;
          var value; // Loop through all the selected options

          for (var i = one ? index : 0, max = one ? index + 1 : options.length; i < max; i++) {
            var option = options[i];

            if (option.selected) {
              // Get the specific value for the option
              value = clazz.getValue(option); // We don't need an array for one selects

              if (one) {
                return value;
              } // Multi-Selects return an array


              values.push(value);
            }
          }

          return values;
        } else {
          return (element.value || "").replace(/\r/g, "");
        }
      },

      /**
       * Sets the text wrap behaviour of a text area element.
       * This property uses the attribute "wrap" respectively
       * the style property "whiteSpace"
       *
       * @signature function(element, wrap)
       * @param element {Element} DOM element to modify
       * @param wrap {Boolean} Whether to turn text wrap on or off.
       */
      setWrap: qx.core.Environment.select("engine.name", {
        mshtml: function mshtml(element, wrap) {
          var wrapValue = wrap ? "soft" : "off"; // Explicitly set overflow-y CSS property to auto when wrapped,
          // allowing the vertical scroll-bar to appear if necessary

          var styleValue = wrap ? "auto" : "";
          element.wrap = wrapValue;
          element.style.overflowY = styleValue;
        },
        gecko: function gecko(element, wrap) {
          var wrapValue = wrap ? "soft" : "off";
          var styleValue = wrap ? "" : "auto";
          element.setAttribute("wrap", wrapValue);
          element.style.overflow = styleValue;
        },
        webkit: function webkit(element, wrap) {
          var wrapValue = wrap ? "soft" : "off";
          var styleValue = wrap ? "" : "auto";
          element.setAttribute("wrap", wrapValue);
          element.style.overflow = styleValue;
        },
        "default": function _default(element, wrap) {
          element.style.whiteSpace = wrap ? "normal" : "nowrap";
        }
      })
    }
  });
  qx.bom.Input.$$dbClassInfo = $$dbClassInfo;
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
      "qx.bom.client.Engine": {
        "require": true
      },
      "qx.util.ResourceManager": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "engine.name": {
          "className": "qx.bom.client.Engine"
        },
        "engine.version": {
          "className": "qx.bom.client.Engine"
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
       * Fabian Jakobs (fjakobs)
       * Sebastian Werner (wpbasti)
  
  ************************************************************************ */

  /**
   * The background class contains methods to compute and set the background image
   * of a DOM element.
   *
   * It fixes a background position issue in Firefox 2.
   */
  qx.Class.define("qx.bom.element.Background", {
    statics: {
      /** @type {Array} Internal helper to improve compile performance */
      __tmpl__P_128_0: ["background-image:url(", null, ");", "background-position:", null, ";", "background-repeat:", null, ";"],

      /** @type {Map} Empty styles when no image is given */
      __emptyStyles__P_128_1: {
        backgroundImage: null,
        backgroundPosition: null,
        backgroundRepeat: null
      },

      /**
       * Computes the background position CSS value
       *
       * @param left {Integer|String} either an integer pixel value or a CSS
       *    string value
       * @param top {Integer|String} either an integer pixel value or a CSS
       *    string value
       * @return {String} The background position CSS value
       */
      __computePosition__P_128_2: function __computePosition__P_128_2(left, top) {
        // Correcting buggy Firefox background-position implementation
        // Have problems with identical values
        var engine = qx.core.Environment.get("engine.name");
        var version = qx.core.Environment.get("engine.version");

        if (engine == "gecko" && version < 1.9 && left == top && typeof left == "number") {
          top += 0.01;
        }

        if (left) {
          var leftCss = typeof left == "number" ? left + "px" : left;
        } else {
          leftCss = "0";
        }

        if (top) {
          var topCss = typeof top == "number" ? top + "px" : top;
        } else {
          topCss = "0";
        }

        return leftCss + " " + topCss;
      },

      /**
       * Compiles the background into a CSS compatible string.
       *
       * @param source {String?null} The URL of the background image
       * @param repeat {String?null} The background repeat property. valid values
       *     are <code>repeat</code>, <code>repeat-x</code>,
       *     <code>repeat-y</code>, <code>no-repeat</code>
       * @param left {Integer|String?null} The horizontal offset of the image
       *      inside of the image element. If the value is an integer it is
       *      interpreted as pixel value otherwise the value is taken as CSS value.
       *      CSS the values are "center", "left" and "right"
       * @param top {Integer|String?null} The vertical offset of the image
       *      inside of the image element. If the value is an integer it is
       *      interpreted as pixel value otherwise the value is taken as CSS value.
       *      CSS the values are "top", "bottom" and "center"
       * @return {String} CSS string
       */
      compile: function compile(source, repeat, left, top) {
        var position = this.__computePosition__P_128_2(left, top);

        var backgroundImageUrl = qx.util.ResourceManager.getInstance().toUri(source); // Updating template

        var tmpl = this.__tmpl__P_128_0;
        tmpl[1] = "'" + backgroundImageUrl + "'"; // Put in quotes so spaces work

        tmpl[4] = position;
        tmpl[7] = repeat;
        return tmpl.join("");
      },

      /**
       * Get standard css background styles
       *
       * @param source {String} The URL of the background image
       * @param repeat {String?null} The background repeat property. valid values
       *     are <code>repeat</code>, <code>repeat-x</code>,
       *     <code>repeat-y</code>, <code>no-repeat</code>
       * @param left {Integer|String?null} The horizontal offset of the image
       *      inside of the image element. If the value is an integer it is
       *      interpreted as pixel value otherwise the value is taken as CSS value.
       *      CSS the values are "center", "left" and "right"
       * @param top {Integer|String?null} The vertical offset of the image
       *      inside of the image element. If the value is an integer it is
       *      interpreted as pixel value otherwise the value is taken as CSS value.
       *      CSS the values are "top", "bottom" and "center"
       * @return {Map} A map of CSS styles
       */
      getStyles: function getStyles(source, repeat, left, top) {
        if (!source) {
          return this.__emptyStyles__P_128_1;
        }

        var position = this.__computePosition__P_128_2(left, top);

        var backgroundImageUrl = qx.util.ResourceManager.getInstance().toUri(source);
        var backgroundImageCssString = "url('" + backgroundImageUrl + "')"; // Put in quotes so spaces work

        var map = {
          backgroundPosition: position,
          backgroundImage: backgroundImageCssString
        };

        if (repeat != null) {
          map.backgroundRepeat = repeat;
        }

        return map;
      },

      /**
       * Set the background on the given DOM element
       *
       * @param element {Element} The element to modify
       * @param source {String?null} The URL of the background image
       * @param repeat {String?null} The background repeat property. valid values
       *     are <code>repeat</code>, <code>repeat-x</code>,
       *     <code>repeat-y</code>, <code>no-repeat</code>
       * @param left {Integer?null} The horizontal offset of the image inside of
       *     the image element.
       * @param top {Integer?null} The vertical offset of the image inside of
       *     the image element.
       */
      set: function set(element, source, repeat, left, top) {
        var styles = this.getStyles(source, repeat, left, top);

        for (var prop in styles) {
          element.style[prop] = styles[prop];
        }
      }
    }
  });
  qx.bom.element.Background.$$dbClassInfo = $$dbClassInfo;
})();

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.ui.core.ISingleSelection": {
        "require": true
      },
      "qx.ui.form.IField": {
        "require": true
      },
      "qx.ui.form.IForm": {
        "require": true
      },
      "qx.ui.form.IModelSelection": {
        "require": true
      },
      "qx.ui.core.MSingleSelectionHandling": {
        "require": true
      },
      "qx.ui.form.MModelSelection": {
        "require": true
      },
      "qx.lang.String": {},
      "qx.lang.Array": {},
      "qx.ui.core.FocusHandler": {}
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
       * Christian Hagendorn (chris_schmidt)
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * The radio group handles a collection of items from which only one item
   * can be selected. Selection another item will deselect the previously selected
   * item.
   *
   * This class is e.g. used to create radio groups or {@link qx.ui.form.RadioButton}
   * or {@link qx.ui.toolbar.RadioButton} instances.
   *
   * We also offer a widget for the same purpose which uses this class. So if
   * you like to act with a widget instead of a pure logic coupling of the
   * widgets, take a look at the {@link qx.ui.form.RadioButtonGroup} widget.
   */
  qx.Class.define("qx.ui.form.RadioGroup", {
    extend: qx.core.Object,
    implement: [qx.ui.core.ISingleSelection, qx.ui.form.IField, qx.ui.form.IForm, qx.ui.form.IModelSelection],
    include: [qx.ui.core.MSingleSelectionHandling, qx.ui.form.MModelSelection],

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param varargs {qx.core.Object} A variable number of items, which are
     *     initially added to the radio group, the first item will be selected.
     */
    construct: function construct(varargs) {
      qx.core.Object.constructor.call(this); // create item array

      this.__items__P_187_0 = []; // add listener before call add!!!

      this.addListener("changeSelection", this.__onChangeSelection__P_187_1, this);

      if (varargs != null) {
        this.add.apply(this, arguments);
      }
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /**
       * The property name in each of the added widgets that is grouped
       */
      groupedProperty: {
        check: "String",
        apply: "_applyGroupedProperty",
        event: "changeGroupedProperty",
        init: "value"
      },

      /**
       * The property name in each of the added widgets that is informed of the
       * RadioGroup object it is a member of
       */
      groupProperty: {
        check: "String",
        event: "changeGroupProperty",
        init: "group"
      },

      /**
       * Whether the radio group is enabled
       */
      enabled: {
        check: "Boolean",
        apply: "_applyEnabled",
        event: "changeEnabled",
        init: true
      },

      /**
       * Whether the selection should wrap around. This means that the successor of
       * the last item is the first item.
       */
      wrap: {
        check: "Boolean",
        init: true
      },

      /**
       * If is set to <code>true</code> the selection could be empty,
       * otherwise is always one <code>RadioButton</code> selected.
       */
      allowEmptySelection: {
        check: "Boolean",
        init: false,
        apply: "_applyAllowEmptySelection"
      },

      /**
       * Flag signaling if the group at all is valid. All children will have the
       * same state.
       */
      valid: {
        check: "Boolean",
        init: true,
        apply: "_applyValid",
        event: "changeValid"
      },

      /**
       * Flag signaling if the group is required.
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
        event: "changeInvalidMessage",
        apply: "_applyInvalidMessage"
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

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      /** @type {qx.ui.form.IRadioItem[]} The items of the radio group */
      __items__P_187_0: null,

      /*
      ---------------------------------------------------------------------------
        UTILITIES
      ---------------------------------------------------------------------------
      */

      /**
       * Get all managed items
       *
       * @return {qx.ui.form.IRadioItem[]} All managed items.
       */
      getItems: function getItems() {
        return this.__items__P_187_0;
      },

      /*
      ---------------------------------------------------------------------------
        REGISTRY
      ---------------------------------------------------------------------------
      */

      /**
       * Add the passed items to the radio group.
       *
       * @param varargs {qx.ui.form.IRadioItem} A variable number of items to add.
       */
      add: function add(varargs) {
        var items = this.__items__P_187_0;
        var item;
        var groupedProperty = this.getGroupedProperty();
        var groupedPropertyUp = qx.lang.String.firstUp(groupedProperty);

        for (var i = 0, l = arguments.length; i < l; i++) {
          item = arguments[i];

          if (items.includes(item)) {
            continue;
          } // Register listeners


          item.addListener("change" + groupedPropertyUp, this._onItemChangeChecked, this); // Push RadioButton to array

          items.push(item); // Inform radio button about new group

          item.set(this.getGroupProperty(), this); // Need to update internal value?

          if (item.get(groupedProperty)) {
            this.setSelection([item]);
          }
        } // Select first item when only one is registered


        if (!this.isAllowEmptySelection() && items.length > 0 && !this.getSelection()[0]) {
          this.setSelection([items[0]]);
        }
      },

      /**
       * Remove an item from the radio group.
       *
       * @param item {qx.ui.form.IRadioItem} The item to remove.
       */
      remove: function remove(item) {
        var items = this.__items__P_187_0;
        var groupedProperty = this.getGroupedProperty();
        var groupedPropertyUp = qx.lang.String.firstUp(groupedProperty);

        if (items.includes(item)) {
          // Remove RadioButton from array
          qx.lang.Array.remove(items, item); // Inform radio button about new group

          if (item.get(this.getGroupProperty()) === this) {
            item.reset(this.getGroupProperty());
          } // Deregister listeners


          item.removeListener("change" + groupedPropertyUp, this._onItemChangeChecked, this); // if the radio was checked, set internal selection to null

          if (item.get(groupedProperty)) {
            this.resetSelection();
          }
        }
      },

      /**
       * Returns an array containing the group's items.
       *
       * @return {qx.ui.form.IRadioItem[]} The item array
       */
      getChildren: function getChildren() {
        return this.__items__P_187_0;
      },

      /*
      ---------------------------------------------------------------------------
        LISTENER FOR ITEM CHANGES
      ---------------------------------------------------------------------------
      */

      /**
       * Event listener for <code>changeValue</code> event of every managed item.
       *
       * @param e {qx.event.type.Data} Data event
       */
      _onItemChangeChecked: function _onItemChangeChecked(e) {
        var item = e.getTarget();
        var groupedProperty = this.getGroupedProperty();

        if (item.get(groupedProperty)) {
          this.setSelection([item]);
        } else if (this.getSelection()[0] == item) {
          this.resetSelection();
        }
      },

      /*
      ---------------------------------------------------------------------------
        APPLY ROUTINES
      ---------------------------------------------------------------------------
      */
      // property apply
      _applyGroupedProperty: function _applyGroupedProperty(value, old) {
        var item;
        var oldFirstUp = qx.lang.String.firstUp(old);
        var newFirstUp = qx.lang.String.firstUp(value);

        for (var i = 0; i < this.__items__P_187_0.length; i++) {
          item = this.__items__P_187_0[i]; // remove the listener for the old change event

          item.removeListener("change" + oldFirstUp, this._onItemChangeChecked, this); // add the listener for the new change event

          item.removeListener("change" + newFirstUp, this._onItemChangeChecked, this);
        }
      },
      // property apply
      _applyInvalidMessage: function _applyInvalidMessage(value, old) {
        for (var i = 0; i < this.__items__P_187_0.length; i++) {
          this.__items__P_187_0[i].setInvalidMessage(value);
        }
      },
      // property apply
      _applyValid: function _applyValid(value, old) {
        for (var i = 0; i < this.__items__P_187_0.length; i++) {
          this.__items__P_187_0[i].setValid(value);
        }
      },
      // property apply
      _applyEnabled: function _applyEnabled(value, old) {
        var items = this.__items__P_187_0;

        if (value == null) {
          for (var i = 0, l = items.length; i < l; i++) {
            items[i].resetEnabled();
          }
        } else {
          for (var i = 0, l = items.length; i < l; i++) {
            items[i].setEnabled(value);
          }
        }
      },
      // property apply
      _applyAllowEmptySelection: function _applyAllowEmptySelection(value, old) {
        if (!value && this.isSelectionEmpty()) {
          this.resetSelection();
        }
      },

      /*
      ---------------------------------------------------------------------------
        SELECTION
      ---------------------------------------------------------------------------
      */

      /**
       * Select the item following the given item.
       */
      selectNext: function selectNext() {
        var item = this.getSelection()[0];
        var items = this.__items__P_187_0;
        var index = items.indexOf(item);

        if (index == -1) {
          return;
        }

        var i = 0;
        var length = items.length; // Find next enabled item

        if (this.getWrap()) {
          index = (index + 1) % length;
        } else {
          index = Math.min(index + 1, length - 1);
        }

        while (i < length && !items[index].getEnabled()) {
          index = (index + 1) % length;
          i++;
        }

        this.setSelection([items[index]]);
      },

      /**
       * Select the item previous the given item.
       */
      selectPrevious: function selectPrevious() {
        var item = this.getSelection()[0];
        var items = this.__items__P_187_0;
        var index = items.indexOf(item);

        if (index == -1) {
          return;
        }

        var i = 0;
        var length = items.length; // Find previous enabled item

        if (this.getWrap()) {
          index = (index - 1 + length) % length;
        } else {
          index = Math.max(index - 1, 0);
        }

        while (i < length && !items[index].getEnabled()) {
          index = (index - 1 + length) % length;
          i++;
        }

        this.setSelection([items[index]]);
      },

      /*
      ---------------------------------------------------------------------------
        HELPER METHODS FOR SELECTION API
      ---------------------------------------------------------------------------
      */

      /**
       * Returns the items for the selection.
       *
       * @return {qx.ui.form.IRadioItem[]} Items to select.
       */
      _getItems: function _getItems() {
        return this.getItems();
      },

      /**
       * Returns if the selection could be empty or not.
       *
       * @return {Boolean} <code>true</code> If selection could be empty,
       *    <code>false</code> otherwise.
       */
      _isAllowEmptySelection: function _isAllowEmptySelection() {
        return this.isAllowEmptySelection();
      },

      /**
       * Returns whether the item is selectable. In opposite to the default
       * implementation (which checks for visible items) every radio button
       * which is part of the group is selected even if it is currently not visible.
       *
       * @param item {qx.ui.form.IRadioItem} The item to check if its selectable.
       * @return {Boolean} <code>true</code> if the item is part of the radio group
       *    <code>false</code> otherwise.
       */
      _isItemSelectable: function _isItemSelectable(item) {
        return this.__items__P_187_0.indexOf(item) != -1;
      },

      /**
       * Event handler for <code>changeSelection</code>.
       *
       * @param e {qx.event.type.Data} Data event.
       */
      __onChangeSelection__P_187_1: function __onChangeSelection__P_187_1(e) {
        var value = e.getData()[0];
        var old = e.getOldData()[0];
        var groupedProperty = this.getGroupedProperty();

        if (old) {
          old.set(groupedProperty, false);
        }

        if (value) {
          value.set(groupedProperty, true); // If Group is focused, the selection was changed by keyboard. Switch focus to new value

          if (this.__isGroupFocused__P_187_2() && value.isFocusable()) {
            value.focus();
          }
        }
      },

      /**
       * Checks if this group is focused by checking focused state of each item
       * @returns {Boolean} result
       */
      __isGroupFocused__P_187_2: function __isGroupFocused__P_187_2() {
        var focusHandler = qx.ui.core.FocusHandler.getInstance();

        var _iterator = _createForOfIteratorHelper(this._getItems()),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var item = _step.value;

            if (focusHandler.isFocused(item)) {
              return true;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        return false;
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this._disposeArray("__items__P_187_0");
    }
  });
  qx.ui.form.RadioGroup.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.container.Composite": {
        "construct": true,
        "require": true
      },
      "qx.ui.layout.Grid": {
        "construct": true
      },
      "qx.ui.basic.Label": {},
      "qx.ui.basic.Image": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2006 STZ-IDA, Germany, http://www.stz-ida.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * The default header cell widget
   *
   * @childControl label {qx.ui.basic.Label} label of the header cell
   * @childControl sort-icon {qx.ui.basic.Image} sort icon of the header cell
   * @childControl icon {qx.ui.basic.Image} icon of the header cell
   */
  qx.Class.define("qx.ui.table.headerrenderer.HeaderCell", {
    extend: qx.ui.container.Composite,
    construct: function construct() {
      qx.ui.container.Composite.constructor.call(this);
      var layout = new qx.ui.layout.Grid();
      layout.setRowFlex(0, 1);
      layout.setColumnFlex(1, 1);
      layout.setColumnFlex(2, 1);
      this.setLayout(layout); // ARIA attrs

      this.getContentElement().setAttribute("role", "columnheader");
    },
    properties: {
      appearance: {
        refine: true,
        init: "table-header-cell"
      },

      /** header cell label */
      label: {
        check: "String",
        init: null,
        nullable: true,
        apply: "_applyLabel"
      },

      /** The icon URL of the sorting indicator */
      sortIcon: {
        check: "String",
        init: null,
        nullable: true,
        apply: "_applySortIcon",
        themeable: true
      },

      /** Icon URL */
      icon: {
        check: "String",
        init: null,
        nullable: true,
        apply: "_applyIcon"
      }
    },
    members: {
      // property apply
      _applyLabel: function _applyLabel(value, old) {
        if (value) {
          this._showChildControl("label").setValue(value);
        } else {
          this._excludeChildControl("label");
        }
      },
      // property apply
      _applySortIcon: function _applySortIcon(value, old) {
        if (value) {
          this._showChildControl("sort-icon").setSource(value);
        } else {
          this._excludeChildControl("sort-icon");
        }
      },
      // property apply
      _applyIcon: function _applyIcon(value, old) {
        if (value) {
          this._showChildControl("icon").setSource(value);
        } else {
          this._excludeChildControl("icon");
        }
      },
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id, hash) {
        var control;

        switch (id) {
          case "label":
            control = new qx.ui.basic.Label(this.getLabel()).set({
              anonymous: true,
              allowShrinkX: true
            });

            this._add(control, {
              row: 0,
              column: 1
            });

            break;

          case "sort-icon":
            control = new qx.ui.basic.Image(this.getSortIcon());
            control.setAnonymous(true);

            this._add(control, {
              row: 0,
              column: 2
            });

            break;

          case "icon":
            control = new qx.ui.basic.Image(this.getIcon()).set({
              anonymous: true,
              allowShrinkX: true
            });

            this._add(control, {
              row: 0,
              column: 0
            });

            break;
        }

        return control || qx.ui.table.headerrenderer.HeaderCell.superclass.prototype._createChildControlImpl.call(this, id);
      }
    }
  });
  qx.ui.table.headerrenderer.HeaderCell.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.util.StringEscape": {},
      "qx.lang.Object": {
        "defer": "runtime"
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
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * A Collection of utility functions to escape and unescape strings.
   */
  qx.Bootstrap.define("qx.bom.String", {
    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */
    statics: {
      /** Mapping of HTML entity names to the corresponding char code */
      TO_CHARCODE: {
        quot: 34,
        // " - double-quote
        amp: 38,
        // &
        lt: 60,
        // <
        gt: 62,
        // >
        // http://www.w3.org/TR/REC-html40/sgml/entities.html
        // ISO 8859-1 characters
        nbsp: 160,
        // no-break space
        iexcl: 161,
        // inverted exclamation mark
        cent: 162,
        // cent sign
        pound: 163,
        // pound sterling sign
        curren: 164,
        // general currency sign
        yen: 165,
        // yen sign
        brvbar: 166,
        // broken (vertical) bar
        sect: 167,
        // section sign
        uml: 168,
        // umlaut (dieresis)
        copy: 169,
        // copyright sign
        ordf: 170,
        // ordinal indicator, feminine
        laquo: 171,
        // angle quotation mark, left
        not: 172,
        // not sign
        shy: 173,
        // soft hyphen
        reg: 174,
        // registered sign
        macr: 175,
        // macron
        deg: 176,
        // degree sign
        plusmn: 177,
        // plus-or-minus sign
        sup2: 178,
        // superscript two
        sup3: 179,
        // superscript three
        acute: 180,
        // acute accent
        micro: 181,
        // micro sign
        para: 182,
        // pilcrow (paragraph sign)
        middot: 183,
        // middle dot
        cedil: 184,
        // cedilla
        sup1: 185,
        // superscript one
        ordm: 186,
        // ordinal indicator, masculine
        raquo: 187,
        // angle quotation mark, right
        frac14: 188,
        // fraction one-quarter
        frac12: 189,
        // fraction one-half
        frac34: 190,
        // fraction three-quarters
        iquest: 191,
        // inverted question mark
        Agrave: 192,
        // capital A, grave accent
        Aacute: 193,
        // capital A, acute accent
        Acirc: 194,
        // capital A, circumflex accent
        Atilde: 195,
        // capital A, tilde
        Auml: 196,
        // capital A, dieresis or umlaut mark
        Aring: 197,
        // capital A, ring
        AElig: 198,
        // capital AE diphthong (ligature)
        Ccedil: 199,
        // capital C, cedilla
        Egrave: 200,
        // capital E, grave accent
        Eacute: 201,
        // capital E, acute accent
        Ecirc: 202,
        // capital E, circumflex accent
        Euml: 203,
        // capital E, dieresis or umlaut mark
        Igrave: 204,
        // capital I, grave accent
        Iacute: 205,
        // capital I, acute accent
        Icirc: 206,
        // capital I, circumflex accent
        Iuml: 207,
        // capital I, dieresis or umlaut mark
        ETH: 208,
        // capital Eth, Icelandic
        Ntilde: 209,
        // capital N, tilde
        Ograve: 210,
        // capital O, grave accent
        Oacute: 211,
        // capital O, acute accent
        Ocirc: 212,
        // capital O, circumflex accent
        Otilde: 213,
        // capital O, tilde
        Ouml: 214,
        // capital O, dieresis or umlaut mark
        times: 215,
        // multiply sign
        Oslash: 216,
        // capital O, slash
        Ugrave: 217,
        // capital U, grave accent
        Uacute: 218,
        // capital U, acute accent
        Ucirc: 219,
        // capital U, circumflex accent
        Uuml: 220,
        // capital U, dieresis or umlaut mark
        Yacute: 221,
        // capital Y, acute accent
        THORN: 222,
        // capital THORN, Icelandic
        szlig: 223,
        // small sharp s, German (sz ligature)
        agrave: 224,
        // small a, grave accent
        aacute: 225,
        // small a, acute accent
        acirc: 226,
        // small a, circumflex accent
        atilde: 227,
        // small a, tilde
        auml: 228,
        // small a, dieresis or umlaut mark
        aring: 229,
        // small a, ring
        aelig: 230,
        // small ae diphthong (ligature)
        ccedil: 231,
        // small c, cedilla
        egrave: 232,
        // small e, grave accent
        eacute: 233,
        // small e, acute accent
        ecirc: 234,
        // small e, circumflex accent
        euml: 235,
        // small e, dieresis or umlaut mark
        igrave: 236,
        // small i, grave accent
        iacute: 237,
        // small i, acute accent
        icirc: 238,
        // small i, circumflex accent
        iuml: 239,
        // small i, dieresis or umlaut mark
        eth: 240,
        // small eth, Icelandic
        ntilde: 241,
        // small n, tilde
        ograve: 242,
        // small o, grave accent
        oacute: 243,
        // small o, acute accent
        ocirc: 244,
        // small o, circumflex accent
        otilde: 245,
        // small o, tilde
        ouml: 246,
        // small o, dieresis or umlaut mark
        divide: 247,
        // divide sign
        oslash: 248,
        // small o, slash
        ugrave: 249,
        // small u, grave accent
        uacute: 250,
        // small u, acute accent
        ucirc: 251,
        // small u, circumflex accent
        uuml: 252,
        // small u, dieresis or umlaut mark
        yacute: 253,
        // small y, acute accent
        thorn: 254,
        // small thorn, Icelandic
        yuml: 255,
        // small y, dieresis or umlaut mark
        // Latin Extended-B
        fnof: 402,
        // latin small f with hook = function= florin, U+0192 ISOtech
        // Greek
        Alpha: 913,
        // greek capital letter alpha, U+0391
        Beta: 914,
        // greek capital letter beta, U+0392
        Gamma: 915,
        // greek capital letter gamma,U+0393 ISOgrk3
        Delta: 916,
        // greek capital letter delta,U+0394 ISOgrk3
        Epsilon: 917,
        // greek capital letter epsilon, U+0395
        Zeta: 918,
        // greek capital letter zeta, U+0396
        Eta: 919,
        // greek capital letter eta, U+0397
        Theta: 920,
        // greek capital letter theta,U+0398 ISOgrk3
        Iota: 921,
        // greek capital letter iota, U+0399
        Kappa: 922,
        // greek capital letter kappa, U+039A
        Lambda: 923,
        // greek capital letter lambda,U+039B ISOgrk3
        Mu: 924,
        // greek capital letter mu, U+039C
        Nu: 925,
        // greek capital letter nu, U+039D
        Xi: 926,
        // greek capital letter xi, U+039E ISOgrk3
        Omicron: 927,
        // greek capital letter omicron, U+039F
        Pi: 928,
        // greek capital letter pi, U+03A0 ISOgrk3
        Rho: 929,
        // greek capital letter rho, U+03A1
        // there is no Sigmaf, and no U+03A2 character either
        Sigma: 931,
        // greek capital letter sigma,U+03A3 ISOgrk3
        Tau: 932,
        // greek capital letter tau, U+03A4
        Upsilon: 933,
        // greek capital letter upsilon,U+03A5 ISOgrk3
        Phi: 934,
        // greek capital letter phi,U+03A6 ISOgrk3
        Chi: 935,
        // greek capital letter chi, U+03A7
        Psi: 936,
        // greek capital letter psi,U+03A8 ISOgrk3
        Omega: 937,
        // greek capital letter omega,U+03A9 ISOgrk3
        alpha: 945,
        // greek small letter alpha,U+03B1 ISOgrk3
        beta: 946,
        // greek small letter beta, U+03B2 ISOgrk3
        gamma: 947,
        // greek small letter gamma,U+03B3 ISOgrk3
        delta: 948,
        // greek small letter delta,U+03B4 ISOgrk3
        epsilon: 949,
        // greek small letter epsilon,U+03B5 ISOgrk3
        zeta: 950,
        // greek small letter zeta, U+03B6 ISOgrk3
        eta: 951,
        // greek small letter eta, U+03B7 ISOgrk3
        theta: 952,
        // greek small letter theta,U+03B8 ISOgrk3
        iota: 953,
        // greek small letter iota, U+03B9 ISOgrk3
        kappa: 954,
        // greek small letter kappa,U+03BA ISOgrk3
        lambda: 955,
        // greek small letter lambda,U+03BB ISOgrk3
        mu: 956,
        // greek small letter mu, U+03BC ISOgrk3
        nu: 957,
        // greek small letter nu, U+03BD ISOgrk3
        xi: 958,
        // greek small letter xi, U+03BE ISOgrk3
        omicron: 959,
        // greek small letter omicron, U+03BF NEW
        pi: 960,
        // greek small letter pi, U+03C0 ISOgrk3
        rho: 961,
        // greek small letter rho, U+03C1 ISOgrk3
        sigmaf: 962,
        // greek small letter final sigma,U+03C2 ISOgrk3
        sigma: 963,
        // greek small letter sigma,U+03C3 ISOgrk3
        tau: 964,
        // greek small letter tau, U+03C4 ISOgrk3
        upsilon: 965,
        // greek small letter upsilon,U+03C5 ISOgrk3
        phi: 966,
        // greek small letter phi, U+03C6 ISOgrk3
        chi: 967,
        // greek small letter chi, U+03C7 ISOgrk3
        psi: 968,
        // greek small letter psi, U+03C8 ISOgrk3
        omega: 969,
        // greek small letter omega,U+03C9 ISOgrk3
        thetasym: 977,
        // greek small letter theta symbol,U+03D1 NEW
        upsih: 978,
        // greek upsilon with hook symbol,U+03D2 NEW
        piv: 982,
        // greek pi symbol, U+03D6 ISOgrk3
        // General Punctuation
        bull: 8226,
        // bullet = black small circle,U+2022 ISOpub
        // bullet is NOT the same as bullet operator, U+2219
        hellip: 8230,
        // horizontal ellipsis = three dot leader,U+2026 ISOpub
        prime: 8242,
        // prime = minutes = feet, U+2032 ISOtech
        Prime: 8243,
        // double prime = seconds = inches,U+2033 ISOtech
        oline: 8254,
        // overline = spacing overscore,U+203E NEW
        frasl: 8260,
        // fraction slash, U+2044 NEW
        // Letterlike Symbols
        weierp: 8472,
        // script capital P = power set= Weierstrass p, U+2118 ISOamso
        image: 8465,
        // blackletter capital I = imaginary part,U+2111 ISOamso
        real: 8476,
        // blackletter capital R = real part symbol,U+211C ISOamso
        trade: 8482,
        // trade mark sign, U+2122 ISOnum
        alefsym: 8501,
        // alef symbol = first transfinite cardinal,U+2135 NEW
        // alef symbol is NOT the same as hebrew letter alef,U+05D0 although the same glyph could be used to depict both characters
        // Arrows
        larr: 8592,
        // leftwards arrow, U+2190 ISOnum
        uarr: 8593,
        // upwards arrow, U+2191 ISOnum-->
        rarr: 8594,
        // rightwards arrow, U+2192 ISOnum
        darr: 8595,
        // downwards arrow, U+2193 ISOnum
        harr: 8596,
        // left right arrow, U+2194 ISOamsa
        crarr: 8629,
        // downwards arrow with corner leftwards= carriage return, U+21B5 NEW
        lArr: 8656,
        // leftwards double arrow, U+21D0 ISOtech
        // ISO 10646 does not say that lArr is the same as the 'is implied by' arrow but also does not have any other character for that function. So ? lArr can be used for 'is implied by' as ISOtech suggests
        uArr: 8657,
        // upwards double arrow, U+21D1 ISOamsa
        rArr: 8658,
        // rightwards double arrow,U+21D2 ISOtech
        // ISO 10646 does not say this is the 'implies' character but does not have another character with this function so ?rArr can be used for 'implies' as ISOtech suggests
        dArr: 8659,
        // downwards double arrow, U+21D3 ISOamsa
        hArr: 8660,
        // left right double arrow,U+21D4 ISOamsa
        // Mathematical Operators
        forall: 8704,
        // for all, U+2200 ISOtech
        part: 8706,
        // partial differential, U+2202 ISOtech
        exist: 8707,
        // there exists, U+2203 ISOtech
        empty: 8709,
        // empty set = null set = diameter,U+2205 ISOamso
        nabla: 8711,
        // nabla = backward difference,U+2207 ISOtech
        isin: 8712,
        // element of, U+2208 ISOtech
        notin: 8713,
        // not an element of, U+2209 ISOtech
        ni: 8715,
        // contains as member, U+220B ISOtech
        // should there be a more memorable name than 'ni'?
        prod: 8719,
        // n-ary product = product sign,U+220F ISOamsb
        // prod is NOT the same character as U+03A0 'greek capital letter pi' though the same glyph might be used for both
        sum: 8721,
        // n-ary summation, U+2211 ISOamsb
        // sum is NOT the same character as U+03A3 'greek capital letter sigma' though the same glyph might be used for both
        minus: 8722,
        // minus sign, U+2212 ISOtech
        lowast: 8727,
        // asterisk operator, U+2217 ISOtech
        radic: 8730,
        // square root = radical sign,U+221A ISOtech
        prop: 8733,
        // proportional to, U+221D ISOtech
        infin: 8734,
        // infinity, U+221E ISOtech
        ang: 8736,
        // angle, U+2220 ISOamso
        and: 8743,
        // logical and = wedge, U+2227 ISOtech
        or: 8744,
        // logical or = vee, U+2228 ISOtech
        cap: 8745,
        // intersection = cap, U+2229 ISOtech
        cup: 8746,
        // union = cup, U+222A ISOtech
        "int": 8747,
        // integral, U+222B ISOtech
        there4: 8756,
        // therefore, U+2234 ISOtech
        sim: 8764,
        // tilde operator = varies with = similar to,U+223C ISOtech
        // tilde operator is NOT the same character as the tilde, U+007E,although the same glyph might be used to represent both
        cong: 8773,
        // approximately equal to, U+2245 ISOtech
        asymp: 8776,
        // almost equal to = asymptotic to,U+2248 ISOamsr
        ne: 8800,
        // not equal to, U+2260 ISOtech
        equiv: 8801,
        // identical to, U+2261 ISOtech
        le: 8804,
        // less-than or equal to, U+2264 ISOtech
        ge: 8805,
        // greater-than or equal to,U+2265 ISOtech
        sub: 8834,
        // subset of, U+2282 ISOtech
        sup: 8835,
        // superset of, U+2283 ISOtech
        // note that nsup, 'not a superset of, U+2283' is not covered by the Symbol font encoding and is not included. Should it be, for symmetry?It is in ISOamsn  --> <!ENTITY nsub": 8836,  //not a subset of, U+2284 ISOamsn
        sube: 8838,
        // subset of or equal to, U+2286 ISOtech
        supe: 8839,
        // superset of or equal to,U+2287 ISOtech
        oplus: 8853,
        // circled plus = direct sum,U+2295 ISOamsb
        otimes: 8855,
        // circled times = vector product,U+2297 ISOamsb
        perp: 8869,
        // up tack = orthogonal to = perpendicular,U+22A5 ISOtech
        sdot: 8901,
        // dot operator, U+22C5 ISOamsb
        // dot operator is NOT the same character as U+00B7 middle dot
        // Miscellaneous Technical
        lceil: 8968,
        // left ceiling = apl upstile,U+2308 ISOamsc
        rceil: 8969,
        // right ceiling, U+2309 ISOamsc
        lfloor: 8970,
        // left floor = apl downstile,U+230A ISOamsc
        rfloor: 8971,
        // right floor, U+230B ISOamsc
        lang: 9001,
        // left-pointing angle bracket = bra,U+2329 ISOtech
        // lang is NOT the same character as U+003C 'less than' or U+2039 'single left-pointing angle quotation mark'
        rang: 9002,
        // right-pointing angle bracket = ket,U+232A ISOtech
        // rang is NOT the same character as U+003E 'greater than' or U+203A 'single right-pointing angle quotation mark'
        // Geometric Shapes
        loz: 9674,
        // lozenge, U+25CA ISOpub
        // Miscellaneous Symbols
        spades: 9824,
        // black spade suit, U+2660 ISOpub
        // black here seems to mean filled as opposed to hollow
        clubs: 9827,
        // black club suit = shamrock,U+2663 ISOpub
        hearts: 9829,
        // black heart suit = valentine,U+2665 ISOpub
        diams: 9830,
        // black diamond suit, U+2666 ISOpub
        // Latin Extended-A
        OElig: 338,
        //  -- latin capital ligature OE,U+0152 ISOlat2
        oelig: 339,
        //  -- latin small ligature oe, U+0153 ISOlat2
        // ligature is a misnomer, this is a separate character in some languages
        Scaron: 352,
        //  -- latin capital letter S with caron,U+0160 ISOlat2
        scaron: 353,
        //  -- latin small letter s with caron,U+0161 ISOlat2
        Yuml: 376,
        //  -- latin capital letter Y with diaeresis,U+0178 ISOlat2
        // Spacing Modifier Letters
        circ: 710,
        //  -- modifier letter circumflex accent,U+02C6 ISOpub
        tilde: 732,
        // small tilde, U+02DC ISOdia
        // General Punctuation
        ensp: 8194,
        // en space, U+2002 ISOpub
        emsp: 8195,
        // em space, U+2003 ISOpub
        thinsp: 8201,
        // thin space, U+2009 ISOpub
        zwnj: 8204,
        // zero width non-joiner,U+200C NEW RFC 2070
        zwj: 8205,
        // zero width joiner, U+200D NEW RFC 2070
        lrm: 8206,
        // left-to-right mark, U+200E NEW RFC 2070
        rlm: 8207,
        // right-to-left mark, U+200F NEW RFC 2070
        ndash: 8211,
        // en dash, U+2013 ISOpub
        mdash: 8212,
        // em dash, U+2014 ISOpub
        lsquo: 8216,
        // left single quotation mark,U+2018 ISOnum
        rsquo: 8217,
        // right single quotation mark,U+2019 ISOnum
        sbquo: 8218,
        // single low-9 quotation mark, U+201A NEW
        ldquo: 8220,
        // left double quotation mark,U+201C ISOnum
        rdquo: 8221,
        // right double quotation mark,U+201D ISOnum
        bdquo: 8222,
        // double low-9 quotation mark, U+201E NEW
        dagger: 8224,
        // dagger, U+2020 ISOpub
        Dagger: 8225,
        // double dagger, U+2021 ISOpub
        permil: 8240,
        // per mille sign, U+2030 ISOtech
        lsaquo: 8249,
        // single left-pointing angle quotation mark,U+2039 ISO proposed
        // lsaquo is proposed but not yet ISO standardized
        rsaquo: 8250,
        // single right-pointing angle quotation mark,U+203A ISO proposed
        // rsaquo is proposed but not yet ISO standardized
        euro: 8364 //  -- euro sign, U+20AC NEW

      },

      /**
       * Escapes the characters in a <code>String</code> using HTML entities.
       *
       * For example: <tt>"bread" & "butter"</tt> => <tt>&amp;quot;bread&amp;quot; &amp;amp; &amp;quot;butter&amp;quot;</tt>.
       * Supports all known HTML 4.0 entities, including funky accents.
       *
       * * <a href="http://www.w3.org/TR/REC-html32#latin1">HTML 3.2 Character Entities for ISO Latin-1</a>
       * * <a href="http://www.w3.org/TR/REC-html40/sgml/entities.html">HTML 4.0 Character entity references</a>
       * * <a href="http://www.w3.org/TR/html401/charset.html#h-5.3">HTML 4.01 Character References</a>
       * * <a href="http://www.w3.org/TR/html401/charset.html#code-position">HTML 4.01 Code positions</a>
       *
       * @param str {String} the String to escape
       * @return {String} a new escaped String
       * @see #unescape
       */
      escape: function escape(str) {
        return qx.util.StringEscape.escape(str, qx.bom.String.FROM_CHARCODE);
      },

      /**
       * Unescapes a string containing entity escapes to a string
       * containing the actual Unicode characters corresponding to the
       * escapes. Supports HTML 4.0 entities.
       *
       * For example, the string "&amp;lt;Fran&amp;ccedil;ais&amp;gt;"
       * will become "&lt;Fran&ccedil;ais&gt;"
       *
       * If an entity is unrecognized, it is left alone, and inserted
       * verbatim into the result string. e.g. "&amp;gt;&amp;zzzz;x" will
       * become "&gt;&amp;zzzz;x".
       *
       * @param str {String} the String to unescape, may be null
       * @return {var} a new unescaped String
       * @see #escape
       */
      unescape: function unescape(str) {
        return qx.util.StringEscape.unescape(str, qx.bom.String.TO_CHARCODE);
      },

      /**
       * Converts a plain text string into HTML.
       * This is similar to {@link #escape} but converts new lines to
       * <tt>&lt:br&gt:</tt> and preserves whitespaces.
       *
       * @param str {String} the String to convert
       * @return {String} a new converted String
       * @see #escape
       */
      fromText: function fromText(str) {
        return qx.bom.String.escape(str).replace(/(  |\n)/g, function (chr) {
          var map = {
            "  ": " &nbsp;",
            "\n": "<br>"
          };
          return map[chr] || chr;
        });
      },

      /**
       * Converts HTML to plain text.
       *
       * * Strips all HTML tags
       * * converts <tt>&lt:br&gt:</tt> to new line
       * * unescapes HTML entities
       *
       * @param str {String} HTML string to converts
       * @return {String} plain text representation of the HTML string
       */
      toText: function toText(str) {
        return qx.bom.String.unescape(str.replace(/\s+|<([^>])+>/gi, function (chr) //return qx.bom.String.unescape(str.replace(/<\/?[^>]+(>|$)/gi, function(chr)
        {
          if (chr.indexOf("<br") === 0) {
            return "\n";
          } else if (chr.length > 0 && chr.replace(/^\s*/, "").replace(/\s*$/, "") == "") {
            return " ";
          } else {
            return "";
          }
        }));
      }
    },

    /*
    *****************************************************************************
       DEFER
    *****************************************************************************
    */
    defer: function defer(statics) {
      /** Mapping of char codes to HTML entity names */
      statics.FROM_CHARCODE = qx.lang.Object.invert(statics.TO_CHARCODE);
    }
  });
  qx.bom.String.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.util.format.IFormat": {
        "require": true
      },
      "qx.core.IDisposable": {
        "require": true
      },
      "qx.lang.Type": {
        "construct": true
      },
      "qx.locale.Manager": {
        "construct": true
      },
      "qx.locale.Number": {},
      "qx.lang.String": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2006 STZ-IDA, Germany, http://www.stz-ida.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Til Schneider (til132)
  
  ************************************************************************ */

  /**
   * A formatter and parser for numbers.
   *
   * NOTE: Instances of this class must be disposed of after use
   *
   */
  qx.Class.define("qx.util.format.NumberFormat", {
    extend: qx.core.Object,
    implement: [qx.util.format.IFormat, qx.core.IDisposable],

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param locale {String} optional locale to be used
     * @throws {Error} If the argument is not a string.
     */
    construct: function construct(locale) {
      qx.core.Object.constructor.call(this);

      if (arguments.length > 0) {
        if (arguments.length === 1) {
          if (qx.lang.Type.isString(locale)) {
            this.setLocale(locale);
          } else {
            throw new Error("Wrong argument type. String is expected.");
          }
        } else {
          throw new Error("Wrong number of arguments.");
        }
      }

      if (!locale) {
        this.setLocale(qx.locale.Manager.getInstance().getLocale());
        {
          qx.locale.Manager.getInstance().bind("locale", this, "locale");
        }
      }
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /**
       * The minimum number of integer digits (digits before the decimal separator).
       * Missing digits will be filled up with 0 ("19" -> "0019").
       */
      minimumIntegerDigits: {
        check: "Number",
        init: 0
      },

      /**
       * The maximum number of integer digits (superfluous digits will be cut off
       * ("1923" -> "23").
       */
      maximumIntegerDigits: {
        check: "Number",
        nullable: true
      },

      /**
       * The minimum number of fraction digits (digits after the decimal separator).
       * Missing digits will be filled up with 0 ("1.5" -> "1.500")
       */
      minimumFractionDigits: {
        check: "Number",
        init: 0
      },

      /**
       * The maximum number of fraction digits (digits after the decimal separator).
       * Superfluous digits will cause rounding ("1.8277" -> "1.83")
       */
      maximumFractionDigits: {
        check: "Number",
        nullable: true
      },

      /** Whether thousand groupings should be used {e.g. "1,432,234.65"}. */
      groupingUsed: {
        check: "Boolean",
        init: true
      },

      /** The prefix to put before the number {"EUR " -> "EUR 12.31"}. */
      prefix: {
        check: "String",
        init: "",
        event: "changeNumberFormat"
      },

      /** Sets the postfix to put after the number {" %" -> "56.13 %"}. */
      postfix: {
        check: "String",
        init: "",
        event: "changeNumberFormat"
      },

      /** Locale used */
      locale: {
        check: "String",
        init: null,
        event: "changeLocale"
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      /**
       * Formats a number.
       *
       * @param num {Number} the number to format.
       * @return {String} the formatted number as a string.
       */
      format: function format(num) {
        // handle special cases
        if (isNaN(num)) {
          return "NaN";
        }

        switch (num) {
          case Infinity:
            return "Infinity";

          case -Infinity:
            return "-Infinity";
        }

        var negative = num < 0;

        if (negative) {
          num = -num;
        }

        if (this.getMaximumFractionDigits() != null) {
          // Do the rounding
          var mover = Math.pow(10, this.getMaximumFractionDigits());
          num = Math.round(num * mover) / mover;
        }

        var integerDigits = String(Math.floor(num)).length;
        var numStr = "" + num; // Prepare the integer part

        var integerStr = numStr.substring(0, integerDigits);

        while (integerStr.length < this.getMinimumIntegerDigits()) {
          integerStr = "0" + integerStr;
        }

        if (this.getMaximumIntegerDigits() != null && integerStr.length > this.getMaximumIntegerDigits()) {
          // NOTE: We cut off even though we did rounding before, because there
          //     may be rounding errors ("12.24000000000001" -> "12.24")
          integerStr = integerStr.substring(integerStr.length - this.getMaximumIntegerDigits());
        } // Prepare the fraction part


        var fractionStr = numStr.substring(integerDigits + 1);

        while (fractionStr.length < this.getMinimumFractionDigits()) {
          fractionStr += "0";
        }

        if (this.getMaximumFractionDigits() != null && fractionStr.length > this.getMaximumFractionDigits()) {
          // We have already rounded -> Just cut off the rest
          fractionStr = fractionStr.substring(0, this.getMaximumFractionDigits());
        } // Add the thousand groupings


        if (this.getGroupingUsed()) {
          var origIntegerStr = integerStr;
          integerStr = "";
          var groupPos;

          for (groupPos = origIntegerStr.length; groupPos > 3; groupPos -= 3) {
            integerStr = "" + qx.locale.Number.getGroupSeparator(this.getLocale()) + origIntegerStr.substring(groupPos - 3, groupPos) + integerStr;
          }

          integerStr = origIntegerStr.substring(0, groupPos) + integerStr;
        } // Workaround: prefix and postfix are null even their defaultValue is "" and
        //             allowNull is set to false?!?


        var prefix = this.getPrefix() ? this.getPrefix() : "";
        var postfix = this.getPostfix() ? this.getPostfix() : ""; // Assemble the number

        var str = prefix + (negative ? "-" : "") + integerStr;

        if (fractionStr.length > 0) {
          str += "" + qx.locale.Number.getDecimalSeparator(this.getLocale()) + fractionStr;
        }

        str += postfix;
        return str;
      },

      /**
       * Parses a number.
       *
       * @param str {String} the string to parse.
       * @return {Double} the number.
       * @throws {Error} If the number string does not match the number format.
       */
      parse: function parse(str) {
        // use the escaped separators for regexp
        var groupSepEsc = qx.lang.String.escapeRegexpChars(qx.locale.Number.getGroupSeparator(this.getLocale()) + "");
        var decimalSepEsc = qx.lang.String.escapeRegexpChars(qx.locale.Number.getDecimalSeparator(this.getLocale()) + "");
        var regex = new RegExp("^(" + qx.lang.String.escapeRegexpChars(this.getPrefix()) + ")?([-+]){0,1}" + "([0-9]{1,3}(?:" + groupSepEsc + "{0,1}[0-9]{3}){0,}){0,1}" + "(" + decimalSepEsc + "\\d+){0,1}(" + qx.lang.String.escapeRegexpChars(this.getPostfix()) + ")?$");
        var hit = regex.exec(str);

        if (hit == null) {
          throw new Error("Number string '" + str + "' does not match the number format");
        } // hit[1] = potential prefix


        var negative = hit[2] == "-";
        var integerStr = hit[3] || "0";
        var fractionStr = hit[4]; // hit[5] = potential postfix
        // Remove the thousand groupings

        integerStr = integerStr.replace(new RegExp(groupSepEsc, "g"), "");
        var asStr = (negative ? "-" : "") + integerStr;

        if (fractionStr != null && fractionStr.length != 0) {
          // Remove the leading decimal separator from the fractions string
          fractionStr = fractionStr.replace(new RegExp(decimalSepEsc), "");
          asStr += "." + fractionStr;
        }

        return parseFloat(asStr);
      }
    },
    destruct: function destruct() {
      {
        qx.locale.Manager.getInstance().removeRelatedBindings(this);
      }
    }
  });
  qx.util.format.NumberFormat.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.LayoutItem": {
        "construct": true,
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2007-2008 Derrell Lipman
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Derrell Lipman (derrell)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * All of the resizing information about a column.
   *
   *  This is used internally by qx.ui.table and qx.ui.progressive's table and
   *  may be used for other widgets as well.
   */
  qx.Class.define("qx.ui.core.ColumnData", {
    extend: qx.ui.core.LayoutItem,
    construct: function construct() {
      qx.ui.core.LayoutItem.constructor.call(this);
      this.setColumnWidth("auto");
    },
    members: {
      __computedWidth__P_208_0: null,
      // overridden
      renderLayout: function renderLayout(left, top, width, height) {
        this.__computedWidth__P_208_0 = width;
      },

      /**
       * Get the computed width of the column.
       * @return {Integer} Computed column width
       */
      getComputedWidth: function getComputedWidth() {
        return this.__computedWidth__P_208_0;
      },

      /**
       * Get the column's flex value
       *
       * @return {Integer} The column's flex value
       */
      getFlex: function getFlex() {
        return this.getLayoutProperties().flex || 0;
      },

      /**
       * Set the column width. The column width can be one of the following
       * values:
       *
       * * Pixels: e.g. <code>23</code>
       * * Autosized: <code>"auto"</code>
       * * Flex: e.g. <code>"1*"</code>
       * * Percent: e.g. <code>"33%"</code>
       *
       * @param width {Integer|String} The column width
       * @param flex {Integer?0} Optional flex value of the column
       */
      setColumnWidth: function setColumnWidth(width, flex) {
        var flex = flex || 0;
        var percent = null;

        if (typeof width == "number") {
          this.setWidth(width);
        } else if (typeof width == "string") {
          if (width == "auto") {
            flex = 1;
          } else {
            var match = width.match(/^[0-9]+(?:\.[0-9]+)?([%\*])$/);

            if (match) {
              if (match[1] == "*") {
                flex = parseFloat(width);
              } else {
                percent = width;
              }
            }
          }
        }

        this.setLayoutProperties({
          flex: flex,
          width: percent
        });
      }
    },
    environment: {
      "qx.tableResizeDebug": false
    }
  });
  qx.ui.core.ColumnData.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2007 Derrell Lipman
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Derrell Lipman (derrell)
  
  ************************************************************************ */

  /**
   * An abstract resize behavior.  All resize behaviors should extend this
   * class.
   */
  qx.Class.define("qx.ui.table.columnmodel.resizebehavior.Abstract", {
    type: "abstract",
    extend: qx.core.Object,

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      /**
       * Called when the ResizeTableColumnModel is initialized, and upon loading of
       * a new TableModel, to allow the Resize Behaviors to know how many columns
       * are in use.
       *
       * @abstract
       * @param numColumns {Integer} The number of columns in use.
       * @throws {Error} the abstract function warning.
       */
      _setNumColumns: function _setNumColumns(numColumns) {
        throw new Error("_setNumColumns is abstract");
      },

      /**
       * Called when the table has first been rendered.
       *
       * @abstract
       * @param event {var} The <i>onappear</i> event object.
       * @param forceRefresh {Boolean?false} Whether a refresh should be forced
       * @throws {Error} the abstract function warning.
       */
      onAppear: function onAppear(event, forceRefresh) {
        throw new Error("onAppear is abstract");
      },

      /**
       * Called when the table width changes due to either a window size change
       * or a parent object changing size causing the table to change size.
       *
       * @abstract
       * @param event {var} The <i>tableWidthChanged</i> event object.
       * @throws {Error} the abstract function warning.
       */
      onTableWidthChanged: function onTableWidthChanged(event) {
        throw new Error("onTableWidthChanged is abstract");
      },

      /**
       * Called when the use of vertical scroll bar in the table changes, either
       * from present to not present, or vice versa.
       *
       * @abstract
       * @param event {var} The <i>verticalScrollBarChanged</i> event object.  This event has data,
       *     obtained via event.getValue(), which is a boolean indicating whether a
       *     vertical scroll bar is now present.
       * @throws {Error} the abstract function warning.
       */
      onVerticalScrollBarChanged: function onVerticalScrollBarChanged(event) {
        throw new Error("onVerticalScrollBarChanged is abstract");
      },

      /**
       * Called when a column width is changed.
       *
       * @abstract
       * @param event {var} The <i>widthChanged</i> event object.  This event has data, obtained via
       *     event.getValue(), which is an object with three properties: the column
       *     which changed width (data.col), the old width (data.oldWidth) and the new
       *     width (data.newWidth).
       * @throws {Error} the abstract function warning.
       */
      onColumnWidthChanged: function onColumnWidthChanged(event) {
        throw new Error("onColumnWidthChanged is abstract");
      },

      /**
       * Called when a column visibility is changed.
       *
       * @abstract
       * @param event {var} The <i>visibilityChanged</i> event object.  This event has data, obtained
       *     via event.getValue(), which is an object with two properties: the column
       *     which changed width (data.col) and the new visibility of the column
       *     (data.visible).
       * @throws {Error} the abstract function warning.
       */
      onVisibilityChanged: function onVisibilityChanged(event) {
        throw new Error("onVisibilityChanged is abstract");
      },

      /**
       * Determine the inner width available to columns in the table.
       *
       * @return {Integer} The available width
       */
      _getAvailableWidth: function _getAvailableWidth() {
        var tableColumnModel = this.getTableColumnModel(); // Get the inner width off the table

        var table = tableColumnModel.getTable();

        var scrollerArr = table._getPaneScrollerArr();

        if (!scrollerArr[0] || !scrollerArr[0].getLayoutParent().getBounds()) {
          return null;
        }

        var scrollerParentWidth = scrollerArr[0].getLayoutParent().getBounds().width;
        var lastScroller = scrollerArr[scrollerArr.length - 1];
        scrollerParentWidth -= lastScroller.getPaneInsetRight();
        return scrollerParentWidth;
      }
    }
  });
  qx.ui.table.columnmodel.resizebehavior.Abstract.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.ui.core.ColumnData": {
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.table.columnmodel.resizebehavior.Abstract": {
        "construct": true,
        "require": true
      },
      "qx.ui.layout.HBox": {
        "construct": true
      },
      "qx.util.DeferredCall": {
        "construct": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2007 Derrell Lipman
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Derrell Lipman (derrell)
  
  ************************************************************************ */

  /**
   * The default resize behavior.  Until a resize model is loaded, the default
   * behavior is to:
   * <ol>
   *   <li>
   *     Upon the table initially appearing, and upon any window resize, divide
   *     the table space equally between the visible columns.
   *   </li>
   *   <li>
   *     When a column is increased in width, all columns to its right are
   *     pushed to the right with no change to their widths.  This may push some
   *     columns off the right edge of the table, causing a horizontal scroll
   *     bar to appear.
   *   </li>
   *   <li>
   *     When a column is decreased in width, if the total width of all columns
   *     is <i>greater than</i> the table width, no additional column width
   *     change is made.
   *   </li>
   *   <li>
   *     When a column is decreased in width, if the total width of all columns
   *     is <i>less than</i> the table width, the visible column
   *     immediately to the right of the column which decreased in width has its
   *     width increased to fill the remaining space.
   *   </li>
   * </ol>
   *
   * A resize model may be loaded to provide more guidance on how to adjust
   * column width upon each of the events: initial appear, window resize, and
   * column resize. *** TO BE FILLED IN ***
   *
   * @require(qx.ui.core.ColumnData)
   */
  qx.Class.define("qx.ui.table.columnmodel.resizebehavior.Default", {
    extend: qx.ui.table.columnmodel.resizebehavior.Abstract,
    construct: function construct() {
      qx.ui.table.columnmodel.resizebehavior.Abstract.constructor.call(this);
      this.__resizeColumnData__P_199_0 = []; // This layout is not connected to a widget but to this class. This class
      // must implement the method "getLayoutChildren", which must return all
      // columns (LayoutItems) which should be recalculated. The call
      // "layout.renderLayout" will call the method "renderLayout" on each column
      // data object
      // The advantage of the use of the normal layout manager is that the
      // semantics of flex and percent are exactly the same as in the widget code.

      this.__layout__P_199_1 = new qx.ui.layout.HBox();

      this.__layout__P_199_1.connectToWidget(this);

      this.__deferredComputeColumnsFlexWidth__P_199_2 = new qx.util.DeferredCall(this._computeColumnsFlexWidth, this);
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /**
       * A function to instantiate a resize behavior column data object.
       */
      newResizeBehaviorColumnData: {
        check: "Function",
        init: function init(obj) {
          return new qx.ui.core.ColumnData();
        }
      },

      /**
       * Whether to reinitialize default widths on each appear event.
       * Typically, one would want to initialize the default widths only upon
       * the first appearance of the table, but the original behavior was to
       * reinitialize it even if the table is hidden and then reshown
       * (e.g. it's in a pageview and the page is switched and then switched
       * back).
       */
      initializeWidthsOnEveryAppear: {
        check: "Boolean",
        init: false
      },

      /**
       * The table column model in use.  Of particular interest is the method
       * <i>getTable</i> which is a reference to the table widget.  This allows
       * access to any other features of the table, for use in calculating widths
       * of columns.
       */
      tableColumnModel: {
        check: "qx.ui.table.columnmodel.Resize"
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __layout__P_199_1: null,
      __layoutChildren__P_199_3: null,
      __resizeColumnData__P_199_0: null,
      __deferredComputeColumnsFlexWidth__P_199_2: null,

      /**
       * Whether we have initialized widths on the first appear yet
       */
      __widthsInitialized__P_199_4: false,

      /**
       * Set the width of a column.
       *
       * @param col {Integer} The column whose width is to be set
       *
       * @param width {Integer|String}
       *   The width of the specified column.  The width may be specified as
       *   integer number of pixels (e.g. 100), a string representing percentage
       *   of the inner width of the Table (e.g. "25%"), or a string
       *   representing a flex width (e.g. "1*").
       *
       * @param flex {Integer?0} Optional flex value of the column
       *
       * @throws {Error}
       *   Error is thrown if the provided column number is out of the range.
       */
      setWidth: function setWidth(col, width, flex) {
        // Ensure the column is within range
        if (col >= this.__resizeColumnData__P_199_0.length) {
          throw new Error("Column number out of range");
        } // Set the new width


        this.__resizeColumnData__P_199_0[col].setColumnWidth(width, flex);

        this.__deferredComputeColumnsFlexWidth__P_199_2.schedule();
      },

      /**
       * Set the minimum width of a column.
       *
       * @param col {Integer}
       *   The column whose minimum width is to be set
       *
       * @param width {Integer}
       *   The minimum width of the specified column.
       *
       *
       * @throws {Error}
       *   Error is thrown if the provided column number is out of the range.
       */
      setMinWidth: function setMinWidth(col, width) {
        // Ensure the column is within range
        if (col >= this.__resizeColumnData__P_199_0.length) {
          throw new Error("Column number out of range");
        } // Set the new width


        this.__resizeColumnData__P_199_0[col].setMinWidth(width);

        this.__deferredComputeColumnsFlexWidth__P_199_2.schedule();
      },

      /**
       * Set the maximum width of a column.
       *
       * @param col {Integer}
       *   The column whose maximum width is to be set
       *
       * @param width {Integer}
       *   The maximum width of the specified column.
       *
       *
       * @throws {Error}
       *   Error is thrown if the provided column number is out of the range.
       */
      setMaxWidth: function setMaxWidth(col, width) {
        // Ensure the column is within range
        if (col >= this.__resizeColumnData__P_199_0.length) {
          throw new Error("Column number out of range");
        } // Set the new width


        this.__resizeColumnData__P_199_0[col].setMaxWidth(width);

        this.__deferredComputeColumnsFlexWidth__P_199_2.schedule();
      },

      /**
       * Set any or all of the width, minimum width, and maximum width of a
       * column in a single call.
       *
       * @param col {Integer}
       *   The column whose attributes are to be changed
       *
       * @param map {Map}
       *   A map containing any or all of the property names "width", "minWidth",
       *   and "maxWidth".  The property values are as described for
       *   {@link #setWidth}, {@link #setMinWidth} and {@link #setMaxWidth}
       *   respectively.
       *
       *
       * @throws {Error}
       *   Error is thrown if the provided column number is out of the range.
       */
      set: function set(col, map) {
        for (var prop in map) {
          switch (prop) {
            case "width":
              this.setWidth(col, map[prop]);
              break;

            case "minWidth":
              this.setMinWidth(col, map[prop]);
              break;

            case "maxWidth":
              this.setMaxWidth(col, map[prop]);
              break;

            default:
              throw new Error("Unknown property: " + prop);
          }
        }
      },
      // overloaded
      onAppear: function onAppear(event, forceRefresh) {
        // If we haven't initialized widths at least once, or
        // they want us to reinitialize widths on every appear event...
        if (forceRefresh === true || !this.__widthsInitialized__P_199_4 || this.getInitializeWidthsOnEveryAppear()) {
          // Calculate column widths
          this._computeColumnsFlexWidth(); // Track that we've initialized widths at least once


          this.__widthsInitialized__P_199_4 = true;
        }
      },
      // overloaded
      onTableWidthChanged: function onTableWidthChanged(event) {
        this._computeColumnsFlexWidth();
      },
      // overloaded
      onVerticalScrollBarChanged: function onVerticalScrollBarChanged(event) {
        this._computeColumnsFlexWidth();
      },
      // overloaded
      onColumnWidthChanged: function onColumnWidthChanged(event) {
        // Extend the next column to fill blank space
        this._extendNextColumn(event);
      },
      // overloaded
      onVisibilityChanged: function onVisibilityChanged(event) {
        // Event data properties: col, visible
        var data = event.getData(); // If a column just became visible, resize all columns.

        if (data.visible) {
          this._computeColumnsFlexWidth();

          return;
        } // Extend the last column to fill blank space


        this._extendLastColumn(event);
      },
      // overloaded
      _setNumColumns: function _setNumColumns(numColumns) {
        var colData = this.__resizeColumnData__P_199_0; // Are there now fewer (or the same number of) columns than there were
        // previously?

        if (numColumns <= colData.length) {
          // Yup.  Delete the extras.
          colData.splice(numColumns, colData.length);
          return;
        } // There are more columns than there were previously.  Allocate more.


        for (var i = colData.length; i < numColumns; i++) {
          colData[i] = this.getNewResizeBehaviorColumnData()();
          colData[i].columnNumber = i;
        }
      },

      /**
       * This method is required by the box layout. If returns an array of items
       * to relayout.
       *
       * @return {qx.ui.core.ColumnData[]} The list of column data object to layout.
       */
      getLayoutChildren: function getLayoutChildren() {
        return this.__layoutChildren__P_199_3;
      },

      /**
       * Computes the width of all flexible children.
       *
       */
      _computeColumnsFlexWidth: function _computeColumnsFlexWidth() {
        this.__deferredComputeColumnsFlexWidth__P_199_2.cancel();

        var width = this._getAvailableWidth();

        if (width === null) {
          return;
        }

        var tableColumnModel = this.getTableColumnModel();
        var visibleColumns = tableColumnModel.getVisibleColumns();
        var visibleColumnsLength = visibleColumns.length;
        var colData = this.__resizeColumnData__P_199_0;
        var i, l;

        if (visibleColumnsLength === 0) {
          return;
        } // Create an array of the visible columns


        var columns = [];

        for (i = 0; i < visibleColumnsLength; i++) {
          columns.push(colData[visibleColumns[i]]);
        }

        this.__layoutChildren__P_199_3 = columns;

        this.__clearLayoutCaches__P_199_5(); // Use a horizontal box layout to determine the available width.


        this.__layout__P_199_1.renderLayout(width, 100, {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }); // Now that we've calculated the width, set it.


        for (i = 0, l = columns.length; i < l; i++) {
          var colWidth = columns[i].getComputedWidth();
          tableColumnModel.setColumnWidth(visibleColumns[i], colWidth);
        }
      },

      /**
       * Clear all layout caches of the column datas.
       */
      __clearLayoutCaches__P_199_5: function __clearLayoutCaches__P_199_5() {
        this.__layout__P_199_1.invalidateChildrenCache();

        var children = this.__layoutChildren__P_199_3;

        for (var i = 0, l = children.length; i < l; i++) {
          children[i].invalidateLayoutCache();
        }
      },

      /**
       * Extend the visible column to right of the column which just changed
       * width, to fill any available space within the inner width of the table.
       * This means that if the sum of the widths of all columns exceeds the
       * inner width of the table, no change is made.  If, on the other hand,
       * the sum of the widths of all columns is less than the inner width of
       * the table, the visible column to the right of the column which just
       * changed width is extended to take up the width available within the
       * inner width of the table.
       *
       *
       * @param event {qx.event.type.Data}
       *   The event object.
       *
       */
      _extendNextColumn: function _extendNextColumn(event) {
        var tableColumnModel = this.getTableColumnModel(); // Event data properties: col, oldWidth, newWidth

        var data = event.getData();
        var visibleColumns = tableColumnModel.getVisibleColumns(); // Determine the available width

        var width = this._getAvailableWidth(); // Determine the number of visible columns


        var numColumns = visibleColumns.length; // Did this column become longer than it was?

        if (data.newWidth > data.oldWidth) {
          // Yup.  Don't resize anything else.  The other columns will just get
          // pushed off and require scrollbars be added (if not already there).
          return;
        } // This column became shorter.  See if we no longer take up the full
        // space that's available to us.


        var i;
        var nextCol;
        var widthUsed = 0;

        for (i = 0; i < numColumns; i++) {
          widthUsed += tableColumnModel.getColumnWidth(visibleColumns[i]);
        } // If the used width is less than the available width...


        if (widthUsed < width) {
          // ... then determine the next visible column
          for (i = 0; i < visibleColumns.length; i++) {
            if (visibleColumns[i] == data.col) {
              nextCol = visibleColumns[i + 1];
              break;
            }
          }

          if (nextCol) {
            // Make the next column take up the available space.
            var newWidth = width - (widthUsed - tableColumnModel.getColumnWidth(nextCol));
            tableColumnModel.setColumnWidth(nextCol, newWidth);
          }
        }
      },

      /**
       * If a column was just made invisible, extend the last column to fill any
       * available space within the inner width of the table.  This means that
       * if the sum of the widths of all columns exceeds the inner width of the
       * table, no change is made.  If, on the other hand, the sum of the widths
       * of all columns is less than the inner width of the table, the last
       * column is extended to take up the width available within the inner
       * width of the table.
       *
       *
       * @param event {qx.event.type.Data}
       *   The event object.
       *
       */
      _extendLastColumn: function _extendLastColumn(event) {
        var tableColumnModel = this.getTableColumnModel(); // Event data properties: col, visible

        var data = event.getData(); // If the column just became visible, don't make any width changes

        if (data.visible) {
          return;
        } // Get the array of visible columns


        var visibleColumns = tableColumnModel.getVisibleColumns(); // If no columns are visible...

        if (visibleColumns.length == 0) {
          return;
        } // Determine the available width


        var width = this._getAvailableWidth(tableColumnModel); // Determine the number of visible columns


        var numColumns = visibleColumns.length; // See if we no longer take up the full space that's available to us.

        var i;
        var lastCol;
        var widthUsed = 0;

        for (i = 0; i < numColumns; i++) {
          widthUsed += tableColumnModel.getColumnWidth(visibleColumns[i]);
        } // If the used width is less than the available width...


        if (widthUsed < width) {
          // ... then get the last visible column
          lastCol = visibleColumns[visibleColumns.length - 1]; // Make the last column take up the available space.

          var newWidth = width - (widthUsed - tableColumnModel.getColumnWidth(lastCol));
          tableColumnModel.setColumnWidth(lastCol, newWidth);
        }
      },

      /**
       * Returns an array of the resizing information of a column.
       *
       * @return {qx.ui.core.ColumnData[]} array of the resizing information of a column.
       */
      _getResizeColumnData: function _getResizeColumnData() {
        return this.__resizeColumnData__P_199_0;
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this.__resizeColumnData__P_199_0 = this.__layoutChildren__P_199_3 = null;

      this._disposeObjects("__layout__P_199_1", "__deferredComputeColumnsFlexWidth__P_199_2");
    }
  });
  qx.ui.table.columnmodel.resizebehavior.Default.$$dbClassInfo = $$dbClassInfo;
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
       2006 STZ-IDA, Germany, http://www.stz-ida.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Til Schneider (til132)
  
  ************************************************************************ */

  /**
   * Interface for a row renderer.
   */
  qx.Interface.define("qx.ui.table.IRowRenderer", {
    members: {
      /**
       * Updates a data row.
       *
       * The rowInfo map contains the following properties:
       * <ul>
       * <li>rowData (var): contains the row data for the row.
       *   The kind of this object depends on the table model, see
       *   {@link ITableModel#getRowData()}</li>
       * <li>row (int): the model index of the row.</li>
       * <li>selected (boolean): whether a cell in this row is selected.</li>
       * <li>focusedRow (boolean): whether the focused cell is in this row.</li>
       * <li>table (qx.ui.table.Table): the table the row belongs to.</li>
       * </ul>
       *
       * @abstract
       * @param rowInfo {Map} A map containing the information about the row to
       *      update.
       * @param rowElement {Element} the DOM element that renders the data row.
       */
      updateDataRowElement: function updateDataRowElement(rowInfo, rowElement) {},

      /**
       * Get the row's height CSS style taking the box model into account
       *
       * @param height {Integer} The row's (border-box) height in pixel
       */
      getRowHeightStyle: function getRowHeightStyle(height) {},

      /**
       * Create a style string, which will be set as the style property of the row.
       *
       * @param rowInfo {Map} A map containing the information about the row to
       *      update. See {@link #updateDataRowElement} for more information.
       */
      createRowStyle: function createRowStyle(rowInfo) {},

      /**
       * Create a HTML class string, which will be set as the class property of the row.
       *
       * @param rowInfo {Map} A map containing the information about the row to
       *      update. See {@link #updateDataRowElement} for more information.
       */
      getRowClass: function getRowClass(rowInfo) {}
    }
  });
  qx.ui.table.IRowRenderer.$$dbClassInfo = $$dbClassInfo;
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
      "qx.ui.table.IRowRenderer": {
        "require": true
      },
      "qx.theme.manager.Meta": {
        "construct": true
      },
      "qx.theme.manager.Font": {},
      "qx.theme.manager.Color": {},
      "qx.bom.element.Style": {},
      "qx.bom.Font": {},
      "qx.bom.client.Css": {
        "require": true
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "css.boxmodel": {
          "className": "qx.bom.client.Css"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2006 STZ-IDA, Germany, http://www.stz-ida.de
       2007 Visionet GmbH, http://www.visionet.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Til Schneider (til132) STZ-IDA
       * Dietrich Streifert (level420) Visionet
  
  ************************************************************************ */

  /**
   * The default data row renderer.
   */
  qx.Class.define("qx.ui.table.rowrenderer.Default", {
    extend: qx.core.Object,
    implement: qx.ui.table.IRowRenderer,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      this.initThemeValues(); // dynamic theme switch

      {
        qx.theme.manager.Meta.getInstance().addListener("changeTheme", this.initThemeValues, this);
      }
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /** Whether the focused row should be highlighted. */
      highlightFocusRow: {
        check: "Boolean",
        init: true
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      _colors: null,
      _fontStyle: null,
      _fontStyleString: null,

      /**
       * Initializes the colors from the color theme.
       * @internal
       */
      initThemeValues: function initThemeValues() {
        this._fontStyleString = "";
        this._fontStyle = {};
        this._colors = {}; // link to font theme

        this._renderFont(qx.theme.manager.Font.getInstance().resolve("default")); // link to color theme


        var colorMgr = qx.theme.manager.Color.getInstance();
        this._colors.bgcolFocusedSelected = colorMgr.resolve("table-row-background-focused-selected");
        this._colors.bgcolFocused = colorMgr.resolve("table-row-background-focused");
        this._colors.bgcolSelected = colorMgr.resolve("table-row-background-selected");
        this._colors.bgcolEven = colorMgr.resolve("table-row-background-even");
        this._colors.bgcolOdd = colorMgr.resolve("table-row-background-odd");
        this._colors.colSelected = colorMgr.resolve("table-row-selected");
        this._colors.colNormal = colorMgr.resolve("table-row");
        this._colors.horLine = colorMgr.resolve("table-row-line");
      },

      /**
       * the sum of the vertical insets. This is needed to compute the box model
       * independent size
       */
      _insetY: 1,
      // borderBottom

      /**
       * Render the new font and update the table pane content
       * to reflect the font change.
       *
       * @param font {qx.bom.Font} The font to use for the table row
       */
      _renderFont: function _renderFont(font) {
        if (font) {
          this._fontStyle = font.getStyles();
          this._fontStyleString = qx.bom.element.Style.compile(this._fontStyle);
          this._fontStyleString = this._fontStyleString.replace(/"/g, "'");
        } else {
          this._fontStyleString = "";
          this._fontStyle = qx.bom.Font.getDefaultStyles();
        }
      },
      // interface implementation
      updateDataRowElement: function updateDataRowElement(rowInfo, rowElem) {
        var fontStyle = this._fontStyle;
        var style = rowElem.style; // set font styles

        qx.bom.element.Style.setStyles(rowElem, fontStyle);

        if (rowInfo.focusedRow && this.getHighlightFocusRow()) {
          style.backgroundColor = rowInfo.selected ? this._colors.bgcolFocusedSelected : this._colors.bgcolFocused;
        } else {
          if (rowInfo.selected) {
            style.backgroundColor = this._colors.bgcolSelected;
          } else {
            style.backgroundColor = rowInfo.row % 2 == 0 ? this._colors.bgcolEven : this._colors.bgcolOdd;
          }
        }

        style.color = rowInfo.selected ? this._colors.colSelected : this._colors.colNormal;
        style.borderBottom = "1px solid " + this._colors.horLine;
      },

      /**
       * Get the row's height CSS style taking the box model into account
       *
       * @param height {Integer} The row's (border-box) height in pixel
       * @return {String} CSS rule for the row height
       */
      getRowHeightStyle: function getRowHeightStyle(height) {
        if (qx.core.Environment.get("css.boxmodel") == "content") {
          height -= this._insetY;
        }

        return "height:" + height + "px;";
      },
      // interface implementation
      createRowStyle: function createRowStyle(rowInfo) {
        var rowStyle = [];
        rowStyle.push(";");
        rowStyle.push(this._fontStyleString);
        rowStyle.push("background-color:");

        if (rowInfo.focusedRow && this.getHighlightFocusRow()) {
          rowStyle.push(rowInfo.selected ? this._colors.bgcolFocusedSelected : this._colors.bgcolFocused);
        } else {
          if (rowInfo.selected) {
            rowStyle.push(this._colors.bgcolSelected);
          } else {
            rowStyle.push(rowInfo.row % 2 == 0 ? this._colors.bgcolEven : this._colors.bgcolOdd);
          }
        }

        rowStyle.push(";color:");
        rowStyle.push(rowInfo.selected ? this._colors.colSelected : this._colors.colNormal);
        rowStyle.push(";border-bottom: 1px solid ", this._colors.horLine);
        return rowStyle.join("");
      },
      getRowClass: function getRowClass(rowInfo) {
        return "";
      },

      /**
       * Add extra attributes to each row.
       *
       * @param rowInfo {Object}
       *   The following members are available in rowInfo:
       *   <dl>
       *     <dt>table {qx.ui.table.Table}</dt>
       *     <dd>The table object</dd>
       *
       *     <dt>styleHeight {Integer}</dt>
       *     <dd>The height of this (and every) row</dd>
       *
       *     <dt>row {Integer}</dt>
       *     <dd>The number of the row being added</dd>
       *
       *     <dt>selected {Boolean}</dt>
       *     <dd>Whether the row being added is currently selected</dd>
       *
       *     <dt>focusedRow {Boolean}</dt>
       *     <dd>Whether the row being added is currently focused</dd>
       *
       *     <dt>rowData {Array}</dt>
       *     <dd>The array row from the data model of the row being added</dd>
       *   </dl>
       *
       * @return {String}
       *   Any additional attributes and their values that should be added to the
       *   div tag for the row.
       */
      getRowAttributes: function getRowAttributes(rowInfo) {
        return "role=row "; // Space important!
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this._colors = this._fontStyle = this._fontStyleString = null; // remove dynamic theme listener

      {
        qx.theme.manager.Meta.getInstance().removeListener("changeTheme", this.initThemeValues, this);
      }
    }
  });
  qx.ui.table.rowrenderer.Default.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.form.Button": {
        "construct": true,
        "require": true
      },
      "qx.ui.core.FocusHandler": {},
      "qx.ui.menu.Manager": {}
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
  
  ************************************************************************ */

  /**
   * A button which opens the connected menu when tapping on it.
   */
  qx.Class.define("qx.ui.form.MenuButton", {
    extend: qx.ui.form.Button,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param label {String} Initial label
     * @param icon {String?null} Initial icon
     * @param menu {qx.ui.menu.Menu} Connect to menu instance
     */
    construct: function construct(label, icon, menu) {
      qx.ui.form.Button.constructor.call(this, label, icon); // Initialize properties

      if (menu != null) {
        this.setMenu(menu);
      } // ARIA attrs


      this.getContentElement().setAttribute("role", "button");
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /** The menu instance to show when tapping on the button */
      menu: {
        check: "qx.ui.menu.Menu",
        nullable: true,
        apply: "_applyMenu",
        event: "changeMenu"
      },
      // overridden
      appearance: {
        refine: true,
        init: "menubutton"
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      /*
      ---------------------------------------------------------------------------
        PROPERTY APPLY ROUTINES
      ---------------------------------------------------------------------------
      */
      // overridden
      _applyVisibility: function _applyVisibility(value, old) {
        qx.ui.form.MenuButton.superclass.prototype._applyVisibility.call(this, value, old); // hide the menu too


        var menu = this.getMenu();

        if (value != "visible" && menu) {
          menu.hide();
        }
      },
      // property apply
      _applyMenu: function _applyMenu(value, old) {
        if (old) {
          old.removeListener("changeVisibility", this._onMenuChange, this);
          old.resetOpener();
        }

        if (value) {
          value.addListener("changeVisibility", this._onMenuChange, this);
          value.setOpener(this);
          value.removeState("submenu");
          value.removeState("contextmenu");
        } // ARIA attrs


        var contentEl = this.getContentElement();

        if (!contentEl) {
          return;
        }

        if (value) {
          contentEl.setAttribute("aria-haspopup", "menu");
          contentEl.setAttribute("aria-expanded", value.isVisible());
          contentEl.setAttribute("aria-controls", value.getContentElement().getAttribute("id"));
        } else {
          contentEl.removeAttribute("aria-haspopup");
          contentEl.removeAttribute("aria-expanded");
          contentEl.removeAttribute("aria-controls");
        }
      },

      /*
      ---------------------------------------------------------------------------
        HELPER METHODS
      ---------------------------------------------------------------------------
      */

      /**
       * Positions and shows the attached menu widget.
       *
       * @param selectFirst {Boolean?false} Whether the first menu button should be selected
       */
      open: function open(selectFirst) {
        var menu = this.getMenu();

        if (menu) {
          // Focus this button when the menu opens
          if (this.isFocusable() && !qx.ui.core.FocusHandler.getInstance().isFocused(this)) {
            this.focus();
          } // Hide all menus first


          qx.ui.menu.Manager.getInstance().hideAll(); // Open the attached menu

          menu.setOpener(this);
          menu.open(); // Select first item

          if (selectFirst) {
            var first = menu.getSelectables()[0];

            if (first) {
              menu.setSelectedButton(first);
            }
          }
        }
      },

      /*
      ---------------------------------------------------------------------------
        EVENT LISTENERS
      ---------------------------------------------------------------------------
      */

      /**
       * Listener for visibility property changes of the attached menu
       *
       * @param e {qx.event.type.Data} Property change event
       */
      _onMenuChange: function _onMenuChange(e) {
        var menu = this.getMenu();
        var menuVisible = menu.isVisible();

        if (menuVisible) {
          this.addState("pressed");
        } else {
          this.removeState("pressed");
        } // ARIA attrs


        this.getContentElement().setAttribute("aria-expanded", menuVisible);
      },
      // overridden
      _onPointerDown: function _onPointerDown(e) {
        // call the base function to get into the capture phase [BUG #4340]
        qx.ui.form.MenuButton.superclass.prototype._onPointerDown.call(this, e); // only open on left clicks [BUG #5125]


        if (e.getButton() != "left") {
          return;
        }

        var menu = this.getMenu();

        if (menu) {
          // Toggle sub menu visibility
          if (!menu.isVisible()) {
            this.open();
          } else {
            menu.exclude();
          } // Event is processed, stop it for others


          e.stopPropagation();
        }
      },
      // overridden
      _onPointerUp: function _onPointerUp(e) {
        // call base for firing the execute event
        qx.ui.form.MenuButton.superclass.prototype._onPointerUp.call(this, e); // Just stop propagation to stop menu manager
        // from getting the event


        e.stopPropagation();
      },
      // overridden
      _onPointerOver: function _onPointerOver(e) {
        // Add hovered state
        this.addState("hovered");
      },
      // overridden
      _onPointerOut: function _onPointerOut(e) {
        // Just remove the hover state
        this.removeState("hovered");
      },
      // overridden
      _onKeyDown: function _onKeyDown(e) {
        switch (e.getKeyIdentifier()) {
          case "Space":
          case "Enter":
            this.removeState("abandoned");
            this.addState("pressed");
            var menu = this.getMenu();

            if (menu) {
              // Toggle sub menu visibility
              if (!menu.isVisible()) {
                this.open();
              } else {
                menu.exclude();
              }
            }

            e.stopPropagation();
        }
      },
      // overridden
      _onKeyUp: function _onKeyUp(e) {// no action required here
      }
    }
  });
  qx.ui.form.MenuButton.$$dbClassInfo = $$dbClassInfo;
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
       2009 Derrell Lipman
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Derrell Lipman (derrell)
  
  ************************************************************************ */

  /**
   * Interface for creating the column visibility menu
   */
  qx.Interface.define("qx.ui.table.IColumnMenuButton", {
    properties: {
      /**
       * The menu which is displayed when this button is pressed.
       */
      menu: {}
    },
    members: {
      /**
       * Instantiate a sub-widget.
       *
       * @param item {String}
       *   One of the following strings, indicating what type of
       *   column-menu-specific object to instantiate:
       *   <dl>
       *     <dt>menu</dt>
       *     <dd>
       *       Instantiate a menu which will appear when the column visibility
       *       button is pressed. No options are provided in this case.
       *     </dd>
       *     <dt>menu-button</dt>
       *     <dd>
       *       Instantiate a button to correspond to a column within the
       *       table. The options are a map containing <i>text</i>, the name of
       *       the column; <i>column</i>, the column number; and
       *       <i>bVisible</i>, a boolean indicating whether this column is
       *       currently visible. The instantiated return object must implement
       *       interface {@link qx.ui.table.IColumnMenuItem}
       *     </dd>
       *     <dt>user-button</dt>
       *     <dd>
       *       Instantiate a button for other than a column name. This is used,
       *       for example, to add the "Reset column widths" button when the
       *       Resize column model is requested. The options is a map containing
       *       <i>text</i>, the text to present in the button.
       *     </dd>
       *     <dt>separator</dt>
       *     <dd>
       *       Instantiate a separator object to added to the menu. This is
       *       used, for example, to separate the table column name list from
       *       the "Reset column widths" button when the Resize column model is
       *       requested. No options are provided in this case.
       *     </dd>
       *   </dl>
       *
       * @param options {Map}
       *   Options specific to the <i>item</i> being requested.
       *
       * @return {qx.ui.core.Widget}
       *   The instantiated object as specified by <i>item</i>.
       */
      factory: function factory(item, options) {
        return true;
      },

      /**
       * Empty the menu of all items, in preparation for building a new column
       * visibility menu.
       *
       */
      empty: function empty() {
        return true;
      }
    }
  });
  qx.ui.table.IColumnMenuButton.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.form.MenuButton": {
        "construct": true,
        "require": true
      },
      "qx.ui.table.IColumnMenuButton": {
        "require": true
      },
      "qx.ui.core.Blocker": {
        "construct": true
      },
      "qx.ui.menu.Menu": {},
      "qx.ui.table.columnmenu.MenuItem": {},
      "qx.ui.menu.Button": {},
      "qx.ui.menu.Separator": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2009 Derrell Lipman
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Derrell Lipman (derrell)
       * Jonathan Weiß (jonathan_rass)
  
  ************************************************************************ */

  /**
   * The traditional qx.ui.menu.MenuButton to access the column visibility menu.
   */
  qx.Class.define("qx.ui.table.columnmenu.Button", {
    extend: qx.ui.form.MenuButton,
    implement: qx.ui.table.IColumnMenuButton,

    /**
     * Create a new instance of a column visibility menu button. This button
     * also contains the factory for creating each of the sub-widgets.
     */
    construct: function construct() {
      qx.ui.form.MenuButton.constructor.call(this); // add blocker

      this.__blocker__P_200_0 = new qx.ui.core.Blocker(this);
    },
    members: {
      __columnMenuButtons__P_200_1: null,
      __blocker__P_200_0: null,
      // Documented in qx.ui.table.IColumnMenu
      factory: function factory(item, options) {
        switch (item) {
          case "menu":
            var menu = new qx.ui.menu.Menu();
            this.setMenu(menu);
            return menu;

          case "menu-button":
            var menuButton = new qx.ui.table.columnmenu.MenuItem(options.text);
            menuButton.setColumnVisible(options.bVisible);
            this.getMenu().add(menuButton);
            return menuButton;

          case "user-button":
            var button = new qx.ui.menu.Button(options.text);
            button.set({
              appearance: "table-column-reset-button"
            });
            return button;

          case "separator":
            return new qx.ui.menu.Separator();

          default:
            throw new Error("Unrecognized factory request: " + item);
        }
      },

      /**
       * Returns the blocker of the columnmenu button.
       *
       * @return {qx.ui.core.Blocker} the blocker.
       */
      getBlocker: function getBlocker() {
        return this.__blocker__P_200_0;
      },
      // Documented in qx.ui.table.IColumnMenu
      empty: function empty() {
        var menu = this.getMenu();
        var entries = menu.getChildren();

        for (var i = 0, l = entries.length; i < l; i++) {
          entries[0].destroy();
        }
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this.__blocker__P_200_0.dispose();
    }
  });
  qx.ui.table.columnmenu.Button.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.event.type.Dom": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2006 STZ-IDA, Germany, http://www.stz-ida.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Til Schneider (til132)
  
  ************************************************************************ */

  /**
   * A selection manager. This is a helper class that handles all selection
   * related events and updates a SelectionModel.
   * <p>
   * Widgets that support selection should use this manager. This way the only
   * thing the widget has to do is mapping pointer or key events to indexes and
   * call the corresponding handler method.
   *
   * @see SelectionModel
   */
  qx.Class.define("qx.ui.table.selection.Manager", {
    extend: qx.core.Object,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qx.core.Object.constructor.call(this);
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /**
       * The selection model where to set the selection changes.
       */
      selectionModel: {
        check: "qx.ui.table.selection.Model"
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __lastPointerDownHandled__P_201_0: null,

      /**
       * Handles the tap event.
       *
       * @param index {Integer} the index the pointer is pointing at.
       * @param evt {qx.event.type.Tap} the pointer event.
       */
      handleTap: function handleTap(index, evt) {
        if (evt.isLeftPressed()) {
          var selectionModel = this.getSelectionModel();

          if (!selectionModel.isSelectedIndex(index)) {
            // This index is not selected -> We react when the pointer is pressed (because of drag and drop)
            this._handleSelectEvent(index, evt);

            this.__lastPointerDownHandled__P_201_0 = true;
          } else {
            // This index is already selected -> We react when the pointer is released (because of drag and drop)
            this.__lastPointerDownHandled__P_201_0 = false;
          }
        } else if (evt.isRightPressed() && evt.getModifiers() == 0) {
          var selectionModel = this.getSelectionModel();

          if (!selectionModel.isSelectedIndex(index)) {
            // This index is not selected -> Set the selection to this index
            selectionModel.setSelectionInterval(index, index);
          }
        }

        if (evt.isLeftPressed() && !this.__lastPointerDownHandled__P_201_0) {
          this._handleSelectEvent(index, evt);
        }
      },

      /**
       * Handles the key down event that is used as replacement for pointer taps
       * (Normally space).
       *
       * @param index {Integer} the index that is currently focused.
       * @param evt {Map} the key event.
       */
      handleSelectKeyDown: function handleSelectKeyDown(index, evt) {
        this._handleSelectEvent(index, evt);
      },

      /**
       * Handles a key down event that moved the focus (E.g. up, down, home, end, ...).
       *
       * @param index {Integer} the index that is currently focused.
       * @param evt {Map} the key event.
       */
      handleMoveKeyDown: function handleMoveKeyDown(index, evt) {
        var selectionModel = this.getSelectionModel();

        switch (evt.getModifiers()) {
          case 0:
            selectionModel.setSelectionInterval(index, index);
            break;

          case qx.event.type.Dom.SHIFT_MASK:
            var anchor = selectionModel.getAnchorSelectionIndex();

            if (anchor == -1) {
              selectionModel.setSelectionInterval(index, index);
            } else {
              selectionModel.setSelectionInterval(anchor, index);
            }

            break;
        }
      },

      /**
       * Handles a select event.
       *
       * @param index {Integer} the index the event is pointing at.
       * @param evt {Map} the pointer event.
       */
      _handleSelectEvent: function _handleSelectEvent(index, evt) {
        var selectionModel = this.getSelectionModel();
        var leadIndex = selectionModel.getLeadSelectionIndex();
        var anchorIndex = selectionModel.getAnchorSelectionIndex();

        if (evt.isShiftPressed()) {
          if (index != leadIndex || selectionModel.isSelectionEmpty()) {
            // The lead selection index was changed
            if (anchorIndex == -1) {
              anchorIndex = index;
            }

            if (evt.isCtrlOrCommandPressed()) {
              selectionModel.addSelectionInterval(anchorIndex, index);
            } else {
              selectionModel.setSelectionInterval(anchorIndex, index);
            }
          }
        } else if (evt.isCtrlOrCommandPressed()) {
          if (selectionModel.isSelectedIndex(index)) {
            selectionModel.removeSelectionInterval(index, index);
          } else {
            selectionModel.addSelectionInterval(index, index);
          }
        } else {
          // setSelectionInterval checks to see if the change is really necessary
          selectionModel.setSelectionInterval(index, index);
        }
      }
    }
  });
  qx.ui.table.selection.Manager.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.Widget": {
        "construct": true,
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2006 STZ-IDA, Germany, http://www.stz-ida.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Til Schneider (til132)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * The table pane that shows a certain section from a table. This class handles
   * the display of the data part of a table and is therefore the base for virtual
   * scrolling.
   */
  qx.Class.define("qx.ui.table.pane.Pane", {
    extend: qx.ui.core.Widget,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param paneScroller {qx.ui.table.pane.Scroller} the TablePaneScroller the header belongs to.
     */
    construct: function construct(paneScroller) {
      qx.ui.core.Widget.constructor.call(this);
      this.__paneScroller__P_203_0 = paneScroller;
      this.__lastColCount__P_203_1 = 0;
      this.__lastRowCount__P_203_2 = 0;
      this.__rowCache__P_203_3 = [];
    },

    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */
    events: {
      /**
       * Whether the current view port of the pane has not loaded data.
       * The data object of the event indicates if the table pane has to reload
       * data or not. Can be used to give the user feedback of the loading state
       * of the rows.
       */
      paneReloadsData: "qx.event.type.Data",

      /**
       * Whenever the content of the table pane has been updated (rendered)
       * trigger a paneUpdated event. This allows the canvas cellrenderer to act
       * once the new cells have been integrated in the dom.
       */
      paneUpdated: "qx.event.type.Event"
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /** The index of the first row to show. */
      firstVisibleRow: {
        check: "Number",
        init: 0,
        apply: "_applyFirstVisibleRow"
      },

      /** The number of rows to show. */
      visibleRowCount: {
        check: "Number",
        init: 0,
        apply: "_applyVisibleRowCount"
      },

      /**
       * Maximum number of cached rows. If the value is <code>-1</code> the cache
       * size is unlimited
       */
      maxCacheLines: {
        check: "Number",
        init: 1000,
        apply: "_applyMaxCacheLines"
      },
      // overridden
      allowShrinkX: {
        refine: true,
        init: false
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __lastRowCount__P_203_2: null,
      __lastColCount__P_203_1: null,
      __paneScroller__P_203_0: null,
      __tableContainer__P_203_4: null,
      __focusedRow__P_203_5: null,
      __focusedCol__P_203_6: null,
      // sparse array to cache rendered rows
      __rowCache__P_203_3: null,
      __rowCacheCount__P_203_7: 0,
      // property modifier
      _applyFirstVisibleRow: function _applyFirstVisibleRow(value, old) {
        this.updateContent(false, value - old);
      },
      // property modifier
      _applyVisibleRowCount: function _applyVisibleRowCount(value, old) {
        this.updateContent(true);
      },
      // overridden
      _getContentHint: function _getContentHint() {
        // the preferred height is 400 pixel. We don't use rowCount * rowHeight
        // because this is typically too large.
        return {
          width: this.getPaneScroller().getTablePaneModel().getTotalWidth(),
          height: 400
        };
      },

      /**
       * Returns the TablePaneScroller this pane belongs to.
       *
       * @return {qx.ui.table.pane.Scroller} the TablePaneScroller.
       */
      getPaneScroller: function getPaneScroller() {
        return this.__paneScroller__P_203_0;
      },

      /**
       * Returns the table this pane belongs to.
       *
       * @return {qx.ui.table.Table} the table.
       */
      getTable: function getTable() {
        return this.__paneScroller__P_203_0.getTable();
      },

      /**
       * Sets the currently focused cell.
       *
       * @param col {Integer?null} the model index of the focused cell's column.
       * @param row {Integer?null} the model index of the focused cell's row.
       * @param massUpdate {Boolean ? false} Whether other updates are planned as well.
       *          If true, no repaint will be done.
       */
      setFocusedCell: function setFocusedCell(col, row, massUpdate) {
        if (col != this.__focusedCol__P_203_6 || row != this.__focusedRow__P_203_5) {
          var oldRow = this.__focusedRow__P_203_5;
          this.__focusedCol__P_203_6 = col;
          this.__focusedRow__P_203_5 = row; // Update the focused row background

          if (row != oldRow && !massUpdate) {
            if (oldRow !== null) {
              this.updateContent(false, null, oldRow, true);
            }

            if (row !== null) {
              this.updateContent(false, null, row, true);
            }
          }
        }
      },

      /**
       * Event handler. Called when the selection has changed.
       */
      onSelectionChanged: function onSelectionChanged() {
        this.updateContent(false, null, null, true);
      },

      /**
       * Event handler. Called when the table gets or looses the focus.
       */
      onFocusChanged: function onFocusChanged() {
        this.updateContent(false, null, null, true);
      },

      /**
       * Sets the column width.
       *
       * @param col {Integer} the column to change the width for.
       * @param width {Integer} the new width.
       */
      setColumnWidth: function setColumnWidth(col, width) {
        this.updateContent(true);
      },

      /**
       * Event handler. Called the column order has changed.
       *
       */
      onColOrderChanged: function onColOrderChanged() {
        this.updateContent(true);
      },

      /**
       * Event handler. Called when the pane model has changed.
       */
      onPaneModelChanged: function onPaneModelChanged() {
        this.updateContent(true);
      },

      /**
       * Event handler. Called when the table model data has changed.
       *
       * @param firstRow {Integer} The index of the first row that has changed.
       * @param lastRow {Integer} The index of the last row that has changed.
       * @param firstColumn {Integer} The model index of the first column that has changed.
       * @param lastColumn {Integer} The model index of the last column that has changed.
       */
      onTableModelDataChanged: function onTableModelDataChanged(firstRow, lastRow, firstColumn, lastColumn) {
        this.__rowCacheClear__P_203_8();

        var paneFirstRow = this.getFirstVisibleRow();
        var rowCount = this.getVisibleRowCount();

        if (lastRow == -1 || lastRow >= paneFirstRow && firstRow < paneFirstRow + rowCount) {
          // The change intersects this pane, check if a full or partial update is required
          if (firstRow === lastRow && this.getTable().getTableModel().getRowCount() > 1) {
            this.updateContent(false, null, firstRow, false);
          } else {
            this.updateContent();
          }
        }
      },

      /**
       * Event handler. Called when the table model meta data has changed.
       *
       */
      onTableModelMetaDataChanged: function onTableModelMetaDataChanged() {
        this.updateContent(true);
      },
      // property apply method
      _applyMaxCacheLines: function _applyMaxCacheLines(value, old) {
        if (this.__rowCacheCount__P_203_7 >= value && value !== -1) {
          this.__rowCacheClear__P_203_8();
        }
      },

      /**
       * Clear the row cache
       */
      __rowCacheClear__P_203_8: function __rowCacheClear__P_203_8() {
        this.__rowCache__P_203_3 = [];
        this.__rowCacheCount__P_203_7 = 0;
      },

      /**
       * Get a line from the row cache.
       *
       * @param row {Integer} Row index to get
       * @param selected {Boolean} Whether the row is currently selected
       * @param focused {Boolean} Whether the row is currently focused
       * @return {String|null} The cached row or null if a row with the given
       *     index is not cached.
       */
      __rowCacheGet__P_203_9: function __rowCacheGet__P_203_9(row, selected, focused) {
        if (!selected && !focused && this.__rowCache__P_203_3[row]) {
          return this.__rowCache__P_203_3[row];
        } else {
          return null;
        }
      },

      /**
       * Add a line to the row cache.
       *
       * @param row {Integer} Row index to set
       * @param rowString {String} computed row string to cache
       * @param selected {Boolean} Whether the row is currently selected
       * @param focused {Boolean} Whether the row is currently focused
       */
      __rowCacheSet__P_203_10: function __rowCacheSet__P_203_10(row, rowString, selected, focused) {
        var maxCacheLines = this.getMaxCacheLines();

        if (!selected && !focused && !this.__rowCache__P_203_3[row] && maxCacheLines > 0) {
          this._applyMaxCacheLines(maxCacheLines);

          this.__rowCache__P_203_3[row] = rowString;
          this.__rowCacheCount__P_203_7 += 1;
        }
      },

      /**
       * Updates the content of the pane.
       *
       * @param completeUpdate {Boolean ? false} if true a complete update is performed.
       *      On a complete update all cell widgets are recreated.
       * @param scrollOffset {Integer ? null} If set specifies how many rows to scroll.
       * @param onlyRow {Integer ? null} if set only the specified row will be updated.
       * @param onlySelectionOrFocusChanged {Boolean ? false} if true, cell values won't
       *          be updated. Only the row background will.
       */
      updateContent: function updateContent(completeUpdate, scrollOffset, onlyRow, onlySelectionOrFocusChanged) {
        if (completeUpdate) {
          this.__rowCacheClear__P_203_8();
        }

        if (scrollOffset && Math.abs(scrollOffset) <= Math.min(10, this.getVisibleRowCount())) {
          this._scrollContent(scrollOffset);
        } else if (onlySelectionOrFocusChanged && !this.getTable().getAlwaysUpdateCells()) {
          this._updateRowStyles(onlyRow);
        } else if (typeof onlyRow == "number" && onlyRow >= 0) {
          this._updateSingleRow(onlyRow);
        } else {
          this._updateAllRows();
        }
      },

      /**
       * If only focus or selection changes it is sufficient to only update the
       * row styles. This method updates the row styles of all visible rows or
       * of just one row.
       *
       * @param onlyRow {Integer|null ? null} If this parameter is set only the row
       *     with this index is updated.
       */
      _updateRowStyles: function _updateRowStyles(onlyRow) {
        var elem = this.getContentElement().getDomElement();

        if (!elem || !elem.firstChild) {
          this._updateAllRows();

          return;
        }

        var table = this.getTable();
        var selectionModel = table.getSelectionModel();
        var tableModel = table.getTableModel();
        var rowRenderer = table.getDataRowRenderer();
        var rowNodes = elem.firstChild.childNodes;
        var cellInfo = {
          table: table
        }; // We don't want to execute the row loop below more than necessary. If
        // onlyRow is not null, we want to do the loop only for that row.
        // In that case, we start at (set the "row" variable to) that row, and
        // stop at (set the "end" variable to the offset of) the next row.

        var row = this.getFirstVisibleRow();
        var y = 0; // How many rows do we need to update?

        var end = rowNodes.length;

        if (onlyRow != null) {
          // How many rows are we skipping?
          var offset = onlyRow - row;

          if (offset >= 0 && offset < end) {
            row = onlyRow;
            y = offset;
            end = offset + 1;
          } else {
            return;
          }
        }

        for (; y < end; y++, row++) {
          cellInfo.row = row;
          cellInfo.selected = selectionModel.isSelectedIndex(row);
          cellInfo.focusedRow = this.__focusedRow__P_203_5 == row;
          cellInfo.rowData = tableModel.getRowData(row);
          rowRenderer.updateDataRowElement(cellInfo, rowNodes[y]);
        }
      },

      /**
       * Get the HTML table fragment for the given row range.
       *
       * @param firstRow {Integer} Index of the first row
       * @param rowCount {Integer} Number of rows
       * @return {String} The HTML table fragment for the given row range.
       */
      _getRowsHtml: function _getRowsHtml(firstRow, rowCount) {
        var table = this.getTable();
        var selectionModel = table.getSelectionModel();
        var tableModel = table.getTableModel();
        var columnModel = table.getTableColumnModel();
        var paneModel = this.getPaneScroller().getTablePaneModel();
        var rowRenderer = table.getDataRowRenderer();
        tableModel.prefetchRows(firstRow, firstRow + rowCount - 1);
        var rowHeight = table.getRowHeight();
        var colCount = paneModel.getColumnCount();
        var left = 0;
        var cols = []; // precompute column properties

        for (var x = 0; x < colCount; x++) {
          var col = paneModel.getColumnAtX(x);
          var cellWidth = columnModel.getColumnWidth(col);
          cols.push({
            col: col,
            xPos: x,
            editable: tableModel.isColumnEditable(col),
            focusedCol: this.__focusedCol__P_203_6 == col,
            styleLeft: left,
            styleWidth: cellWidth
          });
          left += cellWidth;
        }

        var rowsArr = [];
        var paneReloadsData = false;

        for (var row = firstRow; row < firstRow + rowCount; row++) {
          var selected = selectionModel.isSelectedIndex(row);
          var focusedRow = this.__focusedRow__P_203_5 == row;

          var cachedRow = this.__rowCacheGet__P_203_9(row, selected, focusedRow);

          if (cachedRow) {
            rowsArr.push(cachedRow);
            continue;
          }

          var rowHtml = [];
          var cellInfo = {
            table: table
          };
          cellInfo.styleHeight = rowHeight;
          cellInfo.row = row;
          cellInfo.selected = selected;
          cellInfo.focusedRow = focusedRow;
          cellInfo.rowData = tableModel.getRowData(row);

          if (!cellInfo.rowData) {
            paneReloadsData = true;
          }

          rowHtml.push("<div ");
          var rowAttributes = rowRenderer.getRowAttributes(cellInfo);

          if (rowAttributes) {
            rowHtml.push(rowAttributes);
          }

          var rowClass = rowRenderer.getRowClass(cellInfo);

          if (rowClass) {
            rowHtml.push('class="', rowClass, '" ');
          }

          var rowStyle = rowRenderer.createRowStyle(cellInfo);
          rowStyle += ";position:relative;" + rowRenderer.getRowHeightStyle(rowHeight) + "width:100%;";

          if (rowStyle) {
            rowHtml.push('style="', rowStyle, '" ');
          }

          rowHtml.push(">");
          var stopLoop = false;

          for (x = 0; x < colCount && !stopLoop; x++) {
            var col_def = cols[x];

            for (var attr in col_def) {
              cellInfo[attr] = col_def[attr];
            }

            var col = cellInfo.col; // Use the "getValue" method of the tableModel to get the cell's
            // value working directly on the "rowData" object
            // (-> cellInfo.rowData[col];) is not a solution because you can't
            // work with the columnIndex -> you have to use the columnId of the
            // columnIndex This is exactly what the method "getValue" does

            cellInfo.value = tableModel.getValue(col, row);
            var cellRenderer = columnModel.getDataCellRenderer(col); // Retrieve the current default cell style for this column.

            cellInfo.style = cellRenderer.getDefaultCellStyle(); // Allow a cell renderer to tell us not to draw any further cells in
            // the row. Older, or traditional cell renderers don't return a
            // value, however, from createDataCellHtml, so assume those are
            // returning false.
            //
            // Tested with http://tinyurl.com/333hyhv

            stopLoop = cellRenderer.createDataCellHtml(cellInfo, rowHtml) || false;
          }

          rowHtml.push("</div>");
          var rowString = rowHtml.join("");

          this.__rowCacheSet__P_203_10(row, rowString, selected, focusedRow);

          rowsArr.push(rowString);
        }

        this.fireDataEvent("paneReloadsData", paneReloadsData);
        return rowsArr.join("");
      },

      /**
       * Scrolls the pane's contents by the given offset.
       *
       * @param rowOffset {Integer} Number of lines to scroll. Scrolling up is
       *     represented by a negative offset.
       */
      _scrollContent: function _scrollContent(rowOffset) {
        var el = this.getContentElement().getDomElement();

        if (!(el && el.firstChild)) {
          this._updateAllRows();

          return;
        }

        var tableBody = el.firstChild;
        var tableChildNodes = tableBody.childNodes;
        var rowCount = this.getVisibleRowCount();
        var firstRow = this.getFirstVisibleRow();
        var tabelModel = this.getTable().getTableModel();
        var modelRowCount = 0;
        modelRowCount = tabelModel.getRowCount(); // don't handle this special case here

        if (firstRow + rowCount > modelRowCount) {
          this._updateAllRows();

          return;
        } // remove old lines


        var removeRowBase = rowOffset < 0 ? rowCount + rowOffset : 0;
        var addRowBase = rowOffset < 0 ? 0 : rowCount - rowOffset;

        for (var i = Math.abs(rowOffset) - 1; i >= 0; i--) {
          var rowElem = tableChildNodes[removeRowBase];

          try {
            tableBody.removeChild(rowElem);
          } catch (exp) {
            break;
          }
        } // render new lines


        if (!this.__tableContainer__P_203_4) {
          this.__tableContainer__P_203_4 = document.createElement("div");
        }

        var tableDummy = "<div>";
        tableDummy += this._getRowsHtml(firstRow + addRowBase, Math.abs(rowOffset));
        tableDummy += "</div>";
        this.__tableContainer__P_203_4.innerHTML = tableDummy;
        var newTableRows = this.__tableContainer__P_203_4.firstChild.childNodes; // append new lines

        if (rowOffset > 0) {
          for (var i = newTableRows.length - 1; i >= 0; i--) {
            var rowElem = newTableRows[0];
            tableBody.appendChild(rowElem);
          }
        } else {
          for (var i = newTableRows.length - 1; i >= 0; i--) {
            var rowElem = newTableRows[newTableRows.length - 1];
            tableBody.insertBefore(rowElem, tableBody.firstChild);
          }
        } // update focus indicator


        if (this.__focusedRow__P_203_5 !== null) {
          this._updateRowStyles(this.__focusedRow__P_203_5 - rowOffset);

          this._updateRowStyles(this.__focusedRow__P_203_5);
        }

        this.fireEvent("paneUpdated");
      },
      _updateSingleRow: function _updateSingleRow(row) {
        var elem = this.getContentElement().getDomElement();

        if (!elem || !elem.firstChild) {
          // pane has not yet been rendered, just exit
          return;
        }

        var visibleRowCount = this.getVisibleRowCount();
        var firstRow = this.getFirstVisibleRow();

        if (row < firstRow || row > firstRow + visibleRowCount) {
          // No need to redraw it
          return;
        }

        var modelRowCount = this.getTable().getTableModel().getRowCount();
        var tableBody = elem.firstChild;
        var tableChildNodes = tableBody.childNodes;
        var offset = row - firstRow;
        var rowElem = tableChildNodes[offset]; // `row` can be too big if rows were deleted. In that case, we
        // can't update the current single row

        if (row >= modelRowCount || typeof rowElem == "undefined") {
          this._updateAllRows();

          return;
        } // render new lines


        if (!this.__tableContainer__P_203_4) {
          this.__tableContainer__P_203_4 = document.createElement("div");
        }

        this.__tableContainer__P_203_4.innerHTML = "<div>" + this._getRowsHtml(row, 1) + "</div>";
        var newTableRows = this.__tableContainer__P_203_4.firstChild.childNodes;
        tableBody.replaceChild(newTableRows[0], rowElem); // update focus indicator

        this._updateRowStyles(null);

        this.fireEvent("paneUpdated");
      },

      /**
       * Updates the content of the pane (implemented using array joins).
       */
      _updateAllRows: function _updateAllRows() {
        var elem = this.getContentElement().getDomElement();

        if (!elem) {
          // pane has not yet been rendered
          this.addListenerOnce("appear", this._updateAllRows, this);
          return;
        }

        var table = this.getTable();
        var tableModel = table.getTableModel();
        var paneModel = this.getPaneScroller().getTablePaneModel();
        var colCount = paneModel.getColumnCount();
        var rowHeight = table.getRowHeight();
        var firstRow = this.getFirstVisibleRow();
        var rowCount = this.getVisibleRowCount();
        var modelRowCount = tableModel.getRowCount();

        if (firstRow + rowCount > modelRowCount) {
          rowCount = Math.max(0, modelRowCount - firstRow);
        }

        var rowWidth = paneModel.getTotalWidth();
        var htmlArr; // If there are any rows...

        if (rowCount > 0) {
          // ... then create a div for them and add the rows to it.
          htmlArr = ["<div style='", "width: 100%;", table.getForceLineHeight() ? "line-height: " + rowHeight + "px;" : "", "overflow: hidden;", "'>", this._getRowsHtml(firstRow, rowCount), "</div>"];
        } else {
          // Otherwise, don't create the div, as even an empty div creates a
          // white row in IE.
          htmlArr = [];
        }

        var data = htmlArr.join("");
        elem.innerHTML = data;
        this.setWidth(rowWidth);
        this.__lastColCount__P_203_1 = colCount;
        this.__lastRowCount__P_203_2 = rowCount;
        this.fireEvent("paneUpdated");
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this.__tableContainer__P_203_4 = this.__paneScroller__P_203_0 = this.__rowCache__P_203_3 = null;
      this.removeListener("track", this._onTrack, this);
    }
  });
  qx.ui.table.pane.Pane.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.Widget": {
        "construct": true,
        "require": true
      },
      "qx.ui.layout.HBox": {
        "construct": true
      },
      "qx.ui.core.Blocker": {
        "construct": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2006 STZ-IDA, Germany, http://www.stz-ida.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Til Schneider (til132)
  
  ************************************************************************ */

  /**
   * Shows the header of a table.
   */
  qx.Class.define("qx.ui.table.pane.Header", {
    extend: qx.ui.core.Widget,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param paneScroller {qx.ui.table.pane.Scroller} the TablePaneScroller the header belongs to.
     */
    construct: function construct(paneScroller) {
      qx.ui.core.Widget.constructor.call(this);

      this._setLayout(new qx.ui.layout.HBox()); // add blocker


      this.__blocker__P_204_0 = new qx.ui.core.Blocker(this);
      this.__paneScroller__P_204_1 = paneScroller; // ARIA attrs

      this.getContentElement().setAttribute("role", "row");
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __paneScroller__P_204_1: null,
      __moveFeedback__P_204_2: null,
      __lastPointerOverColumn__P_204_3: null,
      __blocker__P_204_0: null,

      /**
       * Returns the TablePaneScroller this header belongs to.
       *
       * @return {qx.ui.table.pane.Scroller} the TablePaneScroller.
       */
      getPaneScroller: function getPaneScroller() {
        return this.__paneScroller__P_204_1;
      },

      /**
       * Returns the table this header belongs to.
       *
       * @return {qx.ui.table.Table} the table.
       */
      getTable: function getTable() {
        return this.__paneScroller__P_204_1.getTable();
      },

      /**
       * Returns the blocker of the header.
       *
       * @return {qx.ui.core.Blocker} the blocker.
       */
      getBlocker: function getBlocker() {
        return this.__blocker__P_204_0;
      },

      /**
       * Event handler. Called the column order has changed.
       *
       */
      onColOrderChanged: function onColOrderChanged() {
        this._updateContent(true);
      },

      /**
       * Event handler. Called when the pane model has changed.
       */
      onPaneModelChanged: function onPaneModelChanged() {
        this._updateContent(true);
      },

      /**
       * Event handler. Called when the table model meta data has changed.
       *
       */
      onTableModelMetaDataChanged: function onTableModelMetaDataChanged() {
        this._updateContent();
      },

      /**
       * Sets the column width. This overrides the width from the column model.
       *
       * @param col {Integer}
       *   The column to change the width for.
       *
       * @param width {Integer}
       *   The new width.
       *
       * @param isPointerAction {Boolean}
       *   <i>true</i> if the column width is being changed as a result of a
       *   pointer drag in the header; false or undefined otherwise.
       *
       */
      setColumnWidth: function setColumnWidth(col, width, isPointerAction) {
        var child = this.getHeaderWidgetAtColumn(col);

        if (child != null) {
          child.setWidth(width);
        }
      },

      /**
       * Sets the column the pointer is currently over.
       *
       * @param col {Integer} the model index of the column the pointer is currently over or
       *      null if the pointer is over no column.
       */
      setPointerOverColumn: function setPointerOverColumn(col) {
        if (col != this.__lastPointerOverColumn__P_204_3) {
          if (this.__lastPointerOverColumn__P_204_3 != null) {
            var widget = this.getHeaderWidgetAtColumn(this.__lastPointerOverColumn__P_204_3);

            if (widget != null) {
              widget.removeState("hovered");
            }
          }

          if (col != null) {
            this.getHeaderWidgetAtColumn(col).addState("hovered");
          }

          this.__lastPointerOverColumn__P_204_3 = col;
        }
      },

      /**
       * Get the header widget for the given column
       *
       * @param col {Integer} The column number
       * @return {qx.ui.table.headerrenderer.HeaderCell} The header cell widget
       */
      getHeaderWidgetAtColumn: function getHeaderWidgetAtColumn(col) {
        var xPos = this.getPaneScroller().getTablePaneModel().getX(col);
        return this._getChildren()[xPos];
      },

      /**
       * Shows the feedback shown while a column is moved by the user.
       *
       * @param col {Integer} the model index of the column to show the move feedback for.
       * @param x {Integer} the x position the left side of the feedback should have
       *      (in pixels, relative to the left side of the header).
       */
      showColumnMoveFeedback: function showColumnMoveFeedback(col, x) {
        var pos = this.getContentLocation();

        if (this.__moveFeedback__P_204_2 == null) {
          var table = this.getTable();
          var xPos = this.getPaneScroller().getTablePaneModel().getX(col);

          var cellWidget = this._getChildren()[xPos];

          var tableModel = table.getTableModel();
          var columnModel = table.getTableColumnModel();
          var cellInfo = {
            xPos: xPos,
            col: col,
            name: tableModel.getColumnName(col),
            table: table
          };
          var cellRenderer = columnModel.getHeaderCellRenderer(col);
          var feedback = cellRenderer.createHeaderCell(cellInfo);
          var size = cellWidget.getBounds(); // Configure the feedback

          feedback.setWidth(size.width);
          feedback.setHeight(size.height);
          feedback.setZIndex(1000000);
          feedback.setOpacity(0.8);
          feedback.setLayoutProperties({
            top: pos.top
          });
          this.getApplicationRoot().add(feedback);
          this.__moveFeedback__P_204_2 = feedback;
        }

        this.__moveFeedback__P_204_2.setLayoutProperties({
          left: pos.left + x
        });

        this.__moveFeedback__P_204_2.show();
      },

      /**
       * Hides the feedback shown while a column is moved by the user.
       */
      hideColumnMoveFeedback: function hideColumnMoveFeedback() {
        if (this.__moveFeedback__P_204_2 != null) {
          this.__moveFeedback__P_204_2.destroy();

          this.__moveFeedback__P_204_2 = null;
        }
      },

      /**
       * Returns whether the column move feedback is currently shown.
       *
       * @return {Boolean} <code>true</code> whether the column move feedback is
       *    currently shown, <code>false</code> otherwise.
       */
      isShowingColumnMoveFeedback: function isShowingColumnMoveFeedback() {
        return this.__moveFeedback__P_204_2 != null;
      },

      /**
       * Updates the content of the header.
       *
       * @param completeUpdate {Boolean} if true a complete update is performed. On a
       *      complete update all header widgets are recreated.
       */
      _updateContent: function _updateContent(completeUpdate) {
        var table = this.getTable();
        var tableModel = table.getTableModel();
        var columnModel = table.getTableColumnModel();
        var paneModel = this.getPaneScroller().getTablePaneModel();

        var children = this._getChildren();

        var colCount = paneModel.getColumnCount();
        var sortedColumn = tableModel.getSortColumnIndex(); // Remove all widgets on the complete update

        if (completeUpdate) {
          this._cleanUpCells();
        } // Update the header


        var cellInfo = {};
        cellInfo.sortedAscending = tableModel.isSortAscending();

        for (var x = 0; x < colCount; x++) {
          var col = paneModel.getColumnAtX(x);

          if (col === undefined) {
            continue;
          }

          var colWidth = columnModel.getColumnWidth(col);
          var cellRenderer = columnModel.getHeaderCellRenderer(col);
          cellInfo.xPos = x;
          cellInfo.col = col;
          cellInfo.name = tableModel.getColumnName(col);
          cellInfo.editable = tableModel.isColumnEditable(col);
          cellInfo.sorted = col == sortedColumn;
          cellInfo.table = table; // Get the cached widget

          var cachedWidget = children[x]; // Create or update the widget

          if (cachedWidget == null) {
            // We have no cached widget -> create it
            cachedWidget = cellRenderer.createHeaderCell(cellInfo);
            cachedWidget.set({
              width: colWidth
            });

            this._add(cachedWidget);
          } else {
            // This widget already created before -> recycle it
            cellRenderer.updateHeaderCell(cellInfo, cachedWidget);
          } // set the states


          if (x === 0) {
            cachedWidget.addState("first");
            cachedWidget.removeState("last");
          } else if (x === colCount - 1) {
            cachedWidget.removeState("first");
            cachedWidget.addState("last");
          } else {
            cachedWidget.removeState("first");
            cachedWidget.removeState("last");
          }
        }
      },

      /**
       * Cleans up all header cells.
       *
       */
      _cleanUpCells: function _cleanUpCells() {
        var children = this._getChildren();

        for (var x = children.length - 1; x >= 0; x--) {
          var cellWidget = children[x];
          cellWidget.destroy();
        }
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this.__blocker__P_204_0.dispose();

      this._disposeObjects("__paneScroller__P_204_1");
    }
  });
  qx.ui.table.pane.Header.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "construct": true,
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
      "qx.ui.core.scroll.MScrollBarFactory": {
        "require": true
      },
      "qx.ui.layout.Grid": {
        "construct": true
      },
      "qx.ui.container.Composite": {
        "construct": true
      },
      "qx.ui.layout.HBox": {
        "construct": true
      },
      "qx.bom.client.Device": {
        "construct": true,
        "require": true
      },
      "qx.bom.client.Scroll": {
        "construct": true,
        "require": true
      },
      "qx.ui.layout.Canvas": {
        "construct": true
      },
      "qx.event.Timer": {
        "construct": true
      },
      "qx.ui.table.pane.FocusIndicator": {},
      "qx.ui.core.scroll.AbstractScrollArea": {},
      "qx.ui.table.pane.Clipper": {},
      "qx.ui.table.pane.CellEvent": {},
      "qx.lang.Number": {},
      "qx.ui.window.Window": {},
      "qx.event.GlobalError": {
        "usage": "dynamic",
        "require": true
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "device.type": {
          "construct": true,
          "className": "qx.bom.client.Device"
        },
        "os.scrollBarOverlayed": {
          "construct": true,
          "className": "qx.bom.client.Scroll"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2006 STZ-IDA, Germany, http://www.stz-ida.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Til Schneider (til132)
       * Jonathan Weiß (jonathan_rass)
  
  ************************************************************************ */

  /**
   * Shows a whole meta column. This includes a {@link Header},
   * a {@link Pane} and the needed scroll bars. This class handles the
   * virtual scrolling and does all the pointer event handling.
   *
   * @childControl header {qx.ui.table.pane.Header} header pane
   * @childControl pane {qx.ui.table.pane.Pane} table pane to show the data
   * @childControl focus-indicator {qx.ui.table.pane.FocusIndicator} shows the current focused cell
   * @childControl resize-line {qx.ui.core.Widget} resize line widget
   * @childControl scrollbar-x {qx.ui.core.scroll.ScrollBar?qx.ui.core.scroll.NativeScrollBar}
   *               horizontal scrollbar widget (depends on the "qx.nativeScrollBars" setting which implementation is used)
   * @childControl scrollbar-y {qx.ui.core.scroll.ScrollBar?qx.ui.core.scroll.NativeScrollBar}
   *               vertical scrollbar widget (depends on the "qx.nativeScrollBars" setting which implementation is used)
   */
  qx.Class.define("qx.ui.table.pane.Scroller", {
    extend: qx.ui.core.Widget,
    include: [qx.ui.core.scroll.MScrollBarFactory],

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param table {qx.ui.table.Table} the table the scroller belongs to.
     */
    construct: function construct(table) {
      qx.ui.core.Widget.constructor.call(this);
      this.__table__P_205_0 = table; // init layout

      var grid = new qx.ui.layout.Grid();
      grid.setColumnFlex(0, 1);
      grid.setRowFlex(1, 1);

      this._setLayout(grid); // init child controls


      this.__header__P_205_1 = this._showChildControl("header");
      this.__tablePane__P_205_2 = this._showChildControl("pane"); // the top line containing the header clipper and the top right widget

      this.__top__P_205_3 = new qx.ui.container.Composite(new qx.ui.layout.HBox()).set({
        minWidth: 0
      });

      this._add(this.__top__P_205_3, {
        row: 0,
        column: 0,
        colSpan: 2
      }); // embed header into a scrollable container


      this._headerClipper = this._createHeaderClipper();

      this._headerClipper.add(this.__header__P_205_1);

      this._headerClipper.addListener("losecapture", this._onChangeCaptureHeader, this);

      this._headerClipper.addListener("pointermove", this._onPointermoveHeader, this);

      this._headerClipper.addListener("pointerdown", this._onPointerdownHeader, this);

      this._headerClipper.addListener("pointerup", this._onPointerupHeader, this);

      this._headerClipper.addListener("tap", this._onTapHeader, this);

      this.__top__P_205_3.add(this._headerClipper, {
        flex: 1
      }); // embed pane into a scrollable container


      this._paneClipper = this._createPaneClipper();

      this._paneClipper.add(this.__tablePane__P_205_2);

      this._paneClipper.addListener("roll", this._onRoll, this);

      this._paneClipper.addListener("pointermove", this._onPointermovePane, this);

      this._paneClipper.addListener("pointerdown", this._onPointerdownPane, this);

      this._paneClipper.addListener("tap", this._onTapPane, this);

      this._paneClipper.addListener("contextmenu", this._onTapPane, this);

      this._paneClipper.addListener("contextmenu", this._onContextMenu, this);

      if (qx.core.Environment.get("device.type") === "desktop") {
        this._paneClipper.addListener("dblclick", this._onDbltapPane, this);
      } else {
        this._paneClipper.addListener("dbltap", this._onDbltapPane, this);
      }

      this._paneClipper.addListener("resize", this._onResizePane, this); // if we have overlayed scroll bars, we should use a separate container


      if (qx.core.Environment.get("os.scrollBarOverlayed")) {
        this.__clipperContainer__P_205_4 = new qx.ui.container.Composite();

        this.__clipperContainer__P_205_4.setLayout(new qx.ui.layout.Canvas());

        this.__clipperContainer__P_205_4.add(this._paneClipper, {
          edge: 0
        });

        this._add(this.__clipperContainer__P_205_4, {
          row: 1,
          column: 0
        });
      } else {
        this._add(this._paneClipper, {
          row: 1,
          column: 0
        });
      } // init scroll bars


      this.__horScrollBar__P_205_5 = this._showChildControl("scrollbar-x");
      this.__verScrollBar__P_205_6 = this._showChildControl("scrollbar-y"); // init focus indicator

      this.__focusIndicator__P_205_7 = this.getChildControl("focus-indicator"); // need to run the apply method at least once [BUG #4057]

      this.initShowCellFocusIndicator(); // force creation of the resize line

      this.getChildControl("resize-line").hide();
      this.addListener("pointerout", this._onPointerout, this);
      this.addListener("appear", this._onAppear, this);
      this.addListener("disappear", this._onDisappear, this);
      this.__timer__P_205_8 = new qx.event.Timer();

      this.__timer__P_205_8.addListener("interval", this._oninterval, this);

      this.initScrollTimeout();
    },

    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */
    statics: {
      /** @type {int} The minimum width a column could get in pixels. */
      MIN_COLUMN_WIDTH: 10,

      /** @type {int} The radius of the resize region in pixels. */
      RESIZE_REGION_RADIUS: 5,

      /**
       * (int) The number of pixels the pointer may move between pointer down and pointer up
       * in order to count as a tap.
       */
      TAP_TOLERANCE: 5,

      /**
       * (int) The mask for the horizontal scroll bar.
       * May be combined with {@link #VERTICAL_SCROLLBAR}.
       *
       * @see #getNeededScrollBars
       */
      HORIZONTAL_SCROLLBAR: 1,

      /**
       * (int) The mask for the vertical scroll bar.
       * May be combined with {@link #HORIZONTAL_SCROLLBAR}.
       *
       * @see #getNeededScrollBars
       */
      VERTICAL_SCROLLBAR: 2
    },

    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */
    events: {
      /** Dispatched if the pane is scrolled horizontally */
      changeScrollY: "qx.event.type.Data",

      /** Dispatched if the pane is scrolled vertically */
      changeScrollX: "qx.event.type.Data",

      /**See {@link qx.ui.table.Table#cellTap}.*/
      cellTap: "qx.ui.table.pane.CellEvent",

      /*** See {@link qx.ui.table.Table#cellDbltap}.*/
      cellDbltap: "qx.ui.table.pane.CellEvent",

      /**See {@link qx.ui.table.Table#cellContextmenu}.*/
      cellContextmenu: "qx.ui.table.pane.CellEvent",

      /** Dispatched when a sortable header was tapped */
      beforeSort: "qx.event.type.Data"
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /**
       * Whether to show the horizontal scroll bar. This is a tri-state
       * value. `true` means show the scroll bar; `false` means exclude it; null
       * means hide it so it retains its space but doesn't show a scroll bar.
       */
      horizontalScrollBarVisible: {
        check: "Boolean",
        init: false,
        apply: "_applyHorizontalScrollBarVisible",
        event: "changeHorizontalScrollBarVisible",
        nullable: true
      },

      /** Whether to show the vertical scroll bar */
      verticalScrollBarVisible: {
        check: "Boolean",
        init: false,
        apply: "_applyVerticalScrollBarVisible",
        event: "changeVerticalScrollBarVisible"
      },

      /** The table pane model. */
      tablePaneModel: {
        check: "qx.ui.table.pane.Model",
        apply: "_applyTablePaneModel",
        event: "changeTablePaneModel"
      },

      /**
       * Whether column resize should be live. If false, during resize only a line is
       * shown and the real resize happens when the user releases the pointer button.
       */
      liveResize: {
        check: "Boolean",
        init: false
      },

      /**
       * Whether the focus should moved when the pointer is moved over a cell. If false
       * the focus is only moved on pointer taps.
       */
      focusCellOnPointerMove: {
        check: "Boolean",
        init: false
      },

      /**
       * Whether to handle selections via the selection manager before setting the
       * focus.  The traditional behavior is to handle selections after setting the
       * focus, but setting the focus means redrawing portions of the table, and
       * some subclasses may want to modify the data to be displayed based on the
       * selection.
       */
      selectBeforeFocus: {
        check: "Boolean",
        init: false
      },

      /**
       * Whether the cell focus indicator should be shown
       */
      showCellFocusIndicator: {
        check: "Boolean",
        init: true,
        apply: "_applyShowCellFocusIndicator"
      },

      /**
       * By default, the "cellContextmenu" event is fired only when a data cell
       * is right-clicked. It is not fired when a right-click occurs in the
       * empty area of the table below the last data row. By turning on this
       * property, "cellContextMenu" events will also be generated when a
       * right-click occurs in that empty area. In such a case, row identifier
       * in the event data will be null, so event handlers can check (row ===
       * null) to handle this case.
       */
      contextMenuFromDataCellsOnly: {
        check: "Boolean",
        init: true
      },

      /**
       * Whether to reset the selection when a header cell is tapped. Since
       * most data models do not have provisions to retain a selection after
       * sorting, the default is to reset the selection in this case. Some data
       * models, however, do have the capability to retain the selection, so
       * when using those, this property should be set to false.
       */
      resetSelectionOnHeaderTap: {
        check: "Boolean",
        init: true
      },

      /**
       * Whether to reset the selection when the unpopulated table area is tapped.
       * The default is false which keeps the behaviour as before
       */
      resetSelectionOnTapBelowRows: {
        check: "Boolean",
        init: false
      },

      /**
       * Interval time (in milliseconds) for the table update timer.
       * Setting this to 0 clears the timer.
       */
      scrollTimeout: {
        check: "Integer",
        init: 100,
        apply: "_applyScrollTimeout"
      },
      appearance: {
        refine: true,
        init: "table-scroller"
      },

      /**
       * If set then defines the minimum height of the focus indicator when editing
       */
      minCellEditHeight: {
        check: "Integer",
        init: null,
        nullable: true
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __lastRowCount__P_205_9: null,
      __table__P_205_0: null,
      __updateInterval__P_205_10: null,
      __updateContentPlanned__P_205_11: null,
      __onintervalWrapper__P_205_12: null,
      _moveColumn: null,
      __lastMoveColPos__P_205_13: null,
      _lastMoveTargetX: null,
      _lastMoveTargetScroller: null,
      __lastMovePointerPageX__P_205_14: null,
      __resizeColumn__P_205_15: null,
      __lastResizePointerPageX__P_205_16: null,
      __lastResizeWidth__P_205_17: null,
      __lastPointerDownCell__P_205_18: null,
      __firedTapEvent__P_205_19: false,
      __ignoreTap__P_205_20: null,
      __lastPointerPageX__P_205_21: null,
      __lastPointerPageY__P_205_22: null,
      __focusedCol__P_205_23: null,
      __focusedRow__P_205_24: null,
      _cellEditor: null,
      __cellEditorFactory__P_205_25: null,
      __topRightWidget__P_205_26: null,
      __horScrollBar__P_205_5: null,
      __verScrollBar__P_205_6: null,
      __header__P_205_1: null,
      _headerClipper: null,
      __tablePane__P_205_2: null,
      _paneClipper: null,
      __clipperContainer__P_205_4: null,
      __focusIndicator__P_205_7: null,
      __top__P_205_3: null,
      __timer__P_205_8: null,
      __focusIndicatorPointerDownListener__P_205_27: null,

      /**
       * The right inset of the pane. The right inset is the maximum of the
       * top right widget width and the scrollbar width (if visible).
       *
       * @return {Integer} The right inset of the pane
       */
      getPaneInsetRight: function getPaneInsetRight() {
        var topRight = this.getTopRightWidget();
        var topRightWidth = topRight && topRight.isVisible() && topRight.getBounds() ? topRight.getBounds().width + topRight.getMarginLeft() + topRight.getMarginRight() : 0;
        var scrollBar = this.__verScrollBar__P_205_6;
        var scrollBarWidth = this.getVerticalScrollBarVisible() ? this.getVerticalScrollBarWidth() + scrollBar.getMarginLeft() + scrollBar.getMarginRight() : 0;
        return Math.max(topRightWidth, scrollBarWidth);
      },

      /**
       * Set the pane's width
       *
       * @param width {Integer} The pane's width
       */
      setPaneWidth: function setPaneWidth(width) {
        if (this.isVerticalScrollBarVisible()) {
          width += this.getPaneInsetRight();
        }

        this.setWidth(width);
      },
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id, hash) {
        var control;

        switch (id) {
          case "header":
            control = this.getTable().getNewTablePaneHeader()(this);
            break;

          case "pane":
            control = this.getTable().getNewTablePane()(this);
            break;

          case "focus-indicator":
            control = new qx.ui.table.pane.FocusIndicator(this);
            control.setUserBounds(0, 0, 0, 0);
            control.setZIndex(1000);
            control.addListener("pointerup", this._onPointerupFocusIndicator, this);

            this._paneClipper.add(control);

            control.show(); // must be active for editor to operate

            control.setDecorator(null); // it can be initially invisible, though.

            break;

          case "resize-line":
            control = new qx.ui.core.Widget();
            control.setUserBounds(0, 0, 0, 0);
            control.setZIndex(1000);

            this._paneClipper.add(control);

            break;

          case "scrollbar-x":
            control = this._createScrollBar("horizontal").set({
              alignY: "bottom"
            });
            control.addListener("scroll", this._onScrollX, this);

            if (this.__clipperContainer__P_205_4 != null) {
              control.setMinHeight(qx.ui.core.scroll.AbstractScrollArea.DEFAULT_SCROLLBAR_WIDTH);

              this.__clipperContainer__P_205_4.add(control, {
                bottom: 0,
                right: 0,
                left: 0
              });
            } else {
              this._add(control, {
                row: 2,
                column: 0
              });
            }

            break;

          case "scrollbar-y":
            control = this._createScrollBar("vertical");
            control.addListener("scroll", this._onScrollY, this);

            if (this.__clipperContainer__P_205_4 != null) {
              this.__clipperContainer__P_205_4.add(control, {
                right: 0,
                bottom: 0,
                top: 0
              });
            } else {
              this._add(control, {
                row: 1,
                column: 1
              });
            }

            break;
        }

        return control || qx.ui.table.pane.Scroller.superclass.prototype._createChildControlImpl.call(this, id);
      },
      // property modifier
      _applyHorizontalScrollBarVisible: function _applyHorizontalScrollBarVisible(value, old) {
        if (value === null) {
          this.__horScrollBar__P_205_5.setVisibility("hidden");
        } else {
          this.__horScrollBar__P_205_5.setVisibility(value ? "visible" : "excluded");
        }
      },
      // property modifier
      _applyVerticalScrollBarVisible: function _applyVerticalScrollBarVisible(value, old) {
        this.__verScrollBar__P_205_6.setVisibility(value ? "visible" : "excluded");
      },
      // property modifier
      _applyTablePaneModel: function _applyTablePaneModel(value, old) {
        if (old != null) {
          old.removeListener("modelChanged", this._onPaneModelChanged, this);
        }

        value.addListener("modelChanged", this._onPaneModelChanged, this);
      },
      // property modifier
      _applyShowCellFocusIndicator: function _applyShowCellFocusIndicator(value, old) {
        if (value) {
          this.__focusIndicator__P_205_7.setDecorator("table-scroller-focus-indicator");

          this._updateFocusIndicator();
        } else {
          if (this.__focusIndicator__P_205_7) {
            this.__focusIndicator__P_205_7.setDecorator(null);
          }
        }
      },

      /**
       * Get the current position of the vertical scroll bar.
       *
       * @return {Integer} The current scroll position.
       */
      getScrollY: function getScrollY() {
        return this.__verScrollBar__P_205_6.getPosition();
      },

      /**
       * Set the current position of the vertical scroll bar.
       *
       * @param scrollY {Integer} The new scroll position.
       * @param renderSync {Boolean?false} Whether the table update should be
       *     performed synchronously.
       */
      setScrollY: function setScrollY(scrollY, renderSync) {
        this.__verScrollBar__P_205_6.scrollTo(scrollY);

        if (renderSync) {
          this._updateContent();
        }
      },

      /**
       * Get the current position of the vertical scroll bar.
       *
       * @return {Integer} The current scroll position.
       */
      getScrollX: function getScrollX() {
        return this.__horScrollBar__P_205_5.getPosition();
      },

      /**
       * Set the current position of the vertical scroll bar.
       *
       * @param scrollX {Integer} The new scroll position.
       */
      setScrollX: function setScrollX(scrollX) {
        this.__horScrollBar__P_205_5.scrollTo(scrollX);
      },

      /**
       * Returns the table this scroller belongs to.
       *
       * @return {qx.ui.table.Table} the table.
       */
      getTable: function getTable() {
        return this.__table__P_205_0;
      },

      /**
       * Creates and returns an instance of pane clipper.
       *
       * @return {qx.ui.table.pane.Clipper} pane clipper.
       */
      _createPaneClipper: function _createPaneClipper() {
        return new qx.ui.table.pane.Clipper();
      },

      /**
       * Creates and returns an instance of header clipper.
       *
       * @return {qx.ui.table.pane.Clipper} pane clipper.
       */
      _createHeaderClipper: function _createHeaderClipper() {
        return new qx.ui.table.pane.Clipper();
      },

      /**
       * Event handler. Called when the visibility of a column has changed.
       */
      onColVisibilityChanged: function onColVisibilityChanged() {
        this.updateHorScrollBarMaximum();

        this._updateFocusIndicator();
      },

      /**
       * Sets the column width.
       *
       * @param col {Integer} the column to change the width for.
       * @param width {Integer} the new width.
       */
      setColumnWidth: function setColumnWidth(col, width) {
        this.__header__P_205_1.setColumnWidth(col, width);

        this.__tablePane__P_205_2.setColumnWidth(col, width);

        var paneModel = this.getTablePaneModel();
        var x = paneModel.getX(col);

        if (x != -1) {
          // The change was in this scroller
          this.updateHorScrollBarMaximum();

          this._updateFocusIndicator();
        }
      },

      /**
       * Event handler. Called when the column order has changed.
       *
       */
      onColOrderChanged: function onColOrderChanged() {
        this.__header__P_205_1.onColOrderChanged();

        this.__tablePane__P_205_2.onColOrderChanged();

        this.updateHorScrollBarMaximum();
      },

      /**
       * Event handler. Called when the table model has changed.
       *
       * @param firstRow {Integer} The index of the first row that has changed.
       * @param lastRow {Integer} The index of the last row that has changed.
       * @param firstColumn {Integer} The model index of the first column that has changed.
       * @param lastColumn {Integer} The model index of the last column that has changed.
       */
      onTableModelDataChanged: function onTableModelDataChanged(firstRow, lastRow, firstColumn, lastColumn) {
        this.__tablePane__P_205_2.onTableModelDataChanged(firstRow, lastRow, firstColumn, lastColumn);

        var rowCount = this.getTable().getTableModel().getRowCount();

        if (rowCount != this.__lastRowCount__P_205_9) {
          this.updateVerScrollBarMaximum();
          var focusedRow = this.getFocusedRow();

          if (focusedRow !== null && focusedRow >= rowCount) {
            if (rowCount == 0) {
              this.setFocusedCell(null, null);
            } else {
              this.setFocusedCell(this.getFocusedColumn(), rowCount - 1);
            }
          }

          this.__lastRowCount__P_205_9 = rowCount;
        }
      },

      /**
       * Event handler. Called when the selection has changed.
       */
      onSelectionChanged: function onSelectionChanged() {
        this.__tablePane__P_205_2.onSelectionChanged();
      },

      /**
       * Event handler. Called when the table gets or looses the focus.
       */
      onFocusChanged: function onFocusChanged() {
        this.__tablePane__P_205_2.onFocusChanged();
      },

      /**
       * Event handler. Called when the table model meta data has changed.
       *
       */
      onTableModelMetaDataChanged: function onTableModelMetaDataChanged() {
        this.__header__P_205_1.onTableModelMetaDataChanged();

        this.__tablePane__P_205_2.onTableModelMetaDataChanged();
      },

      /**
       * Event handler. Called when the pane model has changed.
       */
      _onPaneModelChanged: function _onPaneModelChanged() {
        this.__header__P_205_1.onPaneModelChanged();

        this.__tablePane__P_205_2.onPaneModelChanged();
      },

      /**
       * Event listener for the pane clipper's resize event
       */
      _onResizePane: function _onResizePane() {
        this.updateHorScrollBarMaximum();
        this.updateVerScrollBarMaximum(); // The height has changed -> Update content

        this._updateContent();

        this.__header__P_205_1._updateContent();

        this.__table__P_205_0._updateScrollBarVisibility();
      },

      /**
       * Updates the maximum of the horizontal scroll bar, so it corresponds to the
       * total width of the columns in the table pane.
       */
      updateHorScrollBarMaximum: function updateHorScrollBarMaximum() {
        var paneSize = this._paneClipper.getInnerSize();

        if (!paneSize) {
          // will be called on the next resize event again
          return;
        }

        var scrollSize = this.getTablePaneModel().getTotalWidth();
        var scrollBar = this.__horScrollBar__P_205_5;

        if (paneSize.width < scrollSize) {
          var max = Math.max(0, scrollSize - paneSize.width);
          scrollBar.setMaximum(max);
          scrollBar.setKnobFactor(paneSize.width / scrollSize);
          var pos = scrollBar.getPosition();
          scrollBar.setPosition(Math.min(pos, max));
        } else {
          scrollBar.setMaximum(0);
          scrollBar.setKnobFactor(1);
          scrollBar.setPosition(0);
        }
      },

      /**
       * Updates the maximum of the vertical scroll bar, so it corresponds to the
       * number of rows in the table.
       */
      updateVerScrollBarMaximum: function updateVerScrollBarMaximum() {
        var paneSize = this._paneClipper.getInnerSize();

        if (!paneSize) {
          // will be called on the next resize event again
          return;
        }

        var tableModel = this.getTable().getTableModel();
        var rowCount = tableModel.getRowCount();

        if (this.getTable().getKeepFirstVisibleRowComplete()) {
          rowCount += 1;
        }

        var rowHeight = this.getTable().getRowHeight();
        var scrollSize = rowCount * rowHeight;
        var scrollBar = this.__verScrollBar__P_205_6;

        if (paneSize.height < scrollSize) {
          var max = Math.max(0, scrollSize - paneSize.height);
          scrollBar.setMaximum(max);
          scrollBar.setKnobFactor(paneSize.height / scrollSize);
          var pos = scrollBar.getPosition();
          scrollBar.setPosition(Math.min(pos, max));
        } else {
          scrollBar.setMaximum(0);
          scrollBar.setKnobFactor(1);
          scrollBar.setPosition(0);
        }
      },

      /**
       * Event handler. Called when the table property "keepFirstVisibleRowComplete"
       * changed.
       */
      onKeepFirstVisibleRowCompleteChanged: function onKeepFirstVisibleRowCompleteChanged() {
        this.updateVerScrollBarMaximum();

        this._updateContent();
      },

      /**
       * Event handler for the scroller's appear event
       */
      _onAppear: function _onAppear() {
        // after the Scroller appears we start the interval again
        this._startInterval(this.getScrollTimeout());
      },

      /**
       * Event handler for the disappear event
       */
      _onDisappear: function _onDisappear() {
        // before the scroller disappears we need to stop it
        this._stopInterval();
      },

      /**
       * Event handler. Called when the horizontal scroll bar moved.
       *
       * @param e {Map} the event.
       */
      _onScrollX: function _onScrollX(e) {
        var scrollLeft = e.getData();
        this.fireDataEvent("changeScrollX", scrollLeft, e.getOldData());

        this._headerClipper.scrollToX(scrollLeft);

        this._paneClipper.scrollToX(scrollLeft);
      },

      /**
       * Event handler. Called when the vertical scroll bar moved.
       *
       * @param e {Map} the event.
       */
      __inOnScrollY__P_205_28: false,
      _onScrollY: function _onScrollY(e) {
        if (this.__inOnScrollY__P_205_28) {
          return;
        }

        var scrollbar = this.__verScrollBar__P_205_6;
        this.__inOnScrollY__P_205_28 = true; // calculate delta so that one row is scrolled at an minimum

        var rowHeight = this.getTable().getRowHeight();
        var delta = e.getData() - e.getOldData();

        if (Math.abs(delta) > 1 && Math.abs(delta) < rowHeight) {
          delta = delta < 0 ? e.getOldData() - rowHeight : e.getOldData() + rowHeight;

          if (delta >= 0 && delta <= scrollbar.getMaximum()) {
            scrollbar.setPosition(delta);
          }
        }

        this.__inOnScrollY__P_205_28 = false;
        this.fireDataEvent("changeScrollY", scrollbar.getPosition(), e.getOldData());

        this._postponedUpdateContent();
      },

      /**
       * Event handler. Called when the user moved the mouse wheel.
       *
       * @param e {qx.event.type.Roll} the event.
       */
      _onRoll: function _onRoll(e) {
        var table = this.getTable();

        if (e.getPointerType() == "mouse" || !table.getEnabled()) {
          return;
        } // vertical scrolling


        var delta = e.getDelta(); // normalize that at least one step is scrolled at a time

        if (delta.y > 0 && delta.y < 1) {
          delta.y = 1;
        } else if (delta.y < 0 && delta.y > -1) {
          delta.y = -1;
        }

        this.__verScrollBar__P_205_6.scrollBy(parseInt(delta.y, 10));

        var scrolled = delta.y != 0 && !this.__isAtEdge__P_205_29(this.__verScrollBar__P_205_6, delta.y); // horizontal scrolling
        // normalize that at least one step is scrolled at a time

        if (delta.x > 0 && delta.x < 1) {
          delta.x = 1;
        } else if (delta.x < 0 && delta.x > -1) {
          delta.x = -1;
        }

        this.__horScrollBar__P_205_5.scrollBy(parseInt(delta.x, 10)); // Update the focus


        if (this.__lastPointerPageX__P_205_21 && this.getFocusCellOnPointerMove()) {
          this._focusCellAtPagePos(this.__lastPointerPageX__P_205_21, this.__lastPointerPageY__P_205_22);
        }

        scrolled = scrolled || delta.x != 0 && !this.__isAtEdge__P_205_29(this.__horScrollBar__P_205_5, delta.x); // pass the event to the parent if the scrollbar is at an edge

        if (scrolled) {
          e.stop();
        } else {
          e.stopMomentum();
        }
      },

      /**
       * Checks if the table has been scrolled.
       * @param scrollBar {qx.ui.core.scroll.IScrollBar} The scrollbar to check
       * @param delta {Number} The scroll delta.
       * @return {Boolean} <code>true</code>, if the scrolling is a the edge
       */
      __isAtEdge__P_205_29: function __isAtEdge__P_205_29(scrollBar, delta) {
        var position = scrollBar.getPosition();
        return delta < 0 && position <= 0 || delta > 0 && position >= scrollBar.getMaximum();
      },

      /**
       * Common column resize logic.
       *
       * @param pageX {Integer} the current pointer x position.
       */
      __handleResizeColumn__P_205_30: function __handleResizeColumn__P_205_30(pageX) {
        var table = this.getTable(); // We are currently resizing -> Update the position

        var headerCell = this.__header__P_205_1.getHeaderWidgetAtColumn(this.__resizeColumn__P_205_15);

        var minColumnWidth = headerCell.getSizeHint().minWidth;
        var newWidth = Math.max(minColumnWidth, this.__lastResizeWidth__P_205_17 + pageX - this.__lastResizePointerPageX__P_205_16);

        if (this.getLiveResize()) {
          var columnModel = table.getTableColumnModel();
          columnModel.setColumnWidth(this.__resizeColumn__P_205_15, newWidth, true);
        } else {
          var paneModel = this.getTablePaneModel();

          this._showResizeLine(paneModel.getColumnLeft(this.__resizeColumn__P_205_15) + newWidth);
        }

        this.__lastResizePointerPageX__P_205_16 += newWidth - this.__lastResizeWidth__P_205_17;
        this.__lastResizeWidth__P_205_17 = newWidth;
      },

      /**
       * Common column move logic.
       *
       * @param pageX {Integer} the current pointer x position.
       *
       */
      __handleMoveColumn__P_205_31: function __handleMoveColumn__P_205_31(pageX) {
        // We are moving a column
        // Check whether we moved outside the tap tolerance so we can start
        // showing the column move feedback
        // (showing the column move feedback prevents the ontap event)
        var tapTolerance = qx.ui.table.pane.Scroller.TAP_TOLERANCE;

        if (this.__header__P_205_1.isShowingColumnMoveFeedback() || pageX > this.__lastMovePointerPageX__P_205_14 + tapTolerance || pageX < this.__lastMovePointerPageX__P_205_14 - tapTolerance) {
          this.__lastMoveColPos__P_205_13 += pageX - this.__lastMovePointerPageX__P_205_14;

          this.__header__P_205_1.showColumnMoveFeedback(this._moveColumn, this.__lastMoveColPos__P_205_13); // Get the responsible scroller


          var targetScroller = this.__table__P_205_0.getTablePaneScrollerAtPageX(pageX);

          if (this._lastMoveTargetScroller && this._lastMoveTargetScroller != targetScroller) {
            this._lastMoveTargetScroller.hideColumnMoveFeedback();
          }

          if (targetScroller != null) {
            this._lastMoveTargetX = targetScroller.showColumnMoveFeedback(pageX);
          } else {
            this._lastMoveTargetX = null;
          }

          this._lastMoveTargetScroller = targetScroller;
          this.__lastMovePointerPageX__P_205_14 = pageX;
        }
      },

      /**
       * Event handler. Called when the user moved the pointer over the header.
       *
       * @param e {Map} the event.
       */
      _onPointermoveHeader: function _onPointermoveHeader(e) {
        var table = this.getTable();

        if (!table.getEnabled()) {
          return;
        }

        var useResizeCursor = false;
        var pointerOverColumn = null;
        var pageX = e.getDocumentLeft();
        var pageY = e.getDocumentTop(); // Workaround: In onmousewheel the event has wrong coordinates for pageX
        //       and pageY. So we remember the last move event.

        this.__lastPointerPageX__P_205_21 = pageX;
        this.__lastPointerPageY__P_205_22 = pageY;

        if (this.__resizeColumn__P_205_15 != null) {
          // We are currently resizing -> Update the position
          this.__handleResizeColumn__P_205_30(pageX);

          useResizeCursor = true;
          e.stopPropagation();
        } else if (this._moveColumn != null) {
          // We are moving a column
          this.__handleMoveColumn__P_205_31(pageX);

          e.stopPropagation();
        } else {
          var resizeCol = this._getResizeColumnForPageX(pageX);

          if (resizeCol != -1) {
            // The pointer is over a resize region -> Show the right cursor
            useResizeCursor = true;
          } else {
            var tableModel = table.getTableModel();

            var col = this._getColumnForPageX(pageX);

            if (col != null && tableModel.isColumnSortable(col)) {
              pointerOverColumn = col;
            }
          }
        }

        var cursor = useResizeCursor ? "col-resize" : null;
        this.getApplicationRoot().setGlobalCursor(cursor);
        this.setCursor(cursor);

        this.__header__P_205_1.setPointerOverColumn(pointerOverColumn);
      },

      /**
       * Event handler. Called when the user moved the pointer over the pane.
       *
       * @param e {Map} the event.
       */
      _onPointermovePane: function _onPointermovePane(e) {
        var table = this.getTable();

        if (!table.getEnabled()) {
          return;
        } //var useResizeCursor = false;


        var pageX = e.getDocumentLeft();
        var pageY = e.getDocumentTop(); // Workaround: In onpointerwheel the event has wrong coordinates for pageX
        //       and pageY. So we remember the last move event.

        this.__lastPointerPageX__P_205_21 = pageX;
        this.__lastPointerPageY__P_205_22 = pageY;
        var useResizeCursor = false;

        var resizeCol = this._getResizeColumnForPageX(pageX);

        if (resizeCol != -1) {
          // The pointer is over a resize region -> Show the right cursor
          useResizeCursor = true;
        }

        var cursor = useResizeCursor ? "col-resize" : null;
        this.getApplicationRoot().setGlobalCursor(cursor);
        this.setCursor(cursor);

        var row = this._getRowForPagePos(pageX, pageY);

        if (row != null && this._getColumnForPageX(pageX) != null) {
          // The pointer is over the data -> update the focus
          if (this.getFocusCellOnPointerMove()) {
            this._focusCellAtPagePos(pageX, pageY);
          }
        }

        this.__header__P_205_1.setPointerOverColumn(null);
      },

      /**
       * Event handler. Called when the user pressed a pointer button over the header.
       *
       * @param e {Map} the event.
       */
      _onPointerdownHeader: function _onPointerdownHeader(e) {
        if (!this.getTable().getEnabled()) {
          return;
        }

        var pageX = e.getDocumentLeft(); // pointer is in header

        var resizeCol = this._getResizeColumnForPageX(pageX);

        if (resizeCol != -1) {
          // The pointer is over a resize region -> Start resizing
          this._startResizeHeader(resizeCol, pageX);

          e.stop();
        } else {
          // The pointer is not in a resize region
          var moveCol = this._getColumnForPageX(pageX);

          if (moveCol != null) {
            this._startMoveHeader(moveCol, pageX);

            e.stop();
          }
        }
      },

      /**
       * Start a resize session of the header.
       *
       * @param resizeCol {Integer} the column index
       * @param pageX {Integer} x coordinate of the pointer event
       */
      _startResizeHeader: function _startResizeHeader(resizeCol, pageX) {
        var columnModel = this.getTable().getTableColumnModel(); // The pointer is over a resize region -> Start resizing

        this.__resizeColumn__P_205_15 = resizeCol;
        this.__lastResizePointerPageX__P_205_16 = pageX;
        this.__lastResizeWidth__P_205_17 = columnModel.getColumnWidth(this.__resizeColumn__P_205_15);

        this._headerClipper.capture();
      },

      /**
       * Start a move session of the header.
       *
       * @param moveCol {Integer} the column index
       * @param pageX {Integer} x coordinate of the pointer event
       */
      _startMoveHeader: function _startMoveHeader(moveCol, pageX) {
        // Prepare column moving
        this._moveColumn = moveCol;
        this.__lastMovePointerPageX__P_205_14 = pageX;
        this.__lastMoveColPos__P_205_13 = this.getTablePaneModel().getColumnLeft(moveCol);

        this._headerClipper.capture();
      },

      /**
       * Event handler. Called when the user pressed a pointer button over the pane.
       *
       * @param e {Map} the event.
       */
      _onPointerdownPane: function _onPointerdownPane(e) {
        var table = this.getTable();

        if (!table.getEnabled()) {
          return;
        }

        if (table.isEditing()) {
          table.stopEditing();
        }

        var pageX = e.getDocumentLeft(); // pointer is in header

        var resizeCol = this._getResizeColumnForPageX(pageX);

        if (resizeCol != -1) {
          // The pointer is over a resize region -> Start resizing
          this._startResizeHeader(resizeCol, pageX);

          e.stop();
          return;
        }

        var pageY = e.getDocumentTop();

        var row = this._getRowForPagePos(pageX, pageY);

        var col = this._getColumnForPageX(pageX);

        if (row !== null) {
          // The focus indicator blocks the tap event on the scroller so we
          // store the current cell and listen for the pointerup event on the
          // focus indicator
          //
          // INVARIANT:
          //  The members of this object always contain the last position of
          //  the cell on which the pointerdown event occurred.
          //  *** These values are never cleared! ***.
          //  Different browsers/OS combinations issue events in different
          //  orders, and the context menu event, in particular, can be issued
          //  early or late (Firefox on Linux issues it early; Firefox on
          //  Windows issues it late) so no one may clear these values.
          //
          this.__lastPointerDownCell__P_205_18 = {
            row: row,
            col: col
          }; // On the other hand, we need to know if we've issued the tap event
          // so we don't issue it twice, both from pointer-up on the focus
          // indicator, and from the tap even on the pane. Both possibilities
          // are necessary, however, to maintain the qooxdoo order of events.

          this.__firedTapEvent__P_205_19 = false;
        }
      },

      /**
       * Event handler for the focus indicator's pointerup event
       *
       * @param e {qx.event.type.Pointer} The pointer event
       */
      _onPointerupFocusIndicator: function _onPointerupFocusIndicator(e) {
        if (this.__lastPointerDownCell__P_205_18 && !this.__firedTapEvent__P_205_19 && !this.isEditing() && this.__focusIndicator__P_205_7.getRow() == this.__lastPointerDownCell__P_205_18.row && this.__focusIndicator__P_205_7.getColumn() == this.__lastPointerDownCell__P_205_18.col) {
          this.fireEvent("cellTap", qx.ui.table.pane.CellEvent, [this, e, this.__lastPointerDownCell__P_205_18.row, this.__lastPointerDownCell__P_205_18.col], true);
          this.__firedTapEvent__P_205_19 = true;
        } else if (!this.isEditing()) {
          // if no cellTap event should be fired, act like a pointerdown which
          // invokes the change of the selection e.g. [BUG #1632]
          this._onPointerdownPane(e);
        }
      },

      /**
       * Event handler. Called when the event capturing of the header changed.
       * Stops/finishes an active header resize/move session if it lost capturing
       * during the session to stay in a stable state.
       *
       * @param e {qx.event.type.Data} The data event
       */
      _onChangeCaptureHeader: function _onChangeCaptureHeader(e) {
        if (this.__resizeColumn__P_205_15 != null) {
          this._stopResizeHeader();
        }

        if (this._moveColumn != null) {
          this._stopMoveHeader();
        }
      },

      /**
       * Stop a resize session of the header.
       *
       */
      _stopResizeHeader: function _stopResizeHeader() {
        var columnModel = this.getTable().getTableColumnModel(); // We are currently resizing -> Finish resizing

        if (!this.getLiveResize()) {
          this._hideResizeLine();

          columnModel.setColumnWidth(this.__resizeColumn__P_205_15, this.__lastResizeWidth__P_205_17, true);
        }

        this.__resizeColumn__P_205_15 = null;

        this._headerClipper.releaseCapture();

        this.getApplicationRoot().setGlobalCursor(null);
        this.setCursor(null);
      },

      /**
       * Stop a move session of the header.
       *
       */
      _stopMoveHeader: function _stopMoveHeader() {
        var columnModel = this.getTable().getTableColumnModel();
        var paneModel = this.getTablePaneModel(); // We are moving a column -> Drop the column

        this.__header__P_205_1.hideColumnMoveFeedback();

        if (this._lastMoveTargetScroller) {
          this._lastMoveTargetScroller.hideColumnMoveFeedback();
        }

        if (this._lastMoveTargetX != null) {
          var fromVisXPos = paneModel.getFirstColumnX() + paneModel.getX(this._moveColumn);
          var toVisXPos = this._lastMoveTargetX;

          if (toVisXPos != fromVisXPos && toVisXPos != fromVisXPos + 1) {
            // The column was really moved to another position
            // (and not moved before or after itself, which is a noop)
            // Translate visible positions to overall positions
            var fromCol = columnModel.getVisibleColumnAtX(fromVisXPos);
            var toCol = columnModel.getVisibleColumnAtX(toVisXPos);
            var fromOverXPos = columnModel.getOverallX(fromCol);
            var toOverXPos = toCol != null ? columnModel.getOverallX(toCol) : columnModel.getOverallColumnCount();

            if (toOverXPos > fromOverXPos) {
              // Don't count the column itself
              toOverXPos--;
            } // Move the column


            columnModel.moveColumn(fromOverXPos, toOverXPos); // update the focus indicator including the editor

            this._updateFocusIndicator();
          }
        }

        this._moveColumn = null;
        this._lastMoveTargetX = null;

        this._headerClipper.releaseCapture();
      },

      /**
       * Event handler. Called when the user released a pointer button over the header.
       *
       * @param e {Map} the event.
       */
      _onPointerupHeader: function _onPointerupHeader(e) {
        var table = this.getTable();

        if (!table.getEnabled()) {
          return;
        }

        if (this.__resizeColumn__P_205_15 != null) {
          this._stopResizeHeader();

          this.__ignoreTap__P_205_20 = true;
          e.stop();
        } else if (this._moveColumn != null) {
          this._stopMoveHeader();

          e.stop();
        }
      },

      /**
       * Event handler. Called when the user tapped a pointer button over the header.
       *
       * @param e {Map} the event.
       */
      _onTapHeader: function _onTapHeader(e) {
        if (this.__ignoreTap__P_205_20) {
          this.__ignoreTap__P_205_20 = false;
          return;
        }

        var table = this.getTable();

        if (!table.getEnabled()) {
          return;
        }

        var tableModel = table.getTableModel();
        var pageX = e.getDocumentLeft();

        var resizeCol = this._getResizeColumnForPageX(pageX);

        if (resizeCol == -1) {
          // pointer is not in a resize region
          var col = this._getColumnForPageX(pageX);

          if (col != null && tableModel.isColumnSortable(col)) {
            // Sort that column
            var sortCol = tableModel.getSortColumnIndex();
            var ascending = col != sortCol ? true : !tableModel.isSortAscending();
            var data = {
              column: col,
              ascending: ascending,
              tapEvent: e
            };

            if (this.fireDataEvent("beforeSort", data, null, true)) {
              // Stop cell editing
              if (table.isEditing()) {
                table.stopEditing();
              }

              tableModel.sortByColumn(col, ascending);

              if (this.getResetSelectionOnHeaderTap()) {
                table.getSelectionModel().resetSelection();
              }
            }
          }
        }

        e.stop();
      },

      /**
       * Event handler. Called when the user tapped a pointer button over the pane.
       *
       * @param e {Map} the event.
       */
      _onTapPane: function _onTapPane(e) {
        var table = this.getTable();

        if (!table.getEnabled()) {
          return;
        }

        var pageX = e.getDocumentLeft();
        var pageY = e.getDocumentTop();

        var row = this._getRowForPagePos(pageX, pageY);

        var col = this._getColumnForPageX(pageX);

        if (row != null && col != null) {
          var selectBeforeFocus = this.getSelectBeforeFocus();

          if (selectBeforeFocus) {
            table.getSelectionManager().handleTap(row, e);
          } // The pointer is over the data -> update the focus


          if (!this.getFocusCellOnPointerMove()) {
            this._focusCellAtPagePos(pageX, pageY);
          }

          if (!selectBeforeFocus) {
            table.getSelectionManager().handleTap(row, e);
          }

          if (this.__focusIndicator__P_205_7.isHidden() || this.__lastPointerDownCell__P_205_18 && !this.__firedTapEvent__P_205_19 && !this.isEditing() && row == this.__lastPointerDownCell__P_205_18.row && col == this.__lastPointerDownCell__P_205_18.col) {
            this.fireEvent("cellTap", qx.ui.table.pane.CellEvent, [this, e, row, col], true);
            this.__firedTapEvent__P_205_19 = true;
          }
        } else {
          if (row == null && this.getResetSelectionOnTapBelowRows()) {
            table.getSelectionModel().resetSelection();
          }
        }
      },

      /**
       * Event handler. Called when a context menu is invoked in a cell.
       *
       * @param e {qx.event.type.Pointer} the event.
       */
      _onContextMenu: function _onContextMenu(e) {
        var pageX = e.getDocumentLeft();
        var pageY = e.getDocumentTop();

        var row = this._getRowForPagePos(pageX, pageY);

        var col = this._getColumnForPageX(pageX);
        /*
         * The 'row' value will be null if the right-click was in the blank
         * area below the last data row. Some applications desire to receive
         * the context menu event anyway, and can set the property value of
         * contextMenuFromDataCellsOnly to false to achieve that.
         */


        if (row === null && this.getContextMenuFromDataCellsOnly()) {
          return;
        }

        if (!this.getShowCellFocusIndicator() || row === null || this.__lastPointerDownCell__P_205_18 && row == this.__lastPointerDownCell__P_205_18.row && col == this.__lastPointerDownCell__P_205_18.col) {
          this.fireEvent("cellContextmenu", qx.ui.table.pane.CellEvent, [this, e, row, col], true); // Now that the cellContextmenu handler has had a chance to build
          // the menu for this cell, display it (if there is one).

          var menu = this.getTable().getContextMenu();

          if (menu) {
            // A menu with no children means don't display any context menu
            // including the default context menu even if the default context
            // menu is allowed to be displayed normally. There's no need to
            // actually show an empty menu, though.
            if (menu.getChildren().length > 0) {
              menu.openAtPointer(e);
            } else {
              menu.exclude();
            } // Do not show native menu


            e.preventDefault();
          }
        }
      },
      // overridden
      _onContextMenuOpen: function _onContextMenuOpen(e) {// This is Widget's context menu handler which typically retrieves
        // and displays the menu as soon as it receives a "contextmenu" event.
        // We want to allow the cellContextmenu handler to create the menu,
        // so we'll override this method with a null one, and do the menu
        // placement and display handling in our _onContextMenu method.
      },

      /**
       * Event handler. Called when the user double tapped a pointer button over the pane.
       *
       * @param e {Map} the event.
       */
      _onDbltapPane: function _onDbltapPane(e) {
        var pageX = e.getDocumentLeft();
        var pageY = e.getDocumentTop();

        var col = this._getColumnForPageX(pageX);

        if (col !== null) {
          this._focusCellAtPagePos(pageX, pageY);

          this.startEditing();

          var row = this._getRowForPagePos(pageX, pageY);

          if (row != -1 && row != null) {
            this.fireEvent("cellDbltap", qx.ui.table.pane.CellEvent, [this, e, row], true);
          }
        }
      },

      /**
       * Event handler. Called when the pointer moved out.
       *
       * @param e {Map} the event.
       */
      _onPointerout: function _onPointerout(e) {
        var table = this.getTable();

        if (!table.getEnabled()) {
          return;
        } // Reset the resize cursor when the pointer leaves the header
        // If currently a column is resized then do nothing
        // (the cursor will be reset on pointerup)


        if (this.__resizeColumn__P_205_15 == null) {
          this.setCursor(null);
          this.getApplicationRoot().setGlobalCursor(null);
        }

        this.__header__P_205_1.setPointerOverColumn(null); // in case the focus follows the pointer, it should be remove on pointerout


        if (this.getFocusCellOnPointerMove()) {
          this.__table__P_205_0.setFocusedCell();
        }
      },

      /**
       * Shows the resize line.
       *
       * @param x {Integer} the position where to show the line (in pixels, relative to
       *      the left side of the pane).
       */
      _showResizeLine: function _showResizeLine(x) {
        var resizeLine = this._showChildControl("resize-line");

        var width = resizeLine.getWidth();

        var paneBounds = this._paneClipper.getBounds();

        resizeLine.setUserBounds(x - Math.round(width / 2), 0, width, paneBounds.height);
      },

      /**
       * Hides the resize line.
       */
      _hideResizeLine: function _hideResizeLine() {
        this._excludeChildControl("resize-line");
      },

      /**
       * Shows the feedback shown while a column is moved by the user.
       *
       * @param pageX {Integer} the x position of the pointer in the page (in pixels).
       * @return {Integer} the visible x position of the column in the whole table.
       */
      showColumnMoveFeedback: function showColumnMoveFeedback(pageX) {
        var paneModel = this.getTablePaneModel();
        var columnModel = this.getTable().getTableColumnModel();

        var paneLeft = this.__tablePane__P_205_2.getContentLocation().left;

        var colCount = paneModel.getColumnCount();
        var targetXPos = 0;
        var targetX = 0;
        var currX = paneLeft;

        for (var xPos = 0; xPos < colCount; xPos++) {
          var col = paneModel.getColumnAtX(xPos);
          var colWidth = columnModel.getColumnWidth(col);

          if (pageX < currX + colWidth / 2) {
            break;
          }

          currX += colWidth;
          targetXPos = xPos + 1;
          targetX = currX - paneLeft;
        } // Ensure targetX is visible


        var scrollerLeft = this._paneClipper.getContentLocation().left;

        var scrollerWidth = this._paneClipper.getBounds().width;

        var scrollX = scrollerLeft - paneLeft; // NOTE: +2/-1 because of feedback width

        targetX = qx.lang.Number.limit(targetX, scrollX + 2, scrollX + scrollerWidth - 1);

        this._showResizeLine(targetX); // Return the overall target x position


        return paneModel.getFirstColumnX() + targetXPos;
      },

      /**
       * Hides the feedback shown while a column is moved by the user.
       */
      hideColumnMoveFeedback: function hideColumnMoveFeedback() {
        this._hideResizeLine();
      },

      /**
       * Sets the focus to the cell that's located at the page position
       * <code>pageX</code>/<code>pageY</code>. If there is no cell at that position,
       * nothing happens.
       *
       * @param pageX {Integer} the x position in the page (in pixels).
       * @param pageY {Integer} the y position in the page (in pixels).
       */
      _focusCellAtPagePos: function _focusCellAtPagePos(pageX, pageY) {
        var row = this._getRowForPagePos(pageX, pageY);

        if (row != -1 && row != null) {
          // The pointer is over the data -> update the focus
          var col = this._getColumnForPageX(pageX);

          this.__table__P_205_0.setFocusedCell(col, row);
        }
      },

      /**
       * Sets the currently focused cell.
       *
       * @param col {Integer} the model index of the focused cell's column.
       * @param row {Integer} the model index of the focused cell's row.
       */
      setFocusedCell: function setFocusedCell(col, row) {
        if (!this.isEditing()) {
          this.__tablePane__P_205_2.setFocusedCell(col, row, this.__updateContentPlanned__P_205_11);

          this.__focusedCol__P_205_23 = col;
          this.__focusedRow__P_205_24 = row;

          this._updateFocusIndicator();
        }
      },

      /**
       * Returns the column of currently focused cell.
       *
       * @return {Integer} the model index of the focused cell's column.
       */
      getFocusedColumn: function getFocusedColumn() {
        return this.__focusedCol__P_205_23;
      },

      /**
       * Returns the row of currently focused cell.
       *
       * @return {Integer} the model index of the focused cell's column.
       */
      getFocusedRow: function getFocusedRow() {
        return this.__focusedRow__P_205_24;
      },

      /**
       * Scrolls a cell visible.
       *
       * @param col {Integer} the model index of the column the cell belongs to.
       * @param row {Integer} the model index of the row the cell belongs to.
       */
      scrollCellVisible: function scrollCellVisible(col, row) {
        var paneModel = this.getTablePaneModel();
        var xPos = paneModel.getX(col);

        if (xPos != -1) {
          var clipperSize = this._paneClipper.getInnerSize();

          if (!clipperSize) {
            return;
          }

          var columnModel = this.getTable().getTableColumnModel();
          var colLeft = paneModel.getColumnLeft(col);
          var colWidth = columnModel.getColumnWidth(col);
          var rowHeight = this.getTable().getRowHeight();
          var rowTop = row * rowHeight;
          var scrollX = this.getScrollX();
          var scrollY = this.getScrollY(); // NOTE: We don't use qx.lang.Number.limit, because min should win if max < min

          var minScrollX = Math.min(colLeft, colLeft + colWidth - clipperSize.width);
          var maxScrollX = colLeft;
          this.setScrollX(Math.max(minScrollX, Math.min(maxScrollX, scrollX)));
          var minScrollY = rowTop + rowHeight - clipperSize.height;

          if (this.getTable().getKeepFirstVisibleRowComplete()) {
            minScrollY += rowHeight;
          }

          var maxScrollY = rowTop;
          this.setScrollY(Math.max(minScrollY, Math.min(maxScrollY, scrollY)), true);
        }
      },

      /**
       * Returns whether currently a cell is editing.
       *
       * @return {var} whether currently a cell is editing.
       */
      isEditing: function isEditing() {
        return this._cellEditor != null;
      },

      /**
       * Starts editing the currently focused cell. Does nothing if already
       * editing, if the column is not editable, or if the cell editor for the
       * column ascertains that the particular cell is not editable.
       *
       * @return {Boolean} whether editing was started
       */
      startEditing: function startEditing() {
        var table = this.getTable();
        var tableModel = table.getTableModel();
        var col = this.__focusedCol__P_205_23;

        if (!this.isEditing() && col != null && tableModel.isColumnEditable(col)) {
          var row = this.__focusedRow__P_205_24;
          var xPos = this.getTablePaneModel().getX(col);
          var value = tableModel.getValue(col, row); // scroll cell into view

          this.scrollCellVisible(col, row);
          this.__cellEditorFactory__P_205_25 = table.getTableColumnModel().getCellEditorFactory(col);
          var cellInfo = {
            col: col,
            row: row,
            xPos: xPos,
            value: value,
            table: table
          }; // Get a cell editor

          this._cellEditor = this.__cellEditorFactory__P_205_25.createCellEditor(cellInfo); // We handle two types of cell editors: the traditional in-place
          // editor, where the cell editor returned by the factory must fit in
          // the space of the table cell; and a modal window in which the
          // editing takes place.  Additionally, if the cell editor determines
          // that it does not want to edit the particular cell being requested,
          // it may return null to indicate that that cell is not editable.

          if (this._cellEditor === null) {
            // This cell is not editable even though its column is.
            return false;
          } else if (this._cellEditor instanceof qx.ui.window.Window) {
            // It's a window.  Ensure that it's modal.
            this._cellEditor.setModal(true); // At least for the time being, we disallow the close button.  It
            // acts differently than a cellEditor.close(), and invokes a bug
            // someplace.  Modal window cell editors should provide their own
            // buttons or means to activate a cellEditor.close() or equivalently
            // cellEditor.hide().


            this._cellEditor.setShowClose(false); // Arrange to be notified when it is closed.


            this._cellEditor.addListener("close", this._onCellEditorModalWindowClose, this); // If there's a pre-open function defined for the table...


            var f = table.getModalCellEditorPreOpenFunction();

            if (f != null) {
              f(this._cellEditor, cellInfo);
            } // Open it now.


            this._cellEditor.open();
          } else {
            // prevent tap event from bubbling up to the table
            this.__focusIndicatorPointerDownListener__P_205_27 = this.__focusIndicator__P_205_7.addListener("pointerdown", function (e) {
              this.__lastPointerDownCell__P_205_18 = {
                row: this.__focusedRow__P_205_24,
                col: this.__focusedCol__P_205_23
              };
              e.stopPropagation();
            }, this);

            this._updateFocusIndicator(true);

            this.__focusIndicator__P_205_7.add(this._cellEditor);

            this.__focusIndicator__P_205_7.addState("editing");

            this.__focusIndicator__P_205_7.setKeepActive(false); // Make the focus indicator visible during editing


            this.__focusIndicator__P_205_7.setDecorator("table-scroller-focus-indicator");

            this._cellEditor.focus();

            this._cellEditor.activate();
          }

          return true;
        }

        return false;
      },

      /**
       * Stops editing and writes the editor's value to the model.
       */
      stopEditing: function stopEditing() {
        // If the focus indicator is not being shown normally...
        if (!this.getShowCellFocusIndicator()) {
          // ... then hide it again
          this.__focusIndicator__P_205_7.setDecorator(null);
        }

        this.flushEditor(true);
      },

      /**
       * Writes the editor's value to the model
       *
       * @param cancel {Boolean ? false} Whether to also cancel
       *      editing before firing the 'dateEdited' event.
       */
      flushEditor: function flushEditor(cancel) {
        if (this.isEditing()) {
          var value = this.__cellEditorFactory__P_205_25.getCellEditorValue(this._cellEditor);

          var oldValue = this.getTable().getTableModel().getValue(this.__focusedCol__P_205_23, this.__focusedRow__P_205_24);
          this.getTable().getTableModel().setValue(this.__focusedCol__P_205_23, this.__focusedRow__P_205_24, value);

          this.__table__P_205_0.focus();

          if (cancel) {
            this.cancelEditing();
          } // Fire an event containing the value change.


          this.__table__P_205_0.fireDataEvent("dataEdited", {
            row: this.__focusedRow__P_205_24,
            col: this.__focusedCol__P_205_23,
            oldValue: oldValue,
            value: value
          });
        }
      },

      /**
       * Stops editing without writing the editor's value to the model.
       */
      cancelEditing: function cancelEditing() {
        if (this.isEditing()) {
          if (!(this._cellEditor instanceof qx.ui.window.Window)) {
            this.__focusIndicator__P_205_7.removeState("editing");

            this.__focusIndicator__P_205_7.setKeepActive(true);

            if (this.__focusIndicatorPointerDownListener__P_205_27 !== null) {
              this.__focusIndicator__P_205_7.removeListenerById(this.__focusIndicatorPointerDownListener__P_205_27);

              this.__focusIndicatorPointerDownListener__P_205_27 = null;
            }

            this._updateFocusIndicator();
          }

          this._cellEditor.destroy();

          this._cellEditor = null;
          this.__cellEditorFactory__P_205_25 = null;
        }
      },

      /**
       * Event handler. Called when the modal window of the cell editor closes.
       *
       * @param e {Map} the event.
       */
      _onCellEditorModalWindowClose: function _onCellEditorModalWindowClose(e) {
        this.stopEditing();
      },

      /**
       * Returns the model index of the column the pointer is over or null if the pointer
       * is not over a column.
       *
       * @param pageX {Integer} the x position of the pointer in the page (in pixels).
       * @return {Integer} the model index of the column the pointer is over.
       */
      _getColumnForPageX: function _getColumnForPageX(pageX) {
        var columnModel = this.getTable().getTableColumnModel();
        var paneModel = this.getTablePaneModel();
        var colCount = paneModel.getColumnCount();

        var currX = this.__tablePane__P_205_2.getContentLocation().left;

        for (var x = 0; x < colCount; x++) {
          var col = paneModel.getColumnAtX(x);
          var colWidth = columnModel.getColumnWidth(col);
          currX += colWidth;

          if (pageX < currX) {
            return col;
          }
        }

        return null;
      },

      /**
       * Returns the model index of the column that should be resized when dragging
       * starts here. Returns -1 if the pointer is in no resize region of any column.
       *
       * @param pageX {Integer} the x position of the pointer in the page (in pixels).
       * @return {Integer} the column index.
       */
      _getResizeColumnForPageX: function _getResizeColumnForPageX(pageX) {
        var contentLocation = this.__header__P_205_1.getContentLocation() || this.__tablePane__P_205_2.getContentLocation();

        if (contentLocation) {
          var currX = contentLocation.left;
          var columnModel = this.getTable().getTableColumnModel();
          var paneModel = this.getTablePaneModel();
          var colCount = paneModel.getColumnCount();
          var regionRadius = qx.ui.table.pane.Scroller.RESIZE_REGION_RADIUS;

          for (var x = 0; x < colCount; x++) {
            var col = paneModel.getColumnAtX(x);
            var colWidth = columnModel.getColumnWidth(col);
            currX += colWidth;

            if (pageX >= currX - regionRadius && pageX <= currX + regionRadius) {
              return col;
            }
          }
        }

        return -1;
      },

      /**
       * Returns the model index of the row the pointer is currently over. Returns -1 if
       * the pointer is over the header. Returns null if the pointer is not over any
       * column.
       *
       * @param pageX {Integer} the pointer x position in the page.
       * @param pageY {Integer} the pointer y position in the page.
       * @return {Integer} the model index of the row the pointer is currently over.
       */
      _getRowForPagePos: function _getRowForPagePos(pageX, pageY) {
        var panePos = this.__tablePane__P_205_2.getContentLocation();

        if (panePos === null || pageX < panePos.left || pageX > panePos.right) {
          // There was no cell or header cell hit
          return null;
        }

        if (pageY >= panePos.top && pageY <= panePos.bottom) {
          // This event is in the pane -> Get the row
          var rowHeight = this.getTable().getRowHeight();

          var scrollY = this.__verScrollBar__P_205_6.getPosition();

          if (this.getTable().getKeepFirstVisibleRowComplete()) {
            scrollY = Math.floor(scrollY / rowHeight) * rowHeight;
          }

          var tableY = scrollY + pageY - panePos.top;
          var row = Math.floor(tableY / rowHeight);
          var tableModel = this.getTable().getTableModel();
          var rowCount = tableModel.getRowCount();
          return row < rowCount ? row : null;
        }

        var headerPos = this.__header__P_205_1.getContentLocation();

        if (headerPos !== null && pageY >= headerPos.top && pageY <= headerPos.bottom && pageX <= headerPos.right) {
          // This event is in the pane -> Return -1 for the header
          return -1;
        }

        return null;
      },

      /**
       * Sets the widget that should be shown in the top right corner.
       *
       * The widget will not be disposed, when this table scroller is disposed. So the
       * caller has to dispose it.
       *
       * @param widget {qx.ui.core.Widget} The widget to set. May be null.
       */
      setTopRightWidget: function setTopRightWidget(widget) {
        var oldWidget = this.__topRightWidget__P_205_26;

        if (oldWidget != null) {
          this.__top__P_205_3.remove(oldWidget);
        }

        if (widget != null) {
          this.__top__P_205_3.add(widget);
        }

        this.__topRightWidget__P_205_26 = widget;
      },

      /**
       * Get the top right widget
       *
       * @return {qx.ui.core.Widget} The top right widget.
       */
      getTopRightWidget: function getTopRightWidget() {
        return this.__topRightWidget__P_205_26;
      },

      /**
       * Returns the header.
       *
       * @return {qx.ui.table.pane.Header} the header.
       */
      getHeader: function getHeader() {
        return this.__header__P_205_1;
      },

      /**
       * Returns the table pane.
       *
       * @return {qx.ui.table.pane.Pane} the table pane.
       */
      getTablePane: function getTablePane() {
        return this.__tablePane__P_205_2;
      },

      /**
       * Get the rendered width of the vertical scroll bar. The return value is
       * <code>0</code> if the scroll bar is invisible or not yet rendered.
       *
       * @internal
       * @return {Integer} The width of the vertical scroll bar
       */
      getVerticalScrollBarWidth: function getVerticalScrollBarWidth() {
        var scrollBar = this.__verScrollBar__P_205_6;
        return scrollBar.isVisible() ? scrollBar.getSizeHint().width || 0 : 0;
      },

      /**
       * Returns which scrollbars are needed.
       *
       * @param forceHorizontal {Boolean ? false} Whether to show the horizontal
       *      scrollbar always.
       * @param preventVertical {Boolean ? false} Whether to show the vertical scrollbar
       *      never.
       * @return {Integer} which scrollbars are needed. This may be any combination of
       *      {@link #HORIZONTAL_SCROLLBAR} or {@link #VERTICAL_SCROLLBAR}
       *      (combined by OR).
       */
      getNeededScrollBars: function getNeededScrollBars(forceHorizontal, preventVertical) {
        var verScrollBar = this.__verScrollBar__P_205_6;
        var verBarWidth = verScrollBar.getSizeHint().width + verScrollBar.getMarginLeft() + verScrollBar.getMarginRight();
        var horScrollBar = this.__horScrollBar__P_205_5;
        var horBarHeight = horScrollBar.getSizeHint().height + horScrollBar.getMarginTop() + horScrollBar.getMarginBottom(); // Get the width and height of the view (without scroll bars)

        var clipperSize = this._paneClipper.getInnerSize();

        var viewWidth = clipperSize ? clipperSize.width : 0;

        if (this.getVerticalScrollBarVisible()) {
          viewWidth += verBarWidth;
        }

        var viewHeight = clipperSize ? clipperSize.height : 0;

        if (this.getHorizontalScrollBarVisible()) {
          viewHeight += horBarHeight;
        }

        var tableModel = this.getTable().getTableModel();
        var rowCount = tableModel.getRowCount(); // Get the (virtual) width and height of the pane

        var paneWidth = this.getTablePaneModel().getTotalWidth();
        var paneHeight = this.getTable().getRowHeight() * rowCount; // Check which scrollbars are needed

        var horNeeded = false;
        var verNeeded = false;

        if (paneWidth > viewWidth) {
          horNeeded = true;

          if (paneHeight > viewHeight - horBarHeight) {
            verNeeded = true;
          }
        } else if (paneHeight > viewHeight) {
          verNeeded = true;

          if (!preventVertical && paneWidth > viewWidth - verBarWidth) {
            horNeeded = true;
          }
        } // Create the mask


        var horBar = qx.ui.table.pane.Scroller.HORIZONTAL_SCROLLBAR;
        var verBar = qx.ui.table.pane.Scroller.VERTICAL_SCROLLBAR;
        return (forceHorizontal || horNeeded ? horBar : 0) | (preventVertical || !verNeeded ? 0 : verBar);
      },

      /**
       * Return the pane clipper. It is sometimes required for special activities
       * such as tracking events for drag&drop.
       *
       * @return {qx.ui.table.pane.Clipper}
       *   The pane clipper for this scroller.
       */
      getPaneClipper: function getPaneClipper() {
        return this._paneClipper;
      },

      /**
       * Returns the scroll area container widget (which enables more precise
       * operations e.g. bounds retrieval for drag session scrolling).
       *
       * @see qx.ui.core.MDragDropScrolling#_getBounds
       * @return {qx.ui.table.pane.Clipper}
       *   The pane clipper for this scroller.
       */
      getScrollAreaContainer: function getScrollAreaContainer() {
        return this.getPaneClipper();
      },
      // property apply method
      _applyScrollTimeout: function _applyScrollTimeout(value, old) {
        this._startInterval(value);
      },

      /**
       * Starts the current running interval
       *
       * @param timeout {Integer} The timeout between two table updates
       */
      _startInterval: function _startInterval(timeout) {
        this.__timer__P_205_8.setInterval(timeout);

        this.__timer__P_205_8.start();
      },

      /**
       * stops the current running interval
       */
      _stopInterval: function _stopInterval() {
        this.__timer__P_205_8.stop();
      },

      /**
       * Does a postponed update of the content.
       *
       * @see #_updateContent
       */
      _postponedUpdateContent: function _postponedUpdateContent() {
        //this.__updateContentPlanned = true;
        this._updateContent();
      },

      /**
       * Timer event handler. Periodically checks whether a table update is
       * required. The update interval is controlled by the {@link #scrollTimeout}
       * property.
       *
       * @signature function()
       */
      _oninterval: qx.event.GlobalError.observeMethod(function () {
        if (this.__updateContentPlanned__P_205_11 && !this.__tablePane__P_205_2._layoutPending) {
          this.__updateContentPlanned__P_205_11 = false;

          this._updateContent();
        }
      }),

      /**
       * Updates the content. Sets the right section the table pane should show and
       * does the scrolling.
       */
      _updateContent: function _updateContent() {
        var paneSize = this._paneClipper.getInnerSize();

        if (!paneSize) {
          return;
        }

        var paneHeight = paneSize.height;

        var scrollX = this.__horScrollBar__P_205_5.getPosition();

        var scrollY = this.__verScrollBar__P_205_6.getPosition();

        var rowHeight = this.getTable().getRowHeight();
        var firstRow = Math.floor(scrollY / rowHeight);

        var oldFirstRow = this.__tablePane__P_205_2.getFirstVisibleRow();

        this.__tablePane__P_205_2.setFirstVisibleRow(firstRow);

        var visibleRowCount = Math.ceil(paneHeight / rowHeight);
        var paneOffset = 0;
        var firstVisibleRowComplete = this.getTable().getKeepFirstVisibleRowComplete();

        if (!firstVisibleRowComplete) {
          // NOTE: We don't consider paneOffset, because this may cause alternating
          //       adding and deleting of one row when scrolling. Instead we add one row
          //       in every case.
          visibleRowCount++;
          paneOffset = scrollY % rowHeight;
        }

        this.__tablePane__P_205_2.setVisibleRowCount(visibleRowCount);

        if (firstRow != oldFirstRow) {
          this._updateFocusIndicator();
        }

        this._paneClipper.scrollToX(scrollX); // Avoid expensive calls to setScrollTop if
        // scrolling is not needed


        if (!firstVisibleRowComplete) {
          this._paneClipper.scrollToY(paneOffset);
        }
      },

      /**
       * Updates the location and the visibility of the focus indicator.
       *
       * @param editing {Boolean ? false} True if editing the cell
       */
      _updateFocusIndicator: function _updateFocusIndicator(editing) {
        var table = this.getTable();

        if (!table.getEnabled()) {
          return;
        }

        this.__focusIndicator__P_205_7.moveToCell(this.__focusedCol__P_205_23, this.__focusedRow__P_205_24, editing);
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this._stopInterval(); // this object was created by the table on init so we have to clean it up.


      var tablePaneModel = this.getTablePaneModel();

      if (tablePaneModel) {
        tablePaneModel.dispose();
      }

      this.__lastPointerDownCell__P_205_18 = this.__topRightWidget__P_205_26 = this.__table__P_205_0 = null;

      this._disposeObjects("__horScrollBar__P_205_5", "__verScrollBar__P_205_6", "_headerClipper", "_paneClipper", "__focusIndicator__P_205_7", "__header__P_205_1", "__tablePane__P_205_2", "__top__P_205_3", "__timer__P_205_8", "__clipperContainer__P_205_4");
    }
  });
  qx.ui.table.pane.Scroller.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.util.DeferredCall": {
        "construct": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2006 STZ-IDA, Germany, http://www.stz-ida.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Til Schneider (til132)
  
  ************************************************************************ */

  /**
   * The model of a table pane. This model works as proxy to a
   * {@link qx.ui.table.columnmodel.Basic} and manages the visual order of the columns shown in
   * a {@link Pane}.
   */
  qx.Class.define("qx.ui.table.pane.Model", {
    extend: qx.core.Object,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     *
     * @param tableColumnModel {qx.ui.table.columnmodel.Basic} The TableColumnModel of which this
     *    model is the proxy.
     */
    construct: function construct(tableColumnModel) {
      qx.core.Object.constructor.call(this);
      this.setTableColumnModel(tableColumnModel);
      this.__defferedEventDispatcher__P_206_0 = new qx.util.DeferredCall(function () {
        this.fireEvent(qx.ui.table.pane.Model.EVENT_TYPE_MODEL_CHANGED);
      }, this);
    },

    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */
    events: {
      /** Fired when the model changed. */
      modelChanged: "qx.event.type.Event"
    },

    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */
    statics: {
      /** @type {string} The type of the event fired when the model changed. */
      EVENT_TYPE_MODEL_CHANGED: "modelChanged"
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /** The visible x position of the first column this model should contain. */
      firstColumnX: {
        check: "Integer",
        init: 0,
        apply: "_applyFirstColumnX"
      },

      /**
       * The maximum number of columns this model should contain. If -1 this model will
       * contain all remaining columns.
       */
      maxColumnCount: {
        check: "Number",
        init: -1,
        apply: "_applyMaxColumnCount"
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __columnCount__P_206_1: null,
      __tableColumnModel__P_206_2: null,
      __defferedEventDispatcher__P_206_0: null,
      // property modifier
      _applyFirstColumnX: function _applyFirstColumnX(value, old) {
        this.__columnCount__P_206_1 = null;

        this.__defferedEventDispatcher__P_206_0.schedule();
      },
      // property modifier
      _applyMaxColumnCount: function _applyMaxColumnCount(value, old) {
        this.__columnCount__P_206_1 = null;

        this.__defferedEventDispatcher__P_206_0.schedule();
      },

      /**
       * Connects the table model to the column model
       *
       * @param tableColumnModel {qx.ui.table.columnmodel.Basic} the column model
       */
      setTableColumnModel: function setTableColumnModel(tableColumnModel) {
        if (this.__tableColumnModel__P_206_2) {
          this.__tableColumnModel__P_206_2.removeListener("visibilityChangedPre", this._onColVisibilityChanged, this);

          this.__tableColumnModel__P_206_2.removeListener("headerCellRendererChanged", this._onHeaderCellRendererChanged, this);
        }

        this.__tableColumnModel__P_206_2 = tableColumnModel;

        this.__tableColumnModel__P_206_2.addListener("visibilityChangedPre", this._onColVisibilityChanged, this);

        this.__tableColumnModel__P_206_2.addListener("headerCellRendererChanged", this._onHeaderCellRendererChanged, this);

        this.__columnCount__P_206_1 = null;
      },

      /**
       * Event handler. Called when the visibility of a column has changed.
       *
       * @param evt {Map} the event.
       */
      _onColVisibilityChanged: function _onColVisibilityChanged(evt) {
        this.__columnCount__P_206_1 = null;

        this.__defferedEventDispatcher__P_206_0.schedule();
      },

      /**
       * Event handler. Called when the cell renderer of a column has changed.
       *
       * @param evt {Map} the event.
       */
      _onHeaderCellRendererChanged: function _onHeaderCellRendererChanged(evt) {
        this.__defferedEventDispatcher__P_206_0.schedule();
      },

      /**
       * Returns the number of columns in this model.
       *
       * @return {Integer} the number of columns in this model.
       */
      getColumnCount: function getColumnCount() {
        if (this.__columnCount__P_206_1 == null) {
          var firstX = this.getFirstColumnX();
          var maxColCount = this.getMaxColumnCount();

          var totalColCount = this.__tableColumnModel__P_206_2.getVisibleColumnCount();

          if (maxColCount == -1 || firstX + maxColCount > totalColCount) {
            this.__columnCount__P_206_1 = totalColCount - firstX;
          } else {
            this.__columnCount__P_206_1 = maxColCount;
          }
        }

        return this.__columnCount__P_206_1;
      },

      /**
       * Returns the model index of the column at the position <code>xPos</code>.
       *
       * @param xPos {Integer} the x position in the table pane of the column.
       * @return {Integer} the model index of the column.
       */
      getColumnAtX: function getColumnAtX(xPos) {
        var firstX = this.getFirstColumnX();
        return this.__tableColumnModel__P_206_2.getVisibleColumnAtX(firstX + xPos);
      },

      /**
       * Returns the x position of the column <code>col</code>.
       *
       * @param col {Integer} the model index of the column.
       * @return {Integer} the x position in the table pane of the column.
       */
      getX: function getX(col) {
        var firstX = this.getFirstColumnX();
        var maxColCount = this.getMaxColumnCount();
        var x = this.__tableColumnModel__P_206_2.getVisibleX(col) - firstX;

        if (x >= 0 && (maxColCount == -1 || x < maxColCount)) {
          return x;
        } else {
          return -1;
        }
      },

      /**
       * Gets the position of the left side of a column (in pixels, relative to the
       * left side of the table pane).
       *
       * This value corresponds to the sum of the widths of all columns left of the
       * column.
       *
       * @param col {Integer} the model index of the column.
       * @return {var} the position of the left side of the column.
       */
      getColumnLeft: function getColumnLeft(col) {
        var left = 0;
        var colCount = this.getColumnCount();

        for (var x = 0; x < colCount; x++) {
          var currCol = this.getColumnAtX(x);

          if (currCol == col) {
            return left;
          }

          left += this.__tableColumnModel__P_206_2.getColumnWidth(currCol);
        }

        return -1;
      },

      /**
       * Returns the total width of all columns in the model.
       *
       * @return {Integer} the total width of all columns in the model.
       */
      getTotalWidth: function getTotalWidth() {
        var totalWidth = 0;
        var colCount = this.getColumnCount();

        for (var x = 0; x < colCount; x++) {
          var col = this.getColumnAtX(x);
          totalWidth += this.__tableColumnModel__P_206_2.getColumnWidth(col);
        }

        return totalWidth;
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      if (this.__tableColumnModel__P_206_2) {
        this.__tableColumnModel__P_206_2.removeListener("visibilityChangedPre", this._onColVisibilityChanged, this);

        this.__tableColumnModel__P_206_2.removeListener("headerCellRendererChanged", this._onHeaderCellRendererChanged, this);
      }

      this.__tableColumnModel__P_206_2 = null;

      this._disposeObjects("__defferedEventDispatcher__P_206_0");
    }
  });
  qx.ui.table.pane.Model.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.container.Composite": {
        "construct": true,
        "require": true
      },
      "qx.ui.layout.Grow": {
        "construct": true
      },
      "qx.theme.manager.Decoration": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2006 STZ-IDA, Germany, http://www.stz-ida.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * The focus indicator widget
   */
  qx.Class.define("qx.ui.table.pane.FocusIndicator", {
    extend: qx.ui.container.Composite,

    /**
     * @param scroller {qx.ui.table.pane.Scroller} The scroller, which contains this focus indicator
     */
    construct: function construct(scroller) {
      // use the grow layout to make sure that the editing control
      // always fills the focus indicator box.
      qx.ui.container.Composite.constructor.call(this, new qx.ui.layout.Grow());
      this.__scroller__P_207_0 = scroller;
      this.setKeepActive(true);
      this.addListener("keypress", this._onKeyPress, this);
    },
    properties: {
      // overridden
      visibility: {
        refine: true,
        init: "excluded"
      },

      /** Table row, where the indicator is placed. */
      row: {
        check: "Integer",
        nullable: true
      },

      /** Table column, where the indicator is placed. */
      column: {
        check: "Integer",
        nullable: true
      }
    },
    members: {
      __scroller__P_207_0: null,

      /**
       * Keypress handler. Suppress all key events but "Enter" and "Escape"
       *
       * @param e {qx.event.type.KeySequence} key event
       */
      _onKeyPress: function _onKeyPress(e) {
        var iden = e.getKeyIdentifier();

        if (iden !== "Escape" && iden !== "Enter") {
          e.stopPropagation();
        }
      },

      /**
       * Move the focus indicator to the given table cell.
       *
       * @param col {Integer?null} The table column
       * @param row {Integer?null} The table row
       * @param editing {Boolean?null} Whether or not the cell is being edited
       */
      moveToCell: function moveToCell(col, row, editing) {
        // check if the focus indicator is shown and if the new column is
        // editable. if not, just exclude the indicator because the pointer events
        // should go to the cell itself linked with HTML links [BUG #4250]
        if (!this.__scroller__P_207_0.getShowCellFocusIndicator() && !this.__scroller__P_207_0.getTable().getTableModel().isColumnEditable(col)) {
          this.exclude();
          return;
        } else {
          this.show();
        }

        if (col == null) {
          this.hide();
          this.setRow(null);
          this.setColumn(null);
        } else {
          var xPos = this.__scroller__P_207_0.getTablePaneModel().getX(col);

          if (xPos === -1) {
            this.hide();
            this.setRow(null);
            this.setColumn(null);
          } else {
            var table = this.__scroller__P_207_0.getTable();

            var columnModel = table.getTableColumnModel();

            var paneModel = this.__scroller__P_207_0.getTablePaneModel();

            var firstRow = this.__scroller__P_207_0.getTablePane().getFirstVisibleRow();

            var rowHeight = table.getRowHeight();
            var wt = 0;
            var wr = 0;
            var wb = 0;
            var wl = 0;
            var decoKey = this.getDecorator();

            if (decoKey) {
              var deco = qx.theme.manager.Decoration.getInstance().resolve(decoKey);

              if (deco) {
                wt = deco.getWidthTop();
                wr = deco.getWidthRight();
                wb = deco.getWidthBottom();
                wl = deco.getWidthLeft();
              }
            }

            var userHeight = rowHeight + (wl + wr - 2);
            var userTop = (row - firstRow) * rowHeight - (wr - 1);

            if (editing && this.__scroller__P_207_0.getMinCellEditHeight() && this.__scroller__P_207_0.getMinCellEditHeight() > userHeight) {
              userTop -= Math.floor((this.__scroller__P_207_0.getMinCellEditHeight() - userHeight) / 2);
              userHeight = this.__scroller__P_207_0.getMinCellEditHeight();
            }

            this.setUserBounds(paneModel.getColumnLeft(col) - (wt - 1), userTop, columnModel.getColumnWidth(col) + (wt + wb - 3), userHeight);
            this.show();
            this.setRow(row);
            this.setColumn(col);
          }
        }
      }
    },
    destruct: function destruct() {
      this.__scroller__P_207_0 = null;
    }
  });
  qx.ui.table.pane.FocusIndicator.$$dbClassInfo = $$dbClassInfo;
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
       2009 Derrell Lipman
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Derrell Lipman (derrell)
  
  ************************************************************************ */

  /**
   * Interface for a column menu item corresponding to a table column.
   */
  qx.Interface.define("qx.ui.table.IColumnMenuItem", {
    properties: {
      /**
       * Whether the table column associated with this menu item is visible
       * Should be of type {Boolean}!
       */
      columnVisible: {}
    },
    events: {
      /**
       * Dispatched when a column changes visibility state. The event data is a
       * boolean indicating whether the table column associated with this menu
       * item is now visible.
       */
      changeColumnVisible: "qx.event.type.Data"
    }
  });
  qx.ui.table.IColumnMenuItem.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Interface": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.ISingleSelection": {
        "require": true
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
       * Christian Hagendorn (chris_schmidt)
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * Each object, which should support multiselection selection have to
   * implement this interface.
   */
  qx.Interface.define("qx.ui.core.IMultiSelection", {
    extend: qx.ui.core.ISingleSelection,

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      /**
       * Selects all items of the managed object.
       */
      selectAll: function selectAll() {
        return true;
      },

      /**
       * Adds the given item to the existing selection.
       *
       * @param item {qx.ui.core.Widget} Any valid item
       * @throws {Error} if the item is not a child element.
       */
      addToSelection: function addToSelection(item) {
        return arguments.length == 1;
      },

      /**
       * Removes the given item from the selection.
       *
       * Use {@link qx.ui.core.ISingleSelection#resetSelection} when you
       * want to clear the whole selection at once.
       *
       * @param item {qx.ui.core.Widget} Any valid item
       * @throws {Error} if the item is not a child element.
       */
      removeFromSelection: function removeFromSelection(item) {
        return arguments.length == 1;
      }
    }
  });
  qx.ui.core.IMultiSelection.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.Widget": {},
      "qx.lang.Array": {}
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
       * Christian Hagendorn (chris_schmidt)
  
  ************************************************************************ */

  /**
   * This mixin links all methods to manage the multi selection from the
   * internal selection manager to the widget.
   */
  qx.Mixin.define("qx.ui.core.MMultiSelectionHandling", {
    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      // Create selection manager
      var clazz = this.SELECTION_MANAGER;
      var manager = this.__manager__P_224_0 = new clazz(this); // Add widget event listeners

      this.addListener("pointerdown", manager.handlePointerDown, manager);
      this.addListener("tap", manager.handleTap, manager);
      this.addListener("pointerover", manager.handlePointerOver, manager);
      this.addListener("pointermove", manager.handlePointerMove, manager);
      this.addListener("losecapture", manager.handleLoseCapture, manager);
      this.addListener("keypress", manager.handleKeyPress, manager);
      this.addListener("addItem", manager.handleAddItem, manager);
      this.addListener("removeItem", manager.handleRemoveItem, manager); // Add manager listeners

      manager.addListener("changeSelection", this._onSelectionChange, this);
    },

    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */
    events: {
      /** Fires after the value was modified */
      changeValue: "qx.event.type.Data",

      /** Fires after the selection was modified */
      changeSelection: "qx.event.type.Data"
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /**
       * The selection mode to use.
       *
       * For further details please have a look at:
       * {@link qx.ui.core.selection.Abstract#mode}
       */
      selectionMode: {
        check: ["single", "multi", "additive", "one"],
        init: "single",
        apply: "_applySelectionMode"
      },

      /**
       * Enable drag selection (multi selection of items through
       * dragging the pointer in pressed states).
       *
       * Only possible for the selection modes <code>multi</code> and <code>additive</code>
       */
      dragSelection: {
        check: "Boolean",
        init: false,
        apply: "_applyDragSelection"
      },

      /**
       * Enable quick selection mode, where no tap is needed to change the selection.
       *
       * Only possible for the modes <code>single</code> and <code>one</code>.
       */
      quickSelection: {
        check: "Boolean",
        init: false,
        apply: "_applyQuickSelection"
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      /** @type {qx.ui.core.selection.Abstract} The selection manager */
      __manager__P_224_0: null,

      /** @type {Boolean} used to control recursion in onSelectionChange */
      __inOnSelectionChange__P_224_1: false,

      /*
      ---------------------------------------------------------------------------
        USER API
      ---------------------------------------------------------------------------
      */

      /**
       * setValue implements part of the {@link qx.ui.form.IField} interface.
       *
       * @param items {null|qx.ui.core.Widget[]} Items to select.
       * @returns {null|TypeError} The status of this operation.
       */
      setValue: function setValue(items) {
        if (null === items) {
          this.__manager__P_224_0.clearSelection();

          return null;
        }

        {
          for (var i = 0, l = items.length; i < l; i++) {
            if (!(items[i] instanceof qx.ui.core.Widget)) {
              return new TypeError("Some items in provided argument are not widgets");
            }
          }
        }

        try {
          this.setSelection(items);
          return null;
        } catch (e) {
          return e;
        }
      },

      /**
       * getValue implements part of the {@link qx.ui.form.IField} interface.
       *
       * @returns {qx.ui.core.Widget[]} The selected widgets or null if there are none.
       */
      getValue: function getValue() {
        return this.__manager__P_224_0.getSelection();
      },

      /**
       * resetValue implements part of the {@link qx.ui.form.IField} interface.
       */
      resetValue: function resetValue() {
        this.__manager__P_224_0.clearSelection();
      },

      /**
       * Selects all items of the managed object.
       */
      selectAll: function selectAll() {
        this.__manager__P_224_0.selectAll();
      },

      /**
       * Detects whether the given item is currently selected.
       *
       * @param item {qx.ui.core.Widget} Any valid selectable item.
       * @return {Boolean} Whether the item is selected.
       * @throws {Error} if the item is not a child element.
       */
      isSelected: function isSelected(item) {
        if (!qx.ui.core.Widget.contains(this, item)) {
          throw new Error("Could not test if " + item + " is selected, because it is not a child element!");
        }

        return this.__manager__P_224_0.isItemSelected(item);
      },

      /**
       * Adds the given item to the existing selection.
       *
       * Use {@link #setSelection} instead if you want to replace
       * the current selection.
       *
       * @param item {qx.ui.core.Widget} Any valid item.
       * @throws {Error} if the item is not a child element.
       */
      addToSelection: function addToSelection(item) {
        if (!qx.ui.core.Widget.contains(this, item)) {
          throw new Error("Could not add + " + item + " to selection, because it is not a child element!");
        }

        this.__manager__P_224_0.addItem(item);
      },

      /**
       * Removes the given item from the selection.
       *
       * Use {@link #resetSelection} when you want to clear
       * the whole selection at once.
       *
       * @param item {qx.ui.core.Widget} Any valid item
       * @throws {Error} if the item is not a child element.
       */
      removeFromSelection: function removeFromSelection(item) {
        if (!qx.ui.core.Widget.contains(this, item)) {
          throw new Error("Could not remove " + item + " from selection, because it is not a child element!");
        }

        this.__manager__P_224_0.removeItem(item);
      },

      /**
       * Selects an item range between two given items.
       *
       * @param begin {qx.ui.core.Widget} Item to start with
       * @param end {qx.ui.core.Widget} Item to end at
       */
      selectRange: function selectRange(begin, end) {
        this.__manager__P_224_0.selectItemRange(begin, end);
      },

      /**
       * Clears the whole selection at once. Also
       * resets the lead and anchor items and their
       * styles.
       */
      resetSelection: function resetSelection() {
        this.__manager__P_224_0.clearSelection();
      },

      /**
       * Replaces current selection with the given items.
       *
       * @param items {qx.ui.core.Widget[]} Items to select.
       * @throws {Error} if one of the items is not a child element and if
       *    the mode is set to <code>single</code> or <code>one</code> and
       *    the items contains more than one item.
       */
      setSelection: function setSelection(items) {
        // Block recursion so that when selection changes modelSelection, the modelSelection
        //  cannot change selection again; this is important because modelSelection does not
        //  necessarily match selection, for example when the item's model properties are
        //  null.
        if (this.__inOnSelectionChange__P_224_1) {
          return;
        }

        for (var i = 0; i < items.length; i++) {
          if (!qx.ui.core.Widget.contains(this, items[i])) {
            throw new Error("Could not select " + items[i] + ", because it is not a child element!");
          }
        }

        if (items.length === 0) {
          this.resetSelection();
        } else {
          var currentSelection = this.getSelection();

          if (!qx.lang.Array.equals(currentSelection, items)) {
            this.__manager__P_224_0.replaceSelection(items);
          }
        }
      },

      /**
       * Returns an array of currently selected items.
       *
       * Note: The result is only a set of selected items, so the order can
       * differ from the sequence in which the items were added.
       *
       * @return {qx.ui.core.Widget[]} List of items.
       */
      getSelection: function getSelection() {
        return this.__manager__P_224_0.getSelection();
      },

      /**
       * Returns an array of currently selected items sorted
       * by their index in the container.
       *
       * @return {qx.ui.core.Widget[]} Sorted list of items
       */
      getSortedSelection: function getSortedSelection() {
        return this.__manager__P_224_0.getSortedSelection();
      },

      /**
       * Whether the selection is empty
       *
       * @return {Boolean} Whether the selection is empty
       */
      isSelectionEmpty: function isSelectionEmpty() {
        return this.__manager__P_224_0.isSelectionEmpty();
      },

      /**
       * Returns the last selection context.
       *
       * @return {String | null} One of <code>tap</code>, <code>quick</code>,
       *    <code>drag</code> or <code>key</code> or <code>null</code>.
       */
      getSelectionContext: function getSelectionContext() {
        return this.__manager__P_224_0.getSelectionContext();
      },

      /**
       * Returns the internal selection manager. Use this with
       * caution!
       *
       * @return {qx.ui.core.selection.Abstract} The selection manager
       */
      _getManager: function _getManager() {
        return this.__manager__P_224_0;
      },

      /**
       * Returns all elements which are selectable.
       *
       * @param all {Boolean} true for all selectables, false for the
       *   selectables the user can interactively select
       * @return {qx.ui.core.Widget[]} The contained items.
       */
      getSelectables: function getSelectables(all) {
        return this.__manager__P_224_0.getSelectables(all);
      },

      /**
       * Invert the selection. Select the non selected and deselect the selected.
       */
      invertSelection: function invertSelection() {
        this.__manager__P_224_0.invertSelection();
      },

      /**
       * Returns the current lead item. Generally the item which was last modified
       * by the user (tapped on etc.)
       *
       * @return {qx.ui.core.Widget} The lead item or <code>null</code>
       */
      _getLeadItem: function _getLeadItem() {
        var mode = this.__manager__P_224_0.getMode();

        if (mode === "single" || mode === "one") {
          return this.__manager__P_224_0.getSelectedItem();
        } else {
          return this.__manager__P_224_0.getLeadItem();
        }
      },

      /*
      ---------------------------------------------------------------------------
        PROPERTY APPLY ROUTINES
      ---------------------------------------------------------------------------
      */
      // property apply
      _applySelectionMode: function _applySelectionMode(value, old) {
        this.__manager__P_224_0.setMode(value);
      },
      // property apply
      _applyDragSelection: function _applyDragSelection(value, old) {
        this.__manager__P_224_0.setDrag(value);
      },
      // property apply
      _applyQuickSelection: function _applyQuickSelection(value, old) {
        this.__manager__P_224_0.setQuick(value);
      },

      /*
      ---------------------------------------------------------------------------
        EVENT HANDLER
      ---------------------------------------------------------------------------
      */

      /**
       * Event listener for <code>changeSelection</code> event on selection manager.
       *
       * @param e {qx.event.type.Data} Data event
       */
      _onSelectionChange: function _onSelectionChange(e) {
        if (this.__inOnSelectionChange__P_224_1) {
          return;
        }

        this.__inOnSelectionChange__P_224_1 = true;

        try {
          this.fireDataEvent("changeSelection", e.getData(), e.getOldData());
          this.fireDataEvent("changeValue", e.getData(), e.getOldData());
        } finally {
          this.__inOnSelectionChange__P_224_1 = false;
        }
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this._disposeObjects("__manager__P_224_0");
    }
  });
  qx.ui.core.MMultiSelectionHandling.$$dbClassInfo = $$dbClassInfo;
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
      "qx.lang.Object": {},
      "qx.bom.client.OperatingSystem": {
        "require": true
      },
      "qx.event.Timer": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "os.name": {
          "className": "qx.bom.client.OperatingSystem"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
  
  ************************************************************************ */

  /**
   * Generic selection manager to bring rich desktop like selection behavior
   * to widgets and low-level interactive controls.
   *
   * The selection handling supports both Shift and Ctrl/Meta modifies like
   * known from native applications.
   */
  qx.Class.define("qx.ui.core.selection.Abstract", {
    type: "abstract",
    extend: qx.core.Object,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qx.core.Object.constructor.call(this); // {Map} Internal selection storage

      this.__selection__P_226_0 = {};
    },

    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */
    events: {
      /** Fires after the selection was modified. Contains the selection under the data property. */
      changeSelection: "qx.event.type.Data"
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /**
       * Selects the selection mode to use.
       *
       * * single: One or no element is selected
       * * multi: Multi items could be selected. Also allows empty selections.
       * * additive: Easy Web-2.0 selection mode. Allows multiple selections without modifier keys.
       * * one: If possible always exactly one item is selected
       */
      mode: {
        check: ["single", "multi", "additive", "one"],
        init: "single",
        apply: "_applyMode"
      },

      /**
       * Enable drag selection (multi selection of items through
       * dragging the pointer in pressed states).
       *
       * Only possible for the modes <code>multi</code> and <code>additive</code>
       */
      drag: {
        check: "Boolean",
        init: false
      },

      /**
       * Enable quick selection mode, where no tap is needed to change the selection.
       *
       * Only possible for the modes <code>single</code> and <code>one</code>.
       */
      quick: {
        check: "Boolean",
        init: false
      },

      /**
       * Whether the selection can be changed by user interaction
       */
      readOnly: {
        check: "Boolean",
        init: false
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    /* eslint-disable @qooxdoo/qx/no-refs-in-members */
    members: {
      __scrollStepX__P_226_1: 0,
      __scrollStepY__P_226_2: 0,
      __scrollTimer__P_226_3: null,
      __frameScroll__P_226_4: null,
      __lastRelX__P_226_5: null,
      __lastRelY__P_226_6: null,
      __frameLocation__P_226_7: null,
      __dragStartX__P_226_8: null,
      __dragStartY__P_226_9: null,
      __inCapture__P_226_10: null,
      __pointerX__P_226_11: null,
      __pointerY__P_226_12: null,
      __moveDirectionX__P_226_13: null,
      __moveDirectionY__P_226_14: null,
      __selectionModified__P_226_15: null,
      __selectionContext__P_226_16: null,
      __leadItem__P_226_17: null,
      __selection__P_226_0: null,
      __anchorItem__P_226_18: null,
      __pointerDownOnSelected__P_226_19: null,
      // A flag that signals an user interaction, which means the selection change
      // was triggered by pointer or keyboard [BUG #3344]
      _userInteraction: false,
      __oldScrollTop__P_226_20: null,

      /*
      ---------------------------------------------------------------------------
        USER APIS
      ---------------------------------------------------------------------------
      */

      /**
       * Returns the selection context. One of <code>tap</code>,
       * <code>quick</code>, <code>drag</code> or <code>key</code> or
       * <code>null</code>.
       *
       * @return {String} One of <code>tap</code>, <code>quick</code>,
       *    <code>drag</code> or <code>key</code> or <code>null</code>
       */
      getSelectionContext: function getSelectionContext() {
        return this.__selectionContext__P_226_16;
      },

      /**
       * Selects all items of the managed object.
       *
       */
      selectAll: function selectAll() {
        var mode = this.getMode();

        if (mode == "single" || mode == "one") {
          throw new Error("Can not select all items in selection mode: " + mode);
        }

        this._selectAllItems();

        this._fireChange();
      },

      /**
       * Selects the given item. Replaces current selection
       * completely with the new item.
       *
       * Use {@link #addItem} instead if you want to add new
       * items to an existing selection.
       *
       * @param item {Object} Any valid item
       */
      selectItem: function selectItem(item) {
        this._setSelectedItem(item);

        var mode = this.getMode();

        if (mode !== "single" && mode !== "one") {
          this._setLeadItem(item);

          this._setAnchorItem(item);
        }

        this._scrollItemIntoView(item);

        this._fireChange();
      },

      /**
       * Adds the given item to the existing selection.
       *
       * Use {@link #selectItem} instead if you want to replace
       * the current selection.
       *
       * @param item {Object} Any valid item
       */
      addItem: function addItem(item) {
        var mode = this.getMode();

        if (mode === "single" || mode === "one") {
          this._setSelectedItem(item);
        } else {
          if (this._getAnchorItem() == null) {
            this._setAnchorItem(item);
          }

          this._setLeadItem(item);

          this._addToSelection(item);
        }

        this._scrollItemIntoView(item);

        this._fireChange();
      },

      /**
       * Removes the given item from the selection.
       *
       * Use {@link #clearSelection} when you want to clear
       * the whole selection at once.
       *
       * @param item {Object} Any valid item
       */
      removeItem: function removeItem(item) {
        this._removeFromSelection(item);

        if (this.getMode() === "one" && this.isSelectionEmpty()) {
          var selected = this._applyDefaultSelection(); // Do not fire any event in this case.


          if (selected == item) {
            return;
          }
        }

        if (this.getLeadItem() == item) {
          this._setLeadItem(null);
        }

        if (this._getAnchorItem() == item) {
          this._setAnchorItem(null);
        }

        this._fireChange();
      },

      /**
       * Selects an item range between two given items.
       *
       * @param begin {Object} Item to start with
       * @param end {Object} Item to end at
       */
      selectItemRange: function selectItemRange(begin, end) {
        var mode = this.getMode();

        if (mode == "single" || mode == "one") {
          throw new Error("Can not select multiple items in selection mode: " + mode);
        }

        this._selectItemRange(begin, end);

        this._setAnchorItem(begin);

        this._setLeadItem(end);

        this._scrollItemIntoView(end);

        this._fireChange();
      },

      /**
       * Clears the whole selection at once. Also
       * resets the lead and anchor items and their
       * styles.
       *
       */
      clearSelection: function clearSelection() {
        if (this.getMode() == "one") {
          var selected = this._applyDefaultSelection(true);

          if (selected != null) {
            return;
          }
        }

        this._clearSelection();

        this._setLeadItem(null);

        this._setAnchorItem(null);

        this._fireChange();
      },

      /**
       * Replaces current selection with given array of items.
       *
       * Please note that in single selection scenarios it is more
       * efficient to directly use {@link #selectItem}.
       *
       * @param items {Array} Items to select
       */
      replaceSelection: function replaceSelection(items) {
        var mode = this.getMode();

        if (mode == "one" || mode === "single") {
          if (items.length > 1) {
            throw new Error("Could not select more than one items in mode: " + mode + "!");
          }

          if (items.length == 1) {
            this.selectItem(items[0]);
          } else {
            this.clearSelection();
          }

          return;
        } else {
          this._replaceMultiSelection(items);
        }
      },

      /**
       * Get the selected item. This method does only work in <code>single</code>
       * selection mode.
       *
       * @return {Object} The selected item.
       */
      getSelectedItem: function getSelectedItem() {
        var mode = this.getMode();

        if (mode === "single" || mode === "one") {
          var result = this._getSelectedItem();

          return result != undefined ? result : null;
        }

        throw new Error("The method getSelectedItem() is only supported in 'single' and 'one' selection mode!");
      },

      /**
       * Returns an array of currently selected items.
       *
       * Note: The result is only a set of selected items, so the order can
       * differ from the sequence in which the items were added.
       *
       * @return {Object[]} List of items.
       */
      getSelection: function getSelection() {
        return Object.values(this.__selection__P_226_0);
      },

      /**
       * Returns the selection sorted by the index in the
       * container of the selection (the assigned widget)
       *
       * @return {Object[]} Sorted list of items
       */
      getSortedSelection: function getSortedSelection() {
        var children = this.getSelectables();
        var sel = Object.values(this.__selection__P_226_0);
        sel.sort(function (a, b) {
          return children.indexOf(a) - children.indexOf(b);
        });
        return sel;
      },

      /**
       * Detects whether the given item is currently selected.
       *
       * @param item {var} Any valid selectable item
       * @return {Boolean} Whether the item is selected
       */
      isItemSelected: function isItemSelected(item) {
        var hash = this._selectableToHashCode(item);

        return this.__selection__P_226_0[hash] !== undefined;
      },

      /**
       * Whether the selection is empty
       *
       * @return {Boolean} Whether the selection is empty
       */
      isSelectionEmpty: function isSelectionEmpty() {
        return qx.lang.Object.isEmpty(this.__selection__P_226_0);
      },

      /**
       * Invert the selection. Select the non selected and deselect the selected.
       */
      invertSelection: function invertSelection() {
        var mode = this.getMode();

        if (mode === "single" || mode === "one") {
          throw new Error("The method invertSelection() is only supported in 'multi' and 'additive' selection mode!");
        }

        var selectables = this.getSelectables();

        for (var i = 0; i < selectables.length; i++) {
          this._toggleInSelection(selectables[i]);
        }

        this._fireChange();
      },

      /*
      ---------------------------------------------------------------------------
        LEAD/ANCHOR SUPPORT
      ---------------------------------------------------------------------------
      */

      /**
       * Sets the lead item. Generally the item which was last modified
       * by the user (tapped on etc.)
       *
       * @param value {Object} Any valid item or <code>null</code>
       */
      _setLeadItem: function _setLeadItem(value) {
        var old = this.__leadItem__P_226_17;

        if (old !== null) {
          this._styleSelectable(old, "lead", false);
        }

        if (value !== null) {
          this._styleSelectable(value, "lead", true);
        }

        this.__leadItem__P_226_17 = value;
      },

      /**
       * Returns the current lead item. Generally the item which was last modified
       * by the user (tapped on etc.)
       *
       * @return {Object} The lead item or <code>null</code>
       */
      getLeadItem: function getLeadItem() {
        return this.__leadItem__P_226_17;
      },

      /**
       * Sets the anchor item. This is the item which is the starting
       * point for all range selections. Normally this is the item which was
       * tapped on the last time without any modifier keys pressed.
       *
       * @param value {Object} Any valid item or <code>null</code>
       */
      _setAnchorItem: function _setAnchorItem(value) {
        var old = this.__anchorItem__P_226_18;

        if (old != null) {
          this._styleSelectable(old, "anchor", false);
        }

        if (value != null) {
          this._styleSelectable(value, "anchor", true);
        }

        this.__anchorItem__P_226_18 = value;
      },

      /**
       * Returns the current anchor item. This is the item which is the starting
       * point for all range selections. Normally this is the item which was
       * tapped on the last time without any modifier keys pressed.
       *
       * @return {Object} The anchor item or <code>null</code>
       */
      _getAnchorItem: function _getAnchorItem() {
        return this.__anchorItem__P_226_18 !== null ? this.__anchorItem__P_226_18 : null;
      },

      /*
      ---------------------------------------------------------------------------
        BASIC SUPPORT
      ---------------------------------------------------------------------------
      */

      /**
       * Whether the given item is selectable.
       *
       * @param item {var} Any item
       * @return {Boolean} <code>true</code> when the item is selectable
       */
      _isSelectable: function _isSelectable(item) {
        throw new Error("Abstract method call: _isSelectable()");
      },

      /**
       * Finds the selectable instance from a pointer event
       *
       * @param event {qx.event.type.Pointer} The pointer event
       * @return {Object|null} The resulting selectable
       */
      _getSelectableFromPointerEvent: function _getSelectableFromPointerEvent(event) {
        var target = event.getTarget(); // check for target (may be null when leaving the viewport) [BUG #4378]

        if (target && this._isSelectable(target)) {
          return target;
        }

        return null;
      },

      /**
       * Returns an unique hashcode for the given item.
       *
       * @param item {var} Any item
       * @return {String} A valid hashcode
       */
      _selectableToHashCode: function _selectableToHashCode(item) {
        throw new Error("Abstract method call: _selectableToHashCode()");
      },

      /**
       * Updates the style (appearance) of the given item.
       *
       * @param item {var} Item to modify
       * @param type {String} Any of <code>selected</code>, <code>anchor</code> or <code>lead</code>
       * @param enabled {Boolean} Whether the given style should be added or removed.
       */
      _styleSelectable: function _styleSelectable(item, type, enabled) {
        throw new Error("Abstract method call: _styleSelectable()");
      },

      /**
       * Enables capturing of the container.
       *
       */
      _capture: function _capture() {
        throw new Error("Abstract method call: _capture()");
      },

      /**
       * Releases capturing of the container
       *
       */
      _releaseCapture: function _releaseCapture() {
        throw new Error("Abstract method call: _releaseCapture()");
      },

      /*
      ---------------------------------------------------------------------------
        DIMENSION AND LOCATION
      ---------------------------------------------------------------------------
      */

      /**
       * Returns the location of the container
       *
       * @return {Map} Map with the keys <code>top</code>, <code>right</code>,
       *    <code>bottom</code> and <code>left</code>.
       */
      _getLocation: function _getLocation() {
        throw new Error("Abstract method call: _getLocation()");
      },

      /**
       * Returns the dimension of the container (available scrolling space).
       *
       * @return {Map} Map with the keys <code>width</code> and <code>height</code>.
       */
      _getDimension: function _getDimension() {
        throw new Error("Abstract method call: _getDimension()");
      },

      /**
       * Returns the relative (to the container) horizontal location of the given item.
       *
       * @param item {var} Any item
       * @return {Map} A map with the keys <code>left</code> and <code>right</code>.
       */
      _getSelectableLocationX: function _getSelectableLocationX(item) {
        throw new Error("Abstract method call: _getSelectableLocationX()");
      },

      /**
       * Returns the relative (to the container) horizontal location of the given item.
       *
       * @param item {var} Any item
       * @return {Map} A map with the keys <code>top</code> and <code>bottom</code>.
       */
      _getSelectableLocationY: function _getSelectableLocationY(item) {
        throw new Error("Abstract method call: _getSelectableLocationY()");
      },

      /*
      ---------------------------------------------------------------------------
        SCROLL SUPPORT
      ---------------------------------------------------------------------------
      */

      /**
       * Returns the scroll position of the container.
       *
       * @return {Map} Map with the keys <code>left</code> and <code>top</code>.
       */
      _getScroll: function _getScroll() {
        throw new Error("Abstract method call: _getScroll()");
      },

      /**
       * Scrolls by the given offset
       *
       * @param xoff {Integer} Horizontal offset to scroll by
       * @param yoff {Integer} Vertical offset to scroll by
       */
      _scrollBy: function _scrollBy(xoff, yoff) {
        throw new Error("Abstract method call: _scrollBy()");
      },

      /**
       * Scrolls the given item into the view (make it visible)
       *
       * @param item {var} Any item
       */
      _scrollItemIntoView: function _scrollItemIntoView(item) {
        throw new Error("Abstract method call: _scrollItemIntoView()");
      },

      /*
      ---------------------------------------------------------------------------
        QUERY SUPPORT
      ---------------------------------------------------------------------------
      */

      /**
       * Returns all selectable items of the container.
       *
       * @param all {Boolean} true for all selectables, false for the
       *   selectables the user can interactively select
       * @return {Array} A list of items
       */
      getSelectables: function getSelectables(all) {
        throw new Error("Abstract method call: getSelectables()");
      },

      /**
       * Returns all selectable items between the two given items.
       *
       * The items could be given in any order.
       *
       * @param item1 {var} First item
       * @param item2 {var} Second item
       * @return {Array} List of items
       */
      _getSelectableRange: function _getSelectableRange(item1, item2) {
        throw new Error("Abstract method call: _getSelectableRange()");
      },

      /**
       * Returns the first selectable item.
       *
       * @return {var} The first selectable item
       */
      _getFirstSelectable: function _getFirstSelectable() {
        throw new Error("Abstract method call: _getFirstSelectable()");
      },

      /**
       * Returns the last selectable item.
       *
       * @return {var} The last selectable item
       */
      _getLastSelectable: function _getLastSelectable() {
        throw new Error("Abstract method call: _getLastSelectable()");
      },

      /**
       * Returns the first visible and selectable item.
       *
       * @return {var} The first visible and selectable item
       */
      _getFirstVisibleSelectable: function _getFirstVisibleSelectable() {
        throw new Error("Abstract method call: _getFirstVisibleSelectable()");
      },

      /**
       * Returns the last visible and selectable item.
       *
       * @return {var} The last visible and selectable item
       */
      _getLastVisibleSelectable: function _getLastVisibleSelectable() {
        throw new Error("Abstract method call: _getLastVisibleSelectable()");
      },

      /**
       * Returns a selectable item which is related to the given
       * <code>item</code> through the value of <code>relation</code>.
       *
       * @param item {var} Any item
       * @param relation {String} A valid relation: <code>above</code>,
       *    <code>right</code>, <code>under</code> or <code>left</code>
       * @return {var} The related item
       */
      _getRelatedSelectable: function _getRelatedSelectable(item, relation) {
        throw new Error("Abstract method call: _getRelatedSelectable()");
      },

      /**
       * Returns the item which should be selected on pageUp/pageDown.
       *
       * May also scroll to the needed position.
       *
       * @param lead {var} The current lead item
       * @param up {Boolean?false} Which page key was pressed:
       *   <code>up</code> or <code>down</code>.
       */
      _getPage: function _getPage(lead, up) {
        throw new Error("Abstract method call: _getPage()");
      },

      /*
      ---------------------------------------------------------------------------
        PROPERTY APPLY ROUTINES
      ---------------------------------------------------------------------------
      */
      // property apply
      _applyMode: function _applyMode(value, old) {
        this._setLeadItem(null);

        this._setAnchorItem(null);

        this._clearSelection(); // Mode "one" requires one selected item


        if (value === "one") {
          this._applyDefaultSelection(true);
        }

        this._fireChange();
      },

      /*
      ---------------------------------------------------------------------------
        POINTER SUPPORT
      ---------------------------------------------------------------------------
      */

      /**
       * This method should be connected to the <code>pointerover</code> event
       * of the managed object.
       *
       * @param event {qx.event.type.Pointer} A valid pointer event
       */
      handlePointerOver: function handlePointerOver(event) {
        // All browsers (except Opera) fire a native "mouseover" event when a scroll appears
        // by keyboard interaction. We have to ignore the event to avoid a selection for
        // "pointerover" (quick selection). For more details see [BUG #4225]
        if (this.__oldScrollTop__P_226_20 != null && this.__oldScrollTop__P_226_20 != this._getScroll().top) {
          this.__oldScrollTop__P_226_20 = null;
          return;
        } // quick select should only work on mouse events


        if (event.getPointerType() != "mouse") {
          return;
        } // this is a method invoked by an user interaction, so be careful to
        // set / clear the mark this._userInteraction [BUG #3344]


        this._userInteraction = true;

        if (!this.getQuick()) {
          this._userInteraction = false;
          return;
        }

        var mode = this.getMode();

        if (mode !== "one" && mode !== "single") {
          this._userInteraction = false;
          return;
        }

        var item = this._getSelectableFromPointerEvent(event);

        if (item === null) {
          this._userInteraction = false;
          return;
        }

        this._setSelectedItem(item); // Be sure that item is in view
        // This does not feel good when pointerover is used
        // this._scrollItemIntoView(item);
        // Fire change event as needed


        this._fireChange("quick");

        this._userInteraction = false;
      },

      /**
       * This method should be connected to the <code>pointerdown</code> event
       * of the managed object.
       *
       * @param event {qx.event.type.Pointer} A valid pointer event
       */
      handlePointerDown: function handlePointerDown(event) {
        // this is a method invoked by an user interaction, so be careful to
        // set / clear the mark this._userInteraction [BUG #3344]
        this._userInteraction = true;

        var item = this._getSelectableFromPointerEvent(event);

        if (item === null) {
          this._userInteraction = false;
          return;
        } // Read in keyboard modifiers


        var isCtrlPressed = event.isCtrlPressed() || qx.core.Environment.get("os.name") == "osx" && event.isMetaPressed();
        var isShiftPressed = event.isShiftPressed(); // tapping on selected items deselect on pointerup, not on pointerdown

        if (this.isItemSelected(item) && !isShiftPressed && !isCtrlPressed && !this.getDrag()) {
          this.__pointerDownOnSelected__P_226_19 = item;
          this._userInteraction = false;
          return;
        } else {
          this.__pointerDownOnSelected__P_226_19 = null;
        } // Be sure that item is in view


        this._scrollItemIntoView(item); // Drag selection


        var mode = this.getMode();

        if (this.getDrag() && mode !== "single" && mode !== "one" && !isShiftPressed && !isCtrlPressed && event.getPointerType() == "mouse") {
          this._setAnchorItem(item);

          this._setLeadItem(item); // Cache location/scroll data


          this.__frameLocation__P_226_7 = this._getLocation();
          this.__frameScroll__P_226_4 = this._getScroll(); // Store position at start

          this.__dragStartX__P_226_8 = event.getDocumentLeft() + this.__frameScroll__P_226_4.left;
          this.__dragStartY__P_226_9 = event.getDocumentTop() + this.__frameScroll__P_226_4.top; // Switch to capture mode

          this.__inCapture__P_226_10 = true;

          this._capture();
        } // Fire change event as needed


        this._fireChange("tap");

        this._userInteraction = false;
      },

      /**
       * This method should be connected to the <code>tap</code> event
       * of the managed object.
       *
       * @param event {qx.event.type.Tap} A valid pointer event
       */
      handleTap: function handleTap(event) {
        // this is a method invoked by an user interaction, so be careful to
        // set / clear the mark this._userInteraction [BUG #3344]
        this._userInteraction = true; // Read in keyboard modifiers

        var isCtrlPressed = event.isCtrlPressed() || qx.core.Environment.get("os.name") == "osx" && event.isMetaPressed();
        var isShiftPressed = event.isShiftPressed();

        if (!isCtrlPressed && !isShiftPressed && this.__pointerDownOnSelected__P_226_19 != null) {
          this._userInteraction = false;

          var item = this._getSelectableFromPointerEvent(event);

          if (item === null || !this.isItemSelected(item)) {
            return;
          }
        }

        var item = this._getSelectableFromPointerEvent(event);

        if (item === null) {
          this._userInteraction = false;
          return;
        } // Action depends on selected mode


        if (!this.isReadOnly()) {
          switch (this.getMode()) {
            case "single":
            case "one":
              this._setSelectedItem(item);

              break;

            case "additive":
              this._setLeadItem(item);

              this._setAnchorItem(item);

              this._toggleInSelection(item);

              break;

            case "multi":
              // Update lead item
              this._setLeadItem(item); // Create/Update range selection


              if (isShiftPressed) {
                var anchor = this._getAnchorItem();

                if (anchor === null) {
                  anchor = this._getFirstSelectable();

                  this._setAnchorItem(anchor);
                }

                this._selectItemRange(anchor, item, isCtrlPressed);
              } // Toggle in selection
              else if (isCtrlPressed) {
                this._setAnchorItem(item);

                this._toggleInSelection(item);
              } // Replace current selection
              else {
                this._setAnchorItem(item);

                this._setSelectedItem(item);
              }

              break;
          }
        } // Cleanup operation


        this._userInteraction = false;

        this._cleanup();
      },

      /**
       * This method should be connected to the <code>losecapture</code> event
       * of the managed object.
       *
       * @param event {qx.event.type.Pointer} A valid pointer event
       */
      handleLoseCapture: function handleLoseCapture(event) {
        this._cleanup();
      },

      /**
       * This method should be connected to the <code>pointermove</code> event
       * of the managed object.
       *
       * @param event {qx.event.type.Pointer} A valid pointer event
       */
      handlePointerMove: function handlePointerMove(event) {
        // Only relevant when capturing is enabled
        if (!this.__inCapture__P_226_10) {
          return;
        } // Update pointer position cache


        this.__pointerX__P_226_11 = event.getDocumentLeft();
        this.__pointerY__P_226_12 = event.getDocumentTop(); // this is a method invoked by an user interaction, so be careful to
        // set / clear the mark this._userInteraction [BUG #3344]

        this._userInteraction = true; // Detect move directions

        var dragX = this.__pointerX__P_226_11 + this.__frameScroll__P_226_4.left;

        if (dragX > this.__dragStartX__P_226_8) {
          this.__moveDirectionX__P_226_13 = 1;
        } else if (dragX < this.__dragStartX__P_226_8) {
          this.__moveDirectionX__P_226_13 = -1;
        } else {
          this.__moveDirectionX__P_226_13 = 0;
        }

        var dragY = this.__pointerY__P_226_12 + this.__frameScroll__P_226_4.top;

        if (dragY > this.__dragStartY__P_226_9) {
          this.__moveDirectionY__P_226_14 = 1;
        } else if (dragY < this.__dragStartY__P_226_9) {
          this.__moveDirectionY__P_226_14 = -1;
        } else {
          this.__moveDirectionY__P_226_14 = 0;
        } // Update scroll steps


        var location = this.__frameLocation__P_226_7;

        if (this.__pointerX__P_226_11 < location.left) {
          this.__scrollStepX__P_226_1 = this.__pointerX__P_226_11 - location.left;
        } else if (this.__pointerX__P_226_11 > location.right) {
          this.__scrollStepX__P_226_1 = this.__pointerX__P_226_11 - location.right;
        } else {
          this.__scrollStepX__P_226_1 = 0;
        }

        if (this.__pointerY__P_226_12 < location.top) {
          this.__scrollStepY__P_226_2 = this.__pointerY__P_226_12 - location.top;
        } else if (this.__pointerY__P_226_12 > location.bottom) {
          this.__scrollStepY__P_226_2 = this.__pointerY__P_226_12 - location.bottom;
        } else {
          this.__scrollStepY__P_226_2 = 0;
        } // Dynamically create required timer instance


        if (!this.__scrollTimer__P_226_3) {
          this.__scrollTimer__P_226_3 = new qx.event.Timer(100);

          this.__scrollTimer__P_226_3.addListener("interval", this._onInterval, this);
        } // Start interval


        this.__scrollTimer__P_226_3.start(); // Auto select based on new cursor position


        this._autoSelect();

        event.stopPropagation();
        this._userInteraction = false;
      },

      /**
       * This method should be connected to the <code>addItem</code> event
       * of the managed object.
       *
       * @param e {qx.event.type.Data} The event object
       */
      handleAddItem: function handleAddItem(e) {
        var item = e.getData();

        if (this.getMode() === "one" && this.isSelectionEmpty()) {
          this.addItem(item);
        }
      },

      /**
       * This method should be connected to the <code>removeItem</code> event
       * of the managed object.
       *
       * @param e {qx.event.type.Data} The event object
       */
      handleRemoveItem: function handleRemoveItem(e) {
        this.removeItem(e.getData());
      },

      /*
      ---------------------------------------------------------------------------
        POINTER SUPPORT INTERNALS
      ---------------------------------------------------------------------------
      */

      /**
       * Stops all timers, release capture etc. to cleanup drag selection
       */
      _cleanup: function _cleanup() {
        if (!this.getDrag() && this.__inCapture__P_226_10) {
          return;
        } // Fire change event if needed


        if (this.__selectionModified__P_226_15) {
          this._fireChange("tap");
        } // Remove flags


        delete this.__inCapture__P_226_10;
        delete this.__lastRelX__P_226_5;
        delete this.__lastRelY__P_226_6; // Stop capturing

        this._releaseCapture(); // Stop timer


        if (this.__scrollTimer__P_226_3) {
          this.__scrollTimer__P_226_3.stop();
        }
      },

      /**
       * Event listener for timer used by drag selection
       *
       * @param e {qx.event.type.Event} Timer event
       */
      _onInterval: function _onInterval(e) {
        // Scroll by defined block size
        this._scrollBy(this.__scrollStepX__P_226_1, this.__scrollStepY__P_226_2); // Update scroll cache


        this.__frameScroll__P_226_4 = this._getScroll(); // Auto select based on new scroll position and cursor

        this._autoSelect();
      },

      /**
       * Automatically selects items based on the pointer movement during a drag selection
       */
      _autoSelect: function _autoSelect() {
        var inner = this._getDimension(); // Get current relative Y position and compare it with previous one


        var relX = Math.max(0, Math.min(this.__pointerX__P_226_11 - this.__frameLocation__P_226_7.left, inner.width)) + this.__frameScroll__P_226_4.left;

        var relY = Math.max(0, Math.min(this.__pointerY__P_226_12 - this.__frameLocation__P_226_7.top, inner.height)) + this.__frameScroll__P_226_4.top; // Compare old and new relative coordinates (for performance reasons)


        if (this.__lastRelX__P_226_5 === relX && this.__lastRelY__P_226_6 === relY) {
          return;
        }

        this.__lastRelX__P_226_5 = relX;
        this.__lastRelY__P_226_6 = relY; // Cache anchor

        var anchor = this._getAnchorItem();

        var lead = anchor; // Process X-coordinate

        var moveX = this.__moveDirectionX__P_226_13;
        var nextX, locationX;

        while (moveX !== 0) {
          // Find next item to process depending on current scroll direction
          nextX = moveX > 0 ? this._getRelatedSelectable(lead, "right") : this._getRelatedSelectable(lead, "left"); // May be null (e.g. first/last item)

          if (nextX !== null) {
            locationX = this._getSelectableLocationX(nextX); // Continue when the item is in the visible area

            if (moveX > 0 && locationX.left <= relX || moveX < 0 && locationX.right >= relX) {
              lead = nextX;
              continue;
            }
          } // Otherwise break


          break;
        } // Process Y-coordinate


        var moveY = this.__moveDirectionY__P_226_14;
        var nextY, locationY;

        while (moveY !== 0) {
          // Find next item to process depending on current scroll direction
          nextY = moveY > 0 ? this._getRelatedSelectable(lead, "under") : this._getRelatedSelectable(lead, "above"); // May be null (e.g. first/last item)

          if (nextY !== null) {
            locationY = this._getSelectableLocationY(nextY); // Continue when the item is in the visible area

            if (moveY > 0 && locationY.top <= relY || moveY < 0 && locationY.bottom >= relY) {
              lead = nextY;
              continue;
            }
          } // Otherwise break


          break;
        } // Differenciate between the two supported modes


        var mode = this.getMode();

        if (mode === "multi") {
          // Replace current selection with new range
          this._selectItemRange(anchor, lead);
        } else if (mode === "additive") {
          // Behavior depends on the fact whether the
          // anchor item is selected or not
          if (this.isItemSelected(anchor)) {
            this._selectItemRange(anchor, lead, true);
          } else {
            this._deselectItemRange(anchor, lead);
          } // Improve performance. This mode does not rely
          // on full ranges as it always extend the old
          // selection/deselection.


          this._setAnchorItem(lead);
        } // Fire change event as needed


        this._fireChange("drag");
      },

      /*
      ---------------------------------------------------------------------------
        KEYBOARD SUPPORT
      ---------------------------------------------------------------------------
      */

      /**
       * @type {Map} All supported navigation keys
       *
       * @lint ignoreReferenceField(__navigationKeys)
       */
      __navigationKeys__P_226_21: {
        Home: 1,
        Down: 1,
        Right: 1,
        PageDown: 1,
        End: 1,
        Up: 1,
        Left: 1,
        PageUp: 1
      },

      /**
       * This method should be connected to the <code>keypress</code> event
       * of the managed object.
       *
       * @param event {qx.event.type.KeySequence} A valid key sequence event
       */
      handleKeyPress: function handleKeyPress(event) {
        // this is a method invoked by an user interaction, so be careful to
        // set / clear the mark this._userInteraction [BUG #3344]
        this._userInteraction = true;
        var current, next;
        var key = event.getKeyIdentifier();
        var mode = this.getMode(); // Support both control keys on Mac

        var isCtrlPressed = event.isCtrlPressed() || qx.core.Environment.get("os.name") == "osx" && event.isMetaPressed();
        var isShiftPressed = event.isShiftPressed();
        var consumed = false;
        var readOnly = this.isReadOnly();

        if (key === "A" && isCtrlPressed && !readOnly) {
          if (mode !== "single" && mode !== "one") {
            this._selectAllItems();

            consumed = true;
          }
        } else if (key === "Escape" && !readOnly) {
          if (mode !== "single" && mode !== "one") {
            this._clearSelection();

            consumed = true;
          }
        } else if (key === "Space" && !readOnly) {
          var lead = this.getLeadItem();

          if (lead != null && !isShiftPressed) {
            if (isCtrlPressed || mode === "additive") {
              this._toggleInSelection(lead);
            } else {
              this._setSelectedItem(lead);
            }

            consumed = true;
          }
        } else if (this.__navigationKeys__P_226_21[key] && readOnly) {
          switch (key) {
            case "Home":
              next = this._getFirstSelectable();
              break;

            case "End":
              next = this._getLastSelectable();
              break;

            case "Up":
              next = this._getRelatedSelectable(this._getFirstVisibleSelectable(), "above");
              break;

            case "Down":
              next = this._getRelatedSelectable(this._getLastVisibleSelectable(), "under");
              break;

            case "Left":
              next = this._getRelatedSelectable(this._getFirstVisibleSelectable(), "left");
              break;

            case "Right":
              next = this._getRelatedSelectable(this._getLastVisibleSelectable(), "right");
              break;

            case "PageUp":
              next = this._getPage(this._getFirstVisibleSelectable(), true);
              break;

            case "PageDown":
              next = this._getPage(this._getLastVisibleSelectable(), false);
              break;
          }

          if (next) {
            consumed = true;
            this.__oldScrollTop__P_226_20 = this._getScroll().top;

            this._scrollItemIntoView(next);
          }
        } else if (this.__navigationKeys__P_226_21[key]) {
          consumed = true;

          if (mode === "single" || mode == "one") {
            current = this._getSelectedItem();
          } else {
            current = this.getLeadItem();
          }

          if (current !== null) {
            switch (key) {
              case "Home":
                next = this._getFirstSelectable();
                break;

              case "End":
                next = this._getLastSelectable();
                break;

              case "Up":
                next = this._getRelatedSelectable(current, "above");
                break;

              case "Down":
                next = this._getRelatedSelectable(current, "under");
                break;

              case "Left":
                next = this._getRelatedSelectable(current, "left");
                break;

              case "Right":
                next = this._getRelatedSelectable(current, "right");
                break;

              case "PageUp":
                next = this._getPage(current, true);
                break;

              case "PageDown":
                next = this._getPage(current, false);
                break;
            }
          } else {
            switch (key) {
              case "Home":
              case "Down":
              case "Right":
              case "PageDown":
                next = this._getFirstSelectable();
                break;

              case "End":
              case "Up":
              case "Left":
              case "PageUp":
                next = this._getLastSelectable();
                break;
            }
          } // Process result


          if (next !== null) {
            switch (mode) {
              case "single":
              case "one":
                this._setSelectedItem(next);

                break;

              case "additive":
                this._setLeadItem(next);

                break;

              case "multi":
                if (isShiftPressed) {
                  var anchor = this._getAnchorItem();

                  if (anchor === null) {
                    this._setAnchorItem(anchor = this._getFirstSelectable());
                  }

                  this._setLeadItem(next);

                  this._selectItemRange(anchor, next, isCtrlPressed);
                } else {
                  this._setAnchorItem(next);

                  this._setLeadItem(next);

                  if (!isCtrlPressed) {
                    this._setSelectedItem(next);
                  }
                }

                break;
            }

            this.__oldScrollTop__P_226_20 = this._getScroll().top;

            this._scrollItemIntoView(next);
          }
        }

        if (consumed) {
          // Stop processed events
          event.stop(); // Fire change event as needed

          this._fireChange("key");
        }

        this._userInteraction = false;
      },

      /*
      ---------------------------------------------------------------------------
        SUPPORT FOR ITEM RANGES
      ---------------------------------------------------------------------------
      */

      /**
       * Adds all items to the selection
       */
      _selectAllItems: function _selectAllItems() {
        var range = this.getSelectables();

        for (var i = 0, l = range.length; i < l; i++) {
          this._addToSelection(range[i]);
        }
      },

      /**
       * Clears current selection
       */
      _clearSelection: function _clearSelection() {
        var selection = this.__selection__P_226_0;

        for (var hash in selection) {
          this._removeFromSelection(selection[hash]);
        }

        this.__selection__P_226_0 = {};
      },

      /**
       * Select a range from <code>item1</code> to <code>item2</code>.
       *
       * @param item1 {Object} Start with this item
       * @param item2 {Object} End with this item
       * @param extend {Boolean?false} Whether the current
       *    selection should be replaced or extended.
       */
      _selectItemRange: function _selectItemRange(item1, item2, extend) {
        var range = this._getSelectableRange(item1, item2); // Remove items which are not in the detected range


        if (!extend) {
          var selected = this.__selection__P_226_0;

          var mapped = this.__rangeToMap__P_226_22(range);

          for (var hash in selected) {
            if (!mapped[hash]) {
              this._removeFromSelection(selected[hash]);
            }
          }
        } // Add new items to the selection


        for (var i = 0, l = range.length; i < l; i++) {
          this._addToSelection(range[i]);
        }
      },

      /**
       * Deselect all items between <code>item1</code> and <code>item2</code>.
       *
       * @param item1 {Object} Start with this item
       * @param item2 {Object} End with this item
       */
      _deselectItemRange: function _deselectItemRange(item1, item2) {
        var range = this._getSelectableRange(item1, item2);

        for (var i = 0, l = range.length; i < l; i++) {
          this._removeFromSelection(range[i]);
        }
      },

      /**
       * Internal method to convert a range to a map of hash
       * codes for faster lookup during selection compare routines.
       *
       * @param range {Array} List of selectable items
       */
      __rangeToMap__P_226_22: function __rangeToMap__P_226_22(range) {
        var mapped = {};
        var item;

        for (var i = 0, l = range.length; i < l; i++) {
          item = range[i];
          mapped[this._selectableToHashCode(item)] = item;
        }

        return mapped;
      },

      /*
      ---------------------------------------------------------------------------
        SINGLE ITEM QUERY AND MODIFICATION
      ---------------------------------------------------------------------------
      */

      /**
       * Returns the first selected item. Only makes sense
       * when using manager in single selection mode.
       *
       * @return {var} The selected item (or <code>null</code>)
       */
      _getSelectedItem: function _getSelectedItem() {
        for (var hash in this.__selection__P_226_0) {
          return this.__selection__P_226_0[hash];
        }

        return null;
      },

      /**
       * Replace current selection with given item.
       *
       * @param item {var} Any valid selectable item
       */
      _setSelectedItem: function _setSelectedItem(item) {
        if (this._isSelectable(item)) {
          // If already selected try to find out if this is the only item
          var current = this.__selection__P_226_0;

          var hash = this._selectableToHashCode(item);

          if (!current[hash] || current.length >= 2) {
            this._clearSelection();

            this._addToSelection(item);
          }
        }
      },

      /*
      ---------------------------------------------------------------------------
        MODIFY ITEM SELECTION
      ---------------------------------------------------------------------------
      */

      /**
       * Adds an item to the current selection.
       *
       * @param item {Object} Any item
       */
      _addToSelection: function _addToSelection(item) {
        var hash = this._selectableToHashCode(item);

        if (this.__selection__P_226_0[hash] == null && this._isSelectable(item)) {
          this.__selection__P_226_0[hash] = item;

          this._styleSelectable(item, "selected", true);

          this.__selectionModified__P_226_15 = true;
        }
      },

      /**
       * Toggles the item e.g. remove it when already selected
       * or select it when currently not.
       *
       * @param item {Object} Any item
       */
      _toggleInSelection: function _toggleInSelection(item) {
        var hash = this._selectableToHashCode(item);

        if (this.__selection__P_226_0[hash] == null) {
          this.__selection__P_226_0[hash] = item;

          this._styleSelectable(item, "selected", true);
        } else {
          delete this.__selection__P_226_0[hash];

          this._styleSelectable(item, "selected", false);
        }

        this.__selectionModified__P_226_15 = true;
      },

      /**
       * Removes the given item from the current selection.
       *
       * @param item {Object} Any item
       */
      _removeFromSelection: function _removeFromSelection(item) {
        var hash = this._selectableToHashCode(item);

        if (this.__selection__P_226_0[hash] != null) {
          delete this.__selection__P_226_0[hash];

          this._styleSelectable(item, "selected", false);

          this.__selectionModified__P_226_15 = true;
        }
      },

      /**
       * Replaces current selection with items from given array.
       *
       * @param items {Array} List of items to select
       */
      _replaceMultiSelection: function _replaceMultiSelection(items) {
        if (items.length === 0) {
          this.clearSelection();
          return;
        }

        var modified = false; // Build map from hash codes and filter non-selectables

        var selectable, hash;
        var incoming = {};

        for (var i = 0, l = items.length; i < l; i++) {
          selectable = items[i];

          if (this._isSelectable(selectable)) {
            hash = this._selectableToHashCode(selectable);
            incoming[hash] = selectable;
          }
        } // Remember last


        var first = items[0];
        var last = selectable; // Clear old entries from map

        var current = this.__selection__P_226_0;

        for (var hash in current) {
          if (incoming[hash]) {
            // Reduce map to make next loop faster
            delete incoming[hash];
          } else {
            // update internal map
            selectable = current[hash];
            delete current[hash]; // apply styling

            this._styleSelectable(selectable, "selected", false); // remember that the selection has been modified


            modified = true;
          }
        } // Add remaining selectables to selection


        for (var hash in incoming) {
          // update internal map
          selectable = current[hash] = incoming[hash]; // apply styling

          this._styleSelectable(selectable, "selected", true); // remember that the selection has been modified


          modified = true;
        } // Do not do anything if selection is equal to previous one


        if (!modified) {
          return false;
        } // Scroll last incoming item into view


        this._scrollItemIntoView(last); // Reset anchor and lead item


        this._setLeadItem(first);

        this._setAnchorItem(first); // Finally fire change event


        this.__selectionModified__P_226_15 = true;

        this._fireChange();
      },

      /**
       * Fires the selection change event if the selection has
       * been modified.
       *
       * @param context {String} One of <code>tap</code>, <code>quick</code>,
       *    <code>drag</code> or <code>key</code> or <code>null</code>
       */
      _fireChange: function _fireChange(context) {
        if (this.__selectionModified__P_226_15) {
          // Store context
          this.__selectionContext__P_226_16 = context || null; // Fire data event which contains the current selection

          this.fireDataEvent("changeSelection", this.getSelection());
          delete this.__selectionModified__P_226_15;
        }
      },

      /**
       * Applies the default selection. The default item is the first item.
       *
       * @param force {Boolean} Whether the default selection should be forced.
       *
       * @return {var} The selected item.
       */
      _applyDefaultSelection: function _applyDefaultSelection(force) {
        if (force === true || this.getMode() === "one" && this.isSelectionEmpty()) {
          var first = this._getFirstSelectable();

          if (first != null) {
            this.selectItem(first);
          }

          return first;
        }

        return null;
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this._disposeObjects("__scrollTimer__P_226_3");

      this.__selection__P_226_0 = this.__pointerDownOnSelected__P_226_19 = this.__anchorItem__P_226_18 = null;
      this.__leadItem__P_226_17 = null;
    }
  });
  qx.ui.core.selection.Abstract.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.selection.Abstract": {
        "construct": true,
        "require": true
      },
      "qx.bom.element.Location": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
  
  ************************************************************************ */

  /**
   * A selection manager, which handles the selection in widgets.
   */
  qx.Class.define("qx.ui.core.selection.Widget", {
    extend: qx.ui.core.selection.Abstract,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param widget {qx.ui.core.Widget} The widget to connect to
     */
    construct: function construct(widget) {
      qx.ui.core.selection.Abstract.constructor.call(this);
      this.__widget__P_225_0 = widget;
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __widget__P_225_0: null,

      /*
      ---------------------------------------------------------------------------
        BASIC SUPPORT
      ---------------------------------------------------------------------------
      */
      // overridden
      _isSelectable: function _isSelectable(item) {
        return this._isItemSelectable(item) && item.getLayoutParent() === this.__widget__P_225_0;
      },
      // overridden
      _selectableToHashCode: function _selectableToHashCode(item) {
        return item.toHashCode();
      },
      // overridden
      _styleSelectable: function _styleSelectable(item, type, enabled) {
        enabled ? item.addState(type) : item.removeState(type);
      },
      // overridden
      _capture: function _capture() {
        this.__widget__P_225_0.capture();
      },
      // overridden
      _releaseCapture: function _releaseCapture() {
        this.__widget__P_225_0.releaseCapture();
      },

      /**
       * Helper to return the selectability of the item concerning the
       * user interaction.
       *
       * @param item {qx.ui.core.Widget} The item to check.
       * @return {Boolean} true, if the item is selectable.
       */
      _isItemSelectable: function _isItemSelectable(item) {
        if (this._userInteraction) {
          return item.isVisible() && item.isEnabled();
        } else {
          return item.isVisible();
        }
      },

      /**
       * Returns the connected widget.
       * @return {qx.ui.core.Widget} The widget
       */
      _getWidget: function _getWidget() {
        return this.__widget__P_225_0;
      },

      /*
      ---------------------------------------------------------------------------
        DIMENSION AND LOCATION
      ---------------------------------------------------------------------------
      */
      // overridden
      _getLocation: function _getLocation() {
        var elem = this.__widget__P_225_0.getContentElement().getDomElement();

        return elem ? qx.bom.element.Location.get(elem) : null;
      },
      // overridden
      _getDimension: function _getDimension() {
        return this.__widget__P_225_0.getInnerSize();
      },
      // overridden
      _getSelectableLocationX: function _getSelectableLocationX(item) {
        var computed = item.getBounds();

        if (computed) {
          return {
            left: computed.left,
            right: computed.left + computed.width
          };
        }
      },
      // overridden
      _getSelectableLocationY: function _getSelectableLocationY(item) {
        var computed = item.getBounds();

        if (computed) {
          return {
            top: computed.top,
            bottom: computed.top + computed.height
          };
        }
      },

      /*
      ---------------------------------------------------------------------------
        SCROLL SUPPORT
      ---------------------------------------------------------------------------
      */
      // overridden
      _getScroll: function _getScroll() {
        return {
          left: 0,
          top: 0
        };
      },
      // overridden
      _scrollBy: function _scrollBy(xoff, yoff) {// empty implementation
      },
      // overridden
      _scrollItemIntoView: function _scrollItemIntoView(item) {
        this.__widget__P_225_0.scrollChildIntoView(item);
      },

      /*
      ---------------------------------------------------------------------------
        QUERY SUPPORT
      ---------------------------------------------------------------------------
      */
      // overridden
      getSelectables: function getSelectables(all) {
        // if only the user selectables should be returned
        var oldUserInteraction = false;

        if (!all) {
          oldUserInteraction = this._userInteraction;
          this._userInteraction = true;
        }

        var children = this.__widget__P_225_0.getChildren();

        var result = [];
        var child;

        for (var i = 0, l = children.length; i < l; i++) {
          child = children[i];

          if (this._isItemSelectable(child)) {
            result.push(child);
          }
        } // reset to the former user interaction state


        this._userInteraction = oldUserInteraction;
        return result;
      },
      // overridden
      _getSelectableRange: function _getSelectableRange(item1, item2) {
        // Fast path for identical items
        if (item1 === item2) {
          return [item1];
        } // Iterate over children and collect all items
        // between the given two (including them)


        var children = this.__widget__P_225_0.getChildren();

        var result = [];
        var active = false;
        var child;

        for (var i = 0, l = children.length; i < l; i++) {
          child = children[i];

          if (child === item1 || child === item2) {
            if (active) {
              result.push(child);
              break;
            } else {
              active = true;
            }
          }

          if (active && this._isItemSelectable(child)) {
            result.push(child);
          }
        }

        return result;
      },
      // overridden
      _getFirstSelectable: function _getFirstSelectable() {
        var children = this.__widget__P_225_0.getChildren();

        for (var i = 0, l = children.length; i < l; i++) {
          if (this._isItemSelectable(children[i])) {
            return children[i];
          }
        }

        return null;
      },
      // overridden
      _getLastSelectable: function _getLastSelectable() {
        var children = this.__widget__P_225_0.getChildren();

        for (var i = children.length - 1; i > 0; i--) {
          if (this._isItemSelectable(children[i])) {
            return children[i];
          }
        }

        return null;
      },
      // overridden
      _getFirstVisibleSelectable: function _getFirstVisibleSelectable() {
        return this._getFirstSelectable();
      },
      // overridden
      _getLastVisibleSelectable: function _getLastVisibleSelectable() {
        return this._getLastSelectable();
      },
      // overridden
      _getRelatedSelectable: function _getRelatedSelectable(item, relation) {
        var vertical = this.__widget__P_225_0.getOrientation() === "vertical";

        var children = this.__widget__P_225_0.getChildren();

        var index = children.indexOf(item);
        var sibling;

        if (vertical && relation === "above" || !vertical && relation === "left") {
          for (var i = index - 1; i >= 0; i--) {
            sibling = children[i];

            if (this._isItemSelectable(sibling)) {
              return sibling;
            }
          }
        } else if (vertical && relation === "under" || !vertical && relation === "right") {
          for (var i = index + 1; i < children.length; i++) {
            sibling = children[i];

            if (this._isItemSelectable(sibling)) {
              return sibling;
            }
          }
        }

        return null;
      },
      // overridden
      _getPage: function _getPage(lead, up) {
        if (up) {
          return this._getFirstSelectable();
        } else {
          return this._getLastSelectable();
        }
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this.__widget__P_225_0 = null;
    }
  });
  qx.ui.core.selection.Widget.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.selection.Widget": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
  
  ************************************************************************ */

  /**
   * A selection manager, which handles the selection in widgets extending
   * {@link qx.ui.core.scroll.AbstractScrollArea}.
   */
  qx.Class.define("qx.ui.core.selection.ScrollArea", {
    extend: qx.ui.core.selection.Widget,

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      /*
      ---------------------------------------------------------------------------
        BASIC SUPPORT
      ---------------------------------------------------------------------------
      */
      // overridden
      _isSelectable: function _isSelectable(item) {
        return this._isItemSelectable(item) && item.getLayoutParent() === this._getWidget().getChildrenContainer();
      },

      /*
      ---------------------------------------------------------------------------
        DIMENSION AND LOCATION
      ---------------------------------------------------------------------------
      */
      // overridden
      _getDimension: function _getDimension() {
        return this._getWidget().getPaneSize();
      },

      /*
      ---------------------------------------------------------------------------
        SCROLL SUPPORT
      ---------------------------------------------------------------------------
      */
      // overridden
      _getScroll: function _getScroll() {
        var widget = this._getWidget();

        return {
          left: widget.getScrollX(),
          top: widget.getScrollY()
        };
      },
      // overridden
      _scrollBy: function _scrollBy(xoff, yoff) {
        var widget = this._getWidget();

        widget.scrollByX(xoff);
        widget.scrollByY(yoff);
      },

      /*
      ---------------------------------------------------------------------------
        QUERY SUPPORT
      ---------------------------------------------------------------------------
      */
      // overridden
      _getFirstVisibleSelectable: function _getFirstVisibleSelectable() {
        var selectables = this.getSelectables();

        var widget = this._getWidget();

        var scrollTop = widget.getScrollY();

        for (var i = 0; i < selectables.length; i++) {
          var bottom = widget.getItemBottom(selectables[i]);

          if (bottom > scrollTop) {
            return selectables[i];
          }
        }

        return null;
      },
      // overridden
      _getLastVisibleSelectable: function _getLastVisibleSelectable() {
        var selectables = this.getSelectables();

        var widget = this._getWidget();

        var scrollTop = widget.getScrollY();
        var innerHeight = widget.getInnerSize().height;
        var scrollBottom = scrollTop + innerHeight;
        var last = null;

        for (var i = 0; i < selectables.length; i++) {
          var top = widget.getItemTop(selectables[i]);

          if (top > scrollBottom) {
            break;
          }

          var bottom = widget.getItemBottom(selectables[i]);

          if (bottom > scrollTop) {
            last = selectables[i];
          }
        }

        return last;
      },
      // overridden
      _getPage: function _getPage(lead, up) {
        var selectables = this.getSelectables();
        var length = selectables.length;
        var start = selectables.indexOf(lead); // Given lead is not a selectable?!?

        if (start === -1) {
          throw new Error("Invalid lead item: " + lead);
        }

        var widget = this._getWidget();

        var scrollTop = widget.getScrollY();
        var innerHeight = widget.getInnerSize().height;
        var top, bottom, found;

        if (up) {
          var min = scrollTop;
          var i = start; // Loop required to scroll pages up dynamically

          while (1) {
            // Iterate through all selectables from start
            for (; i >= 0; i--) {
              top = widget.getItemTop(selectables[i]); // This item is out of the visible block

              if (top < min) {
                // Use previous one
                found = i;
                break;
              }
            } // Nothing found. Return first item.


            if (found == null) {
              var first = this._getFirstSelectable();

              return first == lead ? null : first;
            } // Found item, but is identical to start or even before start item
            // Update min position and try on previous page


            if (found >= start) {
              // Reduce min by the distance of the lead item to the visible
              // bottom edge. This is needed instead of a simple subtraction
              // of the inner height to keep the last lead visible on page key
              // presses. This is the behavior of native toolkits as well.
              min -= innerHeight + scrollTop - widget.getItemBottom(lead);
              found = null;
              continue;
            } // Return selectable


            return selectables[found];
          }
        } else {
          var max = innerHeight + scrollTop;
          var i = start; // Loop required to scroll pages down dynamically

          while (1) {
            // Iterate through all selectables from start
            for (; i < length; i++) {
              bottom = widget.getItemBottom(selectables[i]); // This item is out of the visible block

              if (bottom > max) {
                // Use next one
                found = i;
                break;
              }
            } // Nothing found. Return last item.


            if (found == null) {
              var last = this._getLastSelectable();

              return last == lead ? null : last;
            } // Found item, but is identical to start or even before start item
            // Update max position and try on next page


            if (found <= start) {
              // Extend max by the distance of the lead item to the visible
              // top edge. This is needed instead of a simple addition
              // of the inner height to keep the last lead visible on page key
              // presses. This is the behavior of native toolkits as well.
              max += widget.getItemTop(lead) - scrollTop;
              found = null;
              continue;
            } // Return selectable


            return selectables[found];
          }
        }
      }
    }
  });
  qx.ui.core.selection.ScrollArea.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.scroll.AbstractScrollArea": {
        "construct": true,
        "require": true
      },
      "qx.ui.core.IMultiSelection": {
        "require": true
      },
      "qx.ui.form.IForm": {
        "require": true
      },
      "qx.ui.form.IField": {
        "require": true
      },
      "qx.ui.form.IModelSelection": {
        "require": true
      },
      "qx.ui.core.MRemoteChildrenHandling": {
        "require": true
      },
      "qx.ui.core.MMultiSelectionHandling": {
        "require": true
      },
      "qx.ui.form.MForm": {
        "require": true
      },
      "qx.ui.form.MModelSelection": {
        "require": true
      },
      "qx.ui.core.selection.ScrollArea": {
        "require": true
      },
      "qx.ui.container.Composite": {},
      "qx.ui.layout.HBox": {},
      "qx.ui.layout.VBox": {},
      "qx.bom.element.Attribute": {}
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
       * Martin Wittemann (martinwittemann)
       * Christian Hagendorn (chris_schmidt)
  
  ************************************************************************ */

  /**
   * A list of items. Displays an automatically scrolling list for all
   * added {@link qx.ui.form.IListItem} instances (typically this would be instances of
   * {@link qx.ui.form.ListItem} but can also be other Atoms, such as {@link qx.ui.form.CheckBox}).
   * Supports various selection options: single, multi, ...
   */
  qx.Class.define("qx.ui.form.List", {
    extend: qx.ui.core.scroll.AbstractScrollArea,
    implement: [qx.ui.core.IMultiSelection, qx.ui.form.IForm, qx.ui.form.IField, qx.ui.form.IModelSelection],
    include: [qx.ui.core.MRemoteChildrenHandling, qx.ui.core.MMultiSelectionHandling, qx.ui.form.MForm, qx.ui.form.MModelSelection],

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param horizontal {Boolean?false} Whether the list should be horizontal.
     */
    construct: function construct(horizontal) {
      qx.ui.core.scroll.AbstractScrollArea.constructor.call(this); // Create content

      this.__content__P_223_0 = this._createListItemContainer(); // Used to fire item add/remove events

      this.__content__P_223_0.addListener("addChildWidget", this._onAddChild, this);

      this.__content__P_223_0.addListener("removeChildWidget", this._onRemoveChild, this); // Add to scrollpane


      this.getChildControl("pane").add(this.__content__P_223_0); // Apply orientation

      if (horizontal) {
        this.setOrientation("horizontal");
      } else {
        this.initOrientation();
      } // Add keypress listener


      this.addListener("keypress", this._onKeyPress);
      this.addListener("keyinput", this._onKeyInput); // initialize the search string

      this.__pressedString__P_223_1 = "";
    },

    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */
    events: {
      /**
       * This event is fired after a list item was added to the list. The
       * {@link qx.event.type.Data#getData} method of the event returns the
       * added item.
       */
      addItem: "qx.event.type.Data",

      /**
       * This event is fired after a list item has been removed from the list.
       * The {@link qx.event.type.Data#getData} method of the event returns the
       * removed item.
       */
      removeItem: "qx.event.type.Data"
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      // overridden
      appearance: {
        refine: true,
        init: "list"
      },
      // overridden
      focusable: {
        refine: true,
        init: true
      },
      // overridden
      width: {
        refine: true,
        init: 100
      },
      // overridden
      height: {
        refine: true,
        init: 200
      },

      /**
       * Whether the list should be rendered horizontal or vertical.
       */
      orientation: {
        check: ["horizontal", "vertical"],
        init: "vertical",
        apply: "_applyOrientation"
      },

      /** Spacing between the items */
      spacing: {
        check: "Integer",
        init: 0,
        apply: "_applySpacing",
        themeable: true
      },

      /** Controls whether the inline-find feature is activated or not */
      enableInlineFind: {
        check: "Boolean",
        init: true
      },

      /** Whether the list is read only when enabled */
      readOnly: {
        check: "Boolean",
        init: false,
        event: "changeReadOnly",
        apply: "_applyReadOnly"
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __pressedString__P_223_1: null,
      __lastKeyPress__P_223_2: null,

      /** @type {qx.ui.core.Widget} The children container */
      __content__P_223_0: null,

      /** @type {Class} Pointer to the selection manager to use */
      SELECTION_MANAGER: qx.ui.core.selection.ScrollArea,

      /*
      ---------------------------------------------------------------------------
        WIDGET API
      ---------------------------------------------------------------------------
      */
      // overridden
      getChildrenContainer: function getChildrenContainer() {
        return this.__content__P_223_0;
      },

      /**
       * Handle child widget adds on the content pane
       *
       * @param e {qx.event.type.Data} the event instance
       */
      _onAddChild: function _onAddChild(e) {
        this.fireDataEvent("addItem", e.getData());
      },

      /**
       * Handle child widget removes on the content pane
       *
       * @param e {qx.event.type.Data} the event instance
       */
      _onRemoveChild: function _onRemoveChild(e) {
        this.fireDataEvent("removeItem", e.getData());
      },

      /*
      ---------------------------------------------------------------------------
        PUBLIC API
      ---------------------------------------------------------------------------
      */

      /**
       * Used to route external <code>keypress</code> events to the list
       * handling (in fact the manager of the list)
       *
       * @param e {qx.event.type.KeySequence} KeyPress event
       */
      handleKeyPress: function handleKeyPress(e) {
        if (!this._onKeyPress(e)) {
          this._getManager().handleKeyPress(e);
        }
      },

      /*
      ---------------------------------------------------------------------------
        PROTECTED API
      ---------------------------------------------------------------------------
      */

      /**
       * This container holds the list item widgets.
       *
       * @return {qx.ui.container.Composite} Container for the list item widgets
       */
      _createListItemContainer: function _createListItemContainer() {
        return new qx.ui.container.Composite();
      },

      /*
      ---------------------------------------------------------------------------
        PROPERTY APPLY ROUTINES
      ---------------------------------------------------------------------------
      */
      // property apply
      _applyOrientation: function _applyOrientation(value, old) {
        // ARIA attrs
        this.getContentElement().setAttribute("aria-orientation", value);
        var content = this.__content__P_223_0; // save old layout for disposal

        var oldLayout = content.getLayout(); // Create new layout

        var horizontal = value === "horizontal";
        var layout = horizontal ? new qx.ui.layout.HBox() : new qx.ui.layout.VBox(); // Configure content

        content.setLayout(layout);
        content.setAllowGrowX(!horizontal);
        content.setAllowGrowY(horizontal); // Configure spacing

        this._applySpacing(this.getSpacing()); // dispose old layout


        if (oldLayout) {
          oldLayout.dispose();
        }
      },
      // property apply
      _applySpacing: function _applySpacing(value, old) {
        this.__content__P_223_0.getLayout().setSpacing(value);
      },
      // property readOnly
      _applyReadOnly: function _applyReadOnly(value) {
        this._getManager().setReadOnly(value);

        if (value) {
          this.addState("readonly");
          this.addState("disabled"); // Remove draggable

          if (this.isDraggable()) {
            this._applyDraggable(false, true);
          } // Remove droppable


          if (this.isDroppable()) {
            this._applyDroppable(false, true);
          }
        } else {
          this.removeState("readonly");

          if (this.isEnabled()) {
            this.removeState("disabled"); // Re-add draggable

            if (this.isDraggable()) {
              this._applyDraggable(true, false);
            } // Re-add droppable


            if (this.isDroppable()) {
              this._applyDroppable(true, false);
            }
          }
        }
      },
      // override
      _applyEnabled: function _applyEnabled(value, old) {
        qx.ui.form.List.superclass.prototype._applyEnabled.call(this, value, old); // If editable has just been turned on, we need to correct for readOnly status


        if (value && this.isReadOnly()) {
          this.addState("disabled"); // Remove draggable

          if (this.isDraggable()) {
            this._applyDraggable(false, true);
          } // Remove droppable


          if (this.isDroppable()) {
            this._applyDroppable(false, true);
          }
        }
      },

      /*
      ---------------------------------------------------------------------------
        EVENT HANDLER
      ---------------------------------------------------------------------------
      */

      /**
       * Event listener for <code>keypress</code> events.
       *
       * @param e {qx.event.type.KeySequence} KeyPress event
       * @return {Boolean} Whether the event was processed
       */
      _onKeyPress: function _onKeyPress(e) {
        // Execute action on press <ENTER>
        if (e.getKeyIdentifier() == "Enter" && !e.isAltPressed()) {
          var items = this.getSelection();

          for (var i = 0; i < items.length; i++) {
            items[i].fireEvent("action");
          }

          return true;
        }

        return false;
      },

      /*
      ---------------------------------------------------------------------------
        FIND SUPPORT
      ---------------------------------------------------------------------------
      */

      /**
       * Handles the inline find - if enabled
       *
       * @param e {qx.event.type.KeyInput} key input event
       */
      _onKeyInput: function _onKeyInput(e) {
        // do nothing if the find is disabled
        if (!this.getEnableInlineFind()) {
          return;
        } // Only useful in single or one selection mode


        var mode = this.getSelectionMode();

        if (!(mode === "single" || mode === "one")) {
          return;
        } // Reset string after a second of non pressed key


        if (new Date().valueOf() - this.__lastKeyPress__P_223_2 > 1000) {
          this.__pressedString__P_223_1 = "";
        } // Combine keys the user pressed to a string


        this.__pressedString__P_223_1 += e.getChar(); // Find matching item

        var matchedItem = this.findItemByLabelFuzzy(this.__pressedString__P_223_1); // if an item was found, select it

        if (matchedItem) {
          this.setSelection([matchedItem]);
        } // Store timestamp


        this.__lastKeyPress__P_223_2 = new Date().valueOf();
      },

      /**
       * Takes the given string and tries to find a ListItem
       * which starts with this string. The search is not case sensitive and the
       * first found ListItem will be returned. If there could not be found any
       * qualifying list item, null will be returned.
       *
       * @param search {String} The text with which the label of the ListItem should start with
       * @return {qx.ui.form.ListItem} The found ListItem or null
       */
      findItemByLabelFuzzy: function findItemByLabelFuzzy(search) {
        // lower case search text
        search = search.toLowerCase(); // get all items of the list

        var items = this.getChildren(); // go threw all items

        for (var i = 0, l = items.length; i < l; i++) {
          // get the label of the current item
          var currentLabel = items[i].getLabel(); // if the label fits with the search text (ignore case, begins with)

          if (currentLabel && currentLabel.toLowerCase().indexOf(search) == 0) {
            // just return the first found element
            return items[i];
          }
        } // if no element was found, return null


        return null;
      },

      /**
       * Find an item by its {@link qx.ui.basic.Atom#getLabel}.
       *
       * @param search {String} A label or any item
       * @param ignoreCase {Boolean?true} description
       * @return {qx.ui.form.ListItem} The found ListItem or null
       */
      findItem: function findItem(search, ignoreCase) {
        // lowercase search
        if (ignoreCase !== false) {
          search = search.toLowerCase();
        } // get all items of the list


        var items = this.getChildren();
        var item; // go through all items

        for (var i = 0, l = items.length; i < l; i++) {
          item = items[i]; // get the content of the label; text content when rich

          var label;

          if (item.isRich()) {
            var control = item.getChildControl("label", true);

            if (control) {
              var labelNode = control.getContentElement().getDomElement();

              if (labelNode) {
                label = qx.bom.element.Attribute.get(labelNode, "text");
              }
            }
          } else {
            label = item.getLabel();
          }

          if (label != null) {
            if (label.translate) {
              label = label.translate();
            }

            if (ignoreCase !== false) {
              label = label.toLowerCase();
            }

            if (label.toString() == search.toString()) {
              return item;
            }
          }
        }

        return null;
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this._disposeObjects("__content__P_223_0");
    }
  });
  qx.ui.form.List.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.core.Assert": {
        "construct": true
      },
      "qx.ui.core.ISingleSelectionProvider": {
        "construct": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Christian Hagendorn (chris_schmidt)
  
  ************************************************************************ */

  /**
   * Responsible for the single selection management.
   *
   * The class manage a list of {@link qx.ui.core.Widget} which are returned from
   * {@link qx.ui.core.ISingleSelectionProvider#getItems}.
   *
   * @internal
   */
  qx.Class.define("qx.ui.core.SingleSelectionManager", {
    extend: qx.core.Object,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * Construct the single selection manager.
     *
     * @param selectionProvider {qx.ui.core.ISingleSelectionProvider} The provider
     * for selection.
     */
    construct: function construct(selectionProvider) {
      qx.core.Object.constructor.call(this);
      {
        qx.core.Assert.assertInterface(selectionProvider, qx.ui.core.ISingleSelectionProvider, "Invalid selectionProvider!");
      }
      this.__selectionProvider__P_190_0 = selectionProvider;
    },

    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */
    events: {
      /** Fires after the selection was modified */
      changeSelected: "qx.event.type.Data"
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /**
       * If the value is <code>true</code> the manager allows an empty selection,
       * otherwise the first selectable element returned from the
       * <code>qx.ui.core.ISingleSelectionProvider</code> will be selected.
       */
      allowEmptySelection: {
        check: "Boolean",
        init: true,
        apply: "__applyAllowEmptySelection__P_190_1"
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      /** @type {qx.ui.core.Widget} The selected widget. */
      __selected__P_190_2: null,

      /** @type {qx.ui.core.ISingleSelectionProvider} The provider for selection management */
      __selectionProvider__P_190_0: null,

      /*
      ---------------------------------------------------------------------------
         PUBLIC API
      ---------------------------------------------------------------------------
      */

      /**
       * Returns the current selected element.
       *
       * @return {qx.ui.core.Widget | null} The current selected widget or
       *    <code>null</code> if the selection is empty.
       */
      getSelected: function getSelected() {
        return this.__selected__P_190_2;
      },

      /**
       * Selects the passed element.
       *
       * @param item {qx.ui.core.Widget} Element to select.
       * @throws {Error} if the element is not a child element.
       */
      setSelected: function setSelected(item) {
        if (!this.__isChildElement__P_190_3(item)) {
          throw new Error("Could not select " + item + ", because it is not a child element!");
        }

        this.__setSelected__P_190_4(item);
      },

      /**
       * Reset the current selection. If {@link #allowEmptySelection} is set to
       * <code>true</code> the first element will be selected.
       */
      resetSelected: function resetSelected() {
        this.__setSelected__P_190_4(null);
      },

      /**
       * Return <code>true</code> if the passed element is selected.
       *
       * @param item {qx.ui.core.Widget} Element to check if selected.
       * @return {Boolean} <code>true</code> if passed element is selected,
       *    <code>false</code> otherwise.
       * @throws {Error} if the element is not a child element.
       */
      isSelected: function isSelected(item) {
        if (!this.__isChildElement__P_190_3(item)) {
          throw new Error("Could not check if " + item + " is selected," + " because it is not a child element!");
        }

        return this.__selected__P_190_2 === item;
      },

      /**
       * Returns <code>true</code> if selection is empty.
       *
       * @return {Boolean} <code>true</code> if selection is empty,
       *    <code>false</code> otherwise.
       */
      isSelectionEmpty: function isSelectionEmpty() {
        return this.__selected__P_190_2 == null;
      },

      /**
       * Returns all elements which are selectable.
       *
       * @param all {Boolean} true for all selectables, false for the
       *   selectables the user can interactively select
       * @return {qx.ui.core.Widget[]} The contained items.
       */
      getSelectables: function getSelectables(all) {
        var items = this.__selectionProvider__P_190_0.getItems();

        var result = [];

        for (var i = 0; i < items.length; i++) {
          if (this.__selectionProvider__P_190_0.isItemSelectable(items[i])) {
            result.push(items[i]);
          }
        } // in case of an user selectable list, remove the enabled items


        if (!all) {
          for (var i = result.length - 1; i >= 0; i--) {
            if (!result[i].getEnabled()) {
              result.splice(i, 1);
            }
          }
        }

        return result;
      },

      /*
      ---------------------------------------------------------------------------
         APPLY METHODS
      ---------------------------------------------------------------------------
      */
      // apply method
      __applyAllowEmptySelection__P_190_1: function __applyAllowEmptySelection__P_190_1(value, old) {
        if (!value) {
          this.__setSelected__P_190_4(this.__selected__P_190_2);
        }
      },

      /*
      ---------------------------------------------------------------------------
         HELPERS
      ---------------------------------------------------------------------------
      */

      /**
       * Set selected element.
       *
       * If passes value is <code>null</code>, the selection will be reseted.
       *
       * @param item {qx.ui.core.Widget | null} element to select, or
       *    <code>null</code> to reset selection.
       */
      __setSelected__P_190_4: function __setSelected__P_190_4(item) {
        var oldSelected = this.__selected__P_190_2;
        var newSelected = item;

        if (newSelected != null && oldSelected === newSelected) {
          return;
        }

        if (!this.isAllowEmptySelection() && newSelected == null) {
          var firstElement = this.getSelectables(true)[0];

          if (firstElement) {
            newSelected = firstElement;
          }
        }

        this.__selected__P_190_2 = newSelected;
        this.fireDataEvent("changeSelected", newSelected, oldSelected);
      },

      /**
       * Checks if passed element is a child element.
       *
       * @param item {qx.ui.core.Widget} Element to check if child element.
       * @return {Boolean} <code>true</code> if element is child element,
       *    <code>false</code> otherwise.
       */
      __isChildElement__P_190_3: function __isChildElement__P_190_3(item) {
        var items = this.__selectionProvider__P_190_0.getItems();

        for (var i = 0; i < items.length; i++) {
          if (items[i] === item) {
            return true;
          }
        }

        return false;
      }
    },

    /*
     *****************************************************************************
        DESTRUCTOR
     *****************************************************************************
     */
    destruct: function destruct() {
      if (this.__selectionProvider__P_190_0.toHashCode) {
        this._disposeObjects("__selectionProvider__P_190_0");
      } else {
        this.__selectionProvider__P_190_0 = null;
      }

      this._disposeObjects("__selected__P_190_2");
    }
  });
  qx.ui.core.SingleSelectionManager.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.LayoutItem": {
        "construct": true,
        "require": true
      },
      "qx.ui.core.queue.Dispose": {}
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
   * A Spacer is a "virtual" widget, which can be placed into any layout and takes
   * the space a normal widget of the same size would take.
   *
   * Spacers are invisible and very light weight because they don't require any
   * DOM modifications.
   *
   * *Example*
   *
   * Here is a little example of how to use the widget.
   *
   * <pre class='javascript'>
   *   var container = new qx.ui.container.Composite(new qx.ui.layout.HBox());
   *   container.add(new qx.ui.core.Widget());
   *   container.add(new qx.ui.core.Spacer(50));
   *   container.add(new qx.ui.core.Widget());
   * </pre>
   *
   * This example places two widgets and a spacer into a container with a
   * horizontal box layout. In this scenario the spacer creates an empty area of
   * 50 pixel width between the two widgets.
   *
   * *External Documentation*
   *
   * <a href='http://qooxdoo.org/docs/#desktop/widget/spacer.md' target='_blank'>
   * Documentation of this widget in the qooxdoo manual.</a>
   */
  qx.Class.define("qx.ui.core.Spacer", {
    extend: qx.ui.core.LayoutItem,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param width {Integer?null} the initial width
     * @param height {Integer?null} the initial height
     */
    construct: function construct(width, height) {
      qx.ui.core.LayoutItem.constructor.call(this); // Initialize dimensions

      this.setWidth(width != null ? width : 0);
      this.setHeight(height != null ? height : 0);
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      /**
       * Helper method called from the visibility queue to detect outstanding changes
       * to the appearance.
       *
       * @internal
       */
      checkAppearanceNeeds: function checkAppearanceNeeds() {// placeholder to improve compatibility with Widget.
      },

      /**
       * Recursively adds all children to the given queue
       *
       * @param queue {Map} The queue to add widgets to
       */
      addChildrenToQueue: function addChildrenToQueue(queue) {// placeholder to improve compatibility with Widget.
      },

      /**
       * Removes this widget from its parent and dispose it.
       *
       * Please note that the widget is not disposed synchronously. The
       * real dispose happens after the next queue flush.
       *
       */
      destroy: function destroy() {
        if (this.$$disposed) {
          return;
        }

        var parent = this.$$parent;

        if (parent) {
          parent._remove(this);
        }

        qx.ui.core.queue.Dispose.add(this);
      }
    }
  });
  qx.ui.core.Spacer.$$dbClassInfo = $$dbClassInfo;
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
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * All widget used as scrollbars must implement this interface.
   */
  qx.Interface.define("qx.ui.core.scroll.IScrollBar", {
    events: {
      /** Fired if the user scroll */
      scroll: "qx.event.type.Data",

      /** Fired as soon as the scroll animation ended. */
      scrollAnimationEnd: "qx.event.type.Event"
    },
    properties: {
      /**
       * The scroll bar orientation
       */
      orientation: {},

      /**
       * The maximum value (difference between available size and
       * content size).
       */
      maximum: {},

      /**
       * Position of the scrollbar (which means the scroll left/top of the
       * attached area's pane)
       *
       * Strictly validates according to {@link #maximum}.
       * Does not apply any correction to the incoming value. If you depend
       * on this, please use {@link #scrollTo} instead.
       */
      position: {},

      /**
       * Factor to apply to the width/height of the knob in relation
       * to the dimension of the underlying area.
       */
      knobFactor: {}
    },
    members: {
      /**
       * Scrolls to the given position.
       *
       * This method automatically corrects the given position to respect
       * the {@link #maximum}.
       *
       * @param position {Integer} Scroll to this position. Must be greater zero.
       * @param duration {Number} The time in milliseconds the slide to should take.
       */
      scrollTo: function scrollTo(position, duration) {
        this.assertNumber(position);
      },

      /**
       * Scrolls by the given offset.
       *
       * This method automatically corrects the given position to respect
       * the {@link #maximum}.
       *
       * @param offset {Integer} Scroll by this offset
       * @param duration {Number} The time in milliseconds the slide to should take.
       */
      scrollBy: function scrollBy(offset, duration) {
        this.assertNumber(offset);
      },

      /**
       * Scrolls by the given number of steps.
       *
       * This method automatically corrects the given position to respect
       * the {@link #maximum}.
       *
       * @param steps {Integer} Number of steps
       * @param duration {Number} The time in milliseconds the slide to should take.
       */
      scrollBySteps: function scrollBySteps(steps, duration) {
        this.assertNumber(steps);
      }
    }
  });
  qx.ui.core.scroll.IScrollBar.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.Widget": {
        "construct": true,
        "require": true
      },
      "qx.ui.core.scroll.IScrollBar": {
        "require": true
      },
      "qx.ui.core.scroll.ScrollSlider": {},
      "qx.ui.form.RepeatButton": {},
      "qx.ui.layout.HBox": {},
      "qx.ui.layout.VBox": {}
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
   * The scroll bar widget, is a special slider, which is used in qooxdoo instead
   * of the native browser scroll bars.
   *
   * Scroll bars are used by the {@link qx.ui.container.Scroll} container. Usually
   * a scroll bar is not used directly.
   *
   * @childControl slider {qx.ui.core.scroll.ScrollSlider} scroll slider component
   * @childControl button-begin {qx.ui.form.RepeatButton} button to scroll to top
   * @childControl button-end {qx.ui.form.RepeatButton} button to scroll to bottom
   *
   * *Example*
   *
   * Here is a little example of how to use the widget.
   *
   * <pre class='javascript'>
   *   var scrollBar = new qx.ui.core.scroll.ScrollBar("horizontal");
   *   scrollBar.set({
   *     maximum: 500
   *   })
   *   this.getRoot().add(scrollBar);
   * </pre>
   *
   * This example creates a horizontal scroll bar with a maximum value of 500.
   *
   * *External Documentation*
   *
   * <a href='http://qooxdoo.org/docs/#desktop/widget/scrollbar.md' target='_blank'>
   * Documentation of this widget in the qooxdoo manual.</a>
   */
  qx.Class.define("qx.ui.core.scroll.ScrollBar", {
    extend: qx.ui.core.Widget,
    implement: qx.ui.core.scroll.IScrollBar,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param orientation {String?"horizontal"} The initial scroll bar orientation
     */
    construct: function construct(orientation) {
      qx.ui.core.Widget.constructor.call(this); // Create child controls

      this._createChildControl("button-begin");

      this._createChildControl("slider").addListener("resize", this._onResizeSlider, this);

      this._createChildControl("button-end"); // Configure orientation


      if (orientation != null) {
        this.setOrientation(orientation);
      } else {
        this.initOrientation();
      } // prevent drag & drop on scrolling


      this.addListener("track", function (e) {
        e.stopPropagation();
      }, this);
    },
    events: {
      /** Change event for the value. */
      scrollAnimationEnd: "qx.event.type.Event"
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      // overridden
      appearance: {
        refine: true,
        init: "scrollbar"
      },

      /**
       * The scroll bar orientation
       */
      orientation: {
        check: ["horizontal", "vertical"],
        init: "horizontal",
        apply: "_applyOrientation"
      },

      /**
       * The maximum value (difference between available size and
       * content size).
       */
      maximum: {
        check: "PositiveInteger",
        apply: "_applyMaximum",
        init: 100
      },

      /**
       * Position of the scrollbar (which means the scroll left/top of the
       * attached area's pane)
       *
       * Strictly validates according to {@link #maximum}.
       * Does not apply any correction to the incoming value. If you depend
       * on this, please use {@link #scrollTo} instead.
       */
      position: {
        check: "qx.lang.Type.isNumber(value)&&value>=0&&value<=this.getMaximum()",
        init: 0,
        apply: "_applyPosition",
        event: "scroll"
      },

      /**
       * Step size for each tap on the up/down or left/right buttons.
       */
      singleStep: {
        check: "Integer",
        init: 20
      },

      /**
       * The amount to increment on each event. Typically corresponds
       * to the user pressing <code>PageUp</code> or <code>PageDown</code>.
       */
      pageStep: {
        check: "Integer",
        init: 10,
        apply: "_applyPageStep"
      },

      /**
       * Factor to apply to the width/height of the knob in relation
       * to the dimension of the underlying area.
       */
      knobFactor: {
        check: "PositiveNumber",
        apply: "_applyKnobFactor",
        nullable: true
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __offset__P_176_0: 2,
      __originalMinSize__P_176_1: 0,
      // overridden
      _computeSizeHint: function _computeSizeHint() {
        var hint = qx.ui.core.scroll.ScrollBar.superclass.prototype._computeSizeHint.call(this);

        if (this.getOrientation() === "horizontal") {
          this.__originalMinSize__P_176_1 = hint.minWidth;
          hint.minWidth = 0;
        } else {
          this.__originalMinSize__P_176_1 = hint.minHeight;
          hint.minHeight = 0;
        }

        return hint;
      },
      // overridden
      renderLayout: function renderLayout(left, top, width, height) {
        var changes = qx.ui.core.scroll.ScrollBar.superclass.prototype.renderLayout.call(this, left, top, width, height);
        var horizontal = this.getOrientation() === "horizontal";

        if (this.__originalMinSize__P_176_1 >= (horizontal ? width : height)) {
          this.getChildControl("button-begin").setVisibility("hidden");
          this.getChildControl("button-end").setVisibility("hidden");
        } else {
          this.getChildControl("button-begin").setVisibility("visible");
          this.getChildControl("button-end").setVisibility("visible");
        }

        return changes;
      },
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id, hash) {
        var control;

        switch (id) {
          case "slider":
            control = new qx.ui.core.scroll.ScrollSlider();
            control.setPageStep(100);
            control.setFocusable(false);
            control.addListener("changeValue", this._onChangeSliderValue, this);
            control.addListener("slideAnimationEnd", this._onSlideAnimationEnd, this);

            this._add(control, {
              flex: 1
            });

            break;

          case "button-begin":
            // Top/Left Button
            control = new qx.ui.form.RepeatButton();
            control.setFocusable(false);
            control.addListener("execute", this._onExecuteBegin, this);

            this._add(control);

            break;

          case "button-end":
            // Bottom/Right Button
            control = new qx.ui.form.RepeatButton();
            control.setFocusable(false);
            control.addListener("execute", this._onExecuteEnd, this);

            this._add(control);

            break;
        }

        return control || qx.ui.core.scroll.ScrollBar.superclass.prototype._createChildControlImpl.call(this, id);
      },

      /*
      ---------------------------------------------------------------------------
        PROPERTY APPLY ROUTINES
      ---------------------------------------------------------------------------
      */
      // property apply
      _applyMaximum: function _applyMaximum(value) {
        this.getChildControl("slider").setMaximum(value);
      },
      // property apply
      _applyPosition: function _applyPosition(value) {
        this.getChildControl("slider").setValue(value);
      },
      // property apply
      _applyKnobFactor: function _applyKnobFactor(value) {
        this.getChildControl("slider").setKnobFactor(value);
      },
      // property apply
      _applyPageStep: function _applyPageStep(value) {
        this.getChildControl("slider").setPageStep(value);
      },
      // property apply
      _applyOrientation: function _applyOrientation(value, old) {
        // ARIA attrs
        this.getContentElement().setAttribute("aria-orientation", value); // Dispose old layout

        var oldLayout = this._getLayout();

        if (oldLayout) {
          oldLayout.dispose();
        } // Reconfigure


        if (value === "horizontal") {
          this._setLayout(new qx.ui.layout.HBox());

          this.setAllowStretchX(true);
          this.setAllowStretchY(false);
          this.replaceState("vertical", "horizontal");
          this.getChildControl("button-begin").replaceState("up", "left");
          this.getChildControl("button-end").replaceState("down", "right");
        } else {
          this._setLayout(new qx.ui.layout.VBox());

          this.setAllowStretchX(false);
          this.setAllowStretchY(true);
          this.replaceState("horizontal", "vertical");
          this.getChildControl("button-begin").replaceState("left", "up");
          this.getChildControl("button-end").replaceState("right", "down");
        } // Sync slider orientation


        this.getChildControl("slider").setOrientation(value);
      },

      /*
      ---------------------------------------------------------------------------
        METHOD REDIRECTION TO SLIDER
      ---------------------------------------------------------------------------
      */

      /**
       * Scrolls to the given position.
       *
       * This method automatically corrects the given position to respect
       * the {@link #maximum}.
       *
       * @param position {Integer} Scroll to this position. Must be greater zero.
       * @param duration {Number} The time in milliseconds the slide to should take.
       */
      scrollTo: function scrollTo(position, duration) {
        this.getChildControl("slider").slideTo(position, duration);
      },

      /**
       * Scrolls by the given offset.
       *
       * This method automatically corrects the given position to respect
       * the {@link #maximum}.
       *
       * @param offset {Integer} Scroll by this offset
       * @param duration {Number} The time in milliseconds the slide to should take.
       */
      scrollBy: function scrollBy(offset, duration) {
        this.getChildControl("slider").slideBy(offset, duration);
      },

      /**
       * Scrolls by the given number of steps.
       *
       * This method automatically corrects the given position to respect
       * the {@link #maximum}.
       *
       * @param steps {Integer} Number of steps
       * @param duration {Number} The time in milliseconds the slide to should take.
       */
      scrollBySteps: function scrollBySteps(steps, duration) {
        var size = this.getSingleStep();
        this.getChildControl("slider").slideBy(steps * size, duration);
      },

      /**
       * Updates the position property considering the minimum and maximum values.
       * @param position {Number} The new position.
       */
      updatePosition: function updatePosition(position) {
        this.getChildControl("slider").updatePosition(position);
      },

      /**
       * If a scroll animation is running, it will be stopped.
       */
      stopScrollAnimation: function stopScrollAnimation() {
        this.getChildControl("slider").stopSlideAnimation();
      },

      /*
      ---------------------------------------------------------------------------
        EVENT LISTENER
      ---------------------------------------------------------------------------
      */

      /**
       * Executed when the up/left button is executed (pressed)
       *
       * @param e {qx.event.type.Event} Execute event of the button
       */
      _onExecuteBegin: function _onExecuteBegin(e) {
        this.scrollBy(-this.getSingleStep(), 50);
      },

      /**
       * Executed when the down/right button is executed (pressed)
       *
       * @param e {qx.event.type.Event} Execute event of the button
       */
      _onExecuteEnd: function _onExecuteEnd(e) {
        this.scrollBy(this.getSingleStep(), 50);
      },

      /**
       * Change listener for slider animation end.
       */
      _onSlideAnimationEnd: function _onSlideAnimationEnd() {
        this.fireEvent("scrollAnimationEnd");
      },

      /**
       * Change listener for slider value changes.
       *
       * @param e {qx.event.type.Data} The change event object
       */
      _onChangeSliderValue: function _onChangeSliderValue(e) {
        this.setPosition(e.getData());
      },

      /**
       * Hide the knob of the slider if the slidebar is too small or show it
       * otherwise.
       *
       * @param e {qx.event.type.Data} event object
       */
      _onResizeSlider: function _onResizeSlider(e) {
        var knob = this.getChildControl("slider").getChildControl("knob");
        var knobHint = knob.getSizeHint();
        var hideKnob = false;
        var sliderSize = this.getChildControl("slider").getInnerSize();

        if (this.getOrientation() == "vertical") {
          if (sliderSize.height < knobHint.minHeight + this.__offset__P_176_0) {
            hideKnob = true;
          }
        } else {
          if (sliderSize.width < knobHint.minWidth + this.__offset__P_176_0) {
            hideKnob = true;
          }
        }

        if (hideKnob) {
          knob.exclude();
        } else {
          knob.show();
        }
      }
    }
  });
  qx.ui.core.scroll.ScrollBar.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.Widget": {
        "construct": true,
        "require": true
      },
      "qx.ui.layout.Grow": {
        "construct": true
      },
      "qx.bom.AnimationFrame": {}
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
   * This class represents a scroll able pane. This means that this widget
   * may contain content which is bigger than the available (inner)
   * dimensions of this widget. The widget also offer methods to control
   * the scrolling position. It can only have exactly one child.
   */
  qx.Class.define("qx.ui.core.scroll.ScrollPane", {
    extend: qx.ui.core.Widget,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qx.ui.core.Widget.constructor.call(this);
      this.set({
        minWidth: 0,
        minHeight: 0
      }); // Automatically configure a "fixed" grow layout.

      this._setLayout(new qx.ui.layout.Grow()); // Add resize listener to "translate" event


      this.addListener("resize", this._onUpdate);
      var contentEl = this.getContentElement(); // Synchronizes the DOM scroll position with the properties

      contentEl.addListener("scroll", this._onScroll, this); // Fixed some browser quirks e.g. correcting scroll position
      // to the previous value on re-display of a pane

      contentEl.addListener("appear", this._onAppear, this);
    },

    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */
    events: {
      /** Fired on resize of both the container or the content. */
      update: "qx.event.type.Event",

      /** Fired on scroll animation end invoked by 'scroll*' methods. */
      scrollAnimationEnd: "qx.event.type.Event"
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /** The horizontal scroll position */
      scrollX: {
        check: "qx.lang.Type.isNumber(value)&&value>=0&&value<=this.getScrollMaxX()",
        apply: "_applyScrollX",
        transform: "_transformScrollX",
        event: "scrollX",
        init: 0
      },

      /** The vertical scroll position */
      scrollY: {
        check: "qx.lang.Type.isNumber(value)&&value>=0&&value<=this.getScrollMaxY()",
        apply: "_applyScrollY",
        transform: "_transformScrollY",
        event: "scrollY",
        init: 0
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __frame__P_175_0: null,

      /*
      ---------------------------------------------------------------------------
        CONTENT MANAGEMENT
      ---------------------------------------------------------------------------
      */

      /**
       * Configures the content of the scroll pane. Replaces any existing child
       * with the newly given one.
       *
       * @param widget {qx.ui.core.Widget?null} The content widget of the pane
       */
      add: function add(widget) {
        var old = this._getChildren()[0];

        if (old) {
          this._remove(old);

          old.removeListener("resize", this._onUpdate, this);
        }

        if (widget) {
          this._add(widget);

          widget.addListener("resize", this._onUpdate, this);
        }
      },

      /**
       * Removes the given widget from the content. The pane is empty
       * afterwards as only one child is supported by the pane.
       *
       * @param widget {qx.ui.core.Widget?null} The content widget of the pane
       */
      remove: function remove(widget) {
        if (widget) {
          this._remove(widget);

          widget.removeListener("resize", this._onUpdate, this);
        }
      },

      /**
       * Returns an array containing the current content.
       *
       * @return {Object[]} The content array
       */
      getChildren: function getChildren() {
        return this._getChildren();
      },

      /*
      ---------------------------------------------------------------------------
        EVENT LISTENER
      ---------------------------------------------------------------------------
      */

      /**
       * Event listener for resize event of content and container
       *
       * @param e {Event} Resize event object
       */
      _onUpdate: function _onUpdate(e) {
        this.fireEvent("update");
      },

      /**
       * Event listener for scroll event of content
       *
       * @param e {qx.event.type.Event} Scroll event object
       */
      _onScroll: function _onScroll(e) {
        var contentEl = this.getContentElement();
        this.setScrollX(contentEl.getScrollX());
        this.setScrollY(contentEl.getScrollY());
      },

      /**
       * Event listener for appear event of content
       *
       * @param e {qx.event.type.Event} Appear event object
       */
      _onAppear: function _onAppear(e) {
        var contentEl = this.getContentElement();
        var internalX = this.getScrollX();
        var domX = contentEl.getScrollX();

        if (internalX != domX) {
          contentEl.scrollToX(internalX);
        }

        var internalY = this.getScrollY();
        var domY = contentEl.getScrollY();

        if (internalY != domY) {
          contentEl.scrollToY(internalY);
        }
      },

      /*
      ---------------------------------------------------------------------------
        ITEM LOCATION SUPPORT
      ---------------------------------------------------------------------------
      */

      /**
       * Returns the top offset of the given item in relation to the
       * inner height of this widget.
       *
       * @param item {qx.ui.core.Widget} Item to query
       * @return {Integer} Top offset
       */
      getItemTop: function getItemTop(item) {
        var top = 0;

        do {
          top += item.getBounds().top;
          item = item.getLayoutParent();
        } while (item && item !== this);

        return top;
      },

      /**
       * Returns the top offset of the end of the given item in relation to the
       * inner height of this widget.
       *
       * @param item {qx.ui.core.Widget} Item to query
       * @return {Integer} Top offset
       */
      getItemBottom: function getItemBottom(item) {
        return this.getItemTop(item) + item.getBounds().height;
      },

      /**
       * Returns the left offset of the given item in relation to the
       * inner width of this widget.
       *
       * @param item {qx.ui.core.Widget} Item to query
       * @return {Integer} Top offset
       */
      getItemLeft: function getItemLeft(item) {
        var left = 0;
        var parent;

        do {
          left += item.getBounds().left;
          parent = item.getLayoutParent();

          if (parent) {
            left += parent.getInsets().left;
          }

          item = parent;
        } while (item && item !== this);

        return left;
      },

      /**
       * Returns the left offset of the end of the given item in relation to the
       * inner width of this widget.
       *
       * @param item {qx.ui.core.Widget} Item to query
       * @return {Integer} Right offset
       */
      getItemRight: function getItemRight(item) {
        return this.getItemLeft(item) + item.getBounds().width;
      },

      /*
      ---------------------------------------------------------------------------
        DIMENSIONS
      ---------------------------------------------------------------------------
      */

      /**
       * The size (identical with the preferred size) of the content.
       *
       * @return {Map} Size of the content (keys: <code>width</code> and <code>height</code>)
       */
      getScrollSize: function getScrollSize() {
        return this.getChildren()[0].getBounds();
      },

      /*
      ---------------------------------------------------------------------------
        SCROLL SUPPORT
      ---------------------------------------------------------------------------
      */

      /**
       * The maximum horizontal scroll position.
       *
       * @return {Integer} Maximum horizontal scroll position.
       */
      getScrollMaxX: function getScrollMaxX() {
        var paneSize = this.getInnerSize();
        var scrollSize = this.getScrollSize();

        if (paneSize && scrollSize) {
          return Math.max(0, scrollSize.width - paneSize.width);
        }

        return 0;
      },

      /**
       * The maximum vertical scroll position.
       *
       * @return {Integer} Maximum vertical scroll position.
       */
      getScrollMaxY: function getScrollMaxY() {
        var paneSize = this.getInnerSize();
        var scrollSize = this.getScrollSize();

        if (paneSize && scrollSize) {
          return Math.max(0, scrollSize.height - paneSize.height);
        }

        return 0;
      },

      /**
       * Scrolls the element's content to the given left coordinate
       *
       * @param value {Integer} The vertical position to scroll to.
       * @param duration {Number?} The time in milliseconds the scroll to should take.
       */
      scrollToX: function scrollToX(value, duration) {
        var max = this.getScrollMaxX();

        if (value < 0) {
          value = 0;
        } else if (value > max) {
          value = max;
        }

        this.stopScrollAnimation();

        if (duration) {
          var from = this.getScrollX();
          this.__frame__P_175_0 = new qx.bom.AnimationFrame();

          this.__frame__P_175_0.on("end", function () {
            this.setScrollX(value);
            this.__frame__P_175_0 = null;
            this.fireEvent("scrollAnimationEnd");
          }, this);

          this.__frame__P_175_0.on("frame", function (timePassed) {
            var newX = parseInt(timePassed / duration * (value - from) + from);
            this.setScrollX(newX);
          }, this);

          this.__frame__P_175_0.startSequence(duration);
        } else {
          this.setScrollX(value);
        }
      },

      /**
       * Scrolls the element's content to the given top coordinate
       *
       * @param value {Integer} The horizontal position to scroll to.
       * @param duration {Number?} The time in milliseconds the scroll to should take.
       */
      scrollToY: function scrollToY(value, duration) {
        var max = this.getScrollMaxY();

        if (value < 0) {
          value = 0;
        } else if (value > max) {
          value = max;
        }

        this.stopScrollAnimation();

        if (duration) {
          var from = this.getScrollY();
          this.__frame__P_175_0 = new qx.bom.AnimationFrame();

          this.__frame__P_175_0.on("end", function () {
            this.setScrollY(value);
            this.__frame__P_175_0 = null;
            this.fireEvent("scrollAnimationEnd");
          }, this);

          this.__frame__P_175_0.on("frame", function (timePassed) {
            var newY = parseInt(timePassed / duration * (value - from) + from);
            this.setScrollY(newY);
          }, this);

          this.__frame__P_175_0.startSequence(duration);
        } else {
          this.setScrollY(value);
        }
      },

      /**
       * Scrolls the element's content horizontally by the given amount.
       *
       * @param x {Integer?0} Amount to scroll
       * @param duration {Number?} The time in milliseconds the scroll to should take.
       */
      scrollByX: function scrollByX(x, duration) {
        this.scrollToX(this.getScrollX() + x, duration);
      },

      /**
       * Scrolls the element's content vertically by the given amount.
       *
       * @param y {Integer?0} Amount to scroll
       * @param duration {Number?} The time in milliseconds the scroll to should take.
       */
      scrollByY: function scrollByY(y, duration) {
        this.scrollToY(this.getScrollY() + y, duration);
      },

      /**
       * If an scroll animation is running, it will be stopped with that method.
       */
      stopScrollAnimation: function stopScrollAnimation() {
        if (this.__frame__P_175_0) {
          this.__frame__P_175_0.cancelSequence();

          this.__frame__P_175_0 = null;
        }
      },

      /*
      ---------------------------------------------------------------------------
        PROPERTY APPLY ROUTINES
      ---------------------------------------------------------------------------
      */
      // property apply
      _applyScrollX: function _applyScrollX(value) {
        this.getContentElement().scrollToX(value);
      },

      /**
       * Transform property
       *
       * @param value {Number} Value to transform
       * @return {Number} Rounded value
       */
      _transformScrollX: function _transformScrollX(value) {
        return Math.round(value);
      },
      // property apply
      _applyScrollY: function _applyScrollY(value) {
        this.getContentElement().scrollToY(value);
      },

      /**
       * Transform property
       *
       * @param value {Number} Value to transform
       * @return {Number} Rounded value
       */
      _transformScrollY: function _transformScrollY(value) {
        return Math.round(value);
      }
    }
  });
  qx.ui.core.scroll.ScrollPane.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.event.Timer": {},
      "qx.bom.element.Dimension": {},
      "qx.lang.Object": {},
      "qx.bom.element.Style": {}
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
  
  ************************************************************************ */

  /**
   * Checks whether a given font is available on the document and fires events
   * accordingly.
   *
   * This class does not need to be disposed, unless you want to abort the validation
   * early
   */
  qx.Class.define("qx.bom.webfonts.Validator", {
    extend: qx.core.Object,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param fontFamily {String} The name of the font to be verified
     * @param comparisonString {String?} String to be used to detect whether a font was loaded or not
     * @param fontWeight {String?} the weight of the font to be verified
     * @param fontStyle {String?} the style of the font to be verified
     * whether the font has loaded properly
     */
    construct: function construct(fontFamily, comparisonString, fontWeight, fontStyle) {
      qx.core.Object.constructor.call(this);

      if (comparisonString) {
        this.setComparisonString(comparisonString);
      }

      if (fontWeight) {
        this.setFontWeight(fontWeight);
      }

      if (fontStyle) {
        this.setFontStyle(fontStyle);
      }

      if (fontFamily) {
        this.setFontFamily(fontFamily);
        this.__requestedHelpers__P_148_0 = this._getRequestedHelpers();
      }
    },

    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */
    statics: {
      /**
       * Sets of serif and sans-serif fonts to be used for size comparisons.
       * At least one of these fonts should be present on any system.
       */
      COMPARISON_FONTS: {
        sans: ["Arial", "Helvetica", "sans-serif"],
        serif: ["Times New Roman", "Georgia", "serif"]
      },

      /**
       * Map of common CSS attributes to be used for all  size comparison elements
       */
      HELPER_CSS: {
        position: "absolute",
        margin: "0",
        padding: "0",
        top: "-1000px",
        left: "-1000px",
        fontSize: "350px",
        width: "auto",
        height: "auto",
        lineHeight: "normal",
        fontVariant: "normal",
        visibility: "hidden"
      },

      /**
       * The string to be used in the size comparison elements. This is the default string
       * which is used for the {@link #COMPARISON_FONTS} and the font to be validated. It
       * can be overridden for the font to be validated using the {@link #comparisonString}
       * property.
       */
      COMPARISON_STRING: "WEei",
      __defaultSizes__P_148_1: null,
      __defaultHelpers__P_148_2: null,

      /**
       * Removes the two common helper elements used for all size comparisons from
       * the DOM
       */
      removeDefaultHelperElements: function removeDefaultHelperElements() {
        var defaultHelpers = qx.bom.webfonts.Validator.__defaultHelpers__P_148_2;

        if (defaultHelpers) {
          for (var prop in defaultHelpers) {
            document.body.removeChild(defaultHelpers[prop]);
          }
        }

        delete qx.bom.webfonts.Validator.__defaultHelpers__P_148_2;
      }
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /**
       * The font-family this validator should check
       */
      fontFamily: {
        nullable: true,
        init: null,
        apply: "_applyFontFamily"
      },

      /** The font weight to check */
      fontWeight: {
        nullable: true,
        check: "String",
        apply: "_applyFontWeight"
      },

      /** The font style to check */
      fontStyle: {
        nullable: true,
        check: "String",
        apply: "_applyFontStyle"
      },

      /**
       * Comparison string used to check whether the font has loaded or not.
       */
      comparisonString: {
        nullable: true,
        init: null
      },

      /**
       * Time in milliseconds from the beginning of the check until it is assumed
       * that a font is not available
       */
      timeout: {
        check: "Integer",
        init: 5000
      }
    },

    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */
    events: {
      /**
       * Fired when the status of a web font has been determined. The event data
       * is a map with the keys "family" (the font-family name) and "valid"
       * (Boolean).
       */
      changeStatus: "qx.event.type.Data"
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __requestedHelpers__P_148_0: null,
      __checkTimer__P_148_3: null,
      __checkStarted__P_148_4: null,

      /*
      ---------------------------------------------------------------------------
        PUBLIC API
      ---------------------------------------------------------------------------
      */

      /**
       * Validates the font
       */
      validate: function validate() {
        this.__checkStarted__P_148_4 = new Date().getTime();

        if (this.__checkTimer__P_148_3) {
          this.__checkTimer__P_148_3.restart();
        } else {
          this.__checkTimer__P_148_3 = new qx.event.Timer(100);

          this.__checkTimer__P_148_3.addListener("interval", this.__onTimerInterval__P_148_5, this); // Give the browser a chance to render the new elements


          qx.event.Timer.once(function () {
            this.__checkTimer__P_148_3.start();
          }, this, 0);
        }
      },

      /*
      ---------------------------------------------------------------------------
        PROTECTED API
      ---------------------------------------------------------------------------
      */

      /**
       * Removes the helper elements from the DOM
       */
      _reset: function _reset() {
        if (this.__requestedHelpers__P_148_0) {
          for (var prop in this.__requestedHelpers__P_148_0) {
            var elem = this.__requestedHelpers__P_148_0[prop];
            document.body.removeChild(elem);
          }

          this.__requestedHelpers__P_148_0 = null;
        }
      },

      /**
       * Checks if the font is available by comparing the widths of the elements
       * using the generic fonts to the widths of the elements using the font to
       * be validated
       *
       * @return {Boolean} Whether or not the font caused the elements to differ
       * in size
       */
      _isFontValid: function _isFontValid() {
        if (!qx.bom.webfonts.Validator.__defaultSizes__P_148_1) {
          this.__init__P_148_6();
        }

        if (!this.__requestedHelpers__P_148_0) {
          this.__requestedHelpers__P_148_0 = this._getRequestedHelpers();
        } // force rerendering for chrome


        this.__requestedHelpers__P_148_0.sans.style.visibility = "visible";
        this.__requestedHelpers__P_148_0.sans.style.visibility = "hidden";
        this.__requestedHelpers__P_148_0.serif.style.visibility = "visible";
        this.__requestedHelpers__P_148_0.serif.style.visibility = "hidden";
        var requestedSans = qx.bom.element.Dimension.getWidth(this.__requestedHelpers__P_148_0.sans);
        var requestedSerif = qx.bom.element.Dimension.getWidth(this.__requestedHelpers__P_148_0.serif);
        var cls = qx.bom.webfonts.Validator;

        if (requestedSans !== cls.__defaultSizes__P_148_1.sans || requestedSerif !== cls.__defaultSizes__P_148_1.serif) {
          return true;
        }

        return false;
      },

      /**
       * Creates the two helper elements styled with the font to be checked
       *
       * @return {Map} A map with the keys <pre>sans</pre> and <pre>serif</pre>
       * and the created span elements as values
       */
      _getRequestedHelpers: function _getRequestedHelpers() {
        var fontsSans = [this.getFontFamily()].concat(qx.bom.webfonts.Validator.COMPARISON_FONTS.sans);
        var fontsSerif = [this.getFontFamily()].concat(qx.bom.webfonts.Validator.COMPARISON_FONTS.serif);
        return {
          sans: this._getHelperElement(fontsSans, this.getComparisonString()),
          serif: this._getHelperElement(fontsSerif, this.getComparisonString())
        };
      },

      /**
       * Creates a span element with the comparison text (either {@link #COMPARISON_STRING} or
       * {@link #comparisonString}) and styled with the default CSS ({@link #HELPER_CSS}) plus
       * the given font-family value and appends it to the DOM
       *
       * @param fontFamily {String} font-family string
       * @param comparisonString {String?} String to be used to detect whether a font was loaded or not
       * @return {Element} the created DOM element
       */
      _getHelperElement: function _getHelperElement(fontFamily, comparisonString) {
        var styleMap = qx.lang.Object.clone(qx.bom.webfonts.Validator.HELPER_CSS);

        if (fontFamily) {
          if (styleMap.fontFamily) {
            styleMap.fontFamily += "," + fontFamily.join(",");
          } else {
            styleMap.fontFamily = fontFamily.join(",");
          }
        }

        if (this.getFontWeight()) {
          styleMap.fontWeight = this.getFontWeight();
        }

        if (this.getFontStyle()) {
          styleMap.fontStyle = this.getFontStyle();
        }

        var elem = document.createElement("span");
        elem.innerHTML = comparisonString || qx.bom.webfonts.Validator.COMPARISON_STRING;
        qx.bom.element.Style.setStyles(elem, styleMap);
        document.body.appendChild(elem);
        return elem;
      },
      // property apply
      _applyFontFamily: function _applyFontFamily(value, old) {
        if (value !== old) {
          this._reset();
        }
      },
      // property apply
      _applyFontWeight: function _applyFontWeight(value, old) {
        if (value !== old) {
          this._reset();
        }
      },
      // property apply
      _applyFontStyle: function _applyFontStyle(value, old) {
        if (value !== old) {
          this._reset();
        }
      },

      /*
      ---------------------------------------------------------------------------
        PRIVATE API
      ---------------------------------------------------------------------------
      */

      /**
       * Creates the default helper elements and gets their widths
       */
      __init__P_148_6: function __init__P_148_6() {
        var cls = qx.bom.webfonts.Validator;

        if (!cls.__defaultHelpers__P_148_2) {
          cls.__defaultHelpers__P_148_2 = {
            sans: this._getHelperElement(cls.COMPARISON_FONTS.sans),
            serif: this._getHelperElement(cls.COMPARISON_FONTS.serif)
          };
        }

        cls.__defaultSizes__P_148_1 = {
          sans: qx.bom.element.Dimension.getWidth(cls.__defaultHelpers__P_148_2.sans),
          serif: qx.bom.element.Dimension.getWidth(cls.__defaultHelpers__P_148_2.serif)
        };
      },

      /**
       * Triggers helper element size comparison and fires a ({@link #changeStatus})
       * event with the result.
       */
      __onTimerInterval__P_148_5: function __onTimerInterval__P_148_5() {
        if (this._isFontValid()) {
          this.__checkTimer__P_148_3.stop();

          this._reset();

          this.fireDataEvent("changeStatus", {
            family: this.getFontFamily(),
            valid: true
          });
        } else {
          var now = new Date().getTime();

          if (now - this.__checkStarted__P_148_4 >= this.getTimeout()) {
            this.__checkTimer__P_148_3.stop();

            this._reset();

            this.fireDataEvent("changeStatus", {
              family: this.getFontFamily(),
              valid: false
            });
          }
        }
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this._reset();

      this.__checkTimer__P_148_3.stop();

      this.__checkTimer__P_148_3.removeListener("interval", this.__onTimerInterval__P_148_5, this);

      this._disposeObjects("__checkTimer__P_148_3");
    }
  });
  qx.bom.webfonts.Validator.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
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
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * Generic escaping and unescaping of DOM strings.
   *
   * {@link qx.bom.String} for (un)escaping of HTML strings.
   * {@link qx.xml.String} for (un)escaping of XML strings.
   */
  qx.Bootstrap.define("qx.util.StringEscape", {
    statics: {
      /**
       * generic escaping method
       *
       * @param str {String} string to escape
       * @param charCodeToEntities {Map} entity to charcode map
       * @return {String} escaped string
       */
      escape: function escape(str, charCodeToEntities) {
        var entity,
            result = "";

        for (var i = 0, l = str.length; i < l; i++) {
          var chr = str.charAt(i);
          var code = str.codePointAt(i);
          i += String.fromCodePoint(code).length - 1;

          if (charCodeToEntities[code]) {
            entity = "&" + charCodeToEntities[code] + ";";
          } else {
            if (code > 0x7f) {
              entity = "&#" + code + ";";
            } else {
              entity = chr;
            }
          }

          result += entity;
        }

        return result;
      },

      /**
       * generic unescaping method
       *
       * @param str {String} string to unescape
       * @param entitiesToCharCode {Map} charcode to entity map
       * @return {String} unescaped string
       */
      unescape: function unescape(str, entitiesToCharCode) {
        return str.replace(/&[#\w]+;/gi, function (entity) {
          var chr = entity;
          var entity = entity.substring(1, entity.length - 1);
          var code = entitiesToCharCode[entity];

          if (code) {
            chr = String.fromCharCode(code);
          } else {
            if (entity.charAt(0) == "#") {
              if (entity.charAt(1).toUpperCase() == "X") {
                code = entity.substring(2); // match hex number

                if (code.match(/^[0-9A-Fa-f]+$/gi)) {
                  chr = String.fromCodePoint(parseInt(code, 16));
                }
              } else {
                code = entity.substring(1); // match integer

                if (code.match(/^\d+$/gi)) {
                  chr = String.fromCodePoint(parseInt(code, 10));
                }
              }
            }
          }

          return chr;
        });
      }
    }
  });
  qx.util.StringEscape.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.locale.Manager": {}
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
   * Provides information about locale-dependent number formatting (like the decimal
   * separator).
   *
   * @cldr()
   */
  qx.Class.define("qx.locale.Number", {
    statics: {
      /**
       * Get decimal separator for number formatting
       *
       * @param locale {String} optional locale to be used
       * @return {String} decimal separator.
       */
      getDecimalSeparator: function getDecimalSeparator(locale) {
        return qx.locale.Manager.getInstance().localize("cldr_number_decimal_separator", [], locale);
      },

      /**
       * Get thousand grouping separator for number formatting
       *
       * @param locale {String} optional locale to be used
       * @return {String} group separator.
       */
      getGroupSeparator: function getGroupSeparator(locale) {
        return qx.locale.Manager.getInstance().localize("cldr_number_group_separator", [], locale);
      },

      /**
       * Get percent format string
       *
       * @param locale {String} optional locale to be used
       * @return {String} percent format string.
       */
      getPercentFormat: function getPercentFormat(locale) {
        return qx.locale.Manager.getInstance().localize("cldr_number_percent_format", [], locale);
      }
    }
  });
  qx.locale.Number.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "construct": true,
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
      "qx.event.Registration": {
        "construct": true
      },
      "qx.bom.client.Event": {
        "construct": true,
        "require": true
      },
      "qx.bom.Element": {
        "construct": true
      },
      "qx.event.Timer": {
        "construct": true
      },
      "qx.ui.menu.Menu": {},
      "qx.ui.menu.AbstractButton": {},
      "qx.lang.Array": {},
      "qx.ui.core.Widget": {},
      "qx.ui.menubar.Button": {},
      "qx.ui.menu.Button": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "event.touch": {
          "construct": true,
          "className": "qx.bom.client.Event"
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
  
  ************************************************************************ */

  /**
   * This singleton manages visible menu instances and supports some
   * core features to schedule menu open/close with timeout support.
   *
   * It also manages the whole keyboard support for the currently
   * registered widgets.
   *
   * The zIndex order is also managed by this class.
   */
  qx.Class.define("qx.ui.menu.Manager", {
    type: "singleton",
    extend: qx.core.Object,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qx.core.Object.constructor.call(this); // Create data structure

      this.__objects__P_212_0 = [];
      var el = document.body;
      var Registration = qx.event.Registration; // React on pointer/mouse events, but on native, to support inline applications

      Registration.addListener(window.document.documentElement, "pointerdown", this._onPointerDown, this, true);
      Registration.addListener(el, "roll", this._onRoll, this, true); // React on keypress events

      Registration.addListener(el, "keydown", this._onKeyUpDown, this, true);
      Registration.addListener(el, "keyup", this._onKeyUpDown, this, true);
      Registration.addListener(el, "keypress", this._onKeyPress, this, true); // only use the blur event to hide windows on non touch devices [BUG #4033]
      // When the menu is located on top of an iFrame, the select will fail

      if (!qx.core.Environment.get("event.touch")) {
        // Hide all when the window is blurred
        qx.bom.Element.addListener(window, "blur", this.hideAll, this);
      } // Create open timer


      this.__openTimer__P_212_1 = new qx.event.Timer();

      this.__openTimer__P_212_1.addListener("interval", this._onOpenInterval, this); // Create close timer


      this.__closeTimer__P_212_2 = new qx.event.Timer();

      this.__closeTimer__P_212_2.addListener("interval", this._onCloseInterval, this);
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    /* eslint-disable @qooxdoo/qx/no-refs-in-members */
    members: {
      __scheduleOpen__P_212_3: null,
      __scheduleClose__P_212_4: null,
      __openTimer__P_212_1: null,
      __closeTimer__P_212_2: null,
      __objects__P_212_0: null,

      /*
      ---------------------------------------------------------------------------
        HELPER METHODS
      ---------------------------------------------------------------------------
      */

      /**
       * Query engine for menu children.
       *
       * @param menu {qx.ui.menu.Menu} Any menu instance
       * @param start {Integer} Child index to start with
       * @param iter {Integer} Iteration count, normally <code>+1</code> or <code>-1</code>
       * @param loop {Boolean?false} Whether to wrap when reaching the begin/end of the list
       * @return {qx.ui.menu.Button} Any menu button or <code>null</code>
       */
      _getChild: function _getChild(menu, start, iter, loop) {
        var children = menu.getChildren();
        var length = children.length;
        var child;

        for (var i = start; i < length && i >= 0; i += iter) {
          child = children[i];

          if (child.isEnabled() && !child.isAnonymous() && child.isVisible()) {
            return child;
          }
        }

        if (loop) {
          i = i == length ? 0 : length - 1;

          for (; i != start; i += iter) {
            child = children[i];

            if (child.isEnabled() && !child.isAnonymous() && child.isVisible()) {
              return child;
            }
          }
        }

        return null;
      },

      /**
       * Whether the given widget is inside any Menu instance.
       *
       * @param widget {qx.ui.core.Widget} Any widget
       * @return {Boolean} <code>true</code> when the widget is part of any menu
       */
      _isInMenu: function _isInMenu(widget) {
        while (widget) {
          if (widget instanceof qx.ui.menu.Menu) {
            return true;
          }

          widget = widget.getLayoutParent();
        }

        return false;
      },

      /**
       * Whether the given widget is one of the menu openers.
       *
       * @param widget {qx.ui.core.Widget} Any widget
       * @return {Boolean} <code>true</code> if the widget is a menu opener
       */
      _isMenuOpener: function _isMenuOpener(widget) {
        var menus = this.__objects__P_212_0;

        for (var i = 0; i < menus.length; i++) {
          if (menus[i].getOpener() === widget) {
            return true;
          }
        }

        return false;
      },

      /**
       * Returns an instance of a menu button if the given widget is a child
       *
       * @param widget {qx.ui.core.Widget} any widget
       * @return {qx.ui.menu.Button} Any menu button instance or <code>null</code>
       */
      _getMenuButton: function _getMenuButton(widget) {
        while (widget) {
          if (widget instanceof qx.ui.menu.AbstractButton) {
            return widget;
          }

          widget = widget.getLayoutParent();
        }

        return null;
      },

      /*
      ---------------------------------------------------------------------------
        PUBLIC METHODS
      ---------------------------------------------------------------------------
      */

      /**
       * Adds a menu to the list of visible menus.
       *
       * @param obj {qx.ui.menu.Menu} Any menu instance.
       */
      add: function add(obj) {
        {
          if (!(obj instanceof qx.ui.menu.Menu)) {
            throw new Error("Object is no menu: " + obj);
          }
        }
        var reg = this.__objects__P_212_0;
        reg.push(obj);
        obj.setZIndex(1e6 + reg.length);
      },

      /**
       * Remove a menu from the list of visible menus.
       *
       * @param obj {qx.ui.menu.Menu} Any menu instance.
       */
      remove: function remove(obj) {
        {
          if (!(obj instanceof qx.ui.menu.Menu)) {
            throw new Error("Object is no menu: " + obj);
          }
        }
        var reg = this.__objects__P_212_0;

        if (reg) {
          qx.lang.Array.remove(reg, obj);
        }
      },

      /**
       * Hides all currently opened menus.
       */
      hideAll: function hideAll() {
        var reg = this.__objects__P_212_0;

        if (reg) {
          for (var i = reg.length - 1; i >= 0; i--) {
            reg[i].exclude();
          }
        }
      },

      /**
       * Returns the menu which was opened at last (which
       * is the active one this way)
       *
       * @return {qx.ui.menu.Menu} The current active menu or <code>null</code>
       */
      getActiveMenu: function getActiveMenu() {
        var reg = this.__objects__P_212_0;
        return reg.length > 0 ? reg[reg.length - 1] : null;
      },

      /*
      ---------------------------------------------------------------------------
        SCHEDULED OPEN/CLOSE SUPPORT
      ---------------------------------------------------------------------------
      */

      /**
       * Schedules the given menu to be opened after the
       * {@link qx.ui.menu.Menu#openInterval} configured by the
       * menu instance itself.
       *
       * @param menu {qx.ui.menu.Menu} The menu to schedule for open
       */
      scheduleOpen: function scheduleOpen(menu) {
        // Cancel close of given menu first
        this.cancelClose(menu); // When the menu is already visible

        if (menu.isVisible()) {
          // Cancel all other open requests
          if (this.__scheduleOpen__P_212_3) {
            this.cancelOpen(this.__scheduleOpen__P_212_3);
          }
        } // When the menu is not visible and not scheduled already
        // then schedule it for opening
        else if (this.__scheduleOpen__P_212_3 != menu) {
          // menu.debug("Schedule open");
          this.__scheduleOpen__P_212_3 = menu;

          this.__openTimer__P_212_1.restartWith(menu.getOpenInterval());
        }
      },

      /**
       * Schedules the given menu to be closed after the
       * {@link qx.ui.menu.Menu#closeInterval} configured by the
       * menu instance itself.
       *
       * @param menu {qx.ui.menu.Menu} The menu to schedule for close
       */
      scheduleClose: function scheduleClose(menu) {
        // Cancel open of the menu first
        this.cancelOpen(menu); // When the menu is already invisible

        if (!menu.isVisible()) {
          // Cancel all other close requests
          if (this.__scheduleClose__P_212_4) {
            this.cancelClose(this.__scheduleClose__P_212_4);
          }
        } // When the menu is visible and not scheduled already
        // then schedule it for closing
        else if (this.__scheduleClose__P_212_4 != menu) {
          // menu.debug("Schedule close");
          this.__scheduleClose__P_212_4 = menu;

          this.__closeTimer__P_212_2.restartWith(menu.getCloseInterval());
        }
      },

      /**
       * When the given menu is scheduled for open this pending
       * request is canceled.
       *
       * @param menu {qx.ui.menu.Menu} The menu to cancel for open
       */
      cancelOpen: function cancelOpen(menu) {
        if (this.__scheduleOpen__P_212_3 == menu) {
          // menu.debug("Cancel open");
          this.__openTimer__P_212_1.stop();

          this.__scheduleOpen__P_212_3 = null;
        }
      },

      /**
       * When the given menu is scheduled for close this pending
       * request is canceled.
       *
       * @param menu {qx.ui.menu.Menu} The menu to cancel for close
       */
      cancelClose: function cancelClose(menu) {
        if (this.__scheduleClose__P_212_4 == menu) {
          // menu.debug("Cancel close");
          this.__closeTimer__P_212_2.stop();

          this.__scheduleClose__P_212_4 = null;
        }
      },

      /*
      ---------------------------------------------------------------------------
        TIMER EVENT HANDLERS
      ---------------------------------------------------------------------------
      */

      /**
       * Event listener for a pending open request. Configured to the interval
       * of the current menu to open.
       *
       * @param e {qx.event.type.Event} Interval event
       */
      _onOpenInterval: function _onOpenInterval(e) {
        // Stop timer
        this.__openTimer__P_212_1.stop(); // Open menu and reset flag


        this.__scheduleOpen__P_212_3.open();

        this.__scheduleOpen__P_212_3 = null;
      },

      /**
       * Event listener for a pending close request. Configured to the interval
       * of the current menu to close.
       *
       * @param e {qx.event.type.Event} Interval event
       */
      _onCloseInterval: function _onCloseInterval(e) {
        // Stop timer, reset scheduling flag
        this.__closeTimer__P_212_2.stop(); // Close menu and reset flag


        this.__scheduleClose__P_212_4.exclude();

        this.__scheduleClose__P_212_4 = null;
      },

      /*
      ---------------------------------------------------------------------------
        CONTEXTMENU EVENT HANDLING
      ---------------------------------------------------------------------------
      */

      /**
       * Internal function registers a handler to stop next
       * <code>contextmenu</code> event.
       * This function will be called by {@link qx.ui.menu.Button#_onTap}, if
       * right click was pressed.
       *
       * @internal
       */
      preventContextMenuOnce: function preventContextMenuOnce() {
        qx.event.Registration.addListener(document.body, "contextmenu", this.__onPreventContextMenu__P_212_5, this, true);
      },

      /**
       * Internal event handler to stop <code>contextmenu</code> event bubbling,
       * if target is inside the opened menu.
       *
       * @param e {qx.event.type.Mouse} contextmenu event
       *
       * @internal
       */
      __onPreventContextMenu__P_212_5: function __onPreventContextMenu__P_212_5(e) {
        var target = e.getTarget();
        target = qx.ui.core.Widget.getWidgetByElement(target, true);

        if (this._isInMenu(target)) {
          e.stopPropagation();
          e.preventDefault();
        } // stop only once


        qx.event.Registration.removeListener(document.body, "contextmenu", this.__onPreventContextMenu__P_212_5, this, true);
      },

      /*
      ---------------------------------------------------------------------------
        POINTER EVENT HANDLERS
      ---------------------------------------------------------------------------
      */

      /**
       * Event handler for pointerdown events
       *
       * @param e {qx.event.type.Pointer} pointerdown event
       */
      _onPointerDown: function _onPointerDown(e) {
        var target = e.getTarget();
        target = qx.ui.core.Widget.getWidgetByElement(target, true); // If the target is 'null' the tap appears on a DOM element witch is not
        // a widget. This happens normally with an inline application, when the user
        // taps not in the inline application. In this case all all currently
        // open menus should be closed.

        if (target == null) {
          this.hideAll();
          return;
        } // If the target is the one which has opened the current menu
        // we ignore the pointerdown to let the button process the event
        // further with toggling or ignoring the tap.


        if (target.getMenu && target.getMenu() && target.getMenu().isVisible()) {
          return;
        } // All taps not inside a menu will hide all currently open menus


        if (this.__objects__P_212_0.length > 0 && !this._isInMenu(target)) {
          this.hideAll();
        }
      },

      /*
      ---------------------------------------------------------------------------
        KEY EVENT HANDLING
      ---------------------------------------------------------------------------
      */

      /**
       * @type {Map} Map of all keys working on an active menu selection
       * @lint ignoreReferenceField(__selectionKeys)
       */
      __selectionKeys__P_212_6: {
        Enter: 1,
        Space: 1
      },

      /**
       * @type {Map} Map of all keys working without a selection
       * @lint ignoreReferenceField(__navigationKeys)
       */
      __navigationKeys__P_212_7: {
        Tab: 1,
        Escape: 1,
        Up: 1,
        Down: 1,
        Left: 1,
        Right: 1
      },

      /**
       * Event handler for all keyup/keydown events. Stops all events
       * when any menu is opened.
       *
       * @param e {qx.event.type.KeySequence} Keyboard event
       */
      _onKeyUpDown: function _onKeyUpDown(e) {
        var menu = this.getActiveMenu();

        if (!menu) {
          return;
        } // Stop for all supported key combos


        var iden = e.getKeyIdentifier();

        if (this.__navigationKeys__P_212_7[iden] || this.__selectionKeys__P_212_6[iden] && menu.getSelectedButton()) {
          e.stopPropagation();
        }
      },

      /**
       * Event handler for all keypress events. Delegates the event to the more
       * specific methods defined in this class.
       *
       * Currently processes the keys: <code>Up</code>, <code>Down</code>,
       * <code>Left</code>, <code>Right</code> and <code>Enter</code>.
       *
       * @param e {qx.event.type.KeySequence} Keyboard event
       */
      _onKeyPress: function _onKeyPress(e) {
        var menu = this.getActiveMenu();

        if (!menu) {
          return;
        }

        var iden = e.getKeyIdentifier();
        var navigation = this.__navigationKeys__P_212_7[iden];
        var selection = this.__selectionKeys__P_212_6[iden];

        if (navigation) {
          switch (iden) {
            case "Up":
              this._onKeyPressUp(menu);

              break;

            case "Down":
              this._onKeyPressDown(menu);

              break;

            case "Left":
              this._onKeyPressLeft(menu);

              break;

            case "Right":
              this._onKeyPressRight(menu);

              break;

            case "Tab":
            case "Escape":
              this.hideAll();
              break;
          }

          e.stopPropagation();
          e.preventDefault();
        } else if (selection) {
          // Do not process these events when no item is hovered
          var button = menu.getSelectedButton();

          if (button) {
            switch (iden) {
              case "Enter":
                this._onKeyPressEnter(menu, button, e);

                break;

              case "Space":
                this._onKeyPressSpace(menu, button, e);

                break;
            }

            e.stopPropagation();
            e.preventDefault();
          }
        }
      },

      /**
       * Event handler for <code>Up</code> key
       *
       * @param menu {qx.ui.menu.Menu} The active menu
       */
      _onKeyPressUp: function _onKeyPressUp(menu) {
        // Query for previous child
        var selectedButton = menu.getSelectedButton();
        var children = menu.getChildren();
        var start = selectedButton ? menu.indexOf(selectedButton) - 1 : children.length - 1;

        var nextItem = this._getChild(menu, start, -1, true); // Reconfigure property


        if (nextItem) {
          menu.setSelectedButton(nextItem);
        } else {
          menu.resetSelectedButton();
        }
      },

      /**
       * Event handler for <code>Down</code> key
       *
       * @param menu {qx.ui.menu.Menu} The active menu
       */
      _onKeyPressDown: function _onKeyPressDown(menu) {
        // Query for next child
        var selectedButton = menu.getSelectedButton();
        var start = selectedButton ? menu.indexOf(selectedButton) + 1 : 0;

        var nextItem = this._getChild(menu, start, 1, true); // Reconfigure property


        if (nextItem) {
          menu.setSelectedButton(nextItem);
        } else {
          menu.resetSelectedButton();
        }
      },

      /**
       * Event handler for <code>Left</code> key
       *
       * @param menu {qx.ui.menu.Menu} The active menu
       */
      _onKeyPressLeft: function _onKeyPressLeft(menu) {
        var menuOpener = menu.getOpener();

        if (!menuOpener) {
          return;
        } // Back to the "parent" menu


        if (menuOpener instanceof qx.ui.menu.AbstractButton) {
          var parentMenu = menuOpener.getLayoutParent();
          parentMenu.resetOpenedButton();
          parentMenu.setSelectedButton(menuOpener);
        } // Goto the previous toolbar button
        else if (menuOpener instanceof qx.ui.menubar.Button) {
          var buttons = menuOpener.getMenuBar().getMenuButtons();
          var index = buttons.indexOf(menuOpener); // This should not happen, definitely!

          if (index === -1) {
            return;
          } // Get previous button, fallback to end if first arrived


          var prevButton = null;
          var length = buttons.length;

          for (var i = 1; i <= length; i++) {
            var button = buttons[(index - i + length) % length];

            if (button.isEnabled() && button.isVisible()) {
              prevButton = button;
              break;
            }
          }

          if (prevButton && prevButton != menuOpener) {
            prevButton.open(true);
          }
        }
      },

      /**
       * Event handler for <code>Right</code> key
       *
       * @param menu {qx.ui.menu.Menu} The active menu
       */
      _onKeyPressRight: function _onKeyPressRight(menu) {
        var selectedButton = menu.getSelectedButton(); // Open sub-menu of hovered item and select first child

        if (selectedButton) {
          var subMenu = selectedButton.getMenu();

          if (subMenu) {
            // Open previously hovered item
            menu.setOpenedButton(selectedButton); // Hover first item in new submenu

            var first = this._getChild(subMenu, 0, 1);

            if (first) {
              subMenu.setSelectedButton(first);
            }

            return;
          }
        } // No hover and no open item
        // When first button has a menu, open it, otherwise only hover it
        else if (!menu.getOpenedButton()) {
          var first = this._getChild(menu, 0, 1);

          if (first) {
            menu.setSelectedButton(first);

            if (first.getMenu()) {
              menu.setOpenedButton(first);
            }

            return;
          }
        } // Jump to the next toolbar button


        var menuOpener = menu.getOpener(); // Look up opener hierarchy for menu button

        if (menuOpener instanceof qx.ui.menu.Button && selectedButton) {
          // From one inner selected button try to find the top level
          // menu button which has opened the whole menu chain.
          while (menuOpener) {
            menuOpener = menuOpener.getLayoutParent();

            if (menuOpener instanceof qx.ui.menu.Menu) {
              menuOpener = menuOpener.getOpener();

              if (menuOpener instanceof qx.ui.menubar.Button) {
                break;
              }
            } else {
              break;
            }
          }

          if (!menuOpener) {
            return;
          }
        } // Ask the toolbar for the next menu button


        if (menuOpener instanceof qx.ui.menubar.Button) {
          var buttons = menuOpener.getMenuBar().getMenuButtons();
          var index = buttons.indexOf(menuOpener); // This should not happen, definitely!

          if (index === -1) {
            return;
          } // Get next button, fallback to first if end arrived


          var nextButton = null;
          var length = buttons.length;

          for (var i = 1; i <= length; i++) {
            var button = buttons[(index + i) % length];

            if (button.isEnabled() && button.isVisible()) {
              nextButton = button;
              break;
            }
          }

          if (nextButton && nextButton != menuOpener) {
            nextButton.open(true);
          }
        }
      },

      /**
       * Event handler for <code>Enter</code> key
       *
       * @param menu {qx.ui.menu.Menu} The active menu
       * @param button {qx.ui.menu.AbstractButton} The selected button
       * @param e {qx.event.type.KeySequence} The keypress event
       */
      _onKeyPressEnter: function _onKeyPressEnter(menu, button, e) {
        // Route keypress event to the selected button
        if (button.hasListener("keypress")) {
          // Clone and reconfigure event
          var clone = e.clone();
          clone.setBubbles(false);
          clone.setTarget(button); // Finally dispatch the clone

          button.dispatchEvent(clone);
        } // Hide all open menus


        this.hideAll();
      },

      /**
       * Event handler for <code>Space</code> key
       *
       * @param menu {qx.ui.menu.Menu} The active menu
       * @param button {qx.ui.menu.AbstractButton} The selected button
       * @param e {qx.event.type.KeySequence} The keypress event
       */
      _onKeyPressSpace: function _onKeyPressSpace(menu, button, e) {
        // Route keypress event to the selected button
        if (button.hasListener("keypress")) {
          // Clone and reconfigure event
          var clone = e.clone();
          clone.setBubbles(false);
          clone.setTarget(button); // Finally dispatch the clone

          button.dispatchEvent(clone);
        }
      },

      /**
       * Event handler for roll which hides all windows on scroll.
       *
       * @param e {qx.event.type.Roll} The roll event.
       */
      _onRoll: function _onRoll(e) {
        var target = e.getTarget();
        target = qx.ui.core.Widget.getWidgetByElement(target, true);

        if (this.__objects__P_212_0.length > 0 && !this._isInMenu(target) && !this._isMenuOpener(target) && !e.getMomentum()) {
          this.hideAll();
        }
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      var Registration = qx.event.Registration;
      var el = document.body; // React on pointerdown events

      Registration.removeListener(window.document.documentElement, "pointerdown", this._onPointerDown, this, true); // React on keypress events

      Registration.removeListener(el, "keydown", this._onKeyUpDown, this, true);
      Registration.removeListener(el, "keyup", this._onKeyUpDown, this, true);
      Registration.removeListener(el, "keypress", this._onKeyPress, this, true);

      this._disposeObjects("__openTimer__P_212_1", "__closeTimer__P_212_2");

      this._disposeArray("__objects__P_212_0");
    }
  });
  qx.ui.menu.Manager.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.Widget": {
        "construct": true,
        "require": true
      },
      "qx.ui.core.MPlacement": {
        "require": true
      },
      "qx.ui.core.MRemoteChildrenHandling": {
        "require": true
      },
      "qx.ui.menu.Layout": {
        "construct": true
      },
      "qx.ui.core.Blocker": {
        "construct": true
      },
      "qx.ui.menu.Separator": {},
      "qx.ui.menu.Manager": {},
      "qx.ui.menu.AbstractButton": {},
      "qx.ui.menu.MenuSlideBar": {},
      "qx.ui.layout.Grow": {},
      "qx.lang.Array": {},
      "qx.ui.core.queue.Widget": {},
      "qx.core.ObjectRegistry": {}
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
   * The menu is a popup like control which supports buttons. It comes
   * with full keyboard navigation and an improved timeout based pointer
   * control behavior.
   *
   * This class is the container for all derived instances of
   * {@link qx.ui.menu.AbstractButton}.
   *
   * @childControl slidebar {qx.ui.menu.MenuSlideBar} shows a slidebar to easily navigate inside the menu (if too little space is left)
   */
  qx.Class.define("qx.ui.menu.Menu", {
    extend: qx.ui.core.Widget,
    include: [qx.ui.core.MPlacement, qx.ui.core.MRemoteChildrenHandling],
    construct: function construct() {
      qx.ui.core.Widget.constructor.call(this); // Use hard coded layout

      this._setLayout(new qx.ui.menu.Layout()); // Automatically add to application's root


      var root = this.getApplicationRoot();
      root.add(this); // ARIA attrs

      var contentEl = this.getContentElement();
      contentEl.setAttribute("role", "menu");
      contentEl.setAttribute("id", "menu-" + this.toHashCode()); // Register pointer listeners

      this.addListener("pointerover", this._onPointerOver);
      this.addListener("pointerout", this._onPointerOut); // add resize listener

      this.addListener("resize", this._onResize, this);
      root.addListener("resize", this._onResize, this);
      this._blocker = new qx.ui.core.Blocker(root); // Initialize properties

      this.initVisibility();
      this.initKeepFocus();
      this.initKeepActive();
    },
    properties: {
      /*
      ---------------------------------------------------------------------------
        WIDGET PROPERTIES
      ---------------------------------------------------------------------------
      */
      // overridden
      appearance: {
        refine: true,
        init: "menu"
      },
      // overridden
      allowGrowX: {
        refine: true,
        init: false
      },
      // overridden
      allowGrowY: {
        refine: true,
        init: false
      },
      // overridden
      visibility: {
        refine: true,
        init: "excluded"
      },
      // overridden
      keepFocus: {
        refine: true,
        init: true
      },
      // overridden
      keepActive: {
        refine: true,
        init: true
      },

      /*
      ---------------------------------------------------------------------------
        STYLE OPTIONS
      ---------------------------------------------------------------------------
      */

      /** The spacing between each cell of the menu buttons */
      spacingX: {
        check: "Integer",
        apply: "_applySpacingX",
        init: 0,
        themeable: true
      },

      /** The spacing between each menu button */
      spacingY: {
        check: "Integer",
        apply: "_applySpacingY",
        init: 0,
        themeable: true
      },

      /**
       * Default icon column width if no icons are rendered.
       * This property is ignored as soon as an icon is present.
       */
      iconColumnWidth: {
        check: "Integer",
        init: 0,
        themeable: true,
        apply: "_applyIconColumnWidth"
      },

      /** Default arrow column width if no sub menus are rendered */
      arrowColumnWidth: {
        check: "Integer",
        init: 0,
        themeable: true,
        apply: "_applyArrowColumnWidth"
      },

      /**
       * Color of the blocker
       */
      blockerColor: {
        check: "Color",
        init: null,
        nullable: true,
        apply: "_applyBlockerColor",
        themeable: true
      },

      /**
       * Opacity of the blocker
       */
      blockerOpacity: {
        check: "Number",
        init: 1,
        apply: "_applyBlockerOpacity",
        themeable: true
      },

      /*
      ---------------------------------------------------------------------------
        FUNCTIONALITY PROPERTIES
      ---------------------------------------------------------------------------
      */

      /** The currently selected button */
      selectedButton: {
        check: "qx.ui.core.Widget",
        nullable: true,
        apply: "_applySelectedButton"
      },

      /** The currently opened button (sub menu is visible) */
      openedButton: {
        check: "qx.ui.core.Widget",
        nullable: true,
        apply: "_applyOpenedButton"
      },

      /** Widget that opened the menu */
      opener: {
        check: "qx.ui.core.Widget",
        nullable: true,
        apply: "_applyOpener"
      },

      /*
      ---------------------------------------------------------------------------
        BEHAVIOR PROPERTIES
      ---------------------------------------------------------------------------
      */

      /** Interval in ms after which sub menus should be opened */
      openInterval: {
        check: "Integer",
        themeable: true,
        init: 250,
        apply: "_applyOpenInterval"
      },

      /** Interval in ms after which sub menus should be closed  */
      closeInterval: {
        check: "Integer",
        themeable: true,
        init: 250,
        apply: "_applyCloseInterval"
      },

      /** Blocks the background if value is <code>true<code> */
      blockBackground: {
        check: "Boolean",
        themeable: true,
        init: false
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __scheduledOpen__P_209_0: null,
      __onAfterSlideBarAdd__P_209_1: null,

      /** @type {qx.ui.core.Blocker} blocker for background blocking */
      _blocker: null,

      /*
      ---------------------------------------------------------------------------
        PUBLIC API
      ---------------------------------------------------------------------------
      */

      /**
       * Opens the menu and configures the opener
       */
      open: function open() {
        if (this.getOpener() != null) {
          var isPlaced = this.placeToWidget(this.getOpener(), true);

          if (isPlaced) {
            this.__updateSlideBar__P_209_2();

            this.show();
            this._placementTarget = this.getOpener();
          } else {
            this.warn("Could not open menu instance because 'opener' widget is not visible");
          }
        } else {
          this.warn("The menu instance needs a configured 'opener' widget!");
        }
      },

      /**
       * Opens the menu at the pointer position
       *
       * @param e {qx.event.type.Pointer} Pointer event to align to
       */
      openAtPointer: function openAtPointer(e) {
        this.placeToPointer(e);

        this.__updateSlideBar__P_209_2();

        this.show();
        this._placementTarget = {
          left: e.getDocumentLeft(),
          top: e.getDocumentTop()
        };
      },

      /**
       * Opens the menu in relation to the given point
       *
       * @param point {Map} Coordinate of any point with the keys <code>left</code>
       *   and <code>top</code>.
       */
      openAtPoint: function openAtPoint(point) {
        this.placeToPoint(point);

        this.__updateSlideBar__P_209_2();

        this.show();
        this._placementTarget = point;
      },

      /**
       * Convenience method to add a separator to the menu
       */
      addSeparator: function addSeparator() {
        this.add(new qx.ui.menu.Separator());
      },

      /**
       * Returns the column sizes detected during the pre-layout phase
       *
       * @return {Array} List of all column widths
       */
      getColumnSizes: function getColumnSizes() {
        return this._getMenuLayout().getColumnSizes();
      },

      /**
       * Return all selectable menu items.
       *
       * @return {qx.ui.core.Widget[]} selectable widgets
       */
      getSelectables: function getSelectables() {
        var result = [];
        var children = this.getChildren();

        for (var i = 0; i < children.length; i++) {
          if (children[i].isEnabled()) {
            result.push(children[i]);
          }
        }

        return result;
      },

      /*
      ---------------------------------------------------------------------------
        PROPERTY APPLY ROUTINES
      ---------------------------------------------------------------------------
      */
      // property apply
      _applyIconColumnWidth: function _applyIconColumnWidth(value, old) {
        this._getMenuLayout().setIconColumnWidth(value);
      },
      // property apply
      _applyArrowColumnWidth: function _applyArrowColumnWidth(value, old) {
        this._getMenuLayout().setArrowColumnWidth(value);
      },
      // property apply
      _applySpacingX: function _applySpacingX(value, old) {
        this._getMenuLayout().setColumnSpacing(value);
      },
      // property apply
      _applySpacingY: function _applySpacingY(value, old) {
        this._getMenuLayout().setSpacing(value);
      },
      // overridden
      _applyVisibility: function _applyVisibility(value, old) {
        qx.ui.menu.Menu.superclass.prototype._applyVisibility.call(this, value, old);

        var mgr = qx.ui.menu.Manager.getInstance();

        if (value === "visible") {
          // Register to manager (zIndex handling etc.)
          mgr.add(this); // Mark opened in parent menu

          var parentMenu = this.getParentMenu();

          if (parentMenu) {
            parentMenu.setOpenedButton(this.getOpener());
          }
        } else if (old === "visible") {
          // Deregister from manager (zIndex handling etc.)
          mgr.remove(this); // Unmark opened in parent menu

          var parentMenu = this.getParentMenu();

          if (parentMenu && parentMenu.getOpenedButton() == this.getOpener()) {
            parentMenu.resetOpenedButton();
          } // Clear properties


          this.resetOpenedButton();
          this.resetSelectedButton();
        }

        this.__updateBlockerVisibility__P_209_3();
      },

      /**
       * Updates the blocker's visibility
       */
      __updateBlockerVisibility__P_209_3: function __updateBlockerVisibility__P_209_3() {
        if (this.isVisible()) {
          if (this.getBlockBackground()) {
            var zIndex = this.getZIndex();

            this._blocker.blockContent(zIndex - 1);
          }
        } else {
          if (this._blocker.isBlocked()) {
            this._blocker.unblock();
          }
        }
      },

      /**
       * Get the parent menu. Returns <code>null</code> if the menu doesn't have a
       * parent menu.
       *
       * @return {qx.ui.core.Widget|null} The parent menu.
       */
      getParentMenu: function getParentMenu() {
        var widget = this.getOpener();

        if (!widget || !(widget instanceof qx.ui.menu.AbstractButton)) {
          return null;
        }

        if (widget && widget.getContextMenu() === this) {
          return null;
        }

        while (widget && !(widget instanceof qx.ui.menu.Menu)) {
          widget = widget.getLayoutParent();
        }

        return widget;
      },
      // property apply
      _applySelectedButton: function _applySelectedButton(value, old) {
        if (old) {
          old.removeState("selected");
        }

        if (value) {
          value.addState("selected");
        } // ARIA attrs


        var opener = this.__getRootOpener__P_209_4();

        var contentEl = opener ? opener.getContentElement() : this.getContentElement();

        if (!contentEl) {
          return;
        }

        var valueContentEl = value ? value.getContentElement() : null;

        if (valueContentEl) {
          contentEl.setAttribute("aria-activedescendant", valueContentEl.getAttribute("id"));
        } else {
          contentEl.removeAttribute("aria-activedescendant");
        }
      },
      // property apply
      _applyOpenedButton: function _applyOpenedButton(value, old) {
        if (old && old.getMenu()) {
          old.getMenu().exclude();
        }

        if (value) {
          value.getMenu().open();
        }
      },
      // property apply
      _applyOpener: function _applyOpener(value, old) {
        // ARIA attrs
        var contentEl = this.getContentElement();

        if (!contentEl) {
          return;
        }

        if (value && value.getContentElement()) {
          contentEl.setAttribute("aria-labelledby", "");
          this.addAriaLabelledBy(value);
        } else {
          contentEl.removeAttribute("aria-labelledby");
        }
      },
      // property apply
      _applyBlockerColor: function _applyBlockerColor(value, old) {
        this._blocker.setColor(value);
      },
      // property apply
      _applyBlockerOpacity: function _applyBlockerOpacity(value, old) {
        this._blocker.setOpacity(value);
      },

      /*
      ---------------------------------------------------------------------------
      SCROLLING SUPPORT
      ---------------------------------------------------------------------------
      */
      // overridden
      getChildrenContainer: function getChildrenContainer() {
        return this.getChildControl("slidebar", true) || this;
      },
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id, hash) {
        var control;

        switch (id) {
          case "slidebar":
            var control = new qx.ui.menu.MenuSlideBar();

            var layout = this._getLayout();

            this._setLayout(new qx.ui.layout.Grow());

            var slidebarLayout = control.getLayout();
            control.setLayout(layout);
            slidebarLayout.dispose();
            var children = qx.lang.Array.clone(this.getChildren());

            for (var i = 0; i < children.length; i++) {
              control.add(children[i]);
            }

            this.removeListener("resize", this._onResize, this);
            control.getChildrenContainer().addListener("resize", this._onResize, this);

            this._add(control);

            break;
        }

        return control || qx.ui.menu.Menu.superclass.prototype._createChildControlImpl.call(this, id);
      },

      /**
       * Get the menu layout manager
       *
       * @return {qx.ui.layout.Abstract} The menu layout manager
       */
      _getMenuLayout: function _getMenuLayout() {
        if (this.hasChildControl("slidebar")) {
          return this.getChildControl("slidebar").getChildrenContainer().getLayout();
        } else {
          return this._getLayout();
        }
      },

      /**
       * Get the menu bounds
       *
       * @return {Map} The menu bounds
       */
      _getMenuBounds: function _getMenuBounds() {
        if (this.hasChildControl("slidebar")) {
          return this.getChildControl("slidebar").getChildrenContainer().getBounds();
        } else {
          return this.getBounds();
        }
      },

      /**
       * Computes the size of the menu. This method is used by the
       * {@link qx.ui.core.MPlacement} mixin.
       * @return {Map} The menu bounds
       */
      _computePlacementSize: function _computePlacementSize() {
        return this._getMenuBounds();
      },

      /**
       * Updates the visibility of the slidebar based on the menu's current size
       * and position.
       */
      __updateSlideBar__P_209_2: function __updateSlideBar__P_209_2() {
        var menuBounds = this._getMenuBounds();

        if (!menuBounds) {
          this.addListenerOnce("resize", this.__updateSlideBar__P_209_2, this);
          return;
        }

        var rootHeight = this.getLayoutParent().getBounds().height;
        var top = this.getLayoutProperties().top;
        var left = this.getLayoutProperties().left; // Adding the slidebar must be deferred because this call can happen
        // during the layout flush, which make it impossible to move existing
        // layout to the slidebar

        if (top < 0) {
          this._assertSlideBar(function () {
            this.setHeight(menuBounds.height + top);
            this.moveTo(left, 0);
          });
        } else if (top + menuBounds.height > rootHeight) {
          this._assertSlideBar(function () {
            this.setHeight(rootHeight - top);
          });
        } else {
          this.setHeight(null);
        }
      },

      /**
       * Schedules the addition of the slidebar and calls the given callback
       * after the slidebar has been added.
       *
       * @param callback {Function} the callback to call
       * @return {var|undefined} The return value of the callback if the slidebar
       * already exists, or <code>undefined</code> if it doesn't
       */
      _assertSlideBar: function _assertSlideBar(callback) {
        if (this.hasChildControl("slidebar")) {
          return callback.call(this);
        }

        this.__onAfterSlideBarAdd__P_209_1 = callback;
        qx.ui.core.queue.Widget.add(this);
      },
      // overridden
      syncWidget: function syncWidget(jobs) {
        this.getChildControl("slidebar");

        if (this.__onAfterSlideBarAdd__P_209_1) {
          this.__onAfterSlideBarAdd__P_209_1.call(this);

          delete this.__onAfterSlideBarAdd__P_209_1;
        }
      },

      /*
      ---------------------------------------------------------------------------
        EVENT HANDLING
      ---------------------------------------------------------------------------
      */

      /**
       * Gets called when a child is added. Sets ARIA attrs
       * @param {*} child
       */
      _afterAddChild: function _afterAddChild(child) {
        // Some childs, e.g. Seperators, are no meaningful menu items
        if (child instanceof qx.ui.menu.AbstractButton) {
          var contentEl = child.getContentElement();
          contentEl.setAttribute("id", "menu-item-" + child.toHashCode());
          contentEl.setAttribute("role", "menuitem");
        }
      },

      /**
       * Update position if the menu or the root is resized
       */
      _onResize: function _onResize() {
        if (this.isVisible()) {
          var target = this._placementTarget;

          if (!target) {
            return;
          } else if (target instanceof qx.ui.core.Widget) {
            this.placeToWidget(target, true);
          } else if (target.top !== undefined) {
            this.placeToPoint(target);
          } else {
            throw new Error("Unknown target: " + target);
          }

          this.__updateSlideBar__P_209_2();
        }
      },

      /**
       * Event listener for pointerover event.
       *
       * @param e {qx.event.type.Pointer} pointerover event
       */
      _onPointerOver: function _onPointerOver(e) {
        // Cache manager
        var mgr = qx.ui.menu.Manager.getInstance(); // Be sure this menu is kept

        mgr.cancelClose(this); // Change selection

        var target = e.getTarget();

        if (target.isEnabled() && target instanceof qx.ui.menu.AbstractButton) {
          // Select button directly
          this.setSelectedButton(target);
          var subMenu = target.getMenu && target.getMenu();

          if (subMenu) {
            subMenu.setOpener(target); // Finally schedule for opening

            mgr.scheduleOpen(subMenu); // Remember scheduled menu for opening

            this.__scheduledOpen__P_209_0 = subMenu;
          } else {
            var opened = this.getOpenedButton();

            if (opened) {
              mgr.scheduleClose(opened.getMenu());
            }

            if (this.__scheduledOpen__P_209_0) {
              mgr.cancelOpen(this.__scheduledOpen__P_209_0);
              this.__scheduledOpen__P_209_0 = null;
            }
          }
        } else if (!this.getOpenedButton()) {
          // When no button is opened reset the selection
          // Otherwise keep it
          this.resetSelectedButton();
        }
      },

      /**
       * Event listener for pointerout event.
       *
       * @param e {qx.event.type.Pointer} pointerout event
       */
      _onPointerOut: function _onPointerOut(e) {
        // Cache manager
        var mgr = qx.ui.menu.Manager.getInstance(); // Detect whether the related target is out of the menu

        if (!qx.ui.core.Widget.contains(this, e.getRelatedTarget())) {
          // Update selected property
          // Force it to the open sub menu in cases where that is opened
          // Otherwise reset it. Menus which are left by the cursor should
          // not show any selection.
          var opened = this.getOpenedButton();
          opened ? this.setSelectedButton(opened) : this.resetSelectedButton(); // Cancel a pending close request for the currently
          // opened sub menu

          if (opened) {
            mgr.cancelClose(opened.getMenu());
          } // When leaving this menu to the outside, stop
          // all pending requests to open any other sub menu


          if (this.__scheduledOpen__P_209_0) {
            mgr.cancelOpen(this.__scheduledOpen__P_209_0);
          }
        }
      },

      /*
      ---------------------------------------------------------------------------
        HELPER FUNCTIONS
      ---------------------------------------------------------------------------
      */

      /**
       * Get the opener of the root/the first parent menu.
       * parent menu.
       *
       * @return {qx.ui.core.Widget|null} The opener.
       */
      __getRootOpener__P_209_4: function __getRootOpener__P_209_4() {
        var parentMenu = this.getParentMenu();

        if (!parentMenu) {
          return this.getOpener();
        }

        var opener;

        while (parentMenu) {
          opener = parentMenu.getOpener();
          parentMenu = parentMenu.getParentMenu();
        }

        return opener;
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      if (!qx.core.ObjectRegistry.inShutDown) {
        qx.ui.menu.Manager.getInstance().remove(this);
      }

      this.getApplicationRoot().removeListener("resize", this._onResize, this);
      this._placementTarget = null;

      this._disposeObjects("_blocker");
    }
  });
  qx.ui.menu.Menu.$$dbClassInfo = $$dbClassInfo;
})();

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
      "qx.ui.core.Widget": {
        "construct": true,
        "require": true
      },
      "qx.ui.core.MExecutable": {
        "require": true
      },
      "qx.ui.form.IExecutable": {
        "require": true
      },
      "qx.ui.menu.ButtonLayout": {
        "construct": true
      },
      "qx.ui.basic.Image": {},
      "qx.ui.basic.Label": {},
      "qx.event.Timer": {},
      "qx.ui.menu.Manager": {},
      "qx.locale.Manager": {},
      "qx.core.ObjectRegistry": {}
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
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * The abstract menu button class is used for all type of menu content
   * for example normal buttons, checkboxes or radiobuttons.
   *
   * @childControl icon {qx.ui.basic.Image} icon of the button
   * @childControl label {qx.ui.basic.Label} label of the button
   * @childControl shortcut {qx.ui.basic.Label} shows if specified the shortcut
   * @childControl arrow {qx.ui.basic.Image} shows the arrow to show an additional widget (e.g. popup or submenu)
   */
  qx.Class.define("qx.ui.menu.AbstractButton", {
    extend: qx.ui.core.Widget,
    include: [qx.ui.core.MExecutable],
    implement: [qx.ui.form.IExecutable],
    type: "abstract",

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qx.ui.core.Widget.constructor.call(this); // Use hard coded layout

      this._setLayout(new qx.ui.menu.ButtonLayout()); // Add listeners


      this.addListener("tap", this._onTap);
      this.addListener("keypress", this._onKeyPress); // Add command listener

      this.addListener("changeCommand", this._onChangeCommand, this);
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      // overridden
      blockToolTip: {
        refine: true,
        init: true
      },

      /** The label text of the button */
      label: {
        check: "String",
        apply: "_applyLabel",
        nullable: true,
        event: "changeLabel"
      },

      /** Whether a sub menu should be shown and which one */
      menu: {
        check: "qx.ui.menu.Menu",
        apply: "_applyMenu",
        nullable: true,
        dereference: true,
        event: "changeMenu"
      },

      /** The icon to use */
      icon: {
        check: "String",
        apply: "_applyIcon",
        themeable: true,
        nullable: true,
        event: "changeIcon"
      },

      /** Indicates whether the label for the command (shortcut) should be visible or not. */
      showCommandLabel: {
        check: "Boolean",
        apply: "_applyShowCommandLabel",
        themeable: true,
        init: true,
        event: "changeShowCommandLabel"
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      /*
      ---------------------------------------------------------------------------
        WIDGET API
      ---------------------------------------------------------------------------
      */
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id, hash) {
        var control;

        switch (id) {
          case "icon":
            control = new qx.ui.basic.Image();
            control.setAnonymous(true);

            this._add(control, {
              column: 0
            });

            break;

          case "label":
            control = new qx.ui.basic.Label();
            control.setAnonymous(true);

            this._add(control, {
              column: 1
            });

            break;

          case "shortcut":
            control = new qx.ui.basic.Label();
            control.setAnonymous(true);

            if (!this.getShowCommandLabel()) {
              control.exclude();
            }

            this._add(control, {
              column: 2
            });

            break;

          case "arrow":
            control = new qx.ui.basic.Image();
            control.setAnonymous(true);

            this._add(control, {
              column: 3
            });

            break;
        }

        return control || qx.ui.menu.AbstractButton.superclass.prototype._createChildControlImpl.call(this, id);
      },
      // overridden

      /**
       * @lint ignoreReferenceField(_forwardStates)
       */
      _forwardStates: {
        selected: 1
      },

      /*
      ---------------------------------------------------------------------------
        LAYOUT UTILS
      ---------------------------------------------------------------------------
      */

      /**
       * Returns the dimensions of all children
       *
       * @return {Array} Preferred width of each child
       */
      getChildrenSizes: function getChildrenSizes() {
        var iconWidth = 0,
            labelWidth = 0,
            shortcutWidth = 0,
            arrowWidth = 0;

        if (this._isChildControlVisible("icon")) {
          var icon = this.getChildControl("icon");
          iconWidth = icon.getMarginLeft() + icon.getSizeHint().width + icon.getMarginRight();
        }

        if (this._isChildControlVisible("label")) {
          var label = this.getChildControl("label");
          labelWidth = label.getMarginLeft() + label.getSizeHint().width + label.getMarginRight();
        }

        if (this._isChildControlVisible("shortcut")) {
          var shortcut = this.getChildControl("shortcut");
          shortcutWidth = shortcut.getMarginLeft() + shortcut.getSizeHint().width + shortcut.getMarginRight();
        }

        if (this._isChildControlVisible("arrow")) {
          var arrow = this.getChildControl("arrow");
          arrowWidth = arrow.getMarginLeft() + arrow.getSizeHint().width + arrow.getMarginRight();
        }

        return [iconWidth, labelWidth, shortcutWidth, arrowWidth];
      },

      /*
      ---------------------------------------------------------------------------
        EVENT LISTENERS
      ---------------------------------------------------------------------------
      */

      /**
       * Event listener for tap
       *
       * @param e {qx.event.type.Pointer} pointer event
       */
      _onTap: function _onTap(e) {
        if (e.isLeftPressed()) {
          this.execute();
          qx.event.Timer.once(qx.ui.menu.Manager.getInstance().hideAll, qx.ui.menu.Manager.getInstance(), 0);
        } // right click
        else {
          // only prevent contextmenu event if button has no further context menu.
          if (!this.getContextMenu()) {
            qx.ui.menu.Manager.getInstance().preventContextMenuOnce();
          }
        }
      },

      /**
       * Event listener for keypress event
       *
       * @param e {qx.event.type.KeySequence} keypress event
       */
      _onKeyPress: function _onKeyPress(e) {
        this.execute();
      },

      /**
       * Event listener for command changes. Updates the text of the shortcut.
       *
       * @param e {qx.event.type.Data} Property change event
       */
      _onChangeCommand: function _onChangeCommand(e) {
        var command = e.getData(); // do nothing if no command is set

        if (command == null) {
          return;
        }

        {
          var oldCommand = e.getOldData();

          if (!oldCommand) {
            qx.locale.Manager.getInstance().addListener("changeLocale", this._onChangeLocale, this);
          }

          if (!command) {
            qx.locale.Manager.getInstance().removeListener("changeLocale", this._onChangeLocale, this);
          }
        }
        var cmdString = command != null ? command.toString() : "";
        this.getChildControl("shortcut").setValue(cmdString);
      },

      /**
       * Update command string on locale changes
       */
      _onChangeLocale: qx.core.Environment.select("qx.dynlocale", {
        "true": function _true(e) {
          var command = this.getCommand();

          if (command != null) {
            this.getChildControl("shortcut").setValue(command.toString());
          }
        },
        "false": null
      }),

      /*
      ---------------------------------------------------------------------------
        PROPERTY APPLY ROUTINES
      ---------------------------------------------------------------------------
      */
      // property apply
      _applyIcon: function _applyIcon(value, old) {
        if (value) {
          this._showChildControl("icon").setSource(value);
        } else {
          this._excludeChildControl("icon");
        }
      },
      // property apply
      _applyLabel: function _applyLabel(value, old) {
        if (value) {
          this._showChildControl("label").setValue(value);
        } else {
          this._excludeChildControl("label");
        }
      },
      // property apply
      _applyMenu: function _applyMenu(value, old) {
        if (old) {
          old.removeListener("changeVisibility", this._onMenuChange, this);
          old.resetOpener();
          old.removeState("submenu");
        }

        if (value) {
          this._showChildControl("arrow");

          value.addListener("changeVisibility", this._onMenuChange, this);
          value.setOpener(this);
          value.addState("submenu");
        } else {
          this._excludeChildControl("arrow");
        } // ARIA attrs


        var contentEl = this.getContentElement();

        if (!contentEl) {
          return;
        }

        if (value) {
          contentEl.setAttribute("aria-haspopup", "menu");
          contentEl.setAttribute("aria-expanded", value.isVisible());
          contentEl.setAttribute("aria-controls", value.getContentElement().getAttribute("id"));
        } else {
          contentEl.removeAttribute("aria-haspopup");
          contentEl.removeAttribute("aria-expanded");
          contentEl.removeAttribute("aria-controls");
        }
      },

      /**
       * Listener for visibility property changes of the attached menu
       *
       * @param e {qx.event.type.Data} Property change event
       */
      _onMenuChange: function _onMenuChange(e) {
        // ARIA attrs
        this.getContentElement().setAttribute("aria-expanded", this.getMenu().isVisible());
      },
      // property apply
      _applyShowCommandLabel: function _applyShowCommandLabel(value, old) {
        if (value) {
          this._showChildControl("shortcut");
        } else {
          this._excludeChildControl("shortcut");
        }
      }
    },

    /*
     *****************************************************************************
        DESTRUCTOR
     *****************************************************************************
     */
    destruct: function destruct() {
      this.removeListener("changeCommand", this._onChangeCommand, this);

      if (this.getMenu()) {
        if (!qx.core.ObjectRegistry.inShutDown) {
          this.getMenu().destroy();
        }
      }

      {
        qx.locale.Manager.getInstance().removeListener("changeLocale", this._onChangeLocale, this);
      }
    }
  });
  qx.ui.menu.AbstractButton.$$dbClassInfo = $$dbClassInfo;
})();

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
        "require": true
      },
      "qx.lang.Array": {},
      "qx.ui.layout.Util": {},
      "qx.ui.menu.Menu": {}
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
   * Layout used for the menu buttons which may contain four elements. A icon,
   * a label, a shortcut text and an arrow (for a sub menu)
   *
   * @internal
   */
  qx.Class.define("qx.ui.menu.ButtonLayout", {
    extend: qx.ui.layout.Abstract,

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      // overridden
      verifyLayoutProperty: qx.core.Environment.select("qx.debug", {
        "true": function _true(item, name, value) {
          this.assert(name == "column", "The property '" + name + "' is not supported by the MenuButton layout!");
        },
        "false": null
      }),
      // overridden
      renderLayout: function renderLayout(availWidth, availHeight, padding) {
        var children = this._getLayoutChildren();

        var child;
        var column;
        var columnChildren = [];

        for (var i = 0, l = children.length; i < l; i++) {
          child = children[i];
          column = child.getLayoutProperties().column;
          columnChildren[column] = child;
        }

        var menu = this.__getMenu__P_218_0(children[0]);

        var columns = menu.getColumnSizes();
        var spacing = menu.getSpacingX(); // stretch label column

        var neededWidth = qx.lang.Array.sum(columns) + spacing * (columns.length - 1);

        if (neededWidth < availWidth) {
          columns[1] += availWidth - neededWidth;
        }

        var left = padding.left,
            top = padding.top;
        var Util = qx.ui.layout.Util;

        for (var i = 0, l = columns.length; i < l; i++) {
          child = columnChildren[i];

          if (child) {
            var hint = child.getSizeHint();
            var childTop = top + Util.computeVerticalAlignOffset(child.getAlignY() || "middle", hint.height, availHeight, 0, 0);
            var offsetLeft = Util.computeHorizontalAlignOffset(child.getAlignX() || "left", hint.width, columns[i], child.getMarginLeft(), child.getMarginRight());
            child.renderLayout(left + offsetLeft, childTop, hint.width, hint.height);
          }

          if (columns[i] > 0) {
            left += columns[i] + spacing;
          }
        }
      },

      /**
       * Get the widget's menu
       *
       * @param widget {qx.ui.core.Widget} the widget to get the menu for
       * @return {qx.ui.menu.Menu} the menu
       */
      __getMenu__P_218_0: function __getMenu__P_218_0(widget) {
        while (!(widget instanceof qx.ui.menu.Menu)) {
          widget = widget.getLayoutParent();
        }

        return widget;
      },
      // overridden
      _computeSizeHint: function _computeSizeHint() {
        var children = this._getLayoutChildren();

        var neededHeight = 0;
        var neededWidth = 0;

        for (var i = 0, l = children.length; i < l; i++) {
          var hint = children[i].getSizeHint();
          neededWidth += hint.width;
          neededHeight = Math.max(neededHeight, hint.height);
        }

        return {
          width: neededWidth,
          height: neededHeight
        };
      }
    }
  });
  qx.ui.menu.ButtonLayout.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.menu.AbstractButton": {
        "construct": true,
        "require": true
      },
      "qx.ui.form.IBooleanForm": {
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
       * Sebastian Werner (wpbasti)
       * Fabian Jakobs (fjakobs)
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * Renders a special checkbox button inside a menu. The button behaves like
   * a normal {@link qx.ui.form.CheckBox} and shows a check icon when
   * checked; normally shows no icon when not checked (depends on the theme).
   */
  qx.Class.define("qx.ui.menu.CheckBox", {
    extend: qx.ui.menu.AbstractButton,
    implement: [qx.ui.form.IBooleanForm],

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param label {String} Initial label
     * @param menu {qx.ui.menu.Menu} Initial sub menu
     */
    construct: function construct(label, menu) {
      qx.ui.menu.AbstractButton.constructor.call(this); // ARIA attrs

      var contenEl = this.getContentElement();
      contenEl.setAttribute("role", "checkbox");
      contenEl.setAttribute("aria-checked", false); // Initialize with incoming arguments

      if (label != null) {
        // try to translate every time you create a checkbox [BUG #2699]
        if (label.translate) {
          this.setLabel(label.translate());
        } else {
          this.setLabel(label);
        }
      }

      if (menu != null) {
        this.setMenu(menu);
      }

      this.addListener("execute", this._onExecute, this);
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      // overridden
      appearance: {
        refine: true,
        init: "menu-checkbox"
      },

      /** Whether the button is checked */
      value: {
        check: "Boolean",
        init: false,
        apply: "_applyValue",
        event: "changeValue",
        nullable: true
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    /* eslint-disable @qooxdoo/qx/no-refs-in-members */
    members: {
      // overridden (from MExecutable to keep the icon out of the binding)

      /**
       * @lint ignoreReferenceField(_bindableProperties)
       */
      _bindableProperties: ["enabled", "label", "toolTipText", "value", "menu"],
      // property apply
      _applyValue: function _applyValue(value, old) {
        value ? this.addState("checked") : this.removeState("checked"); // ARIA attrs

        this.getContentElement().setAttribute("aria-checked", Boolean(value));
      },

      /**
       * Handler for the execute event.
       *
       * @param e {qx.event.type.Event} The execute event.
       */
      _onExecute: function _onExecute(e) {
        this.toggleValue();
      }
    }
  });
  qx.ui.menu.CheckBox.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.menu.CheckBox": {
        "construct": true,
        "require": true
      },
      "qx.ui.table.IColumnMenuItem": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2009 Derrell Lipman
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Derrell Lipman (derrell)
  
  ************************************************************************ */

  /**
   * A menu item.
   */
  qx.Class.define("qx.ui.table.columnmenu.MenuItem", {
    extend: qx.ui.menu.CheckBox,
    implement: qx.ui.table.IColumnMenuItem,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * Create a new instance of an item for insertion into the table column
     * visibility menu.
     *
     * @param text {String}
     *   Text for the menu item, most typically the name of the column in the
     *   table.
     */
    construct: function construct(text) {
      qx.ui.menu.CheckBox.constructor.call(this, text); // Two way binding this.columnVisible <--> this.value

      this.bind("value", this, "columnVisible");
      this.bind("columnVisible", this, "value");
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      columnVisible: {
        check: "Boolean",
        init: true,
        event: "changeColumnVisible"
      }
    }
  });
  qx.ui.table.columnmenu.MenuItem.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.menu.AbstractButton": {
        "construct": true,
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
       * Sebastian Werner (wpbasti)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * The real menu button class which supports a command and an icon. All
   * other features are inherited from the {@link qx.ui.menu.AbstractButton}
   * class.
   */
  qx.Class.define("qx.ui.menu.Button", {
    extend: qx.ui.menu.AbstractButton,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param label {String} Initial label
     * @param icon {String} Initial icon
     * @param command {qx.ui.command.Command} Initial command (shortcut)
     * @param menu {qx.ui.menu.Menu} Initial sub menu
     */
    construct: function construct(label, icon, command, menu) {
      qx.ui.menu.AbstractButton.constructor.call(this); // ARIA attrs

      this.getContentElement().setAttribute("role", "button"); // Initialize with incoming arguments

      if (label != null) {
        this.setLabel(label);
      }

      if (icon != null) {
        this.setIcon(icon);
      }

      if (command != null) {
        this.setCommand(command);
      }

      if (menu != null) {
        this.setMenu(menu);
      }
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      // overridden
      appearance: {
        refine: true,
        init: "menu-button"
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      /*
      ---------------------------------------------------------------------------
        EVENT HANDLER
      ---------------------------------------------------------------------------
      */
      // overridden
      _onTap: function _onTap(e) {
        if (e.isLeftPressed() && this.getMenu()) {
          this.execute(); // don't close menus if the button is a sub menu button

          this.getMenu().open();
          return;
        }

        qx.ui.menu.Button.superclass.prototype._onTap.call(this, e);
      }
    }
  });
  qx.ui.menu.Button.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.Widget": {
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
       * Sebastian Werner (wpbasti)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * This widget draws a separator line between two instances of
   * {@link qx.ui.menu.AbstractButton} and is inserted into the
   * {@link qx.ui.menu.Menu}.
   *
   * For convenience reasons there is also
   * a method {@link qx.ui.menu.Menu#addSeparator} to append instances
   * of this class to the menu.
   */
  qx.Class.define("qx.ui.menu.Separator", {
    extend: qx.ui.core.Widget,

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      // overridden
      appearance: {
        refine: true,
        init: "menu-separator"
      },
      // overridden
      anonymous: {
        refine: true,
        init: true
      }
    }
  });
  qx.ui.menu.Separator.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.container.Composite": {
        "construct": true,
        "require": true
      },
      "qx.ui.layout.Grow": {
        "construct": true
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
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * Clipping area for the table header and table pane.
   */
  qx.Class.define("qx.ui.table.pane.Clipper", {
    extend: qx.ui.container.Composite,
    construct: function construct() {
      qx.ui.container.Composite.constructor.call(this, new qx.ui.layout.Grow());
      this.setMinWidth(0);
    },
    members: {
      /**
       * Scrolls the element's content to the given left coordinate
       *
       * @param value {Integer} The vertical position to scroll to.
       */
      scrollToX: function scrollToX(value) {
        this.getContentElement().scrollToX(value, false);
      },

      /**
       * Scrolls the element's content to the given top coordinate
       *
       * @param value {Integer} The horizontal position to scroll to.
       */
      scrollToY: function scrollToY(value) {
        this.getContentElement().scrollToY(value, true);
      }
    }
  });
  qx.ui.table.pane.Clipper.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.event.type.Pointer": {
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
       * David Perez Carmona (david-perez)
  
  ************************************************************************ */

  /**
   * A cell event instance contains all data for pointer events related to cells in
   * a table.
   **/
  qx.Class.define("qx.ui.table.pane.CellEvent", {
    extend: qx.event.type.Pointer,

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /** The table row of the event target */
      row: {
        check: "Integer",
        nullable: true
      },

      /** The table column of the event target */
      column: {
        check: "Integer",
        nullable: true
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      /*
       *****************************************************************************
          CONSTRUCTOR
       *****************************************************************************
       */

      /**
       * Initialize the event
       *
       * @param scroller {qx.ui.table.pane.Scroller} The tables pane scroller
       * @param me {qx.event.type.Pointer} The original pointer event
       * @param row {Integer?null} The cell's row index
       * @param column {Integer?null} The cell's column index
       */
      init: function init(scroller, me, row, column) {
        me.clone(this);
        this.setBubbles(false);

        if (row != null) {
          this.setRow(row);
        } else {
          this.setRow(scroller._getRowForPagePos(this.getDocumentLeft(), this.getDocumentTop()));
        }

        if (column != null) {
          this.setColumn(column);
        } else {
          this.setColumn(scroller._getColumnForPageX(this.getDocumentLeft()));
        }
      },
      // overridden
      clone: function clone(embryo) {
        var clone = qx.ui.table.pane.CellEvent.superclass.prototype.clone.call(this, embryo);
        clone.set({
          row: this.getRow(),
          column: this.getColumn()
        });
        return clone;
      }
    }
  });
  qx.ui.table.pane.CellEvent.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
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
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * This mixin redirects the layout manager to a child widget of the
   * including class. This is e.g. used in {@link qx.ui.window.Window} to configure
   * the layout manager of the window pane instead of the window directly.
   *
   * The including class must implement the method <code>getChildrenContainer</code>,
   * which has to return the widget, to which the layout should be set.
   */
  qx.Mixin.define("qx.ui.core.MRemoteLayoutHandling", {
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      /**
       * Set a layout manager for the widget. A a layout manager can only be connected
       * with one widget. Reset the connection with a previous widget first, if you
       * like to use it in another widget instead.
       *
       * @param layout {qx.ui.layout.Abstract} The new layout or
       *     <code>null</code> to reset the layout.
       */
      setLayout: function setLayout(layout) {
        this.getChildrenContainer().setLayout(layout);
      },

      /**
       * Get the widget's layout manager.
       *
       * @return {qx.ui.layout.Abstract} The widget's layout manager
       */
      getLayout: function getLayout() {
        return this.getChildrenContainer().getLayout();
      }
    }
  });
  qx.ui.core.MRemoteLayoutHandling.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "qx.event.Registration": {
        "construct": true
      },
      "qx.event.handler.DragDrop": {
        "construct": true
      },
      "qx.ui.core.Widget": {},
      "qx.core.Init": {},
      "qx.lang.Object": {},
      "qx.core.ObjectRegistry": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2007 David Pérez Carmona
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * David Perez Carmona (david-perez)
       * Sebastian Werner (wpbasti)
       * Fabian Jakobs (fjakobs)
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * Provides resizing behavior to any widget.
   */
  qx.Mixin.define("qx.ui.core.MResizable", {
    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      // Register listeners to the content
      var content = this.getContentElement();
      content.addListener("pointerdown", this.__onResizePointerDown__P_215_0, this, true);
      content.addListener("pointerup", this.__onResizePointerUp__P_215_1, this);
      content.addListener("pointermove", this.__onResizePointerMove__P_215_2, this);
      content.addListener("pointerout", this.__onResizePointerOut__P_215_3, this);
      content.addListener("losecapture", this.__onResizeLoseCapture__P_215_4, this); // Get a reference of the drag and drop handler

      var domElement = content.getDomElement();

      if (domElement == null) {
        domElement = window;
      }

      this.__dragDropHandler__P_215_5 = qx.event.Registration.getManager(domElement).getHandler(qx.event.handler.DragDrop);
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /** Whether the top edge is resizable */
      resizableTop: {
        check: "Boolean",
        init: true
      },

      /** Whether the right edge is resizable */
      resizableRight: {
        check: "Boolean",
        init: true
      },

      /** Whether the bottom edge is resizable */
      resizableBottom: {
        check: "Boolean",
        init: true
      },

      /** Whether the left edge is resizable */
      resizableLeft: {
        check: "Boolean",
        init: true
      },

      /**
       * Property group to configure the resize behaviour for all edges at once
       */
      resizable: {
        group: ["resizableTop", "resizableRight", "resizableBottom", "resizableLeft"],
        mode: "shorthand"
      },

      /** The tolerance to activate resizing */
      resizeSensitivity: {
        check: "Integer",
        init: 5
      },

      /** Whether a frame replacement should be used during the resize sequence */
      useResizeFrame: {
        check: "Boolean",
        init: true
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    /* eslint-disable @qooxdoo/qx/no-refs-in-members */
    members: {
      __dragDropHandler__P_215_5: null,
      __resizeFrame__P_215_6: null,
      __resizeActive__P_215_7: null,
      __resizeLeft__P_215_8: null,
      __resizeTop__P_215_9: null,
      __resizeStart__P_215_10: null,
      __resizeRange__P_215_11: null,
      RESIZE_TOP: 1,
      RESIZE_BOTTOM: 2,
      RESIZE_LEFT: 4,
      RESIZE_RIGHT: 8,

      /*
      ---------------------------------------------------------------------------
        CORE FEATURES
      ---------------------------------------------------------------------------
      */

      /**
       * Get the widget, which draws the resize/move frame. The resize frame is
       * shared by all widgets and is added to the root widget.
       *
       * @return {qx.ui.core.Widget} The resize frame
       */
      _getResizeFrame: function _getResizeFrame() {
        var frame = this.__resizeFrame__P_215_6;

        if (!frame) {
          frame = this.__resizeFrame__P_215_6 = new qx.ui.core.Widget();
          frame.setAppearance("resize-frame");
          frame.exclude();
          qx.core.Init.getApplication().getRoot().add(frame);
        }

        return frame;
      },

      /**
       * Creates, shows and syncs the frame with the widget.
       */
      __showResizeFrame__P_215_12: function __showResizeFrame__P_215_12() {
        var location = this.getContentLocation();

        var frame = this._getResizeFrame();

        frame.setUserBounds(location.left, location.top, location.right - location.left, location.bottom - location.top);
        frame.show();
        frame.setZIndex(this.getZIndex() + 1);
      },

      /*
      ---------------------------------------------------------------------------
        RESIZE SUPPORT
      ---------------------------------------------------------------------------
      */

      /**
       * Computes the new boundaries at each interval
       * of the resize sequence.
       *
       * @param e {qx.event.type.Pointer} Last pointer event
       * @return {Map} A map with the computed boundaries
       */
      __computeResizeResult__P_215_13: function __computeResizeResult__P_215_13(e) {
        // Detect mode
        var resizeActive = this.__resizeActive__P_215_7; // Read size hint

        var hint = this.getSizeHint();
        var range = this.__resizeRange__P_215_11; // Read original values

        var start = this.__resizeStart__P_215_10;
        var width = start.width;
        var height = start.height;
        var left = start.left;
        var top = start.top;
        var diff;

        if (resizeActive & this.RESIZE_TOP || resizeActive & this.RESIZE_BOTTOM) {
          diff = Math.max(range.top, Math.min(range.bottom, e.getDocumentTop())) - this.__resizeTop__P_215_9;

          if (resizeActive & this.RESIZE_TOP) {
            height -= diff;
          } else {
            height += diff;
          }

          if (height < hint.minHeight) {
            height = hint.minHeight;
          } else if (height > hint.maxHeight) {
            height = hint.maxHeight;
          }

          if (resizeActive & this.RESIZE_TOP) {
            top += start.height - height;
          }
        }

        if (resizeActive & this.RESIZE_LEFT || resizeActive & this.RESIZE_RIGHT) {
          diff = Math.max(range.left, Math.min(range.right, e.getDocumentLeft())) - this.__resizeLeft__P_215_8;

          if (resizeActive & this.RESIZE_LEFT) {
            width -= diff;
          } else {
            width += diff;
          }

          if (width < hint.minWidth) {
            width = hint.minWidth;
          } else if (width > hint.maxWidth) {
            width = hint.maxWidth;
          }

          if (resizeActive & this.RESIZE_LEFT) {
            left += start.width - width;
          }
        }

        return {
          // left and top of the visible widget
          viewportLeft: left,
          viewportTop: top,
          parentLeft: start.bounds.left + left - start.left,
          parentTop: start.bounds.top + top - start.top,
          // dimensions of the visible widget
          width: width,
          height: height
        };
      },

      /**
       * @type {Map} Maps internal states to cursor symbols to use
       *
       * @lint ignoreReferenceField(__resizeCursors)
       */
      __resizeCursors__P_215_14: {
        1: "n-resize",
        2: "s-resize",
        4: "w-resize",
        8: "e-resize",
        5: "nw-resize",
        6: "sw-resize",
        9: "ne-resize",
        10: "se-resize"
      },

      /**
       * Updates the internally stored resize mode
       *
       * @param e {qx.event.type.Pointer} Last pointer event
       */
      __computeResizeMode__P_215_15: function __computeResizeMode__P_215_15(e) {
        var location = this.getContentLocation();
        var pointerTolerance = this.getResizeSensitivity();
        var pointerLeft = e.getDocumentLeft();
        var pointerTop = e.getDocumentTop();

        var resizeActive = this.__computeResizeActive__P_215_16(location, pointerLeft, pointerTop, pointerTolerance); // check again in case we have a corner [BUG #1200]


        if (resizeActive > 0) {
          // this is really a | (or)!
          resizeActive = resizeActive | this.__computeResizeActive__P_215_16(location, pointerLeft, pointerTop, pointerTolerance * 2);
        }

        this.__resizeActive__P_215_7 = resizeActive;
      },

      /**
       * Internal helper for computing the proper resize action based on the
       * given parameters.
       *
       * @param location {Map} The current location of the widget.
       * @param pointerLeft {Integer} The left position of the pointer.
       * @param pointerTop {Integer} The top position of the pointer.
       * @param pointerTolerance {Integer} The desired distance to the edge.
       * @return {Integer} The resize active number.
       */
      __computeResizeActive__P_215_16: function __computeResizeActive__P_215_16(location, pointerLeft, pointerTop, pointerTolerance) {
        var resizeActive = 0; // TOP

        if (this.getResizableTop() && Math.abs(location.top - pointerTop) < pointerTolerance && pointerLeft > location.left - pointerTolerance && pointerLeft < location.right + pointerTolerance) {
          resizeActive += this.RESIZE_TOP; // BOTTOM
        } else if (this.getResizableBottom() && Math.abs(location.bottom - pointerTop) < pointerTolerance && pointerLeft > location.left - pointerTolerance && pointerLeft < location.right + pointerTolerance) {
          resizeActive += this.RESIZE_BOTTOM;
        } // LEFT


        if (this.getResizableLeft() && Math.abs(location.left - pointerLeft) < pointerTolerance && pointerTop > location.top - pointerTolerance && pointerTop < location.bottom + pointerTolerance) {
          resizeActive += this.RESIZE_LEFT; // RIGHT
        } else if (this.getResizableRight() && Math.abs(location.right - pointerLeft) < pointerTolerance && pointerTop > location.top - pointerTolerance && pointerTop < location.bottom + pointerTolerance) {
          resizeActive += this.RESIZE_RIGHT;
        }

        return resizeActive;
      },

      /*
      ---------------------------------------------------------------------------
        RESIZE EVENT HANDLERS
      ---------------------------------------------------------------------------
      */

      /**
       * Event handler for the pointer down event
       *
       * @param e {qx.event.type.Pointer} The pointer event instance
       */
      __onResizePointerDown__P_215_0: function __onResizePointerDown__P_215_0(e) {
        // Check for active resize
        if (!this.__resizeActive__P_215_7 || !this.getEnabled() || e.getPointerType() == "touch") {
          return;
        } // Add resize state


        this.addState("resize"); // Store pointer coordinates

        this.__resizeLeft__P_215_8 = e.getDocumentLeft();
        this.__resizeTop__P_215_9 = e.getDocumentTop(); // Cache bounds

        var location = this.getContentLocation();
        var bounds = this.getBounds();
        this.__resizeStart__P_215_10 = {
          top: location.top,
          left: location.left,
          width: location.right - location.left,
          height: location.bottom - location.top,
          bounds: qx.lang.Object.clone(bounds)
        }; // Compute range

        var parent = this.getLayoutParent();
        var parentLocation = parent.getContentLocation();
        var parentBounds = parent.getBounds();
        this.__resizeRange__P_215_11 = {
          left: parentLocation.left,
          top: parentLocation.top,
          right: parentLocation.left + parentBounds.width,
          bottom: parentLocation.top + parentBounds.height
        }; // Show frame if configured this way

        if (this.getUseResizeFrame()) {
          this.__showResizeFrame__P_215_12();
        } // Enable capturing


        this.capture(); // Stop event

        e.stop();
      },

      /**
       * Event handler for the pointer up event
       *
       * @param e {qx.event.type.Pointer} The pointer event instance
       */
      __onResizePointerUp__P_215_1: function __onResizePointerUp__P_215_1(e) {
        // Check for active resize
        if (!this.hasState("resize") || !this.getEnabled() || e.getPointerType() == "touch") {
          return;
        } // Hide frame afterwards


        if (this.getUseResizeFrame()) {
          this._getResizeFrame().exclude();
        } // Compute bounds


        var bounds = this.__computeResizeResult__P_215_13(e); // Sync with widget


        this.setWidth(bounds.width);
        this.setHeight(bounds.height); // Update coordinate in canvas

        if (this.getResizableLeft() || this.getResizableTop()) {
          this.setLayoutProperties({
            left: bounds.parentLeft,
            top: bounds.parentTop
          });
        } // Clear mode


        this.__resizeActive__P_215_7 = 0; // Remove resize state

        this.removeState("resize"); // Reset cursor

        this.resetCursor();
        this.getApplicationRoot().resetGlobalCursor(); // Disable capturing

        this.releaseCapture();
        e.stopPropagation();
      },

      /**
       * Event listener for <code>losecapture</code> event.
       *
       * @param e {qx.event.type.Event} Lose capture event
       */
      __onResizeLoseCapture__P_215_4: function __onResizeLoseCapture__P_215_4(e) {
        // Check for active resize
        if (!this.__resizeActive__P_215_7) {
          return;
        } // Reset cursor


        this.resetCursor();
        this.getApplicationRoot().resetGlobalCursor(); // Remove drag state

        this.removeState("move"); // Hide frame afterwards

        if (this.getUseResizeFrame()) {
          this._getResizeFrame().exclude();
        }
      },

      /**
       * Event handler for the pointer move event
       *
       * @param e {qx.event.type.Pointer} The pointer event instance
       */
      __onResizePointerMove__P_215_2: function __onResizePointerMove__P_215_2(e) {
        if (!this.getEnabled() || e.getPointerType() == "touch") {
          return;
        }

        if (this.hasState("resize")) {
          var bounds = this.__computeResizeResult__P_215_13(e); // Update widget


          if (this.getUseResizeFrame()) {
            // Sync new bounds to frame
            var frame = this._getResizeFrame();

            frame.setUserBounds(bounds.viewportLeft, bounds.viewportTop, bounds.width, bounds.height);
          } else {
            // Update size
            this.setWidth(bounds.width);
            this.setHeight(bounds.height); // Update coordinate in canvas

            if (this.getResizableLeft() || this.getResizableTop()) {
              this.setLayoutProperties({
                left: bounds.parentLeft,
                top: bounds.parentTop
              });
            }
          } // Full stop for event


          e.stopPropagation();
        } else if (!this.hasState("maximized") && !this.__dragDropHandler__P_215_5.isSessionActive()) {
          this.__computeResizeMode__P_215_15(e);

          var resizeActive = this.__resizeActive__P_215_7;
          var root = this.getApplicationRoot();

          if (resizeActive) {
            var cursor = this.__resizeCursors__P_215_14[resizeActive];
            this.setCursor(cursor);
            root.setGlobalCursor(cursor);
          } else if (this.getCursor()) {
            this.resetCursor();
            root.resetGlobalCursor();
          }
        }
      },

      /**
       * Event handler for the pointer out event
       *
       * @param e {qx.event.type.Pointer} The pointer event instance
       */
      __onResizePointerOut__P_215_3: function __onResizePointerOut__P_215_3(e) {
        if (e.getPointerType() == "touch") {
          return;
        } // When the pointer left the window and resizing is not yet
        // active we must be sure to (especially) reset the global
        // cursor.


        if (this.getCursor() && !this.hasState("resize")) {
          this.resetCursor();
          this.getApplicationRoot().resetGlobalCursor();
        }
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      if (this.getCursor()) {
        this.getApplicationRoot().resetGlobalCursor();
      }

      if (this.__resizeFrame__P_215_6 != null && !qx.core.ObjectRegistry.inShutDown) {
        this.__resizeFrame__P_215_6.destroy();

        this.__resizeFrame__P_215_6 = null;
      }

      this.__dragDropHandler__P_215_5 = null;
    }
  });
  qx.ui.core.MResizable.$$dbClassInfo = $$dbClassInfo;
})();

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
      __moveHandle__P_216_0: null,
      __moveFrame__P_216_1: null,
      __dragRange__P_216_2: null,
      __dragLeft__P_216_3: null,
      __dragTop__P_216_4: null,
      __parentLeft__P_216_5: null,
      __parentTop__P_216_6: null,
      __blockerAdded__P_216_7: false,
      __oldBlockerColor__P_216_8: null,
      __oldBlockerOpacity__P_216_9: 0,

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
        if (this.__moveHandle__P_216_0) {
          throw new Error("The move handle could not be redefined!");
        }

        this.__moveHandle__P_216_0 = widget;
        widget.addListener("pointerdown", this._onMovePointerDown, this);
        widget.addListener("pointerup", this._onMovePointerUp, this);
        widget.addListener("pointermove", this._onMovePointerMove, this);
        widget.addListener("losecapture", this.__onMoveLoseCapture__P_216_10, this);
      },

      /**
       * Get the widget, which draws the resize/move frame.
       *
       * @return {qx.ui.core.Widget} The resize frame
       */
      __getMoveFrame__P_216_11: function __getMoveFrame__P_216_11() {
        var frame = this.__moveFrame__P_216_1;

        if (!frame) {
          frame = this.__moveFrame__P_216_1 = new qx.ui.core.Widget();
          frame.setAppearance("move-frame");
          frame.exclude();
          qx.core.Init.getApplication().getRoot().add(frame);
        }

        return frame;
      },

      /**
       * Creates, shows and syncs the frame with the widget.
       */
      __showMoveFrame__P_216_12: function __showMoveFrame__P_216_12() {
        var location = this.getContentLocation();
        var bounds = this.getBounds();

        var frame = this.__getMoveFrame__P_216_11();

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
      __computeMoveCoordinates__P_216_13: function __computeMoveCoordinates__P_216_13(e) {
        var range = this.__dragRange__P_216_2;
        var pointerLeft = Math.max(range.left, Math.min(range.right, e.getDocumentLeft()));
        var pointerTop = Math.max(range.top, Math.min(range.bottom, e.getDocumentTop()));
        var viewportLeft = this.__dragLeft__P_216_3 + pointerLeft;
        var viewportTop = this.__dragTop__P_216_4 + pointerTop;
        return {
          viewportLeft: parseInt(viewportLeft, 10),
          viewportTop: parseInt(viewportTop, 10),
          parentLeft: parseInt(viewportLeft - this.__parentLeft__P_216_5, 10),
          parentTop: parseInt(viewportTop - this.__parentTop__P_216_6, 10)
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
            this.__oldBlockerColor__P_216_8 = parent.getBlockerColor();
            this.__oldBlockerOpacity__P_216_9 = parent.getBlockerOpacity();
            parent.setBlockerColor(null);
            parent.setBlockerOpacity(1);
            parent.blockContent(this.getZIndex() - 1);
            this.__blockerAdded__P_216_7 = true;
          }
        }

        this.__dragRange__P_216_2 = {
          left: parentLocation.left,
          top: parentLocation.top,
          right: parentLocation.left + parentBounds.width,
          bottom: parentLocation.top + parentBounds.height
        }; // Compute drag positions

        var widgetLocation = this.getContentLocation();
        this.__parentLeft__P_216_5 = parentLocation.left;
        this.__parentTop__P_216_6 = parentLocation.top;
        this.__dragLeft__P_216_3 = widgetLocation.left - e.getDocumentLeft();
        this.__dragTop__P_216_4 = widgetLocation.top - e.getDocumentTop(); // Add state

        this.addState("move"); // Enable capturing

        this.__moveHandle__P_216_0.capture(); // Enable drag frame


        if (this.getUseMoveFrame()) {
          this.__showMoveFrame__P_216_12();
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


        var coords = this.__computeMoveCoordinates__P_216_13(e);

        if (this.getUseMoveFrame()) {
          this.__getMoveFrame__P_216_11().setDomPosition(coords.viewportLeft, coords.viewportTop);
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
          if (this.__blockerAdded__P_216_7) {
            parent.unblock();
            parent.setBlockerColor(this.__oldBlockerColor__P_216_8);
            parent.setBlockerOpacity(this.__oldBlockerOpacity__P_216_9);
            this.__oldBlockerColor__P_216_8 = null;
            this.__oldBlockerOpacity__P_216_9 = 0;
            this.__blockerAdded__P_216_7 = false;
          }
        } // Disable capturing


        this.__moveHandle__P_216_0.releaseCapture(); // Apply them to the layout


        var coords = this.__computeMoveCoordinates__P_216_13(e);

        var insets = this.getLayoutParent().getInsets();
        this.setLayoutProperties({
          left: coords.parentLeft - (insets.left || 0),
          top: coords.parentTop - (insets.top || 0)
        }); // Hide frame afterwards

        if (this.getUseMoveFrame()) {
          this.__getMoveFrame__P_216_11().exclude();
        }

        e.stopPropagation();
      },

      /**
       * Event listener for <code>losecapture</code> event.
       *
       * @param e {qx.event.type.Event} Lose capture event
       */
      __onMoveLoseCapture__P_216_10: function __onMoveLoseCapture__P_216_10(e) {
        // Check for active move
        if (!this.hasState("move")) {
          return;
        } // Remove drag state


        this.removeState("move"); // Hide frame afterwards

        if (this.getUseMoveFrame()) {
          this.__getMoveFrame__P_216_11().exclude();
        }
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this._disposeObjects("__moveFrame__P_216_1", "__moveHandle__P_216_0");

      this.__dragRange__P_216_2 = null;
    }
  });
  qx.ui.core.MMovable.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Interface": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.window.IDesktop": {},
      "qx.ui.window.Window": {}
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
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * Required interface for all window manager.
   *
   * Window manager handle the z-order and modality blocking of windows managed
   * by the connected desktop {@link qx.ui.window.IDesktop}.
   */
  qx.Interface.define("qx.ui.window.IWindowManager", {
    members: {
      /**
       * Connect the window manager to the window desktop
       *
       * @param desktop {qx.ui.window.IDesktop|null} The connected desktop or null
       */
      setDesktop: function setDesktop(desktop) {
        if (desktop !== null) {
          this.assertInterface(desktop, qx.ui.window.IDesktop);
        }
      },

      /**
       * Inform the window manager about a new active window
       *
       * @param active {qx.ui.window.Window} new active window
       * @param oldActive {qx.ui.window.Window} old active window
       */
      changeActiveWindow: function changeActiveWindow(active, oldActive) {},

      /**
       * Update the window order and modality blocker
       */
      updateStack: function updateStack() {},

      /**
       * Ask the manager to bring a window to the front.
       *
       * @param win {qx.ui.window.Window} window to bring to front
       */
      bringToFront: function bringToFront(win) {
        this.assertInstance(win, qx.ui.window.Window);
      },

      /**
       * Ask the manager to send a window to the back.
       *
       * @param win {qx.ui.window.Window} window to sent to back
       */
      sendToBack: function sendToBack(win) {
        this.assertInstance(win, qx.ui.window.Window);
      }
    }
  });
  qx.ui.window.IWindowManager.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "require": true
      },
      "qx.ui.window.IWindowManager": {
        "require": true
      },
      "qx.ui.core.queue.Widget": {},
      "qx.lang.Array": {}
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
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * The default window manager implementation
   */
  qx.Class.define("qx.ui.window.Manager", {
    extend: qx.core.Object,
    implement: qx.ui.window.IWindowManager,

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __desktop__P_217_0: null,
      // interface implementation
      setDesktop: function setDesktop(desktop) {
        this.__desktop__P_217_0 = desktop;

        if (desktop) {
          this.updateStack();
        } else {
          // the window manager should be removed
          // from the widget queue if the desktop
          // was set to null
          qx.ui.core.queue.Widget.remove(this);
        }
      },

      /**
       * Returns the connected desktop
       *
       * @return {qx.ui.window.IDesktop} The desktop
       */
      getDesktop: function getDesktop() {
        return this.__desktop__P_217_0;
      },
      // interface implementation
      changeActiveWindow: function changeActiveWindow(active, oldActive) {
        if (active) {
          this.bringToFront(active);
          active.setActive(true);
        }

        if (oldActive) {
          oldActive.resetActive();
        }
      },

      /** @type {Integer} Minimum zIndex to start with for windows */
      _minZIndex: 1e5,
      // interface implementation
      updateStack: function updateStack() {
        // we use the widget queue to do the sorting one before the queues are
        // flushed. The queue will call "syncWidget"
        qx.ui.core.queue.Widget.add(this);
      },

      /**
       * This method is called during the flush of the
       * {@link qx.ui.core.queue.Widget widget queue}.
       */
      syncWidget: function syncWidget() {
        this.__desktop__P_217_0.forceUnblock();

        var windows = this.__desktop__P_217_0.getWindows(); // z-index for all three window kinds


        var zIndex = this._minZIndex;
        var zIndexOnTop = zIndex + windows.length * 2;
        var zIndexModal = zIndex + windows.length * 4; // marker if there is an active window

        var active = null;

        for (var i = 0, l = windows.length; i < l; i++) {
          var win = windows[i]; // ignore invisible windows

          if (!win.isVisible()) {
            continue;
          } // take the first window as active window


          active = active || win; // We use only every second z index to easily insert a blocker between
          // two windows
          // Modal Windows stays on top of AlwaysOnTop Windows, which stays on
          // top of Normal Windows.

          if (win.isModal()) {
            win.setZIndex(zIndexModal);

            this.__desktop__P_217_0.blockContent(zIndexModal - 1);

            zIndexModal += 2; //just activate it if it's modal

            active = win;
          } else if (win.isAlwaysOnTop()) {
            win.setZIndex(zIndexOnTop);
            zIndexOnTop += 2;
          } else {
            win.setZIndex(zIndex);
            zIndex += 2;
          } // store the active window


          if (!active.isModal() && win.isActive() || win.getZIndex() > active.getZIndex()) {
            active = win;
          }
        } //set active window or null otherwise


        this.__desktop__P_217_0.setActiveWindow(active);
      },
      // interface implementation
      bringToFront: function bringToFront(win) {
        var windows = this.__desktop__P_217_0.getWindows();

        var removed = qx.lang.Array.remove(windows, win);

        if (removed) {
          windows.push(win);
          this.updateStack();
        }
      },
      // interface implementation
      sendToBack: function sendToBack(win) {
        var windows = this.__desktop__P_217_0.getWindows();

        var removed = qx.lang.Array.remove(windows, win);

        if (removed) {
          windows.unshift(win);
          this.updateStack();
        }
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this._disposeObjects("__desktop__P_217_0");
    }
  });
  qx.ui.window.Manager.$$dbClassInfo = $$dbClassInfo;
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
      "qx.ui.core.Widget": {
        "construct": true,
        "require": true
      },
      "qx.ui.core.MRemoteChildrenHandling": {
        "require": true
      },
      "qx.ui.core.MRemoteLayoutHandling": {
        "require": true
      },
      "qx.ui.core.MResizable": {
        "require": true
      },
      "qx.ui.core.MMovable": {
        "require": true
      },
      "qx.ui.core.MContentPadding": {
        "require": true
      },
      "qx.ui.layout.VBox": {
        "construct": true
      },
      "qx.core.Init": {
        "construct": true
      },
      "qx.ui.core.FocusHandler": {
        "construct": true
      },
      "qx.ui.window.Manager": {
        "require": true
      },
      "qx.ui.window.IDesktop": {},
      "qx.ui.container.Composite": {},
      "qx.ui.layout.HBox": {},
      "qx.ui.basic.Label": {},
      "qx.ui.layout.Grid": {},
      "qx.ui.basic.Image": {},
      "qx.ui.form.Button": {},
      "qx.event.type.Event": {},
      "qx.bom.client.Engine": {
        "require": true
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "engine.name": {
          "className": "qx.bom.client.Engine"
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
       * Christian Hagendorn (chris_schmidt)
  
  ************************************************************************ */

  /**
   * A window widget
   *
   * More information can be found in the package description {@link qx.ui.window}.
   *
   * @childControl statusbar {qx.ui.container.Composite} statusbar container which shows the statusbar text
   * @childControl statusbar-text {qx.ui.basic.Label} text of the statusbar
   * @childControl pane {qx.ui.container.Composite} window pane which holds the content
   * @childControl captionbar {qx.ui.container.Composite} Container for all widgets inside the captionbar
   * @childControl icon {qx.ui.basic.Image} icon at the left of the captionbar
   * @childControl title {qx.ui.basic.Label} caption of the window
   * @childControl minimize-button {qx.ui.form.Button} button to minimize the window
   * @childControl restore-button {qx.ui.form.Button} button to restore the window
   * @childControl maximize-button {qx.ui.form.Button} button to maximize the window
   * @childControl close-button {qx.ui.form.Button} button to close the window
   */
  qx.Class.define("qx.ui.window.Window", {
    extend: qx.ui.core.Widget,
    include: [qx.ui.core.MRemoteChildrenHandling, qx.ui.core.MRemoteLayoutHandling, qx.ui.core.MResizable, qx.ui.core.MMovable, qx.ui.core.MContentPadding],

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param caption {String?} The caption text
     * @param icon {String?} The URL of the caption bar icon
     */
    construct: function construct(caption, icon) {
      qx.ui.core.Widget.constructor.call(this); // configure internal layout

      this._setLayout(new qx.ui.layout.VBox()); // force creation of captionbar


      this._createChildControl("captionbar");

      this._createChildControl("pane"); // apply constructor parameters


      if (icon != null) {
        this.setIcon(icon);
      }

      if (caption != null) {
        this.setCaption(caption);
      } // Update captionbar


      this._updateCaptionBar(); // Activation listener


      this.addListener("pointerdown", this._onWindowPointerDown, this, true); // Focusout listener

      this.addListener("focusout", this._onWindowFocusOut, this); // Automatically add to application root.

      qx.core.Init.getApplication().getRoot().add(this); // Initialize visibility

      this.initVisibility(); // Register as root for the focus handler

      qx.ui.core.FocusHandler.getInstance().addRoot(this); // Change the resize frames appearance

      this._getResizeFrame().setAppearance("window-resize-frame"); // ARIA attrs


      this.getContentElement().setAttribute("role", "dialog");
      this.addAriaLabelledBy(this.getChildControl("title"));
      this.addAriaDescribedBy(this.getChildControl("statusbar-text"));
    },

    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */
    statics: {
      /** @type {Class} The default window manager class. */
      DEFAULT_MANAGER_CLASS: qx.ui.window.Manager
    },

    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */
    events: {
      /**
       * Fired before the window is closed.
       *
       * The close action can be prevented by calling
       * {@link qx.event.type.Event#preventDefault} on the event object
       */
      beforeClose: "qx.event.type.Event",

      /** Fired if the window is closed */
      close: "qx.event.type.Event",

      /**
       * Fired before the window is minimize.
       *
       * The minimize action can be prevented by calling
       * {@link qx.event.type.Event#preventDefault} on the event object
       */
      beforeMinimize: "qx.event.type.Event",

      /** Fired if the window is minimized */
      minimize: "qx.event.type.Event",

      /**
       * Fired before the window is maximize.
       *
       * The maximize action can be prevented by calling
       * {@link qx.event.type.Event#preventDefault} on the event object
       */
      beforeMaximize: "qx.event.type.Event",

      /** Fired if the window is maximized */
      maximize: "qx.event.type.Event",

      /**
       * Fired before the window is restored from a minimized or maximized state.
       *
       * The restored action can be prevented by calling
       * {@link qx.event.type.Event#preventDefault} on the event object
       */
      beforeRestore: "qx.event.type.Event",

      /** Fired if the window is restored from a minimized or maximized state */
      restore: "qx.event.type.Event"
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /*
      ---------------------------------------------------------------------------
        INTERNAL OPTIONS
      ---------------------------------------------------------------------------
      */
      // overridden
      appearance: {
        refine: true,
        init: "window"
      },
      // overridden
      visibility: {
        refine: true,
        init: "excluded"
      },
      // overridden
      focusable: {
        refine: true,
        init: true
      },

      /**
       * If the window is active, only one window in a single qx.ui.window.Manager could
       *  have set this to true at the same time.
       */
      active: {
        check: "Boolean",
        init: false,
        apply: "_applyActive",
        event: "changeActive"
      },

      /*
      ---------------------------------------------------------------------------
        BASIC OPTIONS
      ---------------------------------------------------------------------------
      */

      /** Should the window be always on top */
      alwaysOnTop: {
        check: "Boolean",
        init: false,
        event: "changeAlwaysOnTop"
      },

      /** Should the window be modal (this disables minimize and maximize buttons) */
      modal: {
        check: "Boolean",
        init: false,
        event: "changeModal",
        apply: "_applyModal"
      },

      /** The text of the caption */
      caption: {
        apply: "_applyCaptionBarChange",
        event: "changeCaption",
        nullable: true
      },

      /** The icon of the caption */
      icon: {
        check: "String",
        nullable: true,
        apply: "_applyCaptionBarChange",
        event: "changeIcon",
        themeable: true
      },

      /** The text of the statusbar */
      status: {
        check: "String",
        nullable: true,
        apply: "_applyStatus",
        event: "changeStatus"
      },

      /*
      ---------------------------------------------------------------------------
        HIDE CAPTIONBAR FEATURES
      ---------------------------------------------------------------------------
      */

      /** Should the close button be shown */
      showClose: {
        check: "Boolean",
        init: true,
        apply: "_applyCaptionBarChange",
        themeable: true
      },

      /** Should the maximize button be shown */
      showMaximize: {
        check: "Boolean",
        init: true,
        apply: "_applyCaptionBarChange",
        themeable: true
      },

      /** Should the minimize button be shown */
      showMinimize: {
        check: "Boolean",
        init: true,
        apply: "_applyCaptionBarChange",
        themeable: true
      },

      /*
      ---------------------------------------------------------------------------
        DISABLE CAPTIONBAR FEATURES
      ---------------------------------------------------------------------------
      */

      /** Should the user have the ability to close the window */
      allowClose: {
        check: "Boolean",
        init: true,
        apply: "_applyCaptionBarChange"
      },

      /** Should the user have the ability to maximize the window */
      allowMaximize: {
        check: "Boolean",
        init: true,
        apply: "_applyCaptionBarChange"
      },

      /** Should the user have the ability to minimize the window */
      allowMinimize: {
        check: "Boolean",
        init: true,
        apply: "_applyCaptionBarChange"
      },

      /*
      ---------------------------------------------------------------------------
        STATUSBAR CONFIG
      ---------------------------------------------------------------------------
      */

      /** Should the statusbar be shown */
      showStatusbar: {
        check: "Boolean",
        init: false,
        apply: "_applyShowStatusbar"
      },

      /*
      ---------------------------------------------------------------------------
        WHEN TO AUTOMATICALY CENTER
      ---------------------------------------------------------------------------
      */

      /** Whether this window should be automatically centered when it appears */
      centerOnAppear: {
        init: false,
        check: "Boolean",
        apply: "_applyCenterOnAppear"
      },

      /**
       * Whether this window should be automatically centered when its container
       * is resized.
       */
      centerOnContainerResize: {
        init: false,
        check: "Boolean",
        apply: "_applyCenterOnContainerResize"
      },

      /*
      ---------------------------------------------------------------------------
        CLOSE BEHAVIOR
      ---------------------------------------------------------------------------
      */

      /**
       * Should the window be automatically destroyed when it is closed.
       *
       * When false, closing the window behaves like hiding the window.
       *
       * When true, the window is removed from its container (the root), all
       * listeners are removed, the window's widgets are removed, and the window
       * is destroyed.
       *
       * NOTE: If any widgets that were added to this window require special
       * clean-up, you should listen on the 'close' event and remove and clean
       * up those widgets there.
       */
      autoDestroy: {
        check: "Boolean",
        init: false
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    /* eslint-disable @qooxdoo/qx/no-refs-in-members */
    members: {
      /** @type {Integer} Original top value before maximation had occurred */
      __restoredTop__P_210_0: null,

      /** @type {Integer} Original left value before maximation had occurred */
      __restoredLeft__P_210_1: null,

      /** @type {Integer} Listener ID for centering on appear */
      __centeringAppearId__P_210_2: null,

      /** @type {Integer} Listener ID for centering on resize */
      __centeringResizeId__P_210_3: null,

      /*
      ---------------------------------------------------------------------------
        WIDGET API
      ---------------------------------------------------------------------------
      */

      /**
       * The children container needed by the {@link qx.ui.core.MRemoteChildrenHandling}
       * mixin
       *
       * @return {qx.ui.container.Composite} pane sub widget
       */
      getChildrenContainer: function getChildrenContainer() {
        return this.getChildControl("pane");
      },
      // overridden

      /**
       * @lint ignoreReferenceField(_forwardStates)
       */
      _forwardStates: {
        active: true,
        maximized: true,
        showStatusbar: true,
        modal: true
      },
      // overridden
      setLayoutParent: function setLayoutParent(parent) {
        var oldParent;
        {
          parent && this.assertInterface(parent, qx.ui.window.IDesktop, "Windows can only be added to widgets, which implement the interface qx.ui.window.IDesktop. All root widgets implement this interface.");
        } // Before changing the parent, if there's a prior one, remove our resize
        // listener

        oldParent = this.getLayoutParent();

        if (oldParent && this.__centeringResizeId__P_210_3) {
          oldParent.removeListenerById(this.__centeringResizeId__P_210_3);
          this.__centeringResizeId__P_210_3 = null;
        } // Call the superclass


        qx.ui.window.Window.superclass.prototype.setLayoutParent.call(this, parent); // Re-add a listener for resize, if required

        if (parent && this.getCenterOnContainerResize()) {
          this.__centeringResizeId__P_210_3 = parent.addListener("resize", this.center, this);
        }
      },
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id, hash) {
        var control;

        switch (id) {
          case "statusbar":
            control = new qx.ui.container.Composite(new qx.ui.layout.HBox());

            this._add(control);

            control.add(this.getChildControl("statusbar-text"));
            break;

          case "statusbar-text":
            control = new qx.ui.basic.Label();
            control.setValue(this.getStatus());
            break;

          case "pane":
            control = new qx.ui.container.Composite();

            this._add(control, {
              flex: 1
            });

            break;

          case "captionbar":
            // captionbar
            var layout = new qx.ui.layout.Grid();
            layout.setRowFlex(0, 1);
            layout.setColumnFlex(1, 1);
            control = new qx.ui.container.Composite(layout);

            this._add(control); // captionbar events


            control.addListener("dbltap", this._onCaptionPointerDblTap, this); // register as move handle

            this._activateMoveHandle(control);

            break;

          case "icon":
            control = new qx.ui.basic.Image(this.getIcon());
            this.getChildControl("captionbar").add(control, {
              row: 0,
              column: 0
            });
            break;

          case "title":
            control = new qx.ui.basic.Label(this.getCaption());
            control.setWidth(0);
            control.setAllowGrowX(true);
            var captionBar = this.getChildControl("captionbar");
            captionBar.add(control, {
              row: 0,
              column: 1
            });
            break;

          case "minimize-button":
            control = new qx.ui.form.Button();
            control.setFocusable(false);
            control.addListener("execute", this._onMinimizeButtonTap, this);
            this.getChildControl("captionbar").add(control, {
              row: 0,
              column: 2
            });
            break;

          case "restore-button":
            control = new qx.ui.form.Button();
            control.setFocusable(false);
            control.addListener("execute", this._onRestoreButtonTap, this);
            this.getChildControl("captionbar").add(control, {
              row: 0,
              column: 3
            });
            break;

          case "maximize-button":
            control = new qx.ui.form.Button();
            control.setFocusable(false);
            control.addListener("execute", this._onMaximizeButtonTap, this);
            this.getChildControl("captionbar").add(control, {
              row: 0,
              column: 4
            });
            break;

          case "close-button":
            control = new qx.ui.form.Button();
            control.setFocusable(false);
            control.addListener("execute", this._onCloseButtonTap, this);
            this.getChildControl("captionbar").add(control, {
              row: 0,
              column: 6
            });
            break;
        }

        return control || qx.ui.window.Window.superclass.prototype._createChildControlImpl.call(this, id);
      },

      /*
      ---------------------------------------------------------------------------
        CAPTIONBAR INTERNALS
      ---------------------------------------------------------------------------
      */

      /**
       * Updates the status and the visibility of each element of the captionbar.
       */
      _updateCaptionBar: function _updateCaptionBar() {
        var btn;
        var icon = this.getIcon();

        if (icon) {
          this.getChildControl("icon").setSource(icon);

          this._showChildControl("icon");
        } else {
          this._excludeChildControl("icon");
        }

        var caption = this.getCaption();

        if (caption) {
          this.getChildControl("title").setValue(caption);

          this._showChildControl("title");
        } else {
          this._excludeChildControl("title");
        }

        if (this.getShowMinimize()) {
          this._showChildControl("minimize-button");

          btn = this.getChildControl("minimize-button");
          this.getAllowMinimize() ? btn.resetEnabled() : btn.setEnabled(false);
        } else {
          this._excludeChildControl("minimize-button");
        }

        if (this.getShowMaximize()) {
          if (this.isMaximized()) {
            this._showChildControl("restore-button");

            this._excludeChildControl("maximize-button");
          } else {
            this._showChildControl("maximize-button");

            this._excludeChildControl("restore-button");
          }

          btn = this.getChildControl("maximize-button");
          this.getAllowMaximize() ? btn.resetEnabled() : btn.setEnabled(false);
        } else {
          this._excludeChildControl("maximize-button");

          this._excludeChildControl("restore-button");
        }

        if (this.getShowClose()) {
          this._showChildControl("close-button");

          btn = this.getChildControl("close-button");
          this.getAllowClose() ? btn.resetEnabled() : btn.setEnabled(false);
        } else {
          this._excludeChildControl("close-button");
        }
      },

      /*
      ---------------------------------------------------------------------------
        USER API
      ---------------------------------------------------------------------------
      */

      /**
       * Close the current window instance.
       *
       * Simply calls the {@link qx.ui.core.Widget#hide} method if the
       * {@link qx.ui.win.Window#autoDestroy} property is false; otherwise
       * removes and destroys the window.
       */
      close: function close() {
        if (!this.getAutoDestroy() && !this.isVisible()) {
          return;
        }

        if (this.fireNonBubblingEvent("beforeClose", qx.event.type.Event, [false, true])) {
          this.hide();
          this.fireEvent("close");
        } // If automatically destroying the window upon close was requested, do
        // so now. (Note that we explicitly re-obtain the autoDestroy property
        // value, allowing the user's close handler to enable/disable it before
        // here.)


        if (this.getAutoDestroy()) {
          this.dispose();
        }
      },

      /**
       * Open the window.
       */
      open: function open() {
        this.show();
        this.setActive(true);
        this.focus();
      },

      /**
       * Centers the window to the parent.
       *
       * This call works with the size of the parent widget and the size of
       * the window as calculated in the last layout flush. It is best to call
       * this method just after rendering the window in the "resize" event:
       * <pre class='javascript'>
       *   win.addListenerOnce("resize", this.center, this);
       * </pre>
       */
      center: function center() {
        var parent = this.getLayoutParent();

        if (parent) {
          var bounds = parent.getBounds();

          if (bounds) {
            var hint = this.getSizeHint();
            var left = Math.round((bounds.width - hint.width) / 2);
            var top = Math.round((bounds.height - hint.height) / 2);

            if (top < 0) {
              top = 0;
            }

            this.moveTo(left, top);
            return;
          }
        }

        {
          this.warn("Centering depends on parent bounds!");
        }
      },

      /**
       * Maximize the window.
       */
      maximize: function maximize() {
        // If the window is already maximized -> return
        if (this.isMaximized()) {
          return;
        } // First check if the parent uses a canvas layout
        // Otherwise maximize() is not possible


        var parent = this.getLayoutParent();

        if (parent != null && parent.supportsMaximize()) {
          if (this.fireNonBubblingEvent("beforeMaximize", qx.event.type.Event, [false, true])) {
            if (!this.isVisible()) {
              this.open();
            } // store current dimension and location


            var props = this.getLayoutProperties();
            this.__restoredLeft__P_210_1 = props.left === undefined ? 0 : props.left;
            this.__restoredTop__P_210_0 = props.top === undefined ? 0 : props.top; // Update layout properties

            this.setLayoutProperties({
              left: null,
              top: null,
              edge: 0
            }); // Add state

            this.addState("maximized"); // Update captionbar

            this._updateCaptionBar(); // Fire user event


            this.fireEvent("maximize");
          }
        }
      },

      /**
       * Minimized the window.
       */
      minimize: function minimize() {
        if (!this.isVisible()) {
          return;
        }

        if (this.fireNonBubblingEvent("beforeMinimize", qx.event.type.Event, [false, true])) {
          // store current dimension and location
          var props = this.getLayoutProperties();
          this.__restoredLeft__P_210_1 = props.left === undefined ? 0 : props.left;
          this.__restoredTop__P_210_0 = props.top === undefined ? 0 : props.top;
          this.removeState("maximized");
          this.hide();
          this.fireEvent("minimize");
        }
      },

      /**
       * Restore the window to <code>"normal"</code>, if it is
       * <code>"maximized"</code> or <code>"minimized"</code>.
       */
      restore: function restore() {
        if (this.getMode() === "normal") {
          return;
        }

        if (this.fireNonBubblingEvent("beforeRestore", qx.event.type.Event, [false, true])) {
          if (!this.isVisible()) {
            this.open();
          } // Restore old properties


          var left = this.__restoredLeft__P_210_1;
          var top = this.__restoredTop__P_210_0;
          this.setLayoutProperties({
            edge: null,
            left: left,
            top: top
          }); // Remove maximized state

          this.removeState("maximized"); // Update captionbar

          this._updateCaptionBar(); // Fire user event


          this.fireEvent("restore");
        }
      },

      /**
       * Set the window's position relative to its parent
       *
       * @param left {Integer} The left position
       * @param top {Integer} The top position
       */
      moveTo: function moveTo(left, top) {
        if (this.isMaximized()) {
          return;
        }

        this.setLayoutProperties({
          left: left,
          top: top
        });
      },

      /**
       * Return <code>true</code> if the window is in maximized state,
       * but note that the window in maximized state could also be invisible, this
       * is equivalent to minimized. So use the {@link qx.ui.window.Window#getMode}
       * to get the window mode.
       *
       * @return {Boolean} <code>true</code> if the window is maximized,
       *   <code>false</code> otherwise.
       */
      isMaximized: function isMaximized() {
        return this.hasState("maximized");
      },

      /**
       * Return the window mode as <code>String</code>:
       * <code>"maximized"</code>, <code>"normal"</code> or <code>"minimized"</code>.
       *
       * @return {String} The window mode as <code>String</code> value.
       */
      getMode: function getMode() {
        if (!this.isVisible()) {
          return "minimized";
        } else {
          if (this.isMaximized()) {
            return "maximized";
          } else {
            return "normal";
          }
        }
      },

      /*
      ---------------------------------------------------------------------------
        PROPERTY APPLY ROUTINES
      ---------------------------------------------------------------------------
      */
      // property apply
      _applyActive: function _applyActive(value, old) {
        if (old) {
          this.removeState("active");
        } else {
          this.addState("active");
        }
      },
      // property apply
      _applyModal: function _applyModal(value, old) {
        if (old) {
          this.removeState("modal");
        } else {
          this.addState("modal");
        } // ARIA attrs


        this.getContentElement().setAttribute("aria-modal", value);
      },

      /**
       * Returns the element, to which the content padding should be applied.
       *
       * @return {qx.ui.core.Widget} The content padding target.
       */
      _getContentPaddingTarget: function _getContentPaddingTarget() {
        return this.getChildControl("pane");
      },
      // property apply
      _applyShowStatusbar: function _applyShowStatusbar(value, old) {
        // store the state if the status bar is shown
        var resizeFrame = this._getResizeFrame();

        if (value) {
          this.addState("showStatusbar");
          resizeFrame.addState("showStatusbar");
        } else {
          this.removeState("showStatusbar");
          resizeFrame.removeState("showStatusbar");
        }

        if (value) {
          this._showChildControl("statusbar");
        } else {
          this._excludeChildControl("statusbar");
        }
      },
      // property apply
      _applyCaptionBarChange: function _applyCaptionBarChange(value, old) {
        this._updateCaptionBar();
      },
      // property apply
      _applyStatus: function _applyStatus(value, old) {
        var label = this.getChildControl("statusbar-text", true);

        if (label) {
          label.setValue(value);
        }
      },
      // overridden
      _applyFocusable: function _applyFocusable(value, old) {
        // Workaround for bug #7581: Don't set the tabIndex
        // to prevent native scrolling on focus in IE
        if (qx.core.Environment.get("engine.name") !== "mshtml") {
          qx.ui.window.Window.superclass.prototype._applyFocusable.call(this, value, old);
        }
      },
      _applyCenterOnAppear: function _applyCenterOnAppear(value, old) {
        // Remove prior listener for centering on appear
        if (this.__centeringAppearId__P_210_2 !== null) {
          this.removeListenerById(this.__centeringAppearId__P_210_2);
          this.__centeringAppearId__P_210_2 = null;
        } // If we are to center on appear, arrange to do so


        if (value) {
          this.__centeringAppearId__P_210_2 = this.addListener("appear", this.center, this);
        }
      },
      _applyCenterOnContainerResize: function _applyCenterOnContainerResize(value, old) {
        var parent = this.getLayoutParent(); // Remove prior listener for centering on resize

        if (this.__centeringResizeId__P_210_3 !== null) {
          parent.removeListenerById(this.__centeringResizeId__P_210_3);
          this.__centeringResizeId__P_210_3 = null;
        } // If we are to center on resize, arrange to do so


        if (value) {
          if (parent) {
            this.__centeringResizeId__P_210_3 = parent.addListener("resize", this.center, this);
          }
        }
      },

      /*
      ---------------------------------------------------------------------------
        BASIC EVENT HANDLERS
      ---------------------------------------------------------------------------
      */

      /**
       * Stops every event
       *
       * @param e {qx.event.type.Event} any event
       */
      _onWindowEventStop: function _onWindowEventStop(e) {
        e.stopPropagation();
      },

      /**
       * Focuses the window instance.
       *
       * @param e {qx.event.type.Pointer} pointer down event
       */
      _onWindowPointerDown: function _onWindowPointerDown(e) {
        this.setActive(true);
      },

      /**
       * Listens to the "focusout" event to deactivate the window (if the
       * currently focused widget is not a child of the window)
       *
       * @param e {qx.event.type.Focus} focus event
       */
      _onWindowFocusOut: function _onWindowFocusOut(e) {
        // only needed for non-modal windows
        if (this.getModal()) {
          return;
        } // get the current focused widget and check if it is a child


        var current = e.getRelatedTarget();

        if (current != null && !qx.ui.core.Widget.contains(this, current)) {
          this.setActive(false);
        }
      },

      /**
       * Maximizes the window or restores it if it is already
       * maximized.
       *
       * @param e {qx.event.type.Pointer} double tap event
       */
      _onCaptionPointerDblTap: function _onCaptionPointerDblTap(e) {
        if (this.getAllowMaximize() && (e.getTarget() === this.getChildControl("captionbar") || e.getTarget() === this.getChildControl("title"))) {
          this.isMaximized() ? this.restore() : this.maximize();
        }
      },

      /*
      ---------------------------------------------------------------------------
        EVENTS FOR CAPTIONBAR BUTTONS
      ---------------------------------------------------------------------------
      */

      /**
       * Minimizes the window, removes all states from the minimize button and
       * stops the further propagation of the event (calling {@link qx.event.type.Event#stopPropagation}).
       *
       * @param e {qx.event.type.Pointer} pointer tap event
       */
      _onMinimizeButtonTap: function _onMinimizeButtonTap(e) {
        this.minimize();
        this.getChildControl("minimize-button").reset();
      },

      /**
       * Restores the window, removes all states from the restore button and
       * stops the further propagation of the event (calling {@link qx.event.type.Event#stopPropagation}).
       *
       * @param e {qx.event.type.Pointer} pointer pointer event
       */
      _onRestoreButtonTap: function _onRestoreButtonTap(e) {
        this.restore();
        this.getChildControl("restore-button").reset();
      },

      /**
       * Maximizes the window, removes all states from the maximize button and
       * stops the further propagation of the event (calling {@link qx.event.type.Event#stopPropagation}).
       *
       * @param e {qx.event.type.Pointer} pointer pointer event
       */
      _onMaximizeButtonTap: function _onMaximizeButtonTap(e) {
        this.maximize();
        this.getChildControl("maximize-button").reset();
      },

      /**
       * Closes the window, removes all states from the close button and
       * stops the further propagation of the event (calling {@link qx.event.type.Event#stopPropagation}).
       *
       * @param e {qx.event.type.Pointer} pointer pointer event
       */
      _onCloseButtonTap: function _onCloseButtonTap(e) {
        this.close();
        this.getChildControl("close-button").reset();
      }
    },
    destruct: function destruct() {
      var id;
      var parent; // Remove ourselves from the focus handler

      qx.ui.core.FocusHandler.getInstance().removeRoot(this); // If we haven't been removed from our parent, clean it up too.

      parent = this.getLayoutParent();

      if (parent) {
        // Remove the listener for resize, if there is one
        id = this.__centeringResizeId__P_210_3;
        id && parent.removeListenerById(id); // Remove ourself from our parent

        parent.remove(this);
      }
    }
  });
  qx.ui.window.Window.$$dbClassInfo = $$dbClassInfo;
})();

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
        "require": true
      }
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
  
  ************************************************************************ */

  /**
   * The grow layout stretches all children to the full available size
   * but still respects limits configured by min/max values.
   *
   * It will place all children over each other with the top and left coordinates
   * set to <code>0</code>. The {@link qx.ui.container.Stack} and the
   * {@link qx.ui.core.scroll.ScrollPane} are using this layout.
   *
   * *Features*
   *
   * * Auto-sizing
   * * Respects minimum and maximum child dimensions
   *
   * *Item Properties*
   *
   * None
   *
   * *Example*
   *
   * <pre class="javascript">
   * var layout = new qx.ui.layout.Grow();
   *
   * var w1 = new qx.ui.core.Widget();
   * var w2 = new qx.ui.core.Widget();
   * var w3 = new qx.ui.core.Widget();
   *
   * var container = new qx.ui.container.Composite(layout);
   * container.add(w1);
   * container.add(w2);
   * container.add(w3);
   * </pre>
   *
   * *External Documentation*
   *
   * <a href='https://qooxdoo.org/documentation/#/desktop/layout/grow.md'>
   * Extended documentation</a> and links to demos of this layout in the qooxdoo manual.
   */
  qx.Class.define("qx.ui.layout.Grow", {
    extend: qx.ui.layout.Abstract,

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      /*
      ---------------------------------------------------------------------------
        LAYOUT INTERFACE
      ---------------------------------------------------------------------------
      */
      // overridden
      verifyLayoutProperty: qx.core.Environment.select("qx.debug", {
        "true": function _true(item, name, value) {
          this.assert(false, "The property '" + name + "' is not supported by the Grow layout!");
        },
        "false": null
      }),
      // overridden
      renderLayout: function renderLayout(availWidth, availHeight, padding) {
        var children = this._getLayoutChildren();

        var child, size, width, height; // Render children

        for (var i = 0, l = children.length; i < l; i++) {
          child = children[i];
          size = child.getSizeHint();
          width = availWidth;

          if (width < size.minWidth) {
            width = size.minWidth;
          } else if (width > size.maxWidth) {
            width = size.maxWidth;
          }

          height = availHeight;

          if (height < size.minHeight) {
            height = size.minHeight;
          } else if (height > size.maxHeight) {
            height = size.maxHeight;
          }

          child.renderLayout(padding.left, padding.top, width, height);
        }
      },
      // overridden
      _computeSizeHint: function _computeSizeHint() {
        var children = this._getLayoutChildren();

        var child, size;
        var neededWidth = 0,
            neededHeight = 0;
        var minWidth = 0,
            minHeight = 0;
        var maxWidth = Infinity,
            maxHeight = Infinity; // Iterate over children

        for (var i = 0, l = children.length; i < l; i++) {
          child = children[i];
          size = child.getSizeHint();
          neededWidth = Math.max(neededWidth, size.width);
          neededHeight = Math.max(neededHeight, size.height);
          minWidth = Math.max(minWidth, size.minWidth);
          minHeight = Math.max(minHeight, size.minHeight);
          maxWidth = Math.min(maxWidth, size.maxWidth);
          maxHeight = Math.min(maxHeight, size.maxHeight);
        } // Return hint


        return {
          width: neededWidth,
          height: neededHeight,
          minWidth: minWidth,
          minHeight: minHeight,
          maxWidth: maxWidth,
          maxHeight: maxHeight
        };
      }
    }
  });
  qx.ui.layout.Grow.$$dbClassInfo = $$dbClassInfo;
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
       2004-2009 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Christian Hagendorn (chris_schmidt)
  
  ************************************************************************ */

  /**
   * Defines the callback for the single selection manager.
   *
   * @internal
   */
  qx.Interface.define("qx.ui.core.ISingleSelectionProvider", {
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      /**
       * Returns the elements which are part of the selection.
       *
       * @return {qx.ui.core.Widget[]} The widgets for the selection.
       */
      getItems: function getItems() {},

      /**
       * Returns whether the given item is selectable.
       *
       * @param item {qx.ui.core.Widget} The item to be checked
       * @return {Boolean} Whether the given item is selectable
       */
      isItemSelectable: function isItemSelectable(item) {}
    }
  });
  qx.ui.core.ISingleSelectionProvider.$$dbClassInfo = $$dbClassInfo;
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
   * Form interface for all form widgets which use a numeric value as their
   * primary data type like a spinner.
   */
  qx.Interface.define("qx.ui.form.INumberForm", {
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
       * @param value {Number|null} The new value of the element.
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
       * @return {Number|null} The value.
       */
      getValue: function getValue() {}
    }
  });
  qx.ui.form.INumberForm.$$dbClassInfo = $$dbClassInfo;
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
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * Form interface for all widgets which deal with ranges. The spinner is a good
   * example for a range using widget.
   */
  qx.Interface.define("qx.ui.form.IRange", {
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      /*
      ---------------------------------------------------------------------------
        MINIMUM PROPERTY
      ---------------------------------------------------------------------------
      */

      /**
       * Set the minimum value of the range.
       *
       * @param min {Number} The minimum.
       */
      setMinimum: function setMinimum(min) {
        return arguments.length == 1;
      },

      /**
       * Return the current set minimum of the range.
       *
       * @return {Number} The current set minimum.
       */
      getMinimum: function getMinimum() {},

      /*
      ---------------------------------------------------------------------------
        MAXIMUM PROPERTY
      ---------------------------------------------------------------------------
      */

      /**
       * Set the maximum value of the range.
       *
       * @param max {Number} The maximum.
       */
      setMaximum: function setMaximum(max) {
        return arguments.length == 1;
      },

      /**
       * Return the current set maximum of the range.
       *
       * @return {Number} The current set maximum.
       */
      getMaximum: function getMaximum() {},

      /*
      ---------------------------------------------------------------------------
        SINGLESTEP PROPERTY
      ---------------------------------------------------------------------------
      */

      /**
       * Sets the value for single steps in the range.
       *
       * @param step {Number} The value of the step.
       */
      setSingleStep: function setSingleStep(step) {
        return arguments.length == 1;
      },

      /**
       * Returns the value which will be stepped in a single step in the range.
       *
       * @return {Number} The current value for single steps.
       */
      getSingleStep: function getSingleStep() {},

      /*
      ---------------------------------------------------------------------------
        PAGESTEP PROPERTY
      ---------------------------------------------------------------------------
      */

      /**
       * Sets the value for page steps in the range.
       *
       * @param step {Number} The value of the step.
       */
      setPageStep: function setPageStep(step) {
        return arguments.length == 1;
      },

      /**
       * Returns the value which will be stepped in a page step in the range.
       *
       * @return {Number} The current value for page steps.
       */
      getPageStep: function getPageStep() {}
    }
  });
  qx.ui.form.IRange.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.Widget": {
        "construct": true,
        "require": true
      },
      "qx.ui.form.IForm": {
        "require": true
      },
      "qx.ui.form.INumberForm": {
        "require": true
      },
      "qx.ui.form.IRange": {
        "require": true
      },
      "qx.ui.form.MForm": {
        "require": true
      },
      "qx.ui.layout.Canvas": {
        "construct": true
      },
      "qx.theme.manager.Decoration": {},
      "qx.bom.element.Location": {},
      "qx.event.Timer": {},
      "qx.bom.AnimationFrame": {},
      "qx.event.type.Data": {}
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
   * The Slider widget provides a vertical or horizontal slider.
   *
   * The Slider is the classic widget for controlling a bounded value.
   * It lets the user move a slider handle along a horizontal or vertical
   * groove and translates the handle's position into an integer value
   * within the defined range.
   *
   * The Slider has very few of its own functions.
   * The most useful functions are slideTo() to set the slider directly to some
   * value; setSingleStep(), setPageStep() to set the steps; and setMinimum()
   * and setMaximum() to define the range of the slider.
   *
   * A slider accepts focus on Tab and provides both a mouse wheel and
   * a keyboard interface. The keyboard interface is the following:
   *
   * * Left/Right move a horizontal slider by one single step.
   * * Up/Down move a vertical slider by one single step.
   * * PageUp moves up one page.
   * * PageDown moves down one page.
   * * Home moves to the start (minimum).
   * * End moves to the end (maximum).
   *
   * Here are the main properties of the class:
   *
   * # <code>value</code>: The bounded integer that {@link qx.ui.form.INumberForm}
   * maintains.
   * # <code>minimum</code>: The lowest possible value.
   * # <code>maximum</code>: The highest possible value.
   * # <code>singleStep</code>: The smaller of two natural steps that an abstract
   * sliders provides and typically corresponds to the user pressing an arrow key.
   * # <code>pageStep</code>: The larger of two natural steps that an abstract
   * slider provides and typically corresponds to the user pressing PageUp or
   * PageDown.
   *
   * @childControl knob {qx.ui.core.Widget} knob to set the value of the slider
   */
  qx.Class.define("qx.ui.form.Slider", {
    extend: qx.ui.core.Widget,
    implement: [qx.ui.form.IForm, qx.ui.form.INumberForm, qx.ui.form.IRange],
    include: [qx.ui.form.MForm],

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param orientation {String?"horizontal"} Configure the
     * {@link #orientation} property
     */
    construct: function construct(orientation) {
      qx.ui.core.Widget.constructor.call(this); // Force canvas layout

      this._setLayout(new qx.ui.layout.Canvas()); // ARIA attrs


      this.getContentElement().setAttribute("role", "slider"); // Add listeners

      this.addListener("keypress", this._onKeyPress);
      this.addListener("roll", this._onRoll);
      this.addListener("pointerdown", this._onPointerDown);
      this.addListener("pointerup", this._onPointerUp);
      this.addListener("losecapture", this._onPointerUp);
      this.addListener("resize", this._onUpdate); // Stop events

      this.addListener("contextmenu", this._onStopEvent);
      this.addListener("tap", this._onStopEvent);
      this.addListener("dbltap", this._onStopEvent); // Initialize orientation

      if (orientation != null) {
        this.setOrientation(orientation);
      } else {
        this.initOrientation();
      }
    },

    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */
    events: {
      /**
       * Change event for the value.
       */
      changeValue: "qx.event.type.Data",

      /** Fired as soon as the slide animation ended. */
      slideAnimationEnd: "qx.event.type.Event"
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      // overridden
      appearance: {
        refine: true,
        init: "slider"
      },
      // overridden
      focusable: {
        refine: true,
        init: true
      },

      /** Whether the slider is horizontal or vertical. */
      orientation: {
        check: ["horizontal", "vertical"],
        init: "horizontal",
        apply: "_applyOrientation"
      },

      /**
       * The current slider value.
       *
       * Strictly validates according to {@link #minimum} and {@link #maximum}.
       * Do not apply any value correction to the incoming value. If you depend
       * on this, please use {@link #slideTo} instead.
       */
      value: {
        check: "typeof value==='number'&&value>=this.getMinimum()&&value<=this.getMaximum()",
        init: 0,
        apply: "_applyValue",
        nullable: true
      },

      /**
       * The minimum slider value (may be negative). This value must be smaller
       * than {@link #maximum}.
       */
      minimum: {
        check: "Integer",
        init: 0,
        apply: "_applyMinimum",
        event: "changeMinimum"
      },

      /**
       * The maximum slider value (may be negative). This value must be larger
       * than {@link #minimum}.
       */
      maximum: {
        check: "Integer",
        init: 100,
        apply: "_applyMaximum",
        event: "changeMaximum"
      },

      /**
       * The amount to increment on each event. Typically corresponds
       * to the user pressing an arrow key.
       */
      singleStep: {
        check: "Integer",
        init: 1
      },

      /**
       * The amount to increment on each event. Typically corresponds
       * to the user pressing <code>PageUp</code> or <code>PageDown</code>.
       */
      pageStep: {
        check: "Integer",
        init: 10
      },

      /**
       * Factor to apply to the width/height of the knob in relation
       * to the dimension of the underlying area.
       */
      knobFactor: {
        check: "Number",
        apply: "_applyKnobFactor",
        nullable: true
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __sliderLocation__P_178_0: null,
      __knobLocation__P_178_1: null,
      __knobSize__P_178_2: null,
      __dragMode__P_178_3: null,
      __dragOffset__P_178_4: null,
      __trackingMode__P_178_5: null,
      __trackingDirection__P_178_6: null,
      __trackingEnd__P_178_7: null,
      __timer__P_178_8: null,
      // event delay stuff during drag
      __dragTimer__P_178_9: null,
      __lastValueEvent__P_178_10: null,
      __dragValue__P_178_11: null,
      __scrollAnimationframe__P_178_12: null,
      // overridden

      /**
       * @lint ignoreReferenceField(_forwardStates)
       */
      _forwardStates: {
        invalid: true
      },
      // overridden
      renderLayout: function renderLayout(left, top, width, height) {
        qx.ui.form.Slider.superclass.prototype.renderLayout.call(this, left, top, width, height); // make sure the layout engine does not override the knob position

        this._updateKnobPosition();
      },
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id, hash) {
        var control;

        switch (id) {
          case "knob":
            control = new qx.ui.core.Widget();
            control.addListener("resize", this._onUpdate, this);
            control.addListener("pointerover", this._onPointerOver);
            control.addListener("pointerout", this._onPointerOut);

            this._add(control);

            break;
        }

        return control || qx.ui.form.Slider.superclass.prototype._createChildControlImpl.call(this, id);
      },

      /*
      ---------------------------------------------------------------------------
        EVENT HANDLER
      ---------------------------------------------------------------------------
      */

      /**
       * Event handler for pointerover events at the knob child control.
       *
       * Adds the 'hovered' state
       *
       * @param e {qx.event.type.Pointer} Incoming pointer event
       */
      _onPointerOver: function _onPointerOver(e) {
        this.addState("hovered");
      },

      /**
       * Event handler for pointerout events at the knob child control.
       *
       * Removes the 'hovered' state
       *
       * @param e {qx.event.type.Pointer} Incoming pointer event
       */
      _onPointerOut: function _onPointerOut(e) {
        this.removeState("hovered");
      },

      /**
       * Listener of roll event
       *
       * @param e {qx.event.type.Roll} Incoming event object
       */
      _onRoll: function _onRoll(e) {
        // only wheel
        if (e.getPointerType() != "wheel") {
          return;
        }

        var axis = this.getOrientation() === "horizontal" ? "x" : "y";
        var delta = e.getDelta()[axis];
        var direction = delta > 0 ? 1 : delta < 0 ? -1 : 0;
        this.slideBy(direction * this.getSingleStep());
        e.stop();
      },

      /**
       * Event handler for keypress events.
       *
       * Adds support for arrow keys, page up, page down, home and end keys.
       *
       * @param e {qx.event.type.KeySequence} Incoming keypress event
       */
      _onKeyPress: function _onKeyPress(e) {
        var isHorizontal = this.getOrientation() === "horizontal";
        var backward = isHorizontal ? "Left" : "Up";
        var forward = isHorizontal ? "Right" : "Down";

        switch (e.getKeyIdentifier()) {
          case forward:
            this.slideForward();
            break;

          case backward:
            this.slideBack();
            break;

          case "PageDown":
            this.slidePageForward(100);
            break;

          case "PageUp":
            this.slidePageBack(100);
            break;

          case "Home":
            this.slideToBegin(200);
            break;

          case "End":
            this.slideToEnd(200);
            break;

          default:
            return;
        } // Stop processed events


        e.stop();
      },

      /**
       * Listener of pointerdown event. Initializes drag or tracking mode.
       *
       * @param e {qx.event.type.Pointer} Incoming event object
       */
      _onPointerDown: function _onPointerDown(e) {
        // this can happen if the user releases the button while dragging outside
        // of the browser viewport
        if (this.__dragMode__P_178_3) {
          return;
        }

        var isHorizontal = this.__isHorizontal__P_178_13;
        var knob = this.getChildControl("knob");
        var locationProperty = isHorizontal ? "left" : "top";
        var cursorLocation = isHorizontal ? e.getDocumentLeft() : e.getDocumentTop();
        var decorator = this.getDecorator();
        decorator = qx.theme.manager.Decoration.getInstance().resolve(decorator);

        if (isHorizontal) {
          var decoratorPadding = decorator ? decorator.getInsets().left : 0;
          var padding = (this.getPaddingLeft() || 0) + decoratorPadding;
        } else {
          var decoratorPadding = decorator ? decorator.getInsets().top : 0;
          var padding = (this.getPaddingTop() || 0) + decoratorPadding;
        }

        var sliderLocation = this.__sliderLocation__P_178_0 = qx.bom.element.Location.get(this.getContentElement().getDomElement())[locationProperty];
        sliderLocation += padding;
        var knobLocation = this.__knobLocation__P_178_1 = qx.bom.element.Location.get(knob.getContentElement().getDomElement())[locationProperty];

        if (e.getTarget() === knob) {
          // Switch into drag mode
          this.__dragMode__P_178_3 = true;

          if (!this.__dragTimer__P_178_9) {
            // create a timer to fire delayed dragging events if dragging stops.
            this.__dragTimer__P_178_9 = new qx.event.Timer(100);

            this.__dragTimer__P_178_9.addListener("interval", this._fireValue, this);
          }

          this.__dragTimer__P_178_9.start(); // Compute dragOffset (includes both: inner position of the widget and
          // cursor position on knob)


          this.__dragOffset__P_178_4 = cursorLocation + sliderLocation - knobLocation; // add state

          knob.addState("pressed");
        } else {
          // Switch into tracking mode
          this.__trackingMode__P_178_5 = true; // Detect tracking direction

          this.__trackingDirection__P_178_6 = cursorLocation <= knobLocation ? -1 : 1; // Compute end value

          this.__computeTrackingEnd__P_178_14(e); // Directly call interval method once


          this._onInterval(); // Initialize timer (when needed)


          if (!this.__timer__P_178_8) {
            this.__timer__P_178_8 = new qx.event.Timer(100);

            this.__timer__P_178_8.addListener("interval", this._onInterval, this);
          } // Start timer


          this.__timer__P_178_8.start();
        } // Register move listener


        this.addListener("pointermove", this._onPointerMove); // Activate capturing

        this.capture(); // Stop event

        e.stopPropagation();
      },

      /**
       * Listener of pointerup event. Used for cleanup of previously
       * initialized modes.
       *
       * @param e {qx.event.type.Pointer} Incoming event object
       */
      _onPointerUp: function _onPointerUp(e) {
        if (this.__dragMode__P_178_3) {
          // Release capture mode
          this.releaseCapture(); // Cleanup status flags

          delete this.__dragMode__P_178_3; // as we come out of drag mode, make
          // sure content gets synced

          this.__dragTimer__P_178_9.stop();

          this._fireValue();

          delete this.__dragOffset__P_178_4; // remove state

          this.getChildControl("knob").removeState("pressed"); // it's necessary to check whether the cursor is over the knob widget to be able to
          // to decide whether to remove the 'hovered' state.

          if (e.getType() === "pointerup") {
            var deltaSlider;
            var deltaPosition;
            var positionSlider;

            if (this.__isHorizontal__P_178_13) {
              deltaSlider = e.getDocumentLeft() - (this._valueToPosition(this.getValue()) + this.__sliderLocation__P_178_0);
              positionSlider = qx.bom.element.Location.get(this.getContentElement().getDomElement())["top"];
              deltaPosition = e.getDocumentTop() - (positionSlider + this.getChildControl("knob").getBounds().top);
            } else {
              deltaSlider = e.getDocumentTop() - (this._valueToPosition(this.getValue()) + this.__sliderLocation__P_178_0);
              positionSlider = qx.bom.element.Location.get(this.getContentElement().getDomElement())["left"];
              deltaPosition = e.getDocumentLeft() - (positionSlider + this.getChildControl("knob").getBounds().left);
            }

            if (deltaPosition < 0 || deltaPosition > this.__knobSize__P_178_2 || deltaSlider < 0 || deltaSlider > this.__knobSize__P_178_2) {
              this.getChildControl("knob").removeState("hovered");
            }
          }
        } else if (this.__trackingMode__P_178_5) {
          // Stop timer interval
          this.__timer__P_178_8.stop(); // Release capture mode


          this.releaseCapture(); // Cleanup status flags

          delete this.__trackingMode__P_178_5;
          delete this.__trackingDirection__P_178_6;
          delete this.__trackingEnd__P_178_7;
        } // Remove move listener again


        this.removeListener("pointermove", this._onPointerMove); // Stop event

        if (e.getType() === "pointerup") {
          e.stopPropagation();
        }
      },

      /**
       * Listener of pointermove event for the knob. Only used in drag mode.
       *
       * @param e {qx.event.type.Pointer} Incoming event object
       */
      _onPointerMove: function _onPointerMove(e) {
        if (this.__dragMode__P_178_3) {
          var dragStop = this.__isHorizontal__P_178_13 ? e.getDocumentLeft() : e.getDocumentTop();
          var position = dragStop - this.__dragOffset__P_178_4;
          this.slideTo(this._positionToValue(position));
        } else if (this.__trackingMode__P_178_5) {
          // Update tracking end on pointermove
          this.__computeTrackingEnd__P_178_14(e);
        } // Stop event


        e.stopPropagation();
      },

      /**
       * Listener of interval event by the internal timer. Only used
       * in tracking sequences.
       *
       * @param e {qx.event.type.Event} Incoming event object
       */
      _onInterval: function _onInterval(e) {
        // Compute new value
        var value = this.getValue() + this.__trackingDirection__P_178_6 * this.getPageStep(); // Limit value

        if (value < this.getMinimum()) {
          value = this.getMinimum();
        } else if (value > this.getMaximum()) {
          value = this.getMaximum();
        } // Stop at tracking position (where the pointer is pressed down)


        var slideBack = this.__trackingDirection__P_178_6 == -1;

        if (slideBack && value <= this.__trackingEnd__P_178_7 || !slideBack && value >= this.__trackingEnd__P_178_7) {
          value = this.__trackingEnd__P_178_7;
        } // Finally slide to the desired position


        this.slideTo(value);
      },

      /**
       * Listener of resize event for both the slider itself and the knob.
       *
       * @param e {qx.event.type.Data} Incoming event object
       */
      _onUpdate: function _onUpdate(e) {
        // Update sliding space
        var availSize = this.getInnerSize();
        var knobSize = this.getChildControl("knob").getBounds();
        var sizeProperty = this.__isHorizontal__P_178_13 ? "width" : "height"; // Sync knob size

        this._updateKnobSize(); // Store knob size


        this.__slidingSpace__P_178_15 = availSize[sizeProperty] - knobSize[sizeProperty];
        this.__knobSize__P_178_2 = knobSize[sizeProperty]; // Update knob position (sliding space must be updated first)

        this._updateKnobPosition();
      },

      /*
      ---------------------------------------------------------------------------
        UTILS
      ---------------------------------------------------------------------------
      */

      /** @type {Boolean} Whether the slider is laid out horizontally */
      __isHorizontal__P_178_13: false,

      /**
       * @type {Integer} Available space for knob to slide on, computed on resize of
       * the widget
       */
      __slidingSpace__P_178_15: 0,

      /**
       * Computes the value where the tracking should end depending on
       * the current pointer position.
       *
       * @param e {qx.event.type.Pointer} Incoming pointer event
       */
      __computeTrackingEnd__P_178_14: function __computeTrackingEnd__P_178_14(e) {
        var isHorizontal = this.__isHorizontal__P_178_13;
        var cursorLocation = isHorizontal ? e.getDocumentLeft() : e.getDocumentTop();
        var sliderLocation = this.__sliderLocation__P_178_0;
        var knobLocation = this.__knobLocation__P_178_1;
        var knobSize = this.__knobSize__P_178_2; // Compute relative position

        var position = cursorLocation - sliderLocation;

        if (cursorLocation >= knobLocation) {
          position -= knobSize;
        } // Compute stop value


        var value = this._positionToValue(position);

        var min = this.getMinimum();
        var max = this.getMaximum();

        if (value < min) {
          value = min;
        } else if (value > max) {
          value = max;
        } else {
          var old = this.getValue();
          var step = this.getPageStep();
          var method = this.__trackingDirection__P_178_6 < 0 ? "floor" : "ceil"; // Fix to page step

          value = old + Math[method]((value - old) / step) * step;
        } // Store value when undefined, otherwise only when it follows the
        // current direction e.g. goes up or down


        if (this.__trackingEnd__P_178_7 == null || this.__trackingDirection__P_178_6 == -1 && value <= this.__trackingEnd__P_178_7 || this.__trackingDirection__P_178_6 == 1 && value >= this.__trackingEnd__P_178_7) {
          this.__trackingEnd__P_178_7 = value;
        }
      },

      /**
       * Converts the given position to a value.
       *
       * Does not respect single or page step.
       *
       * @param position {Integer} Position to use
       * @return {Integer} Resulting value (rounded)
       */
      _positionToValue: function _positionToValue(position) {
        // Reading available space
        var avail = this.__slidingSpace__P_178_15; // Protect undefined value (before initial resize) and division by zero

        if (avail == null || avail == 0) {
          return 0;
        } // Compute and limit percent


        var percent = position / avail;

        if (percent < 0) {
          percent = 0;
        } else if (percent > 1) {
          percent = 1;
        } // Compute range


        var range = this.getMaximum() - this.getMinimum(); // Compute value

        return this.getMinimum() + Math.round(range * percent);
      },

      /**
       * Converts the given value to a position to place
       * the knob to.
       *
       * @param value {Integer} Value to use
       * @return {Integer} Computed position (rounded)
       */
      _valueToPosition: function _valueToPosition(value) {
        // Reading available space
        var avail = this.__slidingSpace__P_178_15;

        if (avail == null) {
          return 0;
        } // Computing range


        var range = this.getMaximum() - this.getMinimum(); // Protect division by zero

        if (range == 0) {
          return 0;
        } // Translating value to distance from minimum


        var value = value - this.getMinimum(); // Compute and limit percent

        var percent = value / range;

        if (percent < 0) {
          percent = 0;
        } else if (percent > 1) {
          percent = 1;
        } // Compute position from available space and percent


        return Math.round(avail * percent);
      },

      /**
       * Updates the knob position following the currently configured
       * value. Useful on reflows where the dimensions of the slider
       * itself have been modified.
       *
       */
      _updateKnobPosition: function _updateKnobPosition() {
        this._setKnobPosition(this._valueToPosition(this.getValue()));
      },

      /**
       * Moves the knob to the given position.
       *
       * @param position {Integer} Any valid position (needs to be
       *   greater or equal than zero)
       */
      _setKnobPosition: function _setKnobPosition(position) {
        // Use the DOM Element to prevent unnecessary layout recalculations
        var knob = this.getChildControl("knob");
        var dec = this.getDecorator();
        dec = qx.theme.manager.Decoration.getInstance().resolve(dec);
        var content = knob.getContentElement();

        if (this.__isHorizontal__P_178_13) {
          if (dec && dec.getPadding()) {
            position += dec.getPadding().left;
          }

          position += this.getPaddingLeft() || 0;
          content.setStyle("left", position + "px", true);
        } else {
          if (dec && dec.getPadding()) {
            position += dec.getPadding().top;
          }

          position += this.getPaddingTop() || 0;
          content.setStyle("top", position + "px", true);
        }
      },

      /**
       * Reconfigures the size of the knob depending on
       * the optionally defined {@link #knobFactor}.
       *
       */
      _updateKnobSize: function _updateKnobSize() {
        // Compute knob size
        var knobFactor = this.getKnobFactor();

        if (knobFactor == null) {
          return;
        } // Ignore when not rendered yet


        var avail = this.getInnerSize();

        if (avail == null) {
          return;
        } // Read size property


        if (this.__isHorizontal__P_178_13) {
          this.getChildControl("knob").setWidth(Math.round(knobFactor * avail.width));
        } else {
          this.getChildControl("knob").setHeight(Math.round(knobFactor * avail.height));
        }
      },

      /*
      ---------------------------------------------------------------------------
        SLIDE METHODS
      ---------------------------------------------------------------------------
      */

      /**
       * Slides backward to the minimum value
       * @param duration {Number} The time in milliseconds the slide to should take.
       */
      slideToBegin: function slideToBegin(duration) {
        this.slideTo(this.getMinimum(), duration);
      },

      /**
       * Slides forward to the maximum value
       * @param duration {Number} The time in milliseconds the slide to should take.
       */
      slideToEnd: function slideToEnd(duration) {
        this.slideTo(this.getMaximum(), duration);
      },

      /**
       * Slides forward (right or bottom depending on orientation)
       *
       */
      slideForward: function slideForward() {
        this.slideBy(this.getSingleStep());
      },

      /**
       * Slides backward (to left or top depending on orientation)
       *
       */
      slideBack: function slideBack() {
        this.slideBy(-this.getSingleStep());
      },

      /**
       * Slides a page forward (to right or bottom depending on orientation)
       * @param duration {Number} The time in milliseconds the slide to should take.
       */
      slidePageForward: function slidePageForward(duration) {
        this.slideBy(this.getPageStep(), duration);
      },

      /**
       * Slides a page backward (to left or top depending on orientation)
       * @param duration {Number} The time in milliseconds the slide to should take.
       */
      slidePageBack: function slidePageBack(duration) {
        this.slideBy(-this.getPageStep(), duration);
      },

      /**
       * Slides by the given offset.
       *
       * This method works with the value, not with the coordinate.
       *
       * @param offset {Integer} Offset to scroll by
       * @param duration {Number} The time in milliseconds the slide to should take.
       */
      slideBy: function slideBy(offset, duration) {
        this.slideTo(this.getValue() + offset, duration);
      },

      /**
       * Slides to the given value
       *
       * This method works with the value, not with the coordinate.
       *
       * @param value {Integer} Scroll to a value between the defined
       *   minimum and maximum.
       * @param duration {Number} The time in milliseconds the slide to should take.
       */
      slideTo: function slideTo(value, duration) {
        this.stopSlideAnimation();

        if (duration) {
          this.__animateTo__P_178_16(value, duration);
        } else {
          this.updatePosition(value);
        }
      },

      /**
       * Updates the position property considering the minimum and maximum values.
       * @param value {Number} The new position.
       */
      updatePosition: function updatePosition(value) {
        this.setValue(this.__normalizeValue__P_178_17(value));
      },

      /**
       * In case a slide animation is currently running, it will be stopped.
       * If not, the method does nothing.
       */
      stopSlideAnimation: function stopSlideAnimation() {
        if (this.__scrollAnimationframe__P_178_12) {
          this.__scrollAnimationframe__P_178_12.cancelSequence();

          this.__scrollAnimationframe__P_178_12 = null;
        }
      },

      /**
       * Internal helper to normalize the given value concerning the minimum
       * and maximum value.
       * @param value {Number} The value to normalize.
       * @return {Number} The normalized value.
       */
      __normalizeValue__P_178_17: function __normalizeValue__P_178_17(value) {
        // Bring into allowed range or fix to single step grid
        if (value < this.getMinimum()) {
          value = this.getMinimum();
        } else if (value > this.getMaximum()) {
          value = this.getMaximum();
        } else {
          value = this.getMinimum() + Math.round((value - this.getMinimum()) / this.getSingleStep()) * this.getSingleStep();
        }

        return value;
      },

      /**
       * Animation helper which takes care of the animated slide.
       * @param to {Number} The target value.
       * @param duration {Number} The time in milliseconds the slide to should take.
       */
      __animateTo__P_178_16: function __animateTo__P_178_16(to, duration) {
        to = this.__normalizeValue__P_178_17(to);
        var from = this.getValue();
        this.__scrollAnimationframe__P_178_12 = new qx.bom.AnimationFrame();

        this.__scrollAnimationframe__P_178_12.on("frame", function (timePassed) {
          this.setValue(parseInt(timePassed / duration * (to - from) + from));
        }, this);

        this.__scrollAnimationframe__P_178_12.on("end", function () {
          this.setValue(to);
          this.__scrollAnimationframe__P_178_12 = null;
          this.fireEvent("slideAnimationEnd");
        }, this);

        this.__scrollAnimationframe__P_178_12.startSequence(duration);
      },

      /*
      ---------------------------------------------------------------------------
        PROPERTY APPLY ROUTINES
      ---------------------------------------------------------------------------
      */
      // property apply
      _applyOrientation: function _applyOrientation(value, old) {
        // ARIA attrs
        this.getContentElement().setAttribute("aria-orientation", value);
        var knob = this.getChildControl("knob"); // Update private flag for faster access

        this.__isHorizontal__P_178_13 = value === "horizontal"; // Toggle states and knob layout

        if (this.__isHorizontal__P_178_13) {
          this.removeState("vertical");
          knob.removeState("vertical");
          this.addState("horizontal");
          knob.addState("horizontal");
          knob.setLayoutProperties({
            top: 0,
            right: null,
            bottom: 0
          });
        } else {
          this.removeState("horizontal");
          knob.removeState("horizontal");
          this.addState("vertical");
          knob.addState("vertical");
          knob.setLayoutProperties({
            right: 0,
            bottom: null,
            left: 0
          });
        } // Sync knob position


        this._updateKnobPosition();
      },
      // property apply
      _applyKnobFactor: function _applyKnobFactor(value, old) {
        if (value != null) {
          this._updateKnobSize();
        } else {
          if (this.__isHorizontal__P_178_13) {
            this.getChildControl("knob").resetWidth();
          } else {
            this.getChildControl("knob").resetHeight();
          }
        }
      },
      // property apply
      _applyValue: function _applyValue(value, old) {
        if (value != null) {
          // ARIA attrs
          this.getContentElement().setAttribute("aria-valuenow", value);

          this._updateKnobPosition();

          if (this.__dragMode__P_178_3) {
            this.__dragValue__P_178_11 = [value, old];
          } else {
            this.fireEvent("changeValue", qx.event.type.Data, [value, old]);
          }
        } else {
          this.resetValue();
        }
      },

      /**
       * Helper for applyValue which fires the changeValue event.
       */
      _fireValue: function _fireValue() {
        if (!this.__dragValue__P_178_11) {
          return;
        }

        var tmp = this.__dragValue__P_178_11;
        this.__dragValue__P_178_11 = null;
        this.fireEvent("changeValue", qx.event.type.Data, tmp);
      },
      // property apply
      _applyMinimum: function _applyMinimum(value, old) {
        // ARIA attrs
        this.getContentElement().setAttribute("aria-valuemin", value);

        if (this.getValue() < value) {
          this.setValue(value);
        }

        this._updateKnobPosition();
      },
      // property apply
      _applyMaximum: function _applyMaximum(value, old) {
        // ARIA attrs
        this.getContentElement().setAttribute("aria-valuemax", value);

        if (this.getValue() > value) {
          this.setValue(value);
        }

        this._updateKnobPosition();
      }
    }
  });
  qx.ui.form.Slider.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.form.Slider": {
        "construct": true,
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
       * Sebastian Werner (wpbasti)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * Minimal modified version of the {@link qx.ui.form.Slider} to be
   * used by {@link qx.ui.core.scroll.ScrollBar}.
   *
   * @internal
   */
  qx.Class.define("qx.ui.core.scroll.ScrollSlider", {
    extend: qx.ui.form.Slider,
    // overridden
    construct: function construct(orientation) {
      qx.ui.form.Slider.constructor.call(this, orientation); // Remove roll/keypress events

      this.removeListener("keypress", this._onKeyPress);
      this.removeListener("roll", this._onRoll);
    },
    members: {
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id, hash) {
        var control;

        switch (id) {
          case "knob":
            control = qx.ui.core.scroll.ScrollSlider.superclass.prototype._createChildControlImpl.call(this, id);
            control.addListener("dblclick", function (e) {
              e.stopPropagation();
            });
        }

        return control || qx.ui.core.scroll.ScrollSlider.superclass.prototype._createChildControlImpl.call(this, id);
      },
      // overridden
      getSizeHint: function getSizeHint(compute) {
        // get the original size hint
        var hint = qx.ui.core.scroll.ScrollSlider.superclass.prototype.getSizeHint.call(this); // set the width or height to 0 depending on the orientation.
        // this is necessary to prevent the ScrollSlider to change the size
        // hint of its parent, which can cause errors on outer flex layouts
        // [BUG #3279]

        if (this.getOrientation() === "horizontal") {
          hint.width = 0;
        } else {
          hint.height = 0;
        }

        return hint;
      }
    }
  });
  qx.ui.core.scroll.ScrollSlider.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.form.Button": {
        "construct": true,
        "require": true
      },
      "qx.event.AcceleratingTimer": {
        "construct": true
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
       * Martin Wittemann (martinwittemann)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * The RepeatButton is a special button, which fires repeatedly {@link #execute}
   * events, while a button is pressed on the button. The initial delay
   * and the interval time can be set using the properties {@link #firstInterval}
   * and {@link #interval}. The {@link #execute} events will be fired in a shorter
   * amount of time if a button is hold, until the min {@link #minTimer}
   * is reached. The {@link #timerDecrease} property sets the amount of milliseconds
   * which will decreased after every firing.
   *
   * <pre class='javascript'>
   *   var button = new qx.ui.form.RepeatButton("Hello World");
   *
   *   button.addListener("execute", function(e) {
   *     alert("Button is executed");
   *   }, this);
   *
   *   this.getRoot.add(button);
   * </pre>
   *
   * This example creates a button with the label "Hello World" and attaches an
   * event listener to the {@link #execute} event.
   *
   * *External Documentation*
   *
   * <a href='http://qooxdoo.org/docs/#desktop/widget/repeatbutton.md' target='_blank'>
   * Documentation of this widget in the qooxdoo manual.</a>
   */
  qx.Class.define("qx.ui.form.RepeatButton", {
    extend: qx.ui.form.Button,

    /**
     * @param label {String} Label to use
     * @param icon {String?null} Icon to use
     */
    construct: function construct(label, icon) {
      qx.ui.form.Button.constructor.call(this, label, icon); // create the timer and add the listener

      this.__timer__P_177_0 = new qx.event.AcceleratingTimer();

      this.__timer__P_177_0.addListener("interval", this._onInterval, this);
    },
    events: {
      /**
       * This event gets dispatched with every interval. The timer gets executed
       * as long as the user holds down a button.
       */
      execute: "qx.event.type.Event",

      /**
       * This event gets dispatched when the button is pressed.
       */
      press: "qx.event.type.Event",

      /**
       * This event gets dispatched when the button is released.
       */
      release: "qx.event.type.Event"
    },
    properties: {
      /**
       * Interval used after the first run of the timer. Usually a smaller value
       * than the "firstInterval" property value to get a faster reaction.
       */
      interval: {
        check: "Integer",
        init: 100
      },

      /**
       * Interval used for the first run of the timer. Usually a greater value
       * than the "interval" property value to a little delayed reaction at the first
       * time.
       */
      firstInterval: {
        check: "Integer",
        init: 500
      },

      /** This configures the minimum value for the timer interval. */
      minTimer: {
        check: "Integer",
        init: 20
      },

      /** Decrease of the timer on each interval (for the next interval) until minTimer reached. */
      timerDecrease: {
        check: "Integer",
        init: 2
      }
    },
    members: {
      __executed__P_177_1: null,
      __timer__P_177_0: null,

      /**
       * Calling this function is like a tap from the user on the
       * button with all consequences.
       * <span style='color: red'>Be sure to call the {@link #release} function.</span>
       *
       */
      press: function press() {
        // only if the button is enabled
        if (this.isEnabled()) {
          // if the state pressed must be applied (first call)
          if (!this.hasState("pressed")) {
            // start the timer
            this.__startInternalTimer__P_177_2();
          } // set the states


          this.removeState("abandoned");
          this.addState("pressed");
        }
      },

      /**
       * Calling this function is like a release from the user on the
       * button with all consequences.
       * Usually the {@link #release} function will be called before the call of
       * this function.
       *
       * @param fireExecuteEvent {Boolean?true} flag which signals, if an event should be fired
       */
      release: function release(fireExecuteEvent) {
        // only if the button is enabled
        if (!this.isEnabled()) {
          return;
        } // only if the button is pressed


        if (this.hasState("pressed")) {
          // if the button has not been executed
          if (!this.__executed__P_177_1) {
            this.execute();
          }
        } // remove button states


        this.removeState("pressed");
        this.removeState("abandoned"); // stop the repeat timer and therefore the execution

        this.__stopInternalTimer__P_177_3();
      },

      /*
      ---------------------------------------------------------------------------
        PROPERTY APPLY ROUTINES
      ---------------------------------------------------------------------------
      */
      // overridden
      _applyEnabled: function _applyEnabled(value, old) {
        qx.ui.form.RepeatButton.superclass.prototype._applyEnabled.call(this, value, old);

        if (!value) {
          if (this.isCapturing()) {
            // also release capture because out event is missing on iOS
            this.releaseCapture();
          } // remove button states


          this.removeState("pressed");
          this.removeState("abandoned"); // stop the repeat timer and therefore the execution

          this.__stopInternalTimer__P_177_3();
        }
      },

      /*
      ---------------------------------------------------------------------------
        EVENT HANDLER
      ---------------------------------------------------------------------------
      */

      /**
       * Listener method for "pointerover" event
       * <ul>
       * <li>Adds state "hovered"</li>
       * <li>Removes "abandoned" and adds "pressed" state (if "abandoned" state is set)</li>
       * </ul>
       *
       * @param e {qx.event.type.Pointer} Pointer event
       */
      _onPointerOver: function _onPointerOver(e) {
        if (!this.isEnabled() || e.getTarget() !== this) {
          return;
        }

        if (this.hasState("abandoned")) {
          this.removeState("abandoned");
          this.addState("pressed");

          this.__timer__P_177_0.start();
        }

        this.addState("hovered");
      },

      /**
       * Listener method for "pointerout" event
       * <ul>
       * <li>Removes "hovered" state</li>
       * <li>Adds "abandoned" and removes "pressed" state (if "pressed" state is set)</li>
       * </ul>
       *
       * @param e {qx.event.type.Pointer} Pointer event
       */
      _onPointerOut: function _onPointerOut(e) {
        if (!this.isEnabled() || e.getTarget() !== this) {
          return;
        }

        this.removeState("hovered");

        if (this.hasState("pressed")) {
          this.removeState("pressed");
          this.addState("abandoned");

          this.__timer__P_177_0.stop();
        }
      },

      /**
       * Callback method for the "pointerdown" method.
       *
       * Sets the interval of the timer (value of firstInterval property) and
       * starts the timer. Additionally removes the state "abandoned" and adds the
       * state "pressed".
       *
       * @param e {qx.event.type.Pointer} pointerdown event
       */
      _onPointerDown: function _onPointerDown(e) {
        if (!e.isLeftPressed()) {
          return;
        } // Activate capturing if the button get a pointerout while
        // the button is pressed.


        this.capture();

        this.__startInternalTimer__P_177_2();

        e.stopPropagation();
      },

      /**
       * Callback method for the "pointerup" event.
       *
       * Handles the case that the user is releasing a button
       * before the timer interval method got executed. This way the
       * "execute" method get executed at least one time.
       *
       * @param e {qx.event.type.Pointer} pointerup event
       */
      _onPointerUp: function _onPointerUp(e) {
        this.releaseCapture();

        if (!this.hasState("abandoned")) {
          this.addState("hovered");

          if (this.hasState("pressed") && !this.__executed__P_177_1) {
            this.execute();
          }
        }

        this.__stopInternalTimer__P_177_3();

        e.stopPropagation();
      },
      // Nothing to do, 'execute' is already fired by _onPointerUp.
      _onTap: function _onTap(e) {},

      /**
       * Listener method for "keyup" event.
       *
       * Removes "abandoned" and "pressed" state (if "pressed" state is set)
       * for the keys "Enter" or "Space" and stops the internal timer
       * (same like pointer up).
       *
       * @param e {Event} Key event
       */
      _onKeyUp: function _onKeyUp(e) {
        switch (e.getKeyIdentifier()) {
          case "Enter":
          case "Space":
            if (this.hasState("pressed")) {
              if (!this.__executed__P_177_1) {
                this.execute();
              }

              this.removeState("pressed");
              this.removeState("abandoned");
              e.stopPropagation();

              this.__stopInternalTimer__P_177_3();
            }

        }
      },

      /**
       * Listener method for "keydown" event.
       *
       * Removes "abandoned" and adds "pressed" state
       * for the keys "Enter" or "Space". It also starts
       * the internal timer (same like pointerdown).
       *
       * @param e {Event} Key event
       */
      _onKeyDown: function _onKeyDown(e) {
        switch (e.getKeyIdentifier()) {
          case "Enter":
          case "Space":
            this.removeState("abandoned");
            this.addState("pressed");
            e.stopPropagation();

            this.__startInternalTimer__P_177_2();

        }
      },

      /**
       * Callback for the interval event.
       *
       * Stops the timer and starts it with a new interval
       * (value of the "interval" property - value of the "timerDecrease" property).
       * Dispatches the "execute" event.
       *
       * @param e {qx.event.type.Event} interval event
       */
      _onInterval: function _onInterval(e) {
        this.__executed__P_177_1 = true;
        this.fireEvent("execute");
      },

      /*
      ---------------------------------------------------------------------------
        INTERNAL TIMER
      ---------------------------------------------------------------------------
      */

      /**
       * Starts the internal timer which causes firing of execution
       * events in an interval. It also presses the button.
       *
       */
      __startInternalTimer__P_177_2: function __startInternalTimer__P_177_2() {
        this.fireEvent("press");
        this.__executed__P_177_1 = false;

        this.__timer__P_177_0.set({
          interval: this.getInterval(),
          firstInterval: this.getFirstInterval(),
          minimum: this.getMinTimer(),
          decrease: this.getTimerDecrease()
        }).start();

        this.removeState("abandoned");
        this.addState("pressed");
      },

      /**
       * Stops the internal timer and releases the button.
       *
       */
      __stopInternalTimer__P_177_3: function __stopInternalTimer__P_177_3() {
        this.fireEvent("release");

        this.__timer__P_177_0.stop();

        this.removeState("abandoned");
        this.removeState("pressed");
      }
    },

    /*
      *****************************************************************************
         DESTRUCTOR
      *****************************************************************************
      */
    destruct: function destruct() {
      this._disposeObjects("__timer__P_177_0");
    }
  });
  qx.ui.form.RepeatButton.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.form.MenuButton": {
        "require": true
      },
      "qx.ui.toolbar.ToolBar": {},
      "qx.ui.menu.Manager": {}
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
  
  ************************************************************************ */

  /**
   * A menubar button
   */
  qx.Class.define("qx.ui.menubar.Button", {
    extend: qx.ui.form.MenuButton,

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      appearance: {
        refine: true,
        init: "menubar-button"
      },
      show: {
        refine: true,
        init: "inherit"
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      /*
      ---------------------------------------------------------------------------
        HELPER METHODS
      ---------------------------------------------------------------------------
      */

      /**
       * Inspects the parent chain to find the MenuBar
       *
       * @return {qx.ui.menubar.MenuBar} MenuBar instance or <code>null</code>.
       */
      getMenuBar: function getMenuBar() {
        var parent = this;

        while (parent) {
          /* this method is also used by toolbar.MenuButton, so we need to check
             for a ToolBar instance. */
          if (parent instanceof qx.ui.toolbar.ToolBar) {
            return parent;
          }

          parent = parent.getLayoutParent();
        }

        return null;
      },
      // overridden
      open: function open(selectFirst) {
        qx.ui.menubar.Button.superclass.prototype.open.call(this, selectFirst);
        var menubar = this.getMenuBar();

        if (menubar) {
          menubar._setAllowMenuOpenHover(true);
        }
      },

      /*
      ---------------------------------------------------------------------------
        EVENT LISTENERS
      ---------------------------------------------------------------------------
      */

      /**
       * Listener for visibility property changes of the attached menu
       *
       * @param e {qx.event.type.Data} Property change event
       */
      _onMenuChange: function _onMenuChange(e) {
        var menu = this.getMenu();
        var menubar = this.getMenuBar();

        if (menu.isVisible()) {
          this.addState("pressed"); // Sync with open menu property

          if (menubar) {
            menubar.setOpenMenu(menu);
          }
        } else {
          this.removeState("pressed"); // Sync with open menu property

          if (menubar && menubar.getOpenMenu() == menu) {
            menubar.resetOpenMenu();

            menubar._setAllowMenuOpenHover(false);
          }
        }
      },
      // overridden
      _onPointerUp: function _onPointerUp(e) {
        qx.ui.menubar.Button.superclass.prototype._onPointerUp.call(this, e); // Set state 'pressed' to visualize that the menu is open.


        var menu = this.getMenu();

        if (menu && menu.isVisible() && !this.hasState("pressed")) {
          this.addState("pressed");
        }
      },

      /**
       * Event listener for pointerover event
       *
       * @param e {qx.event.type.Pointer} pointerover event object
       */
      _onPointerOver: function _onPointerOver(e) {
        // Add hovered state
        this.addState("hovered"); // Open submenu

        if (this.getMenu() && e.getPointerType() == "mouse") {
          var menubar = this.getMenuBar();

          if (menubar && menubar._isAllowMenuOpenHover()) {
            // Hide all open menus
            qx.ui.menu.Manager.getInstance().hideAll(); // Set it again, because hideAll remove it.

            menubar._setAllowMenuOpenHover(true); // Then show the attached menu


            if (this.isEnabled()) {
              this.open();
            }
          }
        }
      }
    }
  });
  qx.ui.menubar.Button.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.layout.VBox": {
        "require": true
      },
      "qx.lang.Array": {}
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
   * Layouter used by the qooxdoo menu's to render their buttons
   *
   * @internal
   */
  qx.Class.define("qx.ui.menu.Layout", {
    extend: qx.ui.layout.VBox,

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /** Spacing between each cell on the menu buttons */
      columnSpacing: {
        check: "Integer",
        init: 0,
        apply: "_applyLayoutChange"
      },

      /**
       * Whether a column and which column should automatically span
       * when the following cell is empty. Spanning may be disabled
       * through setting this property to <code>null</code>.
       */
      spanColumn: {
        check: "Integer",
        init: 1,
        nullable: true,
        apply: "_applyLayoutChange"
      },

      /** Default icon column width if no icons are rendered */
      iconColumnWidth: {
        check: "Integer",
        init: 0,
        themeable: true,
        apply: "_applyLayoutChange"
      },

      /** Default arrow column width if no sub menus are rendered */
      arrowColumnWidth: {
        check: "Integer",
        init: 0,
        themeable: true,
        apply: "_applyLayoutChange"
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __columnSizes__P_214_0: null,

      /*
      ---------------------------------------------------------------------------
        LAYOUT INTERFACE
      ---------------------------------------------------------------------------
      */
      // overridden
      _computeSizeHint: function _computeSizeHint() {
        var children = this._getLayoutChildren();

        var child, sizes, spacing;
        var spanColumn = this.getSpanColumn();
        var columnSizes = this.__columnSizes__P_214_0 = [0, 0, 0, 0];
        var columnSpacing = this.getColumnSpacing();
        var spanColumnWidth = 0;
        var maxInset = 0; // Compute column sizes and insets

        for (var i = 0, l = children.length; i < l; i++) {
          child = children[i];

          if (child.isAnonymous()) {
            continue;
          }

          sizes = child.getChildrenSizes();

          for (var column = 0; column < sizes.length; column++) {
            if (spanColumn != null && column == spanColumn && sizes[spanColumn + 1] == 0) {
              spanColumnWidth = Math.max(spanColumnWidth, sizes[column]);
            } else {
              columnSizes[column] = Math.max(columnSizes[column], sizes[column]);
            }
          }

          var insets = children[i].getInsets();
          maxInset = Math.max(maxInset, insets.left + insets.right);
        } // Fix label column width is cases where the maximum button with no shortcut
        // is larger than the maximum button with a shortcut


        if (spanColumn != null && columnSizes[spanColumn] + columnSpacing + columnSizes[spanColumn + 1] < spanColumnWidth) {
          columnSizes[spanColumn] = spanColumnWidth - columnSizes[spanColumn + 1] - columnSpacing;
        } // When merging the cells for label and shortcut
        // ignore the spacing between them


        if (spanColumnWidth == 0) {
          spacing = columnSpacing * 2;
        } else {
          spacing = columnSpacing * 3;
        } // Fix zero size icon column


        if (columnSizes[0] == 0) {
          columnSizes[0] = this.getIconColumnWidth();
        } // Fix zero size arrow column


        if (columnSizes[3] == 0) {
          columnSizes[3] = this.getArrowColumnWidth();
        }

        var height = qx.ui.menu.Layout.superclass.prototype._computeSizeHint.call(this).height; // Build hint


        return {
          minHeight: height,
          height: height,
          width: qx.lang.Array.sum(columnSizes) + maxInset + spacing
        };
      },

      /*
      ---------------------------------------------------------------------------
        CUSTOM ADDONS
      ---------------------------------------------------------------------------
      */

      /**
       * Returns the column sizes detected during the pre-layout phase
       *
       * @return {Array} List of all column widths
       */
      getColumnSizes: function getColumnSizes() {
        return this.__columnSizes__P_214_0 || null;
      }
    },

    /*
     *****************************************************************************
        DESTRUCT
     *****************************************************************************
     */
    destruct: function destruct() {
      this.__columnSizes__P_214_0 = null;
    }
  });
  qx.ui.menu.Layout.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.Widget": {
        "construct": true,
        "require": true
      },
      "qx.ui.core.MRemoteChildrenHandling": {
        "require": true
      },
      "qx.ui.core.MRemoteLayoutHandling": {
        "require": true
      },
      "qx.ui.form.RepeatButton": {},
      "qx.ui.container.Composite": {},
      "qx.ui.core.scroll.ScrollPane": {},
      "qx.ui.layout.HBox": {},
      "qx.ui.layout.VBox": {}
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
       * Jonathan Weiß (jonathan_rass)
  
  ************************************************************************ */

  /**
   * Container, which provides scrolling in one dimension (vertical or horizontal).
   *
   * @childControl button-forward {qx.ui.form.RepeatButton} button to step forward
   * @childControl button-backward {qx.ui.form.RepeatButton} button to step backward
   * @childControl content {qx.ui.container.Composite} container to hold the content
   * @childControl scrollpane {qx.ui.core.scroll.ScrollPane} the scroll pane holds the content to enable scrolling
   *
   * *Example*
   *
   * Here is a little example of how to use the widget.
   *
   * <pre class='javascript'>
   *   // create slide bar container
   *   slideBar = new qx.ui.container.SlideBar().set({
   *     width: 300
   *   });
   *
   *   // set layout
   *   slideBar.setLayout(new qx.ui.layout.HBox());
   *
   *   // add some widgets
   *   for (var i=0; i<10; i++)
   *   {
   *     slideBar.add((new qx.ui.core.Widget()).set({
   *       backgroundColor : (i % 2 == 0) ? "red" : "blue",
   *       width : 60
   *     }));
   *   }
   *
   *   this.getRoot().add(slideBar);
   * </pre>
   *
   * This example creates a SlideBar and add some widgets with alternating
   * background colors. Since the content is larger than the container, two
   * scroll buttons at the left and the right edge are shown.
   *
   * *External Documentation*
   *
   * <a href='http://qooxdoo.org/docs/#desktop/widget/slidebar.md' target='_blank'>
   * Documentation of this widget in the qooxdoo manual.</a>
   */
  qx.Class.define("qx.ui.container.SlideBar", {
    extend: qx.ui.core.Widget,
    include: [qx.ui.core.MRemoteChildrenHandling, qx.ui.core.MRemoteLayoutHandling],

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param orientation {String?"horizontal"} The slide bar orientation
     */
    construct: function construct(orientation) {
      qx.ui.core.Widget.constructor.call(this);
      var scrollPane = this.getChildControl("scrollpane");

      this._add(scrollPane, {
        flex: 1
      });

      if (orientation != null) {
        this.setOrientation(orientation);
      } else {
        this.initOrientation();
      }

      this.addListener("roll", this._onRoll, this);
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      // overridden
      appearance: {
        refine: true,
        init: "slidebar"
      },

      /** Orientation of the bar */
      orientation: {
        check: ["horizontal", "vertical"],
        init: "horizontal",
        apply: "_applyOrientation"
      },

      /** The number of pixels to scroll if the buttons are pressed */
      scrollStep: {
        check: "Integer",
        init: 15,
        themeable: true
      }
    },

    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */
    events: {
      /** Fired on scroll animation end invoked by 'scroll*' methods. */
      scrollAnimationEnd: "qx.event.type.Event"
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    /* eslint-disable @qooxdoo/qx/no-refs-in-members */
    members: {
      /*
      ---------------------------------------------------------------------------
        WIDGET API
      ---------------------------------------------------------------------------
      */
      // overridden
      getChildrenContainer: function getChildrenContainer() {
        return this.getChildControl("content");
      },
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id, hash) {
        var control;

        switch (id) {
          case "button-forward":
            control = new qx.ui.form.RepeatButton();
            control.addListener("execute", this._onExecuteForward, this);
            control.setFocusable(false);

            this._addAt(control, 2);

            break;

          case "button-backward":
            control = new qx.ui.form.RepeatButton();
            control.addListener("execute", this._onExecuteBackward, this);
            control.setFocusable(false);

            this._addAt(control, 0);

            break;

          case "content":
            control = new qx.ui.container.Composite();
            this.getChildControl("scrollpane").add(control);
            break;

          case "scrollpane":
            control = new qx.ui.core.scroll.ScrollPane();
            control.addListener("update", this._onResize, this);
            control.addListener("scrollX", this._onScroll, this);
            control.addListener("scrollY", this._onScroll, this);
            control.addListener("scrollAnimationEnd", this._onScrollAnimationEnd, this);
            break;
        }

        return control || qx.ui.container.SlideBar.superclass.prototype._createChildControlImpl.call(this, id);
      },
      // overridden

      /**
       * @lint ignoreReferenceField(_forwardStates)
       */
      _forwardStates: {
        barLeft: true,
        barTop: true,
        barRight: true,
        barBottom: true
      },

      /*
      ---------------------------------------------------------------------------
        PUBLIC SCROLL API
      ---------------------------------------------------------------------------
      */

      /**
       * Scrolls the element's content by the given amount.
       *
       * @param offset {Integer?0} Amount to scroll
       * @param duration {Number?} The time in milliseconds the scroll to should take.
       */
      scrollBy: function scrollBy(offset, duration) {
        var pane = this.getChildControl("scrollpane");

        if (this.getOrientation() === "horizontal") {
          pane.scrollByX(offset, duration);
        } else {
          pane.scrollByY(offset, duration);
        }
      },

      /**
       * Scrolls the element's content to the given coordinate
       *
       * @param value {Integer} The position to scroll to.
       * @param duration {Number?} The time in milliseconds the scroll to should take.
       */
      scrollTo: function scrollTo(value, duration) {
        var pane = this.getChildControl("scrollpane");

        if (this.getOrientation() === "horizontal") {
          pane.scrollToX(value, duration);
        } else {
          pane.scrollToY(value, duration);
        }
      },

      /*
      ---------------------------------------------------------------------------
        PROPERTY APPLY ROUTINES
      ---------------------------------------------------------------------------
      */
      // overridden
      _applyEnabled: function _applyEnabled(value, old, name) {
        qx.ui.container.SlideBar.superclass.prototype._applyEnabled.call(this, value, old, name);

        this._updateArrowsEnabled();
      },
      // property apply
      _applyOrientation: function _applyOrientation(value, old) {
        // ARIA attrs
        this.getContentElement().setAttribute("aria-orientation", value);
        var oldLayouts = [this.getLayout(), this._getLayout()];
        var buttonForward = this.getChildControl("button-forward");
        var buttonBackward = this.getChildControl("button-backward"); // old can also be null, so we have to check both explicitly to set
        // the states correctly.

        if (old == "vertical" && value == "horizontal") {
          buttonForward.removeState("vertical");
          buttonBackward.removeState("vertical");
          buttonForward.addState("horizontal");
          buttonBackward.addState("horizontal");
        } else if (old == "horizontal" && value == "vertical") {
          buttonForward.removeState("horizontal");
          buttonBackward.removeState("horizontal");
          buttonForward.addState("vertical");
          buttonBackward.addState("vertical");
        }

        if (value == "horizontal") {
          this._setLayout(new qx.ui.layout.HBox());

          this.setLayout(new qx.ui.layout.HBox());
        } else {
          this._setLayout(new qx.ui.layout.VBox());

          this.setLayout(new qx.ui.layout.VBox());
        }

        if (oldLayouts[0]) {
          oldLayouts[0].dispose();
        }

        if (oldLayouts[1]) {
          oldLayouts[1].dispose();
        }
      },

      /*
      ---------------------------------------------------------------------------
        EVENT LISTENERS
      ---------------------------------------------------------------------------
      */

      /**
       * Scrolls pane on roll events
       *
       * @param e {qx.event.type.Roll} the roll event
       */
      _onRoll: function _onRoll(e) {
        // only wheel and touch
        if (e.getPointerType() == "mouse") {
          return;
        }

        var delta = 0;
        var pane = this.getChildControl("scrollpane");

        if (this.getOrientation() === "horizontal") {
          delta = e.getDelta().x;
          var position = pane.getScrollX();
          var max = pane.getScrollMaxX();
          var steps = parseInt(delta); // pass the event to the parent if both scrollbars are at the end

          if (!(steps < 0 && position <= 0 || steps > 0 && position >= max || delta == 0)) {
            e.stop();
          } else {
            e.stopMomentum();
          }
        } else {
          delta = e.getDelta().y;
          var position = pane.getScrollY();
          var max = pane.getScrollMaxY();
          var steps = parseInt(delta); // pass the event to the parent if both scrollbars are at the end

          if (!(steps < 0 && position <= 0 || steps > 0 && position >= max || delta == 0)) {
            e.stop();
          } else {
            e.stopMomentum();
          }
        }

        this.scrollBy(parseInt(delta, 10)); // block all momentum scrolling

        if (e.getMomentum()) {
          e.stop();
        }
      },

      /**
       * Update arrow enabled state after scrolling
       */
      _onScroll: function _onScroll() {
        this._updateArrowsEnabled();
      },

      /**
       * Handler to fire the 'scrollAnimationEnd' event.
       */
      _onScrollAnimationEnd: function _onScrollAnimationEnd() {
        this.fireEvent("scrollAnimationEnd");
      },

      /**
       * Listener for resize event. This event is fired after the
       * first flush of the element which leads to another queuing
       * when the changes modify the visibility of the scroll buttons.
       *
       * @param e {Event} Event object
       */
      _onResize: function _onResize(e) {
        var content = this.getChildControl("scrollpane").getChildren()[0];

        if (!content) {
          return;
        }

        var innerSize = this.getInnerSize();
        var contentSize = content.getBounds();
        var overflow = this.getOrientation() === "horizontal" ? contentSize.width > innerSize.width : contentSize.height > innerSize.height;

        if (overflow) {
          this._showArrows();

          this._updateArrowsEnabled();
        } else {
          this._hideArrows();
        }
      },

      /**
       * Scroll handler for left scrolling
       *
       */
      _onExecuteBackward: function _onExecuteBackward() {
        this.scrollBy(-this.getScrollStep());
      },

      /**
       * Scroll handler for right scrolling
       *
       */
      _onExecuteForward: function _onExecuteForward() {
        this.scrollBy(this.getScrollStep());
      },

      /*
      ---------------------------------------------------------------------------
        UTILITIES
      ---------------------------------------------------------------------------
      */

      /**
       * Update arrow enabled state
       */
      _updateArrowsEnabled: function _updateArrowsEnabled() {
        // set the disables state directly because we are overriding the
        // inheritance
        if (!this.getEnabled()) {
          this.getChildControl("button-backward").setEnabled(false);
          this.getChildControl("button-forward").setEnabled(false);
          return;
        }

        var pane = this.getChildControl("scrollpane");

        if (this.getOrientation() === "horizontal") {
          var position = pane.getScrollX();
          var max = pane.getScrollMaxX();
        } else {
          var position = pane.getScrollY();
          var max = pane.getScrollMaxY();
        }

        this.getChildControl("button-backward").setEnabled(position > 0);
        this.getChildControl("button-forward").setEnabled(position < max);
      },

      /**
       * Show the arrows (Called from resize event)
       *
       */
      _showArrows: function _showArrows() {
        this._showChildControl("button-forward");

        this._showChildControl("button-backward");
      },

      /**
       * Hide the arrows (Called from resize event)
       *
       */
      _hideArrows: function _hideArrows() {
        this._excludeChildControl("button-forward");

        this._excludeChildControl("button-backward");

        this.scrollTo(0);
      }
    }
  });
  qx.ui.container.SlideBar.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.container.SlideBar": {
        "construct": true,
        "require": true
      },
      "qx.ui.form.HoverButton": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2009 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * The MenuSlideBar is used to scroll menus if they don't fit on the screen.
   *
   * @childControl button-forward {qx.ui.form.HoverButton} scrolls forward of hovered
   * @childControl button-backward {qx.ui.form.HoverButton} scrolls backward if hovered
   *
   * @internal
   */
  qx.Class.define("qx.ui.menu.MenuSlideBar", {
    extend: qx.ui.container.SlideBar,
    construct: function construct() {
      qx.ui.container.SlideBar.constructor.call(this, "vertical");
    },
    properties: {
      appearance: {
        refine: true,
        init: "menu-slidebar"
      }
    },
    members: {
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id, hash) {
        var control;

        switch (id) {
          case "button-forward":
            control = new qx.ui.form.HoverButton();
            control.addListener("execute", this._onExecuteForward, this);

            this._addAt(control, 2);

            break;

          case "button-backward":
            control = new qx.ui.form.HoverButton();
            control.addListener("execute", this._onExecuteBackward, this);

            this._addAt(control, 0);

            break;
        }

        return control || qx.ui.menu.MenuSlideBar.superclass.prototype._createChildControlImpl.call(this, id);
      }
    }
  });
  qx.ui.menu.MenuSlideBar.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Interface": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.window.IWindowManager": {}
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
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * All parent widgets of windows must implement this interface.
   */
  qx.Interface.define("qx.ui.window.IDesktop", {
    members: {
      /**
       * Sets the desktop's window manager
       *
       * @param manager {qx.ui.window.IWindowManager} The window manager
       */
      setWindowManager: function setWindowManager(manager) {
        this.assertInterface(manager, qx.ui.window.IWindowManager);
      },

      /**
       * Get a list of all windows added to the desktop (including hidden windows)
       *
       * @return {qx.ui.window.Window[]} Array of managed windows
       */
      getWindows: function getWindows() {},

      /**
       * Whether the configured layout supports a maximized window
       * e.g. is a Canvas.
       *
       * @return {Boolean} Whether the layout supports maximized windows
       */
      supportsMaximize: function supportsMaximize() {},

      /**
       * Block direct child widgets with a zIndex below <code>zIndex</code>
       *
       * @param zIndex {Integer} All child widgets with a zIndex below this value
       *     will be blocked
       */
      blockContent: function blockContent(zIndex) {
        this.assertInteger(zIndex);
      },

      /**
       * Remove the blocker.
       */
      unblock: function unblock() {},

      /**
       * Whether the widget is currently blocked
       *
       * @return {Boolean} whether the widget is blocked.
       */
      isBlocked: function isBlocked() {}
    }
  });
  qx.ui.window.IDesktop.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
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
      "qx.event.Timer": {
        "construct": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2009 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * Timer, which accelerates after each interval. The initial delay and the
   * interval time can be set using the properties {@link #firstInterval}
   * and {@link #interval}. The {@link #interval} events will be fired with
   * decreasing interval times while the timer is running, until the {@link #minimum}
   * is reached. The {@link #decrease} property sets the amount of milliseconds
   * which will decreased after every firing.
   *
   * This class is e.g. used in the {@link qx.ui.form.RepeatButton} and
   * {@link qx.ui.form.HoverButton} widgets.
   *
   * NOTE: Instances of this class must be disposed of after use
   *
   */
  qx.Class.define("qx.event.AcceleratingTimer", {
    extend: qx.core.Object,
    implement: [qx.core.IDisposable],
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      this.__timer__P_179_0 = new qx.event.Timer(this.getInterval());

      this.__timer__P_179_0.addListener("interval", this._onInterval, this);
    },
    events: {
      /** This event if fired each time the interval time has elapsed */
      interval: "qx.event.type.Event"
    },
    properties: {
      /**
       * Interval used after the first run of the timer. Usually a smaller value
       * than the "firstInterval" property value to get a faster reaction.
       */
      interval: {
        check: "Integer",
        init: 100
      },

      /**
       * Interval used for the first run of the timer. Usually a greater value
       * than the "interval" property value to a little delayed reaction at the first
       * time.
       */
      firstInterval: {
        check: "Integer",
        init: 500
      },

      /** This configures the minimum value for the timer interval. */
      minimum: {
        check: "Integer",
        init: 20
      },

      /** Decrease of the timer on each interval (for the next interval) until minTimer reached. */
      decrease: {
        check: "Integer",
        init: 2
      }
    },
    members: {
      __timer__P_179_0: null,
      __currentInterval__P_179_1: null,

      /**
       * Reset and start the timer.
       */
      start: function start() {
        this.__timer__P_179_0.setInterval(this.getFirstInterval());

        this.__timer__P_179_0.start();
      },

      /**
       * Stop the timer
       */
      stop: function stop() {
        this.__timer__P_179_0.stop();

        this.__currentInterval__P_179_1 = null;
      },

      /**
       * Interval event handler
       */
      _onInterval: function _onInterval() {
        this.__timer__P_179_0.stop();

        if (this.__currentInterval__P_179_1 == null) {
          this.__currentInterval__P_179_1 = this.getInterval();
        }

        this.__currentInterval__P_179_1 = Math.max(this.getMinimum(), this.__currentInterval__P_179_1 - this.getDecrease());

        this.__timer__P_179_0.setInterval(this.__currentInterval__P_179_1);

        this.__timer__P_179_0.start();

        this.fireEvent("interval");
      }
    },
    destruct: function destruct() {
      this._disposeObjects("__timer__P_179_0");
    }
  });
  qx.event.AcceleratingTimer.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.Widget": {
        "construct": true,
        "require": true
      },
      "qx.ui.core.MChildrenHandling": {
        "require": true
      },
      "qx.ui.layout.HBox": {
        "construct": true
      },
      "qx.util.PropertyUtil": {},
      "qx.ui.core.Spacer": {},
      "qx.ui.toolbar.Separator": {},
      "qx.ui.menubar.Button": {},
      "qx.ui.toolbar.Part": {}
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
       * Martin Wittemann (martinwittemann)
       * Jonathan Weiß (jonathan_rass)
  
  ************************************************************************ */

  /**
   * The Toolbar class is the main part of the toolbar widget.
   *
   * It can handle added {@link Button}s, {@link CheckBox}es, {@link RadioButton}s
   * and {@link Separator}s in its {@link #add} method. The {@link #addSpacer} method
   * adds a spacer at the current toolbar position. This means that the widgets
   * added after the method call of {@link #addSpacer} are aligned to the right of
   * the toolbar.
   *
   * For more details on the documentation of the toolbar widget, take a look at the
   * documentation of the {@link qx.ui.toolbar}-Package.
   */
  qx.Class.define("qx.ui.toolbar.ToolBar", {
    extend: qx.ui.core.Widget,
    include: qx.ui.core.MChildrenHandling,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qx.ui.core.Widget.constructor.call(this); // ARIA attrs

      this.getContentElement().setAttribute("role", "toolbar"); // add needed layout

      this._setLayout(new qx.ui.layout.HBox()); // initialize the overflow handling


      this.__removedItems__P_220_0 = [];
      this.__removePriority__P_220_1 = [];
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /** Appearance of the widget */
      appearance: {
        refine: true,
        init: "toolbar"
      },

      /** Holds the currently open menu (when the toolbar is used for menus) */
      openMenu: {
        check: "qx.ui.menu.Menu",
        event: "changeOpenMenu",
        nullable: true
      },

      /** Whether icons, labels, both or none should be shown. */
      show: {
        init: "both",
        check: ["both", "label", "icon"],
        inheritable: true,
        apply: "_applyShow",
        event: "changeShow"
      },

      /** The spacing between every child of the toolbar */
      spacing: {
        nullable: true,
        check: "Integer",
        themeable: true,
        apply: "_applySpacing"
      },

      /**
       * Widget which will be shown if at least one toolbar item is hidden.
       * Keep in mind to add this widget to the toolbar before you set it as
       * indicator!
       */
      overflowIndicator: {
        check: "qx.ui.core.Widget",
        nullable: true,
        apply: "_applyOverflowIndicator"
      },

      /** Enables the overflow handling which automatically removes items.*/
      overflowHandling: {
        init: false,
        check: "Boolean",
        apply: "_applyOverflowHandling"
      }
    },

    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */
    events: {
      /** Fired if an item will be hidden by the {@link #overflowHandling}.*/
      hideItem: "qx.event.type.Data",

      /** Fired if an item will be shown by the {@link #overflowHandling}.*/
      showItem: "qx.event.type.Data"
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      /*
      ---------------------------------------------------------------------------
        OVERFLOW HANDLING
      ---------------------------------------------------------------------------
      */
      __removedItems__P_220_0: null,
      __removePriority__P_220_1: null,
      // overridden
      _computeSizeHint: function _computeSizeHint() {
        // get the original hint
        var hint = qx.ui.toolbar.ToolBar.superclass.prototype._computeSizeHint.call(this);

        if (true && this.getOverflowHandling()) {
          var minWidth = 0; // if an overflow widget is given, use its width + spacing as min width

          var overflowWidget = this.getOverflowIndicator();

          if (overflowWidget) {
            minWidth = overflowWidget.getSizeHint().width + this.getSpacing();
          } // reset the minWidth because we reduce the count of elements


          hint.minWidth = minWidth;
        }

        return hint;
      },

      /**
       * Resize event handler.
       *
       * @param e {qx.event.type.Data} The resize event.
       */
      _onResize: function _onResize(e) {
        this._recalculateOverflow(e.getData().width);
      },

      /**
       * Responsible for calculation the overflow based on the available width.
       *
       * @param width {Integer?null} The available width.
       * @param requiredWidth {Integer?null} The required width for the widget
       *   if available.
       */
      _recalculateOverflow: function _recalculateOverflow(width, requiredWidth) {
        // do nothing if overflow handling is not enabled
        if (!this.getOverflowHandling()) {
          return;
        } // get all required sizes


        requiredWidth = requiredWidth || this.getSizeHint().width;
        var overflowWidget = this.getOverflowIndicator();
        var overflowWidgetWidth = 0;

        if (overflowWidget) {
          overflowWidgetWidth = overflowWidget.getSizeHint().width;
        }

        if (width == undefined && this.getBounds() != null) {
          width = this.getBounds().width;
        } // if we still don't have a width, than we are not added to a parent


        if (width == undefined) {
          // we should ignore it in that case
          return;
        } // if we have not enough space


        if (width < requiredWidth) {
          do {
            // get the next child
            var childToHide = this._getNextToHide(); // if there is no child to hide, just do nothing


            if (!childToHide) {
              return;
            } // get margins or spacing


            var margins = childToHide.getMarginLeft() + childToHide.getMarginRight();
            margins = Math.max(margins, this.getSpacing());
            var childWidth = childToHide.getSizeHint().width + margins;

            this.__hideChild__P_220_2(childToHide); // new width is the requiredWidth - the removed childs width


            requiredWidth -= childWidth; // show the overflowWidgetWidth

            if (overflowWidget && overflowWidget.getVisibility() != "visible") {
              overflowWidget.setVisibility("visible"); // if we need to add the overflow indicator, we need to add its width

              requiredWidth += overflowWidgetWidth; // add spacing or margins

              var overflowWidgetMargins = overflowWidget.getMarginLeft() + overflowWidget.getMarginRight();
              requiredWidth += Math.max(overflowWidgetMargins, this.getSpacing());
            }
          } while (requiredWidth > width); // if we can possibly show something

        } else if (this.__removedItems__P_220_0.length > 0) {
          do {
            var removedChild = this.__removedItems__P_220_0[0]; // if we have something we can show

            if (removedChild) {
              // get the margins or spacing
              var margins = removedChild.getMarginLeft() + removedChild.getMarginRight();
              margins = Math.max(margins, this.getSpacing()); // check if the element has been rendered before [BUG #4542]

              if (removedChild.getContentElement().getDomElement() == null) {
                // if not, apply the decorator element because it can change the
                // width of the child with padding e.g.
                removedChild.syncAppearance(); // also invalidate the layout cache to trigger size hint
                // recalculation

                removedChild.invalidateLayoutCache();
              }

              var removedChildWidth = removedChild.getSizeHint().width; // check if it fits in in case its the last child to replace

              var fits = false; // if we can remove the overflow widget if its available

              if (this.__removedItems__P_220_0.length == 1 && overflowWidgetWidth > 0) {
                var addedMargin = margins - this.getSpacing();
                var wouldRequiredWidth = requiredWidth - overflowWidgetWidth + removedChildWidth + addedMargin;
                fits = width > wouldRequiredWidth;
              } // if it just fits in || it fits in when we remove the overflow widget


              if (width > requiredWidth + removedChildWidth + margins || fits) {
                this.__showChild__P_220_3(removedChild);

                requiredWidth += removedChildWidth; // check if we need to remove the overflow widget

                if (overflowWidget && this.__removedItems__P_220_0.length == 0) {
                  overflowWidget.setVisibility("excluded");
                }
              } else {
                return;
              }
            }
          } while (width >= requiredWidth && this.__removedItems__P_220_0.length > 0);
        }
      },

      /**
       * Helper to show a toolbar item.
       *
       * @param child {qx.ui.core.Widget} The widget to show.
       */
      __showChild__P_220_3: function __showChild__P_220_3(child) {
        child.setVisibility("visible");

        this.__removedItems__P_220_0.shift();

        this.fireDataEvent("showItem", child);
      },

      /**
       * Helper to exclude a toolbar item.
       *
       * @param child {qx.ui.core.Widget} The widget to exclude.
       */
      __hideChild__P_220_2: function __hideChild__P_220_2(child) {
        // ignore the call if no child is given
        if (!child) {
          return;
        }

        this.__removedItems__P_220_0.unshift(child);

        child.setVisibility("excluded");
        this.fireDataEvent("hideItem", child);
      },

      /**
       * Responsible for returning the next item to remove. In It checks the
       * priorities added by {@link #setRemovePriority}. If all priorized widgets
       * already excluded, it takes the widget added at last.
       *
       * @return {qx.ui.core.Widget|null} The widget which should be removed next.
       *   If null is returned, no widget is available to remove.
       */
      _getNextToHide: function _getNextToHide() {
        // get the elements by priority
        for (var i = this.__removePriority__P_220_1.length - 1; i >= 0; i--) {
          var item = this.__removePriority__P_220_1[i]; // maybe a priority is left out and spacers don't have the visibility

          if (item && item.getVisibility && item.getVisibility() == "visible") {
            return item;
          }
        } // if there is non found by priority, check all available widgets


        var children = this._getChildren();

        for (var i = children.length - 1; i >= 0; i--) {
          var child = children[i]; // ignore the overflow widget

          if (child == this.getOverflowIndicator()) {
            continue;
          } // spacer don't have the visibility


          if (child.getVisibility && child.getVisibility() == "visible") {
            return child;
          }
        }
      },

      /**
       * The removal of the toolbar items is priority based. You can change these
       * priorities with this method. The higher a priority, the earlier it will
       * be excluded. Remember to use every priority only once! If you want
       * override an already set priority, use the override parameter.
       * Keep in mind to only use already added items.
       *
       * @param item {qx.ui.core.Widget} The item to give the priority.
       * @param priority {Integer} The priority, higher means removed earlier.
       * @param override {Boolean} true, if the priority should be overridden.
       */
      setRemovePriority: function setRemovePriority(item, priority, override) {
        // security check for overriding priorities
        if (!override && this.__removePriority__P_220_1[priority] != undefined) {
          throw new Error("Priority already in use!");
        }

        this.__removePriority__P_220_1[priority] = item;
      },
      // property apply
      _applyOverflowHandling: function _applyOverflowHandling(value, old) {
        // invalidate the own and the parents layout cache because the size hint changes
        this.invalidateLayoutCache();
        var parent = this.getLayoutParent();

        if (parent) {
          parent.invalidateLayoutCache();
        } // recalculate if possible


        var bounds = this.getBounds();

        if (bounds && bounds.width) {
          this._recalculateOverflow(bounds.width);
        } // if the handling has been enabled


        if (value) {
          // add the resize listener
          this.addListener("resize", this._onResize, this); // if the handles has been disabled
        } else {
          this.removeListener("resize", this._onResize, this); // set the overflow indicator to excluded

          var overflowIndicator = this.getOverflowIndicator();

          if (overflowIndicator) {
            overflowIndicator.setVisibility("excluded");
          } // set all buttons back to visible


          for (var i = 0; i < this.__removedItems__P_220_0.length; i++) {
            this.__removedItems__P_220_0[i].setVisibility("visible");
          } // reset the removed items


          this.__removedItems__P_220_0 = [];
        }
      },
      // property apply
      _applyOverflowIndicator: function _applyOverflowIndicator(value, old) {
        if (old) {
          this._remove(old);
        }

        if (value) {
          // check if its a child of the toolbar
          if (this._indexOf(value) == -1) {
            throw new Error("Widget must be child of the toolbar.");
          } // hide the widget


          value.setVisibility("excluded");
        }
      },

      /*
      ---------------------------------------------------------------------------
        MENU OPEN
      ---------------------------------------------------------------------------
      */
      __allowMenuOpenHover__P_220_4: false,

      /**
       * Indicate if a menu could be opened on hover or not.
       *
       * @internal
       * @param value {Boolean} <code>true</code> if a menu could be opened,
       *    <code>false</code> otherwise.
       */
      _setAllowMenuOpenHover: function _setAllowMenuOpenHover(value) {
        this.__allowMenuOpenHover__P_220_4 = value;
      },

      /**
       * Return if a menu could be opened on hover or not.
       *
       * @internal
       * @return {Boolean} <code>true</code> if a menu could be opened,
       *    <code>false</code> otherwise.
       */
      _isAllowMenuOpenHover: function _isAllowMenuOpenHover() {
        return this.__allowMenuOpenHover__P_220_4;
      },

      /*
      ---------------------------------------------------------------------------
        PROPERTY APPLY ROUTINES
      ---------------------------------------------------------------------------
      */
      // property apply
      _applySpacing: function _applySpacing(value, old) {
        var layout = this._getLayout();

        value == null ? layout.resetSpacing() : layout.setSpacing(value);
      },
      // property apply
      _applyShow: function _applyShow(value) {
        var children = this._getChildren();

        for (var i = 0; i < children.length; i++) {
          if (children[i].setShow) {
            children[i].setShow(value);
          }
        }
      },

      /*
      ---------------------------------------------------------------------------
        CHILD HANDLING
      ---------------------------------------------------------------------------
      */
      // overridden
      _add: function _add(child, options) {
        qx.ui.toolbar.ToolBar.superclass.prototype._add.call(this, child, options); // sync the show property (bug #6743) - but only if show wasn't explicitly set for the child (bug #6823)


        if (child.setShow && !qx.util.PropertyUtil.getUserValue(child, "show")) {
          child.setShow(this.getShow());
        }

        var newWidth = this.getSizeHint().width + child.getSizeHint().width + 2 * this.getSpacing();

        this._recalculateOverflow(null, newWidth);
      },
      // overridden
      _addAt: function _addAt(child, index, options) {
        qx.ui.toolbar.ToolBar.superclass.prototype._addAt.call(this, child, index, options); // sync the show property (bug #6743) - but only if show wasn't explicitly set for the child (bug #6823)


        if (child.setShow && !qx.util.PropertyUtil.getUserValue(child, "show")) {
          child.setShow(this.getShow());
        }

        var newWidth = this.getSizeHint().width + child.getSizeHint().width + 2 * this.getSpacing();

        this._recalculateOverflow(null, newWidth);
      },
      // overridden
      _addBefore: function _addBefore(child, before, options) {
        qx.ui.toolbar.ToolBar.superclass.prototype._addBefore.call(this, child, before, options); // sync the show property (bug #6743) - but only if show wasn't explicitly set for the child (bug #6823)


        if (child.setShow && !qx.util.PropertyUtil.getUserValue(child, "show")) {
          child.setShow(this.getShow());
        }

        var newWidth = this.getSizeHint().width + child.getSizeHint().width + 2 * this.getSpacing();

        this._recalculateOverflow(null, newWidth);
      },
      // overridden
      _addAfter: function _addAfter(child, after, options) {
        qx.ui.toolbar.ToolBar.superclass.prototype._addAfter.call(this, child, after, options); // sync the show property (bug #6743) - but only if show wasn't explicitly set for the child (bug #6823)


        if (child.setShow && !qx.util.PropertyUtil.getUserValue(child, "show")) {
          child.setShow(this.getShow());
        }

        var newWidth = this.getSizeHint().width + child.getSizeHint().width + 2 * this.getSpacing();

        this._recalculateOverflow(null, newWidth);
      },
      // overridden
      _remove: function _remove(child) {
        qx.ui.toolbar.ToolBar.superclass.prototype._remove.call(this, child);

        var newWidth = this.getSizeHint().width - child.getSizeHint().width - 2 * this.getSpacing();

        this._recalculateOverflow(null, newWidth);
      },
      // overridden
      _removeAt: function _removeAt(index) {
        var child = this._getChildren()[index];

        qx.ui.toolbar.ToolBar.superclass.prototype._removeAt.call(this, index);

        var newWidth = this.getSizeHint().width - child.getSizeHint().width - 2 * this.getSpacing();

        this._recalculateOverflow(null, newWidth);

        return child;
      },
      // overridden
      _removeAll: function _removeAll() {
        var children = qx.ui.toolbar.ToolBar.superclass.prototype._removeAll.call(this);

        this._recalculateOverflow(null, 0);

        return children;
      },

      /*
      ---------------------------------------------------------------------------
        UTILITIES
      ---------------------------------------------------------------------------
      */

      /**
       * Add a spacer to the toolbar. The spacer has a flex
       * value of one and will stretch to the available space.
       *
       * @return {qx.ui.core.Spacer} The newly added spacer object. A reference
       *   to the spacer is needed to remove this spacer from the layout.
       */
      addSpacer: function addSpacer() {
        var spacer = new qx.ui.core.Spacer();

        this._add(spacer, {
          flex: 1
        });

        return spacer;
      },

      /**
       * Adds a separator to the toolbar.
       */
      addSeparator: function addSeparator() {
        this.add(new qx.ui.toolbar.Separator());
      },

      /**
       * Returns all nested buttons which contains a menu to show. This is mainly
       * used for keyboard support.
       *
       * @return {Array} List of all menu buttons
       */
      getMenuButtons: function getMenuButtons() {
        var children = this.getChildren();
        var buttons = [];
        var child;

        for (var i = 0, l = children.length; i < l; i++) {
          child = children[i];

          if (child instanceof qx.ui.menubar.Button) {
            buttons.push(child);
          } else if (child instanceof qx.ui.toolbar.Part) {
            buttons.push.apply(buttons, child.getMenuButtons());
          }
        }

        return buttons;
      }
    },
    destruct: function destruct() {
      if (this.hasListener("resize")) {
        this.removeListener("resize", this._onResize, this);
      }
    }
  });
  qx.ui.toolbar.ToolBar.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.basic.Atom": {
        "construct": true,
        "require": true
      },
      "qx.ui.core.MExecutable": {
        "require": true
      },
      "qx.ui.form.IExecutable": {
        "require": true
      },
      "qx.event.AcceleratingTimer": {
        "construct": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2009 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * The HoverButton is an {@link qx.ui.basic.Atom}, which fires repeatedly
   * execute events while the pointer is over the widget.
   *
   * The rate at which the execute event is fired accelerates is the pointer keeps
   * inside of the widget. The initial delay and the interval time can be set using
   * the properties {@link #firstInterval} and {@link #interval}. The
   * {@link #execute} events will be fired in a shorter amount of time if the pointer
   * remains over the widget, until the min {@link #minTimer} is reached.
   * The {@link #timerDecrease} property sets the amount of milliseconds which will
   * decreased after every firing.
   *
   * *Example*
   *
   * Here is a little example of how to use the widget.
   *
   * <pre class='javascript'>
   *   var button = new qx.ui.form.HoverButton("Hello World");
   *
   *   button.addListener("execute", function(e) {
   *     alert("Button is hovered");
   *   }, this);
   *
   *   this.getRoot.add(button);
   * </pre>
   *
   * This example creates a button with the label "Hello World" and attaches an
   * event listener to the {@link #execute} event.
   *
   * *External Documentation*
   *
   * <a href='http://qooxdoo.org/docs/#desktop/widget/hoverbutton.md' target='_blank'>
   * Documentation of this widget in the qooxdoo manual.</a>
   */
  qx.Class.define("qx.ui.form.HoverButton", {
    extend: qx.ui.basic.Atom,
    include: [qx.ui.core.MExecutable],
    implement: [qx.ui.form.IExecutable],

    /**
     * @param label {String} Label to use
     * @param icon {String?null} Icon to use
     */
    construct: function construct(label, icon) {
      qx.ui.basic.Atom.constructor.call(this, label, icon);
      this.addListener("pointerover", this._onPointerOver, this);
      this.addListener("pointerout", this._onPointerOut, this);
      this.__timer__P_219_0 = new qx.event.AcceleratingTimer();

      this.__timer__P_219_0.addListener("interval", this._onInterval, this);
    },
    properties: {
      // overridden
      appearance: {
        refine: true,
        init: "hover-button"
      },

      /**
       * Interval used after the first run of the timer. Usually a smaller value
       * than the "firstInterval" property value to get a faster reaction.
       */
      interval: {
        check: "Integer",
        init: 80
      },

      /**
       * Interval used for the first run of the timer. Usually a greater value
       * than the "interval" property value to a little delayed reaction at the first
       * time.
       */
      firstInterval: {
        check: "Integer",
        init: 200
      },

      /** This configures the minimum value for the timer interval. */
      minTimer: {
        check: "Integer",
        init: 20
      },

      /** Decrease of the timer on each interval (for the next interval) until minTimer reached. */
      timerDecrease: {
        check: "Integer",
        init: 2
      }
    },
    members: {
      __timer__P_219_0: null,

      /**
       * Start timer on pointer over
       *
       * @param e {qx.event.type.Pointer} The pointer event
       */
      _onPointerOver: function _onPointerOver(e) {
        if (!this.isEnabled() || e.getTarget() !== this) {
          return;
        }

        this.__timer__P_219_0.set({
          interval: this.getInterval(),
          firstInterval: this.getFirstInterval(),
          minimum: this.getMinTimer(),
          decrease: this.getTimerDecrease()
        }).start();

        this.addState("hovered");
      },

      /**
       * Stop timer on pointer out
       *
       * @param e {qx.event.type.Pointer} The pointer event
       */
      _onPointerOut: function _onPointerOut(e) {
        this.__timer__P_219_0.stop();

        this.removeState("hovered");

        if (!this.isEnabled() || e.getTarget() !== this) {
          return;
        }
      },

      /**
       * Fire execute event on timer interval event
       */
      _onInterval: function _onInterval() {
        if (this.isEnabled()) {
          this.execute();
        } else {
          this.__timer__P_219_0.stop();
        }
      }
    },
    destruct: function destruct() {
      this._disposeObjects("__timer__P_219_0");
    }
  });
  qx.ui.form.HoverButton.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.Widget": {
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
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
  
  ************************************************************************ */

  /**
   * A widget used for decoration proposes to structure a toolbar. Each
   * Separator renders a line between the buttons around.
   */
  qx.Class.define("qx.ui.toolbar.Separator", {
    extend: qx.ui.core.Widget,

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      // overridden
      appearance: {
        refine: true,
        init: "toolbar-separator"
      },
      // overridden
      anonymous: {
        refine: true,
        init: true
      },
      // overridden
      width: {
        refine: true,
        init: 0
      },
      // overridden
      height: {
        refine: true,
        init: 0
      }
    }
  });
  qx.ui.toolbar.Separator.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.Widget": {
        "construct": true,
        "require": true
      },
      "qx.ui.core.MRemoteChildrenHandling": {
        "require": true
      },
      "qx.ui.layout.HBox": {
        "construct": true
      },
      "qx.ui.basic.Image": {},
      "qx.ui.toolbar.PartContainer": {},
      "qx.ui.toolbar.Separator": {},
      "qx.ui.menubar.Button": {}
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
       * Jonathan Weiß (jonathan_rass)
  
  ************************************************************************ */

  /**
   * A part is a container for multiple toolbar buttons. Each part comes
   * with a handle which may be used in later versions to drag the part
   * around and move it to another position. Currently mainly used
   * for structuring large toolbars beyond the capabilities of the
   * {@link Separator}.
   *
   * @childControl handle {qx.ui.basic.Image} prat handle to visualize the separation
   * @childControl container {qx.ui.toolbar.PartContainer} holds the content of the toolbar part
   */
  qx.Class.define("qx.ui.toolbar.Part", {
    extend: qx.ui.core.Widget,
    include: [qx.ui.core.MRemoteChildrenHandling],

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qx.ui.core.Widget.constructor.call(this); // Hard coded HBox layout

      this._setLayout(new qx.ui.layout.HBox()); // Force creation of the handle


      this._createChildControl("handle");
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      appearance: {
        refine: true,
        init: "toolbar/part"
      },

      /** Whether icons, labels, both or none should be shown. */
      show: {
        init: "both",
        check: ["both", "label", "icon"],
        inheritable: true,
        event: "changeShow"
      },

      /** The spacing between every child of the toolbar */
      spacing: {
        nullable: true,
        check: "Integer",
        themeable: true,
        apply: "_applySpacing"
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      /*
      ---------------------------------------------------------------------------
        WIDGET API
      ---------------------------------------------------------------------------
      */
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id, hash) {
        var control;

        switch (id) {
          case "handle":
            control = new qx.ui.basic.Image();
            control.setAlignY("middle");

            this._add(control);

            break;

          case "container":
            control = new qx.ui.toolbar.PartContainer();
            control.addListener("syncAppearance", this.__onSyncAppearance__P_221_0, this);

            this._add(control);

            control.addListener("changeChildren", function () {
              this.__onSyncAppearance__P_221_0();
            }, this);
            break;
        }

        return control || qx.ui.toolbar.Part.superclass.prototype._createChildControlImpl.call(this, id);
      },
      // overridden
      getChildrenContainer: function getChildrenContainer() {
        return this.getChildControl("container");
      },

      /*
      ---------------------------------------------------------------------------
        PROPERTY APPLY ROUTINES
      ---------------------------------------------------------------------------
      */
      _applySpacing: function _applySpacing(value, old) {
        var layout = this.getChildControl("container").getLayout();
        value == null ? layout.resetSpacing() : layout.setSpacing(value);
      },

      /*
      ---------------------------------------------------------------------------
        UTILITIES
      ---------------------------------------------------------------------------
      */

      /**
       * Helper which applies the left, right and middle states.
       */
      __onSyncAppearance__P_221_0: function __onSyncAppearance__P_221_0() {
        // check every child
        var children = this.getChildrenContainer().getChildren();
        children = children.filter(function (child) {
          return child.getVisibility() == "visible";
        });

        for (var i = 0; i < children.length; i++) {
          // if its the first child
          if (i == 0 && i != children.length - 1) {
            children[i].addState("left");
            children[i].removeState("right");
            children[i].removeState("middle"); // if its the last child
          } else if (i == children.length - 1 && i != 0) {
            children[i].addState("right");
            children[i].removeState("left");
            children[i].removeState("middle"); // if there is only one child
          } else if (i == 0 && i == children.length - 1) {
            children[i].removeState("left");
            children[i].removeState("middle");
            children[i].removeState("right");
          } else {
            children[i].addState("middle");
            children[i].removeState("right");
            children[i].removeState("left");
          }
        }
      },

      /**
       * Adds a separator to the toolbar part.
       */
      addSeparator: function addSeparator() {
        this.add(new qx.ui.toolbar.Separator());
      },

      /**
       * Returns all nested buttons which contains a menu to show. This is mainly
       * used for keyboard support.
       *
       * @return {Array} List of all menu buttons
       */
      getMenuButtons: function getMenuButtons() {
        var children = this.getChildren();
        var buttons = [];
        var child;

        for (var i = 0, l = children.length; i < l; i++) {
          child = children[i];

          if (child instanceof qx.ui.menubar.Button) {
            buttons.push(child);
          }
        }

        return buttons;
      }
    }
  });
  qx.ui.toolbar.Part.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.container.Composite": {
        "construct": true,
        "require": true
      },
      "qx.ui.layout.HBox": {
        "construct": true
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
       * Jonathan Weiß (jonathan_rass)
  
  ************************************************************************ */

  /**
   * The container used by {@link Part} to insert the buttons.
   *
   * @internal
   */
  qx.Class.define("qx.ui.toolbar.PartContainer", {
    extend: qx.ui.container.Composite,
    construct: function construct() {
      qx.ui.container.Composite.constructor.call(this);

      this._setLayout(new qx.ui.layout.HBox());
    },
    events: {
      /** Fired if a child has been added or removed */
      changeChildren: "qx.event.type.Event"
    },
    properties: {
      appearance: {
        refine: true,
        init: "toolbar/part/container"
      },

      /** Whether icons, labels, both or none should be shown. */
      show: {
        init: "both",
        check: ["both", "label", "icon"],
        inheritable: true,
        event: "changeShow"
      }
    },
    members: {
      // overridden
      _afterAddChild: function _afterAddChild(child) {
        this.fireEvent("changeChildren");
      },
      // overridden
      _afterRemoveChild: function _afterRemoveChild(child) {
        this.fireEvent("changeChildren");
      }
    }
  });
  qx.ui.toolbar.PartContainer.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "usage": "dynamic",
        "require": true
      },
      "qx.Theme": {
        "usage": "dynamic",
        "require": true
      },
      "qx.bom.client.Css": {
        "require": true
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "css.rgba": {
          "load": true,
          "className": "qx.bom.client.Css"
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
       * Martin Wittemann (martinwittemann)
       * Tristan Koch (trkoch)
  
  ************************************************************************ */

  /**
   * Indigo color theme
   */
  qx.Theme.define("qx.theme.indigo.Color", {
    colors: {
      // main
      background: "white",
      "dark-blue": "#323335",
      "light-background": "#F4F4F4",
      font: "#262626",
      highlight: "#3D72C9",
      // bright blue
      "highlight-shade": "#5583D0",
      // bright blue
      // backgrounds
      "background-selected": "#3D72C9",
      "background-selected-disabled": "#CDCDCD",
      "background-selected-dark": "#323335",
      "background-disabled": "#F7F7F7",
      "background-disabled-checked": "#BBBBBB",
      "background-pane": "white",
      // tabview
      "tabview-unselected": "#1866B5",
      "tabview-button-border": "#134983",
      "tabview-label-active-disabled": "#D9D9D9",
      // text colors
      link: "#24B",
      // scrollbar
      "scrollbar-bright": "#F1F1F1",
      "scrollbar-dark": "#EBEBEB",
      // form
      button: "#E8F0E3",
      "button-border": "#BBB",
      "button-border-hovered": "#939393",
      invalid: "#C00F00",
      "button-box-bright": "#F9F9F9",
      "button-box-dark": "#E3E3E3",
      "button-box-bright-pressed": "#BABABA",
      "button-box-dark-pressed": "#EBEBEB",
      "border-lead": "#888888",
      // window
      "window-border": "#dddddd",
      "window-border-inner": "#F4F4F4",
      // group box
      "white-box-border": "#dddddd",
      // shadows
      shadow: qx.core.Environment.get("css.rgba") ? "rgba(0, 0, 0, 0.4)" : "#666666",
      // borders
      "border-main": "#dddddd",
      "border-light": "#B7B7B7",
      "border-light-shadow": "#686868",
      // separator
      "border-separator": "#808080",
      // text
      text: "#262626",
      "text-disabled": "#A7A6AA",
      "text-selected": "white",
      "text-placeholder": "#CBC8CD",
      // tooltip
      tooltip: "#FE0",
      "tooltip-text": "black",
      // table
      "table-header": [242, 242, 242],
      "table-focus-indicator": "#3D72C9",
      // used in table code
      "table-header-cell": [235, 234, 219],
      "table-row-background-focused-selected": "#3D72C9",
      "table-row-background-focused": "#F4F4F4",
      "table-row-background-selected": [51, 94, 168],
      "table-row-background-even": "white",
      "table-row-background-odd": "white",
      "table-row-selected": [255, 255, 255],
      "table-row": [0, 0, 0],
      "table-row-line": "#EEE",
      "table-column-line": "#EEE",
      // used in progressive code
      "progressive-table-header": "#AAAAAA",
      "progressive-table-row-background-even": [250, 248, 243],
      "progressive-table-row-background-odd": [255, 255, 255],
      "progressive-progressbar-background": "gray",
      "progressive-progressbar-indicator-done": "#CCCCCC",
      "progressive-progressbar-indicator-undone": "white",
      "progressive-progressbar-percent-background": "gray",
      "progressive-progressbar-percent-text": "white"
    }
  });
  qx.theme.indigo.Color.$$dbClassInfo = $$dbClassInfo;
})();
//# sourceMappingURL=package-19.js.map?dt=1651479039894
qx.$$packageData['19'] = {
  "locales": {},
  "resources": {},
  "translations": {}
};
