/* global katzenjammer */
/**
*
 * @asset(katzenjammer/*)
*
**/
qx.Class.define("katzenjammer.data.ServiceRequest", {
    extend: qx.io.request.Xhr,

    statics:
    {
        URL_SERVICE: "http://localhost/katzenjammer_service/service.php",
        URL_OpenStreetSearch: "https://nominatim.openstreetmap.org/search",
        URL_OpenStreetReverse: "https://nominatim.openstreetmap.org/reverse.php",
        //URL_OpenStreetRoute: "https://routing.openstreetmap.de/routed-car/route/v1/driving/",


        SearchRoute: async function (source, target)
        {
            const promise = new Promise(function (resolve, reject) {
                L.Routing.osrmv1({ geometryOnly: true });

                var routing = L.Routing.control({
                    waypoints: [
                        source,
                        target
                    ],
                    language: 'de',
                    fitSelectedRoutes: false,
                    showAlternatives: false,
                    defaultErrorHandler: null

                }).on('routesfound', function (e) {
                    var route = e.routes[0];
                    resolve(route);
                }).on('routingerror', function (e) {
                    reject(null);
                });

                routing.route();
            });

            return promise;
            //var blubb = promise.coordinates;
            //console.log(blubb);


            /*
            var position = source.lon + "," + source.lat + ";" + target.lon + "," + target.lat;
            var params = {
                overview: false,
                geometries: "polyline",
                steps: true
            };

            var search = this.URL_OpenStreetRoute + position;

            return new katzenjammer.data.ServiceRequest(params, search, "GET");
            */
        },


        SearchAdressRevertRequest: function (pos)
        {
            var data =
            {
                lat: pos[0],
                lon: pos[1],
                zoom: 18,
                format: "jsonv2"
            };

            return new katzenjammer.data.ServiceRequest(data, katzenjammer.data.ServiceRequest.URL_OpenStreetReverse, "GET");
		},


        SearchAdressRequest: function (searchString)
        {

            var data =
            {
                "q": searchString,
                "limit": 1,
                "format": "json",
                "addressdetails": 1
            };

            return new katzenjammer.data.ServiceRequest(data, katzenjammer.data.ServiceRequest.URL_OpenStreetSearch, "GET");
		}
    },

    properties:
    {
    },

    construct: function (data, url, method)
    {
        this.base(arguments);

        this.setMethod(method !== undefined && method !== null ? method : "POST");

        if (this.getMethod() === "GET")
            url += this.addData(data);

        this.setUrl(url !== undefined && url !== null ? url : katzenjammer.data.ServiceRequest.URL_SERVICE);

        if(this.getMethod() === "POST")
            this.setRequestData(qx.util.Serializer.toJson(data));           

        this.addListenerOnce("success", function (e)
        {
            var response = e.getTarget().getResponse();
            if (response.success !== undefined && !response.success)
                console.error(JSON.stringify(response.error));
        }, this);

        this.addListenerOnce("fail", function (e)
        {
            var trans = e.getTarget().getTransport();
            var response = trans.responseText;
            console.error(response);
        }, this);

    },

    members:
    {
        addData: function (data)
        {
            var string = ""

            for (var i in data)
            {
                var value = data[i];

                string += string === "" ? "?" : "&";

                string += i + "=" + value;
            }

            return string;
		},

        getTable: function ()
        {
            var data = this.getResponse().data;
            var table = [];

            for (var i in data)
            {
                var dataRow = data[i];

                var row = [];
                for (var j in dataRow)
                {
                    row.push(dataRow[j]);
                }

                table.push(row);
            }

            return table;
		}
    }
});
