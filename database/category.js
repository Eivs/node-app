const Model = require('../models/category');

// TODO: 此文件中最好返回 Promise。通过 .exec() 可以返回 Promise。
// 需要注意的是 分页插件本身返回的就是 Promise 因此 Model.paginate 不需要 exec()。
// Model.create 返回的也是 Promise

exports.findAll = () => Model.find().sort({ rank: 1 }).exec();

exports.findSome = data => {
  const { page = 1, limit = 10, sort = 'rank' } = data;
  const query = {};
  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    sort,
  };
  const result = Model.paginate(query, options);

  return result;
};

exports.findById = id => Model.findById(id).exec();

exports.add = data => Model.create(data);

exports.update = data => {
  const { id, ...restData } = data;
  return Model.findOneAndUpdate(
    { _id: id },
    {
      ...restData,
    },
    {
      new: true, // 返回修改后的数据
    },
  ).exec();
};

exports.delete = id => Model.findByIdAndDelete(id).exec();
