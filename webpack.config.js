const path = require('path');

module.exports = {
  entry: './src/scraper.js',
  output: {
    filename: 'scraper.js',
    path: path.resolve(__dirname, 'dist'),
  },
};