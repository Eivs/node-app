const router = require('koa-router')();
const controller = require('../controllers/user');

router.post('/signup', controller.signUp);

router.post('/login', controller.signIn);

module.exports = router;
