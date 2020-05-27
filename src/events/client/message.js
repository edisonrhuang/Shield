const eventStructure = require('../../utils/structures/eventStructure');
const stateManager = require('../../utils/stateManager');
const { MessageEmbed } = require('discord.js');
const { YELLOW } = require('../../config/hexColors');
const guildPrefixes = new Map();

module.exports = class message extends eventStructure {
    constructor() {
        super('message');
        this.connection = stateManager.connection;
    }

    run (client, message) {
        if (message.author.bot) return;
        const prefix = guildPrefixes.get(message.guild.id);
        const usedPrefix = message.content.slice(0, prefix.length);

        if (prefix === usedPrefix) {
            const [name, ...args] = message.content.slice(prefix.length).split(/\s+/);
            const command = client.commands.get(name);

            if (command && command.category === 'music') {
                const musicChannel = message.guild.channels.cache.find(c => c.name === 'music-commands');
                if (!musicChannel) return missingChannel(client, message, musicChannel);
                else if (message.channel.id !== musicChannel.id) return incorrectChannel(client, message, musicChannel);
                else command.run(client, message, args);
            } else if (command) {
                const botChannel = message.guild.channels.cache.find(c => c.name === 'bot-commands');
                if (!botChannel) return missingChannel(client, message, botChannel);
                else if (message.channel.id !== botChannel.id) return incorrectChannel(client, message, botChannel);
                else command.run(client, message, args)
            }
        }
    }
};

stateManager.on('fetchedPrefix', (guildID, prefix) => {
    guildPrefixes.set(guildID, prefix);
});

stateManager.on('prefixUpdate', (guildID, prefix) => {
    guildPrefixes.set(guildID, prefix);
});

//Embed doesnt work
const embed = new MessageEmbed()
    .setColor(YELLOW)
    .setTimestamp();

function missingChannel (client, message, channel) {
    embed.setAuthor('Missing Channel', client.user.displayAvatarURL());
    embed.setDescription(`Please create or ask a server admin to create the #${channel} channel for proper usage of this command`);

    return message.channel.send(embed).then(m => m.delete({timeout:5000}));
}

function incorrectChannel (client, message, channel) {
    embed.setAuthor('Incorrect Channel', client.user.displayAvatarURL());
    embed.setDescription(`Please use the #${channel} for proper usage of this command`);

    return message.channel.send(embed).then(m => m.delete({timeout:5000}));
}