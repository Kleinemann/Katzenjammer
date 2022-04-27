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
      },
      "qx.ui.form.TextField": {
        "construct": true
      },
      "qx.ui.basic.Label": {
        "construct": true
      },
      "qx.ui.form.Button": {
        "construct": true
      },
      "katzenjammer.data.ServiceRequest": {},
      "katzenjammer.container.MapContainer": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* global katzenjammer */

  /**
  *
  **/
  qx.Class.define("katzenjammer.widgets.PosSearch", {
    extend: qx.ui.container.Composite,
    statics: {},
    properties: {
      SearchField: {
        init: null
      }
    },
    construct: function construct() {
      var layout = new qx.ui.layout.HBox(3);
      qx.ui.container.Composite.constructor.call(this, layout);
      this.setSearchField(new qx.ui.form.TextField());
      this.add(new qx.ui.basic.Label("Adresse"));
      this.add(this.getSearchField(), {
        flex: 1
      });
      var btnSearch = new qx.ui.form.Button("Suchen");
      this.add(btnSearch);
      btnSearch.addListener("execute", this.searchPos, this);
      this.getSearchField().addListener("keyup", function (e) {
        if (e.getKeyCode() !== 13) return;
        this.searchPos();
      }, this);
    },
    members: {
      searchPos: function searchPos(e) {
        var txt = this.getSearchField().getValue();
        var req = katzenjammer.data.ServiceRequest.SearchAdressRequest(txt);
        req.addListener("success", function (e) {
          var response = e.getTarget().getResponse();

          if (response.length === 1) {
            var pos = [response[0].lat, response[0].lon];
            katzenjammer.container.MapContainer.Instance.createMarker(pos, this);
          } else console.log("Not Found");
        }, this);
        req.send();
      },
      updateMarker: function updateMarker(pos) {
        var req = katzenjammer.data.ServiceRequest.SearchAdressRevertRequest(pos);
        req.addListener("success", function (e) {
          var response = e.getTarget().getResponse();
          this.getSearchField().setValue(response.display_name);
        }, this);
        req.send();
      }
    }
  });
  katzenjammer.widgets.PosSearch.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=PosSearch.js.map?dt=1651047783119