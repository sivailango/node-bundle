var json = require('jsonfile');

var fs = require('fs');

var usersData = require('../data/users.json');

var data = {

    users: function() {
        return usersData;
    }

};

module.exports = data;