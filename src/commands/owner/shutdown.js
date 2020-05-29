const commandStructure = require('../../utils/structures/commandStructure');

module.exports = class shutdown extends commandStructure {
    constructor() {
        super('shutdown', 'owner', []);
    }

    async run (client, message) {
        try {
            console.log(`${client.user.tag}: Offline`)
            await message.channel.send('Shutting Down...');
            return process.exit();
        } catch (err) {
            message.channel.send(`Error: ${err}`).then(m => m.delete({timeout:10000}));
            return console.log(err);
        }
    }
};
