var json = require('jsonfile');

var fs = require('fs');

var usersData = require('../data/users.json');

var data = {

    users: function() {
        return usersData;
    },

    limitedUsers: function() {
        return [
            {name : 'Joe', age : 28, email : null, address: {city : 'CN', zip: 90250}},
            {name : 'Foo', age : 32, email : 'foo@gmail.com', address: {city : 'CN', zip: 90250}},
            {name : 'Bar', age : 47, email : 'bar@gmail.com', address: {city : 'CN', zip: 90250}},
            {name : 'Roy', age : 19, email: '', address: {city : 'CN', zip: 90250}},
            {name : 'Peter', age : 18, email : 'peter@gmail.com', address: {city : 'CN', zip: 90250}},
            {name : 'Alex', age : 25, email: false, address: {city : 'CN', zip: 90250}},
        ]
    }

};

module.exports = data;