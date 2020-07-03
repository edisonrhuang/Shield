const BaseCommand = require('../../structures/BaseCommand');
const { DEFAULT } = require('../../config/hexColors.json');
const { MessageEmbed } = require('discord.js');

module.exports = class PlayCommand extends BaseCommand {
    constructor() {
        super({
            name: 'play',
            category: 'music',
            aliases: ['p'],
            description: 'Searches and displays music and plays it',
            channel: 'music-commands',
            args: '[query]',
        });
    }

    async run (client, message, args) {
        const query = args.join(' ');
        const { channel } = message.member.voice;

        if (channel) {
            const player = client.music.players.spawn({
                guild: message.guild,
                voiceChannel: channel,
                textChannel: message.channel
            });

            const searchResults = await client.music.search(query, message.author);
            const tracks = searchResults.tracks.slice(0, 10);
            const trackInfo = tracks.map((t, i = 0) => `${++i}) [${t.title}](${t.uri})`).join('\n');

            message.channel.send(
                new MessageEmbed()
                    .setColor(DEFAULT)
                    .setTitle('Song Selection')
                    .setDescription(trackInfo)
                    .setFooter('You have 10 seconds to make a selection')
                ).then(m => m.delete({timeout:5000}));

            const filter = m => (message.author.id === m.author.id) && (m.content >= 1 && m.content <= tracks.length);

            try {
                const response = await message.channel.awaitMessages(filter, { max: 1, time: 10000, errors: ['time']});
                await message.channel.bulkDelete(1);

                if (response) {
                    const entry = response.first().content;
                    const player = client.music.players.get(message.guild.id);
                    const track = tracks[entry-1];

                    if (!player.queue.empty) await message.channel.send(`Enqueueing Track: ${track.title}`);
                    player.queue.add(track);
                    if (!player.playing) return player.play();
                }
            } catch (err) {
                return message.channel.send(`An error occurred while searching for the song: ${err}`).then(m => m.delete({timeout: 5000}));
            }
        } else {
            return message.channel.send('You are not in a voice channel').then(m => m.delete({timeout: 5000}));
        }
    }
};