(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
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
  qx.Class.define("katzenjammer.data.Options", {
    //extend: qx.core.Object,
    type: "static",
    statics: {
      KEY: "415d1aeb-acd8-4a4d-9071-4c0649772cdf"
    }
  });
  katzenjammer.data.Options.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Options.js.map?dt=1650546347992