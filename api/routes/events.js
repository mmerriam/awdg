'use strict';

/**
 * AWDG
 *
 * @copyright Atlanta Web Design Group 2014
 *
 * Event API Routes
 */

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Event = mongoose.model('Event');
var User = mongoose.model('User');
var Venue = mongoose.model('Venue');
var Attending = mongoose.model('Attending');



router.post('/events/rsvp', function(req, res, next) {
    console.log(req.body)
    res.send('recieved');
});



module.exports = router;