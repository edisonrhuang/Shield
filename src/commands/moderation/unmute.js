const commandStructure = require('../../utils/structures/commandStructure');
const { getUser, embed, noPermission } = require('../../utils/functions');
const { GREEN } = require('../../config/hexColors');

module.exports = class unmute extends commandStructure {
    constructor() {
        super('unmute', 'moderation', []);
    }

    async run (client, message, args) {
        if (!message.member.hasPermission('MUTE_MEMBERS')) return noPermission(message);

        const user = getUser(message, args[0]);
        if (!user) return message.channel.send('Please enter a valid user').then(m => m.delete({timeout:5000}));

        let reason = args.slice(1).join(' ');
        if (!reason) reason = 'No Reason';

        const logChannel = message.guild.channels.cache.find(c => c.name === 'logs');
        logChannel.send(
            embed(client, message, null, GREEN)
                .setAuthor(user.user.tag, user.user.displayAvatarURL())
                .setDescription(`
                **Action:** Unmute
                **User:** ${user.user.tag} (${user.user.id})
                **Reason:** ${reason}`)
        )

        let muteRole = message.guild.roles.cache.find(r => r.name === 'Muted');

        user.roles.remove(muteRole.id).then(
            user.send(`You have been unmuted in ${message.guild.name} by ${message.author.tag}`)
        )

        return message.channel.send(`${user.user.tag} has been unmuted`);
    }
}