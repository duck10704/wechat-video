import _flattenDeep from 'lodash/flattenDeep';
import _isArray from 'lodash/isArray';
import _isString from 'lodash/isString';
import _concat from 'lodash/concat';
import _filter from 'lodash/filter';
import globals from './globals';

const extractArrays = o => {
  const keys = Object.keys(o);
  return keys.map(k => {
    const v = o[k];
    if (_isString(v)) {
      return [];
    }
    if (_isArray(v)) {
      return v;
    }
    return _concat(extractArrays(v));
  })
};

const arrays = extractArrays(globals);
const flatten = _flattenDeep(arrays);
const filtered = _filter(flatten, o => o['id']);
const merged = {};
filtered.map(o => merged[o.id] = o.label);

export default Object.keys(merged).map(key => {
  return {
    id: key,
    defaultMessage: merged[key]
  }
});

export const convertToMessages = () => {
  const r = {};
  filtered.map(m => {
    r[m.label] = {id: m.id, defaultMessage: m.label};
  });
  return r;
};
