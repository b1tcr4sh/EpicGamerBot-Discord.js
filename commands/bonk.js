module.exports = {
    name: 'bonk',
    description: 'Give another use the bonk',
    permissions: 'User',
    disabled: false,
    execute(message, args, client, commandFiles, staffCommandFiles, Discord, config) {
        let target = message.mentions.users.first();
        let targetMember = message.guild.members.cache.get(target.id);
        const bonkEmoji = client.emojis.cache.find(emoji => emoji.name === 'Bonk');
        const messages = [`Bonked ${targetMember} ${bonkEmoji}`, `${targetMember} Get bonked child`, `${targetMember}, Get smacked by ${message.author} with a bat`, `Bonk! ${targetMember}, go to horny jail! ${bonkEmoji}`];
        
        let randomMessage = messages[Math.floor(Math.random() * messages.length)]
        message.channel.send(randomMessage);
    }
}
