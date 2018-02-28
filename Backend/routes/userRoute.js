var Router = require('express').Router();
var ctrl = require('../controller/userCont');
// Router.get('/signup', (req, res) => {
//     console.log('i am from signup');

//     res.send('i am user sign up');
// });

Router.post('/signup', ctrl.register);
module.exports = Router;