import _replace from 'lodash/replace';
import _isArray from 'lodash/isArray';
import _sortBy from 'lodash/sortBy';
import _join from 'lodash/join';

const utils = {
  getMaxVisibleHeightOfDocument: () => {
    const w = window, d = document, e = d.documentElement, g = d.getElementsByTagName('body')[0];
    return w.innerHeight || e.clientHeight || g.clientHeight;
  },

  getMaxVisibleWidthOfDocument: () => {
    const w = window, d = document, e = d.documentElement, g = d.getElementsByTagName('body')[0];
    return w.innerWidth || e.clientWidth || g.clientWidth;
  },

  getMaxHeightOfModalBody: () => {
    const mh = utils.getMaxVisibleHeightOfDocument() * 0.4;
    if (mh < 300) {
      return '300px';
    }
    return mh + 'px';
  },

  toHttps: (url) => {
    return _replace(url, /^http:/, 'https:')
  },

  getProductPreviewUrl: skuGUIDs => {
    const param = _isArray(skuGUIDs) ? _join(_sortBy(skuGUIDs), ',') : skuGUIDs;
    const appUrl = 'ymk://brand_sku_preview?SkuGuid=' + param;
    return 'https://service.perfectcorp.com/ap/deeplink.jsp?appName=YMK&appUrl=' + encodeURIComponent(appUrl);
  },

  getConsultationPreviewUrl: brandId => {
    const appUrl = 'ymk://action_consultation/?Server=testbed&Activate=false&BrandId=' + brandId;
    return 'https://service.perfectcorp.com/ap/deeplink.jsp?appName=YMK&appUrl=' + encodeURIComponent(appUrl);
  },
  getConsultationProductionUrl: brandId => {
    const appUrl = 'ymk://action_consultation/?Server=production&BrandId=' + brandId;
    return 'https://service.perfectcorp.com/ap/deeplink.jsp?appName=YMK&appUrl=' + encodeURIComponent(appUrl);
  }
};

export default utils;
