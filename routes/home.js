'use strict';

/**
 * AWDG
 *
 * @copyright Atlanta Web Design Group 2014
 *
 * Home Routes
 */

var express = require('express');
var core = require('awdg-core');
var router = express.Router();
var Event = core.database.models.Event;

router.get('/', function(req, res, next) {
    res.render('home/index', {
        module: 'home',
        events: Event.find().populate('venue'),
    });
})

module.exports = router;