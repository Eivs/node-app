const db = require('../database/category');
const tool = require('../utils/tools');

const ApiError = require('../error/api_error');
const ApiErrorNames = require('../error/api_error_name');

exports.find = async ctx => {
  let result;
  const reqQuery = ctx.query;

  if (reqQuery && !tool.isEmptyObject(reqQuery)) {
    if (reqQuery.id) {
      result = db.findById(reqQuery.id);
    } else {
      result = db.findSome(reqQuery);
    }
  } else {
    result = db.findAll();
  }

  await result
    .then(res => {
      if (res) {
        ctx.body = res;
      } else {
        throw new ApiError(ApiErrorNames.UNEXIST_ID);
      }
    })
    .catch(err => {
      throw new ApiError(err.name, err.message);
    });
};

exports.detail = async ctx => {
  const { id } = ctx.params;
  if (!tool.validatorsFun.numberAndCharacter(id)) {
    throw new ApiError(ApiErrorNames.LEGAL_ID);
  }
  await db
    .findById(id)
    .then(res => {
      if (res) {
        ctx.body = res;
      } else {
        throw new ApiError(ApiErrorNames.UNEXIST_ID);
      }
    })
    .catch(err => {
      throw new ApiError(err.name, err.message);
    });
};

exports.add = async ctx => {
  const dataObj = ctx.request.body;

  await db
    .add(dataObj)
    .then(res => {
      ctx.body = res;
    })
    .catch(err => {
      throw new ApiError(err.name, err.message);
    });
};

exports.update = async ctx => {
  const ctxParams = ctx.params;
  const dataObj = { ...ctxParams, ...ctx.request.body };

  await db
    .update(dataObj)
    .then(res => {
      if (res) {
        ctx.body = res;
      } else {
        throw new ApiError(ApiErrorNames.UNEXIST_ID);
      }
    })
    .catch(err => {
      throw new ApiError(err.name, err.message);
    });
};

exports.delete = async ctx => {
  const ctxParams = ctx.params;
  const dataObj = { ...ctxParams, ...ctx.request.body };
  if (!tool.validatorsFun.numberAndCharacter(dataObj.id)) {
    throw new ApiError(ApiErrorNames.LEGAL_ID);
  }

  await db
    .delete(dataObj.id)
    .then(res => {
      if (res) {
        ctx.body = res;
      } else {
        throw new ApiError(ApiErrorNames.UNEXIST_ID);
      }
    })
    .catch(err => {
      throw new ApiError(err.name, err.message);
    });
};
