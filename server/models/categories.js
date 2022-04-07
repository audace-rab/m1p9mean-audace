const mongoose = require('mongoose');

const CategorieSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: [true, "Le nom de plat est obligatoire"]
    },
    description: {
        type: String
    },
});

module.exports = mongoose.model('Categorie', CategorieSchema, 'categorie');