const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { v1: uuidv1 } = require('uuid');
const { Sequelize  } = require('sequelize');
const sequelize = new Sequelize(process.env.CONNECTION_STRING);



exports.signUp = async(req, res) => {
    try {
         
        var encrptedPassword = passwordEncrypt(req.body.password);
        var result =  await sequelize.query('SELECT * FROM  fn_getstate(:country_id);',  { replacements: { country_id: req.body.country_id }, type: sequelize.QueryTypes.SELECT }).then(function(response){
            res.status(200)
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

exports.passwordEncrypt = function (plainPassword) {
    // Remember to set the data value, otherwise it won't be validated
    this.setDataValue('salt', uuidv1());
    var securedHash = crypto.createHmac('sha256', this.salt)
    .update(plainPassword)
    .digest('hex');
    this.setDataValue('password', securedHash);
 };

exports.signIn = async (req, res) => {
     // validate

     const errors = validationResult(false);

     if(!errors.isEmpty()){
         return res.status(400).json({
             Message: "SignIn failed."
         });
     }
    // create a token

    const authToken = jwt.sign({ id: userObj.id }, process.env.SECRET);

    // put bearerToken into the cookie

    res.cookie("authToken", authToken, { expire: new Date() + 9999 });

    // send response to the front end.

    const { id, first_name, email, is_admin, is_universal_user  } = userObj;        
    return res.json({ authToken, user: { id, first_name, email, is_admin, is_universal_user  }});
};

exports.signOut = (req, res) => {
    // clear the cookie which contains the token
    res.clearCookie("authToken");

    return res.json({
        message: "User is signed out successfully."
    });
};

 
