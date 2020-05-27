const eventStructure = require('../../utils/structures/eventStructure');

module.exports = class queueEnd extends eventStructure {
    constructor() {
        super('queueEnd');
    }

    run (client, player) {
        client.music.players.destroy(player.guild.id);
        return player.textChannel.send('Queue has ended.');
    }
};