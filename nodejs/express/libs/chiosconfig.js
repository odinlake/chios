const Hjson = require('hjson');
const fs = require('fs');

global.cfg = null;


exports.config = function () {
    if (!global.cfg) {
        global.cfg = Hjson.parse(fs.readFileSync('../../credentials.hjson', "utf8"));
    }
    return global.cfg;
};










