(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Theme": {
        "usage": "dynamic",
        "require": true
      },
      "qx.theme.indigo.Appearance": {
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
  qx.Theme.define("katzenjammer.theme.Appearance", {
    extend: qx.theme.indigo.Appearance,
    appearances: {
      "WindowBase": {
        style: function style() {
          return {
            decorator: "round",
            margin: 5,
            padding: 5
          };
        }
      },
      "Link": {
        alias: "label",
        style: function style(states) {
          return {
            //textAlign: "center",
            textColor: states.hovered ? undefined : "link"
          };
        }
      }
    }
  });
  katzenjammer.theme.Appearance.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Appearance.js.map?dt=1650445365272