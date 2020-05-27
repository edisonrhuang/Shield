const evenStructure = require('../../utils/structures/eventStructure');

module.exports = class nodeConnect extends evenStructure {
    constructor() {
        super('nodeConnect');
    }

    run (client, node) {
        return console.log('Node: Connected')
    }
};