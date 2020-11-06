const { SignUp,SignIn } = require("../../models/user");

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
    }
};