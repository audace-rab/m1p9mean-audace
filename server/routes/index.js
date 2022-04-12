var express = require('express');

var router = express.Router();
const userRoute = require('../routes/users-route');
const platRoute = require('../routes/plats-route');
const commandeRoute = require('../routes/commandes-route');
const restoRoute = require('../routes/resto-route');
const restoPlatRoute = require('../routes/resto-plat-route');

/* GET home page. */


router.use('/user',userRoute);
router.use('/plat',platRoute);
router.use('/commande',commandeRoute);
router.use('/restaurant',restoRoute);
router.use('/restoPlat',restoPlatRoute);

module.exports = router;
