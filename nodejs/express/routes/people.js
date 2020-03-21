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


/* return array of errors associated with post data, if any */
var validateRecognitionPost = function(people, post) {
    var errors = [];
    var validusers = people.map(p => p.username);
    var by_user = people.filter(p => p.username == post.by_user);
    if (!validusers.includes(post.username)) {
        errors.push("invalid username.");
    }
    if (by_user.length == 0) {
        errors.push("invalid by_user.");
    }
    if (by_user.length > 0 && !(
        by_user[0].password == post.using_password)) {
        errors.push("invalid password.");
    }
    if (post.by_user == post.username) {
        errors.push("may not award to self.");
    }
    return errors;
}


/* send error result */
var sendError = function(res, errors) {
    vars = {
        title: "ERROR!",
        message: "Something went wrong.",
        url: "/people/recognitions",
        errors: errors,
        timeout: 10000,
    };
    res.render('redirectinstyle', vars);
}


/* POST add new recognition. */
router.post('/addrecognition', function(req, res, next) {
    if (!chiosconfig.auth(req, res)) return;
    errors = [];
    chiosdb.getRecognitions(function(err, data) {
        vars = {
            title: "Operation Success",
            message: "Recognition was added.",
            url: "/people/recognitions",
            errors: null,
            people: data[0],
            data: data[1],
            timeout: "3000",
        };
        if (err) {
            console.log("DBError: %s", err);
            errors = [err];
        } else {
            errors = validateRecognitionPost(vars.people, req.body);
        }
        if (errors.length > 0) {
            sendError(res, errors);
        } else {
            rec = [ 
                req.body.username, 
                req.body.recognition, 
                req.body.by_user, 
                req.body.using_password,
            ];
            console.log("ADDING RECOGNITION:", rec);
            chiosdb.addRecognition(rec[0], rec[1], rec[2], rec[3], 
                    function (err, data) {
                if (err) {
                    sendError(res, [err]);
                    console.log(err);
                } else {
                    res.render('redirectinstyle', vars);
                }
            });
        }
    });
});


module.exports = router;
