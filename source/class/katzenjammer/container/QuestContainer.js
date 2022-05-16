/* global katzenjammer */
/**
*
**/
qx.Class.define("katzenjammer.container.QuestContainer", {
    extend: qx.ui.container.Composite,

    statics:
    {
    },

    properties:
    {
        QuestList: { init: null }
    },

    construct: function ()
    {
        var layout = new qx.ui.layout.VBox(3);
        this.base(arguments, layout);

        this.initQuestContainer();
    },

    members:
    {
        initQuestContainer: function ()
        {
                var cont = new qx.ui.container.Composite(new qx.ui.layout.VBox(3));
                this.setQuestList(cont);
                this.add(cont);
        },

        updateQuestList: function () {
            var list = this.getQuestList();
            list.removeAll();

            var quests = katzenjammer.data.User.Instance.getQuests();
            for (var i in quests) {
                var item = quests[i].getItem();
                list.add(item);
            }

            katzenjammer.container.MapContainer.Instance.updateUserQuests();
        },

        addQuest: function (quest)
        {
            if (katzenjammer.data.User.Instance.getQuests() === null)
                katzenjammer.data.User.Instance.setQuests([]);

            katzenjammer.data.User.Instance.getQuests().push(quest);

            this.updateQuestList();
        }
    }
});
