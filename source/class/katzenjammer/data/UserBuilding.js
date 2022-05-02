/* global katzenjammer */
/**
*
 * @asset(katzenjammer/*)
*
**/
qx.Class.define("katzenjammer.data.UserBuilding", {
    extend: qx.core.Object,

    statics:
    {
    },

    properties:
    {
        ID: { init: null },
        BuildingId: { init: null },
        Name: { init: null },
        Position: { init: null }
    },

    construct: function (buildingData)
    {
        this.base(arguments);

        var buildingBase = katzenjammer.data.GameData.Buildings[buildingData.id];

        this.setID(buildingData.id);
        this.setName(buildingData.name !== null ? buildingData.name : buildingBase.name);
        this.setPosition(typeof buildingData.position !== 'string' ? buildingData.position : JSON.parse(buildingData.position));
    },

    members:
    {
        getItem: function ()
        {
            var item = new qx.ui.container.Composite(new qx.ui.layout.HBox(3));

            item.add(new qx.ui.basic.Label("(" + this.getID() + ")"));

            var lblName = new qx.ui.basic.Label(this.getName());
            item.add(lblName);


            var lblPosition = new qx.ui.basic.Label("#");
            lblPosition.setUserData("data", this.getPosition());

            lblPosition.addListener("click", function (e)
            {
                var lbl = e.getTarget();
                var data = lbl.getUserData("data");
                var pos = [data.lat, data.lon];
                katzenjammer.container.MapContainer.Instance.movePosition(pos, 17);
            }, this);

            item.add(lblPosition);

            return item;
		}
    }
});
