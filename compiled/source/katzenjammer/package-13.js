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
   * The data model of a table.
   */
  qx.Interface.define("qx.ui.table.ITableModel", {
    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */
    events: {
      /**
       * Fired when the table data changed (the stuff shown in the table body).
       * The data property of the event may be null or a map having the following attributes:
       * <ul>
       *   <li>firstRow: The index of the first row that has changed.</li>
       *   <li>lastRow: The index of the last row that has changed.</li>
       *   <li>firstColumn: The model index of the first column that has changed.</li>
       *   <li>lastColumn: The model index of the last column that has changed.</li>
       * </ul>
       */
      dataChanged: "qx.event.type.Data",

      /**
       * Fired when the meta data changed (the stuff shown in the table header).
       */
      metaDataChanged: "qx.event.type.Event",

      /**
       * Fired after the table is sorted (but before the metaDataChanged event)
       */
      sorted: "qx.event.type.Data"
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      /**
       * Returns the number of rows in the model.
       *
       * @abstract
       * @return {Integer} the number of rows.
       */
      getRowCount: function getRowCount() {},

      /**
       *
       * Returns the data of one row. This function may be overridden by models which hold
       * all data of a row in one object. By using this function, clients have a way of
       * quickly retrieving the entire row data.
       *
       * <b>Important:</b>Models which do not have their row data accessible in one object
       * may return null.
       *
       * @param rowIndex {Integer} the model index of the row.
       * @return {Object} the row data as an object or null if the model does not support row data
       *                    objects. The details on the object returned are determined by the model
       *                    implementation only.
       */
      getRowData: function getRowData(rowIndex) {},

      /**
       * Returns the number of columns in the model.
       *
       * @abstract
       * @return {Integer} the number of columns.
       */
      getColumnCount: function getColumnCount() {},

      /**
       * Returns the ID of column. The ID may be used to identify columns
       * independent from their index in the model. E.g. for being aware of added
       * columns when saving the width of a column.
       *
       * @abstract
       * @param columnIndex {Integer} the index of the column.
       * @return {String} the ID of the column.
       */
      getColumnId: function getColumnId(columnIndex) {},

      /**
       * Returns the index of a column.
       *
       * @abstract
       * @param columnId {String} the ID of the column.
       * @return {Integer} the index of the column.
       */
      getColumnIndexById: function getColumnIndexById(columnId) {},

      /**
       * Returns the name of a column. This name will be shown to the user in the
       * table header.
       *
       * @abstract
       * @param columnIndex {Integer} the index of the column.
       * @return {String} the name of the column.
       */
      getColumnName: function getColumnName(columnIndex) {},

      /**
       * Returns whether a column is editable.
       *
       * @param columnIndex {Integer} the column to check.
       * @return {Boolean} whether the column is editable.
       */
      isColumnEditable: function isColumnEditable(columnIndex) {},

      /**
       * Returns whether a column is sortable.
       *
       * @param columnIndex {Integer} the column to check.
       * @return {Boolean} whether the column is sortable.
       */
      isColumnSortable: function isColumnSortable(columnIndex) {},

      /**
       * Sorts the model by a column.
       *
       * @param columnIndex {Integer} the column to sort by.
       * @param ascending {Boolean} whether to sort ascending.
       */
      sortByColumn: function sortByColumn(columnIndex, ascending) {},

      /**
       * Returns the column index the model is sorted by. If the model is not sorted
       * -1 is returned.
       *
       * @return {Integer} the column index the model is sorted by.
       */
      getSortColumnIndex: function getSortColumnIndex() {},

      /**
       * Returns whether the model is sorted ascending.
       *
       * @return {Boolean} whether the model is sorted ascending.
       */
      isSortAscending: function isSortAscending() {},

      /**
       * Prefetches some rows. This is a hint to the model that the specified rows
       * will be read soon.
       *
       * @param firstRowIndex {Integer} the index of first row.
       * @param lastRowIndex {Integer} the index of last row.
       */
      prefetchRows: function prefetchRows(firstRowIndex, lastRowIndex) {},

      /**
       * Returns a cell value by column index.
       *
       * @abstract
       * @param columnIndex {Integer} the index of the column.
       * @param rowIndex {Integer} the index of the row.
       * @return {var} The value of the cell.
       * @see #getValueById
       */
      getValue: function getValue(columnIndex, rowIndex) {},

      /**
       * Returns a cell value by column ID.
       *
       * Whenever you have the choice, use {@link #getValue()} instead,
       * because this should be faster.
       *
       * @param columnId {String} the ID of the column.
       * @param rowIndex {Integer} the index of the row.
       * @return {var} the value of the cell.
       */
      getValueById: function getValueById(columnId, rowIndex) {},

      /**
       * Sets a cell value by column index.
       *
       * @abstract
       * @param columnIndex {Integer} The index of the column.
       * @param rowIndex {Integer} the index of the row.
       * @param value {var} The new value.
       * @see #setValueById
       */
      setValue: function setValue(columnIndex, rowIndex, value) {},

      /**
       * Sets a cell value by column ID.
       *
       * Whenever you have the choice, use {@link #setValue()} instead,
       * because this should be faster.
       *
       * @param columnId {String} The ID of the column.
       * @param rowIndex {Integer} The index of the row.
       * @param value {var} The new value.
       */
      setValueById: function setValueById(columnId, rowIndex, value) {}
    }
  });
  qx.ui.table.ITableModel.$$dbClassInfo = $$dbClassInfo;
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
      "qx.ui.table.ITableModel": {
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
   * An abstract table model that performs the column handling, so subclasses only
   * need to care for row handling.
   */
  qx.Class.define("qx.ui.table.model.Abstract", {
    type: "abstract",
    extend: qx.core.Object,
    implement: qx.ui.table.ITableModel,
    events: {
      /**
       * Fired when the table data changed (the stuff shown in the table body).
       * The data property of the event will be a map having the following
       * attributes:
       * <ul>
       *   <li>firstRow: The index of the first row that has changed.</li>
       *   <li>lastRow: The index of the last row that has changed.</li>
       *   <li>firstColumn: The model index of the first column that has changed.</li>
       *   <li>lastColumn: The model index of the last column that has changed.</li>
       * </ul>
       *
       * Additionally, if the data changed as a result of rows being removed
       * from the data model, then these additional attributes will be in the
       * data:
       * <ul>
       *   <li>removeStart: The model index of the first row that was removed.</li>
       *   <li>removeCount: The number of rows that were removed.</li>
       * </ul>
       */
      dataChanged: "qx.event.type.Data",

      /**
       * Fired when the meta data changed (the stuff shown in the table header).
       */
      metaDataChanged: "qx.event.type.Event",

      /**
       * Fired after the table is sorted (but before the metaDataChanged event)
       */
      sorted: "qx.event.type.Data"
    },
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      this.__columnIdArr__P_197_0 = [];
      this.__columnNameArr__P_197_1 = [];
      this.__columnIndexMap__P_197_2 = {};
    },
    members: {
      __columnIdArr__P_197_0: null,
      __columnNameArr__P_197_1: null,
      __columnIndexMap__P_197_2: null,
      __internalChange__P_197_3: null,

      /**
       * Initialize the table model <--> table interaction. The table model is
       * passed to the table constructor, but the table model doesn't otherwise
       * know anything about the table nor can it operate on table
       * properties. This function provides the capability for the table model
       * to specify characteristics of the table. It is called when the table
       * model is applied to the table.
       *
       * @param table {qx.ui.table.Table}
       *   The table to which this model is attached
       */
      init: function init(table) {// default implementation has nothing to do
      },

      /**
       * Abstract method
       * @throws {Error} An error if this method is called.
       */
      getRowCount: function getRowCount() {
        throw new Error("getRowCount is abstract");
      },
      getRowData: function getRowData(rowIndex) {
        return null;
      },
      isColumnEditable: function isColumnEditable(columnIndex) {
        return false;
      },
      isColumnSortable: function isColumnSortable(columnIndex) {
        return false;
      },
      sortByColumn: function sortByColumn(columnIndex, ascending) {},
      getSortColumnIndex: function getSortColumnIndex() {
        return -1;
      },
      isSortAscending: function isSortAscending() {
        return true;
      },
      prefetchRows: function prefetchRows(firstRowIndex, lastRowIndex) {},

      /**
       * Abstract method
       *
       * @param columnIndex {Integer} the index of the column
       * @param rowIndex {Integer} the index of the row
       *
       * @throws {Error} An error if this method is called.
       */
      getValue: function getValue(columnIndex, rowIndex) {
        throw new Error("getValue is abstract");
      },
      getValueById: function getValueById(columnId, rowIndex) {
        return this.getValue(this.getColumnIndexById(columnId), rowIndex);
      },

      /**
       * Abstract method
       *
       * @param columnIndex {Integer} index of the column
       * @param rowIndex {Integer} index of the row
       * @param value {var} Value to be set
       *
       * @throws {Error} An error if this method is called.
       */
      setValue: function setValue(columnIndex, rowIndex, value) {
        throw new Error("setValue is abstract");
      },
      setValueById: function setValueById(columnId, rowIndex, value) {
        this.setValue(this.getColumnIndexById(columnId), rowIndex, value);
      },
      // overridden
      getColumnCount: function getColumnCount() {
        return this.__columnIdArr__P_197_0.length;
      },
      // overridden
      getColumnIndexById: function getColumnIndexById(columnId) {
        return this.__columnIndexMap__P_197_2[columnId];
      },
      // overridden
      getColumnId: function getColumnId(columnIndex) {
        return this.__columnIdArr__P_197_0[columnIndex];
      },
      // overridden
      getColumnName: function getColumnName(columnIndex) {
        return this.__columnNameArr__P_197_1[columnIndex];
      },

      /**
       * Sets the column IDs. These IDs may be used internally to identify a
       * column.
       *
       * Note: This will clear previously set column names.
       *
       *
       * @param columnIdArr {String[]} the IDs of the columns.
       * @see #setColumns
       */
      setColumnIds: function setColumnIds(columnIdArr) {
        this.__columnIdArr__P_197_0 = columnIdArr; // Create the reverse map

        this.__columnIndexMap__P_197_2 = {};

        for (var i = 0; i < columnIdArr.length; i++) {
          this.__columnIndexMap__P_197_2[columnIdArr[i]] = i;
        }

        this.__columnNameArr__P_197_1 = new Array(columnIdArr.length); // Inform the listeners

        if (!this.__internalChange__P_197_3) {
          this.fireEvent("metaDataChanged");
        }
      },

      /**
       * Sets the column names. These names will be shown to the user.
       *
       * Note: The column IDs have to be defined before.
       *
       *
       * @param columnNameArr {String[]} the names of the columns.
       * @throws {Error} If the amount of given columns is different from the table.
       * @see #setColumnIds
       */
      setColumnNamesByIndex: function setColumnNamesByIndex(columnNameArr) {
        if (this.__columnIdArr__P_197_0.length != columnNameArr.length) {
          throw new Error("this.__columnIdArr and columnNameArr have different length: " + this.__columnIdArr__P_197_0.length + " != " + columnNameArr.length);
        }

        this.__columnNameArr__P_197_1 = columnNameArr; // Inform the listeners

        this.fireEvent("metaDataChanged");
      },

      /**
       * Sets the column names. These names will be shown to the user.
       *
       * Note: The column IDs have to be defined before.
       *
       *
       * @param columnNameMap {Map} a map containing the column IDs as keys and the
       *          column name as values.
       * @see #setColumnIds
       */
      setColumnNamesById: function setColumnNamesById(columnNameMap) {
        this.__columnNameArr__P_197_1 = new Array(this.__columnIdArr__P_197_0.length);

        for (var i = 0; i < this.__columnIdArr__P_197_0.length; ++i) {
          this.__columnNameArr__P_197_1[i] = columnNameMap[this.__columnIdArr__P_197_0[i]];
        }
      },

      /**
       * Sets the column names (and optionally IDs)
       *
       * Note: You can not change the _number_ of columns this way.  The number
       *       of columns is highly intertwined in the entire table operation,
       *       and dynamically changing it would require as much work as just
       *       recreating your table.  If you must change the number of columns
       *       in a table then you should remove the table and add a new one.
       *
       * @param columnNameArr {String[]}
       *   The column names. These names will be shown to the user.
       *
       * @param columnIdArr {String[] ? null}
       *   The column IDs. These IDs may be used internally to identify a
       *   column. If null, the column names are used as IDs unless ID values
       *   have already been set. If ID values have already been set, they will
       *   continue to be used if no ID values are explicitly provided here.
       *
       * @throws {Error} If the amount of given columns is different from the table.
       *
       */
      setColumns: function setColumns(columnNameArr, columnIdArr) {
        var bSetIds = this.__columnIdArr__P_197_0.length == 0 || columnIdArr;

        if (columnIdArr == null) {
          if (this.__columnIdArr__P_197_0.length == 0) {
            columnIdArr = columnNameArr;
          } else {
            columnIdArr = this.__columnIdArr__P_197_0;
          }
        }

        if (columnIdArr.length != columnNameArr.length) {
          throw new Error("columnIdArr and columnNameArr have different length: " + columnIdArr.length + " != " + columnNameArr.length);
        }

        if (bSetIds) {
          this.__internalChange__P_197_3 = true;
          this.setColumnIds(columnIdArr);
          this.__internalChange__P_197_3 = false;
        }

        this.setColumnNamesByIndex(columnNameArr);
      }
    },
    destruct: function destruct() {
      this.__columnIdArr__P_197_0 = this.__columnNameArr__P_197_1 = this.__columnIndexMap__P_197_2 = null;
    }
  });
  qx.ui.table.model.Abstract.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.table.model.Abstract": {
        "construct": true,
        "require": true
      },
      "qx.lang.Type": {}
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
   * A simple table model that provides an API for changing the model data.
   */
  qx.Class.define("qx.ui.table.model.Simple", {
    extend: qx.ui.table.model.Abstract,
    construct: function construct() {
      qx.ui.table.model.Abstract.constructor.call(this);
      this._rowArr = [];
      this.__sortColumnIndex__P_194_0 = -1; // Array of objects, each with property "ascending" and "descending"

      this.__sortMethods__P_194_1 = [];
      this.__editableColArr__P_194_2 = null;
    },
    properties: {
      /**
       * Whether sorting should be case sensitive
       */
      caseSensitiveSorting: {
        check: "Boolean",
        init: true
      }
    },
    statics: {
      /**
       * Default ascending sort method to use if no custom method has been
       * provided.
       *
       * @param row1 {var} first row
       * @param row2 {var} second row
       * @param columnIndex {Integer} the column to be sorted
       * @return {Integer} 1 of row1 is > row2, -1 if row1 is < row2, 0 if row1 == row2
       */
      _defaultSortComparatorAscending: function _defaultSortComparatorAscending(row1, row2, columnIndex) {
        var obj1 = row1[columnIndex];
        var obj2 = row2[columnIndex];

        if (qx.lang.Type.isNumber(obj1) && qx.lang.Type.isNumber(obj2)) {
          var result = isNaN(obj1) ? isNaN(obj2) ? 0 : 1 : isNaN(obj2) ? -1 : null;

          if (result != null) {
            return result;
          }
        }

        if (obj1 == null && obj2 !== null) {
          return -1;
        } else if (obj2 == null && obj1 !== null) {
          return 1;
        }

        return obj1 > obj2 ? 1 : obj1 == obj2 ? 0 : -1;
      },

      /**
       * Same as the Default ascending sort method but using case insensitivity
       *
       * @param row1 {var} first row
       * @param row2 {var} second row
       * @param columnIndex {Integer} the column to be sorted
       * @return {Integer} 1 of row1 is > row2, -1 if row1 is < row2, 0 if row1 == row2
       */
      _defaultSortComparatorInsensitiveAscending: function _defaultSortComparatorInsensitiveAscending(row1, row2, columnIndex) {
        var obj1 = row1[columnIndex].toLowerCase ? row1[columnIndex].toLowerCase() : row1[columnIndex];
        var obj2 = row2[columnIndex].toLowerCase ? row2[columnIndex].toLowerCase() : row2[columnIndex];

        if (qx.lang.Type.isNumber(obj1) && qx.lang.Type.isNumber(obj2)) {
          var result = isNaN(obj1) ? isNaN(obj2) ? 0 : 1 : isNaN(obj2) ? -1 : null;

          if (result != null) {
            return result;
          }
        }

        if (obj1 == null && obj2 !== null) {
          return -1;
        } else if (obj2 == null && obj1 !== null) {
          return 1;
        }

        return obj1 > obj2 ? 1 : obj1 == obj2 ? 0 : -1;
      },

      /**
       * Default descending sort method to use if no custom method has been
       * provided.
       *
       * @param row1 {var} first row
       * @param row2 {var} second row
       * @param columnIndex {Integer} the column to be sorted
       * @return {Integer} 1 of row1 is > row2, -1 if row1 is < row2, 0 if row1 == row2
       */
      _defaultSortComparatorDescending: function _defaultSortComparatorDescending(row1, row2, columnIndex) {
        var obj1 = row1[columnIndex];
        var obj2 = row2[columnIndex];

        if (qx.lang.Type.isNumber(obj1) && qx.lang.Type.isNumber(obj2)) {
          var result = isNaN(obj1) ? isNaN(obj2) ? 0 : 1 : isNaN(obj2) ? -1 : null;

          if (result != null) {
            return result;
          }
        }

        if (obj1 == null && obj2 !== null) {
          return 1;
        } else if (obj2 == null && obj1 !== null) {
          return -1;
        }

        return obj1 < obj2 ? 1 : obj1 == obj2 ? 0 : -1;
      },

      /**
       * Same as the Default descending sort method but using case insensitivity
       *
       * @param row1 {var} first row
       * @param row2 {var} second row
       * @param columnIndex {Integer} the column to be sorted
       * @return {Integer} 1 of row1 is > row2, -1 if row1 is < row2, 0 if row1 == row2
       */
      _defaultSortComparatorInsensitiveDescending: function _defaultSortComparatorInsensitiveDescending(row1, row2, columnIndex) {
        var obj1 = row1[columnIndex].toLowerCase ? row1[columnIndex].toLowerCase() : row1[columnIndex];
        var obj2 = row2[columnIndex].toLowerCase ? row2[columnIndex].toLowerCase() : row2[columnIndex];

        if (qx.lang.Type.isNumber(obj1) && qx.lang.Type.isNumber(obj2)) {
          var result = isNaN(obj1) ? isNaN(obj2) ? 0 : 1 : isNaN(obj2) ? -1 : null;

          if (result != null) {
            return result;
          }
        }

        if (obj1 == null && obj2 !== null) {
          return 1;
        } else if (obj2 == null && obj1 !== null) {
          return -1;
        }

        return obj1 < obj2 ? 1 : obj1 == obj2 ? 0 : -1;
      }
    },
    members: {
      _rowArr: null,
      __editableColArr__P_194_2: null,
      __sortableColArr__P_194_3: null,
      __sortMethods__P_194_1: null,
      __sortColumnIndex__P_194_0: null,
      __sortAscending__P_194_4: null,
      // overridden
      getRowData: function getRowData(rowIndex) {
        var rowData = this._rowArr[rowIndex];

        if (rowData == null || rowData.originalData == null) {
          return rowData;
        } else {
          return rowData.originalData;
        }
      },

      /**
       * Returns the data of one row as map containing the column IDs as key and
       * the cell values as value. Also the meta data is included.
       *
       * @param rowIndex {Integer} the model index of the row.
       * @return {Map} a Map containing the column values.
       */
      getRowDataAsMap: function getRowDataAsMap(rowIndex) {
        var rowData = this._rowArr[rowIndex];

        if (rowData != null) {
          var map = {}; // get the current set data

          for (var col = 0; col < this.getColumnCount(); col++) {
            map[this.getColumnId(col)] = rowData[col];
          }

          if (rowData.originalData != null) {
            // merge in the meta data
            for (var key in rowData.originalData) {
              if (map[key] == undefined) {
                map[key] = rowData.originalData[key];
              }
            }
          }

          return map;
        } // may be null, which is ok


        return rowData && rowData.originalData ? rowData.originalData : null;
      },

      /**
       * Gets the whole data as an array of maps.
       *
       * Note: Individual items are retrieved by {@link #getRowDataAsMap}.
       * @return {Map[]} Array of row data maps
       */
      getDataAsMapArray: function getDataAsMapArray() {
        var len = this.getRowCount();
        var data = [];

        for (var i = 0; i < len; i++) {
          data.push(this.getRowDataAsMap(i));
        }

        return data;
      },

      /**
       * Sets all columns editable or not editable.
       *
       * @param editable {Boolean} whether all columns are editable.
       */
      setEditable: function setEditable(editable) {
        this.__editableColArr__P_194_2 = [];

        for (var col = 0; col < this.getColumnCount(); col++) {
          this.__editableColArr__P_194_2[col] = editable;
        }

        this.fireEvent("metaDataChanged");
      },

      /**
       * Sets whether a column is editable.
       *
       * @param columnIndex {Integer} the column of which to set the editable state.
       * @param editable {Boolean} whether the column should be editable.
       */
      setColumnEditable: function setColumnEditable(columnIndex, editable) {
        if (editable != this.isColumnEditable(columnIndex)) {
          if (this.__editableColArr__P_194_2 == null) {
            this.__editableColArr__P_194_2 = [];
          }

          this.__editableColArr__P_194_2[columnIndex] = editable;
          this.fireEvent("metaDataChanged");
        }
      },
      // overridden
      isColumnEditable: function isColumnEditable(columnIndex) {
        return this.__editableColArr__P_194_2 ? this.__editableColArr__P_194_2[columnIndex] == true : false;
      },

      /**
       * Sets whether a column is sortable.
       *
       * @param columnIndex {Integer} the column of which to set the sortable state.
       * @param sortable {Boolean} whether the column should be sortable.
       */
      setColumnSortable: function setColumnSortable(columnIndex, sortable) {
        if (sortable != this.isColumnSortable(columnIndex)) {
          if (this.__sortableColArr__P_194_3 == null) {
            this.__sortableColArr__P_194_3 = [];
          }

          this.__sortableColArr__P_194_3[columnIndex] = sortable;
          this.fireEvent("metaDataChanged");
        }
      },
      // overridden
      isColumnSortable: function isColumnSortable(columnIndex) {
        return this.__sortableColArr__P_194_3 ? this.__sortableColArr__P_194_3[columnIndex] !== false : true;
      },
      // overridden
      sortByColumn: function sortByColumn(columnIndex, ascending) {
        // NOTE: We use different comparators for ascending and descending,
        //     because comparators should be really fast.
        var comparator;
        var sortMethods = this.__sortMethods__P_194_1[columnIndex];

        if (sortMethods) {
          comparator = ascending ? sortMethods.ascending : sortMethods.descending;
        } else {
          if (this.getCaseSensitiveSorting()) {
            comparator = ascending ? qx.ui.table.model.Simple._defaultSortComparatorAscending : qx.ui.table.model.Simple._defaultSortComparatorDescending;
          } else {
            comparator = ascending ? qx.ui.table.model.Simple._defaultSortComparatorInsensitiveAscending : qx.ui.table.model.Simple._defaultSortComparatorInsensitiveDescending;
          }
        }

        comparator.columnIndex = columnIndex;

        this._rowArr.sort(function (row1, row2) {
          return comparator(row1, row2, columnIndex);
        });

        this.__sortColumnIndex__P_194_0 = columnIndex;
        this.__sortAscending__P_194_4 = ascending;
        var data = {
          columnIndex: columnIndex,
          ascending: ascending
        };
        this.fireDataEvent("sorted", data);
        this.fireEvent("metaDataChanged");
      },

      /**
       * Specify the methods to use for ascending and descending sorts of a
       * particular column.
       *
       * @param columnIndex {Integer}
       *   The index of the column for which the sort methods are being
       *   provided.
       *
       * @param compare {Function|Map}
       *   If provided as a Function, this is the comparator function to sort in
       *   ascending order. It takes three parameters: the two arrays of row data,
       *   row1 and row2, being compared and the column index sorting was requested
       *   for.
       *
       *   For backwards compatability, user-supplied compare functions may still
       *   take only two parameters, the two arrays of row data, row1 and row2,
       *   being compared and obtain the column index as arguments.callee.columnIndex.
       *   This is deprecated, however, as arguments.callee is disallowed in ES5 strict
       *   mode and ES6.
       *
       *   The comparator function must return 1, 0 or -1, when the column in row1
       *   is greater than, equal to, or less than, respectively, the column in
       *   row2.
       *
       *   If this parameter is a Map, it shall have two properties: "ascending"
       *   and "descending". The property value of each is a comparator
       *   function, as described above.
       *
       *   If only the "ascending" function is provided (i.e. this parameter is
       *   a Function, not a Map), then the "descending" function is built
       *   dynamically by passing the two parameters to the "ascending" function
       *   in reversed order. <i>Use of a dynamically-built "descending" function
       *   generates at least one extra function call for each row in the table,
       *   and possibly many more. If the table is expected to have more than
       *   about 1000 rows, you will likely want to provide a map with a custom
       *   "descending" sort function as well as the "ascending" one.</i>
       *
       */
      setSortMethods: function setSortMethods(columnIndex, compare) {
        var methods;

        if (qx.lang.Type.isFunction(compare)) {
          methods = {
            ascending: compare,
            descending: function descending(row1, row2, columnIndex) {
              /* assure backwards compatibility for sort functions using
               * arguments.callee.columnIndex and fix a bug where retreiveing
               * column index via this way did not work for the case where a
               * single comparator function was used.
               * Note that arguments.callee is not available in ES5 strict mode and ES6.
               * See discussion in
               * https://github.com/qooxdoo/qooxdoo/pull/9499#pullrequestreview-99655182
               */
              compare.columnIndex = columnIndex;
              return compare(row2, row1, columnIndex);
            }
          };
        } else {
          methods = compare;
        }

        this.__sortMethods__P_194_1[columnIndex] = methods;
      },

      /**
       * Returns the sortMethod(s) for a table column.
       *
       * @param columnIndex {Integer} The index of the column for which the sort
       *   methods are being  provided.
       *
       * @return {Map} a map with the two properties "ascending"
       *   and "descending" for the specified column.
       *   The property value of each is a comparator function, as described
       *   in {@link #setSortMethods}.
       */
      getSortMethods: function getSortMethods(columnIndex) {
        return this.__sortMethods__P_194_1[columnIndex];
      },

      /**
       * Clears the sorting.
       */
      clearSorting: function clearSorting() {
        if (this.__sortColumnIndex__P_194_0 != -1) {
          this.__sortColumnIndex__P_194_0 = -1;
          this.__sortAscending__P_194_4 = true;
          this.fireEvent("metaDataChanged");
        }
      },
      // overridden
      getSortColumnIndex: function getSortColumnIndex() {
        return this.__sortColumnIndex__P_194_0;
      },

      /**
       * Set the sort column index
       *
       * WARNING: This should be called only by subclasses with intimate
       *          knowledge of what they are doing!
       *
       * @param columnIndex {Integer} index of the column
       */
      _setSortColumnIndex: function _setSortColumnIndex(columnIndex) {
        this.__sortColumnIndex__P_194_0 = columnIndex;
      },
      // overridden
      isSortAscending: function isSortAscending() {
        return this.__sortAscending__P_194_4;
      },

      /**
       * Set whether to sort in ascending order or not.
       *
       * WARNING: This should be called only by subclasses with intimate
       *          knowledge of what they are doing!
       *
       * @param ascending {Boolean}
       *   <i>true</i> for an ascending sort;
       *   <i> false</i> for a descending sort.
       */
      _setSortAscending: function _setSortAscending(ascending) {
        this.__sortAscending__P_194_4 = ascending;
      },
      // overridden
      getRowCount: function getRowCount() {
        return this._rowArr.length;
      },
      // overridden
      getValue: function getValue(columnIndex, rowIndex) {
        if (rowIndex < 0 || rowIndex >= this._rowArr.length) {
          throw new Error("this._rowArr out of bounds: " + rowIndex + " (0.." + this._rowArr.length + ")");
        }

        return this._rowArr[rowIndex][columnIndex];
      },
      // overridden
      setValue: function setValue(columnIndex, rowIndex, value) {
        if (this._rowArr[rowIndex][columnIndex] != value) {
          this._rowArr[rowIndex][columnIndex] = value; // Inform the listeners

          if (this.hasListener("dataChanged")) {
            var data = {
              firstRow: rowIndex,
              lastRow: rowIndex,
              firstColumn: columnIndex,
              lastColumn: columnIndex
            };
            this.fireDataEvent("dataChanged", data);
          }

          if (columnIndex == this.__sortColumnIndex__P_194_0) {
            this.clearSorting();
          }
        }
      },

      /**
       * Sets the whole data in a bulk.
       *
       * @param rowArr {var[][]} An array containing an array for each row. Each
       *          row-array contains the values in that row in the order of the columns
       *          in this model.
       * @param clearSorting {Boolean ? true} Whether to clear the sort state.
       */
      setData: function setData(rowArr, clearSorting) {
        this._rowArr = rowArr; // Inform the listeners

        if (this.hasListener("dataChanged")) {
          var data = {
            firstRow: 0,
            lastRow: rowArr.length - 1,
            firstColumn: 0,
            lastColumn: this.getColumnCount() - 1
          };
          this.fireDataEvent("dataChanged", data);
        }

        if (clearSorting !== false) {
          this.clearSorting();
        }
      },

      /**
       * Returns the data of this model.
       *
       * Warning: Do not alter this array! If you want to change the data use
       * {@link #setData}, {@link #setDataAsMapArray} or {@link #setValue} instead.
       *
       * @return {var[][]} An array containing an array for each row. Each
       *           row-array contains the values in that row in the order of the columns
       *           in this model.
       */
      getData: function getData() {
        return this._rowArr;
      },

      /**
       * Sets the whole data in a bulk.
       *
       * @param mapArr {Map[]} An array containing a map for each row. Each
       *        row-map contains the column IDs as key and the cell values as value.
       * @param rememberMaps {Boolean ? false} Whether to remember the original maps.
       *        If true {@link #getRowData} will return the original map.
       * @param clearSorting {Boolean ? true} Whether to clear the sort state.
       */
      setDataAsMapArray: function setDataAsMapArray(mapArr, rememberMaps, clearSorting) {
        this.setData(this._mapArray2RowArr(mapArr, rememberMaps), clearSorting);
      },

      /**
       * Adds some rows to the model.
       *
       * Warning: The given array will be altered!
       *
       * @param rowArr {var[][]} An array containing an array for each row. Each
       *          row-array contains the values in that row in the order of the columns
       *          in this model.
       * @param startIndex {Integer ? null} The index where to insert the new rows. If null,
       *          the rows are appended to the end.
       * @param clearSorting {Boolean ? true} Whether to clear the sort state.
       */
      addRows: function addRows(rowArr, startIndex, clearSorting) {
        if (startIndex == null) {
          startIndex = this._rowArr.length;
        } // Prepare the rowArr so it can be used for apply


        rowArr.splice(0, 0, startIndex, 0); // Insert the new rows

        Array.prototype.splice.apply(this._rowArr, rowArr); // Inform the listeners

        var data = {
          firstRow: startIndex,
          lastRow: this._rowArr.length - 1,
          firstColumn: 0,
          lastColumn: this.getColumnCount() - 1
        };
        this.fireDataEvent("dataChanged", data);

        if (clearSorting !== false) {
          this.clearSorting();
        }
      },

      /**
       * Adds some rows to the model.
       *
       * Warning: The given array (mapArr) will be altered!
       *
       * @param mapArr {Map[]} An array containing a map for each row. Each
       *        row-map contains the column IDs as key and the cell values as value.
       * @param startIndex {Integer ? null} The index where to insert the new rows. If null,
       *        the rows are appended to the end.
       * @param rememberMaps {Boolean ? false} Whether to remember the original maps.
       *        If true {@link #getRowData} will return the original map.
       * @param clearSorting {Boolean ? true} Whether to clear the sort state.
       */
      addRowsAsMapArray: function addRowsAsMapArray(mapArr, startIndex, rememberMaps, clearSorting) {
        this.addRows(this._mapArray2RowArr(mapArr, rememberMaps), startIndex, clearSorting);
      },

      /**
       * Sets rows in the model. The rows overwrite the old rows starting at
       * <code>startIndex</code> to <code>startIndex+rowArr.length</code>.
       *
       * Warning: The given array will be altered!
       *
       * @param rowArr {var[][]} An array containing an array for each row. Each
       *          row-array contains the values in that row in the order of the columns
       *          in this model.
       * @param startIndex {Integer ? null} The index where to insert the new rows. If null,
       *          the rows are set from the beginning (0).
       * @param clearSorting {Boolean ? true} Whether to clear the sort state.
       */
      setRows: function setRows(rowArr, startIndex, clearSorting) {
        if (startIndex == null) {
          startIndex = 0;
        } // store the original length before we alter rowArr for use in splice.apply


        var rowArrLength = rowArr.length; // Prepare the rowArr so it can be used for apply

        rowArr.splice(0, 0, startIndex, rowArr.length); // Replace rows

        Array.prototype.splice.apply(this._rowArr, rowArr); // Inform the listeners

        var data = {
          firstRow: startIndex,
          lastRow: startIndex + rowArrLength - 1,
          firstColumn: 0,
          lastColumn: this.getColumnCount() - 1
        };
        this.fireDataEvent("dataChanged", data);

        if (clearSorting !== false) {
          this.clearSorting();
        }
      },

      /**
       * Set rows in the model. The rows overwrite the old rows starting at
       * <code>startIndex</code> to <code>startIndex+rowArr.length</code>.
       *
       * Warning: The given array (mapArr) will be altered!
       *
       * @param mapArr {Map[]} An array containing a map for each row. Each
       *        row-map contains the column IDs as key and the cell values as value.
       * @param startIndex {Integer ? null} The index where to insert the new rows. If null,
       *        the rows are appended to the end.
       * @param rememberMaps {Boolean ? false} Whether to remember the original maps.
       *        If true {@link #getRowData} will return the original map.
       * @param clearSorting {Boolean ? true} Whether to clear the sort state.
       */
      setRowsAsMapArray: function setRowsAsMapArray(mapArr, startIndex, rememberMaps, clearSorting) {
        this.setRows(this._mapArray2RowArr(mapArr, rememberMaps), startIndex, clearSorting);
      },

      /**
       * Removes some rows from the model.
       *
       * @param startIndex {Integer} the index of the first row to remove.
       * @param howMany {Integer} the number of rows to remove.
       * @param clearSorting {Boolean ? true} Whether to clear the sort state.
       */
      removeRows: function removeRows(startIndex, howMany, clearSorting) {
        // In the case of `removeRows`, specifically, we must create the
        // listeners' event data before actually removing the rows from
        // the row data, so that the `lastRow` calculation is correct.
        // If we do the delete operation first, as is done in other
        // methods, the final rows of the table can escape being
        // updated, thus leaving hanging old data on the rendered table.
        // This reordering (deleting after creating event data) fixes #10365.
        var data = {
          firstRow: startIndex,
          lastRow: this._rowArr.length - 1,
          firstColumn: 0,
          lastColumn: this.getColumnCount() - 1,
          removeStart: startIndex,
          removeCount: howMany
        };

        this._rowArr.splice(startIndex, howMany); // Inform the listeners


        this.fireDataEvent("dataChanged", data);

        if (clearSorting !== false) {
          this.clearSorting();
        }
      },

      /**
       * Creates an array of maps to an array of arrays.
       *
       * @param mapArr {Map[]} An array containing a map for each row. Each
       *          row-map contains the column IDs as key and the cell values as value.
       * @param rememberMaps {Boolean ? false} Whether to remember the original maps.
       *        If true {@link #getRowData} will return the original map.
       * @return {var[][]} An array containing an array for each row. Each
       *           row-array contains the values in that row in the order of the columns
       *           in this model.
       */
      _mapArray2RowArr: function _mapArray2RowArr(mapArr, rememberMaps) {
        var rowCount = mapArr.length;
        var columnCount = this.getColumnCount();
        var dataArr = new Array(rowCount);
        var columnArr;

        for (var i = 0; i < rowCount; ++i) {
          columnArr = [];

          if (rememberMaps) {
            columnArr.originalData = mapArr[i];
          }

          for (var j = 0; j < columnCount; ++j) {
            columnArr[j] = mapArr[i][this.getColumnId(j)];
          }

          dataArr[i] = columnArr;
        }

        return dataArr;
      }
    },
    destruct: function destruct() {
      this._rowArr = this.__editableColArr__P_194_2 = this.__sortMethods__P_194_1 = this.__sortableColArr__P_194_3 = null;
    }
  });
  qx.ui.table.model.Simple.$$dbClassInfo = $$dbClassInfo;
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
   * A cell renderer for header cells.
   */
  qx.Interface.define("qx.ui.table.IHeaderRenderer", {
    members: {
      /**
       * Creates a header cell.
       *
       * The cellInfo map contains the following properties:
       * <ul>
       * <li>col (int): the model index of the column.</li>
       * <li>xPos (int): the x position of the column in the table pane.</li>
       * <li>name (string): the name of the column.</li>
       * <li>editable (boolean): whether the column is editable.</li>
       * <li>sorted (boolean): whether the column is sorted.</li>
       * <li>sortedAscending (boolean): whether sorting is ascending.</li>
       * </ul>
       *
       * @abstract
       * @param cellInfo {Map} A map containing the information about the cell to
       *      create.
       * @return {qx.ui.core.Widget} the widget that renders the header cell.
       */
      createHeaderCell: function createHeaderCell(cellInfo) {
        return true;
      },

      /**
       * Updates a header cell.
       *
       * @abstract
       * @param cellInfo {Map} A map containing the information about the cell to
       *      create. This map has the same structure as in {@link #createHeaderCell}.
       * @param cellWidget {qx.ui.core.Widget} the widget that renders the header cell. This is
       *      the same widget formally created by {@link #createHeaderCell}.
       */
      updateHeaderCell: function updateHeaderCell(cellInfo, cellWidget) {
        return true;
      }
    }
  });
  qx.ui.table.IHeaderRenderer.$$dbClassInfo = $$dbClassInfo;
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
      "qx.ui.table.IHeaderRenderer": {
        "require": true
      },
      "qx.ui.table.headerrenderer.HeaderCell": {},
      "qx.ui.tooltip.ToolTip": {},
      "qx.util.DisposeUtil": {}
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
       * Sebastian Werner (wpbasti)
  
  ************************************************************************ */

  /**
   * The default header cell renderer.
   */
  qx.Class.define("qx.ui.table.headerrenderer.Default", {
    extend: qx.core.Object,
    implement: qx.ui.table.IHeaderRenderer,

    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */
    statics: {
      /**
       * @type {String} The state which will be set for header cells of sorted columns.
       */
      STATE_SORTED: "sorted",

      /**
       * @type {String} The state which will be set when sorting is ascending.
       */
      STATE_SORTED_ASCENDING: "sortedAscending"
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /**
       * ToolTip to show if the pointer hovers of the icon
       */
      toolTip: {
        check: "String",
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
      // overridden
      createHeaderCell: function createHeaderCell(cellInfo) {
        var widget = new qx.ui.table.headerrenderer.HeaderCell();
        this.updateHeaderCell(cellInfo, widget);
        return widget;
      },
      // overridden
      updateHeaderCell: function updateHeaderCell(cellInfo, cellWidget) {
        var DefaultHeaderCellRenderer = qx.ui.table.headerrenderer.Default; // check for localization [BUG #2699]

        if (cellInfo.name && cellInfo.name.translate) {
          cellWidget.setLabel(cellInfo.name.translate());
        } else {
          cellWidget.setLabel(cellInfo.name);
        } // Set image tooltip if given


        var widgetToolTip = cellWidget.getToolTip();

        if (this.getToolTip() != null) {
          if (widgetToolTip == null) {
            // We have no tooltip yet -> Create one
            widgetToolTip = new qx.ui.tooltip.ToolTip(this.getToolTip());
            cellWidget.setToolTip(widgetToolTip); // Link disposer to cellwidget to prevent memory leak

            qx.util.DisposeUtil.disposeTriggeredBy(widgetToolTip, cellWidget);
          } else {
            // Update tooltip text
            widgetToolTip.setLabel(this.getToolTip());
          }
        }

        cellInfo.sorted ? cellWidget.addState(DefaultHeaderCellRenderer.STATE_SORTED) : cellWidget.removeState(DefaultHeaderCellRenderer.STATE_SORTED);
        cellInfo.sortedAscending ? cellWidget.addState(DefaultHeaderCellRenderer.STATE_SORTED_ASCENDING) : cellWidget.removeState(DefaultHeaderCellRenderer.STATE_SORTED_ASCENDING);
      }
    }
  });
  qx.ui.table.headerrenderer.Default.$$dbClassInfo = $$dbClassInfo;
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
   * A cell renderer for data cells.
   */
  qx.Interface.define("qx.ui.table.ICellRenderer", {
    members: {
      /**
       * Creates the HTML for a data cell.
       *
       * The cellInfo map contains the following properties:
       * <ul>
       * <li>value (var): the cell's value.</li>
       * <li>rowData (var): contains the row data for the row, the cell belongs to.
       *   The kind of this object depends on the table model, see
       *   {@link qx.ui.table.ITableModel#getRowData}</li>
       * <li>row (int): the model index of the row the cell belongs to.</li>
       * <li>col (int): the model index of the column the cell belongs to.</li>
       * <li>table (qx.ui.table.Table): the table the cell belongs to.</li>
       * <li>xPos (int): the x position of the cell in the table pane.</li>
       * <li>selected (boolean): whether the cell is selected.</li>
       * <li>focusedRow (boolean): whether the cell is in the same row as the
       *   focused cell.</li>
       * <li>editable (boolean): whether the cell is editable.</li>
       * <li>style (string): The CSS styles that should be applied to the outer HTML
       *   element.</li>
       * <li>styleLeft (string): The left position of the cell.</li>
       * <li>styleWidth (string): The cell's width (pixel).</li>
       * <li>styleHeight (string): The cell's height (pixel).</li>
       * </ul>
       *
       * @param cellInfo {Map} A map containing the information about the cell to
       *     create.
       * @param htmlArr {String[]} Target string container. The HTML of the data
       *     cell should be appended to this array.
       *
       * @return {Boolean|undefined}
       *   A return value of <i>true</i> specifies that no additional cells in
       *   the row shall be rendered. This may be used, for example, for
       *   separator rows or for other special rendering purposes. Traditional
       *   cell renderers had no defined return value, so returned nothing
       *   (undefined). If this method returns either false or nothing, then
       *   rendering continues with the next cell in the row, which the normal
       *   mode of operation.
       */
      createDataCellHtml: function createDataCellHtml(cellInfo, htmlArr) {
        return true;
      }
    }
  });
  qx.ui.table.ICellRenderer.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.bom.Stylesheet": {
        "require": true
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
      "qx.ui.table.ICellRenderer": {
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.theme.manager.Meta": {
        "construct": true
      },
      "qx.theme.manager.Color": {},
      "qx.bom.element.Style": {},
      "qx.bom.client.Css": {
        "require": true
      },
      "qx.bom.element.BoxSizing": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "qx.dyntheme": {
          "load": true
        },
        "css.boxsizing": {
          "className": "qx.bom.client.Css"
        },
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
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Til Schneider (til132)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * An abstract data cell renderer that does the basic coloring
   * (borders, selected look, ...).
   *
   * @require(qx.bom.Stylesheet)
   */
  qx.Class.define("qx.ui.table.cellrenderer.Abstract", {
    type: "abstract",
    implement: qx.ui.table.ICellRenderer,
    extend: qx.core.Object,
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      var cr = qx.ui.table.cellrenderer.Abstract;

      if (!cr.__clazz__P_211_0) {
        cr.__clazz__P_211_0 = qx.ui.table.cellrenderer.Abstract;

        this._createStyleSheet(); // add dynamic theme listener


        {
          qx.theme.manager.Meta.getInstance().addListener("changeTheme", this._onChangeTheme, this);
        }
      }
    },
    properties: {
      /**
       * The default cell style. The value of this property will be provided
       * to the cell renderer as cellInfo.style.
       */
      defaultCellStyle: {
        init: null,
        check: "String",
        nullable: true
      }
    },
    members: {
      /**
       * Handler for the theme change.
       * @signature function()
       */
      _onChangeTheme: qx.core.Environment.select("qx.dyntheme", {
        "true": function _true() {
          qx.bom.Stylesheet.removeAllRules(qx.ui.table.cellrenderer.Abstract.__clazz__P_211_0.stylesheet);

          this._createStyleSheet();
        },
        "false": null
      }),

      /**
       * the sum of the horizontal insets. This is needed to compute the box model
       * independent size
       */
      _insetX: 13,
      // paddingLeft + paddingRight + borderRight

      /**
       * the sum of the vertical insets. This is needed to compute the box model
       * independent size
       */
      _insetY: 0,

      /**
       * Creates the style sheet used for the table cells.
       */
      _createStyleSheet: function _createStyleSheet() {
        var colorMgr = qx.theme.manager.Color.getInstance();
        var stylesheet = ".qooxdoo-table-cell {" + qx.bom.element.Style.compile({
          position: "absolute",
          top: "0px",
          overflow: "hidden",
          whiteSpace: "nowrap",
          borderRight: "1px solid " + colorMgr.resolve("table-column-line"),
          padding: "0px 6px",
          cursor: "default",
          textOverflow: "ellipsis",
          userSelect: "none"
        }) + "} " + ".qooxdoo-table-cell-right { text-align:right } " + ".qooxdoo-table-cell-italic { font-style:italic} " + ".qooxdoo-table-cell-bold { font-weight:bold } ";

        if (qx.core.Environment.get("css.boxsizing")) {
          stylesheet += ".qooxdoo-table-cell {" + qx.bom.element.BoxSizing.compile("content-box") + "}";
        }

        qx.ui.table.cellrenderer.Abstract.__clazz__P_211_0.stylesheet = qx.bom.Stylesheet.createElement(stylesheet);
      },

      /**
       * Get a string of the cell element's HTML classes.
       *
       * This method may be overridden by sub classes.
       *
       * @param cellInfo {Map} cellInfo of the cell
       * @return {String} The table cell HTML classes as string.
       */
      _getCellClass: function _getCellClass(cellInfo) {
        return "qooxdoo-table-cell";
      },

      /**
       * Returns the CSS styles that should be applied to the main div of this
       * cell.
       *
       * This method may be overridden by sub classes.
       *
       * @param cellInfo {Map} The information about the cell.
       *          See {@link qx.ui.table.cellrenderer.Abstract#createDataCellHtml}.
       * @return {var} the CSS styles of the main div.
       */
      _getCellStyle: function _getCellStyle(cellInfo) {
        return cellInfo.style || "";
      },

      /**
       * Retrieve any extra attributes the cell renderer wants applied to this
       * cell.
       *
       * @param cellInfo {Map} The information about the cell.
       *          See {@link qx.ui.table.cellrenderer.Abstract#createDataCellHtml}.
       *
       * @return {String}
       *   The extra attributes to be applied to this cell.
       */
      _getCellAttributes: function _getCellAttributes(cellInfo) {
        var cellId = "qooxdoo-table-cell-" + cellInfo.table.toHashCode() + "-" + cellInfo.row + "-" + cellInfo.col;
        var readOnly = cellInfo.editable !== null && cellInfo.editable !== undefined ? !cellInfo.editable : true;
        return "id=" + cellId + " role=gridcell aria-readonly=" + readOnly;
      },

      /**
       * Returns the HTML that should be used inside the main div of this cell.
       *
       * This method may be overridden by sub classes.
       *
       * @param cellInfo {Map} The information about the cell.
       *          See {@link qx.ui.table.cellrenderer.Abstract#createDataCellHtml}.
       * @return {String} the inner HTML of the cell.
       */
      _getContentHtml: function _getContentHtml(cellInfo) {
        return cellInfo.value || "";
      },

      /**
       * Get the cell size taking the box model into account
       *
       * @param width {Integer} The cell's (border-box) width in pixel
       * @param height {Integer} The cell's (border-box) height in pixel
       * @param insetX {Integer} The cell's horizontal insets, i.e. the sum of
       *    horizontal paddings and borders
       * @param insetY {Integer} The cell's vertical insets, i.e. the sum of
       *    vertical paddings and borders
       * @return {String} The CSS style string for the cell size
       */
      _getCellSizeStyle: function _getCellSizeStyle(width, height, insetX, insetY) {
        var style = "";

        if (qx.core.Environment.get("css.boxmodel") == "content") {
          width -= insetX;
          height -= insetY;
        }

        style += "width:" + Math.max(width, 0) + "px;";
        style += "height:" + Math.max(height, 0) + "px;";
        return style;
      },
      // interface implementation
      createDataCellHtml: function createDataCellHtml(cellInfo, htmlArr) {
        htmlArr.push('<div class="', this._getCellClass(cellInfo), '" style="', "left:", cellInfo.styleLeft, "px;", this._getCellSizeStyle(cellInfo.styleWidth, cellInfo.styleHeight, this._insetX, this._insetY), this._getCellStyle(cellInfo), '" ', 'data-qx-table-cell-row="', cellInfo.row, '" ', 'data-qx-table-cell-col="', cellInfo.col, '" ', this._getCellAttributes(cellInfo), ">" + this._getContentHtml(cellInfo), "</div>");
      }
    },
    destruct: function destruct() {
      // remove dynamic theme listener
      {
        qx.theme.manager.Meta.getInstance().removeListener("changeTheme", this._onChangeTheme, this);
      }
    }
  });
  qx.ui.table.cellrenderer.Abstract.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.table.cellrenderer.Abstract": {
        "require": true
      },
      "qx.bom.String": {},
      "qx.util.format.NumberFormat": {},
      "qx.util.format.DateFormat": {}
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
   * The default data cell renderer.
   */
  qx.Class.define("qx.ui.table.cellrenderer.Default", {
    extend: qx.ui.table.cellrenderer.Abstract,

    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */
    statics: {
      STYLEFLAG_ALIGN_RIGHT: 1,
      STYLEFLAG_BOLD: 2,
      STYLEFLAG_ITALIC: 4,
      _numberFormat: null
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /**
       * Whether the alignment should automatically be set according to the cell value.
       * If true numbers will be right-aligned.
       */
      useAutoAlign: {
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
      /**
       * Determines the styles to apply to the cell
       *
       * @param cellInfo {Map} cellInfo of the cell
       *     See {@link qx.ui.table.cellrenderer.Abstract#createDataCellHtml}.
       * @return {Integer} the sum of any of the STYLEFLAGS defined below
       */
      _getStyleFlags: function _getStyleFlags(cellInfo) {
        if (this.getUseAutoAlign()) {
          if (typeof cellInfo.value == "number") {
            return qx.ui.table.cellrenderer.Default.STYLEFLAG_ALIGN_RIGHT;
          }
        }

        return 0;
      },
      // overridden
      _getCellClass: function _getCellClass(cellInfo) {
        var cellClass = qx.ui.table.cellrenderer.Default.superclass.prototype._getCellClass.call(this, cellInfo);

        if (!cellClass) {
          return "";
        }

        var stylesToApply = this._getStyleFlags(cellInfo);

        if (stylesToApply & qx.ui.table.cellrenderer.Default.STYLEFLAG_ALIGN_RIGHT) {
          cellClass += " qooxdoo-table-cell-right";
        }

        if (stylesToApply & qx.ui.table.cellrenderer.Default.STYLEFLAG_BOLD) {
          cellClass += " qooxdoo-table-cell-bold";
        }

        if (stylesToApply & qx.ui.table.cellrenderer.Default.STYLEFLAG_ITALIC) {
          cellClass += " qooxdoo-table-cell-italic";
        }

        return cellClass;
      },
      // overridden
      _getContentHtml: function _getContentHtml(cellInfo) {
        return qx.bom.String.escape(this._formatValue(cellInfo));
      },

      /**
       * Formats a value.
       *
       * @param cellInfo {Map} A map containing the information about the cell to
       *          create. This map has the same structure as in
       *          {@link qx.ui.table.cellrenderer.Abstract#createDataCellHtml}.
       * @return {String} the formatted value.
       */
      _formatValue: function _formatValue(cellInfo) {
        var value = cellInfo.value;
        var res;

        if (value == null) {
          return "";
        }

        if (typeof value == "string") {
          return value;
        } else if (typeof value == "number") {
          if (!qx.ui.table.cellrenderer.Default._numberFormat) {
            qx.ui.table.cellrenderer.Default._numberFormat = new qx.util.format.NumberFormat();

            qx.ui.table.cellrenderer.Default._numberFormat.setMaximumFractionDigits(2);
          }

          res = qx.ui.table.cellrenderer.Default._numberFormat.format(value);
        } else if (value instanceof Date) {
          res = qx.util.format.DateFormat.getDateInstance().format(value);
        } else {
          res = value.toString();
        }

        return res;
      }
    }
  });
  qx.ui.table.cellrenderer.Default.$$dbClassInfo = $$dbClassInfo;
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
   * A factory creating widgets to use for editing table cells.
   */
  qx.Interface.define("qx.ui.table.ICellEditorFactory", {
    members: {
      /**
       * Creates a cell editor.
       *
       * The cellInfo map contains the following properties:
       * <ul>
       * <li>value (var): the cell's value.</li>
       * <li>row (int): the model index of the row the cell belongs to.</li>
       * <li>col (int): the model index of the column the cell belongs to.</li>
       * <li>xPos (int): the x position of the cell in the table pane.</li>
       * <li>table (qx.ui.table.Table) reference to the table, the cell belongs to. </li>
       * </ul>
       *
       * @abstract
       * @param cellInfo {Map} A map containing the information about the cell to
       *      create.
       * @return {qx.ui.core.Widget} the widget that should be used as cell editor.
       */
      createCellEditor: function createCellEditor(cellInfo) {
        return true;
      },

      /**
       * Returns the current value of a cell editor.
       *
       * @abstract
       * @param cellEditor {qx.ui.core.Widget} The cell editor formally created by
       *      {@link #createCellEditor}.
       * @return {var} the current value from the editor.
       */
      getCellEditorValue: function getCellEditorValue(cellEditor) {
        return true;
      }
    }
  });
  qx.ui.table.ICellEditorFactory.$$dbClassInfo = $$dbClassInfo;
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
      "qx.ui.table.ICellEditorFactory": {
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
   * An abstract cell editor factory creating text/password/spinner/... fields.
   */
  qx.Class.define("qx.ui.table.celleditor.AbstractField", {
    extend: qx.core.Object,
    implement: qx.ui.table.ICellEditorFactory,
    type: "abstract",
    properties: {
      /**
       * function that validates the result
       * the function will be called with the new value and the old value and is
       * supposed to return the value that is set as the table value.
       **/
      validationFunction: {
        check: "Function",
        nullable: true,
        init: null
      }
    },
    members: {
      /**
       * Factory to create the editor widget
       *
       * @return {qx.ui.core.Widget} The editor widget
       */
      _createEditor: function _createEditor() {
        throw new Error("Abstract method call!");
      },
      // interface implementation
      createCellEditor: function createCellEditor(cellInfo) {
        var cellEditor = this._createEditor();

        cellEditor.originalValue = cellInfo.value;

        if (cellInfo.value === null || cellInfo.value === undefined) {
          cellInfo.value = "";
        }

        cellEditor.setValue("" + cellInfo.value);
        cellEditor.addListener("appear", function () {
          cellEditor.selectAllText();
        });
        return cellEditor;
      },
      // interface implementation
      getCellEditorValue: function getCellEditorValue(cellEditor) {
        var value = cellEditor.getValue(); // validation function will be called with new and old value

        var validationFunc = this.getValidationFunction();

        if (validationFunc) {
          value = validationFunc(value, cellEditor.originalValue);
        }

        if (typeof cellEditor.originalValue == "number") {
          value = parseFloat(value);
        }

        return value;
      }
    }
  });
  qx.ui.table.celleditor.AbstractField.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.table.celleditor.AbstractField": {
        "require": true
      },
      "qx.ui.form.TextField": {}
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
   * A cell editor factory creating text fields.
   */
  qx.Class.define("qx.ui.table.celleditor.TextField", {
    extend: qx.ui.table.celleditor.AbstractField,
    members: {
      // overridden
      getCellEditorValue: function getCellEditorValue(cellEditor) {
        var value = cellEditor.getValue(); // validation function will be called with new and old value

        var validationFunc = this.getValidationFunction();

        if (validationFunc) {
          value = validationFunc(value, cellEditor.originalValue);
        }

        if (typeof cellEditor.originalValue == "number") {
          // Correct problem of NaN displaying when value is null string.
          //if (value != null) {
          if (value != null && value != "") {
            value = parseFloat(value);
          }
        }

        return value;
      },
      _createEditor: function _createEditor() {
        var cellEditor = new qx.ui.form.TextField();
        cellEditor.setAppearance("table-editor-textfield");
        return cellEditor;
      }
    }
  });
  qx.ui.table.celleditor.TextField.$$dbClassInfo = $$dbClassInfo;
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
      "qx.ui.table.headerrenderer.Default": {
        "require": true
      },
      "qx.ui.table.cellrenderer.Default": {
        "require": true
      },
      "qx.ui.table.celleditor.TextField": {
        "require": true
      },
      "qx.ui.table.IHeaderRenderer": {},
      "qx.ui.table.ICellRenderer": {},
      "qx.ui.table.ICellEditorFactory": {},
      "qx.lang.Array": {}
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
   * A model that contains all meta data about columns, such as width, renderer,
   * visibility and order.
   *
   * @see qx.ui.table.ITableModel
   */
  qx.Class.define("qx.ui.table.columnmodel.Basic", {
    extend: qx.core.Object,
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      this.__overallColumnArr__P_198_0 = [];
      this.__visibleColumnArr__P_198_1 = [];
    },

    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */
    events: {
      /**
       * Fired when the width of a column has changed. The data property of the event is
       * a map having the following attributes:
       * <ul>
       *   <li>col: The model index of the column the width of which has changed.</li>
       *   <li>newWidth: The new width of the column in pixels.</li>
       *   <li>oldWidth: The old width of the column in pixels.</li>
       * </ul>
       */
      widthChanged: "qx.event.type.Data",

      /**
       * Fired when the visibility of a column has changed. This event is equal to
       * "visibilityChanged", but is fired right before.
       */
      visibilityChangedPre: "qx.event.type.Data",

      /**
       * Fired when the visibility of a column has changed. The data property of the
       * event is a map having the following attributes:
       * <ul>
       *   <li>col: The model index of the column the visibility of which has changed.</li>
       *   <li>visible: Whether the column is now visible.</li>
       * </ul>
       */
      visibilityChanged: "qx.event.type.Data",

      /**
       * Fired when the column order has changed. The data property of the
       * event is a map having the following attributes:
       * <ul>
       *   <li>col: The model index of the column that was moved.</li>
       *   <li>fromOverXPos: The old overall x position of the column.</li>
       *   <li>toOverXPos: The new overall x position of the column.</li>
       * </ul>
       */
      orderChanged: "qx.event.type.Data",

      /**
       * Fired when the cell renderer of a column has changed.
       * The data property of the event is a map having the following attributes:
       * <ul>
       *   <li>col: The model index of the column that was moved.</li>
       * </ul>
       */
      headerCellRendererChanged: "qx.event.type.Data"
    },

    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */
    statics: {
      /** @type {Integer} the default width of a column in pixels. */
      DEFAULT_WIDTH: 100,

      /** @type {qx.ui.table.headerrenderer.Default} the default header cell renderer. */
      DEFAULT_HEADER_RENDERER: qx.ui.table.headerrenderer.Default,

      /** @type {qx.ui.table.cellrenderer.Default} the default data cell renderer. */
      DEFAULT_DATA_RENDERER: qx.ui.table.cellrenderer.Default,

      /** @type {qx.ui.table.celleditor.TextField} the default editor factory. */
      DEFAULT_EDITOR_FACTORY: qx.ui.table.celleditor.TextField
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __internalChange__P_198_2: null,
      __colToXPosMap__P_198_3: null,
      __visibleColumnArr__P_198_1: null,
      __overallColumnArr__P_198_0: null,
      __columnDataArr__P_198_4: null,
      __headerRenderer__P_198_5: null,
      __dataRenderer__P_198_6: null,
      __editorFactory__P_198_7: null,

      /**
       * Initializes the column model.
       *
       * @param colCount {Integer}
       *   The number of columns the model should have.
       *
       * @param table {qx.ui.table.Table}
       *   The table to which this column model is attached.
       */
      init: function init(colCount, table) {
        {
          this.assertInteger(colCount, "Invalid argument 'colCount'.");
        }
        this.__columnDataArr__P_198_4 = [];
        var width = qx.ui.table.columnmodel.Basic.DEFAULT_WIDTH;
        var headerRenderer = this.__headerRenderer__P_198_5 || (this.__headerRenderer__P_198_5 = new qx.ui.table.columnmodel.Basic.DEFAULT_HEADER_RENDERER());
        var dataRenderer = this.__dataRenderer__P_198_6 || (this.__dataRenderer__P_198_6 = new qx.ui.table.columnmodel.Basic.DEFAULT_DATA_RENDERER());
        var editorFactory = this.__editorFactory__P_198_7 || (this.__editorFactory__P_198_7 = new qx.ui.table.columnmodel.Basic.DEFAULT_EDITOR_FACTORY());
        this.__overallColumnArr__P_198_0 = [];
        this.__visibleColumnArr__P_198_1 = []; // Get the initially hidden column array, if one was provided. Older
        // subclasses may not provide the 'table' argument, so we treat them
        // traditionally with no initially hidden columns.

        var initiallyHiddenColumns; // Was a table provided to us?

        if (table) {
          // Yup. Get its list of initially hidden columns, if the user provided
          // such a list.
          initiallyHiddenColumns = table.getInitiallyHiddenColumns();
        } // If no table was specified, or if the user didn't provide a list of
        // initially hidden columns, use an empty list.


        initiallyHiddenColumns = initiallyHiddenColumns || [];

        for (var col = 0; col < colCount; col++) {
          this.__columnDataArr__P_198_4[col] = {
            width: width,
            headerRenderer: headerRenderer,
            dataRenderer: dataRenderer,
            editorFactory: editorFactory
          };
          this.__overallColumnArr__P_198_0[col] = col;
          this.__visibleColumnArr__P_198_1[col] = col;
        }

        this.__colToXPosMap__P_198_3 = null; // If any columns are initially hidden, hide them now. Make it an
        // internal change so that events are not generated.

        this.__internalChange__P_198_2 = true;

        for (var hidden = 0; hidden < initiallyHiddenColumns.length; hidden++) {
          this.setColumnVisible(initiallyHiddenColumns[hidden], false);
        }

        this.__internalChange__P_198_2 = false;

        for (col = 0; col < colCount; col++) {
          var data = {
            col: col,
            visible: this.isColumnVisible(col)
          };
          this.fireDataEvent("visibilityChangedPre", data);
          this.fireDataEvent("visibilityChanged", data);
        }
      },

      /**
       * Return the array of visible columns
       *
       * @return {Array} List of all visible columns
       */
      getVisibleColumns: function getVisibleColumns() {
        return this.__visibleColumnArr__P_198_1 != null ? this.__visibleColumnArr__P_198_1 : [];
      },

      /**
       * Sets the width of a column.
       *
       * @param col {Integer}
       *   The model index of the column.
       *
       * @param width {Integer}
       *   The new width the column should get in pixels.
       *
       * @param isPointerAction {Boolean}
       *   <i>true</i> if the column width is being changed as a result of a
       *   pointer drag in the header; false or undefined otherwise.
       *
       */
      setColumnWidth: function setColumnWidth(col, width, isPointerAction) {
        {
          this.assertInteger(col, "Invalid argument 'col'.");
          this.assertInteger(width, "Invalid argument 'width'.");
          this.assertNotUndefined(this.__columnDataArr__P_198_4[col], "Column not found in table model");
        }
        var oldWidth = this.__columnDataArr__P_198_4[col].width;

        if (oldWidth != width) {
          this.__columnDataArr__P_198_4[col].width = width;
          var data = {
            col: col,
            newWidth: width,
            oldWidth: oldWidth,
            isPointerAction: isPointerAction || false
          };
          this.fireDataEvent("widthChanged", data);
        }
      },

      /**
       * Returns the width of a column.
       *
       * @param col {Integer} the model index of the column.
       * @return {Integer} the width of the column in pixels.
       */
      getColumnWidth: function getColumnWidth(col) {
        {
          this.assertInteger(col, "Invalid argument 'col'.");
          this.assertNotUndefined(this.__columnDataArr__P_198_4[col], "Column not found in table model");
        }
        return this.__columnDataArr__P_198_4[col].width;
      },

      /**
       * Sets the header renderer of a column. Use setHeaderCellRenderers
       * instead of this method if you want to set the header renderer of many
       * columns.
       *
       * @param col {Integer} the model index of the column.
       * @param renderer {qx.ui.table.IHeaderRenderer} the new header renderer the column
       *      should get.
       */
      setHeaderCellRenderer: function setHeaderCellRenderer(col, renderer) {
        {
          this.assertInteger(col, "Invalid argument 'col'.");
          this.assertInterface(renderer, qx.ui.table.IHeaderRenderer, "Invalid argument 'renderer'.");
          this.assertNotUndefined(this.__columnDataArr__P_198_4[col], "Column not found in table model");
        }
        var oldRenderer = this.__columnDataArr__P_198_4[col].headerRenderer;

        if (oldRenderer !== this.__headerRenderer__P_198_5) {
          oldRenderer.dispose();
        }

        this.__columnDataArr__P_198_4[col].headerRenderer = renderer;

        if (!this.__internalChange__P_198_2) {
          this.fireDataEvent("headerCellRendererChanged", {
            col: col
          });
        }
      },

      /**
       * Sets the header renderer of one or more columns. Use this method, in
       * favor of setHeaderCellRenderer, if you want to set the header renderer
       * of many columns. This method fires the "headerCellRendererChanged"
       * event only once, after setting all renderers, whereas
       * setHeaderCellRenderer fires it for each changed renderer which can be
       * slow with many columns.
       *
       * @param renderers {Map}
       *   Map, where the keys are column numbers and values are the renderers,
       *   implementing qx.ui.table.IHeaderRenderer, of the the new header
       *   renderers for that column
       */
      setHeaderCellRenderers: function setHeaderCellRenderers(renderers) {
        var col; // Prevent firing "headerCellRendererChanged" for each column. Instead,
        // we'll fire it once at the end.

        this.__internalChange__P_198_2 = true; // For each listed column...

        for (col in renderers) {
          // ... set that column's renderer
          this.setHeaderCellRenderer(+col, renderers[col]);
        } // Turn off the internal-change flag so operation returns to normal


        this.__internalChange__P_198_2 = false; // Now we can fire the event once. The data indicates which columns
        // changed. Internally to qooxdoo, nothing cares about the event data.

        this.fireDataEvent("headerCellRendererChanged", {
          cols: Object.keys(renderers)
        });
      },

      /**
       * Returns the header renderer of a column.
       *
       * @param col {Integer} the model index of the column.
       * @return {qx.ui.table.IHeaderRenderer} the header renderer of the column.
       */
      getHeaderCellRenderer: function getHeaderCellRenderer(col) {
        {
          this.assertInteger(col, "Invalid argument 'col'.");
          this.assertNotUndefined(this.__columnDataArr__P_198_4[col], "Column not found in table model");
        }
        return this.__columnDataArr__P_198_4[col].headerRenderer;
      },

      /**
       * Sets the data renderer of a column.
       *
       * @param col {Integer} the model index of the column.
       * @param renderer {qx.ui.table.ICellRenderer} the new data renderer
       *   the column should get.
       * @return {qx.ui.table.ICellRenderer?null} If an old renderer was set and
       *   it was not the default renderer, the old renderer is returned for
       *   pooling or disposing.
       */
      setDataCellRenderer: function setDataCellRenderer(col, renderer) {
        {
          this.assertInteger(col, "Invalid argument 'col'.");
          this.assertInterface(renderer, qx.ui.table.ICellRenderer, "Invalid argument 'renderer'.");
          this.assertNotUndefined(this.__columnDataArr__P_198_4[col], "Column not found in table model");
        }
        var oldRenderer = this.__columnDataArr__P_198_4[col].dataRenderer;
        this.__columnDataArr__P_198_4[col].dataRenderer = renderer;

        if (oldRenderer !== this.__dataRenderer__P_198_6) {
          return oldRenderer;
        }

        return null;
      },

      /**
       * Returns the data renderer of a column.
       *
       * @param col {Integer} the model index of the column.
       * @return {qx.ui.table.ICellRenderer} the data renderer of the column.
       */
      getDataCellRenderer: function getDataCellRenderer(col) {
        {
          this.assertInteger(col, "Invalid argument 'col'.");
          this.assertNotUndefined(this.__columnDataArr__P_198_4[col], "Column not found in table model");
        }
        return this.__columnDataArr__P_198_4[col].dataRenderer;
      },

      /**
       * Sets the cell editor factory of a column.
       *
       * @param col {Integer} the model index of the column.
       * @param factory {qx.ui.table.ICellEditorFactory} the new cell editor factory the column should get.
       */
      setCellEditorFactory: function setCellEditorFactory(col, factory) {
        {
          this.assertInteger(col, "Invalid argument 'col'.");
          this.assertInterface(factory, qx.ui.table.ICellEditorFactory, "Invalid argument 'factory'.");
          this.assertNotUndefined(this.__columnDataArr__P_198_4[col], "Column not found in table model");
        }
        var oldFactory = this.__columnDataArr__P_198_4[col].editorFactory;

        if (oldFactory === factory) {
          return;
        }

        if (oldFactory !== this.__editorFactory__P_198_7) {
          oldFactory.dispose();
        }

        this.__columnDataArr__P_198_4[col].editorFactory = factory;
      },

      /**
       * Returns the cell editor factory of a column.
       *
       * @param col {Integer} the model index of the column.
       * @return {qx.ui.table.ICellEditorFactory} the cell editor factory of the column.
       */
      getCellEditorFactory: function getCellEditorFactory(col) {
        {
          this.assertInteger(col, "Invalid argument 'col'.");
          this.assertNotUndefined(this.__columnDataArr__P_198_4[col], "Column not found in table model");
        }
        return this.__columnDataArr__P_198_4[col].editorFactory;
      },

      /**
       * Returns the map that translates model indexes to x positions.
       *
       * The returned map contains for a model index (int) a map having two
       * properties: overX (the overall x position of the column, int) and
       * visX (the visible x position of the column, int). visX is missing for
       * hidden columns.
       *
       * @return {Map} the "column to x position" map.
       */
      _getColToXPosMap: function _getColToXPosMap() {
        if (this.__colToXPosMap__P_198_3 == null) {
          this.__colToXPosMap__P_198_3 = {};

          for (var overX = 0; overX < this.__overallColumnArr__P_198_0.length; overX++) {
            var col = this.__overallColumnArr__P_198_0[overX];
            this.__colToXPosMap__P_198_3[col] = {
              overX: overX
            };
          }

          for (var visX = 0; visX < this.__visibleColumnArr__P_198_1.length; visX++) {
            var col = this.__visibleColumnArr__P_198_1[visX];
            this.__colToXPosMap__P_198_3[col].visX = visX;
          }
        }

        return this.__colToXPosMap__P_198_3;
      },

      /**
       * Returns the number of visible columns.
       *
       * @return {Integer} the number of visible columns.
       */
      getVisibleColumnCount: function getVisibleColumnCount() {
        return this.__visibleColumnArr__P_198_1 != null ? this.__visibleColumnArr__P_198_1.length : 0;
      },

      /**
       * Returns the model index of a column at a certain visible x position.
       *
       * @param visXPos {Integer} the visible x position of the column.
       * @return {Integer} the model index of the column.
       */
      getVisibleColumnAtX: function getVisibleColumnAtX(visXPos) {
        {
          this.assertInteger(visXPos, "Invalid argument 'visXPos'.");
        }
        return this.__visibleColumnArr__P_198_1[visXPos];
      },

      /**
       * Returns the visible x position of a column.
       *
       * @param col {Integer} the model index of the column.
       * @return {Integer} the visible x position of the column.
       */
      getVisibleX: function getVisibleX(col) {
        {
          this.assertInteger(col, "Invalid argument 'col'.");
        }
        return this._getColToXPosMap()[col].visX;
      },

      /**
       * Returns the overall number of columns (including hidden columns).
       *
       * @return {Integer} the overall number of columns.
       */
      getOverallColumnCount: function getOverallColumnCount() {
        return this.__overallColumnArr__P_198_0.length;
      },

      /**
       * Returns the model index of a column at a certain overall x position.
       *
       * @param overXPos {Integer} the overall x position of the column.
       * @return {Integer} the model index of the column.
       */
      getOverallColumnAtX: function getOverallColumnAtX(overXPos) {
        {
          this.assertInteger(overXPos, "Invalid argument 'overXPos'.");
        }
        return this.__overallColumnArr__P_198_0[overXPos];
      },

      /**
       * Returns the overall x position of a column.
       *
       * @param col {Integer} the model index of the column.
       * @return {Integer} the overall x position of the column.
       */
      getOverallX: function getOverallX(col) {
        {
          this.assertInteger(col, "Invalid argument 'col'.");
        }
        return this._getColToXPosMap()[col].overX;
      },

      /**
       * Returns whether a certain column is visible.
       *
       * @param col {Integer} the model index of the column.
       * @return {Boolean} whether the column is visible.
       */
      isColumnVisible: function isColumnVisible(col) {
        {
          this.assertInteger(col, "Invalid argument 'col'.");
        }
        return this._getColToXPosMap()[col].visX != null;
      },

      /**
       * Sets whether a certain column is visible.
       *
       * @param col {Integer} the model index of the column.
       * @param visible {Boolean} whether the column should be visible.
       */
      setColumnVisible: function setColumnVisible(col, visible) {
        {
          this.assertInteger(col, "Invalid argument 'col'.");
          this.assertBoolean(visible, "Invalid argument 'visible'.");
        }

        if (visible != this.isColumnVisible(col)) {
          if (visible) {
            var colToXPosMap = this._getColToXPosMap();

            var overX = colToXPosMap[col].overX;

            if (overX == null) {
              throw new Error("Showing column failed: " + col + ". The column is not added to this TablePaneModel.");
            } // get the visX of the next visible column after the column to show


            var nextVisX;

            for (var x = overX + 1; x < this.__overallColumnArr__P_198_0.length; x++) {
              var currCol = this.__overallColumnArr__P_198_0[x];
              var currVisX = colToXPosMap[currCol].visX;

              if (currVisX != null) {
                nextVisX = currVisX;
                break;
              }
            } // If there comes no visible column any more, then show the column
            // at the end


            if (nextVisX == null) {
              nextVisX = this.__visibleColumnArr__P_198_1.length;
            } // Add the column to the visible columns


            this.__visibleColumnArr__P_198_1.splice(nextVisX, 0, col);
          } else {
            var visX = this.getVisibleX(col);

            this.__visibleColumnArr__P_198_1.splice(visX, 1);
          } // Invalidate the __colToXPosMap


          this.__colToXPosMap__P_198_3 = null; // Inform the listeners

          if (!this.__internalChange__P_198_2) {
            var data = {
              col: col,
              visible: visible
            };
            this.fireDataEvent("visibilityChangedPre", data);
            this.fireDataEvent("visibilityChanged", data);
          }
        }
      },

      /**
       * Moves a column.
       *
       * @param fromOverXPos {Integer} the overall x position of the column to move.
       * @param toOverXPos {Integer} the overall x position of where the column should be
       *      moved to.
       */
      moveColumn: function moveColumn(fromOverXPos, toOverXPos) {
        {
          this.assertInteger(fromOverXPos, "Invalid argument 'fromOverXPos'.");
          this.assertInteger(toOverXPos, "Invalid argument 'toOverXPos'.");
        }
        this.__internalChange__P_198_2 = true;
        var col = this.__overallColumnArr__P_198_0[fromOverXPos];
        var visible = this.isColumnVisible(col);

        if (visible) {
          this.setColumnVisible(col, false);
        }

        this.__overallColumnArr__P_198_0.splice(fromOverXPos, 1);

        this.__overallColumnArr__P_198_0.splice(toOverXPos, 0, col); // Invalidate the __colToXPosMap


        this.__colToXPosMap__P_198_3 = null;

        if (visible) {
          this.setColumnVisible(col, true);
        }

        this.__internalChange__P_198_2 = false; // Inform the listeners

        var data = {
          col: col,
          fromOverXPos: fromOverXPos,
          toOverXPos: toOverXPos
        };
        this.fireDataEvent("orderChanged", data);
      },

      /**
       * Reorders all columns to new overall positions. Will fire one "orderChanged" event
       * without data afterwards
       *
       * @param newPositions {Integer[]} Array mapping the index of a column in table model to its wanted overall
       *                            position on screen (both zero based). If the table models holds
       *                            col0, col1, col2 and col3 and you give [1,3,2,0], the new column order
       *                            will be col1, col3, col2, col0
       */
      setColumnsOrder: function setColumnsOrder(newPositions) {
        {
          this.assertArray(newPositions, "Invalid argument 'newPositions'.");
        }

        if (newPositions.length == this.__overallColumnArr__P_198_0.length) {
          this.__internalChange__P_198_2 = true; // Go through each column an switch visible ones to invisible. Reason is unknown,
          // this just mimicks the behaviour of moveColumn. Possibly useful because setting
          // a column visible later updates a map with its screen coords.

          var isVisible = new Array(newPositions.length);

          for (var colIdx = 0; colIdx < this.__overallColumnArr__P_198_0.length; colIdx++) {
            var visible = this.isColumnVisible(colIdx);
            isVisible[colIdx] = visible; //Remember, as this relies on this.__colToXPosMap which is cleared below

            if (visible) {
              this.setColumnVisible(colIdx, false);
            }
          } // Store new position values


          this.__overallColumnArr__P_198_0 = qx.lang.Array.clone(newPositions); // Invalidate the __colToXPosMap

          this.__colToXPosMap__P_198_3 = null; // Go through each column an switch invisible ones back to visible

          for (var colIdx = 0; colIdx < this.__overallColumnArr__P_198_0.length; colIdx++) {
            if (isVisible[colIdx]) {
              this.setColumnVisible(colIdx, true);
            }
          }

          this.__internalChange__P_198_2 = false; // Inform the listeners. Do not add data as all known listeners in qooxdoo
          // only take this event to mean "total repaint necesscary". Fabian will look
          // after deprecating the data part of the orderChanged - event

          this.fireDataEvent("orderChanged");
        } else {
          throw new Error("setColumnsOrder: Invalid number of column positions given, expected " + this.__overallColumnArr__P_198_0.length + ", got " + newPositions.length);
        }
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      for (var i = 0; i < this.__columnDataArr__P_198_4.length; i++) {
        this.__columnDataArr__P_198_4[i].headerRenderer.dispose();

        this.__columnDataArr__P_198_4[i].dataRenderer.dispose();

        this.__columnDataArr__P_198_4[i].editorFactory.dispose();
      }

      this.__overallColumnArr__P_198_0 = this.__visibleColumnArr__P_198_1 = this.__columnDataArr__P_198_4 = this.__colToXPosMap__P_198_3 = null;

      this._disposeObjects("__headerRenderer__P_198_5", "__dataRenderer__P_198_6", "__editorFactory__P_198_7");
    }
  });
  qx.ui.table.columnmodel.Basic.$$dbClassInfo = $$dbClassInfo;
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
      "qx.ui.table.columnmodel.Basic": {
        "construct": true,
        "require": true
      },
      "qx.locale.MTranslation": {
        "require": true
      },
      "qx.ui.table.columnmodel.resizebehavior.Default": {},
      "qx.event.Timer": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "qx.tableResizeDebug": {}
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
   * A table column model that automatically resizes columns based on a
   * selected behavior.
   *
   * @see qx.ui.table.columnmodel.Basic
   */
  qx.Class.define("qx.ui.table.columnmodel.Resize", {
    extend: qx.ui.table.columnmodel.Basic,
    include: qx.locale.MTranslation,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qx.ui.table.columnmodel.Basic.constructor.call(this); // We don't want to recursively call ourself based on our resetting of
      // column sizes.  Track when we're resizing.

      this.__bInProgress__P_195_0 = false; // Track when the table has appeared.  We want to ignore resize events
      // until then since we won't be able to determine the available width
      // anyway.

      this.__bAppeared__P_195_1 = false;
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /**
       * The behavior to use.
       *
       * The provided behavior must extend {@link qx.ui.table.columnmodel.resizebehavior.Abstract} and
       * implement the <i>onAppear</i>, <i>onTableWidthChanged</i>,
       * <i>onColumnWidthChanged</i> and <i>onVisibilityChanged</i>methods.
       */
      behavior: {
        check: "qx.ui.table.columnmodel.resizebehavior.Abstract",
        init: null,
        nullable: true,
        apply: "_applyBehavior",
        event: "changeBehavior"
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __bAppeared__P_195_1: null,
      __bInProgress__P_195_0: null,
      __table__P_195_2: null,
      // Behavior modifier
      _applyBehavior: function _applyBehavior(value, old) {
        if (old != null) {
          old.dispose();
          old = null;
        } // Tell the new behavior how many columns there are


        value._setNumColumns(this.getOverallColumnCount());

        value.setTableColumnModel(this);
      },

      /**
       * Initializes the column model.
       *
       * @param numColumns {Integer} the number of columns the model should have.
       * @param table {qx.ui.table.Table}
       *   The table which this model is used for. This allows us access to
       *   other aspects of the table, as the <i>behavior</i> sees fit.
       */
      init: function init(numColumns, table) {
        // Call our superclass
        qx.ui.table.columnmodel.Resize.superclass.prototype.init.call(this, numColumns, table);

        if (this.__table__P_195_2 == null) {
          this.__table__P_195_2 = table; // We'll do our column resizing when the table appears, ...

          table.addListener("appear", this._onappear, this); // ... when the inner width of the table changes, ...

          table.addListener("tableWidthChanged", this._onTableWidthChanged, this); // ... when a vertical scroll bar appears or disappears

          table.addListener("verticalScrollBarChanged", this._onverticalscrollbarchanged, this); // We want to manipulate the button visibility menu

          table.addListener("columnVisibilityMenuCreateEnd", this._addResetColumnWidthButton, this); // ... when columns are resized, ...

          this.addListener("widthChanged", this._oncolumnwidthchanged, this); // ... and when a column visibility changes.

          this.addListener("visibilityChanged", this._onvisibilitychanged, this);
        } // Set the initial resize behavior


        if (this.getBehavior() == null) {
          this.setBehavior(new qx.ui.table.columnmodel.resizebehavior.Default());
        } // Tell the behavior how many columns there are


        this.getBehavior()._setNumColumns(numColumns);
      },

      /**
       * Get the table widget
       *
       * @return {qx.ui.table.Table} the table widget
       */
      getTable: function getTable() {
        return this.__table__P_195_2;
      },

      /**
       * Reset the column widths to their "onappear" defaults.
       *
       * @param event {qx.event.type.Data}
       *   The "columnVisibilityMenuCreateEnd" event indicating that the menu is
       *   being generated.  The data is a map containing properties <i>table</i>
       *   and <i>menu</i>.
       *
       */
      _addResetColumnWidthButton: function _addResetColumnWidthButton(event) {
        var data = event.getData();
        var columnButton = data.columnButton;
        var menu = data.menu;
        var o; // Add a separator between the column names and our reset button

        o = columnButton.factory("separator");
        menu.add(o); // Add a button to reset the column widths

        o = columnButton.factory("user-button", {
          text: this.tr("Reset column widths")
        });
        menu.add(o);
        o.addListener("execute", this._onappear, this);
      },

      /**
       * Event handler for the "appear" event.
       *
       * @param event {qx.event.type.Event}
       *   The "onappear" event object.
       *
       */
      _onappear: function _onappear(event) {
        // Is this a recursive call?
        if (this.__bInProgress__P_195_0) {
          // Yup.  Ignore it.
          return;
        }

        this.__bInProgress__P_195_0 = true;
        {
          if (qx.core.Environment.get("qx.tableResizeDebug")) {
            this.debug("onappear");
          }
        } // this handler is also called by the "execute" event of the menu button

        this.getBehavior().onAppear(event, event.getType() !== "appear");

        this.__table__P_195_2._updateScrollerWidths();

        this.__table__P_195_2._updateScrollBarVisibility();

        this.__bInProgress__P_195_0 = false;
        this.__bAppeared__P_195_1 = true;
      },

      /**
       * Event handler for the "tableWidthChanged" event.
       *
       * @param event {qx.event.type.Event}
       *   The "onwindowresize" event object.
       *
       */
      _onTableWidthChanged: function _onTableWidthChanged(event) {
        // Is this a recursive call or has the table not yet been rendered?
        if (this.__bInProgress__P_195_0 || !this.__bAppeared__P_195_1) {
          // Yup.  Ignore it.
          return;
        }

        this.__bInProgress__P_195_0 = true;
        {
          if (qx.core.Environment.get("qx.tableResizeDebug")) {
            this.debug("ontablewidthchanged");
          }
        }
        this.getBehavior().onTableWidthChanged(event);
        this.__bInProgress__P_195_0 = false;
      },

      /**
       * Event handler for the "verticalScrollBarChanged" event.
       *
       * @param event {qx.event.type.Data}
       *   The "verticalScrollBarChanged" event object.  The data is a boolean
       *   indicating whether a vertical scroll bar is now present.
       *
       */
      _onverticalscrollbarchanged: function _onverticalscrollbarchanged(event) {
        // Is this a recursive call or has the table not yet been rendered?
        if (this.__bInProgress__P_195_0 || !this.__bAppeared__P_195_1) {
          // Yup.  Ignore it.
          return;
        }

        this.__bInProgress__P_195_0 = true;
        {
          if (qx.core.Environment.get("qx.tableResizeDebug")) {
            this.debug("onverticalscrollbarchanged");
          }
        }
        this.getBehavior().onVerticalScrollBarChanged(event);
        qx.event.Timer.once(function () {
          if (this.__table__P_195_2 && !this.__table__P_195_2.isDisposed()) {
            this.__table__P_195_2._updateScrollerWidths();

            this.__table__P_195_2._updateScrollBarVisibility();
          }
        }, this, 0);
        this.__bInProgress__P_195_0 = false;
      },

      /**
       * Event handler for the "widthChanged" event.
       *
       * @param event {qx.event.type.Data}
       *   The "widthChanged" event object.
       *
       */
      _oncolumnwidthchanged: function _oncolumnwidthchanged(event) {
        // Is this a recursive call or has the table not yet been rendered?
        if (this.__bInProgress__P_195_0 || !this.__bAppeared__P_195_1) {
          // Yup.  Ignore it.
          return;
        }

        this.__bInProgress__P_195_0 = true;
        {
          if (qx.core.Environment.get("qx.tableResizeDebug")) {
            this.debug("oncolumnwidthchanged");
          }
        }
        this.getBehavior().onColumnWidthChanged(event);
        this.__bInProgress__P_195_0 = false;
      },

      /**
       * Event handler for the "visibilityChanged" event.
       *
       * @param event {qx.event.type.Data}
       *   The "visibilityChanged" event object.
       *
       */
      _onvisibilitychanged: function _onvisibilitychanged(event) {
        // Is this a recursive call or has the table not yet been rendered?
        if (this.__bInProgress__P_195_0 || !this.__bAppeared__P_195_1) {
          // Yup.  Ignore it.
          return;
        }

        this.__bInProgress__P_195_0 = true;
        {
          if (qx.core.Environment.get("qx.tableResizeDebug")) {
            this.debug("onvisibilitychanged");
          }
        }
        this.getBehavior().onVisibilityChanged(event);
        this.__bInProgress__P_195_0 = false;
      }
    },

    /*
     *****************************************************************************
        DESTRUCTOR
     *****************************************************************************
     */
    destruct: function destruct() {
      var behavior = this.getBehavior();

      if (behavior) {
        behavior.dispose();
      }

      this.__table__P_195_2 = null;
    }
  });
  qx.ui.table.columnmodel.Resize.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.DragDropScrolling": {
        "construct": true
      },
      "qx.Class": {},
      "qx.ui.core.scroll.MScrollBarFactory": {},
      "qx.ui.core.Widget": {},
      "qx.event.Timer": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2013 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Richard Sternagel (rsternagel)
  
  ************************************************************************ */

  /**
   * Provides scrolling ability during drag session to the widget.
   */
  qx.Mixin.define("qx.ui.core.MDragDropScrolling", {
    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      var widget = this;

      if (this instanceof qx.ui.core.DragDropScrolling) {
        widget = this._getWidget();
      }

      widget.addListener("drag", this.__onDrag__P_174_0, this);
      widget.addListener("dragend", this.__onDragend__P_174_1, this);
      this.__xDirs__P_174_2 = ["left", "right"];
      this.__yDirs__P_174_3 = ["top", "bottom"];
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /** The threshold for the x-axis (in pixel) to activate scrolling at the edges. */
      dragScrollThresholdX: {
        check: "Integer",
        init: 30
      },

      /** The threshold for the y-axis (in pixel) to activate scrolling at the edges. */
      dragScrollThresholdY: {
        check: "Integer",
        init: 30
      },

      /** The factor for slowing down the scrolling. */
      dragScrollSlowDownFactor: {
        check: "Float",
        init: 0.1
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __dragScrollTimer__P_174_4: null,
      __xDirs__P_174_2: null,
      __yDirs__P_174_3: null,

      /**
       * Finds the first scrollable parent (in the parent chain).
       *
       * @param widget {qx.ui.core.LayoutItem} The widget to start from.
       * @return {qx.ui.core.Widget} A scrollable widget.
       */
      _findScrollableParent: function _findScrollableParent(widget) {
        var cur = widget;

        if (cur === null) {
          return null;
        }

        while (cur.getLayoutParent()) {
          cur = cur.getLayoutParent();

          if (this._isScrollable(cur)) {
            return cur;
          }
        }

        return null;
      },

      /**
       * Whether the widget is scrollable.
       *
       * @param widget {qx.ui.core.Widget} The widget to check.
       * @return {Boolean} Whether the widget is scrollable.
       */
      _isScrollable: function _isScrollable(widget) {
        return qx.Class.hasMixin(widget.constructor, qx.ui.core.scroll.MScrollBarFactory);
      },

      /**
       * Gets the bounds of the given scrollable.
       *
       * @param scrollable {qx.ui.core.Widget} Scrollable which has scrollbar child controls.
       * @return {Map} A map with all four bounds (e.g. {"left":0, "top":20, "right":0, "bottom":80}).
       */
      _getBounds: function _getBounds(scrollable) {
        var bounds = scrollable.getContentLocation(); // the scrollable may dictate a nested widget for more precise bounds

        if (scrollable.getScrollAreaContainer) {
          bounds = scrollable.getScrollAreaContainer().getContentLocation();
        }

        return bounds;
      },

      /**
       * Gets the edge type or null if the pointer isn't within one of the thresholds.
       *
       * @param diff {Map} Difference map with all for edgeTypes.
       * @param thresholdX {Number} x-axis threshold.
       * @param thresholdY {Number} y-axis threshold.
       * @return {String} One of the four edgeTypes ('left', 'right', 'top', 'bottom').
       */
      _getEdgeType: function _getEdgeType(diff, thresholdX, thresholdY) {
        if (diff.left * -1 <= thresholdX && diff.left < 0) {
          return "left";
        } else if (diff.top * -1 <= thresholdY && diff.top < 0) {
          return "top";
        } else if (diff.right <= thresholdX && diff.right > 0) {
          return "right";
        } else if (diff.bottom <= thresholdY && diff.bottom > 0) {
          return "bottom";
        } else {
          return null;
        }
      },

      /**
       * Gets the axis ('x' or 'y') by the edge type.
       *
       * @param edgeType {String} One of the four edgeTypes ('left', 'right', 'top', 'bottom').
       * @throws {Error} If edgeType is not one of the distinct four ones.
       * @return {String} Returns 'y' or 'x'.
       */
      _getAxis: function _getAxis(edgeType) {
        if (this.__xDirs__P_174_2.indexOf(edgeType) !== -1) {
          return "x";
        } else if (this.__yDirs__P_174_3.indexOf(edgeType) !== -1) {
          return "y";
        } else {
          throw new Error("Invalid edge type given (" + edgeType + "). Must be: 'left', 'right', 'top' or 'bottom'");
        }
      },

      /**
       * Gets the threshold amount by edge type.
       *
       * @param edgeType {String} One of the four edgeTypes ('left', 'right', 'top', 'bottom').
       * @return {Number} The threshold of the x or y axis.
       */
      _getThresholdByEdgeType: function _getThresholdByEdgeType(edgeType) {
        if (this.__xDirs__P_174_2.indexOf(edgeType) !== -1) {
          return this.getDragScrollThresholdX();
        } else if (this.__yDirs__P_174_3.indexOf(edgeType) !== -1) {
          return this.getDragScrollThresholdY();
        }
      },

      /**
       * Whether the scrollbar is visible.
       *
       * @param scrollable {qx.ui.core.Widget} Scrollable which has scrollbar child controls.
       * @param axis {String} Can be 'y' or 'x'.
       * @return {Boolean} Whether the scrollbar is visible.
       */
      _isScrollbarVisible: function _isScrollbarVisible(scrollable, axis) {
        if (scrollable && scrollable._isChildControlVisible) {
          return scrollable._isChildControlVisible("scrollbar-" + axis);
        } else {
          return false;
        }
      },

      /**
       * Whether the scrollbar is exceeding it's maximum position.
       *
       * @param scrollbar {qx.ui.core.scroll.IScrollBar} Scrollbar to check.
       * @param axis {String} Can be 'y' or 'x'.
       * @param amount {Number} Amount to scroll which may be negative.
       * @return {Boolean} Whether the amount will exceed the scrollbar max position.
       */
      _isScrollbarExceedingMaxPos: function _isScrollbarExceedingMaxPos(scrollbar, axis, amount) {
        var newPos = 0;

        if (!scrollbar) {
          return true;
        }

        newPos = scrollbar.getPosition() + amount;
        return newPos > scrollbar.getMaximum() || newPos < 0;
      },

      /**
       * Calculates the threshold exceedance (which may be negative).
       *
       * @param diff {Number} Difference value of one edgeType.
       * @param threshold {Number} x-axis or y-axis threshold.
       * @return {Number} Threshold exceedance amount (positive or negative).
       */
      _calculateThresholdExceedance: function _calculateThresholdExceedance(diff, threshold) {
        var amount = threshold - Math.abs(diff);
        return diff < 0 ? amount * -1 : amount;
      },

      /**
       * Calculates the scroll amount (which may be negative).
       * The amount is influenced by the scrollbar size (bigger = faster)
       * the exceedanceAmount (bigger = faster) and the slowDownFactor.
       *
       * @param scrollbarSize {Number} Size of the scrollbar.
       * @param exceedanceAmount {Number} Threshold exceedance amount (positive or negative).
       * @return {Number} Scroll amount (positive or negative).
       */
      _calculateScrollAmount: function _calculateScrollAmount(scrollbarSize, exceedanceAmount) {
        return Math.floor(scrollbarSize / 100 * exceedanceAmount * this.getDragScrollSlowDownFactor());
      },

      /**
       * Scrolls the given scrollable on the given axis for the given amount.
       *
       * @param scrollable {qx.ui.core.Widget} Scrollable which has scrollbar child controls.
       * @param axis {String} Can be 'y' or 'x'.
       * @param exceedanceAmount {Number} Threshold exceedance amount (positive or negative).
       */
      _scrollBy: function _scrollBy(scrollable, axis, exceedanceAmount) {
        var scrollbar = scrollable.getChildControl("scrollbar-" + axis, true);

        if (!scrollbar) {
          return;
        }

        var bounds = scrollbar.getBounds(),
            scrollbarSize = axis === "x" ? bounds.width : bounds.height,
            amount = this._calculateScrollAmount(scrollbarSize, exceedanceAmount);

        if (this._isScrollbarExceedingMaxPos(scrollbar, axis, amount)) {
          this.__dragScrollTimer__P_174_4.stop();
        }

        scrollbar.scrollBy(amount);
      },

      /*
      ---------------------------------------------------------------------------
      EVENT HANDLERS
      ---------------------------------------------------------------------------
      */

      /**
       * Event handler for the drag event.
       *
       * @param e {qx.event.type.Drag} The drag event instance.
       */
      __onDrag__P_174_0: function __onDrag__P_174_0(e) {
        if (this.__dragScrollTimer__P_174_4) {
          // stop last scroll action
          this.__dragScrollTimer__P_174_4.stop();
        }

        var target;

        if (e.getOriginalTarget() instanceof qx.ui.core.Widget) {
          target = e.getOriginalTarget();
        } else {
          target = qx.ui.core.Widget.getWidgetByElement(e.getOriginalTarget());
        }

        if (!target) {
          return;
        }

        var scrollable;

        if (this._isScrollable(target)) {
          scrollable = target;
        } else {
          scrollable = this._findScrollableParent(target);
        }

        while (scrollable) {
          var bounds = this._getBounds(scrollable),
              xPos = e.getDocumentLeft(),
              yPos = e.getDocumentTop(),
              diff = {
            left: bounds.left - xPos,
            right: bounds.right - xPos,
            top: bounds.top - yPos,
            bottom: bounds.bottom - yPos
          },
              edgeType = null,
              axis = "",
              exceedanceAmount = 0;

          edgeType = this._getEdgeType(diff, this.getDragScrollThresholdX(), this.getDragScrollThresholdY());

          if (!edgeType) {
            scrollable = this._findScrollableParent(scrollable);
            continue;
          }

          axis = this._getAxis(edgeType);

          if (this._isScrollbarVisible(scrollable, axis)) {
            exceedanceAmount = this._calculateThresholdExceedance(diff[edgeType], this._getThresholdByEdgeType(edgeType));

            if (this.__dragScrollTimer__P_174_4) {
              this.__dragScrollTimer__P_174_4.dispose();
            }

            this.__dragScrollTimer__P_174_4 = new qx.event.Timer(50);

            this.__dragScrollTimer__P_174_4.addListener("interval", function (scrollable, axis, amount) {
              this._scrollBy(scrollable, axis, amount);
            }.bind(this, scrollable, axis, exceedanceAmount));

            this.__dragScrollTimer__P_174_4.start();

            e.stopPropagation();
            return;
          } else {
            scrollable = this._findScrollableParent(scrollable);
          }
        }
      },

      /**
       * Event handler for the dragend event.
       *
       * @param e {qx.event.type.Drag} The drag event instance.
       */
      __onDragend__P_174_1: function __onDragend__P_174_1(e) {
        if (this.__dragScrollTimer__P_174_4) {
          this.__dragScrollTimer__P_174_4.stop();
        }
      }
    },
    destruct: function destruct() {
      if (this.__dragScrollTimer__P_174_4) {
        this.__dragScrollTimer__P_174_4.dispose();
      }
    }
  });
  qx.ui.core.MDragDropScrolling.$$dbClassInfo = $$dbClassInfo;
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
      "qx.ui.core.MDragDropScrolling": {
        "require": true
      },
      "qx.core.Init": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2014 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Mustafa Sak (msak)
  
  ************************************************************************ */

  /**
   * Provides scrolling ability during drag session to the widget.
   */
  qx.Class.define("qx.ui.core.DragDropScrolling", {
    extend: qx.core.Object,
    include: [qx.ui.core.MDragDropScrolling],
    construct: function construct(widget) {
      qx.core.Object.constructor.call(this);
      this._widget = widget;
    },
    members: {
      _widget: null,

      /**
       * Returns the root widget whose children will have scroll on drag session
       * behavior. Widget was set on constructor or will be application root by
       * default.
       *
       * @return {qx.ui.core.Widget} The root widget whose children will have
       * scroll on drag session
       */
      _getWidget: function _getWidget() {
        return this._widget || qx.core.Init.getApplication().getRoot();
      }
    }
  });
  qx.ui.core.DragDropScrolling.$$dbClassInfo = $$dbClassInfo;
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
      "qx.ui.core.MDragDropScrolling": {
        "require": true
      },
      "qx.ui.layout.VBox": {
        "construct": true
      },
      "qx.ui.container.Composite": {
        "construct": true
      },
      "qx.ui.layout.HBox": {
        "construct": true
      },
      "qx.ui.table.rowrenderer.Default": {
        "construct": true
      },
      "qx.locale.Manager": {
        "construct": true
      },
      "qx.ui.table.columnmenu.Button": {},
      "qx.ui.table.selection.Manager": {},
      "qx.ui.table.selection.Model": {},
      "qx.ui.table.columnmodel.Basic": {},
      "qx.ui.table.pane.Pane": {},
      "qx.ui.table.pane.Header": {},
      "qx.ui.table.pane.Scroller": {},
      "qx.ui.table.pane.Model": {},
      "qx.ui.basic.Label": {},
      "qx.ui.table.model.Simple": {},
      "qx.event.Registration": {},
      "qx.log.Logger": {},
      "qx.ui.table.pane.FocusIndicator": {},
      "qx.lang.Number": {},
      "qx.event.Timer": {},
      "qx.core.Assert": {},
      "qx.ui.table.IColumnMenuItem": {}
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
       * Jonathan Weiß (jonathan_rass)
  
  ************************************************************************ */

  /**
   * Table
   *
   * A detailed description can be found in the package description
   * {@link qx.ui.table}.
   *
   * @childControl statusbar {qx.ui.basic.Label} label to show the status of the table
   * @childControl column-button {qx.ui.table.columnmenu.Button} button to open the column menu
   */
  qx.Class.define("qx.ui.table.Table", {
    extend: qx.ui.core.Widget,
    include: qx.ui.core.MDragDropScrolling,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param tableModel {qx.ui.table.ITableModel ? null}
     *   The table model to read the data from.
     *
     * @param custom {Map ? null}
     *   A map provided to override the various supplemental classes allocated
     *   within this constructor.  Each property must be a function which
     *   returns an object instance, as indicated by shown the defaults listed
     *   here:
     *
     *   <dl>
     *     <dt>initiallyHiddenColumns</dt>
     *       <dd>
     *         {Array?}
     *         A list of column numbers that should be initially invisible. Any
     *         column not mentioned will be initially visible, and if no array
     *         is provided, all columns will be initially visible.
     *       </dd>
     *     <dt>selectionManager</dt>
     *       <dd><pre class='javascript'>
     *         function(obj)
     *         {
     *           return new qx.ui.table.selection.Manager(obj);
     *         }
     *       </pre></dd>
     *     <dt>selectionModel</dt>
     *       <dd><pre class='javascript'>
     *         function(obj)
     *         {
     *           return new qx.ui.table.selection.Model(obj);
     *         }
     *       </pre></dd>
     *     <dt>tableColumnModel</dt>
     *       <dd><pre class='javascript'>
     *         function(obj)
     *         {
     *           return new qx.ui.table.columnmodel.Basic(obj);
     *         }
     *       </pre></dd>
     *     <dt>tablePaneModel</dt>
     *       <dd><pre class='javascript'>
     *         function(obj)
     *         {
     *           return new qx.ui.table.pane.Model(obj);
     *         }
     *       </pre></dd>
     *     <dt>tablePane</dt>
     *       <dd><pre class='javascript'>
     *         function(obj)
     *         {
     *           return new qx.ui.table.pane.Pane(obj);
     *         }
     *       </pre></dd>
     *     <dt>tablePaneHeader</dt>
     *       <dd><pre class='javascript'>
     *         function(obj)
     *         {
     *           return new qx.ui.table.pane.Header(obj);
     *         }
     *       </pre></dd>
     *     <dt>tablePaneScroller</dt>
     *       <dd><pre class='javascript'>
     *         function(obj)
     *         {
     *           return new qx.ui.table.pane.Scroller(obj);
     *         }
     *       </pre></dd>
     *     <dt>tablePaneModel</dt>
     *       <dd><pre class='javascript'>
     *         function(obj)
     *         {
     *           return new qx.ui.table.pane.Model(obj);
     *         }
     *       </pre></dd>
     *     <dt>columnMenu</dt>
     *       <dd><pre class='javascript'>
     *         function()
     *         {
     *           return new qx.ui.table.columnmenu.Button();
     *         }
     *       </pre></dd>
     *   </dl>
     */
    construct: function construct(tableModel, custom) {
      qx.ui.core.Widget.constructor.call(this); //
      // Use default objects if custom objects are not specified
      //

      if (!custom) {
        custom = {};
      }

      if (custom.initiallyHiddenColumns) {
        this.setInitiallyHiddenColumns(custom.initiallyHiddenColumns);
      }

      if (custom.selectionManager) {
        this.setNewSelectionManager(custom.selectionManager);
      }

      if (custom.selectionModel) {
        this.setNewSelectionModel(custom.selectionModel);
      }

      if (custom.tableColumnModel) {
        this.setNewTableColumnModel(custom.tableColumnModel);
      }

      if (custom.tablePane) {
        this.setNewTablePane(custom.tablePane);
      }

      if (custom.tablePaneHeader) {
        this.setNewTablePaneHeader(custom.tablePaneHeader);
      }

      if (custom.tablePaneScroller) {
        this.setNewTablePaneScroller(custom.tablePaneScroller);
      }

      if (custom.tablePaneModel) {
        this.setNewTablePaneModel(custom.tablePaneModel);
      }

      if (custom.columnMenu) {
        this.setNewColumnMenu(custom.columnMenu);
      }

      this._setLayout(new qx.ui.layout.VBox()); // Create the child widgets


      this.__scrollerParent__P_196_0 = new qx.ui.container.Composite(new qx.ui.layout.HBox());

      this._add(this.__scrollerParent__P_196_0, {
        flex: 1
      }); // Allocate a default data row renderer


      this.setDataRowRenderer(new qx.ui.table.rowrenderer.Default(this)); // Create the models

      this.__selectionManager__P_196_1 = this.getNewSelectionManager()(this);
      this.setSelectionModel(this.getNewSelectionModel()(this));
      this.setTableModel(tableModel || this.getEmptyTableModel()); // create the main meta column

      this.setMetaColumnCounts([-1]); // Make focusable

      this.setTabIndex(1);
      this.addListener("keydown", this._onKeyDown);
      this.addListener("focus", this._onFocusChanged);
      this.addListener("blur", this._onFocusChanged); // attach the resize listener to the last child of the layout. This
      // ensures that all other children are laid out before

      var spacer = new qx.ui.core.Widget().set({
        height: 0
      });

      this._add(spacer);

      spacer.addListener("resize", this._onResize, this);
      this.__focusedCol__P_196_2 = null;
      this.__focusedRow__P_196_3 = null; // add an event listener which updates the table content on locale change

      {
        qx.locale.Manager.getInstance().addListener("changeLocale", this._onChangeLocale, this);
      }
      this.initStatusBarVisible(); // If the table model has an init() method...

      tableModel = this.getTableModel();

      if (tableModel.init && typeof tableModel.init == "function") {
        // ... then call it now to allow the table model to affect table
        // properties.
        tableModel.init(this);
      } // ARIA attrs


      this.getContentElement().setAttribute("role", "grid");
    },

    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */
    events: {
      /**
       * Dispatched before adding the column list to the column visibility menu.
       * The event data is a map with two properties: table and menu.  Listeners
       * may add additional items to the menu, which appear at the top of the
       * menu.
       */
      columnVisibilityMenuCreateStart: "qx.event.type.Data",

      /**
       * Dispatched after adding the column list to the column visibility menu.
       * The event data is a map with two properties: table and menu.  Listeners
       * may add additional items to the menu, which appear at the bottom of the
       * menu.
       */
      columnVisibilityMenuCreateEnd: "qx.event.type.Data",

      /**
       * Dispatched when the width of the table has changed.
       */
      tableWidthChanged: "qx.event.type.Event",

      /**
       * Dispatched when updating scrollbars discovers that a vertical scrollbar
       * is needed when it previously was not, or vice versa.  The data is a
       * boolean indicating whether a vertical scrollbar is now being used.
       */
      verticalScrollBarChanged: "qx.event.type.Data",

      /**
       * Dispatched when a data cell has been tapped.
       */
      cellTap: "qx.ui.table.pane.CellEvent",

      /**
       * Dispatched when a data cell has been tapped.
       */
      cellDbltap: "qx.ui.table.pane.CellEvent",

      /**
       * Dispatched when the context menu is needed in a data cell
       */
      cellContextmenu: "qx.ui.table.pane.CellEvent",

      /**
       * Dispatched after a cell editor is flushed.
       *
       * The data is a map containing this properties:
       * <ul>
       *   <li>row</li>
       *   <li>col</li>
       *   <li>value</li>
       *   <li>oldValue</li>
       * </ul>
       */
      dataEdited: "qx.event.type.Data"
    },

    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */
    statics: {
      /** Events that must be redirected to the scrollers. */
      __redirectEvents__P_196_4: {
        cellTap: 1,
        cellDbltap: 1,
        cellContextmenu: 1
      }
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      appearance: {
        refine: true,
        init: "table"
      },
      focusable: {
        refine: true,
        init: true
      },
      minWidth: {
        refine: true,
        init: 50
      },

      /**
       * The list of columns that are initially hidden. This property is set by
       * the constructor, from the value received in
       * custom.initiallyHiddenColumns, and is only used when a column model is
       * initialized. It can be of great benefit in tables with numerous columns
       * where most are not initially visible. The process of creating the
       * headers for all of the columns, only to have those columns discarded
       * shortly thereafter when setColumnVisibility(false) is called, is a
       * waste of (significant, in some browsers) time. Specifying the
       * non-visible columns at constructor time can therefore avoid the initial
       * creation of all of those superfluous widgets.
       */
      initiallyHiddenColumns: {
        init: null
      },

      /**
       * Whether the widget contains content which may be selected by the user.
       *
       * If the value set to <code>true</code> the native browser selection can
       * be used for text selection. But it is normally useful for
       * forms fields, longer texts/documents, editors, etc.
       *
       * Note: This has no effect on Table!
       */
      selectable: {
        refine: true,
        init: false
      },

      /** The selection model. */
      selectionModel: {
        check: "qx.ui.table.selection.Model",
        apply: "_applySelectionModel",
        event: "changeSelectionModel"
      },

      /** The table model. */
      tableModel: {
        check: "qx.ui.table.ITableModel",
        apply: "_applyTableModel",
        event: "changeTableModel"
      },

      /** The height of the table rows. */
      rowHeight: {
        check: "Number",
        init: 20,
        apply: "_applyRowHeight",
        event: "changeRowHeight",
        themeable: true
      },

      /**
       * Force line height to match row height.  May be disabled if cell
       * renderers being used wish to render multiple lines of data within a
       * cell.  (With the default setting, all but the first of multiple lines
       * of data will not be visible.)
       */
      forceLineHeight: {
        check: "Boolean",
        init: true
      },

      /**
       *  Whether the header cells are visible. When setting this to false,
       *  you'll likely also want to set the {#columnVisibilityButtonVisible}
       *  property to false as well, to entirely remove the header row.
       */
      headerCellsVisible: {
        check: "Boolean",
        init: true,
        apply: "_applyHeaderCellsVisible",
        themeable: true
      },

      /** The height of the header cells. */
      headerCellHeight: {
        check: "Integer",
        init: 16,
        apply: "_applyHeaderCellHeight",
        event: "changeHeaderCellHeight",
        nullable: true,
        themeable: true
      },

      /** Whether to show the status bar */
      statusBarVisible: {
        check: "Boolean",
        init: true,
        apply: "_applyStatusBarVisible"
      },

      /** The Statusbartext, set it, if you want some more Information */
      additionalStatusBarText: {
        nullable: true,
        init: null,
        apply: "_applyAdditionalStatusBarText"
      },

      /** Whether to show the column visibility button */
      columnVisibilityButtonVisible: {
        check: "Boolean",
        init: true,
        apply: "_applyColumnVisibilityButtonVisible",
        themeable: true
      },

      /**
       * @type {Integer[]} The number of columns per meta column. If the last array entry is -1,
       * this meta column will get the remaining columns.
       */
      metaColumnCounts: {
        check: "Object",
        apply: "_applyMetaColumnCounts"
      },

      /**
       * Whether the focus should moved when the pointer is moved over a cell. If false
       * the focus is only moved on pointer taps.
       */
      focusCellOnPointerMove: {
        check: "Boolean",
        init: false,
        apply: "_applyFocusCellOnPointerMove"
      },

      /**
       * Whether row focus change by keyboard also modifies selection
       */
      rowFocusChangeModifiesSelection: {
        check: "Boolean",
        init: true
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
        init: true,
        apply: "_applyContextMenuFromDataCellsOnly"
      },

      /**
       * Whether the table should keep the first visible row complete. If set to false,
       * the first row may be rendered partial, depending on the vertical scroll value.
       */
      keepFirstVisibleRowComplete: {
        check: "Boolean",
        init: true,
        apply: "_applyKeepFirstVisibleRowComplete"
      },

      /**
       * Whether the table cells should be updated when only the selection or the
       * focus changed. This slows down the table update but allows to react on a
       * changed selection or a changed focus in a cell renderer.
       */
      alwaysUpdateCells: {
        check: "Boolean",
        init: false
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
        init: true,
        apply: "_applyResetSelectionOnHeaderTap"
      },

      /**
       * Whether to reset the selection when the unpopulated table area is tapped.
       * The default is false which keeps the behaviour as before
       */
      resetSelectionOnTapBelowRows: {
        check: "Boolean",
        init: false,
        apply: "_applyResetSelectionOnTapBelowRows"
      },

      /**
       * If set then defines the minimum height of the focus indicator when editing
       */
      minCellEditHeight: {
        check: "Integer",
        nullable: true,
        init: null,
        apply: "_applyMinCellEditHeight"
      },

      /** The renderer to use for styling the rows. */
      dataRowRenderer: {
        check: "qx.ui.table.IRowRenderer",
        init: null,
        nullable: true,
        event: "changeDataRowRenderer"
      },

      /**
       * A function to call when before modal cell editor is opened.
       *
       * @signature function(cellEditor, cellInfo)
       *
       * @param cellEditor {qx.ui.window.Window}
       *   The modal window which has been created for this cell editor
       *
       * @param cellInfo {Map}
       *   Information about the cell for which this cell editor was created.
       *   It contains the following properties:
       *       col, row, xPos, value
       *
       */
      modalCellEditorPreOpenFunction: {
        check: "Function",
        init: null,
        nullable: true
      },

      /**
       * By default, all Scrollers' (meta-columns') horizontal scrollbars are
       * shown if any one is required. Allow not showing any that are not
       * required.
       */
      excludeScrollerScrollbarsIfNotNeeded: {
        check: "Boolean",
        init: false,
        nullable: false
      },

      /**
       * A function to instantiate a new column menu button.
       */
      newColumnMenu: {
        check: "Function",
        init: function init() {
          return new qx.ui.table.columnmenu.Button();
        }
      },

      /**
       * A function to instantiate a selection manager.  this allows subclasses of
       * Table to subclass this internal class.  To take effect, this property must
       * be set before calling the Table constructor.
       */
      newSelectionManager: {
        check: "Function",
        init: function init(obj) {
          return new qx.ui.table.selection.Manager(obj);
        }
      },

      /**
       * A function to instantiate a selection model.  this allows subclasses of
       * Table to subclass this internal class.  To take effect, this property must
       * be set before calling the Table constructor.
       */
      newSelectionModel: {
        check: "Function",
        init: function init(obj) {
          return new qx.ui.table.selection.Model(obj);
        }
      },

      /**
       * A function to instantiate a table column model.  This allows subclasses
       * of Table to subclass this internal class.  To take effect, this
       * property must be set before calling the Table constructor.
       */
      newTableColumnModel: {
        check: "Function",
        init: function init(table) {
          return new qx.ui.table.columnmodel.Basic(table);
        }
      },

      /**
       * A function to instantiate a table pane.  this allows subclasses of
       * Table to subclass this internal class.  To take effect, this property
       * must be set before calling the Table constructor.
       */
      newTablePane: {
        check: "Function",
        init: function init(obj) {
          return new qx.ui.table.pane.Pane(obj);
        }
      },

      /**
       * A function to instantiate a table pane.  this allows subclasses of
       * Table to subclass this internal class.  To take effect, this property
       * must be set before calling the Table constructor.
       */
      newTablePaneHeader: {
        check: "Function",
        init: function init(obj) {
          return new qx.ui.table.pane.Header(obj);
        }
      },

      /**
       * A function to instantiate a table pane scroller.  this allows
       * subclasses of Table to subclass this internal class.  To take effect,
       * this property must be set before calling the Table constructor.
       */
      newTablePaneScroller: {
        check: "Function",
        init: function init(obj) {
          return new qx.ui.table.pane.Scroller(obj);
        }
      },

      /**
       * A function to instantiate a table pane model.  this allows subclasses
       * of Table to subclass this internal class.  To take effect, this
       * property must be set before calling the Table constructor.
       */
      newTablePaneModel: {
        check: "Function",
        init: function init(columnModel) {
          return new qx.ui.table.pane.Model(columnModel);
        }
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __focusedCol__P_196_2: null,
      __focusedRow__P_196_3: null,
      __scrollerParent__P_196_0: null,
      __selectionManager__P_196_1: null,
      __additionalStatusBarText__P_196_5: null,
      __lastRowCount__P_196_6: null,
      __lastColCount__P_196_7: null,
      __internalChange__P_196_8: null,
      __columnMenuButtons__P_196_9: null,
      __columnModel__P_196_10: null,
      __emptyTableModel__P_196_11: null,
      __hadVerticalScrollBar__P_196_12: null,
      __timer__P_196_13: null,
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id, hash) {
        var control;

        switch (id) {
          case "statusbar":
            control = new qx.ui.basic.Label();
            control.set({
              allowGrowX: true
            });

            this._add(control);

            break;

          case "column-button":
            control = this.getNewColumnMenu()();
            control.set({
              focusable: false
            }); // Create the initial menu too

            var menu = control.factory("menu", {
              table: this
            }); // Add a listener to initialize the column menu when it becomes visible

            menu.addListener("appear", this._initColumnMenu, this);
            break;
        }

        return control || qx.ui.table.Table.superclass.prototype._createChildControlImpl.call(this, id);
      },
      // property modifier
      _applySelectionModel: function _applySelectionModel(value, old) {
        this.__selectionManager__P_196_1.setSelectionModel(value);

        if (old != null) {
          old.removeListener("changeSelection", this._onSelectionChanged, this);
        }

        value.addListener("changeSelection", this._onSelectionChanged, this);
      },
      // property modifier
      _applyRowHeight: function _applyRowHeight(value, old) {
        var scrollerArr = this._getPaneScrollerArr();

        for (var i = 0; i < scrollerArr.length; i++) {
          scrollerArr[i].updateVerScrollBarMaximum();
        }
      },
      // property modifier
      _applyHeaderCellsVisible: function _applyHeaderCellsVisible(value, old) {
        var scrollerArr = this._getPaneScrollerArr();

        for (var i = 0; i < scrollerArr.length; i++) {
          if (value) {
            scrollerArr[i]._showChildControl("header");
          } else {
            scrollerArr[i]._excludeChildControl("header");
          }
        } // also hide the column visibility button


        if (this.getColumnVisibilityButtonVisible()) {
          this._applyColumnVisibilityButtonVisible(value);
        }
      },
      // property modifier
      _applyHeaderCellHeight: function _applyHeaderCellHeight(value, old) {
        var scrollerArr = this._getPaneScrollerArr();

        for (var i = 0; i < scrollerArr.length; i++) {
          scrollerArr[i].getHeader().setHeight(value);
        }
      },
      // property modifier
      _applyMinCellEditHeight: function _applyMinCellEditHeight(value) {
        var scrollerArr = this._getPaneScrollerArr();

        for (var i = 0; i < scrollerArr.length; i++) {
          scrollerArr[i].setMinCellEditHeight(value);
        }
      },

      /**
       * Get an empty table model instance to use for this table. Use this table
       * to configure the table with no table model.
       *
       * @return {qx.ui.table.ITableModel} The empty table model
       */
      getEmptyTableModel: function getEmptyTableModel() {
        if (!this.__emptyTableModel__P_196_11) {
          this.__emptyTableModel__P_196_11 = new qx.ui.table.model.Simple();

          this.__emptyTableModel__P_196_11.setColumns([]);

          this.__emptyTableModel__P_196_11.setData([]);
        }

        return this.__emptyTableModel__P_196_11;
      },
      // property modifier
      _applyTableModel: function _applyTableModel(value, old) {
        this.getTableColumnModel().init(value.getColumnCount(), this);

        if (old != null) {
          old.removeListener("metaDataChanged", this._onTableModelMetaDataChanged, this);
          old.removeListener("dataChanged", this._onTableModelDataChanged, this);
        }

        value.addListener("metaDataChanged", this._onTableModelMetaDataChanged, this);
        value.addListener("dataChanged", this._onTableModelDataChanged, this); // Update the status bar

        this._updateStatusBar();

        this._updateTableData(0, value.getRowCount(), 0, value.getColumnCount());

        this._onTableModelMetaDataChanged(); // If the table model has an init() method, call it. We don't, however,
        // call it if this is the initial setting of the table model, as the
        // scrollers are not yet initialized. In that case, the init method is
        // called explicitly by the Table constructor.


        if (old && value.init && typeof value.init == "function") {
          value.init(this);
        }
      },

      /**
       * Get the The table column model.
       *
       * @return {qx.ui.table.columnmodel.Basic} The table's column model
       */
      getTableColumnModel: function getTableColumnModel() {
        if (!this.__columnModel__P_196_10) {
          var columnModel = this.__columnModel__P_196_10 = this.getNewTableColumnModel()(this);
          columnModel.addListener("visibilityChanged", this._onColVisibilityChanged, this);
          columnModel.addListener("widthChanged", this._onColWidthChanged, this);
          columnModel.addListener("orderChanged", this._onColOrderChanged, this); // Get the current table model

          var tableModel = this.getTableModel();
          columnModel.init(tableModel.getColumnCount(), this); // Reset the table column model in each table pane model

          var scrollerArr = this._getPaneScrollerArr();

          for (var i = 0; i < scrollerArr.length; i++) {
            var paneScroller = scrollerArr[i];
            var paneModel = paneScroller.getTablePaneModel();
            paneModel.setTableColumnModel(columnModel);
          }
        }

        return this.__columnModel__P_196_10;
      },
      // property modifier
      _applyStatusBarVisible: function _applyStatusBarVisible(value, old) {
        if (value) {
          this._showChildControl("statusbar");
        } else {
          this._excludeChildControl("statusbar");
        }

        if (value) {
          this._updateStatusBar();
        }
      },
      // property modifier
      _applyAdditionalStatusBarText: function _applyAdditionalStatusBarText(value, old) {
        this.__additionalStatusBarText__P_196_5 = value;

        this._updateStatusBar();
      },
      // property modifier
      _applyColumnVisibilityButtonVisible: function _applyColumnVisibilityButtonVisible(value, old) {
        if (value) {
          this._showChildControl("column-button");
        } else {
          this._excludeChildControl("column-button");
        }
      },
      // property modifier
      _applyMetaColumnCounts: function _applyMetaColumnCounts(value, old) {
        var metaColumnCounts = value;

        var scrollerArr = this._getPaneScrollerArr();

        var handlers = {};

        if (value > old) {
          // Save event listeners on the redirected events so we can re-apply
          // them to new scrollers.
          var manager = qx.event.Registration.getManager(scrollerArr[0]);

          for (var evName in qx.ui.table.Table.__redirectEvents__P_196_4) {
            handlers[evName] = {};
            handlers[evName].capture = manager.getListeners(scrollerArr[0], evName, true);
            handlers[evName].bubble = manager.getListeners(scrollerArr[0], evName, false);
          }
        } // Remove the panes not needed any more


        this._cleanUpMetaColumns(metaColumnCounts.length); // Update the old panes


        var leftX = 0;

        for (var i = 0; i < scrollerArr.length; i++) {
          var paneScroller = scrollerArr[i];
          var paneModel = paneScroller.getTablePaneModel();
          paneModel.setFirstColumnX(leftX);
          paneModel.setMaxColumnCount(metaColumnCounts[i]);
          leftX += metaColumnCounts[i];
        } // Add the new panes


        if (metaColumnCounts.length > scrollerArr.length) {
          var columnModel = this.getTableColumnModel();

          for (var i = scrollerArr.length; i < metaColumnCounts.length; i++) {
            var paneModel = this.getNewTablePaneModel()(columnModel);
            paneModel.setFirstColumnX(leftX);
            paneModel.setMaxColumnCount(metaColumnCounts[i]);
            leftX += metaColumnCounts[i];
            var paneScroller = this.getNewTablePaneScroller()(this);
            paneScroller.setTablePaneModel(paneModel); // Register event listener for vertical scrolling

            paneScroller.addListener("changeScrollY", this._onScrollY, this); // Apply redirected events to this new scroller

            for (evName in qx.ui.table.Table.__redirectEvents__P_196_4) {
              // On first setting of meta columns (constructing phase), there
              // are no handlers to deal with yet.
              if (!handlers[evName]) {
                break;
              }

              if (handlers[evName].capture && handlers[evName].capture.length > 0) {
                var capture = handlers[evName].capture;

                for (var j = 0; j < capture.length; j++) {
                  // Determine what context to use.  If the context does not
                  // exist, we assume that the context is this table.  If it
                  // does exist and it equals the first pane scroller (from
                  // which we retrieved the listeners) then set the context
                  // to be this new pane scroller.  Otherwise leave the context
                  // as it was set.
                  var context = capture[j].context;

                  if (!context) {
                    context = this;
                  } else if (context == scrollerArr[0]) {
                    context = paneScroller;
                  }

                  paneScroller.addListener(evName, capture[j].handler, context, true);
                }
              }

              if (handlers[evName].bubble && handlers[evName].bubble.length > 0) {
                var bubble = handlers[evName].bubble;

                for (var j = 0; j < bubble.length; j++) {
                  // Determine what context to use.  If the context does not
                  // exist, we assume that the context is this table.  If it
                  // does exist and it equals the first pane scroller (from
                  // which we retrieved the listeners) then set the context
                  // to be this new pane scroller.  Otherwise leave the context
                  // as it was set.
                  var context = bubble[j].context;

                  if (!context) {
                    context = this;
                  } else if (context == scrollerArr[0]) {
                    context = paneScroller;
                  }

                  paneScroller.addListener(evName, bubble[j].handler, context, false);
                }
              }
            } // last meta column is flexible


            var flex = i == metaColumnCounts.length - 1 ? 1 : 0;

            this.__scrollerParent__P_196_0.add(paneScroller, {
              flex: flex
            });

            scrollerArr = this._getPaneScrollerArr();
          }
        } // Update all meta columns


        for (var i = 0; i < scrollerArr.length; i++) {
          var paneScroller = scrollerArr[i];
          var isLast = i == scrollerArr.length - 1; // Set the right header height

          paneScroller.getHeader().setHeight(this.getHeaderCellHeight()); // Put the column visibility button in the top right corner of the last meta column

          paneScroller.setTopRightWidget(isLast ? this.getChildControl("column-button") : null);
        }

        if (!this.isColumnVisibilityButtonVisible()) {
          this._excludeChildControl("column-button");
        }

        this._updateScrollerWidths();

        this._updateScrollBarVisibility();
      },
      // property modifier
      _applyFocusCellOnPointerMove: function _applyFocusCellOnPointerMove(value, old) {
        var scrollerArr = this._getPaneScrollerArr();

        for (var i = 0; i < scrollerArr.length; i++) {
          scrollerArr[i].setFocusCellOnPointerMove(value);
        }
      },
      // property modifier
      _applyShowCellFocusIndicator: function _applyShowCellFocusIndicator(value, old) {
        var scrollerArr = this._getPaneScrollerArr();

        for (var i = 0; i < scrollerArr.length; i++) {
          scrollerArr[i].setShowCellFocusIndicator(value);
        }
      },
      // property modifier
      _applyContextMenuFromDataCellsOnly: function _applyContextMenuFromDataCellsOnly(value, old) {
        var scrollerArr = this._getPaneScrollerArr();

        for (var i = 0; i < scrollerArr.length; i++) {
          scrollerArr[i].setContextMenuFromDataCellsOnly(value);
        }
      },
      // property modifier
      _applyKeepFirstVisibleRowComplete: function _applyKeepFirstVisibleRowComplete(value, old) {
        var scrollerArr = this._getPaneScrollerArr();

        for (var i = 0; i < scrollerArr.length; i++) {
          scrollerArr[i].onKeepFirstVisibleRowCompleteChanged();
        }
      },
      // property modifier
      _applyResetSelectionOnHeaderTap: function _applyResetSelectionOnHeaderTap(value, old) {
        var scrollerArr = this._getPaneScrollerArr();

        for (var i = 0; i < scrollerArr.length; i++) {
          scrollerArr[i].setResetSelectionOnHeaderTap(value);
        }
      },
      // property modifier
      _applyResetSelectionOnTapBelowRows: function _applyResetSelectionOnTapBelowRows(value, old) {
        var scrollerArr = this._getPaneScrollerArr();

        for (var i = 0; i < scrollerArr.length; i++) {
          scrollerArr[i].setResetSelectionOnTapBelowRows(value);
        }
      },

      /**
       * Returns the selection manager.
       *
       * @return {qx.ui.table.selection.Manager} the selection manager.
       */
      getSelectionManager: function getSelectionManager() {
        return this.__selectionManager__P_196_1;
      },

      /**
       * Returns an array containing all TablePaneScrollers in this table.
       *
       * @return {qx.ui.table.pane.Scroller[]} all TablePaneScrollers in this table.
       */
      _getPaneScrollerArr: function _getPaneScrollerArr() {
        return this.__scrollerParent__P_196_0.getChildren();
      },

      /**
       * Returns a TablePaneScroller of this table.
       *
       * @param metaColumn {Integer} the meta column to get the TablePaneScroller for.
       * @return {qx.ui.table.pane.Scroller} the qx.ui.table.pane.Scroller.
       */
      getPaneScroller: function getPaneScroller(metaColumn) {
        return this._getPaneScrollerArr()[metaColumn];
      },

      /**
       * Cleans up the meta columns.
       *
       * @param fromMetaColumn {Integer} the first meta column to clean up. All following
       *      meta columns will be cleaned up, too. All previous meta columns will
       *      stay unchanged. If 0 all meta columns will be cleaned up.
       */
      _cleanUpMetaColumns: function _cleanUpMetaColumns(fromMetaColumn) {
        var scrollerArr = this._getPaneScrollerArr();

        if (scrollerArr != null) {
          for (var i = scrollerArr.length - 1; i >= fromMetaColumn; i--) {
            scrollerArr[i].destroy();
          }
        }
      },

      /**
       * Event handler. Called when the locale has changed.
       *
       * @param evt {Event} the event.
       */
      _onChangeLocale: function _onChangeLocale(evt) {
        this.updateContent();

        this._updateStatusBar();
      },
      // overridden
      _onChangeTheme: function _onChangeTheme() {
        qx.ui.table.Table.superclass.prototype._onChangeTheme.call(this);

        this.getDataRowRenderer().initThemeValues();
        this.updateContent();

        this._updateStatusBar();
      },

      /**
       * Event handler. Called when the selection has changed.
       *
       * @param evt {Map} the event.
       */
      _onSelectionChanged: function _onSelectionChanged(evt) {
        var scrollerArr = this._getPaneScrollerArr();

        for (var i = 0; i < scrollerArr.length; i++) {
          scrollerArr[i].onSelectionChanged();
        }

        this._updateStatusBar();
      },

      /**
       * Event handler. Called when the table model meta data has changed.
       *
       * @param evt {Map} the event.
       */
      _onTableModelMetaDataChanged: function _onTableModelMetaDataChanged(evt) {
        var scrollerArr = this._getPaneScrollerArr();

        for (var i = 0; i < scrollerArr.length; i++) {
          scrollerArr[i].onTableModelMetaDataChanged();
        }

        this._updateStatusBar();
      },

      /**
       * Event handler. Called when the table model data has changed.
       *
       * @param evt {Map} the event.
       */
      _onTableModelDataChanged: function _onTableModelDataChanged(evt) {
        var data = evt.getData();

        this._updateTableData(data.firstRow, data.lastRow, data.firstColumn, data.lastColumn, data.removeStart, data.removeCount);
      },
      // overridden
      _onContextMenuOpen: function _onContextMenuOpen(e) {// This is Widget's context menu handler which typically retrieves
        // and displays the menu as soon as it receives a "contextmenu" event.
        // We want to allow the cellContextmenu handler to create the menu,
        // so we'll override this method with a null one, and do the menu
        // placement and display handling in our _onContextMenu method.
      },

      /**
       * To update the table if the table model has changed and remove selection.
       *
       * @param firstRow {Integer} The index of the first row that has changed.
       * @param lastRow {Integer} The index of the last row that has changed.
       * @param firstColumn {Integer} The model index of the first column that has changed.
       * @param lastColumn {Integer} The model index of the last column that has changed.
       * @param removeStart {Integer ? null} The first index of the interval (including), to remove selection.
       * @param removeCount {Integer ? null} The count of the interval, to remove selection.
       */
      _updateTableData: function _updateTableData(firstRow, lastRow, firstColumn, lastColumn, removeStart, removeCount) {
        var scrollerArr = this._getPaneScrollerArr(); // update selection if rows were removed


        if (removeCount) {
          this.getSelectionModel().removeSelectionInterval(removeStart, removeStart + removeCount - 1, true); // remove focus if the focused row has been removed

          if (this.__focusedRow__P_196_3 >= removeStart && this.__focusedRow__P_196_3 < removeStart + removeCount) {
            this.setFocusedCell();
          }
        }

        for (var i = 0; i < scrollerArr.length; i++) {
          scrollerArr[i].onTableModelDataChanged(firstRow, lastRow, firstColumn, lastColumn);
        }

        var rowCount = this.getTableModel().getRowCount();

        if (rowCount != this.__lastRowCount__P_196_6) {
          this.__lastRowCount__P_196_6 = rowCount;

          this._updateScrollBarVisibility();

          this._updateStatusBar(); // ARIA attrs


          this.getContentElement().setAttribute("aria-rowcount", rowCount);
        }

        var colCount = this.getTableModel().getColumnCount();

        if (colCount != this.__lastColCount__P_196_7) {
          this.__lastColCount__P_196_7 = colCount; // ARIA attrs

          this.getContentElement().setAttribute("aria-colcount", colCount);
        }
      },

      /**
       * Event handler. Called when a TablePaneScroller has been scrolled vertically.
       *
       * @param evt {Map} the event.
       */
      _onScrollY: function _onScrollY(evt) {
        if (!this.__internalChange__P_196_8) {
          this.__internalChange__P_196_8 = true; // Set the same scroll position to all meta columns

          var scrollerArr = this._getPaneScrollerArr();

          for (var i = 0; i < scrollerArr.length; i++) {
            scrollerArr[i].setScrollY(evt.getData());
          }

          this.__internalChange__P_196_8 = false;
        }
      },

      /**
       * Event handler. Called when a key was pressed.
       *
       * @param evt {qx.event.type.KeySequence} the event.
       * @deprecated {6.0} please use _onKeyDown instead!
       */
      _onKeyPress: function _onKeyPress(evt) {
        qx.log.Logger.deprecatedMethodWarning(this._onKeyPress, "The method '_onKeyPress()' is deprecated. Please use '_onKeyDown()' instead.");
        qx.log.Logger.deprecateMethodOverriding(this, qx.ui.table.Table, "_onKeyPress", "The method '_onKeyPress()' is deprecated. Please use '_onKeyDown()' instead.");

        this._onKeyDown(evt);
      },

      /**
       * Event handler. Called when on key down event
       *
       * @param evt {qx.event.type.KeySequence} the event.
       */
      _onKeyDown: function _onKeyDown(evt) {
        if (!this.getEnabled()) {
          return;
        } // No editing mode


        var oldFocusedRow = this.__focusedRow__P_196_3;
        var consumed = false; // Handle keys that are independent from the modifiers

        var identifier = evt.getKeyIdentifier();

        if (this.isEditing()) {
          // Editing mode
          if (evt.getModifiers() == 0) {
            switch (identifier) {
              case "Enter":
                this.stopEditing();
                var oldFocusedRow = this.__focusedRow__P_196_3;
                this.moveFocusedCell(0, 1);

                if (this.__focusedRow__P_196_3 != oldFocusedRow) {
                  consumed = this.startEditing();
                }

                break;

              case "Escape":
                this.cancelEditing();
                this.focus();
                break;

              default:
                consumed = false;
                break;
            }
          }
        } else {
          consumed = true; // No editing mode

          if (evt.isCtrlPressed()) {
            // Handle keys that depend on modifiers
            switch (identifier) {
              case "A":
                // Ctrl + A
                var rowCount = this.getTableModel().getRowCount();

                if (rowCount > 0) {
                  this.getSelectionModel().setSelectionInterval(0, rowCount - 1);
                }

                break;

              default:
                consumed = false;
                break;
            }
          } else {
            // Handle keys that are independent from the modifiers
            switch (identifier) {
              case "Space":
                this.__selectionManager__P_196_1.handleSelectKeyDown(this.__focusedRow__P_196_3, evt);

                break;

              case "F2":
              case "Enter":
                this.startEditing();
                consumed = true;
                break;

              case "Home":
                this.setFocusedCell(this.__focusedCol__P_196_2, 0, true);
                break;

              case "End":
                var rowCount = this.getTableModel().getRowCount();
                this.setFocusedCell(this.__focusedCol__P_196_2, rowCount - 1, true);
                break;

              case "Left":
                this.moveFocusedCell(-1, 0);
                break;

              case "Right":
                this.moveFocusedCell(1, 0);
                break;

              case "Up":
                this.moveFocusedCell(0, -1);
                break;

              case "Down":
                this.moveFocusedCell(0, 1);
                break;

              case "PageUp":
              case "PageDown":
                var scroller = this.getPaneScroller(0);
                var pane = scroller.getTablePane();
                var rowHeight = this.getRowHeight();
                var direction = identifier == "PageUp" ? -1 : 1;
                rowCount = pane.getVisibleRowCount() - 1;
                scroller.setScrollY(scroller.getScrollY() + direction * rowCount * rowHeight);
                this.moveFocusedCell(0, direction * rowCount);
                break;

              default:
                consumed = false;
            }
          }
        }

        if (oldFocusedRow != this.__focusedRow__P_196_3 && this.getRowFocusChangeModifiesSelection()) {
          // The focus moved -> Let the selection manager handle this event
          this.__selectionManager__P_196_1.handleMoveKeyDown(this.__focusedRow__P_196_3, evt);
        }

        if (consumed) {
          evt.preventDefault();
          evt.stopPropagation();
        }
      },

      /**
       * Event handler. Called when the table gets the focus.
       *
       * @param evt {Map} the event.
       */
      _onFocusChanged: function _onFocusChanged(evt) {
        var scrollerArr = this._getPaneScrollerArr();

        for (var i = 0; i < scrollerArr.length; i++) {
          scrollerArr[i].onFocusChanged();
        }
      },

      /**
       * Event handler. Called when the visibility of a column has changed.
       *
       * @param evt {Map} the event.
       */
      _onColVisibilityChanged: function _onColVisibilityChanged(evt) {
        var scrollerArr = this._getPaneScrollerArr();

        for (var i = 0; i < scrollerArr.length; i++) {
          scrollerArr[i].onColVisibilityChanged();
        }

        var data = evt.getData();

        if (this.__columnMenuButtons__P_196_9 != null && data.col != null && data.visible != null) {
          this.__columnMenuButtons__P_196_9[data.col].setColumnVisible(data.visible);
        }

        this._updateScrollerWidths();

        this._updateScrollBarVisibility();
      },

      /**
       * Event handler. Called when the width of a column has changed.
       *
       * @param evt {Map} the event.
       */
      _onColWidthChanged: function _onColWidthChanged(evt) {
        var scrollerArr = this._getPaneScrollerArr();

        for (var i = 0; i < scrollerArr.length; i++) {
          var data = evt.getData();
          scrollerArr[i].setColumnWidth(data.col, data.newWidth);
        }

        this._updateScrollerWidths();

        this._updateScrollBarVisibility();
      },

      /**
       * Event handler. Called when the column order has changed.
       *
       * @param evt {Map} the event.
       */
      _onColOrderChanged: function _onColOrderChanged(evt) {
        var scrollerArr = this._getPaneScrollerArr();

        for (var i = 0; i < scrollerArr.length; i++) {
          scrollerArr[i].onColOrderChanged();
        } // A column may have been moved between meta columns


        this._updateScrollerWidths();

        this._updateScrollBarVisibility();
      },

      /**
       * Gets the TablePaneScroller at a certain x position in the page. If there is
       * no TablePaneScroller at this position, null is returned.
       *
       * @param pageX {Integer} the position in the page to check (in pixels).
       * @return {qx.ui.table.pane.Scroller} the TablePaneScroller or null.
       */
      getTablePaneScrollerAtPageX: function getTablePaneScrollerAtPageX(pageX) {
        var metaCol = this._getMetaColumnAtPageX(pageX);

        return metaCol != -1 ? this.getPaneScroller(metaCol) : null;
      },

      /**
       * Sets the currently focused cell. A value of <code>null</code> hides the
       * focus cell.
       *
       * @param col {Integer?null} the model index of the focused cell's column.
       * @param row {Integer?null} the model index of the focused cell's row.
       * @param scrollVisible {Boolean ? false} whether to scroll the new focused cell
       *          visible.
       */
      setFocusedCell: function setFocusedCell(col, row, scrollVisible) {
        if (!this.isEditing() && (col != this.__focusedCol__P_196_2 || row != this.__focusedRow__P_196_3)) {
          if (col === null) {
            col = 0;
          }

          this.__focusedCol__P_196_2 = col;
          this.__focusedRow__P_196_3 = row;

          var scrollerArr = this._getPaneScrollerArr();

          for (var i = 0; i < scrollerArr.length; i++) {
            scrollerArr[i].setFocusedCell(col, row);
          }

          if (col != null && scrollVisible) {
            this.scrollCellVisible(col, row);
          } // ARIA attrs


          var cellId = "qooxdoo-table-cell-" + this.toHashCode() + "-" + row + "-" + col;
          this.getContentElement().setAttribute("aria-activedescendant", cellId);
        }
      },

      /**
       * Resets (clears) the current selection
       */
      resetSelection: function resetSelection() {
        this.getSelectionModel().resetSelection();
      },

      /**
       * Resets the focused cell.
       */
      resetCellFocus: function resetCellFocus() {
        this.setFocusedCell(null, null, false);
      },

      /**
       * Returns the column of the currently focused cell.
       *
       * @return {Integer} the model index of the focused cell's column.
       */
      getFocusedColumn: function getFocusedColumn() {
        return this.__focusedCol__P_196_2;
      },

      /**
       * Returns the row of the currently focused cell.
       *
       * @return {Integer} the model index of the focused cell's column.
       */
      getFocusedRow: function getFocusedRow() {
        return this.__focusedRow__P_196_3;
      },

      /**
       * Select whether the focused row is highlighted
       *
       * @param bHighlight {Boolean}
       *   Flag indicating whether the focused row should be highlighted.
       *
       */
      highlightFocusedRow: function highlightFocusedRow(bHighlight) {
        this.getDataRowRenderer().setHighlightFocusRow(bHighlight);
      },

      /**
       * Remove the highlighting of the current focus row.
       *
       * This is used to temporarily remove the highlighting of the currently
       * focused row, and is expected to be used most typically by adding a
       * listener on the "pointerout" event, so that the focus highlighting is
       * suspended when the pointer leaves the table:
       *
       *     table.addListener("pointerout", table.clearFocusedRowHighlight);
       *
       * @param evt {qx.event.type.Pointer} Incoming pointer event
       */
      clearFocusedRowHighlight: function clearFocusedRowHighlight(evt) {
        if (evt) {
          var relatedTarget = evt.getRelatedTarget();

          if (relatedTarget instanceof qx.ui.table.pane.Pane || relatedTarget instanceof qx.ui.table.pane.FocusIndicator) {
            return;
          }
        } // Remove focus from any cell that has it


        this.resetCellFocus(); // Now, for each pane scroller...

        var scrollerArr = this._getPaneScrollerArr();

        for (var i = 0; i < scrollerArr.length; i++) {
          // ... repaint without focus.
          scrollerArr[i].onFocusChanged();
        }
      },

      /**
       * Moves the focus.
       *
       * @param deltaX {Integer} The delta by which the focus should be moved on the x axis.
       * @param deltaY {Integer} The delta by which the focus should be moved on the y axis.
       */
      moveFocusedCell: function moveFocusedCell(deltaX, deltaY) {
        var col = this.__focusedCol__P_196_2;
        var row = this.__focusedRow__P_196_3; // could also be undefined [BUG #4676]. In that case default to first cell focus

        if (col === null || col === undefined || row === null || row === undefined) {
          this.setFocusedCell(0, 0, true);
          return;
        }

        if (deltaX != 0) {
          var columnModel = this.getTableColumnModel();
          var x = columnModel.getVisibleX(col);
          var colCount = columnModel.getVisibleColumnCount();
          x = qx.lang.Number.limit(x + deltaX, 0, colCount - 1);
          col = columnModel.getVisibleColumnAtX(x);
        }

        if (deltaY != 0) {
          var tableModel = this.getTableModel();
          row = qx.lang.Number.limit(row + deltaY, 0, tableModel.getRowCount() - 1);
        }

        this.setFocusedCell(col, row, true);
      },

      /**
       * Scrolls a cell visible.
       *
       * @param col {Integer} the model index of the column the cell belongs to.
       * @param row {Integer} the model index of the row the cell belongs to.
       */
      scrollCellVisible: function scrollCellVisible(col, row) {
        // get the dom element
        var elem = this.getContentElement().getDomElement(); // if the dom element is not available, the table hasn't been rendered

        if (!elem) {
          // postpone the scroll until the table has appeared
          this.addListenerOnce("appear", function () {
            this.scrollCellVisible(col, row);
          }, this);
        }

        var columnModel = this.getTableColumnModel();
        var x = columnModel.getVisibleX(col);

        var metaColumn = this._getMetaColumnAtColumnX(x);

        if (metaColumn != -1) {
          this.getPaneScroller(metaColumn).scrollCellVisible(col, row);
        }
      },

      /**
       * Returns whether currently a cell is editing.
       *
       * @return {var} whether currently a cell is editing.
       */
      isEditing: function isEditing() {
        if (this.__focusedCol__P_196_2 != null) {
          var x = this.getTableColumnModel().getVisibleX(this.__focusedCol__P_196_2);

          var metaColumn = this._getMetaColumnAtColumnX(x);

          return this.getPaneScroller(metaColumn).isEditing();
        }

        return false;
      },

      /**
       * Starts editing the currently focused cell. Does nothing if already editing
       * or if the column is not editable.
       *
       * @return {Boolean} whether editing was started
       */
      startEditing: function startEditing() {
        if (this.__focusedCol__P_196_2 != null) {
          var x = this.getTableColumnModel().getVisibleX(this.__focusedCol__P_196_2);

          var metaColumn = this._getMetaColumnAtColumnX(x);

          var started = this.getPaneScroller(metaColumn).startEditing();
          return started;
        }

        return false;
      },

      /**
       * Stops editing and writes the editor's value to the model.
       */
      stopEditing: function stopEditing() {
        if (this.__focusedCol__P_196_2 != null) {
          var x = this.getTableColumnModel().getVisibleX(this.__focusedCol__P_196_2);

          var metaColumn = this._getMetaColumnAtColumnX(x);

          this.getPaneScroller(metaColumn).stopEditing();
        }
      },

      /**
       * Stops editing without writing the editor's value to the model.
       */
      cancelEditing: function cancelEditing() {
        if (this.__focusedCol__P_196_2 != null) {
          var x = this.getTableColumnModel().getVisibleX(this.__focusedCol__P_196_2);

          var metaColumn = this._getMetaColumnAtColumnX(x);

          this.getPaneScroller(metaColumn).cancelEditing();
        }
      },

      /**
       * Update the table content of every attached table pane.
       */
      updateContent: function updateContent() {
        var scrollerArr = this._getPaneScrollerArr();

        for (var i = 0; i < scrollerArr.length; i++) {
          scrollerArr[i].getTablePane().updateContent(true);
        }
      },

      /**
       * Activates the blocker widgets on all column headers and the
       * column button
       */
      blockHeaderElements: function blockHeaderElements() {
        var scrollerArr = this._getPaneScrollerArr();

        for (var i = 0; i < scrollerArr.length; i++) {
          scrollerArr[i].getHeader().getBlocker().blockContent(20);
        }

        this.getChildControl("column-button").getBlocker().blockContent(20);
      },

      /**
       * Deactivates the blocker widgets on all column headers and the
       * column button
       */
      unblockHeaderElements: function unblockHeaderElements() {
        var scrollerArr = this._getPaneScrollerArr();

        for (var i = 0; i < scrollerArr.length; i++) {
          scrollerArr[i].getHeader().getBlocker().unblock();
        }

        this.getChildControl("column-button").getBlocker().unblock();
      },

      /**
       * Gets the meta column at a certain x position in the page. If there is no
       * meta column at this position, -1 is returned.
       *
       * @param pageX {Integer} the position in the page to check (in pixels).
       * @return {Integer} the index of the meta column or -1.
       */
      _getMetaColumnAtPageX: function _getMetaColumnAtPageX(pageX) {
        var scrollerArr = this._getPaneScrollerArr();

        for (var i = 0; i < scrollerArr.length; i++) {
          var pos = scrollerArr[i].getContentLocation();

          if (pageX >= pos.left && pageX <= pos.right) {
            return i;
          }
        }

        return -1;
      },

      /**
       * Returns the meta column a column is shown in. If the column is not shown at
       * all, -1 is returned.
       *
       * @param visXPos {Integer} the visible x position of the column.
       * @return {Integer} the meta column the column is shown in.
       */
      _getMetaColumnAtColumnX: function _getMetaColumnAtColumnX(visXPos) {
        var metaColumnCounts = this.getMetaColumnCounts();
        var rightXPos = 0;

        for (var i = 0; i < metaColumnCounts.length; i++) {
          var counts = metaColumnCounts[i];
          rightXPos += counts;

          if (counts == -1 || visXPos < rightXPos) {
            return i;
          }
        }

        return -1;
      },

      /**
       * Updates the text shown in the status bar.
       */
      _updateStatusBar: function _updateStatusBar() {
        var tableModel = this.getTableModel();

        if (this.getStatusBarVisible()) {
          var selectedRowCount = this.getSelectionModel().getSelectedCount();
          var rowCount = tableModel.getRowCount();
          var text;

          if (rowCount >= 0) {
            if (selectedRowCount == 0) {
              text = this.trn("one row", "%1 rows", rowCount, rowCount);
            } else {
              text = this.trn("one of one row", "%1 of %2 rows", rowCount, selectedRowCount, rowCount);
            }
          }

          if (this.__additionalStatusBarText__P_196_5) {
            if (text) {
              text += this.__additionalStatusBarText__P_196_5;
            } else {
              text = this.__additionalStatusBarText__P_196_5;
            }
          }

          if (text) {
            this.getChildControl("statusbar").setValue(text);
          }
        }
      },

      /**
       * Updates the widths of all scrollers.
       */
      _updateScrollerWidths: function _updateScrollerWidths() {
        // Give all scrollers except for the last one the wanted width
        // (The last one has a flex with)
        var scrollerArr = this._getPaneScrollerArr();

        for (var i = 0; i < scrollerArr.length; i++) {
          var isLast = i == scrollerArr.length - 1;
          var width = scrollerArr[i].getTablePaneModel().getTotalWidth();
          scrollerArr[i].setPaneWidth(width);
          var flex = isLast ? 1 : 0;
          scrollerArr[i].setLayoutProperties({
            flex: flex
          });
        }
      },

      /**
       * Updates the visibility of the scrollbars in the meta columns.
       */
      _updateScrollBarVisibility: function _updateScrollBarVisibility() {
        if (!this.getBounds()) {
          return;
        }

        var horBar = qx.ui.table.pane.Scroller.HORIZONTAL_SCROLLBAR;
        var verBar = qx.ui.table.pane.Scroller.VERTICAL_SCROLLBAR;

        var scrollerArr = this._getPaneScrollerArr(); // Check which scroll bars are needed


        var horNeeded = false;
        var verNeeded = false;
        var excludeScrollerScrollbarsIfNotNeeded; // Determine whether we need to render horizontal scrollbars for meta
        // columns that don't themselves actually require it

        excludeScrollerScrollbarsIfNotNeeded = this.getExcludeScrollerScrollbarsIfNotNeeded();

        if (!excludeScrollerScrollbarsIfNotNeeded) {
          for (var i = 0; i < scrollerArr.length; i++) {
            var isLast = i == scrollerArr.length - 1; // Only show the last vertical scrollbar

            var bars = scrollerArr[i].getNeededScrollBars(horNeeded, !isLast);

            if (bars & horBar) {
              horNeeded = true;
            }

            if (isLast && bars & verBar) {
              verNeeded = true;
            }
          }
        } // Set the needed scrollbars


        for (var i = 0; i < scrollerArr.length; i++) {
          isLast = i == scrollerArr.length - 1; // If we don't want to include scrollbars for meta columns that don't
          // require it, find out whether this meta column requires it.

          if (excludeScrollerScrollbarsIfNotNeeded) {
            horNeeded = !!(scrollerArr[i].getNeededScrollBars(false, !isLast) & horBar); // Show the horizontal scrollbar if needed. Specify null to indicate
            // that the scrollbar should be hidden rather than excluded.

            scrollerArr[i].setHorizontalScrollBarVisible(horNeeded || null);
          } else {
            // Show the horizontal scrollbar if needed.
            scrollerArr[i].setHorizontalScrollBarVisible(horNeeded);
          } // If this is the last meta-column...


          if (isLast) {
            // ... then get the current (old) use of vertical scroll bar
            verNeeded = !!(scrollerArr[i].getNeededScrollBars(false, false) & verBar);

            if (this.__hadVerticalScrollBar__P_196_12 == null) {
              this.__hadVerticalScrollBar__P_196_12 = scrollerArr[i].getVerticalScrollBarVisible();
              this.__timer__P_196_13 = qx.event.Timer.once(function () {
                // reset the last visible state of the vertical scroll bar
                // in a timeout to prevent infinite loops.
                this.__hadVerticalScrollBar__P_196_12 = null;
                this.__timer__P_196_13 = null;
              }, this, 0);
            }
          }

          scrollerArr[i].setVerticalScrollBarVisible(isLast && verNeeded); // If this is the last meta-column and the use of a vertical scroll bar
          // has changed...

          if (isLast && verNeeded != this.__hadVerticalScrollBar__P_196_12) {
            // ... then dispatch an event to any awaiting listeners
            this.fireDataEvent("verticalScrollBarChanged", verNeeded);
          }
        }
      },

      /**
       * Initialize the column menu
       */
      _initColumnMenu: function _initColumnMenu() {
        var tableModel = this.getTableModel();
        var columnModel = this.getTableColumnModel();
        var columnButton = this.getChildControl("column-button"); // Remove all items from the menu. We'll rebuild it here.

        columnButton.empty(); // Inform listeners who may want to insert menu items at the beginning

        var menu = columnButton.getMenu();
        var data = {
          table: this,
          menu: menu,
          columnButton: columnButton
        };
        this.fireDataEvent("columnVisibilityMenuCreateStart", data);
        this.__columnMenuButtons__P_196_9 = {};

        for (var iCol = 0, l = tableModel.getColumnCount(); iCol < l; iCol++) {
          var col = columnModel.getOverallColumnAtX(iCol);
          var menuButton = columnButton.factory("menu-button", {
            text: tableModel.getColumnName(col),
            column: col,
            bVisible: columnModel.isColumnVisible(col)
          });
          qx.core.Assert.assertInterface(menuButton, qx.ui.table.IColumnMenuItem);
          menuButton.addListener("changeColumnVisible", this._createColumnVisibilityCheckBoxHandler(col), this);
          this.__columnMenuButtons__P_196_9[col] = menuButton;
        } // Inform listeners who may want to insert menu items at the end


        data = {
          table: this,
          menu: menu,
          columnButton: columnButton
        };
        this.fireDataEvent("columnVisibilityMenuCreateEnd", data);
      },

      /**
       * Creates a handler for a check box of the column visibility menu.
       *
       * @param col {Integer} the model index of column to create the handler for.
       * @return {Function} The created event handler.
       */
      _createColumnVisibilityCheckBoxHandler: function _createColumnVisibilityCheckBoxHandler(col) {
        return function (evt) {
          var columnModel = this.getTableColumnModel();
          columnModel.setColumnVisible(col, evt.getData());
        };
      },

      /**
       * Sets the width of a column.
       *
       * @param col {Integer} the model index of column.
       * @param width {Integer} the new width in pixels.
       */
      setColumnWidth: function setColumnWidth(col, width) {
        this.getTableColumnModel().setColumnWidth(col, width);
      },

      /**
       * Resize event handler
       */
      _onResize: function _onResize() {
        this.fireEvent("tableWidthChanged");

        this._updateScrollerWidths();

        this._updateScrollBarVisibility();
      },
      // overridden
      addListener: function addListener(type, listener, self, capture) {
        if (qx.ui.table.Table.__redirectEvents__P_196_4[type]) {
          // start the id with the type (needed for removing)
          var id = [type];

          for (var i = 0, arr = this._getPaneScrollerArr(); i < arr.length; i++) {
            id.push(arr[i].addListener.apply(arr[i], arguments));
          } // join the id's of every event with "


          return id.join('"');
        } else {
          return qx.ui.table.Table.superclass.prototype.addListener.call(this, type, listener, self, capture);
        }
      },
      // overridden
      removeListener: function removeListener(type, listener, self, capture) {
        if (qx.ui.table.Table.__redirectEvents__P_196_4[type]) {
          for (var i = 0, arr = this._getPaneScrollerArr(); i < arr.length; i++) {
            arr[i].removeListener.apply(arr[i], arguments);
          }
        } else {
          qx.ui.table.Table.superclass.prototype.removeListener.call(this, type, listener, self, capture);
        }
      },
      // overridden
      removeListenerById: function removeListenerById(id) {
        var ids = id.split('"'); // type is the first entry of the connected id

        var type = ids.shift();

        if (qx.ui.table.Table.__redirectEvents__P_196_4[type]) {
          var removed = true;

          for (var i = 0, arr = this._getPaneScrollerArr(); i < arr.length; i++) {
            removed = arr[i].removeListenerById.call(arr[i], ids[i]) && removed;
          }

          return removed;
        } else {
          return qx.ui.table.Table.superclass.prototype.removeListenerById.call(this, id);
        }
      },
      destroy: function destroy() {
        this.getChildControl("column-button").getMenu().destroy();
        qx.ui.table.Table.superclass.prototype.destroy.call(this);
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      // remove the event listener which handled the locale change
      {
        qx.locale.Manager.getInstance().removeListener("changeLocale", this._onChangeLocale, this);
      } // we allocated these objects on init so we have to clean them up.

      var selectionModel = this.getSelectionModel();

      if (selectionModel) {
        selectionModel.dispose();
      }

      var dataRowRenderer = this.getDataRowRenderer();

      if (dataRowRenderer) {
        dataRowRenderer.dispose();
      }

      if (this.getTableModel() != null) {
        this.getTableModel().removeListener("metaDataChanged", this._onTableModelMetaDataChanged, this);
        this.getTableModel().removeListener("dataChanged", this._onTableModelDataChanged, this);
      }

      this._cleanUpMetaColumns(0);

      this.getTableColumnModel().dispose();

      this._disposeObjects("__selectionManager__P_196_1", "__scrollerParent__P_196_0", "__emptyTableModel__P_196_11", "__emptyTableModel__P_196_11", "__columnModel__P_196_10", "__timer__P_196_13");

      this._disposeMap("__columnMenuButtons__P_196_9");
    }
  });
  qx.ui.table.Table.$$dbClassInfo = $$dbClassInfo;
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
       * David Perez Carmona (david-perez)
  
  ************************************************************************ */

  /**
   * A selection model.
   */
  qx.Class.define("qx.ui.table.selection.Model", {
    extend: qx.core.Object,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      this.__selectedRangeArr__P_202_0 = [];
      this.__anchorSelectionIndex__P_202_1 = -1;
      this.__leadSelectionIndex__P_202_2 = -1;
      this.hasBatchModeRefCount = 0;
      this.__hadChangeEventInBatchMode__P_202_3 = false;
    },

    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */
    events: {
      /** Fired when the selection has changed. */
      changeSelection: "qx.event.type.Event"
    },

    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */
    statics: {
      /** @type {int} The selection mode "none". Nothing can ever be selected. */
      NO_SELECTION: 1,

      /** @type {int} The selection mode "single". This mode only allows one selected item. */
      SINGLE_SELECTION: 2,

      /**
       * @type {int} The selection mode "single interval". This mode only allows one
       * continuous interval of selected items.
       */
      SINGLE_INTERVAL_SELECTION: 3,

      /**
       * @type {int} The selection mode "multiple interval". This mode only allows any
       * selection.
       */
      MULTIPLE_INTERVAL_SELECTION: 4,

      /**
       * @type {int} The selection mode "multiple interval". This mode only allows any
       * selection. The difference with the previous one, is that multiple
       * selection is eased. A tap on an item, toggles its selection state.
       * On the other hand, MULTIPLE_INTERVAL_SELECTION does this behavior only
       * when Ctrl-tapping an item.
       */
      MULTIPLE_INTERVAL_SELECTION_TOGGLE: 5
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /**
       * Set the selection mode. Valid values are {@link #NO_SELECTION},
       * {@link #SINGLE_SELECTION}, {@link #SINGLE_INTERVAL_SELECTION},
       * {@link #MULTIPLE_INTERVAL_SELECTION} and
       * {@link #MULTIPLE_INTERVAL_SELECTION_TOGGLE}.
       */
      selectionMode: {
        init: 2,
        //SINGLE_SELECTION,
        check: [1, 2, 3, 4, 5],
        //[ NO_SELECTION, SINGLE_SELECTION, SINGLE_INTERVAL_SELECTION, MULTIPLE_INTERVAL_SELECTION, MULTIPLE_INTERVAL_SELECTION_TOGGLE ],
        apply: "_applySelectionMode"
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __hadChangeEventInBatchMode__P_202_3: null,
      __anchorSelectionIndex__P_202_1: null,
      __leadSelectionIndex__P_202_2: null,
      __selectedRangeArr__P_202_0: null,
      // selectionMode property modifier
      _applySelectionMode: function _applySelectionMode(selectionMode) {
        this.resetSelection();
      },

      /**
       *
       * Activates / Deactivates batch mode. In batch mode, no change events will be thrown but
       * will be collected instead. When batch mode is turned off again and any events have
       * been collected, one event is thrown to inform the listeners.
       *
       * This method supports nested calling, i. e. batch mode can be turned more than once.
       * In this case, batch mode will not end until it has been turned off once for each
       * turning on.
       *
       * @param batchMode {Boolean} true to activate batch mode, false to deactivate
       * @return {Boolean} true if batch mode is active, false otherwise
       * @throws {Error} if batch mode is turned off once more than it has been turned on
       */
      setBatchMode: function setBatchMode(batchMode) {
        if (batchMode) {
          this.hasBatchModeRefCount += 1;
        } else {
          if (this.hasBatchModeRefCount == 0) {
            throw new Error("Try to turn off batch mode althoug it was not turned on.");
          }

          this.hasBatchModeRefCount -= 1;

          if (this.__hadChangeEventInBatchMode__P_202_3) {
            this.__hadChangeEventInBatchMode__P_202_3 = false;

            this._fireChangeSelection();
          }
        }

        return this.hasBatchMode();
      },

      /**
       *
       * Returns whether batch mode is active. See setter for a description of batch mode.
       *
       * @return {Boolean} true if batch mode is active, false otherwise
       */
      hasBatchMode: function hasBatchMode() {
        return this.hasBatchModeRefCount > 0;
      },

      /**
       * Returns the first argument of the last call to {@link #setSelectionInterval()},
       * {@link #addSelectionInterval()} or {@link #removeSelectionInterval()}.
       *
       * @return {Integer} the anchor selection index.
       */
      getAnchorSelectionIndex: function getAnchorSelectionIndex() {
        return this.__anchorSelectionIndex__P_202_1;
      },

      /**
       * Sets the anchor selection index. Only use this function, if you want manipulate
       * the selection manually.
       *
       * @param index {Integer} the index to set.
       */
      _setAnchorSelectionIndex: function _setAnchorSelectionIndex(index) {
        this.__anchorSelectionIndex__P_202_1 = index;
      },

      /**
       * Returns the second argument of the last call to {@link #setSelectionInterval()},
       * {@link #addSelectionInterval()} or {@link #removeSelectionInterval()}.
       *
       * @return {Integer} the lead selection index.
       */
      getLeadSelectionIndex: function getLeadSelectionIndex() {
        return this.__leadSelectionIndex__P_202_2;
      },

      /**
       * Sets the lead selection index. Only use this function, if you want manipulate
       * the selection manually.
       *
       * @param index {Integer} the index to set.
       */
      _setLeadSelectionIndex: function _setLeadSelectionIndex(index) {
        this.__leadSelectionIndex__P_202_2 = index;
      },

      /**
       * Returns an array that holds all the selected ranges of the table. Each
       * entry is a map holding information about the "minIndex" and "maxIndex" of the
       * selection range.
       *
       * @return {Map[]} array with all the selected ranges.
       */
      _getSelectedRangeArr: function _getSelectedRangeArr() {
        return this.__selectedRangeArr__P_202_0;
      },

      /**
       * Resets (clears) the selection.
       */
      resetSelection: function resetSelection() {
        if (!this.isSelectionEmpty()) {
          this._resetSelection();

          this._fireChangeSelection();
        }
      },

      /**
       * Returns whether the selection is empty.
       *
       * @return {Boolean} whether the selection is empty.
       */
      isSelectionEmpty: function isSelectionEmpty() {
        return this.__selectedRangeArr__P_202_0.length == 0;
      },

      /**
       * Returns the number of selected items.
       *
       * @return {Integer} the number of selected items.
       */
      getSelectedCount: function getSelectedCount() {
        var selectedCount = 0;

        for (var i = 0; i < this.__selectedRangeArr__P_202_0.length; i++) {
          var range = this.__selectedRangeArr__P_202_0[i];
          selectedCount += range.maxIndex - range.minIndex + 1;
        }

        return selectedCount;
      },

      /**
       * Returns whether an index is selected.
       *
       * @param index {Integer} the index to check.
       * @return {Boolean} whether the index is selected.
       */
      isSelectedIndex: function isSelectedIndex(index) {
        for (var i = 0; i < this.__selectedRangeArr__P_202_0.length; i++) {
          var range = this.__selectedRangeArr__P_202_0[i];

          if (index >= range.minIndex && index <= range.maxIndex) {
            return true;
          }
        }

        return false;
      },

      /**
       * Returns the selected ranges as an array. Each array element has a
       * <code>minIndex</code> and a <code>maxIndex</code> property.
       *
       * @return {Map[]} the selected ranges.
       */
      getSelectedRanges: function getSelectedRanges() {
        // clone the selection array and the individual elements - this prevents the
        // caller from messing with the internal model
        var retVal = [];

        for (var i = 0; i < this.__selectedRangeArr__P_202_0.length; i++) {
          retVal.push({
            minIndex: this.__selectedRangeArr__P_202_0[i].minIndex,
            maxIndex: this.__selectedRangeArr__P_202_0[i].maxIndex
          });
        }

        return retVal;
      },

      /**
       * Calls an iterator function for each selected index.
       *
       * Usage Example:
       * <pre class='javascript'>
       * var selectedRowData = [];
       * mySelectionModel.iterateSelection(function(index) {
       *   selectedRowData.push(myTableModel.getRowData(index));
       * });
       * </pre>
       *
       * @param iterator {Function} the function to call for each selected index.
       *          Gets the current index as parameter.
       * @param object {var ? null} the object to use when calling the handler.
       *          (this object will be available via "this" in the iterator)
       */
      iterateSelection: function iterateSelection(iterator, object) {
        for (var i = 0; i < this.__selectedRangeArr__P_202_0.length; i++) {
          for (var j = this.__selectedRangeArr__P_202_0[i].minIndex; j <= this.__selectedRangeArr__P_202_0[i].maxIndex; j++) {
            iterator.call(object, j);
          }
        }
      },

      /**
       * Sets the selected interval. This will clear the former selection.
       *
       * @param fromIndex {Integer} the first index of the selection (including).
       * @param toIndex {Integer} the last index of the selection (including).
       */
      setSelectionInterval: function setSelectionInterval(fromIndex, toIndex) {
        var me = qx.ui.table.selection.Model;

        switch (this.getSelectionMode()) {
          case me.NO_SELECTION:
            return;

          case me.SINGLE_SELECTION:
            // Ensure there is actually a change of selection
            if (this.isSelectedIndex(toIndex)) {
              return;
            }

            fromIndex = toIndex;
            break;

          case me.MULTIPLE_INTERVAL_SELECTION_TOGGLE:
            this.setBatchMode(true);

            try {
              for (var i = fromIndex; i <= toIndex; i++) {
                if (!this.isSelectedIndex(i)) {
                  this._addSelectionInterval(i, i);
                } else {
                  this.removeSelectionInterval(i, i);
                }
              }
            } catch (e) {
              throw e;
            } finally {
              this.setBatchMode(false);
            }

            this._fireChangeSelection();

            return;
        }

        this._resetSelection();

        this._addSelectionInterval(fromIndex, toIndex);

        this._fireChangeSelection();
      },

      /**
       * Adds a selection interval to the current selection.
       *
       * @param fromIndex {Integer} the first index of the selection (including).
       * @param toIndex {Integer} the last index of the selection (including).
       */
      addSelectionInterval: function addSelectionInterval(fromIndex, toIndex) {
        var SelectionModel = qx.ui.table.selection.Model;

        switch (this.getSelectionMode()) {
          case SelectionModel.NO_SELECTION:
            return;

          case SelectionModel.MULTIPLE_INTERVAL_SELECTION:
          case SelectionModel.MULTIPLE_INTERVAL_SELECTION_TOGGLE:
            this._addSelectionInterval(fromIndex, toIndex);

            this._fireChangeSelection();

            break;

          default:
            this.setSelectionInterval(fromIndex, toIndex);
            break;
        }
      },

      /**
       * Removes an interval from the current selection.
       *
       * @param fromIndex {Integer} the first index of the interval (including).
       * @param toIndex {Integer} the last index of the interval (including).
       * @param rowsRemoved {Boolean?} rows were removed that caused this selection to change.
       *   If rows were removed, move the selections over so the same rows are selected as before.
       */
      removeSelectionInterval: function removeSelectionInterval(fromIndex, toIndex, rowsRemoved) {
        this.__anchorSelectionIndex__P_202_1 = fromIndex;
        this.__leadSelectionIndex__P_202_2 = toIndex;
        var minIndex = Math.min(fromIndex, toIndex);
        var maxIndex = Math.max(fromIndex, toIndex);
        var removeCount = maxIndex + 1 - minIndex; // Crop the affected ranges

        var newRanges = [];
        var extraRange = null;

        for (var i = 0; i < this.__selectedRangeArr__P_202_0.length; i++) {
          var range = this.__selectedRangeArr__P_202_0[i];

          if (range.minIndex > maxIndex) {
            if (rowsRemoved) {
              // Move whole selection up.
              range.minIndex -= removeCount;
              range.maxIndex -= removeCount;
            }
          } else if (range.maxIndex >= minIndex) {
            // This range is affected
            var minIsIn = range.minIndex >= minIndex;
            var maxIsIn = range.maxIndex >= minIndex && range.maxIndex <= maxIndex;

            if (minIsIn && maxIsIn) {
              // This range is removed completely
              range = null;
            } else if (minIsIn) {
              if (rowsRemoved) {
                range.minIndex = minIndex;
                range.maxIndex -= removeCount;
              } else {
                // The range is cropped from the left
                range.minIndex = maxIndex + 1;
              }
            } else if (maxIsIn) {
              // The range is cropped from the right
              range.maxIndex = minIndex - 1;
            } else {
              if (rowsRemoved) {
                range.maxIndex -= removeCount;
              } else {
                // The range is split
                extraRange = {
                  minIndex: maxIndex + 1,
                  maxIndex: range.maxIndex
                };
                range.maxIndex = minIndex - 1;
              }
            }
          }

          if (range) {
            newRanges.push(range);
            range = null;
          }

          if (extraRange) {
            newRanges.push(extraRange);
            extraRange = null;
          }
        }

        this.__selectedRangeArr__P_202_0 = newRanges;

        this._fireChangeSelection();
      },

      /**
       * Resets (clears) the selection, but doesn't inform the listeners.
       */
      _resetSelection: function _resetSelection() {
        this.__selectedRangeArr__P_202_0 = [];
        this.__anchorSelectionIndex__P_202_1 = -1;
        this.__leadSelectionIndex__P_202_2 = -1;
      },

      /**
       * Adds a selection interval to the current selection, but doesn't inform
       * the listeners.
       *
       * @param fromIndex {Integer} the first index of the selection (including).
       * @param toIndex {Integer} the last index of the selection (including).
       */
      _addSelectionInterval: function _addSelectionInterval(fromIndex, toIndex) {
        this.__anchorSelectionIndex__P_202_1 = fromIndex;
        this.__leadSelectionIndex__P_202_2 = toIndex;
        var minIndex = Math.min(fromIndex, toIndex);
        var maxIndex = Math.max(fromIndex, toIndex); // Find the index where the new range should be inserted

        var newRangeIndex = 0;

        for (; newRangeIndex < this.__selectedRangeArr__P_202_0.length; newRangeIndex++) {
          var range = this.__selectedRangeArr__P_202_0[newRangeIndex];

          if (range.minIndex > minIndex) {
            break;
          }
        } // Add the new range


        this.__selectedRangeArr__P_202_0.splice(newRangeIndex, 0, {
          minIndex: minIndex,
          maxIndex: maxIndex
        }); // Merge overlapping ranges


        var lastRange = this.__selectedRangeArr__P_202_0[0];

        for (var i = 1; i < this.__selectedRangeArr__P_202_0.length; i++) {
          var range = this.__selectedRangeArr__P_202_0[i];

          if (lastRange.maxIndex + 1 >= range.minIndex) {
            // The ranges are overlapping -> merge them
            lastRange.maxIndex = Math.max(lastRange.maxIndex, range.maxIndex); // Remove the current range

            this.__selectedRangeArr__P_202_0.splice(i, 1); // Check this index another time


            i--;
          } else {
            lastRange = range;
          }
        }
      },
      // this._dumpRanges();

      /**
       * Logs the current ranges for debug purposes.
       *
       */
      _dumpRanges: function _dumpRanges() {
        var text = "Ranges:";

        for (var i = 0; i < this.__selectedRangeArr__P_202_0.length; i++) {
          var range = this.__selectedRangeArr__P_202_0[i];
          text += " [" + range.minIndex + ".." + range.maxIndex + "]";
        }

        this.debug(text);
      },

      /**
       * Fires the "changeSelection" event to all registered listeners. If the selection model
       * currently is in batch mode, only one event will be thrown when batch mode is ended.
       *
       */
      _fireChangeSelection: function _fireChangeSelection() {
        if (this.hasBatchMode()) {
          // In batch mode, remember event but do not throw (yet)
          this.__hadChangeEventInBatchMode__P_202_3 = true;
        } else {
          // If not in batch mode, throw event
          this.fireEvent("changeSelection");
        }
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this.__selectedRangeArr__P_202_0 = null;
    }
  });
  qx.ui.table.selection.Model.$$dbClassInfo = $$dbClassInfo;
})();
//# sourceMappingURL=package-13.js.map?dt=1651047783905
qx.$$packageData['13'] = {
  "locales": {},
  "resources": {},
  "translations": {
    "en": {}
  }
};
