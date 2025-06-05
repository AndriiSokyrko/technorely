const apiError = require('../error/apiErrors')
const bcrypt = require('bcrypt')
const {User, Basket} = require('../models/models')
const jwt = require('jsonwebtoken')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'})
}

class UserController {
    async registration(req, res, next) {
        const {email, password, role} = req.body
        if (!email || !password) {
            return next(apiError.badRequest('No correct email or password'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(apiError.badRequest('User with this email is already exist'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password: hashPassword})
        const basket = await Basket.create({userId: user.id})
        const token = generateJwt(user.id, user.email, user.role)

        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where:{email}})
        if(!user){
            return next(apiError.badRequest('No user found'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword){
            next(apiError.badRequest('No correct password'))
        }
        const token = generateJwt({email:user.email, password:user.password, role:user.role})

        return res.json({token})

    }

    async auth(req, res, next) {
        const token = generateJwt({email:req.user.email, password:req.user.password, role:req.user.role})

        return res.json({token})
    }
}

module.exports = new UserController()