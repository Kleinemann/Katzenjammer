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
      "qx.ui.layout.Dock": {
        "construct": true
      },
      "qx.ui.basic.Label": {
        "construct": true
      },
      "qx.ui.form.Button": {
        "construct": true
      },
      "qx.ui.container.Scroll": {
        "construct": true
      },
      "katzenjammer.container.MainContainer": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* global katzenjammer */

  /**
  *
   * @asset(katzenjammer/*)
  *
  **/
  qx.Class.define("katzenjammer.widgets.WindowBase", {
    extend: qx.ui.container.Composite,
    statics: {},
    properties: {
      appearance: {
        refine: true,
        init: "WindowBase"
      },
      Header: {
        init: null
      },
      Scroll: {
        init: null
      },
      Body: {
        init: null
      },
      SubBody: {
        init: null
      }
    },
    construct: function construct(window, settings) {
      var layout = new qx.ui.layout.Dock(3, 3);
      layout.setSeparatorY("separator-vertical");
      qx.ui.container.Composite.constructor.call(this, layout);
      if (settings.header !== undefined) this.setHeader(this.get(settings.header));else {
        var headerCont = new qx.ui.container.Composite(new qx.ui.layout.Dock(3, 3));
        if (settings.name !== undefined) headerCont.add(new qx.ui.basic.Label(settings.name), {
          edge: "west"
        });
        if (settings.propname !== undefined) headerCont.add(window.get(settings.propname), {
          edge: "west"
        });

        if (settings.closeable) {
          var btnClose = new qx.ui.form.Button("X");
          btnClose.addListener("execute", this.close, this);
          headerCont.add(btnClose, {
            edge: "east"
          });
        }

        if (settings.subheader !== undefined) headerCont.add(window.get(settings.subheader), {
          edge: "east"
        });
        this.setHeader(headerCont);
      }
      this.add(this.getHeader(), {
        edge: "north"
      });

      if (settings.subbody !== undefined) {
        this.setSubBody(window.get(settings.subbody));
        this.add(this.getSubBody(), {
          edge: "north"
        });
      }

      this.setScroll(new qx.ui.container.Scroll());
      this.add(this.getScroll());

      if (window !== undefined && window !== null) {
        this.setBody(window);
        this.getScroll().add(this.getBody());
      }
    },
    members: {
      close: function close() {
        katzenjammer.container.MainContainer.Instance.loadingLayout("default");
      }
    }
  });
  katzenjammer.widgets.WindowBase.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=WindowBase.js.map?dt=1652417291763