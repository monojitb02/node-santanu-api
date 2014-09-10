'use strict';
var errorNotifier = function(err) {
    if (err.name === 'ValidationError') {
        return "validation error in '" +
            Object.keys(err.errors).join("','") + "'";
    } else if (err.name === 'MongoError' && err.code == 11000) {
        return "unique key constraint error";
    }
};
module.exports.CRUDE = {
    insert: function(req, res, model) {
        new model(req.body).save(function(err, savedData) {
            var response = {};
            if (err) {
                response.status = false;
                response.cause = errorNotifier(err);
            } else if (savedData) {
                response = {
                    status: true,
                    _id: savedData._id
                };
            } else {
                response = {
                    status: false,
                    cause: "Unknown Error in saving"
                };
            }
            res.send(response);
        });
    },
    update: function(req, res, model, mongoose) {
        var updatedData = req.body,
            id = req.body._id;
        delete updatedData._id;
        // console.log(updatedData, model);
        model.findOneAndUpdate({
                _id: id
            }, updatedData,
            function(err, updated) {
                console.log(updated);
                var response = {
                    status: true
                };
                if (err) {
                    response.status = false;
                    response.cause = err;
                }
                res.send(response);
            });
        /* model.find({
            _id: id
        }, function(err, result) {
            if (!err) {
                console.log(result);
            }
        });*/
    }
};
