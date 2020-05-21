const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min:6
    },
    current: {
        type: Number,
        default: 0,
        min: 0
    }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);