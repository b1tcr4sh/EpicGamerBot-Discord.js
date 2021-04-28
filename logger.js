const fs = require('fs');
const logFile = require('./recentLog.log')
const dateObj = new Date();

module.exports = {
    initialize() {
        const seconds = dateObj.getSeconds();

        fs.writeFile(logFile, `Client Initialization Complete. Running version ${version}  Awaiting action...\r\n`, (err) => {
            if (err) return console.error(err);
        });
    },
    message(command, message, args) { 
        const seconds = dateObj.getSeconds();

        fs.appendFile(logFile, `[ ${seconds} ]s user: ${message.author} performed: '?${message}'\r\n`, (err) => {
            if (err) return console.log(err);
        });
    },
    error(client) {
        process.stderr.writeFile({file: './recentLog.log'})
    }
}