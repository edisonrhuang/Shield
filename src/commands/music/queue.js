const commandStructure = require('../../utils/structures/commandStructure');
const { embed } = require('../../utils/functions');

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

            return message.channel.send(
                embed(client, message, 'Song Queue')
                    .setDescription(`Current Song: [${player.queue[0].title}](${player.queue[0].uri})
                
                    ${songInfo}`));
        } else {
            return message.channel.send('No queue exists').then(m => m.delete({timeout: 5000}))
        }
    }
};