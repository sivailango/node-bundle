var express = require('express');
var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

var Sequelize = require('sequelize'); 

var _ = require('lodash');

/*
var options = {
	debug: true
};

var seqAudit = require('sequelize-audit')(options);
*/
 
//seqAudit.init();

app
	.use(express.static(__dirname + '/client'))
	.get('/', function(req, res) {
		res.sendfile(__dirname + '/client/index.html');
	});

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


