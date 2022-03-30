const db = require('../database/blog');
const ApiError = require('../error/api_error');
const tokenHelper = require('../utils/tools');

exports.signUp = async ctx => {
  const dataObj = ctx.request.body;

  await db
    .signUp(dataObj)
    .then(res => {
      const token = tokenHelper.createToken(res);
      const { password, ...restData } = res._doc;
      ctx.res.setHeader('Authorization', token);
      ctx.body = {
        token,
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
      const token = tokenHelper.createToken(res);
      const { password, ...restData } = res;
      ctx.res.setHeader('Authorization', token);
      ctx.body = {
        token,
        ...restData,
      };
    })
    .catch(err => {
      throw new ApiError(err.name, err.message);
    });
};
