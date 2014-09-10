'use strict';
var modules = require('./modules'),
    bodyParser = require('./lib').bodyParser;

module.exports = function(app) {
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());
    app.get('/', function(req, res) {
        res.send("ok");
    });
    app.post('/user/login', modules.user.login);
    app.post('/user/signup', modules.user.signup);
    app.post('/project/getList', modules.project.getPagedDcuments);
    app.post('/project/details', modules.project.getDetails);
    app.post('/project/update', modules.project.update);
    app.post('/project/insert', modules.project.insert);
};

/*
http://192.168.2.16:8080/user/login
http://192.168.2.16:8080/user/signup
http://192.168.2.16:8080/project/getList
http://192.168.2.16:8080/project/details
http://192.168.2.16:8080/project/update
http://192.168.2.16:8080/project/insert*/
