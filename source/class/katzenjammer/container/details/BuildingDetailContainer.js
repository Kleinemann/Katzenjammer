/* global katzenjammer */
/**
*
**/
qx.Class.define("katzenjammer.container.details.BuildingDetailContainer", {
    extend: qx.ui.container.Composite,

    statics:
    {
    },

    properties:
    {
        Name: { init: null },
        Description: { init: null },
        Building: { init: null },
        Quest: { init: null, nullable: true },

        Heroes: { init: null, nullable: true },

        HeroList: { init: null },
        QuestBox: { init: null },
        BuyHeroCont: { init: null }
    },

    construct: function ()
    {
        var layout = new qx.ui.layout.Dock(3);//new qx.ui.layout.VBox(3);
        this.base(arguments, layout);

        this.setName(new qx.ui.basic.Label("###"));
        this.setDescription(new qx.ui.basic.Label("###"));

        this.initBuyHeroCont();

        this.initHeroes();
    },

    members:
    {
        initHeroes: function()
        {
            var cont = new qx.ui.container.Composite(new qx.ui.layout.VBox(3));
            this.setHeroList(cont);
            this.add(cont);
        },


        initBuyHeroCont: function ()
        {
            var cont = new qx.ui.container.Composite(new qx.ui.layout.HBox(3));
            cont.add(new qx.ui.basic.Label("Neuer Bewohner: "));

            var heroCont = new qx.ui.container.Composite(new qx.ui.layout.HBox(3));

            this.setBuyHeroCont(heroCont);
            cont.add(heroCont);
            this.add(cont, { edge: "south" });
        },

        load: function (userBuilding) {
            var buildingBase = katzenjammer.data.GameData.Buildings[userBuilding.getBuildingId()];

            this.setBuilding(userBuilding);

            this.getName().setValue(userBuilding.getName());
            this.getDescription().setValue(buildingBase.text);

            if (this.getQuest() !== null)
                this.remove(this.getQuest());

            if (userBuilding.getQuest() !== null)
            {
                this.setQuest(userBuilding.getQuest().getItem());
                this.add(this.getQuest(), { edge: "south" });
            }

            var heroList = this.getHeroList();
            heroList.removeAll();
            for (var i in userBuilding.getHeroes())
            {
                var hero = userBuilding.getHeroes()[i];
                var icon = katzenjammer.data.GameData.Icons[hero.icon_id].iconUrl;
                var heroItem = new qx.ui.form.ListItem(hero.name, icon);
                heroList.add(heroItem);
            }

            var cont = this.getBuyHeroCont();
            cont.removeAll();

            for (var i in buildingBase.heroes)
            {
                var hero = katzenjammer.data.GameData.Heroes[buildingBase.heroes[i]];
                var userMoney = katzenjammer.data.User.Instance.getMoney();

                var icon = katzenjammer.data.GameData.Icons[hero.icon_id].iconUrl;
                var btnNewHero = new qx.ui.form.Button(hero.name + " (" + hero.money + ")", icon);
                btnNewHero.setUserData("data", hero);
                btnNewHero.addListener("execute", function (e)
                {
                    var data = e.getTarget().getUserData("data");
                    this.buyHero(data);
                }, this);

                btnNewHero.setEnabled(parseInt(userMoney) >= parseInt(hero.money));

                cont.add(btnNewHero);
            }
        },


        buyHero: function (hero)
        {
            var data =
            {
                Action: "buyHero",
                Data: {
                    user_id: katzenjammer.data.User.Instance.getID(),
                    hero_id: hero.id,
                    building_id: this.getBuilding().getID()
                }
            }

            var req = new katzenjammer.data.ServiceRequest(data);
            req.addListener("success", function (e) {
                var response = e.getTarget().getResponse();

                if (response.success)
                {
                    console.log("gekauft");
                }
            }, this);
            req.send();
        }
    }
});
