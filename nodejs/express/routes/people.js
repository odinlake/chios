const express = require('express');
const chiosdb = require('../libs/chiosdb');
const chiosconfig = require('../libs/chiosconfig');
const router = express.Router();


/* GET all users listing. */
router.get('/', function(req, res, next) {
    if (!chiosconfig.auth(req, res)) return;
    chiosdb.getPeople(function(err, rows) {
        if (err) {
            console.log("Error: %s", err);
            res.render('people', { data: [] });
        } else {
            res.render('people', { data: rows });
        }
    });
});


/* GET all recognitions listing. */
router.get('/recognitions', function(req, res, next) {
    if (!chiosconfig.auth(req, res)) return;
    chiosdb.getRecognitions(function(err, rows) {
        if (err) {
            console.log("Error: %s", err);
            res.render('recognitions', { data: [] });
        } else {
            res.render('recognitions', { data: rows });
        }
    });
});


/* GET user profile. */
router.get('/profile/:username', function(req, res, next) {
    if (!chiosconfig.auth(req, res)) return;
    var data = {};

    chiosdb.getProfile(req.params.username, function(err, data) {
        if (err) {
            console.log("Error: %s", err);
            res.render('userprofile', {pi: {}, data: []});
        } else {
            res.render('userprofile', {pi: data[0][0], data: data[1]});
        }
    });
});


module.exports = router;
