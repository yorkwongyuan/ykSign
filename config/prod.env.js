const pkg = require("../package.json");
module.exports = {
  NODE_ENV: JSON.stringify('production'),
  VERSION: JSON.stringify(pkg.version)
}