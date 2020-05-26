const eventStructure = require('../../utils/structures/eventStructure');
const stateManager = require('../../utils/stateManager');
const guildPrefixes = new Map();

module.exports = class ready extends eventStructure {
    constructor() {
        super('ready');
        this.connection = stateManager.connection;
    }

    run(client) {
        client.guilds.cache.forEach(guild => {
            this.connection.query(`select prefix from config where guildID = '${guild.id}'`).then(result => {
                guildPrefixes.set(guild.id, result[0][0].prefix);
                stateManager.emit('fetchedPrefix', guild.id, result[0][0].prefix);
            }).catch(err => console.log(err));
        });

        return console.log(`${client.user.tag}: Online`)
    }
};