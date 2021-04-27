module.exports = {
    name: 'ping',
    description: "Displays bot online status.",
    permissions: "User",
    disabled: false,
    execute(message, args, client, commandFiles, staffCommandFiles, Discord, config, version){
        message.channel.send('All systems working!')
        .then(() => console.log(`Received ping from ${message.author}, bot is responsive.`));
        .catch(error => {
            client.users.cache.get('219273969415487489').send(`Ecountered Critial Exception: ${error}`); 
            console.error(error);
        })
    }
}