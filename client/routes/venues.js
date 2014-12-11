'use strict';

/**
 * AWDG
 *
 * @copyright Atlanta Web Design Group 2014
 *
 * Venue Routes
 */

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Venue = mongoose.model('Venue');
var form = require('express-form');
var field = form.field;
var auth = awdg('client/routes/middleware/auth');

router.param('id', function(req, res, next, id) {
    req.id = id;
    next();
});

router.get('/venues', auth.getUserRoles, function(req, res, next) {
    res.render('venues/venue-list', {
        module: 'venue',
        venues: Venue.find(),
        roles:req._roles
    });
});


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

router.get('/venues/:id',auth.getUserRoles, function(req, res, next) {
    res.render('venues/venue-detail', {
        module: 'venue',
        venue: Venue.findOne({
            '_id': req.id
        }),
        roles:req._roles
    });
});



module.exports = router;