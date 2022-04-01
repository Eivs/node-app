const path = require('path');
const { configure, getLogger, koaLogger } = require('koa-log4');

configure({
  appenders: {
    access: {
      type: 'dateFile',
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      encoding: 'utf-8',
      filename: path.join('logs/', 'access.log'),
    },
    application: {
      type: 'dateFile',
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      encoding: 'utf-8',
      filename: path.join('logs/', 'application.log'),
    },
    out: {
      type: 'stdout',
    },
  },
  categories: {
    default: { appenders: ['out'], level: 'INFO' },
    access: { appenders: ['access'], level: 'INFO' },
    application: { appenders: ['application'], level: 'WARN' },
  },
});

const logger = getLogger();
logger.level = 'all';

module.exports = {
  accessLogger: () => koaLogger(getLogger()),
  logger:
    process.env.NODE_ENV === 'production'
      ? getLogger('application')
      : getLogger(),
};
