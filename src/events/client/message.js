const eventStructure = require('../../utils/structures/eventStructure');

module.exports = class message extends eventStructure {
    constructor() {
        super('message');
    }

    run (client, message) {
        if (message.author.bot) return;
        const prefix = '?';

        if (message.content.startsWith(prefix)) {
            const [name, ...args] = message.content.slice(prefix.length).split(/\s+/);
            const command = client.commands.get(name);
            if (command) {
                command.run(client, message, args)
            }
        }
    }
};