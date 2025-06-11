const Router = require('express')
const companyController = require('../controllers/companyController')
const authMiddleware = require("../middleware/authMiddleware");
const router = new Router()
router.get('/',companyController.getAll)
router.get('/:id',companyController.getOne)
router.delete('/:id',authMiddleware,companyController.deleteById)
router.patch('/:id',authMiddleware,companyController.updateById)
router.post('/', authMiddleware,companyController.create)
module.exports = router