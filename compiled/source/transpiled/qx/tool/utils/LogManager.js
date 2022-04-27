function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.tool.utils.Logger": {
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.tool.utils.Json": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
   *
   *    qooxdoo-compiler - node.js based replacement for the Qooxdoo python
   *    toolchain
   *
   *    https://github.com/qooxdoo/qooxdoo
   *
   *    Copyright:
   *      2011-2017 Zenesis Limited, http://www.zenesis.com
   *
   *    License:
   *      MIT: https://opensource.org/licenses/MIT
   *
   *      This software is provided under the same licensing terms as Qooxdoo,
   *      please see the LICENSE file in the Qooxdoo project's top-level directory
   *      for details.
   *
   *    Authors:
   *      * John Spackman (john.spackman@zenesis.com, @johnspackman)
   *
   *
   * *********************************************************************** */

  /**
   * @require(qx.tool.utils.Logger)
   */
  var LEVELS = ["trace", "debug", "info", "warn", "error", "fatal"];

  function zeropad2(val) {
    if (val < 10) {
      return "0" + val;
    }

    return String(val);
  }

  function zeropad3(val) {
    if (val < 10) {
      return "00" + val;
    }

    if (val < 100) {
      return "0" + val;
    }

    return String(val);
  }

  var PADDING = "";

  function padding(minLen) {
    while (PADDING.length < minLen) {
      PADDING += "     ";
    }

    return PADDING;
  }

  function rpad(str, len) {
    str = String(str);

    if (str.length < len) {
      str = (str + padding(len)).substring(0, len);
    }

    return str;
  }

  qx.Class.define("qx.tool.utils.LogManager", {
    extend: qx.core.Object,
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      var t = this;
      this._loggers = {};
      this._levels = {};
      this._sinks = [];
      this._config = {};
      this._defaultSink = qx.tool.utils.LogManager.consoleSink;
      this.addSink(this._defaultSink);
      LEVELS.forEach(function (levelId, index) {
        t._levels[levelId] = index;
      });
      this._defaultLevel = this._levels.info;
    },
    statics: {
      __instance__P_181_0: null,

      /**
       * create a logger for a specified category
       *
       * @param {*} categoryName
       */
      createLog: function createLog(categoryName) {
        if (!categoryName) {
          categoryName = "generic";
        }

        return this.getInstance().getLogger(categoryName);
      },

      /**
       * Returns the global instance
       * @returns {null}
       */
      getInstance: function getInstance() {
        if (!this.__instance__P_181_0) {
          this.__instance__P_181_0 = new qx.tool.utils.LogManager();
        }

        return this.__instance__P_181_0;
      },
      nullSink: function nullSink(logger, level, msg) {// Nothing
      },
      consoleSink: function consoleSink(logger, level, msg) {
        var dt = new Date();
        var str = dt.getFullYear() + "-" + zeropad2(dt.getMonth() + 1) + "-" + zeropad2(dt.getDate()) + " " + zeropad2(dt.getHours()) + ":" + zeropad2(dt.getMinutes()) + ":" + zeropad2(dt.getSeconds()) + "." + zeropad3(dt.getMilliseconds());
        console.log(str + " [" + rpad(level, 5) + "] " + rpad(logger.getId(), 15, true) + " " + msg);
      }
    },
    members: {
      loadConfig: function loadConfig(config) {
        var _this = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var t, id, logger;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!(typeof config == "string")) {
                    _context.next = 4;
                    break;
                  }

                  _context.next = 3;
                  return qx.tool.utils.Json.loadJsonAsync(config);

                case 3:
                  config = _context.sent;

                case 4:
                  t = _this;
                  _this._config = config;
                  _this._defaultLevel = _this.getLoggerLevel("__default__", "info");

                  for (id in _this._loggers) {
                    logger = _this._loggers[id];
                    logger.setMinLevel(t.getLoggerLevel(logger.getId()));
                  }

                case 8:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }))();
      },
      getLogger: function getLogger(id) {
        var logger = this._loggers[id];

        if (!logger) {
          logger = this._loggers[id] = new qx.tool.utils.Logger(id, this.getLoggerLevel(id));
        }

        return logger;
      },
      getLoggerLevel: function getLoggerLevel(id, defaultLevel) {
        var cat = this._config && this._config.categories && this._config.categories[id];
        var level = cat && cat.level;

        if (level) {
          level = this._levels[level];
        }

        if (typeof level == "number") {
          return level;
        }

        if (defaultLevel) {
          return this._levels[defaultLevel];
        }

        return this._defaultLevel;
      },
      addSink: function addSink(sink) {
        this._sinks.push(sink);
      },
      removeSink: function removeSink(sink) {
        var index = this._sinks.indexOf(sink);

        if (index > -1) {
          this._sinks.splice(index, 1);
        }
      },
      output: function output(logger, level, msg) {
        if (typeof level != "string") {
          level = LEVELS[level];
        }

        this._sinks.forEach(function (sink) {
          sink.call(this, logger, level, msg);
        });
      },
      setDefaultSink: function setDefaultSink(sink) {
        var oldSink = this._defaultSink;

        if (this._defaultSink) {
          this.removeSink(this._defaultSink);
        }

        this._defaultSink = sink;

        if (sink) {
          this.addSink(sink);
        }

        return oldSink;
      }
    }
  });
  qx.tool.utils.LogManager.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=LogManager.js.map?dt=1649863177963