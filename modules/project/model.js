/*
 * user Schema
 */

"use strict";

/*
 * Module dependencies
 */

var lib = require('../../lib');

var project = new lib.mongoose.Schema({
    projectName: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    technologies: [String],
    developersCount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: "pending"
    },
    clientName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contactNumber: {
        type: Number,
        required: true
    }
}, {
    versionKey: false
});


/*
 * exports the user schema
 */
module.exports = lib.mongoose.model("project", project);
