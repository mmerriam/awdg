'use strict';

/**
 * AWDG
 *
 * @copyright Atlanta Web Design Group 2014
 *
 * User Routes
 */

var express = require('express');
var core = require('awdg-core');
var passport = require('passport');
var form = require('express-form');
var auth = require('./middleware/auth');
var router = express.Router();
var User = core.database.models.User;
var Event = core.database.models.Event;
var field = form.field;


router.get('/account/profile', auth.checkLogin, function(req, res, next) {
    res.render('users/account-profile', {
        module: 'users',
        member: req.user
    });
});

router.get('/account/settings', auth.checkLogin, function(req, res, next) {
    res.render('users/account-settings', {
        module: 'users',
        member: req.user
    });
});

router.get('/account/subscription', auth.checkLogin, function(req, res, next) {
    res.render('users/account-subscription', {
        module: 'users',
        user: req.user
    });
});


router.get('/login', function(req, res, next) {
    res.render('users/login');
});

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/account/profile',
    failureRedirect: '/login',
    failureFlash: true
}));


router.get('/join', function(req, res, next) {
    res.render('users/join');
});

router.post('/join', passport.authenticate('local-join', {
    successRedirect: '/account/profile',
    failureRedirect: '/join',
    failureFlash: true
}));

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;