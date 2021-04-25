module.exports = {
    name: 'config',
    description: 'Configures the bot functionality and appearance',
    permissions: 'Staff',
    disabled: false,
    execute(message, args, client, commandFiles, staffCommandFiles, Discord, config, version) {
        switch (args[0]) {
            case 'initializeStatus':
                this.initializeStatus(client, message, config, version);
            break;
            case 'setPrefix':
                this.setPrefix(client, message, config, version);
                break;
            default:
                message.reply('Unrecognized Argument!');
        }
    },
    initializeStatus(client, message, config, version) {
        client.user.setActivity(`${config.prefix}help | v${version}`, {
            type: "LISTENING",
            url: "https://github.com/TheArcticHusky/EpicGamerBot-Discord.js"
        })
        .then(() => message.reply('Client Status Reinitialized!'))
        .catch(error => console.error(error));
    },
    async setPrefix(client, message, config, version) {
        message.channel.send('Please enter the character(s) you would like to set as the prefix (Type "cancel" to cancel');

        const messageFilter = m => m.author === message.author;
        message.channel.awaitMessages(messageFilter, {max: 1, time: 10000, errors: ['time']})
        .then(collected => {
            if (collected === 'cancel') return message.channel.send('Operation canceled');

            config.prefix = collected.content;
            console.log(`${collected} has been set as the new prefix by ${message.author.name}`);
            message.channel.send(`Bot prefix has successfully been set as ${collected}`);

            this.initializeStatus(client, message, config, version);
        })
    }
}