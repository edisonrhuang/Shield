const BaseCommand = require('../../structures/BaseCommand');
const StateManager = require('../../util/StateManager');
const { embed, formatDate, uptime } = require('../../util/Util');
const guildPrefixes = new Map();
const os = require('os');

module.exports = class BotInfoCommand extends BaseCommand {
    constructor() {
        super({
            name:'botinfo',
            category: 'info',
            aliases: ['bot', 'binfo'],
            description: 'Gets basic information about the bot.',
            channel: 'bot-commands',
        });
        this.connection = StateManager.connection;
    }

    async run (client, message) {
        await message.delete();

        return message.channel.send(
            embed(client, message, `${client.user.tag} Info`)
                .setThumbnail(client.user.displayAvatarURL())
                .setDescription(`
                **[Bot Invite](https://discord.com/api/oauth2/authorize?client_id=704489233057972324&permissions=8&scope=bot)**
                **[Development Server](https://discord.gg/73mw3sX)**
                `)
                .addField('General Info', [
                    `**Client:** ${client.user.tag}`,
                    `**ID:** ${client.user.id}`,
                    `**Servers:** ${client.guilds.cache.size}`,
                    `**Users:** ${client.users.cache.size}`,
                    `**Library | Environment:** Discord.js v12.2.0 | Node.js v12.16.3`,
                    `**Database:** MySQL Server v8.0.20`,
                    `**Creation Date:** ${formatDate(client.user.createdAt)}`
                ])
                .addField('System Info', [
                    `**Uptime:** ${uptime(client.uptime)}`,
                    `**Platform:** ${process.platform}`,
                    `**CPU:**`,
                    `\u3000 -Cores: ${os.cpus().length}`,
                    `\u3000 -Model: ${os.cpus()[0].model}`,
                    `\u3000 -Speed: ${os.cpus()[0].speed}MHz`
                ])
        )
    }
}

StateManager.on('grabPrefix', (guildID, prefix) => {
    guildPrefixes.set(guildID, prefix);
})

StateManager.on('fetchedPrefix', (guildID, prefix) => {
    guildPrefixes.set(guildID, prefix);
})

StateManager.on('prefixUpdate', (guildID, prefix) => {
    guildPrefixes.set(guildID, prefix);
})