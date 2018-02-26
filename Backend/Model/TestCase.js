var mongoose = require('mongoose');
var validate = require('mongoose-validator');
var Schema = mongoose.Schema;

var TestCaseSchema = new Schema({
    tcId: {
        type: String,
        required: true
    },
    tcModule: {
        type: String,
        required: true
    },
    tsSummary: {
        type: String,
        required: true
    },
    tcPreCondition: {
        type: String,
        required: false
    },
    tcSteps: {
        type: String,
        required: false
    },
    tcExpResult: {
        type: String,
        required: false
    },
    tcResult: {
        type: String,
        enum: ["pass", "fail", "skip"],
        default: 'skip'
    },
    tcNote: {
        type: String,
        required: false
    },
    tcColor: {
        type: String,
        required: false
    },
    tcArchived: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
});

module.exports = mongoose.model('testCase', TestCaseSchema);