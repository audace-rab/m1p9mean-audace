var express = require('express');
var router = express.Router();
const Plat = require('../models/plats');
const platController = require('../controller/plats.controller');


router.post('/add', function(req, res, next) {
   platController.ajouter(req.body, (error, plat) =>{
    if(error) return next(error);

    res.json(plat);
   })
});

router.put('/update', function(req, res, next){
    const id = req.query.id;
    platController.modifier(id, req.body, (error, plat) => {
        if(error) return next(error);

        res.json(plat);
    })
});

router.delete("/delete", function(req, res, next) {
    platController.supprimer(req.body._id, (error, plat) => {
        if(error) return next(error);

        res.json(plat);
    })
})

router.get("/search", function(req, res, next){
    platController.rechercher(req.body.nom, (error, plats) => {
        if(error) return next(error);

        res.json(plats);
    })
})

router.get('/', function(req, res, next) {
    Plat.find({}, (err,data) => {
      if(err) console.log(err);
      console.log(data);
      res.json(data);
    })
});

module.exports = router;