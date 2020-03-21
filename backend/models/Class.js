const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    instructors: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = Class = mongoose.model('class', ClassSchema);