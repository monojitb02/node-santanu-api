'use strict';

module.exports = {
    express: require('express'), //Acquiring express and exporting it as express
    mongoose: require('mongoose'), //Acquiring mongoose and exporting it as mongoose
    _: require('underscore'), //Acquiring underscore and exporting it as _
    q: require('q'),
    fs: require('fs'), //Acquiring fs and exporting it as fs
    path: require('path'), //Acquiring fs and exporting it as fs
    bodyParser: require('body-parser'),
    utils: require('./utils'),
    workflow: require('./config/workflow'), //Acquiring base and exporting it as base
    config: require('./config/config'), //Acquiring config and exporting it as config
    message: require('./lang/en') //Acquiring message and exporting it as message,
};
