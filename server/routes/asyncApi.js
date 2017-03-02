'use strict';

var async = require('async');

// http://www.sebastianseilund.com/nodejs-async-in-practice

module.exports = function(app) {

    function f1(arg1, cb) {
        console.log('From function 1 : ' + arg1);
        return cb();
    }

    function f2(arg1, cb) {
        console.log('From function 2 : ' + arg1);
        return cb();
    }

    function f3(arg1, arg2, cb) {
        console.log('From function 1 : ' + arg1 + arg2);
        return cb();
    }

    function f4(arg1, arg2, cb) {
        console.log('From function 2 : ' + arg1 + arg2);
        return cb();
    }

    app.get('/api/v1/async/applyEach', function(req, res) {
        // f1('argument1') and f2('argument1')
        async.applyEachSeries([f1, f2], 'argument 1', function finalCallback(err) {
            if(err) { res.send(err);}
            res.send('Completed!');
        });
        /*
        async.applyEachSeries([f1, f2], 'argument 1', 'argument 2',  function finalCallback(err) {
            if(err) { res.send(err);}
            res.send('Completed!');
        });
        */
    });

    app.get('/api/v1/async/applyEachSeries', function(req, res) {
        async.applyEachSeries([f1, f2], 'argument 1', function finalCallback(err) {
            if(err) { res.send(err);}
            console.log('Completed!');
            res.send('Hello');
        });
    });

    app.get('/api/v1/async/auto', function(req, res) {

        async.auto({
            initialTask: function(callback) {
                callback(null, 'Task1');
            },
            task1: function(callback) {
                callback(null, 'Task1')
            },
            task2: function(callback) {
                callback(null, 'Task1')
            },
            task3: function(callback) {
                callback(null, 'Task1')
            },
            finalTask: ['task1', 'task2', 'task3', function(results, callback) {
                //initialTask will call first and task1, task2, task3 are executed in parallel
                console.log(JSON.stringify(results));
            }]
        }, function(err, results) {

        });

        async.auto({
            get_data: function(callback) {
                console.log('in get_data');
                // async code to get some data
                callback(null, 'data', 'converted to array');
            },
            make_folder: function(callback) {
                console.log('in make_folder');
                // async code to create a directory to store a file in
                // this is run at the same time as getting the data
                callback(null, 'folder');
            },
            write_file: ['get_data', 'make_folder', function(results, callback) {
                console.log('in write_file', JSON.stringify(results));
                // once there is some data and the directory exists,
                // write the data to a file in the directory
                callback(null, 'filename');
            }],
            email_link: ['write_file', function(results, callback) {
                console.log('in email_link', JSON.stringify(results));
                // once the file is written let's email a link to it...
                // results.write_file contains the filename returned by write_file.
                callback(null, {'file':results.write_file, 'email':'user@example.com'});
            }]
        }, function(err, results) {
            console.log('err = ', err);
            console.log('results = ', results);
            res.send(results);
        });
    });

    app.get('/api/v1/async/autoInject', function(req, res) {

        async.autoInject({
            initialTask: function(callback) {
                callback(null, 'Task1');
            },
            task1: function(callback) {
                callback(null, 'Task1')
            },
            task2: function(callback) {
                callback(null, 'Task1')
            },
            task3: function(callback) {
                callback(null, 'Task1')
            },
            finalTask: function(task1, task2, task3, callback) {
                //initialTask will call first and task1, task2, task3 are executed in parallel
                callback(null, task1)
            }
        }, function(err, results) {

        });

        async.autoInject({
            get_data: function(callback) {
                console.log('in get_data');
                // async code to get some data
                callback(null, 'data', 'converted to array');
            },
            make_folder: function(callback) {
                console.log('in make_folder');
                // async code to create a directory to store a file in
                // this is run at the same time as getting the data
                callback(null, 'folder');
            },
            write_file: function(get_data, make_folder, callback) {
                // console.log('in write_file', JSON.stringify(results));
                // once there is some data and the directory exists,
                // write the data to a file in the directory
                callback(null, 'filename');
            },
            email_link: function(write_file, callback) {
                // once the file is written let's email a link to it...
                // results.write_file contains the filename returned by write_file.
                callback(null, {'file':write_file, 'email':'user@example.com'});
            }
        }, function(err, results) {
            console.log('err = ', err);
            console.log('results = ', results);
            res.send(results);
        });
    });

    app.get('/api/v1/async/cargo', function(req, res) {
        var cargo = async.cargo(function(tasks, callback) {
            // console.log(tasks.length); 2, 1
            for (var i = 0; i < tasks.length; i++) {
                console.log('hello ' + tasks[i].name);
            }
            callback();
        }, 2);

        // add some items
        cargo.push({name: 'foo'}, function(err) {
            console.log('finished processing foo');
        });
        cargo.push({name: 'bar'}, function(err) {
            console.log('finished processing bar');
        });
        cargo.push({name: 'baz'}, function(err) {
            console.log('finished processing baz');
        });

        res.send('Cargo Completed!');
    });

    app.get('/api/v1/async/compose', function(req, res) {
        function add1(n, callback) {
            //setTimeout(function () {
                callback(null, n + 1);
            //}, 10);
        }

        function mul3(n, callback) {
            //setTimeout(function () {
                callback(null, n * 3);
            //}, 10);
        }

        var add1mul3 = async.compose(mul3, add1);

        add1mul3(4, function (err, result) {
            console.log(result);
        });

        res.send('Completed');
    });

};