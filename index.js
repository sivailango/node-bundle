var express = require('express');
var app = express();

var options = {
	debug: true
};

var seqAudit = require('sequelize-audit')(options);
 
//seqAudit.init();

app.get('/:userId', function(req, res) {
	console.log(req.params.userId);
	res.json('Hello World!');
});

app.listen(3000, function() {
	console.log('Example app listening on port 3000!')
});


