const { User, Role, ReactionUserManager } = require("discord.js");

module.exports = {
    name: 'jail',
    description: 'Banishes a user to the horny gulag',
    execute(message, args) {
        const mutedRole = message.guild.roles.cache.find(role => role.name === "Certified Simp");
        const smallEpicGamerRole = message.guild.roles.cache.find(role => role.name === "Small Epic Gamer");
        const epicGamerRole = message.guild.roles.cache.find(role => role.name === "Epic Gamer");
        const bigEpicGamerRole = message.guild.roles.cache.find(role => role.name === "Big Epic Gamer");
        const epicGamerBroskisRole = message.guild.roles.cache.find(role => role.name === "Epic Gamer Broskis")
        const {member, mentions} = message
        
        try {
            if (member.roles.cache.has('738215800778784859')) {
                const target = message.mentions.users.first();
                let targetMember = message.guild.members.cache.get(target.id);
    
                    switch (targetMember.roles.cache.has()) {
                        case smallEpicGamerRole:
                            targetMember.roles.remove(smallEpicGamerRole);
                            return;
                        case epicGamerRole:
                            targetMember.roles.remove(epicGamerRole);
                            return;
                        case bigEpicGamerRole:
                            targetMember.roles.remove(bigEpicGamerRole);
                            return;
                        case epicGamerRole:
                            targetMember.roles.remove(epicGamerRole);
                            return;
                        case epicGamerBroskisRole:
                            targetMember.roles.remove(epicGamerBroskisRole);
                            return;
                        default:
                            targetMember.roles.remove(mutedRole);
                            targetMember.roles.add(smallEpicGamerRole);
                            break;
                    }
            } else {
                throw 'You do not have sufficient permissions to perform this command!';
            }
        } catch(error) {
            message.channel.send(error);
        }
    }
}