const webpack = require("webpack");
const merge = require("webpack-merge");
const path = require("path")
const ora = require("ora");
const chalk = require('chalk')
const ParallelUglifyPlugin = require("webpack-parallel-uglify-plugin")
const copyWebpackPlugin = require("copy-webpack-plugin")
const webpackCommon = require('./webpack.common')
const config = require("../config").build;
const env = require("../config/prod.env");
process.env = env.NODE_ENV
let webpackProd = merge(webpackCommon, {
  mode: 'production',
  entry: config.main,
  output: {
    path: config.assetsRoot,
    filename: '[name].min.js',
    library: {
      root: 'yksign', // window
      commonjs: 'yksign', // commonjs
      amd: 'yksign' // amd
    },
    libraryTarget: 'umd',
    libraryExport: 'default' // 使用export default 导出模块
  },
  devtool: config.devtool,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new copyWebpackPlugin([{
      from: path.resolve(__dirname, '../src/public/'),
      to: path.resolve(__dirname, '../dist/')
    }]),
    // new ParallelUglifyPlugin({
    //   // 缓存压缩后的结果，下次遇到一样的输入时直接从缓存中获取压缩后的结果返回
    //   // cacheDir 用于配置缓存存放的目录路径
    //   cacheDir: 'node_modules/.uglify-cache',
    //   sourceMap: true,
    //   output: {
    //     // 最紧凑的输出
    //     beautify: false,
    //     // 删除所有的注释
    //     comments: false
    //   },
    //   compress: {
    //     // 在UglifyJs删除没有用到的代码时不输出警告
    //     warnings: false,
    //     // 删除所有的 `console` 语句，可以兼容ie浏览器
    //     drop_console: false,
    //     // 内嵌定义了但是只用到一次的变量
    //     collapse_vars: true,
    //     // 提取出出现多次但是没有定义成变量去引用的静态值
    //     reduce_vars: true
    //   }
    // }),
    new webpack.optimize.ModuleConcatenationPlugin() //作用域提升 (scope hoisting)
  ]
})

const spinner = ora('项目构建当中...').start()
spinner.color = 'green'

webpack(webpackProd, (err, stats) => {
  spinner.stop();
  if (err) throw err;
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')
  chalk.red('adsf')
  if (stats.hasErrors()) {
    console.log(chalk.red('  构建失败,出现错误.\n'))
    process.exit(1)
  }
  // console.log('1')
  // console.log(chalk.green('构建完成.\n'))
  // console.log(chalk.yellow(
  //   '  Tip: 生产文件存放在dist目录下.\n'
  // ))
})