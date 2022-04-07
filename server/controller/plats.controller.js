const Plat = require("../models/plats");
require("../models/categories");

const ajouter = (plat, next) => {
    const newPlat = new Plat(plat);
    newPlat.save((error, newPlat) => {
        if(error) return next(error);

        next(null, newPlat);
    })
}

const modifier = (id, plat, next) => {
    delete plat._id;
    Plat.findByIdAndUpdate(id, plat).exec((error, res) => {
        if(error) return next(error);

        next(null, res);
    })
}

const supprimer = (id, next) => {
    Plat.deleteOne({"_id":id}).exec((error, res) => {
        if(error) return next(error);

        next(null, res);
    })
}

const rechercher = (nom, next) => {
    Plat.find({"nom": {$regex: '.*' + nom + '.*'}}).exec((error, plats) => {
        if(error) return next(error);

        next(plats);
    })
}

module.exports = {
    ajouter,
    modifier,
    supprimer,
    rechercher
};