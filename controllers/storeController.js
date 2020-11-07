const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { v1: uuidv1 } = require('uuid');
const { Sequelize  } = require('sequelize');
const sequelize = new Sequelize(process.env.CONNECTION_STRING);

exports.GetStores = async (req, res) => {

    try {                

        var result =  await sequelize.query('SELECT * FROM  fn_getstores(:user_id);',  { replacements: { user_id: req.body.user_id }, type: sequelize.QueryTypes.SELECT }).then(function(response){
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
        res.status(200)
          .json({
              statuscode:200,
              status : 'success',
              data : {},
              error : [{message: "", errorcode: ""}]
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
 