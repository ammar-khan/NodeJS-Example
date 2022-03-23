// Imports
const path = require('path');

// Set application configuration
module.exports = { 
    root: path.resolve(__dirname),
    server: {
        web: {
            port: 8080
        },
        api: {
            port: 5000
        }
    }
}
