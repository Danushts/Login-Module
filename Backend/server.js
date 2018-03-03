"use strict";
let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let cors = require("cors");
let app = express();
let PORT = 3000;
let route = require("./route");
const crypto = require('crypto').randomBytes(256).toString('hex'); // Provides cryptographic functionality (OpenSSL's hash, HMAC, cipher, decipher, sign and verify functions)

mongoose.Promise = global.Promise;

const MONGO_DB_URI = "mongodb://localhost:27017/UserList";
secret: crypto, // Cryto-created secret

//connect to MongoDb
mongoose.connect(MONGO_DB_URI, {
    useMongoClient: true
});

//on Connection
mongoose.connection.on('connected', () => {
    console.log("App is connected to Mongodb", MONGO_DB_URI);
});

//on Connection Error
mongoose.connection.on('error', err => {
    console.log('Error while connecting Mongoose', err);
});

//adding middleware
app.use(cors());

//bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/v1', route);
app.use('/api/v1', route);


app.get("/", (req, res) => {
    // console.log("I am existed");
    res.send("I am Exist");
});

app.listen(PORT, () => {
    console.log("i am running in the Port " + PORT);
});

