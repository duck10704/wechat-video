import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import createLogger from "redux-logger";
import {browserHistory} from "react-router/es";
import {routerMiddleware, routerReducer} from "react-router-redux";
import {reducer as formReducer} from "redux-form";
import DevTools from "./DevTools";
import {reducer as notifReducer} from "re-notif";

const middleware = routerMiddleware(browserHistory);

export default function configureStore() {
  return createStore(
    combineReducers({
      routing: routerReducer,
      form: formReducer,
      notifs: notifReducer
    }),
    compose(
      applyMiddleware(middleware, thunk, createLogger()),
      DevTools.instrument()
    )
  );
}
