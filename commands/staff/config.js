module.exports = {
    name: 'config',
    description: 'Configures the bot functionality and appearance',
    permissions: 'Staff',
    disabled: false,
    execute(message, args, client, commandFiles, staffCommandFiles, Discord, config, version) {
        switch (args[0]) {
            case 'statusInit':
                this.statusInit(client, message, config, version);
            break;
            case 'setStatus':
                this.setStatus(client, message, version);
                break;
            case 'toggle':
                this.toggle(message, args, client);
                break;
            default:
                message.reply('Unrecognized Argument!');
        }
    },
    statusInit(client, message, config, version) {
        client.user.setActivity(`${config.prefix}help | v${version}`, {type: "LISTENING"})
        .then(() => message.reply('Client Status Reinitialized!'))
        .catch(error => console.error(error));
    },
    async setStatus(client, message, version) {

        let instructions = await message.channel.send('Please enter the message to overwrite the current status ("cancel" to cancel to operation)');

        const messageFilter = m => m.author === message.author;
        message.channel.awaitMessages(messageFilter, {max: 1, time: 10000, errors: ['time']})
        .then(collected => {
            let status = collected.first()

            if (status.content === 'cancel') return message.channel.send('Operation canceled');
            
            
            client.user.setActivity(status.content, {type: "PLAYING"})
            .then(() => {
                instructions.delete();
                status.delete();
                message.reply(`The client status has been set to ${status.content}`)
            });
        })
    },
    async toggle(message, args, client) {
        let target = args[1];

        if (!target) return message.reply('This command requires arguments!  Syntax: "?config toggle [command]"')

        let targetCommand = await client.commands.get(target);

        if (targetCommand.disabled) {
            targetCommand.disabled = false;
            message.reply(`${targetCommand.name} Was enabled!`);
        }
        else {
            targetCommand.disabled = true;
            message.reply(`${targetCommand.name} was disabled!`);
        }
    }
}