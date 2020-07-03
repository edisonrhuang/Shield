const BaseCommand = require('../../structures/BaseCommand');
const { getUser } = require('../../util/Util');
const { YELLOW } = require('../../config/hexColors');
const { MessageEmbed } = require('discord.js');

module.exports = class ReportCommand extends BaseCommand {
    constructor() {
        super({
            name: 'report',
            category: 'moderation',
            aliases: null,
            description: 'Reports a user in the server',
            args: '[user] [reason]',
        });
    }

    async run (client, message, args) {
        const user = getUser(message, args[0]);
        if (!user) return message.channel.send('Please enter a valid user').then(m => m.delete({timeout:5000}));

        const reason = args.slice(1).join(' ');
        if (!reason) return message.channel.send('Please provide a reason for your report').then(m => m.delete({timeout:5000}));

        const reportChannel = message.guild.channels.cache.find(c => c.name === 'reports');
        if (!reportChannel) return missingChannel(client, message, 'reports');

        reportChannel.send(
            new MessageEmbed()
                .setColor(YELLOW)
                .setAuthor(user.user.tag, user.user.displayAvatarURL())
                .setDescription(`
                **Action:** Report
                **User:** ${user.user.tag} ${user.user.id}
                **Reason:** ${reason}
                `)
                .setFooter(message.author.tag, message.author.displayAvatarURL())
                .setTimestamp()
        ).then(async m => {
            await m.react('✅');
            await m.react('❌')
        });

        return message.channel.send(`${user.user.tag} has been reported by ${message.author.tag}`);
    }
}

function missingChannel (client, message, channel) {
    return message.channel.send(
        new MessageEmbed()
            .setColor(YELLOW)
            .setTitle('Missing Channel')
            .setDescription(`Please create a #${channel} channel for this command to function properly`)
    ).then(m => m.delete({ timeout: 5000 }))
}