const ApiErrorNames = require('./api_error_name');

const ApiErrorMap = new Map();

ApiErrorMap.set(ApiErrorNames.NOT_FOUND, {
  code: ApiErrorNames.NOT_FOUND,
  message: 'The API was not found ',
});
ApiErrorMap.set(ApiErrorNames.UNKNOWN_ERROR, {
  code: ApiErrorNames.UNKNOWN_ERROR,
  message: 'Unknown error',
});
ApiErrorMap.set(ApiErrorNames.LEGAL_ID, {
  code: ApiErrorNames.LEGAL_ID,
  message: 'The id parameter is invalid',
});
ApiErrorMap.set(ApiErrorNames.UNEXIST_ID, {
  code: ApiErrorNames.UNEXIST_ID,
  message: 'ID does not exist',
});
ApiErrorMap.set(ApiErrorNames.LEGAL_FILE_TYPE, {
  code: ApiErrorNames.LEGAL_FILE_TYPE,
  message: 'File type not allowed',
});
ApiErrorMap.set(ApiErrorNames.NO_AUTH, {
  code: ApiErrorNames.NO_AUTH,
  message: 'No operating authority.',
});

module.exports = ApiErrorMap;
