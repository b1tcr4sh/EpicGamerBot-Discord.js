module.exports = {
    name: 'bonk',
    description: 'Give another use the bonk',
    execute(message, args, client, commandFiles, staffCommandFiles, Discord, config) {
        let target = message.mentions.users.first();
        let targetMember = message.guild.members.cache.get(target.id);
        const bonkEmoji = client.emojis.cache.find(emoji => emoji.name === 'Bonk');
        
        message.channel.send(`Bonked ${targetMember} ${bonkEmoji}`);
    }
}