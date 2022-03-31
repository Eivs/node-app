const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate');
const { updateVersionKey } = require('../utils/tools');

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, 'title is required'],
    },
    content: {
      type: String,
      required: [true, 'content is required'],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'category ID is required'],
      ref: 'Category',
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    toJSON: { virtuals: true },
  }
);

// 虚拟字段：根据_id查找对应表中的数据。
schema.virtual('categoryObj', {
  ref: 'Category',
  localField: 'category',
  foreignField: '_id',
  justOne: true,
});

schema.pre('findOneAndUpdate', updateVersionKey);

schema.plugin(mongoosePaginate);
schema.plugin(uniqueValidator);

module.exports = mongoose.model('Blog', schema);
