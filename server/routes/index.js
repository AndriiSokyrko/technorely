const Router = require('express')

const router = new Router()
const companyRouter = require('./companyRoutes')
const userRouter = require('./userRoutes')
const roleRouter = require('./roleRoutes')
const initializeRoles = require('../middleware/initializeRoles');




router.use(initializeRoles);

router.use('/role',roleRouter)
router.use('/user',userRouter)
router.use('/company', companyRouter)


module.exports = router