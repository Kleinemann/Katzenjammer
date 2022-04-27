/* ************************************************************************

   Copyright: 2022 undefined

   License: MIT license

   Authors: undefined

************************************************************************ */

qx.Theme.define("katzenjammer.theme.Appearance",
{
  extend : qx.theme.indigo.Appearance,

  appearances :
  {
	  "WindowBase":
	  {
		  style: function ()
		  {
			  return {				  
				  decorator: "round",
				  margin: 5,
				  padding: 5
			  }
		  }
	  },

	  "Link":
	  {
		  alias: "label",

		  style: function (states)
		  {
			  return {
				  //textAlign: "center",
				  textColor: states.hovered ? undefined :"link"
			  };
		  }
	  },
  }
});