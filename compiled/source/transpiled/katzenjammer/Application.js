(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.application.Standalone": {
        "require": true
      },
      "qx.log.appender.Native": {},
      "qx.log.appender.Console": {},
      "katzenjammer.container.MainContainer": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     Copyright: 2022 undefined
  
     License: MIT license
  
     Authors: undefined
  
  ************************************************************************ */

  /**
   * This is the main application class of "katzenjammer"
   *
   * @asset(katzenjammer/*)
   */
  qx.Class.define("katzenjammer.Application", {
    extend: qx.application.Standalone,

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      /**
       * This method contains the initial application code and gets called 
       * during startup of the application
       * 
       * @lint ignoreDeprecated(alert)
       */
      main: function main() {
        // Call super class
        katzenjammer.Application.superclass.prototype.main.call(this); // Enable logging in debug variant

        {
          // support native logging capabilities, e.g. Firebug for Firefox
          qx.log.appender.Native; // support additional cross-browser console. Press F7 to toggle visibility

          qx.log.appender.Console;
        }
        /*
        -------------------------------------------------------------------------
          Below is your actual application code...
        -------------------------------------------------------------------------
        */
        // Document is the application root

        var doc = this.getRoot();
        doc.add(new katzenjammer.container.MainContainer(), {
          width: "100%",
          height: "100%"
        });
      }
    }
  });
  katzenjammer.Application.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Application.js.map?dt=1649863690652