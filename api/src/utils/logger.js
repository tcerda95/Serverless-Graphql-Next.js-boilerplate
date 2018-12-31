const winston = require('winston');
const { combine, timestamp, printf, colorize } = winston.format;

winston.configure({
  format: combine(
    colorize(),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    printf(info => `${info.timestamp} [${info.level}]: ${info.message}`)
  ),  
  level: process.env.LOG_LEVEL,
  transports: [new winston.transports.Console()]
});

module.exports = winston;
