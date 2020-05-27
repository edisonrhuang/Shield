const commandStructure = require('../../utils/structures/commandStructure');
const { MessageEmbed } = require('discord.js');
const { DEFAULT } = require('../../config/hexColors');

module.exports = class skip extends commandStructure {
    constructor() {
        super('skip', 'music', []);
    }

    async run (client, message) {
        const guildID = message.guild.id;
        const player = client.music.players.get(guildID);
        const { channel } = message.member.voice;

        if (!player) return message.channel.send('There is no music player active').then(m => m.delete({timeout: 5000}));
        else if (!channel) return message.channel.send('You are not in a voice channel').then(m => m.delete({timeout: 5000}));
        else if (player.voiceChannel.id === channel.id) {
            const members = channel.members.filter(m => !m.user.bot);
            if (members.size === 1) {
                if (!player.queue[1]) {
                    client.music.players.destroy(message.guild.id);
                    return message.channel.send('Queue has ended');
                }

                player.stop();
                return message.channel.send(`Skipped Song: ${player.queue[0].title}`);
            } else {
                const votesRequired = Math.ceil(members.size * .51);

                const embed = new MessageEmbed()
                    .setColor(DEFAULT)
                    .setAuthor('Skip Vote', client.user.displayAvatarURL())
                    .setDescription(`Total votes needed: ${votesRequired}`)
                    .setFooter(message.author.tag, message.author.displayAvatarURL())
                    .setTimestamp();

                const msg = await message.channel.send(embed);
                await msg.react('✅');

                const filter = (reaction, user) => {
                    const { channel } = message.guild.members.cache.get(user.id).voice;

                    if (channel && channel.id === player.voice.id) {
                        return ['✅'].includes(reaction.emoji.name);
                    } else {
                        return false;
                    }
                };

                const reactions = await msg.awaitReactions(filter, { max: votesRequired, time: 10000, error:['time'] })
                let totalVotes = reactions.get('✅').users.cache.filter(u => !u.bot);
                if (totalVotes.size >= votesRequired) {
                    await msg.delete();
                    if (!player.queue[1]) {
                        client.music.players.destroy(message.guild.id);
                        return message.channel.send('Queue has ended');
                    }
                    player.stop();
                    return message.channel.send(`Skipped Song: ${player.queue[0].title}`)
                }
            }
        }
    }
};