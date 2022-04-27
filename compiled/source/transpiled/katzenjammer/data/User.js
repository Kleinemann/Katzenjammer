(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
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
  qx.Class.define("katzenjammer.data.User", {
    extend: qx.core.Object,
    type: "singleton",
    statics: {
      Instance: null
    },
    properties: {
      ID: {
        init: null,
        nullable: true
      },
      Session: {
        init: null,
        nullable: true
      },
      Name: {
        init: null,
        nullable: true
      },
      Home: {
        init: null,
        nullable: true
      },
      Money: {
        init: null,
        nullable: true
      },
      Guild: {
        init: null,
        nullable: true
      }
    },
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      katzenjammer.data.User.Instance = this;
    },
    members: {
      loadingUser: function loadingUser(args) {
        if (args === null) {
          this.resetID();
          this.resetSession();
          this.resetName();
          this.resetHome();
          this.resetMoney();
          this.resetGuild();
        }

        for (var i in args) {
          var value = args[i];

          switch (i) {
            case "id":
              this.setID(value);
              break;

            case "name":
              this.setName(value);
              break;

            case "session":
              this.setSession(value);
              break;

            case "home":
              this.setHome(value);
              break;

            case "money":
              this.setMoney(value);
              break;

            case "guild":
              this.setGuild(value);
              break;

            default:
              console.log("Key " + i + " is not in use.");
              break;
          }
        }
      }
    }
  });
  katzenjammer.data.User.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=User.js.map?dt=1650535880778