const BaseCommand = require('../../structures/BaseCommand');
const { embed } = require('../../util/Util');
const { YELLOW } = require('../../config/hexColors');

module.exports = class SlowModeCommand extends BaseCommand {
    constructor() {
        super({
            name: 'slowmode',
            category: 'moderation',
            aliases: null,
            description: 'Sets a channel to slowmode with a specified rate limit.',
            args: '[rate] (reason)',
            userPermissions: ['MANAGE_CHANNELS']
        });
    }

    async run (client, message, args) {
        await message.delete();
        
        const rate = args[0];
        let reason = args.slice(1).join(' ');
        if (!reason) reason = 'No Reason';

        await message.channel.setRateLimitPerUser(rate, reason);

        if (rate === '0') return message.channel.send('Slowmode has been **disabled** in this channel.')
        else {
            message.channel.send(`Slowmode has been **enabled** in this channel. You can send a message every ${rate} seconds.`);

            const logChannel = message.guild.channels.cache.find(c => c.name === 'logs');
            return logChannel.send(
                embed(client, message, null, YELLOW)
                    .setAuthor(`Slow Mode`, client.user.displayAvatarURL({ dynamic: true }))
                    .setDescription(`
                    **Channel:** ${message.channel}
                    **Rate Limit:** ${rate} Seconds
                    **Reason:** ${reason}
                    `)
                );
        }
    }
}