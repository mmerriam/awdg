'use strict';

/**
 * AWDG
 *
 * @copyright awdg.org 2014
 *
 * User
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var stampIt = require('mongoose-stamp');
var bcrypt = require('bcrypt');


var User = new Schema({
    name: {
        first: {
            type: String,
        },
        last: {
            type: String,
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true,
    },
    profile: {
        avatar: String,
        zip: {
            home: String,
            work: String
        },
        social: {
            type: Schema.Types.Mixed,
            default: {}
        },
        bio: String,
        company: String,
        title: String,
        website: String,
        forHire: {
            type: Boolean,
            default: false
        },
        tags: Array
    },
    type: {
        type: Array,
        default: ['member']
    }
}, {
    collection: 'users'
});



/**
 * Presave Middleware
 *
 */
User.pre('save', function(next) {
    var member = this;
    if (!member.isModified('password')) return next();
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(member.password, salt, function(err, hash) {
            if (err) return next(err);
            member.password = hash;
            next();
        });
    });


});

/**
 * Authenticate
 *
 * Compare paswords
 * @param  {String}  password
 * @param  {Function} cb
 * @return {Boolean}
 */
User.methods.authenticate = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
}

/**
 * Virtuals
 */
User.virtual('name.full').get(function() {
    return this.name.first + ' ' + this.name.last;
});


User.virtual('url').get(function() {
    return '/' + this.id;
})

/**
 * Return a json object without passwords and such
 */
User.set('toJSON', {
    transform: function(doc, ret, options) {
        delete ret.password;
        return ret;
    }
});

User.plugin(stampIt);
mongoose.model('User', User);