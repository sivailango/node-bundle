'use strict';

module.exports = function(sequelize, DataTypes) {

    var User = sequelize.define('user', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV1
        },
        firstName : {
            type : DataTypes.STRING
        },
        lastName : {
            type : DataTypes.STRING
        },
        email : {
            type : DataTypes.STRING,
            unique : true,
            validate : {
                isEmail: true
            }
        },
        isDeleted: {
            type : DataTypes.BOOLEAN,
            defaultValue : false
        },
        preferences : {
            type : DataTypes.JSON
        }
    }, {
        hooks: {
            beforeUpdate: function(user, options) {
                console.log(JSON.stringify(user))
                //console.dir(JSON.stringify(options))
            },
            afterUpdate: function(user, options) {
                console.log(JSON.stringify(user))
                //console.dir(JSON.stringify(options))
            }
        }
    },
    {
        classMethods: {

        }
    });

    //User.hasPaperTrail();

    return User;

};