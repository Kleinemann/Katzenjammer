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
      "qx.ui.layout.HBox": {},
      "qx.ui.form.Button": {},
      "katzenjammer.widgets.PosSearch": {},
      "qx.ui.form.SelectBox": {},
      "katzenjammer.data.GameData": {},
      "qx.ui.form.ListItem": {},
      "katzenjammer.data.User": {},
      "katzenjammer.data.ServiceRequest": {},
      "katzenjammer.data.UserBuilding": {},
      "katzenjammer.container.MapContainer": {}
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
      BuildingHeader: {
        init: null
      },
      NewButton: {
        init: null
      },
      NewBuilding: {
        init: null
      },
      BuildingSelect: {
        init: null
      },
      SearchField: {
        init: null
      },
      BuildingList: {
        init: null
      }
    },
    construct: function construct() {
      var layout = new qx.ui.layout.VBox(3);
      qx.ui.container.Composite.constructor.call(this, layout);
      this.initBuildingHeader();
      this.initNewBuilding();
      this.initBuildingList();
    },
    members: {
      initBuildingHeader: function initBuildingHeader() {
        var cont = new qx.ui.container.Composite(new qx.ui.layout.HBox(3));
        var btnNew = new qx.ui.form.Button("Neu");
        this.setNewButton(btnNew);
        btnNew.addListener("execute", this.startBuilding, this);
        cont.add(btnNew);
        this.setBuildingHeader(cont);
      },
      initNewBuilding: function initNewBuilding() {
        var cont = new qx.ui.container.Composite(new qx.ui.layout.VBox(3));
        this.setSearchField(new katzenjammer.widgets.PosSearch());
        cont.add(this.getSearchField());
        var buildingSelect = new qx.ui.container.Composite(new qx.ui.layout.HBox(3));
        buildingSelect.add(this.createBuildingSelect(), {
          flex: 1
        });
        var btnBuild = new qx.ui.form.Button("Bauen");
        btnBuild.addListener("execute", this.buildBuiling, this);
        buildingSelect.add(btnBuild);
        cont.add(buildingSelect);
        this.setNewBuilding(cont);
      },
      createBuildingSelect: function createBuildingSelect() {
        var box = new qx.ui.form.SelectBox();
        var data = katzenjammer.data.GameData.Buildings;

        for (var i in data) {
          var building = data[i];
          var item = new qx.ui.form.ListItem(building.name + " (" + building.money + ")");
          item.setUserData("data", building);
          box.add(item);
        }

        this.setBuildingSelect(box);
        return box;
      },
      startBuilding: function startBuilding() {
        var user = katzenjammer.data.User.Instance;
        var uMoney = user.getMoney();
        var selectItems = this.getBuildingSelect().getChildren();
        var firstSelectable = null;

        for (var i in selectItems) {
          var item = selectItems[i];
          var itemData = item.getUserData("data");
          var enable = parseInt(itemData.money) <= parseInt(uMoney);
          item.setEnabled(enable);
          if (firstSelectable === null && enable) firstSelectable = item;
        }

        if (firstSelectable === null) this.getBuildingSelect().resetSelection();else this.getBuildingSelect().setSelection([firstSelectable]);
      },
      buildBuiling: function buildBuiling() {
        var cPos = this.getSearchField().getCurrentPos();
        var user = katzenjammer.data.User.Instance;
        var pos = {
          lat: cPos[0],
          lon: cPos[1],
          zoom: 15
        };
        if (user.getHome() === null) user.updateHome(pos);
        var building = this.getBuildingSelect().getSelection()[0].getUserData("data");
        var data = {
          Action: "buyBuilding",
          Data: {
            user_id: user.getID(),
            building_id: building.id,
            position: pos
          }
        };
        var req = new katzenjammer.data.ServiceRequest(data);
        req.addListener("success", function (e) {
          var response = e.getTarget().getResponse();

          if (response.success) {
            var buildings = katzenjammer.data.User.Instance.getBuildings();
            if (buildings === null) buildings = [];
            var data = response.data;

            for (var i in data) {
              buildings[data[i].id] = new katzenjammer.data.UserBuilding(data[i]);
            }

            this.setBuildings(buildings);
            this.updateBuildingList();
          }
        }, this);
        req.send();
      },
      initBuildingList: function initBuildingList() {
        var cont = new qx.ui.container.Composite(new qx.ui.layout.VBox(3));
        this.setBuildingList(cont);
        this.add(cont);
      },
      updateBuildingList: function updateBuildingList() {
        var list = this.getBuildingList();
        list.removeAll();
        var userBuildings = katzenjammer.data.User.Instance.getBuildings();

        for (var i in userBuildings) {
          var item = userBuildings[i].getItem();
          list.add(item);
        }

        katzenjammer.container.MapContainer.Instance.updateUserBuildings();
      }
    }
  });
  katzenjammer.container.lists.BuildingsContainer.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=BuildingsContainer.js.map?dt=1652417291683