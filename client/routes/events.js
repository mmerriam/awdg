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
var User = mongoose.model('User');
var Venue = mongoose.model('Venue');
var Attending = mongoose.model('Attending');
var form = require('express-form');
var field = form.field;
var auth = awdg('client/routes/middleware/auth');

router.param('id', function(req, res, next, id) {
    req.id = id;
    next();
});


router.get('/events', auth.getUserRoles, function(req, res, next) {
    res.render('events/index', {
        module: 'events',
        venues: Venue.find(),
        events: Event.find(),
        roles: req._roles
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
    var start_date = new Date(req.form['start-date'] + ' ' + req.form['start-time']);
    var end_date = new Date(req.form['end-date'] + ' ' + req.form['end-time']);
    var params = {
            name: req.form.name,
            date: {
                start: start_date,
                end: end_date
            },
            _venue: req.form.venue,
            description: req.form.description
        }
        // console.log(params);


    var event = new Event(params);
    event.save(function(err) {
        res.redirect('/events');
    });


})
router.get('/events/:id', function(req, res, next) {
    res.render('events/detail', {
        module: 'events',
        event: Event.findOne({
            '_id': req.id
        }).populate('venue')
    });
});

module.exports = router;