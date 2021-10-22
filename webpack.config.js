const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: './src/content-script.js',
  output: {
    filename: 'content-script.js',
    path: path.resolve(__dirname, 'dist'),
  },
};