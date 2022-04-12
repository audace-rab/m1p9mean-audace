const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    adresse: {
        type: String,
        required: true
    },
    coordonnees: {
       long :{type: Number, required: true},
       lat :{type: Number, required: true}
    },
    telephone: {
        type: String,
        required: true
    },
    image:{
        type: String
    }
});

module.exports = mongoose.model('Restaurant', restaurantSchema, 'restaurant');