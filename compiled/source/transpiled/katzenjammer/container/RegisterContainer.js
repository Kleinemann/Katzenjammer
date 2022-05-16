(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.container.Composite": {
        "construct": true,
        "require": true
      },
      "qx.ui.layout.VBox": {
        "construct": true
      },
      "qx.ui.basic.Label": {},
      "qx.ui.form.TextField": {},
      "qx.ui.form.PasswordField": {},
      "qx.ui.form.Button": {},
      "katzenjammer.data.ToolBox": {},
      "katzenjammer.data.ServiceRequest": {},
      "katzenjammer.container.MainContainer": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* global katzenjammer */

  /**
  *
  **/
  qx.Class.define("katzenjammer.container.RegisterContainer", {
    extend: qx.ui.container.Composite,
    statics: {},
    properties: {
      TextEmail: {
        init: null
      },
      TextUserName: {
        init: null
      },
      LabelWrongEmail: {
        init: null
      },
      LabelWrongUser: {
        init: null
      },
      SubmitButton: {
        init: null
      },
      TextPassword: {
        init: null
      },
      LabelWrongPassword: {
        init: null
      },
      TextPassword2: {
        init: null
      },
      LabelWrongPassword2: {
        init: null
      }
    },
    construct: function construct() {
      var layout = new qx.ui.layout.VBox(3);
      qx.ui.container.Composite.constructor.call(this, layout);
      this.initRegisterForm();
    },
    members: {
      initRegisterForm: function initRegisterForm() {
        this.add(new qx.ui.basic.Label("E-Mail"));
        this.setLabelWrongEmail(new qx.ui.basic.Label("E-Mail wird schon benutzt.").set({
          textColor: "red",
          visibility: "excluded"
        }));
        this.add(this.getLabelWrongEmail());
        this.setTextEmail(new qx.ui.form.TextField());
        this.add(this.getTextEmail());
        this.add(new qx.ui.basic.Label("Benutzername"));
        this.setLabelWrongUser(new qx.ui.basic.Label("Benutzer ist unbekannt.").set({
          textColor: "red",
          visibility: "excluded"
        }));
        this.add(this.getLabelWrongUser());
        this.setTextUserName(new qx.ui.form.TextField());
        this.add(this.getTextUserName());
        this.add(new qx.ui.basic.Label("Passwort (Mindestens 8 Zeichen)"));
        this.setLabelWrongPassword(new qx.ui.basic.Label("Passwort ist nicht sicher.").set({
          textColor: "red",
          visibility: "excluded"
        }));
        this.add(this.getLabelWrongPassword());
        this.setTextPassword(new qx.ui.form.PasswordField());
        this.add(this.getTextPassword());
        this.add(new qx.ui.basic.Label("Passwort widerholen"));
        this.setLabelWrongPassword2(new qx.ui.basic.Label("Passwort ist falsch.").set({
          textColor: "red",
          visibility: "excluded"
        }));
        this.add(this.getLabelWrongPassword2());
        this.setTextPassword2(new qx.ui.form.PasswordField());
        this.add(this.getTextPassword2());
        var btnSubmit = new qx.ui.form.Button("Registrieren");
        this.setSubmitButton(btnSubmit);
        btnSubmit.addListener("execute", function (e) {
          if (this.checkRegisterData()) this.registerUser(this.getTextEmail().getValue(), this.getTextUserName().getValue(), this.getTextPassword().getValue());
        }, this);
        this.add(btnSubmit);
      },
      checkRegisterData: function checkRegisterData() {
        var value = this.getTextEmail().getValue();

        if (this.getTextEmail().getValue() === null || this.getTextEmail().getValue() === "" || this.getTextUserName().getValue() === null || this.getTextUserName().getValue() === "" || this.getTextPassword().getValue() === null || this.getTextPassword().getValue() === "" || this.getTextPassword2().getValue() === null || this.getTextPassword2().getValue() === "") {
          alert("Bitte alle Felder ausfüllen");
          return false;
        }

        if (this.getTextPassword().getValue().length < 8) {
          this.getLabelWrongPassword().setVisibility("visible");
          return false;
        } else this.getLabelWrongPassword().setVisibility("excluded");

        if (this.getTextPassword().getValue() !== this.getTextPassword2().getValue()) {
          this.getLabelWrongPassword2().setVisibility("visible");
          return false;
        } else this.getLabelWrongPassword2().setVisibility("excluded");

        return true;
      },
      registerUser: function registerUser(email, user, password) {
        password = katzenjammer.data.ToolBox.createPassword(password);
        var data = {
          Action: "register",
          Data: {
            Email: email,
            User: user,
            Password: password
          }
        };
        var req = new katzenjammer.data.ServiceRequest(data);
        req.addListener("success", function (e) {
          var response = e.getTarget().getResponse(); //console.log(response);

          this.getLabelWrongUser().setVisibility("excluded");
          this.getLabelWrongEmail().setVisibility("excluded");

          if (response.success) {
            alert("Sie wurden erfolgreich registriert");
            katzenjammer.container.MainContainer.Instance.switchWindow("Register", "Login");
          } else {
            for (var i in response.error) {
              var error = response.error[i];
              if (error.id === 32) this.getLabelWrongUser().setVisibility("visible");
              if (error.id === 31) this.getLabelWrongEmail().setVisibility("visible");
            }
          }
        }, this);
        req.send();
      }
    }
  });
  katzenjammer.container.RegisterContainer.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=RegisterContainer.js.map?dt=1652417291607