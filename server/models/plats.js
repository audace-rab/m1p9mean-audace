const mongoose = require('mongoose');

const PlatSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: [true, "Le nom de plat est obligatoire"]
    },
    prix: {
        type: Number,
        required: [true, "Le prix est obligatoire"]
    },
    categorie: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Le categorie est obligatoire"],
        ref: "Categorie"
    },
    image: {
        type: String,
        required: [true, "L'image' est obligatoire"]
    },
    description: {
        type: String
    },
});

module.exports = mongoose.model('Plat', PlatSchema, 'plat');