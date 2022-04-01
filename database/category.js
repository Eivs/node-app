const Model = require('../models/category');

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
      new: true,
    }
  ).exec();
};

exports.delete = id => Model.findByIdAndDelete(id).exec();
