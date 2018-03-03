let User = require('../Model/User');
let _ = require('lodash');
const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const config = require('../server'); // Import database configuration
module.exports = {

    //Create User

    create: (req, res) => {

        let baseObj = _.pick(req.body, [
          "firstName",
          "lastName",
          "email",
          "password",
          "companyName",
          "activated"
        ]);
        if (_.isEmpty(baseObj.firstName)) {
          return res.status(400).send({
            err: 'firstName is required field'
          });
        }
        if (_.isEmpty(baseObj.email)) {
            return res.status(400).send({
              err: 'email is required field'
            });
          }
         if (_.isEmpty(baseObj.password)) {
            return res.status(400).send({
              err: 'password is required field'
            });
          }
          if (_.isEmpty(baseObj.companyName)) {
            return res.status(400).send({
              err: 'companyName is required field'
            });
          }

          // Search for user's e-mail in database;
          User.findOne({ email: req.params.email }, (err, user) => {
            if (err) {
              res.json({ success: false, message: err }); // Return connection error
            } else {
              // Check if user's e-mail is taken
              if (user) {
                res.json({ success: false, message: 'E-mail is already taken' }); // Return as taken e-mail
              } else {
                res.json({ success: true, message: 'E-mail is available for Register' }); // Return as available e-mail

                let user = new User(baseObj);
                user.save({})
                  .then((userSaved) => {
                    return res.status(200).json(userSaved);
                  })
                  .catch((err) => {
                    return res.status(500).send(err);
                  });

              }
            }
          });
      },


       // Get user by id
      findByemail: (req, res) => {
            
        if (!req.body.email) {
          res.json({ success: false, message: 'No Email was provided' }); // Return error
        } else {
          // Check if password was provided
          if (!req.body.password) {
            res.json({ success: false, message: 'No password was provided.' }); // Return error
          } else {
            // Check if username exists in database
            User.findOne({ username: req.body.email.toLowerCase() }, (err, user) => {
              // Check if error was found
              if (err) {
                res.json({ success: false, message: err }); // Return error
              } else {
                // Check if email was found
                if (!user) {
                  res.json({ success: false, message: 'Username not found.' }); // Return error
                } else {
                  const validPassword = user.comparePassword(req.body.password); // Compare password provided to password in database
                  // Check if password is a match
                  if (!validPassword) {
                    res.json({ success: false, message: 'Password invalid' }); // Return error
                  } else {
                    const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '24h' }); // Create a token for client
                    res.json({ success: true, message: 'Success!', token: token, user: { username: user.username } }); // Return success and token to frontend
                  }
                }
              }
            });
          }
        }

        },

};


