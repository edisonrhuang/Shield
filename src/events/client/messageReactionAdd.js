const BaseEvent = require('../../structures/BaseEvent');

module.exports = class MessageReactionAddEvent extends BaseEvent {
    constructor() {
        super('messageReactionAdd');
    }

    async run (client, reaction, user) {
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();

        if (user.bot) return;
        if (!reaction.message.guild) return;

        if (reaction.message.channel.id === '719952400395272313') {
            if (reaction.emoji.name === '✅') {
                return reaction.message.guild.members.cache.get(user.id).roles.add('719948968166948885')
            }
        }
    }
}