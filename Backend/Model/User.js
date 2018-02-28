let mongoose = require('mongoose');
let validate = require('mongoose-validator');
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

module.exports = mongoose.model('user', UserSchema);