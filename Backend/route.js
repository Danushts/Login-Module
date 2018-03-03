var Router = require('express').Router();
var UserRoute = require('./routes/userRoutes');

Router.use('/user', UserRoute);
module.exports = Router