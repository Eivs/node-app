const Model = require('../models/blog');

// TODO: 此文件中最好返回 Promise。通过 .exec() 可以返回 Promise。
// 需要注意的是 分页插件本身返回的就是 Promise 因此 Model.paginate 不需要 exec()。
// Model.create 返回的也是 Promise

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

  // 关键字模糊查询 标题 和 content
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