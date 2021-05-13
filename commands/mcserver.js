const McServerUtil = require('minecraft-server-util');
const Parser = require('rss-parser');
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
                this.restart(message, args);
                break;
            case 'players':
                this.players(message, Discord);
                break;
            case 'debug-rss':
                sendStatusUpdateMessage(message, Discord);
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
            if (!response) message.reply('Server is offline!');


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
    async restart(message, args) {
        console.log(`Fetching Status of ${address}`);
        let response = await McServerUtil.status(address, {port: 25573, timeout: 30000})
        let restartingMessage;
        let commandPayload;

        
        if (response.onlinePlayers > 0)  {
            if (args[1] === '--override' && message.member.roles.cache.has('738215800778784859')) {
                commandPayload = '/stop';
                restartingMessage = await message.reply('Restarting server, this will take a moment...'); 
    
                sendRconCommand(commandPayload, restartingMessage);
            }
            else if (args[1] && args[1] !== '--override') message.reply('Invalid flag, proceeding as normal...').delete({timeout: 5000})
            
            console.log(`Request to restart server by '${message.author.username}' was aborted, server is not empty.`)

            commandPayload = `/say Discord User <${message.author.username}> requested to restart server, but server is not empty.  Aborting...`;
            restartingMessage = await message.reply('Server is not empty, aborting');

            sendRconCommand(commandPayload, restartingMessage);
        }
        else {
            commandPayload = '/stop';
            restartingMessage = await message.reply('Restarting server, this will take a moment...');

            sendRconCommand(commandPayload, restartingMessage);
        }
    },
    async players(message, Discord) {
        let embed = new Discord.MessageEmbed();

        McServerUtil.status(address, {port: 25573, timeout: 30000})
        .then(response => {
            let onlinePlayerList = [];

            if (response.samplePlayers === null) {
                onlinePlayerList = ['None']
            } else {
                response.samplePlayers.forEach(element => {
                    onlinePlayerList.push(element.name)
                })
            }

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

function sendRconCommand (commandPayload, restartingMessage) {
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
}


async function sendStatusUpdateMessage(message, Discord) {
    let statusMessage = await fetchStatusUpdate();
    if (statusMessage === 'No new status updates are available') return message.reply(statusMessage);

    // Send Embed Containing Status title and Snippets
}

async function fetchStatusUpdate() {
    const parser = new Parser();

    let currentFeed = await parser.parseURL('https://status.shockbyte.com/history.rss');

    var currentStatus = () => {
        for (element of currentFeed.items) {
            if (element.title.includes('NA')) {
                return element;
            }
        }
        return element;
    }

    const previousStatus = JSON.parse(localStorage.getItem('previousStatus'));

    if (currentStatus !== previousStatus) {
        // localStorage exists only in browser, so I'll have to store this in a previousStatus.json file
        localStorage.setItem('previousStatus', JSON.stringify(currentStatus));

        console.log(`Found new status update from Shockbyte: ${currentStatus.title}`)
        return currentStatus;
    } else {
        console.log('No new status updates are available');
    }
}