const express = require('express');
const { signUp , signIn } = require('../controllers/usercontroller');
const { GetUserRole } = require('../controllers/roleController');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const { SignUpValidation,SignInValidation } = require('../middleware/validation/user.validation');

router.get('/GetUserRole', GetUserRole);

router.post('/signUp',SignUpValidation, signUp);

router.post('/signIn',SignInValidation, signIn);
module.exports = router;