const commandStructure = require('../../utils/structures/commandStructure');
const { MessageEmbed } = require('discord.js');
const { DEFAULT } = require('../../config/hexColors');

module.exports = class leave extends commandStructure {
    constructor() {
        super('leave', 'music', []);
    }

    async run (client, message, args) {
        await message.delete();

        const { id } = message.guild;
        const player = client.music.players.get(id);
        const { channel } = message.member.voice;

        if (player) {
            if (!channel) return message.channel.send('You are not in a voice channel').then(m => m.delete({timeout: 5000}));

            if (player.voiceChannel.id === channel.id) {
                client.music.players.destroy(id);

                const embed = new MessageEmbed()
                    .setColor(DEFAULT)
                    .setAuthor(client.user.tag, client.user.displayAvatarURL())
                    .setDescription(`Voice Channel Left: ${channel}`)
                    .setFooter(message.author.tag, message.author.displayAvatarURL())
                    .setTimestamp();

                return message.channel.send(embed);
            }
            return message.channel.send(`You are not in the same voice channel as ${client.user.tag}`).then(m => m.delete({timeout: 5000}));
        }
        return message.channel.send(`${client.user.tag} is not in a voice channel`).then(m => m.delete({timeout: 5000}));
    }
};