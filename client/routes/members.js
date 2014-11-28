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
    res.render('members/account-profile', {
        module: 'members',
        member: req.user
    });
});
router.get('/account/settings', auth.requiresLogin, function(req, res, next) {
    res.render('members/account-settings', {
        module: 'members',
        member: req.user
    });
});
router.get('/account/subscription', auth.requiresLogin, function(req, res, next) {
    res.render('members/account-subscription', {
        module: 'members',
        member: req.user
    });
});


router.get('/login', function(req, res, next) {
    res.render('members/login');
});

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/account/profile',
    failureRedirect: '/login',
    failureFlash: true
}));

// app.post('/login', passport.authenticate('local-login', {
//     successRedirect : '/profile', // redirect to the secure profile section
//     failureRedirect : '/login', // redirect back to the signup page if there is an error
//     failureFlash : true // allow flash messages
// }));

router.get('/join', function(req, res, next) {
    res.render('members/join');
});



router.post('/join', passport.authenticate('join', {
    successRedirect: '/',
    failureRedirect: '/join',
    failureFlash: true
}));

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;