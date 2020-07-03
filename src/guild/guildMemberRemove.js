const BaseEvent = require('../structures/BaseEvent');
const { MessageEmbed } = require('discord.js');
const { YELLOW } = require('../config/hexColors.json');

module.exports = class GuildMemberRemoveEvent extends BaseEvent {
    constructor() {
        super('guildMemberRemove');
    }

    run(client, member) {
        const memberLog = member.guild.channels.cache.find(c => c.name === 'member-logs')

        return memberLog.send(
            new MessageEmbed()
                .setAuthor(member.user.tag, member.user.displayAvatarURL())
                .setColor(YELLOW)
                .setFooter('User Left')
                .setTimestamp()
        )
    }
}