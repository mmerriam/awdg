'use strict';

/**
 * AWDG
 *
 * @copyright Atlanta Web Design Group 2014
 *
 */

var express = require('express');
var logger = require('morgan');
var path = require('path');
var app = express();

/**
 * Global helper function that enables us to require
 * our own modules relative to root path.
 *
 */
global.awdg = function(name) {
    return require(path.join(__dirname ,'/',name));
}


/**
 * Set the logger
 */
app.use(logger('dev'));

/**
 * Use Express Promises
 */
app.use(require('express-promise')());

/**
 * Core
 *
 * Mount the core app
 */
awdg('core');


/**
 * Client
 *
 * Mount the client app
 */
awdg('client')(app);




module.exports = app;