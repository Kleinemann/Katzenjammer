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
      "qx.ui.layout.VBox": {
        "construct": true
      },
      "qx.ui.table.model.Simple": {},
      "qx.ui.table.columnmodel.Resize": {},
      "qx.ui.table.Table": {},
      "qx.ui.table.selection.Model": {},
      "katzenjammer.data.ServiceRequest": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* global katzenjammer */

  /**
  *
  **/
  qx.Class.define("katzenjammer.container.lists.NewsContainer", {
    extend: qx.ui.container.Composite,
    statics: {},
    properties: {
      Table: {
        init: null
      },
      TableModel: {
        init: null
      }
    },
    construct: function construct() {
      var layout = new qx.ui.layout.VBox(3);
      qx.ui.container.Composite.constructor.call(this, layout);
      this.initTable();
      this.updateData();
    },
    members: {
      initTable: function initTable() {
        var tm = new qx.ui.table.model.Simple();
        tm.setColumns(["Header"]);
        this.setTableModel(tm);
        var custom = {
          tableColumnModel: function tableColumnModel(obj) {
            return new qx.ui.table.columnmodel.Resize(obj);
          }
        };
        var table = new qx.ui.table.Table(tm, custom);
        table.setStatusBarVisible(false);
        table.setColumnVisibilityButtonVisible(false);
        table.getSelectionModel().setSelectionMode(qx.ui.table.selection.Model.NO_SELECTION);
        this.setTable(table);
        this.add(table, {
          flex: 1
        });
      },
      updateData: function updateData() {
        var data = {
          Action: "select",
          Data: "News"
        };
        var req = new katzenjammer.data.ServiceRequest(data);
        req.addListener("success", function (e) {
          var response = e.getTarget().getResponse(); //console.log(response);

          if (response.success) {
            var data = e.getTarget().getTable();
            this.getTableModel().setData(data);
          }
        }, this);
        req.send();
      }
    }
  });
  katzenjammer.container.lists.NewsContainer.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=NewsContainer.js.map?dt=1652417291650