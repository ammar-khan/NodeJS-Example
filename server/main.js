'use strict';

// Imports
const { get: getOrders } = require('./services/orders.service');
const { get: getPayments } = require('./services/payments.service');
const { get: getPrices } = require('./services/prices.service');

const http = require('http');

module.exports = {
    server: http.createServer(function (req, res) {

        // Get all orders
        if (req.url === '/api/orders' && req.method === 'GET') {
            // Response headers
            res.writeHead(200, { 'Content-Type': 'application/json' });
            
            // Get data and send response
            getOrders()
                .then(data =>  {
                    res.write(data);
                    res.end();
                })
                .catch(err => {
                    throw err;
                });
        }

        // Get all payments
        else if (req.url === '/api/payments' && req.method === 'GET') {
            // Response headers
            res.writeHead(200, { 'Content-Type': 'application/json' });
            
            // Get data and send response
            getPayments()
                .then(data =>  {
                    res.write(data);
                    res.end();
                })
                .catch(err => {
                    throw err;
                });
        }

        // Get all prices
        else if (req.url === '/api/prices' && req.method === 'GET') {
            // Response headers
            res.writeHead(200, { 'Content-Type': 'application/json' });
            
            // Get data and send response
            getPrices()
                .then(data =>  {
                    res.write(data);
                    res.end();
                })
                .catch(err => {
                    throw err;
                });
        }
        
        // Invalid request
        else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Invalid request!' }));
        }
    
    })
}
