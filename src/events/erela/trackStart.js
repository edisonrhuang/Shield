const BaseEvent = require('../../structures/BaseEvent');

module.exports = class TrackStartEvent extends BaseEvent {
    constructor() {
        super('trackStart');
    }

    run (client, player, track) {
        return player.textChannel.send(`Now Playing: ${track.title}`);
    }
};