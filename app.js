require("dotenv").config();  
const express = require('express');
const { Sequelize } = require('sequelize');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const port =  process.env.port || 8001;
const sequelize = new Sequelize(process.env.CONNECTION_STRING) // Example for postgres
const userRoutes  = require('./routes/userRoute');
const commonRoutes  = require('./routes/commonRoute');
const storeRoutes = require('./routes/storeRoute');
const authRoutes = require('./routes/authRoute');
const session = require('express-session')
const FileStore = require('session-file-store')(session)

app.listen(port, () => {
    console.log(`your app started successfully and is running at port: ${port}`);
});


// CONNECT TO DATABASE

sequelize.authenticate().then(() => {
    console.log('DB Connected successfully !!!');
}).catch((err) => {
    console.log(err);
});


// MIDDLEWARES

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// ROUTES

app.use('/api/user', userRoutes);
app.use('/api/common',commonRoutes);
app.use('/api/store', storeRoutes);
app.use('/api/auth',authRoutes);