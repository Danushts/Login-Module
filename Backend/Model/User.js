let mongoose = require('mongoose');
let validate = require('mongoose-validator');
let bcrypt = require('bcrypt');
//var validator = require('validator');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
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
                validator: 'isEmail'
            })
        ]
    },
    password: {
        type: String,
        required: true
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

/*UserSchema.pre('save',(next) => {

    if (this.email) {
        console.log('before'+this.email);
        this.email = this.email.toLowerCase();
    }
    console.log('after'+this.email);
    if (this.password) {
        console.log('i am in hash')
        return bcrypt.hash(this.password, 10, (err, hash) => {
            if (err) {
                return next(err);
            }
            this.password = hash;
        });

    }
    return next();
});*/


module.exports = mongoose.model('user', UserSchema);