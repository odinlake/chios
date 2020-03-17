var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    if (req.session.pinused) {
        res.render('login', { title: 'Login Again?' });
    } else {
        res.render('login', { title: 'Login' });
    }
});

router.post('/', function(req, res, next) {
    if (req.body.pin == '1234') {
        req.session.pinused = req.body.pin;
        res.redirect(301, "/");
    } else {
        req.session.pinused = req.body.pin;
        res.render('login', { title: 'Fail. Try Again:' });
    }
});

module.exports = router;
