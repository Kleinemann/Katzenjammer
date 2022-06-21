/* global katzenjammer */
/**
*
**/
qx.Class.define("katzenjammer.container.details.QuestDetailContainer", {
    extend: qx.ui.container.Composite,

    statics:
    {
    },

    properties:
    {
        Name: { init: null },
        Description: { init: null },
        Quest: { init: null, nullable: true },

        HeroTree: { init: null, nullable: true },
        Building: { init: null, nullable: true }
    },

    construct: function () {
        var layout = new qx.ui.layout.VBox(3);
        this.base(arguments, layout);

        this.setName(new qx.ui.basic.Label("###"));
        this.setDescription(new qx.ui.basic.Label("###"));
    },

    members:
    {
        load: function (quest)
        {
            this.getName().setValue(quest.getName());
            this.getDescription().setValue(quest.getDescription());

            if (this.getQuest() !== null)
                this.resetQuest();

            this.setQuest(quest);

            if (this.getBuilding() !== null)
                this.remove(this.getBuilding());

            this.setBuilding(quest.getUserBuilding());
            this.add(this.getBuilding());

            this.showDetails();
        },


        showDetails: function ()
        {
            if (this.getHeroTree() !== null)
                this.remove(this.getHeroTree());

            var q = this.getQuest();
            this.setHeroTree(q.getHeroTree())
            this.add(this.getHeroTree());
        }
    }
});
