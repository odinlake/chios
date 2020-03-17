var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');
var Hjson = require('hjson');
var fs = require('fs');

var obj = Hjson.parse(fs.readFileSync('../../credentials.hjson', "utf8"));
console.log("STARTING WITH CONFIG:", obj);

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    'secret': 'chiosdev-secret',
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstrap', express.static(path.join(__dirname, '/node_modules/bootstrap')));
app.use('/jquery', express.static(path.join(__dirname, '/node_modules/jquery')));
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/restart', require('./routes/restart'));
app.use('/login', require('./routes/login'));

app.use(function(req, res, next) { next(createError(404)); });
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
