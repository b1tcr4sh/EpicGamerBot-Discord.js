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
    async restart(message) {
        console.log(`Fetching Status of ${address}`);
        let response = await McServerUtil.status(address, {port: 25573, timeout: 30000})
        let restartingMessage;
        let commandPayload;

        if (response.onlinePlayers > 0)  {
            console.log(response.onlinePlayers)

            console.log(`Request to restart server by '${message.author.username}' was aborted, server is not empty.`)

            commandPayload = `/say Discord User <${message.author.username}> requested to restart server, but server is not empty.  Aborting...`;
            restartingMessage = await message.reply('Server is not empty, aborting');
        }
        else {
            commandPayload = '/stop';
            restartingMessage = await message.reply('Restarting server, this will take a moment...');
        }

        console.log(`Initializing new RCON client with server ${address} on port 5778`);
        const rconClient = new McServerUtil.RCON(address, {port: 5778, password: 'uwumoment'});

        rconClient.connect()
        .then(async () => {
            console.log(`Sending ${commandPayload} to server ${address}`);
            await rconClient.run(commandPayload);

            
            restartingMessage.delete({timeout: 10000})

            await rconClient.close();
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