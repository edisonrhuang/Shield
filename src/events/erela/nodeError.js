const BaseEvent = require('../../structures/BaseEvent');

module.exports = class NodeErrorEvent extends BaseEvent {
    constructor() {
        super('nodeError');
    }

    run (client, node, error) {
        return console.log(`Node: ${error.message}`);
    }
};