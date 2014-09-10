'use strict';
var modules = require('./modules'),
    bodyParser = require('./lib').bodyParser;

module.exports = function(app) {
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());
    app.get('/', function(req, res) {
        console.log('chk', lib);
        res.send("ok");
    });
    app.post('/user/login', modules.user.login);
    app.post('/user/signup', modules.user.signup);
    app.post('/project/all', modules.project.getAll);
    app.post('/project/details', modules.project.getDetails);
    app.post('/project/update', modules.project.update);
    app.post('/project/insert', modules.project.insert);
};
