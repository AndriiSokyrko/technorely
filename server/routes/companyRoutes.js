const Router = require('express');
const companyController = require('../controllers/companyController');
const authMiddleware = require("../middleware/authMiddleware");
const passport = require("passport");
const router = new Router();

router.get('/', companyController.getAll);

router.get('/:id', companyController.getCompanyById);

router.delete('/:id', passport.authenticate('jwt', { session: false }), companyController.deleteCompanyById);

 router.patch('/:id', passport.authenticate('jwt', { session: false }), companyController.updateCompanyById);

router.post('/', passport.authenticate('jwt', { session: false }), companyController.createCompany);

module.exports = router;
/**
 *
 */