
const joi = require('@hapi/joi');

const schema =  {
        SignUp : joi.object({
                first_name : joi.string().max(200).required(),
                last_name :  joi.string().max(200).required(),
                user_emailid :   joi.string().email().required(),
                password: joi.string().required(),
                mobileno: joi.string().required()
        }),
        SignIn : joi.object({
            userid : joi.string().required(),
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
                user_emailid :   joi.string().email().required(),
                mobileno: joi.string().required(),
                addressline1 :   joi.string().required(),
                addressline2: joi.string().required(),
                country: joi.string().required(),
                state : joi.string().required(),
                city: joi.string().required(),
                zipcode : joi.string().max(10).required()               
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
        }),
        VerifyUserEmail : joi.object({                
                email_id :  joi.string().email().required()                    
        }),
        ResetPassword : joi.object({             
                email_id :   joi.string().email().required(),
                password: joi.string().required()
        }),
        AddCardDetail  : joi.object({
                user_id : joi.string().required(),              
                nameoncard :  joi.string().max(200).required(),
                cardnumber :   joi.string().required(),
                expirydate: joi.string().required()                       
        }) 
};

module.exports = schema;

