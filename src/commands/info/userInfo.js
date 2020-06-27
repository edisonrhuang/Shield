const BaseCommand = require('../../structures/BaseCommand');
const { getUser, embed, formatDate } = require('../../util/Util');

const status = {
    online: 'Online',
    idle: 'Away',
    offline: 'Offline',
    dnd: 'Do Not Disturb',
}

const flags = {
    DISCORD_EMPLOYEE: 'Discord Employee',
    DISCORD_PARTNER: 'Discord Partner',
    BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
    BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
    HYPESQUAD_EVENTS: 'HypeSquad Events',
    HOUSE_BRAVERY: 'House of Bravery',
    HOUSE_BRILLIANCE: 'House of Brilliance',
    HOUSE_BALANCE: 'House of Balance',
    EARLY_SUPPORTER: 'Early Supporter',
    TEAM_USER: 'Team User',
    SYSTEM: 'System',
    VERIFIED_BOT: 'Verified Bot',
    VERIFIED_DEVELOPER: 'Verified Bot Developer'
};

module.exports = class UserInfoCommand extends BaseCommand {
    constructor() {
        super({
            name: 'userinfo',
            category: 'info',
            aliases: ['user', 'uinfo'],
            description: 'Gets basic information about a user',
            channel: 'bot-commands',
            args: '(user)',
        });
    }

    async run (client, message, args) {
        await message.delete();

        let userFlags;

        if (!args[0]) {
            userFlags = message.author.flags.toArray();
            return message.channel.send(
                embed(client, message)
                    .setAuthor(message.author.tag, message.author.displayAvatarURL())
                    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`
                    **Username:** ${message.author.username}
                    **Discriminator:** ${message.author.discriminator}
                    **ID:** ${message.author.id}
                    **Status:** ${status[message.author.presence.status]}
                    **Flags:** ${userFlags.length ? userFlags.map(f => flags[f]).join(', ') : 'None'}
                    **Avatar:** [Avatar Link](${message.author.displayAvatarURL({ dynamic: true })})
                    **Joined On:** ${formatDate(message.member.joinedAt)}
                    **Joined Discord On:** ${formatDate(message.member.user.createdAt)}`)

            )
        }

        const user = getUser(message, args.join(' '));
        if (!user) return message.channel.send('Please enter a valid user').then(m => m.delete({timeout:5000}));

        if (user.user.bot) userFlags = [];
        else userFlags = user.user.flags.toArray();

        return message.channel.send(
            embed(client, message)
                .setAuthor(user.user.tag, user.user.displayAvatarURL())
                .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
                .setDescription(`
                **Username:** ${user.user.username}
                **Discriminator:** ${user.user.discriminator}
                **ID:** ${user.user.id}
                **Status:** ${status[user.user.presence.status]}
                **Flags:** ${userFlags.length ? userFlags.map(f => flags[f]).join(', ') : 'None'}
                **Avatar:** [Avatar Link](${user.user.displayAvatarURL({ dynamic: true })})
                **Joined Server On:** ${formatDate(user.user.joinedAt)}
                **Joined Discord On:** ${formatDate(user.user.createdAt)}
                **Bot?** ${user.user.bot ? 'Yes' : 'No'}`)
        )
    }
}