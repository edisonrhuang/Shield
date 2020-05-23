const commandStructure = require('../../utils/structures/commandStructure');
const { MessageEmbed } = require('discord.js');
const { DEFAULT } = require('../../config/hexColors');

module.exports = class ping extends commandStructure {
    constructor() {
        super('ping', 'utilities', []);
    }

    async run (client, message) {
        await message.delete();

        const embed = new MessageEmbed()
            .setColor(DEFAULT)
            .setAuthor('Latency', client.user.displayAvatarURL())
            .setFooter(message.author.tag, message.author.displayAvatarURL())
            .setTimestamp();

        return message.channel.send('Pinging').then(msg => {
            const ping = msg.createdTimestamp - message.createdTimestamp;
            embed.setDescription(`**❯ Bot Latency:** \`${ping}\`\n**❯API Latency:** \`${Math.round(client.ping)}\``);
            return msg.edit(embed);
        });
    }
};