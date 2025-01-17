'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash.deburr');

var _lodash2 = _interopRequireDefault(_lodash);

var _widthsMap = require('./widthsMap');

var _widthsMap2 = _interopRequireDefault(_widthsMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var settingsDefaults = { font: 'Arial', size: 100 };

// Unicode range of CJK characters & punctuation
var cjkCharacterRange = /[\u3000-\u9FEF\u3000-\u303F\uD7B0–\uD7FF\uFE30-\uFE4F\uFF00-\uFFEF\u1100-\u11FF\uA960–\uA97F\uAC00-\uD7AF]/;

var getWidth = function getWidth(string, settings) {
  var sett = _extends({}, settingsDefaults, settings);
  var font = sett.font.toLowerCase();
  var size = sett.size;
  var variant = 0 + (sett.bold ? 1 : 0) + (sett.italic ? 2 : 0);
  var map = sett.map || _widthsMap2.default;
  var available = Object.keys(map);
  if (available.indexOf(font) === -1) {
    throw new Error('This font is not supported. Supported fonts are: ' + available.join(', '));
  }
  var totalWidth = 0;
  (0, _lodash2.default)(string).split('').forEach(function (char) {
    if (/[\x00-\x1F]/.test(char)) {
      // non-printable character
      return true;
    }
    // use width of 'x' as fallback for unregistered char
    var widths = map[font][char] || map[font].x;
    // width is consistent for every CJK character
    var width = cjkCharacterRange.test(char) ? 100 : widths[variant];
    totalWidth += width;
    return true;
  });
  return totalWidth * (size / 100);
};

exports.default = getWidth;
module.exports = exports['default'];