const fs = require('fs');

module.exports = {
    LogMessage(command, message, args) {
        const dateObj = new Date();
        const seconds = dateObj.getSeconds();
        if (args.length) {
            fs.appendFile('recentLog.txt', `[ ${seconds} ]s user: ${message.author} performed: '?${command} ${args[0]}' \r\n`, function (err) {
                if (err) return console.log(err);
            });
        }
        else {
            fs.appendFile('recentLog.txt', `[ ${seconds} ]s user: ${message.author} performed: '?${command} \r\n`, function (err) {
                if (err) return console.log(err);
            });
        }
    }
}