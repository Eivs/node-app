const router = require('koa-router')();
const { apiPrefix } = require('../config/index');

const blog = require('./blog');
const category = require('./category');
const user = require('./user');

router.prefix(apiPrefix);

router.use('/blogs', blog.routes(), blog.allowedMethods());
router.use('/categories', category.routes(), category.allowedMethods());
router.use(user.routes(), user.allowedMethods(['POST']));

module.exports = router;
