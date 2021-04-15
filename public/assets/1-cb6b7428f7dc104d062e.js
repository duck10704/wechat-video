webpackJsonp([1],{

/***/ 1229:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getPrototypeOf = __webpack_require__(166);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(82);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(167);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(107);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(83);

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(55);

var _redux = __webpack_require__(124);

var _reactRouterRedux = __webpack_require__(282);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Home = (_dec = (0, _reactRedux.connect)(function (state) {
  return {};
}, function (dispatch) {
  return (0, _redux.bindActionCreators)({ push: _reactRouterRedux.push }, dispatch);
}), _dec(_class = function (_Component) {
  (0, _inherits3.default)(Home, _Component);

  function Home(props) {
    (0, _classCallCheck3.default)(this, Home);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Home.__proto__ || (0, _getPrototypeOf2.default)(Home)).call(this, props));

    var _this$props = _this.props,
        push = _this$props.push,
        location = _this$props.location;

    push({
      pathname: '/wechat/video/',
      query: location.query
    });
    return _this;
  }

  (0, _createClass3.default)(Home, [{
    key: 'render',
    value: function render() {
      return false;
    }
  }]);
  return Home;
}(_react.Component)) || _class);
exports.default = Home;
module.exports = exports['default'];

/***/ })

});