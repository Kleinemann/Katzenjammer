/* global katzenjammer */
/**
*
 * @asset(katzenjammer/*)
*
**/
qx.Class.define("katzenjammer.data.GameData", {
	//extend: qx.core.Object,
	type: "static",

	statics:
	{
        Buildings: null,
        Heroes: null,
        Icons: null,

		initGameData: function (e)
		{
            this.loadingBuildings();
            this.loadingIcons();
            this.loadingHeroes();
		},


		loadingBuildings: function ()
		{
            var data = {
                Action: "select",
                Data: "Buildings"
            };

            var req = new katzenjammer.data.ServiceRequest(data);
            req.addListener("success", function (e)
            {
                var response = e.getTarget().getResponse();
                if (response.success)
                {
                    katzenjammer.data.GameData.Buildings = [];
                    var data = response.data;
                    for (var i in data)
                    {
                        katzenjammer.data.GameData.Buildings[data[i].id] = data[i];
                    }
                }

                this.loadingBuildingHeroes();
            }, this);

            req.send();
        },


        loadingBuildingHeroes: function ()
        {
            var data = {
                Action: "select",
                Data: "BuildingHeroes"
            };

            var req = new katzenjammer.data.ServiceRequest(data);
            req.addListener("success", function (e) {
                var response = e.getTarget().getResponse();
                if (response.success)
                {
                    var data = response.data;
                    for (var i in data)
                    {
                        var building = katzenjammer.data.GameData.Buildings[data[i].building_id];
                        if (building.heroes === undefined)
                            building.heroes = [];

                        building.heroes.push(data[i].hero_id);
                    }
                }
            }, this);

            req.send();
        },


        loadingHeroes: function () {
            var data = {
                Action: "select",
                Data: "Heroes"
            };

            var req = new katzenjammer.data.ServiceRequest(data);
            req.addListener("success", function (e) {
                var response = e.getTarget().getResponse();
                if (response.success) {
                    katzenjammer.data.GameData.Heroes = [];
                    var data = response.data;
                    for (var i in data) {
                        katzenjammer.data.GameData.Heroes[data[i].id] = data[i];
                    }
                }
            }, this);

            req.send();
        },


        loadingIcons: function () {
            var data = {
                Action: "select",
                Data: "Icons"
            };

            var req = new katzenjammer.data.ServiceRequest(data);
            req.addListener("success", function (e) {
                var response = e.getTarget().getResponse();
                if (response.success) {
                    katzenjammer.data.GameData.Icons = [];
                    var data = response.data;
                    for (var i in data)
                    {
                        var set = JSON.parse(data[i].settings);
                        var icon =
                        {
                            id : data[i].id,
                            iconUrl: "resource/katzenjammer/icons/" + data[i].icon_url,
                        };
                        if (data[i].shadow_url !== null)
                            icon.shadowUrl = "resource/katzenjammer/icons/" + data[i].shadow_url;

                        for (var d in set)
                            icon[d] = set[d];

                       katzenjammer.data.GameData.Icons[data[i].id] = icon;
                    }
                }
            }, this);

            req.send();
        }
	}
});
