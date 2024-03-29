const BaseCommand = require('../../structures/BaseCommand');
const { DEFAULT } = require('../../config/hexColors.json');
const { MessageEmbed } = require('discord.js');

module.exports = class QueueCommand extends BaseCommand {
    constructor() {
        super({
            name: 'queue',
            category: 'music',
            aliases: null,
            description: 'Displays the current player\'s queue',
            channel: 'music-commands',
        });
    }

    async run (client, message) {
        const player = client.music.players.get(message.guild.id);
        if (player) {
            const songs = player.queue.slice(1, 10);
            const songInfo = songs.map((s, i = 0) => `${++i}) [${s.title}](${s.uri})`).join('\n');

            return message.channel.send(
                new MessageEmbed()
                    .setColor(DEFAULT)
                    .setDescription(`Current Song: [${player.queue[0].title}](${player.queue[0].uri})
                
                    ${songInfo}`));
        } else {
            return message.channel.send('No queue exists').then(m => m.delete({timeout: 5000}))
        }
    }
};