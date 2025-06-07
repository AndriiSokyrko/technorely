const Router = require('express')
const router = new Router()
const companyRouter = require('./companyRoutes')
const userRouter = require('./userRoutes')
const initializeRoles = require('../middleware/initializeRoles');
router.use(initializeRoles);

router.use('/user',userRouter)
router.use('/company', companyRouter)
module.exports = router