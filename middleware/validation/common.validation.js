
const { States, Cities }  = require("../../models/common");

module.exports = { 
        GetStateValidation: async(req,res,next) => {
            console.log("called GetStateValidation");
            console.log(req.body);
            const value = await States.validate(req.body);
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
        GetCitiesValidation: async(req,res,next) => {
            console.log("called GetCitiesValidation");
            console.log(req.body);
            const value = await Cities.validate(req.body);
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