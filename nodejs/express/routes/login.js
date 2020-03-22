const express = require('express');
const chiosconfig = require('../libs/chiosconfig').config();
const router = express.Router();


/* GET login challenge. */
router.get('/', function(req, res, next) {
    if (req.session.pinused) {
        res.render('login', { title: 'Login Again?', showlogout: true });
    } else {
        res.render('login', { title: 'Login' });
    }
});


/* POST login. */
router.post('/', function(req, res, next) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if (req.body.pin == chiosconfig.guestpassword) {
        console.log("AUTH", ip, req.body.pin);
        req.session.pinused = req.body.pin;
        res.redirect(302, "/");
    } else {
        req.session.pinused = req.body.pin;
        res.render('login', { title: 'Fail. Try Again:' });
    }
});


/* POST logout. */
router.post('/logout', function(req, res, next) {
    req.session.pinused = null;
    res.redirect(302, "/login");
});


module.exports = router;
