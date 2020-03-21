const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    defaultProfile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'profile'
    },
    role: {
        type: String,
        enum: ['member', 'instructor', 'admin'],
        default: 'member'
    }
});

module.exports = User = mongoose.model('user', UserSchema);