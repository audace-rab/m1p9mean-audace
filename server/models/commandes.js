const mongoose = require('mongoose');

const CommandeSchema = new mongoose.Schema({
    plats: [
        {
            objetPlat:{
                type: mongoose.Schema.Types.ObjectId,
                required: [true, "Veuiller choisir au moins un plat"],
                ref: "Plat"
            },
            quantite:{
                type: Number,
                required: [true, "La quantité est obligatoire"]
            }
        }],
    date: {
        type: Date,
        required: true,
        default: new Date().toLocaleString('en-US', {
            timeZone: 'Europe/Moscow'
          })
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Le client est obligatoire"],
        ref: "Users"
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Le restaurant est obligatoire"],
        ref: "Restaurant"
    },
    etat: {
        type: Number,
        default: 1
    }
});

module.exports = mongoose.model('Commande', CommandeSchema, 'commande');