/* global katzenjammer */
/**
*
 * @asset(katzenjammer/*)
*
**/
qx.Class.define("katzenjammer.container.Header", {
    extend: qx.ui.container.Composite,

    statics:
    {
    },

    properties:
    {
        PlayerCont: { init: null },

        PlayerName: { init: null },
        Money: { init: null }
    },

    construct: function ()
    {
        var layout = new qx.ui.layout.Dock(3);
        this.base(arguments, layout);

        this.setBackgroundColor("yellow");

        this.add(new qx.ui.basic.Label("KATZENJAMMER"), { edge: "west" });
        this.add(new qx.ui.basic.Label(" (v. " + this.getVersion() + ")"), { edge: "west" });

        this.setPlayerCont(this.initPlayerCont());
        this.add(this.getPlayerCont(), { edge: "east" });

        this.refresh();
    },

    members:
    {
        getVersion: function ()
        {
            var lim = qx.core.Environment.get('qx.libraryInfoMap'); // get the map
            var ver = lim['katzenjammer']['version']; // get the 'version' of the library 'myProj'
            return ver;
		},

        initPlayerCont: function ()
        {
            var cont = new qx.ui.container.Composite(new qx.ui.layout.HBox(3));

            cont.add(new qx.ui.basic.Label("Name: "));
            this.setPlayerName(new qx.ui.basic.Label().set({ minWidth: 100 }));
            cont.add(this.getPlayerName());

            cont.add(new qx.ui.basic.Label("Gold: "));
            this.setMoney(new qx.ui.basic.Label().set({ minWidth: 100 }));
            cont.add(this.getMoney());

            var btnSubmit = new qx.ui.form.Button("Logout");
            btnSubmit.addListener("execute", function (e)
            {
                katzenjammer.container.MainContainer.Instance.loadingUser(null);
            }, this);
            cont.add(btnSubmit);
            cont.setVisibility("excluded");

            return cont;
        },

        refresh: function ()
        {
            var user = katzenjammer.data.User.Instance;
            if (user.getID() !== null)
            {
                this.getPlayerCont().setVisibility("visible");
                this.getPlayerName().setValue(user.getName());
                this.getMoney().setValue(user.getMoney());
            }
            else
            {
                this.getPlayerCont().setVisibility("excluded");
			}
		}
    }
});
