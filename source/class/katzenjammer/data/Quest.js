/* global katzenjammer */
/**
*
 * @asset(katzenjammer/*)
*
**/
qx.Class.define("katzenjammer.data.Quest", {
    extend: qx.core.Object,

    statics:
    {
        createNewQuest: function (userBuilding)
        {
            var quest = null;
            var data =
            {
                Action: "createQuest",
                Data: {
                    id: userBuilding.getID(),
                    building_id: userBuilding.getBuildingId(),
                    user: katzenjammer.data.User.Instance.getID(),
                    position: userBuilding.getPosition()
                }
            };

            var req = new katzenjammer.data.ServiceRequest(data);
            req.setAsync(false);

            req.addListener("success", function (e)
            {
                var response = e.getTarget().getResponse();

                if (response.success)
                {
                    console.log(JSON.stringify(response.data));
                    quest = new katzenjammer.data.Quest(response.data);

                    userBuilding.setQuest(quest);
                    quest.setUserBuilding(userBuilding);
                }
            }, this);
            req.send();

            return quest;
        }
    },

    properties:
    {
        Building: { init: null },

        ID: { init: null },
        Name: { init: null },
        Icon: { init: null },
        Position: { init: null },
        Description: { init: null },

        UserBuilding: { init: null },
    },

    construct: function (questData)
    {
        this.base(arguments);

        this.setID(questData.id);
        this.setName(questData.name);

        var pos = typeof questData.position !== 'string' ? questData.position : JSON.parse(questData.position);
        this.setPosition(typeof questData.position !== 'string' ? questData.position : JSON.parse(questData.position));

        this.setDescription(questData.text);

        var iconId = questData.icon_id !== null ? questData.icon_id : questData.icon_id;
        this.setIcon(katzenjammer.data.GameData.Icons[iconId]);

        var building = katzenjammer.data.User.Instance.getBuildings()[questData.user_building_id];

        this.setUserBuilding(building);
        building.setQuest(this);
    },

    members:
    {
        getItem: function ()
        {
            var item = new qx.ui.container.Composite(new qx.ui.layout.Dock()).set({ paddingLeft: 10, paddingRight: 10 });

            item.setUserData("data", this);

            item.add(new qx.ui.basic.Label("(" + this.getID() + ")"), { edge: "west" });

            var lblName = new qx.ui.basic.Atom(this.getName(), this.getIcon().iconUrl);
            lblName.addListener("click", function (e) {
                var pos = this.getPosition();
                katzenjammer.container.MapContainer.Instance.movePosition(pos, 15);
            }, this);

            item.add(lblName, { edge: "west" });

            var btnopen = new qx.ui.form.Button("Details");

            btnopen.addListener("execute", function (e) {
                katzenjammer.container.MainContainer.Instance.loadingQuest(this);
            }, this);

            item.add(btnopen, { edge: "east" });

            return item;
		}
    }
});
