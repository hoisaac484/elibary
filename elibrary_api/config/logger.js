const { winston } = require('@strapi/logger');
const { join } = require('path');
const DailyRotateFile = require('winston-daily-rotate-file');

let dir = join(__dirname, '..', 'logs');
let file = join(dir, 'log-%DATE%.log');

const httpMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'];

const httpFilter = winston.format((info) => {
  const message = typeof info.message === 'string' ? info.message : JSON.stringify(info.message);
  return httpMethods.some(method => message.includes(method)) ? false : info;
});

const customFormat = winston.format.combine(
  httpFilter(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
  winston.format.printf(({ timestamp, level, message }) => {
    const msg = typeof message === 'string' ? message : JSON.stringify(message, null, 2);
    return `[${timestamp}] ${level}: ${msg}`;
  })
);

module.exports = {
  transports: [
    new winston.transports.Console({
    }),
    new DailyRotateFile({
      level: 'silly',
      filename: file,
      datePattern: 'YYYY-MM-DD',
      frequency: '24h',
      createSymlink: true,
      symlinkName: 'log',
      dirname: dir,
      format: customFormat,
    }),
  ],
};