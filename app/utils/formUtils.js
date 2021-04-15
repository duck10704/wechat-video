import _omitBy from 'lodash/omitBy';
import _isUndefined from 'lodash/isUndefined';

export default {
  omit: values => {
    const v1 = _omitBy(values, _isUndefined);
    return _omitBy(v1, v => !v);
  }
}
