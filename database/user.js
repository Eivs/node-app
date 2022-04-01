const Model = require('../models/user');

exports.signIn = data => {
  const { username, password } = data;
  return Model.findOne({
    username,
    password,
  }).exec();
};

exports.signUp = data => Model.create(data);
