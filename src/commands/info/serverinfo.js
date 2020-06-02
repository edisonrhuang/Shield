const commandStructure = require('../../utils/structures/commandStructure');
const { embed, formatDate } = require('../../utils/functions');

module.exports = class serverInfo extends commandStructure {
    constructor() {
        super('serverinfo', 'info', ['server']);
    }

    async run (client, message) {
        await message.delete();

        return message.channel.send(
            embed(client, message)
                .setAuthor(`${message.guild.name} Info`, message.guild.iconURL())
                .setThumbnail(message.guild.iconURL())
                .setDescription(`
                **Server Name:** ${message.guild.name}
                **Server Creator:** ${message.guild.owner}
                **Total Members:** ${message.guild.memberCount}
                **Region:** ${message.guild.region}
                **Created On:** ${formatDate(message.guild.createdAt)}
                **You Joined On:** ${formatDate(message.member.joinedAt)}
                `)
        )
    }
}