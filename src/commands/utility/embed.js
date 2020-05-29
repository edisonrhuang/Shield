const commandStructure = require('../../utils/structures/commandStructure');
const { MessageEmbed } = require('discord.js');
const { DEFAULT } = require('../../config/hexColors');

module.exports = class embed extends commandStructure {
    constructor() {
        super('embed', 'utility', ['embedmessage', 'em']);
    }

    async run (client, message, args) {
        await message.delete();

        if (!message.member.hasPermission(['MANAGE_MESSAGES'])) return message.channel.send('You do not have the proper permissions to use this command').then(m => m.delete({timeout:5000}));
        else if (!args[0]) return message.channel.send('Please provided text to embed').then(m => m.delete({timeout:5000}));

        let embed = new MessageEmbed()
            .setColor(DEFAULT)
            .setDescription(args)
            .setFooter(message.author.tag, message.author.displayAvatarURL())
            .setTimestamp();

        return message.channel.send(embed);
    }
};