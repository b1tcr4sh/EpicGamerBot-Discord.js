module.exports = {
    name: 'jail',
    description: 'Banishes a user to the horny gulag',
    permissions: "Staff",
    disabled: false,
    execute(message, args, client, commandFiles, staffCommandFiles, Discord, config, version) {
        
        if (args[0] === "clear") {
            this.clear(message, client, Discord);
        }
        else {
            const mutedRole = "754154227730743337";
            const smallEpicGamerRole = "738215330027143189";
            const roles = ["738215330027143189", "738470317001015386", "738215400545976331", "738470506465853520"];
        
            const target = message.mentions.users.first();
            let targetMember = message.guild.members.cache.get(target.id);
            let targetMemberRoles = targetMember._roles;

            if (targetMemberRoles.includes(mutedRole)) {
                targetMember.roles.remove(mutedRole);
                targetMember.roles.add(smallEpicGamerRole);

                message.reply(`${targetMember} has been successfully unmuted!`);
            } else {

                roles.forEach(element => {
                    targetMember.roles.remove(element);
                })
                targetMember.roles.add(mutedRole);

                message.reply(`${targetMember} has been successfully muted!`);
            }
        }
    },
    clear(message, client, Discord) {
        const JailChannel = client.channels.cache.get('738471659299930213');
        const date = new Date();
        const currentDay = date.getDate();

        console.log(date);

        const collector = new Discord.MessageCollector()
        collector.on('collect', collected => {

            let deleteableMessages = [];

            for (const element of collected) {
                let createdAt = element.createdAt;
                let dayCreatedAt = createdAt.getDate();
                console.log(dayCreatedAt);

                if (currentDay - dayCreatedAt >= 14) {
                    deleteableMessages.push(element);
                }
            }

            console.log(collected)
            
            deleteableMessages.forEach(element => {
                element.delete();
            })
        })
        
        message.reply(`${JailChannel.name} Has Been Cleared!`)
        .then(message => {
            message.delete({ timeout: 5000})
        })
        .catch(error => console.error(error));
    }
}