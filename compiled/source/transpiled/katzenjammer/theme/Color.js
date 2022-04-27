(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Theme": {
        "usage": "dynamic",
        "require": true
      },
      "qx.theme.indigo.Color": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     Copyright: 2022 undefined
  
     License: MIT license
  
     Authors: undefined
  
  ************************************************************************ */
  qx.Theme.define("katzenjammer.theme.Color", {
    extend: qx.theme.indigo.Color,
    colors: {
      "background-window": "#EEEEEE",
      "border": "#000000",
      "black": "#000000",
      "link": "#5555FF"
    }
  });
  katzenjammer.theme.Color.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Color.js.map?dt=1650381506066