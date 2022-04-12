var express = require('express');
var router = express.Router();
const Resto = require('../models/restaurants');
const restoController = require('../controller/restaurants.controller');

router.post('/add', function(req, res, next) {
    restoController.ajouter(req.body, (error, resto) =>{
     if(error) return next(error);
 
     res.json(resto);
    })
 });
 
 router.put('/update', function(req, res, next){
     const id = req.query.id;
     restoController.modifier(id, req.body, (error, resto) => {
         if(error) return next(error);
 
         res.json(resto);
     })
 });
 
 router.delete("/delete", function(req, res, next) {
    restoController.supprimer(req.body._id, (error, resto) => {
         if(error) return next(error);
 
         res.json(resto);
     })
 })
 
 router.get("/search", function(req, res, next){
    restoController.rechercher(req.body.nom, (error, restos) => {
         if(error) return next(error);
 
         res.json(restos);
     })
 })
 
 router.get('/', function(req, res, next) {
    Resto.find({}, (err,data) => {
       if(err) next(err);

       res.json(data);
     })
 });
 
 module.exports = router;
