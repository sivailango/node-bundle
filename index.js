var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var config = require('config');

var server = require('http').Server(app);
var io = require('socket.io')(server);

var models = require('./models/sequelize/models');

app.use(bodyParser.json());

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
	next();
});

require('./routes/index')(app);

app.get('/', function(req, res) {
	res.json({
		message: 'Welcome to Node Bundle'
	})
});

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
    server.listen(3001, function() {
		console.log('App listening on port : ' + 3001);
    });
});



