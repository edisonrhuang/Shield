const BaseCommand = require('../../structures/BaseCommand');
const { embed } = require('../../util/Util');
const { YELLOW } = require('../../config/hexColors');

module.exports = class PurgeCommand extends BaseCommand {
    constructor() {
        super({
            name: 'purge',
            category: 'moderation',
            aliases: ['clear'],
            description: 'Mass deletes messages',
            args: '[number]',
            userPermissions: ['MANAGE_MESSAGES'],
        });
    }

    async run (client, message, args) {
        await message.delete();

        if (!args[0]) return message.channel.send('Please provide the amount of messages to purge').then(m => m.delete({timeout:5000}));

        const logChannel = message.guild.channels.cache.find(c => c.name === 'logs');

        return message.channel.bulkDelete(args[0]).then(() => {
            message.channel.send(`**${args[0]}** messages deleted`).then(m => m.delete({timeout:5000}));

            return logChannel.send(
                embed(client, message, 'Message Purged', YELLOW)
                    .setDescription(`**${args[0]}** messages deleted from #${message.channel.name}`));
        }).catch(err => message.channel.send(err));
    }
};