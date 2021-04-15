import path from 'path';

const getEntry = function () {
  return {
    app: [
      path.join(__dirname, 'app/index.js')
    ]
  }
};

const getLoaders = function () {
  return [
    {
      test: /\.(js|jsx)?$/,
      exclude: /node_modules/,
      include: [
        path.join(__dirname, "app")
      ],
      loader: 'babel-loader',
      query: {
        cacheDirectory: false,
        plugins: [
          'transform-runtime',
          'add-module-exports',
          'transform-decorators-legacy',
          'babel-plugin-transform-strict-mode',
          ["react-intl", {
            "messagesDir": "./app/utils/langs/sources"
          }]
        ],
        presets: ['es2015', 'react', 'stage-0']
      }
    },
    {test: /\.json$/, loader: 'json-loader'},
    {test: /\.css$/, loader: 'raw-loader'},
    {test: /\.(ttf|eot)/, loader: 'file-loader', query: {name: 'assets/[name]-[hash].[ext]', limit: 819200}},
    {test: /\.(woff|woff2)/, loader: 'url-loader', query: {name: 'assets/[name]-[hash].[ext]', limit: 819200}},
    {
      test: /\.(png|jpg|jpeg|gif|svg)/,
      loader: 'url-loader',
      query: {name: 'assets/[name]-[hash].[ext]', limit: 819200}
    }
  ];
};

export default {
  name: 'app',
  cache: false,
  devtool: 'cheap-module-eval-source-map',
  entry: getEntry(),
  output: {
    path: path.join(__dirname, 'public/'),
    filename: 'assets/[name]-[hash].js',
    publicPath: '/'
  },
  module: {
    loaders: getLoaders()
  },
  resolve: {
    modules: [path.resolve(__dirname, "app"), "node_modules"],
    extensions: ['.json', '.js', '.jsx'],
    unsafeCache: true
  },
  target: 'web'
};
