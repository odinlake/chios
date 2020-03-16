var express = require('express');
var router = express.Router();

/* devenv can be restarted remotely */
router.get('/', function(req, res, next) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('cycle request received, exiting...');
    console.log('cycle request received, exiting...');
    process.exit(0);
});

module.exports = router;
