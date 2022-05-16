(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.io.request.Xhr": {
        "construct": true,
        "require": true
      },
      "qx.util.Serializer": {
        "construct": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* global katzenjammer */

  /**
  *
   * @asset(katzenjammer/*)
  *
  **/
  qx.Class.define("katzenjammer.data.ServiceRequest", {
    extend: qx.io.request.Xhr,
    statics: {
      URL_SERVICE: "http://localhost/katzenjammer_service/service.php",
      URL_OpenStreetSearch: "https://nominatim.openstreetmap.org/search",
      URL_OpenStreetReverse: "https://nominatim.openstreetmap.org/reverse.php",
      SearchAdressRevertRequest: function SearchAdressRevertRequest(pos) {
        var data = {
          lat: pos[0],
          lon: pos[1],
          zoom: 18,
          format: "jsonv2"
        };
        return new katzenjammer.data.ServiceRequest(data, katzenjammer.data.ServiceRequest.URL_OpenStreetReverse, "GET");
      },
      SearchAdressRequest: function SearchAdressRequest(searchString) {
        var data = {
          "q": searchString,
          "limit": 1,
          "format": "json",
          "addressdetails": 1
        };
        return new katzenjammer.data.ServiceRequest(data, katzenjammer.data.ServiceRequest.URL_OpenStreetSearch, "GET");
      }
    },
    properties: {},
    construct: function construct(data, url, method) {
      qx.io.request.Xhr.constructor.call(this);
      this.setMethod(method !== undefined && method !== null ? method : "POST");
      if (this.getMethod() === "GET") url += this.addData(data);
      this.setUrl(url !== undefined && url !== null ? url : katzenjammer.data.ServiceRequest.URL_SERVICE);
      if (this.getMethod() === "POST") this.setRequestData(qx.util.Serializer.toJson(data));
      this.addListenerOnce("success", function (e) {
        var response = e.getTarget().getResponse();
        if (response.success !== undefined && !response.success) console.error(JSON.stringify(response.error));
      }, this);
      this.addListenerOnce("fail", function (e) {
        var trans = e.getTarget().getTransport();
        var response = trans.responseText;
        console.error(response);
      }, this);
    },
    members: {
      addData: function addData(data) {
        var string = "";

        for (var i in data) {
          var value = data[i];
          string += string === "" ? "?" : "&";
          string += i + "=" + value;
        }

        return string;
      },
      getTable: function getTable() {
        var data = this.getResponse().data;
        var table = [];

        for (var i in data) {
          var dataRow = data[i];
          var row = [];

          for (var j in dataRow) {
            row.push(dataRow[j]);
          }

          table.push(row);
        }

        return table;
      }
    }
  });
  katzenjammer.data.ServiceRequest.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ServiceRequest.js.map?dt=1652417291350