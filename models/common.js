
const joi = require('@hapi/joi');

const schema =  {
        States : joi.object({
                country_id : joi.number().required()               
        }),
        Cities :  joi.object({
            state_id : joi.number().required()               
    })
};

module.exports = schema;