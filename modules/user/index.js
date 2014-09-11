"use strict";
var Q = lib.q,
    md5 = lib.md5,
    message = lib.message,
    utils = require('../../utils'),
    user = require('./model'),
    project = require('../project');
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
                    password: md5(dataObject.password)
                },
                function(err, data) {
                    if (err) {
                        deferred.reject(err);
                    } else if (data) {
                        deferred.resolve(data);
                    } else {
                        deferred.reject(message.AUTHENTICATION_FAILED);
                    }
                }
            );
            return deferred.promise;
        },
        createPromise = function(data) {
            var deferred = Q.defer();
            deferred.resolve(data);
            return deferred.promise;
        };

    isAuthenticUser(req.body)
        .then(function(data) {
            var deferred = Q.defer();
            loginResult = {
                status: true,
                user_id: data._id
            };
            Q.all([project.getDcuments(5, 0), createPromise(loginResult)])
                .spread(function(projectData, loginData) {
                    loginData.projects = projectData;
                    deferred.resolve(loginData);
                });
            return deferred.promise;
        }, function(err) {
            var deferred = Q.defer();
            loginResult = {
                status: false,
                cause: err
            };
            deferred.resolve(loginResult);
            return deferred.promise;
        })
        .done(function(response) {
            res.send(response);
        });
};
module.exports.signup = function(req, res) {
    if (req.body.password) {
        req.body.password = md5(req.body.password);
    }
    utils.CRUD.insert(req.body, user)
        .done(function(data) {
            res.send(data)
        });
};
