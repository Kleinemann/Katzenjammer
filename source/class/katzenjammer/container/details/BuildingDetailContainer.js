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
        Quest: { init: null, nullable: true },

        Heroes: { init: null, nullable: true },

        BuyHeroCont: { init: null }
    },

    construct: function ()
    {
        var layout = new qx.ui.layout.VBox(3);
        this.base(arguments, layout);

        this.setName(new qx.ui.basic.Label("###"));
        this.setDescription(new qx.ui.basic.Label("###"));

        var buyCont = new qx.ui.container.Composite(new qx.ui.layout.HBox(3));
        buyCont.add(new qx.ui.basic.Label("Neuer Bewohner: "));
        this.setBuyHeroCont(new qx.ui.container.Composite(new qx.ui.layout.HBox(3)));
        buyCont.add(this.getBuyHeroCont());

        this.add(buyCont);
    },

    members:
    {
        load: function (userBuilding)
        {
            var buildingBase = katzenjammer.data.GameData.Buildings[userBuilding.getBuildingId()];

            this.getName().setValue(userBuilding.getName());
            this.getDescription().setValue(buildingBase.text);

            if (this.getQuest() !== null)
                this.remove(this.getQuest());

            this.setQuest(userBuilding.getQuest().getItem());
            this.add(this.getQuest());

            var cont = this.getBuyHeroCont();
            cont.removeAll();

            for (var i in buildingBase.heroes)
            {
                var hero = katzenjammer.data.GameData.Heroes[buildingBase.heroes[i]];
                cont.add(new qx.ui.basic.Label(hero.name));
            }
        }
    }
});
