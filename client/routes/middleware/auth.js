'use strict';
/**
 * AWDG
 *
 * @copyright Atlanta Web Design Group 2014
 *
 * Auth Middleware
 */


var _ = require('lodash');

/**
 * Requires Login
 * Use for routes that requires a loged in user
 */
exports.requiresLogin = function(req, res, next) {
    if (req.isAuthenticated())
        return next()
    if (req.method == 'GET') req.session.returnTo = req.originalUrl;
    res.redirect('/login');
}

/**
 * Get User Roles
 * Check and assign user roles
 */
exports.getUserRoles = function(req, res, next) {

    var _roles = {
        isMember: false,
        isAdmin: false,
        isSpeaker: false
    };

    if (req.user) {
        var _roles = {
            isMember: _.contains(req.user.type, 'member'),
            isAdmin: _.contains(req.user.type, 'admin'),
            isSpeaker: _.contains(req.user.type, 'speaker')
        };
    }

    req._roles = _roles;
    return next();
}