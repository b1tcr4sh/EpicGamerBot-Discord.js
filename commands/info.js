const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'info',
    description: 'An array of commands which provides info about me.',
    permissions: 'User',
    disabled: false,
    execute(message, args, client, commandFiles, staffCommandFiles, Discord, config, version) {
        
        if (!args.length) return message.reply('This command requires arguments!');

        else if (args[0] === 'version') {
            this.version(message, version);
        }
        else if (args[0] === 'docs') {
            this.docs(message, Discord);
        }
        
    },
    version(message, version) {
        message.channel.send(`The bot is currently on: ${version}`);
    },
    docs(message, Discord) {
        let embed = new Discord.MessageEmbed();
        
        embed.setTitle('Github Repository')
        .setDescription('Link to the Github repository for the project, as well as the Documentation and Trello page')
        .setURL('https://github.com/TheArcticHusky/EpicGamerBot-Discord.js')
        .setColor('#42cef5');

        message.reply(embed)
        .catch(error => console.error(error));
    }
}