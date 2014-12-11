'use strict';

/**
 * AWDG
 *
 * @copyright Atlanta Web Design Group 2014
 *
 */

var express = require('express');
var router = express.Router();

/**
 * api home
 *
 */
router.get('/', function(req, res, next) {
    res.send({
        module: 'home'
    });
})

module.exports = router;