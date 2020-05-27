const eventStructure = require('../../utils/structures/eventStructure');

module.exports = class trackStart extends eventStructure {
    constructor() {
        super('trackStart');
    }

    run (client, player, track) {
        return player.textChannel.send(`Now Playing: ${track.title}`);
    }
};