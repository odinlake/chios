const mysql = require('mysql');
const config = require('./chiosconfig').config();
const fs = require('fs');
const assert = require('assert').strict;

global.conn;


exports.connection = function () {
    if (!global.conn) {
        const dbconfig = config["chiosdb"];
        global.conn = mysql.createConnection({
            host: dbconfig["host"],
            user: dbconfig["user"],
            password: dbconfig["password"],
            database: dbconfig["db"],
        });
        global.conn.connect((err) => {
            if (err) throw err;
            console.log('DB Connected!');
        });
    }
    return global.conn;
};


exports.execFile = function(path) {
    c = exports.connection();
    c.query(fs.readFileSync(path, "utf8"));
};


exports.doDevSetup = function() {
    assert.notEqual(config.deployment, "prod", "function not permitted in production");
    exports.execFile('../../sql/setup.sql');
    exports.execFile('../../sql/testdata.sql');
};


exports.getPeople = function(cb) {
    exports.connection().query("SELECT username, realname, adminrole, password FROM people", cb);
};

