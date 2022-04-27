/* global katzenjammer */
/**
*
 * @asset(katzenjammer/*)
 * (katzenjammer/leaflet/*)
 * (katzenjammer/leaflet/images)
 * (katzenjammer/leaflet/routing/leaflet-routing-machine.js)
*
**/
qx.Class.define("katzenjammer.container.MainContainer", {
    extend: qx.ui.container.Composite,

    statics:
    {
        Instance: null,

        ContainerSettings: {
            "Header": { "name": null, "isWindow": false },
            "Map": { "name": null, "isWindow": true },
            "Login": { "name": "Login", "isWindow": true },
            "Register": { "name": "Registrieren", "isWindow": true },
            "Update": { "name": "Updates", "isWindow": true },
            "News": {  "name": "News", "isWindow": true },
            "TopPlayer": { "name": "Top-Spieler", "isWindow": true },
            "Quests": { "name": "Quests", "isWindow": true },
            "Buildings": { "name": "Gebäude", "isWindow": true, "subbody": "NewBuilding" }
        },

        Layouts: {
            "start": {
                "Header": { row: 0, column: 0, colSpan: 3 },
                "Map": { row: 1, column: 0, colSpan: 2 },
                "Login": { row: 1, column: 2 },
                "Update": { row: 2, column: 0 },
                "News": { row: 2, column: 1 },
                "TopPlayer": { row: 2, column: 2 }
            },

            "default": {
                "Header": { row: 0, column: 0, colSpan: 3 },
                "Map": { row: 1, column: 0, colSpan: 2 },
                "Quests": { row: 1, column: 2 },
                "Buildings": { row: 2, column: 0 },
                "News": { row: 2, column: 1 },
                "TopPlayer": { row: 2, column: 2 }
            }
        }
    },

    properties:
    {
        User: { init: katzenjammer.data.User.getInstance() },

        CurrentLayout: { init: null},

        Header: { init: null, nullable: true },
        Map: { init: null, nullable: true },
        Login: { init: null, nullable: true },
        Register: { init: null, nullable: true },
        Update: { init: null, nullable: true },
        News: { init: null, nullable: true },
        TopPlayer: { init: null, nullable: true },
        Quests: { init: null, nullable: true },
        Buildings: { init: null, nullable: true }
    },

    construct: function ()
    {
        var layout = new qx.ui.layout.Grid(0, 0);
        layout.setColumnFlex(0, 1);
        layout.setColumnFlex(1, 1);
        layout.setColumnFlex(2, 1);

        layout.setRowFlex(0, 0);
        layout.setRowFlex(1, 2);
        layout.setRowFlex(2, 1);


        this.base(arguments, layout);

        katzenjammer.container.MainContainer.Instance = this;

        this.setBackgroundColor("#CCCCCC");

        this.loadingLayout("start");
    },

    members:
    {
        loadingLayout: function (layoutName)
        {
            this.removeAll();

            this.setCurrentLayout(layoutName);

            var positions = katzenjammer.container.MainContainer.Layouts[layoutName];

            for (var i in positions)
            {
                if (this.get(i) !== null)
                    this.set(i, null);

                this.loadWindow(i, positions[i]);
			}
        },


        initContainerByName: function (name)
        {
            switch (name)
            {
                case "Header": return new katzenjammer.container.Header(); break;
                case "Map": return new katzenjammer.container.MapContainer(); break;
                case "Login": return new katzenjammer.container.LoginContainer(); break;
                case "Register": return new katzenjammer.container.RegisterContainer(); break;
                case "Quests": return new katzenjammer.container.QuestContainer(); break;
                case "TopPlayer": return new katzenjammer.container.lists.TopPlayerContainer(); break;
                case "News": return new katzenjammer.container.lists.NewsContainer(); break;
                case "Update": return new katzenjammer.container.lists.UpdatesContainer(); break;
                case "Buildings": return new katzenjammer.container.lists.BuildingsContainer(); break;
                default: return undefined;
			}
		},


        initSearch: function ()
        {
            var cont = new qx.ui.container.Composite(new qx.ui.layout.VBox(3));
            var txtSearch = new qx.ui.form.TextField();
            cont.add(txtSearch);
            txtSearch.addListener("keyup", function (e)
            {
                if (e.getKeyCode() !== 13)
                    return;

                var req = katzenjammer.data.ServiceRequest.SearchAdressRequest(txtSearch.getValue());
                req.addListener("success", function (e)
                {
                    var response = e.getTarget().getResponse();
                    if (response.length === 1)
                    {
                        console.log(response[0]);
                        var pos = [response[0].lat, response[0].lon];
                        this.getMap().movePosition(pos);
                    }
                    else
                        console.log("Not Found");
                }, this);

                req.send();
            }, this);

            var window = new katzenjammer.widgets.WindowBase("Search", cont);
            return window;
		},


        switchWindow: function (oldName, newName)
        {
            var positions = katzenjammer.container.MainContainer.Layouts[this.getCurrentLayout()];

            var position = positions[oldName] !== undefined ? positions[oldName] : positions[newName];

            var oldWindow = this.getLayout().getCellWidget(position.row, position.column);
            if (oldWindow !== null)
            {
                this.remove(oldWindow);
                this.reset(oldName);
            }

            this.loadWindow(newName, position);
		},


        loadWindow: function (windowName, position)
        {
            var contSettings = katzenjammer.container.MainContainer.ContainerSettings[windowName];
            var window = this.get(windowName) !== null ? this.get(windowName) : this.initContainerByName(windowName);

            if (contSettings !== undefined && window !== undefined)
                this.set(windowName, window);

            if (contSettings.isWindow)
            {
                if (contSettings.subbody !== undefined)
                    this.add(new katzenjammer.widgets.WindowBase(contSettings.name, window, window.get(contSettings.subbody)), position);
                else
                    this.add(new katzenjammer.widgets.WindowBase(contSettings.name, window), position);
            }
            else
                this.add(window, position);
		},


        loadingUser: function (args)
        {
            this.getUser().loadingUser(args);
            this.getHeader().refresh();

            if (args === null)
            {
                this.getMap().moveRandomPos();
                this.loadingLayout("start");
            }
            else
            {
                this.loadingLayout("default");

                var home = JSON.parse(this.getUser().getHome());
                if (home !== null)
                {
                    var map = this.getMap().getMap();
                    map.setView(new L.LatLng(home.center[0], home.center[1]), 15);
                }
                else
                    this.getMap().moveRandomPos();
            }
		}
    }
});
