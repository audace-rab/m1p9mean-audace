var express = require('express');
var router = express.Router();
const Users = require('../models/users');
const userController = require('../controller/users.controller');
const tokenHandler = require("../middlewares/auth");


router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  Users.find({}, (err,data) => {
    if(err) console.log(err);
    console.log(data);
    res.json(data);
  })
});

router.get('/add', function(req, res, next) {
  const newUser = new Users({
    login:"rakoto",
    password: "test1234"
  });

  newUser.save();

  
});

router.post("/login", function(req, res, next){
  userController.login(req.body, (error, user) => {
    if(error) return next(error);

    res.json(user);
  }) 
})

router.post("/register", function(req, res, next){
  userController.addNewUser(req.body, (error, user) => {
    if(error) return next(error);

    res.json(user);
  })
})

router.post("/hashPass", function(req, res, next){
  userController.hashPassword(req.body, (error, hash) => {
    if(error) return next(error);

    res.json(hash);
  });
})


router.get("/listAll", tokenHandler,function(req, res, next){
  Users.find({}, (err,data) => {
    if(err) console.log(err);
    console.log(data);
    res.json(data);
  })
})


module.exports = router;
