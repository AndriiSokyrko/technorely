const apiError = require("../error/apiErrors");
const {Role} = require("../models/models");
module.exports = async function (req, res, next) {
    try {
        // Проверяем, существуют ли роли в базе данных
        const existingRoles = await Role.findAll();
        if (existingRoles.length === 0) {
            await Role.bulkCreate([
                {name: 'USER'},
                {name: 'ADMIN'},
                {name: 'SUPERADMIN'},
            ], {ignoreDuplicates: true});
        }
        next();
    } catch (e) {
        console.error("Error creating roles:", e);
        next(apiError.badRequest(e.message));
    }
}
