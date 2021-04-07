module.exports = {
    name: 'bonk',
    description: 'Give another use the bonk',
    execute(message, args) {
        let target = message.mentions.users.first();
        let targetMember = message.guild.members.cache.get(target.id);
        let bonkEmoji = ':Bonk: ';
        
        message.chanel.send(`Bonked @${targetMember} ${bonkEmoji}`);
    }
}