module.exports = {
    name: 'config',
    description: 'Configures the bot functionality and appearance',
    permissions: 'Staff',
    disabled: false,
    execute(message, args, client, commandFiles, staffCommandFiles, Discord, config, version) {
        if (args[0] === "initialize-status") {
            this.initializeStatus(client, message);
        }
    },
    initializeStatus(client, message) {
        client.user.setActivity(`?help | v${version}`, {
            type: "LISTENING",
            url: "https://github.com/TheArcticHusky/EpicGamerBot-Discord.js"
        })
        .then(() => message.reply('Client Status Reinitialized!'))
        .catch(error => console.error(error));
    }
}