const path = require('path');
const log4js = require('koa-log4');

log4js.configure({
  appenders: {
    access: {
      type: 'dateFile',
      pattern: '-yyyy-MM-dd.log',
      filename: path.join('logs/', 'access.log'),
    },
    error: {
      type: 'dateFile',
      pattern: '-yyyy-MM-dd.log',
      filename: path.join('logs/', 'error.log'),
    },
    out: {
      type: 'stdout',
    },
  },
  categories: {
    default: { appenders: ['out'], level: 'ALL' },
    access: { appenders: ['access'], level: 'INFO' },
    error: { appenders: ['error'], level: 'WARN' },
  },
});

const logger = log4js.getLogger();
logger.level = 'all';

exports.koaLog4 = () => log4js.koaLogger(logger);

exports.logger = logger;
