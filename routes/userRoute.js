const express = require('express');
const { signUp , signIn, GetuserProfile, GetStores, AddPaymentInvoiceAddress, AddPaymentDetail, GetUserRole } = require('../controllers/usercontroller');
const { GetRoles } = require('../controllers/roleController');

const router = express.Router();
const { SignUpValidation,SignInValidation, GetuserProfileValidation, GetStoresValidation, AddPaymentInvoiceValidation, AddPaymentDetailValidation, GetUserRoleValidation } = require('../middleware/validation/user.validation');

router.post('/signUp',SignUpValidation, signUp);

router.post('/signIn',SignInValidation, signIn);

router.get('/GetuserProfile',GetuserProfileValidation, GetuserProfile);

router.post('/AddPaymentInvoiceAddress',AddPaymentInvoiceValidation, AddPaymentInvoiceAddress);

router.post('/AddPaymentDetail', AddPaymentDetailValidation, AddPaymentDetail);

router.get('/GetUserRole', GetUserRoleValidation, GetUserRole);

router.get('/GetRoles', GetRoles);

module.exports = router;