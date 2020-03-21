const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    classes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'class'
        }
    ]
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);