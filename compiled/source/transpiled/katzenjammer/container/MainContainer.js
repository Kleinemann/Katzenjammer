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
      "katzenjammer.data.User": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.layout.Grid": {
        "construct": true
      },
      "katzenjammer.container.Header": {},
      "katzenjammer.container.MapContainer": {},
      "katzenjammer.container.LoginContainer": {},
      "katzenjammer.container.RegisterContainer": {},
      "katzenjammer.container.QuestContainer": {},
      "katzenjammer.container.lists.TopPlayerContainer": {},
      "katzenjammer.container.lists.NewsContainer": {},
      "katzenjammer.container.lists.UpdatesContainer": {},
      "katzenjammer.container.lists.BuildingsContainer": {},
      "qx.ui.layout.VBox": {},
      "qx.ui.form.TextField": {},
      "katzenjammer.data.ServiceRequest": {},
      "katzenjammer.widgets.WindowBase": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* global katzenjammer */

  /**
  *
   * @asset(katzenjammer/*)
   * (katzenjammer/leaflet/*)
   * (katzenjammer/leaflet/images)
   * (katzenjammer/leaflet/routing/leaflet-routing-machine.js)
  *
  **/
  qx.Class.define("katzenjammer.container.MainContainer", {
    extend: qx.ui.container.Composite,
    statics: {
      Instance: null,
      ContainerSettings: {
        "Header": {
          "name": null,
          "isWindow": false
        },
        "Map": {
          "name": null,
          "isWindow": true
        },
        "Login": {
          "name": "Login",
          "isWindow": true
        },
        "Register": {
          "name": "Registrieren",
          "isWindow": true
        },
        "Update": {
          "name": "Updates",
          "isWindow": true
        },
        "News": {
          "name": "News",
          "isWindow": true
        },
        "TopPlayer": {
          "name": "Top-Spieler",
          "isWindow": true
        },
        "Quests": {
          "name": "Quests",
          "isWindow": true
        },
        "Buildings": {
          "name": "Gebäude",
          "isWindow": true,
          "subbody": "NewBuilding",
          "subheader": "BuildingHeader"
        }
      },
      Layouts: {
        "start": {
          "Header": {
            row: 0,
            column: 0,
            colSpan: 3
          },
          "Map": {
            row: 1,
            column: 0,
            colSpan: 2
          },
          "Login": {
            row: 1,
            column: 2
          },
          "Update": {
            row: 2,
            column: 0
          },
          "News": {
            row: 2,
            column: 1
          },
          "TopPlayer": {
            row: 2,
            column: 2
          }
        },
        "default": {
          "Header": {
            row: 0,
            column: 0,
            colSpan: 3
          },
          "Map": {
            row: 1,
            column: 0,
            colSpan: 2
          },
          "Quests": {
            row: 1,
            column: 2
          },
          "Buildings": {
            row: 2,
            column: 0
          },
          "News": {
            row: 2,
            column: 1
          },
          "TopPlayer": {
            row: 2,
            column: 2
          }
        }
      }
    },
    properties: {
      User: {
        init: katzenjammer.data.User.getInstance()
      },
      CurrentLayout: {
        init: null
      },
      Header: {
        init: null,
        nullable: true
      },
      Map: {
        init: null,
        nullable: true
      },
      Login: {
        init: null,
        nullable: true
      },
      Register: {
        init: null,
        nullable: true
      },
      Update: {
        init: null,
        nullable: true
      },
      News: {
        init: null,
        nullable: true
      },
      TopPlayer: {
        init: null,
        nullable: true
      },
      Quests: {
        init: null,
        nullable: true
      },
      Buildings: {
        init: null,
        nullable: true
      }
    },
    construct: function construct() {
      var layout = new qx.ui.layout.Grid(0, 0);
      layout.setColumnFlex(0, 1);
      layout.setColumnFlex(1, 1);
      layout.setColumnFlex(2, 1);
      layout.setRowFlex(0, 0);
      layout.setRowFlex(1, 2);
      layout.setRowFlex(2, 1);
      qx.ui.container.Composite.constructor.call(this, layout);
      katzenjammer.container.MainContainer.Instance = this;
      this.setBackgroundColor("#CCCCCC");
      this.loadingLayout("start");
    },
    members: {
      equalPosition: function equalPosition(a, b) {
        if ((a === undefined || b === undefined) && a !== b) return false;

        for (var i in a) {
          if (b[i] === undefined || a[i] !== b[i]) return false;
        }

        return true;
      },
      loadingLayout: function loadingLayout(layoutName) {
        var oldPositions = katzenjammer.container.MainContainer.Layouts[this.getCurrentLayout()];
        this.setCurrentLayout(layoutName);
        var positions = katzenjammer.container.MainContainer.Layouts[layoutName];
        var remove = [];
        var skip = [];

        for (var i in oldPositions) {
          if (positions[i] !== undefined && this.equalPosition(oldPositions[i], positions[i])) skip.push(i);else remove.push(i);
        }

        for (var i in remove) {
          var oldWindow = this.getLayout().getCellWidget(oldPositions[remove[i]].row, oldPositions[remove[i]].column);
          this.remove(oldWindow);
        }

        for (var i in positions) {
          if (this.get(i) !== null) this.set(i, null);
          if (skip.indexOf(i) === -1) this.loadWindow(i, positions[i]);
        }
      },
      initContainerByName: function initContainerByName(name) {
        switch (name) {
          case "Header":
            return new katzenjammer.container.Header();
            break;

          case "Map":
            return new katzenjammer.container.MapContainer();
            break;

          case "Login":
            return new katzenjammer.container.LoginContainer();
            break;

          case "Register":
            return new katzenjammer.container.RegisterContainer();
            break;

          case "Quests":
            return new katzenjammer.container.QuestContainer();
            break;

          case "TopPlayer":
            return new katzenjammer.container.lists.TopPlayerContainer();
            break;

          case "News":
            return new katzenjammer.container.lists.NewsContainer();
            break;

          case "Update":
            return new katzenjammer.container.lists.UpdatesContainer();
            break;

          case "Buildings":
            return new katzenjammer.container.lists.BuildingsContainer();
            break;

          default:
            return undefined;
        }
      },
      initSearch: function initSearch() {
        var cont = new qx.ui.container.Composite(new qx.ui.layout.VBox(3));
        var txtSearch = new qx.ui.form.TextField();
        cont.add(txtSearch);
        txtSearch.addListener("keyup", function (e) {
          if (e.getKeyCode() !== 13) return;
          var req = katzenjammer.data.ServiceRequest.SearchAdressRequest(txtSearch.getValue());
          req.addListener("success", function (e) {
            var response = e.getTarget().getResponse();

            if (response.length === 1) {
              console.log(response[0]);
              var pos = [response[0].lat, response[0].lon];
              this.getMap().movePosition(pos);
            } else console.log("Not Found");
          }, this);
          req.send();
        }, this);
        var window = new katzenjammer.widgets.WindowBase("Search", cont);
        return window;
      },
      switchWindow: function switchWindow(oldName, newName) {
        var positions = katzenjammer.container.MainContainer.Layouts[this.getCurrentLayout()];
        var position = positions[oldName] !== undefined ? positions[oldName] : positions[newName];
        var oldWindow = this.getLayout().getCellWidget(position.row, position.column);

        if (oldWindow !== null) {
          this.remove(oldWindow);
          this.reset(oldName);
        }

        this.loadWindow(newName, position);
      },
      loadWindow: function loadWindow(windowName, position) {
        var contSettings = katzenjammer.container.MainContainer.ContainerSettings[windowName];
        var window = this.get(windowName) !== null ? this.get(windowName) : this.initContainerByName(windowName);
        if (contSettings !== undefined && window !== undefined) this.set(windowName, window);
        var header = contSettings.subheader !== undefined ? window.get(contSettings.subheader) : contSettings.name;

        if (contSettings.isWindow) {
          if (contSettings.subbody !== undefined) this.add(new katzenjammer.widgets.WindowBase(header, window, window.get(contSettings.subbody)), position);else this.add(new katzenjammer.widgets.WindowBase(header, window), position);
        } else this.add(window, position);
      },
      loadingUser: function loadingUser(args) {
        this.getUser().loadingUser(args);
        this.getHeader().refresh();

        if (args === null) {
          this.getMap().moveRandomPos();
          this.loadingLayout("start");
        } else {
          this.loadingLayout("default");
          var home = JSON.parse(this.getUser().getHome());

          if (home !== null) {
            var map = katzenjammer.container.MapContainer.Instance;
            map.movePosition([home.lat, home.lon], home.zoom);
          } else this.getMap().moveRandomPos();
        }
      }
    }
  });
  katzenjammer.container.MainContainer.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MainContainer.js.map?dt=1651225080478