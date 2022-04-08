var express = require('express');
var router = express.Router();
const Commande = require('../models/commandes');
const commandeController = require('../controller/commandes.controller');
const tokenHandler = require("../middlewares/auth");
const restrictHandler = require("../middlewares/restrict");

router.post('/commander', function(req, res, next) {
    commandeController.commander(req.body, (error, commande) =>{
     if(error) return next(error);
 
     res.json(commande);
    })
});

router.get('/', tokenHandler,restrictHandler({profile:["restaurant","admin"]}),function(req, res, next) {
    commandeController.lister((error, cmds) =>{
        if(error) return next(error);
 
        res.json(cmds);
    })
});



router.put('/update', function(req, res, next){
    const id = req.query.id;
    const filter = {
        "_id": id,
        "plats.objetPlat._id": req.query.plat
    }
    commandeController.modifier(filter, req.body, (error, cmd) => {
        if(error) return next(error);
 
        res.json(cmd);
    })
});

module.exports = router;