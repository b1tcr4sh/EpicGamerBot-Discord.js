const { DiscordAPIError } = require("discord.js");

module.exports = {
    name: 'sudo',
    description: "Writes specified message under bot name.",
    async execute(message, args, client, commandFiles, staffCommandFiles, Discord, config){

        if (!args.length) return message.channel.send('This command requires arguments!');
        else if (args[0] === 'embed') {
            const customEmbed = new Discord.MessageEmbed();
            message.channel.send('Enter the embed title:');

            const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, {time: 10000}); 
            collector.on('collect', message => {
                input = message.content;
                global.input = input;
            });

            const title = global.input;
            console.log(title);

        }
        else {
            message.delete();
            message.channel.send(args.join(' '));
        }
    }
}
