"use strict";
var Q = require('../../lib').q,
	mongoose = require('../../lib').mongoose,
    utils = require('../../lib').utils,
    project = require('./model');
module.exports.getAll = function(req, res) {
    project.find({}, function(err, data) {
        if (err) {
            res.send({
                status: false,
                cause: err
            })
        } else {
            res.send({
                status: true,
                data: data
            });
        }
    })
};
module.exports.getDetails = function(req, res) {

};

module.exports.update = function(req, res) {
    if (req.body._id) {
        project.find({
            _id: req.body._id
        }, function(err, data) {
            /*
        	console.log('data', data);
        	console.log('err', err);*/
            if (!data.length) {
                res.send({
                    status: false,
                    cause: "cann't update a non-existing document"
                });
            } else {
            	// console.log(mongoose);
                utils.CRUDE.update(req, res, project, mongoose);
            }
        });
    } else {
        res.send({
            status: false,
            cause: "'_id'is required"
        });
    }
};

module.exports.insert = function(req, res) {
    if (req.body._id) {
        res.send({
            status: false,
            cause: "'_id'is not allowed"
        });
    } else {
        utils.CRUDE.insert(req, res, project);
    }
};
