var express = require('express');
var app = express();

var async = require('async');

var server = require('http').Server(app);
var io = require('socket.io')(server);

var Sequelize = require('sequelize');
var sequelize = new Sequelize('sequelize', 'postgres', '');

var _ = require('lodash');

var options = {
	debug: true
};

var seqAudit = require('sequelize-audit')(options);

seqAudit.authenticate();

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

server.listen(3000, function() {
	console.log('Example app listening on port 3000!')
});


