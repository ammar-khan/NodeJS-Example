'use strict';

// Imports
const { controller: ordersController } = require('./controllers/orders.controller');
const { view: summaryView } = require('./views/summary.view');
const http = require('http'); 

module.exports = {
    server: http.createServer(function (req, res) { 

        // Check the URL of the current request
        if (req.url === '/') { 
            // Set response header
            res.writeHead(200, { 'Content-Type': 'text/html' }); 

            // Call controller and view for the page
            ordersController()
                .then(data =>  {
                    res.write(summaryView(data));
                    res.end();
                })
                .catch(err => {
                    throw err;
                });
        }
    
        // If no route present
        else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<html><body><p>Page not found.</p></body></html>');
        }
    })
}
