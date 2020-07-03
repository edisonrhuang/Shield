const BaseCommand = require('../../structures/BaseCommand');
const { getUser } = require('../../util/Util');
const { YELLOW } = require('../../config/hexColors');
const { MessageEmbed } = require('discord.js')

module.exports = class MuteCommand extends BaseCommand {
    constructor() {
        super({
            name: 'mute',
            category: 'moderation',
            aliases: null,
            description: 'Mutes a user in the server',
            args: '[user] (reason)',
            userPermissions: ['MUTE_MEMBERS'],
        });
    }

    async run (client, message, args) {
        const user = getUser(message, args[0]);
        if (!user) return message.channel.send('Please enter a valid user').then(m => m.delete({timeout:5000}));

        let reason = args.slice(1).join(' ');
        if (!reason) reason = 'No Reason';

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
                return message.channel.send(`An error occurred while unmuting ${user.user.tag}`);
            }
        }

        user.roles.add(muteRole.id).then(
            user.send(`You have been muted in ${message.guild.name} by ${message.author.tag} for ${reason}`)
        )

        const logChannel = message.guild.channels.cache.find(c => c.name === 'logs');
        logChannel.send(
            new MessageEmbed()
                .setColor(YELLOW)
                .setAuthor(user.user.tag, user.user.displayAvatarURL())
                .setDescription(`
                **Action:** Mute
                **User:** ${user.user.tag} (${user.user.id})
                **Reason:** ${reason}`)
                .setFooter(message.author.tag, message.author.displayAvatarURL())
                .setTimestamp()
        );

        return message.channel.send(`${user.user.tag} has been muted`);
    }
}