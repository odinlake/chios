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
    console.log(req.body.pin, chiosconfig.guestpassword);
    if (req.body.pin == chiosconfig.guestpassword) {
        req.session.pinused = req.body.pin;
        res.redirect(301, "/");
    } else {
        req.session.pinused = req.body.pin;
        res.render('login', { title: 'Fail. Try Again:' });
    }
});


/* POST logout. */
router.post('/logout', function(req, res, next) {
    req.session.pinused = null;
    res.redirect(301, "/login");
});


module.exports = router;
