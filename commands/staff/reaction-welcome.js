

module.exports = {
    name: 'reaction-welcome',
    description: 'Adds a predefined embed message with reaciton role functionality',
    async execute (message, args, client, commandFiles, staffCommandFiles, Discord) {
        
        const channel = '738294355235700756';
        const smallEpicGamerRole = message.guild.roles.cache.find(role => role.name === "Small Epic Gamer")
        const agreeEmoji = '☑️';

        let embed = new Discord.MessageEmbed()
        .setColor('#74fa20')
        .setTitle('Agree to rules')
        .setDescription(`By reacting to this with ${agreeEmoji}, you are agreeing to the rule of this server and Discord's TOS.`);

        let embededMessage = await message.channel.send(embed);


        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return
            if (!reaction.message.guild) return;
    
    
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === agreeEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(smallEpicGamerRole);
                }                } else return;   
        });
    }
}