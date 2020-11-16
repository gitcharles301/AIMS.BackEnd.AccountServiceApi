require("dotenv").config();  
const jwt = require('jsonwebtoken');
const { v1: uuidv1 } = require('uuid');
const crypto = require('crypto');


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

exports.saltHashPassword = function(userpassword) {
    var salt = genRandomString(16); /** Gives us salt of length 16 */
    var passwordData = sha512(userpassword, salt);
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

exports.authenticatePassword = function(plainPassword, salt, dbPassword){
        return securePassword(plainPassword, salt) == dbPassword;
};
