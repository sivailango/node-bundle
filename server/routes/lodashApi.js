'use strict';

var _ = require('lodash');
var data = require('../util/jsonData');

module.exports = function(app) {

    app.get('/api/v1/loadash/chunk', function(req, res) {
        res.send(_.chunk(data.users(), 10));
    });

    app.get('/api/v1/loadash/compact', function(req, res) {
        res.send(_.compact(['One', false, null, '', 10, undefined, true]));
    });

    app.get('/api/v1/loadash/concat', function(req, res) {
        var array = [1];
        res.send(_.concat(array, 2, [3], [[4]]));
    });

    app.get('/api/v1/loadash/difference', function(req, res) {
        res.send(_.difference([5, 13, 25], [2, 5]));
    });

};
