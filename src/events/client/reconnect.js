const eventStructure = require('../../utils/structures/eventStructure');

module.exports = class reconnect extends eventStructure {
    constructor() {
        super('reconnect');
    }

    run(client) {
        return console.log(`${client.user.tag}: Reconnected at ${new Date()}`)
    }
};