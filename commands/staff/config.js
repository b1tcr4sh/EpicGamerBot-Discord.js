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
        let prefix = await message.channel.awaitMessages(messageFilter, {max: 1})

        if (prefix === 'cancel') return message.channel.send('Operation canceled');

        config.prefix = prefix;

        console.log(`${prefix} has been set as the new prefix by ${message.author.name}`);
        message.channel.send(`Bot prefix has successfully been set as ${prefix}`);
        this.initializeStatus(client, message, config, version);
    }
}