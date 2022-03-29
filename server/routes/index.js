var express = require('express');

var router = express.Router();
const userRoute = require('../routes/users-route');

/* GET home page. */


router.use('/user',userRoute);

module.exports = router;
