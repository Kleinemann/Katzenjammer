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
      "qx.ui.container.Composite": {
        "construct": true,
        "require": true
      },
      "qx.ui.layout.Dock": {
        "construct": true
      },
      "qx.ui.basic.Label": {
        "construct": true
      },
      "qx.ui.layout.HBox": {},
      "qx.ui.form.Button": {},
      "katzenjammer.container.MainContainer": {},
      "katzenjammer.data.User": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "qx.libraryInfoMap": {}
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* global katzenjammer */

  /**
  *
   * @asset(katzenjammer/*)
  *
  **/
  qx.Class.define("katzenjammer.container.Header", {
    extend: qx.ui.container.Composite,
    statics: {},
    properties: {
      PlayerCont: {
        init: null
      },
      PlayerName: {
        init: null
      },
      Money: {
        init: null
      }
    },
    construct: function construct() {
      var layout = new qx.ui.layout.Dock(3);
      qx.ui.container.Composite.constructor.call(this, layout);
      this.setBackgroundColor("yellow");
      this.add(new qx.ui.basic.Label("KATZENJAMMER"), {
        edge: "west"
      });
      this.add(new qx.ui.basic.Label(" (v. " + this.getVersion() + ")"), {
        edge: "west"
      });
      this.setPlayerCont(this.initPlayerCont());
      this.add(this.getPlayerCont(), {
        edge: "east"
      });
      this.refresh();
    },
    members: {
      getVersion: function getVersion() {
        var lim = qx.core.Environment.get('qx.libraryInfoMap'); // get the map

        var ver = lim['katzenjammer']['version']; // get the 'version' of the library 'myProj'

        return ver;
      },
      initPlayerCont: function initPlayerCont() {
        var cont = new qx.ui.container.Composite(new qx.ui.layout.HBox(3));
        cont.add(new qx.ui.basic.Label("Name: "));
        this.setPlayerName(new qx.ui.basic.Label().set({
          minWidth: 100
        }));
        cont.add(this.getPlayerName());
        cont.add(new qx.ui.basic.Label("Gold: "));
        this.setMoney(new qx.ui.basic.Label().set({
          minWidth: 100
        }));
        cont.add(this.getMoney());
        var btnSubmit = new qx.ui.form.Button("Logout");
        btnSubmit.addListener("execute", function (e) {
          katzenjammer.container.MainContainer.Instance.loadingUser(null);
        }, this);
        cont.add(btnSubmit);
        cont.setVisibility("excluded");
        return cont;
      },
      refresh: function refresh() {
        var user = katzenjammer.data.User.Instance;

        if (user.getID() !== null) {
          this.getPlayerCont().setVisibility("visible");
          this.getPlayerName().setValue(user.getName());
          this.getMoney().setValue(user.getMoney());
        } else {
          this.getPlayerCont().setVisibility("excluded");
        }
      }
    }
  });
  katzenjammer.container.Header.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Header.js.map?dt=1650890902992