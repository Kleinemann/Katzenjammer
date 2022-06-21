(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.Widget": {
        "construct": true,
        "require": true
      },
      "katzenjammer.data.User": {},
      "katzenjammer.data.GameData": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* global katzenjammer */

  /**
  *
   * @asset(katzenjammer/*)
  *
  **/
  qx.Class.define("katzenjammer.container.MapContainer", {
    extend: qx.ui.core.Widget,
    statics: {
      Instance: null
    },
    properties: {
      Map: {
        init: null
      },
      CurrentMarker: {
        init: null,
        nullable: true
      },
      Marker: {
        init: {
          UserBuildings: [],
          UserQuests: []
        }
      },
      Routs: {}
    },
    construct: function construct() {
      qx.ui.core.Widget.constructor.call(this);
      katzenjammer.container.MapContainer.Instance = this;
      this.addListenerOnce("appear", function () {
        this.initMap();
        this.moveRandomPos();
      }, this);
    },
    members: {
      initMap: function initMap() {
        // Creating map options
        var mapOptions = {
          center: [17.385044, 78.486671],
          zoom: 10
        }; // Creating a map object

        var map = new L.map(this.getContentElement().getDomElement(), mapOptions); // Creating a Layer object
        //var layer = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

        var layer = new L.TileLayer('https://tile-{s}.openstreetmap.fr/hot/{z}/{x}/{y}.png'); // Adding layer to the map

        map.addLayer(layer);
        setTimeout(function () {
          map.invalidateSize();
        }, 0);
        /*
        var geocoder = L.Control.geocoder().on('markgeocode', function (e)
        {
            console.log(e);
        }).addTo(map);
        */

        this.setMap(map);
      },
      moveRandomPos: function moveRandomPos() {
        var map = this.getMap();
        if (map !== null) map.setView(new L.LatLng(Math.random() * 90, Math.random() * 90), 5);
      },
      movePosition: function movePosition(pos, zoom) {
        var map = this.getMap();

        if (map !== null) {
          if (pos.lat !== undefined) map.setView(new L.LatLng(pos.lat, pos.lon), zoom !== undefined ? zoom : 10);else map.setView(new L.LatLng(pos[0], pos[1]), zoom !== undefined ? zoom : 10);
        }
      },
      createMarker: function createMarker(pos, source) {
        var map = this.getMap();
        this.movePosition(pos);
        var old = this.getCurrentMarker();
        if (old !== null) old.remove();
        var marker = L.marker(pos, {
          draggable: true,
          title: "Marker kann verschoben werden"
        });
        this.setCurrentMarker(marker);

        if (source !== undefined) {
          marker.on("moveend", function (e) {
            var latLng = e.target._latlng;
            var pos = [latLng.lat, latLng.lng];
            source.updateMarker(pos);
          }, this);
        }

        marker.addTo(map);
      },
      updateMapMarker: function updateMapMarker() {
        this.updateUserBuildings();
        this.updateUserQuests();
      },
      updateUserQuests: function updateUserQuests() {
        var oldUserQuests = this.getMarker().UserQuests;

        for (var i in oldUserQuests) {
          oldUserQuests[i].remove();
        }

        var map = this.getMap();
        var userQuestMarkers = [];
        var userQuests = katzenjammer.data.User.Instance.getQuests();

        for (var i in userQuests) {
          var quest = userQuests[i];
          var marker = this.createQuest(quest);
          userQuestMarkers[quest.getID()] = marker;
          marker.addTo(map);
        }

        this.getMarker().UserQuests = userQuestMarkers;
      },
      updateUserBuildings: function updateUserBuildings() {
        var oldBuildings = this.getMarker().UserBuildings;

        for (var i in oldBuildings) {
          oldBuildings[i].remove();
        }

        var map = this.getMap();
        var buildingMarkers = [];
        var userBuildings = katzenjammer.data.User.Instance.getBuildings();

        for (var i in userBuildings) {
          var building = userBuildings[i];
          var marker = this.createBuilding(building);
          buildingMarkers[building.getID()] = marker;
          marker.addTo(map);
        }

        this.getMarker().UserBuildings = buildingMarkers;
      },
      getIcon: function getIcon(iconId) {
        var iconData = katzenjammer.data.GameData.Icons[iconId];
        console.log(iconData);
      },
      createBuilding: function createBuilding(building) {
        var bIcon = L.icon(building.getIcon());
        var marker = L.marker(building.getPosition(), {
          title: building.getName(),
          icon: bIcon
        });
        return marker;
      },
      createQuest: function createQuest(quest) {
        var bIcon = L.icon(quest.getIcon());
        var marker = L.marker(quest.getPosition(), {
          title: quest.getName(),
          icon: bIcon
        });
        return marker;
      }
    }
  });
  katzenjammer.container.MapContainer.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MapContainer.js.map?dt=1652938016061