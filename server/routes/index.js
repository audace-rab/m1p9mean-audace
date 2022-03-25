var express = require('express');
var router = express.Router();
const Users = require('../models/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  Users.find({}, (err,data) => {
    if(err) console.log(err);

    res.json(data);
  })
});

module.exports = router;
