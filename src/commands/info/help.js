const BaseCommand = require('../../structures/BaseCommand');
const StateManager = require('../../util/StateManager');
const { DEFAULT } = require('../../config/hexColors.json');
const { readdirSync } = require('fs');
const { MessageEmbed } = require('discord.js');
const guildPrefixes = new Map();

module.exports = class HelpCommand extends BaseCommand {
    constructor() {
        super({
            name:'help',
            category: 'info',
            aliases: null,
            description: 'Gets the list of commands or detailed information about a command',
            channel: 'bot-commands',
            args: '(command)',
        });
        this.connection = StateManager.connection;
    }

    async run (client, message, args) {
        if (!args[0]) {
            const groups = readdirSync('./src/commands/');
            const commands = (category) => {
                return client.commands
                    .filter(cmd => cmd.category === category)
                    .map(cmd => `\`${cmd.name}\``)
                    .join(' ');
            }
            const category = groups
                .map(cat => `**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(cat)}`)
                .reduce((string, category) => string + '\n' + category);


            return message.channel.send(
                new MessageEmbed()
                    .setColor(DEFAULT)
                    .setTitle(`${client.user.username} Help`)
                    .setDescription(`My prefix for this server is: **${guildPrefixes.get(message.guild.id)}**
                    Command Arguments: \`[]\` is required & \`()\` is optional
                    
                    ${category}`)
            );
        } else if (args[0]) {
            let command = client.commands.get(args[0].toLowerCase()) || client.aliases.get(args[0]);
            if (!command) return message.channel.send(`Please enter a valid command. Use ${guildPrefixes.get(message.guild.id)}help for a list of commands`).then(m => m.delete({timeout: 5000}))

            const prefix = guildPrefixes.get(message.guild.id)

            return message.channel.send(
                new MessageEmbed()
                    .setColor(DEFAULT)
                    .setTitle(`${prefix}${command.name} ${command.args ? command.args : ''}`)
                    .setDescription(`
                    **Aliases:** ${command.aliases ? command.aliases.join(', ') : 'No Aliases'}
                    **Category:** ${command.category.slice(0, 1).toUpperCase() + command.category.slice(1)}
                    **Description:** ${command.description}
                    **Channel Limitation:** ${command.channel ? `#${command.channel}` : 'None'}
                    **Permission Limitation:** ${command.userPermissions ? `${command.userPermissions.join(', ')}` : 'None'}`)
            );
        }
    }
}

StateManager.on('grabPrefix', (guildID, prefix) => {
    guildPrefixes.set(guildID, prefix);
})

StateManager.on('fetchedPrefix', (guildID, prefix) => {
    guildPrefixes.set(guildID, prefix);
})

StateManager.on('prefixUpdate', (guildID, prefix) => {
    guildPrefixes.set(guildID, prefix);
})