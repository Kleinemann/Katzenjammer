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
qx.Class.define("katzenjammer.Application",
{
  extend : qx.application.Standalone,



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * This method contains the initial application code and gets called 
     * during startup of the application
     * 
     * @lint ignoreDeprecated(alert)
     */
    main : function()
    {
      // Call super class
      this.base(arguments);

      // Enable logging in debug variant
      if (qx.core.Environment.get("qx.debug"))
      {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;
        // support additional cross-browser console. Press F7 to toggle visibility
        qx.log.appender.Console;
      }

      /*
      -------------------------------------------------------------------------
        Below is your actual application code...
      -------------------------------------------------------------------------
      */

      katzenjammer.data.GameData.initGameData();


      // Document is the application root
      var doc = this.getRoot();

       doc.add(new katzenjammer.container.MainContainer, { width: "100%", height: "100%" });
    }
  }
});