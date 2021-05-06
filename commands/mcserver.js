const McServerUtil = require('minecraft-server-util');
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
                this.info(message, args,Discord);
                break;
            case 'restart':
                this.restart(message);
                break;
            case 'players':
                this.players(message, Discord);
                break;
            default:
                message.reply(`${args[0]} is an unknown argument`)
        }
    },
    async info(message, args,  Discord) {
        if (args[1]) {
            address = args[1];
        }

        let embed = new Discord.MessageEmbed();
        let queryMessage = await message.reply(`Fetching Status of Minecraft server ${address}... (This May Take a Moment)`);

        console.log(`Fetching Status of ${address}`);
        McServerUtil.status(address, {port: 25573, timeout: 30000, enableSRV: true})
        .then(response => {
            console.log(response);

            embed.setTitle('Minecraft Server Information')
            .setColor('#42cef5')
            .setDescription(response.description.toRaw())
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
            }]);
            
            message.channel.send(embed);
        })
        .catch(error => {
            console.error(error)
            message.delete();
            message.reply('The Request Timed Out!')
            .then(message => {
                message.delete({ timeout: 10000 });
            })
        })
        .finally(() => {
            queryMessage.delete();
        })
    },
    restart(message) {
        console.log(`Initializing new RCON client with server ${address} on port 5778`);
        const rconClient = new McServerUtil.RCON(address, {port: 5778, password: 'uwumoment'});

        rconClient.connect()
        .then(async () => {
            await rconClient.run('/stop');

            let restartingMessage = await message.reply('Restarting server');
            await rconClient.close();

            message.reply('Minecraft Server is Now Online!')
            .then(() => restartingMessage.delete());
        })
        .catch(error => {
            console.error(error);
        })
     
        rconClient.on('output', message => {
            console.log(`RCON> ${message}`);
        })
    },
    async players(message, Discord) {
        let embed = new Discord.MessageEmbed();

        McServerUtil.status(address, {port: 25573, timeout: 30000})
        .then(response => {
            let onlinePlayerList = [];

            response.samplePlayers.forEach(element => {
                onlinePlayerList.push(element.name)
            })

            embed.setTitle('Minecraft Server Players')
            .setColor('#42cef5')
            .setDescription(`epicsmp.shockbyte.app`)
            .addField('Online Players:',`${response.onlinePlayers} / ${response.maxPlayers}`)
            .addFields({
                name: 'players:',
                value: `${onlinePlayerList.join(', ')}`
            })

            message.channel.send(embed);
        })
        .catch(error => {
            console.error(error)
            
        })
    }
}

const sendMessage = (message, conjoinedMessage) => {
    console.log('Initializing RCON client');
    const rconClient = new McServerUtil.RCON(address, {port: 25575, password: 'UwUmoment'});

    rconClient.on('output', response => {
        console.log(`RCON command response: ${response}`);
    });

    let responseMessage;

    rconClient.connect()
    .then(async () => {
        await rconClient.run(`tellraw @a {"text":"<${message.author} (Discord)> ${conjoinedMessage}","clickEvent":{"action":"open_url","value":" https://discord.com/channels/527590939280146443/${message.channel.id}/${message.id}"}}`)

        responseMessage = await message.reply('Message Sent Successfully!')
    })
    .catch(error => {
        console.error(error);
    })
    .finally(() => {
        responseMessage.delete();
    })
}