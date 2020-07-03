const BaseCommand = require('../../structures/BaseCommand');

module.exports = class TestCommand extends BaseCommand {
    constructor() {
        super({
            name: 'test',
            category: 'owner',
            aliases: null,
            description: 'Test command',
            userPermissions: ['BOT_OWNER'],
        });
    }

    async run(client, message) {
        await message.delete();

        return console.log('Test Executed');
    }
};