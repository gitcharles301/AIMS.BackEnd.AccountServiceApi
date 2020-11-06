const express = require('express');
const { GetCountries,GetStates,GetCities } = require('../controllers/commonController');
const { GetUserRole } = require('../controllers/roleController');
const { check, validationResult, body } = require('express-validator');

const router = express.Router();
const { GetStateValidation,GetCitiesValidation } = require('../middleware/validation/common.validation');

router.get('/GetCountries', GetCountries);
router.get('/GetStates', GetStateValidation, GetStates);
router.get('/GetCities', GetCitiesValidation, GetCities);

module.exports = router;