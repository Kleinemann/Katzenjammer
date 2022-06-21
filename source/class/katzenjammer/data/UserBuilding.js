/* global katzenjammer */
/**
*
 * @asset(katzenjammer/*)
*
**/
qx.Class.define("katzenjammer.data.UserBuilding", {
    extend: katzenjammer.data.GameItem,

    statics:
    {
    },

    properties:
    {
        BuildingId: { init: null },
        Heroes: { init: null, nullable: true },
        Quest: { init: null, nullable: true }
    },

    construct: function (buildingData)
    {
        this.updateArguments(buildingData);

        this.base(arguments, buildingData);

        this.setBuildingId(buildingData.building_id);
    },

    members:
    {
        updateArguments: function(data)
        {
            var baseBuilding = katzenjammer.data.GameData.Buildings[data.building_id];

            data.text = baseBuilding.text;

            if(data.icon_id === null)
                data.icon_id = baseBuilding.icon_id;

            if (data.name === null)
                data.name = baseBuilding.name;
        },

        getItem: function ()
        {
            var item = new qx.ui.container.Composite(new qx.ui.layout.Dock()).set({paddingLeft: 10, paddingRight: 10});
            item.setUserData("data", this);

            item.add(new qx.ui.basic.Label("(" + this.getID() + ")"), { edge: "west" });

            var lblName = new qx.ui.basic.Atom(this.getName(), this.getIcon().iconUrl);
            lblName.addListener("click", function (e)
            {
                var pos = this.getPosition();
                katzenjammer.container.MapContainer.Instance.movePosition(pos, 15);                
            }, this);

            item.add(lblName, { edge: "west" });


            var btnopen = new qx.ui.form.Button("Details");

            btnopen.addListener("execute", function (e)
            {
                katzenjammer.container.MainContainer.Instance.loadingBuilding(this);
            }, this);

            item.add(btnopen, { edge: "east" });

            return item;
		}
    }
});
