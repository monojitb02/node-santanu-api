 'use strict';
 var lib = require('./lib'),
     router = require('./router'),
     server = lib.config.server,
     app = lib.express();
 router(app);
 lib.mongoose.connect(lib.config.db);
 app.listen(server.port, server.host);


 // Caught unhandled exceptions in different processes
 process.on('uncaughtException', function(err) {
     console.log('uncaught Exception', err);
 });
