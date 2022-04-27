(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Theme": {
        "usage": "dynamic",
        "require": true
      },
      "katzenjammer.theme.Color": {
        "require": true
      },
      "katzenjammer.theme.Decoration": {
        "require": true
      },
      "katzenjammer.theme.Font": {
        "require": true
      },
      "qx.theme.icon.Tango": {
        "require": true
      },
      "katzenjammer.theme.Appearance": {
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
  qx.Theme.define("katzenjammer.theme.Theme", {
    meta: {
      color: katzenjammer.theme.Color,
      decoration: katzenjammer.theme.Decoration,
      font: katzenjammer.theme.Font,
      icon: qx.theme.icon.Tango,
      appearance: katzenjammer.theme.Appearance
    }
  });
  katzenjammer.theme.Theme.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Theme.js.map?dt=1647522567194