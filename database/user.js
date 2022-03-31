const Model = require('../models/user');

exports.signIn = data => {
  const { username, password } = data;
  const result = Model.findOne({
    username,
    password,
  });
  return result;
};

exports.signUp = data => Model.create(data);
