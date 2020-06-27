const BaseEvent = require('../../structures/BaseEvent');
const { MessageEmbed } = require('discord.js');
const { LIGHT_GREEN } = require('../../config/hexColors');

module.exports = class GuildMemberAddEvent extends BaseEvent {
    constructor() {
        super('guildMemberAdd');
    }

    run (client, member) {
        const memberLog = member.guild.channels.cache.find(c => c.name === 'member-logs');

        const embed = new MessageEmbed()
            .setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
            .setColor(LIGHT_GREEN)
            .setFooter('User Joined')
            .setTimestamp();

        return memberLog.send(embed);
    }
}