const eventStructure = require('../../utils/structures/eventStructure');
const stateManager = require('../../utils/stateManager');
const { embed } = require('../../utils/functions');
const { YELLOW } = require('../../config/hexColors');
require('dotenv').config();
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

            if (command && command.category === 'moderation') {
                const logsChannel = message.guild.channels.cache.find(c => c.name === 'logs')
                if(!logsChannel) return missingChannel(client, message, 'logs');

                command.run(client, message, args);
            } else if (command && command.category === 'music') {
                const musicChannel = message.guild.channels.cache.find(c => c.name === 'music-commands');
                if (!musicChannel) return missingChannel(client, message, 'music-commands');
                else if (message.channel.id !== musicChannel.id) return incorrectChannel(client, message, musicChannel);

                command.run(client, message, args);
            } else if (command && command.category === 'owner') {
                if (message.author.id !== process.env.BOT_OWNER_ID) return;

                command.run(client, message, args);
            } else if (command) {
                const botChannel = message.guild.channels.cache.find(c => c.name === 'bot-commands');
                if (!botChannel) return missingChannel(client, message, 'bot-commands');
                else if (message.channel.id !== botChannel.id) return incorrectChannel(client, message, botChannel);

                command.run(client, message, args)
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

function missingChannel (client, message, channel) {
    return message.channel.send(
        embed(client, message, 'Missing Channel', YELLOW)
            .setDescription(`Please create a #${channel} channel for this command to function properly`)
    ).then(m => m.delete({timeout:5000}));
}

function incorrectChannel (client, message, channel) {
    return message.channel.send(
        embed(client, message, 'Incorrect Channel', YELLOW)
            .setDescription(`Please use this command in #${channel}`)
    ).then(m => m.delete({timeout:5000}));
}