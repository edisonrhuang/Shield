const BaseCommand = require('../../structures/BaseCommand');

module.exports = class AnnounceCommand extends BaseCommand {
    constructor() {
        super({
            name: 'announce',
            category: 'moderation',
            aliases: ['say'],
            description: 'Copies any message into any channel',
            args: '[message]',
            userPermissions: ['MANAGE_MESSAGES'],
        });
    }

    async run (client, message, args) {
        const channel = message.mentions.channels.first();
        if (!channel) {
            message.channel.send(args.join(' '));
        } else {
            return channel.send(args.slice(1).join(' '))
        }
    }
}