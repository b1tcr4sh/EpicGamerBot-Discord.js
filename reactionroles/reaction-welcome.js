module.exports = {
    async sendMessage (client, Discord) {
        
        const guild = client.guilds.cache.get('527590939280146443');
        const channel = client.channels.cache.get(`738294355235700756`);
        const smallEpicGamerRole = guild.roles.cache.find(role => role.name === "Small Epic Gamer")
        const agreeEmoji = '☑️';

        channel.bulkDelete(1);

        let embed = new Discord.MessageEmbed()
        .setColor('#74fa20')
        .setTitle('Agree to rules')
        .setDescription(`By reacting to this with ${agreeEmoji}, you are agreeing to the rule of this server and Discord's TOS.`);

        let embededMessage = await channel.send(embed);
        embededMessage.react(agreeEmoji);

        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return
            if (!reaction.message.guild) return;
    
    
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === agreeEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(smallEpicGamerRole);
                }                
            } else return;   
        });
    }
}