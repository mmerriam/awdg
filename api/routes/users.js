'use strict';

/**
 * AWDG
 *
 * @copyright Atlanta Web Design Group 2014
 *
 * User Routes
 */

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Event = mongoose.model('Event');
var User = mongoose.model('User');


/**
 * Update Account Profile Info
 *
 */
router.post('/account/profile', function(req, res, next) {
    console.log(req.body)
    res.send( {
        params: req.body
    });
});

// router.post('/account/settings', function(req, res, next) {
//     res.render('users/account-settings', {
//         module: 'users',
//         member: req.user
//     });
// });

// router.post('/account/subscription', function(req, res, next) {
//     res.render('users/account-subscription', {
//         module: 'users',
//         user: req.user
//     });
// });


module.exports = router;