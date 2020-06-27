const BaseCommand = require('../../structures/BaseCommand');
const { embed } = require('../../util/Util');

module.exports = class JoinCommand extends BaseCommand {
    constructor() {
        super({
            name: 'join',
            category: 'music',
            aliases: null,
            description: 'Connects to a voice channel',
            channel: 'music-commands',
        });
    }

    async run (client, message) {
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