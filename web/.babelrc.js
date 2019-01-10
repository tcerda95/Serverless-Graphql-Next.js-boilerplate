const env = require('./env-config.js');

module.exports = {
  presets: ['next/babel'],
  plugins: [['styled-components', { 'ssr': true }], ['transform-define', env]]
};
