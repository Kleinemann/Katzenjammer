/* global katzenjammer */
/**
*
**/
qx.Class.define("katzenjammer.widgets.PosSearch", {
    extend: qx.ui.container.Composite,

    statics:
    {
    },

    properties:
    {
        SearchField: { init: null },
        CurrentPos: { init: null, nullable: true }
    },

    construct: function ()
    {
        var layout = new qx.ui.layout.HBox(3);
        this.base(arguments, layout);

        this.setSearchField(new qx.ui.form.TextField());
        this.add(new qx.ui.basic.Label("Adresse"));
        this.add(this.getSearchField(), { flex: 1 });

        var btnSearch = new qx.ui.form.Button("Suchen");
        this.add(btnSearch);

        btnSearch.addListener("execute", this.searchPos, this);
        this.getSearchField().addListener("keyup", function (e)
        {
            if (e.getKeyCode() !== 13)
                return;

            this.searchPos();
        }, this);
    },

    members:
    {
        searchPos: function (e)
        {
            this.resetCurrentPos();

            var txt = this.getSearchField().getValue();

            var req = katzenjammer.data.ServiceRequest.SearchAdressRequest(txt);
            req.addListener("success", function (e)
            {
                var response = e.getTarget().getResponse();
                if (response.length === 1)
                {
                    var pos = [response[0].lat, response[0].lon];
                    this.setCurrentPos(pos);
                    katzenjammer.container.MapContainer.Instance.createMarker(pos, this);
                }
                else
                    console.log("Not Found");
            }, this);

            req.send();
        },

        updateMarker: function (pos)
        {
            var req = katzenjammer.data.ServiceRequest.SearchAdressRevertRequest(pos);

            req.addListener("success", function (e)
            {
                var response = e.getTarget().getResponse();
                this.setCurrentPos([response.lat, response.lon]);
                this.getSearchField().setValue(response.display_name);
            }, this);

            req.send();
		}
    }
});
