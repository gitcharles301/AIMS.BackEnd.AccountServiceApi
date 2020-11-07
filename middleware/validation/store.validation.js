const {  GetStores, AddStore } = require("../../models/store");

module.exports = {   
    GetStoresValidation: async(req,res,next) => {
        console.log("called GetStoresValidation");
        console.log(req.body);
        const value = await GetStores.validate(req.body);
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
    AddStoreValidation : async(req,res,next) => {
        console.log("called AddStoreValidation");
        console.log(req.body);
        const value = await AddStore.validate(req.body);
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