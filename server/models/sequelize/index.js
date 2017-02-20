'use strict';

var fs = require('fs');
var path = require('path');
var config = require('config');
var Sequelize = require('sequelize');

var dbConfig = config.get('db');

var sequelize = new Sequelize(dbConfig.config.database, dbConfig.config.username,
                    dbConfig.config.password, dbConfig.options);

var db = {};

fs.readdirSync(__dirname)
	.filter(function(file) {
		return (file.indexOf('.') !== 0) && (file !== 'index.js');
	}).forEach(function(file) {
		var model = sequelize['import'](path.join(__dirname, file));
		db[model.name] = model;
	});

Object.keys(db).forEach(function(modelName) {
	if ('associate' in db[modelName]) {
		db[modelName].associate(db);
	}
});

var options = {
	debug: true
};

var seqAudit = require('sequelize-audit')(sequelize, options);

//seqAudit.authenticate();
seqAudit.defineModels();

db.sequelize = sequelize;
db.Sequelize = Sequelize;



module.exports = db;