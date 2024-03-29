const BaseCommand = require('../../structures/BaseCommand');
const { LIGHT_GREEN } = require('../../config/hexColors.json');
const { MessageEmbed } = require('discord.js');

module.exports = class UnbanCommand extends BaseCommand {
    constructor() {
        super({
            name: 'unban',
            category: 'moderation',
            aliases: null,
            description: 'Unbans user from the server',
            args: '[user] (reason)',
            userPermissions: ['BAN_MEMBERS'],
        });
    }

    run (client, message, args) {
        const user = client.users.cache.get(args[0]);
        if (!user) return message.channel.send('Please enter a valid user id').then(m => m.delete({timeout: 5000}));

        let reason = args.slice(1).join(' ');
        if (!reason) reason = 'No Reason';

        const logChannel = message.guild.channels.cache.find(c => c.name === 'logs');
        logChannel.send(
            new MessageEmbed()
                .setColor(LIGHT_GREEN)
                .setAuthor(user.tag, user.displayAvatarURL())
                .setDescription(`
                **Action:** Unban
                **User:** ${user.tag} (${user.id})
                **Reason:** ${reason}`)
                .setFooter(message.author.tag, message.author.displayAvatarURL())
                .setTimestamp()
        );

        message.channel.send(`${user} has been unbanned`)

        return user.send(`You have been unbanned from ${message.guild.name} by ${message.author.tag} for ${reason}`).then(message.guild.members.unban(user.id));
    }
};