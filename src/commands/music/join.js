const BaseCommand = require('../../structures/BaseCommand');

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
        const { channel } = message.member.voice;

        if (channel) {
            const player = client.music.players.spawn({
                guild: message.guild,
                voiceChannel: channel,
                textChannel: message.channel
            });

            return message.channel.send(`Voice Channel Joined: \`${channel.name}\``);
        } else {
            return message.channel.send('You are not in a voice channel').then(m => m.delete({timeout: 5000}));
        }
    }
};