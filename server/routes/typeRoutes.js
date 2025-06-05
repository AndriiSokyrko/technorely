const Router = require('express')
const typeController = require('../controllers/typeController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')
const router = new Router()
router.get('/',typeController.getAll);
router.get('/:id',typeController.getOne)
router.post('/',checkRoleMiddleware('ADMIN'), typeController.create)
module.exports = router