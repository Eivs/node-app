module.exports = {
  port: process.env.PORT || 3000,
  tokenSecret: 'tokenSecret',
  apiPrefix: '/api',
  database: process.env.DATABASE || '127.0.0.1:27017/db',
};
