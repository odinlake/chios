const express = require('express');
const chiosconfig = require('../libs/chiosconfig');
const router = express.Router();


/* GET index. */
router.get('/', function(req, res, next) {
    if (!chiosconfig.auth(req, res)) return;
    res.render('index');
});


module.exports = router;
