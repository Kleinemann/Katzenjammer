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

  /* global katzenjammer */

  /**
  *
   * @asset(katzenjammer/*)
  *
  **/
  qx.Class.define("katzenjammer.data.blubb", {
    extend: qx.core.Object,
    statics: {},
    properties: {},
    construct: function construct() {
      qx.core.Object.constructor.call(this);
    },
    members: {}
  });
  katzenjammer.data.blubb.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=blubb.js.map?dt=1649847864730