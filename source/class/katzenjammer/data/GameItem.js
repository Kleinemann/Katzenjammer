/* global katzenjammer */
/**
*
 * @asset(katzenjammer/*)
*
**/
qx.Class.define("katzenjammer.data.GameItem", {
    extend: qx.core.Object,

    statics:
    {
    },

    properties:
    {
        ID: { init: null },
        Name: { init: null },
        Position: { init: null },
        Icon: { init: null },
        Description: { init: null }
    },

    construct: function (ItemData)
    {
        this.base(arguments);

        this.setID(ItemData.id);
        this.setName(ItemData.name);

        var iconId = ItemData.icon_id;
        this.setIcon(katzenjammer.data.GameData.Icons[iconId]);

        this.setPosition(typeof ItemData.position !== 'string' ? ItemData.position : JSON.parse(ItemData.position));

        this.setDescription(ItemData.text);
    },

    members:
    {
        getItem: function ()
        {
            console.error("MUSST BE OVERWRITTEN !");
		}
    }
});
