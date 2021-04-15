import {addLocaleData} from 'react-intl';
import 'intl/locale-data/jsonp/en';
import 'intl/locale-data/jsonp/zh';
import 'intl/locale-data/jsonp/de';
import 'intl/locale-data/jsonp/fr';
import 'intl/locale-data/jsonp/pt';
import 'intl/locale-data/jsonp/ja';
import 'intl/locale-data/jsonp/ko';
import 'intl/locale-data/jsonp/es';
import 'intl/locale-data/jsonp/it';
import zhCN from './langs/zh_CN.json';
import zhTW from './langs/zh_TW.json';
import zhLocaleData from 'react-intl/locale-data/zh';
import deDE from './langs/de_DE.json';
import deLocaleData from 'react-intl/locale-data/de';
import frFR from './langs/fr_FR.json';
import frLocaleData from 'react-intl/locale-data/fr';
import ptBR from './langs/pt_BR.json';
import ptLocaleData from 'react-intl/locale-data/pt';
import jaJP from './langs/ja_JP.json';
import jaLocaleData from 'react-intl/locale-data/ja';
import koKR from './langs/ko_KR.json';
import koLocaleData from 'react-intl/locale-data/ko';
import esES from './langs/es_ES.json';
import esLocaleData from 'react-intl/locale-data/es';
import itIT from './langs/it_IT.json';
import itLocaleData from 'react-intl/locale-data/it';

const convertToValidLanguage = l => {
  if (l.indexOf('ja') != -1) {
    return 'ja';
  }
  return 'en';
};

const getValidLanguage = () => {
  if (localStorage && localStorage.getItem('bccLocale')) {
    return convertToValidLanguage(localStorage.getItem('bccLocale'));
  }
  const locale = convertToValidLanguage(navigator.language || navigator.browserLanguage);
  localStorage.setItem("bccLocale", locale);
  return locale;
};

const loadMessages = language => {
  const lang = language.substring(0, 2);

  switch (lang) {
    case 'zh':
      if (language == 'zh-tw' || language == 'zh-TW' || language == 'zh-hk' || language == 'zh-HK') {
        addLocaleData(zhLocaleData);
        return zhTW;
      } else {
        addLocaleData(zhLocaleData);
        return zhCN;
      }
    case 'de':
      addLocaleData(deLocaleData);
      return deDE;
    case 'fr':
      addLocaleData(frLocaleData);
      return frFR;
    case 'pt':
      addLocaleData(ptLocaleData);
      return ptBR;
    case 'ja':
      addLocaleData(jaLocaleData);
      return jaJP;
    case 'ko':
      addLocaleData(koLocaleData);
      return koKR;
    case 'it':
      addLocaleData(itLocaleData);
      return itIT;
    case 'es':
      addLocaleData(esLocaleData);
      return esES;
  }
};

export default {
  loadMessages, getValidLanguage
}
