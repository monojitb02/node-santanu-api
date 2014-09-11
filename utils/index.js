'use strict';
var md5 = lib.md5,
    Q = lib.q,
    message = lib.message;
var errorNotifier = function(err) {
    if (err.name === 'ValidationError') {
        return message.VALIDATION_ERROR_IN + "'" +
            Object.keys(err.errors).join("','") + "'";
    } else if (err.name === 'MongoError' && err.code == 11000) {
        return message.UNIQUE_KEY_CONSTRAINT_ERROR;
    }
};
module.exports.CRUD = {
    insert: function(dataObject, model) {
        var deferred = Q.defer();
        new model(dataObject).save(function(err, savedData) {
            var response = {
                status: false
            };
            if (err) {
                response.cause = errorNotifier(err);
            } else if (savedData) {
                response = {
                    status: true,
                    _id: savedData._id
                };
            } else {
                response.cause = message.UNKNOWN_ERROR_IN_SAVING;
            }
            deferred.resolve(response);
        });
        return deferred.promise;
    },
    update: function(dataObject, model) {
        var id = dataObject._id,
            deferred = Q.defer();
        delete dataObject._id;
        model.update({
                _id: id
            }, dataObject,
            function(err, updated) {
                var response = {
                    status: true
                };
                if (err) {
                    response.status = false;
                    response.cause = err;
                }
                if (updated === 0) {
                    response.status = false;
                    response.cause = message.NOTHING_UPDATED;
                }
                deferred.resolve(response);
            }
        );
        return deferred.promise;
    },
    select: function(model, query, options) {
        var deferred = Q.defer();
        model.find(query, options, function(err, data) {
            if (err) {
                deferred.resolve({
                    status: false,
                    cause: err
                });
            } else {
                deferred.resolve({
                    status: true,
                    data: data
                });
            }
        });
        return deferred.promise;
    }
};
