'use strict';

var users = [
    { name: 'Vue', age: 28 },
    { name: 'Siva', age: 28 },
    { name: 'Ilango', age: 28 },
    { name: 'React', age: 28 }

];

module.exports = function(app) {

    app.route('/api/v1/users')
        .get(function(req, res) {
            console.log('adasd');
            res.json(users); 
        })
        .post(function(req, res) {

        })
        .put(function(req, res) {

        });

}