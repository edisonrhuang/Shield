const commandStructure = require('../../utils/structures/commandStructure');

module.exports = class reload extends commandStructure {
    constructor() {
        super('reload', 'owner', ['reset', 'reload']);
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
            message.channel.send(`Error: ${err}`).then(m => m.delete({timeout:10000}));
            return console.log(err);
        }
    }
}