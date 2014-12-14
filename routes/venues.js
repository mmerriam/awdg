'use strict';

/**
 * AWDG
 *
 * @copyright Atlanta Web Design Group 2014
 *
 * Venue Routes
 */

var express = require('express');
var core = require('awdg-core');
var form = require('express-form');
var auth = require('./middleware/auth');
var router = express.Router();
var Venue = core.database.models.Venue;
var field = form.field;


router.param('id', function(req, res, next, id) {
    req.id = id;
    next();
});

/**
 * Get all Venues
 *
 */
router.get('/venues', auth.checkRoles, function(req, res, next) {
    res.render('venues/venue-list', {
        module: 'venue',
        venues: Venue.find(),
        roles: req._roles
    });
});

/**
 * Create a new Venue
 */
router.post('/venues', form(
    field("name").trim().required().is(/^[\w]+$/),
    field("url").trim().isUrl(),
    field("phone").trim(),
    field("address").trim().required(),
    field("info")
), function(req, res, next) {
    var venue = new Venue(req.form);
    venue.save(function(err) {
        // if (err) return handleError(err);
        res.redirect('/venues');
    });
});

/**
 * Get a Venue by Id
 *
 */
router.get('/venues/:id', auth.checkRoles, function(req, res, next) {
    res.render('venues/venue-detail', {
        module: 'venue',
        venue: Venue.findOne({
            '_id': req.id
        }),
        roles: req._roles
    });
});

/**
 * Update a Venue
 *
 */
router.post('/venues/:id', auth.checkLogin, form(
    field("name").trim().required().is(/^[\w]+$/),
    field("url").trim().isUrl(),
    field("phone").trim(),
    field("address").trim().required(),
    field("info")
), function(req, res, next) {

    // update the model and execute
    Venue.update({ _id: req.id }, { $set: req.form}).exec();

    // redirect back to venue
    res.redirect('/venues/'+req.id);
});


module.exports = router;