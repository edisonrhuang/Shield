const BaseCommand = require('../../structures/BaseCommand');
const { YELLOW } = require('../../config/hexColors');
const { MessageEmbed } = require('discord.js');

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
        if (!args[0]) return message.channel.send('Please provide the amount of messages to purge').then(m => m.delete({timeout:5000}));

        const logChannel = message.guild.channels.cache.find(c => c.name === 'logs');

        return message.channel.bulkDelete(args[0]).then(() => {
            message.channel.send(`**${args[0]}** messages deleted`).then(m => m.delete({timeout:5000}));

            return logChannel.send(
                new MessageEmbed()
                    .setColor(YELLOW)
                    .setTitle('Messages Purged')
                    .setDescription(`**${args[0]}** messages deleted from #${message.channel.name}`)
                    .setFooter(message.author.tag, message.author.displayAvatarURL())
                    .setTimestamp()
            );
        }).catch(err => message.channel.send(err));
    }
};