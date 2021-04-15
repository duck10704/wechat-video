import express from "express";
import http from "http";
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.dev.babel');

const compiler = webpack(webpackConfig.default);
const middleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.default.output.publicPath,
  quiet: false,
  hot: true,
  inline: true,
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
});
const app = express();
app.use(express.static('../app/'));
app.use(express.static('../public/'));
app.use(middleware);
app.use(require('webpack-hot-middleware')(compiler));
const server = http.createServer(app);
server.listen(80);
