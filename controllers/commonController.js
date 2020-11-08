const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { v1: uuidv1 } = require('uuid');
const { Sequelize  } = require('sequelize');
const sequelize = new Sequelize(process.env.CONNECTION_STRING);


exports.GetCountries = async(req, res) => {
    try {      
     var result =  await sequelize.query('SELECT * FROM  fn_getcountry();',  {  type: sequelize.QueryTypes.SELECT }).then(function(response){
        res.status(200)
            .json({
                statuscode:200,
                status : 'success',
                data : response,
                error : [{message: "", errorcode: ""}]
            });           
          
           });
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


exports.GetStates = async(req, res) => {
    try {                

          var result =  await sequelize.query('SELECT * FROM  fn_getstate(:country_id);',  { replacements: { country_id: req.query.country_id }, type: sequelize.QueryTypes.SELECT }).then(function(response){
        res.status(200)
            .json({
                statuscode:200,
                status : 'success',
                data : response,
                error : [{message: "", errorcode: ""}]
            });
          

           });
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


exports.GetCities = async(req, res) => {
    try {  
        var result =  await sequelize.query('SELECT * FROM  fn_getcity(:state_id);',  { replacements: { state_id: req.query.state_id }, type: sequelize.QueryTypes.SELECT }).then(function(response){
         res.status(200)
            .json({
                statuscode:200,
                status : 'success',
                data : response,
                error : [{message: "", errorcode: ""}]
            });
            //console.log(response[0]);

           });
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