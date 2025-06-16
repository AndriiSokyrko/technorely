const {Role} = require("../models/models");
const apiError = require("../error/apiErrors");

class RoleController {
    async getAll(req, res, next) {
        try{
            const users = await Role.findAll()
            return res.status(200).json(users)
        } catch(e){
            return next(apiError.badRequest('Error no roles:', e))
        }

    }
}
module.exports = new RoleController()