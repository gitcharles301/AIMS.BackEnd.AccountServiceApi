const { SignUp,SignIn,GetuserProfile, GetStores,  AddPaymentInvoiceAddress, AddPaymentDetail, GetUserRole, VerifyUserEmail, ResetPassword, AddCardDetail } = require("../../models/user");

module.exports = { 
    SignUpValidation: async(req,res,next) => {
       
        const value = await SignUp.validate(req.body);
            if(value.error)
            {
                res.status(400).json({  statuscode:400,
                    status : 'validation-error',
                    data : {},
                    error : [{message: value.error.details[0].message, errorcode: 400}]
                });
            }
            else{
                next();
            }
    },
    SignInValidation: async(req,res,next) => {
      
        const value = await SignIn.validate(req.body);
            if(value.error)
            {
                res.status(400).json({  statuscode:400,
                    status : 'validation-error',
                    data : {},
                    error : [{message: value.error.details[0].message, errorcode: 400}]
                });
            }
            else{
                next();
            }
    },
    GetuserProfileValidation: async(req,res,next) => {
      
        const value = await GetuserProfile.validate(req.query);
            if(value.error)
            {
                res.status(400).json({  statuscode:400,
                    status : 'validation-error',
                    data : {},
                    error : [{message: value.error.details[0].message, errorcode: 400}]
                });
            }
            else{
                next();
            }
    },
    GetStoresValidation: async(req,res,next) => {
     
        const value = await GetStores.validate(req.body);
            if(value.error)
            {
                res.status(400).json({  statuscode:400,
                    status : 'validation-error',
                    data : {},
                    error : [{message: value.error.details[0].message, errorcode: 400}]
                });
            }
            else{
                next();
            }
    },
    AddPaymentInvoiceValidation: async(req,res,next) => {
       
        const value = await AddPaymentInvoiceAddress.validate(req.body);
            if(value.error)
            {
                res.status(400).json({  statuscode:400,
                    status : 'validation-error',
                    data : {},
                    error : [{message: value.error.details[0].message, errorcode: 400}]
                });
            }
            else{
                next();
            }
    },
    AddPaymentDetailValidation: async(req,res,next) => {
      
        const value = await AddPaymentDetail.validate(req.body);
            if(value.error)
            {
                res.status(400).json({  statuscode:400,
                    status : 'validation-error',
                    data : {},
                    error : [{message: value.error.details[0].message, errorcode: 400}]
                });
            }
            else{
                next();
            }
    },
    GetUserRoleValidation: async(req,res,next) => {
      
        const value = await GetUserRole.validate(req.body);
            if(value.error)
            {
                res.status(400).json({  statuscode:400,
                    status : 'validation-error',
                    data : {},
                    error : [{message: value.error.details[0].message, errorcode: 400}]
                });
            }
            else{
                next();
            }
    },

    VerifyUserValidation: async(req,res,next) => {       
      
        const value = await VerifyUserEmail.validate(req.query);
            if(value.error)
            {
                res.status(400).json({  statuscode:400,
                    status : 'validation-error',
                    data : {},
                    error : [{message: value.error.details[0].message, errorcode: 400}]
                });
            }
            else{
                next();
            }
    },
    ResetPasswordValidation: async(req,res,next) => {       
      
        const value = await ResetPassword.validate(req.body);
            if(value.error)
            {
                res.status(400).json({  statuscode:400,
                    status : 'validation-error',
                    data : {},
                    error : [{message: value.error.details[0].message, errorcode: 400}]
                });
            }
            else{
                next();
            }
    },

    AddCardDetailValidation: async(req,res,next) => {       
      
        const value = await AddCardDetail.validate(req.body);
            if(value.error)
            {
                res.status(400).json({  statuscode:400,
                    status : 'validation-error',
                    data : {},
                    error : [{message: value.error.details[0].message, errorcode: 400}]
                });
            }
            else{
                next();
            }
    }

};