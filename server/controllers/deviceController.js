const {Device, DeviceInfo} = require('../models/models');
const uuid = require('uuid')
const path = require('path')
const apiError = require('../error/apiErrors')

class DeviceController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + '.webp'
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const device = await Device.create({name, price, brandId, typeId, img: fileName})
            if(info){
                info = json.parse(info)
                info.forEach(i=>
                    DeviceInfo.create(
                        {
                            title: i.title,
                            description: i.description,
                            deviceId: device.id,
                        }
                    )
                )
            }
            return res.json(device)
        } catch (e) {
            next(apiError.badRequest(e.message))
        }

    }

    async getAll(req, res, next) {
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page*limit - limit
        let  devices
        try {
            if (!brandId && !typeId) {
                devices = await Device.findAll({limit, offset})
            }
            if (brandId && !typeId) {
                devices = await Device.findAll({where: {brandId},limit, offset})
            }
            if (!brandId && typeId) {
                devices = await Device.findAll({where: {typeId},limit, offset})

            }
            if (brandId && typeId) {
                devices = await Device.findAll({where: {brandId, typeId},limit, offset})
            }
            return res.json(devices)
        } catch (e) {
            next(apiError.badRequest(e.message))
        }

    }

    async getOne(req, res) {
        const {id}= req.params
        const devices = await Device.findOne({
            where:{id},
            include: [{model: DeviceInfo, as: 'info'}]
        })
        return res.json(devices)
    }

    async deleteById(req, res) {
        // const id = parseInt(req.params.id)
        const devices = await Device.destroy({where: {id: req.body.id}})
        return res.status(200).message({message: 'Ok'})
    }
}

module.exports = new DeviceController()