const apiError = require('../error/apiErrors')
const bcrypt = require('bcrypt')
const {User, UserInfo, CompanyInfo} = require('../models/models')
const jwt = require('jsonwebtoken')
const path = require("path")
const uuid = require('uuid')
const fs = require("fs");

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'})
}

function hasExtension(fileName) {
    if (typeof fileName !== 'string' || !fileName.includes('.')) {
        throw new Error('Invalid file name');
    }
    return fileName.split('.')[1];
}

class UserController {
    async editById(req, res, next) {
        const userId = req.params.id;
        const updates = req.body;
        try {
            const user = await User.findByPk(userId);

            if (!user) {
                return next(apiError.badRequest('No user found with this ID'))
            }
            await user.update(updates);
            res.status(200).json(user);
        } catch (error) {
            return next(apiError.badRequest('Error updating user:', error))

        }
    }
    async getById(req, res, next) {
        const id = req.params.id;
        console.log("===", id)
        try {
            const userWithInfo = await User.findOne({
                where: { id },
                include: [{ model: UserInfo }]
            })
            if (!userWithInfo) {
                return next(apiError.badRequest('No user found with this ID'))
            }
            res.status(200).json(userWithInfo);
        } catch (error) {
            return next(apiError.badRequest('Error  user:', error))

        }
    }
    async deleteById(req, res, next) {
        const userId = req.params.id;
        try {
            const result = await User.destroy({
                where: {
                    id: userId
                }
            });

            if (result === 0) {
                return next(apiError.badRequest('No user found with this ID'))
            }
            return res.status(200).message({text: "Ok"})
        } catch (error) {
            return next(apiError.badRequest('Error deleting user:', error))

        }
    }

    async registration(req, res, next) {
        const {email, password, role, description} = req.body
        if (!email || !password) {
            return next(apiError.badRequest('No correct email or password'))
        }
        let fileName;
        if (req.files) {
            const {img} = req.files;
            const filePath = path.resolve(__dirname, '..', 'static', img.name);
            if (fs.existsSync(filePath)) {
                await img.mv(filePath);
            }
            fileName = img.name

        }

        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(apiError.badRequest('User with this email is already exist'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, password: hashPassword, role})
        const token = generateJwt(user.id, user.email, user.role)
        await UserInfo.create({
            userId: user.id,
            description: description || 'test' ,
            img: fileName
        });

        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(apiError.badRequest('No user found'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            next(apiError.badRequest('No correct password'))
        }
        const token = generateJwt(user.id, user.email, user.role)

        return res.json({token})

    }

    async auth(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }

    async getAll(req, res, next) {
        const users = await User.findAll()
        return res.json(users)
    }
}

module.exports = new UserController()