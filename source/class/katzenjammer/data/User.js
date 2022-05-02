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
        ID: { init: null, nullable: true  },
        Session: { init: null, nullable: true },
        Name: { init: null, nullable: true  },
        Home: { init: null, nullable: true  },
        Money: { init: null, nullable: true  },
        Guild: { init: null, nullable: true },

        Buildings: { init: null, nullable: true }
    },

    construct: function ()
    {
        this.base(arguments);

        katzenjammer.data.User.Instance = this;
    },

    members:
    {
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

                    katzenjammer.container.MainContainer.Instance.getBuildings().updateBuildingList();
                }
            }, this);

            req.send();
        }
    }
});
