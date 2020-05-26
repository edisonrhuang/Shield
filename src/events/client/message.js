const eventStructure = require('../../utils/structures/eventStructure');
const stateManager = require('../../utils/stateManager');
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
            if (command) {
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
