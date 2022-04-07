const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    adresse: {
        type: Number,
        required: true
    },
    coordonnees: {
       long :{type: Number, required: true},
       lat :{type: Number, required: true}
    },
    telephone: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Restaurant', restaurantSchema, 'restaurant');