'use strict';

var _ = require('lodash');
var data = require('../util/jsonData');

module.exports = function(app) {

    app.get('/api/v1/lodash/chunk', function(req, res) {
        res.send(_.chunk(data.users(), 10));
    });

    app.get('/api/v1/lodash/compact', function(req, res) {
        res.send(_.compact(['', 10, 20, false, undefined, 'Siva']));
    });

    app.get('/api/v1/loadash/concat', function(req, res) {
        var array = [1];
        res.send(_.concat(array, 2, [3], [[4]]));
    });

    app.get('/api/v1/lodash/difference', function(req, res) {
        res.send(_.difference([5, 13, 25], [2, 5]));
    });

    app.get('/api/v1/lodash/differenceBy', function(req, res) {
        res.send(_.differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor));
    });

    app.get('/api/v1/lodash/differenceWith', function(req, res) {
        var users = data.limitedUsers();
        var user = [{name : 'Joe', age : 28}, {name : 'Peter', age : 18}];
        return res.send(_.differenceWith(users, user, _.isEqual));
    });

    app.get('/api/v1/lodash/drop', function(req, res) {
        var users = data.limitedUsers();
        return res.send(_.drop(users));
    });

    app.get('/api/v1/lodash/dropWithCount', function(req, res) {
        var users = data.limitedUsers();
        return res.send(_.drop(users, 2));
    });

    app.get('/api/v1/lodash/dropRight', function(req, res) {
        var users = data.limitedUsers();
        return res.send(_.dropRight(users));
    });

    app.get('/api/v1/lodash/dropRightWithCount', function(req, res) {
        var users = data.limitedUsers();
        return res.send(_.dropRight(users, 2));
    });

    app.get('/api/v1/lodash/dropRightWhile', function(req, res) {
        var users = data.limitedUsers();
        return res.send(_.dropRightWhile(users, function(u) { return u.age > 20; }));
    });

    app.get('/api/v1/lodash/dropWhile', function(req, res) {
        // elements are dropped until predicate return false;
        var users = data.limitedUsers();
        return res.json(_.dropWhile(users, function(u) { return u.age > 20; }));
    });

    app.get('/api/v1/lodash/findIndex', function(req, res) {
        // elements are dropped until predicate return false;
        var users = data.limitedUsers();
        return res.json(_.findIndex(users, function(u) { return u.age > 18; }));
    });

    app.get('/api/v1/lodash/findLastIndex', function(req, res) {
        var users = data.limitedUsers();
        return res.json(_.findLastIndex(users, function(u) { return u.age > 18; }));
    });

    app.get('/api/v1/lodash/head', function(req, res) {
        var users = data.limitedUsers();
        return res.json(_.head(users));
    });

    app.get('/api/v1/lodash/indexOf', function(req, res) {
        return res.json(_.indexOf(users, 1));
    });

    app.get('/api/v1/lodash/flatten', function(req, res) {
        return res.json(_.flatten([1, 2, [3], [[4]]]));
    });

    app.get('/api/v1/lodash/flattenDeep', function(req, res) {
        return res.json(_.flattenDeep([1, 2, [3], [[4]]]));
    });

    app.get('/api/v1/lodash/flattenDepth', function(req, res) {
        return res.json(_.flattenDepth([1, 2, [3], [[4]]], 2));
    });

    app.get('/api/v1/lodash/fromPairs', function(req, res) {
        return res.json(_.fromPairs([['a', 1], ['b', 2]]));
    })

    app.get('/api/v1/lodash/toPairs', function(req, res) {
        return res.json(_.toPairs({"a":1,"b":2}));
    })

    app.get('/api/v1/loadash/times', function(req, res) {
        _.times(5, function() {
            console.log('Hello');
        })
        res.send(_.differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor));
    });

    app.get('/api/v1/lodash/test', function(req, res) {
        //return _.map(data.user)
        //var users = [{name: 'Siva'}, {name: 'Siva'}, {name: 'Siva'}, {name: 'Siva'}]
        //return res.send(_.chain(data.users()).sortBy('age').value());
        //return res.send(_(data.users()).filter({age : 45}).value());
        //return res.send(_.max(data.users(), 'age'))
        //return res.send(_.min(data.users(), 'age'))
        return res.send(_.pluck(data.users(), 'age'))
        //return res.send(_(data.users()).filter({age : 45}).sortBy('first_name').value());
    });
};

/*
- Flatter for Object, Array Of Object
- Index Of
*/