const BaseCommand = require('../../structures/BaseCommand');
const { embed } = require('../../util/Util');

module.exports = class ShuffleCommand extends BaseCommand {
    constructor() {
        super({
            name: 'shuffle',
            category: 'music',
            aliases: ['shufflequeue'],
            description: 'Shuffles the current player\'s queue',
            channel: 'music-commands',
        });
    }

    async run (client, message) {
        await message.delete();

        const { channel } = message.member.voice;
        const player = client.music.players.get(message.guild.id);

        if (player) {
            if (channel) {
                if (channel.id === player.voiceChannel.id) {
                    player.queue.shuffle();

                    return message.channel.send(
                        embed(client, message, 'Queue Shuffled'));
                }
                return message.channel.send(`You are not in the same voice channel as ${client.user.tag}`).then(m => m.delete({timeout: 5000}));
            }
            return message.channel.send('You are not in a voice channel');
        }
        return message.channel.send('No queue exists').then(m => m.delete({timeout: 5000}));
    }
};