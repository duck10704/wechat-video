const path = require('path');
const webpack = require('webpack');
export default {
  entry: {
    vendor: [
      'jquery',
      'react', 'react-addons-create-fragment', 'react-bootstrap', 'react-bootstrap-daterangepicker', 'react-breadcrumbs',
      'react-dom', 'react-dropzone', 'react-intl', 'react-modal', 'react-paginate', 'react-redux', 'react-router',
      'react-router-redux', 'react-rte', 'redux-form', 'react-proxy',
      'base16', 'react-dock', 'react-json-tree', 'redux-devtools-dock-monitor',
      'redux-devtools-log-monitor', 'redux-devtools', 'redux-logger', 'redux-thunk', 'classnames',
      'redbox-react', 'dom-helpers', 'react-overlays',
      'intl', 'query-string', 'highcharts-exporting', 'highcharts-export-csv', 'react-highcharts', 'lodash',
      'core-js', 'buffer', 'domutils', 'isomorphic-fetch', 'entities', 'qr.js', 'querystring', 're-notif',
      'react-bootstrap-datetimepicker', 'react-bootstrap-multiselect', 'react-bootstrap-switch',
      'react-html-parser', 'react-loading', 'react-router-bootstrap', 'react-router/es6',
      'react-select', 'react-spinkit', 'readable-stream', 'youtube-player', 'spark-md5', 'sortablejs',
      './app/utils/metronic/styles.js', './app/utils/metronic/scripts.js', './app/auth/auth.css',
      'lodash/ceil', 'lodash/concat', 'lodash/deburr', 'lodash/differenceBy', 'lodash/filter', 'lodash/forIn',
      'lodash/includes', 'lodash/indexOf', 'lodash/intersection', 'lodash/isBuffer', 'lodash/isEmpty',
      'lodash/isNull', 'lodash/isRegExp', 'lodash/isUndefined', 'lodash/join', 'lodash/keysIn', 'lodash/last',
      'lodash/map', 'lodash/merge', 'lodash/negate', 'lodash/omit', 'lodash/omitBy', 'lodash/orderBy', 'lodash/pick',
      'lodash/pickBy', 'lodash/remove', 'lodash/replace', 'lodash/size', 'lodash/slice', 'lodash/sortBy', 'lodash/split',
      'lodash/stubArray', 'lodash/stubFalse', 'lodash/takeWhile', 'lodash/toFinite', 'lodash/toInteger', 'lodash/toLower',
      'lodash/toNumber', 'lodash/toPlainObject', 'lodash/uniq', 'lodash/uniqBy', 'lodash/unset', 'lodash/upperCase',
      'lodash/values', 'lodash/without', 'lodash/words', 'lodash/xor',
      'react-google-maps', 'react-sortablejs', 'react-tagsinput', 'react-text-truncate', 'react-transform-catch-errors',
      'react-transform-hmr', 'react-youtube', 'strip-ansi', 'ansi-html', 'ansi-regex', 'can-use-dom',
      'html-entities', 'qrcode.react'
    ],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, "public"),
    library: '[name]',
  },
  plugins: [new webpack.DllPlugin({
    path: path.join(__dirname, "public/[name]-manifest.json"),
    name: "[name]"
  })],
  module: {
    loaders: [
      {test: /\.json$/, loader: 'json-loader'},
      {test: /\.css$/, loader: 'style-loader!css-loader'},
      {test: /\.(ttf|eot)/, loader: 'file-loader', query: {name: 'assets/[name]-[hash].[ext]', limit: 1024000}},
      {test: /\.(woff|woff2)/, loader: 'url-loader', query: {name: 'assets/[name]-[hash].[ext]', limit: 1024000}},
      {
        test: /\.(png|jpg|jpeg|gif|svg)/,
        loader: 'url-loader',
        query: {name: 'assets/[name]-[hash].[ext]', limit: 1024000}
      }],
  }
};
