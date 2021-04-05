module.exports = {
    name: 'sudo',
    description: "Writes specified message under bot name.",
    execute(message, args){
        if (!message.member.roles.cache.has('738215800778784859')) return message.reply('You have insufficient permissions to perform this command!');

        if (!args.length) return message.channel.send('This command requires arguments!');

        else {
            message.delete();
            message.channel.send(args.join(' '));
        }
    }
}