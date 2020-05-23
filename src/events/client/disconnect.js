const eventStructure = require('../../utils/structures/eventStructure');

module.exports = class disconnect extends eventStructure {
    constructor() {
        super('disconnect');
    }

    run (client) {
        return console.log(`${client.user.tag}: Disconnected at ${new Date()}`)
    }
};