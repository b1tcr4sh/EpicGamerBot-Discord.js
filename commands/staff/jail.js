module.exports = {
    name: 'jail',
    description: 'Banishes a user to the horny gulag',
    permissions: "Staff",
    disabled: false,
    execute(message, args, client, commandFiles, staffCommandFiles, Discord, config, version) {
        
        if (args[0] === "clear") {
            this.clear(client);
        }
        else {
            const mutedRole = "754154227730743337";
            const smallEpicGamerRole = "738215330027143189";
            const epicGamerRole = "738470317001015386";
            const bigEpicGamerRole = "738215400545976331";
            const epicGamerBroskisRole = "738470506465853520";
            const roles = ["738215330027143189", "738470317001015386", "738215400545976331", "738470506465853520"];
            const {member, mentions} = message;
        
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
    clear(client) {
        const channel = client.channels.cache.get('738471659299930213');
        const date = new Date();
        const currentDay = date.getDate();

        const collector = new Discord.MessageCollector(channel, m => m.author.id !== '762808075551768578')
        collector.on('collect', collected => {
            collected.forEach(element => {
                let createdAt = element.createdAt;
                let dayCreatedAt = createdAt.getDate();

                if (currentDay - dayCreatedAt > 14) {
                    collected.splice(indexOf(element), 1);
                }
                else {
                    element.delete();
                }
            })

            collected.delete();
        })
        
        .then(() => message.channel.send("If you find yourself in this channel, then apparently you have done something to be temporarily muted (Probably being a simp). You'll be unmuted once the moderators deem appropriate, until then - enjoy your stay.\n\n"))
        .catch(error => console.error(error));
    }
}