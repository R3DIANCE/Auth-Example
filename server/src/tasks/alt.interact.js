const fs = require('fs');

async function getLogs() {
    return new Promise((resolve, reject) => {
        fs.readFile(process.env.ALTV_LOG, 'utf8', function (err, data) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
}

module.exports = {
    getLogs,
};
