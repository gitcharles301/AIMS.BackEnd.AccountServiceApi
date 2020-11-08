const joi = require('@hapi/joi');

const schema =  {        
        GenerateAdminToken : joi.object({                
            aims_secret : joi.string().required()                     
        })
};

module.exports = schema;
