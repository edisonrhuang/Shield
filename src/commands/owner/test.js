const commandStructure = require('../../utils/structures/commandStructure');
const { MessageEmbed } = require('discord.js');

module.exports = class test extends commandStructure {
    constructor() {
        super('test', 'owner', []);
    }

    async run(client, message) {
        await message.delete();

        return console.log('Test Executed');
    }
};