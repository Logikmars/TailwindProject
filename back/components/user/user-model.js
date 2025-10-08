const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: String,
    password: String,
    balance: {
        default: 0,
        type: Number,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
}, { timestamps: true });

module.exports = model('User', userSchema);