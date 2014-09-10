 'use strict';
 GLOBAL.lib = require('./lib');
 var router = require('./router'),
     server = lib.config.server,
     app = lib.express(),
     message = lib.message;
 router(app);
 lib.mongoose.connect(lib.config.db);
 app.listen(server.port);

 // Caught unhandled exceptions in different processes
 process.on('uncaughtException', function(err) {
     console.log(message.UNCAUGHT_EXCEPTION, err);
 });
