const Discord = require('discord.js');
const fs = require('fs');
const config = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const prefix = config.prefix;
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
    console.log(`Epic Gamer Discord Bot (v ${config.version});  Awaiting action...`);
    fs.writeFile('recentLog.txt', 'Bot started and is running, awaiting action...' + '\r\n', function (err) {
        if (err) return console.log(err);
    });
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) && !message.author.bot) {
        const randomizedResponses = require('./randomizedResponses');
        randomizedResponses.harder(message);
    }

    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        client.commands.get('ping').execute(message, args);
    }
    else if (command === 'mcserver') {
        client.commands.get('mcserver').execute(message, args);
    }
    else if (command === 'sudo') {
        client.commands.get('sudo').execute(message, args);
    }
    else if (command === 'log') {
        client.commands.get('log').execute(message, args);
    }
    else if (command === 'info') {
        client.commands.get('info').execute(message, args);
    }
    else if (command === 'simp') {
        client.commands.get('simp').execute(message, args);
    }
    else if (command === 'help') {
        client.commands.get('help').execute(message, args, client, commandFiles); 
    }
    else {
        const dateObj = new Date();
        const seconds = dateObj.getSeconds();
        message.channel.send('Unrecognized Command!');
        fs.appendFile('recentLog.txt', `[ ${seconds} ]s user: ${message.author} performed: ?${command} (Invalid Command) \r\n`, function (err) {
            if (err) return console.log(err);
        });
        return;
    }
    logMessage.LogMessage(command, message, args);
});

client.on('error', () => {
    console.log(error);
    message.channel.send(`I have encountered an error: [${error}]   Please contact server moderators for assistance!`);
    return;
});

client.login(config.token);