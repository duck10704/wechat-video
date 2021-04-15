import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {applyRouterMiddleware, browserHistory, IndexRoute, Route, Router} from "react-router/es";
import {syncHistoryWithStore} from "react-router-redux";
import "intl";
import {FormattedMessage, IntlProvider} from "react-intl";
import {useScroll} from "react-router-scroll";
import langUtils from "./utils/langUtils";
import App from "./App.js";
import configureStore from "./utils/redux/configureStore";
import NotFound from "./errorpage/NotFound";
import i18n from "./index.i18n";
import "./assets/styles";
import "./assets/scripts";

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

const loadRoute = cb => m => cb(null, m);

const getLanguage = () => {
  return navigator.language || navigator.browserLanguage;
};

ReactDOM.render(
  <Provider store={store} key="provider">
    <IntlProvider locale={langUtils.getValidLanguage()} messages={langUtils.loadMessages(getLanguage())}>
      <Router history={history} render={applyRouterMiddleware(useScroll())}>
        <Route name={<FormattedMessage {...i18n.home}/>} path="/" component={App}>
          <IndexRoute getComponent={(l, cb) => System.import('./Home').then(loadRoute(cb))}/>
          <Route name="wechat" path="/wechat"
                 getComponent={(l, cb) => System.import('./wechat/Wechat').then(loadRoute(cb))}/>
          <Route name="wechat" path="/wechat/video"
                 getComponent={(l, cb) => System.import('./wechat/Wechat').then(loadRoute(cb))}/>
          <Route name="Not found" path="*" component={NotFound}/>
        </Route>
      </Router>
    </IntlProvider>
  </Provider>, document.getElementById('root')
);
