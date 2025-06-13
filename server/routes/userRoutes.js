const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')


router.post('/registration',userController.registration)
router.post('/reset',userController.resetPassword)
router.post('/login', userController.login)
router.post('/admin', userController.create)
router.get('/auth', authMiddleware, userController.auth)
router.get('/', authMiddleware, userController.getAll)
router.get('/:id', userController.getById);
router.patch('/:id', userController.editById);
router.delete('/:id', userController.deleteById);
module.exports = router