'use strict';

var models = require('../models/sequelize');

module.exports = function(app) {

    app.route('/api/v1/sequelize/users')
        .get(function(req, res) {
            models.user.findAll().then(function(users) {
                res.send(users);
            });
        })
        .post(function(req, res) {
            models.user.create(req.body).then(function(user) {
                res.send({
                    success: true,
                    message: 'User created!',
                    userId: user.id
                });
            });
        })
        .put(function(req, res) {
            models.user.upsert(req.body).then(function(user) {
                res.send({
                    success: true,
                    message: 'User created!',
                    userId: user.id
                });
            });
        });

    app.get('/api/v1/sequelize/users/:userId', function(req, res) {
        models.user.findById(req.params.userId).then(function(user) {
            res.send(user);
        });
    });

};