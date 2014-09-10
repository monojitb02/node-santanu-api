/*
 * user Schema
 */

"use strict";

/*
 * Module dependencies
 */

var lib = require('../../lib');

var user = new lib.mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    versionKey: false
});


/*
 * exports the user schema
 */
module.exports = lib.mongoose.model("user", user);
