(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.container.Composite": {
        "construct": true,
        "require": true
      },
      "qx.ui.layout.VBox": {
        "construct": true
      },
      "katzenjammer.data.User": {},
      "katzenjammer.container.MapContainer": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* global katzenjammer */

  /**
  *
  **/
  qx.Class.define("katzenjammer.container.QuestContainer", {
    extend: qx.ui.container.Composite,
    statics: {},
    properties: {
      QuestList: {
        init: null
      }
    },
    construct: function construct() {
      var layout = new qx.ui.layout.VBox(3);
      qx.ui.container.Composite.constructor.call(this, layout);
      this.initQuestContainer();
    },
    members: {
      initQuestContainer: function initQuestContainer() {
        var cont = new qx.ui.container.Composite(new qx.ui.layout.VBox(3));
        this.setQuestList(cont);
        this.add(cont);
      },
      updateQuestList: function updateQuestList() {
        var list = this.getQuestList();
        list.removeAll();
        var quests = katzenjammer.data.User.Instance.getQuests();

        for (var i in quests) {
          var item = quests[i].getItem();
          list.add(item);
        }

        katzenjammer.container.MapContainer.Instance.updateUserQuests();
      },
      addQuest: function addQuest(quest) {
        if (katzenjammer.data.User.Instance.getQuests() === null) katzenjammer.data.User.Instance.setQuests([]);
        katzenjammer.data.User.Instance.getQuests().push(quest);
        this.updateQuestList();
      }
    }
  });
  katzenjammer.container.QuestContainer.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=QuestContainer.js.map?dt=1652417291620