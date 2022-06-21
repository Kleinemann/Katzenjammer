(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.lang.String": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
       * Christian Hagendorn (cs)
  
  ************************************************************************ */

  /**
   * Methods to convert colors between different color spaces.
   *
   * @ignore(qx.theme.*)
   * @ignore(qx.Class)
   * @ignore(qx.Class.*)
   */
  qx.Bootstrap.define("qx.util.ColorUtil", {
    statics: {
      /**
       * Regular expressions for color strings
       */
      REGEXP: {
        hexShort: /^#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])?$/,
        hexLong: /^#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})?$/,
        hex3: /^#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])$/,
        hex6: /^#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])$/,
        rgb: /^rgb\(\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*\)$/,
        rgba: /^rgba\(\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,2}[0-9]*)\s*\)$/
      },

      /**
       * CSS3 system color names.
       */
      SYSTEM: {
        activeborder: true,
        activecaption: true,
        appworkspace: true,
        background: true,
        buttonface: true,
        buttonhighlight: true,
        buttonshadow: true,
        buttontext: true,
        captiontext: true,
        graytext: true,
        highlight: true,
        highlighttext: true,
        inactiveborder: true,
        inactivecaption: true,
        inactivecaptiontext: true,
        infobackground: true,
        infotext: true,
        menu: true,
        menutext: true,
        scrollbar: true,
        threeddarkshadow: true,
        threedface: true,
        threedhighlight: true,
        threedlightshadow: true,
        threedshadow: true,
        window: true,
        windowframe: true,
        windowtext: true
      },

      /**
       * Named colors, only the 16 basic colors plus the following ones:
       * transparent, grey, magenta, orange and brown
       */
      NAMED: {
        black: [0, 0, 0],
        silver: [192, 192, 192],
        gray: [128, 128, 128],
        white: [255, 255, 255],
        maroon: [128, 0, 0],
        red: [255, 0, 0],
        purple: [128, 0, 128],
        fuchsia: [255, 0, 255],
        green: [0, 128, 0],
        lime: [0, 255, 0],
        olive: [128, 128, 0],
        yellow: [255, 255, 0],
        navy: [0, 0, 128],
        blue: [0, 0, 255],
        teal: [0, 128, 128],
        aqua: [0, 255, 255],
        // Additional values
        transparent: [-1, -1, -1],
        magenta: [255, 0, 255],
        // alias for fuchsia
        orange: [255, 165, 0],
        brown: [165, 42, 42]
      },

      /**
       * Whether the incoming value is a named color.
       *
       * @param value {String} the color value to test
       * @return {Boolean} true if the color is a named color
       */
      isNamedColor: function isNamedColor(value) {
        return this.NAMED[value] !== undefined;
      },

      /**
       * Whether the incoming value is a system color.
       *
       * @param value {String} the color value to test
       * @return {Boolean} true if the color is a system color
       */
      isSystemColor: function isSystemColor(value) {
        return this.SYSTEM[value] !== undefined;
      },

      /**
       * Whether the color theme manager is loaded. Generally
       * part of the GUI of qooxdoo.
       *
       * @return {Boolean} <code>true</code> when color theme support is ready.
       **/
      supportsThemes: function supportsThemes() {
        if (qx.Class) {
          return qx.Class.isDefined("qx.theme.manager.Color");
        }

        return false;
      },

      /**
       * Whether the incoming value is a themed color.
       *
       * @param value {String} the color value to test
       * @return {Boolean} true if the color is a themed color
       */
      isThemedColor: function isThemedColor(value) {
        if (!this.supportsThemes()) {
          return false;
        }

        if (qx.theme && qx.theme.manager && qx.theme.manager.Color) {
          return qx.theme.manager.Color.getInstance().isDynamic(value);
        }

        return false;
      },

      /**
       * Try to convert an incoming string to an RGBA array.
       * Supports themed, named and system colors, but also RGBA strings,
       * hex[3468] values.
       *
       * @param str {String} any string
       * @return {Array} returns an array of red, green, blue and optional alpha on a successful transformation
       * @throws {Error} if the string could not be parsed
       */
      stringToRgb: function stringToRgb(str) {
        if (this.supportsThemes() && this.isThemedColor(str)) {
          str = qx.theme.manager.Color.getInstance().resolveDynamic(str);
        }

        return this.cssStringToRgb(str);
      },

      /**
       * Try to convert an incoming string to an RGB array with optional alpha.
       * Support named colors, RGB strings, RGBA strings, hex[3468] values.
       *
       * @param str {String} any string
       * @return {Array} returns an array of red, green, blue on a successful transformation
       * @throws {Error} if the string could not be parsed
       */
      cssStringToRgb: function cssStringToRgb(str) {
        var color;

        if (this.isNamedColor(str)) {
          color = this.NAMED[str].concat();
        } else if (this.isSystemColor(str)) {
          throw new Error("Could not convert system colors to RGB: " + str);
        } else if (this.isRgbaString(str)) {
          color = this.__rgbaStringToRgb__P_140_0(str);
        } else if (this.isRgbString(str)) {
          color = this.__rgbStringToRgb__P_140_1();
        } else if (this.ishexShortString(str)) {
          color = this.__hexShortStringToRgb__P_140_2();
        } else if (this.ishexLongString(str)) {
          color = this.__hexLongStringToRgb__P_140_3();
        }

        if (color) {
          // don't mention alpha if the color is opaque
          if (color.length === 3 && color[3] == 1) {
            color.pop();
          }

          return color;
        }

        throw new Error("Could not parse color: " + str);
      },

      /**
       * Try to convert an incoming string to an RGB string, which can be used
       * for all color properties.
       * Supports themed, named and system colors, but also RGB strings,
       * hexShort and hexLong values.
       *
       * @param str {String} any string
       * @return {String} a RGB string
       * @throws {Error} if the string could not be parsed
       */
      stringToRgbString: function stringToRgbString(str) {
        return this.rgbToRgbString(this.stringToRgb(str));
      },

      /**
       * Converts a RGB array to an RGB string
       *
       * @param rgb {Array} an array with red, green and blue values and optionally
       * an alpha value
       * @return {String} an RGB string
       */
      rgbToRgbString: function rgbToRgbString(rgb) {
        return "rgb" + (rgb.length === 4 ? "a" : "") + "(" + rgb.map(function (v) {
          return Math.round(v * 1000) / 1000;
        }).join(",") + ")";
      },

      /**
       * Converts a RGB array to a hex[68] string
       *
       * @param rgb {Array} an array with red, green, blue and optional alpha
       * @return {String} a hex[68] string (#xxxxxx)
       */
      rgbToHexString: function rgbToHexString(rgb) {
        return "#" + qx.lang.String.pad(rgb[0].toString(16).toUpperCase(), 2) + qx.lang.String.pad(rgb[1].toString(16).toUpperCase(), 2) + qx.lang.String.pad(rgb[2].toString(16).toUpperCase(), 2) + (rgb.length === 4 && rgb[3] !== 1 ? qx.lang.String.pad(Math.round(rgb[3] * 255).toString(16).toUpperCase(), 2) : "");
      },

      /**
       * Detects if a string is a valid qooxdoo color
       *
       * @param str {String} any string
       * @return {Boolean} true when the incoming value is a valid qooxdoo color
       */
      isValidPropertyValue: function isValidPropertyValue(str) {
        return this.isThemedColor(str) || this.isNamedColor(str) || this.ishexShortString(str) || this.ishexLongString(str) || this.isRgbString(str) || this.isRgbaString(str);
      },

      /**
       * Detects if a string is a valid CSS color string
       *
       * @param str {String} any string
       * @return {Boolean} true when the incoming value is a valid CSS color string
       */
      isCssString: function isCssString(str) {
        return this.isSystemColor(str) || this.isNamedColor(str) || this.ishexShortString(str) || this.ishexLongString(str) || this.isRgbString(str) || this.isRgbaString(str);
      },

      /**
       * Detects if a string is a valid hexShort string
       *
       * @param str {String} any string
       * @return {Boolean} true when the incoming value is a valid hexShort string
       */
      ishexShortString: function ishexShortString(str) {
        return this.REGEXP.hexShort.test(str);
      },

      /**
       * Detects if a string is a valid hex3 string
       *
       * @param str {String} any string
       * @return {Boolean} true when the incoming value is a valid hex3 string
       */
      isHex3String: function isHex3String(str) {
        return this.REGEXP.hex3.test(str);
      },

      /**
       * Detects if a string is a valid hex6 string
       *
       * @param str {String} any string
       * @return {Boolean} true when the incoming value is a valid hex6 string
       */
      isHex6String: function isHex6String(str) {
        return this.REGEXP.hex6.test(str);
      },

      /**
       * Detects if a string is a valid hex6/8 string
       *
       * @param str {String} any string
       * @return {Boolean} true when the incoming value is a valid hex8 string
       */
      ishexLongString: function ishexLongString(str) {
        return this.REGEXP.hexLong.test(str);
      },

      /**
       * Detects if a string is a valid RGB string
       *
       * @param str {String} any string
       * @return {Boolean} true when the incoming value is a valid RGB string
       */
      isRgbString: function isRgbString(str) {
        return this.REGEXP.rgb.test(str);
      },

      /**
       * Detects if a string is a valid RGBA string
       *
       * @param str {String} any string
       * @return {Boolean} true when the incoming value is a valid RGBA string
       */
      isRgbaString: function isRgbaString(str) {
        return this.REGEXP.rgba.test(str);
      },

      /**
       * Converts a regexp object match of a rgb string to an RGBA array.
       *
       * @return {Array} an array with red, green, blue
       */
      __rgbStringToRgb__P_140_1: function __rgbStringToRgb__P_140_1() {
        var red = parseInt(RegExp.$1, 10);
        var green = parseInt(RegExp.$2, 10);
        var blue = parseInt(RegExp.$3, 10);
        return [red, green, blue];
      },

      /**
       * Converts a regexp object match of a rgba string to an RGB array.
       *
       * @return {Array} an array with red, green, blue
       */
      __rgbaStringToRgb__P_140_0: function __rgbaStringToRgb__P_140_0() {
        var red = parseInt(RegExp.$1, 10);
        var green = parseInt(RegExp.$2, 10);
        var blue = parseInt(RegExp.$3, 10);
        var alpha = parseFloat(RegExp.$4, 10);

        if (red === 0 && green === 0 & blue === 0 && alpha === 0) {
          // this is the (pre-alpha) representation of transparency
          // in qooxdoo
          return [-1, -1, -1];
        }

        return alpha == 1 ? [red, green, blue] : [red, green, blue, alpha];
      },

      /**
       * Converts a regexp object match of a hexShort string to an RGB array.
       *
       * @return {Array} an array with red, green, blue
       */
      __hexShortStringToRgb__P_140_2: function __hexShortStringToRgb__P_140_2() {
        var red = parseInt(RegExp.$1, 16) * 17;
        var green = parseInt(RegExp.$2, 16) * 17;
        var blue = parseInt(RegExp.$3, 16) * 17;
        var alpha = Math.round(parseInt(RegExp.$4 || "f", 16) / 15 * 1000) / 1000;
        return alpha == 1 ? [red, green, blue] : [red, green, blue, alpha];
      },

      /**
       * Converts a regexp object match of a hex3 string to an RGB array.
       *
       * @return {Array} an array with red, green, blue
       */
      __hex3StringToRgb__P_140_4: function __hex3StringToRgb__P_140_4() {
        var red = parseInt(RegExp.$1, 16) * 17;
        var green = parseInt(RegExp.$2, 16) * 17;
        var blue = parseInt(RegExp.$3, 16) * 17;
        return [red, green, blue];
      },

      /**
       * Converts a regexp object match of a hex6 string to an RGB array.
       *
       * @return {Array} an array with red, green, blue
       */
      __hex6StringToRgb__P_140_5: function __hex6StringToRgb__P_140_5() {
        var red = parseInt(RegExp.$1, 16) * 16 + parseInt(RegExp.$2, 16);
        var green = parseInt(RegExp.$3, 16) * 16 + parseInt(RegExp.$4, 16);
        var blue = parseInt(RegExp.$5, 16) * 16 + parseInt(RegExp.$6, 16);
        return [red, green, blue];
      },

      /**
       * Converts a regexp object match of a hexLong string to an RGB array.
       *
       * @return {Array} an array with red, green, blue
       */
      __hexLongStringToRgb__P_140_3: function __hexLongStringToRgb__P_140_3() {
        var red = parseInt(RegExp.$1, 16);
        var green = parseInt(RegExp.$2, 16);
        var blue = parseInt(RegExp.$3, 16);
        var alpha = Math.round(parseInt(RegExp.$4 || "ff", 16) / 255 * 1000) / 1000;
        return alpha == 1 ? [red, green, blue] : [red, green, blue, alpha];
      },

      /**
       * Converts a hex3 string to an RGB array
       *
       * @param value {String} a hex3 (#xxx) string
       * @return {Array} an array with red, green, blue
       */
      hex3StringToRgb: function hex3StringToRgb(value) {
        if (this.isHex3String(value)) {
          return this.__hex3StringToRgb__P_140_4(value);
        }

        throw new Error("Invalid hex3 value: " + value);
      },

      /**
       * Converts a hex3 (#xxx) string to a hex6 (#xxxxxx) string.
       *
       * @param value {String} a hex3 (#xxx) string
       * @return {String} The hex6 (#xxxxxx) string or the passed value when the
       *   passed value is not an hex3 (#xxx) value.
       */
      hex3StringToHex6String: function hex3StringToHex6String(value) {
        if (this.isHex3String(value)) {
          return this.rgbToHexString(this.hex3StringToRgb(value));
        }

        return value;
      },

      /**
       * Converts a hex6 string to an RGB array
       *
       * @param value {String} a hex6 (#xxxxxx) string
       * @return {Array} an array with red, green, blue
       */
      hex6StringToRgb: function hex6StringToRgb(value) {
        if (this.isHex6String(value)) {
          return this.__hex6StringToRgb__P_140_5(value);
        }

        throw new Error("Invalid hex6 value: " + value);
      },

      /**
       * Converts a hex string to an RGB array
       *
       * @param value {String} a hexShort (#rgb/#rgba) or hexLong (#rrggbb/#rrggbbaa) string
       * @return {Array} an array with red, green, blue and alpha
       */
      hexStringToRgb: function hexStringToRgb(value) {
        if (this.ishexShortString(value)) {
          return this.__hexShortStringToRgb__P_140_2(value);
        }

        if (this.ishexLongString(value)) {
          return this.__hexLongStringToRgb__P_140_3(value);
        }

        throw new Error("Invalid hex value: " + value);
      },

      /**
       * Convert RGB colors to HSB/HSV
       *
       * @param rgb {Number[]} red, blue and green as array
       * @return {Array} an array with hue, saturation and brightness/value
       */
      rgbToHsb: function rgbToHsb(rgb) {
        var hue, saturation, brightness;
        var red = rgb[0];
        var green = rgb[1];
        var blue = rgb[2];
        var cmax = red > green ? red : green;

        if (blue > cmax) {
          cmax = blue;
        }

        var cmin = red < green ? red : green;

        if (blue < cmin) {
          cmin = blue;
        }

        brightness = cmax / 255.0;

        if (cmax != 0) {
          saturation = (cmax - cmin) / cmax;
        } else {
          saturation = 0;
        }

        if (saturation == 0) {
          hue = 0;
        } else {
          var redc = (cmax - red) / (cmax - cmin);
          var greenc = (cmax - green) / (cmax - cmin);
          var bluec = (cmax - blue) / (cmax - cmin);

          if (red == cmax) {
            hue = bluec - greenc;
          } else if (green == cmax) {
            hue = 2.0 + redc - bluec;
          } else {
            hue = 4.0 + greenc - redc;
          }

          hue = hue / 6.0;

          if (hue < 0) {
            hue = hue + 1.0;
          }
        }

        return [Math.round(hue * 360), Math.round(saturation * 100), Math.round(brightness * 100)];
      },

      /**
       * Convert HSB/HSV colors to RGB
       *
       * @param hsb {Number[]} an array with hue, saturation and brightness/value
       * @return {Integer[]} an array with red, green, blue
       */
      hsbToRgb: function hsbToRgb(hsb) {
        var i, f, p, r, t;
        var hue = hsb[0] / 360;
        var saturation = hsb[1] / 100;
        var brightness = hsb[2] / 100;

        if (hue >= 1.0) {
          hue %= 1.0;
        }

        if (saturation > 1.0) {
          saturation = 1.0;
        }

        if (brightness > 1.0) {
          brightness = 1.0;
        }

        var tov = Math.floor(255 * brightness);
        var rgb = {};

        if (saturation == 0.0) {
          rgb.red = rgb.green = rgb.blue = tov;
        } else {
          hue *= 6.0;
          i = Math.floor(hue);
          f = hue - i;
          p = Math.floor(tov * (1.0 - saturation));
          r = Math.floor(tov * (1.0 - saturation * f));
          t = Math.floor(tov * (1.0 - saturation * (1.0 - f)));

          switch (i) {
            case 0:
              rgb.red = tov;
              rgb.green = t;
              rgb.blue = p;
              break;

            case 1:
              rgb.red = r;
              rgb.green = tov;
              rgb.blue = p;
              break;

            case 2:
              rgb.red = p;
              rgb.green = tov;
              rgb.blue = t;
              break;

            case 3:
              rgb.red = p;
              rgb.green = r;
              rgb.blue = tov;
              break;

            case 4:
              rgb.red = t;
              rgb.green = p;
              rgb.blue = tov;
              break;

            case 5:
              rgb.red = tov;
              rgb.green = p;
              rgb.blue = r;
              break;
          }
        }

        return [rgb.red, rgb.green, rgb.blue];
      },

      /**
       * Convert RGB colors to HSL
       *
       * @param rgb {Number[]} red, blue and green as array
       * @return {Array} an array with hue, saturation and lightness
       */
      rgbToHsl: function rgbToHsl(rgb) {
        var r = rgb[0] / 255;
        var g = rgb[1] / 255;
        var b = rgb[2] / 255; // implementation from
        // https://stackoverflow.com/questions/2348597/why-doesnt-this-javascript-rgb-to-hsl-code-work/54071699#54071699

        var a = Math.max(r, g, b);
        var n = a - Math.min(r, g, b);
        var f = 1 - Math.abs(a + a - n - 1);
        var h = n && (a == r ? (g - b) / n : a == g ? 2 + (b - r) / n : 4 + (r - g) / n);
        return [60 * (h < 0 ? h + 6 : h), 100 * (f ? n / f : 0), 100 * (a + a - n) / 2];
      },

      /**
       * Convert HSL colors to RGB
       *
       * @param hsl {Number[]} an array with hue, saturation and lightness
       * @return {Integer[]} an array with red, green, blue
       */
      hslToRgb: function hslToRgb(hsl) {
        var h = hsl[0];
        var s = hsl[1] / 100;
        var l = hsl[2] / 100; // implementation from
        // https://stackoverflow.com/questions/36721830/convert-hsl-to-rgb-and-hex/54014428#54014428

        var a = s * Math.min(l, 1 - l);

        var f = function f(n) {
          var k = (n + h / 30) % 12;
          return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        };

        return [f(0), f(8), f(4)].map(function (v) {
          return Math.round(v * 2550) / 10;
        });
      },

      /**
       * Creates a random color.
       *
       * @return {String} a valid qooxdoo/CSS rgb color string.
       */
      randomColor: function randomColor() {
        var r = Math.round(Math.random() * 255);
        var g = Math.round(Math.random() * 255);
        var b = Math.round(Math.random() * 255);
        return this.rgbToRgbString([r, g, b]);
      },

      /**
       * Tune a color string according to the tuneMap
       *
       * @param color {String} a valid qooxdoo/CSS rgb color string
       * @param scaleMap {Map}  as described above
       * @param tuner {Function}  function
       * @param hue_tuner {Function}  function
       * @return {String} a valid CSS rgb color string.*
       */
      __tuner__P_140_6: function __tuner__P_140_6(color, tuneMap, tuner, hue_tuner) {
        var rgba = this.stringToRgb(color);

        for (var key in tuneMap) {
          if (tuneMap[key] == 0) {
            continue;
          }

          switch (key) {
            case "red":
              rgba[0] = tuner(rgba[0], tuneMap[key], 255);
              break;

            case "green":
              rgba[1] = tuner(rgba[1], tuneMap[key], 255);
              break;

            case "blue":
              rgba[2] = tuner(rgba[2], tuneMap[key], 255);
              break;

            case "alpha":
              rgba[3] = tuner(rgba[3] || 1, tuneMap[key], 1);
              break;

            case "hue":
              if (hue_tuner) {
                var hsb = this.rgbToHsb(rgba);
                hsb[0] = hue_tuner(hsb[0], tuneMap[key]);
                var rgb = this.hsbToRgb(hsb);
                rgb[3] = rgba[3];
                rgba = rgb;
              } else {
                throw new Error("Invalid key in map: " + key);
              }

              break;

            case "saturation":
              var hsb = this.rgbToHsb(rgba);
              hsb[1] = tuner(hsb[1], tuneMap[key], 100);
              rgb = this.hsbToRgb(hsb);
              rgb[3] = rgba[3];
              rgba = rgb;
              break;

            case "brightness":
              var hsb = this.rgbToHsb(rgba);
              hsb[2] = tuner(hsb[2], tuneMap[key], 100);
              rgb = this.hsbToRgb(hsb);
              rgb[3] = rgba[3];
              rgba = rgb;
              break;

            case "lightness":
              var hsl = this.rgbToHsl(rgba);
              hsl[2] = tuner(hsl[2], tuneMap[key], 100);
              rgb = this.hslToRgb(hsl);
              rgb[3] = rgba[3];
              rgba = rgb;
              break;

            default:
              throw new Error("Invalid key in tune map: " + key);
          }
        }

        if (rgba.length === 4) {
          if (rgba[3] === undefined || rgba[3] >= 1) {
            rgba.pop();
          } else if (rgba[3] < 0) {
            rgba[3] = 0;
          }
        }

        [0, 1, 2].forEach(function (i) {
          if (rgba[i] < 0) {
            rgba[i] = 0;
            return;
          }

          if (rgba[i] > 255) {
            rgba[i] = 255;
            return;
          }
        });
        return this.rgbToRgbString(rgba);
      },

      /**
       * Scale
       *
       * Scale the given properties of the input color according to the
       * configuration given in the `scaleMap`. Each key argument must point to a
       * number between -100% and 100% (inclusive). This indicates how far the
       * corresponding property should be moved from its original position
       * towards the maximum (if the argument is positive) or the minimum (if the
       * argument is negative). This means that, for example, `lightness: "50%"`
       * will make all colors 50% closer to maximum lightness without making them
       * fully white.
       *
       * Supported keys are:
       * `red`, `green`, `blue`, `alpha`, `saturation`,
       * `brightness`, `value`, `lightness`.
       *
       * @param color {String}  a valid qooxdoo/CSS rgb color string
       * @param scaleMap {Map}  as described above
       * @return {String} a valid CSS rgb color string.
       */
      scale: function scale(color, scaleMap) {
        return this.__tuner__P_140_6(color, scaleMap, function (value, scale, max) {
          if (value > max) {
            value = max;
          }

          if (scale > 0) {
            if (scale > 100) {
              scale = 100;
            }

            return value + (max - value) * scale / 100;
          } // scale < 0


          if (scale < -100) {
            scale = -100;
          }

          return value + value * scale / 100;
        });
      },

      /**
       * Adjust
       *
       * Increases or decreases one or more properties of the input color
       * by fixed amounts according to the configuration given in the
       * `adjustMap`. The value of the corresponding key is added to the
       * original value and the final result is adjusted to stay within legal
       * bounds. Hue values can go full circle.a1
       *
       * Supported keys are:
       * `red`, `green`, `blue`, `alpha`, `hue`, `saturation`, `brightness`,
       * `lightness`
       *
       * @param color {String} a valid qooxdoo/CSS rgb color string
       * @param scaleMap {Map} as described above
       * @return {String} a valid CSS rgb color string.
       */
      adjust: function adjust(color, adjustMap) {
        return this.__tuner__P_140_6(color, adjustMap, function (value, offset, max) {
          value += offset;

          if (value > max) {
            return max;
          }

          if (value < 0) {
            return 0;
          }

          return value;
        }, function (value, offset) {
          value += offset;

          while (value >= 360) {
            value -= 360;
          }

          while (value < 0) {
            value += 360;
          }

          return value;
        });
      },

      /**
       * RgbToLuminance
       *
       * Calculate the [luminance](https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests) of the given rgb color.
       *
       * @param color {String} a valid qooxdoo/CSS rgb color string
       * @return {Number} luminance
       */
      luminance: function luminance(color) {
        var rgb = this.stringToRgb(color);

        var lum = function lum(i) {
          var c = rgb[i] / 255;
          return c < 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        };

        return 0.2126 * lum(0) + 0.7152 * lum(1) + 0.0722 * lum(2);
      },

      /**
       * contrast
       *
       * Calculate the contrast of two given rgb colors.
       *
       * @param back {String} a valid qooxdoo/CSS rgb color string
       * @param front {String} a valid qooxdoo/CSS rgb color string
       * @return {Number} contrast
       */
      contrast: function contrast(back, front) {
        var bl = this.luminance(back) + 0.05;
        var fl = this.luminance(front) + 0.5;
        return Math.max(bl, fl) / Math.min(bl, fl);
      },

      /**
       * Picks a contrasting color
       *
       * @param rgb {Number[]|String} the color, either as a string or as an RGB array of 3 numbers
       * @param threshold {Number?} the threshold between light and dark outputs, where the range is 0-255, defaults to 128
       * @param dark {String?} the colour to use for "dark", defaults to black
       * @param light {String?} the colour to use for "light", defaults to white
       * @return {String} colour string
       */
      chooseContrastingColor: function chooseContrastingColor(rgb, threshold, dark, light) {
        if (typeof rgb == "string") {
          rgb = qx.util.ColorUtil.stringToRgb(rgb);
        }

        var r = rgb[0];
        var g = rgb[1];
        var b = rgb[2];

        if (!threshold) {
          threshold = 128;
        } // Combine into the YIQ color space (which gives us a handy scale we can use with a threshold)


        var yiq = (r * 299 + g * 587 + b * 114) / 1000;
        return yiq >= threshold ? dark || "#000" : light || "#fff";
      }
    }
  });
  qx.util.ColorUtil.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Interface": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * A decorator is responsible for computing a widget's decoration styles.
   *
   */
  qx.Interface.define("qx.ui.decoration.IDecorator", {
    members: {
      /**
       * Returns the decorator's styles.
       *
       * @return {Map} Map of decoration styles
       */
      getStyles: function getStyles() {},

      /**
       * Returns the configured padding minus the border width.
       * @return {Map} Map of top, right, bottom and left padding values
       */
      getPadding: function getPadding() {},

      /**
       * Get the amount of space the decoration needs for its border and padding
       * on each side.
       *
       * @return {Map} the desired inset as a map with the keys <code>top</code>,
       *     <code>right</code>, <code>bottom</code>, <code>left</code>.
       */
      getInsets: function getInsets() {}
    }
  });
  qx.ui.decoration.IDecorator.$$dbClassInfo = $$dbClassInfo;
})();

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
      "qx.ui.decoration.IDecorator": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2009 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (martinwittemann)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * This class acts as abstract class for all decorators. It offers the
   * properties for the insets handling. Each decorator has to define its own
   * default insets by implementing the template method
   * (http://en.wikipedia.org/wiki/Template_Method) <code>_getDefaultInsets</code>
   */
  qx.Class.define("qx.ui.decoration.Abstract", {
    extend: qx.core.Object,
    implement: [qx.ui.decoration.IDecorator],
    type: "abstract",
    members: {
      __insets__P_165_0: null,

      /**
       * Abstract method. Should return a map containing the default insets of
       * the decorator. This could look like this:
       * <pre>
       * return {
       *   top : 0,
       *   right : 0,
       *   bottom : 0,
       *   left : 0
       * };
       * </pre>
       * @return {Map} Map containing the insets.
       */
      _getDefaultInsets: function _getDefaultInsets() {
        throw new Error("Abstract method called.");
      },

      /**
       * Abstract method. Should return an boolean value if the decorator is
       * already initialized or not.
       * @return {Boolean} True, if the decorator is initialized.
       */
      _isInitialized: function _isInitialized() {
        throw new Error("Abstract method called.");
      },

      /**
       * Resets the insets.
       */
      _resetInsets: function _resetInsets() {
        this.__insets__P_165_0 = null;
      },
      // interface implementation
      getInsets: function getInsets() {
        if (!this.__insets__P_165_0) {
          this.__insets__P_165_0 = this._getDefaultInsets();
        }

        return this.__insets__P_165_0;
      }
    },

    /*
     *****************************************************************************
        DESTRUCTOR
     *****************************************************************************
     */
    destruct: function destruct() {
      this.__insets__P_165_0 = null;
    }
  });
  qx.ui.decoration.Abstract.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "qx.theme.manager.Color": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "qx.theme": {}
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2010 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * Mixin responsible for setting the background color of a widget.
   * This mixin is usually used by {@link qx.ui.decoration.Decorator}.
   */
  qx.Mixin.define("qx.ui.decoration.MBackgroundColor", {
    properties: {
      /** Color of the background */
      backgroundColor: {
        check: "Color",
        nullable: true,
        apply: "_applyBackgroundColor"
      }
    },
    members: {
      /**
       * Adds the background-color styles to the given map
       * @param styles {Map} CSS style map
       */
      _styleBackgroundColor: function _styleBackgroundColor(styles) {
        var bgcolor = this.getBackgroundColor();

        if (bgcolor && qx.core.Environment.get("qx.theme")) {
          bgcolor = qx.theme.manager.Color.getInstance().resolve(bgcolor);
        }

        if (bgcolor) {
          styles["background-color"] = bgcolor;
        }
      },
      // property apply
      _applyBackgroundColor: function _applyBackgroundColor() {
        {
          if (this._isInitialized()) {
            throw new Error("This decorator is already in-use. Modification is not possible anymore!");
          }
        }
      }
    }
  });
  qx.ui.decoration.MBackgroundColor.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "qx.bom.client.Engine": {
        "require": true
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "engine.name": {
          "className": "qx.bom.client.Engine"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2010 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * Mixin for the border radius CSS property.
   * This mixin is usually used by {@link qx.ui.decoration.Decorator}.
   *
   * Keep in mind that this is not supported by all browsers:
   *
   * * Firefox 3,5+
   * * IE9+
   * * Safari 3.0+
   * * Opera 10.5+
   * * Chrome 4.0+
   */
  qx.Mixin.define("qx.ui.decoration.MBorderRadius", {
    properties: {
      /** top left corner radius */
      radiusTopLeft: {
        nullable: true,
        check: "Integer",
        apply: "_applyBorderRadius"
      },

      /** top right corner radius */
      radiusTopRight: {
        nullable: true,
        check: "Integer",
        apply: "_applyBorderRadius"
      },

      /** bottom left corner radius */
      radiusBottomLeft: {
        nullable: true,
        check: "Integer",
        apply: "_applyBorderRadius"
      },

      /** bottom right corner radius */
      radiusBottomRight: {
        nullable: true,
        check: "Integer",
        apply: "_applyBorderRadius"
      },

      /** Property group to set the corner radius of all sides */
      radius: {
        group: ["radiusTopLeft", "radiusTopRight", "radiusBottomRight", "radiusBottomLeft"],
        mode: "shorthand"
      }
    },
    members: {
      /**
       * Takes a styles map and adds the border radius styles in place to the
       * given map. This is the needed behavior for
       * {@link qx.ui.decoration.Decorator}.
       *
       * @param styles {Map} A map to add the styles.
       */
      _styleBorderRadius: function _styleBorderRadius(styles) {
        // Fixing the background bleed in Webkits
        // http://tumble.sneak.co.nz/post/928998513/fixing-the-background-bleed
        styles["-webkit-background-clip"] = "padding-box";
        styles["background-clip"] = "padding-box"; // radius handling

        var hasRadius = false;
        var radius = this.getRadiusTopLeft();

        if (radius > 0) {
          hasRadius = true;
          styles["-moz-border-radius-topleft"] = radius + "px";
          styles["-webkit-border-top-left-radius"] = radius + "px";
          styles["border-top-left-radius"] = radius + "px";
        }

        radius = this.getRadiusTopRight();

        if (radius > 0) {
          hasRadius = true;
          styles["-moz-border-radius-topright"] = radius + "px";
          styles["-webkit-border-top-right-radius"] = radius + "px";
          styles["border-top-right-radius"] = radius + "px";
        }

        radius = this.getRadiusBottomLeft();

        if (radius > 0) {
          hasRadius = true;
          styles["-moz-border-radius-bottomleft"] = radius + "px";
          styles["-webkit-border-bottom-left-radius"] = radius + "px";
          styles["border-bottom-left-radius"] = radius + "px";
        }

        radius = this.getRadiusBottomRight();

        if (radius > 0) {
          hasRadius = true;
          styles["-moz-border-radius-bottomright"] = radius + "px";
          styles["-webkit-border-bottom-right-radius"] = radius + "px";
          styles["border-bottom-right-radius"] = radius + "px";
        } // Fixing the background bleed in Webkits
        // http://tumble.sneak.co.nz/post/928998513/fixing-the-background-bleed


        if (hasRadius && qx.core.Environment.get("engine.name") == "webkit") {
          styles["-webkit-background-clip"] = "padding-box";
        } else {
          styles["background-clip"] = "padding-box";
        }
      },
      // property apply
      _applyBorderRadius: function _applyBorderRadius() {
        {
          if (this._isInitialized()) {
            throw new Error("This decorator is already in-use. Modification is not possible anymore!");
          }
        }
      }
    }
  });
  qx.ui.decoration.MBorderRadius.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "qx.bom.client.Css": {
        "require": true
      },
      "qx.bom.Style": {},
      "qx.theme.manager.Color": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "css.boxshadow": {
          "className": "qx.bom.client.Css"
        },
        "qx.theme": {}
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2010 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * Mixin for the box shadow CSS property.
   * This mixin is usually used by {@link qx.ui.decoration.Decorator}.
   *
   * Keep in mind that this is not supported by all browsers:
   *
   * * Firefox 3,5+
   * * IE9+
   * * Safari 3.0+
   * * Opera 10.5+
   * * Chrome 4.0+
   *
   * It is possible to define multiple box shadows by setting an
   * array containing the needed values as the property value.
   * In case multiple values are specified, the values of the properties
   * are repeated until all match in length.
   *
   * An example:
   * <pre class="javascript">
   *   'my-decorator': {
   *     style: {
   *       shadowBlurRadius: 2,
   *       shadowVerticalLength: 1,
   *       shadowColor: ['rgba(0, 0, 0, 0.2)', 'rgba(255, 255, 255, 0.4)'],
   *       inset: [true, false]
   *     }
   *   }
   * </pre>
   * which is the same as:
   * <pre class="javascript">
   *   'my-decorator': {
   *     style: {
   *       shadowBlurRadius: [2, 2],
   *       shadowVerticalLength: [1, 1],
   *       shadowColor: ['rgba(0, 0, 0, 0.2)', 'rgba(255, 255, 255, 0.4)'],
   *       inset: [true, false]
   *     }
   *   }
   */
  qx.Mixin.define("qx.ui.decoration.MBoxShadow", {
    properties: {
      /** Horizontal length of the shadow. */
      shadowHorizontalLength: {
        nullable: true,
        apply: "_applyBoxShadow"
      },

      /** Vertical length of the shadow. */
      shadowVerticalLength: {
        nullable: true,
        apply: "_applyBoxShadow"
      },

      /** The blur radius of the shadow. */
      shadowBlurRadius: {
        nullable: true,
        apply: "_applyBoxShadow"
      },

      /** The spread radius of the shadow. */
      shadowSpreadRadius: {
        nullable: true,
        apply: "_applyBoxShadow"
      },

      /** The color of the shadow. */
      shadowColor: {
        nullable: true,
        apply: "_applyBoxShadow"
      },

      /** Inset shadows are drawn inside the border. */
      inset: {
        init: false,
        apply: "_applyBoxShadow"
      },

      /** Property group to set the shadow length. */
      shadowLength: {
        group: ["shadowHorizontalLength", "shadowVerticalLength"],
        mode: "shorthand"
      }
    },
    members: {
      /**
       * Takes a styles map and adds the box shadow styles in place to the
       * given map. This is the needed behavior for
       * {@link qx.ui.decoration.Decorator}.
       *
       * @param styles {Map} A map to add the styles.
       */
      _styleBoxShadow: function _styleBoxShadow(styles) {
        var propName = qx.core.Environment.get("css.boxshadow");

        if (!propName || this.getShadowVerticalLength() == null && this.getShadowHorizontalLength() == null) {
          return;
        }

        propName = qx.bom.Style.getCssName(propName);
        var Color = null;

        if (qx.core.Environment.get("qx.theme")) {
          Color = qx.theme.manager.Color.getInstance();
        }

        var boxShadowProperties = ["shadowVerticalLength", "shadowHorizontalLength", "shadowBlurRadius", "shadowSpreadRadius", "shadowColor", "inset"];
        (function (vLengths, hLengths, blurs, spreads, colors, insets) {
          for (var i = 0; i < vLengths.length; i++) {
            var vLength = vLengths[i] || 0;
            var hLength = hLengths[i] || 0;
            var blur = blurs[i] || 0;
            var spread = spreads[i] || 0;
            var color = colors[i] || "black";
            var inset = insets[i];

            if (Color) {
              color = Color.resolve(color);
            }

            if (color != null) {
              var value = (inset ? "inset " : "") + hLength + "px " + vLength + "px " + blur + "px " + spread + "px " + color; // apply or append the box shadow styles

              if (!styles[propName]) {
                styles[propName] = value;
              } else {
                styles[propName] += "," + value;
              }
            }
          }
        }).apply(this, this._getExtendedPropertyValueArrays(boxShadowProperties));
      },
      // property apply
      _applyBoxShadow: function _applyBoxShadow() {
        {
          if (this._isInitialized()) {
            throw new Error("This decorator is already in-use. Modification is not possible anymore!");
          }
        }
      }
    }
  });
  qx.ui.decoration.MBoxShadow.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "qx.theme.manager.Color": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "qx.theme": {}
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2010 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * A basic decorator featuring simple borders based on CSS styles.
   * This mixin is usually used by {@link qx.ui.decoration.Decorator}.
   */
  qx.Mixin.define("qx.ui.decoration.MSingleBorder", {
    properties: {
      /*
      ---------------------------------------------------------------------------
        PROPERTY: WIDTH
      ---------------------------------------------------------------------------
      */

      /** top width of border */
      widthTop: {
        check: "Number",
        init: 0,
        apply: "_applyWidth"
      },

      /** right width of border */
      widthRight: {
        check: "Number",
        init: 0,
        apply: "_applyWidth"
      },

      /** bottom width of border */
      widthBottom: {
        check: "Number",
        init: 0,
        apply: "_applyWidth"
      },

      /** left width of border */
      widthLeft: {
        check: "Number",
        init: 0,
        apply: "_applyWidth"
      },

      /*
      ---------------------------------------------------------------------------
        PROPERTY: STYLE
      ---------------------------------------------------------------------------
      */

      /** top style of border */
      styleTop: {
        nullable: true,
        check: ["solid", "dotted", "dashed", "double", "inset", "outset", "ridge", "groove"],
        init: "solid",
        apply: "_applyStyle"
      },

      /** right style of border */
      styleRight: {
        nullable: true,
        check: ["solid", "dotted", "dashed", "double", "inset", "outset", "ridge", "groove"],
        init: "solid",
        apply: "_applyStyle"
      },

      /** bottom style of border */
      styleBottom: {
        nullable: true,
        check: ["solid", "dotted", "dashed", "double", "inset", "outset", "ridge", "groove"],
        init: "solid",
        apply: "_applyStyle"
      },

      /** left style of border */
      styleLeft: {
        nullable: true,
        check: ["solid", "dotted", "dashed", "double", "inset", "outset", "ridge", "groove"],
        init: "solid",
        apply: "_applyStyle"
      },

      /*
      ---------------------------------------------------------------------------
        PROPERTY: COLOR
      ---------------------------------------------------------------------------
      */

      /** top color of border */
      colorTop: {
        nullable: true,
        check: "Color",
        apply: "_applyStyle"
      },

      /** right color of border */
      colorRight: {
        nullable: true,
        check: "Color",
        apply: "_applyStyle"
      },

      /** bottom color of border */
      colorBottom: {
        nullable: true,
        check: "Color",
        apply: "_applyStyle"
      },

      /** left color of border */
      colorLeft: {
        nullable: true,
        check: "Color",
        apply: "_applyStyle"
      },

      /*
      ---------------------------------------------------------------------------
        PROPERTY GROUP: EDGE
      ---------------------------------------------------------------------------
      */

      /** Property group to configure the left border */
      left: {
        group: ["widthLeft", "styleLeft", "colorLeft"]
      },

      /** Property group to configure the right border */
      right: {
        group: ["widthRight", "styleRight", "colorRight"]
      },

      /** Property group to configure the top border */
      top: {
        group: ["widthTop", "styleTop", "colorTop"]
      },

      /** Property group to configure the bottom border */
      bottom: {
        group: ["widthBottom", "styleBottom", "colorBottom"]
      },

      /*
      ---------------------------------------------------------------------------
        PROPERTY GROUP: TYPE
      ---------------------------------------------------------------------------
      */

      /** Property group to set the border width of all sides */
      width: {
        group: ["widthTop", "widthRight", "widthBottom", "widthLeft"],
        mode: "shorthand"
      },

      /** Property group to set the border style of all sides */
      style: {
        group: ["styleTop", "styleRight", "styleBottom", "styleLeft"],
        mode: "shorthand"
      },

      /** Property group to set the border color of all sides */
      color: {
        group: ["colorTop", "colorRight", "colorBottom", "colorLeft"],
        mode: "shorthand"
      }
    },
    members: {
      /**
       * Takes a styles map and adds the border styles styles in place
       * to the given map. This is the needed behavior for
       * {@link qx.ui.decoration.Decorator}.
       *
       * @param styles {Map} A map to add the styles.
       */
      _styleBorder: function _styleBorder(styles) {
        if (qx.core.Environment.get("qx.theme")) {
          var Color = qx.theme.manager.Color.getInstance();
          var colorTop = Color.resolve(this.getColorTop());
          var colorRight = Color.resolve(this.getColorRight());
          var colorBottom = Color.resolve(this.getColorBottom());
          var colorLeft = Color.resolve(this.getColorLeft());
        } else {
          var colorTop = this.getColorTop();
          var colorRight = this.getColorRight();
          var colorBottom = this.getColorBottom();
          var colorLeft = this.getColorLeft();
        } // Add borders


        var width = this.getWidthTop();

        if (width > 0) {
          styles["border-top"] = width + "px " + this.getStyleTop() + " " + (colorTop || "");
        }

        var width = this.getWidthRight();

        if (width > 0) {
          styles["border-right"] = width + "px " + this.getStyleRight() + " " + (colorRight || "");
        }

        var width = this.getWidthBottom();

        if (width > 0) {
          styles["border-bottom"] = width + "px " + this.getStyleBottom() + " " + (colorBottom || "");
        }

        var width = this.getWidthLeft();

        if (width > 0) {
          styles["border-left"] = width + "px " + this.getStyleLeft() + " " + (colorLeft || "");
        } // Check if valid


        {
          if (styles.length === 0) {
            throw new Error("Invalid Single decorator (zero border width). Use qx.ui.decorator.Background instead!");
          }
        } // Add basic styles

        styles.position = "absolute";
      },

      /**
       * Implementation of the interface for the single border.
       *
       * @return {Map} A map containing the default insets.
       *   (top, right, bottom, left)
       */
      _getDefaultInsetsForBorder: function _getDefaultInsetsForBorder() {
        return {
          top: this.getWidthTop(),
          right: this.getWidthRight(),
          bottom: this.getWidthBottom(),
          left: this.getWidthLeft()
        };
      },

      /*
      ---------------------------------------------------------------------------
        PROPERTY APPLY ROUTINES
      ---------------------------------------------------------------------------
      */
      // property apply
      _applyWidth: function _applyWidth() {
        this._applyStyle();

        this._resetInsets();
      },
      // property apply
      _applyStyle: function _applyStyle() {
        {
          if (this._isInitialized()) {
            throw new Error("This decorator is already in-use. Modification is not possible anymore!");
          }
        }
      }
    }
  });
  qx.ui.decoration.MSingleBorder.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "qx.lang.Type": {},
      "qx.util.AliasManager": {},
      "qx.util.ResourceManager": {},
      "qx.bom.client.Engine": {
        "require": true
      },
      "qx.bom.client.Browser": {
        "require": true
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "engine.name": {
          "className": "qx.bom.client.Engine"
        },
        "browser.documentmode": {
          "className": "qx.bom.client.Browser"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2009 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * Mixin for supporting the background images on decorators.
   * This mixin is usually used by {@link qx.ui.decoration.Decorator}.
   *
   * It is possible to define multiple background images by setting an
   * array containing the needed values as the property value.
   * In case multiple values are specified, the values of the properties
   * are repeated until all match in length.
   *
   * An example:
   * <pre class="javascript">
   *   'my-decorator': {
   *     style: {
   *       backgroundImage: ['foo1.png', 'foo2.png', 'bar1.png', 'bar2.png'],
   *       backgroundRepeat: 'no-repeat',
   *       backgroundPositionX: ['left', 'right', 'center'],
   *       backgroundPositionY: ['center', 'top']
   *     }
   *   }
   * </pre>
   * which is the same as:
   * <pre class="javascript">
   *   'my-decorator': {
   *     style: {
   *       backgroundImage: ['foo1.png', 'foo2.png', 'bar1.png', 'bar2.png'],
   *       backgroundRepeat: ['no-repeat', 'no-repeat', 'no-repeat', 'no-repeat'],
   *       backgroundPositionX: ['left', 'right', 'center', 'left'],
   *       backgroundPositionY: ['center', 'top', 'center', 'top']
   *     }
   *   }
   * </pre>
   */
  qx.Mixin.define("qx.ui.decoration.MBackgroundImage", {
    properties: {
      /** The URL of the background image */
      backgroundImage: {
        nullable: true,
        apply: "_applyBackgroundImage"
      },

      /** How the background image should be repeated */
      backgroundRepeat: {
        init: "repeat",
        apply: "_applyBackgroundImage"
      },

      /**
       * Either a string or a number, which defines the horizontal position
       * of the background image.
       *
       * If the value is an integer it is interpreted as a pixel value, otherwise
       * the value is taken to be a CSS value. For CSS, the values are "center",
       * "left" and "right".
       */
      backgroundPositionX: {
        nullable: true,
        apply: "_applyBackgroundPosition"
      },

      /**
       * Either a string or a number, which defines the vertical position
       * of the background image.
       *
       * If the value is an integer it is interpreted as a pixel value, otherwise
       * the value is taken to be a CSS value. For CSS, the values are "top",
       * "center" and "bottom".
       */
      backgroundPositionY: {
        nullable: true,
        apply: "_applyBackgroundPosition"
      },

      /**
       * Specifies where the background image is positioned.
       */
      backgroundOrigin: {
        nullable: true,
        apply: "_applyBackgroundImage"
      },

      /**
       * Property group to define the background position
       */
      backgroundPosition: {
        group: ["backgroundPositionY", "backgroundPositionX"]
      },

      /**
       * Whether to order gradients before Image-URL-based background declarations
       * if both qx.ui.decoration.MBackgroundImage and
       * qx.ui.decoration.MLinearBackgroundGradient decorations are used.
       */
      orderGradientsFront: {
        check: "Boolean",
        init: false
      }
    },
    members: {
      /**
       * Adds the background-image styles to the given map
       * @param styles {Map} CSS style map
       */
      _styleBackgroundImage: function _styleBackgroundImage(styles) {
        if (!this.getBackgroundImage()) {
          return;
        }

        if ("background" in styles) {
          if (!qx.lang.Type.isArray(styles["background"])) {
            styles["background"] = [styles["background"]];
          }
        } else {
          styles["background"] = [];
        }

        var backgroundImageProperties = ["backgroundImage", "backgroundRepeat", "backgroundPositionY", "backgroundPositionX", "backgroundOrigin"];
        (function (images, repeats, tops, lefts, origins) {
          for (var i = 0; i < images.length; i++) {
            var image = images[i];
            var repeat = repeats[i];
            var top = tops[i] || 0;
            var left = lefts[i] || 0;
            var origin = origins[i] || "";

            if (top == null) {
              top = 0;
            }

            if (left == null) {
              left = 0;
            }

            if (!isNaN(top)) {
              top += "px";
            }

            if (!isNaN(left)) {
              left += "px";
            }

            var id = qx.util.AliasManager.getInstance().resolve(image);
            var source = qx.util.ResourceManager.getInstance().toUri(id);
            var attrs = {
              image: "url(" + source + ")",
              position: left + " " + top,
              repeat: "repeat",
              origin: origin
            };

            if (repeat === "scale") {
              attrs.size = "100% 100%";
            } else {
              attrs.repeat = repeat;
            }

            var imageMarkup = [attrs.image, attrs.position + ("size" in attrs ? " / " + attrs.size : ""), attrs.repeat, attrs.origin];
            styles["background"][this.getOrderGradientsFront() ? "push" : "unshift"](imageMarkup.join(" "));

            if (true && source && source.endsWith(".png") && (repeat == "scale" || repeat == "no-repeat") && qx.core.Environment.get("engine.name") == "mshtml" && qx.core.Environment.get("browser.documentmode") < 9) {
              this.warn("Background PNGs with repeat == 'scale' or repeat == 'no-repeat' are not supported in this client! The image's resource id is '" + id + "'");
            }
          }
        }).apply(this, this._getExtendedPropertyValueArrays(backgroundImageProperties));
      },
      // property apply
      _applyBackgroundImage: function _applyBackgroundImage() {
        {
          if (this._isInitialized()) {
            throw new Error("This decorator is already in-use. Modification is not possible anymore!");
          }
        }
      },
      // property apply
      _applyBackgroundPosition: function _applyBackgroundPosition() {
        {
          if (this._isInitialized()) {
            throw new Error("This decorator is already in-use. Modification is not possible anymore!");
          }

          if (qx.core.Environment.get("engine.name") == "mshtml" && qx.core.Environment.get("browser.documentmode") < 9) {
            this.warn("The backgroundPosition property is not supported by this client!");
          }
        }
      }
    }
  });
  qx.ui.decoration.MBackgroundImage.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.decoration.MSingleBorder": {
        "require": true
      },
      "qx.ui.decoration.MBackgroundImage": {
        "require": true
      },
      "qx.bom.client.Css": {
        "require": true
      },
      "qx.theme.manager.Color": {},
      "qx.bom.Style": {},
      "qx.log.Logger": {},
      "qx.util.ColorUtil": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "css.boxshadow": {
          "className": "qx.bom.client.Css"
        },
        "qx.theme": {},
        "css.boxsizing": {
          "className": "qx.bom.client.Css"
        },
        "css.borderradius": {
          "className": "qx.bom.client.Css"
        },
        "css.rgba": {
          "className": "qx.bom.client.Css"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2010 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * Border implementation with two CSS borders. Both borders can be styled
   * independent of each other.
   * This mixin is usually used by {@link qx.ui.decoration.Decorator}.
   */
  qx.Mixin.define("qx.ui.decoration.MDoubleBorder", {
    include: [qx.ui.decoration.MSingleBorder, qx.ui.decoration.MBackgroundImage],
    construct: function construct() {
      // override the methods of single border and background image
      this._getDefaultInsetsForBorder = this.__getDefaultInsetsForDoubleBorder__P_166_0;
      this._styleBorder = this.__styleDoubleBorder__P_166_1;
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /*
      ---------------------------------------------------------------------------
        PROPERTY: INNER WIDTH
      ---------------------------------------------------------------------------
      */

      /** top width of border */
      innerWidthTop: {
        check: "Number",
        init: 0,
        apply: "_applyDoubleBorder"
      },

      /** right width of border */
      innerWidthRight: {
        check: "Number",
        init: 0,
        apply: "_applyDoubleBorder"
      },

      /** bottom width of border */
      innerWidthBottom: {
        check: "Number",
        init: 0,
        apply: "_applyDoubleBorder"
      },

      /** left width of border */
      innerWidthLeft: {
        check: "Number",
        init: 0,
        apply: "_applyDoubleBorder"
      },

      /** Property group to set the inner border width of all sides */
      innerWidth: {
        group: ["innerWidthTop", "innerWidthRight", "innerWidthBottom", "innerWidthLeft"],
        mode: "shorthand"
      },

      /*
      ---------------------------------------------------------------------------
        PROPERTY: INNER COLOR
      ---------------------------------------------------------------------------
      */

      /** top inner color of border */
      innerColorTop: {
        nullable: true,
        check: "Color",
        apply: "_applyDoubleBorder"
      },

      /** right inner color of border */
      innerColorRight: {
        nullable: true,
        check: "Color",
        apply: "_applyDoubleBorder"
      },

      /** bottom inner color of border */
      innerColorBottom: {
        nullable: true,
        check: "Color",
        apply: "_applyDoubleBorder"
      },

      /** left inner color of border */
      innerColorLeft: {
        nullable: true,
        check: "Color",
        apply: "_applyDoubleBorder"
      },

      /**
       * Property group for the inner color properties.
       */
      innerColor: {
        group: ["innerColorTop", "innerColorRight", "innerColorBottom", "innerColorLeft"],
        mode: "shorthand"
      },

      /**
       * The opacity of the inner border.
       */
      innerOpacity: {
        check: "Number",
        init: 1,
        apply: "_applyDoubleBorder"
      }
    },
    members: {
      /**
       * Takes a styles map and adds the outer border styles in place
       * to the given map. This is the needed behavior for
       * {@link qx.ui.decoration.Decorator}.
       *
       * @param styles {Map} A map to add the styles.
       */
      __styleDoubleBorder__P_166_1: function __styleDoubleBorder__P_166_1(styles) {
        var propName = qx.core.Environment.get("css.boxshadow");
        var color, innerColor, innerWidth;

        if (qx.core.Environment.get("qx.theme")) {
          var Color = qx.theme.manager.Color.getInstance();
          color = {
            top: Color.resolve(this.getColorTop()),
            right: Color.resolve(this.getColorRight()),
            bottom: Color.resolve(this.getColorBottom()),
            left: Color.resolve(this.getColorLeft())
          };
          innerColor = {
            top: Color.resolve(this.getInnerColorTop()),
            right: Color.resolve(this.getInnerColorRight()),
            bottom: Color.resolve(this.getInnerColorBottom()),
            left: Color.resolve(this.getInnerColorLeft())
          };
        } else {
          color = {
            top: this.getColorTop(),
            right: this.getColorRight(),
            bottom: this.getColorBottom(),
            left: this.getColorLeft()
          };
          innerColor = {
            top: this.getInnerColorTop(),
            right: this.getInnerColorRight(),
            bottom: this.getInnerColorBottom(),
            left: this.getInnerColorLeft()
          };
        }

        innerWidth = {
          top: this.getInnerWidthTop(),
          right: this.getInnerWidthRight(),
          bottom: this.getInnerWidthBottom(),
          left: this.getInnerWidthLeft()
        }; // Add outer borders

        var width = this.getWidthTop();

        if (width > 0) {
          styles["border-top"] = width + "px " + this.getStyleTop() + " " + color.top;
        }

        width = this.getWidthRight();

        if (width > 0) {
          styles["border-right"] = width + "px " + this.getStyleRight() + " " + color.right;
        }

        width = this.getWidthBottom();

        if (width > 0) {
          styles["border-bottom"] = width + "px " + this.getStyleBottom() + " " + color.bottom;
        }

        width = this.getWidthLeft();

        if (width > 0) {
          styles["border-left"] = width + "px " + this.getStyleLeft() + " " + color.left;
        }

        var innerOpacity = this.getInnerOpacity();

        if (innerOpacity < 1) {
          this.__processInnerOpacity__P_166_2(innerColor, innerOpacity);
        } // inner border


        if (innerWidth.top > 0 || innerWidth.right > 0 || innerWidth.bottom > 0 || innerWidth.left > 0) {
          var borderTop = (innerWidth.top || 0) + "px solid " + innerColor.top;
          var borderRight = (innerWidth.right || 0) + "px solid " + innerColor.right;
          var borderBottom = (innerWidth.bottom || 0) + "px solid " + innerColor.bottom;
          var borderLeft = (innerWidth.left || 0) + "px solid " + innerColor.left;
          styles[":before"] = {
            width: "100%",
            height: "100%",
            position: "absolute",
            content: '""',
            "border-top": borderTop,
            "border-right": borderRight,
            "border-bottom": borderBottom,
            "border-left": borderLeft,
            left: 0,
            top: 0
          };
          var boxSizingKey = qx.bom.Style.getCssName(qx.core.Environment.get("css.boxsizing"));
          styles[":before"][boxSizingKey] = "border-box"; // make sure to apply the border radius as well

          var borderRadiusKey = qx.core.Environment.get("css.borderradius");

          if (borderRadiusKey) {
            borderRadiusKey = qx.bom.Style.getCssName(borderRadiusKey);
            styles[":before"][borderRadiusKey] = "inherit";
          } // Add inner borders as shadows


          var shadowStyle = [];

          if (innerColor.top && innerWidth.top && innerColor.top == innerColor.bottom && innerColor.top == innerColor.right && innerColor.top == innerColor.left && innerWidth.top == innerWidth.bottom && innerWidth.top == innerWidth.right && innerWidth.top == innerWidth.left) {
            shadowStyle.push("inset 0 0 0 " + innerWidth.top + "px " + innerColor.top);
          } else {
            if (innerColor.top) {
              shadowStyle.push("inset 0 " + (innerWidth.top || 0) + "px " + innerColor.top);
            }

            if (innerColor.right) {
              shadowStyle.push("inset -" + (innerWidth.right || 0) + "px 0 " + innerColor.right);
            }

            if (innerColor.bottom) {
              shadowStyle.push("inset 0 -" + (innerWidth.bottom || 0) + "px " + innerColor.bottom);
            }

            if (innerColor.left) {
              shadowStyle.push("inset " + (innerWidth.left || 0) + "px 0 " + innerColor.left);
            }
          } // apply or append the box shadow styles


          if (shadowStyle.length > 0 && propName) {
            propName = qx.bom.Style.getCssName(propName);

            if (!styles[propName]) {
              styles[propName] = shadowStyle.join(",");
            } else {
              styles[propName] += "," + shadowStyle.join(",");
            }
          }
        } else {
          styles[":before"] = {
            border: 0
          };
        }
      },

      /**
       * Converts the inner border's colors to rgba.
       *
       * @param innerColor {Map} map of top, right, bottom and left colors
       * @param innerOpacity {Number} alpha value
       */
      __processInnerOpacity__P_166_2: function __processInnerOpacity__P_166_2(innerColor, innerOpacity) {
        if (!qx.core.Environment.get("css.rgba")) {
          {
            qx.log.Logger.warn("innerOpacity is configured but the browser doesn't support RGBA colors.");
          }
          return;
        }

        for (var edge in innerColor) {
          var rgb = qx.util.ColorUtil.stringToRgb(innerColor[edge]);
          rgb.push(innerOpacity);
          var rgbString = qx.util.ColorUtil.rgbToRgbString(rgb);
          innerColor[edge] = rgbString;
        }
      },
      _applyDoubleBorder: function _applyDoubleBorder() {
        {
          if (this._isInitialized()) {
            throw new Error("This decorator is already in-use. Modification is not possible anymore!");
          }
        }
      },

      /**
       * Implementation of the interface for the double border.
       *
       * @return {Map} A map containing the default insets.
       *   (top, right, bottom, left)
       */
      __getDefaultInsetsForDoubleBorder__P_166_0: function __getDefaultInsetsForDoubleBorder__P_166_0() {
        return {
          top: this.getWidthTop() + this.getInnerWidthTop(),
          right: this.getWidthRight() + this.getInnerWidthRight(),
          bottom: this.getWidthBottom() + this.getInnerWidthBottom(),
          left: this.getWidthLeft() + this.getInnerWidthLeft()
        };
      }
    }
  });
  qx.ui.decoration.MDoubleBorder.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "qx.bom.client.Css": {
        "require": true
      },
      "qx.lang.Type": {},
      "qx.util.ColorUtil": {},
      "qx.theme.manager.Color": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "css.gradient.legacywebkit": {
          "className": "qx.bom.client.Css"
        },
        "css.gradient.linear": {
          "className": "qx.bom.client.Css"
        },
        "css.borderradius": {
          "className": "qx.bom.client.Css"
        },
        "qx.theme": {}
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2010 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * Mixin for the linear background gradient CSS property.
   * This mixin is usually used by {@link qx.ui.decoration.Decorator}.
   *
   * Keep in mind that this is not supported by all browsers:
   *
   * * Safari 4.0+
   * * Chrome 4.0+
   * * Firefox 3.6+
   * * Opera 11.1+
   * * IE 10+
   * * IE 5.5+ (with limitations)
   *
   * For IE 5.5 to IE 8,this class uses the filter rules to create the gradient. This
   * has some limitations: The start and end position property can not be used. For
   * more details, see the original documentation:
   * http://msdn.microsoft.com/en-us/library/ms532997(v=vs.85).aspx
   *
   * For IE9, we create a gradient in a canvas element and render this gradient
   * as background image. Due to restrictions in the <code>background-image</code>
   * css property, we can not allow negative start values in that case.
   *
   * It is possible to define multiple background gradients by setting an
   * array containing the needed values as the property value.
   * In case multiple values are specified, the values of the properties
   * are repeated until all match in length. It is not possible to define
   * multiple background gradients when falling back to filter rules (IE5.5 to IE8).
   *
   * An example:
   * <pre class="javascript">
   *   'my-decorator': {
   *     style: {
   *       startColor:['rgba(255, 0, 0, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(0, 0, 255, 0.5)'],
   *       endColor: 'rgba(255, 255, 255, 0.2)',
   *       orientation: ['horizontal', 'vertical']
   *     }
   *   }
   * </pre>
   * which is the same as:
   * <pre class="javascript">
   *   'my-decorator': {
   *     style: {
   *       startColor: ['rgba(255, 0, 0, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(0, 0, 255, 0.5)'],
   *       endColor: ['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.2)'],
   *       orientation: ['horizontal', 'vertical', 'horizontal']
   *     }
   *   }
   * </pre>
   */
  qx.Mixin.define("qx.ui.decoration.MLinearBackgroundGradient", {
    properties: {
      /**
       * Start color of the background gradient.
       * Note that alpha transparency (rgba) is not supported in IE 8.
       */
      startColor: {
        nullable: true,
        apply: "_applyLinearBackgroundGradient"
      },

      /**
       * End color of the background gradient.
       * Note that alpha transparency (rgba) is not supported in IE 8.
       */
      endColor: {
        nullable: true,
        apply: "_applyLinearBackgroundGradient"
      },

      /** The orientation of the gradient. */
      orientation: {
        init: "vertical",
        apply: "_applyLinearBackgroundGradient"
      },

      /** Position in percent where to start the color. */
      startColorPosition: {
        init: 0,
        apply: "_applyLinearBackgroundGradient"
      },

      /** Position in percent where to start the color. */
      endColorPosition: {
        init: 100,
        apply: "_applyLinearBackgroundGradient"
      },

      /** Defines if the given positions are in % or px.*/
      colorPositionUnit: {
        init: "%",
        apply: "_applyLinearBackgroundGradient"
      },

      /** Property group to set the start color including its start position. */
      gradientStart: {
        group: ["startColor", "startColorPosition"],
        mode: "shorthand"
      },

      /** Property group to set the end color including its end position. */
      gradientEnd: {
        group: ["endColor", "endColorPosition"],
        mode: "shorthand"
      }
    },
    members: {
      /**
       * Takes a styles map and adds the linear background styles in place to the
       * given map. This is the needed behavior for
       * {@link qx.ui.decoration.Decorator}.
       *
       * @param styles {Map} A map to add the styles.
       */
      _styleLinearBackgroundGradient: function _styleLinearBackgroundGradient(styles) {
        var backgroundStyle = [];

        if (!this.getStartColor() || !this.getEndColor()) {
          return;
        }

        var styleImpl = this.__styleLinearBackgroundGradientAccordingToSpec__P_167_0;

        if (qx.core.Environment.get("css.gradient.legacywebkit")) {
          styleImpl = this.__styleLinearBackgroundGradientForLegacyWebkit__P_167_1;
        } else if (!qx.core.Environment.get("css.gradient.linear") && qx.core.Environment.get("css.borderradius")) {
          styleImpl = this.__styleLinearBackgroundGradientWithCanvas__P_167_2;
        } else if (!qx.core.Environment.get("css.gradient.linear")) {
          styleImpl = this.__styleLinearBackgroundGradientWithMSFilter__P_167_3;
        }

        var gradientProperties = ["startColor", "endColor", "colorPositionUnit", "orientation", "startColorPosition", "endColorPosition"];
        (function (startColors, endColors, units, orientations, startColorPositions, endColorPositions) {
          for (var i = 0; i < startColors.length; i++) {
            var startColor = this.__getColor__P_167_4(startColors[i]);

            var endColor = this.__getColor__P_167_4(endColors[i]);

            var unit = units[i];
            var orientation = orientations[i];
            var startColorPosition = startColorPositions[i];
            var endColorPosition = endColorPositions[i];

            if (!styleImpl(startColor, endColor, unit, orientation, startColorPosition, endColorPosition, styles, backgroundStyle)) {
              break;
            }
          }

          if ("background" in styles) {
            if (!qx.lang.Type.isArray(styles["background"])) {
              styles["background"] = [styles["background"]];
            }
          } else {
            styles["background"] = [];
          }

          var orderGradientsFront = "getOrderGradientsFront" in this ? this.getOrderGradientsFront() : false;
          var operation = orderGradientsFront ? Array.prototype.unshift : Array.prototype.push;
          operation.apply(styles["background"], backgroundStyle);
        }).apply(this, this._getExtendedPropertyValueArrays(gradientProperties));
      },

      /**
       * Compute CSS rules to style the background with gradients.
       * This can be called multiple times and SHOULD layer the gradients on top of each other and on top of existing backgrounds.
       * Legacy implementation for old WebKit browsers (Chrome < 10).
       *
       * @param startColor {Color} The color to start the gradient with
       * @param endColor {Color} The color to end the gradient with
       * @param unit {Color} The unit in which startColorPosition and endColorPosition are measured
       * @param orientation {String} Either 'horizontal' or 'vertical'
       * @param startColorPosition {Number} The position of the gradient’s starting point, measured in `unit` units along the `orientation` axis from top or left
       * @param endColorPosition {Number} The position of the gradient’s ending point, measured in `unit` units along the `orientation` axis from top or left
       * @param styles {Map} The complete styles currently poised to be applied by decorators. Should not be written to in this method (use `backgroundStyle` for that)
       * @param backgroundStyle {Map} This method should push new background styles onto this array.
       *
       * @return {Boolean} Whether this implementation supports multiple gradients atop each other (true).
       */
      __styleLinearBackgroundGradientForLegacyWebkit__P_167_1: function __styleLinearBackgroundGradientForLegacyWebkit__P_167_1(startColor, endColor, unit, orientation, startColorPosition, endColorPosition, styles, backgroundStyle) {
        // webkit uses px values if non are given
        unit = unit === "px" ? "" : unit;

        if (orientation == "horizontal") {
          var startPos = startColorPosition + unit + " 0" + unit;
          var endPos = endColorPosition + unit + " 0" + unit;
        } else {
          var startPos = "0" + unit + " " + startColorPosition + unit;
          var endPos = "0" + unit + " " + endColorPosition + unit;
        }

        var color = "from(" + startColor + "),to(" + endColor + ")";
        backgroundStyle.push("-webkit-gradient(linear," + startPos + "," + endPos + "," + color + ")");
        return true;
      },

      /**
       * Compute CSS rules to style the background with gradients.
       * This can be called multiple times and SHOULD layer the gradients on top of each other and on top of existing backgrounds.
       * IE9 canvas solution.
       *
       * @param startColor {Color} The color to start the gradient with
       * @param endColor {Color} The color to end the gradient with
       * @param unit {Color} The unit in which startColorPosition and endColorPosition are measured
       * @param orientation {String} Either 'horizontal' or 'vertical'
       * @param startColorPosition {Number} The position of the gradient’s starting point, measured in `unit` units along the `orientation` axis from top or left
       * @param endColorPosition {Number} The position of the gradient’s ending point, measured in `unit` units along the `orientation` axis from top or left
       * @param styles {Map} The complete styles currently poised to be applied by decorators. Should not be written to in this method (use `backgroundStyle` for that)
       * @param backgroundStyle {Map} This method should push new background styles onto this array.
       *
       * @return {Boolean} Whether this implementation supports multiple gradients atop each other (true).
       */
      __styleLinearBackgroundGradientWithCanvas__P_167_2: function __styleLinearBackgroundGradientWithCanvas__P_167_2(startColor, endColor, unit, orientation, startColorPosition, endColorPosition, styles, backgroundStyle) {
        var me = qx.ui.decoration.MLinearBackgroundGradient.__styleLinearBackgroundGradientWithCanvas__P_167_2;

        if (!me.__canvas__P_167_5) {
          me.__canvas__P_167_5 = document.createElement("canvas");
        }

        var isVertical = orientation == "vertical";
        var height = isVertical ? 200 : 1;
        var width = isVertical ? 1 : 200;
        var range = Math.max(100, endColorPosition - startColorPosition); // use the px difference as dimension

        if (unit === "px") {
          if (isVertical) {
            height = Math.max(height, endColorPosition - startColorPosition);
          } else {
            width = Math.max(width, endColorPosition - startColorPosition);
          }
        } else {
          if (isVertical) {
            height = Math.max(height, (endColorPosition - startColorPosition) * 2);
          } else {
            width = Math.max(width, (endColorPosition - startColorPosition) * 2);
          }
        }

        me.__canvas__P_167_5.width = width;
        me.__canvas__P_167_5.height = height;

        var ctx = me.__canvas__P_167_5.getContext("2d");

        if (isVertical) {
          var lingrad = ctx.createLinearGradient(0, 0, 0, height);
        } else {
          var lingrad = ctx.createLinearGradient(0, 0, width, 0);
        } // don't allow negative start values


        if (unit === "%") {
          lingrad.addColorStop(Math.max(0, startColorPosition) / range, startColor);
          lingrad.addColorStop(endColorPosition / range, endColor);
        } else {
          var comp = isVertical ? height : width;
          lingrad.addColorStop(Math.max(0, startColorPosition) / comp, startColor);
          lingrad.addColorStop(endColorPosition / comp, endColor);
        } //Clear the rect before drawing to allow for semitransparent colors


        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = lingrad;
        ctx.fillRect(0, 0, width, height);
        var size;

        if (unit === "%") {
          size = isVertical ? "100% " + range + "%" : range + "% 100%";
        } else {
          size = isVertical ? height + "px 100%" : "100% " + width + "px";
        }

        backgroundStyle.push("url(" + me.__canvas__P_167_5.toDataURL() + ") " + size);
        return true;
      },

      /**
       * Compute CSS rules to style the background with gradients.
       * This can be called multiple times and SHOULD layer the gradients on top of each other and on top of existing backgrounds.
       * Old IE filter fallback.
       *
       * @param startColor {Color} The color to start the gradient with
       * @param endColor {Color} The color to end the gradient with
       * @param unit {Color} The unit in which startColorPosition and endColorPosition are measured
       * @param orientation {String} Either 'horizontal' or 'vertical'
       * @param startColorPosition {Number} The position of the gradient’s starting point, measured in `unit` units along the `orientation` axis from top or left
       * @param endColorPosition {Number} The position of the gradient’s ending point, measured in `unit` units along the `orientation` axis from top or left
       * @param styles {Map} The complete styles currently poised to be applied by decorators. Should not be written to in this method (use `backgroundStyle` for that). Note: this particular implementation will do that because it needs to change the `filter` property.
       * @param backgroundStyle {Map} This method should push new background styles onto this array.
       *
       * @return {Boolean} Whether this implementation supports multiple gradients atop each other (false).
       */
      __styleLinearBackgroundGradientWithMSFilter__P_167_3: function __styleLinearBackgroundGradientWithMSFilter__P_167_3(startColor, endColor, unit, orientation, startColorPosition, endColorPosition, styles, backgroundStyle) {
        var type = orientation == "horizontal" ? 1 : 0; // convert rgb, hex3 and named colors to hex6

        if (!qx.util.ColorUtil.isHex6String(startColor)) {
          startColor = qx.util.ColorUtil.stringToRgb(startColor);
          startColor = qx.util.ColorUtil.rgbToHexString(startColor);
        }

        if (!qx.util.ColorUtil.isHex6String(endColor)) {
          endColor = qx.util.ColorUtil.stringToRgb(endColor);
          endColor = qx.util.ColorUtil.rgbToHexString(endColor);
        } // get rid of the starting '#'


        startColor = startColor.substring(1, startColor.length);
        endColor = endColor.substring(1, endColor.length);
        var value = "progid:DXImageTransform.Microsoft.Gradient(GradientType=" + type + ", " + "StartColorStr='#FF" + startColor + "', " + "EndColorStr='#FF" + endColor + "';)";

        if (styles["filter"]) {
          styles["filter"] += ", " + value;
        } else {
          styles["filter"] = value;
        } // Elements with transparent backgrounds will not receive receive pointer
        // events if a Gradient filter is set.


        if (!styles["background-color"] || styles["background-color"] == "transparent") {
          // We don't support alpha transparency for the gradient color stops
          // so it doesn't matter which color we set here.
          styles["background-color"] = "white";
        }

        return false;
      },

      /**
       * Compute CSS rules to style the background with gradients.
       * This can be called multiple times and SHOULD layer the gradients on top of each other and on top of existing backgrounds.
       * Default implementation (uses spec-compliant syntax).
       *
       * @param startColor {Color} The color to start the gradient with
       * @param endColor {Color} The color to end the gradient with
       * @param unit {Color} The unit in which startColorPosition and endColorPosition are measured
       * @param orientation {String} Either 'horizontal' or 'vertical'
       * @param startColorPosition {Number} The position of the gradient’s starting point, measured in `unit` units along the `orientation` axis from top or left
       * @param endColorPosition {Number} The position of the gradient’s ending point, measured in `unit` units along the `orientation` axis from top or left
       * @param styles {Map} The complete styles currently poised to be applied by decorators. Should not be written to in this method (use `backgroundStyle` for that)
       * @param backgroundStyle {Map} This method should push new background styles onto this array.
       *
       * @return {Boolean} Whether this implementation supports multiple gradients atop each other (true).
       */
      __styleLinearBackgroundGradientAccordingToSpec__P_167_0: function __styleLinearBackgroundGradientAccordingToSpec__P_167_0(startColor, endColor, unit, orientation, startColorPosition, endColorPosition, styles, backgroundStyle) {
        // WebKit, Opera and Gecko interpret 0deg as "to right"
        var deg = orientation == "horizontal" ? 0 : 270;
        var start = startColor + " " + startColorPosition + unit;
        var end = endColor + " " + endColorPosition + unit;
        var prefixedName = qx.core.Environment.get("css.gradient.linear"); // Browsers supporting the unprefixed implementation interpret 0deg as
        // "to top" as defined by the spec [BUG #6513]

        if (prefixedName === "linear-gradient") {
          deg = orientation == "horizontal" ? deg + 90 : deg - 90;
        }

        backgroundStyle.push(prefixedName + "(" + deg + "deg, " + start + "," + end + ")");
        return true;
      },

      /**
       * Helper to get a resolved color from a name
       * @param color {String} The color name
       * @return {Map} The resolved color
       */
      __getColor__P_167_4: function __getColor__P_167_4(color) {
        return qx.core.Environment.get("qx.theme") ? qx.theme.manager.Color.getInstance().resolve(color) : color;
      },
      // property apply
      _applyLinearBackgroundGradient: function _applyLinearBackgroundGradient() {
        {
          if (this._isInitialized()) {
            throw new Error("This decorator is already in-use. Modification is not possible anymore!");
          }
        }
      }
    }
  });
  qx.ui.decoration.MLinearBackgroundGradient.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "qx.util.AliasManager": {},
      "qx.util.ResourceManager": {},
      "qx.bom.client.Css": {
        "require": true
      },
      "qx.bom.Style": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "css.borderimage.standardsyntax": {
          "className": "qx.bom.client.Css"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2013 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (martinwittemann)
       * Daniel Wagner (danielwagner)
  
  ************************************************************************ */

  /**
   * Decorator which uses the CSS3 border image properties.
   */
  qx.Mixin.define("qx.ui.decoration.MBorderImage", {
    properties: {
      /**
       * Base image URL.
       */
      borderImage: {
        check: "String",
        nullable: true,
        apply: "_applyBorderImage"
      },

      /**
       * The top slice line of the base image. The slice properties divide the
       * image into nine regions, which define the corner, edge and the center
       * images.
       */
      sliceTop: {
        check: "Integer",
        nullable: true,
        init: null,
        apply: "_applyBorderImage"
      },

      /**
       * The right slice line of the base image. The slice properties divide the
       * image into nine regions, which define the corner, edge and the center
       * images.
       */
      sliceRight: {
        check: "Integer",
        nullable: true,
        init: null,
        apply: "_applyBorderImage"
      },

      /**
       * The bottom slice line of the base image. The slice properties divide the
       * image into nine regions, which define the corner, edge and the center
       * images.
       */
      sliceBottom: {
        check: "Integer",
        nullable: true,
        init: null,
        apply: "_applyBorderImage"
      },

      /**
       * The left slice line of the base image. The slice properties divide the
       * image into nine regions, which define the corner, edge and the center
       * images.
       */
      sliceLeft: {
        check: "Integer",
        nullable: true,
        init: null,
        apply: "_applyBorderImage"
      },

      /**
       * The slice properties divide the image into nine regions, which define the
       * corner, edge and the center images.
       */
      slice: {
        group: ["sliceTop", "sliceRight", "sliceBottom", "sliceLeft"],
        mode: "shorthand"
      },

      /**
       * This property specifies how the images for the sides and the middle part
       * of the border image are scaled and tiled horizontally.
       *
       * Values have the following meanings:
       * <ul>
       *   <li><strong>stretch</strong>: The image is stretched to fill the area.</li>
       *   <li><strong>repeat</strong>: The image is tiled (repeated) to fill the area.</li>
       *   <li><strong>round</strong>: The image is tiled (repeated) to fill the area. If it does not
       *    fill the area with a whole number of tiles, the image is rescaled so
       *    that it does.</li>
       * </ul>
       */
      repeatX: {
        check: ["stretch", "repeat", "round"],
        init: "stretch",
        apply: "_applyBorderImage"
      },

      /**
       * This property specifies how the images for the sides and the middle part
       * of the border image are scaled and tiled vertically.
       *
       * Values have the following meanings:
       * <ul>
       *   <li><strong>stretch</strong>: The image is stretched to fill the area.</li>
       *   <li><strong>repeat</strong>: The image is tiled (repeated) to fill the area.</li>
       *   <li><strong>round</strong>: The image is tiled (repeated) to fill the area. If it does not
       *    fill the area with a whole number of tiles, the image is rescaled so
       *    that it does.</li>
       * </ul>
       */
      repeatY: {
        check: ["stretch", "repeat", "round"],
        init: "stretch",
        apply: "_applyBorderImage"
      },

      /**
       * This property specifies how the images for the sides and the middle part
       * of the border image are scaled and tiled.
       */
      repeat: {
        group: ["repeatX", "repeatY"],
        mode: "shorthand"
      },

      /**
       * If set to <code>false</code>, the center image will be omitted and only
       * the border will be drawn.
       */
      fill: {
        check: "Boolean",
        init: true,
        apply: "_applyBorderImage"
      },

      /**
       * Configures the border image mode. Supported values:
       * <ul>
       *   <li>horizontal: left and right border images</li>
       *   <li>vertical: top and bottom border images</li>
       *   <li>grid: border images for all edges</li>
       * </ul>
       */
      borderImageMode: {
        check: ["horizontal", "vertical", "grid"],
        init: "grid"
      }
    },
    members: {
      /**
       * Adds the border-image styles to the given map
       * @param styles {Map} CSS style map
       */
      _styleBorderImage: function _styleBorderImage(styles) {
        if (!this.getBorderImage()) {
          return;
        }

        var resolvedImage = qx.util.AliasManager.getInstance().resolve(this.getBorderImage());
        var source = qx.util.ResourceManager.getInstance().toUri(resolvedImage);

        var computedSlices = this._getDefaultInsetsForBorderImage();

        var slice = [computedSlices.top, computedSlices.right, computedSlices.bottom, computedSlices.left];
        var repeat = [this.getRepeatX(), this.getRepeatY()].join(" ");
        var fill = this.getFill() && qx.core.Environment.get("css.borderimage.standardsyntax") ? " fill" : "";
        var styleName = qx.bom.Style.getPropertyName("borderImage");

        if (styleName) {
          var cssName = qx.bom.Style.getCssName(styleName);
          styles[cssName] = 'url("' + source + '") ' + slice.join(" ") + fill + " " + repeat;
        } // Apply border styles even if we couldn't determine the borderImage property name
        // (e.g. because the browser doesn't support it). This is needed to keep
        // the layout intact.


        styles["border-style"] = "solid";
        styles["border-color"] = "transparent";
        styles["border-width"] = slice.join("px ") + "px";
      },

      /**
       * Computes the inset values based on the border image slices (defined in the
       * decoration theme or computed from the fallback image sizes).
       *
       * @return {Map} Map with the top, right, bottom and left insets
       */
      _getDefaultInsetsForBorderImage: function _getDefaultInsetsForBorderImage() {
        if (!this.getBorderImage()) {
          return {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          };
        }

        var resolvedImage = qx.util.AliasManager.getInstance().resolve(this.getBorderImage());

        var computedSlices = this.__getSlices__P_168_0(resolvedImage);

        return {
          top: this.getSliceTop() || computedSlices[0],
          right: this.getSliceRight() || computedSlices[1],
          bottom: this.getSliceBottom() || computedSlices[2],
          left: this.getSliceLeft() || computedSlices[3]
        };
      },
      _applyBorderImage: function _applyBorderImage() {
        {
          if (this._isInitialized()) {
            throw new Error("This decorator is already in-use. Modification is not possible anymore!");
          }
        }
      },

      /**
       * Gets the slice sizes from the fallback border images.
       *
       * @param baseImage {String} Resource Id of the base border image
       * @return {Integer[]} Array with the top, right, bottom and left slice widths
       */
      __getSlices__P_168_0: function __getSlices__P_168_0(baseImage) {
        var mode = this.getBorderImageMode();
        var topSlice = 0;
        var rightSlice = 0;
        var bottomSlice = 0;
        var leftSlice = 0;
        var split = /(.*)(\.[a-z]+)$/.exec(baseImage);
        var prefix = split[1];
        var ext = split[2];
        var ResourceManager = qx.util.ResourceManager.getInstance();

        if (mode == "grid" || mode == "vertical") {
          topSlice = ResourceManager.getImageHeight(prefix + "-t" + ext);
          bottomSlice = ResourceManager.getImageHeight(prefix + "-b" + ext);
        }

        if (mode == "grid" || mode == "horizontal") {
          rightSlice = ResourceManager.getImageWidth(prefix + "-r" + ext);
          leftSlice = ResourceManager.getImageWidth(prefix + "-l" + ext);
        }

        return [topSlice, rightSlice, bottomSlice, leftSlice];
      }
    }
  });
  qx.ui.decoration.MBorderImage.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "qx.bom.client.CssTransition": {
        "require": true
      },
      "qx.bom.client.Browser": {},
      "qx.bom.Style": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "css.transition": {
          "className": "qx.bom.client.CssTransition"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2017 OETIKER+PARTNER AG
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Tobias Oetiker (oetiker)
  
  ************************************************************************ */

  /**
   * Mixin responsible for setting the css transition properties of a widget
   * This mixin is usually used by {@link qx.ui.decoration.Decorator}.
   *
   * Keep in mind that this is not supported by all browsers:
   *
   * * Firefox 16+
   * * IE 10+
   * * Edge
   * * Safari 6.1+
   * * Opera 12.10+
   * * Chrome 26+
   *
   * It is possible to define transitions by setting an
   * array containing the needed values as the property value.
   * In case multiple values are specified, the values of the properties
   * are repeated until all match in length.
   *
   * An example:
   * <pre class="javascript">
   *   'my-decorator': {
   *     style: {
   *       transitionProperty: ['top','left']
   *       transitionDuration: '1s'
   *     }
   *   }
   * </pre>
   */
  qx.Mixin.define("qx.ui.decoration.MTransition", {
    properties: {
      /** transition property */
      transitionProperty: {
        nullable: true,
        apply: "_applyTransition"
      },

      /** transition duration */
      transitionDuration: {
        nullable: true,
        apply: "_applyTransition"
      },

      /** transition delay */
      transitionTimingFunction: {
        nullable: true,
        apply: "_applyTransition"
      },

      /** transition delay */
      transitionDelay: {
        nullable: true,
        apply: "_applyTransition"
      }
    },
    members: {
      /**
       * Takes a styles map and adds the box shadow styles in place to the
       * given map. This is the needed behavior for
       * {@link qx.ui.decoration.Decorator}.
       *
       * @param styles {Map} A map to add the styles.
       */
      _styleTransition: function _styleTransition(styles) {
        var propName = qx.core.Environment.get("css.transition");

        if (!propName || this.getTransitionDuration() == null) {
          return;
        }

        if (qx.bom.client.Browser.getName() === "chrome" && qx.bom.client.Browser.getVersion() >= 71) {
          // chrome has a repaint problem ... as suggested in
          // https://stackoverflow.com/a/21947628/235990 we are setting
          // a transform ...
          if (!styles.transform) {
            styles.transform = "translateZ(0)";
          }
        }

        propName = qx.bom.Style.getCssName(propName.name);
        var transitionProperties = ["transitionProperty", "transitionDuration", "transitionTimingFunction", "transitionDelay"];
        (function (tPros, tDurs, tTims, tDels) {
          for (var i = 0; i < tPros.length; i++) {
            var tPro = tPros[i] || "all";
            var tDur = tDurs[i] || "0s";
            var tTim = tTims[i] || "ease";
            var tDel = tDels[i] || "0s";
            var value = tPro + " " + tDur + " " + tTim + " " + tDel;

            if (!styles[propName]) {
              styles[propName] = value;
            } else {
              styles[propName] += "," + value;
            }
          }
        }).apply(this, this._getExtendedPropertyValueArrays(transitionProperties));
      },
      // property apply
      _applyTransition: function _applyTransition() {
        {
          if (this._isInitialized()) {
            throw new Error("This decorator is already in-use. Modification is not possible anymore!");
          }
        }
      }
    }
  });
  qx.ui.decoration.MTransition.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.decoration.Abstract": {
        "require": true
      },
      "qx.ui.decoration.IDecorator": {
        "require": true
      },
      "qx.ui.decoration.MBackgroundColor": {
        "require": true
      },
      "qx.ui.decoration.MBorderRadius": {
        "require": true
      },
      "qx.ui.decoration.MBoxShadow": {
        "require": true
      },
      "qx.ui.decoration.MDoubleBorder": {
        "require": true
      },
      "qx.ui.decoration.MLinearBackgroundGradient": {
        "require": true
      },
      "qx.ui.decoration.MBorderImage": {
        "require": true
      },
      "qx.ui.decoration.MTransition": {
        "require": true
      },
      "qx.lang.String": {},
      "qx.lang.Type": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2013 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (wittemann)
       * Daniel Wagner (danielwagner)
  
  ************************************************************************ */

  /**
   * Decorator including all decoration possibilities from mixins:
   *
   * <ul>
   * <li>Background color</li>
   * <li>Background image</li>
   * <li>Background gradient</li>
   * <li>Single and double borders</li>
   * <li>Border radius</li>
   * <li>Box shadow</li>
   * </ul>
   */
  qx.Class.define("qx.ui.decoration.Decorator", {
    extend: qx.ui.decoration.Abstract,
    implement: [qx.ui.decoration.IDecorator],
    include: [qx.ui.decoration.MBackgroundColor, qx.ui.decoration.MBorderRadius, qx.ui.decoration.MBoxShadow, qx.ui.decoration.MDoubleBorder, qx.ui.decoration.MLinearBackgroundGradient, qx.ui.decoration.MBorderImage, qx.ui.decoration.MTransition],
    members: {
      __initialized__P_133_0: false,

      /**
       * Returns the configured padding minus the border width.
       * @return {Map} Map of top, right, bottom and left padding values
       */
      getPadding: function getPadding() {
        var insets = this.getInset();

        var slices = this._getDefaultInsetsForBorderImage();

        var borderTop = insets.top - (slices.top ? slices.top : this.getWidthTop());
        var borderRight = insets.right - (slices.right ? slices.right : this.getWidthRight());
        var borderBottom = insets.bottom - (slices.bottom ? slices.bottom : this.getWidthBottom());
        var borderLeft = insets.left - (slices.left ? slices.left : this.getWidthLeft());
        return {
          top: insets.top ? borderTop : this.getInnerWidthTop(),
          right: insets.right ? borderRight : this.getInnerWidthRight(),
          bottom: insets.bottom ? borderBottom : this.getInnerWidthBottom(),
          left: insets.left ? borderLeft : this.getInnerWidthLeft()
        };
      },

      /**
       * Returns the styles of the decorator as a map with property names written
       * in javascript style (e.g. <code>fontWeight</code> instead of <code>font-weight</code>).
       *
       * @param css {Boolean?} <code>true</code> if hyphenated CSS names should be returned.
       * @return {Map} style information
       */
      getStyles: function getStyles(css) {
        if (css) {
          return this._getStyles();
        }

        var jsStyles = {};

        var cssStyles = this._getStyles();

        for (var property in cssStyles) {
          jsStyles[qx.lang.String.camelCase(property)] = cssStyles[property];
        }

        return jsStyles;
      },

      /**
       * Collects all the style information from the decorators.
       *
       * @return {Map} style information
       */
      _getStyles: function _getStyles() {
        var styles = {};

        for (var name in this) {
          if (name.indexOf("_style") == 0 && this[name] instanceof Function) {
            this[name](styles);
          }
        }

        for (var name in styles) {
          if (qx.lang.Type.isArray(styles[name])) {
            styles[name] = styles[name].join(", ");
          }
        }

        this.__initialized__P_133_0 = true;
        return styles;
      },
      // overridden
      _getDefaultInsets: function _getDefaultInsets() {
        var directions = ["top", "right", "bottom", "left"];
        var defaultInsets = {};

        for (var name in this) {
          if (name.indexOf("_getDefaultInsetsFor") == 0 && this[name] instanceof Function) {
            var currentInsets = this[name]();

            for (var i = 0; i < directions.length; i++) {
              var direction = directions[i]; // initialize with the first insets found

              if (defaultInsets[direction] == undefined) {
                defaultInsets[direction] = currentInsets[direction];
              } // take the largest inset


              if (currentInsets[direction] > defaultInsets[direction]) {
                defaultInsets[direction] = currentInsets[direction];
              }
            }
          }
        } // check if the mixins have created a default insets


        if (defaultInsets["top"] != undefined) {
          return defaultInsets;
        } // return a fallback which is 0 for all insets


        return {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        };
      },
      // overridden
      _isInitialized: function _isInitialized() {
        return this.__initialized__P_133_0;
      },

      /**
       * Ensures that every propertyValue specified in propertyNames is an array.
       * The value arrays are extended and repeated to match in length.
       * @param propertyNames {Array} Array containing the propertyNames.
       * @return {Array} Array containing the extended value arrays.
       */
      _getExtendedPropertyValueArrays: function _getExtendedPropertyValueArrays(propertyNames) {
        // transform non-array values to an array containing that value
        var propertyValues = propertyNames.map(function (propName) {
          var value = this.get(propName);

          if (!qx.lang.Type.isArray(value)) {
            value = [value];
          }

          return value;
        }, this); // Because it's possible to set multiple values for a property there's
        // a chance that not all properties have the same number of values set.
        // Extend the value arrays by repeating existing values until all
        // arrays match in length.

        var items = Math.max.apply(Math, propertyValues.map(function (prop) {
          return prop.length;
        }));

        for (var i = 0; i < propertyValues.length; i++) {
          this.__extendArray__P_133_1(propertyValues[i], items);
        }

        return propertyValues;
      },

      /**
       * Extends an array up to the given length by repeating the elements already present.
       * @param array {Array} Incoming array. Has to contain at least one element.
       * @param to {Integer} Desired length. Must be greater than or equal to the the length of arr.
       */
      __extendArray__P_133_1: function __extendArray__P_133_1(array, to) {
        var initial = array.length;

        while (array.length < to) {
          array.push(array[array.length % initial]);
        }
      }
    }
  });
  qx.ui.decoration.Decorator.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.util.ValueManager": {
        "construct": true,
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
  
  ************************************************************************ */

  /**
   * This singleton manages global resource aliases.
   *
   * The AliasManager supports simple prefix replacement on strings. There are
   * some pre-defined aliases, and you can register your own with {@link #add}.
   * The AliasManager is automatically invoked in various situations, e.g. when
   * resolving the icon image for a button, so it is common to register aliases for
   * <a href="http://qooxdoo.org/docs/#desktop/gui/resources.md">resource id's</a>.
   * You can of course call the AliasManager's {@link #resolve}
   * explicitly to get an alias resolution in any situation, but keep that
   * automatic invocation of the AliasManager in mind when defining new aliases as
   * they will be applied globally in many classes, not only your own.
   *
   * Examples:
   * <ul>
   *  <li> <code>foo</code> -> <code>bar/16pt/baz</code>  (resolves e.g. __"foo/a/b/c.png"__ to
   *    __"bar/16pt/baz/a/b/c.png"__)
   *  <li> <code>imgserver</code> -> <code>http&#058;&#047;&#047;imgs03.myserver.com/my/app/</code>
   *    (resolves e.g. __"imgserver/a/b/c.png"__ to
   *    __"http&#058;&#047;&#047;imgs03.myserver.com/my/app/a/b/c.png"__)
   * </ul>
   *
   * For resources, only aliases that resolve to proper resource id's can be __managed__
   * resources, and will be considered __unmanaged__ resources otherwise.
   */
  qx.Class.define("qx.util.AliasManager", {
    type: "singleton",
    extend: qx.util.ValueManager,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qx.util.ValueManager.constructor.call(this); // Contains defined aliases (like icons/, widgets/, application/, ...)

      this.__aliases__P_134_0 = {}; // Define static alias from setting

      this.add("static", "qx/static");
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __aliases__P_134_0: null,

      /**
       * pre-process incoming dynamic value
       *
       * @param value {String} incoming value
       * @return {String} pre processed value
       */
      _preprocess: function _preprocess(value) {
        var dynamics = this._getDynamic();

        if (dynamics[value] === false) {
          return value;
        } else if (dynamics[value] === undefined) {
          if (value.charAt(0) === "/" || value.charAt(0) === "." || value.indexOf("http://") === 0 || value.indexOf("https://") === "0" || value.indexOf("file://") === 0) {
            dynamics[value] = false;
            return value;
          }

          if (this.__aliases__P_134_0[value]) {
            return this.__aliases__P_134_0[value];
          }

          var alias = value.substring(0, value.indexOf("/"));
          var resolved = this.__aliases__P_134_0[alias];

          if (resolved !== undefined) {
            dynamics[value] = resolved + value.substring(alias.length);
          }
        }

        return value;
      },

      /**
       * Define an alias to a resource path
       *
       * @param alias {String} alias name for the resource path/url
       * @param base {String} first part of URI for all images which use this alias
       */
      add: function add(alias, base) {
        // Store new alias value
        this.__aliases__P_134_0[alias] = base; // Localify stores

        var dynamics = this._getDynamic(); // Update old entries which use this alias


        for (var path in dynamics) {
          if (path.substring(0, path.indexOf("/")) === alias) {
            dynamics[path] = base + path.substring(alias.length);
          }
        }
      },

      /**
       * Remove a previously defined alias
       *
       * @param alias {String} alias name for the resource path/url
       */
      remove: function remove(alias) {
        delete this.__aliases__P_134_0[alias]; // No signal for depending objects here. These
        // will informed with the new value using add().
      },

      /**
       * Resolves a given path
       *
       * @param path {String} input path
       * @return {String} resulting path (with interpreted aliases)
       */
      resolve: function resolve(path) {
        var dynamic = this._getDynamic();

        if (path != null) {
          path = this._preprocess(path);
        }

        return dynamic[path] || path;
      },

      /**
       * Get registered aliases
       *
       * @return {Map} the map of the currently registered alias:resolution pairs
       */
      getAliases: function getAliases() {
        var res = {};

        for (var key in this.__aliases__P_134_0) {
          res[key] = this.__aliases__P_134_0[key];
        }

        return res;
      }
    }
  });
  qx.util.AliasManager.$$dbClassInfo = $$dbClassInfo;
})();

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
      },
      "qx.lang.String": {},
      "qx.theme.manager.Color": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
       * Fabian Jakobs (fjakobs)
       * Mustafa Sak (msak)
  
  ************************************************************************ */

  /**
   * A wrapper for CSS font styles. Fond objects can be applied to instances
   * of {@link qx.html.Element}.
   */
  qx.Class.define("qx.bom.Font", {
    extend: qx.core.Object,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param size {String?} The font size (Unit: pixel)
     * @param family {String[]?} A sorted list of font families
     */
    construct: function construct(size, family) {
      qx.core.Object.constructor.call(this);
      this.__lookupMap__P_114_0 = {
        fontFamily: "",
        fontSize: null,
        fontWeight: null,
        fontStyle: null,
        textDecoration: null,
        lineHeight: null,
        color: null,
        textShadow: null,
        letterSpacing: null
      };

      if (size !== undefined) {
        this.setSize(size);
      }

      if (family !== undefined) {
        this.setFamily(family);
      }
    },

    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */
    statics: {
      /**
       * Converts a typical CSS font definition string to an font object
       *
       * Example string: <code>bold italic 20px Arial</code>
       *
       * @param str {String} the CSS string
       * @return {qx.bom.Font} the created instance
       */
      fromString: function fromString(str) {
        var font = new qx.bom.Font();
        var parts = str.split(/\s+/);
        var name = [];
        var part;

        for (var i = 0; i < parts.length; i++) {
          switch (part = parts[i]) {
            case "bold":
              font.setBold(true);
              break;

            case "italic":
              font.setItalic(true);
              break;

            case "underline":
              font.setDecoration("underline");
              break;

            default:
              var temp = parseInt(part, 10);

              if (temp == part || qx.lang.String.contains(part, "px")) {
                font.setSize(temp);
              } else {
                name.push(part);
              }

              break;
          }
        }

        if (name.length > 0) {
          font.setFamily(name);
        }

        return font;
      },

      /**
       * Converts a map property definition into a font object.
       *
       * @param config {Map} map of property values
       * @return {qx.bom.Font} the created instance
       */
      fromConfig: function fromConfig(config) {
        var font = new qx.bom.Font();
        font.set(config);
        return font;
      },

      /** @type {Map} Default (empty) CSS styles */
      __defaultStyles__P_114_1: {
        fontFamily: "",
        fontSize: "",
        fontWeight: "",
        fontStyle: "",
        textDecoration: "",
        lineHeight: 1.2,
        color: "",
        textShadow: "",
        letterSpacing: ""
      },

      /**
       * Returns a map of all properties in empty state.
       *
       * This is useful for resetting previously configured
       * font styles.
       *
       * @return {Map} Default styles
       */
      getDefaultStyles: function getDefaultStyles() {
        return this.__defaultStyles__P_114_1;
      }
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /** The font size (Unit: pixel) */
      size: {
        check: "Integer",
        nullable: true,
        apply: "_applySize"
      },

      /**
       * The line height as scaling factor of the default line height. A value
       * of 1 corresponds to the default line height
       */
      lineHeight: {
        check: "Number",
        nullable: true,
        apply: "_applyLineHeight"
      },

      /**
       * Characters that are used to test if the font has loaded properly. These
       * default to "WEei" in `qx.bom.webfont.Validator` and can be overridden
       * for certain cases like icon fonts that do not provide the predefined
       * characters.
       */
      comparisonString: {
        check: "String",
        init: null,
        nullable: true
      },

      /**
       * Version identifier that is appended to the URL to be loaded. Fonts
       * that are defined thru themes may be managed by the resource manager.
       * In this case updated fonts persist due to aggressive fontface caching
       * of some browsers. To get around this, set the `version` property to
       * the version of your font. It will be appended to the CSS URL and forces
       * the browser to re-validate.
       *
       * The version needs to be URL friendly, so only characters, numbers,
       * dash and dots are allowed here.
       */
      version: {
        check: function check(value) {
          return value === null || typeof value === "string" && /^[a-zA-Z0-9.-]+$/.test(value);
        },
        init: null,
        nullable: true
      },

      /** A sorted list of font families */
      family: {
        check: "Array",
        nullable: true,
        apply: "_applyFamily"
      },

      /** Whether the font is bold */
      bold: {
        check: "Boolean",
        nullable: true,
        apply: "_applyBold"
      },

      /** Whether the font is italic */
      italic: {
        check: "Boolean",
        nullable: true,
        apply: "_applyItalic"
      },

      /** The text decoration for this font */
      decoration: {
        check: ["underline", "line-through", "overline"],
        nullable: true,
        apply: "_applyDecoration"
      },

      /** The text color for this font */
      color: {
        check: "Color",
        nullable: true,
        apply: "_applyColor"
      },

      /** The text shadow for this font */
      textShadow: {
        nullable: true,
        check: "String",
        apply: "_applyTextShadow"
      },

      /** The weight property of the font as opposed to just setting it to 'bold' by setting the bold property to true */
      weight: {
        nullable: true,
        check: "String",
        apply: "_applyWeight"
      },

      /** The Letter Spacing (Unit: pixel) */
      letterSpacing: {
        check: "Integer",
        nullable: true,
        apply: "_applyLetterSpacing"
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __lookupMap__P_114_0: null,
      // property apply
      _applySize: function _applySize(value, old) {
        this.__lookupMap__P_114_0.fontSize = value === null ? null : value + "px";
      },
      _applyLineHeight: function _applyLineHeight(value, old) {
        this.__lookupMap__P_114_0.lineHeight = value === null ? null : value;
      },
      // property apply
      _applyFamily: function _applyFamily(value, old) {
        var family = "";

        for (var i = 0, l = value.length; i < l; i++) {
          // in FireFox 2 and WebKit fonts like 'serif' or 'sans-serif' must
          // not be quoted!
          if (value[i].indexOf(" ") > 0) {
            family += '"' + value[i] + '"';
          } else {
            family += value[i];
          }

          if (i !== l - 1) {
            family += ",";
          }
        } // font family is a special case. In order to render the labels correctly
        // we have to return a font family - even if it's an empty string to prevent
        // the browser from applying the element style


        this.__lookupMap__P_114_0.fontFamily = family;
      },
      // property apply
      _applyBold: function _applyBold(value, old) {
        this.__lookupMap__P_114_0.fontWeight = value == null ? null : value ? "bold" : "normal";
      },
      // property apply
      _applyItalic: function _applyItalic(value, old) {
        this.__lookupMap__P_114_0.fontStyle = value == null ? null : value ? "italic" : "normal";
      },
      // property apply
      _applyDecoration: function _applyDecoration(value, old) {
        this.__lookupMap__P_114_0.textDecoration = value == null ? null : value;
      },
      // property apply
      _applyColor: function _applyColor(value, old) {
        this.__lookupMap__P_114_0.color = null;

        if (value) {
          this.__lookupMap__P_114_0.color = qx.theme.manager.Color.getInstance().resolve(value);
        }
      },
      // property apply
      _applyWeight: function _applyWeight(value, old) {
        this.__lookupMap__P_114_0.fontWeight = value;
      },
      // property apply
      _applyTextShadow: function _applyTextShadow(value, old) {
        this.__lookupMap__P_114_0.textShadow = value == null ? null : value;
      },
      // property apply
      _applyLetterSpacing: function _applyLetterSpacing(value, old) {
        this.__lookupMap__P_114_0.letterSpacing = value === null ? null : value + "px";
      },

      /**
       * Get a map of all CSS styles, which will be applied to the widget. Only
       * the styles which are set are returned.
       *
       * @return {Map} Map containing the current styles. The keys are property
       * names which can directly be used with the <code>set</code> method of each
       * widget.
       */
      getStyles: function getStyles() {
        return this.__lookupMap__P_114_0;
      }
    }
  });
  qx.bom.Font.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.bom.Font": {
        "require": true
      },
      "qx.bom.webfonts.Manager": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
  ************************************************************************ */

  /**
   * Requests web fonts from {@link qx.bom.webfonts.Manager} and fires events
   * when their loading status is known.
   */
  qx.Class.define("qx.bom.webfonts.WebFont", {
    extend: qx.bom.Font,

    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */
    events: {
      /**
       * Fired when the status of a web font has been determined. The event data
       * is a map with the keys "family" (the font-family name) and "valid"
       * (Boolean).
       */
      changeStatus: "qx.event.type.Data"
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /**
       * The source of the webfont.
       */
      sources: {
        nullable: true,
        apply: "_applySources"
      },

      /**
       * Indicates that the font has loaded successfully
       */
      valid: {
        init: false,
        check: "Boolean",
        event: "changeValid"
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __families__P_113_0: null,
      // property apply
      _applySources: function _applySources(value, old) {
        var families = [];

        for (var i = 0, l = value.length; i < l; i++) {
          var familyName = this._quoteFontFamily(value[i].family);

          families.push(familyName);
          var sourcesList = value[i];
          sourcesList.comparisonString = this.getComparisonString();
          sourcesList.version = this.getVersion();

          qx.bom.webfonts.Manager.getInstance().require(familyName, sourcesList, this._onWebFontChangeStatus, this);
        }

        this.setFamily(families.concat(this.getFamily()));
      },

      /**
       * Propagates web font status changes
       *
       * @param ev {qx.event.type.Data} "changeStatus"
       */
      _onWebFontChangeStatus: function _onWebFontChangeStatus(ev) {
        var result = ev.getData();
        this.setValid(!!result.valid);
        this.fireDataEvent("changeStatus", result);
        {
          if (result.valid === false) {
            this.warn("WebFont " + result.family + " was not applied, perhaps the source file could not be loaded.");
          }
        }
      },

      /**
       * Makes sure font-family names containing spaces are properly quoted
       *
       * @param familyName {String} A font-family CSS value
       * @return {String} The quoted family name
       */
      _quoteFontFamily: function _quoteFontFamily(familyName) {
        return familyName.replace(/["']/g, "");
      }
    }
  });
  qx.bom.webfonts.WebFont.$$dbClassInfo = $$dbClassInfo;
})();

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
      },
      "qx.core.IDisposable": {
        "require": true
      },
      "qx.event.Timer": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Jonathan Weiß (jonathan_rass)
  
  ************************************************************************ */

  /**
   * A generic singleton that fires an "interval" event all 100 milliseconds. It
   * can be used whenever one needs to run code periodically. The main purpose of
   * this class is reduce the number of timers.
   *
   * NOTE: Instances of this class must be disposed of after use
   *
   */
  qx.Class.define("qx.event.Idle", {
    extend: qx.core.Object,
    implement: [qx.core.IDisposable],
    type: "singleton",
    construct: function construct() {
      qx.core.Object.constructor.call(this);
    },

    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */
    events: {
      /** This event if fired each time the interval time has elapsed */
      interval: "qx.event.type.Event"
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /**
       * Interval for the timer, which periodically fires the "interval" event,
       * in milliseconds.
       */
      timeoutInterval: {
        check: "Number",
        init: 100,
        apply: "_applyTimeoutInterval"
      }
    },
    members: {
      __timer__P_184_0: null,
      // property apply
      _applyTimeoutInterval: function _applyTimeoutInterval(value) {
        if (this.__timer__P_184_0) {
          this.__timer__P_184_0.setInterval(value);
        }
      },

      /**
       * Fires an "interval" event
       */
      _onInterval: function _onInterval() {
        this.fireEvent("interval");
      },

      /**
       * Starts the timer but only if there are listeners for the "interval" event
       */
      __startTimer__P_184_1: function __startTimer__P_184_1() {
        if (!this.__timer__P_184_0 && this.hasListener("interval")) {
          var timer = new qx.event.Timer(this.getTimeoutInterval());
          timer.addListener("interval", this._onInterval, this);
          timer.start();
          this.__timer__P_184_0 = timer;
        }
      },

      /**
       * Stops the timer but only if there are no listeners for the interval event
       */
      __stopTimer__P_184_2: function __stopTimer__P_184_2() {
        if (this.__timer__P_184_0 && !this.hasListener("interval")) {
          this.__timer__P_184_0.stop();

          this.__timer__P_184_0.dispose();

          this.__timer__P_184_0 = null;
        }
      },

      /*
       * @Override
       */
      addListener: function addListener(type, listener, self, capture) {
        var result = qx.event.Idle.superclass.prototype.addListener.call(this, type, listener, self, capture);

        this.__startTimer__P_184_1();

        return result;
      },

      /*
       * @Override
       */
      addListenerOnce: function addListenerOnce(type, listener, self, capture) {
        var result = qx.event.Idle.superclass.prototype.addListenerOnce.call(this, type, listener, self, capture);

        this.__startTimer__P_184_1();

        return result;
      },

      /*
       * @Override
       */
      removeListener: function removeListener(type, listener, self, capture) {
        var result = qx.event.Idle.superclass.prototype.removeListener.call(this, type, listener, self, capture);

        this.__stopTimer__P_184_2();

        return result;
      },

      /*
       * @Override
       */
      removeListenerById: function removeListenerById(id) {
        var result = qx.event.Idle.superclass.prototype.removeListenerById.call(this, id);

        this.__stopTimer__P_184_2();

        return result;
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      if (this.__timer__P_184_0) {
        this.__timer__P_184_0.stop();
      }

      this.__timer__P_184_0 = null;
    }
  });
  qx.event.Idle.$$dbClassInfo = $$dbClassInfo;
})();

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
      },
      "qx.util.placement.DirectAxis": {
        "construct": true
      },
      "qx.core.Assert": {},
      "qx.util.placement.KeepAlignAxis": {},
      "qx.util.placement.BestFitAxis": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2009 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Fabian Jakobs (fjakobs)
       * Christian Hagendorn (chris_schmidt)
  
  ************************************************************************ */

  /**
   * Contains methods to compute a position for any object which should
   * be positioned relative to another object.
   */
  qx.Class.define("qx.util.placement.Placement", {
    extend: qx.core.Object,
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      this.__defaultAxis__P_185_0 = qx.util.placement.DirectAxis;
    },
    properties: {
      /**
       * The axis object to use for the horizontal placement
       */
      axisX: {
        check: "Class"
      },

      /**
       * The axis object to use for the vertical placement
       */
      axisY: {
        check: "Class"
      },

      /**
       * Specify to which edge of the target object, the object should be attached
       */
      edge: {
        check: ["top", "right", "bottom", "left"],
        init: "top"
      },

      /**
       * Specify with which edge of the target object, the object should be aligned
       */
      align: {
        check: ["top", "right", "bottom", "left", "center", "middle"],
        init: "right"
      }
    },
    statics: {
      __instance__P_185_1: null,

      /**
       * DOM and widget independent method to compute the location
       * of an object to make it relative to any other object.
       *
       * @param size {Map} With the keys <code>width</code> and <code>height</code>
       *   of the object to align
       * @param area {Map} Available area to position the object. Has the keys
       *   <code>width</code> and <code>height</code>. Normally this is the parent
       *   object of the one to align.
       * @param target {Map} Location of the object to align the object to. This map
       *   should have the keys <code>left</code>, <code>top</code>, <code>right</code>
       *   and <code>bottom</code>.
       * @param offsets {Map} Map with all offsets for each direction.
       *   Comes with the keys <code>left</code>, <code>top</code>,
       *   <code>right</code> and <code>bottom</code>.
       * @param position {String} Alignment of the object on the target, any of
       *   "top-left", "top-center", "top-right", "bottom-left", "bottom-center", "bottom-right",
       *   "left-top", "left-middle", "left-bottom", "right-top", "right-middle", "right-bottom".
       * @param modeX {String} Horizontal placement mode. Valid values are:
       *   <ul>
       *   <li><code>direct</code>: place the object directly at the given
       *   location.</li>
       *   <li><code>keep-align</code>: if parts of the object is outside of the visible
       *   area it is moved to the best fitting 'edge' and 'alignment' of the target.
       *   It is guaranteed the the new position attaches the object to one of the
       *   target edges and that that is aligned with a target edge.</li>
       *   <li>best-fit</li>: If parts of the object are outside of the visible
       *   area it is moved into the view port ignoring any offset, and position
       *   values.
       *   </ul>
       * @param modeY {String} Vertical placement mode. Accepts the same values as
       *   the 'modeX' argument.
       * @return {Map} A map with the final location stored in the keys
       *   <code>left</code> and <code>top</code>.
       */
      compute: function compute(size, area, target, offsets, position, modeX, modeY) {
        this.__instance__P_185_1 = this.__instance__P_185_1 || new qx.util.placement.Placement();
        var splitted = position.split("-");
        var edge = splitted[0];
        var align = splitted[1];
        {
          if (align === "center" || align === "middle") {
            var expected = "middle";

            if (edge === "top" || edge === "bottom") {
              expected = "center";
            }

            qx.core.Assert.assertEquals(expected, align, "Please use '" + edge + "-" + expected + "' instead!");
          }
        }

        this.__instance__P_185_1.set({
          axisX: this.__getAxis__P_185_2(modeX),
          axisY: this.__getAxis__P_185_2(modeY),
          edge: edge,
          align: align
        });

        return this.__instance__P_185_1.compute(size, area, target, offsets);
      },
      __direct__P_185_3: null,
      __keepAlign__P_185_4: null,
      __bestFit__P_185_5: null,

      /**
       * Get the axis implementation for the given mode
       *
       * @param mode {String} One of <code>direct</code>, <code>keep-align</code> or
       *   <code>best-fit</code>
       * @return {qx.util.placement.AbstractAxis}
       */
      __getAxis__P_185_2: function __getAxis__P_185_2(mode) {
        switch (mode) {
          case "direct":
            this.__direct__P_185_3 = this.__direct__P_185_3 || qx.util.placement.DirectAxis;
            return this.__direct__P_185_3;

          case "keep-align":
            this.__keepAlign__P_185_4 = this.__keepAlign__P_185_4 || qx.util.placement.KeepAlignAxis;
            return this.__keepAlign__P_185_4;

          case "best-fit":
            this.__bestFit__P_185_5 = this.__bestFit__P_185_5 || qx.util.placement.BestFitAxis;
            return this.__bestFit__P_185_5;

          default:
            throw new Error("Invalid 'mode' argument!'");
        }
      }
    },
    members: {
      __defaultAxis__P_185_0: null,

      /**
       * DOM and widget independent method to compute the location
       * of an object to make it relative to any other object.
       *
       * @param size {Map} With the keys <code>width</code> and <code>height</code>
       *   of the object to align
       * @param area {Map} Available area to position the object. Has the keys
       *   <code>width</code> and <code>height</code>. Normally this is the parent
       *   object of the one to align.
       * @param target {Map} Location of the object to align the object to. This map
       *   should have the keys <code>left</code>, <code>top</code>, <code>right</code>
       *   and <code>bottom</code>.
       * @param offsets {Map} Map with all offsets for each direction.
       *   Comes with the keys <code>left</code>, <code>top</code>,
       *   <code>right</code> and <code>bottom</code>.
       * @return {Map} A map with the final location stored in the keys
       *   <code>left</code> and <code>top</code>.
       */
      compute: function compute(size, area, target, offsets) {
        {
          this.assertObject(size, "size");
          this.assertNumber(size.width, "size.width");
          this.assertNumber(size.height, "size.height");
          this.assertObject(area, "area");
          this.assertNumber(area.width, "area.width");
          this.assertNumber(area.height, "area.height");
          this.assertObject(target, "target");
          this.assertNumber(target.top, "target.top");
          this.assertNumber(target.right, "target.right");
          this.assertNumber(target.bottom, "target.bottom");
          this.assertNumber(target.left, "target.left");
          this.assertObject(offsets, "offsets");
          this.assertNumber(offsets.top, "offsets.top");
          this.assertNumber(offsets.right, "offsets.right");
          this.assertNumber(offsets.bottom, "offsets.bottom");
          this.assertNumber(offsets.left, "offsets.left");
        }

        var axisX = this.getAxisX() || this.__defaultAxis__P_185_0;

        var left = axisX.computeStart(size.width, {
          start: target.left,
          end: target.right
        }, {
          start: offsets.left,
          end: offsets.right
        }, area.width, this.__getPositionX__P_185_6());

        var axisY = this.getAxisY() || this.__defaultAxis__P_185_0;

        var top = axisY.computeStart(size.height, {
          start: target.top,
          end: target.bottom
        }, {
          start: offsets.top,
          end: offsets.bottom
        }, area.height, this.__getPositionY__P_185_7());
        return {
          left: left,
          top: top
        };
      },

      /**
       * Get the position value for the horizontal axis
       *
       * @return {String} the position
       */
      __getPositionX__P_185_6: function __getPositionX__P_185_6() {
        var edge = this.getEdge();
        var align = this.getAlign();

        if (edge == "left") {
          return "edge-start";
        } else if (edge == "right") {
          return "edge-end";
        } else if (align == "left") {
          return "align-start";
        } else if (align == "center") {
          return "align-center";
        } else if (align == "right") {
          return "align-end";
        }
      },

      /**
       * Get the position value for the vertical axis
       *
       * @return {String} the position
       */
      __getPositionY__P_185_7: function __getPositionY__P_185_7() {
        var edge = this.getEdge();
        var align = this.getAlign();

        if (edge == "top") {
          return "edge-start";
        } else if (edge == "bottom") {
          return "edge-end";
        } else if (align == "top") {
          return "align-start";
        } else if (align == "middle") {
          return "align-center";
        } else if (align == "bottom") {
          return "align-end";
        }
      }
    },
    destruct: function destruct() {
      this._disposeObjects("__defaultAxis__P_185_0");
    }
  });
  qx.util.placement.Placement.$$dbClassInfo = $$dbClassInfo;
})();

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
      },
      "qx.event.Registration": {
        "construct": true
      },
      "qx.bom.Element": {
        "construct": true
      },
      "qx.ui.core.Widget": {
        "require": true
      },
      "qx.ui.popup.Popup": {},
      "qx.lang.Array": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
  
  ************************************************************************ */

  /**
   * This singleton is used to manager multiple instances of popups and their
   * state.
   */
  qx.Class.define("qx.ui.popup.Manager", {
    type: "singleton",
    extend: qx.core.Object,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qx.core.Object.constructor.call(this); // Create data structure, use an array because order matters [BUG #4323]

      this.__objects__P_171_0 = []; // Register pointerdown handler

      qx.event.Registration.addListener(document.documentElement, "pointerdown", this.__onPointerDown__P_171_1, this, true); // Hide all popups on window blur

      qx.bom.Element.addListener(window, "blur", this.hideAll, this);
    },
    properties: {
      /**
       * Function that is used to determine if a widget is contained within another one.
       **/
      containsFunction: {
        check: "Function",
        init: qx.ui.core.Widget.contains
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __objects__P_171_0: null,

      /**
       * Registers a visible popup.
       *
       * @param obj {qx.ui.popup.Popup} The popup to register
       */
      add: function add(obj) {
        {
          if (!(obj instanceof qx.ui.popup.Popup)) {
            throw new Error("Object is no popup: " + obj);
          }
        }

        this.__objects__P_171_0.push(obj);

        this.__updateIndexes__P_171_2();
      },

      /**
       * Removes a popup from the registry
       *
       * @param obj {qx.ui.popup.Popup} The popup which was excluded
       */
      remove: function remove(obj) {
        {
          if (!(obj instanceof qx.ui.popup.Popup)) {
            throw new Error("Object is no popup: " + obj);
          }
        }
        qx.lang.Array.remove(this.__objects__P_171_0, obj);

        this.__updateIndexes__P_171_2();
      },

      /**
       * Excludes all currently open popups,
       * except those with {@link qx.ui.popup.Popup#autoHide} set to false.
       */
      hideAll: function hideAll() {
        var l = this.__objects__P_171_0.length,
            current = {};

        while (l--) {
          current = this.__objects__P_171_0[l];

          if (current.getAutoHide()) {
            current.exclude();
          }
        }
      },

      /*
      ---------------------------------------------------------------------------
        INTERNAL HELPER
      ---------------------------------------------------------------------------
      */

      /**
       * Updates the zIndex of all registered items to push
       * newly added ones on top of existing ones
       *
       */
      __updateIndexes__P_171_2: function __updateIndexes__P_171_2() {
        var min = 1e7;

        for (var i = 0; i < this.__objects__P_171_0.length; i++) {
          this.__objects__P_171_0[i].setZIndex(min++);
        }
      },

      /*
      ---------------------------------------------------------------------------
        EVENT HANDLER
      ---------------------------------------------------------------------------
      */

      /**
       * Event handler for pointer down events
       *
       * @param e {qx.event.type.Pointer} Pointer event object
       */
      __onPointerDown__P_171_1: function __onPointerDown__P_171_1(e) {
        // Get the corresponding widget of the target since we are dealing with
        // DOM elements here. This is necessary because we have to be aware of
        // Inline applications which are not covering the whole document and
        // therefore are not able to get all pointer events when only the
        // application root is monitored.
        var target = qx.ui.core.Widget.getWidgetByElement(e.getTarget());
        var reg = this.__objects__P_171_0;

        for (var i = 0; i < reg.length; i++) {
          var obj = reg[i];

          if (!obj.getAutoHide() || target == obj || this.getContainsFunction()(obj, target)) {
            continue;
          }

          obj.exclude();
        }
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      qx.event.Registration.removeListener(document.documentElement, "pointerdown", this.__onPointerDown__P_171_1, this, true);

      this._disposeArray("__objects__P_171_0");
    }
  });
  qx.ui.popup.Manager.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "usage": "dynamic",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.layout.Abstract": {
        "construct": true,
        "require": true
      },
      "qx.ui.layout.Util": {},
      "qx.theme.manager.Decoration": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "qx.debug": {
          "load": true
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * A horizontal box layout.
   *
   * The horizontal box layout lays out widgets in a horizontal row, from left
   * to right.
   *
   * *Features*
   *
   * * Minimum and maximum dimensions
   * * Prioritized growing/shrinking (flex)
   * * Margins (with horizontal collapsing)
   * * Auto sizing (ignoring percent values)
   * * Percent widths (not relevant for size hint)
   * * Alignment (child property {@link qx.ui.core.LayoutItem#alignX} is ignored)
   * * Horizontal spacing (collapsed with margins)
   * * Reversed children layout (from last to first)
   * * Vertical children stretching (respecting size hints)
   *
   * *Item Properties*
   *
   * <ul>
   * <li><strong>flex</strong> <em>(Integer)</em>: The flexibility of a layout item determines how the container
   *   distributes remaining empty space among its children. If items are made
   *   flexible, they can grow or shrink accordingly. Their relative flex values
   *   determine how the items are being resized, i.e. the larger the flex ratio
   *   of two items, the larger the resizing of the first item compared to the
   *   second.
   *
   *   If there is only one flex item in a layout container, its actual flex
   *   value is not relevant. To disallow items to become flexible, set the
   *   flex value to zero.
   * </li>
   * <li><strong>flexShrink</strong> <em>(Boolean)</em>: Only valid if `flex` is
   *    set to a non-zero value, `flexShrink` tells the layout to force the child
   *    widget to shink if there is not enough space available for all of the children.
   *    This is used in scenarios such as when the child insists that it has a `minWidth`
   *    but there simply is not enough space to support that minimum width, so the
   *    overflow has to be cut off.  This setting allows the container to pick
   *    which children are able to have their `minWidth` sacrificed.  Without this
   *    setting, one oversized child can force later children out of view, regardless
   *    of `flex` settings
   * </li>
   * <li><strong>width</strong> <em>(String)</em>: Allows to define a percent
   *   width for the item. The width in percent, if specified, is used instead
   *   of the width defined by the size hint. The minimum and maximum width still
   *   takes care of the element's limits. It has no influence on the layout's
   *   size hint. Percent values are mostly useful for widgets which are sized by
   *   the outer hierarchy.
   * </li>
   * </ul>
   *
   * *Example*
   *
   * Here is a little example of how to use the HBox layout.
   *
   * <pre class="javascript">
   * var layout = new qx.ui.layout.HBox();
   * layout.setSpacing(4); // apply spacing
   *
   * var container = new qx.ui.container.Composite(layout);
   *
   * container.add(new qx.ui.core.Widget());
   * container.add(new qx.ui.core.Widget());
   * container.add(new qx.ui.core.Widget());
   * </pre>
   *
   * *External Documentation*
   *
   * See <a href='https://qooxdoo.org/documentation/#/desktop/layout/box.md'>extended documentation</a>
   * and links to demos for this layout.
   *
   */
  qx.Class.define("qx.ui.layout.HBox", {
    extend: qx.ui.layout.Abstract,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param spacing {Integer?0} The spacing between child widgets {@link #spacing}.
     * @param alignX {String?"left"} Horizontal alignment of the whole children
     *     block {@link #alignX}.
     * @param separator {String|qx.ui.decoration.IDecorator?} A separator to render between the items
     */
    construct: function construct(spacing, alignX, separator) {
      qx.ui.layout.Abstract.constructor.call(this);

      if (spacing) {
        this.setSpacing(spacing);
      }

      if (alignX) {
        this.setAlignX(alignX);
      }

      if (separator) {
        this.setSeparator(separator);
      }
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /**
       * Horizontal alignment of the whole children block. The horizontal
       * alignment of the child is completely ignored in HBoxes (
       * {@link qx.ui.core.LayoutItem#alignX}).
       */
      alignX: {
        check: ["left", "center", "right"],
        init: "left",
        apply: "_applyLayoutChange"
      },

      /**
       * Vertical alignment of each child. Can be overridden through
       * {@link qx.ui.core.LayoutItem#alignY}.
       */
      alignY: {
        check: ["top", "middle", "bottom"],
        init: "top",
        apply: "_applyLayoutChange"
      },

      /** Horizontal spacing between two children */
      spacing: {
        check: "Integer",
        init: 0,
        apply: "_applyLayoutChange"
      },

      /** Separator lines to use between the objects */
      separator: {
        check: "Decorator",
        nullable: true,
        apply: "_applyLayoutChange"
      },

      /** Whether the actual children list should be laid out in reversed order. */
      reversed: {
        check: "Boolean",
        init: false,
        apply: "_applyReversed"
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __widths__P_62_0: null,
      __flexs__P_62_1: null,
      __enableFlex__P_62_2: null,
      __children__P_62_3: null,

      /*
      ---------------------------------------------------------------------------
        HELPER METHODS
      ---------------------------------------------------------------------------
      */
      // property apply
      _applyReversed: function _applyReversed() {
        // easiest way is to invalidate the cache
        this._invalidChildrenCache = true; // call normal layout change

        this._applyLayoutChange();
      },

      /**
       * Rebuilds caches for flex and percent layout properties
       */
      __rebuildCache__P_62_4: function __rebuildCache__P_62_4() {
        var children = this._getLayoutChildren();

        var length = children.length;
        var enableFlex = false;
        var reuse = this.__widths__P_62_0 && this.__widths__P_62_0.length != length && this.__flexs__P_62_1 && this.__widths__P_62_0;
        var props; // Sparse array (keep old one if lengths has not been modified)

        var widths = reuse ? this.__widths__P_62_0 : new Array(length);
        var flexs = reuse ? this.__flexs__P_62_1 : new Array(length); // Reverse support

        if (this.getReversed()) {
          children = children.concat().reverse();
        } // Loop through children to preparse values


        for (var i = 0; i < length; i++) {
          props = children[i].getLayoutProperties();

          if (props.width != null) {
            widths[i] = parseFloat(props.width) / 100;
          }

          if (props.flex != null) {
            flexs[i] = props.flex;
            enableFlex = true;
          } else {
            // reset (in case the index of the children changed: BUG #3131)
            flexs[i] = 0;
          }
        } // Store data


        if (!reuse) {
          this.__widths__P_62_0 = widths;
          this.__flexs__P_62_1 = flexs;
        }

        this.__enableFlex__P_62_2 = enableFlex;
        this.__children__P_62_3 = children; // Clear invalidation marker

        delete this._invalidChildrenCache;
      },

      /*
      ---------------------------------------------------------------------------
        LAYOUT INTERFACE
      ---------------------------------------------------------------------------
      */
      // overridden
      verifyLayoutProperty: qx.core.Environment.select("qx.debug", {
        "true": function _true(item, name, value) {
          if (name === "width") {
            this.assertMatch(value, qx.ui.layout.Util.PERCENT_VALUE);
          } else if (name === "flex") {
            this.assertNumber(value);
            this.assert(value >= 0);
          } else if (name === "flexShrink") {
            this.assertBoolean(value);
          } else {
            this.assert(false, "The property '" + name + "' is not supported by the HBox layout!");
          }
        },
        "false": null
      }),
      // overridden
      renderLayout: function renderLayout(availWidth, availHeight, padding) {
        // Rebuild flex/width caches
        if (this._invalidChildrenCache) {
          this.__rebuildCache__P_62_4();
        } // Cache children


        var children = this.__children__P_62_3;
        var length = children.length;
        var util = qx.ui.layout.Util; // Compute gaps

        var spacing = this.getSpacing();
        var separator = this.getSeparator();
        var gaps;

        if (separator) {
          gaps = util.computeHorizontalSeparatorGaps(children, spacing, separator);
        } else {
          gaps = util.computeHorizontalGaps(children, spacing, true);
        } // First run to cache children data and compute allocated width


        var i, child, width, percent;
        var widths = [],
            hint;
        var allocatedWidth = gaps;

        for (i = 0; i < length; i += 1) {
          percent = this.__widths__P_62_0[i];
          hint = children[i].getSizeHint();
          width = percent != null ? Math.floor((availWidth - gaps) * percent) : hint.width; // Limit computed value

          if (width < hint.minWidth) {
            width = hint.minWidth;
          } else if (width > hint.maxWidth) {
            width = hint.maxWidth;
          }

          widths.push(width);
          allocatedWidth += width;
        } // Flex support (growing/shrinking)


        if (this.__enableFlex__P_62_2 && allocatedWidth != availWidth) {
          var flexibles = {};
          var flex, offset;
          var notEnoughSpace = allocatedWidth > availWidth;

          for (i = 0; i < length; i += 1) {
            flex = this.__flexs__P_62_1[i];

            if (flex > 0) {
              hint = children[i].getSizeHint();
              flexibles[i] = {
                min: hint.minWidth,
                value: widths[i],
                max: hint.maxWidth,
                flex: flex
              };

              if (notEnoughSpace) {
                var props = children[i].getLayoutProperties();

                if (props && props.flexShrink) {
                  flexibles[i].min = 0;
                }
              }
            }
          }

          var result = util.computeFlexOffsets(flexibles, availWidth, allocatedWidth);

          for (i in result) {
            offset = result[i].offset;
            widths[i] += offset;
            allocatedWidth += offset;
          }
        } // Start with left coordinate


        var left = children[0].getMarginLeft(); // Alignment support

        if (allocatedWidth < availWidth && this.getAlignX() != "left") {
          left = availWidth - allocatedWidth;

          if (this.getAlignX() === "center") {
            left = Math.round(left / 2);
          }
        } // Layouting children


        var hint, top, height, width, marginRight, marginTop, marginBottom;
        var spacing = this.getSpacing(); // Pre configure separators

        this._clearSeparators(); // Compute separator width


        if (separator) {
          var separatorInsets = qx.theme.manager.Decoration.getInstance().resolve(separator).getInsets();
          var separatorWidth = separatorInsets.left + separatorInsets.right;
        } // Render children and separators


        for (i = 0; i < length; i += 1) {
          child = children[i];
          width = widths[i];
          hint = child.getSizeHint();
          marginTop = child.getMarginTop();
          marginBottom = child.getMarginBottom(); // Find usable height

          height = Math.max(hint.minHeight, Math.min(availHeight - marginTop - marginBottom, hint.maxHeight)); // Respect vertical alignment

          top = util.computeVerticalAlignOffset(child.getAlignY() || this.getAlignY(), height, availHeight, marginTop, marginBottom); // Add collapsed margin

          if (i > 0) {
            // Whether a separator has been configured
            if (separator) {
              // add margin of last child and spacing
              left += marginRight + spacing; // then render the separator at this position

              this._renderSeparator(separator, {
                left: left + padding.left,
                top: padding.top,
                width: separatorWidth,
                height: availHeight
              }); // and finally add the size of the separator, the spacing (again) and the left margin


              left += separatorWidth + spacing + child.getMarginLeft();
            } else {
              // Support margin collapsing when no separator is defined
              left += util.collapseMargins(spacing, marginRight, child.getMarginLeft());
            }
          } // Layout child


          child.renderLayout(left + padding.left, top + padding.top, width, height); // Add width

          left += width; // Remember right margin (for collapsing)

          marginRight = child.getMarginRight();
        }
      },
      // overridden
      _computeSizeHint: function _computeSizeHint() {
        // Rebuild flex/width caches
        if (this._invalidChildrenCache) {
          this.__rebuildCache__P_62_4();
        }

        var util = qx.ui.layout.Util;
        var children = this.__children__P_62_3; // Initialize

        var minWidth = 0,
            width = 0,
            percentMinWidth = 0;
        var minHeight = 0,
            height = 0;
        var child, hint, margin; // Iterate over children

        for (var i = 0, l = children.length; i < l; i += 1) {
          child = children[i];
          hint = child.getSizeHint(); // Sum up widths

          width += hint.width; // Detect if child is shrinkable or has percent width and update minWidth

          var flex = this.__flexs__P_62_1[i];
          var percent = this.__widths__P_62_0[i];

          if (flex) {
            minWidth += hint.minWidth;
          } else if (percent) {
            percentMinWidth = Math.max(percentMinWidth, Math.round(hint.minWidth / percent));
          } else {
            minWidth += hint.width;
          } // Build vertical margin sum


          margin = child.getMarginTop() + child.getMarginBottom(); // Find biggest height

          if (hint.height + margin > height) {
            height = hint.height + margin;
          } // Find biggest minHeight


          if (hint.minHeight + margin > minHeight) {
            minHeight = hint.minHeight + margin;
          }
        }

        minWidth += percentMinWidth; // Respect gaps

        var spacing = this.getSpacing();
        var separator = this.getSeparator();
        var gaps;

        if (separator) {
          gaps = util.computeHorizontalSeparatorGaps(children, spacing, separator);
        } else {
          gaps = util.computeHorizontalGaps(children, spacing, true);
        } // Return hint


        return {
          minWidth: minWidth + gaps,
          width: width + gaps,
          minHeight: minHeight,
          height: height
        };
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this.__widths__P_62_0 = this.__flexs__P_62_1 = this.__children__P_62_3 = null;
    }
  });
  qx.ui.layout.HBox.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.Widget": {
        "construct": true,
        "require": true
      },
      "qx.ui.layout.Atom": {
        "construct": true
      },
      "qx.ui.basic.Label": {},
      "qx.ui.basic.Image": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * A multi-purpose widget, which combines a label with an icon.
   *
   * The intended purpose of qx.ui.basic.Atom is to easily align the common icon-text
   * combination in different ways.
   *
   * This is useful for all types of buttons, tooltips, ...
   *
   * *Example*
   *
   * Here is a little example of how to use the widget.
   *
   * <pre class='javascript'>
   *   var atom = new qx.ui.basic.Atom("Icon Right", "icon/32/actions/go-next.png");
   *   this.getRoot().add(atom);
   * </pre>
   *
   * This example creates an atom with the label "Icon Right" and an icon.
   *
   * *External Documentation*
   *
   * <a href='http://qooxdoo.org/docs/#desktop/widget/atom.md' target='_blank'>
   * Documentation of this widget in the qooxdoo manual.</a>
   *
   *
   * @childControl label {qx.ui.basic.Label} label part of the atom
   * @childControl icon {qx.ui.basic.Image} icon part of the atom
   */
  qx.Class.define("qx.ui.basic.Atom", {
    extend: qx.ui.core.Widget,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param label {String} Label to use
     * @param icon {String?null} Icon to use
     */
    construct: function construct(label, icon) {
      {
        this.assertArgumentsCount(arguments, 0, 2);
      }
      qx.ui.core.Widget.constructor.call(this);

      this._setLayout(new qx.ui.layout.Atom());

      if (label != null) {
        this.setLabel(label);
      }

      if (icon !== undefined) {
        this.setIcon(icon);
      }
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      // overridden
      appearance: {
        refine: true,
        init: "atom"
      },

      /** The label/caption/text of the qx.ui.basic.Atom instance */
      label: {
        apply: "_applyLabel",
        nullable: true,
        check: "String",
        event: "changeLabel"
      },

      /**
       * Switches between rich HTML and text content. The text mode (<code>false</code>) supports
       * advanced features like ellipsis when the available space is not
       * enough. HTML mode (<code>true</code>) supports multi-line content and all the
       * markup features of HTML content.
       */
      rich: {
        check: "Boolean",
        init: false,
        apply: "_applyRich"
      },

      /** Any URI String supported by qx.ui.basic.Image to display an icon */
      icon: {
        check: "String",
        apply: "_applyIcon",
        nullable: true,
        themeable: true,
        event: "changeIcon"
      },

      /**
       * The space between the icon and the label
       */
      gap: {
        check: "Integer",
        nullable: false,
        event: "changeGap",
        apply: "_applyGap",
        themeable: true,
        init: 4
      },

      /**
       * Configure the visibility of the sub elements/widgets.
       * Possible values: both, label, icon
       */
      show: {
        init: "both",
        check: ["both", "label", "icon"],
        themeable: true,
        inheritable: true,
        apply: "_applyShow",
        event: "changeShow"
      },

      /**
       * The position of the icon in relation to the text.
       * Only useful/needed if text and icon is configured and 'show' is configured as 'both' (default)
       */
      iconPosition: {
        init: "left",
        check: ["top", "right", "bottom", "left", "top-left", "bottom-left", "top-right", "bottom-right"],
        themeable: true,
        apply: "_applyIconPosition"
      },

      /**
       * Whether the content should be rendered centrally when to much space
       * is available. Enabling this property centers in both axis. The behavior
       * when disabled of the centering depends on the {@link #iconPosition} property.
       * If the icon position is <code>left</code> or <code>right</code>, the X axis
       * is not centered, only the Y axis. If the icon position is <code>top</code>
       * or <code>bottom</code>, the Y axis is not centered. In case of e.g. an
       * icon position of <code>top-left</code> no axis is centered.
       */
      center: {
        init: false,
        check: "Boolean",
        themeable: true,
        apply: "_applyCenter"
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    /* eslint-disable @qooxdoo/qx/no-refs-in-members */
    members: {
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id, hash) {
        var control;

        switch (id) {
          case "label":
            control = new qx.ui.basic.Label(this.getLabel());
            control.setAnonymous(true);
            control.setRich(this.getRich());
            control.setSelectable(this.getSelectable());

            this._add(control);

            if (this.getLabel() == null || this.getShow() === "icon") {
              control.exclude();
            }

            break;

          case "icon":
            control = new qx.ui.basic.Image(this.getIcon());
            control.setAnonymous(true);

            this._addAt(control, 0);

            if (this.getIcon() == null || this.getShow() === "label") {
              control.exclude();
            }

            break;
        }

        return control || qx.ui.basic.Atom.superclass.prototype._createChildControlImpl.call(this, id);
      },
      // overridden

      /**
       * @lint ignoreReferenceField(_forwardStates)
       */
      _forwardStates: {
        focused: true,
        hovered: true
      },

      /**
       * Updates the visibility of the label
       */
      _handleLabel: function _handleLabel() {
        if (this.getLabel() == null || this.getShow() === "icon") {
          this._excludeChildControl("label");
        } else {
          this._showChildControl("label");
        }
      },

      /**
       * Updates the visibility of the icon
       */
      _handleIcon: function _handleIcon() {
        if (this.getIcon() == null || this.getShow() === "label") {
          this._excludeChildControl("icon");
        } else {
          this._showChildControl("icon");
        }
      },
      // property apply
      _applyLabel: function _applyLabel(value, old) {
        var label = this.getChildControl("label", true);

        if (label) {
          label.setValue(value);
        }

        this._handleLabel();
      },
      // property apply
      _applyRich: function _applyRich(value, old) {
        var label = this.getChildControl("label", true);

        if (label) {
          label.setRich(value);
        }
      },
      // property apply
      _applyIcon: function _applyIcon(value, old) {
        var icon = this.getChildControl("icon", true);

        if (icon) {
          icon.setSource(value);
        }

        this._handleIcon();
      },
      // property apply
      _applyGap: function _applyGap(value, old) {
        this._getLayout().setGap(value);
      },
      // property apply
      _applyShow: function _applyShow(value, old) {
        this._handleLabel();

        this._handleIcon();
      },
      // property apply
      _applyIconPosition: function _applyIconPosition(value, old) {
        this._getLayout().setIconPosition(value);
      },
      // property apply
      _applyCenter: function _applyCenter(value, old) {
        this._getLayout().setCenter(value);
      },
      // overridden
      _applySelectable: function _applySelectable(value, old) {
        qx.ui.basic.Atom.superclass.prototype._applySelectable.call(this, value, old);

        var label = this.getChildControl("label", true);

        if (label) {
          this.getChildControl("label").setSelectable(value);
        }
      }
    }
  });
  qx.ui.basic.Atom.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.lang.Type": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Tristan Koch (tristankoch)
  
  ************************************************************************ */

  /**
   * Static helpers for parsing and modifying URIs.
   */
  qx.Bootstrap.define("qx.util.Uri", {
    statics: {
      /**
       * Split URL
       *
       * Code taken from:
       *   parseUri 1.2.2
       *   (c) Steven Levithan <stevenlevithan.com>
       *   MIT License
       *
       *
       * @param str {String} String to parse as URI
       * @param strict {Boolean} Whether to parse strictly by the rules
       * @return {Object} Map with parts of URI as properties
       */
      parseUri: function parseUri(str, strict) {
        var options = {
          key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
          q: {
            name: "queryKey",
            parser: /(?:^|&)([^&=]*)=?([^&]*)/g
          },
          parser: {
            strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@?]*)(?::([^:@?]*))?)?@)?((?:\[[0-9A-Fa-f:]+\])|(?:[^:\/?#\[\]]*))(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
            loose: /^(?:(?![^:@?]+:[^:@?\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@?]*)(?::([^:@?]*))?)?@)?((?:\[[0-9A-Fa-f:]+\])|(?:[^:\/?#\[\]]*))(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
          }
        };
        var o = options,
            m = options.parser[strict ? "strict" : "loose"].exec(str),
            uri = {},
            i = 14;

        while (i--) {
          uri[o.key[i]] = m[i] || "";
        }

        uri[o.q.name] = {};
        uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
          if ($1) {
            uri[o.q.name][$1] = $2;
          }
        });
        return uri;
      },

      /**
       * Append string to query part of URL. Respects existing query.
       *
       * @param url {String} URL to append string to.
       * @param params {String} Parameters to append to URL.
       * @return {String} URL with string appended in query part.
       */
      appendParamsToUrl: function appendParamsToUrl(url, params) {
        if (params === undefined) {
          return url;
        }

        {
          if (!(qx.lang.Type.isString(params) || qx.lang.Type.isObject(params))) {
            throw new Error("params must be either string or object");
          }
        }

        if (qx.lang.Type.isObject(params)) {
          params = qx.util.Uri.toParameter(params);
        }

        if (!params) {
          return url;
        }

        return url += /\?/.test(url) ? "&" + params : "?" + params;
      },

      /**
       * Serializes an object to URI parameters (also known as query string).
       *
       * Escapes characters that have a special meaning in URIs as well as
       * umlauts. Uses the global function encodeURIComponent, see
       * https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/encodeURIComponent
       *
       * Note: For URI parameters that are to be sent as
       * application/x-www-form-urlencoded (POST), spaces should be encoded
       * with "+".
       *
       * @param obj {Object}   Object to serialize.
       * @param post {Boolean} Whether spaces should be encoded with "+".
       * @return {String}      Serialized object. Safe to append to URIs or send as
       *                       URL encoded string.
       */
      toParameter: function toParameter(obj, post) {
        var key,
            parts = [];

        for (key in obj) {
          if (obj.hasOwnProperty(key)) {
            var value = obj[key];

            if (value instanceof Array) {
              for (var i = 0; i < value.length; i++) {
                this.__toParameterPair__P_54_0(key, value[i], parts, post);
              }
            } else {
              this.__toParameterPair__P_54_0(key, value, parts, post);
            }
          }
        }

        return parts.join("&");
      },

      /**
       * Encodes key/value to URI safe string and pushes to given array.
       *
       * @param key {String} Key.
       * @param value {String} Value.
       * @param parts {Array} Array to push to.
       * @param post {Boolean} Whether spaces should be encoded with "+".
       */
      __toParameterPair__P_54_0: function __toParameterPair__P_54_0(key, value, parts, post) {
        var encode = window.encodeURIComponent;

        if (post) {
          parts.push(encode(key).replace(/%20/g, "+") + "=" + encode(value).replace(/%20/g, "+"));
        } else {
          parts.push(encode(key) + "=" + encode(value));
        }
      },

      /**
       * Takes a relative URI and returns an absolute one.
       *
       * @param uri {String} relative URI
       * @return {String} absolute URI
       */
      getAbsolute: function getAbsolute(uri) {
        var div = document.createElement("div");
        div.innerHTML = '<a href="' + uri + '">0</a>';
        return div.firstChild.href;
      }
    }
  });
  qx.util.Uri.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "usage": "dynamic",
        "require": true
      },
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.bom.client.CssAnimation": {
        "require": true
      },
      "qx.bom.Stylesheet": {},
      "qx.bom.Event": {},
      "qx.bom.element.Style": {},
      "qx.log.Logger": {},
      "qx.lang.String": {},
      "qx.bom.element.AnimationHandle": {},
      "qx.bom.element.Transform": {},
      "qx.bom.Style": {},
      "qx.bom.client.OperatingSystem": {
        "defer": "load",
        "require": true
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "css.animation": {
          "load": true,
          "className": "qx.bom.client.CssAnimation"
        },
        "qx.debug": {
          "load": true
        },
        "os.name": {
          "defer": true,
          "className": "qx.bom.client.OperatingSystem"
        },
        "os.version": {
          "defer": true,
          "className": "qx.bom.client.OperatingSystem"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * This class is responsible for applying CSS3 animations to plain DOM elements.
   *
   * The implementation is mostly a cross-browser wrapper for applying the
   * animations, including transforms. If the browser does not support
   * CSS animations, but you have set a keep frame, the keep frame will be applied
   * immediately, thus making the animations optional.
   *
   * The API aligns closely to the spec wherever possible.
   *
   * http://www.w3.org/TR/css3-animations/
   *
   * {@link qx.bom.element.Animation} is the class, which takes care of the
   * feature detection for CSS animations and decides which implementation
   * (CSS or JavaScript) should be used. Most likely, this implementation should
   * be the one to use.
   */
  qx.Bootstrap.define("qx.bom.element.AnimationCss", {
    statics: {
      // initialization
      __sheet__P_199_0: null,
      __rulePrefix__P_199_1: "Anni",
      __id__P_199_2: 0,

      /** Static map of rules */
      __rules__P_199_3: {},

      /** The used keys for transforms. */
      __transitionKeys__P_199_4: {
        scale: true,
        rotate: true,
        skew: true,
        translate: true
      },

      /** Map of cross browser CSS keys. */
      __cssAnimationKeys__P_199_5: qx.core.Environment.get("css.animation"),

      /**
       * This is the main function to start the animation in reverse mode.
       * For further details, take a look at the documentation of the wrapper
       * {@link qx.bom.element.Animation}.
       * @param el {Element} The element to animate.
       * @param desc {Map} Animation description.
       * @param duration {Integer?} The duration of the animation which will
       *   override the duration given in the description.
       * @return {qx.bom.element.AnimationHandle} The handle.
       */
      animateReverse: function animateReverse(el, desc, duration) {
        return this._animate(el, desc, duration, true);
      },

      /**
       * This is the main function to start the animation. For further details,
       * take a look at the documentation of the wrapper
       * {@link qx.bom.element.Animation}.
       * @param el {Element} The element to animate.
       * @param desc {Map} Animation description.
       * @param duration {Integer?} The duration of the animation which will
       *   override the duration given in the description.
       * @return {qx.bom.element.AnimationHandle} The handle.
       */
      animate: function animate(el, desc, duration) {
        return this._animate(el, desc, duration, false);
      },

      /**
       * Internal method to start an animation either reverse or not.
       * {@link qx.bom.element.Animation}.
       * @param el {Element} The element to animate.
       * @param desc {Map} Animation description.
       * @param duration {Integer?} The duration of the animation which will
       *   override the duration given in the description.
       * @param reverse {Boolean} <code>true</code>, if the animation should be
       *   reversed.
       * @return {qx.bom.element.AnimationHandle} The handle.
       */
      _animate: function _animate(el, desc, duration, reverse) {
        this.__normalizeDesc__P_199_6(desc); // debug validation


        {
          this.__validateDesc__P_199_7(desc);
        } // reverse the keep property if the animation is reverse as well

        var keep = desc.keep;

        if (keep != null && (reverse || desc.alternate && desc.repeat % 2 == 0)) {
          keep = 100 - keep;
        }

        if (!this.__sheet__P_199_0) {
          this.__sheet__P_199_0 = qx.bom.Stylesheet.createElement();
        }

        var keyFrames = desc.keyFrames;

        if (duration == undefined) {
          duration = desc.duration;
        } // if animations are supported


        if (this.__cssAnimationKeys__P_199_5 != null) {
          var name = this.__addKeyFrames__P_199_8(keyFrames, reverse);

          var style = name + " " + duration + "ms " + desc.timing + " " + (desc.delay ? desc.delay + "ms " : "") + desc.repeat + " " + (desc.alternate ? "alternate" : "");
          qx.bom.Event.addNativeListener(el, this.__cssAnimationKeys__P_199_5["start-event"], this.__onAnimationStart__P_199_9);
          qx.bom.Event.addNativeListener(el, this.__cssAnimationKeys__P_199_5["iteration-event"], this.__onAnimationIteration__P_199_10);
          qx.bom.Event.addNativeListener(el, this.__cssAnimationKeys__P_199_5["end-event"], this.__onAnimationEnd__P_199_11);
          {
            if (qx.bom.element.Style.get(el, "display") == "none") {
              qx.log.Logger.warn(el, "Some browsers will not animate elements with display==none");
            }
          }
          el.style[qx.lang.String.camelCase(this.__cssAnimationKeys__P_199_5["name"])] = style; // use the fill mode property if available and suitable

          if (keep && keep == 100 && this.__cssAnimationKeys__P_199_5["fill-mode"]) {
            el.style[this.__cssAnimationKeys__P_199_5["fill-mode"]] = "forwards";
          }
        }

        var animation = new qx.bom.element.AnimationHandle();
        animation.desc = desc;
        animation.el = el;
        animation.keep = keep;
        el.$$animation = animation; // additional transform keys

        if (desc.origin != null) {
          qx.bom.element.Transform.setOrigin(el, desc.origin);
        } // fallback for browsers not supporting animations


        if (this.__cssAnimationKeys__P_199_5 == null) {
          window.setTimeout(function () {
            qx.bom.element.AnimationCss.__onAnimationEnd__P_199_11({
              target: el
            });
          }, 0);
        }

        return animation;
      },

      /**
       * Handler for the animation start.
       * @param e {Event} The native event from the browser.
       */
      __onAnimationStart__P_199_9: function __onAnimationStart__P_199_9(e) {
        if (e.target.$$animation) {
          e.target.$$animation.emit("start", e.target);
        }
      },

      /**
       * Handler for the animation iteration.
       * @param e {Event} The native event from the browser.
       */
      __onAnimationIteration__P_199_10: function __onAnimationIteration__P_199_10(e) {
        // It could happen that an animation end event is fired before an
        // animation iteration appears [BUG #6928]
        if (e.target != null && e.target.$$animation != null) {
          e.target.$$animation.emit("iteration", e.target);
        }
      },

      /**
       * Handler for the animation end.
       * @param e {Event} The native event from the browser.
       */
      __onAnimationEnd__P_199_11: function __onAnimationEnd__P_199_11(e) {
        var el = e.target;
        var animation = el.$$animation; // ignore events when already cleaned up

        if (!animation) {
          return;
        }

        var desc = animation.desc;

        if (qx.bom.element.AnimationCss.__cssAnimationKeys__P_199_5 != null) {
          // reset the styling
          var key = qx.lang.String.camelCase(qx.bom.element.AnimationCss.__cssAnimationKeys__P_199_5["name"]);
          el.style[key] = "";
          qx.bom.Event.removeNativeListener(el, qx.bom.element.AnimationCss.__cssAnimationKeys__P_199_5["name"], qx.bom.element.AnimationCss.__onAnimationEnd__P_199_11);
        }

        if (desc.origin != null) {
          qx.bom.element.Transform.setOrigin(el, "");
        }

        qx.bom.element.AnimationCss.__keepFrame__P_199_12(el, desc.keyFrames[animation.keep]);

        el.$$animation = null;
        animation.el = null;
        animation.ended = true;
        animation.emit("end", el);
      },

      /**
       * Helper method which takes an element and a key frame description and
       * applies the properties defined in the given frame to the element. This
       * method is used to keep the state of the animation.
       * @param el {Element} The element to apply the frame to.
       * @param endFrame {Map} The description of the end frame, which is basically
       *   a map containing CSS properties and values including transforms.
       */
      __keepFrame__P_199_12: function __keepFrame__P_199_12(el, endFrame) {
        // keep the element at this animation step
        var transforms;

        for (var style in endFrame) {
          if (style in qx.bom.element.AnimationCss.__transitionKeys__P_199_4) {
            if (!transforms) {
              transforms = {};
            }

            transforms[style] = endFrame[style];
          } else {
            el.style[qx.lang.String.camelCase(style)] = endFrame[style];
          }
        } // transform keeping


        if (transforms) {
          qx.bom.element.Transform.transform(el, transforms);
        }
      },

      /**
       * Preprocessing of the description to make sure every necessary key is
       * set to its default.
       * @param desc {Map} The description of the animation.
       */
      __normalizeDesc__P_199_6: function __normalizeDesc__P_199_6(desc) {
        if (!desc.hasOwnProperty("alternate")) {
          desc.alternate = false;
        }

        if (!desc.hasOwnProperty("keep")) {
          desc.keep = null;
        }

        if (!desc.hasOwnProperty("repeat")) {
          desc.repeat = 1;
        }

        if (!desc.hasOwnProperty("timing")) {
          desc.timing = "linear";
        }

        if (!desc.hasOwnProperty("origin")) {
          desc.origin = null;
        }
      },

      /**
       * Debugging helper to validate the description.
       * @signature function(desc)
       * @param desc {Map} The description of the animation.
       */
      __validateDesc__P_199_7: qx.core.Environment.select("qx.debug", {
        "true": function _true(desc) {
          var possibleKeys = ["origin", "duration", "keep", "keyFrames", "delay", "repeat", "timing", "alternate"]; // check for unknown keys

          for (var name in desc) {
            if (!(possibleKeys.indexOf(name) != -1)) {
              qx.Bootstrap.warn("Unknown key '" + name + "' in the animation description.");
            }
          }

          if (desc.keyFrames == null) {
            qx.Bootstrap.warn("No 'keyFrames' given > 0");
          } else {
            // check the key frames
            for (var pos in desc.keyFrames) {
              if (pos < 0 || pos > 100) {
                qx.Bootstrap.warn("Keyframe position needs to be between 0 and 100");
              }
            }
          }
        },
        "default": null
      }),

      /**
       * Helper to add the given frames to an internal CSS stylesheet. It parses
       * the description and adds the key frames to the sheet.
       * @param frames {Map} A map of key frames that describe the animation.
       * @param reverse {Boolean} <code>true</code>, if the key frames should
       *   be added in reverse order.
       * @return {String} The generated name of the keyframes rule.
       */
      __addKeyFrames__P_199_8: function __addKeyFrames__P_199_8(frames, reverse) {
        var rule = ""; // for each key frame

        for (var position in frames) {
          rule += (reverse ? -(position - 100) : position) + "% {";
          var frame = frames[position];
          var transforms; // each style

          for (var style in frame) {
            if (style in this.__transitionKeys__P_199_4) {
              if (!transforms) {
                transforms = {};
              }

              transforms[style] = frame[style];
            } else {
              var propName = qx.bom.Style.getPropertyName(style);
              var prefixed = propName !== null ? qx.bom.Style.getCssName(propName) : "";
              rule += (prefixed || style) + ":" + frame[style] + ";";
            }
          } // transform handling


          if (transforms) {
            rule += qx.bom.element.Transform.getCss(transforms);
          }

          rule += "} ";
        } // cached shorthand


        if (this.__rules__P_199_3[rule]) {
          return this.__rules__P_199_3[rule];
        }

        var name = this.__rulePrefix__P_199_1 + this.__id__P_199_2++;
        var selector = this.__cssAnimationKeys__P_199_5["keyframes"] + " " + name;
        qx.bom.Stylesheet.addRule(this.__sheet__P_199_0, selector, rule);
        this.__rules__P_199_3[rule] = name;
        return name;
      },

      /**
       * Internal helper to reset the cache.
       */
      __clearCache__P_199_13: function __clearCache__P_199_13() {
        this.__id__P_199_2 = 0;

        if (this.__sheet__P_199_0) {
          this.__sheet__P_199_0.ownerNode.remove();

          this.__sheet__P_199_0 = null;
          this.__rules__P_199_3 = {};
        }
      }
    },
    defer: function defer(statics) {
      // iOS 8 seems to stumble over the old sheet object on tab
      // changes or leaving the browser [BUG #8986]
      if (qx.core.Environment.get("os.name") === "ios" && parseInt(qx.core.Environment.get("os.version")) >= 8) {
        document.addEventListener("visibilitychange", function () {
          if (!document.hidden) {
            statics.__clearCache__P_199_13();
          }
        }, false);
      }
    }
  });
  qx.bom.element.AnimationCss.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.lang.Object": {},
      "qx.bom.element.AnimationHandle": {},
      "qx.bom.Style": {},
      "qx.bom.element.Transform": {},
      "qx.util.ColorUtil": {},
      "qx.bom.AnimationFrame": {},
      "qx.lang.String": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2012 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (wittemann)
  
  ************************************************************************ */

  /**
   * This class offers the same API as the CSS3 animation layer in
   * {@link qx.bom.element.AnimationCss} but uses JavaScript to fake the behavior.
   *
   * {@link qx.bom.element.Animation} is the class, which takes care of the
   * feature detection for CSS animations and decides which implementation
   * (CSS or JavaScript) should be used. Most likely, this implementation should
   * be the one to use.
   *
   * @ignore(qx.bom.element.Style.*)
   * @use(qx.bom.element.AnimationJs#play)
   */
  qx.Bootstrap.define("qx.bom.element.AnimationJs", {
    statics: {
      /**
       * The maximal time a frame should take.
       */
      __maxStepTime__P_200_0: 30,

      /**
       * The supported CSS units.
       */
      __units__P_200_1: ["%", "in", "cm", "mm", "em", "ex", "pt", "pc", "px"],

      /** The used keys for transforms. */
      __transitionKeys__P_200_2: {
        scale: true,
        rotate: true,
        skew: true,
        translate: true
      },

      /**
       * This is the main function to start the animation. For further details,
       * take a look at the documentation of the wrapper
       * {@link qx.bom.element.Animation}.
       * @param el {Element} The element to animate.
       * @param desc {Map} Animation description.
       * @param duration {Integer?} The duration of the animation which will
       *   override the duration given in the description.
       * @return {qx.bom.element.AnimationHandle} The handle.
       */
      animate: function animate(el, desc, duration) {
        return this._animate(el, desc, duration, false);
      },

      /**
       * This is the main function to start the animation in reversed mode.
       * For further details, take a look at the documentation of the wrapper
       * {@link qx.bom.element.Animation}.
       * @param el {Element} The element to animate.
       * @param desc {Map} Animation description.
       * @param duration {Integer?} The duration of the animation which will
       *   override the duration given in the description.
       * @return {qx.bom.element.AnimationHandle} The handle.
       */
      animateReverse: function animateReverse(el, desc, duration) {
        return this._animate(el, desc, duration, true);
      },

      /**
       * Helper to start the animation, either in reversed order or not.
       *
       * @param el {Element} The element to animate.
       * @param desc {Map} Animation description.
       * @param duration {Integer?} The duration of the animation which will
       *   override the duration given in the description.
       * @param reverse {Boolean} <code>true</code>, if the animation should be
       *   reversed.
       * @return {qx.bom.element.AnimationHandle} The handle.
       */
      _animate: function _animate(el, desc, duration, reverse) {
        // stop if an animation is already running
        if (el.$$animation) {
          return el.$$animation;
        }

        desc = qx.lang.Object.clone(desc, true);

        if (duration == undefined) {
          duration = desc.duration;
        }

        var keyFrames = desc.keyFrames;

        var keys = this.__getOrderedKeys__P_200_3(keyFrames);

        var stepTime = this.__getStepTime__P_200_4(duration, keys);

        var steps = parseInt(duration / stepTime, 10);

        this.__normalizeKeyFrames__P_200_5(keyFrames, el);

        var delta = this.__calculateDelta__P_200_6(steps, stepTime, keys, keyFrames, duration, desc.timing);

        var handle = new qx.bom.element.AnimationHandle();
        handle.jsAnimation = true;

        if (reverse) {
          delta.reverse();
          handle.reverse = true;
        }

        handle.desc = desc;
        handle.el = el;
        handle.delta = delta;
        handle.stepTime = stepTime;
        handle.steps = steps;
        el.$$animation = handle;
        handle.i = 0;
        handle.initValues = {};
        handle.repeatSteps = this.__applyRepeat__P_200_7(steps, desc.repeat);
        var delay = desc.delay || 0;
        var self = this;
        handle.delayId = window.setTimeout(function () {
          handle.delayId = null;
          self.play(handle);
        }, delay);
        return handle;
      },

      /**
       * Try to normalize the keyFrames by adding the default / set values of the
       * element.
       * @param keyFrames {Map} The map of key frames.
       * @param el {Element} The element to animate.
       */
      __normalizeKeyFrames__P_200_5: function __normalizeKeyFrames__P_200_5(keyFrames, el) {
        // collect all possible keys and its units
        var units = {};

        for (var percent in keyFrames) {
          for (var name in keyFrames[percent]) {
            // prefixed key calculation
            var prefixed = qx.bom.Style.getPropertyName(name);

            if (prefixed && prefixed != name) {
              var prefixedName = qx.bom.Style.getCssName(prefixed);
              keyFrames[percent][prefixedName] = keyFrames[percent][name];
              delete keyFrames[percent][name];
              name = prefixedName;
            } // check for the available units


            if (units[name] == undefined) {
              var item = keyFrames[percent][name];

              if (typeof item == "string") {
                units[name] = this.__getUnit__P_200_8(item);
              } else {
                units[name] = "";
              }
            }
          }
        } // add all missing keys


        for (var percent in keyFrames) {
          var frame = keyFrames[percent];

          for (var name in units) {
            if (frame[name] == undefined) {
              if (name in el.style) {
                // get the computed style if possible
                if (window.getComputedStyle) {
                  frame[name] = window.getComputedStyle(el, null)[name];
                } else {
                  frame[name] = el.style[name];
                }
              } else {
                frame[name] = el[name];
              } // if its a unit we know, set 0 as fallback


              if (frame[name] === "" && this.__units__P_200_1.indexOf(units[name]) != -1) {
                frame[name] = "0" + units[name];
              }
            }
          }
        }
      },

      /**
       * Checks for transform keys and returns a cloned frame
       * with the right transform style set.
       * @param frame {Map} A single key frame of the description.
       * @return {Map} A modified clone of the given frame.
       */
      __normalizeKeyFrameTransforms__P_200_9: function __normalizeKeyFrameTransforms__P_200_9(frame) {
        frame = qx.lang.Object.clone(frame);
        var transforms;

        for (var name in frame) {
          if (name in this.__transitionKeys__P_200_2) {
            if (!transforms) {
              transforms = {};
            }

            transforms[name] = frame[name];
            delete frame[name];
          }
        }

        if (transforms) {
          var transformStyle = qx.bom.element.Transform.getCss(transforms).split(":");

          if (transformStyle.length > 1) {
            frame[transformStyle[0]] = transformStyle[1].replace(";", "");
          }
        }

        return frame;
      },

      /**
       * Precalculation of the delta which will be applied during the animation.
       * The whole deltas will be calculated prior to the animation and stored
       * in a single array. This method takes care of that calculation.
       *
       * @param steps {Integer} The amount of steps to take to the end of the
       *   animation.
       * @param stepTime {Integer} The amount of milliseconds each step takes.
       * @param keys {Array} Ordered list of keys in the key frames map.
       * @param keyFrames {Map} The map of key frames.
       * @param duration {Integer} Time in milliseconds the animation should take.
       * @param timing {String} The given timing function.
       * @return {Array} An array containing the animation deltas.
       */
      __calculateDelta__P_200_6: function __calculateDelta__P_200_6(steps, stepTime, keys, keyFrames, duration, timing) {
        var delta = new Array(steps);
        var keyIndex = 1;
        delta[0] = this.__normalizeKeyFrameTransforms__P_200_9(keyFrames[0]);
        var last = keyFrames[0];
        var next = keyFrames[keys[keyIndex]];
        var stepsToNext = Math.floor(keys[keyIndex] / (stepTime / duration * 100));
        var calculationIndex = 1; // is used as counter for the timing calculation
        // for every step

        for (var i = 1; i < delta.length; i++) {
          // switch key frames if we crossed a percent border
          if (i * stepTime / duration * 100 > keys[keyIndex]) {
            last = next;
            keyIndex++;
            next = keyFrames[keys[keyIndex]];
            stepsToNext = Math.floor(keys[keyIndex] / (stepTime / duration * 100)) - stepsToNext;
            calculationIndex = 1;
          }

          delta[i] = {};
          var transforms; // for every property

          for (var name in next) {
            var nItem = next[name] + ""; // transform values

            if (name in this.__transitionKeys__P_200_2) {
              if (!transforms) {
                transforms = {};
              }

              if (qx.Bootstrap.isArray(last[name])) {
                if (!qx.Bootstrap.isArray(next[name])) {
                  next[name] = [next[name]];
                }

                transforms[name] = [];

                for (var j = 0; j < next[name].length; j++) {
                  var item = next[name][j] + "";
                  var x = calculationIndex / stepsToNext;
                  transforms[name][j] = this.__getNextValue__P_200_10(item, last[name], timing, x);
                }
              } else {
                var x = calculationIndex / stepsToNext;
                transforms[name] = this.__getNextValue__P_200_10(nItem, last[name], timing, x);
              } // color values

            } else if (nItem.charAt(0) == "#") {
              // get the two values from the frames as RGB arrays
              var value0 = qx.util.ColorUtil.cssStringToRgb(last[name]);
              var value1 = qx.util.ColorUtil.cssStringToRgb(nItem);
              var stepValue = []; // calculate every color channel

              for (var j = 0; j < value0.length; j++) {
                var range = value0[j] - value1[j];
                var x = calculationIndex / stepsToNext;
                var timingX = qx.bom.AnimationFrame.calculateTiming(timing, x);
                stepValue[j] = parseInt(value0[j] - range * timingX, 10);
              }

              delta[i][name] = qx.util.ColorUtil.rgbToHexString(stepValue);
            } else if (!isNaN(parseFloat(nItem))) {
              var x = calculationIndex / stepsToNext;
              delta[i][name] = this.__getNextValue__P_200_10(nItem, last[name], timing, x);
            } else {
              delta[i][name] = last[name] + "";
            }
          } // save all transformations in the delta values


          if (transforms) {
            var transformStyle = qx.bom.element.Transform.getCss(transforms).split(":");

            if (transformStyle.length > 1) {
              delta[i][transformStyle[0]] = transformStyle[1].replace(";", "");
            }
          }

          calculationIndex++;
        } // make sure the last key frame is right


        delta[delta.length - 1] = this.__normalizeKeyFrameTransforms__P_200_9(keyFrames[100]);
        return delta;
      },

      /**
       * Ties to parse out the unit of the given value.
       *
       * @param item {String} A CSS value including its unit.
       * @return {String} The unit of the given value.
       */
      __getUnit__P_200_8: function __getUnit__P_200_8(item) {
        return item.substring((parseFloat(item) + "").length, item.length);
      },

      /**
       * Returns the next value based on the given arguments.
       *
       * @param nextItem {String} The CSS value of the next frame
       * @param lastItem {String} The CSS value of the last frame
       * @param timing {String} The timing used for the calculation
       * @param x {Number} The x position of the animation on the time axis
       * @return {String} The calculated value including its unit.
       */
      __getNextValue__P_200_10: function __getNextValue__P_200_10(nextItem, lastItem, timing, x) {
        var range = parseFloat(nextItem) - parseFloat(lastItem);
        return parseFloat(lastItem) + range * qx.bom.AnimationFrame.calculateTiming(timing, x) + this.__getUnit__P_200_8(nextItem);
      },

      /**
       * Internal helper for the {@link qx.bom.element.AnimationHandle} to play
       * the animation.
       * @internal
       * @param handle {qx.bom.element.AnimationHandle} The hand which
       *   represents the animation.
       * @return {qx.bom.element.AnimationHandle} The handle for chaining.
       */
      play: function play(handle) {
        handle.emit("start", handle.el);
        var id = window.setInterval(function () {
          handle.repeatSteps--;
          var values = handle.delta[handle.i % handle.steps]; // save the init values

          if (handle.i === 0) {
            for (var name in values) {
              if (handle.initValues[name] === undefined) {
                // animate element property
                if (handle.el[name] !== undefined) {
                  handle.initValues[name] = handle.el[name];
                } // animate CSS property
                else if (qx.bom.element.Style) {
                  handle.initValues[name] = qx.bom.element.Style.get(handle.el, qx.lang.String.camelCase(name));
                } else {
                  handle.initValues[name] = handle.el.style[qx.lang.String.camelCase(name)];
                }
              }
            }
          }

          qx.bom.element.AnimationJs.__applyStyles__P_200_11(handle.el, values);

          handle.i++; // iteration condition

          if (handle.i % handle.steps == 0) {
            handle.emit("iteration", handle.el);

            if (handle.desc.alternate) {
              handle.delta.reverse();
            }
          } // end condition


          if (handle.repeatSteps < 0) {
            qx.bom.element.AnimationJs.stop(handle);
          }
        }, handle.stepTime);
        handle.animationId = id;
        return handle;
      },

      /**
       * Internal helper for the {@link qx.bom.element.AnimationHandle} to pause
       * the animation.
       * @internal
       * @param handle {qx.bom.element.AnimationHandle} The hand which
       *   represents the animation.
       * @return {qx.bom.element.AnimationHandle} The handle for chaining.
       */
      pause: function pause(handle) {
        // stop the interval
        window.clearInterval(handle.animationId);
        handle.animationId = null;
        return handle;
      },

      /**
       * Internal helper for the {@link qx.bom.element.AnimationHandle} to stop
       * the animation.
       * @internal
       * @param handle {qx.bom.element.AnimationHandle} The hand which
       *   represents the animation.
       * @return {qx.bom.element.AnimationHandle} The handle for chaining.
       */
      stop: function stop(handle) {
        var desc = handle.desc;
        var el = handle.el;
        var initValues = handle.initValues;

        if (handle.animationId) {
          window.clearInterval(handle.animationId);
        } // clear the delay if the animation has not been started


        if (handle.delayId) {
          window.clearTimeout(handle.delayId);
        } // check if animation is already stopped


        if (el == undefined) {
          return handle;
        } // if we should keep a frame


        var keep = desc.keep;

        if (keep != undefined && !handle.stopped) {
          if (handle.reverse || desc.alternate && desc.repeat && desc.repeat % 2 == 0) {
            keep = 100 - keep;
          }

          this.__applyStyles__P_200_11(el, this.__normalizeKeyFrameTransforms__P_200_9(desc.keyFrames[keep]));
        } else {
          this.__applyStyles__P_200_11(el, initValues);
        }

        el.$$animation = null;
        handle.el = null;
        handle.ended = true;
        handle.animationId = null;
        handle.emit("end", el);
        return handle;
      },

      /**
       * Takes care of the repeat key of the description.
       * @param steps {Integer} The number of steps one iteration would take.
       * @param repeat {Integer|String} It can be either a number how often the
       * animation should be repeated or the string 'infinite'.
       * @return {Integer} The number of steps to animate.
       */
      __applyRepeat__P_200_7: function __applyRepeat__P_200_7(steps, repeat) {
        if (repeat == undefined) {
          return steps;
        }

        if (repeat == "infinite") {
          return Number.MAX_VALUE;
        }

        return steps * repeat;
      },

      /**
       * Central method to apply css styles and element properties.
       * @param el {Element} The DOM element to apply the styles.
       * @param styles {Map} A map containing styles and values.
       */
      __applyStyles__P_200_11: function __applyStyles__P_200_11(el, styles) {
        for (var key in styles) {
          // ignore undefined values (might be a bad detection)
          if (styles[key] === undefined) {
            continue;
          } // apply element property value - only if a CSS property
          // is *not* available


          if (typeof el.style[key] === "undefined" && key in el) {
            el[key] = styles[key];
            continue;
          }

          var name = qx.bom.Style.getPropertyName(key) || key;

          if (qx.bom.element.Style) {
            qx.bom.element.Style.set(el, name, styles[key]);
          } else {
            el.style[name] = styles[key];
          }
        }
      },

      /**
       * Dynamic calculation of the steps time considering a max step time.
       * @param duration {Number} The duration of the animation.
       * @param keys {Array} An array containing the ordered set of key frame keys.
       * @return {Integer} The best suited step time.
       */
      __getStepTime__P_200_4: function __getStepTime__P_200_4(duration, keys) {
        // get min difference
        var minDiff = 100;

        for (var i = 0; i < keys.length - 1; i++) {
          minDiff = Math.min(minDiff, keys[i + 1] - keys[i]);
        }

        var stepTime = duration * minDiff / 100;

        while (stepTime > this.__maxStepTime__P_200_0) {
          stepTime = stepTime / 2;
        }

        return Math.round(stepTime);
      },

      /**
       * Helper which returns the ordered keys of the key frame map.
       * @param keyFrames {Map} The map of key frames.
       * @return {Array} An ordered list of keys.
       */
      __getOrderedKeys__P_200_3: function __getOrderedKeys__P_200_3(keyFrames) {
        var keys = Object.keys(keyFrames);

        for (var i = 0; i < keys.length; i++) {
          keys[i] = parseInt(keys[i], 10);
        }

        keys.sort(function (a, b) {
          return a - b;
        });
        return keys;
      }
    }
  });
  qx.bom.element.AnimationJs.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.html.Element": {
        "construct": true,
        "require": true
      },
      "qx.bom.element.Decoration": {},
      "qx.bom.client.Engine": {
        "require": true
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "engine.name": {
          "className": "qx.bom.client.Engine"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
  
  ************************************************************************ */

  /**
   * This is a simple image class using the low level image features of
   * qooxdoo and wraps it for the qx.html layer.
   */
  qx.Class.define("qx.html.Image", {
    extend: qx.html.Element,

    /**
     * Creates a new Image
     *
     * @see constructor for {Element}
     */
    construct: function construct(tagName, styles, attributes) {
      qx.html.Element.constructor.call(this, tagName, styles, attributes);
      this.registerProperty("source", null, this._setSourceProperty, function (writer, key, property) {
        return property.value && writer("src=" + JSON.stringify(property.value));
      });
      this.registerProperty("scale", null, this._setScaleProperty);
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __paddingTop__P_163_0: null,
      __paddingLeft__P_163_1: null,
      // this member variable is only used for IE browsers to be able
      // to the tag name which will be set. This is heavily connected to the runtime
      // change of decorators and the use of external (=unmanaged images). It is
      // necessary to be able to determine what tag will be used e.g. before the
      // ImageLoader has finished its loading of an external image.
      // See Bug #3894 for more details
      tagNameHint: null,

      /**
       * Maps padding to background-position if the widget is rendered as a
       * background image
       * @param paddingLeft {Integer} left padding value
       * @param paddingTop {Integer} top padding value
       */
      setPadding: function setPadding(paddingLeft, paddingTop) {
        this.__paddingLeft__P_163_1 = paddingLeft;
        this.__paddingTop__P_163_0 = paddingTop;

        if (this.getNodeName() == "div") {
          this.setStyle("backgroundPosition", paddingLeft + "px " + paddingTop + "px");
        }
      },

      /*
      ---------------------------------------------------------------------------
        ELEMENT API
      ---------------------------------------------------------------------------
      */

      /**
       * Implementation of setter for the "source" property
       *
       * @param value {String?} value to set
       */
      _setSourceProperty: function _setSourceProperty(value) {
        var elem = this.getDomElement(); // To prevent any wrong background-position or -repeat it is necessary
        // to reset those styles whenever a background-image is updated.
        // This is only necessary if any backgroundImage was set already.
        // See bug #3376 for details

        var styles = this.getAllStyles() || {};

        if (this.getNodeName() == "div" && this.getStyle("backgroundImage")) {
          styles.backgroundRepeat = null;
        }

        var source = this._getProperty("source");

        var scale = this._getProperty("scale");

        var repeat = scale ? "scale" : "no-repeat"; // Source can be null in certain circumstances.
        // See bug #3701 for details.

        if (source != null) {
          // Normalize "" to null
          source = source || null;
          styles.paddingTop = this.__paddingTop__P_163_0;
          styles.paddingLeft = this.__paddingLeft__P_163_1;
          qx.bom.element.Decoration.update(elem, source, repeat, styles);
        }
      },
      _setScaleProperty: function _setScaleProperty(value) {// Nothing
      },
      // overridden
      _removeProperty: function _removeProperty(key, direct) {
        if (key == "source") {
          // Work-around check for null in #_applyProperty, introduced with fix
          // for bug #3701. Use empty string that is later normalized to null.
          // This fixes bug #4524.
          this._setProperty(key, "", direct);
        } else {
          this._setProperty(key, null, direct);
        }
      },
      // overridden
      _createDomElement: function _createDomElement() {
        var scale = this._getProperty("scale");

        var repeat = scale ? "scale" : "no-repeat";

        if (qx.core.Environment.get("engine.name") == "mshtml") {
          var source = this._getProperty("source");

          if (this.tagNameHint != null) {
            this.setNodeName(this.tagNameHint);
          } else {
            this.setNodeName(qx.bom.element.Decoration.getTagName(repeat, source));
          }
        } else {
          this.setNodeName(qx.bom.element.Decoration.getTagName(repeat));
        }

        return qx.html.Image.superclass.prototype._createDomElement.call(this);
      },
      // overridden
      // be sure that style attributes are merged and not overwritten
      _copyData: function _copyData(fromMarkup, propertiesFromDom) {
        return qx.html.Image.superclass.prototype._copyData.call(this, true, propertiesFromDom);
      },

      /*
      ---------------------------------------------------------------------------
        IMAGE API
      ---------------------------------------------------------------------------
      */

      /**
       * Configures the image source
       *
       * @param value {Boolean} Whether the HTML mode should be used.
       * @return {qx.html.Label} This instance for for chaining support.
       */
      setSource: function setSource(value) {
        this._setProperty("source", value);

        return this;
      },

      /**
       * Returns the image source.
       *
       * @return {String} Current image source.
       */
      getSource: function getSource() {
        return this._getProperty("source");
      },

      /**
       * Resets the current source to null which means that no image
       * is shown anymore.
       * @return {qx.html.Image} The current instance for chaining
       */
      resetSource: function resetSource() {
        // webkit browser do not allow to remove the required "src" attribute.
        // If removing the attribute the old image is still visible.
        if (qx.core.Environment.get("engine.name") == "webkit") {
          this._setProperty("source", "qx/static/blank.gif");
        } else {
          this._removeProperty("source", true);
        }

        return this;
      },

      /**
       * Whether the image should be scaled or not.
       *
       * @param value {Boolean} Scale the image
       * @return {qx.html.Label} This instance for for chaining support.
       */
      setScale: function setScale(value) {
        this._setProperty("scale", value);

        return this;
      },

      /**
       * Returns whether the image is scaled or not.
       *
       * @return {Boolean} Whether the image is scaled
       */
      getScale: function getScale() {
        return this._getProperty("scale");
      }
    }
  });
  qx.html.Image.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.html.Element": {
        "construct": true,
        "require": true
      },
      "qx.bom.Iframe": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Jonathan Weiß (jonathan_rass)
  
  ************************************************************************ */

  /**
   * A cross browser iframe instance.
   */
  qx.Class.define("qx.html.Iframe", {
    extend: qx.html.Element,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * Wrapper for the HTML Iframe element.
     * @param url {String} Location which should be loaded inside the Iframe.
     * @param styles {Map?null} optional map of CSS styles, where the key is the name
     *    of the style and the value is the value to use.
     * @param attributes {Map?null} optional map of element attributes, where the
     *    key is the name of the attribute and the value is the value to use.
     */
    construct: function construct(url, styles, attributes) {
      qx.html.Element.constructor.call(this, "iframe", styles, attributes);
      this.registerProperty("source", null, this._setSourceProperty);
      this.setSource(url);
      this.addListener("navigate", this.__onNavigate__P_201_0, this); // add yourself to the element queue to enforce the creation of DOM element

      qx.html.Element._modified[this.toHashCode()] = this;

      qx.html.Element._scheduleFlush("element");
    },

    /*
     *****************************************************************************
        EVENTS
     *****************************************************************************
     */
    events: {
      /**
       * The "load" event is fired after the iframe content has successfully been loaded.
       */
      load: "qx.event.type.Event",

      /**
       * The "navigate" event is fired whenever the location of the iframe
       * changes.
       *
       * Useful to track user navigation and internally used to keep the source
       * property in sync. Only works when the destination source is of same
       * origin than the page embedding the iframe.
       */
      navigate: "qx.event.type.Data"
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      /*
      ---------------------------------------------------------------------------
        ELEMENT API
      ---------------------------------------------------------------------------
      */

      /**
       * Implementation of setter for the "source" property
       *
       * @param value {String?} value to set
       */
      _setSourceProperty: function _setSourceProperty(value) {
        var element = this.getDomElement();
        var currentUrl = qx.bom.Iframe.queryCurrentUrl(element); // Skip if frame is already on URL.
        //
        // When URL of Iframe and source property get out of sync, the source
        // property needs to be updated [BUG #4481]. This is to make sure the
        // same source is not set twice on the BOM level.

        if (value === currentUrl) {
          return;
        }

        qx.bom.Iframe.setSource(element, value);
      },
      // overridden
      _createDomElement: function _createDomElement() {
        return qx.bom.Iframe.create();
      },

      /*
      ---------------------------------------------------------------------------
        IFRAME API
      ---------------------------------------------------------------------------
      */

      /**
       * Get the DOM window object of an iframe.
       *
       * @return {Window} The DOM window object of the iframe.
       */
      getWindow: function getWindow() {
        var element = this.getDomElement();

        if (element) {
          return qx.bom.Iframe.getWindow(element);
        } else {
          return null;
        }
      },

      /**
       * Get the DOM document object of an iframe.
       *
       * @return {Document} The DOM document object of the iframe.
       */
      getDocument: function getDocument() {
        var element = this.getDomElement();

        if (element) {
          return qx.bom.Iframe.getDocument(element);
        } else {
          return null;
        }
      },

      /**
       * Get the HTML body element of the iframe.
       *
       * @return {Element} The DOM node of the <code>body</code> element of the iframe.
       */
      getBody: function getBody() {
        var element = this.getDomElement();

        if (element) {
          return qx.bom.Iframe.getBody(element);
        } else {
          return null;
        }
      },

      /**
       * Sets iframe's source attribute to given value
       *
       * @param source {String} URL to be set.
       * @return {qx.html.Iframe} The current instance for chaining
       */
      setSource: function setSource(source) {
        // the source needs to be applied directly in case the iFrame is hidden
        this._setProperty("source", source, true);

        return this;
      },

      /**
       * Get the current source.
       *
       * @return {String} The iframe's source
       */
      getSource: function getSource() {
        return this._getProperty("source");
      },

      /**
       * Sets iframe's name attribute to given value
       *
       * @param name {String} Name to be set.
       * @return {qx.html.Iframe} The current instance for chaining
       */
      setName: function setName(name) {
        this.setAttribute("name", name);
        return this;
      },

      /**
       * Get the current name.
       *
       * @return {String} The iframe's name.
       */
      getName: function getName() {
        return this.getAttribute("name");
      },

      /**
       * Reloads iframe
       */
      reload: function reload() {
        var element = this.getDomElement();

        if (element) {
          var url = this.getSource();
          this.setSource(null);
          this.setSource(url);
        }
      },

      /*
      ---------------------------------------------------------------------------
        LISTENER
      ---------------------------------------------------------------------------
      */

      /**
       * Handle user navigation. Sync actual URL of iframe with source property.
       *
       * @param e {qx.event.type.Data} navigate event
       */
      __onNavigate__P_201_0: function __onNavigate__P_201_0(e) {
        var actualUrl = e.getData();

        if (actualUrl) {
          this.setSource(actualUrl);
        }
      }
    }
  });
  qx.html.Iframe.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "usage": "dynamic",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.html.Element": {
        "construct": true,
        "require": true
      },
      "qx.bom.Input": {},
      "qx.bom.client.Engine": {
        "require": true
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "engine.name": {
          "className": "qx.bom.client.Engine",
          "load": true
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * A Input wrap any valid HTML input element and make it accessible
   * through the normalized qooxdoo element interface.
   */
  qx.Class.define("qx.html.Input", {
    extend: qx.html.Element,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param type {String} The type of the input field. Valid values are
     *   <code>text</code>, <code>textarea</code>, <code>select</code>,
     *   <code>checkbox</code>, <code>radio</code>, <code>password</code>,
     *   <code>hidden</code>, <code>submit</code>, <code>image</code>,
     *   <code>file</code>, <code>search</code>, <code>reset</code>,
     *   <code>select</code> and <code>textarea</code>.
     * @param styles {Map?null} optional map of CSS styles, where the key is the name
     *    of the style and the value is the value to use.
     * @param attributes {Map?null} optional map of element attributes, where the
     *    key is the name of the attribute and the value is the value to use.
     */
    construct: function construct(type, styles, attributes) {
      // Update node name correctly
      if (type === "select" || type === "textarea") {
        var nodeName = type;
      } else {
        nodeName = "input";
      }

      qx.html.Element.constructor.call(this, nodeName, styles, attributes);
      this.__type__P_117_0 = type;
      this.registerProperty("value", this._getValueProperty, this._setValueProperty);
      this.registerProperty("wrap", null, this._setWrapProperty);
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __type__P_117_0: null,
      // used for webkit only
      __selectable__P_117_1: null,
      __enabled__P_117_2: null,

      /*
      ---------------------------------------------------------------------------
        ELEMENT API
      ---------------------------------------------------------------------------
      */
      _useNodeImpl: function _useNodeImpl(domNode, newChildren) {
        qx.html.Input.superclass.prototype._useNodeImpl.call(this, domNode, newChildren);
      },
      //overridden
      _createDomElement: function _createDomElement() {
        return qx.bom.Input.create(this.__type__P_117_0);
      },

      /**
       * Implementation of setter for the "value" property
       *
       * @param value {String?} value to set
       */
      _setValueProperty: function _setValueProperty(value) {
        var element = this.getDomElement();
        qx.bom.Input.setValue(element, value);
      },

      /**
       * Implementation of getter for the "value" property
       *
       * @return {String?} value on the dom
       */
      _getValueProperty: function _getValueProperty() {
        var element = this.getDomElement();
        var value = qx.bom.Input.getValue(element);
        return value;
      },

      /**
       * Implementation of setter for the "wrap" property
       *
       * @param value {String?} value to set
       */
      _setWrapProperty: function _setWrapProperty(value) {
        var element = this.getDomElement();
        qx.bom.Input.setWrap(element, value); // qx.bom.Input#setWrap has the side-effect that the CSS property
        // overflow is set via DOM methods, causing queue and DOM to get
        // out of sync. Mirror all overflow properties to handle the case
        // when group and x/y property differ.

        this.setStyle("overflow", element.style.overflow, true);
        this.setStyle("overflowX", element.style.overflowX, true);
        this.setStyle("overflowY", element.style.overflowY, true);
      },

      /**
       * Set the input element enabled / disabled.
       * Webkit needs a special treatment because the set color of the input
       * field changes automatically. Therefore, we use
       * <code>-webkit-user-modify: read-only</code> and
       * <code>-webkit-user-select: none</code>
       * for disabling the fields in webkit. All other browsers use the disabled
       * attribute.
       *
       * @param value {Boolean} true, if the input element should be enabled.
       */
      setEnabled: function setEnabled(value) {
        this.__enabled__P_117_2 = value;
        this.setAttribute("disabled", value === false);

        if (qx.core.Environment.get("engine.name") == "webkit") {
          if (!value) {
            this.setStyles({
              userModify: "read-only",
              userSelect: "none"
            });
          } else {
            this.setStyles({
              userModify: null,
              userSelect: this.__selectable__P_117_1 ? null : "none"
            });
          }
        }
      },

      /**
       * Set whether the element is selectable. It uses the qooxdoo attribute
       * qxSelectable with the values 'on' or 'off'.
       * In webkit, a special css property will be used and checks for the
       * enabled state.
       *
       * @param value {Boolean} True, if the element should be selectable.
       */
      setSelectable: qx.core.Environment.select("engine.name", {
        webkit: function webkit(value) {
          this.__selectable__P_117_1 = value; // Only apply the value when it is enabled

          qx.html.Input.superclass.prototype.setSelectable.call(this, this.__enabled__P_117_2 && value);
        },
        "default": function _default(value) {
          qx.html.Input.superclass.prototype.setSelectable.call(this, value);
        }
      }),

      /*
      ---------------------------------------------------------------------------
        INPUT API
      ---------------------------------------------------------------------------
      */

      /**
       * Sets the value of the input element.
       *
       * @param value {var} the new value
       * @return {qx.html.Input} This instance for for chaining support.
       */
      setValue: function setValue(value) {
        var element = this.getDomElement();

        if (element) {
          // Do not overwrite when already correct (on input events)
          // This is needed to keep caret position while typing.
          if (element.value != value) {
            qx.bom.Input.setValue(element, value);
          }
        } else {
          this._setProperty("value", value);
        }

        return this;
      },

      /**
       * Get the current value.
       *
       * @return {String} The element's current value.
       */
      getValue: function getValue() {
        var element = this.getDomElement();

        if (element) {
          return qx.bom.Input.getValue(element);
        }

        return this._getProperty("value") || "";
      },

      /**
       * Sets the text wrap behavior of a text area element.
       *
       * This property uses the style property "wrap" (IE) respectively "whiteSpace"
       *
       * @param wrap {Boolean} Whether to turn text wrap on or off.
       * @param direct {Boolean?false} Whether the execution should be made
       *  directly when possible
       * @return {qx.html.Input} This instance for for chaining support.
       */
      setWrap: function setWrap(wrap, direct) {
        if (this.__type__P_117_0 === "textarea") {
          this._setProperty("wrap", wrap, direct);
        } else {
          throw new Error("Text wrapping is only support by textareas!");
        }

        return this;
      },

      /**
       * Gets the text wrap behavior of a text area element.
       *
       * This property uses the style property "wrap" (IE) respectively "whiteSpace"
       *
       * @return {Boolean} Whether wrapping is enabled or disabled.
       */
      getWrap: function getWrap() {
        if (this.__type__P_117_0 === "textarea") {
          return this._getProperty("wrap");
        } else {
          throw new Error("Text wrapping is only support by textareas!");
        }
      }
    }
  });
  qx.html.Input.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.event.type.Mouse": {
        "require": true
      },
      "qx.util.Wheel": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2009 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Fabian Jakobs (fjakobs)
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * Mouse wheel event object.
   */
  qx.Class.define("qx.event.type.MouseWheel", {
    extend: qx.event.type.Mouse,
    members: {
      // overridden
      stop: function stop() {
        this.stopPropagation();
        this.preventDefault();
      },

      /**
       * Get the amount the wheel has been scrolled
       *
       * @param axis {String?} Optional parameter which defines the scroll axis.
       *   The value can either be <code>"x"</code> or <code>"y"</code>.
       * @return {Integer} Scroll wheel movement for the given axis. If no axis
       *   is given, the y axis is used.
       */
      getWheelDelta: function getWheelDelta(axis) {
        return qx.util.Wheel.getDelta(this._native, axis);
      }
    }
  });
  qx.event.type.MouseWheel.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.event.type.Event": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2010 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Tino Butz (tbtz)
  
     ======================================================================
  
     This class contains code based on the following work:
  
     * Unify Project
  
       Homepage:
         http://unify-project.org
  
       Copyright:
         2009-2010 Deutsche Telekom AG, Germany, http://telekom.com
  
       License:
         MIT: http://www.opensource.org/licenses/mit-license.php
  
  ************************************************************************ */

  /**
   * Orientation event object.
   */
  qx.Class.define("qx.event.type.Orientation", {
    extend: qx.event.type.Event,

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __orientation__P_212_0: null,
      __mode__P_212_1: null,

      /**
       * Initialize the fields of the event. The event must be initialized before
       * it can be dispatched.
       *
       * @param orientation {String} One of <code>0</code>, <code>90</code> or <code>-90</code>
       * @param mode {String} <code>landscape</code> or <code>portrait</code>
       * @return {qx.event.type.Orientation} The initialized event instance
       */
      init: function init(orientation, mode) {
        qx.event.type.Orientation.superclass.prototype.init.call(this, false, false);
        this.__orientation__P_212_0 = orientation;
        this.__mode__P_212_1 = mode;
        return this;
      },

      /**
       * Get a copy of this object
       *
       * @param embryo {qx.event.type.Orientation?null} Optional event class, which will
       *     be configured using the data of this event instance. The event must be
       *     an instance of this event class. If the data is <code>null</code>,
       *     a new pooled instance is created.
       *
       * @return {qx.event.type.Orientation} a copy of this object
       */
      clone: function clone(embryo) {
        var clone = qx.event.type.Orientation.superclass.prototype.clone.call(this, embryo);
        clone.__orientation__P_212_0 = this.__orientation__P_212_0;
        clone.__mode__P_212_1 = this.__mode__P_212_1;
        return clone;
      },

      /**
       * Returns the current orientation of the viewport in degree.
       *
       * All possible values and their meaning:
       *
       * * <code>0</code>: "Portrait"
       * * <code>-90</code>: "Landscape (right, screen turned clockwise)"
       * * <code>90</code>: "Landscape (left, screen turned counterclockwise)"
       * * <code>180</code>: "Portrait (upside-down portrait)"
       *
       * @return {Integer} The current orientation in degree
       */
      getOrientation: function getOrientation() {
        return this.__orientation__P_212_0;
      },

      /**
       * Whether the viewport orientation is currently in landscape mode.
       *
       * @return {Boolean} <code>true</code> when the viewport orientation
       *     is currently in landscape mode.
       */
      isLandscape: function isLandscape() {
        return this.__mode__P_212_1 == "landscape";
      },

      /**
       * Whether the viewport orientation is currently in portrait mode.
       *
       * @return {Boolean} <code>true</code> when the viewport orientation
       *     is currently in portrait mode.
       */
      isPortrait: function isPortrait() {
        return this.__mode__P_212_1 == "portrait";
      }
    }
  });
  qx.event.type.Orientation.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.event.type.Dom": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2010 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (martinwittemann)
       * Tino Butz (tbtz)
  
  ************************************************************************ */

  /**
   * Touch event object.
   *
   * For more information see:
   *     https://developer.apple.com/library/safari/#documentation/UserExperience/Reference/TouchEventClassReference/TouchEvent/TouchEvent.html
   */
  qx.Class.define("qx.event.type.Touch", {
    extend: qx.event.type.Dom,

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      // overridden
      _cloneNativeEvent: function _cloneNativeEvent(nativeEvent, clone) {
        var clone = qx.event.type.Touch.superclass.prototype._cloneNativeEvent.call(this, nativeEvent, clone);

        clone.pageX = nativeEvent.pageX;
        clone.pageY = nativeEvent.pageY;
        clone.offsetX = nativeEvent.offsetX;
        clone.offsetY = nativeEvent.offsetY; // Workaround for BUG #6491

        clone.layerX = nativeEvent.offsetX || nativeEvent.layerX;
        clone.layerY = nativeEvent.offsetY || nativeEvent.layerY;
        clone.scale = nativeEvent.scale;
        clone.rotation = nativeEvent.rotation;
        clone._rotation = nativeEvent._rotation;
        clone.delta = nativeEvent.delta;
        clone.srcElement = nativeEvent.srcElement;
        clone.targetTouches = [];

        for (var i = 0; i < nativeEvent.targetTouches.length; i++) {
          clone.targetTouches[i] = nativeEvent.targetTouches[i];
        }

        clone.changedTouches = [];

        for (i = 0; i < nativeEvent.changedTouches.length; i++) {
          clone.changedTouches[i] = nativeEvent.changedTouches[i];
        }

        clone.touches = [];

        for (i = 0; i < nativeEvent.touches.length; i++) {
          clone.touches[i] = nativeEvent.touches[i];
        }

        return clone;
      },
      // overridden
      stop: function stop() {
        this.stopPropagation();
      },

      /**
       * Returns an array of native Touch objects representing all current
       * touches on the document.
       * Returns an empty array for the "touchend" event.
       *
       * @return {Object[]} Array of touch objects. For more information see:
       *     https://developer.apple.com/library/safari/#documentation/UserExperience/Reference/TouchClassReference/Touch/Touch.html
       */
      getAllTouches: function getAllTouches() {
        return this._native.touches;
      },

      /**
       * Returns an array of native Touch objects representing all touches
       * associated with the event target element.
       * Returns an empty array for the "touchend" event.
       *
       * @return {Object[]} Array of touch objects. For more information see:
       *     https://developer.apple.com/library/safari/#documentation/UserExperience/Reference/TouchClassReference/Touch/Touch.html
       */
      getTargetTouches: function getTargetTouches() {
        return this._native.targetTouches;
      },

      /**
       * Returns an array of native Touch objects representing all touches of
       * the target element that changed in this event.
       *
       * On the "touchstart" event the array contains all touches that were
       * added to the target element.
       * On the "touchmove" event the array contains all touches that were
       * moved on the target element.
       * On the "touchend" event the array contains all touches that used
       * to be on the target element.
       *
       * @return {Object[]} Array of touch objects. For more information see:
       *     https://developer.apple.com/library/safari/#documentation/UserExperience/Reference/TouchClassReference/Touch/Touch.html
       */
      getChangedTargetTouches: function getChangedTargetTouches() {
        return this._native.changedTouches;
      },

      /**
       * Checks whether more than one touch is associated with the event target
       * element.
       *
       * @return {Boolean} Is multi-touch
       */
      isMultiTouch: function isMultiTouch() {
        return this.__getEventSpecificTouches__P_204_0().length > 1;
      },

      /**
       * Returns the distance between two fingers since the start of the event.
       * The distance is a multiplier of the initial distance.
       * Initial value: 1.0.
       * Gestures:
       * < 1.0, pinch close / zoom out.
       * > 1.0, pinch open / to zoom in.
       *
       * @return {Float} The scale distance between two fingers
       */
      getScale: function getScale() {
        return this._native.scale;
      },

      /**
       * Returns the delta of the rotation since the start of the event, in degrees.
       * Initial value is 0.0
       * Clockwise > 0
       * Counter-clockwise < 0.
       *
       * @return {Float} The rotation delta
       */
      getRotation: function getRotation() {
        if (typeof this._native._rotation === "undefined") {
          return this._native.rotation;
        } else {
          return this._native._rotation;
        }
      },

      /**
       * Returns an array with the calculated delta coordinates of all active touches,
       * relative to the position on <code>touchstart</code> event.
       *
       * @return {Array} an array with objects for each active touch which contains the delta as <code>x</code> and
       * <code>y</code>, the touch identifier as <code>identifier</code> and the movement axis as <code>axis</code>.
       */
      getDelta: function getDelta() {
        return this._native.delta;
      },

      /**
       * Get the horizontal position at which the event occurred relative to the
       * left of the document. This property takes into account any scrolling of
       * the page.
       *
       * @param touchIndex {Integer ? 0} The index of the Touch object
       * @return {Integer} The horizontal position of the touch in the document.
       */
      getDocumentLeft: function getDocumentLeft(touchIndex) {
        return this.__getEventSpecificTouch__P_204_1(touchIndex).pageX;
      },

      /**
       * Get the vertical position at which the event occurred relative to the
       * top of the document. This property takes into account any scrolling of
       * the page.
       *
       * @param touchIndex {Integer ? 0} The index of the Touch object
       * @return {Integer} The vertical position of the touch in the document.
       */
      getDocumentTop: function getDocumentTop(touchIndex) {
        return this.__getEventSpecificTouch__P_204_1(touchIndex).pageY;
      },

      /**
       * Get the horizontal coordinate at which the event occurred relative to
       * the origin of the screen coordinate system.
       *
       * @param touchIndex {Integer ? 0} The index of the Touch object
       * @return {Integer} The horizontal position of the touch
       */
      getScreenLeft: function getScreenLeft(touchIndex) {
        return this.__getEventSpecificTouch__P_204_1(touchIndex).screenX;
      },

      /**
       * Get the vertical coordinate at which the event occurred relative to
       * the origin of the screen coordinate system.
       *
       * @param touchIndex {Integer ? 0} The index of the Touch object
       * @return {Integer} The vertical position of the touch
       */
      getScreenTop: function getScreenTop(touchIndex) {
        return this.__getEventSpecificTouch__P_204_1(touchIndex).screenY;
      },

      /**
       * Get the the horizontal coordinate at which the event occurred relative
       * to the viewport.
       *
       * @param touchIndex {Integer ? 0} The index of the Touch object
       * @return {Integer} The horizontal position of the touch
       */
      getViewportLeft: function getViewportLeft(touchIndex) {
        return this.__getEventSpecificTouch__P_204_1(touchIndex).clientX;
      },

      /**
       * Get the vertical coordinate at which the event occurred relative
       * to the viewport.
       *
       * @param touchIndex {Integer ? 0} The index of the Touch object
       * @return {Integer} The vertical position of the touch
       */
      getViewportTop: function getViewportTop(touchIndex) {
        return this.__getEventSpecificTouch__P_204_1(touchIndex).clientY;
      },

      /**
       * Returns the unique identifier for a certain touch object.
       *
       * @param touchIndex {Integer ? 0} The index of the Touch object
       * @return {Integer} Unique identifier of the touch object
       */
      getIdentifier: function getIdentifier(touchIndex) {
        return this.__getEventSpecificTouch__P_204_1(touchIndex).identifier;
      },

      /**
       * Returns an event specific touch on the target element. This function is
       * used as the "touchend" event only offers Touch objects in the
       * changedTouches array.
       *
       * @param touchIndex {Integer ? 0} The index of the Touch object to
       *     retrieve
       * @return {Object} A native Touch object
       */
      __getEventSpecificTouch__P_204_1: function __getEventSpecificTouch__P_204_1(touchIndex) {
        touchIndex = touchIndex == null ? 0 : touchIndex;
        return this.__getEventSpecificTouches__P_204_0()[touchIndex];
      },

      /**
       * Returns the event specific touches on the target element. This function
       * is used as the "touchend" event only offers Touch objects in the
       * changedTouches array.
       *
       * @return {Object[]} Array of native Touch objects
       */
      __getEventSpecificTouches__P_204_0: function __getEventSpecificTouches__P_204_0() {
        var touches = this._isTouchEnd() ? this.getChangedTargetTouches() : this.getTargetTouches();
        return touches;
      },

      /**
       * Indicates if the event occurs during the "touchend" phase. Needed to
       * determine the event specific touches. Override this method if you derive
       * from this class and want to indicate that the specific event occurred
       * during the "touchend" phase.
       *
       * @return {Boolean} Whether the event occurred during the "touchend" phase
       */
      _isTouchEnd: function _isTouchEnd() {
        return this.getType() == "touchend" || this.getType() == "touchcancel";
      }
    }
  });
  qx.event.type.Touch.$$dbClassInfo = $$dbClassInfo;
})();

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.bom.client.Engine": {},
      "qx.bom.client.Browser": {},
      "qx.core.Environment": {
        "defer": "runtime"
      }
    },
    "environment": {
      "provided": ["plugin.gears", "plugin.quicktime", "plugin.quicktime.version", "plugin.windowsmedia", "plugin.windowsmedia.version", "plugin.divx", "plugin.divx.version", "plugin.silverlight", "plugin.silverlight.version", "plugin.pdf", "plugin.pdf.version", "plugin.activex", "plugin.skype"],
      "required": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * Contains detection for QuickTime, Windows Media, DivX, Silverlight and gears.
   * If no version could be detected the version is set to an empty string as
   * default.
   *
   * This class is used by {@link qx.core.Environment} and should not be used
   * directly. Please check its class comment for details how to use it.
   *
   * @internal
   */
  qx.Bootstrap.define("qx.bom.client.Plugin", {
    statics: {
      /**
       * Checks for the availability of google gears plugin.
       *
       * @internal
       * @return {Boolean} <code>true</code> if gears is available
       */
      getGears: function getGears() {
        return !!(window.google && window.google.gears);
      },

      /**
       * Checks for ActiveX availability.
       *
       * @internal
       * @return {Boolean} <code>true</code> if ActiveX is available
       *
       * @ignore(window.ActiveXObject)
       */
      getActiveX: function getActiveX() {
        if (typeof window.ActiveXObject === "function") {
          return true;
        }

        try {
          // in IE11 Preview, ActiveXObject is undefined but instances can
          // still be created
          return window.ActiveXObject !== undefined && (_typeof(new window.ActiveXObject("Microsoft.XMLHTTP")) === "object" || _typeof(new window.ActiveXObject("MSXML2.DOMDocument.6.0")) === "object");
        } catch (ex) {
          return false;
        }
      },

      /**
       * Checks for Skypes 'Click to call' availability.
       *
       * @internal
       * @return {Boolean} <code>true</code> if the plugin is available.
       */
      getSkype: function getSkype() {
        // IE Support
        if (qx.bom.client.Plugin.getActiveX()) {
          try {
            new window.ActiveXObject("Skype.Detection");
            return true;
          } catch (e) {}
        }

        var mimeTypes = navigator.mimeTypes;

        if (mimeTypes) {
          // FF support
          if ("application/x-skype" in mimeTypes) {
            return true;
          } // webkit support


          for (var i = 0; i < mimeTypes.length; i++) {
            var desc = mimeTypes[i];

            if (desc.type.indexOf("skype.click2call") != -1) {
              return true;
            }
          }
        }

        return false;
      },

      /**
       * Database of supported features.
       * Filled with additional data at initialization
       */
      __db__P_186_0: {
        quicktime: {
          plugin: ["QuickTime"],
          control: "QuickTimeCheckObject.QuickTimeCheck.1" // call returns boolean: instance.IsQuickTimeAvailable(0)

        },
        wmv: {
          plugin: ["Windows Media"],
          control: "WMPlayer.OCX.7" // version string in: instance.versionInfo

        },
        divx: {
          plugin: ["DivX Web Player"],
          control: "npdivx.DivXBrowserPlugin.1"
        },
        silverlight: {
          plugin: ["Silverlight"],
          control: "AgControl.AgControl" // version string in: instance.version (Silverlight 1.0)
          // version string in: instance.settings.version (Silverlight 1.1)
          // version check possible using instance.IsVersionSupported

        },
        pdf: {
          plugin: ["Chrome PDF Viewer", "Adobe Acrobat"],
          control: "AcroPDF.PDF" // this is detecting Acrobat PDF version > 7 and Chrome PDF Viewer

        }
      },

      /**
       * Fetches the version of the quicktime plugin.
       * @return {String} The version of the plugin, if available,
       *   an empty string otherwise
       * @internal
       */
      getQuicktimeVersion: function getQuicktimeVersion() {
        var entry = qx.bom.client.Plugin.__db__P_186_0["quicktime"];
        return qx.bom.client.Plugin.__getVersion__P_186_1(entry.control, entry.plugin);
      },

      /**
       * Fetches the version of the windows media plugin.
       * @return {String} The version of the plugin, if available,
       *   an empty string otherwise
       * @internal
       */
      getWindowsMediaVersion: function getWindowsMediaVersion() {
        var entry = qx.bom.client.Plugin.__db__P_186_0["wmv"];
        return qx.bom.client.Plugin.__getVersion__P_186_1(entry.control, entry.plugin, true);
      },

      /**
       * Fetches the version of the divx plugin.
       * @return {String} The version of the plugin, if available,
       *   an empty string otherwise
       * @internal
       */
      getDivXVersion: function getDivXVersion() {
        var entry = qx.bom.client.Plugin.__db__P_186_0["divx"];
        return qx.bom.client.Plugin.__getVersion__P_186_1(entry.control, entry.plugin);
      },

      /**
       * Fetches the version of the silverlight plugin.
       * @return {String} The version of the plugin, if available,
       *   an empty string otherwise
       * @internal
       */
      getSilverlightVersion: function getSilverlightVersion() {
        var entry = qx.bom.client.Plugin.__db__P_186_0["silverlight"];
        return qx.bom.client.Plugin.__getVersion__P_186_1(entry.control, entry.plugin);
      },

      /**
       * Fetches the version of the pdf plugin.
       *
       * There are two built-in PDF viewer shipped with browsers:
       *
       * <ul>
       *  <li>Chrome PDF Viewer</li>
       *  <li>PDF.js (Firefox)</li>
       * </ul>
       *
       * While the Chrome PDF Viewer is implemented as plugin and therefore
       * detected by this method PDF.js is <strong>not</strong>.
       *
       * See the dedicated environment key (<em>plugin.pdfjs</em>) instead,
       * which you might check additionally.
       *
       * @return {String} The version of the plugin, if available,
       *  an empty string otherwise
       * @internal
       */
      getPdfVersion: function getPdfVersion() {
        var entry = qx.bom.client.Plugin.__db__P_186_0["pdf"];
        return qx.bom.client.Plugin.__getVersion__P_186_1(entry.control, entry.plugin);
      },

      /**
       * Checks if the quicktime plugin is available.
       * @return {Boolean} <code>true</code> if the plugin is available
       * @internal
       */
      getQuicktime: function getQuicktime() {
        var entry = qx.bom.client.Plugin.__db__P_186_0["quicktime"];
        return qx.bom.client.Plugin.__isAvailable__P_186_2(entry.control, entry.plugin);
      },

      /**
       * Checks if the windows media plugin is available.
       * @return {Boolean} <code>true</code> if the plugin is available
       * @internal
       */
      getWindowsMedia: function getWindowsMedia() {
        var entry = qx.bom.client.Plugin.__db__P_186_0["wmv"];
        return qx.bom.client.Plugin.__isAvailable__P_186_2(entry.control, entry.plugin, true);
      },

      /**
       * Checks if the divx plugin is available.
       * @return {Boolean} <code>true</code> if the plugin is available
       * @internal
       */
      getDivX: function getDivX() {
        var entry = qx.bom.client.Plugin.__db__P_186_0["divx"];
        return qx.bom.client.Plugin.__isAvailable__P_186_2(entry.control, entry.plugin);
      },

      /**
       * Checks if the silverlight plugin is available.
       * @return {Boolean} <code>true</code> if the plugin is available
       * @internal
       */
      getSilverlight: function getSilverlight() {
        var entry = qx.bom.client.Plugin.__db__P_186_0["silverlight"];
        return qx.bom.client.Plugin.__isAvailable__P_186_2(entry.control, entry.plugin);
      },

      /**
       * Checks if the pdf plugin is available.
       *
       * There are two built-in PDF viewer shipped with browsers:
       *
       * <ul>
       *  <li>Chrome PDF Viewer</li>
       *  <li>PDF.js (Firefox)</li>
       * </ul>
       *
       * While the Chrome PDF Viewer is implemented as plugin and therefore
       * detected by this method PDF.js is <strong>not</strong>.
       *
       * See the dedicated environment key (<em>plugin.pdfjs</em>) instead,
       * which you might check additionally.
       *
       * @return {Boolean} <code>true</code> if the plugin is available
       * @internal
       */
      getPdf: function getPdf() {
        var entry = qx.bom.client.Plugin.__db__P_186_0["pdf"];
        return qx.bom.client.Plugin.__isAvailable__P_186_2(entry.control, entry.plugin);
      },

      /**
       * Internal helper for getting the version of a given plugin.
       *
       * @param activeXName {String} The name which should be used to generate
       *   the test ActiveX Object.
       * @param pluginNames {Array} The names with which the plugins are listed in
       *   the navigator.plugins list.
       * @param forceActiveX {Boolean?false} Force detection using ActiveX
       *   for IE11 plugins that aren't listed in navigator.plugins
       * @return {String} The version of the plugin as string.
       */
      __getVersion__P_186_1: function __getVersion__P_186_1(activeXName, pluginNames, forceActiveX) {
        var available = qx.bom.client.Plugin.__isAvailable__P_186_2(activeXName, pluginNames, forceActiveX); // don't check if the plugin is not available


        if (!available) {
          return "";
        } // IE checks


        if (qx.bom.client.Engine.getName() == "mshtml" && (qx.bom.client.Browser.getDocumentMode() < 11 || forceActiveX)) {
          try {
            var obj = new window.ActiveXObject(activeXName);
            var version; // pdf version detection

            if (obj.GetVersions && obj.GetVersions()) {
              version = obj.GetVersions().split(",");

              if (version.length > 1) {
                version = version[0].split("=");

                if (version.length === 2) {
                  return version[1];
                }
              }
            }

            version = obj.versionInfo;

            if (version != undefined) {
              return version;
            }

            version = obj.version;

            if (version != undefined) {
              return version;
            }

            version = obj.settings.version;

            if (version != undefined) {
              return version;
            }
          } catch (ex) {
            return "";
          }

          return ""; // all other browsers
        } else {
          var plugins = navigator.plugins;
          var verreg = /([0-9]\.[0-9])/g;

          for (var i = 0; i < plugins.length; i++) {
            var plugin = plugins[i];

            for (var j = 0; j < pluginNames.length; j++) {
              if (plugin.name.indexOf(pluginNames[j]) !== -1) {
                if (verreg.test(plugin.name) || verreg.test(plugin.description)) {
                  return RegExp.$1;
                }
              }
            }
          }

          return "";
        }
      },

      /**
       * Internal helper for getting the availability of a given plugin.
       *
       * @param activeXName {String} The name which should be used to generate
       *   the test ActiveX Object.
       * @param pluginNames {Array} The names with which the plugins are listed in
       *   the navigator.plugins list.
       * @param forceActiveX {Boolean?false} Force detection using ActiveX
       *   for IE11 plugins that aren't listed in navigator.plugins
       * @return {Boolean} <code>true</code>, if the plugin available
       */
      __isAvailable__P_186_2: function __isAvailable__P_186_2(activeXName, pluginNames, forceActiveX) {
        // IE checks
        if (qx.bom.client.Engine.getName() == "mshtml" && (qx.bom.client.Browser.getDocumentMode() < 11 || forceActiveX)) {
          if (!this.getActiveX()) {
            return false;
          }

          try {
            new window.ActiveXObject(activeXName);
          } catch (ex) {
            return false;
          }

          return true; // all other
        } else {
          var plugins = navigator.plugins;

          if (!plugins) {
            return false;
          }

          var name;

          for (var i = 0; i < plugins.length; i++) {
            name = plugins[i].name;

            for (var j = 0; j < pluginNames.length; j++) {
              if (name.indexOf(pluginNames[j]) !== -1) {
                return true;
              }
            }
          }

          return false;
        }
      }
    },
    defer: function defer(statics) {
      qx.core.Environment.add("plugin.gears", statics.getGears);
      qx.core.Environment.add("plugin.quicktime", statics.getQuicktime);
      qx.core.Environment.add("plugin.quicktime.version", statics.getQuicktimeVersion);
      qx.core.Environment.add("plugin.windowsmedia", statics.getWindowsMedia);
      qx.core.Environment.add("plugin.windowsmedia.version", statics.getWindowsMediaVersion);
      qx.core.Environment.add("plugin.divx", statics.getDivX);
      qx.core.Environment.add("plugin.divx.version", statics.getDivXVersion);
      qx.core.Environment.add("plugin.silverlight", statics.getSilverlight);
      qx.core.Environment.add("plugin.silverlight.version", statics.getSilverlightVersion);
      qx.core.Environment.add("plugin.pdf", statics.getPdf);
      qx.core.Environment.add("plugin.pdf.version", statics.getPdfVersion);
      qx.core.Environment.add("plugin.activex", statics.getActiveX);
      qx.core.Environment.add("plugin.skype", statics.getSkype);
    }
  });
  qx.bom.client.Plugin.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.xml.Document": {},
      "qx.core.Environment": {
        "defer": "runtime"
      }
    },
    "environment": {
      "provided": ["xml.implementation", "xml.domparser", "xml.selectsinglenode", "xml.selectnodes", "xml.getelementsbytagnamens", "xml.domproperties", "xml.attributens", "xml.createelementns", "xml.createnode", "xml.getqualifieditem"],
      "required": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Daniel Wagner (d_wagner)
  
  ************************************************************************ */

  /**
   * Internal class which contains the checks used by {@link qx.core.Environment}.
   * All checks in here are marked as internal which means you should never use
   * them directly.
   *
   * This class should contain all XML-related checks
   *
   * @internal
   */
  qx.Bootstrap.define("qx.bom.client.Xml", {
    statics: {
      /**
       * Checks if XML is supported
       *
       * @internal
       * @return {Boolean} <code>true</code> if XML is supported
       */
      getImplementation: function getImplementation() {
        return document.implementation && document.implementation.hasFeature && document.implementation.hasFeature("XML", "1.0");
      },

      /**
       * Checks if an XML DOMParser is available
       *
       * @internal
       * @return {Boolean} <code>true</code> if DOMParser is supported
       */
      getDomParser: function getDomParser() {
        return typeof window.DOMParser !== "undefined";
      },

      /**
       * Checks if the proprietary selectSingleNode method is available on XML DOM
       * nodes.
       *
       * @internal
       * @return {Boolean} <code>true</code> if selectSingleNode is available
       */
      getSelectSingleNode: function getSelectSingleNode() {
        return typeof qx.xml.Document.create().selectSingleNode !== "undefined";
      },

      /**
       * Checks if the proprietary selectNodes method is available on XML DOM
       * nodes.
       *
       * @internal
       * @return {Boolean} <code>true</code> if selectSingleNode is available
       */
      getSelectNodes: function getSelectNodes() {
        return typeof qx.xml.Document.create().selectNodes !== "undefined";
      },

      /**
       * Checks availability of the getElementsByTagNameNS XML DOM method.
       *
       * @internal
       * @return {Boolean} <code>true</code> if getElementsByTagNameNS is available
       */
      getElementsByTagNameNS: function getElementsByTagNameNS() {
        return typeof qx.xml.Document.create().getElementsByTagNameNS !== "undefined";
      },

      /**
       * Checks if MSXML-style DOM Level 2 properties are supported.
       *
       * @internal
       * @return {Boolean} <code>true</code> if DOM Level 2 properties are supported
       */
      getDomProperties: function getDomProperties() {
        var doc = qx.xml.Document.create();
        return "getProperty" in doc && typeof doc.getProperty("SelectionLanguage") === "string";
      },

      /**
       * Checks if the getAttributeNS and setAttributeNS methods are supported on
       * XML DOM elements
       *
       * @internal
       * @return {Boolean} <code>true</code> if get/setAttributeNS is supported
       */
      getAttributeNS: function getAttributeNS() {
        var docElem = qx.xml.Document.fromString("<a></a>").documentElement;
        return typeof docElem.getAttributeNS === "function" && typeof docElem.setAttributeNS === "function";
      },

      /**
       * Checks if the createElementNS method is supported on XML DOM documents
       *
       * @internal
       * @return {Boolean} <code>true</code> if createElementNS is supported
       */
      getCreateElementNS: function getCreateElementNS() {
        return typeof qx.xml.Document.create().createElementNS === "function";
      },

      /**
       * Checks if the proprietary createNode method is supported on XML DOM
       * documents
       *
       * @internal
       * @return {Boolean} <code>true</code> if DOM Level 2 properties are supported
       */
      getCreateNode: function getCreateNode() {
        return typeof qx.xml.Document.create().createNode !== "undefined";
      },

      /**
       * Checks if the proprietary getQualifiedItem method is supported for XML
       * element attributes
       *
       * @internal
       * @return {Boolean} <code>true</code> if DOM Level 2 properties are supported
       */
      getQualifiedItem: function getQualifiedItem() {
        var docElem = qx.xml.Document.fromString("<a></a>").documentElement;
        return typeof docElem.attributes.getQualifiedItem !== "undefined";
      }
    },
    defer: function defer(statics) {
      qx.core.Environment.add("xml.implementation", statics.getImplementation);
      qx.core.Environment.add("xml.domparser", statics.getDomParser);
      qx.core.Environment.add("xml.selectsinglenode", statics.getSelectSingleNode);
      qx.core.Environment.add("xml.selectnodes", statics.getSelectNodes);
      qx.core.Environment.add("xml.getelementsbytagnamens", statics.getElementsByTagNameNS);
      qx.core.Environment.add("xml.domproperties", statics.getDomProperties);
      qx.core.Environment.add("xml.attributens", statics.getAttributeNS);
      qx.core.Environment.add("xml.createelementns", statics.getCreateElementNS);
      qx.core.Environment.add("xml.createnode", statics.getCreateNode);
      qx.core.Environment.add("xml.getqualifieditem", statics.getQualifiedItem);
    }
  });
  qx.bom.client.Xml.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.bom.client.Plugin": {
        "defer": "load",
        "require": true
      },
      "qx.bom.client.Xml": {
        "require": true
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "plugin.activex": {
          "className": "qx.bom.client.Plugin",
          "defer": true
        },
        "xml.implementation": {
          "className": "qx.bom.client.Xml"
        },
        "xml.domparser": {
          "className": "qx.bom.client.Xml"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * Cross browser XML document creation API
   *
   * The main purpose of this class is to allow you to create XML document objects in a
   * cross-browser fashion. Use <code>create</code> to create an empty document,
   * <code>fromString</code> to create one from an existing XML text. Both methods
   * return a *native DOM object*. That means you use standard DOM methods on such
   * an object (e.g. <code>createElement</code>).
   *
   * The following links provide further information on XML documents:
   *
   * * <a href="http://www.w3.org/TR/DOM-Level-2-Core/core.html#i-Document">W3C Interface Specification</a>
   * * <a href="http://msdn2.microsoft.com/en-us/library/ms535918.aspx">MS xml Object</a>
   * * <a href="http://msdn2.microsoft.com/en-us/library/ms764622.aspx">MSXML GUIDs and ProgIDs</a>
   * * <a href="https://developer.mozilla.org/en-US/docs/Parsing_and_serializing_XML">MDN Parsing and Serializing XML</a>
   */

  /* global ActiveXObject */

  /* global window */
  qx.Bootstrap.define("qx.xml.Document", {
    statics: {
      /** @type {String} ActiveX class name of DOMDocument (IE specific) */
      DOMDOC: null,

      /** @type {String} ActiveX class name of XMLHttpRequest (IE specific) */
      XMLHTTP: null,

      /**
       * Whether the given element is a XML document or element
       * which is part of a XML document.
       *
       * @param elem {Document|Element} Any DOM Document or Element
       * @return {Boolean} Whether the document is a XML document
       */
      isXmlDocument: function isXmlDocument(elem) {
        if (elem.nodeType === 9) {
          return elem.documentElement.nodeName !== "HTML";
        } else if (elem.ownerDocument) {
          return this.isXmlDocument(elem.ownerDocument);
        } else {
          return false;
        }
      },

      /**
       * Create an XML document.
       *
       * Returns a native DOM document object, set up for XML.
       *
       * @param namespaceUri {String ? null} The namespace URI of the document element to create or null.
       * @param qualifiedName {String ? null} The qualified name of the document element to be created or null.
       * @return {Document} empty XML object
       *
       * @ignore(ActiveXObject)
       */
      create: function create(namespaceUri, qualifiedName) {
        // ActiveX - This is the preferred way for IE9 as well since it has no XPath
        // support when using the native implementation.createDocument
        if (qx.core.Environment.get("plugin.activex")) {
          var obj = new ActiveXObject(this.DOMDOC); //The SelectionLanguage property is no longer needed in MSXML 6; trying
          // to set it causes an exception in IE9.

          if (this.DOMDOC == "MSXML2.DOMDocument.3.0") {
            obj.setProperty("SelectionLanguage", "XPath");
          }

          if (qualifiedName) {
            var str = '<?xml version="1.0" encoding="utf-8"?>\n<';
            str += qualifiedName;

            if (namespaceUri) {
              str += " xmlns='" + namespaceUri + "'";
            }

            str += " />";
            obj.loadXML(str);
          }

          return obj;
        }

        if (qx.core.Environment.get("xml.implementation")) {
          return document.implementation.createDocument(namespaceUri || "", qualifiedName || "", null);
        }

        throw new Error("No XML implementation available!");
      },

      /**
       * The string passed in is parsed into a DOM document.
       *
       * @param str {String} the string to be parsed
       * @return {Document} XML document with given content
       * @signature function(str)
       *
       * @ignore(DOMParser)
       */
      fromString: function fromString(str) {
        // Legacy IE/ActiveX
        if (qx.core.Environment.get("plugin.activex")) {
          var dom = qx.xml.Document.create();
          dom.loadXML(str);
          return dom;
        }

        if (qx.core.Environment.get("xml.domparser")) {
          var parser = new DOMParser();
          return parser.parseFromString(str, "text/xml");
        }

        throw new Error("No XML implementation available!");
      }
    },

    /*
    *****************************************************************************
       DEFER
    *****************************************************************************
    */
    defer: function defer(statics) {
      // Detecting available ActiveX implementations.
      if (qx.core.Environment.get("plugin.activex")) {
        // According to information on the Microsoft XML Team's WebLog
        // it is recommended to check for availability of MSXML versions 6.0 and 3.0.
        // http://blogs.msdn.com/xmlteam/archive/2006/10/23/using-the-right-version-of-msxml-in-internet-explorer.aspx
        var domDoc = ["MSXML2.DOMDocument.6.0", "MSXML2.DOMDocument.3.0"];
        var httpReq = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0"];

        for (var i = 0, l = domDoc.length; i < l; i++) {
          try {
            // Keep both objects in sync with the same version.
            // This is important as there were compatibility issues detected.
            new ActiveXObject(domDoc[i]);
            new ActiveXObject(httpReq[i]);
          } catch (ex) {
            continue;
          } // Update static constants


          statics.DOMDOC = domDoc[i];
          statics.XMLHTTP = httpReq[i]; // Stop loop here

          break;
        }
      }
    }
  });
  qx.xml.Document.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "usage": "dynamic",
        "require": true
      },
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.bom.client.Html": {
        "require": true
      },
      "qx.dom.Node": {},
      "qx.bom.Selection": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "html.selection": {
          "load": true,
          "className": "qx.bom.client.Html"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Alexander Steitz (aback)
  
  ************************************************************************ */

  /**
   * Low-level Range API which is used together with the low-level Selection API.
   * This is especially useful whenever a developer want to work on text level,
   * e.g. for an editor.
   */
  qx.Bootstrap.define("qx.bom.Range", {
    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */
    statics: {
      /**
       * Returns the range object of the given node.
       *
       * @signature function(node)
       * @param node {Node} node to get the range of
       * @return {Range} valid range of given selection
       */
      get: qx.core.Environment.select("html.selection", {
        selection: function selection(node) {
          // check for the type of the given node
          // for legacy IE the nodes input, textarea, button and body
          // have access to own TextRange objects. Everything else is
          // gathered via the selection object.
          if (qx.dom.Node.isElement(node)) {
            switch (node.nodeName.toLowerCase()) {
              case "input":
                switch (node.type) {
                  case "text":
                  case "password":
                  case "hidden":
                  case "button":
                  case "reset":
                  case "file":
                  case "submit":
                    return node.createTextRange();

                  default:
                    return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(node)).createRange();
                }

              case "textarea":
              case "body":
              case "button":
                return node.createTextRange();

              default:
                return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(node)).createRange();
            }
          } else {
            if (node == null) {
              node = window;
            } // need to pass the document node to work with multi-documents


            return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(node)).createRange();
          }
        },
        // suitable for gecko, opera and webkit
        "default": function _default(node) {
          var doc = qx.dom.Node.getDocument(node); // get the selection object of the corresponding document

          var sel = qx.bom.Selection.getSelectionObject(doc);

          if (sel.rangeCount > 0) {
            return sel.getRangeAt(0);
          } else {
            return doc.createRange();
          }
        }
      })
    }
  });
  qx.bom.Range.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Adrian Olaru (adrianolaru)
  
     ======================================================================
  
     This class contains code based on the following work:
  
     * Cross-Browser Split
       http://blog.stevenlevithan.com/archives/cross-browser-split
       Version 1.0.1
  
       Copyright:
         (c) 2006-2007, Steven Levithan <http://stevenlevithan.com>
  
       License:
         MIT: http://www.opensource.org/licenses/mit-license.php
  
       Authors:
         * Steven Levithan
  
  ************************************************************************ */

  /**
   * Implements an ECMA-compliant, uniform cross-browser split method
   */
  qx.Bootstrap.define("qx.util.StringSplit", {
    statics: {
      /**
       * ECMA-compliant, uniform cross-browser split method
       *
       * @param str {String} Incoming string to split
       * @param separator {RegExp} Specifies the character to use for separating the string.
       *   The separator is treated as a string or a  regular expression. If separator is
       *   omitted, the array returned contains one element consisting of the entire string.
       * @param limit {Integer?} Integer specifying a limit on the number of splits to be found.
       * @return {String[]} split string
       */
      split: function split(str, separator, limit) {
        // if `separator` is not a regex, use the native `split`
        if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
          return String.prototype.split.call(str, separator, limit);
        }

        var output = [],
            lastLastIndex = 0,
            flags = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.sticky ? "y" : ""),
            separator = RegExp(separator.source, flags + "g"),
            // make `global` and avoid `lastIndex` issues by working with a copy
        separator2,
            match,
            lastIndex,
            lastLength,
            compliantExecNpcg = /()??/.exec("")[1] === undefined; // NPCG: nonparticipating capturing group

        str = str + ""; // type conversion

        if (!compliantExecNpcg) {
          separator2 = RegExp("^" + separator.source + "$(?!\\s)", flags); // doesn't need /g or /y, but they don't hurt
        }
        /* behavior for `limit`: if it's...
        - `undefined`: no limit.
        - `NaN` or zero: return an empty array.
        - a positive number: use `Math.floor(limit)`.
        - a negative number: no limit.
        - other: type-convert, then use the above rules. */


        if (limit === undefined || +limit < 0) {
          limit = Infinity;
        } else {
          limit = Math.floor(+limit);

          if (!limit) {
            return [];
          }
        }

        while (match = separator.exec(str)) {
          lastIndex = match.index + match[0].length; // `separator.lastIndex` is not reliable cross-browser

          if (lastIndex > lastLastIndex) {
            output.push(str.slice(lastLastIndex, match.index)); // fix browsers whose `exec` methods don't consistently return `undefined` for nonparticipating capturing groups

            if (!compliantExecNpcg && match.length > 1) {
              match[0].replace(separator2, function () {
                for (var i = 1; i < arguments.length - 2; i++) {
                  if (arguments[i] === undefined) {
                    match[i] = undefined;
                  }
                }
              });
            }

            if (match.length > 1 && match.index < str.length) {
              Array.prototype.push.apply(output, match.slice(1));
            }

            lastLength = match[0].length;
            lastLastIndex = lastIndex;

            if (output.length >= limit) {
              break;
            }
          }

          if (separator.lastIndex === match.index) {
            separator.lastIndex++; // avoid an infinite loop
          }
        }

        if (lastLastIndex === str.length) {
          if (lastLength || !separator.test("")) {
            output.push("");
          }
        } else {
          output.push(str.slice(lastLastIndex));
        }

        return output.length > limit ? output.slice(0, limit) : output;
      }
    }
  });
  qx.util.StringSplit.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.event.type.Event": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
  
  ************************************************************************ */

  /**
   * Common base class for all focus events.
   */
  qx.Class.define("qx.event.type.Focus", {
    extend: qx.event.type.Event,
    members: {
      /**
       * Initialize the fields of the event. The event must be initialized before
       * it can be dispatched.
       *
       * @param target {Object} Any possible event target
       * @param relatedTarget {Object} Any possible event target
       * @param canBubble {Boolean?false} Whether or not the event is a bubbling event.
       *     If the event is bubbling, the bubbling can be stopped using
       *     {@link qx.event.type.Event#stopPropagation}
       * @return {qx.event.type.Event} The initialized event instance
       */
      init: function init(target, relatedTarget, canBubble) {
        qx.event.type.Focus.superclass.prototype.init.call(this, canBubble, false);
        this._target = target;
        this._relatedTarget = relatedTarget;
        return this;
      }
    }
  });
  qx.event.type.Focus.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.event.type.Event": {
        "require": true
      },
      "qx.dom.Node": {},
      "qx.bom.Viewport": {},
      "qx.event.Registration": {},
      "qx.event.handler.DragDrop": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
       * Fabian Jakobs (fjakobs)
       * Christian Hagendorn (chris_schmidt)
  
  ************************************************************************ */

  /**
   * Event object class for drag events
   */
  qx.Class.define("qx.event.type.Drag", {
    extend: qx.event.type.Event,

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      /**
       * Initialize the fields of the event. The event must be initialized before
       * it can be dispatched.
       *
       * @param cancelable {Boolean?false} Whether or not an event can have its default
       *     action prevented. The default action can either be the browser's
       *     default action of a native event (e.g. open the context menu on a
       *     right click) or the default action of a qooxdoo class (e.g. close
       *     the window widget). The default action can be prevented by calling
       *     {@link qx.event.type.Event#preventDefault}
       * @param originalEvent {qx.event.type.Track} The original (mouse) event to use
       * @return {qx.event.type.Event} The initialized event instance
       */
      init: function init(cancelable, originalEvent) {
        qx.event.type.Drag.superclass.prototype.init.call(this, true, cancelable);

        if (originalEvent) {
          this._native = originalEvent.getNativeEvent() || null;
          this._originalTarget = originalEvent.getOriginalTarget() || null;
        } else {
          this._native = null;
          this._originalTarget = null;
        }

        return this;
      },
      // overridden
      clone: function clone(embryo) {
        var clone = qx.event.type.Drag.superclass.prototype.clone.call(this, embryo);
        clone._native = this._native;
        return clone;
      },

      /**
       * Get the horizontal position at which the event occurred relative to the
       * left of the document. This property takes into account any scrolling of
       * the page.
       *
       * @return {Integer} The horizontal mouse position in the document.
       */
      getDocumentLeft: function getDocumentLeft() {
        if (this._native == null) {
          return 0;
        }

        var x = this._native.pageX;

        if (x !== undefined) {
          // iOS 6 does not copy pageX over to the fake pointer event
          if (x == 0 && this._native.pointerType == "touch") {
            x = this._native._original.changedTouches[0].pageX || 0;
          }

          return Math.round(x);
        } else {
          var win = qx.dom.Node.getWindow(this._native.srcElement);
          return Math.round(this._native.clientX) + qx.bom.Viewport.getScrollLeft(win);
        }
      },

      /**
       * Get the vertical position at which the event occurred relative to the
       * top of the document. This property takes into account any scrolling of
       * the page.
       *
       * @return {Integer} The vertical mouse position in the document.
       */
      getDocumentTop: function getDocumentTop() {
        if (this._native == null) {
          return 0;
        }

        var y = this._native.pageY;

        if (y !== undefined) {
          // iOS 6 does not copy pageY over to the fake pointer event
          if (y == 0 && this._native.pointerType == "touch") {
            y = this._native._original.changedTouches[0].pageY || 0;
          }

          return Math.round(y);
        } else {
          var win = qx.dom.Node.getWindow(this._native.srcElement);
          return Math.round(this._native.clientY) + qx.bom.Viewport.getScrollTop(win);
        }
      },

      /**
       * Returns the drag&drop event handler responsible for the target
       *
       * @return {qx.event.handler.DragDrop} The drag&drop handler
       */
      getManager: function getManager() {
        return qx.event.Registration.getManager(this.getTarget()).getHandler(qx.event.handler.DragDrop);
      },

      /**
       * Used during <code>dragstart</code> listener to
       * inform the manager about supported data types.
       *
       * @param type {String} Data type to add to list of supported types
       */
      addType: function addType(type) {
        this.getManager().addType(type);
      },

      /**
       * Used during <code>dragstart</code> listener to
       * inform the manager about supported drop actions.
       *
       * @param action {String} Action to add to the list of supported actions
       */
      addAction: function addAction(action) {
        this.getManager().addAction(action);
      },

      /**
       * Whether the given type is supported by the drag
       * target (source target).
       *
       * This is used in the event listeners for <code>dragover</code>
       * or <code>dragdrop</code>.
       *
       * @param type {String} The type to look for
       * @return {Boolean} Whether the given type is supported
       */
      supportsType: function supportsType(type) {
        return this.getManager().supportsType(type);
      },

      /**
       * Whether the given action is supported by the drag
       * target (source target).
       *
       * This is used in the event listeners for <code>dragover</code>
       * or <code>dragdrop</code>.
       *
       * @param action {String} The action to look for
       * @return {Boolean} Whether the given action is supported
       */
      supportsAction: function supportsAction(action) {
        return this.getManager().supportsAction(action);
      },

      /**
       * Adds data of the given type to the internal storage. The data
       * is available until the <code>dragend</code> event is fired.
       *
       * @param type {String} Any valid type
       * @param data {var} Any data to store
       */
      addData: function addData(type, data) {
        this.getManager().addData(type, data);
      },

      /**
       * Returns the data of the given type. Used in the <code>drop</code> listener.
       *
       * Note that this is a synchronous method and if any of the drag and drop
       * events handlers are implemented using Promises, this may fail; @see
       * `getDataAsync`.
       *
       * @param type {String} Any of the supported types.
       * @return {var} The data for the given type
       */
      getData: function getData(type) {
        return this.getManager().getData(type);
      },

      /**
       * Returns the data of the given type. Used in the <code>drop</code> listener.
       *
       * @param type {String} Any of the supported types.
       * @return {qx.Promise|var} The data for the given type
       */
      getDataAsync: function getDataAsync(type) {
        return this.getManager().getDataAsync(type);
      },

      /**
       * Returns the type which was requested last, to be used
       * in the <code>droprequest</code> listener.
       *
       * @return {String} The last requested data type
       */
      getCurrentType: function getCurrentType() {
        return this.getManager().getCurrentType();
      },

      /**
       * Returns the currently selected action. Depends on the
       * supported actions of the source target and the modification
       * keys pressed by the user.
       *
       * Used in the <code>droprequest</code> listener.
       *
       * @return {String} The action. May be one of <code>move</code>,
       *    <code>copy</code> or <code>alias</code>.
       */
      getCurrentAction: function getCurrentAction() {
        if (this.getDefaultPrevented()) {
          return null;
        }

        return this.getManager().getCurrentAction();
      },

      /**
       * Returns the currently selected action. Depends on the
       * supported actions of the source target and the modification
       * keys pressed by the user.
       *
       * Used in the <code>droprequest</code> listener.
       *
       * @return {qx.Promise|String} The action. May be one of <code>move</code>,
       *    <code>copy</code> or <code>alias</code>.
       */
      getCurrentActionAsync: function getCurrentActionAsync() {
        if (this.getDefaultPrevented()) {
          return null;
        }

        return this.getManager().getCurrentActionAsync();
      },

      /**
       * Whether the current drop target allows the current drag target.
       *
       * This can be called from within the "drag" event to enable/disable
       * a drop target selectively, for example based on the child item,
       * above and beyond the one-time choice made by the the "dragover"
       * event for the droppable widget itself.
       *
       * @param isAllowed {Boolean} False if a drop should be disallowed
       */
      setDropAllowed: function setDropAllowed(isAllowed) {
        this.getManager().setDropAllowed(isAllowed);
      },

      /**
       * Returns the target which has been initially tapped on.
       * @return {qx.ui.core.Widget} The tapped widget.
       */
      getDragTarget: function getDragTarget() {
        return this.getManager().getDragTarget();
      },

      /**
       * Stops the drag&drop session and fires a <code>dragend</code> event.
       */
      stopSession: function stopSession() {
        this.getManager().clearSession();
      }
    }
  });
  qx.event.type.Drag.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.lang.Type": {},
      "qx.util.ResourceManager": {},
      "qx.lang.Function": {},
      "qx.event.GlobalError": {
        "require": true
      },
      "qx.bom.client.Engine": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "qx.globalErrorHandling": {
          "className": "qx.event.GlobalError"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
  
  ************************************************************************ */

  /**
   * The ImageLoader can preload and manage loaded image resources. It easily
   * handles multiple requests and supports callbacks for successful and failed
   * requests.
   *
   * After loading of an image the dimension of the image is stored as long
   * as the application is running. This is quite useful for in-memory layouting.
   *
   * Use {@link #load} to preload your own images.
   */
  qx.Bootstrap.define("qx.io.ImageLoader", {
    statics: {
      /** @type {Map} Internal data structure to cache image sizes */
      __data__P_162_0: {},

      /** @type {Map} Default image size */
      __defaultSize__P_162_1: {
        width: null,
        height: null
      },

      /** @type {RegExp} Known image types */
      __knownImageTypesRegExp__P_162_2: /\.(png|gif|jpg|jpeg|bmp)\b/i,

      /** @type {RegExp} Image types of a data URL */
      __dataUrlRegExp__P_162_3: /^data:image\/(png|gif|jpg|jpeg|bmp)\b/i,

      /**
       * Whether the given image has previously been loaded using the
       * {@link #load} method.
       *
       * @param source {String} Image source to query
       * @return {Boolean} <code>true</code> when the image is loaded
       */
      isLoaded: function isLoaded(source) {
        var entry = this.__data__P_162_0[source];
        return !!(entry && entry.loaded);
      },

      /**
       * Whether the given image has previously been requested using the
       * {@link #load} method but failed.
       *
       * @param source {String} Image source to query
       * @return {Boolean} <code>true</code> when the image loading failed
       */
      isFailed: function isFailed(source) {
        var entry = this.__data__P_162_0[source];
        return !!(entry && entry.failed);
      },

      /**
       * Whether the given image is currently loading.
       *
       * @param source {String} Image source to query
       * @return {Boolean} <code>true</code> when the image is loading in the moment.
       */
      isLoading: function isLoading(source) {
        var entry = this.__data__P_162_0[source];
        return !!(entry && entry.loading);
      },

      /**
       * Returns the format of a previously loaded image
       *
       * @param source {String} Image source to query
       * @return {String ? null} The format of the image or <code>null</code>
       */
      getFormat: function getFormat(source) {
        var entry = this.__data__P_162_0[source];

        if (!entry || !entry.format) {
          var result = this.__dataUrlRegExp__P_162_3.exec(source);

          if (result != null) {
            // If width and height aren't defined, provide some defaults
            var width = entry && qx.lang.Type.isNumber(entry.width) ? entry.width : this.__defaultSize__P_162_1.width;
            var height = entry && qx.lang.Type.isNumber(entry.height) ? entry.height : this.__defaultSize__P_162_1.height;
            entry = {
              loaded: true,
              format: result[1],
              width: width,
              height: height
            };
          }
        }

        return entry ? entry.format : null;
      },

      /**
       * Returns the size of a previously loaded image
       *
       * @param source {String} Image source to query
       * @return {Map} The dimension of the image (<code>width</code> and
       *    <code>height</code> as key). If the image is not yet loaded, the
       *    dimensions are given as <code>null</code> for width and height.
       */
      getSize: function getSize(source) {
        var entry = this.__data__P_162_0[source];
        return entry ? {
          width: entry.width,
          height: entry.height
        } : this.__defaultSize__P_162_1;
      },

      /**
       * Returns the image width
       *
       * @param source {String} Image source to query
       * @return {Integer} The width or <code>null</code> when the image is not loaded
       */
      getWidth: function getWidth(source) {
        var entry = this.__data__P_162_0[source];
        return entry ? entry.width : null;
      },

      /**
       * Returns the image height
       *
       * @param source {String} Image source to query
       * @return {Integer} The height or <code>null</code> when the image is not loaded
       */
      getHeight: function getHeight(source) {
        var entry = this.__data__P_162_0[source];
        return entry ? entry.height : null;
      },

      /**
       * Loads the given image. Supports a callback which is
       * executed when the image is loaded.
       *
       * This method works asynchronous.
       *
       * @param source {String} Image source to load
       * @param callback {Function?} Callback function to execute
       *   The first parameter of the callback is the given source url, the
       *   second parameter is the data entry which contains additional
       *   information about the image.
       * @param context {Object?} Context in which the given callback should be executed
       */
      load: function load(source, callback, context) {
        // Shorthand
        var entry = this.__data__P_162_0[source];

        if (!entry) {
          entry = this.__data__P_162_0[source] = {};
        } // Normalize context


        if (callback && !context) {
          context = window;
        } // Already known image source


        if (entry.loaded || entry.loading || entry.failed) {
          if (callback) {
            if (entry.loading) {
              entry.callbacks.push(callback, context);
            } else {
              callback.call(context, source, entry);
            }
          }
        } else {
          // Updating entry
          entry.loading = true;
          entry.callbacks = [];

          if (callback) {
            entry.callbacks.push(callback, context);
          }

          var ResourceManager = qx.util.ResourceManager.getInstance();

          if (ResourceManager.isFontUri(source)) {
            var el = document.createElement("div");
            var charCode = ResourceManager.fromFontUriToCharCode(source);
            el.value = String.fromCharCode(charCode);
            entry.element = el;
            return;
          } // Create image element


          var el = document.createElement("img"); // Create common callback routine

          var boundCallback = qx.lang.Function.listener(this.__onload__P_162_4, this, el, source); // Assign callback to element

          el.onload = boundCallback;
          el.onerror = boundCallback; // Start loading of image

          el.src = source; // save the element for aborting

          entry.element = el;
        }
      },

      /**
       * Abort the loading for the given url.
       *
       * @param source {String} URL of the image to abort its loading.
       */
      abort: function abort(source) {
        var entry = this.__data__P_162_0[source];

        if (entry && !entry.loaded) {
          entry.aborted = true;
          var callbacks = entry.callbacks;
          var element = entry.element; // Cleanup listeners

          element.onload = element.onerror = null; // prevent further loading

          element.src = ""; // Cleanup entry

          delete entry.callbacks;
          delete entry.element;
          delete entry.loading;

          for (var i = 0, l = callbacks.length; i < l; i += 2) {
            callbacks[i].call(callbacks[i + 1], source, entry);
          }
        }

        this.__data__P_162_0[source] = null;
      },

      /**
       * Calls a method based on qx.globalErrorHandling
       */
      __onload__P_162_4: function __onload__P_162_4() {
        var callback = qx.core.Environment.select("qx.globalErrorHandling", {
          "true": qx.event.GlobalError.observeMethod(this.__onLoadHandler__P_162_5),
          "false": this.__onLoadHandler__P_162_5
        });
        callback.apply(this, arguments);
      },

      /**
       * Internal event listener for all load/error events.
       *
       * @signature function(event, element, source)
       *
       * @param event {Event} Native event object
       * @param element {Element} DOM element which represents the image
       * @param source {String} The image source loaded
       */
      __onLoadHandler__P_162_5: function __onLoadHandler__P_162_5(event, element, source) {
        // Shorthand
        var entry = this.__data__P_162_0[source]; // [BUG #9149]: When loading a SVG IE11 won't have
        // the width/height of the element set, unless
        // it is inserted into the DOM.

        if (qx.bom.client.Engine.getName() == "mshtml" && parseFloat(qx.bom.client.Engine.getVersion()) === 11) {
          document.body.appendChild(element);
        }

        var isImageAvailable = function isImageAvailable(imgElem) {
          return imgElem && imgElem.height !== 0;
        }; // [BUG #7497]: IE11 doesn't properly emit an error event
        // when loading fails so augment success check


        if (event.type === "load" && isImageAvailable(element)) {
          // Store dimensions
          entry.loaded = true;
          entry.width = element.width;
          entry.height = element.height; // try to determine the image format

          var result = this.__knownImageTypesRegExp__P_162_2.exec(source);

          if (result != null) {
            entry.format = result[1];
          }
        } else {
          entry.failed = true;
        }

        if (qx.bom.client.Engine.getName() == "mshtml" && parseFloat(qx.bom.client.Engine.getVersion()) === 11) {
          document.body.removeChild(element);
        } // Cleanup listeners


        element.onload = element.onerror = null; // Cache callbacks

        var callbacks = entry.callbacks; // Cleanup entry

        delete entry.loading;
        delete entry.callbacks;
        delete entry.element; // Execute callbacks

        for (var i = 0, l = callbacks.length; i < l; i += 2) {
          callbacks[i].call(callbacks[i + 1], source, entry);
        }
      },

      /**
       * Dispose stored images.
       */
      dispose: function dispose() {
        this.__data__P_162_0 = {};
      }
    }
  });
  qx.io.ImageLoader.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.html.Element": {
        "construct": true,
        "require": true
      },
      "qx.bom.Label": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
  
  ************************************************************************ */

  /**
   * A cross browser label instance with support for rich HTML and text labels.
   *
   * Text labels supports ellipsis to reduce the text width.
   *
   * The mode can be changed through the method {@link #setRich}
   * which accepts a boolean value. The default mode is "text" which is
   * a good choice because it has a better performance.
   */
  qx.Class.define("qx.html.Label", {
    extend: qx.html.Element,

    /**
     * Creates a new Image
     *
     * @see constructor for {Element}
     */
    construct: function construct(tagName, styles, attributes) {
      qx.html.Element.constructor.call(this, tagName, styles, attributes);
      this.registerProperty("value", null, this._setValueProperty);
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __rich__P_112_0: null,

      /*
      ---------------------------------------------------------------------------
        ELEMENT API
      ---------------------------------------------------------------------------
      */

      /**
       * Implementation of setter for the "value" property
       *
       * @param value {String?} value to set
       */
      _setValueProperty: function _setValueProperty(value) {
        var element = this.getDomElement();
        qx.bom.Label.setValue(element, value);
      },
      // overridden
      _createDomElement: function _createDomElement() {
        var rich = this.__rich__P_112_0;
        var el = qx.bom.Label.create(this._content, rich);
        el.style.overflow = "hidden";
        return el;
      },
      // overridden
      // be sure that style attributes are merged and not overwritten
      _copyData: function _copyData(fromMarkup, propertiesFromDom) {
        return qx.html.Label.superclass.prototype._copyData.call(this, true, propertiesFromDom);
      },

      /*
      ---------------------------------------------------------------------------
        LABEL API
      ---------------------------------------------------------------------------
      */

      /**
       * Toggles between rich HTML mode and pure text mode.
       *
       * @param value {Boolean} Whether the HTML mode should be used.
       * @return {qx.html.Label} This instance for chaining support.
       */
      setRich: function setRich(value) {
        var element = this.getDomElement();

        if (element) {
          throw new Error("The label mode cannot be modified after initial creation");
        }

        value = !!value;

        if (this.__rich__P_112_0 == value) {
          return this;
        }

        this.__rich__P_112_0 = value;
        return this;
      },

      /**
       * Sets the HTML/text content depending on the content mode.
       *
       * @param value {String} The content to be used.
       * @return {qx.html.Label} This instance for for chaining support.
       */
      setValue: function setValue(value) {
        this._setProperty("value", value);

        return this;
      },

      /**
       * Get the current content.
       *
       * @return {String} The labels's content
       */
      getValue: function getValue() {
        return this._getProperty("value");
      },

      /**
       * Reset the current content
       *
       * @return {qx.html.Label} This instance for for chaining support.
       */
      resetValue: function resetValue() {
        return this._removeProperty("value");
      }
    }
  });
  qx.html.Label.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.bom.client.Engine": {},
      "qx.core.Environment": {
        "defer": "runtime"
      }
    },
    "environment": {
      "provided": ["io.maxrequests", "io.ssl", "io.xhr"],
      "required": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Carsten Lergenmueller (carstenl)
       * Fabian Jakobs (fbjakobs)
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * Determines browser-dependent information about the transport layer.
   *
   * This class is used by {@link qx.core.Environment} and should not be used
   * directly. Please check its class comment for details how to use it.
   *
   * @internal
   */
  qx.Bootstrap.define("qx.bom.client.Transport", {
    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */
    statics: {
      /**
       * Returns the maximum number of parallel requests the current browser
       * supports per host addressed.
       *
       * Note that this assumes one connection can support one request at a time
       * only. Technically, this is not correct when pipelining is enabled (which
       * it currently is only for IE 8 and Opera). In this case, the number
       * returned will be too low, as one connection supports multiple pipelined
       * requests. This is accepted for now because pipelining cannot be
       * detected from JavaScript and because modern browsers have enough
       * parallel connections already - it's unlikely an app will require more
       * than 4 parallel XMLHttpRequests to one server at a time.
       *
       * @internal
       * @return {Integer} Maximum number of parallel requests
       */
      getMaxConcurrentRequestCount: function getMaxConcurrentRequestCount() {
        var maxConcurrentRequestCount; // Parse version numbers.

        var versionParts = qx.bom.client.Engine.getVersion().split(".");
        var versionMain = 0;
        var versionMajor = 0;
        var versionMinor = 0; // Main number

        if (versionParts[0]) {
          versionMain = versionParts[0];
        } // Major number


        if (versionParts[1]) {
          versionMajor = versionParts[1];
        } // Minor number


        if (versionParts[2]) {
          versionMinor = versionParts[2];
        } // IE 8 gives the max number of connections in a property
        // see http://msdn.microsoft.com/en-us/library/cc197013(VS.85).aspx


        if (window.maxConnectionsPerServer) {
          maxConcurrentRequestCount = window.maxConnectionsPerServer;
        } else if (qx.bom.client.Engine.getName() == "opera") {
          // Opera: 8 total
          // see http://operawiki.info/HttpProtocol
          maxConcurrentRequestCount = 8;
        } else if (qx.bom.client.Engine.getName() == "webkit") {
          // Safari: 4
          // http://www.stevesouders.com/blog/2008/03/20/roundup-on-parallel-connections/
          // Bug #6917: Distinguish Chrome from Safari, Chrome has 6 connections
          //       according to
          //      http://stackoverflow.com/questions/561046/how-many-concurrent-ajax-xmlhttprequest-requests-are-allowed-in-popular-browser
          maxConcurrentRequestCount = 4;
        } else if (qx.bom.client.Engine.getName() == "gecko" && (versionMain > 1 || versionMain == 1 && versionMajor > 9 || versionMain == 1 && versionMajor == 9 && versionMinor >= 1)) {
          // FF 3.5 (== Gecko 1.9.1): 6 Connections.
          // see  http://gemal.dk/blog/2008/03/18/firefox_3_beta_5_will_have_improved_connection_parallelism/
          maxConcurrentRequestCount = 6;
        } else {
          // Default is 2, as demanded by RFC 2616
          // see http://blogs.msdn.com/ie/archive/2005/04/11/407189.aspx
          maxConcurrentRequestCount = 2;
        }

        return maxConcurrentRequestCount;
      },

      /**
       * Checks whether the app is loaded with SSL enabled which means via https.
       *
       * @internal
       * @return {Boolean} <code>true</code>, if the app runs on https
       */
      getSsl: function getSsl() {
        return window.location.protocol === "https:";
      },

      /**
       * Checks what kind of XMLHttpRequest object the browser supports
       * for the current protocol, if any.
       *
       * The standard XMLHttpRequest is preferred over ActiveX XMLHTTP.
       *
       * @internal
       * @return {String}
       *  <code>"xhr"</code>, if the browser provides standard XMLHttpRequest.<br/>
       *  <code>"activex"</code>, if the browser provides ActiveX XMLHTTP.<br/>
       *  <code>""</code>, if there is not XHR support at all.
       */
      getXmlHttpRequest: function getXmlHttpRequest() {
        // Standard XHR can be disabled in IE's security settings,
        // therefore provide ActiveX as fallback. Additionally,
        // standard XHR in IE7 is broken for file protocol.
        var supports = window.ActiveXObject ? function () {
          if (window.location.protocol !== "file:") {
            try {
              new window.XMLHttpRequest();
              return "xhr";
            } catch (noXhr) {}
          }

          try {
            new window.ActiveXObject("Microsoft.XMLHTTP");
            return "activex";
          } catch (noActiveX) {}
        }() : function () {
          try {
            new window.XMLHttpRequest();
            return "xhr";
          } catch (noXhr) {}
        }();
        return supports || "";
      }
    },
    defer: function defer(statics) {
      qx.core.Environment.add("io.maxrequests", statics.getMaxConcurrentRequestCount);
      qx.core.Environment.add("io.ssl", statics.getSsl);
      qx.core.Environment.add("io.xhr", statics.getXmlHttpRequest);
    }
  });
  qx.bom.client.Transport.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
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
      "qx.bom.client.Device": {},
      "qx.bom.client.Engine": {
        "defer": "load",
        "require": true
      },
      "qx.bom.client.Transport": {
        "defer": "load",
        "require": true
      },
      "qx.util.LibraryManager": {
        "defer": "runtime"
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "engine.name": {
          "className": "qx.bom.client.Engine",
          "defer": true
        },
        "io.ssl": {
          "className": "qx.bom.client.Transport",
          "defer": true
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * Contains information about images (size, format, clipping, ...) and
   * other resources like CSS files, local data, ...
   */
  qx.Class.define("qx.util.ResourceManager", {
    extend: qx.core.Object,
    type: "singleton",

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qx.core.Object.constructor.call(this);
    },

    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */
    statics: {
      /** @type {Map} the shared image registry */
      __registry__P_135_0: qx.$$resources || {},

      /** @type {Map} prefix per library used in HTTPS mode for IE */
      __urlPrefix__P_135_1: {}
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      /**
       * Detects whether there is a high-resolution image available.
       * A high-resolution image is assumed to have the same file name as
       * the parameter source, but with a pixelRatio identifier before the file
       * extension, like "@2x".
       * Medium Resolution: "example.png", high-resolution: "example@2x.png"
       *
       * @param lowResImgSrc {String} source of the low resolution image.
       * @param factor {Number} Factor to find the right image. If not set calculated by getDevicePixelRatio()
       * @return {String|Boolean} If a high-resolution image source.
       */
      findHighResolutionSource: function findHighResolutionSource(lowResImgSrc, factor) {
        var pixelRatioCandidates = ["3", "2", "1.5"]; // Calculate the optimal ratio, based on the rem scale factor of the application and the device pixel ratio.

        if (!factor) {
          factor = parseFloat(qx.bom.client.Device.getDevicePixelRatio().toFixed(2));
        }

        if (factor <= 1) {
          return false;
        }

        var i = pixelRatioCandidates.length;

        while (i > 0 && factor > pixelRatioCandidates[--i]) {}

        var hiResImgSrc;
        var k; // Search for best img with a higher resolution.

        for (k = i; k >= 0; k--) {
          hiResImgSrc = this.getHighResolutionSource(lowResImgSrc, pixelRatioCandidates[k]);

          if (hiResImgSrc) {
            return hiResImgSrc;
          }
        } // Search for best img with a lower resolution.


        for (k = i + 1; k < pixelRatioCandidates.length; k++) {
          hiResImgSrc = this.getHighResolutionSource(lowResImgSrc, pixelRatioCandidates[k]);

          if (hiResImgSrc) {
            return hiResImgSrc;
          }
        }

        return null;
      },

      /**
       * Returns the source name for the high-resolution image based on the passed
       * parameters.
       * @param source {String} the source of the medium resolution image.
       * @param pixelRatio {Number} the pixel ratio of the high-resolution image.
       * @return {String} the high-resolution source name or null if no source could be found.
       */
      getHighResolutionSource: function getHighResolutionSource(source, pixelRatio) {
        var fileExtIndex = source.lastIndexOf(".");

        if (fileExtIndex > -1) {
          var pixelRatioIdentifier = "@" + pixelRatio + "x";
          var candidate = source.slice(0, fileExtIndex) + pixelRatioIdentifier + source.slice(fileExtIndex);

          if (this.has(candidate)) {
            return candidate;
          }
        }

        return null;
      },

      /**
       * Get all known resource IDs.
       *
       * @param pathfragment{String|null|undefined} an optional path fragment to check against with id.indexOf(pathfragment)
       * @return {Array|null} an array containing the IDs or null if the registry is not initialized
       */
      getIds: function getIds(pathfragment) {
        var registry = qx.util.ResourceManager.__registry__P_135_0;

        if (!registry) {
          return null;
        }

        return Object.keys(registry).filter(function (key) {
          return !pathfragment || key.indexOf(pathfragment) != -1;
        });
      },

      /**
       * Whether the registry has information about the given resource.
       *
       * @param id {String} The resource to get the information for
       * @return {Boolean} <code>true</code> when the resource is known.
       */
      has: function has(id) {
        return !!qx.util.ResourceManager.__registry__P_135_0[id];
      },

      /**
       * Get information about an resource.
       *
       * @param id {String} The resource to get the information for
       * @return {Array} Registered data or <code>null</code>
       */
      getData: function getData(id) {
        return qx.util.ResourceManager.__registry__P_135_0[id] || null;
      },

      /**
       * Returns the width of the given resource ID,
       * when it is not a known image <code>0</code> is
       * returned.
       *
       * @param id {String} Resource identifier
       * @return {Integer} The image width, maybe <code>null</code> when the width is unknown
       */
      getImageWidth: function getImageWidth(id) {
        var size;

        if (id && id.startsWith("@")) {
          var part = id.split("/");
          size = parseInt(part[2], 10);

          if (size) {
            id = part[0] + "/" + part[1];
          }
        }

        var entry = qx.util.ResourceManager.__registry__P_135_0[id]; // [ width, height, codepoint ]

        if (size && entry) {
          var width = Math.ceil(size / entry[1] * entry[0]);
          return width;
        }

        return entry ? entry[0] : null;
      },

      /**
       * Returns the height of the given resource ID,
       * when it is not a known image <code>0</code> is
       * returned.
       *
       * @param id {String} Resource identifier
       * @return {Integer} The image height, maybe <code>null</code> when the height is unknown
       */
      getImageHeight: function getImageHeight(id) {
        if (id && id.startsWith("@")) {
          var part = id.split("/");
          var size = parseInt(part[2], 10);

          if (size) {
            return size;
          }
        }

        var entry = qx.util.ResourceManager.__registry__P_135_0[id];
        return entry ? entry[1] : null;
      },

      /**
       * Returns the format of the given resource ID,
       * when it is not a known image <code>null</code>
       * is returned.
       *
       * @param id {String} Resource identifier
       * @return {String} File format of the image
       */
      getImageFormat: function getImageFormat(id) {
        if (id && id.startsWith("@")) {
          return "font";
        }

        var entry = qx.util.ResourceManager.__registry__P_135_0[id];
        return entry ? entry[2] : null;
      },

      /**
       * Returns the format of the combined image (png, gif, ...), if the given
       * resource identifier is an image contained in one, or the empty string
       * otherwise.
       *
       * @param id {String} Resource identifier
       * @return {String} The type of the combined image containing id
       */
      getCombinedFormat: function getCombinedFormat(id) {
        var clippedtype = "";
        var entry = qx.util.ResourceManager.__registry__P_135_0[id];
        var isclipped = entry && entry.length > 4 && typeof entry[4] == "string" && this.constructor.__registry__P_135_0[entry[4]];

        if (isclipped) {
          var combId = entry[4];
          var combImg = this.constructor.__registry__P_135_0[combId];
          clippedtype = combImg[2];
        }

        return clippedtype;
      },

      /**
       * Converts the given resource ID to a full qualified URI
       *
       * @param id {String} Resource ID
       * @return {String} Resulting URI
       */
      toUri: function toUri(id) {
        if (id == null) {
          return id;
        }

        var entry = qx.util.ResourceManager.__registry__P_135_0[id];

        if (!entry) {
          return id;
        }

        if (typeof entry === "string") {
          var lib = entry;
        } else {
          var lib = entry[3]; // no lib reference
          // may mean that the image has been registered dynamically

          if (!lib) {
            return id;
          }
        }

        var urlPrefix = "";

        if (qx.core.Environment.get("engine.name") == "mshtml" && qx.core.Environment.get("io.ssl")) {
          urlPrefix = qx.util.ResourceManager.__urlPrefix__P_135_1[lib];
        }

        return urlPrefix + qx.util.LibraryManager.getInstance().get(lib, "resourceUri") + "/" + id;
      },

      /**
       * Construct a data: URI for an image resource.
       *
       * Constructs a data: URI for a given resource id, if this resource is
       * contained in a base64 combined image. If this is not the case (e.g.
       * because the combined image has not been loaded yet), returns the direct
       * URI to the image file itself.
       *
       * @param resid {String} resource id of the image
       * @return {String} "data:" or "http:" URI
       */
      toDataUri: function toDataUri(resid) {
        var resentry = this.constructor.__registry__P_135_0[resid];
        var combined = resentry ? this.constructor.__registry__P_135_0[resentry[4]] : null;
        var uri;

        if (combined) {
          var resstruct = combined[4][resid];
          uri = "data:image/" + resstruct["type"] + ";" + resstruct["encoding"] + "," + resstruct["data"];
        } else {
          uri = this.toUri(resid);
        }

        return uri;
      },

      /**
       * Checks whether a given resource id for an image is a font handle.
       *
       * @param resid {String} resource id of the image
       * @return {Boolean} True if it's a font URI
       */
      isFontUri: function isFontUri(resid) {
        return resid ? resid.startsWith("@") : false;
      },

      /**
       * Returns the correct char code, ignoring scale postfix.
       *
       * The resource ID can be a ligature name (eg `@FontAwesome/heart` or `@MaterialIcons/home/16`),
       * or a hex character code (eg `@FontAwesome/f004` or `@FontAwesome/f004/16`)
       *
       * @param source {String} resource id of the image
       * @returns charCode of the glyph
       */
      fromFontUriToCharCode: function fromFontUriToCharCode(source) {
        var sparts = source.split("/");
        var fontSource = source;

        if (sparts.length > 2) {
          fontSource = sparts[0] + "/" + sparts[1];
        }

        var resource = this.getData(fontSource);
        var charCode = null;

        if (resource) {
          charCode = resource[2];
        } else {
          var hexString = source.match(/@([^/]+)\/(.*)$/)[2];

          if (hexString) {
            charCode = parseInt(hexString, 16);

            if (isNaN(charCode)) {
              charCode = null;
            }
          }
        }

        if (!charCode) {
          throw new Error("Cannot determine charCode from source: ".concat(source));
        }

        return charCode;
      }
    },
    defer: function defer(statics) {
      if (qx.core.Environment.get("engine.name") == "mshtml") {
        // To avoid a "mixed content" warning in IE when the application is
        // delivered via HTTPS a prefix has to be added. This will transform the
        // relative URL to an absolute one in IE.
        // Though this warning is only displayed in conjunction with images which
        // are referenced as a CSS "background-image", every resource path is
        // changed when the application is served with HTTPS.
        if (qx.core.Environment.get("io.ssl")) {
          for (var lib in qx.$$libraries) {
            var resourceUri;

            if (qx.util.LibraryManager.getInstance().get(lib, "resourceUri")) {
              resourceUri = qx.util.LibraryManager.getInstance().get(lib, "resourceUri");
            } else {
              // default for libraries without a resourceUri set
              statics.__urlPrefix__P_135_1[lib] = "";
              continue;
            }

            var href; //first check if there is base url set

            var baseElements = document.getElementsByTagName("base");

            if (baseElements.length > 0) {
              href = baseElements[0].href;
            } // It is valid to to begin a URL with "//" so this case has to
            // be considered. If the to resolved URL begins with "//" the
            // manager prefixes it with "https:" to avoid any problems for IE


            if (resourceUri.match(/^\/\//) != null) {
              statics.__urlPrefix__P_135_1[lib] = window.location.protocol;
            } // If the resourceUri begins with a single slash, include the current
            // hostname
            else if (resourceUri.match(/^\//) != null) {
              if (href) {
                statics.__urlPrefix__P_135_1[lib] = href;
              } else {
                statics.__urlPrefix__P_135_1[lib] = window.location.protocol + "//" + window.location.host;
              }
            } // If the resolved URL begins with "./" the final URL has to be
            // put together using the document.URL property.
            // IMPORTANT: this is only applicable for the source version
            else if (resourceUri.match(/^\.\//) != null) {
              var url = document.URL;
              statics.__urlPrefix__P_135_1[lib] = url.substring(0, url.lastIndexOf("/") + 1);
            } else if (resourceUri.match(/^http/) != null) {
              // Let absolute URLs pass through
              statics.__urlPrefix__P_135_1[lib] = "";
            } else {
              if (!href) {
                // check for parameters with URLs as value
                var index = window.location.href.indexOf("?");

                if (index == -1) {
                  href = window.location.href;
                } else {
                  href = window.location.href.substring(0, index);
                }
              }

              statics.__urlPrefix__P_135_1[lib] = href.substring(0, href.lastIndexOf("/") + 1);
            }
          }
        }
      }
    }
  });
  qx.util.ResourceManager.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2012 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Author:
       * Daniel Wagner (danielwagner)
  
  ************************************************************************ */

  /**
   * Provides read/write access to library-specific information such as
   * source/resource URIs.
   */
  qx.Class.define("qx.util.LibraryManager", {
    extend: qx.core.Object,
    type: "singleton",
    statics: {
      /** @type {Map} The libraries used by this application */
      __libs__P_169_0: qx.$$libraries || {}
    },
    members: {
      /**
       * Checks whether the library with the given namespace is known to the
       * application.
       * @param namespace {String} The library's namespace
       * @return {Boolean} <code>true</code> if the given library is known
       */
      has: function has(namespace) {
        return !!qx.util.LibraryManager.__libs__P_169_0[namespace];
      },

      /**
       * Returns the value of an attribute of the given library
       * @param namespace {String} The library's namespace
       * @param key {String} Name of the attribute
       * @return {var|null} The attribute's value or <code>null</code> if it's not defined
       */
      get: function get(namespace, key) {
        return qx.util.LibraryManager.__libs__P_169_0[namespace][key] ? qx.util.LibraryManager.__libs__P_169_0[namespace][key] : null;
      },

      /**
       * Sets an attribute on the given library.
       *
       * @param namespace {String} The library's namespace
       * @param key {String} Name of the attribute
       * @param value {var} Value of the attribute
       */
      set: function set(namespace, key, value) {
        qx.util.LibraryManager.__libs__P_169_0[namespace][key] = value;
      }
    }
  });
  qx.util.LibraryManager.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "usage": "dynamic",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.bom.client.Engine": {
        "require": true
      },
      "qx.util.ResourceManager": {},
      "qx.bom.element.Style": {},
      "qx.bom.client.Css": {
        "require": true
      },
      "qx.theme.manager.Font": {},
      "qx.lang.Object": {},
      "qx.bom.Style": {},
      "qx.io.ImageLoader": {},
      "qx.log.Logger": {},
      "qx.bom.element.Background": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "engine.name": {
          "load": true,
          "className": "qx.bom.client.Engine"
        },
        "css.alphaimageloaderneeded": {
          "className": "qx.bom.client.Css"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Alexander Steitz (aback)
  
  ************************************************************************ */

  /**
   * Powerful creation and update features for images used for decoration
   * purposes like for rounded borders, icons, etc.
   *
   * Includes support for image clipping, PNG alpha channel support, additional
   * repeat options like <code>scale-x</code> or <code>scale-y</code>.
   */
  qx.Class.define("qx.bom.element.Decoration", {
    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */
    statics: {
      /** @type {Boolean} Whether clipping hints should be logged */
      DEBUG: false,

      /** @type {Map} Collect warnings for potential clipped images */
      __warnings__P_164_0: {},

      /** @type {Map} List of repeat modes which supports the IE AlphaImageLoader */
      __alphaFixRepeats__P_164_1: qx.core.Environment.select("engine.name", {
        mshtml: {
          "scale-x": true,
          "scale-y": true,
          scale: true,
          "no-repeat": true
        },
        "default": null
      }),

      /** @type {Map} Mapping between background repeat and the tag to create */
      __repeatToTagname__P_164_2: {
        "scale-x": "img",
        "scale-y": "img",
        scale: "img",
        repeat: "div",
        "no-repeat": "div",
        "repeat-x": "div",
        "repeat-y": "div"
      },

      /**
       * Updates the element to display the given source
       * with the repeat option.
       *
       * @param element {Element} DOM element to update
       * @param source {String} Any valid URI
       * @param repeat {String} One of <code>scale-x</code>, <code>scale-y</code>,
       *   <code>scale</code>, <code>repeat</code>, <code>repeat-x</code>,
       *   <code>repeat-y</code>, <code>repeat</code>
       * @param style {Map} Additional styles to apply
       */
      update: function update(element, source, repeat, style) {
        var tag = this.getTagName(repeat, source);

        if (tag != element.tagName.toLowerCase()) {
          // The "no-repeat" means that `getTagName` will suggest a `div` as opposed to an `img` tag, preferring to use
          //  `img` only for things that need scaling.  The Desktop `qx.ui.*` will always follow this rule, but it
          //  is valid for virtual DOM (`qx.html.*`) to be used to create a no-repeat `img` tag.  Ignore the validation
          //  for `no-repeat` `img`.
          if (repeat != "no-repeat" || element.tagName.toLowerCase() != "img") {
            throw new Error("Image modification not possible because elements could not be replaced at runtime anymore!");
          }
        }

        var ret = this.getAttributes(source, repeat, style);

        if (tag === "img") {
          element.src = ret.src || qx.util.ResourceManager.getInstance().toUri("qx/static/blank.gif");
        } // Fix for old background position


        if (element.style.backgroundPosition != "" && ret.style.backgroundPosition === undefined) {
          ret.style.backgroundPosition = null;
        } // Fix for old clip


        if (element.style.clip != "" && ret.style.clip === undefined) {
          ret.style.clip = null;
        } // Apply new styles


        qx.bom.element.Style.setStyles(element, ret.style); // we need to apply the filter to prevent black rendering artifacts
        // http://blog.hackedbrain.com/archive/2007/05/21/6110.aspx

        if (qx.core.Environment.get("css.alphaimageloaderneeded")) {
          try {
            element.filters["DXImageTransform.Microsoft.AlphaImageLoader"].apply();
          } catch (e) {}
        }
      },

      /**
       * Creates the HTML for a decorator image element with the given options.
       *
       * @param source {String} Any valid URI
       * @param repeat {String} One of <code>scale-x</code>, <code>scale-y</code>,
       *   <code>scale</code>, <code>repeat</code>, <code>repeat-x</code>,
       *   <code>repeat-y</code>, <code>repeat</code>
       * @param style {Map} Additional styles to apply
       * @return {String} Decorator image HTML
       */
      create: function create(source, repeat, style) {
        var tag = this.getTagName(repeat, source);
        var ret = this.getAttributes(source, repeat, style);
        var css = qx.bom.element.Style.compile(ret.style);
        var ResourceManager = qx.util.ResourceManager.getInstance();

        if (ResourceManager.isFontUri(source)) {
          var font = qx.theme.manager.Font.getInstance().resolve(source.match(/@([^/]+)/)[1]);
          var styles = qx.lang.Object.clone(font.getStyles());
          styles["width"] = style.width;
          styles["height"] = style.height;
          styles["fontSize"] = parseInt(style.width) > parseInt(style.height) ? style.height : style.width;
          styles["display"] = style.display;
          styles["verticalAlign"] = style.verticalAlign;
          styles["position"] = style.position;
          var css = "";

          for (var _style in styles) {
            if (styles.hasOwnProperty(_style)) {
              css += qx.bom.Style.getCssName(_style) + ": " + styles[_style] + ";";
            }
          }

          var charCode = ResourceManager.fromFontUriToCharCode(source);
          return '<div style="' + css + '">' + String.fromCharCode(charCode) + "</div>";
        } else {
          if (tag === "img") {
            return '<img src="' + ret.src + '" style="' + css + '"/>';
          } else {
            return '<div style="' + css + '"></div>';
          }
        }
      },

      /**
       * Translates the given repeat option to a tag name. Useful
       * for systems which depends on early information of the tag
       * name to prepare element like {@link qx.html.Image}.
       *
       * @param repeat {String} One of <code>scale-x</code>, <code>scale-y</code>,
       *   <code>scale</code>, <code>repeat</code>, <code>repeat-x</code>,
       *   <code>repeat-y</code>, <code>repeat</code>
       * @param source {String?null} Source used to identify the image format
       * @return {String} The tag name: <code>div</code> or <code>img</code>
       */
      getTagName: function getTagName(repeat, source) {
        if (source && qx.core.Environment.get("css.alphaimageloaderneeded") && this.__alphaFixRepeats__P_164_1[repeat] && source.endsWith(".png")) {
          return "div";
        }

        return this.__repeatToTagname__P_164_2[repeat];
      },

      /**
       * This method is used to collect all needed attributes for
       * the tag name detected by {@link #getTagName}.
       *
       * @param source {String} Image source
       * @param repeat {String} Repeat mode of the image
       * @param style {Map} Additional styles to apply
       * @return {String} Markup for image
       */
      getAttributes: function getAttributes(source, repeat, style) {
        if (!style) {
          style = {};
        }

        if (qx.core.Environment.get("engine.name") == "mshtml") {
          // Add a fix for small blocks where IE has a minHeight
          // of the fontSize in quirks mode
          style.fontSize = 0;
          style.lineHeight = 0;
        } else if (qx.core.Environment.get("engine.name") == "webkit") {
          // This stops images from being draggable in webkit
          style.WebkitUserDrag = "none";
        }

        var format = qx.util.ResourceManager.getInstance().getImageFormat(source) || qx.io.ImageLoader.getFormat(source);
        {
          if (source != null && format == null) {
            qx.log.Logger.warn("ImageLoader: Not recognized format of external image '" + source + "'!");
          }
        }
        var result; // Enable AlphaImageLoader in IE6/IE7/IE8

        if (qx.core.Environment.get("css.alphaimageloaderneeded") && this.__alphaFixRepeats__P_164_1[repeat] && format === "png") {
          var dimension = this.__getDimension__P_164_3(source);

          this.__normalizeWidthHeight__P_164_4(style, dimension.width, dimension.height);

          result = this.processAlphaFix(style, repeat, source);
        } else {
          delete style.clip;

          if (repeat === "scale") {
            result = this.__processScale__P_164_5(style, repeat, source);
          } else if (repeat === "scale-x" || repeat === "scale-y") {
            result = this.__processScaleXScaleY__P_164_6(style, repeat, source);
          } else {
            // Native repeats or "no-repeat"
            result = this.__processRepeats__P_164_7(style, repeat, source);
          }
        }

        return result;
      },

      /**
       * Normalize the given width and height values
       *
       * @param style {Map} style information
       * @param width {Integer?null} width as number or null
       * @param height {Integer?null} height as number or null
       */
      __normalizeWidthHeight__P_164_4: function __normalizeWidthHeight__P_164_4(style, width, height) {
        if (style.width == null && width != null) {
          style.width = width + "px";
        }

        if (style.height == null && height != null) {
          style.height = height + "px";
        }
      },

      /**
       * Returns the dimension of the image by calling
       * {@link qx.util.ResourceManager} or {@link qx.io.ImageLoader}
       * depending on if the image is a managed one.
       *
       * @param source {String} image source
       * @return {Map} dimension of image
       */
      __getDimension__P_164_3: function __getDimension__P_164_3(source) {
        var width = qx.util.ResourceManager.getInstance().getImageWidth(source) || qx.io.ImageLoader.getWidth(source);
        var height = qx.util.ResourceManager.getInstance().getImageHeight(source) || qx.io.ImageLoader.getHeight(source);
        return {
          width: width,
          height: height
        };
      },

      /**
       * Get all styles for IE browser which need to load the image
       * with the help of the AlphaImageLoader
       *
       * @param style {Map} style information
       * @param repeat {String} repeat mode
       * @param source {String} image source
       *
       * @return {Map} style infos
       */
      processAlphaFix: function processAlphaFix(style, repeat, source) {
        if (repeat == "repeat" || repeat == "repeat-x" || repeat == "repeat-y") {
          return style;
        }

        var sizingMethod = repeat == "no-repeat" ? "crop" : "scale";
        var filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + qx.util.ResourceManager.getInstance().toUri(source) + "', sizingMethod='" + sizingMethod + "')";
        style.filter = filter;
        style.backgroundImage = style.backgroundRepeat = "";
        delete style["background-image"];
        delete style["background-repeat"];
        return {
          style: style
        };
      },

      /**
       * Process scaled images.
       *
       * @param style {Map} style information
       * @param repeat {String} repeat mode
       * @param source {String} image source
       *
       * @return {Map} image URI and style infos
       */
      __processScale__P_164_5: function __processScale__P_164_5(style, repeat, source) {
        var uri = qx.util.ResourceManager.getInstance().toUri(source);

        var dimension = this.__getDimension__P_164_3(source);

        this.__normalizeWidthHeight__P_164_4(style, dimension.width, dimension.height);

        return {
          src: uri,
          style: style
        };
      },

      /**
       * Process images which are either scaled horizontally or
       * vertically.
       *
       * @param style {Map} style information
       * @param repeat {String} repeat mode
       * @param sourceid {String} image resource id
       *
       * @return {Map} image URI and style infos
       */
      __processScaleXScaleY__P_164_6: function __processScaleXScaleY__P_164_6(style, repeat, sourceid) {
        var ResourceManager = qx.util.ResourceManager.getInstance();
        var clipped = ResourceManager.getCombinedFormat(sourceid);

        var dimension = this.__getDimension__P_164_3(sourceid);

        var uri;

        if (clipped) {
          var data = ResourceManager.getData(sourceid);
          var combinedid = data[4];

          if (clipped == "b64") {
            uri = ResourceManager.toDataUri(sourceid);
          } else {
            uri = ResourceManager.toUri(combinedid);
          }

          if (repeat === "scale-x") {
            style = this.__getStylesForClippedScaleX__P_164_8(style, data, dimension.height);
          } else {
            style = this.__getStylesForClippedScaleY__P_164_9(style, data, dimension.width);
          }

          return {
            src: uri,
            style: style
          };
        } // No clipped image available
        else {
          {
            this.__checkForPotentialClippedImage__P_164_10(sourceid);
          }

          if (repeat == "scale-x") {
            style.height = dimension.height == null ? null : dimension.height + "px"; // note: width is given by the user
          } else if (repeat == "scale-y") {
            style.width = dimension.width == null ? null : dimension.width + "px"; // note: height is given by the user
          }

          uri = ResourceManager.toUri(sourceid);
          return {
            src: uri,
            style: style
          };
        }
      },

      /**
       * Generates the style infos for horizontally scaled clipped images.
       *
       * @param style {Map} style infos
       * @param data {Array} image data retrieved from the {@link qx.util.ResourceManager}
       * @param height {Integer} image height
       *
       * @return {Map} style infos and image URI
       */
      __getStylesForClippedScaleX__P_164_8: function __getStylesForClippedScaleX__P_164_8(style, data, height) {
        // Use clipped image (multi-images on x-axis)
        var imageHeight = qx.util.ResourceManager.getInstance().getImageHeight(data[4]); // Add size and clipping

        style.clip = {
          top: -data[6],
          height: height
        };
        style.height = imageHeight + "px"; // note: width is given by the user
        // Fix user given y-coordinate to include the combined image offset

        if (style.top != null) {
          style.top = parseInt(style.top, 10) + data[6] + "px";
        } else if (style.bottom != null) {
          style.bottom = parseInt(style.bottom, 10) + height - imageHeight - data[6] + "px";
        }

        return style;
      },

      /**
       * Generates the style infos for vertically scaled clipped images.
       *
       * @param style {Map} style infos
       * @param data {Array} image data retrieved from the {@link qx.util.ResourceManager}
       * @param width {Integer} image width
       *
       * @return {Map} style infos and image URI
       */
      __getStylesForClippedScaleY__P_164_9: function __getStylesForClippedScaleY__P_164_9(style, data, width) {
        // Use clipped image (multi-images on x-axis)
        var imageWidth = qx.util.ResourceManager.getInstance().getImageWidth(data[4]); // Add size and clipping

        style.clip = {
          left: -data[5],
          width: width
        };
        style.width = imageWidth + "px"; // note: height is given by the user
        // Fix user given x-coordinate to include the combined image offset

        if (style.left != null) {
          style.left = parseInt(style.left, 10) + data[5] + "px";
        } else if (style.right != null) {
          style.right = parseInt(style.right, 10) + width - imageWidth - data[5] + "px";
        }

        return style;
      },

      /**
       * Process repeated images.
       *
       * @param style {Map} style information
       * @param repeat {String} repeat mode
       * @param sourceid {String} image resource id
       *
       * @return {Map} image URI and style infos
       */
      __processRepeats__P_164_7: function __processRepeats__P_164_7(style, repeat, sourceid) {
        var ResourceManager = qx.util.ResourceManager.getInstance();
        var clipped = ResourceManager.getCombinedFormat(sourceid);

        var dimension = this.__getDimension__P_164_3(sourceid); // Double axis repeats cannot be clipped


        if (clipped && repeat !== "repeat") {
          // data = [ 8, 5, "png", "qx", "qx/decoration/Modern/arrows-combined.png", -36, 0]
          var data = ResourceManager.getData(sourceid);
          var combinedid = data[4];

          if (clipped == "b64") {
            var uri = ResourceManager.toDataUri(sourceid);
            var offx = 0;
            var offy = 0;
          } else {
            var uri = ResourceManager.toUri(combinedid);
            var offx = data[5];
            var offy = data[6]; // honor padding for combined images

            if (style.paddingTop || style.paddingLeft || style.paddingRight || style.paddingBottom) {
              var top = style.paddingTop || 0;
              var left = style.paddingLeft || 0;
              offx += style.paddingLeft || 0;
              offy += style.paddingTop || 0;
              style.clip = {
                left: left,
                top: top,
                width: dimension.width,
                height: dimension.height
              };
            }
          }

          var bg = qx.bom.element.Background.getStyles(uri, repeat, offx, offy);

          for (var key in bg) {
            style[key] = bg[key];
          }

          if (dimension.width != null && style.width == null && (repeat == "repeat-y" || repeat === "no-repeat")) {
            style.width = dimension.width + "px";
          }

          if (dimension.height != null && style.height == null && (repeat == "repeat-x" || repeat === "no-repeat")) {
            style.height = dimension.height + "px";
          }

          return {
            style: style
          };
        } else {
          // honor padding
          var top = style.paddingTop || 0;
          var left = style.paddingLeft || 0;
          style.backgroundPosition = left + "px " + top + "px";
          {
            if (repeat !== "repeat") {
              this.__checkForPotentialClippedImage__P_164_10(sourceid);
            }
          }

          this.__normalizeWidthHeight__P_164_4(style, dimension.width, dimension.height);

          this.__getStylesForSingleRepeat__P_164_11(style, sourceid, repeat);

          return {
            style: style
          };
        }
      },

      /**
       * Generate all style infos for single repeated images
       *
       * @param style {Map} style information
       * @param repeat {String} repeat mode
       * @param source {String} image source
       */
      __getStylesForSingleRepeat__P_164_11: function __getStylesForSingleRepeat__P_164_11(style, source, repeat) {
        // retrieve the "backgroundPosition" style if available to prevent
        // overwriting with default values
        var top = null;
        var left = null;

        if (style.backgroundPosition) {
          var backgroundPosition = style.backgroundPosition.split(" ");
          left = parseInt(backgroundPosition[0], 10);

          if (isNaN(left)) {
            left = backgroundPosition[0];
          }

          top = parseInt(backgroundPosition[1], 10);

          if (isNaN(top)) {
            top = backgroundPosition[1];
          }
        }

        var bg = qx.bom.element.Background.getStyles(source, repeat, left, top);

        for (var key in bg) {
          style[key] = bg[key];
        } // Reset the AlphaImageLoader filter if applied
        // This prevents IE from setting BOTH CSS filter AND backgroundImage
        // This is only a fallback if the image is not recognized as PNG
        // If it's a Alpha-PNG file it *may* result in display problems


        if (style.filter) {
          style.filter = "";
        }
      },

      /**
       * Output a warning if the image can be clipped.
       *
       * @param source {String} image source
       */
      __checkForPotentialClippedImage__P_164_10: function __checkForPotentialClippedImage__P_164_10(source) {
        if (this.DEBUG && qx.util.ResourceManager.getInstance().has(source) && source.indexOf("qx/icon") == -1) {
          if (!this.__warnings__P_164_0[source]) {
            qx.log.Logger.debug("Potential clipped image candidate: " + source);
            this.__warnings__P_164_0[source] = true;
          }
        }
      }
    }
  });
  qx.bom.element.Decoration.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "construct": true,
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.html.Element": {
        "construct": true,
        "require": true
      },
      "qx.theme.manager.Color": {
        "construct": true
      },
      "qx.bom.client.Engine": {
        "construct": true,
        "require": true
      },
      "qx.util.ResourceManager": {
        "construct": true
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "engine.name": {
          "construct": true,
          "className": "qx.bom.client.Engine"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2009 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * The blocker element is used to block interaction with the application.
   *
   * It is usually transparent or semi-transparent and blocks all events from
   * the underlying elements.
   */
  qx.Class.define("qx.html.Blocker", {
    extend: qx.html.Element,

    /**
     * @param backgroundColor {Color?null} the blocker's background color. This
     *    color can be themed and will be resolved by the blocker.
     * @param opacity {Number?0} The blocker's opacity
     */
    construct: function construct(backgroundColor, opacity) {
      var backgroundColor = backgroundColor ? qx.theme.manager.Color.getInstance().resolve(backgroundColor) : null;
      var styles = {
        position: "absolute",
        opacity: opacity || 0,
        backgroundColor: backgroundColor
      }; // IE needs some extra love here to convince it to block events.

      if (qx.core.Environment.get("engine.name") == "mshtml") {
        styles.backgroundImage = "url(" + qx.util.ResourceManager.getInstance().toUri("qx/static/blank.gif") + ")";
        styles.backgroundRepeat = "repeat";
      }

      qx.html.Element.constructor.call(this, "div", styles);
      this.addListener("mousedown", this._stopPropagation, this);
      this.addListener("mouseup", this._stopPropagation, this);
      this.addListener("click", this._stopPropagation, this);
      this.addListener("dblclick", this._stopPropagation, this);
      this.addListener("mousemove", this._stopPropagation, this);
      this.addListener("mouseover", this._stopPropagation, this);
      this.addListener("mouseout", this._stopPropagation, this);
      this.addListener("mousewheel", this._stopPropagation, this);
      this.addListener("roll", this._stopPropagation, this);
      this.addListener("contextmenu", this._stopPropagation, this);
      this.addListener("pointerdown", this._stopPropagation, this);
      this.addListener("pointerup", this._stopPropagation, this);
      this.addListener("pointermove", this._stopPropagation, this);
      this.addListener("pointerover", this._stopPropagation, this);
      this.addListener("pointerout", this._stopPropagation, this);
      this.addListener("tap", this._stopPropagation, this);
      this.addListener("dbltap", this._stopPropagation, this);
      this.addListener("swipe", this._stopPropagation, this);
      this.addListener("longtap", this._stopPropagation, this);
      this.addListener("appear", this.__refreshCursor__P_182_0, this);
      this.addListener("disappear", this.__refreshCursor__P_182_0, this);
    },
    members: {
      /**
       * Stop the event propagation from the passed event.
       *
       * @param e {qx.event.type.Mouse} mouse event to stop propagation.
       */
      _stopPropagation: function _stopPropagation(e) {
        e.stopPropagation();
      },

      /**
       * Refreshes the cursor by setting it to <code>null</code> and then to the
       * old value.
       */
      __refreshCursor__P_182_0: function __refreshCursor__P_182_0() {
        var currentCursor = this.getStyle("cursor");
        this.setStyle("cursor", null, true);
        this.setStyle("cursor", currentCursor, true);
      }
    }
  });
  qx.html.Blocker.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.theme.manager.Decoration": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * Common set of utility methods used by the standard qooxdoo layouts.
   *
   * @internal
   */
  qx.Class.define("qx.ui.layout.Util", {
    statics: {
      /** @type {RegExp} Regular expression to match percent values */
      PERCENT_VALUE: /[0-9]+(?:\.[0-9]+)?%/,

      /**
       * Computes the flex offsets needed to reduce the space
       * difference as much as possible by respecting the
       * potential of the given elements (being in the range of
       * their min/max values)
       *
       * @param flexibles {Map} Each entry must have these keys:
       *   <code>id</code>, <code>potential</code> and <code>flex</code>.
       *   The ID is used in the result map as the key for the user to work
       *   with later (e.g. upgrade sizes etc. to respect the given offset)
       *   The potential is an integer value which is the difference of the
       *   currently interesting direction (e.g. shrinking=width-minWidth, growing=
       *   maxWidth-width). The flex key holds the flex value of the item.
       * @param avail {Integer} Full available space to allocate (ignoring used one)
       * @param used {Integer} Size of already allocated space
       * @return {Map} A map which contains the calculated offsets under the key
       *   which is identical to the ID given in the incoming map.
       */
      computeFlexOffsets: function computeFlexOffsets(flexibles, avail, used) {
        var child, key, flexSum, flexStep;
        var grow = avail > used;
        var remaining = Math.abs(avail - used);
        var roundingOffset, currentOffset; // Preprocess data

        var result = {};

        for (key in flexibles) {
          child = flexibles[key];
          result[key] = {
            potential: grow ? child.max - child.value : child.value - child.min,
            flex: grow ? child.flex : 1 / child.flex,
            offset: 0
          };
        } // Continue as long as we need to do anything


        while (remaining != 0) {
          // Find minimum potential for next correction
          flexStep = Infinity;
          flexSum = 0;

          for (key in result) {
            child = result[key];

            if (child.potential > 0) {
              flexSum += child.flex;
              flexStep = Math.min(flexStep, child.potential / child.flex);
            }
          } // No potential found, quit here


          if (flexSum == 0) {
            break;
          } // Respect maximum potential given through remaining space
          // The parent should always win in such conflicts.


          flexStep = Math.min(remaining, flexStep * flexSum) / flexSum; // Start with correction

          roundingOffset = 0;

          for (key in result) {
            child = result[key];

            if (child.potential > 0) {
              // Compute offset for this step
              currentOffset = Math.min(remaining, child.potential, Math.ceil(flexStep * child.flex)); // Fix rounding issues

              roundingOffset += currentOffset - flexStep * child.flex;

              if (roundingOffset >= 1) {
                roundingOffset -= 1;
                currentOffset -= 1;
              } // Update child status


              child.potential -= currentOffset;

              if (grow) {
                child.offset += currentOffset;
              } else {
                child.offset -= currentOffset;
              } // Update parent status


              remaining -= currentOffset;
            }
          }
        }

        return result;
      },

      /**
       * Computes the offset which needs to be added to the top position
       * to result in the stated vertical alignment. Also respects
       * existing margins (without collapsing).
       *
       * @param align {String} One of <code>top</code>, <code>center</code> or <code>bottom</code>.
       * @param width {Integer} The visible width of the widget
       * @param availWidth {Integer} The available inner width of the parent
       * @param marginLeft {Integer?0} Optional left margin of the widget
       * @param marginRight {Integer?0} Optional right margin of the widget
       * @return {Integer} Computed top coordinate
       */
      computeHorizontalAlignOffset: function computeHorizontalAlignOffset(align, width, availWidth, marginLeft, marginRight) {
        if (marginLeft == null) {
          marginLeft = 0;
        }

        if (marginRight == null) {
          marginRight = 0;
        }

        var value = 0;

        switch (align) {
          case "left":
            value = marginLeft;
            break;

          case "right":
            // Align right changes priority to right edge:
            // To align to the right is more important here than to left.
            value = availWidth - width - marginRight;
            break;

          case "center":
            // Ideal center position
            value = Math.round((availWidth - width) / 2); // Try to make this possible (with left-right priority)

            if (value < marginLeft) {
              value = marginLeft;
            } else if (value < marginRight) {
              value = Math.max(marginLeft, availWidth - width - marginRight);
            }

            break;
        }

        return value;
      },

      /**
       * Computes the offset which needs to be added to the top position
       * to result in the stated vertical alignment. Also respects
       * existing margins (without collapsing).
       *
       * @param align {String} One of <code>top</code>, <code>middle</code> or <code>bottom</code>.
       * @param height {Integer} The visible height of the widget
       * @param availHeight {Integer} The available inner height of the parent
       * @param marginTop {Integer?0} Optional top margin of the widget
       * @param marginBottom {Integer?0} Optional bottom margin of the widget
       * @return {Integer} Computed top coordinate
       */
      computeVerticalAlignOffset: function computeVerticalAlignOffset(align, height, availHeight, marginTop, marginBottom) {
        if (marginTop == null) {
          marginTop = 0;
        }

        if (marginBottom == null) {
          marginBottom = 0;
        }

        var value = 0;

        switch (align) {
          case "top":
            value = marginTop;
            break;

          case "bottom":
            // Align bottom changes priority to bottom edge:
            // To align to the bottom is more important here than to top.
            value = availHeight - height - marginBottom;
            break;

          case "middle":
            // Ideal middle position
            value = Math.round((availHeight - height) / 2); // Try to make this possible (with top-down priority)

            if (value < marginTop) {
              value = marginTop;
            } else if (value < marginBottom) {
              value = Math.max(marginTop, availHeight - height - marginBottom);
            }

            break;
        }

        return value;
      },

      /**
       * Collapses two margins.
       *
       * Supports positive and negative margins.
       * Collapsing find the largest positive and the largest
       * negative value. Afterwards the result is computed through the
       * subtraction of the negative from the positive value.
       *
       * @param varargs {arguments} Any number of configured margins
       * @return {Integer} The collapsed margin
       */
      collapseMargins: function collapseMargins(varargs) {
        var max = 0,
            min = 0;

        for (var i = 0, l = arguments.length; i < l; i++) {
          var value = arguments[i];

          if (value < 0) {
            min = Math.min(min, value);
          } else if (value > 0) {
            max = Math.max(max, value);
          }
        }

        return max + min;
      },

      /**
       * Computes the sum of all horizontal gaps. Normally the
       * result is used to compute the available width in a widget.
       *
       * The method optionally respects margin collapsing as well. In
       * this mode the spacing is collapsed together with the margins.
       *
       * @param children {Array} List of children
       * @param spacing {Integer?0} Spacing between every child
       * @param collapse {Boolean?false} Optional margin collapsing mode
       * @return {Integer} Sum of all gaps in the final layout.
       */
      computeHorizontalGaps: function computeHorizontalGaps(children, spacing, collapse) {
        if (spacing == null) {
          spacing = 0;
        }

        var gaps = 0;

        if (collapse) {
          // Add first child
          gaps += children[0].getMarginLeft();

          for (var i = 1, l = children.length; i < l; i += 1) {
            gaps += this.collapseMargins(spacing, children[i - 1].getMarginRight(), children[i].getMarginLeft());
          } // Add last child


          gaps += children[l - 1].getMarginRight();
        } else {
          // Simple adding of all margins
          for (var i = 1, l = children.length; i < l; i += 1) {
            gaps += children[i].getMarginLeft() + children[i].getMarginRight();
          } // Add spacing


          gaps += spacing * (l - 1);
        }

        return gaps;
      },

      /**
       * Computes the sum of all vertical gaps. Normally the
       * result is used to compute the available height in a widget.
       *
       * The method optionally respects margin collapsing as well. In
       * this mode the spacing is collapsed together with the margins.
       *
       * @param children {Array} List of children
       * @param spacing {Integer?0} Spacing between every child
       * @param collapse {Boolean?false} Optional margin collapsing mode
       * @return {Integer} Sum of all gaps in the final layout.
       */
      computeVerticalGaps: function computeVerticalGaps(children, spacing, collapse) {
        if (spacing == null) {
          spacing = 0;
        }

        var gaps = 0;

        if (collapse) {
          // Add first child
          gaps += children[0].getMarginTop();

          for (var i = 1, l = children.length; i < l; i += 1) {
            gaps += this.collapseMargins(spacing, children[i - 1].getMarginBottom(), children[i].getMarginTop());
          } // Add last child


          gaps += children[l - 1].getMarginBottom();
        } else {
          // Simple adding of all margins
          for (var i = 1, l = children.length; i < l; i += 1) {
            gaps += children[i].getMarginTop() + children[i].getMarginBottom();
          } // Add spacing


          gaps += spacing * (l - 1);
        }

        return gaps;
      },

      /**
       * Computes the gaps together with the configuration of separators.
       *
       * @param children {qx.ui.core.LayoutItem[]} List of children
       * @param spacing {Integer} Configured spacing
       * @param separator {String|qx.ui.decoration.IDecorator} Separator to render
       * @return {Integer} Sum of gaps
       */
      computeHorizontalSeparatorGaps: function computeHorizontalSeparatorGaps(children, spacing, separator) {
        var instance = qx.theme.manager.Decoration.getInstance().resolve(separator);
        var insets = instance.getInsets();
        var width = insets.left + insets.right;
        var gaps = 0;

        for (var i = 0, l = children.length; i < l; i++) {
          var child = children[i];
          gaps += child.getMarginLeft() + child.getMarginRight();
        }

        gaps += (spacing + width + spacing) * (l - 1);
        return gaps;
      },

      /**
       * Computes the gaps together with the configuration of separators.
       *
       * @param children {qx.ui.core.LayoutItem[]} List of children
       * @param spacing {Integer} Configured spacing
       * @param separator {String|qx.ui.decoration.IDecorator} Separator to render
       * @return {Integer} Sum of gaps
       */
      computeVerticalSeparatorGaps: function computeVerticalSeparatorGaps(children, spacing, separator) {
        var instance = qx.theme.manager.Decoration.getInstance().resolve(separator);
        var insets = instance.getInsets();
        var height = insets.top + insets.bottom;
        var gaps = 0;

        for (var i = 0, l = children.length; i < l; i++) {
          var child = children[i];
          gaps += child.getMarginTop() + child.getMarginBottom();
        }

        gaps += (spacing + height + spacing) * (l - 1);
        return gaps;
      },

      /**
       * Arranges two sizes in one box to best respect their individual limitations.
       *
       * Mainly used by split layouts (Split Panes) where the layout is mainly defined
       * by the outer dimensions.
       *
       * @param beginMin {Integer} Minimum size of first widget (from size hint)
       * @param beginIdeal {Integer} Ideal size of first widget (maybe after dragging the splitter)
       * @param beginMax {Integer} Maximum size of first widget (from size hint)
       * @param endMin {Integer} Minimum size of second widget (from size hint)
       * @param endIdeal {Integer} Ideal size of second widget (maybe after dragging the splitter)
       * @param endMax {Integer} Maximum size of second widget (from size hint)
       * @return {Map} Map with the keys <code>begin</code and <code>end</code> with the
       *   arranged dimensions.
       */
      arrangeIdeals: function arrangeIdeals(beginMin, beginIdeal, beginMax, endMin, endIdeal, endMax) {
        if (beginIdeal < beginMin || endIdeal < endMin) {
          if (beginIdeal < beginMin && endIdeal < endMin) {
            // Just increase both, can not rearrange them otherwise
            // Result into overflowing of the overlapping content
            // Should normally not happen through auto sizing!
            beginIdeal = beginMin;
            endIdeal = endMin;
          } else if (beginIdeal < beginMin) {
            // Reduce end, increase begin to min
            endIdeal -= beginMin - beginIdeal;
            beginIdeal = beginMin; // Re-check to keep min size of end

            if (endIdeal < endMin) {
              endIdeal = endMin;
            }
          } else if (endIdeal < endMin) {
            // Reduce begin, increase end to min
            beginIdeal -= endMin - endIdeal;
            endIdeal = endMin; // Re-check to keep min size of begin

            if (beginIdeal < beginMin) {
              beginIdeal = beginMin;
            }
          }
        }

        if (beginIdeal > beginMax || endIdeal > endMax) {
          if (beginIdeal > beginMax && endIdeal > endMax) {
            // Just reduce both, can not rearrange them otherwise
            // Leaves a blank area in the pane!
            beginIdeal = beginMax;
            endIdeal = endMax;
          } else if (beginIdeal > beginMax) {
            // Increase end, reduce begin to max
            endIdeal += beginIdeal - beginMax;
            beginIdeal = beginMax; // Re-check to keep max size of end

            if (endIdeal > endMax) {
              endIdeal = endMax;
            }
          } else if (endIdeal > endMax) {
            // Increase begin, reduce end to max
            beginIdeal += endIdeal - endMax;
            endIdeal = endMax; // Re-check to keep max size of begin

            if (beginIdeal > beginMax) {
              beginIdeal = beginMax;
            }
          }
        }

        return {
          begin: beginIdeal,
          end: endIdeal
        };
      }
    }
  });
  qx.ui.layout.Util.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.locale.Manager": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Assert": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * Static class that provides localized date information (like names of week
   * days, AM/PM markers, start of week, etc.).
   *
   * @cldr()
   */
  qx.Class.define("qx.locale.Date", {
    statics: {
      /**
       * Reference to the locale manager.
       *
       * @internal
       */
      __mgr__P_102_0: qx.locale.Manager.getInstance(),

      /**
       * Get AM marker for time definitions
       *
       * @param locale {String} optional locale to be used
       * @return {String} translated AM marker.
       */
      getAmMarker: function getAmMarker(locale) {
        return this.__mgr__P_102_0.localize("cldr_am", [], locale);
      },

      /**
       * Get PM marker for time definitions
       *
       * @param locale {String} optional locale to be used
       * @return {String} translated PM marker.
       */
      getPmMarker: function getPmMarker(locale) {
        return this.__mgr__P_102_0.localize("cldr_pm", [], locale);
      },

      /**
       * Return localized names of day names
       *
       * @param length {String} format of the day names.
       *       Possible values: "abbreviated", "narrow", "wide"
       * @param locale {String} optional locale to be used
       * @param context {String} (default: "format") intended context.
       *       Possible values: "format", "stand-alone"
       * @param withFallback {Boolean?} if true, the previous parameter's other value is tried
       * in order to find a localized name for the day
       * @return {String[]} array of localized day names starting with sunday.
       */
      getDayNames: function getDayNames(length, locale, context, withFallback) {
        var context = context ? context : "format";
        {
          qx.core.Assert.assertInArray(length, ["abbreviated", "narrow", "wide"]);
          qx.core.Assert.assertInArray(context, ["format", "stand-alone"]);
        }
        var days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
        var names = [];

        for (var i = 0; i < days.length; i++) {
          var key = "cldr_day_" + context + "_" + length + "_" + days[i];
          names.push(withFallback ? this.__localizeWithFallback__P_102_1(context, context === "format" ? "stand-alone" : "format", key, locale) : this.__mgr__P_102_0.localize(key, [], locale));
        }

        return names;
      },

      /**
       * Return localized name of a week day name
       *
       * @param length {String} format of the day name.
       *       Possible values: "abbreviated", "narrow", "wide"
       * @param day {Integer} day number. 0=sunday, 1=monday, ...
       * @param locale {String} optional locale to be used
       * @param context {String} (default: "format") intended context.
       *       Possible values: "format", "stand-alone"
       * @param withFallback {Boolean?} if true, the previous parameter's other value is tried
       * in order to find a localized name for the day
       * @return {String} localized day name
       */
      getDayName: function getDayName(length, day, locale, context, withFallback) {
        var context = context ? context : "format";
        {
          qx.core.Assert.assertInArray(length, ["abbreviated", "narrow", "wide"]);
          qx.core.Assert.assertInteger(day);
          qx.core.Assert.assertInRange(day, 0, 6);
          qx.core.Assert.assertInArray(context, ["format", "stand-alone"]);
        }
        var days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
        var key = "cldr_day_" + context + "_" + length + "_" + days[day];
        return withFallback ? this.__localizeWithFallback__P_102_1(context, context === "format" ? "stand-alone" : "format", key, locale) : this.__mgr__P_102_0.localize(key, [], locale);
      },

      /**
       * Return localized names of month names
       *
       * @param length {String} format of the month names.
       *       Possible values: "abbreviated", "narrow", "wide"
       * @param locale {String} optional locale to be used
       * @param context {String} (default: "format") intended context.
       *       Possible values: "format", "stand-alone"
       * @param withFallback {Boolean?} if true, the previous parameter's other value is tried
       * in order to find a localized name for the month
       * @return {String[]} array of localized month names starting with january.
       */
      getMonthNames: function getMonthNames(length, locale, context, withFallback) {
        var context = context ? context : "format";
        {
          qx.core.Assert.assertInArray(length, ["abbreviated", "narrow", "wide"]);
          qx.core.Assert.assertInArray(context, ["format", "stand-alone"]);
        }
        var names = [];

        for (var i = 0; i < 12; i++) {
          var key = "cldr_month_" + context + "_" + length + "_" + (i + 1);
          names.push(withFallback ? this.__localizeWithFallback__P_102_1(context, context === "format" ? "stand-alone" : "format", key, locale) : this.__mgr__P_102_0.localize(key, [], locale));
        }

        return names;
      },

      /**
       * Return localized name of a month
       *
       * @param length {String} format of the month names.
       *       Possible values: "abbreviated", "narrow", "wide"
       * @param month {Integer} index of the month. 0=january, 1=february, ...
       * @param locale {String} optional locale to be used
       * @param context {String} (default: "format") intended context.
       *       Possible values: "format", "stand-alone"
       * @param withFallback {Boolean?} if true, the previous parameter's other value is tried
       * in order to find a localized name for the month
       * @return {String} localized month name
       */
      getMonthName: function getMonthName(length, month, locale, context, withFallback) {
        var context = context ? context : "format";
        {
          qx.core.Assert.assertInArray(length, ["abbreviated", "narrow", "wide"]);
          qx.core.Assert.assertInArray(context, ["format", "stand-alone"]);
        }
        var key = "cldr_month_" + context + "_" + length + "_" + (month + 1);
        return withFallback ? this.__localizeWithFallback__P_102_1(context, context === "format" ? "stand-alone" : "format", key, locale) : this.__mgr__P_102_0.localize(key, [], locale);
      },

      /**
       * Return localized date format string to be used with {@link qx.util.format.DateFormat}.
       *
       * @param size {String} format of the date format.
       *      Possible values: "short", "medium", "long", "full"
       * @param locale {String?} optional locale to be used
       * @return {String} localized date format string
       */
      getDateFormat: function getDateFormat(size, locale) {
        {
          qx.core.Assert.assertInArray(size, ["short", "medium", "long", "full"]);
        }
        var key = "cldr_date_format_" + size;
        return this.__mgr__P_102_0.localize(key, [], locale);
      },

      /**
       * Try to localize a date/time format string. For format string possibilities see
       * <a href="http://cldr.unicode.org/translation/date-time">Date/Time Symbol reference</a>
       * at CLDR - Unicode Common Locale Data Repository.
       *
       * If no localization is available take the fallback format string.
       *
       * @param canonical {String} format string containing only field information, and in a canonical order.
       *       Examples are "yyyyMMMM" for year + full month, or "MMMd" for abbreviated month + day.
       * @param fallback {String} fallback format string if no localized version is found
       * @param locale {String} optional locale to be used
       * @return {String} best matching format string
       */
      getDateTimeFormat: function getDateTimeFormat(canonical, fallback, locale) {
        var key = "cldr_date_time_format_" + canonical;

        var localizedFormat = this.__mgr__P_102_0.localize(key, [], locale);

        if (localizedFormat == key) {
          localizedFormat = fallback;
        }

        return localizedFormat;
      },

      /**
       * Return localized time format string to be used with {@link qx.util.format.DateFormat}.
       *
       * @param size {String} format of the time pattern.
       *      Possible values: "short", "medium", "long", "full"
       * @param locale {String} optional locale to be used
       * @return {String} localized time format string
       */
      getTimeFormat: function getTimeFormat(size, locale) {
        {
          qx.core.Assert.assertInArray(size, ["short", "medium", "long", "full"]);
        }
        var key = "cldr_time_format_" + size;

        var localizedFormat = this.__mgr__P_102_0.localize(key, [], locale);

        if (localizedFormat != key) {
          return localizedFormat;
        }

        switch (size) {
          case "short":
          case "medium":
            return qx.locale.Date.getDateTimeFormat("HHmm", "HH:mm");

          case "long":
            return qx.locale.Date.getDateTimeFormat("HHmmss", "HH:mm:ss");

          case "full":
            return qx.locale.Date.getDateTimeFormat("HHmmsszz", "HH:mm:ss zz");

          default:
            throw new Error("This case should never happen.");
        }
      },

      /**
       * Return the day the week starts with
       *
       * Reference: Common Locale Data Repository (cldr) supplementalData.xml
       *
       * @param locale {String} optional locale to be used
       * @return {Integer} index of the first day of the week. 0=sunday, 1=monday, ...
       */
      getWeekStart: function getWeekStart(locale) {
        var weekStart = {
          // default is monday
          MV: 5,
          // friday
          AE: 6,
          // saturday
          AF: 6,
          BH: 6,
          DJ: 6,
          DZ: 6,
          EG: 6,
          ER: 6,
          ET: 6,
          IQ: 6,
          IR: 6,
          JO: 6,
          KE: 6,
          KW: 6,
          LB: 6,
          LY: 6,
          MA: 6,
          OM: 6,
          QA: 6,
          SA: 6,
          SD: 6,
          SO: 6,
          TN: 6,
          YE: 6,
          AS: 0,
          // sunday
          AU: 0,
          AZ: 0,
          BW: 0,
          CA: 0,
          CN: 0,
          FO: 0,
          GE: 0,
          GL: 0,
          GU: 0,
          HK: 0,
          IE: 0,
          IL: 0,
          IS: 0,
          JM: 0,
          JP: 0,
          KG: 0,
          KR: 0,
          LA: 0,
          MH: 0,
          MN: 0,
          MO: 0,
          MP: 0,
          MT: 0,
          NZ: 0,
          PH: 0,
          PK: 0,
          SG: 0,
          TH: 0,
          TT: 0,
          TW: 0,
          UM: 0,
          US: 0,
          UZ: 0,
          VI: 0,
          ZA: 0,
          ZW: 0,
          MW: 0,
          NG: 0,
          TJ: 0
        };

        var territory = qx.locale.Date._getTerritory(locale); // default is monday


        return weekStart[territory] != null ? weekStart[territory] : 1;
      },

      /**
       * Return the day the weekend starts with
       *
       * Reference: Common Locale Data Repository (cldr) supplementalData.xml
       *
       * @param locale {String} optional locale to be used
       * @return {Integer} index of the first day of the weekend. 0=sunday, 1=monday, ...
       */
      getWeekendStart: function getWeekendStart(locale) {
        var weekendStart = {
          // default is saturday
          EG: 5,
          // friday
          IL: 5,
          SY: 5,
          IN: 0,
          // sunday
          AE: 4,
          // thursday
          BH: 4,
          DZ: 4,
          IQ: 4,
          JO: 4,
          KW: 4,
          LB: 4,
          LY: 4,
          MA: 4,
          OM: 4,
          QA: 4,
          SA: 4,
          SD: 4,
          TN: 4,
          YE: 4
        };

        var territory = qx.locale.Date._getTerritory(locale); // default is saturday


        return weekendStart[territory] != null ? weekendStart[territory] : 6;
      },

      /**
       * Return the day the weekend ends with
       *
       * Reference: Common Locale Data Repository (cldr) supplementalData.xml
       *
       * @param locale {String} optional locale to be used
       * @return {Integer} index of the last day of the weekend. 0=sunday, 1=monday, ...
       */
      getWeekendEnd: function getWeekendEnd(locale) {
        var weekendEnd = {
          // default is sunday
          AE: 5,
          // friday
          BH: 5,
          DZ: 5,
          IQ: 5,
          JO: 5,
          KW: 5,
          LB: 5,
          LY: 5,
          MA: 5,
          OM: 5,
          QA: 5,
          SA: 5,
          SD: 5,
          TN: 5,
          YE: 5,
          AF: 5,
          IR: 5,
          EG: 6,
          // saturday
          IL: 6,
          SY: 6
        };

        var territory = qx.locale.Date._getTerritory(locale); // default is sunday


        return weekendEnd[territory] != null ? weekendEnd[territory] : 0;
      },

      /**
       * Returns whether a certain day of week belongs to the week end.
       *
       * @param day {Integer} index of the day. 0=sunday, 1=monday, ...
       * @param locale {String} optional locale to be used
       * @return {Boolean} whether the given day is a weekend day
       */
      isWeekend: function isWeekend(day, locale) {
        var weekendStart = qx.locale.Date.getWeekendStart(locale);
        var weekendEnd = qx.locale.Date.getWeekendEnd(locale);

        if (weekendEnd > weekendStart) {
          return day >= weekendStart && day <= weekendEnd;
        } else {
          return day >= weekendStart || day <= weekendEnd;
        }
      },

      /**
       * Extract the territory part from a locale
       *
       * @param locale {String} the locale
       * @return {String} territory
       */
      _getTerritory: function _getTerritory(locale) {
        if (locale) {
          var territory = locale.split("_")[1] || locale;
        } else {
          territory = this.__mgr__P_102_0.getTerritory() || this.__mgr__P_102_0.getLanguage();
        }

        return territory.toUpperCase();
      },

      /**
       * Provide localization (CLDR) data with fallback between "format" and "stand-alone" contexts.
       * It is used in {@link #getDayName} and {@link #getMonthName} methods.
       *
       * @param context {String} intended context.
       *       Possible values: "format", "stand-alone".
       * @param fallbackContext {String} the context used in case no localization is found for the key.
       * @param key {String} message id (may contain format strings)
       * @param locale {String} the locale
       * @return {String} localized name for the key
       *
       */
      __localizeWithFallback__P_102_1: function __localizeWithFallback__P_102_1(context, fallbackContext, key, locale) {
        var localizedString = this.__mgr__P_102_0.localize(key, [], locale);

        if (localizedString == key) {
          var newKey = key.replace("_" + context + "_", "_" + fallbackContext + "_");
          return this.__mgr__P_102_0.localize(newKey, [], locale);
        } else {
          return localizedString;
        }
      }
    }
  });
  qx.locale.Date.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.util.Uri": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Tristan Koch (tristankoch)
       * Richard Sternagel (rsternagel)
  
  ************************************************************************ */

  /**
   * Static helpers for handling HTTP requests.
   */
  qx.Bootstrap.define("qx.util.Request", {
    statics: {
      /**
       * Whether URL given points to resource that is cross-domain,
       * i.e. not of same origin.
       *
       * @param url {String} URL.
       * @return {Boolean} Whether URL is cross domain.
       */
      isCrossDomain: function isCrossDomain(url) {
        var result = qx.util.Uri.parseUri(url),
            location = window.location;

        if (!location) {
          return false;
        }

        var protocol = location.protocol; // URL is relative in the sense that it points to origin host

        if (!(url.indexOf("//") !== -1)) {
          return false;
        }

        if (protocol.substr(0, protocol.length - 1) == result.protocol && location.host === result.authority && location.port === result.port) {
          return false;
        }

        return true;
      },

      /**
       * Determine if given HTTP status is considered successful.
       *
       * @param status {Number} HTTP status.
       * @return {Boolean} Whether status is considered successful.
       */
      isSuccessful: function isSuccessful(status) {
        return status >= 200 && status < 300 || status === 304;
      },

      /**
       * Determine if given HTTP method is valid.
       *
       * @param method {String} HTTP method.
       * @return {Boolean} Whether method is a valid HTTP method.
       */
      isMethod: function isMethod(method) {
        var knownMethods = ["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS", "TRACE", "CONNECT", "PATCH"];
        return knownMethods.indexOf(method) !== -1 ? true : false;
      },

      /**
       * Request body is ignored for HTTP method GET and HEAD.
       *
       * See http://www.w3.org/TR/XMLHttpRequest2/#the-send-method.
       *
       * @param method {String} The HTTP method.
       * @return {Boolean} Whether request may contain body.
       */
      methodAllowsRequestBody: function methodAllowsRequestBody(method) {
        return !/^(GET|HEAD)$/.test(method);
      }
    }
  });
  qx.util.Request.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.util.PropertyUtil": {},
      "qx.lang.String": {},
      "qx.lang.Type": {},
      "qx.core.Object": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ***********************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2009 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * This is an util class responsible for serializing qooxdoo objects.
   *
   * @ignore(qx.data, qx.data.IListData)
   * @ignore(qx.locale, qx.locale.LocalizedString)
   */
  qx.Class.define("qx.util.Serializer", {
    statics: {
      /**
       * Serializes the properties of the given qooxdoo object. To get the
       * serialization working, every property needs to have a string
       * representation because the value of the property will be concatenated to the
       * serialized string.
       *
       * @param object {qx.core.Object} Any qooxdoo object
       * @param qxSerializer {Function?} Function used for serializing qooxdoo
       *   objects stored in the properties of the object. Check for the type of
       *   classes <ou want to serialize and return the serialized value. In all
       *   other cases, just return nothing.
       * @param dateFormat {qx.util.format.DateFormat?} If a date formater is given,
       *   the format method of this given formater is used to convert date
       *   objects into strings.
       * @return {String} The serialized object.
       */
      toUriParameter: function toUriParameter(object, qxSerializer, dateFormat) {
        var result = "";
        var properties = qx.util.PropertyUtil.getAllProperties(object.constructor);

        for (var name in properties) {
          // ignore property groups
          if (properties[name].group != undefined) {
            continue;
          }

          var value = object["get" + qx.lang.String.firstUp(name)](); // handle arrays

          if (qx.lang.Type.isArray(value)) {
            var isdataArray = qx.data && qx.data.IListData && qx.Class.hasInterface(value && value.constructor, qx.data.IListData);

            for (var i = 0; i < value.length; i++) {
              var valueAtI = isdataArray ? value.getItem(i) : value[i];
              result += this.__toUriParameter__P_57_0(name, valueAtI, qxSerializer);
            }
          } else if (qx.lang.Type.isDate(value) && dateFormat != null) {
            result += this.__toUriParameter__P_57_0(name, dateFormat.format(value), qxSerializer);
          } else {
            result += this.__toUriParameter__P_57_0(name, value, qxSerializer);
          }
        }

        return result.substring(0, result.length - 1);
      },

      /**
       * Helper method for {@link #toUriParameter}. Check for qooxdoo objects
       * and returns the serialized name value pair for the given parameter.
       *
       * @param name {String} The name of the value
       * @param value {var} The value itself
       * @param qxSerializer {Function?} The serializer for qooxdoo objects.
       * @return {String} The serialized name value pair.
       */
      __toUriParameter__P_57_0: function __toUriParameter__P_57_0(name, value, qxSerializer) {
        if (value && value.$$type == "Class") {
          value = value.classname;
        }

        if (value && (value.$$type == "Interface" || value.$$type == "Mixin")) {
          value = value.name;
        }

        if (value instanceof qx.core.Object && qxSerializer != null) {
          var encValue = encodeURIComponent(qxSerializer(value));

          if (encValue === undefined) {
            var encValue = encodeURIComponent(value);
          }
        } else {
          var encValue = encodeURIComponent(value);
        }

        return encodeURIComponent(name) + "=" + encValue + "&";
      },

      /**
       * Serializes the properties of the given qooxdoo object into a native
       * object.
       *
       * @param object {qx.core.Object}
       *   Any qooxdoo object
       *
       * @param qxSerializer {Function?}
       *   Function used for serializing qooxdoo objects stored in the properties
       *   of the object. Check for the type of classes you want to serialize
       *   and return the serialized value. In all other cases, just return
       *   nothing.
       * @param dateFormat {qx.util.format.DateFormat?} If a date formater is given,
       *   the format method of this given formater is used to convert date
       *   objects into strings.
       * @return {null|Array|String|Object}
       *   The serialized object. Depending on the input qooxdoo object, the returning
       *   type will vary.
       */
      toNativeObject: function toNativeObject(object, qxSerializer, dateFormat) {
        var result; // null or undefined

        if (object == null) {
          return null;
        } // data array


        if (qx.data && qx.data.IListData && qx.Class.hasInterface(object.constructor, qx.data.IListData)) {
          result = [];

          for (var i = 0; i < object.getLength(); i++) {
            result.push(qx.util.Serializer.toNativeObject(object.getItem(i), qxSerializer, dateFormat));
          }

          return result;
        } // other arrays


        if (qx.lang.Type.isArray(object)) {
          result = [];

          for (var i = 0; i < object.length; i++) {
            result.push(qx.util.Serializer.toNativeObject(object[i], qxSerializer, dateFormat));
          }

          return result;
        } // return names for qooxdoo classes


        if (object.$$type == "Class") {
          return object.classname;
        } // return names for qooxdoo interfaces and mixins


        if (object.$$type == "Interface" || object.$$type == "Mixin") {
          return object.name;
        } // qooxdoo object


        if (object instanceof qx.core.Object) {
          if (qxSerializer != null) {
            var returnValue = qxSerializer(object); // if we have something returned, return that

            if (returnValue != undefined) {
              return returnValue;
            } // continue otherwise

          }

          result = {};
          var properties = qx.util.PropertyUtil.getAllProperties(object.constructor);

          for (var name in properties) {
            // ignore property groups
            if (properties[name].group != undefined) {
              continue;
            }

            var value = object["get" + qx.lang.String.firstUp(name)]();
            result[name] = qx.util.Serializer.toNativeObject(value, qxSerializer, dateFormat);
          }

          return result;
        } // date objects with date format


        if (qx.lang.Type.isDate(object) && dateFormat != null) {
          return dateFormat.format(object);
        } // localized strings


        if (qx.locale && qx.locale.LocalizedString && object instanceof qx.locale.LocalizedString) {
          return object.toString();
        } // JavaScript objects


        if (qx.lang.Type.isObject(object)) {
          result = {};

          for (var key in object) {
            result[key] = qx.util.Serializer.toNativeObject(object[key], qxSerializer, dateFormat);
          }

          return result;
        } // all other stuff, including String, Date, RegExp


        return object;
      },

      /**
       * Serializes the properties of the given qooxdoo object into a json object.
       *
       * @param object {qx.core.Object} Any qooxdoo object
       * @param qxSerializer {Function?} Function used for serializing qooxdoo
       *   objects stored in the properties of the object. Check for the type of
       *   classes you want to serialize and return the serialized value. In all
       *   other cases, just return nothing.
       * @param dateFormat {qx.util.format.DateFormat?} If a date formater is given,
       *   the format method of this given formater is used to convert date
       *   objects into strings.
       * @return {String} The serialized object.
       */
      toJson: function toJson(object, qxSerializer, dateFormat) {
        var result = ""; // null or undefined

        if (object == null) {
          return "null";
        } // data array


        if (qx.data && qx.data.IListData && qx.Class.hasInterface(object.constructor, qx.data.IListData)) {
          result += "[";

          for (var i = 0; i < object.getLength(); i++) {
            result += qx.util.Serializer.toJson(object.getItem(i), qxSerializer, dateFormat) + ",";
          }

          if (result != "[") {
            result = result.substring(0, result.length - 1);
          }

          return result + "]";
        } // other arrays


        if (qx.lang.Type.isArray(object)) {
          result += "[";

          for (var i = 0; i < object.length; i++) {
            result += qx.util.Serializer.toJson(object[i], qxSerializer, dateFormat) + ",";
          }

          if (result != "[") {
            result = result.substring(0, result.length - 1);
          }

          return result + "]";
        } // return names for qooxdoo classes


        if (object.$$type == "Class") {
          return '"' + object.classname + '"';
        } // return names for qooxdoo interfaces and mixins


        if (object.$$type == "Interface" || object.$$type == "Mixin") {
          return '"' + object.name + '"';
        } // qooxdoo object


        if (object instanceof qx.core.Object) {
          if (qxSerializer != null) {
            var returnValue = qxSerializer(object); // if we have something returned, return that

            if (returnValue != undefined) {
              return '"' + returnValue + '"';
            } // continue otherwise

          }

          result += "{";
          var properties = qx.util.PropertyUtil.getAllProperties(object.constructor);

          for (var name in properties) {
            // ignore property groups
            if (properties[name].group != undefined) {
              continue;
            }

            var value = object["get" + qx.lang.String.firstUp(name)]();
            result += '"' + name + '":' + qx.util.Serializer.toJson(value, qxSerializer, dateFormat) + ",";
          }

          if (result != "{") {
            result = result.substring(0, result.length - 1);
          }

          return result + "}";
        } // localized strings


        if (qx.locale && qx.locale.LocalizedString && object instanceof qx.locale.LocalizedString) {
          object = object.toString(); // no return here because we want to have the string checks as well!
        } // date objects with formater


        if (qx.lang.Type.isDate(object) && dateFormat != null) {
          return '"' + dateFormat.format(object) + '"';
        } // javascript objects


        if (qx.lang.Type.isObject(object)) {
          result += "{";

          for (var key in object) {
            result += '"' + key + '":' + qx.util.Serializer.toJson(object[key], qxSerializer, dateFormat) + ",";
          }

          if (result != "{") {
            result = result.substring(0, result.length - 1);
          }

          return result + "}";
        } // strings


        if (qx.lang.Type.isString(object)) {
          // escape
          object = object.replace(/([\\])/g, "\\\\");
          object = object.replace(/(["])/g, '\\"');
          object = object.replace(/([\r])/g, "\\r");
          object = object.replace(/([\f])/g, "\\f");
          object = object.replace(/([\n])/g, "\\n");
          object = object.replace(/([\t])/g, "\\t");
          object = object.replace(/([\b])/g, "\\b");
          return '"' + object + '"';
        } // Date and RegExp


        if (qx.lang.Type.isDate(object) || qx.lang.Type.isRegExp(object)) {
          return '"' + object + '"';
        } // all other stuff


        return object + "";
      }
    }
  });
  qx.util.Serializer.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Bootstrap": {
        "usage": "dynamic",
        "construct": true,
        "require": true
      },
      "qx.core.IDisposable": {
        "require": true
      },
      "qx.event.Emitter": {
        "construct": true
      },
      "qx.bom.request.Script": {
        "require": true
      },
      "qx.util.Request": {},
      "qx.bom.client.Engine": {
        "require": true
      },
      "qx.bom.client.Browser": {
        "require": true
      },
      "qx.bom.client.Transport": {
        "require": true
      }
    },
    "environment": {
      "provided": ["qx.debug.io"],
      "required": {
        "qx.debug.io": {
          "className": "qx.bom.request.Script"
        },
        "engine.name": {
          "className": "qx.bom.client.Engine"
        },
        "browser.documentmode": {
          "className": "qx.bom.client.Browser"
        },
        "engine.version": {
          "className": "qx.bom.client.Engine"
        },
        "io.xhr": {
          "className": "qx.bom.client.Transport"
        },
        "browser.version": {
          "className": "qx.bom.client.Browser"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Tristan Koch (tristankoch)
  
  ************************************************************************ */

  /**
   * A wrapper of the XMLHttpRequest host object (or equivalent). The interface is
   * similar to <a href="http://www.w3.org/TR/XMLHttpRequest/">XmlHttpRequest</a>.
   *
   * Hides browser inconsistencies and works around bugs found in popular
   * implementations.
   *
   * <div class="desktop">
   * Example:
   *
   * <pre class="javascript">
   *  var req = new qx.bom.request.Xhr();
   *  req.onload = function() {
   *    // Handle data received
   *    req.responseText;
   *  }
   *
   *  req.open("GET", url);
   *  req.send();
   * </pre>
   *
   * Example for binary data:
   *
   * <pre class="javascript">
   *  var req = new qx.bom.request.Xhr();
   *  req.onload = function() {
   *    // Handle data received
   *    var blob = req.response;
   *    img.src = URL.createObjectURL(blob);
   *  }
   *
   *  req.open("GET", url);
   *  req.responseType = "blob";
   *  req.send();
   * </pre>
  
   * </div>
   *
   * @ignore(XDomainRequest)
   * @ignore(qx.event, qx.event.GlobalError.*)
   *
   * @require(qx.bom.request.Xhr#open)
   * @require(qx.bom.request.Xhr#send)
   * @require(qx.bom.request.Xhr#on)
   * @require(qx.bom.request.Xhr#onreadystatechange)
   * @require(qx.bom.request.Xhr#onload)
   * @require(qx.bom.request.Xhr#onloadend)
   * @require(qx.bom.request.Xhr#onerror)
   * @require(qx.bom.request.Xhr#onabort)
   * @require(qx.bom.request.Xhr#ontimeout)
   * @require(qx.bom.request.Xhr#setRequestHeader)
   * @require(qx.bom.request.Xhr#getAllResponseHeaders)
   * @require(qx.bom.request.Xhr#getRequest)
   * @require(qx.bom.request.Xhr#overrideMimeType)
   * @require(qx.bom.request.Xhr#dispose)
   * @require(qx.bom.request.Xhr#isDisposed)
   *
   * @group (IO)
   */
  qx.Bootstrap.define("qx.bom.request.Xhr", {
    extend: Object,
    implement: [qx.core.IDisposable],
    construct: function construct() {
      var boundFunc = qx.Bootstrap.bind(this.__onNativeReadyStateChange__P_109_0, this); // GlobalError shouldn't be included in qx.Website builds so use it
      // if it's available but otherwise ignore it (see ignore stated above).

      if (qx.event && qx.event.GlobalError && qx.event.GlobalError.observeMethod) {
        this.__onNativeReadyStateChangeBound__P_109_1 = qx.event.GlobalError.observeMethod(boundFunc);
      } else {
        this.__onNativeReadyStateChangeBound__P_109_1 = boundFunc;
      }

      this.__onNativeAbortBound__P_109_2 = qx.Bootstrap.bind(this.__onNativeAbort__P_109_3, this);
      this.__onNativeProgressBound__P_109_4 = qx.Bootstrap.bind(this.__onNativeProgress__P_109_5, this);
      this.__onTimeoutBound__P_109_6 = qx.Bootstrap.bind(this.__onTimeout__P_109_7, this);

      this.__initNativeXhr__P_109_8();

      this._emitter = new qx.event.Emitter(); // BUGFIX: IE
      // IE keeps connections alive unless aborted on unload

      if (window.attachEvent) {
        this.__onUnloadBound__P_109_9 = qx.Bootstrap.bind(this.__onUnload__P_109_10, this);
        window.attachEvent("onunload", this.__onUnloadBound__P_109_9);
      }
    },
    statics: {
      UNSENT: 0,
      OPENED: 1,
      HEADERS_RECEIVED: 2,
      LOADING: 3,
      DONE: 4
    },
    events: {
      /** Fired at ready state changes. */
      readystatechange: "qx.bom.request.Xhr",

      /** Fired on error. */
      error: "qx.bom.request.Xhr",

      /** Fired at loadend. */
      loadend: "qx.bom.request.Xhr",

      /** Fired on timeouts. */
      timeout: "qx.bom.request.Xhr",

      /** Fired when the request is aborted. */
      abort: "qx.bom.request.Xhr",

      /** Fired on successful retrieval. */
      load: "qx.bom.request.Xhr",

      /** Fired on progress. */
      progress: "qx.bom.request.Xhr"
    },
    members: {
      /*
      ---------------------------------------------------------------------------
        PUBLIC
      ---------------------------------------------------------------------------
      */

      /**
       * @type {Number} Ready state.
       *
       * States can be:
       * UNSENT:           0,
       * OPENED:           1,
       * HEADERS_RECEIVED: 2,
       * LOADING:          3,
       * DONE:             4
       */
      readyState: 0,

      /**
       * @type {String} The response of the request as text.
       */
      responseText: "",

      /**
       * @type {Object} The response of the request as a Document object.
       */
      response: null,

      /**
       * @type {Object} The response of the request as object.
       */
      responseXML: null,

      /**
       * @type {Number} The HTTP status code.
       */
      status: 0,

      /**
       * @type {String} The HTTP status text.
       */
      statusText: "",

      /**
       * @type {String} The response Type to use in the request
       */
      responseType: "",

      /**
       * @type {Number} Timeout limit in milliseconds.
       *
       * 0 (default) means no timeout. Not supported for synchronous requests.
       */
      timeout: 0,

      /**
       * @type {Object} Wrapper to store data of the progress event which contains the keys
         <code>lengthComputable</code>, <code>loaded</code> and <code>total</code>
       */
      progress: null,

      /**
       * Initializes (prepares) request.
       *
       * @ignore(XDomainRequest)
       *
       * @param method {String?"GET"}
       *  The HTTP method to use.
       * @param url {String}
       *  The URL to which to send the request.
       * @param async {Boolean?true}
       *  Whether or not to perform the operation asynchronously.
       * @param user {String?null}
       *  Optional user name to use for authentication purposes.
       * @param password {String?null}
       *  Optional password to use for authentication purposes.
       */
      open: function open(method, url, async, user, password) {
        this.__checkDisposed__P_109_11(); // Mimick native behavior


        if (typeof url === "undefined") {
          throw new Error("Not enough arguments");
        } else if (typeof method === "undefined") {
          method = "GET";
        } // Reset flags that may have been set on previous request


        this.__abort__P_109_12 = false;
        this.__send__P_109_13 = false;
        this.__conditional__P_109_14 = false; // Store URL for later checks

        this.__url__P_109_15 = url;

        if (typeof async == "undefined") {
          async = true;
        }

        this.__async__P_109_16 = async; // Default values according to spec.

        this.status = 0;
        this.statusText = this.responseText = "";
        this.responseXML = null;
        this.response = null; // BUGFIX
        // IE < 9 and FF < 3.5 cannot reuse the native XHR to issue many requests

        if (!this.__supportsManyRequests__P_109_17() && this.readyState > qx.bom.request.Xhr.UNSENT) {
          // XmlHttpRequest Level 1 requires open() to abort any pending requests
          // associated to the object. Since we're dealing with a new object here,
          // we have to emulate this behavior. Moreover, allow old native XHR to be garbage collected
          //
          // Dispose and abort.
          //
          this.dispose(); // Replace the underlying native XHR with a new one that can
          // be used to issue new requests.

          this.__initNativeXhr__P_109_8();
        } // Restore handler in case it was removed before


        this.__nativeXhr__P_109_18.onreadystatechange = this.__onNativeReadyStateChangeBound__P_109_1;

        try {
          if (qx.core.Environment.get("qx.debug.io")) {
            qx.Bootstrap.debug(qx.bom.request.Xhr, "Open native request with method: " + method + ", url: " + url + ", async: " + async);
          }

          this.__nativeXhr__P_109_18.open(method, url, async, user, password); // BUGFIX: IE, Firefox < 3.5
          // Some browsers do not support Cross-Origin Resource Sharing (CORS)
          // for XMLHttpRequest. Instead, an exception is thrown even for async requests
          // if URL is cross-origin (as per XHR level 1). Use the proprietary XDomainRequest
          // if available (supports CORS) and handle error (if there is one) this
          // way. Otherwise just assume network error.
          //
          // Basically, this allows to detect network errors.

        } catch (OpenError) {
          // Only work around exceptions caused by cross domain request attempts
          if (!qx.util.Request.isCrossDomain(url)) {
            // Is same origin
            throw OpenError;
          }

          if (!this.__async__P_109_16) {
            this.__openError__P_109_19 = OpenError;
          }

          if (this.__async__P_109_16) {
            // Try again with XDomainRequest
            // (Success case not handled on purpose)
            // - IE 9
            if (window.XDomainRequest) {
              this.readyState = 4;
              this.__nativeXhr__P_109_18 = new window.XDomainRequest();
              this.__nativeXhr__P_109_18.onerror = qx.Bootstrap.bind(function () {
                this._emit("readystatechange");

                this._emit("error");

                this._emit("loadend");
              }, this);

              if (qx.core.Environment.get("qx.debug.io")) {
                qx.Bootstrap.debug(qx.bom.request.Xhr, "Retry open native request with method: " + method + ", url: " + url + ", async: " + async);
              }

              this.__nativeXhr__P_109_18.open(method, url, async, user, password);

              return;
            } // Access denied
            // - IE 6: -2146828218
            // - IE 7: -2147024891
            // - Legacy Firefox


            window.setTimeout(qx.Bootstrap.bind(function () {
              if (this.__disposed__P_109_20) {
                return;
              }

              this.readyState = 4;

              this._emit("readystatechange");

              this._emit("error");

              this._emit("loadend");
            }, this));
          }
        } // BUGFIX: IE < 9
        // IE < 9 tends to cache overly aggressive. This may result in stale
        // representations. Force validating freshness of cached representation.


        if (qx.core.Environment.get("engine.name") === "mshtml" && qx.core.Environment.get("browser.documentmode") < 9 && this.__nativeXhr__P_109_18.readyState > 0) {
          this.__nativeXhr__P_109_18.setRequestHeader("If-Modified-Since", "-1");
        } // BUGFIX: Firefox
        // Firefox < 4 fails to trigger onreadystatechange OPENED for sync requests


        if (qx.core.Environment.get("engine.name") === "gecko" && parseInt(qx.core.Environment.get("engine.version"), 10) < 2 && !this.__async__P_109_16) {
          // Native XHR is already set to readyState DONE. Fake readyState
          // and call onreadystatechange manually.
          this.readyState = qx.bom.request.Xhr.OPENED;

          this._emit("readystatechange");
        }
      },

      /**
       * Sets an HTTP request header to be used by the request.
       *
       * Note: The request must be initialized before using this method.
       *
       * @param key {String}
       *  The name of the header whose value is to be set.
       * @param value {String}
       *  The value to set as the body of the header.
       * @return {qx.bom.request.Xhr} Self for chaining.
       */
      setRequestHeader: function setRequestHeader(key, value) {
        this.__checkDisposed__P_109_11(); // Detect conditional requests


        if (key == "If-Match" || key == "If-Modified-Since" || key == "If-None-Match" || key == "If-Range") {
          this.__conditional__P_109_14 = true;
        }

        this.__nativeXhr__P_109_18.setRequestHeader(key, value);

        return this;
      },

      /**
       * Sends request.
       *
       * @param data {String|Document?null}
       *  Optional data to send.
       * @return {qx.bom.request.Xhr} Self for chaining.
       */
      send: function send(data) {
        this.__checkDisposed__P_109_11(); // BUGFIX: IE & Firefox < 3.5
        // For sync requests, some browsers throw error on open()
        // while it should be on send()
        //


        if (!this.__async__P_109_16 && this.__openError__P_109_19) {
          throw this.__openError__P_109_19;
        } // BUGFIX: Opera
        // On network error, Opera stalls at readyState HEADERS_RECEIVED
        // This violates the spec. See here http://www.w3.org/TR/XMLHttpRequest2/#send
        // (Section: If there is a network error)
        //
        // To fix, assume a default timeout of 10 seconds. Note: The "error"
        // event will be fired correctly, because the error flag is inferred
        // from the statusText property. Of course, compared to other
        // browsers there is an additional call to ontimeout(), but this call
        // should not harm.
        //


        if (qx.core.Environment.get("engine.name") === "opera" && this.timeout === 0) {
          this.timeout = 10000;
        } // Timeout


        if (this.timeout > 0) {
          this.__timerId__P_109_21 = window.setTimeout(this.__onTimeoutBound__P_109_6, this.timeout);
        } // BUGFIX: Firefox 2
        // "NS_ERROR_XPC_NOT_ENOUGH_ARGS" when calling send() without arguments


        data = typeof data == "undefined" ? null : data; // Whitelisting the allowed data types regarding the spec
        // -> http://www.w3.org/TR/XMLHttpRequest2/#the-send-method
        // All other data input will be transformed to a string to e.g. prevent
        // an SendError in Firefox (at least <= 31) and to harmonize it with the
        // behaviour of all other browsers (Chrome, IE and Safari)

        var dataType = qx.Bootstrap.getClass(data);
        data = data !== null && this.__dataTypeWhiteList__P_109_22.indexOf(dataType) === -1 ? data.toString() : data; // Some browsers may throw an error when sending of async request fails.
        // This violates the spec which states only sync requests should.

        try {
          if (qx.core.Environment.get("qx.debug.io")) {
            qx.Bootstrap.debug(qx.bom.request.Xhr, "Send native request");
          }

          if (this.__async__P_109_16) {
            this.__nativeXhr__P_109_18.responseType = this.responseType;
          }

          this.__nativeXhr__P_109_18.send(data);
        } catch (SendError) {
          if (!this.__async__P_109_16) {
            throw SendError;
          } // BUGFIX
          // Some browsers throws error when file not found via file:// protocol.
          // Synthesize readyState changes.


          if (this._getProtocol() === "file:") {
            this.readyState = 2;

            this.__readyStateChange__P_109_23();

            var that = this;
            window.setTimeout(function () {
              if (that.__disposed__P_109_20) {
                return;
              }

              that.readyState = 3;

              that.__readyStateChange__P_109_23();

              that.readyState = 4;

              that.__readyStateChange__P_109_23();
            });
          }
        } // BUGFIX: Firefox
        // Firefox fails to trigger onreadystatechange DONE for sync requests


        if (qx.core.Environment.get("engine.name") === "gecko" && !this.__async__P_109_16) {
          // Properties all set, only missing native readystatechange event
          this.__onNativeReadyStateChange__P_109_0();
        } // Set send flag


        this.__send__P_109_13 = true;
        return this;
      },

      /**
       * Abort request - i.e. cancels any network activity.
       *
       * Note:
       *  On Windows 7 every browser strangely skips the loading phase
       *  when this method is called (because readyState never gets 3).
       *
       *  So keep this in mind if you rely on the phases which are
       *  passed through. They will be "opened", "sent", "abort"
       *  instead of normally "opened", "sent", "loading", "abort".
       *
       * @return {qx.bom.request.Xhr} Self for chaining.
       */
      abort: function abort() {
        this.__checkDisposed__P_109_11();

        this.__abort__P_109_12 = true;

        this.__nativeXhr__P_109_18.abort();

        if (this.__nativeXhr__P_109_18 && this.readyState !== qx.bom.request.Xhr.DONE) {
          this.readyState = this.__nativeXhr__P_109_18.readyState;
        }

        return this;
      },

      /**
       * Helper to emit events and call the callback methods.
       * @param event {String} The name of the event.
       */
      _emit: function _emit(event) {
        if (this["on" + event]) {
          this["on" + event]();
        }

        this._emitter.emit(event, this);
      },

      /**
       * Event handler for XHR event that fires at every state change.
       *
       * Replace with custom method to get informed about the communication progress.
       */
      onreadystatechange: function onreadystatechange() {},

      /**
       * Event handler for XHR event "load" that is fired on successful retrieval.
       *
       * Note: This handler is called even when the HTTP status indicates an error.
       *
       * Replace with custom method to listen to the "load" event.
       */
      onload: function onload() {},

      /**
       * Event handler for XHR event "loadend" that is fired on retrieval.
       *
       * Note: This handler is called even when a network error (or similar)
       * occurred.
       *
       * Replace with custom method to listen to the "loadend" event.
       */
      onloadend: function onloadend() {},

      /**
       * Event handler for XHR event "error" that is fired on a network error.
       *
       * Replace with custom method to listen to the "error" event.
       */
      onerror: function onerror() {},

      /**
       * Event handler for XHR event "abort" that is fired when request
       * is aborted.
       *
       * Replace with custom method to listen to the "abort" event.
       */
      onabort: function onabort() {},

      /**
       * Event handler for XHR event "timeout" that is fired when timeout
       * interval has passed.
       *
       * Replace with custom method to listen to the "timeout" event.
       */
      ontimeout: function ontimeout() {},

      /**
       * Event handler for XHR event "progress".
       *
       * Replace with custom method to listen to the "progress" event.
       */
      onprogress: function onprogress() {},

      /**
       * Add an event listener for the given event name.
       *
       * @param name {String} The name of the event to listen to.
       * @param listener {Function} The function to execute when the event is fired
       * @param ctx {var?} The context of the listener.
       * @return {qx.bom.request.Xhr} Self for chaining.
       */
      on: function on(name, listener, ctx) {
        this._emitter.on(name, listener, ctx);

        return this;
      },

      /**
       * Get a single response header from response.
       *
       * @param header {String}
       *  Key of the header to get the value from.
       * @return {String}
       *  Response header.
       */
      getResponseHeader: function getResponseHeader(header) {
        this.__checkDisposed__P_109_11();

        if (qx.core.Environment.get("browser.documentmode") === 9 && this.__nativeXhr__P_109_18.aborted) {
          return "";
        }

        return this.__nativeXhr__P_109_18.getResponseHeader(header);
      },

      /**
       * Get all response headers from response.
       *
       * @return {String} All response headers.
       */
      getAllResponseHeaders: function getAllResponseHeaders() {
        this.__checkDisposed__P_109_11();

        if (qx.core.Environment.get("browser.documentmode") === 9 && this.__nativeXhr__P_109_18.aborted) {
          return "";
        }

        return this.__nativeXhr__P_109_18.getAllResponseHeaders();
      },

      /**
       * Overrides the MIME type returned by the server
       * and must be called before @send()@.
       *
       * Note:
       *
       * * IE doesn't support this method so in this case an Error is thrown.
       * * after calling this method @getResponseHeader("Content-Type")@
       *   may return the original (Firefox 23, IE 10, Safari 6) or
       *   the overridden content type (Chrome 28+, Opera 15+).
       *
       *
       * @param mimeType {String} The mimeType for overriding.
       * @return {qx.bom.request.Xhr} Self for chaining.
       */
      overrideMimeType: function overrideMimeType(mimeType) {
        this.__checkDisposed__P_109_11();

        if (this.__nativeXhr__P_109_18.overrideMimeType) {
          this.__nativeXhr__P_109_18.overrideMimeType(mimeType);
        } else {
          throw new Error("Native XHR object doesn't support overrideMimeType.");
        }

        return this;
      },

      /**
       * Get wrapped native XMLHttpRequest (or equivalent).
       *
       * Can be XMLHttpRequest or ActiveX.
       *
       * @return {Object} XMLHttpRequest or equivalent.
       */
      getRequest: function getRequest() {
        return this.__nativeXhr__P_109_18;
      },

      /*
      ---------------------------------------------------------------------------
        HELPER
      ---------------------------------------------------------------------------
      */

      /**
       * Dispose object and wrapped native XHR.
       * @return {Boolean} <code>true</code> if the object was successfully disposed
       */
      dispose: function dispose() {
        if (this.__disposed__P_109_20) {
          return false;
        }

        window.clearTimeout(this.__timerId__P_109_21); // Remove unload listener in IE. Aborting on unload is no longer required
        // for this instance.

        if (window.detachEvent) {
          window.detachEvent("onunload", this.__onUnloadBound__P_109_9);
        } // May fail in IE


        try {
          this.__nativeXhr__P_109_18.onreadystatechange;
        } catch (PropertiesNotAccessable) {
          return false;
        } // Clear out listeners


        var noop = function noop() {};

        this.__nativeXhr__P_109_18.onreadystatechange = noop;
        this.__nativeXhr__P_109_18.onload = noop;
        this.__nativeXhr__P_109_18.onerror = noop;
        this.__nativeXhr__P_109_18.onprogress = noop; // Abort any network activity

        this.abort(); // Remove reference to native XHR

        this.__nativeXhr__P_109_18 = null;
        this.responseText = null;
        this.__disposed__P_109_20 = true;
        return true;
      },

      /**
       * Check if the request has already beed disposed.
       * @return {Boolean} <code>true</code>, if the request has been disposed.
       */
      isDisposed: function isDisposed() {
        return !!this.__disposed__P_109_20;
      },

      /*
      ---------------------------------------------------------------------------
        PROTECTED
      ---------------------------------------------------------------------------
      */

      /**
       * Create XMLHttpRequest (or equivalent).
       *
       * @return {Object} XMLHttpRequest or equivalent.
       *
       * @ignore(XMLHttpRequest)
       */
      _createNativeXhr: function _createNativeXhr() {
        var xhr = qx.core.Environment.get("io.xhr");

        if (xhr === "xhr") {
          return new XMLHttpRequest();
        }

        if (xhr == "activex") {
          return new window.ActiveXObject("Microsoft.XMLHTTP");
        }

        qx.Bootstrap.error(this, "No XHR support available.");
      },

      /**
       * Get protocol of requested URL.
       *
       * @return {String} The used protocol.
       */
      _getProtocol: function _getProtocol() {
        var url = this.__url__P_109_15;
        var protocolRe = /^(\w+:)\/\//; // Could be http:// from file://

        if (url !== null && url.match) {
          var match = url.match(protocolRe);

          if (match && match[1]) {
            return match[1];
          }
        }

        return window.location.protocol;
      },

      /*
      ---------------------------------------------------------------------------
        PRIVATE
      ---------------------------------------------------------------------------
      */

      /**
       * @type {Object} XMLHttpRequest or equivalent.
       */
      __nativeXhr__P_109_18: null,

      /**
       * @type {Boolean} Whether request is async.
       */
      __async__P_109_16: null,

      /**
       * @type {Function} Bound __onNativeReadyStateChange handler.
       */
      __onNativeReadyStateChangeBound__P_109_1: null,

      /**
       * @type {Function} Bound __onNativeAbort handler.
       */
      __onNativeAbortBound__P_109_2: null,

      /**
       * @type {Function} Bound __onNativeProgress handler.
       */
      __onNativeProgressBound__P_109_4: null,

      /**
       * @type {Function} Bound __onUnload handler.
       */
      __onUnloadBound__P_109_9: null,

      /**
       * @type {Function} Bound __onTimeout handler.
       */
      __onTimeoutBound__P_109_6: null,

      /**
       * @type {Boolean} Send flag
       */
      __send__P_109_13: null,

      /**
       * @type {String} Requested URL
       */
      __url__P_109_15: null,

      /**
       * @type {Boolean} Abort flag
       */
      __abort__P_109_12: null,

      /**
       * @type {Boolean} Timeout flag
       */
      __timeout__P_109_24: null,

      /**
       * @type {Boolean} Whether object has been disposed.
       */
      __disposed__P_109_20: null,

      /**
       * @type {Number} ID of timeout timer.
       */
      __timerId__P_109_21: null,

      /**
       * @type {Error} Error thrown on open, if any.
       */
      __openError__P_109_19: null,

      /**
       * @type {Boolean} Conditional get flag
       */
      __conditional__P_109_14: null,

      /**
       * @type {Array} Whitelist with all allowed data types for the request payload
       */
      __dataTypeWhiteList__P_109_22: null,

      /**
       * Init native XHR.
       */
      __initNativeXhr__P_109_8: function __initNativeXhr__P_109_8() {
        // Create native XHR or equivalent and hold reference
        this.__nativeXhr__P_109_18 = this._createNativeXhr(); // Track native ready state changes

        this.__nativeXhr__P_109_18.onreadystatechange = this.__onNativeReadyStateChangeBound__P_109_1; // Track native abort, when supported

        if (qx.Bootstrap.getClass(this.__nativeXhr__P_109_18.onabort) !== "Undefined") {
          this.__nativeXhr__P_109_18.onabort = this.__onNativeAbortBound__P_109_2;
        } // Track native progress, when supported


        if (qx.Bootstrap.getClass(this.__nativeXhr__P_109_18.onprogress) !== "Undefined") {
          this.__nativeXhr__P_109_18.onprogress = this.__onNativeProgressBound__P_109_4;
          this.progress = {
            lengthComputable: false,
            loaded: 0,
            total: 0
          };
        } // Reset flags


        this.__disposed__P_109_20 = this.__send__P_109_13 = this.__abort__P_109_12 = false; // Initialize data white list

        this.__dataTypeWhiteList__P_109_22 = ["ArrayBuffer", "Blob", "File", "HTMLDocument", "String", "FormData"];
      },

      /**
       * Track native abort.
       *
       * In case the end user cancels the request by other
       * means than calling abort().
       */
      __onNativeAbort__P_109_3: function __onNativeAbort__P_109_3() {
        // When the abort that triggered this method was not a result from
        // calling abort()
        if (!this.__abort__P_109_12) {
          this.abort();
        }
      },

      /**
       * Track native progress event.
       @param e {Event} The native progress event.
       */
      __onNativeProgress__P_109_5: function __onNativeProgress__P_109_5(e) {
        this.progress.lengthComputable = e.lengthComputable;
        this.progress.loaded = e.loaded;
        this.progress.total = e.total;

        this._emit("progress");
      },

      /**
       * Handle native onreadystatechange.
       *
       * Calls user-defined function onreadystatechange on each
       * state change and syncs the XHR status properties.
       */
      __onNativeReadyStateChange__P_109_0: function __onNativeReadyStateChange__P_109_0() {
        var nxhr = this.__nativeXhr__P_109_18,
            propertiesReadable = true;

        if (qx.core.Environment.get("qx.debug.io")) {
          qx.Bootstrap.debug(qx.bom.request.Xhr, "Received native readyState: " + nxhr.readyState);
        } // BUGFIX: IE, Firefox
        // onreadystatechange() is called twice for readyState OPENED.
        //
        // Call onreadystatechange only when readyState has changed.


        if (this.readyState == nxhr.readyState) {
          return;
        } // Sync current readyState


        this.readyState = nxhr.readyState; // BUGFIX: IE
        // Superfluous onreadystatechange DONE when aborting OPENED
        // without send flag

        if (this.readyState === qx.bom.request.Xhr.DONE && this.__abort__P_109_12 && !this.__send__P_109_13) {
          return;
        } // BUGFIX: IE
        // IE fires onreadystatechange HEADERS_RECEIVED and LOADING when sync
        //
        // According to spec, only onreadystatechange OPENED and DONE should
        // be fired.


        if (!this.__async__P_109_16 && (nxhr.readyState == 2 || nxhr.readyState == 3)) {
          return;
        } // Default values according to spec.


        this.status = 0;
        this.statusText = this.responseText = "";
        this.responseXML = null;
        this.response = null;

        if (this.readyState >= qx.bom.request.Xhr.HEADERS_RECEIVED) {
          // In some browsers, XHR properties are not readable
          // while request is in progress.
          try {
            this.status = nxhr.status;
            this.statusText = nxhr.statusText;
            this.response = nxhr.response;

            if (this.responseType === "" || this.responseType === "text") {
              this.responseText = nxhr.responseText;
            }

            if (this.responseType === "" || this.responseType === "document") {
              this.responseXML = nxhr.responseXML;
            }
          } catch (XhrPropertiesNotReadable) {
            propertiesReadable = false;
          }

          if (propertiesReadable) {
            this.__normalizeStatus__P_109_25();

            this.__normalizeResponseXML__P_109_26();
          }
        }

        this.__readyStateChange__P_109_23(); // BUGFIX: IE
        // Memory leak in XMLHttpRequest (on-page)


        if (this.readyState == qx.bom.request.Xhr.DONE) {
          // Allow garbage collecting of native XHR
          if (nxhr) {
            nxhr.onreadystatechange = function () {};
          }
        }
      },

      /**
       * Handle readystatechange. Called internally when readyState is changed.
       */
      __readyStateChange__P_109_23: function __readyStateChange__P_109_23() {
        // Cancel timeout before invoking handlers because they may throw
        if (this.readyState === qx.bom.request.Xhr.DONE) {
          // Request determined DONE. Cancel timeout.
          window.clearTimeout(this.__timerId__P_109_21);
        } // Always fire "readystatechange"


        this._emit("readystatechange");

        if (this.readyState === qx.bom.request.Xhr.DONE) {
          this.__readyStateChangeDone__P_109_27();
        }
      },

      /**
       * Handle readystatechange. Called internally by
       * {@link #__readyStateChange} when readyState is DONE.
       */
      __readyStateChangeDone__P_109_27: function __readyStateChangeDone__P_109_27() {
        // Fire "timeout" if timeout flag is set
        if (this.__timeout__P_109_24) {
          this._emit("timeout"); // BUGFIX: Opera
          // Since Opera does not fire "error" on network error, fire additional
          // "error" on timeout (may well be related to network error)


          if (qx.core.Environment.get("engine.name") === "opera") {
            this._emit("error");
          }

          this.__timeout__P_109_24 = false; // Fire either "abort", "load" or "error"
        } else {
          if (this.__abort__P_109_12) {
            this._emit("abort");
          } else {
            if (this.__isNetworkError__P_109_28()) {
              this._emit("error");
            } else {
              this._emit("load");
            }
          }
        } // Always fire "onloadend" when DONE


        this._emit("loadend");
      },

      /**
       * Check for network error.
       *
       * @return {Boolean} Whether a network error occurred.
       */
      __isNetworkError__P_109_28: function __isNetworkError__P_109_28() {
        var error; // Infer the XHR internal error flag from statusText when not aborted.
        // See http://www.w3.org/TR/XMLHttpRequest2/#error-flag and
        // http://www.w3.org/TR/XMLHttpRequest2/#the-statustext-attribute
        //
        // With file://, statusText is always falsy. Assume network error when
        // response is empty.

        if (this._getProtocol() === "file:") {
          error = !this.responseText;
        } else {
          error = this.status === 0;
        }

        return error;
      },

      /**
       * Handle faked timeout.
       */
      __onTimeout__P_109_7: function __onTimeout__P_109_7() {
        // Basically, mimick http://www.w3.org/TR/XMLHttpRequest2/#timeout-error
        var nxhr = this.__nativeXhr__P_109_18;
        this.readyState = qx.bom.request.Xhr.DONE; // Set timeout flag

        this.__timeout__P_109_24 = true; // No longer consider request. Abort.

        nxhr.aborted = true;
        nxhr.abort();
        this.responseText = "";
        this.responseXML = null; // Signal readystatechange

        this.__readyStateChange__P_109_23();
      },

      /**
       * Normalize status property across browsers.
       */
      __normalizeStatus__P_109_25: function __normalizeStatus__P_109_25() {
        var isDone = this.readyState === qx.bom.request.Xhr.DONE; // BUGFIX: Most browsers
        // Most browsers tell status 0 when it should be 200 for local files

        if (this._getProtocol() === "file:" && this.status === 0 && isDone) {
          if (!this.__isNetworkError__P_109_28()) {
            this.status = 200;
          }
        } // BUGFIX: IE
        // IE sometimes tells 1223 when it should be 204


        if (this.status === 1223) {
          this.status = 204;
        } // BUGFIX: Opera
        // Opera tells 0 for conditional requests when it should be 304
        //
        // Detect response to conditional request that signals fresh cache.


        if (qx.core.Environment.get("engine.name") === "opera") {
          if (isDone && // Done
          this.__conditional__P_109_14 && // Conditional request
          !this.__abort__P_109_12 && // Not aborted
          this.status === 0 // But status 0!
          ) {
            this.status = 304;
          }
        }
      },

      /**
       * Normalize responseXML property across browsers.
       */
      __normalizeResponseXML__P_109_26: function __normalizeResponseXML__P_109_26() {
        // BUGFIX: IE
        // IE does not recognize +xml extension, resulting in empty responseXML.
        //
        // Check if Content-Type is +xml, verify missing responseXML then parse
        // responseText as XML.
        if (qx.core.Environment.get("engine.name") == "mshtml" && (this.getResponseHeader("Content-Type") || "").match(/[^\/]+\/[^\+]+\+xml/) && this.responseXML && !this.responseXML.documentElement) {
          var dom = new window.ActiveXObject("Microsoft.XMLDOM");
          dom.async = false;
          dom.validateOnParse = false;
          dom.loadXML(this.responseText);
          this.responseXML = dom;
        }
      },

      /**
       * Handler for native unload event.
       */
      __onUnload__P_109_10: function __onUnload__P_109_10() {
        try {
          // Abort and dispose
          if (this) {
            this.dispose();
          }
        } catch (e) {}
      },

      /**
       * Helper method to determine whether browser supports reusing the
       * same native XHR to send more requests.
       * @return {Boolean} <code>true</code> if request object reuse is supported
       */
      __supportsManyRequests__P_109_17: function __supportsManyRequests__P_109_17() {
        var name = qx.core.Environment.get("engine.name");
        var version = qx.core.Environment.get("browser.version");
        return !(name == "mshtml" && version < 9 || name == "gecko" && version < 3.5);
      },

      /**
       * Throw when already disposed.
       */
      __checkDisposed__P_109_11: function __checkDisposed__P_109_11() {
        if (this.__disposed__P_109_20) {
          throw new Error("Already disposed");
        }
      }
    },
    defer: function defer() {
      qx.core.Environment.add("qx.debug.io", false);
    }
  });
  qx.bom.request.Xhr.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.lang.Json": {
        "require": true
      },
      "qx.xml.Document": {
        "require": true
      },
      "qx.core.Assert": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2013 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Richard Sternagel (rsternagel)
  
  ************************************************************************ */

  /**
   * Parsers for parsing response strings (especially for XHR).
   *
   * Known parsers are: <code>"json"</code> and <code>"xml"</code>.
   *
   * @require(qx.util.ResponseParser#parse)
   */
  qx.Bootstrap.define("qx.util.ResponseParser", {
    /**
     * @param parser {String|Function} See {@link #setParser}.
     */
    construct: function construct(parser) {
      if (parser !== undefined) {
        this.setParser(parser);
      }
    },
    statics: {
      /**
       * @type {Map} Map of parser functions. Parsers defined here can be
       * referenced symbolically, e.g. with {@link #setParser}.
       *
       * Known parsers are: <code>"json"</code> and <code>"xml"</code>.
       */
      PARSER: {
        json: qx.lang.Json.parse,
        xml: qx.xml.Document.fromString
      }
    },
    members: {
      __parser__P_111_0: null,

      /**
       * Returns given response parsed with parser
       * determined by {@link #_getParser}.
       *
       * @param response {String} response (e.g JSON/XML string)
       * @param contentType {String} contentType (e.g. 'application/json')
       * @return {String|Object} The parsed response of the request.
       */
      parse: function parse(response, contentType) {
        var parser = this._getParser(contentType);

        if (typeof parser === "function") {
          if (response !== "") {
            return parser.call(this, response);
          }
        }

        return response;
      },

      /**
       * Set parser used to parse response once request has
       * completed successfully.
       *
       * Usually, the parser is correctly inferred from the
       * content type of the response. This method allows to force the
       * parser being used, e.g. if the content type returned from
       * the backend is wrong or the response needs special parsing.
       *
       * Parser most typically used can be referenced symbolically.
       * To cover edge cases, a function can be given. When parsing
       * the response, this function is called with the raw response as
       * first argument.
       *
       * @param parser {String|Function}
       *
       * Can be:
       *
       * <ul>
       *   <li>A parser defined in {@link qx.util.ResponseParser#PARSER},
       *       referenced by string.</li>
       *   <li>The function to invoke.
       *       Receives the raw response as argument.</li>
       * </ul>
       *
       * @return {Function} The parser function
       */
      setParser: function setParser(parser) {
        // Symbolically given known parser
        if (typeof qx.util.ResponseParser.PARSER[parser] === "function") {
          return this.__parser__P_111_0 = qx.util.ResponseParser.PARSER[parser];
        } // If parser is not a symbol, it must be a function


        {
          qx.core.Assert.assertFunction(parser);
        }
        return this.__parser__P_111_0 = parser;
      },

      /**
       * Gets the parser.
       *
       * If not defined explicitly using {@link #setParser},
       * the parser is inferred from the content type.
       *
       * Override this method to extend the list of content types
       * being handled.
       *
       * @param contentType {String}
       * @return {Function|null} The parser function or <code>null</code> if the
       * content type is undetermined.
       *
       */
      _getParser: function _getParser(contentType) {
        var parser = this.__parser__P_111_0,
            contentTypeOrig = "",
            contentTypeNormalized = ""; // Use user-provided parser, if any

        if (parser) {
          return parser;
        } // See http://restpatterns.org/Glossary/MIME_Type


        contentTypeOrig = contentType || ""; // Ignore parameters (e.g. the character set)

        contentTypeNormalized = contentTypeOrig.replace(/;.*$/, "");

        if (/^application\/(\w|\.)*\+?json$/.test(contentTypeNormalized)) {
          parser = qx.util.ResponseParser.PARSER.json;
        }

        if (/^application\/xml$/.test(contentTypeNormalized)) {
          parser = qx.util.ResponseParser.PARSER.xml;
        } // Deprecated


        if (/[^\/]+\/[^\+]+\+xml$/.test(contentTypeOrig)) {
          parser = qx.util.ResponseParser.PARSER.xml;
        }

        return parser;
      }
    }
  });
  qx.util.ResponseParser.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "usage": "dynamic",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.layout.Abstract": {
        "construct": true,
        "require": true
      },
      "qx.ui.layout.LineSizeIterator": {},
      "qx.ui.layout.Util": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "qx.debug": {
          "load": true
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
     http://qooxdoo.org
  
     Copyright:
       2008 Dihedrals.com, http://www.dihedrals.com
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Chris Banford (zermattchris)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * A basic layout, which supports positioning of child widgets in a 'flowing'
   * manner, starting at the container's top/left position, placing children left to right
   * (like a HBox) until the there's no remaining room for the next child. When
   * out of room on the current line of elements, a new line is started, cleared
   * below the tallest child of the preceding line -- a bit like using 'float'
   * in CSS, except that a new line wraps all the way back to the left.
   *
   * *Features*
   *
   * <ul>
   * <li> Reversing children order </li>
   * <li> Manual line breaks </li>
   * <li> Horizontal alignment of lines </li>
   * <li> Vertical alignment of individual widgets within a line </li>
   * <li> Margins with horizontal margin collapsing </li>
   * <li> Horizontal and vertical spacing </li>
   * <li> Height for width calculations </li>
   * <li> Auto-sizing </li>
   * </ul>
   *
   * *Item Properties*
   *
   * <ul>
   * <li><strong>lineBreak</strong> <em>(Boolean)</em>: If set to <code>true</code>
   *   a forced line break will happen after this child widget.
   * </li>
   * <li><strong>stretch</strong> <em>(Boolean)</em>: If set to <code>true</code>
   *   the widget will be stretched to the remaining line width. This requires
   *   lineBreak to be true.
   * </li>
  
   * </ul>
   *
   * *Example*
   *
   * Here is a little example of how to use the Flow layout.
   *
   * <pre class="javascript">
   *  var flowlayout = new qx.ui.layout.Flow();
   *
   *  flowlayout.setAlignX( "center" );  // Align children to the X axis of the container (left|center|right)
   *
   *  var container = new qx.ui.container.Composite(flowlayout);
   *  this.getRoot().add(container, {edge: 0});
   *
   *  var button1 = new qx.ui.form.Button("1. First Button", "flowlayout/test.png");
   *  container.add(button1);
   *
   *  var button2 = new qx.ui.form.Button("2. Second longer Button...", "flowlayout/test.png");
   *  // Have this child create a break in the current Line (next child will always start a new Line)
   *  container.add(button2, {lineBreak: true});
   *
   *  var button3 = new qx.ui.form.Button("3rd really, really, really long Button", "flowlayout/test.png");
   *  button3.setHeight(100);  // tall button
   *  container.add(button3);
   *
   *  var button4 = new qx.ui.form.Button("Number 4", "flowlayout/test.png");
   *  button4.setAlignY("bottom");
   *  container.add(button4);
   *
   *  var button5 = new qx.ui.form.Button("20px Margins around the great big 5th button!");
   *  button5.setHeight(100);  // tall button
   *  button5.setMargin(20);
   *  container.add(button5, {lineBreak: true});    // Line break after this button.
   *
   *  var button6 = new qx.ui.form.Button("Number 6", "flowlayout/test.png");
   *  button6.setAlignY("middle");  // Align this child to the vertical center of this line.
   *  container.add(button6);
   *
   *  var button7 = new qx.ui.form.Button("7th a wide, short button", "flowlayout/test.png");
   *  button7.setMaxHeight(20);  // short button
   *  container.add(button7);
   * </pre>
   *
   * *External Documentation*
   *
   * <a href='https://qooxdoo.org/documentation/#/desktop/layout/flow.md'>
   * Extended documentation</a> and links to demos of this layout in the qooxdoo manual.
   */
  qx.Class.define("qx.ui.layout.Flow", {
    extend: qx.ui.layout.Abstract,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param spacingX {Integer?0} The spacing between child widgets {@link #spacingX}.
     * @param spacingY {Integer?0} The spacing between the lines {@link #spacingY}.
     * @param alignX {String?"left"} Horizontal alignment of the whole children
     *     block {@link #alignX}.
     */
    construct: function construct(spacingX, spacingY, alignX) {
      qx.ui.layout.Abstract.constructor.call(this);

      if (spacingX) {
        this.setSpacingX(spacingX);
      }

      if (spacingY) {
        this.setSpacingY(spacingY);
      }

      if (alignX) {
        this.setAlignX(alignX);
      }
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /**
       * Horizontal alignment of the whole children block. The horizontal
       * alignment of the child is completely ignored in HBoxes (
       * {@link qx.ui.core.LayoutItem#alignX}).
       */
      alignX: {
        check: ["left", "center", "right"],
        init: "left",
        apply: "_applyLayoutChange"
      },

      /**
       * Vertical alignment of each child. Can be overridden through
       * {@link qx.ui.core.LayoutItem#alignY}.
       */
      alignY: {
        check: ["top", "middle", "bottom"],
        init: "top",
        apply: "_applyLayoutChange"
      },

      /** Horizontal spacing between two children */
      spacingX: {
        check: "Integer",
        init: 0,
        apply: "_applyLayoutChange"
      },

      /**
       * The vertical spacing between the lines.
       */
      spacingY: {
        check: "Integer",
        init: 0,
        apply: "_applyLayoutChange"
      },

      /** Whether the actual children list should be laid out in reversed order. */
      reversed: {
        check: "Boolean",
        init: false,
        apply: "_applyLayoutChange"
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      /*
      ---------------------------------------------------------------------------
        LAYOUT INTERFACE
      ---------------------------------------------------------------------------
      */
      // overridden
      verifyLayoutProperty: qx.core.Environment.select("qx.debug", {
        "true": function _true(item, name, value) {
          var validProperties = ["lineBreak", "stretch"];
          this.assertInArray(name, validProperties, "The property '" + name + "' is not supported by the flow layout!");
        },
        "false": null
      }),
      // overridden
      connectToWidget: function connectToWidget(widget) {
        qx.ui.layout.Flow.superclass.prototype.connectToWidget.call(this, widget); // Necessary to be able to calculate the lines for the flow layout.
        // Otherwise the layout calculates the needed width and height by using
        // only one line of items which is leading to the wrong height. This
        // wrong height does e.g. suppress scrolling since the scroll pane does
        // not know about the correct needed height.

        if (widget) {
          widget.setAllowShrinkY(false);
        }
      },

      /**
       * The FlowLayout tries to add as many Children as possible to the current 'Line'
       * and when it sees that the next Child won't fit, it starts on a new Line, continuing
       * until all the Children have been added.
       * To enable alignX "left", "center", "right" renderLayout has to calculate the positions
       * of all a Line's children before it draws them.
       *
       * @param availWidth {Integer} Final width available for the content (in pixel)
       * @param availHeight {Integer} Final height available for the content (in pixel)
       * @param padding {Map} Map containing the padding values. Keys:
       * <code>top</code>, <code>bottom</code>, <code>left</code>, <code>right</code>
       */
      renderLayout: function renderLayout(availWidth, availHeight, padding) {
        var children = this._getLayoutChildren();

        if (this.getReversed()) {
          children = children.concat().reverse();
        }

        var lineCalculator = new qx.ui.layout.LineSizeIterator(children, this.getSpacingX());
        var lineTop = padding.top;

        while (lineCalculator.hasMoreLines()) {
          var line = lineCalculator.computeNextLine(availWidth);

          this.__renderLine__P_218_0(line, lineTop, availWidth, padding);

          lineTop += line.height + this.getSpacingY();
        }
      },

      /**
       * Render a line in the flow layout
       *
       * @param line {Map} A line configuration as returned by
       *    {@link LineSizeIterator#computeNextLine}.
       * @param lineTop {Integer} The line's top position
       * @param availWidth {Integer} The available line width
       * @param padding {Map} Map containing the padding values. Keys:
       * <code>top</code>, <code>bottom</code>, <code>left</code>, <code>right</code>
       */
      __renderLine__P_218_0: function __renderLine__P_218_0(line, lineTop, availWidth, padding) {
        var util = qx.ui.layout.Util;
        var left = padding.left;

        if (this.getAlignX() != "left") {
          left = padding.left + availWidth - line.width;

          if (this.getAlignX() == "center") {
            left = padding.left + Math.round((availWidth - line.width) / 2);
          }
        }

        for (var i = 0; i < line.children.length; i++) {
          var child = line.children[i];
          var size = child.getSizeHint();
          var marginTop = child.getMarginTop();
          var marginBottom = child.getMarginBottom();
          var top = util.computeVerticalAlignOffset(child.getAlignY() || this.getAlignY(), marginTop + size.height + marginBottom, line.height, marginTop, marginBottom);
          var layoutProps = child.getLayoutProperties();

          if (layoutProps.stretch && layoutProps.stretch) {
            size.width += availWidth - line.width;
          }

          child.renderLayout(left + line.gapsBefore[i], lineTop + top, size.width, size.height);
          left += line.gapsBefore[i] + size.width;
        }
      },
      // overridden
      _computeSizeHint: function _computeSizeHint() {
        return this.__computeSize__P_218_1(Infinity);
      },
      // overridden
      hasHeightForWidth: function hasHeightForWidth() {
        return true;
      },
      // overridden
      getHeightForWidth: function getHeightForWidth(width) {
        return this.__computeSize__P_218_1(width).height;
      },

      /**
       * Returns the list of children fitting in the last row of the given width.
       * @param width {Number} The width to use for the calculation.
       * @return {Array} List of children in the first row.
       */
      getLastLineChildren: function getLastLineChildren(width) {
        var lineCalculator = new qx.ui.layout.LineSizeIterator(this._getLayoutChildren(), this.getSpacingX());
        var lineData = [];

        while (lineCalculator.hasMoreLines()) {
          lineData = lineCalculator.computeNextLine(width).children;
        }

        return lineData;
      },

      /**
       * Compute the preferred size optionally constrained by the available width
       *
       * @param availWidth {Integer} The available width
       * @return {Map} Map containing the preferred height and width of the layout
       */
      __computeSize__P_218_1: function __computeSize__P_218_1(availWidth) {
        var lineCalculator = new qx.ui.layout.LineSizeIterator(this._getLayoutChildren(), this.getSpacingX());
        var height = 0;
        var width = 0;
        var lineCount = 0;

        while (lineCalculator.hasMoreLines()) {
          var line = lineCalculator.computeNextLine(availWidth);
          lineCount += 1;
          width = Math.max(width, line.width);
          height += line.height;
        }

        return {
          width: width,
          height: height + this.getSpacingY() * (lineCount - 1)
        };
      }
    }
  });
  qx.ui.layout.Flow.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "usage": "dynamic",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.Widget": {
        "construct": true,
        "require": true
      },
      "qx.ui.form.IStringForm": {
        "require": true
      },
      "qx.locale.Manager": {
        "construct": true
      },
      "qx.bom.client.Css": {
        "require": true
      },
      "qx.bom.client.Html": {
        "require": true
      },
      "qx.html.Label": {},
      "qx.theme.manager.Color": {},
      "qx.theme.manager.Font": {},
      "qx.bom.webfonts.WebFont": {},
      "qx.bom.Font": {},
      "qx.ui.core.queue.Layout": {},
      "qx.bom.Label": {},
      "qx.bom.client.OperatingSystem": {
        "require": true
      },
      "qx.bom.client.Engine": {
        "require": true
      },
      "qx.bom.client.Browser": {
        "require": true
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "css.textoverflow": {
          "className": "qx.bom.client.Css"
        },
        "html.xul": {
          "className": "qx.bom.client.Html"
        },
        "os.name": {
          "className": "qx.bom.client.OperatingSystem"
        },
        "engine.name": {
          "className": "qx.bom.client.Engine"
        },
        "engine.version": {
          "className": "qx.bom.client.Engine"
        },
        "qx.dynlocale": {
          "load": true
        },
        "browser.name": {
          "className": "qx.bom.client.Browser"
        },
        "browser.version": {
          "className": "qx.bom.client.Browser"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Fabian Jakobs (fjakobs)
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * The label class brings typical text content to the widget system.
   *
   * It supports simple text nodes and complex HTML (rich). The default
   * content mode is for text only. The mode is changeable through the property
   * {@link #rich}.
   *
   * The label supports heightForWidth when used in HTML mode. This means
   * that multi line HTML automatically computes the correct preferred height.
   *
   * *Example*
   *
   * Here is a little example of how to use the widget.
   *
   * <pre class='javascript'>
   *   // a simple text label without wrapping and markup support
   *   var label1 = new qx.ui.basic.Label("Simple text label");
   *   this.getRoot().add(label1, {left:20, top:10});
   *
   *   // a HTML label with automatic line wrapping
   *   var label2 = new qx.ui.basic.Label().set({
   *     value: "A <b>long label</b> text with auto-wrapping. This also may contain <b style='color:red'>rich HTML</b> markup.",
   *     rich : true,
   *     width: 120
   *   });
   *   this.getRoot().add(label2, {left:20, top:50});
   * </pre>
   *
   * The first label in this example is a basic text only label. As such no
   * automatic wrapping is supported. The second label is a long label containing
   * HTML markup with automatic line wrapping.
   *
   * *External Documentation*
   *
   * <a href='http://qooxdoo.org/docs/#desktop/widget/label.md' target='_blank'>
   * Documentation of this widget in the qooxdoo manual.</a>
   *
   * NOTE: Instances of this class must be disposed of after use
   *
   */
  qx.Class.define("qx.ui.basic.Label", {
    extend: qx.ui.core.Widget,
    implement: [qx.ui.form.IStringForm],

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param value {String} Text or HTML content to use
     */
    construct: function construct(value) {
      qx.ui.core.Widget.constructor.call(this);

      if (value != null) {
        this.setValue(value);
      }

      {
        qx.locale.Manager.getInstance().addListener("changeLocale", this._onChangeLocale, this);
      }
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /**
       * Switches between rich HTML and text content. The text mode (<code>false</code>) supports
       * advanced features like ellipsis when the available space is not
       * enough. HTML mode (<code>true</code>) supports multi-line content and all the
       * markup features of HTML content.
       */
      rich: {
        check: "Boolean",
        init: false,
        event: "changeRich",
        apply: "_applyRich"
      },

      /**
       * Controls whether text wrap is activated or not. But please note, that
       * this property works only in combination with the property {@link #rich}.
       * The {@link #wrap} has only an effect if the {@link #rich} property is
       * set to <code>true</code>, otherwise {@link #wrap} has no effect.
       */
      wrap: {
        check: "Boolean",
        init: true,
        apply: "_applyWrap"
      },

      /**
       * Controls whether line wrapping can occur in the middle of a word; this is
       * typically only useful when there is a restricted amount of horizontal space
       * and words would otherwise overflow beyond the width of the element.  Words
       * are typically considered as separated by spaces, so "abc/def/ghi" is a 11
       * character word that would not be split without `breakWithWords` set to true.
       */
      breakWithinWords: {
        check: "Boolean",
        init: false,
        apply: "_applyBreakWithinWords"
      },

      /**
       * Contains the HTML or text content. Interpretation depends on the value
       * of {@link #rich}. In text mode entities and other HTML special content
       * is not supported. But it is possible to use unicode escape sequences
       * to insert symbols and other non ASCII characters.
       */
      value: {
        check: "String",
        apply: "_applyValue",
        event: "changeValue",
        nullable: true
      },

      /**
       * The buddy property can be used to connect the label to another widget.
       * That causes two things:
       * <ul>
       *   <li>The label will always take the same enabled state as the buddy
       *       widget.
       *   </li>
       *   <li>A tap on the label will focus the buddy widget.</li>
       * </ul>
       * This is the behavior of the for attribute of HTML:
       * http://www.w3.org/TR/html401/interact/forms.html#adef-for
       */
      buddy: {
        check: "qx.ui.core.Widget",
        apply: "_applyBuddy",
        nullable: true,
        init: null,
        dereference: true
      },

      /** Control the text alignment */
      textAlign: {
        check: ["left", "center", "right", "justify"],
        nullable: true,
        themeable: true,
        apply: "_applyTextAlign",
        event: "changeTextAlign"
      },
      // overridden
      appearance: {
        refine: true,
        init: "label"
      },
      // overridden
      selectable: {
        refine: true,
        init: false
      },
      // overridden
      allowGrowX: {
        refine: true,
        init: false
      },
      // overridden
      allowGrowY: {
        refine: true,
        init: false
      },
      // overridden
      allowShrinkY: {
        refine: true,
        init: false
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    /* eslint-disable @qooxdoo/qx/no-refs-in-members */
    members: {
      __font__P_61_0: null,
      __invalidContentSize__P_61_1: null,
      __tapListenerId__P_61_2: null,
      __webfontListenerId__P_61_3: null,

      /*
      ---------------------------------------------------------------------------
        WIDGET API
      ---------------------------------------------------------------------------
      */
      // overridden
      _getContentHint: function _getContentHint() {
        if (this.__invalidContentSize__P_61_1) {
          this.__contentSize__P_61_4 = this.__computeContentSize__P_61_5();
          delete this.__invalidContentSize__P_61_1;
        }

        return {
          width: this.__contentSize__P_61_4.width,
          height: this.__contentSize__P_61_4.height
        };
      },
      // overridden
      _hasHeightForWidth: function _hasHeightForWidth() {
        return this.getRich() && this.getWrap();
      },
      // overridden
      _applySelectable: function _applySelectable(value) {
        // This is needed for all browsers not having text-overflow:ellipsis
        // but supporting XUL (firefox < 4)
        // https://bugzilla.mozilla.org/show_bug.cgi?id=312156
        if (!qx.core.Environment.get("css.textoverflow") && qx.core.Environment.get("html.xul")) {
          if (value && !this.isRich()) {
            {
              this.warn("Only rich labels are selectable in browsers with Gecko engine!");
            }
            return;
          }
        }

        qx.ui.basic.Label.superclass.prototype._applySelectable.call(this, value);
      },
      // overridden
      _getContentHeightForWidth: function _getContentHeightForWidth(width) {
        if (!this.getRich() && !this.getWrap()) {
          return null;
        }

        return this.__computeContentSize__P_61_5(width).height;
      },
      // overridden
      _createContentElement: function _createContentElement() {
        return new qx.html.Label();
      },
      // property apply
      _applyTextAlign: function _applyTextAlign(value, old) {
        this.getContentElement().setStyle("textAlign", value);
      },
      // overridden
      _applyTextColor: function _applyTextColor(value, old) {
        if (value) {
          this.getContentElement().setStyle("color", qx.theme.manager.Color.getInstance().resolve(value));
        } else {
          this.getContentElement().removeStyle("color");
        }
      },

      /*
      ---------------------------------------------------------------------------
        LABEL ADDONS
      ---------------------------------------------------------------------------
      */

      /**
       * @type {Map} Internal fallback of label size when no font is defined
       *
       * @lint ignoreReferenceField(__contentSize)
       */
      __contentSize__P_61_4: {
        width: 0,
        height: 0
      },
      // property apply
      _applyFont: function _applyFont(value, old) {
        if (old && this.__font__P_61_0 && this.__webfontListenerId__P_61_3) {
          this.__font__P_61_0.removeListenerById(this.__webfontListenerId__P_61_3);

          this.__webfontListenerId__P_61_3 = null;
        } // Apply


        var styles;

        if (value) {
          this.__font__P_61_0 = qx.theme.manager.Font.getInstance().resolve(value);

          if (this.__font__P_61_0 instanceof qx.bom.webfonts.WebFont) {
            if (!this.__font__P_61_0.isValid()) {
              this.__webfontListenerId__P_61_3 = this.__font__P_61_0.addListener("changeStatus", this._onWebFontStatusChange, this);
            }
          }

          styles = this.__font__P_61_0.getStyles();
        } else {
          this.__font__P_61_0 = null;
          styles = qx.bom.Font.getDefaultStyles();
        } // check if text color already set - if so this local value has higher priority


        if (this.getTextColor() != null) {
          delete styles["color"];
        }

        this.getContentElement().setStyles(styles); // Invalidate text size

        this.__invalidContentSize__P_61_1 = true; // Update layout

        qx.ui.core.queue.Layout.add(this);
      },

      /**
       * Internal utility to compute the content dimensions.
       *
       * @param width {Integer?null} Optional width constraint
       * @return {Map} Map with <code>width</code> and <code>height</code> keys
       */
      __computeContentSize__P_61_5: function __computeContentSize__P_61_5(width) {
        var Label = qx.bom.Label;
        var font = this.getFont();
        var styles = font ? this.__font__P_61_0.getStyles() : qx.bom.Font.getDefaultStyles();
        var content = this.getValue() || "A";
        var rich = this.getRich();

        if (this.__webfontListenerId__P_61_3) {
          this.__fixEllipsis__P_61_6();
        }

        if (rich && this.getBreakWithinWords()) {
          styles.wordBreak = "break-all";
        }

        return rich ? Label.getHtmlSize(content, styles, width) : Label.getTextSize(content, styles);
      },

      /**
       * Firefox > 9 on OS X will draw an ellipsis on top of the label content even
       * though there is enough space for the text. Re-applying the content forces
       * a recalculation and fixes the problem. See qx bug #6293
       */
      __fixEllipsis__P_61_6: function __fixEllipsis__P_61_6() {
        if (!this.getContentElement()) {
          return;
        }

        if (qx.core.Environment.get("os.name") == "osx" && qx.core.Environment.get("engine.name") == "gecko" && parseInt(qx.core.Environment.get("engine.version"), 10) < 16 && parseInt(qx.core.Environment.get("engine.version"), 10) > 9) {
          var domEl = this.getContentElement().getDomElement();

          if (domEl) {
            /* eslint-disable-next-line no-self-assign */
            domEl.innerHTML = domEl.innerHTML;
          }
        }
      },

      /*
      ---------------------------------------------------------------------------
        PROPERTY APPLIER
      ---------------------------------------------------------------------------
      */
      // property apply
      _applyBuddy: function _applyBuddy(value, old) {
        if (old != null) {
          this.removeRelatedBindings(old);
          this.removeListenerById(this.__tapListenerId__P_61_2);
          this.__tapListenerId__P_61_2 = null;
        }

        if (value != null) {
          value.bind("enabled", this, "enabled");
          this.__tapListenerId__P_61_2 = this.addListener("tap", function () {
            // only focus focusable elements [BUG #3555]
            if (value.isFocusable()) {
              value.focus.apply(value);
            } // furthermore toggle if possible [BUG #6881]


            if ("toggleValue" in value && typeof value.toggleValue === "function") {
              value.toggleValue();
            }
          }, this);
        }
      },
      // property apply
      _applyRich: function _applyRich(value) {
        // Sync with content element
        this.getContentElement().setRich(value); // Mark text size cache as invalid

        this.__invalidContentSize__P_61_1 = true; // Update layout

        qx.ui.core.queue.Layout.add(this);
      },
      // property apply
      _applyWrap: function _applyWrap(value, old) {
        if (value && !this.isRich()) {
          {
            this.warn("Only rich labels support wrap.");
          }
        }

        if (this.isRich()) {
          // apply the white space style to the label to force it not
          // to wrap if wrap is set to false [BUG #3732]
          var whiteSpace = value ? "normal" : "nowrap";
          this.getContentElement().setStyle("whiteSpace", whiteSpace);
        }
      },
      // property apply
      _applyBreakWithinWords: function _applyBreakWithinWords(value, old) {
        if (this.isRich()) {
          this.getContentElement().setStyle("wordBreak", value ? "break-all" : "normal");
        }
      },

      /**
       * Locale change event handler
       *
       * @signature function(e)
       * @param e {Event} the change event
       */
      _onChangeLocale: qx.core.Environment.select("qx.dynlocale", {
        "true": function _true(e) {
          var content = this.getValue();

          if (content && content.translate) {
            this.setValue(content.translate());
          }
        },
        "false": null
      }),

      /**
       * Triggers layout recalculation after a web font was loaded
       *
       * @param ev {qx.event.type.Data} "changeStatus" event
       */
      _onWebFontStatusChange: function _onWebFontStatusChange(ev) {
        if (ev.getData().valid === true) {
          // safari has trouble resizing, adding it again fixed the issue [BUG #8786]
          if (qx.core.Environment.get("browser.name") == "safari" && parseFloat(qx.core.Environment.get("browser.version")) >= 8) {
            window.setTimeout(function () {
              this.__invalidContentSize__P_61_1 = true;
              qx.ui.core.queue.Layout.add(this);
            }.bind(this), 0);
          }

          this.__invalidContentSize__P_61_1 = true;
          qx.ui.core.queue.Layout.add(this);
        }
      },
      // property apply
      _applyValue: qx.core.Environment.select("qx.dynlocale", {
        "true": function _true(value, old) {
          // Sync with content element
          if (value && value.translate) {
            this.getContentElement().setValue(value.translate());
          } else {
            this.getContentElement().setValue(value);
          } // Mark text size cache as invalid


          this.__invalidContentSize__P_61_1 = true; // Update layout

          qx.ui.core.queue.Layout.add(this);
        },
        "false": function _false(value, old) {
          this.getContentElement().setValue(value); // Mark text size cache as invalid

          this.__invalidContentSize__P_61_1 = true; // Update layout

          qx.ui.core.queue.Layout.add(this);
        }
      })
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      {
        qx.locale.Manager.getInstance().removeListener("changeLocale", this._onChangeLocale, this);
      }

      if (this.__font__P_61_0 && this.__webfontListenerId__P_61_3) {
        this.__font__P_61_0.removeListenerById(this.__webfontListenerId__P_61_3);
      }

      this.__font__P_61_0 = null;
    }
  });
  qx.ui.basic.Label.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "usage": "dynamic",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.layout.Abstract": {
        "construct": true,
        "require": true
      },
      "qx.ui.layout.Util": {},
      "qx.theme.manager.Decoration": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "qx.debug": {
          "load": true
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * Docks children to one of the edges.
   *
   * *Features*
   *
   * * Percent width for left/right/center attached children
   * * Percent height for top/bottom/center attached children
   * * Minimum and maximum dimensions
   * * Prioritized growing/shrinking (flex)
   * * Auto sizing
   * * Margins and Spacings
   * * Alignment in orthogonal axis (e.g. alignX of north attached)
   * * Different sort options for children
   *
   * *Item Properties*
   *
   * <ul>
   * <li><strong>edge</strong> <em>(String)</em>: The edge where the layout item
   *   should be docked. This may be one of <code>north</code>, <code>east</code>,
   *   <code>south</code>, <code>west</code> or <code>center</code>. (Required)</li>
   * <li><strong>width</strong> <em>(String)</em>: Defines a percent
   *   width for the item. The percent width,
   *   when specified, is used instead of the width defined by the size hint.
   *   This is only supported for children added to the north or south edge or
   *   are centered in the middle of the layout.
   *   The minimum and maximum width still takes care of the elements limitations.
   *   It has no influence on the layout's size hint. Percents are mainly useful for
   *   widgets which are sized by the outer hierarchy.
   * </li>
   * <li><strong>height</strong> <em>(String)</em>: Defines a percent
   *   height for the item. The percent height,
   *   when specified, is used instead of the height defined by the size hint.
   *   This is only supported for children added to the west or east edge or
   *   are centered in the middle of the layout.
   *   The minimum and maximum height still takes care of the elements limitations.
   *   It has no influence on the layout's size hint. Percents are mainly useful for
   *   widgets which are sized by the outer hierarchy.
   * </li>
   * </ul>
   *
   * *Example*
   *
   * <pre class="javascript">
   * var layout = new qx.ui.layout.Dock();
   *
   * var w1 = new qx.ui.core.Widget();
   * var w2 = new qx.ui.core.Widget();
   * var w3 = new qx.ui.core.Widget();
   *
   * w1.setHeight(200);
   * w2.setWidth(150);
   *
   * var container = new qx.ui.container.Composite(layout);
   * container.add(w1, {edge:"north"});
   * container.add(w2, {edge:"west"});
   * container.add(w3, {edge:"center"});
   * </pre>
   *
   * *Detailed Description*
   *
   * Using this layout, items may be "docked" to a specific side
   * of the available space. Each displayed item reduces the available space
   * for the following children. Priorities depend on the position of
   * the child in the internal children list.
   *
   * *External Documentation*
   *
   * <a href='https://qooxdoo.org/documentation/#/desktop/layout/dock.md'>
   * Extended documentation</a> and links to demos of this layout in the qooxdoo manual.
   */
  qx.Class.define("qx.ui.layout.Dock", {
    extend: qx.ui.layout.Abstract,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param spacingX {Integer?0} The horizontal spacing. Sets {@link #spacingX}.
     * @param spacingY {Integer?0} The vertical spacing. Sets {@link #spacingY}.
     * @param separatorX {String|qx.ui.decoration.IDecorator} Separator to render between columns
     * @param separatorY {String|qx.ui.decoration.IDecorator} Separator to render between rows
     */
    construct: function construct(spacingX, spacingY, separatorX, separatorY) {
      qx.ui.layout.Abstract.constructor.call(this);

      if (spacingX) {
        this.setSpacingX(spacingX);
      }

      if (spacingY) {
        this.setSpacingY(spacingY);
      }

      if (separatorX) {
        this.setSeparatorX(separatorX);
      }

      if (separatorY) {
        this.setSeparatorY(separatorY);
      }
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /**
       * The way the widgets should be displayed (in conjunction with their
       * position in the childrens array).
       */
      sort: {
        check: ["auto", "y", "x"],
        init: "auto",
        apply: "_applySort"
      },

      /** Separator lines to use between the horizontal objects */
      separatorX: {
        check: "Decorator",
        nullable: true,
        apply: "_applyLayoutChange"
      },

      /** Separator lines to use between the vertical objects */
      separatorY: {
        check: "Decorator",
        nullable: true,
        apply: "_applyLayoutChange"
      },

      /**
       * Whether separators should be collapsed so when a spacing is
       * configured the line go over into each other
       */
      connectSeparators: {
        check: "Boolean",
        init: false,
        apply: "_applyLayoutChange"
      },

      /** Horizontal spacing between two children */
      spacingX: {
        check: "Integer",
        init: 0,
        apply: "_applyLayoutChange"
      },

      /** Vertical spacing between two children */
      spacingY: {
        check: "Integer",
        init: 0,
        apply: "_applyLayoutChange"
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __children__P_60_0: null,
      __edges__P_60_1: null,
      // overridden
      verifyLayoutProperty: qx.core.Environment.select("qx.debug", {
        "true": function _true(item, name, value) {
          this.assertInArray(name, ["flex", "edge", "height", "width"], "The property '" + name + "' is not supported by the Dock layout!");

          if (name === "edge") {
            this.assertInArray(value, ["north", "south", "west", "east", "center"]);
          } else if (name === "flex") {
            this.assertNumber(value);
            this.assert(value >= 0);
          } else {
            this.assertMatch(value, qx.ui.layout.Util.PERCENT_VALUE);
          }
        },
        "false": null
      }),
      // property apply
      _applySort: function _applySort() {
        // easiest way is to invalidate the cache
        this._invalidChildrenCache = true; // call normal layout change

        this._applyLayoutChange();
      },

      /**
       * @type {Map} Maps edge IDs to numeric values
       *
       * @lint ignoreReferenceField(__edgeMap)
       */
      __edgeMap__P_60_2: {
        north: 1,
        south: 2,
        west: 3,
        east: 4,
        center: 5
      },

      /**
       * @type {Map} Maps edges to align values
       *
       * @lint ignoreReferenceField(__alignMap)
       */
      __alignMap__P_60_3: {
        1: "top",
        2: "bottom",
        3: "left",
        4: "right"
      },

      /**
       * Rebuilds cache for sorted children list.
       *
       */
      __rebuildCache__P_60_4: function __rebuildCache__P_60_4() {
        var all = this._getLayoutChildren();

        var child, center;
        var length = all.length;
        var high = [];
        var low = [];
        var edge = [];
        var yfirst = this.getSort() === "y";
        var xfirst = this.getSort() === "x";

        for (var i = 0; i < length; i++) {
          child = all[i];
          edge = child.getLayoutProperties().edge;

          if (edge === "center") {
            if (center) {
              throw new Error("It is not allowed to have more than one child aligned to 'center'!");
            }

            center = child;
          } else if (xfirst || yfirst) {
            if (edge === "north" || edge === "south") {
              yfirst ? high.push(child) : low.push(child);
            } else if (edge === "west" || edge === "east") {
              yfirst ? low.push(child) : high.push(child);
            }
          } else {
            high.push(child);
          }
        } // Combine sorted children list


        var result = high.concat(low);

        if (center) {
          result.push(center);
        }

        this.__children__P_60_0 = result; // Cache edges for faster access

        var edges = [];

        for (var i = 0; i < length; i++) {
          edge = result[i].getLayoutProperties().edge;
          edges[i] = this.__edgeMap__P_60_2[edge] || 5;
        }

        this.__edges__P_60_1 = edges; // Clear invalidation marker

        delete this._invalidChildrenCache;
      },

      /*
      ---------------------------------------------------------------------------
        LAYOUT INTERFACE
      ---------------------------------------------------------------------------
      */
      // overridden
      renderLayout: function renderLayout(availWidth, availHeight, padding) {
        // Rebuild flex/width caches
        if (this._invalidChildrenCache) {
          this.__rebuildCache__P_60_4();
        }

        var util = qx.ui.layout.Util;
        var children = this.__children__P_60_0;
        var edges = this.__edges__P_60_1;
        var length = children.length;
        var flexibles, child, hint, props, flex, grow, width, height, offset;
        var widths = [];
        var heights = [];

        var separatorWidths = this._getSeparatorWidths();

        var spacingX = this.getSpacingX();
        var spacingY = this.getSpacingY(); // **************************************
        //   Caching children data
        // **************************************

        var allocatedWidth = -spacingX;
        var allocatedHeight = -spacingY;

        if (separatorWidths.x) {
          allocatedWidth -= separatorWidths.x + spacingX;
        }

        if (separatorWidths.y) {
          allocatedHeight -= separatorWidths.y + spacingY;
        }

        for (var i = 0; i < length; i++) {
          child = children[i];
          props = child.getLayoutProperties();
          hint = child.getSizeHint();
          width = hint.width;
          height = hint.height;

          if (props.width != null) {
            width = Math.floor(availWidth * parseFloat(props.width) / 100);

            if (width < hint.minWidth) {
              width = hint.minWidth;
            } else if (width > hint.maxWidth) {
              width = hint.maxWidth;
            }
          }

          if (props.height != null) {
            height = Math.floor(availHeight * parseFloat(props.height) / 100);

            if (height < hint.minHeight) {
              height = hint.minHeight;
            } else if (height > hint.maxHeight) {
              height = hint.maxHeight;
            }
          }

          widths[i] = width;
          heights[i] = height; // Update allocated width

          switch (edges[i]) {
            // north+south
            case 1:
            case 2:
              allocatedHeight += height + child.getMarginTop() + child.getMarginBottom() + spacingY;

              if (separatorWidths.y) {
                allocatedHeight += separatorWidths.y + spacingY;
              }

              break;
            // west+east

            case 3:
            case 4:
              allocatedWidth += width + child.getMarginLeft() + child.getMarginRight() + spacingX;

              if (separatorWidths.x) {
                allocatedWidth += separatorWidths.x + spacingX;
              }

              break;
            // center

            default:
              allocatedWidth += width + child.getMarginLeft() + child.getMarginRight() + spacingX;
              allocatedHeight += height + child.getMarginTop() + child.getMarginBottom() + spacingY;

              if (separatorWidths.x) {
                allocatedWidth += separatorWidths.x + spacingX;
              }

              if (separatorWidths.y) {
                allocatedHeight += separatorWidths.y + spacingY;
              }

          }
        } // **************************************
        //   Horizontal flex support
        // **************************************


        if (allocatedWidth != availWidth) {
          flexibles = {};
          grow = allocatedWidth < availWidth;

          for (var i = 0; i < length; i++) {
            child = children[i];

            switch (edges[i]) {
              case 3:
              case 4:
              case 5:
                flex = child.getLayoutProperties().flex; // Default flex for centered children is '1'

                if (flex == null && edges[i] == 5) {
                  flex = 1;
                }

                if (flex > 0) {
                  hint = child.getSizeHint();
                  flexibles[i] = {
                    min: hint.minWidth,
                    value: widths[i],
                    max: hint.maxWidth,
                    flex: flex
                  };
                }

            }
          }

          var result = util.computeFlexOffsets(flexibles, availWidth, allocatedWidth);

          for (var i in result) {
            offset = result[i].offset;
            widths[i] += offset;
            allocatedWidth += offset;
          }
        } // **************************************
        //   Vertical flex support
        // **************************************
        // Process height for flex stretching/shrinking


        if (allocatedHeight != availHeight) {
          flexibles = {};
          grow = allocatedHeight < availHeight;

          for (var i = 0; i < length; i++) {
            child = children[i];

            switch (edges[i]) {
              case 1:
              case 2:
              case 5:
                flex = child.getLayoutProperties().flex; // Default flex for centered children is '1'

                if (flex == null && edges[i] == 5) {
                  flex = 1;
                }

                if (flex > 0) {
                  hint = child.getSizeHint();
                  flexibles[i] = {
                    min: hint.minHeight,
                    value: heights[i],
                    max: hint.maxHeight,
                    flex: flex
                  };
                }

            }
          }

          var result = util.computeFlexOffsets(flexibles, availHeight, allocatedHeight);

          for (var i in result) {
            offset = result[i].offset;
            heights[i] += offset;
            allocatedHeight += offset;
          }
        } // **************************************
        //   Layout children
        // **************************************
        // Pre configure separators


        this._clearSeparators(); // Prepare loop


        var separatorX = this.getSeparatorX(),
            separatorY = this.getSeparatorY();
        var connectSeparators = this.getConnectSeparators();
        var nextTop = 0,
            nextLeft = 0;
        var left, top, width, height, used, edge;
        var separatorLeft, separatorTop, separatorWidth, separatorHeight;
        var marginTop, marginBottom, marginLeft, marginRight;
        var alignMap = this.__alignMap__P_60_3;

        for (var i = 0; i < length; i++) {
          // Cache child data
          child = children[i];
          edge = edges[i];
          hint = child.getSizeHint(); // Cache child margins

          marginTop = child.getMarginTop();
          marginBottom = child.getMarginBottom();
          marginLeft = child.getMarginLeft();
          marginRight = child.getMarginRight(); // Calculate child layout

          switch (edge) {
            // north + south
            case 1:
            case 2:
              // Full available width
              width = availWidth - marginLeft - marginRight; // Limit width to min/max

              if (width < hint.minWidth) {
                width = hint.minWidth;
              } else if (width > hint.maxWidth) {
                width = hint.maxWidth;
              } // Child preferred height


              height = heights[i]; // Compute position

              top = nextTop + util.computeVerticalAlignOffset(alignMap[edge], height, availHeight, marginTop, marginBottom);
              left = nextLeft + util.computeHorizontalAlignOffset(child.getAlignX() || "left", width, availWidth, marginLeft, marginRight); // Render the separator

              if (separatorWidths.y) {
                if (edge == 1) {
                  separatorTop = nextTop + height + marginTop + spacingY + marginBottom;
                } else {
                  separatorTop = nextTop + availHeight - height - marginTop - spacingY - marginBottom - separatorWidths.y;
                }

                separatorLeft = left;
                separatorWidth = availWidth;

                if (connectSeparators && separatorLeft > 0) {
                  separatorLeft -= spacingX + marginLeft;
                  separatorWidth += spacingX * 2;
                } else {
                  separatorLeft -= marginLeft;
                }

                this._renderSeparator(separatorY, {
                  left: separatorLeft + padding.left,
                  top: separatorTop + padding.top,
                  width: separatorWidth,
                  height: separatorWidths.y
                });
              } // Update available height


              used = height + marginTop + marginBottom + spacingY;

              if (separatorWidths.y) {
                used += separatorWidths.y + spacingY;
              }

              availHeight -= used; // Update coordinates, for next child

              if (edge == 1) {
                nextTop += used;
              }

              break;
            // west + east

            case 3:
            case 4:
              // Full available height
              height = availHeight - marginTop - marginBottom; // Limit height to min/max

              if (height < hint.minHeight) {
                height = hint.minHeight;
              } else if (height > hint.maxHeight) {
                height = hint.maxHeight;
              } // Child preferred width


              width = widths[i]; // Compute position

              left = nextLeft + util.computeHorizontalAlignOffset(alignMap[edge], width, availWidth, marginLeft, marginRight);
              top = nextTop + util.computeVerticalAlignOffset(child.getAlignY() || "top", height, availHeight, marginTop, marginBottom); // Render the separator

              if (separatorWidths.x) {
                if (edge == 3) {
                  separatorLeft = nextLeft + width + marginLeft + spacingX + marginRight;
                } else {
                  separatorLeft = nextLeft + availWidth - width - marginLeft - spacingX - marginRight - separatorWidths.x;
                }

                separatorTop = top;
                separatorHeight = availHeight;

                if (connectSeparators && separatorTop > 0) {
                  separatorTop -= spacingY + marginTop;
                  separatorHeight += spacingY * 2;
                } else {
                  separatorTop -= marginTop;
                }

                this._renderSeparator(separatorX, {
                  left: separatorLeft + padding.left,
                  top: separatorTop + padding.top,
                  width: separatorWidths.x,
                  height: separatorHeight
                });
              } // Update available height


              used = width + marginLeft + marginRight + spacingX;

              if (separatorWidths.x) {
                used += separatorWidths.x + spacingX;
              }

              availWidth -= used; // Update coordinates, for next child

              if (edge == 3) {
                nextLeft += used;
              }

              break;
            // center

            default:
              // Calculated width/height
              width = availWidth - marginLeft - marginRight;
              height = availHeight - marginTop - marginBottom; // Limit width to min/max

              if (width < hint.minWidth) {
                width = hint.minWidth;
              } else if (width > hint.maxWidth) {
                width = hint.maxWidth;
              } // Limit height to min/max


              if (height < hint.minHeight) {
                height = hint.minHeight;
              } else if (height > hint.maxHeight) {
                height = hint.maxHeight;
              } // Compute coordinates (respect margins and alignments for both axis)


              left = nextLeft + util.computeHorizontalAlignOffset(child.getAlignX() || "left", width, availWidth, marginLeft, marginRight);
              top = nextTop + util.computeVerticalAlignOffset(child.getAlignY() || "top", height, availHeight, marginTop, marginBottom);
          } // Apply layout


          child.renderLayout(left + padding.left, top + padding.top, width, height);
        }
      },

      /**
       * Computes the dimensions each separator on both the <code>x</code> and
       * <code>y</code> axis needs.
       *
       * @return {Map} Map with the keys <code>x</code> and
       *   <code>y</code>
       */
      _getSeparatorWidths: function _getSeparatorWidths() {
        var separatorX = this.getSeparatorX(),
            separatorY = this.getSeparatorY();

        if (separatorX || separatorY) {
          var decorationManager = qx.theme.manager.Decoration.getInstance();
        }

        if (separatorX) {
          var separatorInstanceX = decorationManager.resolve(separatorX);
          var separatorInsetsX = separatorInstanceX.getInsets();
          var separatorWidthX = separatorInsetsX.left + separatorInsetsX.right;
        }

        if (separatorY) {
          var separatorInstanceY = decorationManager.resolve(separatorY);
          var separatorInsetsY = separatorInstanceY.getInsets();
          var separatorWidthY = separatorInsetsY.top + separatorInsetsY.bottom;
        }

        return {
          x: separatorWidthX || 0,
          y: separatorWidthY || 0
        };
      },
      // overridden
      _computeSizeHint: function _computeSizeHint() {
        // Rebuild flex/width caches
        if (this._invalidChildrenCache) {
          this.__rebuildCache__P_60_4();
        }

        var children = this.__children__P_60_0;
        var edges = this.__edges__P_60_1;
        var length = children.length;
        var hint, child;
        var marginX, marginY;
        var widthX = 0,
            minWidthX = 0;
        var heightX = 0,
            minHeightX = 0;
        var widthY = 0,
            minWidthY = 0;
        var heightY = 0,
            minHeightY = 0;

        var separatorWidths = this._getSeparatorWidths();

        var spacingX = this.getSpacingX(),
            spacingY = this.getSpacingY();
        var spacingSumX = -spacingX,
            spacingSumY = -spacingY;

        if (separatorWidths.x) {
          spacingSumX -= separatorWidths.x + spacingX;
        }

        if (separatorWidths.y) {
          spacingSumY -= separatorWidths.y + spacingY;
        } // Detect children sizes


        for (var i = 0; i < length; i++) {
          child = children[i];
          hint = child.getSizeHint(); // Pre-cache margin sums

          marginX = child.getMarginLeft() + child.getMarginRight();
          marginY = child.getMarginTop() + child.getMarginBottom(); // Ok, this part is a bit complicated :)

          switch (edges[i]) {
            case 1:
            case 2:
              // Find the maximum width used by these fully stretched items
              // The recommended width used by these must add the currently
              // occupied width by the orthogonal ordered children.
              widthY = Math.max(widthY, hint.width + widthX + marginX);
              minWidthY = Math.max(minWidthY, hint.minWidth + minWidthX + marginX); // Add the needed heights of this widget

              heightY += hint.height + marginY;
              minHeightY += hint.minHeight + marginY; // Add spacing

              spacingSumY += spacingY;

              if (separatorWidths.y) {
                spacingSumY += separatorWidths.y + spacingY;
              }

              break;

            case 3:
            case 4:
              // Find the maximum height used by these fully stretched items
              // The recommended height used by these must add the currently
              // occupied height by the orthogonal ordered children.
              heightX = Math.max(heightX, hint.height + heightY + marginY);
              minHeightX = Math.max(minHeightX, hint.minHeight + minHeightY + marginY); // Add the needed widths of this widget

              widthX += hint.width + marginX;
              minWidthX += hint.minWidth + marginX; // Add spacing

              spacingSumX += spacingX;

              if (separatorWidths.x) {
                spacingSumX += separatorWidths.x + spacingX;
              }

              break;

            default:
              // A centered widget must be added to both sums as
              // it stretches into the remaining available space.
              widthX += hint.width + marginX;
              minWidthX += hint.minWidth + marginX;
              heightY += hint.height + marginY;
              minHeightY += hint.minHeight + marginY; // Add spacing

              spacingSumX += spacingX;

              if (separatorWidths.x) {
                spacingSumX += separatorWidths.x + spacingX;
              }

              spacingSumY += spacingY;

              if (separatorWidths.y) {
                spacingSumY += separatorWidths.y + spacingY;
              }

          }
        }

        var minWidth = Math.max(minWidthX, minWidthY) + spacingSumX;
        var width = Math.max(widthX, widthY) + spacingSumX;
        var minHeight = Math.max(minHeightX, minHeightY) + spacingSumY;
        var height = Math.max(heightX, heightY) + spacingSumY; // Return hint

        return {
          minWidth: minWidth,
          width: width,
          minHeight: minHeight,
          height: height
        };
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this.__edges__P_60_1 = this.__children__P_60_0 = null;
    }
  });
  qx.ui.layout.Dock.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "usage": "dynamic",
        "require": true
      },
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "qx.Class": {},
      "qx.util.PropertyUtil": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "qx.command.bindEnabled": {
          "load": true
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Fabian Jakobs (fjakobs)
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * This mixin is included by all widgets, which support an 'execute' like
   * buttons or menu entries.
   */
  qx.Mixin.define("qx.ui.core.MExecutable", {
    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */
    events: {
      /** Fired if the {@link #execute} method is invoked.*/
      execute: "qx.event.type.Event"
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /**
       * A command called if the {@link #execute} method is called, e.g. on a
       * button tap.
       */
      command: {
        check: "qx.ui.command.Command",
        apply: "_applyCommand",
        event: "changeCommand",
        nullable: true
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __executableBindingIds__P_116_0: null,
      __semaphore__P_116_1: false,
      __executeListenerId__P_116_2: null,

      /**
       * @type {Map} Set of properties, which will by synced from the command to the
       *    including widget
       *
       * @lint ignoreReferenceField(_bindableProperties)
       */
      _bindableProperties: qx.core.Environment.select("qx.command.bindEnabled", {
        "true": ["enabled", "label", "icon", "toolTipText", "value", "menu"],
        "false": ["label", "icon", "toolTipText", "value", "menu"]
      }),

      /**
       * Initiate the execute action.
       */
      execute: function execute() {
        var cmd = this.getCommand();

        if (cmd) {
          if (this.__semaphore__P_116_1) {
            this.__semaphore__P_116_1 = false;
          } else {
            this.__semaphore__P_116_1 = true;
            cmd.execute(this);
          }
        }

        this.fireEvent("execute");
      },

      /**
       * Handler for the execute event of the command.
       *
       * @param e {qx.event.type.Event} The execute event of the command.
       */
      __onCommandExecute__P_116_3: function __onCommandExecute__P_116_3(e) {
        if (this.isEnabled()) {
          if (this.__semaphore__P_116_1) {
            this.__semaphore__P_116_1 = false;
            return;
          }

          if (this.isEnabled()) {
            this.__semaphore__P_116_1 = true;
            this.execute();
          }
        }
      },
      // property apply
      _applyCommand: function _applyCommand(value, old) {
        // execute forwarding
        if (old != null) {
          old.removeListenerById(this.__executeListenerId__P_116_2);
        }

        if (value != null) {
          this.__executeListenerId__P_116_2 = value.addListener("execute", this.__onCommandExecute__P_116_3, this);
        } // binding stuff


        var ids = this.__executableBindingIds__P_116_0;

        if (ids == null) {
          this.__executableBindingIds__P_116_0 = ids = {};
        }

        var selfPropertyValue;

        for (var i = 0; i < this._bindableProperties.length; i++) {
          var property = this._bindableProperties[i]; // remove the old binding

          if (old != null && !old.isDisposed() && ids[property] != null) {
            old.removeBinding(ids[property]);
            ids[property] = null;
          } // add the new binding


          if (value != null && qx.Class.hasProperty(this.constructor, property)) {
            // handle the init value (don't sync the initial null)
            var cmdPropertyValue = value.get(property);

            if (cmdPropertyValue == null) {
              selfPropertyValue = this.get(property); // check also for themed values [BUG #5906]

              if (selfPropertyValue == null) {
                // update the appearance to make sure every themed property is up to date
                this.$$resyncNeeded = true;
                this.syncAppearance();
                selfPropertyValue = qx.util.PropertyUtil.getThemeValue(this, property);
              }
            } else {
              // Reset the self property value [BUG #4534]
              selfPropertyValue = null;
            } // set up the binding


            ids[property] = value.bind(property, this, property); // reapply the former value

            if (selfPropertyValue) {
              this.set(property, selfPropertyValue);
            }
          }
        }
      }
    },
    destruct: function destruct() {
      this._applyCommand(null, this.getCommand());

      this.__executableBindingIds__P_116_0 = null;
    }
  });
  qx.ui.core.MExecutable.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Interface": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * Form interface for all form widgets which are executable in some way. This
   * could be a button for example.
   */
  qx.Interface.define("qx.ui.form.IExecutable", {
    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */
    events: {
      /**
       * Fired when the widget is executed. Sets the "data" property of the
       * event to the object that issued the command.
       */
      execute: "qx.event.type.Data"
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      /*
      ---------------------------------------------------------------------------
        COMMAND PROPERTY
      ---------------------------------------------------------------------------
      */

      /**
       * Set the command of this executable.
       *
       * @param command {qx.ui.command.Command} The command.
       */
      setCommand: function setCommand(command) {
        return arguments.length == 1;
      },

      /**
       * Return the current set command of this executable.
       *
       * @return {qx.ui.command.Command} The current set command.
       */
      getCommand: function getCommand() {},

      /**
       * Fire the "execute" event on the command.
       */
      execute: function execute() {}
    }
  });
  qx.ui.form.IExecutable.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "usage": "dynamic",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.layout.Abstract": {
        "require": true
      },
      "qx.ui.layout.Util": {},
      "qx.ui.basic.Label": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "qx.debug": {
          "load": true
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * A atom layout. Used to place an image and label in relation
   * to each other. Useful to create buttons, list items, etc.
   *
   * *Features*
   *
   * * Gap between icon and text (using {@link #gap})
   * * Vertical and horizontal mode (using {@link #iconPosition})
   * * Sorting options to place first child on top/left or bottom/right (using {@link #iconPosition})
   * * Automatically middles/centers content to the available space
   * * Auto-sizing
   * * Supports more than two children (will be processed the same way like the previous ones)
   *
   * *Item Properties*
   *
   * None
   *
   * *Notes*
   *
   * * Does not support margins and alignment of {@link qx.ui.core.LayoutItem}.
   *
   * *Alternative Names*
   *
   * None
   */
  qx.Class.define("qx.ui.layout.Atom", {
    extend: qx.ui.layout.Abstract,

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /** The gap between the icon and the text */
      gap: {
        check: "Integer",
        init: 4,
        apply: "_applyLayoutChange"
      },

      /** The position of the icon in relation to the text */
      iconPosition: {
        check: ["left", "top", "right", "bottom", "top-left", "bottom-left", "top-right", "bottom-right"],
        init: "left",
        apply: "_applyLayoutChange"
      },

      /**
       * Whether the content should be rendered centrally when to much space
       * is available. Enabling this property centers in both axis. The behavior
       * when disabled of the centering depends on the {@link #iconPosition} property.
       * If the icon position is <code>left</code> or <code>right</code>, the X axis
       * is not centered, only the Y axis. If the icon position is <code>top</code>
       * or <code>bottom</code>, the Y axis is not centered. In case of e.g. an
       * icon position of <code>top-left</code> no axis is centered.
       */
      center: {
        check: "Boolean",
        init: false,
        apply: "_applyLayoutChange"
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      /*
      ---------------------------------------------------------------------------
        LAYOUT INTERFACE
      ---------------------------------------------------------------------------
      */
      // overridden
      verifyLayoutProperty: qx.core.Environment.select("qx.debug", {
        "true": function _true(item, name, value) {
          this.assert(false, "The property '" + name + "' is not supported by the Atom layout!");
        },
        "false": null
      }),
      // overridden
      renderLayout: function renderLayout(availWidth, availHeight, padding) {
        var left = padding.left;
        var top = padding.top;
        var Util = qx.ui.layout.Util;
        var iconPosition = this.getIconPosition();

        var children = this._getLayoutChildren();

        var length = children.length;
        var width, height;
        var child, hint;
        var gap = this.getGap();
        var center = this.getCenter(); // reverse ordering

        var allowedPositions = ["bottom", "right", "top-right", "bottom-right"];

        if (allowedPositions.indexOf(iconPosition) != -1) {
          var start = length - 1;
          var end = -1;
          var increment = -1;
        } else {
          var start = 0;
          var end = length;
          var increment = 1;
        } // vertical


        if (iconPosition == "top" || iconPosition == "bottom") {
          if (center) {
            var allocatedHeight = 0;

            for (var i = start; i != end; i += increment) {
              height = children[i].getSizeHint().height;

              if (height > 0) {
                allocatedHeight += height;

                if (i != start) {
                  allocatedHeight += gap;
                }
              }
            }

            top += Math.round((availHeight - allocatedHeight) / 2);
          }

          var childTop = top;

          for (var i = start; i != end; i += increment) {
            child = children[i];
            hint = child.getSizeHint();
            width = Math.min(hint.maxWidth, Math.max(availWidth, hint.minWidth));
            height = hint.height;
            left = Util.computeHorizontalAlignOffset("center", width, availWidth) + padding.left;
            child.renderLayout(left, childTop, width, height); // Ignore pseudo invisible elements

            if (height > 0) {
              childTop = top + height + gap;
            }
          }
        } // horizontal
        // in this way it also supports shrinking of the first label
        else {
          var remainingWidth = availWidth;
          var shrinkTarget = null;
          var count = 0;

          for (var i = start; i != end; i += increment) {
            child = children[i];
            width = child.getSizeHint().width;

            if (width > 0) {
              if (!shrinkTarget && child instanceof qx.ui.basic.Label) {
                shrinkTarget = child;
              } else {
                remainingWidth -= width;
              }

              count++;
            }
          }

          if (count > 1) {
            var gapSum = (count - 1) * gap;
            remainingWidth -= gapSum;
          }

          if (shrinkTarget) {
            var hint = shrinkTarget.getSizeHint();
            var shrinkTargetWidth = Math.max(hint.minWidth, Math.min(remainingWidth, hint.maxWidth));
            remainingWidth -= shrinkTargetWidth;
          }

          if (center && remainingWidth > 0) {
            left += Math.round(remainingWidth / 2);
          }

          for (var i = start; i != end; i += increment) {
            child = children[i];
            hint = child.getSizeHint();
            height = Math.min(hint.maxHeight, Math.max(availHeight, hint.minHeight));

            if (child === shrinkTarget) {
              width = shrinkTargetWidth;
            } else {
              width = hint.width;
            }

            var align = "middle";

            if (iconPosition == "top-left" || iconPosition == "top-right") {
              align = "top";
            } else if (iconPosition == "bottom-left" || iconPosition == "bottom-right") {
              align = "bottom";
            }

            var childTop = top + Util.computeVerticalAlignOffset(align, hint.height, availHeight);
            child.renderLayout(left, childTop, width, height); // Ignore pseudo invisible childs for gap e.g.
            // empty text or unavailable images

            if (width > 0) {
              left += width + gap;
            }
          }
        }
      },
      // overridden
      _computeSizeHint: function _computeSizeHint() {
        var children = this._getLayoutChildren();

        var length = children.length;
        var hint, result; // Fast path for only one child

        if (length === 1) {
          var hint = children[0].getSizeHint(); // Work on a copy, but do not respect max
          // values as a Atom can be rendered bigger
          // than its content.

          result = {
            width: hint.width,
            height: hint.height,
            minWidth: hint.minWidth,
            minHeight: hint.minHeight
          };
        } else {
          var minWidth = 0,
              width = 0;
          var minHeight = 0,
              height = 0;
          var iconPosition = this.getIconPosition();
          var gap = this.getGap();

          if (iconPosition === "top" || iconPosition === "bottom") {
            var count = 0;

            for (var i = 0; i < length; i++) {
              hint = children[i].getSizeHint(); // Max of widths

              width = Math.max(width, hint.width);
              minWidth = Math.max(minWidth, hint.minWidth); // Sum of heights

              if (hint.height > 0) {
                height += hint.height;
                minHeight += hint.minHeight;
                count++;
              }
            }

            if (count > 1) {
              var gapSum = (count - 1) * gap;
              height += gapSum;
              minHeight += gapSum;
            }
          } else {
            var count = 0;

            for (var i = 0; i < length; i++) {
              hint = children[i].getSizeHint(); // Max of heights

              height = Math.max(height, hint.height);
              minHeight = Math.max(minHeight, hint.minHeight); // Sum of widths

              if (hint.width > 0) {
                width += hint.width;
                minWidth += hint.minWidth;
                count++;
              }
            }

            if (count > 1) {
              var gapSum = (count - 1) * gap;
              width += gapSum;
              minWidth += gapSum;
            }
          } // Build hint


          result = {
            minWidth: minWidth,
            width: width,
            minHeight: minHeight,
            height: height
          };
        }

        return result;
      }
    }
  });
  qx.ui.layout.Atom.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.basic.Atom": {
        "construct": true,
        "require": true
      },
      "qx.ui.core.MExecutable": {
        "require": true
      },
      "qx.ui.form.IExecutable": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * A Button widget which supports various states and allows it to be used
   * via the mouse, touch, pen and the keyboard.
   *
   * If the user presses the button by clicking on it, or the <code>Enter</code> or
   * <code>Space</code> keys, the button fires an {@link qx.ui.core.MExecutable#execute} event.
   *
   * If the {@link qx.ui.core.MExecutable#command} property is set, the
   * command is executed as well.
   *
   * *Example*
   *
   * Here is a little example of how to use the widget.
   *
   * <pre class='javascript'>
   *   var button = new qx.ui.form.Button("Hello World");
   *
   *   button.addListener("execute", function(e) {
   *     alert("Button was clicked");
   *   }, this);
   *
   *   this.getRoot().add(button);
   * </pre>
   *
   * This example creates a button with the label "Hello World" and attaches an
   * event listener to the {@link #execute} event.
   *
   * *External Documentation*
   *
   * <a href='http://qooxdoo.org/docs/#desktop/widget/button.md' target='_blank'>
   * Documentation of this widget in the qooxdoo manual.</a>
   */
  qx.Class.define("qx.ui.form.Button", {
    extend: qx.ui.basic.Atom,
    include: [qx.ui.core.MExecutable],
    implement: [qx.ui.form.IExecutable],

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param label {String} label of the atom
     * @param icon {String?null} Icon URL of the atom
     * @param command {qx.ui.command.Command?null} Command instance to connect with
     */
    construct: function construct(label, icon, command) {
      qx.ui.basic.Atom.constructor.call(this, label, icon);

      if (command != null) {
        this.setCommand(command);
      } // ARIA attrs


      this.getContentElement().setAttribute("role", "button"); // Add listeners

      this.addListener("pointerover", this._onPointerOver);
      this.addListener("pointerout", this._onPointerOut);
      this.addListener("pointerdown", this._onPointerDown);
      this.addListener("pointerup", this._onPointerUp);
      this.addListener("tap", this._onTap);
      this.addListener("keydown", this._onKeyDown);
      this.addListener("keyup", this._onKeyUp); // Stop events

      this.addListener("dblclick", function (e) {
        e.stopPropagation();
      });
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      // overridden
      appearance: {
        refine: true,
        init: "button"
      },
      // overridden
      focusable: {
        refine: true,
        init: true
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    /* eslint-disable @qooxdoo/qx/no-refs-in-members */
    members: {
      // overridden

      /**
       * @lint ignoreReferenceField(_forwardStates)
       */
      _forwardStates: {
        focused: true,
        hovered: true,
        pressed: true,
        disabled: true
      },

      /*
      ---------------------------------------------------------------------------
        USER API
      ---------------------------------------------------------------------------
      */

      /**
       * Manually press the button
       */
      press: function press() {
        if (this.hasState("abandoned")) {
          return;
        }

        this.addState("pressed");
      },

      /**
       * Manually release the button
       */
      release: function release() {
        if (this.hasState("pressed")) {
          this.removeState("pressed");
        }
      },

      /**
       * Completely reset the button (remove all states)
       */
      reset: function reset() {
        this.removeState("pressed");
        this.removeState("abandoned");
        this.removeState("hovered");
      },

      /*
      ---------------------------------------------------------------------------
        EVENT LISTENERS
      ---------------------------------------------------------------------------
      */

      /**
       * Listener method for "pointerover" event
       * <ul>
       * <li>Adds state "hovered"</li>
       * <li>Removes "abandoned" and adds "pressed" state (if "abandoned" state is set)</li>
       * </ul>
       *
       * @param e {qx.event.type.Pointer} Mouse event
       */
      _onPointerOver: function _onPointerOver(e) {
        if (!this.isEnabled() || e.getTarget() !== this) {
          return;
        }

        if (this.hasState("abandoned")) {
          this.removeState("abandoned");
          this.addState("pressed");
        }

        this.addState("hovered");
      },

      /**
       * Listener method for "pointerout" event
       * <ul>
       * <li>Removes "hovered" state</li>
       * <li>Adds "abandoned" and removes "pressed" state (if "pressed" state is set)</li>
       * </ul>
       *
       * @param e {qx.event.type.Pointer} Mouse event
       */
      _onPointerOut: function _onPointerOut(e) {
        if (!this.isEnabled() || e.getTarget() !== this) {
          return;
        }

        this.removeState("hovered");

        if (this.hasState("pressed")) {
          this.removeState("pressed");
          this.addState("abandoned");
        }
      },

      /**
       * Listener method for "pointerdown" event
       * <ul>
       * <li>Removes "abandoned" state</li>
       * <li>Adds "pressed" state</li>
       * </ul>
       *
       * @param e {qx.event.type.Pointer} Mouse event
       */
      _onPointerDown: function _onPointerDown(e) {
        if (!e.isLeftPressed()) {
          return;
        }

        e.stopPropagation(); // Activate capturing if the button get a pointerout while
        // the button is pressed.

        this.capture();
        this.removeState("abandoned");
        this.addState("pressed");
      },

      /**
       * Listener method for "pointerup" event
       * <ul>
       * <li>Removes "pressed" state (if set)</li>
       * <li>Removes "abandoned" state (if set)</li>
       * <li>Adds "hovered" state (if "abandoned" state is not set)</li>
       *</ul>
       *
       * @param e {qx.event.type.Pointer} Mouse event
       */
      _onPointerUp: function _onPointerUp(e) {
        this.releaseCapture(); // We must remove the states before executing the command
        // because in cases were the window lost the focus while
        // executing we get the capture phase back (mouseout).

        var hasPressed = this.hasState("pressed");
        var hasAbandoned = this.hasState("abandoned");

        if (hasPressed) {
          this.removeState("pressed");
        }

        if (hasAbandoned) {
          this.removeState("abandoned");
        }

        e.stopPropagation();
      },

      /**
       * Listener method for "tap" event which stops the propagation.
       *
       * @param e {qx.event.type.Pointer} Pointer event
       */
      _onTap: function _onTap(e) {
        // "execute" is fired here so that the button can be dragged
        // without executing it (e.g. in a TabBar with overflow)
        this.execute();
        e.stopPropagation();
      },

      /**
       * Listener method for "keydown" event.<br/>
       * Removes "abandoned" and adds "pressed" state
       * for the keys "Enter" or "Space"
       *
       * @param e {Event} Key event
       */
      _onKeyDown: function _onKeyDown(e) {
        switch (e.getKeyIdentifier()) {
          case "Enter":
          case "Space":
            this.removeState("abandoned");
            this.addState("pressed");
            e.stopPropagation();
        }
      },

      /**
       * Listener method for "keyup" event.<br/>
       * Removes "abandoned" and "pressed" state (if "pressed" state is set)
       * for the keys "Enter" or "Space"
       *
       * @param e {Event} Key event
       */
      _onKeyUp: function _onKeyUp(e) {
        switch (e.getKeyIdentifier()) {
          case "Enter":
          case "Space":
            if (this.hasState("pressed")) {
              this.removeState("abandoned");
              this.removeState("pressed");
              this.execute();
              e.stopPropagation();
            }

        }
      }
    }
  });
  qx.ui.form.Button.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.form.TextField": {
        "require": true
      },
      "qx.html.Input": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
  
  ************************************************************************ */

  /**
   * A password input field, which hides the entered text.
   */
  qx.Class.define("qx.ui.form.PasswordField", {
    extend: qx.ui.form.TextField,
    members: {
      // overridden
      _createInputElement: function _createInputElement() {
        return new qx.html.Input("password");
      }
    }
  });
  qx.ui.form.PasswordField.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Interface": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.form.IField": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * Form interface for all form widgets which have boolean as their primary
   * data type like a checkbox.
   */
  qx.Interface.define("qx.ui.form.IBooleanForm", {
    extend: qx.ui.form.IField,

    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */
    events: {
      /** Fired when the value was modified */
      changeValue: "qx.event.type.Data"
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      /*
      ---------------------------------------------------------------------------
        VALUE PROPERTY
      ---------------------------------------------------------------------------
      */

      /**
       * Sets the element's value.
       *
       * @param value {Boolean|null} The new value of the element.
       */
      setValue: function setValue(value) {
        return arguments.length == 1;
      },

      /**
       * Resets the element's value to its initial value.
       */
      resetValue: function resetValue() {},

      /**
       * The element's user set value.
       *
       * @return {Boolean|null} The value.
       */
      getValue: function getValue() {}
    }
  });
  qx.ui.form.IBooleanForm.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Interface": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.form.RadioGroup": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * Each object, which should be managed by a {@link RadioGroup} have to
   * implement this interface.
   */
  qx.Interface.define("qx.ui.form.IRadioItem", {
    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */
    events: {
      /** Fired when the item was checked or unchecked */
      changeValue: "qx.event.type.Data"
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      /**
       * Set whether the item is checked
       *
       * @param value {Boolean} whether the item should be checked
       */
      setValue: function setValue(value) {},

      /**
       * Get whether the item is checked
       *
       * @return {Boolean} whether the item it checked
       */
      getValue: function getValue() {},

      /**
       * Set the radiogroup, which manages this item
       *
       * @param value {qx.ui.form.RadioGroup} The radiogroup, which should
       *     manage the item.
       */
      setGroup: function setGroup(value) {
        this.assertInstance(value, qx.ui.form.RadioGroup);
      },

      /**
       * Get the radiogroup, which manages this item
       *
       * @return {qx.ui.form.RadioGroup} The radiogroup, which manages the item.
       */
      getGroup: function getGroup() {}
    }
  });
  qx.ui.form.IRadioItem.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.basic.Atom": {
        "construct": true,
        "require": true
      },
      "qx.ui.core.MExecutable": {
        "require": true
      },
      "qx.ui.form.IBooleanForm": {
        "require": true
      },
      "qx.ui.form.IExecutable": {
        "require": true
      },
      "qx.ui.form.IRadioItem": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * A toggle Button widget
   *
   * If the user presses the button by tapping on it pressing the enter or
   * space key, the button toggles between the pressed an not pressed states.
   */
  qx.Class.define("qx.ui.form.ToggleButton", {
    extend: qx.ui.basic.Atom,
    include: [qx.ui.core.MExecutable],
    implement: [qx.ui.form.IBooleanForm, qx.ui.form.IExecutable, qx.ui.form.IRadioItem],

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * Creates a ToggleButton.
     *
     * @param label {String} The text on the button.
     * @param icon {String} An URI to the icon of the button.
     */
    construct: function construct(label, icon) {
      qx.ui.basic.Atom.constructor.call(this, label, icon); // register pointer events

      this.addListener("pointerover", this._onPointerOver);
      this.addListener("pointerout", this._onPointerOut);
      this.addListener("pointerdown", this._onPointerDown);
      this.addListener("pointerup", this._onPointerUp); // register keyboard events

      this.addListener("keydown", this._onKeyDown);
      this.addListener("keyup", this._onKeyUp); // register execute event

      this.addListener("execute", this._onExecute, this); // ARIA attrs

      var contentEl = this.getContentElement();
      contentEl.setAttribute("role", "button");
      contentEl.setAttribute("aria-pressed", false);
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      // overridden
      appearance: {
        refine: true,
        init: "toggle-button"
      },
      // overridden
      focusable: {
        refine: true,
        init: true
      },

      /** The value of the widget. True, if the widget is checked. */
      value: {
        check: "Boolean",
        nullable: true,
        event: "changeValue",
        apply: "_applyValue",
        init: false
      },

      /** The assigned qx.ui.form.RadioGroup which handles the switching between registered buttons. */
      group: {
        check: "qx.ui.form.RadioGroup",
        nullable: true,
        apply: "_applyGroup"
      },

      /**
       * Whether the button has a third state. Use this for tri-state checkboxes.
       *
       * When enabled, the value null of the property value stands for "undetermined",
       * while true is mapped to "enabled" and false to "disabled" as usual. Note
       * that the value property is set to false initially.
       *
       */
      triState: {
        check: "Boolean",
        apply: "_applyTriState",
        nullable: true,
        init: null
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      /** The assigned {@link qx.ui.form.RadioGroup} which handles the switching between registered buttons */
      _applyGroup: function _applyGroup(value, old) {
        if (old) {
          old.remove(this);
        }

        if (value) {
          value.add(this);
        }
      },

      /**
       * Changes the state of the button dependent on the checked value.
       *
       * @param value {Boolean} Current value
       * @param old {Boolean} Previous value
       */
      _applyValue: function _applyValue(value, old) {
        value ? this.addState("checked") : this.removeState("checked");
        var ariaPressed = Boolean(value);

        if (this.isTriState()) {
          if (value === null) {
            ariaPressed = "mixed";
            this.addState("undetermined");
          } else if (old === null) {
            this.removeState("undetermined");
          }
        }

        this.getContentElement().setAttribute("aria-pressed", ariaPressed);
      },

      /**
       * Apply value property when triState property is modified.
       *
       * @param value {Boolean} Current value
       * @param old {Boolean} Previous value
       */
      _applyTriState: function _applyTriState(value, old) {
        this._applyValue(this.getValue());
      },

      /**
       * Handler for the execute event.
       *
       * @param e {qx.event.type.Event} The execute event.
       */
      _onExecute: function _onExecute(e) {
        this.toggleValue();
      },

      /**
       * Listener method for "pointerover" event.
       * <ul>
       * <li>Adds state "hovered"</li>
       * <li>Removes "abandoned" and adds "pressed" state (if "abandoned" state is set)</li>
       * </ul>
       *
       * @param e {qx.event.type.Pointer} Pointer event
       */
      _onPointerOver: function _onPointerOver(e) {
        if (e.getTarget() !== this) {
          return;
        }

        this.addState("hovered");

        if (this.hasState("abandoned")) {
          this.removeState("abandoned");
          this.addState("pressed");
        }
      },

      /**
       * Listener method for "pointerout" event.
       * <ul>
       * <li>Removes "hovered" state</li>
       * <li>Adds "abandoned" state (if "pressed" state is set)</li>
       * <li>Removes "pressed" state (if "pressed" state is set and button is not checked)
       * </ul>
       *
       * @param e {qx.event.type.Pointer} pointer event
       */
      _onPointerOut: function _onPointerOut(e) {
        if (e.getTarget() !== this) {
          return;
        }

        this.removeState("hovered");

        if (this.hasState("pressed")) {
          if (!this.getValue()) {
            this.removeState("pressed");
          }

          this.addState("abandoned");
        }
      },

      /**
       * Listener method for "pointerdown" event.
       * <ul>
       * <li>Activates capturing</li>
       * <li>Removes "abandoned" state</li>
       * <li>Adds "pressed" state</li>
       * </ul>
       *
       * @param e {qx.event.type.Pointer} pointer event
       */
      _onPointerDown: function _onPointerDown(e) {
        if (!e.isLeftPressed()) {
          return;
        } // Activate capturing if the button get a pointerout while
        // the button is pressed.


        this.capture();
        this.removeState("abandoned");
        this.addState("pressed");
        e.stopPropagation();
      },

      /**
       * Listener method for "pointerup" event.
       * <ul>
       * <li>Releases capturing</li>
       * <li>Removes "pressed" state (if not "abandoned" state is set and "pressed" state is set)</li>
       * <li>Removes "abandoned" state (if set)</li>
       * <li>Toggles {@link #value} (if state "abandoned" is not set and state "pressed" is set)</li>
       * </ul>
       *
       * @param e {qx.event.type.Pointer} pointer event
       */
      _onPointerUp: function _onPointerUp(e) {
        this.releaseCapture();

        if (this.hasState("abandoned")) {
          this.removeState("abandoned");
        } else if (this.hasState("pressed")) {
          this.execute();
        }

        this.removeState("pressed");
        e.stopPropagation();
      },

      /**
       * Listener method for "keydown" event.<br/>
       * Removes "abandoned" and adds "pressed" state
       * for the keys "Enter" or "Space"
       *
       * @param e {Event} Key event
       */
      _onKeyDown: function _onKeyDown(e) {
        switch (e.getKeyIdentifier()) {
          case "Enter":
          case "Space":
            this.removeState("abandoned");
            this.addState("pressed");
            e.stopPropagation();
        }
      },

      /**
       * Listener method for "keyup" event.<br/>
       * Removes "abandoned" and "pressed" state (if "pressed" state is set)
       * for the keys "Enter" or "Space". It also toggles the {@link #value} property.
       *
       * @param e {Event} Key event
       */
      _onKeyUp: function _onKeyUp(e) {
        if (!this.hasState("pressed")) {
          return;
        }

        switch (e.getKeyIdentifier()) {
          case "Enter":
          case "Space":
            this.removeState("abandoned");
            this.execute();
            this.removeState("pressed");
            e.stopPropagation();
        }
      }
    }
  });
  qx.ui.form.ToggleButton.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2009 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * Can be included for implementing {@link qx.ui.form.IModel}. It only contains
   * a nullable property named 'model' with a 'changeModel' event.
   */
  qx.Mixin.define("qx.ui.form.MModelProperty", {
    properties: {
      /**
       * Model property for storing additional information for the including
       * object. It can act as value property on form items for example.
       *
       * Be careful using that property as this is used for the
       * {@link qx.ui.form.MModelSelection} it has some restrictions:
       *
       * * Don't use equal models in one widget using the
       *     {@link qx.ui.form.MModelSelection}.
       *
       * * Avoid setting only some model properties if the widgets are added to
       *     a {@link qx.ui.form.MModelSelection} widget.
       *
       * Both restrictions result of the fact, that the set models are deputies
       * for their widget.
       */
      model: {
        nullable: true,
        event: "changeModel",
        apply: "_applyModel",
        dereference: true
      }
    },
    members: {
      // apply method
      _applyModel: function _applyModel(value, old) {// Empty implementation
      }
    }
  });
  qx.ui.form.MModelProperty.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Interface": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * Each object which wants to store data representative for the real item
   * should implement this interface.
   */
  qx.Interface.define("qx.ui.form.IModel", {
    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */
    events: {
      /** Fired when the model data changes */
      changeModel: "qx.event.type.Data"
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      /**
       * Set the representative data for the item.
       *
       * @param value {var} The data.
       */
      setModel: function setModel(value) {},

      /**
       * Returns the representative data for the item
       *
       * @return {var} The data.
       */
      getModel: function getModel() {},

      /**
       * Sets the representative data to null.
       */
      resetModel: function resetModel() {}
    }
  });
  qx.ui.form.IModel.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Interface": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2021 Zenesis Ltd (https://www.zenesis.com)
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * John Spackman (github.com/johnspackman)
  
  ************************************************************************ */

  /**
   * This is a marker interface for classes which can act as a children of
   * {@link qx.ui.form.List}
   */
  qx.Interface.define("qx.ui.form.IListItem", {});
  qx.ui.form.IListItem.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.form.ToggleButton": {
        "construct": true,
        "require": true
      },
      "qx.ui.form.MForm": {
        "require": true
      },
      "qx.ui.form.MModelProperty": {
        "require": true
      },
      "qx.ui.form.IForm": {
        "require": true
      },
      "qx.ui.form.IModel": {
        "require": true
      },
      "qx.ui.form.IListItem": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Fabian Jakobs (fjakobs)
       * Andreas Ecker (ecker)
  
  ************************************************************************ */

  /**
   * A check box widget with an optional label.
   */
  qx.Class.define("qx.ui.form.CheckBox", {
    extend: qx.ui.form.ToggleButton,
    include: [qx.ui.form.MForm, qx.ui.form.MModelProperty],
    implement: [qx.ui.form.IForm, qx.ui.form.IModel, qx.ui.form.IListItem],

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param label {String?null} An optional label for the check box.
     */
    construct: function construct(label) {
      {
        this.assertArgumentsCount(arguments, 0, 1);
      }
      qx.ui.form.ToggleButton.constructor.call(this, label); // Initialize the checkbox to a valid value (the default is null which
      // is invalid)

      this.setValue(false); // ARIA attrs

      var contentEl = this.getContentElement();
      contentEl.setAttribute("role", "checkbox");
      contentEl.removeAttribute("aria-pressed");
      contentEl.setAttribute("aria-checked", false);
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      // overridden
      appearance: {
        refine: true,
        init: "checkbox"
      },
      // overridden
      allowGrowX: {
        refine: true,
        init: false
      }
    },

    /* eslint-disable @qooxdoo/qx/no-refs-in-members */
    members: {
      /**
       * @lint ignoreReferenceField(_forwardStates)
       */
      _forwardStates: {
        invalid: true,
        focused: true,
        undetermined: true,
        checked: true,
        hovered: true
      },

      /**
       * overridden (from MExecutable to keep the icon out of the binding)
       * @lint ignoreReferenceField(_bindableProperties)
       */
      _bindableProperties: ["enabled", "label", "toolTipText", "value", "menu"],
      // overridden
      _applyValue: function _applyValue(value, old) {
        value ? this.addState("checked") : this.removeState("checked");
        var ariaChecked = Boolean(value);

        if (this.isTriState()) {
          if (value === null) {
            ariaChecked = "mixed";
            this.addState("undetermined");
          } else if (old === null) {
            this.removeState("undetermined");
          }
        } // ARIA attrs


        this.getContentElement().setAttribute("aria-checked", ariaChecked);
      }
    }
  });
  qx.ui.form.CheckBox.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.log.Logger": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2009 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
  
  ************************************************************************ */

  /**
   * A wrapper for Cookie handling.
   *
   * Previous versions of qooxoo use `escape()` and `unescape()` functions. Since those functions
   * are deprecated, then now qooxdoo use `encodeURIComponent()` and `decodeURIComponent()` functions.
   * This may break some cookies.
   * There are no issues with special characters like `~!@#$%^&*(){}[]=:/,;?+\'"\\` but some unicode
   * characters like `äëíöü` (etc) are encoded different by `escape()` and `encodeURIComponent()`,
   * so you must take care of this change if you use unicode characters.
   */
  qx.Bootstrap.define("qx.bom.Cookie", {
    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */
    statics: {
      /*
      ---------------------------------------------------------------------------
        USER APPLICATION METHODS
      ---------------------------------------------------------------------------
      */

      /**
       * Returns the string value of a cookie.
       *
       * @param key {String} The key for the saved string value.
       * @return {null | String} Returns the saved string value, if the cookie
       *    contains a value for the key, <code>null</code> otherwise.
       */
      get: function get(key) {
        var start = document.cookie.indexOf(key + "=");
        var len = start + key.length + 1;

        if (!start && key != document.cookie.substring(0, key.length)) {
          return null;
        }

        if (start == -1) {
          return null;
        }

        var end = document.cookie.indexOf(";", len);

        if (end == -1) {
          end = document.cookie.length;
        }

        try {
          return decodeURIComponent(document.cookie.substring(len, end));
        } catch (URIError) {
          qx.log.Logger.error("Error decoding URI components", URIError.message);
          return null;
        }
      },

      /**
       * Sets the string value of a cookie.
       *
       * @param key {String} The key for the string value.
       * @param value {String} The string value.
       * @param expires {Number?null} The expires in days starting from now,
       *    or <code>null</code> if the cookie should deleted after browser close.
       * @param path {String?null} Path value.
       * @param domain {String?null} Domain value.
       * @param secure {Boolean?null} Secure flag.
       * @param sameSite {String?null} sameSite value. (Lax, Strict, None)
       */
      set: function set(key, value, expires, path, domain, secure, sameSite) {
        // Generate cookie
        var cookie = [key, "=", encodeURIComponent(value)];

        if (expires) {
          var today = new Date();
          today.setTime(today.getTime());
          cookie.push(";expires=", new Date(today.getTime() + expires * 1000 * 60 * 60 * 24).toGMTString());
        }

        if (path) {
          cookie.push(";path=", path);
        }

        if (domain) {
          cookie.push(";domain=", domain);
        }

        if (secure) {
          cookie.push(";secure");
        }

        cookie.push(";sameSite=", sameSite || "Strict"); // Store cookie

        document.cookie = cookie.join("");
      },

      /**
       * Deletes the string value of a cookie.
       *
       * @param key {String} The key for the string value.
       * @param path {String?null} Path value.
       * @param domain {String?null} Domain value.
       */
      del: function del(key, path, domain) {
        if (!qx.bom.Cookie.get(key)) {
          return;
        } // Generate cookie


        var cookie = [key, "="];

        if (path) {
          cookie.push(";path=", path);
        }

        if (domain) {
          cookie.push(";domain=", domain);
        }

        cookie.push(";expires=Thu, 01-Jan-1970 00:00:01 GMT"); // Store cookie

        document.cookie = cookie.join("");
      }
    }
  });
  qx.bom.Cookie.$$dbClassInfo = $$dbClassInfo;
})();
//# sourceMappingURL=package-15.js.map?dt=1655815252684
qx.$$packageData['15'] = {
  "locales": {},
  "resources": {},
  "translations": {}
};
