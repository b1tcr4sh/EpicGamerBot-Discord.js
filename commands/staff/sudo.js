const { DiscordAPIError } = require("discord.js");

module.exports = {
    name: 'sudo',
    description: "Writes specified message under bot name.",
    async execute(message, args, client, commandFiles, staffCommandFiles, Discord, config){

        if (!args.length) return message.channel.send('This command requires arguments!');
        else if (args[0] === 'embed') {
            const customEmbed = new Discord.MessageEmbed();
            
            // Gathering embed configuration
            let instructions = await message.channel.send("Please type the hex code of the desired embed color");
            const color = message;
                message.delete();

                instructions.edit('Please the type the content of the embed title (Leave blank if empty)');
                const title = message();
                message.delete();
        }
        else {
            message.delete();
            message.channel.send(args.join(' '));
        }
    }
}