"use strict";
var Q = require('../../lib').q,
    user = require('./model');
module.exports.login = function(req, res) {
    var loginResult,
        loginValidator = {
            username: String,
            password: String
        },
        isAuthenticUser = function(dataObject) {
            var deferred = Q.defer();
            user.findOne({
                    username: dataObject.username,
                    password: dataObject.password
                },
                function(err, data) {
                    if (err) {
                        throw err;
                    } else if (data.length) {
                        deferred.resolve(data);
                    } else {
                        deferred.reject();
                    }
                }
            );
            return deferred.promise;
        };

    isAuthenticUser(req.body)
        .then(function(data) {
            loginResult = {
                status: true,
                user_id: data._id
            };
        }, function(err) {
            loginResult = {
                status: false
            };
        })
        .done(function() {
            res.send(loginResult);
        });
};
module.exports.signup = function(req, res) {
    var errorNotifier = function(err) {
        if (err.name === 'ValidationError') {
            return "validation error in '" +
                Object.keys(err.errors).join("','") + "'";
        } else if (err.name === 'MongoError' && err.code == 11000) {
            return "unique key constraint error";
        }
    }
    new user(req.body).save(function(err, savedData) {
        var response = {};
        if (err) {
            response.status = false;
            response.cause = errorNotifier(err);
        } else if (savedData) {
            response = {
                status: true,
                user_id: savedData._id
            };
        } else {
            response = {
                status: false,
                cause: "Unknown Error in saving"
            };
        }
        res.send(response);
    });
};
