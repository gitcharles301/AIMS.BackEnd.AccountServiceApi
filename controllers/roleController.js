const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { v1: uuidv1 } = require('uuid');
const { Sequelize  } = require('sequelize');
const sequelize = new Sequelize(process.env.CONNECTION_STRING);


exports.GetUserRole = async(req, res) => {
    try {  
     var result =  await sequelize.query('SELECT * FROM  getRolesFunction();', { raw: false }).then(function(response){
        res.status(200)
            .json({
                status : 'success',
                data : response[0],
                error : [{message: "", errorcode: ""}]
            });
            console.log(response[0]);
         
           });
    }
    catch(err) {
        console.log(err);
    }
};