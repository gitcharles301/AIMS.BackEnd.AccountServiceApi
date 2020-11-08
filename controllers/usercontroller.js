require("dotenv").config();  
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { v1: uuidv1 } = require('uuid');
const { Sequelize  } = require('sequelize');
const sequelize = new Sequelize(process.env.CONNECTION_STRING);
const crypto = require('crypto');


exports.signUp = async(req, res) => {
    try {
         console.log('signUp called');
        var encrptedPassword = saltHashPassword(req.body.password);
        console.log(encrptedPassword);
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
         console.log(response[0].password);
         console.log(response[0].salt);
       // var result = response[0];
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
            if(authenticatePassword(req.body.password, response[0].salt, response[0].password))
            {
                console.log('authendicated');
                console.log(process.env.AIMS_SIGNIN_SECRET);
                 // create a token
                const authToken = jwt.sign({ id: response[0].userid }, process.env.AIMS_SIGNIN_SECRET);
                  // put bearerToken into the cookie

                 console.log(authToken);
                res.cookie("authToken", authToken, { expire: new Date() + 9999 });

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

        var result =  await sequelize.query('SELECT * FROM  fn_getuserprofile(:user_id,:store_id);',  { replacements: { user_id: req.body.user_id , store_id: req.body.store_id}, type: sequelize.QueryTypes.SELECT }).then(function(response){
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
        var result = { "user_id" : 10001, "invoiceAddress_id": 1 }
      //  var result =  await sequelize.query('SELECT * FROM  AddPaymentInvoiceAddress(:user_id,:store_id);',  { replacements: { user_id: req.body.user_id , store_id: req.body.store_id}, type: sequelize.QueryTypes.SELECT }).then(function(response){
            res.status(200)
          .json({
              statuscode:200,
              status : 'success',
              data : result,
              error : [{message: "", errorcode: ""}]
          });
        

        // });
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


// Local Module functions

var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};

var genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
};

var  saltHashPassword = function(userpassword) {
    var salt = genRandomString(16); /** Gives us salt of length 16 */
    var passwordData = sha512(userpassword, salt);
    console.log('UserPassword = '+userpassword);
    console.log('Passwordhash = '+passwordData.passwordHash);
    console.log('nSalt = '+passwordData.salt);   
    return passwordData;  
};


var securePassword = function(plainPassword, salt) {
    if(!plainPassword || !salt) return "";

    try {
        return crypto.createHmac('sha512', salt)
        .update(plainPassword)
        .digest('hex');
    } catch (err) {
       return "";
    }
};

var authenticatePassword = function(plainPassword, salt, dbPassword){
        return securePassword(plainPassword, salt) == dbPassword;
};

