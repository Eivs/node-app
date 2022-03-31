const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const uniqueValidator = require('mongoose-unique-validator');
const { updateVersionKey } = require('../utils/tools');

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'name is required'],
    },
    value: {
      type: String,
      unique: true,
      required: [true, 'value is required'],
    },
    rank: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);

schema.pre('findOneAndUpdate', updateVersionKey);

schema.plugin(mongoosePaginate);
schema.plugin(uniqueValidator);

module.exports = mongoose.model('Category', schema);
