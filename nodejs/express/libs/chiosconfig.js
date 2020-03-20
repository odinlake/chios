const Hjson = require('hjson');
const fs = require('fs');

global.cfg = null;


exports.config = function() {
    if (!global.cfg) {
        global.cfg = Hjson.parse(fs.readFileSync('../../credentials.hjson', "utf8"));
    }
    return global.cfg;
};


exports.auth = function(req, res) {
    if (req.connection.remoteAddress == '::ffff:127.0.0.1') {
        console.log("AUTH", "localdev");
        req.session.pinused = 'localdev';
    } else {
        console.log("AUTH", req.connection.remoteAddress);
    }
    if (!req.session.pinused) {
        res.redirect(301, "/login");
        return false;
    } else {
        return true;
    }
};








