"use strict";
var Q = lib.q,
    message = lib.message,
    mongoose = lib.mongoose,
    utils = require('../../utils'),
    project = require('./model'),
    getDcuments = function(documentsPerPage, pageNumber) {
        var deferred = Q.defer(),
            options = {
                projectName: true,
                duration: true,
                ClientName: true,
                status: true
            };
        project.find({}, options)
            .sort({
                _id: -1
            })
            .skip(pageNumber * documentsPerPage)
            .limit(documentsPerPage)
            .exec(function(err, data) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(data);
                }
            });
        return deferred.promise;
    };
module.exports.getDcuments = getDcuments;
module.exports.getPagedDcuments = function(req, res) {
    if (req.body.pageNumber && req.body.documentsPerPage) {
        getDcuments(req.body.pageNumber, req.body.documentsPerPage)
            .done(function(data) {
                res.send({
                    status: true,
                    projects: data
                });
            });
    } else {
        res.send({
            status: false,
            cause: message.PAGENO_AND_DOCPERPAGE_NOT_GIVEN
        });
    }
};

module.exports.getDetails = function(req, res) {
    if (req.body._id) {
        utils.CRUD.select(project, {
            _id: req.body._id
        })
            .done(function(data) {
                res.send(data);
            });
    } else {
        res.send({
            status: false,
            cause: message.ID_REQUIRED
        });

    }
};

module.exports.update = function(req, res) {
    if (req.body._id) {
        project.find({
            _id: req.body._id
        }, function(err, data) {
            if (!data) {
                res.send({
                    status: false,
                    cause: message.UPDATE_NON_EXISTING_DOCUMENT_FAILED
                });
            } else {

                utils.CRUD.update(req.body, project)
                    .done(function(data) {
                        res.send(data);
                    });
            }
        });
    } else {
        res.send({
            status: false,
            cause: message.ID_REQUIRED
        });
    }
};

module.exports.insert = function(req, res) {
    if (req.body._id) {
        res.send({
            status: false,
            cause: message.ID_NOT_ALLOWED
        });
    } else {
        utils.CRUD.insert(req.body, project)
            .done(function(data) {
                res.send(data);
            });
    }
};
