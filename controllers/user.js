const db = require('../database/user');
const ApiError = require('../error/api_error');
const token = require('../utils/token');
const ApiErrorNames = require('../error/api_error_name');

exports.signUp = async ctx => {
  const dataObj = ctx.request.body;

  await db
    .signUp(dataObj)
    .then(res => {
      const newToken = token.createToken(res);
      const { password, ...restData } = res._doc;
      ctx.res.setHeader('Authorization', newToken);
      ctx.body = {
        newToken,
        ...restData,
      };
    })
    .catch(err => {
      throw new ApiError(err.name, err.message);
    });
};

exports.signIn = async ctx => {
  const dataObj = ctx.request.body;

  await db
    .signIn(dataObj)
    .then(res => {
      if (!res) {
        ctx.status = 400;
        throw new ApiError(ApiErrorNames.LOGIN_FAILED);
      } else {
        const newToken = token.createToken(res);
        const { password, ...restData } = res._doc;
        ctx.res.setHeader('Authorization', newToken);
        ctx.body = {
          newToken,
          ...restData,
        };
      }
    })
    .catch(err => {
      throw new ApiError(err.name, err.message);
    });
};
