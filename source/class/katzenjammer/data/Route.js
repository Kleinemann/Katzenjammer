/* global katzenjammer */
/**
*
 * @asset(katzenjammer/*)
*
**/
qx.Class.define("katzenjammer.data.Route", {
    extend: qx.core.Object,

    statics:
    {
    },

    properties:
    {
        Item1: { init: null },
        Item2: { init: null },

        Path: { init: null }

    },

    construct: function (item1, item2)
    {
        this.base(arguments);

        //need switch ?
        if(item.basename = "")

        this.setItem1(item1);
        this.setItem2(item1);
    },

    members:
    {
 
    }
});
