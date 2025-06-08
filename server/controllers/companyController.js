const {Company, CompanyInfo, User} = require('../models/models');
const uuid = require('uuid')
const path = require('path')
const apiError = require('../error/apiErrors')
const {body} = require("nodemon");

function hasExtension(filePath, extension) {
    return path.extname(filePath) === extension;
}

class CompanyController {

    async create(req, res, next) {
        try {
            const {name, description, service, capital, userId} = req.body
            const flag = await Company.findOne({where:{name}})

            if(flag){
                return next(apiError.badRequest('Company with this name is already exist: '+ name))
            }

            let fileName;
            if(req.files) {
                const {img} = req.files
                let fileExt = hasExtension(img.name)
                fileName = uuid.v4() + '.' + fileExt
                await img.mv(path.resolve(__dirname, '..', 'static', fileName))
            }
            const company = Company.create(
                {
                    name,
                    description,
                    service,
                    capital,
                    img: fileName,
                    userId
                }
            )
            return res.json(company)
        } catch (e) {
            next(apiError.badRequest(e.message))
        }

    }

    async getAll(req, res, next) {
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let devices
        try {
            if (!brandId && !typeId) {
                devices = await Device.findAll({limit, offset})
            }
            if (brandId && !typeId) {
                devices = await Device.findAll({where: {brandId}, limit, offset})
            }
            if (!brandId && typeId) {
                devices = await Device.findAll({where: {typeId}, limit, offset})

            }
            if (brandId && typeId) {
                devices = await Device.findAll({where: {brandId, typeId}, limit, offset})
            }
            return res.json(devices)
        } catch (e) {
            next(apiError.badRequest(e.message))
        }

    }

    async getOne(req, res) {
        const {id} = req.params
        const devices = await Device.findOne({
            where: {id},
            include: [{model: DeviceInfo, as: 'info'}]
        })
        return res.json(devices)
    }

    async updateById(req, res) {
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

    async deleteById(req, res, next) {
        const companyId = req.params.id;
        try {
            const result = await Company.destroy({
                where: {
                    id: userId
                }
            });

            if (result === 0) {
                return next(apiError.badRequest('No company found with this ID'))
            }
            return res.status(200).message({text: "Ok"})
        } catch (error) {
            return next(apiError.badRequest('Error deleting company:', error))

        }

    }

}

module.exports = new CompanyController()