const commandStructure = require('../../utils/structures/commandStructure');
const { getUser, embed } = require('../../utils/functions');
const { YELLOW } = require('../../config/hexColors');

module.exports = class report extends commandStructure {
    constructor() {
        super('report', 'moderation', []);
    }

    async run (client, message, args) {
        await message.delete();

        const user = getUser(message, args[0]);
        if (!user) return message.channel.send('Please enter a valid user').then(m => m.delete({timeout:5000}));

        const reason = args.slice(1).join(' ');
        if (!reason) return message.channel.send('Please provide a reason for your report').then(m => m.delete({timeout:5000}));

        const reportChannel = message.guild.channels.cache.find(c => c.name === 'reports');
        if (!reportChannel) return missingChannel(client, message, 'reports');

        reportChannel.send(
            embed(client, message, null, YELLOW)
                .setAuthor(user.user.tag, user.user.displayAvatarURL())
                .setDescription(`
                **Action:** Report
                **User:** ${user.user.tag} ${user.user.id}
                **Reason:** ${reason}
                `)
        ).then(async m => {
            await m.react('✅');
            await m.react('❌')
        });

        return message.channel.send(`${user.user.tag} has been reported by ${message.author.tag}`);
    }
}

function missingChannel (client, message, channel) {
    return message.channel.send(
        embed(client, message, 'Missing Channel', YELLOW)
            .setDescription(`Please create a #${channel} channel for this command to function properly`)
    )
}