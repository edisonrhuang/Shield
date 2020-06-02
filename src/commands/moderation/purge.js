const commandStructure = require('../../utils/structures/commandStructure');
const { embed, noPermission } = require('../../utils/functions');
const { YELLOW } = require('../../config/hexColors');

module.exports = class purge extends commandStructure {
    constructor() {
        super('purge', 'moderation', ['clear']);
    }

    async run (client, message, args) {
        await message.delete();

        if (!message.member.hasPermission(['MANAGE_MESSAGES'])) return noPermission(message);
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