var express = require('express');
var router = express.Router();
const RestoPlat = require('../models/resto-plat');
const restoPlatController = require('../controller/resto-plat.controller');

router.post('/add', function(req, res, next) {
    restoPlatController.ajouter(req.body, (error, resto) =>{
     if(error) return next(error);
 
     res.json(resto);
    })
 });
 
 router.put('/update', function(req, res, next){
     const id = req.query.id;
     restoPlatController.modifier(id, req.body, (error, resto) => {
         if(error) return next(error);
 
         res.json(resto);
     })
 });

 router.put('/updateEtat', function(req, res, next){
    const id = req.query.id;
    const etat = req.query.etat;
    restoPlatController.updateEtat(id, etat, (error, resto) => {
        if(error) return next(error);

        res.json(resto);
    })
});
 
 router.delete("/delete", function(req, res, next) {
    restoPlatController.supprimer(req.body._id, (error, resto) => {
         if(error) return next(error);
 
         res.json(resto);
     })
 })
 
 router.get("/searchByEtat", function(req, res, next){
    restoPlatController.rechercherAvecEtat(req.query.etat, (error, restos) => {
         if(error) return next(error);
 
         res.json(restos);
     })
 })
 
 router.get('/', function(req, res, next) {
    RestoPlat.find({}, (err,data) => {
       if(err) next(err);

       res.json(data);
     })
 });

 router.get('/searchOne', function(req, res, next){
    restoPlatController.searchOne(req.query.id, (error, rstplt) => {
        if(error) return next(error);
 
         res.json(rstplt);
    })
 })
 
 module.exports = router;
