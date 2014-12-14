'use strict';

/**
 * AWDG
 *
 * @copyright awdg.org 2014
 *
 */

/**
 * Mongoose DB Configuration
 */
var mongoose = require('mongoose');

// load models
require('./models/event');
require('./models/user');
require('./models/attending');
require('./models/venue');


module.exports = function(config) {

    /**
     * Connnect to Mongo and return the connection
     */
    return  mongoose.connect(config.database.uri);
};