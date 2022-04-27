function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.tool.utils.Promisify": {
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.tool.utils.json.Parser": {},
      "qx.tool.utils.json.Stringify": {},
      "qx.lang.Type": {},
      "qx.tool.compiler.Console": {}
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
   *      2011-2018 Zenesis Limited, http://www.zenesis.com
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
   *      * oetiker
   *      * cboulanger
   *
   * *********************************************************************** */
  var Ajv = require("ajv");

  var betterAjvErrors = require("better-ajv-errors");

  var fs = qx.tool.utils.Promisify.fs;
  qx.Class.define("qx.tool.utils.Json", {
    statics: {
      /**
       * Parses JSON string into an object
       * @param str {String} the data to parse
       * @return {Object}
       */
      parseJson: function parseJson(str) {
        if (str === null || !str.trim()) {
          return null;
        }

        var ast = qx.tool.utils.json.Parser.parseToAst(str.trim());
        return qx.tool.utils.json.Stringify.astToObject(ast);
      },

      /**
       * Validates a json object against the given schema signature and outputs
       * diagnostic information if validation failed
       * @param json {Object} The json object to check
       * @param schema {Array|Object}
       *    The json-schema object or an array of schema objects. If array,
       *    only the first is used to validate, but the first schema can
       *    refer to the others.
       * @param warnOnly {Boolean} If true, do not throw a fatal error
       * @return {Boolean}
       *    Returns true if successful and false on failure if the
       *    'warnOnly' parameter is true
       */
      validate: function validate(json, schema) {
        var warnOnly = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var ajv = new Ajv({
          allErrors: true,
          strict: false
        });

        if (qx.lang.Type.isArray(schema)) {
          ajv.addSchema(schema);
          schema = schema[0].$id;
        }

        if (ajv.validate(schema, json)) {
          // success!
          return true;
        }

        if (warnOnly) {
          var message = betterAjvErrors(schema.$id, json, ajv.errors, {
            format: "cli",
            indent: 2
          });
          qx.tool.compiler.Console.warn("JSON data does not validate against " + schema.$id + ":\n" + message);
          return false;
        } // throw fatal error


        var err = betterAjvErrors(schema.$id, json, ajv.errors, {
          format: "js"
        });
        var msg;

        if (Array.isArray(err) && err.length) {
          msg = err.reduce(function (prev, curr, index) {
            return "".concat(prev, " ").concat(index + 1, ") ").concat(curr.error);
          }, "").trim();
        } else if (Array.isArray(ajv.errors)) {
          msg = ajv.errors.reduce(function (prev, curr, index) {
            return "".concat(prev, " ").concat(index + 1, ") ").concat(curr.dataPath, " ").concat(curr.message);
          }, "").trim();
        } else {
          msg = "Unknown error during validation.";
        }

        throw new Error(msg);
      },

      /**
       * Identify the type and version of the config file schema in the data that
       * has been passed. Return an object containing type and version of the json
       * schema, or null if no schema could been detected
       * Todo: This needs to be rewritten.
       * @param data {Object} JSON data
       * @return {{type,version}|null}
       */
      getSchemaInfo: function getSchemaInfo(data) {
        var schemaInfo = {};

        if (data.$schema) {
          var match = data.$schema.match(/\/([^-]+)-([^.]+)\.json$/);

          if (match) {
            schemaInfo.type = match[1].toLocaleLowerCase();
            schemaInfo.version = match[2].replace(/-/g, ".");
          } else {
            // deprecated schema url
            var _match = data.$schema.match(/\/v([^/]+)\/([^.]+)\.json$/);

            if (_match) {
              schemaInfo.type = _match[2].toLocaleLowerCase();
              schemaInfo.version = _match[1];
            }
          } // guess file type, this would be easy with the file name!

        } else if (data.targets) {
          schemaInfo.type = "compile";
          schemaInfo.version = "0";
        } else if (data.info && data.provides) {
          schemaInfo.type = "manifest";
          schemaInfo.version = "0";
        } else if (data.libraries || data.contribs) {
          schemaInfo.type = "qooxdoo";
          schemaInfo.version = "0";
        } // no schema was found


        if (Object.getOwnPropertyNames(schemaInfo).length === 0) {
          return null;
        }

        return schemaInfo;
      },

      /**
       * Loads JSON data from a file and returns it as an object; if the file does not exist, then
       * null is returned
       *
       * @param filename {String} the filename to load
       * @return {Object|null} the parsed contents, or null if the file does not exist
       */
      loadJsonAsync: function loadJsonAsync(filename) {
        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var data;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return fs.existsAsync(filename);

                case 2:
                  if (_context.sent) {
                    _context.next = 4;
                    break;
                  }

                  return _context.abrupt("return", null);

                case 4:
                  _context.next = 6;
                  return fs.readFileAsync(filename, "utf8");

                case 6:
                  data = _context.sent;
                  _context.prev = 7;
                  return _context.abrupt("return", qx.tool.utils.Json.parseJson(data));

                case 11:
                  _context.prev = 11;
                  _context.t0 = _context["catch"](7);
                  throw new Error("Failed to load " + filename + ": " + _context.t0);

                case 14:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[7, 11]]);
        }))();
      },

      /**
       * Saves JSON data to a file, or erases the file if data is null
       *
       * @param filename {String} filename to write to
       * @param data {Object|null} the data to write. If null, remove the file
       */
      saveJsonAsync: function saveJsonAsync(filename, data) {
        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (!(data !== null)) {
                    _context2.next = 5;
                    break;
                  }

                  _context2.next = 3;
                  return fs.writeFileAsync(filename, JSON.stringify(data, null, 2), "utf8");

                case 3:
                  _context2.next = 9;
                  break;

                case 5:
                  _context2.next = 7;
                  return fs.existsAsync(filename);

                case 7:
                  if (!_context2.sent) {
                    _context2.next = 9;
                    break;
                  }

                  fs.unlinkAsync(filename);

                case 9:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }))();
      }
    }
  });
  qx.tool.utils.Json.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Json.js.map?dt=1649863178341