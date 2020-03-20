const express = require('express');
const chiosconfig = require('../libs/chiosconfig');
const chiosdb = require('../libs/chiosdb');
const router = express.Router();


const serverRestart = function(req, res) {
    res.render('redirect', {}, function(err, html) {
        console.log('cycle request received, shutting down...');
        res.status(307).send(html).end();
        setTimeout(() => {
            console.log('exit!');
            process.exit(0);
        }, 1000);
    });
};


/* GET devenv can be restarted remotely */
router.get('/restart', function(req, res, next) {
    if (!chiosconfig.auth(req, res)) return;
    chiosdb.assertDev();
    serverRestart(req, res);
});


/* GET devenv can be restarted remotely */
router.get('/cleanslate', async function(req, res, next) {
    if (!chiosconfig.auth(req, res)) return;
    chiosdb.assertDev();
    await chiosdb.doCleanup();
    serverRestart(req, res);
});


module.exports = router;
