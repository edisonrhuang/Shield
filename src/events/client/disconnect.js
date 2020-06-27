const BaseEvent = require('../../structures/BaseEvent');

module.exports = class DisconnectEvent extends BaseEvent {
    constructor() {
        super('disconnect');
    }

    run (client) {
        return console.log(`${client.user.tag}: Disconnected at ${new Date()}`)
    }
};