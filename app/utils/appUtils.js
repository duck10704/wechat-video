import {browserHistory} from "react-router";
const isSupported = () => {
  const ua = window.navigator.userAgent;
  return ua.indexOf('com.perfectcorp') !== -1;
};

const changeLocation = l => {
  if (!isSupported()) {
    return;
  }
  console.log('location.href', l);
  location.href = l;
};

const utils = {
  historyBack: () => {
    if (isSupported() && window.history.length == 1) {
      changeLocation('ybc://action_back');
    } else {
      browserHistory.goBack();
    }
  },
  showPip: () => changeLocation('ycs://action/show_pip_cam'),
  hidePip: () => changeLocation('ycs://action/hide_pip_cam'),
  showHeader: () => changeLocation('ybc://layout/?discovertopbar=true'),
  hideHeader: () => changeLocation('ybc://layout/?discovertopbar=false'),
  loadPip: (skuGuid, skuItemGuid) => changeLocation('ycs://action/apply_live_makeup/lipstick?SkuGuid=' + skuGuid + '&SkuItemGuid=' + skuItemGuid + '&SourceType=YCSWEB&SourceId=YCSWEB'),
  loadMakeupCam: (skuGuid, skuItemGuid) => changeLocation('ycs://action_makeupcam/lipstick?SkuGuid=' + skuGuid + '&SkuItemGuid=' + skuItemGuid + '&SourceType=YCSWEB&SourceId=YCSWEB')
};

export default utils;
