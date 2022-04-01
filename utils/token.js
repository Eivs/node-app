const jwt = require('jsonwebtoken');
const config = require('../config/index');

const getTokenFromCtx = ctx => {
  const { authorization } = ctx.headers;
  const token = authorization;
  return token;
};

exports.createToken = user => {
  const token = jwt.sign(
    { userId: user._id, userName: user.userName },
    config.tokenSecret,
    {
      expiresIn: '6h',
    }
  );
  return token;
};

exports.decodeToken = ctx => {
  const token = getTokenFromCtx(ctx);
  const userObj = jwt.decode(token, config.tokenSecret);
  return userObj;
};

exports.checkToken =
  (shouldCheckPathArray, unlessCheckPathArray) => async (ctx, next) => {
    const currentUrl = ctx.request.url;
    const { method } = ctx.request;

    const unlessCheck = unlessCheckPathArray.some(
      url => currentUrl.indexOf(url) > -1
    );

    const shouldCheck =
      method !== 'GET' &&
      shouldCheckPathArray.some(url => currentUrl.indexOf(url) > -1);

    if (shouldCheck && !unlessCheck) {
      const token = getTokenFromCtx(ctx);
      if (token) {
        try {
          jwt.verify(token, config.tokenSecret);
          await next();
        } catch (error) {
          ctx.status = 401;
          ctx.body = 'Token has expired';
        }
      } else {
        ctx.status = 401;
        ctx.body = 'Invalid token, please login';
      }
    } else {
      await next();
    }
  };
