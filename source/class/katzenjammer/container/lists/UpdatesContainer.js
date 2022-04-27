/* global katzenjammer */
/**
*
**/
qx.Class.define("katzenjammer.container.lists.UpdatesContainer", {
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
            tm.setColumns(["Version", "Text"]);
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

            var tcm = table.getTableColumnModel();
            var resizeBehavior = tcm.getBehavior();
            resizeBehavior.set(0, { width: "1*", minWidth: 40, maxWidth: 80 });
            resizeBehavior.set(0, { width: "3*", minWidth: 40, maxWidth: 80 });

            this.add(table);
        },

        updateData: function ()
        {
            
            var data = {
                Action: "select",
                Data: "Updates"
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
