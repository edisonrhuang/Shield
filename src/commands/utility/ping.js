const BaseCommand = require('../../structures/BaseCommand');

module.exports = class PingCommand extends BaseCommand {
    constructor() {
        super({
            name: 'ping',
            category: 'utility',
            aliases: null,
            description: 'Returns the ping between the bot and user',
            channel: 'bot-commands',
        });
    }

    async run (client, message) {
        await message.delete();

        return message.channel.send('Pinging').then(msg => {
            const ping = msg.createdTimestamp - message.createdTimestamp;
            return msg.edit(`🏓 Pong! My ping is \`${ping}\`ms`);
        });
    }
};