const commandStructure = require('../../utils/structures/commandStructure');

module.exports = class test extends commandStructure {
    constructor() {
        super('test', 'utilities', []);
    }

    run(client) {
        return console.log('Test Executed');
    }
};