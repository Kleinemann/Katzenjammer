/* global katzenjammer */
/**
*
 * @asset(katzenjammer/*)
*
**/
qx.Class.define("katzenjammer.data.User", {
    extend: qx.core.Object,
    type: "singleton",

    statics:
    {
        Instance: null
    },

    properties:
    {
        ID: { init: null, nullable: true },
        Session: { init: null, nullable: true },
        Name: { init: null, nullable: true },
        Home: { init: null, nullable: true },
        Money: { init: null, nullable: true },
        Guild: { init: null, nullable: true },

        Buildings: { init: null, nullable: true },
        Quests: { init: null, nullable: true },
    },

    construct: function () {
        this.base(arguments);

        katzenjammer.data.User.Instance = this;
    },

    members:
    {
        gameInterval: function () {
            var buildings = this.getBuildings();
            for (var i in buildings) {
                var building = buildings[i];
                var quest = building.getQuest();

                if (quest === null)
                {
                    console.log(building.getName() + " (" + building.getID() + ") benötigt eine Quest.");
                    var quest = katzenjammer.data.Quest.createNewQuest(building);

                    var questCont = katzenjammer.container.MainContainer.Instance.getQuests();
                    questCont.addQuest(quest);


                    var building = katzenjammer.data.User.Instance.getBuildings()[questData.user_building_id];

                    this.setUserBuilding(building);
                    building.setQuest(this);
                }
                
                //console.log(building.getName() + " (" + building.getID() + ") hat die Quest -> " + quest.getName());
            }
        },


        loadingUser: function (args)
        {
            if (args === null)
            {
                this.resetID();
                this.resetSession();
                this.resetName();
                this.resetHome();
                this.resetMoney();
                this.resetGuild();

                this.resetBuildings();
			}

            for (var i in args)
            {
                var value = args[i];
                switch (i)
                {
                    case "id": this.setID(value); break;
                    case "name": this.setName(value); break;
                    case "session": this.setSession(value); break;
                    case "home": this.setHome(value); break;
                    case "money": this.setMoney(value); break;
                    case "guild": this.setGuild(value); break;
                    default: console.log("Key " + i + " is not in use."); break;
                }
            }

            this.loadingUserData();
        },


        updateHome: function (homeData)
        {
            this.setHome(homeData);

            var data =
            {
                Action: "userUpdate",
                Data: {
                    id: this.getID(),
                    home: this.getHome()
				}
			}

            var req = new katzenjammer.data.ServiceRequest(data);
            req.send();
        },


        loadingUserData: function ()
        {
            this.loadingUserBuildings();
        },

        loadingUserBuildings: function ()
        {
            var user = katzenjammer.data.User.Instance.getID();

            var data = {
                Action: "select",
                Data: "UserBuildings",
                ID: user
            };

            var req = new katzenjammer.data.ServiceRequest(data);
            req.addListener("success", function (e)
            {
                var response = e.getTarget().getResponse();
                //console.log(response);

                if (response.success)
                {
                    var data = e.getTarget().getResponse().data;

                    var buildings = [];
                    for (var i in data)
                    {
                        buildings[data[i].id] = new katzenjammer.data.UserBuilding(data[i]);
                    }

                    this.setBuildings(buildings);

                    this.loadingHeroes();
                    this.loadingQuests();
                }
            }, this);

            req.send();
        },


        loadingHeroes: function () {
            var user = katzenjammer.data.User.Instance.getID();

            var data = {
                Action: "select",
                Data: "UserHeroes",
                ID: user
            };

            var req = new katzenjammer.data.ServiceRequest(data);
            req.addListener("success", function (e) {
                var response = e.getTarget().getResponse();

                if (response.success)
                {
                    var data = e.getTarget().getResponse().data;
                    var buildings = this.getBuildings();

                    for (var i in data)
                    {
                        var hero = data[i];

                        if (hero.name === null)
                            hero.name = katzenjammer.data.GameData.Heroes[hero.hero_id].name

                        if (hero.icon_id === null)
                            hero.icon_id = katzenjammer.data.GameData.Heroes[hero.hero_id].icon_id;

                        var building = buildings[hero.building_id];

                        var bHeroes = building.getHeroes();
                        if (bHeroes === null)
                            bHeroes = [];

                        bHeroes.push(hero);

                        building.setHeroes(bHeroes);
                    }

                    katzenjammer.container.MainContainer.Instance.getBuildings().updateBuildingList();
                }
            }, this);

            req.send();
        },



        loadingQuests: function ()
        {
            var user = katzenjammer.data.User.Instance.getID();

            var data = {
                Action: "select",
                Data: "Quests",
                ID: user
            };

            var req = new katzenjammer.data.ServiceRequest(data);
            req.addListener("success", function (e) {
                var response = e.getTarget().getResponse();
                //console.log(response);

                if (response.success) {
                    var data = e.getTarget().getResponse().data;
                    var buildings = katzenjammer.data.User.Instance.getBuildings();

                    var quests = [];
                    for (var i in data)
                    {
                        var quest = new katzenjammer.data.Quest(data[i]);
                        quests[data[i].user_building_id] = quest;
                        var b = buildings[data[i].user_building_id];
                        b.setQuest(quest);
                    }

                    this.setQuests(quests);

                    katzenjammer.container.MainContainer.Instance.getQuests().updateQuestList();
                }
            }, this);

            req.send();
        }
    }
});
