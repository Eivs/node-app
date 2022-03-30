const router = require('koa-router')();
const controller = require('../controllers/category');

router.get('/', controller.find);

router.get('/:id', controller.detail);

router.post('/', controller.add);

router.put('/:id', controller.update);

router.del('/:id', controller.delete);

module.exports = router;
