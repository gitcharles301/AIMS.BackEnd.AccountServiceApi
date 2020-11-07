const express = require('express');
const { signUp , signIn, GetuserProfile, GetStores, AddPaymentInvoiceAddress, AddPaymentDetail } = require('../controllers/usercontroller');
const { GetUserRole } = require('../controllers/roleController');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const { SignUpValidation,SignInValidation, GetuserProfileValidation, GetStoresValidation, AddPaymentInvoiceValidation, AddPaymentDetailValidation } = require('../middleware/validation/user.validation');

router.get('/GetUserRole', GetUserRole);

router.post('/signUp',SignUpValidation, signUp);

router.post('/signIn',SignInValidation, signIn);

router.get('/GetuserProfile',GetuserProfileValidation, GetuserProfile);

router.post('/AddPaymentInvoiceAddress',AddPaymentInvoiceValidation, AddPaymentInvoiceAddress);

router.post('/AddPaymentDetail', AddPaymentDetailValidation, AddPaymentDetail);

module.exports = router;