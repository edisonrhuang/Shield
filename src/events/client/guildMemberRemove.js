const BaseEvent = require('../../structures/BaseEvent');
const { MessageEmbed } = require('discord.js');
const { YELLOW } = require('../../config/hexColors');

module.exports = class GuildMemberRemoveEvent extends BaseEvent {
    constructor() {
        super('guildMemberRemove');
    }

    run(client, member) {
        const memberLog = member.guild.channels.cache.find(c => c.name === 'member-logs')

        const embed = new MessageEmbed()
            .setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
            .setColor(YELLOW)
            .setFooter('User Left')
            .setTimestamp();

        return memberLog.send(embed)
    }
}