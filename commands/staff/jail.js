module.exports = {
    name: 'jail',
    description: 'Banishes a user to the horny gulag',
    permissions: "Staff",
    disabled: false,
    execute(message, args, client, commandFiles, staffCommandFiles, Discord, config, version) {


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
}