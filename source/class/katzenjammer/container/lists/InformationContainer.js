/* global katzenjammer */
/**
*
**/
qx.Class.define("katzenjammer.container.lists.InformationContainer", {
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



        var btnRoute = new qx.ui.form.Button("Route");
        this.add(btnRoute);

        btnRoute.addListener("execute", function (e)
        {
            var m1 = katzenjammer.data.User.Instance.getBuildings()[1];
            var m2 = katzenjammer.data.User.Instance.getBuildings()[3];
            var p1 = m1.getPosition();
            var p2 = m2.getPosition();

            katzenjammer.data.ServiceRequest.SearchRoute(p1, p2).then
            (
                function (route)
                {
                    var coords = route.coordinates;
                    var pols = [];

                    for (var i in coords)
                    {
                        var coord = coords[i];
                        pols.push([coord.lat, coord.lng]);

                    }

                    var map = katzenjammer.container.MapContainer.Instance.getMap();

                    var polygon = L.polyline(pols, {
                        color: 'red'
                    }).addTo(map);

                }
            );

        }, this);

    },

    members:
    {
        addInformation: function (info)
        {
            this.add(new qx.ui.basic.Label(info));
        }
    }
});
