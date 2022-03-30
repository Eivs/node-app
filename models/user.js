const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate');
const { updateVersionKey } = require('../utils/tools');

const schema = new mongoose.Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: [true, 'userName is required'],
    },
    password: {
      type: String,
      unique: true,
      required: [true, 'password is required'],
    },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  },
);

schema.pre('findOneAndUpdate', updateVersionKey);

schema.plugin(mongoosePaginate);
schema.plugin(uniqueValidator);

module.exports = mongoose.model('Users', schema);
