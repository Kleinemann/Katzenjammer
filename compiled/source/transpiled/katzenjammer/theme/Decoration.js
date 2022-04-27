(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Theme": {
        "usage": "dynamic",
        "require": true
      },
      "qx.theme.indigo.Decoration": {
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
  qx.Theme.define("katzenjammer.theme.Decoration", {
    extend: qx.theme.indigo.Decoration,
    decorations: {
      "round": {
        style: {
          radius: 10,
          backgroundColor: "background-window",
          width: 1,
          color: "border",
          style: "solid"
        }
      }
    }
  });
  katzenjammer.theme.Decoration.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Decoration.js.map?dt=1650445295658