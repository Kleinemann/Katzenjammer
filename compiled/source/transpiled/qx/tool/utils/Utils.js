function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "require": true
      },
      "qx.log.Logger": {},
      "qx.Promise": {},
      "qx.util.ResourceManager": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2017 Zenesis Ltd
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * John Spackman (john.spackman@zenesis.com, @johnspackman)
  
  ************************************************************************ */
  var path = require("upath");

  var fs = require("fs");

  var async = require("async");

  var _require = require("util"),
      promisify = _require.promisify;

  var child_process = require("child_process");

  var psTree = require("ps-tree");
  /**
   * Utility methods
   */


  qx.Class.define("qx.tool.utils.Utils", {
    extend: qx.core.Object,
    statics: {
      /**
       * Creates a Promise which can be resolved/rejected externally - it has
       * the resolve/reject methods as properties
       *
       * @returns {Promise} a promise
       */
      newExternalPromise: function newExternalPromise() {
        var resolve;
        var reject;
        var promise = new Promise(function (resolve_, reject_) {
          resolve = resolve_;
          reject = reject_;
        });
        promise.resolve = resolve;
        promise.reject = reject;
        return promise;
      },
      promisifyThis: function promisifyThis(fn, self) {
        for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          args[_key - 2] = arguments[_key];
        }

        return new Promise(function (resolve, reject) {
          args = args.slice();
          args.push(function (err, result) {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });

          try {
            fn.apply(self, args);
          } catch (ex) {
            reject(ex);
          }
        });
      },

      /**
       * Error that can be thrown to indicate wrong user input  and which doesn't
       * need a stack trace
       *
       * @param {string} message
       * @returns {Error}
       */
      UserError: /*#__PURE__*/function (_Error) {
        "use strict";

        _inherits(UserError, _Error);

        var _super = _createSuper(UserError);

        function UserError(message) {
          var _this;

          _classCallCheck(this, UserError);

          _this = _super.call(this, message);
          _this.name = "UserError";
          _this.stack = null;
          return _this;
        }

        return UserError;
      }( /*#__PURE__*/_wrapNativeSuper(Error)),

      /**
       * Formats the time in a human readable format, eg "1h 23m 45.678s"
       *
       * @param {number} millisec
       * @returns {string} formatted string
       */
      formatTime: function formatTime(millisec) {
        var seconds = Math.floor(millisec / 1000);
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);
        millisec %= 1000;
        var result = "";

        if (hours) {
          result += (hours > 9 ? hours : "0" + hours) + "h ";
        }

        if (hours || minutes) {
          result += (minutes > 9 ? minutes : "0" + minutes) + "m ";
        }

        if (seconds > 9 || !hours && !minutes) {
          result += seconds;
        } else if (hours || minutes) {
          result += "0" + seconds;
        }

        result += "." + (millisec > 99 ? "" : millisec > 9 ? "0" : "00") + millisec + "s";
        return result;
      },

      /**
       * Creates a dir
       * @param dir
       * @param cb
       */
      mkpath: function mkpath(dir, cb) {
        dir = path.normalize(dir);
        var segs = dir.split(path.sep);
        var made = "";
        async.eachSeries(segs, function (seg, cb) {
          if (made.length || !seg.length) {
            made += "/";
          }

          made += seg;
          fs.exists(made, function (exists) {
            if (!exists) {
              fs.mkdir(made, function (err) {
                if (err && err.code === "EEXIST") {
                  err = null;
                }

                cb(err);
              });
              return;
            }

            fs.stat(made, function (err, stat) {
              if (err) {
                cb(err);
              } else if (stat.isDirectory()) {
                cb(null);
              } else {
                cb(new Error("Cannot create " + made + " (in " + dir + ") because it exists and is not a directory", "ENOENT"));
              }
            });
          });
        }, function (err) {
          cb(err);
        });
      },

      /**
       * Creates the parent directory of a filename, if it does not already exist
       */
      mkParentPath: function mkParentPath(dir, cb) {
        var segs = dir.split(/[\\\/]/);
        segs.pop();

        if (!segs.length) {
          return cb && cb();
        }

        dir = segs.join(path.sep);
        return this.mkpath(dir, cb);
      },

      /**
       * Creates the parent directory of a filename, if it does not already exist
       *
       * @param {string} filename the filename to create the parent directory of
       *
       * @return {Promise?} the value
       */
      makeParentDir: function makeParentDir(filename) {
        var mkParentPath = promisify(this.mkParentPath).bind(this);
        return mkParentPath(filename);
      },

      /**
       * Creates a directory, if it does not exist, including all intermediate paths
       *
       * @param {string} filename the directory to create
       *
       * @return {Promise?} the value
       */
      makeDirs: function makeDirs(filename) {
        var mkpath = promisify(this.mkpath);
        return mkpath(filename);
      },

      /**
       * Writable stream that keeps track of what the current line number is
       */
      LineCountingTransform: null,

      /**
       * Writable stream that strips out sourceMappingURL comments
       */
      StripSourceMapTransform: null,

      /**
       * Writable stream that keeps track of what's been written and can return
       * a copy as a string
       */
      ToStringWriteStream: null,

      /*  Function to test if an object is a plain object, i.e. is constructed
       **  by the built-in Object constructor and inherits directly from Object.prototype
       **  or null. Some built-in objects pass the test, e.g. Math which is a plain object
       **  and some host or exotic objects may pass also.
       **
       **  @param {} obj - value to test
       **  @returns {Boolean} true if passes tests, false otherwise
       *
       * @see https://stackoverflow.com/a/5878101/2979698
       */
      isPlainObject: function isPlainObject(obj) {
        // Basic check for Type object that's not null
        if (_typeof(obj) == "object" && obj !== null) {
          // If Object.getPrototypeOf supported, use it
          if (typeof Object.getPrototypeOf == "function") {
            var proto = Object.getPrototypeOf(obj);
            return proto === Object.prototype || proto === null;
          } // Otherwise, use internal class
          // This should be reliable as if getPrototypeOf not supported, is pre-ES5


          return Object.prototype.toString.call(obj) == "[object Object]";
        } // Not an object


        return false;
      },

      /**
       * Runs the given command and returns an object containing information on the
       * `exitCode`, the `output`, potential `error`s, and additional `messages`.
       * @param {String} cwd The current working directory
       * @param {String} args One or more command line arguments, including the
       * command itself
       * @return {{exitCode: Number, output: String, error: *, messages: *}}
       */
      runCommand: function runCommand(cwd) {
        var _arguments = arguments;
        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var _len2, args, _key2, options;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  for (_len2 = _arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                    args[_key2 - 1] = _arguments[_key2];
                  }

                  options = {};

                  if (_typeof(cwd) == "object") {
                    options = cwd;
                  } else {
                    args = args.filter(function (value) {
                      if (typeof value == "string") {
                        return true;
                      }

                      if (!options) {
                        options = value;
                      }

                      return false;
                    });

                    if (!options.cwd) {
                      options.cwd = cwd;
                    }

                    if (!options.cmd) {
                      options.cmd = args.shift();
                    }

                    if (!options.args) {
                      options.args = args;
                    }
                  }

                  if (!options.error) {
                    options.error = console.error;
                  }

                  if (!options.log) {
                    options.log = console.log;
                  }

                  _context.next = 7;
                  return new Promise(function (resolve, reject) {
                    var env = process.env;

                    if (options.env) {
                      env = Object.assign({}, env);
                      Object.assign(env, options.env);
                    }

                    var proc = child_process.spawn(options.cmd, options.args, {
                      cwd: options.cwd,
                      shell: true,
                      env: env
                    });
                    var result = {
                      exitCode: null,
                      output: "",
                      error: "",
                      messages: null
                    };
                    proc.stdout.on("data", function (data) {
                      data = data.toString().trim();
                      options.log(data);
                      result.output += data;
                    });
                    proc.stderr.on("data", function (data) {
                      data = data.toString().trim();
                      options.error(data);
                      result.error += data;
                    });
                    proc.on("close", function (code) {
                      result.exitCode = code;
                      resolve(result);
                    });
                    proc.on("error", function (err) {
                      reject(err);
                    });
                  });

                case 7:
                  return _context.abrupt("return", _context.sent);

                case 8:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }))();
      },

      /**
       * Awaitable wrapper around child_process.spawn.
       * Runs a command in a separate process. The output of the command
       * is ignored. Throws when the exit code is not 0.
       * @param  {String} cmd Name of the command
       * @param  {Array} args Array of arguments to the command
       * @return {Promise<Number>} A promise that resolves with the exit code
       */
      run: function run(cmd, args) {
        var opts = {
          env: process.env
        };
        return new Promise(function (resolve, reject) {
          var exe = child_process.spawn(cmd, args, opts); // suppress all output unless in verbose mode

          exe.stdout.on("data", function (data) {
            qx.log.Logger.debug(data.toString());
          });
          exe.stderr.on("data", function (data) {
            qx.log.Logger.error(data.toString());
          });
          exe.on("close", function (code) {
            if (code !== 0) {
              var message = "Error executing '".concat(cmd, " ").concat(args.join(" "), "'. Use --verbose to see what went wrong.");
              reject(new qx.tool.utils.Utils.UserError(message));
            } else {
              resolve(0);
            }
          });
          exe.on("error", reject);
        });
      },

      /**
       * Awaitable wrapper around child_process.exec
       * Executes a command and return its result wrapped in a Promise.
       * @param cmd {String} Command with all parameters
       * @return {Promise<String>} Promise that resolves with the result
       */
      exec: function exec(cmd) {
        return new Promise(function (resolve, reject) {
          child_process.exec(cmd, function (err, stdout, stderr) {
            if (err) {
              reject(err);
            }

            if (stderr) {
              reject(new Error(stderr));
            }

            resolve(stdout);
          });
        });
      },

      /**
       * Parses a command line and separates them out into an array that can be given to `child_process.spawn` etc
       *
       * @param {String} cmd
       * @returns {String[]}
       */
      parseCommand: function parseCommand(str) {
        var inQuote = null;
        var inArg = false;
        var lastC = null;
        var start = 0;
        var args = [];

        for (var i = 0; i < str.length; i++) {
          var c = str[i];

          if (inQuote) {
            if (c == inQuote) {
              inQuote = null;
            }

            continue;
          }

          if (c == '"' || c == "'") {
            inQuote = c;

            if (!inArg) {
              inArg = true;
              start = i;
            }

            continue;
          }

          if (c == " " || c == "\t") {
            if (inArg) {
              var arg = str.substring(start, i);
              args.push(arg);
              inArg = false;
            }
          } else {
            if (!inArg) {
              inArg = true;
              start = i;
            }
          }
        }

        if (inArg) {
          var _arg = str.substring(start);

          args.push(_arg);
        }

        return args;
      },

      /**
       * Quotes special characters in the argument array, ensuring that they are safe to pass to the command line
       *
       * @param {String[]} cmd
       * @returns {String[]}
       */
      quoteCommand: function quoteCommand(cmd) {
        var SPECIALS = '&*?;# "';
        cmd = cmd.map(function (arg) {
          var c = arg[0];

          if ((c == "'" || c == '"') && c == arg[arg.length - 1]) {
            return arg;
          }

          if (arg.indexOf("'") > -1) {
            if (arg.indexOf('"') > -1) {
              return "$'" + arg.replace(/'/g, "\\'") + "'";
            }

            return '"' + arg + '"';
          }

          for (var i = 0; i < SPECIALS.length; i++) {
            if (arg.indexOf(SPECIALS[i]) > -1) {
              return "'" + arg + "'";
            }
          }

          return arg;
        });
        return cmd;
      },

      /**
       * Reformats a command line
       *
       * @param {String} cmd
       * @returns {String}
       */
      formatCommand: function formatCommand(cmd) {
        return qx.tool.utils.Utils.quoteCommand(cmd).join(" ");
      },

      /**
       * Kills a process tree
       *
       * @param {Number} parentId parent process ID to kill
       */
      killTree: function killTree(parentId) {
        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return new qx.Promise(function (resolve, reject) {
                    psTree(parentId, function (err, children) {
                      if (err) {
                        reject(err);
                        return;
                      }

                      children.forEach(function (item) {
                        try {
                          process.kill(item.PID);
                        } catch (ex) {// Nothing
                        }
                      });

                      try {
                        process.kill(parentId);
                      } catch (ex) {// Nothing
                      }

                      resolve();
                    });
                  });

                case 2:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }))();
      },

      /**
       * Returns the absolute path to the template directory
       * @return {String}
       */
      getTemplateDir: function getTemplateDir() {
        var dir = qx.util.ResourceManager.getInstance().toUri("qx/tool/cli/templates/template_vars.js");
        dir = path.dirname(dir);
        return dir;
      },

      /**
       * Detects whether the command line explicit set an option (as opposed to yargs
       * providing a default value).  Note that this does not handle aliases, use the
       * actual, full option name.
       *
       * @param option {String} the name of the option, eg "listen-port"
       * @return {Boolean}
       */
      isExplicitArg: function isExplicitArg(option) {
        function searchForOption(option) {
          return process.argv.indexOf(option) > -1;
        }

        return searchForOption("-".concat(option)) || searchForOption("--".concat(option));
      }
    },
    defer: function defer(statics) {
      var _require2 = require("stream"),
          Writable = _require2.Writable,
          Transform = _require2.Transform;

      var LineCountingTransform = /*#__PURE__*/function (_Transform) {
        "use strict";

        _inherits(LineCountingTransform, _Transform);

        var _super2 = _createSuper(LineCountingTransform);

        function LineCountingTransform(options) {
          var _this2;

          _classCallCheck(this, LineCountingTransform);

          _this2 = _super2.call(this, options);
          _this2.__lineNumber__P_183_0 = 1;
          return _this2;
        }

        _createClass(LineCountingTransform, [{
          key: "_write",
          value: function _write(chunk, encoding, callback) {
            var str = chunk.toString();

            for (var i = 0; i < str.length; i++) {
              if (str[i] == "\n") {
                this.__lineNumber__P_183_0++;
              }
            }

            this.push(str);
            callback();
          }
        }, {
          key: "getLineNumber",
          value: function getLineNumber() {
            return this.__lineNumber__P_183_0;
          }
        }]);

        return LineCountingTransform;
      }(Transform);

      statics.LineCountingTransform = LineCountingTransform;

      var StripSourceMapTransform = /*#__PURE__*/function (_Transform2) {
        "use strict";

        _inherits(StripSourceMapTransform, _Transform2);

        var _super3 = _createSuper(StripSourceMapTransform);

        function StripSourceMapTransform(options) {
          var _this3;

          _classCallCheck(this, StripSourceMapTransform);

          _this3 = _super3.call(this, options);
          _this3.__lastLine__P_183_1 = "";
          return _this3;
        }

        _createClass(StripSourceMapTransform, [{
          key: "_transform",
          value: function _transform(chunk, encoding, callback) {
            var str = this.__lastLine__P_183_1 + chunk.toString();
            var pos = str.lastIndexOf("\n");

            if (pos > -1) {
              this.__lastLine__P_183_1 = str.substring(pos);
              str = str.substring(0, pos);
            } else {
              this.__lastLine__P_183_1 = str;
              str = "";
            }

            str = str.replace(/\n\/\/\#\s*sourceMappingURL=.*$/m, "");
            this.push(str);
            callback();
          }
        }, {
          key: "_flush",
          value: function _flush(callback) {
            var str = this.__lastLine__P_183_1;
            this.__lastLine__P_183_1 = null;
            str = str.replace(/\n\/\/\#\s*sourceMappingURL=.*$/m, "");
            this.push(str);
            callback();
          }
        }]);

        return StripSourceMapTransform;
      }(Transform);

      statics.StripSourceMapTransform = StripSourceMapTransform;

      var ToStringWriteStream = /*#__PURE__*/function (_Writable) {
        "use strict";

        _inherits(ToStringWriteStream, _Writable);

        var _super4 = _createSuper(ToStringWriteStream);

        function ToStringWriteStream(dest, options) {
          var _this4;

          _classCallCheck(this, ToStringWriteStream);

          _this4 = _super4.call(this, options);
          _this4.__dest__P_183_2 = dest;
          _this4.__value__P_183_3 = "";
          return _this4;
        }

        _createClass(ToStringWriteStream, [{
          key: "_write",
          value: function _write(chunk, encoding, callback) {
            this.__value__P_183_3 += chunk.toString();

            if (this.__dest__P_183_2) {
              this.__dest__P_183_2.write(chunk, encoding, callback);
            } else if (callback) {
              callback();
            }
          }
        }, {
          key: "toString",
          value: function toString() {
            return this.__value__P_183_3;
          }
        }]);

        return ToStringWriteStream;
      }(Writable);

      statics.ToStringWriteStream = ToStringWriteStream;
    }
  });
  qx.tool.utils.Utils.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Utils.js.map?dt=1649863178222