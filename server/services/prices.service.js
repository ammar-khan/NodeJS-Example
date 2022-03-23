const path = require('path');

const { model } = require('../models/prices.model');

module.exports = {
    get: () => {
        return new Promise(function(resolve, reject) {
            model()
                .then(data =>  {
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                });
        })
    }
}
