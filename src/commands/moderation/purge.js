const commandStructure = require('../../utils/structures/commandStructure');
const { MessageEmbed } = require('discord.js');
const { YELLOW } = require('../../config/hexColors');

module.exports = class purge extends commandStructure {
    constructor() {
        super('purge', 'moderation', ['clear']);
    }

    async run (client, message, args) {
        await message.delete();

        if (!message.member.hasPermission(['MANAGE_MESSAGES'])) return message.channel.send('You do not have permission to use this command').then(m => m.delete({timeout:5000}));
        if (!args[0]) return message.channel.send('Please provide the amount of messages to purge').then(m => m.delete({timeout:5000}));

        return message.channel.bulkDelete(args[0]).then(() => {
            const embed = new MessageEmbed()
                .setColor(YELLOW)
                .setAuthor('Message Purged', client.user.displayAvatarURL())
                .setDescription(`**${args[0]}** messages deleted`)
                .setFooter(message.author.tag, message.author.displayAvatarURL())
                .setTimestamp();

            return message.channel.send(embed);
        }).catch(err => message.channel.send(err));
    }
};