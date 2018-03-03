var Router = require('express').Router();

ctrl = require('../controllers/userController');

Router.post('/create',ctrl.create);
Router.get('/get/:email',ctrl.findByemail);

module.exports = Router;