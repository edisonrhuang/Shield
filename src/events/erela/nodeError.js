const eventStructure = require('../../utils/structures/eventStructure');

module.exports = class nodeError extends eventStructure {
    constructor() {
        super('nodeError');
    }

    run (client, node, error) {
        return console.log(`Node: ${error.message}`);
    }
};