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
                this.setPrefix(client, message, version);
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
    }
}