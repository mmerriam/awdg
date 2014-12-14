'use strict';

/**
 * AWDG
 *
 * @copyright Atlanta Web Design Group 2014
 *
 */



var config = require('./lib/config');
/**
 * Database
 * Load the mongoose instance
 */
var database = require('./lib/database')(config);

var core = {
    database: database,
    services: {
        mail: {},
        stripe: {},
        meetup: {}
    }
}
module.exports = core;