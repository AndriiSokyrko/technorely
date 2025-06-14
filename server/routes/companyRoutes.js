const Router = require('express')
const companyController = require('../controllers/companyController')
const authMiddleware = require("../middleware/authMiddleware");
const passport = require("passport");
const router = new Router()
router.get('/',companyController.getAll)
router.get('/:id',companyController.getOne)
// router.delete('/:id',authMiddleware,companyController.deleteById)
router.delete('/:id',passport.authenticate('jwt', { session: false }),companyController.deleteById)
// router.patch('/:id',authMiddleware,companyController.updateById)
router.patch('/:id',passport.authenticate('jwt', { session: false }),companyController.updateById)
// router.post('/', authMiddleware,companyController.create)
router.post('/', passport.authenticate('jwt', { session: false }),companyController.create)
module.exports = router