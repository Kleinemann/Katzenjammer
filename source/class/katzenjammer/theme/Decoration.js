/* ************************************************************************

   Copyright: 2022 undefined

   License: MIT license

   Authors: undefined

************************************************************************ */

qx.Theme.define("katzenjammer.theme.Decoration",
{
  extend : qx.theme.indigo.Decoration,

  decorations :
  {
	  "round":
	  {
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