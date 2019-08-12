const path = require("path");
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
const merge = require("webpack-merge");
const webpackDevServer = require("webpack-dev-server");
const config = require("../config/index").dev;
const friendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const env = require("../config/dev.env");
process.env.NODE_ENV = env.NODE_ENV

const webpackCommon = require("./webpack.common")

let webpackDev = merge(webpackCommon, {
  mode: 'development',
  entry: {
    main: config.main,
  },
  output: {
    path: config.assetsRoot,
    filename: path.join(config.assetsSubDirectory, 'js/[name].js'),
    chunkFilename: path.join(config.assetsSubDirectory, 'js/[name].js'), //*
    publicPath: config.publicPath
  },
  devtool: config.devtool, //*
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(scss|sass)$/, // *
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpe?g|svg|gif)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1024 * 10,
          name: path.join(config.assetsSubDirectory, 'img/[name].[ext]')
        }
      }
    ]
  },
  plugins: [
    // *
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new friendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here: http://${config.host}:${config.port}`]
      }
    }),
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../example/index.html'),
      inject: true
    })
  ]
})

let compiler = webpack(webpackDev);

let server = new webpackDevServer(compiler, {
  host: config.host,
  port: config.port,
  quiet: true
})
console.log(config.host, config.port, 'host')
server.listen(config.port, config.host, function () {
  // 启动中的提示
  console.log('> Starting dev server...')
})