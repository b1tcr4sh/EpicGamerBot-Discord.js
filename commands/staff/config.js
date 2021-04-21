module.exports = {
    name: 'config',
    description: 'Configures the bot functionality and appearance',
    permissions: 'Staff',
    disabled: false,
    execute(message, args, client, commandFiles, staffCommandFiles, Discord, config, version) {
        const configFile = require('../../config.json');

        switch (args[0]) {
            case 'initializeStatus':
                this.initializeStatus(client, message, configFile);
            break;
            case 'setToken':
                this.setPrefix(client, message, configFile);
                break;
        }
    },
    initializeStatus(client, message, configFile) {
        client.user.setActivity(`${configFile.prefix}help | v${version}`, {
            type: "LISTENING",
            url: "https://github.com/TheArcticHusky/EpicGamerBot-Discord.js"
        })
        .then(() => message.reply('Client Status Reinitialized!'))
        .catch(error => console.error(error));
    },
    async setPrefix(client, message, configFile) {
        console.log('Please enter the character(s) you would like to set as the prefix (Type "cancel" to cancel');

        const messageFilter = m => m.author === message.author;
        let prefix = await message.channel.awaitMessages(messageFilter, {max: 1})

         if (prefix === 'cancel') return message.channel.send('Operation canceled');

        configFile.prefix = prefix;
        console.log(`Bot prefix has successfully been set as ${prefix}`);
        this.initializeStatus(client, message, configFile);
    }
}