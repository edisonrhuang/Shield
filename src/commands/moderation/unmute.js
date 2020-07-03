const BaseCommand = require('../../structures/BaseCommand');
const { getUser } = require('../../util/Util');
const { LIGHT_GREEN } = require('../../config/hexColors');
const { MessageEmbed } = require('discord.js');

module.exports = class UnmuteCommand extends BaseCommand {
    constructor() {
        super({
            name: 'unmute',
            category: 'moderation',
            aliases: null,
            description: 'Unmutes a user in the server',
            args: '[user] (reason)',
            userPermissions: ['MUTE_MEMBERS'],
        });
    }

    async run (client, message, args) {
        const user = getUser(message, args[0]);
        if (!user) return message.channel.send('Please enter a valid user').then(m => m.delete({timeout:5000}));

        let reason = args.slice(1).join(' ');
        if (!reason) reason = 'No Reason';

        const logChannel = message.guild.channels.cache.find(c => c.name === 'logs');
        logChannel.send(
            new MessageEmbed()
                .setColor(LIGHT_GREEN)
                .setAuthor(user.user.tag, user.user.displayAvatarURL())
                .setDescription(`
                **Action:** Unmute
                **User:** ${user.user.tag} (${user.user.id})
                **Reason:** ${reason}`)
                .setFooter(message.author.tag, message.author.displayAvatarURL())
                .setTimestamp()
        )

        let muteRole = message.guild.roles.cache.find(r => r.name === 'Muted');

        user.roles.remove(muteRole.id).then(
            user.send(`You have been unmuted in ${message.guild.name} by ${message.author.tag}`)
        )

        return message.channel.send(`${user.user.tag} has been unmuted`);
    }
}