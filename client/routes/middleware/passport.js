'use strict';

/**
 * AWDG
 *
 * @copyright awdg.org 2014
 *
 * Passport
 *
 */

var mongoose = require('mongoose');
var User = mongoose.model('User');
var LocalStrategy = require('passport-local').Strategy;
var form = require('express-form');
var field = form.field;


module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {

        User.findById(id, function(err, user) {
            done(err, user);
        });

    });

    // login
    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passReqToCallback: true
        },
        function(req, email, password, done) {
            User.findOne({
                    'email': email
                },
                function(err, user) {
                    if (err) return done(err);
                    if (!user) {
                        return done(null, false, req.flash('error', 'User not found'));
                    }

                    user.authenticate(password, function(err, isMatch) {
                        if (isMatch) {
                            return done(null, user, req.flash('success', 'Successfully logged in.'));
                        } else {
                            return done(null, false, req.flash('error', 'Invalid Password'));
                        }
                    });
                }
            );
        }));

    /**
     * Join with a email and password
     */
    passport.use('local-join', new LocalStrategy({
            usernameField: 'email',
            passReqToCallback: true
        },
        function(req, email, password, done) {
            var findOrCreateUser = function() {

                User.findOne({
                    email: req.body.email
                }, function(err, existingUser) {
                    if (existingUser) {
                        req.flash('form', {
                            email: req.body.email
                        });
                        return done(null, false, req.flash('error', 'A user account with that email address already exists.'));
                    }
                    // edit this portion to accept other properties when creating a user.
                    var user = new User({
                        email: req.body.email,
                        password: req.body.password,
                    });

                    user.save(function(err) {
                        if (err) return done(err, false, req.flash('error', 'Error saving member.'));
                        return done(null, user, req.flash('success', 'Thanks for signing up!!'));
                    });
                });
            };

            process.nextTick(findOrCreateUser);

        }));
};