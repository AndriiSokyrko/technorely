const Router = require('express')
const router = new Router()
const brandRouter = require('./brandRoutes')
const deviceRouter = require('./deviceRoutes')
const typeRouter = require('./typeRoutes')
const userRouter = require('./userRoutes')
const initializeRoles = require('../middleware/initializeRoles');
router.use(initializeRoles);

router.use('/user',userRouter)
// router.use('/brand',brandRouter)
// router.use('/type',typeRouter)
// router.use('/device', deviceRouter)
module.exports = router