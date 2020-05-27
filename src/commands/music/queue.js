const commandStructure = require('../../utils/structures/commandStructure');
const { MessageEmbed } = require('discord.js');
const { DEFAULT } = require('../../config/hexColors');

module.exports = class queue extends commandStructure {
    constructor() {
        super('queue', 'music', []);
    }

    async run (client, message, args) {
        await message.delete();

        const player = client.music.players.get(message.guild.id);
        if (player) {
            const songs = player.queue.slice(1, 10);
            const songInfo = songs.map((s, i = 0) => `${++i}) [${s.title}](${s.uri})`).join('\n');

            const embed = new MessageEmbed()
                .setColor(DEFAULT)
                .setAuthor('Song Queue', client.user.displayAvatarURL())
                .setDescription(`Current Song: [${player.queue[0].title}](${player.queue[0].uri})
                
                ${songInfo}`)
                .setFooter(message.author.tag, message.author.displayAvatarURL())
                .setTimestamp();

            return message.channel.send(embed);
        } else {
            return message.channel.send('No queue exists').then(m => m.delete({timeout: 5000}))
        }
    }
};