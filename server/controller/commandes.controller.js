const Commande = require("../models/commandes");
require("../models/plats");
require("../models/restaurants");
require("../models/users");

const commander = (commande, next) => {
    const newCommande = new Commande(commande);
    newCommande.save((error, cmd) => {
        if (error) return next(error);

        next(null, cmd);
    })
};

const lister = (next) => {
    Commande.find().populate(["plats.objetPlat","restaurant","client"]).exec((error, commandes) => {
        if (error) return next(error);
        commandes.forEach(cmd => cmd.client.password = "🍕");

        next(null, commandes);
    })
};

const modifier = (id, commande, next) => {
    // delete commande._id;
    Commande.updateOne(id, commande).exec((error, cmd) => {
        if (error) return next(error);

        next(null, cmd);
    })
}

// const modifier = (id, commande, next) => {
//     delete commande._id;
//     Commande.findByIdAndUpdate(id, commande).exec((error, cmd) => {
//         if (error) return next(error);

//         next(null, cmd);
//     })
// }

module.exports = {
    commander, 
    lister,
    modifier
}
