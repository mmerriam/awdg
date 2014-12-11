'use strict';

/**
 * AWDG
 *
 * @copyright awdg.org 2014
 *
 * Roll
 * List collection keeps track of an events attendees.
 * A member is added once the RSVP
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var stampIt = require('mongoose-stamp');

var Attending = new Schema({
    event: {
        type: Schema.Types.ObjectId,
        required: true,
        ref:'Event'
    },
    member: {
        type: Schema.Types.ObjectId,
        required: true,
        ref:'Member'
    },
    guestCount:Number,
    updatedOn:Date
}, {
    collection: 'attending'
});

Attending.plugin(stampIt);
mongoose.model('Attending', Attending);