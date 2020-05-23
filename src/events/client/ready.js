const eventStructure = require('../../utils/structures/eventStructure');

module.exports = class ready extends eventStructure {
    constructor() {
        super('ready');
    }

    run(client) {
        return console.log(`${client.user.tag}: Online`)
    }
};