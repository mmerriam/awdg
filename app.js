'use strict';

/**
 * AWDG
 *
 * @copyright Atlanta Web Design Group 2014
 *
 */

var express = require('express');
var path = require('path');

var app = express();
/**
 * Global helper function that enables us to require
 * our own modules relative to root path.
 *
 */
global.awdg = function(name) {
    return require(path.join(__dirname, '/', name));
}



/**
 * Core
 *
 * Mount the core app
 */
var core = awdg('core');

/**
 * API
 *
 * Mount the API
 */
var api = awdg('api/app');
app.use('/api', api);



/**
 * Client
 *
 * Mount the client app
 */

var client = awdg('client/app');
app.use('/', client);


module.exports = app;