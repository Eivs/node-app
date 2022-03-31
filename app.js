const Koa = require('koa');
const path = require('path');
const koaBody = require('koa-body');
const json = require('koa-json');
const koaLogger = require('koa-logger');

const onerror = require('koa-onerror');

const { apiPrefix } = require('./config/index');
const responseFormatter = require('./middleware/response_formatter');
const routers = require('./routers/index');
const token = require('./utils/token');
const { koaLog4, logger } = require('./logger');
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
          console.log(`name: ${name}`);
          console.log(file);
        },
      },
    },
  })
);

app.use(json());
app.use(koaLog4());
// app.use(koaLogger());

app.use(
  token.checkToken(
    ['/api/blogs', '/api/categories'],
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
