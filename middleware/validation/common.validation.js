
const { query } = require("express");
const { States, Cities }  = require("../../models/common");

module.exports = { 
        GetStateValidation: async(req,res,next) => {
            
            const value = await States.validate(req.query);
            //const validateheader = req.validateheader
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
          
            const value = await Cities.validate(req.query);
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