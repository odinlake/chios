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
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if (ip.endsWith("127.0.0.1")) {
        console.log("AUTH", "localdev");
        req.session.pinused = 'localdev';
    } else {
        console.log("AUTH", req.connection.remoteAddress);
    }
    if (!req.session.pinused) {
        res.redirect(307, "/login");
        return false;
    } else {
        return true;
    }
};








