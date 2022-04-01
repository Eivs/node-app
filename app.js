const Koa = require('koa');
const path = require('path');
const koaBody = require('koa-body');
const json = require('koa-json');
// const koaLogger = require('koa-logger');

const onerror = require('koa-onerror');

const { apiPrefix } = require('./config/index');
const responseFormatter = require('./middleware/response_formatter');
const routers = require('./routers/index');
const token = require('./utils/token');
const { accessLogger, logger } = require('./utils/logger');
require('./database/db');

const app = new Koa();

onerror(app);

// middleware
// file upload
app.use(
  koaBody({
    multipart: true,
    formidable: {
      formidable: {
        uploadDir: path.join(__dirname, 'public/upload/'),
        keepExtensions: true,
        maxFieldsSize: 2 * 1024 * 1024,
        onFileBegin: (name, file) => {
          logger.info(`name: ${name}`);
          logger.info(file);
        },
      },
    },
  })
);

app.use(json());
app.use(accessLogger());

app.use(
  token.checkToken(
    ['/blogs', '/categories'],
    ['/api/signup', '/api/login', '/api/users/forgetPwd']
  )
);

// response formatter
app.use(responseFormatter(apiPrefix));

// routers
app.use(routers.routes()).use(routers.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  logger.error('server error', err, ctx);
});

module.exports = app;
