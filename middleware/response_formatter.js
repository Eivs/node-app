const ApiError = require('../error/api_error');
const ApiErrorNames = require('../error/api_error_name');

const responseFormatter = apiPrefix => async (ctx, next) => {
  if (ctx.request.path.startsWith(apiPrefix)) {
    try {
      await next();

      if (ctx.response.status === 404) {
        throw new ApiError(ApiErrorNames.NOT_FOUND);
      } else if (ctx.response.status === 405) {
        throw new ApiError(ApiErrorNames.METHOD_NOT_ALLOWED);
      } else {
        ctx.body = {
          code: 'success',
          message: '',
          result: ctx.body,
        };
      }
    } catch (error) {
      if (error instanceof ApiError) {
        ctx.body = {
          code: error.code,
          message: error.message,
        };
      } else {
        ctx.status = 400;
        ctx.response.body = {
          code: error.name,
          message: error.message,
        };
      }
    }
  } else {
    await next();
  }
};

module.exports = responseFormatter;
