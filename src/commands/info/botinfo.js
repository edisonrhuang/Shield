const commandStructure = require('../../utils/structures/commandStructure');
const stateManager = require('../../utils/stateManager');
const { embed, formatDate, uptime } = require('../../utils/functions');
const guildPrefixes = new Map();

module.exports = class botInfo extends commandStructure {
    constructor() {
        super('botinfo', 'info', ['bot']);
        this.connection = stateManager.connection;
    }

    async run (client, message) {
        await message.delete();

        return message.channel.send(
            embed(client, message, `${client.user.tag} Info`)
                .setThumbnail(client.user.displayAvatarURL())
                .setDescription(`
                **[Bot Invite Link](https://discord.com/api/oauth2/authorize?client_id=704489233057972324&permissions=8&scope=bot)**
                
                **Prefix:** ${guildPrefixes.get(message.guild.id)}
                **Servers Joined:** ${client.guilds.cache.size}
                **Users Watching:** ${client.users.cache.size}
                **Uptime:** ${uptime(client.uptime)}
                **Creation Date:** ${formatDate(client.user.createdAt)}
                `)
        )
    }
}

stateManager.on('fetchedPrefix', (guildID, prefix) => {
    guildPrefixes.set(guildID, prefix);
})

stateManager.on('prefixUpdate', (guildID, prefix) => {
    guildPrefixes.set(guildID, prefix);
})