function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.Promise": {}
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
   * *********************************************************************** */
  var _require = require("util"),
      promisify = _require.promisify;

  var nodePromisify = promisify;

  var PromisePool = require("es6-promise-pool");

  qx.Class.define("qx.tool.utils.Promisify", {
    statics: {
      MAGIC_KEY: "__isPromisified__",
      IGNORED_PROPS: /^(?:promises|length|name|arguments|caller|callee|prototype|__isPromisified__)$/,
      promisifyAll: function promisifyAll(target, fn) {
        var _this = this;

        Object.getOwnPropertyNames(target).forEach(function (key) {
          if (_this.IGNORED_PROPS.test(key) || fn && fn(key, target) === false) {
            return;
          }

          if (typeof target[key] !== "function") {
            return;
          }

          if (_this.isPromisified(target[key])) {
            return;
          }

          var promisifiedKey = key + "Async";
          target[promisifiedKey] = _this.promisify(target[key]);
          [key, promisifiedKey].forEach(function (key) {
            Object.defineProperty(target[key], _this.MAGIC_KEY, {
              value: true,
              configurable: true,
              enumerable: false,
              writable: true
            });
          });
        });
        return target;
      },
      isPromisified: function isPromisified(fn) {
        try {
          return fn[this.MAGIC_KEY] === true;
        } catch (e) {
          return false;
        }
      },
      promisify: function promisify(fn, context) {
        fn = nodePromisify(fn);

        if (context) {
          fn = fn.bind(context);
        }

        return fn;
      },
      poolEachOf: function poolEachOf(arr, size, fn) {
        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var index, pool;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  index = 0;
                  pool = new PromisePool(function () {
                    if (index >= arr.length) {
                      return null;
                    }

                    var item = arr[index++];
                    return fn(item);
                  }, 10);
                  _context.next = 4;
                  return pool.start();

                case 4:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }))();
      },
      map: function map(arr, fn) {
        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return qx.Promise.all(arr.map(fn));

                case 2:
                  return _context2.abrupt("return", _context2.sent);

                case 3:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }))();
      },
      some: function some(arr, fn) {
        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return new qx.Promise(function (resolve, reject) {
                    var count = 0;
                    arr.forEach(function () {
                      qx.Promise.resolve(fn.apply(void 0, arguments)).then(function (result) {
                        count++;

                        if (result && resolve) {
                          resolve(true);
                          resolve = null;
                        }

                        if (count == arr.length && resolve) {
                          resolve(false);
                        }

                        return null;
                      });
                    });
                  });

                case 2:
                  return _context3.abrupt("return", _context3.sent);

                case 3:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }))();
      },
      someEach: function someEach(arr, fn) {
        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
          var index, next;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  index = 0;

                  next = function next() {
                    if (index >= arr.length) {
                      return qx.Promise.resolve(false);
                    }

                    var item = arr[index++];
                    return qx.Promise.resolve(fn(item)).then(function (result) {
                      if (result) {
                        return true;
                      }

                      return next();
                    });
                  };

                  _context4.next = 4;
                  return next();

                case 4:
                  return _context4.abrupt("return", _context4.sent);

                case 5:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4);
        }))();
      },
      somePool: function somePool(arr, size, fn) {
        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.next = 2;
                  return new qx.Promise(function (resolve, reject) {
                    var index = 0;
                    var pool = new PromisePool(function () {
                      if (!resolve) {
                        return null;
                      }

                      if (index >= arr.length) {
                        resolve(false);
                        return null;
                      }

                      var item = arr[index++];
                      return fn(item).then(function (result) {
                        if (result && resolve) {
                          resolve(true);
                          resolve = null;
                        }
                      });
                    }, 10);
                    pool.start();
                  });

                case 2:
                  return _context5.abrupt("return", _context5.sent);

                case 3:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5);
        }))();
      },
      call: function call(fn) {
        return new Promise(function (resolve, reject) {
          fn(function (err) {
            if (err) {
              reject(err);
            } else {
              for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
              }

              resolve.apply(void 0, args);
            }
          });
        });
      },
      callback: function callback(promise, cb) {
        if (cb) {
          promise = promise.then(function () {
            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }

            return cb.apply(void 0, [null].concat(args));
          })["catch"](function (err) {
            return cb(err);
          });
        }

        return promise;
      },
      fs: null,
      each: function each(coll, fn) {
        return qx.tool.utils.Promisify.eachOf(coll, fn);
      },
      forEachOf: function forEachOf(coll, fn) {
        return qx.tool.utils.Promisify.eachOf(coll, fn);
      },
      eachOf: function eachOf(coll, fn) {
        var promises = Object.keys(coll).map(function (key) {
          return fn(coll[key], key);
        });
        return qx.Promise.all(promises);
      },
      eachSeries: function eachSeries(coll, fn) {
        return qx.tool.utils.Promisify.eachOfSeries(coll, fn);
      },
      forEachOfSeries: function forEachOfSeries(coll, fn) {
        return qx.tool.utils.Promisify.eachOfSeries(coll, fn);
      },
      eachOfSeries: function eachOfSeries(coll, fn) {
        var keys = Object.keys(coll);
        var index = 0;

        function next() {
          if (index == keys.length) {
            return qx.Promise.resolve();
          }

          var key = keys[index];
          index++;
          var result = fn(coll[key], key);
          return qx.Promise.resolve(result).then(next);
        }

        return next();
      }
    },
    defer: function defer(statics) {
      statics.fs = statics.promisifyAll(require("fs"), function (key, fs) {
        return key !== "SyncWriteStream";
      });
    }
  });
  qx.tool.utils.Promisify.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Promisify.js.map?dt=1649863178488