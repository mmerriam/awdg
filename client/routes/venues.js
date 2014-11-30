'use strict';

/**
 * AWDG
 *
 * @copyright Atlanta Web Design Group 2014
 *
 * Location Routes
 */

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Venue = mongoose.model('Venue');
var form = require('express-form');
var field = form.field;

router.param('id', function(req, res, next, id) {
    req.id = id;
    next();
});

router.get('/venues', function(req, res, next) {
    res.render('venues/index', {
        module: 'venue',
        venues: Venue.find()
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
        if (err) return handleError(err);
        res.redirect('/venues');
    });
});

router.get('/venues/:id', function(req, res, next) {
    res.render('venues/item', {
        module: 'venue',
        venue: Venue.findOne({
            '_id': req.id
        })
    });
});



module.exports = router;