const Discord = require('discord.js');
const fs = require('fs');
const config = require('./config.json');
const packageJSON = require('./package.json');

const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]});
client.commands = new Discord.Collection();

const prefix = config.prefix;
const version = packageJSON.version;
const logMessage = require('./logMessage');

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

const staffCommandFiles = fs.readdirSync('./commands/staff/').filter(file => file.endsWith('.js'));
for (const file of staffCommandFiles) {
    const staffCommand = require(`./commands/staff/${file}`) 

    client.commands.set(staffCommand.name, staffCommand)
}


client.once('ready', () => {
    console.log(initializeBot() + ` Running version ${version}  Awaiting action...`);
    fs.writeFile('recentLog.txt', 'Bot started and is running, awaiting action...' + '\r\n', function (err) {
        if (err) return console.error(err);
    });
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) && !message.author.bot) {
        const randomizedResponses = require('./randomizedResponses');
        randomizedResponses.sendRandomMessage(message);
    }

    if(!message.content.startsWith(prefix) || message.author.bot || !message.content) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    try {
        if (client.commands.get(command).permissions === "Staff" && message.member.roles.cache.has('738215800778784859')) {
            client.commands.get(command).execute(message, args, client, commandFiles, staffCommandFiles, Discord, config, version);
        }
        else if (client.commands.get(command).permissions === "User") {
            client.commands.get(command).execute(message, args, client, commandFiles, staffCommandFiles, Discord, config, version);
        }
        else return message.reply('You do not have sufficient permissions to perform this command!');

        logMessage.LogMessage(command, message, args);
    } catch(error) {
        console.error(error);
        message.reply(`Command Failed to Execute: ${error}`);
    }
});

client.on('error', () => {
    console.error(error);
    message.channel.send(`I have encountered an unhandeled exception: [${error}]   Please contact server moderators for assistance!`);
    return;
});

console.log('Logging into websocket');
client.login(config.token)
.then(() => console.log('Successfully logged in to Discord'))
.catch(error => console.error(`Login failed with ${error}`));

function initializeBot() {
    try {
        const reactionCustom = require('./reactionroles/reaction-custom');
        const reactionWelcome = require('./reactionroles/reaction-welcome');

        console.log('Initializing reaction messages');
        reactionWelcome.sendMessage(client, Discord);
        reactionCustom.sendMessage(client, Discord);

        console.log('Initializing client activity status');
        client.user.setActivity(`?help | v${version}`, {
            type: "LISTENING",
            url: "https://github.com/TheArcticHusky/EpicGamerBot-Discord.js"
        });
    } catch(error) {
        client.users.cache.get('219273969415487489').send(`Reaction Message Initialization has failed with error: ${error}`); 
        return console.error(`Initalization Failed: ${error}`);
    }
    return 'Client Initialization Complete.'
}
