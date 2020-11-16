
const joi = require('@hapi/joi');

const schema =  {        
        GetStores : joi.object({                
                user_id : joi.string().required()                     
        }),
        AddStore : joi.object({
                user_id: joi.string().required(),
                store_name : joi.string().required(),
                store_alias :  joi.string().required(),
                street1 :   joi.string().required(),
                street2: joi.string().required(),
                country: joi.string().required(),
                state : joi.string().required(),
                city: joi.string().required(),
                zipcode : joi.string().max(10).required(),
                store_landline :  joi.string().required(),
                store_tax_number :  joi.string().required(),
                plan: joi.string().required()
        })
};

module.exports = schema;

