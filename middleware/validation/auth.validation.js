require("dotenv").config();  
const jwt = require('jsonwebtoken');
const { v1: uuidv1 } = require('uuid');
const {  GenerateAdminToken } = require("../../models/auth");

module.exports = {   
    GenerateAdminTokenValidation: async(req,res,next) => {     
        const value = await GenerateAdminToken.validate(req.body);
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
    authenticateAIMSAdminToken: (req,res,next) => {       
        const authorizationHeaader = req.headers.authorization;
        let result;
        if (authorizationHeaader) {
          const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
          const options = {
            expiresIn: '60m',
            issuer: 'AIMS'
          };
          try {
            // verify makes sure that the token hasn't expired and has been issued by us
            result = jwt.verify(token, process.env.AIMS_SECRET);
           
            // Let's pass back the decoded token to the request object
            req.decoded = result;
            // We call next to pass execution to the subsequent middleware
            next();
          } catch (err) {
            // Throw an error just in case anything goes wrong with verification
         
            res.status(401).json({  statuscode:401,
                status : 'Authentication error',
                data : {},
                error : [{message: err.message, errorcode: 401}]
                 });

          }
        } else {          

        
            res.status(401).json({  statuscode:401,
            status : 'Authentication error',
            data : {},
            error : [{message: 'Authentication error. Token required', errorcode: 401}]
             });
        }

    },

    authenticateToken: (req,res,next) => {
        const authorizationHeaader = req.headers.authorization;
        let result;
        if (authorizationHeaader) {
          const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
          const options = {
            expiresIn: '60m',
            issuer: 'AIMS'
          };
          try {
            // verify makes sure that the token hasn't expired and has been issued by us
            result = jwt.verify(token, process.env.AIMS_SIGNIN_SECRET);
            
            // Let's pass back the decoded token to the request object
            req.decoded = result;
            // We call next to pass execution to the subsequent middleware
            next();
          } catch (err) {
            // Throw an error just in case anything goes wrong with verification
            
            res.status(401).json({  statuscode:401,
                status : 'Authentication error',
                data : {},
                error : [{message: err.message, errorcode: 401}]
                 });

          }
        } else {          

            console.log('authenticateAIMSAdminToken else called');
            res.status(401).json({  statuscode:401,
            status : 'Authentication error',
            data : {},
            error : [{message: 'Authentication error. Token required', errorcode: 401}]
             });
        }

    }

};