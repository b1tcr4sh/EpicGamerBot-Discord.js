const fs = require("fs");

module.exports = {
    name: 'log',
    description: "An array of commands for admins to interact with bot logs.",
    execute(message, args) {
        const dateObj = new Date();
        const seconds = dateObj.getSeconds();

        if (!message.member.roles.cache.has('738215800778784859')) return message.channel.send('You have insufficient permissions to perform this command!');

        if (args[0] === "view") {
            message.channel.send({ files: ["./recentlog.txt"]});
        }
        else if (args[0] === "clear") {
            fs.writeFile('recentLog.txt', `[ ${seconds} ]s user: ${message.author} cleared the log \r\n`, function (err) {
                if (err) return console.log(err);
            });
            message.channel.send('Log Cleared!');
        }
        else return message.channel.send('This command requires arguments!');
    }
}