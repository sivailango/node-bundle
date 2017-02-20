var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var async = require('async');
var config = require('config');

var server = require('http').Server(app);
var io = require('socket.io')(server);

var models = require('./server/models/sequelize');

var _ = require('lodash');

app.use(bodyParser.json());

/*
var options = {
	debug: true
};

var seqAudit = require('sequelize-audit')(options);

seqAudit.authenticate();
*/

require('./server/routes/index')(app);

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
	next();
});

app.get('/api/v1/users', function(req, res) {
	res.json({
		message: 'Hello'
	})
});

/*
app
	.use(express.static(__dirname + '/client'))
	.get('/', function(req, res) {
		res.sendfile(__dirname + '/client/index.html');
	});

// Error handler
app.use(function(req, res, next) {
	res.status(404).send('Sorry cant find that!');
});
*/

/*
var users = [];

io.on('connection', function(socket) {

	console.log('a user connected - ' + socket.id);

	users.push(socket.id);

	socket.on('users', function() {
		io.emit('users', users);
	});

	socket.on('chat message', function(msg) {
		io.emit('chat message', msg);
	});

	socket.on('disconnect', function() {
		_.remove(users, function(n) {
			return n === socket.id;
		});

		io.emit('users', users);

	});

});
*/

models.sequelize
    .authenticate()
    .then(function(err) {
        console.log('DB Connection connected');
    })
    .catch(function(err) {
        if(err) {
            console.log(err.message);
        }
    });

models.sequelize.sync().then(function() {
    server.listen(3000, function() {
		console.log('App listening on port : ' + 3000);
    });
});



