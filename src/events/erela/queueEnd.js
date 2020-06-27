const BaseEvent = require('../../structures/BaseEvent');

module.exports = class QueueEndEvent extends BaseEvent {
    constructor() {
        super('queueEnd');
    }

    run (client, player) {
        client.music.players.destroy(player.guild.id);
        return player.textChannel.send('Queue has ended.');
    }
};