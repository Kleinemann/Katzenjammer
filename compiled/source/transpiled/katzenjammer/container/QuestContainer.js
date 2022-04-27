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
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* global katzenjammer */

  /**
  *
  **/
  qx.Class.define("katzenjammer.container.QuestContainer", {
    extend: qx.ui.container.Composite,
    statics: {},
    properties: {},
    construct: function construct() {
      var layout = new qx.ui.layout.VBox(3);
      qx.ui.container.Composite.constructor.call(this, layout);
    },
    members: {}
  });
  katzenjammer.container.QuestContainer.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=QuestContainer.js.map?dt=1649864730583