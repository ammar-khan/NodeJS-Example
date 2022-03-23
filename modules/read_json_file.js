const fs = require('fs');

module.exports = {
    readFile: (file) => {
        return new Promise(function(resolve, reject) {
            fs.readFile(file, 'utf8', function(err, data) {
        
                // Check for errors
                if (err) {
                    reject(err);
                }
    
                // Return JSON data
                resolve(data);
            })
    
        });
    }
}
