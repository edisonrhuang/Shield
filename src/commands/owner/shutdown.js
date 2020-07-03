const BaseCommand = require('../../structures/BaseCommand');

module.exports = class ShutdownCommand extends BaseCommand {
    constructor() {
        super({
            name: 'shutdown',
            category: 'owner',
            aliases: null,
            description: 'Shuts down the bot',
            userPermissions: ['BOT_OWNER'],
        });
    }

    async run (client, message) {
        try {
            console.log(`${client.user.tag}: Offline`)
            await message.channel.send('Shutting Down...');
            return process.exit();
        } catch (err) {
            return message.channel.send(`Error: ${err}`).then(m => m.delete({timeout:10000}));
        }
    }
};
