
module.exports = {
    name: 'help',
    description: "Displays all command aliases and descriptions.",
    execute(message, args, client, commandFiles, staffCommandFiles, Discord) {
        const helpEmbed = new Discord.MessageEmbed()
        .setTitle('Currently Supported Commands:')

        if (args[0] === undefined) {
            helpEmbed.setColor('#2BFF78');

            commandFiles.forEach(element => {
                let modifiedElement = element.substring(0, element.length-3);

                let name = client.commands.get(modifiedElement).name;
                let description = client.commands.get(modifiedElement).description;
                helpEmbed.addFields(
                    {name: name, value: description}
                );
            }); 
            message.channel.send(helpEmbed);
        }
        else if (args[0] === 'admin') {
            if (message.member.roles.cache.has('738215800778784859')) {
                helpEmbed.setColor('#FF502B')
                .setDescription('Admin Specific Commands');                    

                staffCommandFiles.forEach(element => {
                    let modifiedElement = element.substring(0, element.length-3);

                    let name = client.commands.get(modifiedElement).name;
                    let description = client.commands.get(modifiedElement).description;
                    helpEmbed.addFields(
                        {name: name, value: description}
                    );
                });
                message.channel.send(helpEmbed);
            } 
            else {
                message.reply('You do not have sufficient permissions to perform this comand!');
            }
        }
    }
}