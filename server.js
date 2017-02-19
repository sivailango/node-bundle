console.log('Hello');

var fs = require('fs');

fs.readFile('index.js', 'utf8', function(err, contents) {
    console.log(contents);
});