require("dotenv").config();  
const jwt = require('jsonwebtoken');
const { v1: uuidv1 } = require('uuid');
const { Sequelize  } = require('sequelize');
const sequelize = new Sequelize(process.env.CONNECTION_STRING);

exports.GenerateAIMSToken = async(req, res) => {
    try {    
        
     if (process.env.AIMS_SECRET == req.body.aims_secret)   
     {
         console.log('called GenerateAIMSToken');
         var result = await passwordEncrypt(process.env.AIMS_SECRET);
         res.cookie("authToken", result, { expire: new Date() + 9999 });
         res.status(200)
        .json({
            statuscode:200,
            status : 'success',
            data : result,
            error : [{message: "", errorcode: ""}]
        }); 
     }
     else{
        res.status(500)
        .json({
            statuscode:500,
            status : 'failed',
            data : {},
            error : [{message: err.message, errorcode: 500}]
        });
     }
     
    }
    catch(err) {
        res.status(500)
            .json({
                statuscode:500,
                status : 'failed',
                data : {},
                error : [{message: err.message, errorcode: 500}]
            });
    }
};


var passwordEncrypt = function (plainUserName) {
    const authToken = jwt.sign({ id: "admin" }, process.env.AIMS_SECRET);
    console.log(authToken);
    return authToken;
 };