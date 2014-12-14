'use strict';

/**
 * AWDG
 *
 * @copyright awdg.org 2014
 *
 * Venue
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var stampIt = require('mongoose-stamp');

var Venue = new Schema({
    name: String,
    url: String,
    phone: String,
    address: {
        type: String,
        required: true
    },
    info: String,
    social: {
        facebook: String,
        twitter: String,
        foursquare: String
    }
}, {
    collection: 'venues'
});

Venue.plugin(stampIt);
mongoose.model('Venue', Venue);