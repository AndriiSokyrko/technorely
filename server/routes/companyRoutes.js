const Router = require('express')
const companyController = require('../controllers/companyController')
const router = new Router()
router.get('/',companyController.getAll)
router.get('/:id',companyController.getOne)
router.delete('/:id',companyController.deleteById)
router.patch('/:id',companyController.updateById)
router.post('/', companyController.create)
module.exports = router