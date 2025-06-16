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

    async createCompany(req, res, next) {
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
                    CompanyInfo.create({
                        companyId: company.id,
                        pricePolitic1kv:info.pricePolitic1kv,
                        pricePolitic2kv:info.pricePolitic2kv,
                        pricePolitic3kv:info.pricePolitic3kv,
                        pricePolitic4kv:info.pricePolitic4kv,
                    })
            }
            return res.json(company)
        } catch (e) {
            next(apiError.badRequest(e.message))
        }

    }

    async getAll(req, res, next) {
        let {startDate, endDate, valueMin, valueMax,userId, role, page, limit,nameSort, typeSort} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let companies
        if(userId) companies =await Company.findByPk(userId)
        try {
            const whereConditions = {};
            if (userId && role=='USER' ) {
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
                include: [{model: CompanyInfo}],
                limit,
                offset
            });
            return res.status(200).json(companies)
        } catch (e) {
            next(apiError.badRequest('Companies are not found'))
        }

    }

    async getCompanyById(req, res, next) {
        const {id} = req.params
        try {
            const company = await Company.findOne({
                where: {id},
                include: [{ model: CompanyInfo }]
            })
            return res.status(200).json(company)
        } catch (e) {
            return next(apiError.badRequest('Company is not found'))
        }
    }

    async updateCompanyById(req, res) {
        const {id} = req.params;
        let updates = req.body
        let info =req.body.info
        if (info) {
              info = JSON.parse(info)

        }
        if(req.files) {
            const {img} = req.files
            const filePath = path.resolve(__dirname, '..', 'static', img.name);
            if (!fs.existsSync(filePath)) {
                await img.mv(filePath);
            }

            const fileName = img.name
            updates = {...updates,img:fileName}
        }
        try {
            const company = await Company.findByPk(id);

            if (!company) {
                return next(apiError.badRequest('Company by id is not found'))
            }

            await company.update(updates);
            const companyInfo = await CompanyInfo.findOne({where: {companyId:company.id}});
            if(info) await companyInfo.update(info);

            res.status(200).json(company);
        } catch (error) {
            return next(apiError.badRequest('Error of server:', error))

        }
    }

    async deleteCompanyById(req, res, next) {
        const {id} = req.params;
        try {
            const result = await Company.destroy({
                where: {
                    id
                }
            })

            if (result === 0) {
                return res.status(400).json({message:'Company by id is not found.'})
            }
            return res.status(200).json({message: "Company is deleted"})
        } catch (error) {
            return next(apiError.badRequest('Error of server:', error))

        }

    }

}

module.exports = new CompanyController()