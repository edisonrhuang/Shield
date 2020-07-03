const BaseEvent = require('../structures/BaseEvent');
const { MessageEmbed } = require('discord.js');
const { LIGHT_GREEN } = require('../config/hexColors.json');

module.exports = class GuildMemberAddEvent extends BaseEvent {
    constructor() {
        super('guildMemberAdd');
    }

    run (client, member) {
        const memberLog = member.guild.channels.cache.find(c => c.name === 'member-logs');

        return memberLog.send(
            new MessageEmbed()
                .setAuthor(member.user.tag, member.user.displayAvatarURL())
                .setColor(LIGHT_GREEN)
                .setFooter('User Joined')
                .setTimestamp()
        );
    }
}