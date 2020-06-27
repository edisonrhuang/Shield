const BaseCommand = require('../../structures/BaseCommand');
const StateManager = require('../../util/StateManager');

module.exports = class SetPrefixCommand extends BaseCommand {
    constructor() {
        super({
            name: 'setprefix',
            category: 'utility',
            aliases: null,
            description: 'Sets the prefix for commands on the server',
            channel: 'bot-commands',
            args: '[prefix]',
            userPermissions: ['MANAGE_GUILD']
        });
        this.connection = StateManager.connection;
    }

    async run (client, message) {
        const [ cmdName, newPrefix ] = message.content.split(' ');
        if (newPrefix) {
            try {
                await this.connection.query(`UPDATE config SET prefix = '${newPrefix}' WHERE guildID = '${message.guild.id}'`);
                StateManager.emit('prefixUpdate', message.guild.id, newPrefix);
                return message.channel.send(`New Guild Prefix: ${newPrefix}`);
            } catch (err) {
                console.log(err);
                return message.channel.send('An error occurred while changing the prefix');
            }
        } else {
            return message.channel.send('Please provide a new prefix')
        }
    }
};