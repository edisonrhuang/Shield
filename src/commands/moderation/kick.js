const BaseCommand = require('../../structures/BaseCommand');
const { getUser } = require('../../util/Util');
const { ORANGE } = require('../../config/hexColors');
const { MessageEmbed } = require('discord.js');

module.exports = class KickCommand extends BaseCommand {
    constructor() {
        super({
            name: 'kick',
            category: 'moderation',
            aliases: null,
            description: 'Kicks user from the server',
            args: '[user] (reason)',
            userPermissions: ['KICK_MEMBERS'],
        });
    }

    run (client, message, args) {
        const user = getUser(message, args[0]);
        if (!user) return message.channel.send('Please enter a valid user').then(m => m.delete({timeout:5000}));

        let reason = args.slice(1).join(' ');
        if (!reason) reason = 'No Reason';

        const logChannel = message.guild.channels.cache.find(c => c.name === 'logs');
        logChannel.send(
            new MessageEmbed()
                .setColor(ORANGE)
                .setAuthor(user.user.tag, user.user.displayAvatarURL())
                .setDescription(`
                **Action:** Kick
                **User:** ${user.user.tag} (${user.user.id})
                **Reason:** ${reason}`)
                .setFooter(message.author.tag, message.author.displayAvatarURL())
                .setTimestamp()
        )

        message.channel.send(`${user.user.tag} has been kicked`)

        return user.send(`You have been kicked from ${message.guild.name} by ${message.author.tag} for ${reason}`).then(message.guild.member(user).kick())
    }
};