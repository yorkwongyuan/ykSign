const webpackMerge = require('webpack-merge');
const prod = require("./prod.env");
module.exports = webpackMerge(prod, {
  NODE_ENV: 'development'
})