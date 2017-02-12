var express = require('express');
var app = express();

app.get('/:userId', function(req, res) {
	console.log(req.params.userId);
	res.json('Hello World!');
});

app.listen(3000, function() {
	console.log('Example app listening on port 3000!')
});


