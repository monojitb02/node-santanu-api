'use strict';
var formidable = require('formidable'),
    http = require('http'),
    util = require('util'),
    fs = require('fs');

http.createServer(function(req, res) {
    if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
        // parse a file upload
        var form = new formidable.IncomingForm();

        form.parse(req, function(err, fields, files) {
            res.writeHead(200, {
                'content-type': 'text/plain'
            });
            fs.readFile(files.upload.path, function(err, data) {
                var newPath = "./uploads/" + files.upload.name;
                fs.writeFile(newPath, data, function(err) {
                    console.log("done", files.upload.name);
                    res.end("OK");
                });
            });
            console.log(fields, files);
        });
        form.on('progress', function(bytesReceived, bytesExpected) {
            console.log('completed:', (bytesReceived / bytesExpected) * 100);
        });
        return;
    }

    // show a file upload form
    res.writeHead(200, {
        'content-type': 'text/html'
    });
    res.end(
        '<form action="/upload" enctype="multipart/form-data" method="post">' +
        '<input type="file" name="upload" multiple="multiple"><br>' +
        '<input type="submit" value="Upload">' +
        '</form>'
    );
}).listen(8080);
