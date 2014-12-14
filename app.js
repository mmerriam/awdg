'use strict';

/**
 * AWDG
 *
 * @copyright Atlanta Web Design Group 2014
 *
 */

var express = require('express');
var path = require('path');
var fs = require('fs');
var logger = require('morgan');
var path = require('path');
var passport = require('passport');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var swig = require('swig');
var _ = require('lodash');
var errorhandler = require('errorhandler');
var core = require('awdg-core');

// Setup the app
var app = express();


// logger
app.use(logger('dev'));

/**
 * Session Storage Cookies
 */
var mongoStore = require('connect-mongo')({
    session: session
});

app.use(session({
    name: '_awdg',
    secret: 'i<3th3W3b',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 6000000,
    },
    store: new mongoStore({
        mongoose_connection: core.database.connection,
        collection: 'sessions'
    })
}));
app.use(cookieParser());


// Manage Users via passport
require('./lib/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// Handle output
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(flash());
app.use(require('express-promise')());

// set the site root
app.use(express.static('./public'));


// Mount the routes
app.use('/', require('./routes/home'));
app.use('/', require('./routes/events'));
app.use('/', require('./routes/users'));
app.use('/', require('./routes/venues'));

// Setup rendering engine
app.set('views', path.join(__dirname, '/templates/views'));
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

swig.setDefaults({
    cache: false,
    loader: swig.loaders.fs(path.join(__dirname, '/templates'))
});


// Disable view caching in dev mode
if (process.env.NODE_ENV == 'development') {
    app.set('view cache', false);
}

// Error handling
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Dev Error Handler
// This will print the stacktrace on development only
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    var error = (process.env.NODE_ENV == 'development') ? err : {};
    console.log(error);
    console.log(err);
    res.render('common/error', error);
});

module.exports = app;