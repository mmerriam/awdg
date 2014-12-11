'use strict';

/**
 * AWDG
 *
 * @copyright Atlanta Web Design Group 2014
 *
 *
 * API
 *
 */

var express = require('express');
var fs = require('fs');
var logger = require('morgan');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var _ = require('lodash');
var config = awdg('core/lib/config');
var core = awdg('core');



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
 * Load Routes
 */
var home = awdg('api/routes/home');
// var events = awdg('api/routes/events');
var users = awdg('api/routes/users');
// var venues = awdg('api/routes/venues');



/**
 * Express Settings
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


app.use(express.static(path.join(config.root, '/public')));

/**
 * Use the routes
 */
app.use('/', home);
// app.use('/', events);
// app.use('/', users);
// app.use('/', venues);

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
 * Error Handler
 * This will print the stacktrace on development only
 */
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    var error = (config.env == 'development') ? err : {};
    res.send(error);
});

module.exports = app;