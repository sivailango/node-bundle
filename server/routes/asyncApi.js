'use strict';

var async = require('async');

module.exports = function(app) {

    function f1(arg1, cb) {
        console.log('From function 1 : ' + arg1);
        return cb();
    }

    function f2(arg1, cb) {
        console.log('From function 2 : ' + arg1);
        return cb();
    }

    app.get('/api/v1/async/applyEach', function(req, res) {
        async.applyEachSeries([f1, f2], 'argument 1', function finalCallback(err) {
            if(err) {}
            console.log('Completed!');
            res.send('Hello');
        });
    });

    app.get('/api/v1/async/applyEachSeries', function(req, res) {
        async.applyEachSeries([f1, f2], 'argument 1', function finalCallback(err) {
            if(err) {}
            console.log('Completed!');
            res.send('Hello');
        });
    });

    app.get('/api/v1/async/auto', function(req, res) {
        async.applyEachSeries([f1, f2], 'argument 1', function finalCallback(err) {
            if(err) {}
            console.log('Completed!');
            res.send('Hello');
        });
    });

};