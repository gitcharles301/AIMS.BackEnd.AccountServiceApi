const express = require('express');
const { GetCountries,GetStates,GetCities } = require('../controllers/commonController');
const { GetUserRole } = require('../controllers/roleController');
const { check, validationResult, body } = require('express-validator');

const router = express.Router();
const { GetStateValidation,GetCitiesValidation } = require('../middleware/validation/common.validation');
const { authenticateAIMSAdminToken } = require('../middleware/validation/auth.validation');

router.get('/GetCountries',authenticateAIMSAdminToken, GetCountries);
router.get('/GetStates', authenticateAIMSAdminToken, GetStateValidation, GetStates);
router.get('/GetCities',authenticateAIMSAdminToken, GetCitiesValidation, GetCities);

module.exports = router;