const { SignUp,SignIn,GetuserProfile, GetStores,  AddPaymentInvoiceAddress, AddPaymentDetail } = require("../../models/user");

module.exports = { 
    SignUpValidation: async(req,res,next) => {
        console.log("called SignUpValidation");
        console.log(req.body);
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
        console.log("called SignInValidation");
        console.log(req.body);
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
        console.log("called GetuserProfileValidation");
        console.log(req.body);
        const value = await GetuserProfile.validate(req.body);
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
        console.log("called GetStoresValidation");
        console.log(req.body);
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
        console.log("called AddPaymentInvoiceValidation");
        console.log(req.body);
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
        console.log("called AddPaymentDetailValidation");
        console.log(req.body);
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
    }
};