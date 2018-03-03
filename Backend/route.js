var Router = require('express').Router();
var UserRoute = require('./routes/userRoute');

Router.use('/user', UserRoute);

module.exports = Router