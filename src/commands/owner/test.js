const commandStructure = require('../../utils/structures/commandStructure');

module.exports = class test extends commandStructure {
    constructor() {
        super('test', 'owner', []);
    }

    async run(client, message) {
        await message.delete();

        return console.log('Test Executed');
    }
};