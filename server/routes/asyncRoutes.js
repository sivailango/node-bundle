'use strict';

var async = require('async');

module.exports = function(app) {

    app.get('/api/v1/async', function(req, res) {
        res.send('Hello');
    });

}