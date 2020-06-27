const BaseEvent = require('../../structures/BaseEvent');

module.exports = class ReconnectEvent extends BaseEvent {
    constructor() {
        super('reconnect');
    }

    run(client) {
        return console.log(`${client.user.tag}: Reconnected at ${new Date()}`)
    }
};