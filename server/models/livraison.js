const mongoose = require('mongoose');

const LivraisonSchema = new mongoose.Schema({
    commande: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "La commande est obligatoire"],
        ref: "Commande"
    },
    livreur: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Le livreur est obligatoire"],
        ref: "Users"
    },
    date: {
        type: Date,
        required: true,
        default: new Date()
    },
    frais: {
        type: Number,
        default: 5000
    },
    etat: {
        type: Number,
        default: 1
    }

});

module.exports = mongoose.model('Livraison', LivraisonSchema, 'livraison');