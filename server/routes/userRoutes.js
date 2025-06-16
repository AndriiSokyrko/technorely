const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const passport = require("passport");


router.post('/registration',userController.registration)
router.post('/reset',userController.resetPassword)
router.post('/login', userController.login)
router.post('/admin', userController.create)
// router.get('/auth', authMiddleware, userController.auth)
router.get('/auth',  passport.authenticate('jwt', { session: false }), userController.auth)
// router.get('/', authMiddleware, userController.getAll)
router.get('/', passport.authenticate('role', { session: false }), userController.getAllUsers)
router.get('/:id', userController.getByUserId);
router.patch('/:id',userController.editByUserId);
router.delete('/:id', userController.deleteByUserId);
module.exports = router