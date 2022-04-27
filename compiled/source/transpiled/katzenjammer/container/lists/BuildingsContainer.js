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
      "qx.ui.form.Button": {},
      "katzenjammer.widgets.PosSearch": {},
      "qx.ui.form.SelectBox": {},
      "katzenjammer.data.ServiceRequest": {},
      "qx.ui.form.ListItem": {},
      "qx.ui.basic.Label": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* global katzenjammer */

  /**
  *
  **/
  qx.Class.define("katzenjammer.container.lists.BuildingsContainer", {
    extend: qx.ui.container.Composite,
    statics: {},
    properties: {
      NewBuilding: {
        init: null
      },
      BuildingSelect: {
        init: null
      }
    },
    construct: function construct() {
      var layout = new qx.ui.layout.VBox(3);
      qx.ui.container.Composite.constructor.call(this, layout);
      this.initNewBuilding();
      this.initBuildingList();
    },
    members: {
      initNewBuilding: function initNewBuilding() {
        var cont = new qx.ui.container.Composite(new qx.ui.layout.VBox(3));
        var btnNew = new qx.ui.form.Button("Neu");
        cont.add(btnNew);
        cont.add(this.initBuildingSelect());
        cont.add(new katzenjammer.widgets.PosSearch());
        this.setNewBuilding(cont); //this.add(cont);
      },
      initBuildingSelect: function initBuildingSelect() {
        var box = new qx.ui.form.SelectBox();
        var data = {
          Action: "select",
          Data: "Buildings"
        };
        var req = new katzenjammer.data.ServiceRequest(data);
        req.addListener("success", function (e) {
          var response = e.getTarget().getResponse(); //console.log(response);

          if (response.success) {
            var data = response.data;

            for (i in data) {
              var building = data[i];
              box.add(new qx.ui.form.ListItem(building.name + " (" + building.money + ")"));
            }
          }
        }, this);
        req.send();
        return box;
      },
      initBuildingList: function initBuildingList() {
        var cont = new qx.ui.container.Composite(new qx.ui.layout.VBox(3));
        cont.add(new qx.ui.basic.Label("Gebäude"));
        this.add(cont);
      },
      updateData: function updateData() {
        var data = {
          Action: "select",
          Data: "Buildings"
        };
        var req = new katzenjammer.data.ServiceRequest(data);
        req.addListener("success", function (e) {
          var response = e.getTarget().getResponse(); //console.log(response);

          if (response.success) {
            var data = e.data;
            this.getTableModel().setData(data);
          }
        }, this);
        req.send();
      }
    }
  });
  katzenjammer.container.lists.BuildingsContainer.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=BuildingsContainer.js.map?dt=1650985735576