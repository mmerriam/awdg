'use strict';

/**
 * AWDG
 *
 * @copyright Atlanta Web Design Group 2014
 *
 * Event Routes
 */

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Event = mongoose.model('Event');
var Member = mongoose.model('Member');
var Venue = mongoose.model('Venue');
var Attending = mongoose.model('Attending');
var form = require('express-form');
var field = form.field;

router.param('id', function(req, res, next, id) {
    req.id = id;
    next();
});


router.get('/events', function(req, res, next) {
    res.render('events/index', {
        module: 'events',
        venues: Venue.find(),
        events: Event.find()
    });
});

router.post('/events', form(
    field("name").trim().required().is(/^[\w]+$/),
    field("start-date").trim(),
    field("start-time").trim(),
    field("end-date").trim(),
    field("end-time").trim(),
    field("venue").trim(),
    field("description")
), function(req, res, next) {

    var params = {
        name: req.form.name,
        date: {
            start: new Date(req.form['start-date'] + ' ' + req.form['start-time']),
            end: new Date(req.form['end-date'] + ' ' + req.form['end-time'])
        },
        _venue: req.form.venue,
        description: req.form.description
    }

    var event = new Event(params);
    event.save(function(err) {
        // if (err) return handleError(err);
        res.redirect('/events');
    });


})
router.get('/events/:id', function(req, res, next) {
    console.log(req.id);
    res.render('events/detail', {
        module: 'events',
        event:Event.findOne({
            '_id': req.id
        })
    });
});

module.exports = router;