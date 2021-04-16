const fs = require("fs");

module.exports = {
    name: 'log',
    description: "An array of commands for admins to interact with bot logs.",
    permissions: "Staf",
    disabled: false,
    execute(message, args) {

        if (!message.member.roles.cache.has('738215800778784859')) return message.reply('You have insufficient permissions to perform this command!');

        if (args[0] === "view") {
            this.view(message);
        }
        else if (args[0] === "clear") {
            this.clear(message);
        }
        else return message.channel.send('This command requires arguments!');
    },
    view(message) {
        message.channel.send({ files: ['./recentLog.txt']});
        console.log('Synchronous File Upload Started; Uploading log file');
    },
    clear(message) {
        const dateObj = new Date();
        const seconds = dateObj.getSeconds();

        fs.writeFile('recentLog.txt', `[ ${seconds} ]s user: ${message.author} cleared the log \r\n`, (err) => {
            if (err) return console.log(err);
        });
        message.channel.send('Log Cleared!');
    }
}