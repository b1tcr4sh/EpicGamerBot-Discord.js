module.exports = {
    name: 'ping',
    description: "Displays bot online status.",
    permissions: "User",
    disabled: false,
    execute(message, args, client, commandFiles, staffCommandFiles, Discord, config, version){
        message.channel.send(`Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`)
        .then(() => console.log(`Received ping from ${message.author}, bot is responsive.`))
        .catch(error => {
            client.users.cache.get('219273969415487489').send(`Ecountered Critial Exception: ${error}`); 
            console.error(error);
        })
    }
}