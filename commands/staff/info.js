module.exports = {
    name: 'info',
    description: 'An array of commands which provides info about me.',
    execute(message, args, client, commandFiles, staffCommandFiles, Discord, config) {

        if (!args.length) return message.reply('This command requires arguments!');
        else if (args[0] === 'version') {
            message.channel.send(`The bot is currently on: ${config.version}`);
        }
        else return message.channel.send('Unrecognized arguments');
    }
}