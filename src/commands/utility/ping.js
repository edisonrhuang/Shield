const commandStructure = require('../../utils/structures/commandStructure');

module.exports = class ping extends commandStructure {
    constructor() {
        super('ping', 'utility', []);
    }

    async run (client, message) {
        await message.delete();

        return message.channel.send('Pinging').then(msg => {
            const ping = msg.createdTimestamp - message.createdTimestamp;
            return msg.edit(`🏓 Pong! My ping is \`${ping}\`ms`);
        });
    }
};