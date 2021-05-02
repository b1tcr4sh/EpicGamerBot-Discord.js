const McServerUtil = require('minecraft-server-util');
const ping = require('ping');
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
            case 'restart':
                this.restart(message);
                break;
            default:
                message.reply(`${args[0]} is an unknown argument`)
        }
    },
    async info(message, Discord) {
        let embed = new Discord.MessageEmbed();
        let queryMessage = await message.reply(`Querying Minecraft server ${address}...`);

        McServerUtil.status(address)
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
    },
    restart(message) {
        console.log('Initializing RCON client');
        const rconClient = new McServerUtil.RCON(address, {port: 25575, password: 'UwUmoment'});

        rconClient.on('output', message => {
            console.log(`RCON command response: ${message}`);
        })

        rconClient.connect()
        .then(async () => {
            await rconClient.run('/stop');

            let restartingMessage = await message.reply('Restarting server and running recursive pings until response...');
            await rconClient.close();

            let isOnline = false; 
            while (!isOnline) {
                let response = await ping.promise.probe(address, {timeout: 10});

                if (response.length) isOnline = true; 
            }

            message.reply('Minecraft Server is Now Online!')
            .then(() => restartingMessage.delete());
        })
        .catch(error => {
            console.error(error);
        })
        
    }
}