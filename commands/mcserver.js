const mcserver = require('minecraft-server-util');
const address = '54.39.252.230';

module.exports = {
    name: 'mcserver',
    description: "An array of commands for interacting with the minecraft server.",
    permissions: 'User',
    disabled: false,
    execute(message, args, client, commandFiles, staffCommandFiles, Discord, config, version) {
        
        if (!args.length) return message.reply('This command requires arguments!');
        
        switch (args[0]) {
            case 'info':
                this.info(message, Discord);
                break;
            case 'ping':
                this.ping(message);
                break;
            default:
                message.reply(`${args[0]} is an unknown argument`)
        }
    },
    async info(message, Discord) {
        let embed = new Discord.MessageEmbed();
        let queryMessage = await message.reply(`Querying Minecraft server ${address}...`);

        mcserver.status(address)
        .then(response => {
            queryMessage.delete();
        
            embed.setTitle('Minecraft Server Information')
            .setColor('#42cef5')
            .setDescription(response.description.toString())
            .addFields([{
                name: 'Online Players:',
                value: `${response.onlinePlayers} / ${response.maxPlayers}`
            },
            {
                name: 'Version:',
                value: response.version
            },
            {
                name: 'Server Address:',
                value: `${response.host}:${response.port}`
            },
            {
                name: 'Round Trip Latency:',
                value: `${response.roundTripLatency} ms`
            }]);
            
            message.channel.send(embed);
        })
        .catch(error => {
            if (error === 'timeout') message.reply('The request timed out');
            console.error(error)
        });
    }
}