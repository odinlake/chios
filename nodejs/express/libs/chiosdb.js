const mysql = require('mysql');
const config = require('./chiosconfig').config();
const fs = require('fs');
const assert = require('assert').strict;

global.pool = null;


exports.connection = function () {
    if (!global.pool) {
        const dbconfig = config["chiosdb"];
        global.pool = mysql.createPool({
            connectionLimit: 10,
            host: dbconfig["host"],
            user: dbconfig["user"],
            password: dbconfig["password"],
            database: dbconfig["db"],
            multipleStatements: true,
        });
    }
    return global.pool;
};


exports.execFile = function(path) {
    c = exports.connection();
    return c.query(fs.readFileSync(path, "utf8"));
};


exports.doDevSetup = function() {
    exports.assertDev();
    exports.execFile('../../sql/setup.sql');
    exports.execFile('../../sql/testdata.sql');
};


exports.assertDev = function() {
    assert.notEqual(config.deployment, "prod", 
        "function not permitted in production");
};


exports.doCleanup = function() {
    exports.assertDev();
    return exports.execFile('../../sql/cleanup.sql');
};


exports.getPeople = function(cb) {
    exports.connection().query(
        "SELECT username, realname, adminrole, password FROM people", cb);
};


exports.getRecognitions = function(cb) {
    exports.connection().query(
        "SELECT username, realname, adminrole, password FROM people; " +
        "SELECT username, recognition, `date`, by_user, using_password " +
        "FROM recognitions ORDER BY `date` DESC;", cb);
};


exports.getProfile = function(username, cb) {
    username_safe = username.replace(/\W/g, '').toLowerCase();
    exports.connection().query(
        "SELECT username, realname, adminrole, password FROM people " +
        "WHERE username='" + username_safe + "'; " +
        "SELECT recognition, date, by_user FROM recognitions " +
        "WHERE username='" + username_safe + "'; "
    , cb);
};


exports.addRecognition = function(username, recognition, by_user, 
        using_password, cb) {
    var now = new Date();
    exports.connection().query(
        "REPLACE INTO recognitions " +
        "(`username`, `recognition`, `date`, `by_user`, `using_password`) " +
        "VALUES (?)", 
        [[username, recognition, now, by_user, using_password]], cb
    );
};
