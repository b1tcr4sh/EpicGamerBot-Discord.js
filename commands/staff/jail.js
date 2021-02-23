const { User, Role } = require("discord.js");

module.exports = {
    name: 'jail',
    description: 'Banishes a user to the horny gulag',
    execute(message, args) {
        const mutedRole = message.guild.roles.cache.find(role => role.name === "Certified Simp");
        const {member, mentions} = message
        
        try {
            if (member.roles.cache.has('738215800778784859')) {
                const target = message.mentions.users.first();
                let targetMember = message.guild.members.cache.get(target.id);
    
                if (!targetMember.roles.cache.has(mutedRole)) {
                    targetMember.roles.add(mutedRole);
                } else {
                    targetMember.roles.remove(mutedRole);
                }
            } else {
                throw 'You do not have sufficient permissions to perform this command!';
            }
        } catch(error) {
            message.channel.send(error);
        }
    }
}