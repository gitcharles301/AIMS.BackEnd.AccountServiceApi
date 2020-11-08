const express = require('express');
const { GenerateAIMSToken } = require('../controllers/authendicationController');
const router = express.Router();
const { GenerateAdminTokenValidation } = require('../middleware/validation/auth.validation');

router.get('/GenerateAIMSToken', GenerateAdminTokenValidation, GenerateAIMSToken);
module.exports = router;