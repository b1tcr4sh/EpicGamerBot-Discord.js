module.exports = {
    name: 'help',
    description: "Displays all command aliases and descriptions.",
    permissions: 'User',
    disabled: false,
    execute(message, args, client, commandFiles, staffCommandFiles, Discord) {
        const argsFirst = args.toString();
        let supportedCommands = [];
        commandFiles.forEach(element => {
            commandTitle = element.substring(0, element.length-3);
            supportedCommands.push(commandTitle);
        });
        staffCommandFiles.forEach(element => {
            commandTitle = element.substring(0, element.length-3);
            supportedCommands.push(commandTitle);
        })

        const helpEmbed = new Discord.MessageEmbed()

        if (args[0] === undefined) {
            this.empty(message, helpEmbed, commandFiles, client);
        }
        else if (args[0] === 'admin') {
            this.admin(message, helpEmbed, staffCommandFiles, client);   
        }
        else if (supportedCommands.includes(argsFirst)) {
            this.anyCommand(message, helpEmbed, args, argsFirst, client)
        }
        else message.reply("Unrecognized Argument");
    },
    empty(message, helpEmbed, commandFiles, client) {
        helpEmbed.setTitle('Currently Supported Commands:')
            .setColor('#2BFF78');

            commandFiles.forEach(element => {
                let modifiedElement = element.substring(0, element.length-3);

                let name = client.commands.get(modifiedElement).name;
                let description = client.commands.get(modifiedElement).description;
                helpEmbed.addFields({
                    name: name, 
                    value: description
                });
            }); 
            message.channel.send(helpEmbed);
    },
    admin(message, helpEmbed, staffCommandFiles, client) {
        if (!message.member.roles.cache.has('738215800778784859')) return message.reply('You do not have sufficient permissions to perform this command');
                
        helpEmbed.setTitle('Currently Supported Commands:')
        .setColor('#FF502B')
        .setDescription('Admin Specific Commands');                    

        staffCommandFiles.forEach(element => {
            let modifiedElement = element.substring(0, element.length-3);

            let name = client.commands.get(modifiedElement).name;
            let description = client.commands.get(modifiedElement).description;
            helpEmbed.addFields({
                name: name,
                value: description
            });
         });
        message.channel.send(helpEmbed);
    },
    anyCommand(message, helpEmbed, args, argsFirst, client) {
        let commandObject = client.commands.get(argsFirst);

        let name = client.commands.get(args[0]).name;
        let description = client.commands.get(args[0]).description;
        let permissions = client.commands.get(args[0]).permissions;

        if (commandObject.disabled === true) return message.reply('This command is disabled');
        let commandMethods = Object.getOwnPropertyNames(commandObject).filter(element => {
            return typeof commandObject[element] === 'function';
        })

        let commandArgs = commandMethods.filter(method => method !== 'execute');
        
        if (!commandArgs.length) {
            commandArgs = 'This Command Has No Arguments!';
        }

        helpEmbed.setTitle(name)
        .setColor('#2BFF78')
        .setDescription(description)
        .addFields({
            name: 'Available Arguments:', 
            value: commandArgs
        })
        .setFooter(`Required Permission Level: ${permissions}`)

        message.channel.send(helpEmbed);
    }
}