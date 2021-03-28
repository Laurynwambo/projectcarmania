const express = require('express');
const dotenv = require("dotenv")
const path = require('path');
const bodyParser = require("body-parser");

const app = express();

const authRoutes = require("./routes/auth");
const feedRoutes = require('./routes/feed');
const vehicleRoutes = require("./routes/vehicles")
const userRoutes = require("./routes/user")
const bodytypeRoutes =require("./routes/bodytype")
const pictureRoutes =require("./routes/picture")
const vehiclemakeRoutes =require("./routes/vehiclemake")
const vehiclemodelRoutes =require("./routes/vehiclemodel")

// localhost:6000/auth/signup
dotenv.config();

console.log("Log once")
app.use(bodyParser.json());
app.use(express.urlencoded( { extended : false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/auth', authRoutes);
app.use('/feed', feedRoutes);
app.use('/vehicles', vehicleRoutes);
app.use('/users', userRoutes);
app.use('/bodytype', bodytypeRoutes);
app.use('/picture', pictureRoutes);
app.use('/vehiclemake', vehiclemakeRoutes);
app.use('/vehiclemodel', vehiclemodelRoutes);


// Handle errors from requests using the next function i.e. next(err)
app.use((error, req, res, next) => {
    console.log(error); 
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

app.listen(8081, () => {
    console.log('server is running...');
});

module.exports = app;



