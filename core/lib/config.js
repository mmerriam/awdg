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
    name: pkg.name,
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 2934,
    root: path.normalize(path.join(__dirname, '../..')),
    session: {
        name: '_awdg',
        secret: 'i<3th3W3b',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60000
        }
    },
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
        hull: {
            appId: process.env.HULL_APP_ID || '',
            orgUrl: process.env.HULL_ORG_URL || '',
            appSecret: process.env.HULL_APP_SECRET || ''
        }

    }
}

module.exports = config;