const BaseEvent = require('../../structures/BaseEvent');
const stateManager = require('../../util/StateManager');
const { missingChannel, incorrectChannel } = require('../../util/Util');
const guildPrefixes = new Map();

module.exports = class MessageEvent extends BaseEvent {
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
            const command = client.commands.get(name) || client.aliases.get(name);

            if (command && command.overwritePermission(message)) {
                return command.run(client, message, args);
            } else {
                if (command && command.checkPermission(message)) {
                    stateManager.emit('grabPrefix', message.guild.id, guildPrefixes.get(message.guild.id))
                    if (command && command.checkChannel(message)) {
                        if (command && command.category === 'moderation') {
                            const logChannel = message.guild.channels.cache.find(c => c.name === 'logs');
                            if (!logChannel) return missingChannel(client, message, 'logs');
                            return command.run(client, message, args);
                        } else if (command && command.category === 'owner') {
                            if (message.author.id !== process.env.BOT_OWNER_ID) return;
                            return command.run(client, message, args);
                        } else if (command) {
                            return command.run(client, message, args);
                        }
                    } else {
                        if (!command.channel) return missingChannel(client, message, command.channel)
                        return incorrectChannel(message, command.channel)
                    }
                } else if (command){
                    return message.channel.send('You do not have permission to use this command');
                }
            }
        }

        if (message.content.toLowerCase() === 'kazuma kazuma') {
            return message.channel.send('Hai, Kazuma desu.');
        }

    }
};

stateManager.on('fetchedPrefix', (guildID, prefix) => {
    guildPrefixes.set(guildID, prefix);
});

stateManager.on('prefixUpdate', (guildID, prefix) => {
    guildPrefixes.set(guildID, prefix);
});