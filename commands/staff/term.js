module.exports = {
    name: 'term',
    description: 'Gracefully terminates the client process, only accessible by bot author',
    permissions: 'Staff',
    disabled: false,
    execute(message, args, client, commandFiles, staffCommandFiles, Discord, config, version) {
        if (message.author.id !== '219273969415487489') return message.reply("You have insufficient permissions to perform this command!");

        message.reply('Terminating process gracefully with SIGTERM')
        .then(() => process.kill(process.pid, 'SIGTERM'));
    }
}