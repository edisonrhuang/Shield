const BaseCommand = require('../../structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const { DEFAULT } = require('../../config/hexColors.json');

module.exports = class UptimeCommand extends BaseCommand {
    constructor() {
        super({
            name: 'uptime',
            category: 'utility',
            aliases: null,
            description: 'Displays how long the bot has been online',
            channel: 'bot-commands'
        });
    }

    async run(client, message) {
        await message.delete();

        function duration(ms) {
            const sec = Math.floor(ms / 1000 % 60).toString();
            const min = Math.floor(ms / (1000 * 60) % 60).toString();
            const hrs = Math.floor(ms / (1000 * 60 * 60) % 60).toString();
            const days = Math.floor(ms / (1000 * 60 * 60 * 24) % 60).toString();

            return new MessageEmbed()
                .setColor(DEFAULT)
                .setAuthor('Uptime', client.user.displayAvatarURL({dynamic: true}))
                .setDescription(`
                **Days:** ${days.padStart(1, '0')}
                **Hours:** ${hrs.padStart(2, '0')}
                **Minutes:** ${min.padStart(2, '0')}
                **Seconds:** ${sec.padStart(2, '0')}`)
                .setFooter(message.author.tag, message.author.displayAvatarURL())
                .setTimestamp()
        }

        return message.channel.send(duration(client.uptime));
    }
}