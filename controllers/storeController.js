const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { v1: uuidv1 } = require('uuid');
const { Sequelize  } = require('sequelize');
const sequelize = new Sequelize(process.env.CONNECTION_STRING);

exports.GetStores = async (req, res) => {

    try {                

        var result =  await sequelize.query('SELECT * FROM  fn_getstore(:user_id);',  { replacements: { user_id: req.query.user_id }, type: sequelize.QueryTypes.SELECT }).then(function(response){
            res.status(200)
          .json({
              statuscode:200,
              status : 'success',
              data : response[0],
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

exports.AddStore = async (req, res) => {
    try {  
        var result =  await sequelize.query('SELECT * FROM  fn_addstore(:user_id,:store_name, :store_alias, :street1, :street2, :country, :state, :city, :zipcode, :store_landline, :store_tax_number, :plan);',
          { replacements: { user_id: req.body.user_id, store_name: req.body.store_name, store_alias: req.body.store_alias, street1: req.body.street1, street2: req.body.street2, 
            country: req.body.country, state: req.body.state, city: req.body.city, zipcode: req.body.zipcode, store_landline: req.body.store_landline, 
            store_tax_number: req.body.store_tax_number, plan: req.body.plan
         }, 
         type: sequelize.QueryTypes.SELECT }).then(function(response){
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
 