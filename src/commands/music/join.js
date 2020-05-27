const commandStructure = require('../../utils/structures/commandStructure');
const { MessageEmbed } = require('discord.js');
const { DEFAULT } = require('../../config/hexColors');

module.exports = class join extends commandStructure {
    constructor() {
        super('join', 'music', []);
    }

    async run (client, message, args) {
        await message.delete();
        const { channel } = message.member.voice;

        if (channel) {
            const player = client.music.players.spawn({
                guild: message.guild,
                voiceChannel: channel,
                textChannel: message.channel
            });

            const embed = new MessageEmbed()
                .setColor(DEFAULT)
                .setAuthor(client.user.tag, client.user.displayAvatarURL())
                .setDescription(`Voice Channel Joined: ${channel}`)
                .setFooter(message.author.tag, message.author.displayAvatarURL())
                .setTimestamp();

            return message.channel.send(embed);
        } else {
            return message.channel.send('You are not in a voice channel').then(m => m.delete({timeout: 5000}));
        }
    }
};