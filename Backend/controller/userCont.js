let User = require('../Model/User');
//var validate = require('mongoose-validator');
let _ = require('lodash');

let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let secretKey = require('../config/secretKey');



module.exports = {
    register: (req, res) => {

        //register the User
        /*let baseObj= _.pick(req.body,[
            "firstName",
            "lastName",
            "email",
            "password",
            "companyName"
        ]);*/
        var pass = req.body.password;
        if (pass) {
            bcrypt.hash(pass, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    let user = new User({

                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: (req.body.email).toLowerCase(),
                        password: hash,
                        companyName: req.body.companyName

                    });
                    user.save()
                        .then((user) => {
                            return res.status(200).json({
                                msg: 'The User ' + user.firstName + ' ' + user.lastName + 'registered successfully'
                            });

                        })
                        .catch((errors) => {
                            return res.status(500).send(errors);
                        });
                }
            });
        }



        /*if(_.isEmpty(baseObj.firstName && baseObj.email && baseObj.password && baseObj.companyName)){
            return res.status(400).send({
               error:'The required fields are Empty'
            });
        }*/
        //let user = User(baseObj);

    },
    login: (req, res) => {
         //obj = _.pick(req.body, ["email", "password"]);
       var  email = req.body.email;

       var  password = req.body.password;
        console.log("Email :" + email + '<----> password :' + password);
        User.findOne({
                email: email,
                activated: true
            })
            .exec()
            .then(user => {
                if (user.length < 1) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }
                console.log("Email :" + user.email + '<----> password :' + user.password);
                return bcrypt.compare(password, user.password, (err, result) => {
                    console.log('password :' + password);
                    if (err) {
                        return res.status(401).json({
                            message: 'Auth failed'
                        });
                    }
                    secret = secretKey + user.password;
                    // console.log(secretKey);
                    if (result) {
                        const token = jwt.sign({
                            id: user._id,
                            email: user.email
                        }, secret, {
                            expiresIn: '30d'
                        });

                        return res.status(200).json({
                            result: 'success',
                            token: token,
                            user: user.email
                        });
                    }
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                });
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json({
                    error: err
                });
            });
    }
};


    }
}

