const RestoPlat = require("../models/resto-plat");
require("../models/restaurants");
require("../models/plats");

const rechercherAvecEtat = (etat, next) => {
    RestoPlat.find().where("etat").gt(etat).populate(["resto","plats"]).exec((error, restos) => {
        if(error) return next(error);

        next(null,restos);
    })
}

const ajouter = (resto, next) => {
    const newResto = new RestoPlat(resto);
    newResto.save((error, newResto) => {
        if(error) return next(error);

        next(null, newResto);
    })
}

const modifier = (id, resto, next) => {
    delete resto._id;
    RestoPlat.findByIdAndUpdate(id, resto).exec((error, res) => {
        if(error) return next(error);

        next(null, res);
    })
}

const supprimer = (id, next) => {
    RestoPlat.deleteOne({"_id":id}).exec((error, res) => {
        if(error) return next(error);

        next(null, res);
    })
}

const updateEtat = (id, etat, next) => {
    delete resto._id;
    const resto = {"etat":etat};
    RestoPlat.findByIdAndUpdate(id, resto).exec((error, res) => {
        if(error) return next(error);

        next(null, res);
    })
}

const searchOne = (id, next) => {
    RestoPlat.find({"resto":id}).populate(["resto","plats"]).exec((error, resto) => {
        if(error) return next(error);

        next(null,resto);
    })
}

module.exports = {
    ajouter,
    modifier,
    supprimer,
    rechercherAvecEtat,
    updateEtat,
    searchOne
};