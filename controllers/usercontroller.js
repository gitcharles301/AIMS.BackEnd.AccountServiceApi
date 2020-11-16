require("dotenv").config();  
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { v1: uuidv1 } = require('uuid');
const { Sequelize  } = require('sequelize');
const sequelize = new Sequelize(process.env.CONNECTION_STRING);
const crypto = require('crypto');
const utility = require('../helpers/utility');


exports.signUp = async(req, res) => {
    try {
        
        var encrptedPassword = utility.saltHashPassword(req.body.password);
       
        var result =  await sequelize.query('SELECT * FROM  fn_signup(:first_name, :last_name, :user_emailid, :mobileno, :password, :salt);', 
         { replacements: { first_name: req.body.first_name , last_name: req.body.last_name, 
            user_emailid: req.body.user_emailid, mobileno: req.body.mobileno, password: encrptedPassword.passwordHash, salt: encrptedPassword.salt }, type: sequelize.QueryTypes.SELECT }).then(function(response){                
                            
                if(response[0].error_counter > 0)
                {
                  return  res.status(400)
                    .json({
                        statuscode:400,
                        status : 'validation-error',
                        data : {},
                        error : [{message: response[0].messages, errorcode: 400}]
                    });
                }


             return res.status(200)
                .json({
                    statuscode:200,
                    status : 'success',
                    data : response[0],
                    error : [{message: "", errorcode: ""}]
                });
    
               });

        console.log(res);
    }
    catch(err) {
        console.log(err);
    }
};


 

exports.signIn = async (req, res) => {     
    
    // get user prfile
     var result =  await sequelize.query('SELECT * FROM  fn_signin(:userid);', 
     { replacements: { userid: req.body.userid  }, type: sequelize.QueryTypes.SELECT }).then(function(response){             
       
     
        if(response[0].password == ""  || response[0].salt == "")
        {
           return res.status(400)
            .json({
                statuscode:400,
                status : 'failed',
                data : {},
                error : [{message: "Login Failed", errorcode: 400}]
            });
        }
        else{
            if(utility.authenticatePassword(req.body.password, response[0].salt, response[0].password))
            { 
                 // create a token
                const authToken = jwt.sign({ id: response[0].userid }, process.env.AIMS_SIGNIN_SECRET);
                // put bearerToken into the cookie              
                res.cookie("authToken", authToken, { expire: new Date() + process.env.COOKIE_EXPIRE });

                var finalResult =
                {
                    authToken:authToken,
                    userid:response[0].userid
                };
               
                return res.status(200)
                .json({
                    statuscode:200,
                    status : 'success',
                    data : finalResult,
                    error : [{message: "", errorcode: ""}]
                });
                
             } 
             else{
               return res.status(400)
                .json({
                    statuscode:400,
                    status : 'failed',
                    data : {},
                    error : [{message: "Login Failed", errorcode: ""}]
                });
             }
            }

           });

  
};

exports.signOut = (req, res) => {
    // clear the cookie which contains the token
    res.clearCookie("authToken");

    return res.json({
        message: "User is signed out successfully."
    });
};

exports.GetuserProfile = async (req, res) => {

    try {                

        var result =  await sequelize.query('SELECT * FROM  fn_getuserprofile(:user_id,:store_id);',  { replacements: { user_id: req.query.user_id , store_id: req.query.store_id}, type: sequelize.QueryTypes.SELECT }).then(function(response){
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

exports.AddPaymentInvoiceAddress = async (req, res) => {

    try {  
        var result =  await sequelize.query('SELECT * FROM  fn_addinvoiceaddress(:user_id, :first_name, :middle_name, :last_name, :user_emailid, :mobileno, :addressline1, :addressline2, :country, :state, :city, :zipcode);',
        { replacements: { user_id: req.body.user_id, first_name: req.body.first_name, middle_name: req.body.middle_name, last_name: req.body.last_name, user_emailid: req.body.user_emailid, 
            mobileno: req.body.mobileno, addressline1: req.body.addressline1, addressline2: req.body.addressline2, country: req.body.country, state: req.body.state, city: req.body.city, zipcode: req.body.zipcode 
            
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


exports.AddCardDetail = async (req, res) => {

    try {                

        var result =  await sequelize.query('SELECT * FROM  fn_addcarddetails(:user_id, :nameoncard, :cardnumber, :expirydate);',  
        { replacements: { user_id: req.body.user_id , nameoncard: req.body.nameoncard, cardnumber: req.body.cardnumber , expirydate: req.body.expirydate }, type: sequelize.QueryTypes.SELECT }).then(function(response){
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


exports.AddPaymentDetail = async (req, res) => {

    try {                
           var result = { "user_id" : 10001, "payment_id": 1 }
      //  var result =  await sequelize.query('SELECT * FROM  AddPaymentDetail(:user_id,:store_id);',  { replacements: { user_id: req.body.user_id , store_id: req.body.store_id}, type: sequelize.QueryTypes.SELECT }).then(function(response){
            res.status(200)
          .json({
              statuscode:200,
              status : 'success',
              data : { result },
              error : [{message: "", errorcode: ""}]
          });        

       //  });
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


exports.VerifyUserEmail = async (req, res) => {

    try {              

        var result =  await sequelize.query('SELECT * FROM  fn_verifyuseremail(:email_id);',  { replacements: { email_id: req.query.email_id }, type: sequelize.QueryTypes.SELECT }).then(function(response){
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

exports.ResetPassword = async (req, res) => {

    try {             

        var encrptedPassword = utility.saltHashPassword(req.body.password);
        var result =  await sequelize.query('SELECT * FROM  fn_resetPassword(:email_id, :password, :salt);',  { replacements: { email_id: req.body.email_id, password: encrptedPassword.passwordHash, salt: encrptedPassword.salt }, type: sequelize.QueryTypes.SELECT }).then(function(response){
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