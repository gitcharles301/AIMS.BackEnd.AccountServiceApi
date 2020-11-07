
const joi = require('@hapi/joi');

const schema =  {        
        GetStores : joi.object({                
                user_id : joi.string().required()                     
        }),
        AddStore : joi.object({
                store_name : joi.string().required(),
                store_alias :  joi.string().required(),
                street1 :   joi.string().required(),
                street2: joi.string().required(),
                country_id: joi.number().required(),
                state_id : joi.number().required(),
                city_id: joi.number().required(),
                zip : joi.string().max(5).required(),
                store_landline :  joi.string().required(),
                store_taxnumber :  joi.string().required()
        })
};

module.exports = schema;

