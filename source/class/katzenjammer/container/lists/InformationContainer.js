/* global katzenjammer */
/**
*
**/
qx.Class.define("katzenjammer.container.lists.InformationContainer", {
    extend: qx.ui.container.Composite,

    statics:
    {
    },

    properties:
    {
        Table: { init: null },
        TableModel: { init: null }
    },

    construct: function ()
    {
        var layout = new qx.ui.layout.VBox(3);
        this.base(arguments, layout);
    },

    members:
    {
        addInformation: function (info)
        {
            this.add(new qx.ui.basic.Label(info));
        }
    }
});
