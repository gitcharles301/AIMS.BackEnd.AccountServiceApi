const express = require('express');
const { signUp , signIn, GetuserProfile, GetStores, AddPaymentInvoiceAddress, AddPaymentDetail, GetUserRole, VerifyUserEmail, ResetPassword, AddCardDetail } = require('../controllers/userController');
const { GetRoles } = require('../controllers/roleController');

const router = express.Router();
const { SignUpValidation,SignInValidation, GetuserProfileValidation, GetStoresValidation, AddPaymentInvoiceValidation, AddPaymentDetailValidation, GetUserRoleValidation, VerifyUserValidation, ResetPasswordValidation, AddCardDetailValidation } = require('../middleware/validation/user.validation');
const { authenticateAIMSAdminToken } = require('../middleware/validation/auth.validation');

router.post('/signUp', authenticateAIMSAdminToken, SignUpValidation, signUp);

router.post('/signIn',SignInValidation, signIn);

router.get('/GetuserProfile',GetuserProfileValidation, GetuserProfile);

router.post('/AddPaymentInvoiceAddress',AddPaymentInvoiceValidation, AddPaymentInvoiceAddress);

//router.post('/AddPaymentDetail', AddPaymentDetailValidation, AddPaymentDetail);

router.get('/GetUserRole', GetUserRoleValidation, GetUserRole);

router.get('/GetRoles', GetRoles);

router.get('/VerifyUserEmail', authenticateAIMSAdminToken, VerifyUserValidation, VerifyUserEmail);

router.post('/ResetPassword', authenticateAIMSAdminToken, ResetPasswordValidation, ResetPassword);

router.post('/AddCardDetail', authenticateAIMSAdminToken, AddCardDetailValidation, AddCardDetail);

module.exports = router;