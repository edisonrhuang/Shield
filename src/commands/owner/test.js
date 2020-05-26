const commandStructure = require('../../utils/structures/commandStructure');
require('dotenv').config();

module.exports = class test extends commandStructure {
    constructor() {
        super('test', 'utilities', []);
    }

    async run(client) {
        await message.delete();

        if (message.author.id === process.env.BOT_OWNER_ID) {
            return console.log('Test Executed');
        }
    }
};