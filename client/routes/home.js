'use strict';

/**
 * AWDG
 *
 * @copyright Atlanta Web Design Group 2014
 *
 * Home Routes
 */

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Event = mongoose.model('Event');

router.get('/', function(req, res, next) {
    res.render('home/index', {
        module: 'home'
    });
})

module.exports = router;