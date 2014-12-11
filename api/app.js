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


app.use(logger('dev'));
app.use(require('express-promise')());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));




/**
 * Mount the routes
 */
app.use('/', awdg('api/routes/home'));
app.use('/', awdg('api/routes/events'));
app.use('/', awdg('api/routes/users'));
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