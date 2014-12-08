'use strict';

/**
 * AWDG
 *
 * @copyright Atlanta Web Design Group 2014
 *
 * Member Routes
 */

var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var Event = mongoose.model('Event');
var Member = mongoose.model('Member');
var auth = awdg('client/routes/middleware/auth');


router.get('/account/profile', auth.requiresLogin, function(req, res, next) {
    res.render('members/account-profile',{
        module:'members',
        member:req.user
    });
});
router.get('/account/settings', auth.requiresLogin, function(req, res, next) {
    res.render('members/account-settings',{
        module:'members',
        member:req.user
    });
});
router.get('/account/subscription', auth.requiresLogin, function(req, res, next) {
    res.render('members/account-subscription',{
        module:'members',
        member:req.user
    });
});


router.get('/login', function(req, res, next) {
    res.render('members/login');
});

router.get('/join', function(req, res, next) {
    res.render('members/join');
});

router.post('/join', passport.authenticate('join', {
    successRedirect: '/account/profile',
    failureRedirect: '/join',
    failureFlash: true
}));

module.exports = router;