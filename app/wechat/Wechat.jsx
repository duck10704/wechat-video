import React, {Component} from "react";
import {FormattedMessage, injectIntl} from 'react-intl';
import i18n from './Wechat.i18n';
import config from '../utils/config/config';
import videojs from 'video.js';
import MobileDetect from 'mobile-detect';
import compose from 'recompose/compose';
import _curryRight from 'lodash/curryRight';
import $ from 'jquery';
import 'videojs-contrib-hls';
import 'video.js/dist/video-js.css';
import './wechat.css';

@compose(_curryRight(injectIntl)())
export default class Wechat extends Component {

  constructor(props) {
    super(props);
    const {location, intl: {formatMessage}} = this.props;
    const app = config.apps.filter(t => t.key === location.query.app.toLowerCase());
    if (app && app.length > 0) {
      document.title = formatMessage(i18n[app[0].key]);
    } else {
      document.title = formatMessage(i18n[config.apps[0].key]);
    }
  }

  isValidVideoUrl = () => {
    const {location} = this.props;
    if (!location.query.videoUrl) {
      return false;
    }
    if (!(/https?:\/\/live-cdn.beautycircle.[com|cn]/.test(location.query.videoUrl.toLowerCase()) ||
      /https?:\/\/bc-cdn.youcamapi.[com|cn]/.test(location.query.videoUrl.toLowerCase()) ||
      /https?:\/\/cdn.beautycircle.[com|cn]/.test(location.query.videoUrl.toLowerCase()))
    ) {
      return false;
    }
    if (!location.query.videoUrl.toLowerCase().endsWith('mp4') &&
      !location.query.videoUrl.toLowerCase().endsWith('m3u8')) {
      return false;
    }
    return true;
  };

  isValidApp = () => {
    const {location} = this.props;
    if (!location.query.app) {
      return false;
    }
    return ['ycf', 'ycp', 'ymk', 'ycn'].indexOf(location.query.app.toLowerCase()) !== -1;
  };

  openStore = app => {
    const md = new MobileDetect(window.navigator.userAgent);
    const os = md.os();
    const appinfo = config.apps.filter(t => t.key === app);
    if (appinfo && appinfo.length > 0) {
      if (os && os.toLowerCase().indexOf('ios') !== -1) {
        if ('zh-CN' === navigator.language) {
          window.location.href = appinfo[0].ioscn;
          return false;
        } else {
          $.getJSON('//ipinfo.io/', function (data) {
            if ('CN' === data.country) {
              window.location.href = appinfo[0].ioscn;
              return false;
            } else {
              window.location.href = appinfo[0].ios;
              return false;
            }
          });
        }
      }
      if (os && os.toLowerCase().indexOf('android') !== -1) {
        if ('zh-CN' === navigator.language) {
          window.location.href = appinfo[0].androidapk;
          return false;
        } else {
          $.getJSON('//ipinfo.io/', function (data) {
            if ('CN' === data.country) {
              window.location.href = appinfo[0].androidapk;
              return false;
            } else {
              window.location.href = appinfo[0].android;
              return false;
            }
          });
        }
      }
    }
    return false;
  };

  componentDidMount() {
    if (this.refs.video_mp4) {
      this.refs.video_mp4.width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
      this.refs.video_mp4.height = ((window.innerHeight > 0) ? window.innerHeight : screen.height) * 0.8;
    }
    if (this.refs.video_m3u8) {
      window.videojs = videojs;
      require('videojs-contrib-hls/dist/videojs-contrib-hls.js');

      const options = {
        controls: true,
        preload: "auto",
        autoplay: true,
        width: (window.innerWidth > 0) ? window.innerWidth : screen.width,
        height: ((window.innerHeight > 0) ? window.innerHeight : screen.height) * 0.75
      };
      videojs(this.refs.video_m3u8, options, function () {
        this.play();
      });
    }
  }

  render() {
    const {location} = this.props;

    return (
      <div className="container">
        <div className="share_video_container">
          {this.isValidVideoUrl() && location.query.videoUrl.toLowerCase().endsWith('mp4') &&
          <video id="video" ref="video_mp4" controls preload="auto">
            <source src={location.query.videoUrl + "#t=0.01"} type="video/mp4"/>
          </video>
          }
          {this.isValidVideoUrl() && location.query.videoUrl.toLowerCase().endsWith('m3u8') &&
          <video id="video" ref="video_m3u8" className="video-js vjs-default-skin">
            <source src={location.query.videoUrl} type="application/x-mpegURL"/>
          </video>
          }
        </div>
        <div className="bottom_bar_app_share">
          <div className="share_video_app_icon">
            {this.isValidApp() ?
              <img src={require("./images/icon_" + location.query.app.toLowerCase() + ".png")}/> :
              <img src={require("./images/icon_ycf.png")}/>
            }
          </div>
          <div className="share_video_txt_all">
            {this.isValidApp() && location.query.app.toLowerCase() === 'ycf' &&
            <div>
              <div className="txt_app_name"><FormattedMessage {...i18n.ycf}/></div>
              <div className="txt_YCF"><FormattedMessage {...i18n.ycfdesc}/></div>
            </div>
            }
            {this.isValidApp() && location.query.app.toLowerCase() === 'ycp' &&
            <div>
              <div className="txt_app_name"><FormattedMessage {...i18n.ycp}/></div>
              <div className="txt_YCP"><FormattedMessage {...i18n.ycpdesc}/></div>
            </div>
            }
            {this.isValidApp() && location.query.app.toLowerCase() === 'ymk' &&
            <div>
              <div className="txt_app_name"><FormattedMessage {...i18n.ymk}/></div>
              <div className="txt_YMK"><FormattedMessage {...i18n.ymkdesc}/></div>
            </div>
            }
            {this.isValidApp() && location.query.app.toLowerCase() === 'ycn' &&
            <div>
              <div className="txt_app_name"><FormattedMessage {...i18n.ycn}/></div>
              <div className="txt_YCN"><FormattedMessage {...i18n.ycndesc}/></div>
            </div>
            }
            {!this.isValidApp() &&
            <div>
              <div className="txt_app_name"><FormattedMessage {...i18n.ycf}/></div>
              <div className="txt_YCF"><FormattedMessage {...i18n.ycfdesc}/></div>
            </div>
            }
          </div>
          {this.isValidApp() ?
            <div className={"share_video_btn_" + location.query.app.toUpperCase()}>
              <div className={location.query.app === 'ycf' ? "share_video_btn_txt" : "share_video_btn_txt_white"}
                   onClick={() => this.openStore(location.query.app.toLowerCase())}>
                <FormattedMessage {...i18n.install}/>
              </div>
            </div> :
            <div className="share_video_btn_YCF" onClick={() => this.openStore('ycf')}>
              <div className="share_video_btn_txt">
                <FormattedMessage {...i18n.install}/>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}
