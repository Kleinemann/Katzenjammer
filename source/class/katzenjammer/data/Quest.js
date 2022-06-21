/* global katzenjammer */
/**
*
 * @asset(katzenjammer/*)
*
**/
qx.Class.define("katzenjammer.data.Quest", {
    extend: katzenjammer.data.GameItem,

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
        UserBuilding: { init: null },

        Conditions: { init: null },
    },

    construct: function (questData)
    {
        this.base(arguments, questData);

        this.setConditions(JSON.parse(questData.conditions));

        this.setUserBuilding(katzenjammer.data.User.Instance.getBuildings()[questData.user_building_id].getItem());
    },

    members:
    {
        getHeroTree: function ()
        {
            var cont = new qx.ui.container.Composite(new qx.ui.layout.Flow(5));

            var heroes = this.getConditions().Heroes;
            for (var i in heroes)
            {
                var row = heroes[i];
                if (Array.isArray(row))
                {
                    var subCont = new qx.ui.container.Composite(new qx.ui.layout.Flow(3));
                    subCont.add(new qx.ui.basic.Label("["));

                    for (var j in row)
                    {
                        var subRow = row[j];
                        var hero = this.getHeroTreeItem(subRow);
                        subCont.add(hero);
                    }
                    subCont.add(new qx.ui.basic.Label("]"));
                    cont.add(subCont);
                }
                else
                {
                    var hero = this.getHeroTreeItem(row);
                    cont.add(hero);
                }

            }
            return cont;
        },


        getHeroTreeItem: function (itemData)
        {
            var cont = new qx.ui.container.Composite(new qx.ui.layout.Flow(3));
            if (itemData.count > 1)
                cont.add(new qx.ui.basic.Label(itemData.count + "x"));

            cont.add(new qx.ui.basic.Label(katzenjammer.data.GameData.Heroes[itemData.id].name));
            return cont;
        },


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
