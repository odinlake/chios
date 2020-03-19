const express = require('express');
const chiosdb = require('../libs/chiosdb');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    if (!req.session.pinused)
        res.redirect(301, "/login");

    chiosdb.getPeople(function(err, rows) {
        if (err) {
            console.log("Error: %s", err);
            res.render('people', { data: [] });
        } else {
            res.render('people', { data: rows });
        }
    });
});

module.exports = router;
