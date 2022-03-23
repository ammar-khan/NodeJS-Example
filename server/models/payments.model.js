const path = require('path');
const { readFile } = require('../../modules/read_json_file');
const config = require('../../config')

module.exports = {
    model: () => {
        return new Promise(function(resolve, reject) {
            const file = path.join(config.root, 'data', 'payments.json');

            readFile(file)
                .then(data =>  {
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                });
        })
    }
}
