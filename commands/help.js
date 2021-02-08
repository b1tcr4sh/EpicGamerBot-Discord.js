
module.exports = {
    name: 'help',
    description: "Displays all command aliases and descriptions.",
    execute(message, args, client, commandFiles) {
        if (args[0] === 'admin' && message.member.roles.cache.has('738215800778784859')) {
            
        }
        else {
            message.channel.send('Currently Supported Commands:');
            commandFiles.forEach(element => {
                let modifiedElement = element.substring(0, element.length-3);

                let name = client.commands.get(modifiedElement).name;
                let description = client.commands.get(modifiedElement).description;
                message.channel.send(`- ${name}: ${description}`);
            }); 
        }
    }
}