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

		initGameData: function (e)
		{
			this.loadingBuildings();
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
            }, this);

            req.send();
		}
	}
});
