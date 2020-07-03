const BaseCommand = require('../../structures/BaseCommand');
const { getUser } = require('../../util/Util');
const { RED } = require('../../config/hexColors.json')
const { MessageEmbed } = require('discord.js');

module.exports = class BanCommand extends BaseCommand {
    constructor() {
        super({
            name: 'ban',
            category: 'moderation',
            aliases: null,
            description: 'Bans user from the server',
            args: '[user] (reason)',
            userPermissions: ['BAN_MEMBERS'],
        });
    }

    run (client, message, args) {
        const user = getUser(message, args[0]);
        if (!user) return message.channel.send('Please enter a valid user').then(m => m.delete({timeout: 5000}));

        let reason = args.slice(1).join(' ');
        if (!reason) reason = 'No Reason';

        const logChannel = message.guild.channels.cache.find(c => c.name === 'logs');
        logChannel.send(
            new MessageEmbed()
                .setColor(RED)
                .setAuthor(user.user.tag, user.user.displayAvatarURL())
                .setDescription(`
                **Action:** Ban
                **User:** ${user.user.tag} (${user.user.id})
                **Reason:** ${reason}`)
                .setFooter(message.author.tag, message.author.displayAvatarURL())
                .setTimestamp()
        );

        message.channel.send(`${user} has been banned`)

        return user.send(`You have been banned from ${message.guild.name} by ${message.author.tag} for ${reason}`).then(message.guild.member(user).ban(reason));
    }
};