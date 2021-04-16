module.exports = {
    name: 'info',
    description: 'An array of commands which provides info about me.',
    permissions: 'Staff',
    disabled: false,
    execute(message, args, client, commandFiles, staffCommandFiles, Discord, config, version) {

        if (!message.member.roles.cache.has('738215800778784859')) return message.reply('You have insufficient permissions to perform this command!');

        
        if (!args.length) return message.reply('This command requires arguments!');
        else if (args[0] === 'version') {
            this.version(message, version);
        }
        else return message.channel.send('Unrecognized arguments');
    },
    version(message, version) {
        message.channel.send(`The bot is currently on: ${version}`);
    }
}