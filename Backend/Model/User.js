var mongoose = require('mongoose');
var validate = require('mongoose-validator');
var Schema = mongoose.Schema;

// Validate Function to check password length
let passwordLengthChecker = (password) => {
    // Check if password exists
    if (!password) {
      return false; // Return error
    } else {
      // Check password length
      if (password.length < 8 || password.length > 35) {
        return false; // Return error if passord length requirement is not met
      } else {
        return true; // Return password as valid
      }
    }
  };
  
  // Validate Function to check if valid password format
  let validPassword = (password) => {
    // Check if password exists
    if (!password) {
      return false; // Return error
    } else {
      // Regular Expression to test if password is valid format
      const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
      return regExp.test(password); // Return regular expression test result (true or false)
    }
  };
  
  // Array of Password validators
  const passwordValidators = [
    // First password validator
    {
      validator: passwordLengthChecker,
      message: 'Password must be at least 8 characters but no more than 35'
    },
    // Second password validator
    {
      validator: validPassword,
      message: 'Must have at least one uppercase, lowercase, special character, and number'
    }
  ];

var UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [
            validate({
                validate: 'isEmail'
            })
        ]
    },
    password: {
        type: String,
        required: true,
        validate: passwordValidators 
    },
    companyName: {
        type: String,
        required: true
    },
    activated: {
        type: Boolean,
        default: true
    }


});

// Schema Middleware to Encrypt Password
userSchema.pre('save', function(next) {
    // Ensure password is new or modified before applying encryption
    if (!this.isModified('password'))
      return next();
  
    // Apply encryption
    bcrypt.hash(this.password, null, null, (err, hash) => {
      if (err) return next(err); // Ensure no errors
      this.password = hash; // Apply encryption to password
      next(); // Exit middleware
    });
  });
  
  // Methods to compare password to encrypted password upon login
  userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password); // Return comparison of login password to password in database (true or false)
  };

module.exports = mongoose.model('user', UserSchema);