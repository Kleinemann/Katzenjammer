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
      "qx.ui.container.Scroll": {
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
    construct: function construct(header, body, subbody) {
      var layout = new qx.ui.layout.Dock(3, 3); //layout.setSeparatorX("separator-horizontal");

      layout.setSeparatorY("separator-vertical");
      qx.ui.container.Composite.constructor.call(this, layout);

      if (header !== undefined && header !== null) {
        if (typeof header === "string") this.setHeader(new qx.ui.basic.Label(header));else this.setHeader(header);
        this.add(this.getHeader(), {
          edge: "north"
        });
      }

      if (subbody !== undefined && subbody !== null) {
        this.setSubBody(subbody);
        this.add(this.getSubBody(), {
          edge: "north"
        });
      }

      this.setScroll(new qx.ui.container.Scroll());
      this.add(this.getScroll());

      if (body !== undefined) {
        this.setBody(body);
        this.getScroll().add(this.getBody());
      }
    },
    members: {}
  });
  katzenjammer.widgets.WindowBase.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=WindowBase.js.map?dt=1650969130289