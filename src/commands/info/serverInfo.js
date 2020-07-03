const BaseCommand = require('../../structures/BaseCommand');
const { DEFAULT } = require('../../config/hexColors.json');
const { formatDate } = require('../../util/Util');
const { MessageEmbed } = require('discord.js')

const verificationLevels = {NONE: 'None', LOW: 'Low', MEDIUM: 'Medium', HIGH: 'High', VERY_HIGH: 'Very High'};

const regions = {
    'us-central': 'US Central :flag_us:',
    'us-east': 'US East :flag_us:',
    'us-south': 'US South :flag_us:',
    'us-west': 'US West :flag_us:',
    'eu-west': 'EU West :flag_eu:',
    'eu-central': 'EU Central :flag_eu:',
    singapore: 'Singapore :flag_sg:',
    london: 'London :flag_gb:',
    japan: 'Japan :flag_jp:',
    russia: 'Russia :flag_ru:',
    hongkong: 'Hong Kong :flag_hk:',
    brazil: 'Brazil :flag_br:',
    sydney: 'Sydney :flag_au:',
    southafrica: 'South Africa :flag_za:'
};

module.exports = class ServerInfoCommand extends BaseCommand {
    constructor() {
        super({
            name:'serverinfo',
            category: 'info',
            aliases: ['server', 'sinfo'],
            description: 'Gets basic information about the server',
            channel: 'bot-commands',
        });
    }

    async run (client, message) {
        const members = message.guild.members.cache;
        const channels = message.guild.channels.cache;
        const roles = message.guild.roles.cache;
        const emojis = message.guild.emojis.cache;

        return message.channel.send(
            new MessageEmbed()
                .setColor(DEFAULT)
                .setTitle(`${message.guild.name} Info`)
                .setThumbnail(message.guild.iconURL({ dynamic: true }))
                .addField('General Info', [
                    `**Name:** ${message.guild.name}`,
                    `**ID:** ${message.guild.id}`,
                    `**Owner:** ${message.guild.owner} ${message.guild.owner.id}`,
                    `**Region:** ${regions[message.guild.region]}`,
                    `**Verification Level:** ${verificationLevels[message.guild.verificationLevel]}`,
                    `**Created On:** ${formatDate(message.guild.createdAt)}`
                ])
                .addField('Stats', [
                    `**Total Members:** ${message.guild.memberCount}`,
                    `**Humans:** ${members.filter(m => !m.user.bot).size}`,
                    `**Bots:** ${members.filter(m => m.user.bot).size}`,
                    `**Text Channels:** ${channels.filter(c => c.type === 'text').size}`,
                    `**Voice Channels:** ${channels.filter(c => c.type === 'voice').size}`,
                    `**Emoji Count:** ${emojis.size}`,
                    `**Role Count:** ${roles.size}`
                ])
        )
    }
}