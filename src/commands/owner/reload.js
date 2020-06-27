const BaseCommand = require('../../structures/BaseCommand');

module.exports = class ReloadCommand extends BaseCommand {
    constructor() {
        super({
            name: 'reload',
            category: 'owner',
            aliases: ['reset'],
            description: 'Reloads a command\'s cache',
            args: '[command]'
        });
    }

    run (client, message, args) {
        if (!args[0]) return message.channel.send('Please provide a command to reload').then(m => m.delete({timeout:5000}));

        const name = args[0].toLowerCase();
        const command = client.commands.get(name);
        const category = command.category;

        try {
            delete require.cache[require.resolve(`../../commands/${category}/${name}.js`)];
            client.commands.delete(name);
            const command = require(`../../commands/${category}/${name}.js`);
            client.commands.set(name, command);
            return message.channel.send(`Reloaded the \`${name}\` command`);
        } catch (err) {
            return message.channel.send(`Error: ${err}`).then(m => m.delete({timeout:10000}));
        }
    }
}