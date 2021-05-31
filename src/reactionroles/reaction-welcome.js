module.exports = {
    async sendMessage (client, Discord) {
        
        const guild = client.guilds.cache.get('527590939280146443');
        const channel = client.channels.cache.get(`738294355235700756`);
        const smallEpicGamerRole = guild.roles.cache.find(role => role.name === "Small Epic Gamer")
        const agreeEmoji = '☑️';
        const nsfwChannel = guild.channels.cache.get('775050993498062848');

        channel.bulkDelete(1)
        .then(() => {
            console.log(`Successfully deleted reaction message in ${channel.name}`);
        })
        .catch(error => {
            throw `Experienced an error deleting reaction message in ${channel.name}.  ${error}`
        });

        let embed = new Discord.MessageEmbed()
        .setColor('#74fa20')
        .setTitle('Rules Agreement')
        .setDescription(`By reacting to this with ${agreeEmoji}, you are agreeing to the rule of this server and Discord's TOS.`)
        .addFields({
            name: 'Server Rules:',
            value:
            `- Don't be a troll, no one likes trolls\n\n
            - Try to limit NSFW posts outside of the NSFW channel (#${nsfwChannel.name} as of this message being created)\n\n
            - Don't mass ping without reason, most people can agree that it's a really big annoyance\n\n
            - No harassment, hate speech, racism, sexism, homophobia, etc. (Especially if non-satirical)`,
        })
        .addFields({
            name: 'Getting Started:',
            value: 'Go to #📜custom-roles📜 to opt-in for server roles, each with their own function and make sure to visit #💬general💬 to introduce yourself!'
        })
        .setFooter(`Once you have read all of the rules, react to this message with ${agreeEmoji} to gain access to the server.  If you have any issues or questions, feel free to ping a mod`);

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