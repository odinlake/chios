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
    recognitions = [
        {title: "prone - safe"},
        {title: "prone - qualified"},
        {title: "prone - competent"},
        {title: "prone - marksman"},
        {title: "prone - expert"},
        {title: "lwsr - safe"},
        {title: "lwsr - qualified"},
        {title: "lwsr - competent"},
        {title: "lwsr - marksman"},
        {title: "lwsr - expert"},
    ];
    chiosdb.getRecognitions(function(err, data) {
        vars = {
            people: [],
            data: [],
            recognitions: recognitions,
        };
        if (err) {
            console.log("Error: %s", err);
        } else {
            vars.people = data[0];
            vars.data = data[1];
        }
        res.render('recognitions', vars);
    });
});


/* GET user profile. */
router.get('/profile/:username', function(req, res, next) {
    if (!chiosconfig.auth(req, res)) return;
    chiosdb.getProfile(req.params.username, function(err, data) {
        if (err) {
            console.log("Error: %s", err);
            res.render('userprofile', {pi: {}, data: []});
        } else {
            res.render('userprofile', {pi: data[0][0], data: data[1]});
        }
    });
});


/* POST add new recognition. */
router.post('/addrecognition', function(req, res, next) {
    if (!chiosconfig.auth(req, res)) return;

    chiosdb.getRecognitions(function(err, data) {
        vars = {
            title: "Operation Success",
            message: "Something was done.",
            url: "/people/recognitions",
        };
        if (err) {
            console.log("Error: %s", err);
            res.render('redirectinstyle', vars);
        } else {
            res.render('redirectinstyle', vars);
        }
    });
});


module.exports = router;
