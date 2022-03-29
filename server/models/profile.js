const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    profile_name: {
        type: String,
        required: true
    },
    rank: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Profile', ProfileSchema, 'profile');