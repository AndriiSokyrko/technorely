const {Type, Device} = require('../models/models')
const ApiError = require('../error/apiErrors')

class TypeController {
    async create(req, res) {
        const {name} = req.body
        console.log(name)
        const type = await Type.create({name})
        return res.status(200).json({type})
    }

    async getAll(req,res) {
        const types = await Type.findAll()
        return res.status(200).json({types})
    }
    async getOne(req,res) {
        const {id}= req.params
        const types = await Type.findOne({
            where:{id}
        })
        return res.status(200).json({types})
    }
}

module.exports = new TypeController()