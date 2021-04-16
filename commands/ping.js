module.exports = {
    name: 'ping',
    description: "Displays bot online status.",
    permissions: "User",
    disabled: false,
    execute(message, args){
        message.channel.send('All systems working!');
    }
}