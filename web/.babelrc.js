const env = require('./env-config.js');

module.exports = {
  presets: ['next/babel'],
  plugins: [['emotion'], ['transform-define', env]]
};
