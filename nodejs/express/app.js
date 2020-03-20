const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const bodyParser = require('body-parser');
const config = require('./libs/chiosconfig').config();
const chiosdb = require('./libs/chiosdb');

require('log-timestamp')(function() { 
    return new Date().toISOString("en-US").replace(/[-Z]/gi, '').replace(/T/, ' ');
});
console.log("STARTING WITH CONFIG:", config);
if (config.deployment == "dev") {
    chiosdb.doDevSetup();
}
const app = express();

app.use((req, res, next) => {
  res.locals.deployment = config.deployment;
  next();
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'chiosdev-secret',
    cookie: {'maxAge': 9000000000000},
    resave: false,
    saveUninitialized: false,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/images/favicon-pkg-1')));
app.use('/bootstrap', express.static(path.join(__dirname, '/node_modules/bootstrap')));
app.use('/jquery', express.static(path.join(__dirname, '/node_modules/jquery')));
app.use('/', require('./routes/index'));
app.use('/people', require('./routes/people'));
app.use('/dev', require('./routes/dev'));
app.use('/login', require('./routes/login'));
app.use(function(req, res, next) { next(createError(404)); });
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
