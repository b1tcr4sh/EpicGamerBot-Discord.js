module.exports = {
    name: 'sudo',
    description: "Writes specified message under bot name.",
    execute(message, args){
        if (!message.member.roles.cache.some(role => role.name === "Mod") || !message.member.roles.cache.some(role => role.name === 'Owner')) {
            return message.channel.reply('You have insufficient permissions to perform this command!');
        }

        if (!args.length) return message.channel.send('This command requires arguments!');

        else {
            message.delete();
            message.channel.send(args.join(' '));
        }
    }
}