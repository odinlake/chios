var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    if (!req.session.pinused)
        res.redirect(301, "/login");

    res.render('index', { title: 'Chios' });
});

module.exports = router;
