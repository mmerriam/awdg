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
var mongoStore = require('connect-mongo')({
    session: session
});

var app = express();


/**
 * Set the logger
 */
app.use(logger('dev'));


/**
 * Use Express Promises
 */
app.use(require('express-promise')());


/**
 * Sessions
 */
_.assign(config.session, {
    store: new mongoStore({
        mongoose_connection: core.database.connection,
        collection: 'sessions'
    })
});
app.use(session(config.session));

/**
 * Passport
 */
awdg('client/routes/middleware/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(flash());



app.use(express.static(path.join(config.root, '/public')));

/**
 * Use the routes
 */
app.use('/', awdg('client/routes/home'));
app.use('/', awdg('client/routes/events'));
app.use('/', awdg('client/routes/users'));
app.use('/', awdg('client/routes/venues'));

/**
 * 404 Errors
 * Catch 404 errors and forward them to the error handler
 */
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});



/**
 * Setup rendering engine
 */
app.set('views', path.join(config.root, '/client/templates/views'));
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

swig.setDefaults({
    cache: false,
    loader: swig.loaders.fs(path.join(config.root, '/client/templates'))
});


/**
 * Disable view caching in dev mode
 */
if (config.env == 'development') {
    app.set('view cache', false);
}

/**
 * Error Handler
 * This will print the stacktrace on development only
 */
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    var error = (config.env == 'development') ? err : {};
    console.log(error);
    console.log(err);
    res.render('common/error', error);
});
// global.awdg = function(name) {
//     return require(path.join(__dirname, '/', name));
// }





module.exports = app;