'use strict';

/**
 * AWDG
 *
 * @copyright Atlanta Web Design Group 2014
 *
 * Set Core Configurations
 *
 */

var path = require('path');
var fs = require('fs');
var dotenv = require('dotenv');

/**
 * Load environment variables
 */
dotenv.load();

/**
 * This is where we setup the app environment and default options
 * - ssl/ port numbers etc
 * - database and service credentials
 */

var pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

var config = {
    database: {
        uri: process.env.DATABASE_URI || 'mongodb://127.0.0.1/awdg',
        options: {
            replset: {
                rs_name: process.env.DATABASE_REPLICA_SET
            }
        }
    },
    services: {
        mandrill: {
            api_key: process.env.MANDRILL_API_KEY || '',
            sender: {
                name: process.env.MANDRILL_SENDER_NAME || '',
                email: process.env.MANDRILL_SENDER_EMAIL || '',
                reply_to: process.env.MANDRILL_REPLY_TO || ''
            },
            host: process.env.MANDRILL_HOST || ''
        },
        mailchimp: {
            apiKey: process.env.MAILCHIMP_API_KEY || '',
            listId: process.env.MAILCHIMP_LIST_ID || '',
            groupingsId: process.env.MAILCHIMP_GROUPINGS_ID || ''
        },
        stripe: {
            secretKey: process.env.STRIPE_SECRET_KEY || '',
            publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || ''
        },
        meetup: {
            apiKey: process.env.MEETUP_API_KEY || ''
        },

    }
}

module.exports = config;