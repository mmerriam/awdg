'use strict';

/**
 * AWDG
 *
 * @copyright awdg.org 2014
 *
 * Event Model
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var stampIt = require('mongoose-stamp');

var Event = new Schema({
    name: {
        type: String,
        required: true,
    },
    slug: String,
    date: {
        start: {
            type: Date,
            required: true,
            default: Date.now
        },
        end: Date,
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    description: String,
    featured: Boolean,
    venue: {
        type:Schema.Types.ObjectId,
        ref:'Venue'
    },
    speakers: Schema.Types.Mixed,
    sponsors: Schema.Types.Mixed
}, {
    collection: 'events'
});

Event.plugin(stampIt);
mongoose.model('Event', Event);