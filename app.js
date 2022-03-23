// Imports
const config = require('./config')
const { server: apiServer } = require('./server/main');
const { server: webServer } = require('./public/main');

// Starting API server
apiServer.listen(config.server.api.port, () => {
    console.log(`API server started on port: ${config.server.api.port}`);
});

// Starting web server
webServer.listen(config.server.web.port, () => {
    console.log(`Web server started on port: ${config.server.web.port}`);
});
