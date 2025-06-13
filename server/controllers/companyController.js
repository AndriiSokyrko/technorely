const {Company, CompanyInfo, User, UserInfo} = require('../models/models');
const uuid = require('uuid')
const path = require('path')
const apiError = require('../error/apiErrors')
const {body} = require("nodemon");
const fs = require("fs");
const {Op} = require("sequelize");

function hasExtension(filePath, extension) {
    return path.extname(filePath) === extension;
}

class CompanyController {

    async create(req, res, next) {
        try {
            let {name, description, service, capital, userId, info} = req.body
            const flag = await Company.findOne({where:{name}})

            if(flag){
                return next(apiError.badRequest('Company with this name is already exist: '+ name))
            }

            let fileName;
            if(req.files) {
                const {img} = req.files
                const filePath = path.resolve(__dirname, '..', 'static', img.name);
                if (!fs.existsSync(filePath)) {
                    await img.mv(filePath);
                }

                fileName = img.name
            }

            const company = await Company.create(
                {
                    name,
                    description,
                    service,
                    capital,
                    img: fileName,
                    userId
                }
            )

            if (info) {
                info = JSON.parse(info)
                console.log(info)
                    CompanyInfo.create({
                        companyId: company.id,
                        pricePolitic1kv:info.pricePolitic1kv,
                        pricePolitic2kv:info.pricePolitic2kv,
                        pricePolitic3kv:info.pricePolitic2kv,
                        pricePolitic4kv:info.pricePolitic2kv,
                    })
            }
            return res.json(company)
        } catch (e) {
            next(apiError.badRequest(e.message))
        }

    }

    async getAll(req, res, next) {
        let {startDate, endDate, valueMin, valueMax,userId, page, limit,nameSort, typeSort} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let companies
        if(userId) companies =await Company.findByPk(userId)
        try {
            const whereConditions = {};

            if (userId) {
                whereConditions.userId = userId;
            }

            if (valueMin && valueMax) {
                whereConditions.capital = {
                    [Op.gte]: valueMin,
                    [Op.lte]: valueMax
                };
            }
            if (startDate && endDate) {
                whereConditions.createdAt = {
                    [Op.gte]: new Date(startDate),
                    [Op.lte]: new Date(endDate)
                };
            }
            let order=[]
            if (nameSort !== undefined && typeSort !== undefined) {
                order = [nameSort, typeSort]
            }
            companies = await Company.findAndCountAll({
                where: whereConditions,
                order: order.length ? [order] : undefined,
                limit,
                offset
            });
            return res.json(companies)
        } catch (e) {
            next(apiError.badRequest(e.message))
        }

    }

    async getOne(req, res, next) {
        const {id} = req.params
        console.log("===",id)
        try {
            const company = await Company.findOne({
                where: {id},
                include: [{ model: CompanyInfo }]
            })
            return res.json(company)
        } catch (e) {
            return next(apiError.badRequest(e.message))
        }
    }

    async updateById(req, res) {
        const id = req.params.id;
        let updates = req.body;

        let fileName;
        if(req.files) {
            const {img} = req.files
            const filePath = path.resolve(__dirname, '..', 'static', img.name);
            if (!fs.existsSync(filePath)) {
                await img.mv(filePath);
            }

            fileName = img.name
            updates = {...updates,img:fileName}
        }
        try {
            const company = await Company.findByPk(id);

            if (!company) {
                return next(apiError.badRequest('No user found with this ID'))
            }
            await company.update(updates);
            res.status(200).json(company);
        } catch (error) {
            return next(apiError.badRequest('Error updating user:', error))

        }
    }

    async deleteById(req, res, next) {
        const {id} = req.params;
        try {
            const result = await Company.destroy({
                where: {
                    id
                }
            })

            if (result === 0) {
                return next(apiError.badRequest('No company found with this ID'))
            }
            return res.status(200).json({text: "Ok"})
        } catch (error) {
            return next(apiError.badRequest('Error deleting company:', error))

        }

    }

}

module.exports = new CompanyController()