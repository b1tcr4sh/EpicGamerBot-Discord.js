module.exports = {
    name: 'sudo',
    description: "Writes specified message under bot name.",
    execute(message, args){
        if (!args.length) return message.channel.send('This command requires arguments!');

        else {
            message.delete();
            message.channel.send(args.join(' '));
        }
    }
}