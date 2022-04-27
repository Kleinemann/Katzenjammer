/* global katzenjammer */
/**
*
**/
qx.Class.define("katzenjammer.container.LoginContainer", {
    extend: qx.ui.container.Composite,

    statics:
    {        
    },

    properties:
    {
        TextUserName: { init: null },
        LabelWrongUser: { init: null },
        SubmitButton: { init: null },

        AutoLogin: { init: null },
        TextPassword: { init: null },
        LabelWrongPassword: { init: null }
    },

    construct: function ()
    {
        var layout = new qx.ui.layout.VBox(3);
        this.base(arguments, layout);

        this.initLoginForm();
    },

    members:
    {
        initLoginForm: function ()
        {
            this.add(new qx.ui.basic.Label("Benutzername"));

            this.setLabelWrongUser(new qx.ui.basic.Label("Benutzer ist unbekannt.").set(
                {
                    textColor: "red",
                    visibility: "excluded"
                }));
            this.add(this.getLabelWrongUser());

            this.setTextUserName(new qx.ui.form.TextField());
            this.add(this.getTextUserName());


            this.add(new qx.ui.basic.Label("Passwort"));
            this.setLabelWrongPassword(new qx.ui.basic.Label("Passwort ist falsch.").set(
                {
                    textColor: "red",
                    visibility: "excluded"
                }));
            this.add(this.getLabelWrongPassword());

            this.setTextPassword(new qx.ui.form.PasswordField());
            this.add(this.getTextPassword());


            var autoLogin = new qx.ui.form.CheckBox("Angemeldet bleiben");
            this.setAutoLogin(autoLogin);
            this.add(autoLogin);


            this.getTextPassword().addListener("keyup", function (e)
            {
                if (e.getKeyCode() === 13)
                    this.getSubmitButton().execute();
            }, this);
            this.getTextUserName().addListener("keyup", function (e)
            {
                if (e.getKeyCode() === 13)
                    this.getSubmitButton().execute();
            }, this);

            var btnSubmit = new qx.ui.form.Button("Login");
            this.setSubmitButton(btnSubmit);
            btnSubmit.addListener("execute", function (e)
            {
                this.login(this.getTextUserName().getValue(), this.getTextPassword().getValue());
            }, this);
            this.add(btnSubmit);

            var loginUser = qx.bom.Cookie.get("User");
            var loginPassword = qx.bom.Cookie.get("Password");

            if (loginUser !== null && loginPassword !== null)
            {
                this.getAutoLogin().setValue(true);
                this.getTextUserName().setValue(loginUser)
                this.getTextPassword().setValue(loginPassword);
                this.login(this.getTextUserName().getValue(), this.getTextPassword().getValue());
            }


            var lblRegister = new qx.ui.form.Button("Register");
            lblRegister.setAppearance("Link");
            this.add(lblRegister);
            lblRegister.addListener("click", function (e)
            {
                katzenjammer.container.MainContainer.Instance.switchWindow("Login", "Register");
            }, this);
        },


        login: function (user, password)
        {
            var passwordMd5 = katzenjammer.data.ToolBox.createPassword(password);
            var data = {
                Action: "login",
                Data: {
                    "User": user,
                    "Password": passwordMd5
                }
            };

            var req = new katzenjammer.data.ServiceRequest(data);
            req.addListener("success", function (e)
            {
                var response = e.getTarget().getResponse();
                //console.log(response);

                if (response.success)
                {
                    if (this.getAutoLogin().getValue())
                    {
                        qx.bom.Cookie.set("User", user, 7, "Login");
                        qx.bom.Cookie.set("Password", password, 7, "Login");
                    }
                    else
                    {
                        qx.bom.Cookie.del("User", "Login");
                        qx.bom.Cookie.del("Password", "Login");
					}
                    katzenjammer.container.MainContainer.Instance.loadingUser(response.data);
                }
                else
                {
                    var error = response.error[0];
                    this.getLabelWrongUser().setVisibility(error.id === 21 ? "visible": "excluded");
                    this.getLabelWrongPassword().setVisibility(error.id === 22 ? "visible": "excluded");
				}
            }, this);

            req.send();
		}
    }
});
