
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
        }),
        GetUserProfile : joi.object({                
                user_id : joi.string().required(),
                store_id :  joi.string().required()         
        }),
        GetStores : joi.object({                
                user_id : joi.string().required()                     
        }),
        AddPaymentInvoiceAddress: joi.object({
                user_id : joi.string().required(),
                first_name : joi.string().max(200).required(),
                middle_name : joi.string().max(200).required(),
                last_name :  joi.string().max(200).required(),
                street1 :   joi.string().required(),
                street2: joi.string().required(),
                country_id: joi.number().required(),
                state_id : joi.number().required(),
                city_id: joi.number().required(),
                zip : joi.string().max(5).required()
        }),
       
        AddPaymentDetail: joi.object({
                user_id : joi.string().required(),
                paymentgayway_refNo : joi.string().max(200).required(),
                paymenttype : joi.string().max(200).required(),
                name :  joi.string().max(200).required(),
                cardnumber :   joi.string().required(),
                expiredDate: joi.string().required(),
                amount: joi.number().required(),
                payment_status:joi.string().required()           
        }),
        GetUserRole : joi.object({                
                user_id : joi.string().required()                     
        }) 
};

module.exports = schema;

