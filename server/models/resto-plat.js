const mongoose = require('mongoose');

const RestoPlatSchema = new mongoose.Schema({
    resto: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Le resto est obligatoire"],
        ref: "Restaurant"
    },
    plats: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "Au moins un plat est obligatoire"],
            ref: "Plat"  
        }
    ],
    etat: {
        type: Number,
        default : 1
    }
});

module.exports = mongoose.model('RestoPlat', RestoPlatSchema, 'restoplat');