const commandStructure = require('../../utils/structures/commandStructure');
const { embed } = require('../../utils/functions');

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

            return message.channel.send(
                embed(client, message)
                    .setDescription(`Voice Channel Joined: ${channel}`));
        } else {
            return message.channel.send('You are not in a voice channel').then(m => m.delete({timeout: 5000}));
        }
    }
};