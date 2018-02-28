"use strict";
let bodyParser, express, mongoose, cors, app, PORT, route, validator;
express = require('express');
bodyParser = require('body-parser');
mongoose = require('mongoose');
cors = require('cors');
app = express();
PORT = 3000;
route = require('./route');
validator = require('validator');

mongoose.Promise = global.Promise;

const MONGO_DB_URI = "mongodb://localhost:27017/TestCase";
//connect to MongoDb
mongoose.connect(MONGO_DB_URI, {});
//on Connection
mongoose.connection.on('connected', () => {
    console.log("App is connected to Mongodb", MONGO_DB_URI);
});

//on Connection Error
mongoose.connection.on('error', err => {
    console.log('Error while connecting Mongoose', err);
});

app.use(cors());
//bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/v1', route);

app.get('/', (req, res) => {
    res.send('i am from Express');
});

app.listen(PORT, () => {
    console.log('I am running in the port' + PORT);

});