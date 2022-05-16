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
        Position: { init: null },

        Icon: { init: null },
        Quest: { init: null, nullable: true }
    },

    construct: function (buildingData)
    {
        this.base(arguments);

        var buildingBase = katzenjammer.data.GameData.Buildings[buildingData.building_id];

        this.setID(buildingData.id);
        this.setName(buildingData.name !== null ? buildingData.name : buildingBase.name);
        this.setBuildingId(buildingBase.id);

        var iconId = buildingData.icon_id !== null ? buildingData.icon_id : buildingBase.icon_id;
        this.setIcon(katzenjammer.data.GameData.Icons[iconId]);

        this.setPosition(typeof buildingData.position !== 'string' ? buildingData.position : JSON.parse(buildingData.position));
    },

    members:
    {
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
