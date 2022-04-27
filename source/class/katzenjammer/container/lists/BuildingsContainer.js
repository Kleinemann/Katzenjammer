/* global katzenjammer */
/**
*
**/
qx.Class.define("katzenjammer.container.lists.BuildingsContainer", {
    extend: qx.ui.container.Composite,

    statics:
    {
    },

    properties:
    {
        NewBuilding: { init: null },
        BuildingSelect: { init: null }
    },

    construct: function ()
    {
        var layout = new qx.ui.layout.VBox(3);
        this.base(arguments, layout);

        this.initNewBuilding();
        this.initBuildingList();
    },

    members:
    {
        initNewBuilding: function ()
        {
            var cont = new qx.ui.container.Composite(new qx.ui.layout.VBox(3));
            var btnNew = new qx.ui.form.Button("Neu");
            cont.add(btnNew);

            cont.add(this.initBuildingSelect());
            cont.add(new katzenjammer.widgets.PosSearch());

            this.setNewBuilding(cont);

            //this.add(cont);
        },

        initBuildingSelect: function ()
        {
            var box = new qx.ui.form.SelectBox();

            var data = {
                Action: "select",
                Data: "Buildings"
            };

            var req = new katzenjammer.data.ServiceRequest(data);
            req.addListener("success", function (e)
            {
                var response = e.getTarget().getResponse();
                //console.log(response);

                if (response.success)
                {
                    var data = response.data;
                    for (i in data)
                    {
                        var building = data[i];
                        box.add(new qx.ui.form.ListItem(building.name + " (" + building.money + ")"));
					}
                }
            }, this);

            req.send();

            return box;
		},


        initBuildingList: function ()
        {
            var cont = new qx.ui.container.Composite(new qx.ui.layout.VBox(3));
            cont.add(new qx.ui.basic.Label("Gebäude"));
            this.add(cont);
		},


        updateData: function ()
        {

            var data = {
                Action: "select",
                Data: "Buildings"
            };

            var req = new katzenjammer.data.ServiceRequest(data);
            req.addListener("success", function (e)
            {
                var response = e.getTarget().getResponse();
                //console.log(response);

                if (response.success)
                {
                    var data = e.data;
                    this.getTableModel().setData(data);
                }
            }, this);

            req.send();
        }
    }
});
