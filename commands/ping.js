module.exports = {
    name: 'ping',
    description: "Displays bot online status.",
    execute(message, args){
        message.channel.send('All systems working!');
    }
}