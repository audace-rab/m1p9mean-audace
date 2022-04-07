var express = require('express');

var router = express.Router();
const userRoute = require('../routes/users-route');
const platRoute = require('../routes/plats-route');
const commandeRoute = require('../routes/commandes-route');

/* GET home page. */


router.use('/user',userRoute);
router.use('/plat',platRoute);
router.use('/commande',commandeRoute);

module.exports = router;
