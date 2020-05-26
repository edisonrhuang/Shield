const commandStructure = require('../../utils/structures/commandStructure');
const stateManager = require('../../utils/stateManager');

module.exports = class prefix extends commandStructure {
    constructor() {
        super('prefix', 'owner', ['sp', 'setprefix']);
        this.connection = stateManager.connection;
    }

    async run (client, message, args) {
        if (message.member.id === message.guild.ownerID) {
            const [ cmdName, newPrefix ] = message.content.split(' ');
            if (newPrefix) {
                try {
                    await this.connection.query(`UPDATE config SET prefix = '${newPrefix}' WHERE guildID = '${message.guild.id}'`);
                    stateManager.emit('prefixUpdate', message.guild.id, newPrefix);
                    return message.channel.send(`New Guild Prefix: ${newPrefix}`);
                } catch (err) {
                    console.log(err);
                    return message.channel.send('An error occurred while changing the prefix');
                }
            } else {
                return message.channel.send('Please provide a new prefix')
            }
        } else {
            return message.channel.send('Invalid permissions to change prefix');
        }
    }
};