/* global katzenjammer */
/**
*
**/
qx.Class.define("katzenjammer.container.lists.TopPlayerContainer", {
    extend: qx.ui.container.Composite,

    statics:
    {
    },

    properties:
    {
        Table: { init: null },
        TableModel: { init: null }
    },

    construct: function ()
    {
        var layout = new qx.ui.layout.VBox(3);
        this.base(arguments, layout);

        this.initTable();
        this.updateData();
    },

    members:
    {
        initTable: function ()
        {
            var tm = new qx.ui.table.model.Simple()
            tm.setColumns(["Punkte", "Player", "Alianz"]);
            this.setTableModel(tm);

            var custom =
            {
                tableColumnModel: function (obj)
                {
                    return new qx.ui.table.columnmodel.Resize(obj);
                }
            };

            var table = new qx.ui.table.Table(tm, custom);

            table.setStatusBarVisible(false);
            table.setColumnVisibilityButtonVisible(false);
            table.getSelectionModel().setSelectionMode(qx.ui.table.selection.Model.NO_SELECTION);

            this.setTable(table);

            this.add(table, { flex: 1 });
        },

        updateData: function ()
        {
            
            var data = {
                Action: "select",
                Data: "TopPlayer"
            };

            var req = new katzenjammer.data.ServiceRequest(data);
            req.addListener("success", function (e)
            {
                var response = e.getTarget().getResponse();
                //console.log(response);

                if (response.success)
                {
                    var data = e.getTarget().getTable();
                    this.getTableModel().setData(data);
                }
            }, this);

            req.send();
		}
    }
});
