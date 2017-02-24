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
            models.user.upsert(req.body, {individualHooks: true}).then(function(user) {
                console.log(user)
                res.send({
                    success: true,
                    message: 'User created!'
                });
            });
        });

    app.get('/api/v1/sequelize/users/:userId', function(req, res) {
        models.user.findById(req.params.userId).then(function(user) {
            res.send(user);
        });
    });

    app.put('/api/v1/sequelize/updateUsers/:userId', function(req, res) {
        models.user.update({firstName : req.body.firstName}, {individualHooks: true, where: {id : req.params.userId}}).then(function(result) {
            res.send({
                success: true,
                message: 'User created!'
            });
        });
    });

};