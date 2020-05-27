const commandStructure = require('../../utils/structures/commandStructure');
const { MessageEmbed } = require('discord.js');
const { DEFAULT } = require('../../config/hexColors');

module.exports = class play extends commandStructure {
    constructor() {
        super('play', 'music', []);
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

            const embed = new MessageEmbed()
                .setColor(DEFAULT)
                .setAuthor('Song Selection', client.user.displayAvatarURL())
                .setDescription(trackInfo)
                .setFooter('You have 10 seconds to make a selection', message.author.displayAvatarURL())
                .setTimestamp();

            message.channel.send(embed).then(m => m.delete({timeout: 10000}));

            const filter = m => (message.author.id === m.author.id) && (m.content >= 1 && m.content <= tracks.length);

            try {
                const response = await message.channel.awaitMessages(filter, { max: 1, time: 10000, errors: ['time']});

                if (response) {
                    const entry = response.first().content;
                    const player = client.music.players.get(message.guild.id);
                    const track = tracks[entry-1];

                    if (!player.queue.empty) await message.channel.send(`Enqueueing Track: ${track.title}`);
                    player.queue.add(track);
                    if (!player.playing) return player.play();
                }
            } catch (err) {
                message.channel.send('There was an error searching for a song').then(m => m.delete({timeout: 5000}));
                return console.log(err)
            }
        } else {
            return message.channel.send('You are not in a voice channel').then(m => m.delete({timeout: 5000}));
        }
    }
};