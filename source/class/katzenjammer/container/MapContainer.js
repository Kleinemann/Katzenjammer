/* global katzenjammer */
/**
*
 * @asset(katzenjammer/*)
*
**/
qx.Class.define("katzenjammer.container.MapContainer", {
    extend: qx.ui.core.Widget,

    statics:
    {
        Instance: null
    },

    properties:
    {
        Map: { init: null },
        CurrentMarker: { init: null, nullable: true}
    },

    construct: function ()
    {
        this.base(arguments);
        katzenjammer.container.MapContainer.Instance = this;

        this.addListenerOnce("appear", function ()
        {
            this.initMap();
            this.moveRandomPos();
        }, this);
    },

    members:
    {
        initMap: function ()
        {
            // Creating map options
            var mapOptions = {
                center: [17.385044, 78.486671],
                zoom: 10
            }

            // Creating a map object
            var map = new L.map(this.getContentElement().getDomElement(), mapOptions);

            // Creating a Layer object
            var layer = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

            // Adding layer to the map
            map.addLayer(layer);

            
            var geocoder = L.Control.geocoder().on('markgeocode', function (e)
            {
                console.log(e);
            }).addTo(map);
            
            this.setMap(map);
        },

        moveRandomPos: function ()
        {
            var map = this.getMap();
            if (map !== null)
                map.setView(new L.LatLng(Math.random() * 90, Math.random() * 90), 5);
        },

        movePosition: function (pos)
        {
            var map = this.getMap();
            if (map !== null)
                map.setView(new L.LatLng(pos[0], pos[1]), 15);
        },

        createMarker: function (pos, source)
        {
            var map = this.getMap();
            this.movePosition(pos);

            var old = this.getCurrentMarker();
            if (old !== null)
                old.remove();

            var marker = L.marker(pos, { draggable: true });
            this.setCurrentMarker(marker);

            if (source !== undefined)
            {
                marker.on("moveend", function (e)
                {
                    var latLng = e.target._latlng;
                    var pos = [latLng.lat, latLng.lng];

                    source.updateMarker(pos);
                }, this);
            }

            marker.addTo(map);
        },
    }
});
