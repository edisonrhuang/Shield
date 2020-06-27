const BaseCommand = require('../../structures/BaseCommand');
const { embed } = require('../../util/Util');

module.exports = class LeaveCommand extends BaseCommand {
    constructor() {
        super({
            name: 'leave',
            category: 'music',
            aliases: null,
            description: 'Disconnects from the voice channel',
            channel: 'music-commands',
        });
    }

    async run (client, message) {
        await message.delete();

        const { id } = message.guild;
        const player = client.music.players.get(id);
        const { channel } = message.member.voice;

        if (player) {
            if (!channel) return message.channel.send('You are not in a voice channel').then(m => m.delete({timeout: 5000}));

            if (player.voiceChannel.id === channel.id) {
                client.music.players.destroy(id);

                return message.channel.send(
                    embed(client, message)
                        .setDescription(`Voice Channel Left: ${channel}`));
            }
            return message.channel.send(`You are not in the same voice channel as ${client.user.tag}`).then(m => m.delete({timeout: 5000}));
        }
        return message.channel.send(`${client.user.tag} is not in a voice channel`).then(m => m.delete({timeout: 5000}));
    }
};