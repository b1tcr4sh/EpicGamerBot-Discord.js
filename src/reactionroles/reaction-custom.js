module.exports = {
    async sendMessage (client, Discord) {
        
            const guild = client.guilds.cache.get('527590939280146443');
            const channel = client.channels.cache.get(`812152059238809680`);
            const techEnthusiastRole = guild.roles.cache.find(role => role.name === "Tech Enthusiast");
            const DnDRole = guild.roles.cache.find(role => role.name === "DnD");
            const EpicMovieWatcherRole = guild.roles.cache.find(role => role.name === "Epic Movie Watcher");
            const EpicArtistRole = guild.roles.cache.find(role => role.name === "Epic Artist");
            const TechEmoji = '💻';
            const DnDEmoji = '🎲';
            const MovieWatcherEmoji = '🍿';
            const ArtistEmoji = '🖊️';
        
            channel.bulkDelete(1)
            .then(() => {
                console.log(`Successfully deleted reaction message in ${channel.name}`);
            })
            .catch(error => {
                throw `Experienced an error deleting reaction message in ${channel.name}.  ${error}`
            });

            let embed = new Discord.MessageEmbed()
            .setColor('#19fffb')
            .setTitle('Custom Roles')
            .setDescription(`React with these emojis to gain their associated roles:
                \n\n${TechEmoji} - Tech Enthusiast\n\n
                ${DnDEmoji} - Dungeons and Dragons\n\n
                ${MovieWatcherEmoji} - Movie Night Notifications\n\n
                ${ArtistEmoji} - Epic Artist`);

            let embededMessage = await channel.send(embed);
            embededMessage.react(TechEmoji);
            embededMessage.react(DnDEmoji);
            embededMessage.react(MovieWatcherEmoji);
            embededMessage.react(ArtistEmoji);


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
                    if (reaction.emoji.name === ArtistEmoji) {
                        await reaction.message.guild.members.cache.get(user.id).roles.add(EpicArtistRole);
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
                if (reaction.emoji.name === ArtistEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(EpicArtistRole);
                }
            } else return;  
        });
    }
}