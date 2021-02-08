module.exports = {
    name: 'info',
    description: 'An array of commands which provides info about me.',
    execute(message, args) {
        const info = {
            version: '0.8',
            status: {
                online: true,
                error: false,
            }
        }

        if (!args.length) return message.channel.send('This command requires arguments!');
        else if (args[0] === 'version') {
            message.channel.send(`The bot is currently on: ${info.version}`);
        }
        else if (args[0] === 'status') {
            if (info.status.error) {
                message.channel.send(`The bot is currently eountering an error: ${error}`)
            }
            else return message.channel.send('The bot is functioning properly!');
        }
        else return message.channel.send('Unrecognized arguments');
    }
}