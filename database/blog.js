const Model = require('../models/blog');

const populateObj = [
  {
    path: 'categoryObj',
    select: 'name value',
  },
];

exports.findAll = () => Model.find().populate(populateObj).exec();

exports.findSome = data => {
  const {
    keyword,
    title,
    category,
    status = true,
    page = 1,
    limit = 10,
    sort = '-createdAt',
  } = data;
  const query = {};
  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    sort,
    populate: populateObj,
  };

  if (status !== 'all') {
    query.status = status === true || status === 'true';
  }

  if (title) {
    query.title = { $regex: new RegExp(title, 'i') };
  }

  if (category) {
    query.category = category;
  }

  if (keyword) {
    const reg = new RegExp(keyword, 'i');
    const fuzzyQueryArray = [{ content: { $regex: reg } }];
    if (!title) {
      fuzzyQueryArray.push({ title: { $regex: reg } });
    }
    query.$or = fuzzyQueryArray;
  }

  return Model.paginate(query, options);
};
