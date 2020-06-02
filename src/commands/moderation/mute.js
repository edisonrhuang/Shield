const commandStructure = require('../../utils/structures/commandStructure');
const { getUser, embed, noPermission } = require('../../utils/functions');
const { YELLOW } = require('../../config/hexColors');

module.exports = class mute extends commandStructure {
    constructor() {
        super('mute', 'moderation', []);
    }

    async run (client, message, args) {
        if (!message.member.hasPermission('MUTE_MEMBERS')) return noPermission(message);

        const user = getUser(message, args[0]);
        if (!user) return message.channel.send('Please enter a valid user').then(m => m.delete({timeout:5000}));

        let reason = args.slice(1).join(' ');
        if (!reason) reason = 'No Reason';

        const logChannel = message.guild.channels.cache.find(c => c.name === 'logs');
        logChannel.send(
            embed(client, message, null, YELLOW)
                .setAuthor(user.user.tag, user.user.displayAvatarURL())
                .setDescription(`
                **Action:** Mute
                **User:** ${user.user.tag} (${user.user.id})
                **Reason:** ${reason}`)
        );

        let muteRole = message.guild.roles.cache.find(r => r.name === 'Muted');

        if (!muteRole) {
            try {
                muteRole = await message.guild.roles.create({
                    data: {
                        name: 'Muted'
                    }
                })

                message.guild.channels.cache.forEach(channel => {
                    channel.overwritePermissions([{
                        id: muteRole.id,
                        deny: ['ADD_REACTIONS', 'ATTACH_FILES', 'SEND_MESSAGES', 'SEND_TTS_MESSAGES']
                    }])
                })
            } catch (err) {
                message.channel.send(`There was an error while unmuting ${user.user.tag}`);
                return console.log(err);
            }
        }

        user.roles.add(muteRole.id).then(
            user.send(`You have been muted in ${message.guild.name} by ${message.author.tag} for ${reason}`)
        )

        return message.channel.send(`${user.user.tag} has been muted`);
    }
}