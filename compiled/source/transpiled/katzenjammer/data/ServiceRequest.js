function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
      //URL_OpenStreetRoute: "https://routing.openstreetmap.de/routed-car/route/v1/driving/",
      SearchRoute: function () {
        var _SearchRoute = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(source, target) {
          var promise;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  promise = new Promise(function (resolve, reject) {
                    L.Routing.osrmv1({
                      geometryOnly: true
                    });
                    var routing = L.Routing.control({
                      waypoints: [source, target],
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
                  return _context.abrupt("return", promise);

                case 2:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        function SearchRoute(_x, _x2) {
          return _SearchRoute.apply(this, arguments);
        }

        return SearchRoute;
      }(),
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

//# sourceMappingURL=ServiceRequest.js.map?dt=1652777811953