const Resto = require("../models/restaurants");

const rechercher = (nom, next) => {
    Resto.find({"nom": {$regex: '.*' + nom + '.*'}}).exec((error, restos) => {
        if(error) return next(error);

        next(restos);
    })
}

const ajouter = (resto, next) => {
    const newResto = new Resto(resto);
    newResto.save((error, newResto) => {
        if(error) return next(error);

        next(null, newResto);
    })
}

const modifier = (id, resto, next) => {
    delete resto._id;
    Resto.findByIdAndUpdate(id, resto).exec((error, res) => {
        if(error) return next(error);

        next(null, res);
    })
}

const supprimer = (id, next) => {
    Resto.deleteOne({"_id":id}).exec((error, res) => {
        if(error) return next(error);

        next(null, res);
    })
}


module.exports = {
    ajouter,
    modifier,
    supprimer,
    rechercher
};