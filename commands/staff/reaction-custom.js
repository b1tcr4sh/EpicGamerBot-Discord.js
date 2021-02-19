

module.exports = {
    name: 'reaction-custom',
    description: 'Adds a predefined embed message with reaciton role functionality',
    async execute (message, args, client, commandFiles, staffCommandFiles, Discord) {
        
            const channel = '812152059238809680';
            const techEnthusiastRole = message.guild.roles.cache.find(role => role.name === "Tech Enthusiast");
            const DnDRole = message.guild.roles.cache.find(role => role.name === "DnD");
            const EpicMovieWatcherRole = message.guild.roles.cache.find(role => role.name === "Epic Movie Watcher");
            const TechEmoji = '💻';
            const DnDEmoji = '🎲';
            const MovieWatcherEmoji = '🍿';

            let embed = new Discord.MessageEmbed()
            .setColor('#19fffb')
            .setTitle('Custom Roles')
            .setDescription(`React with these emojis to gain their associated roles:
                \n\n${TechEmoji} - Tech Enthusiast\n\n
                ${DnDEmoji} - Dungeons and Dragons\n\n
                ${MovieWatcherEmoji} - Movie Night Notifications`);

            let embededMessage = await message.channel.send(embed);


            client.on('messageReactionAdd', async (reaction, user) => {
                if (reaction.message.partial) await reaction.message.fetch();
                if (reaction.partial) await reaction.fetch();
                if (user.bot) return
                if (!reaction.message.guild) return;
    
    
                if (reaction.message.channel.id == channel) {
                    if (reaction.emoji.name === TechEmoji) {
                        await reaction.message.guild.members.cache.get(user.id).roles.add(techEnthusiastRole);
                    }
                    if (reaction.emoji.name === DnDEmoji) {
                        await reaction.message.guild.members.cache.get(user.id).roles.add(DnDRole);
                    }
                    if (reaction.emoji.name === MovieWatcherEmoji) {
                        await reaction.message.guild.members.cache.get(user.id).roles.add(EpicMovieWatcherRole);
                    }
                } else return;   
            });

        client.on('messageReactionRemove', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return
            if (!reaction.message.guild) return;


            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === TechEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(techEnthusiastRole);
                }
                if (reaction.emoji.name === DnDEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(DnDRole);
                }
                if (reaction.emoji.name === MovieWatcherEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(EpicMovieWatcherRole);
                }
            } else return;  
        });
    }
}