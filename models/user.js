
const joi = require('@hapi/joi');

const schema =  {
        SignUp : joi.object({
                first_name : joi.string().max(200).required(),
                last_name :  joi.string().max(200).required(),
                emailid :   joi.string().email().required(),
                password: joi.string().required(),
                mobile_number: joi.number().required()
        }),
        SignIn : joi.object({
            user_id : joi.string().required(),
            password :  joi.string().required()         
    })
};

module.exports = schema;

