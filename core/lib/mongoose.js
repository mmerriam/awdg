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
awdg('core/models/event');
awdg('core/models/user');
awdg('core/models/attending');
awdg('core/models/venue');


module.exports = function(config) {

    /**
     * Connnect to Mongo and return the connection
     */
    return  mongoose.connect(config.database.uri);
};