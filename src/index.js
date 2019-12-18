import deburr from 'lodash.deburr';
import widthsMap from './widthsMap';

const settingsDefaults = { font: 'Arial', size: 100 };

// Unicode range of CJK characters & punctuation
const cjkCharacterRange = /[\u3000-\u9FEF\u3000-\u303F\uD7B0–\uD7FF\uFE30-\uFE4F\uFF00-\uFFEF\u1100-\u11FF\uA960–\uA97F\uAC00-\uD7AF]/

const getWidth = (string, settings) => {
  const sett = { ...settingsDefaults, ...settings };
  const font = sett.font.toLowerCase();
  const size = sett.size;
  const variant = 0 + (sett.bold ? 1 : 0) + (sett.italic ? 2 : 0);
  const map = sett.map || widthsMap;
  const available = Object.keys(map);
  if (available.indexOf(font) === -1) {
    throw new Error(`This font is not supported. Supported fonts are: ${available.join(', ')}`);
  }
  let totalWidth = 0;
  deburr(string).split('').forEach((char) => {
    if (/[\x00-\x1F]/.test(char)) { // non-printable character
      return true;
    }
    // use width of 'x' as fallback for unregistered char
    const widths = map[font][char] || map[font].x;
    // width is consistent for every CJK character
    const width = cjkCharacterRange.test(char) ? 100 : widths[variant];
    totalWidth += width;
    return true;
  });
  return totalWidth * (size / 100);
};

export default getWidth;
