const BaseEvent = require('../../structures/BaseEvent');
const StateManager = require('../../util/StateManager');
const guildPrefixes = new Map();

module.exports = class ReadyEvent extends BaseEvent {
    constructor() {
        super('ready');
        this.connection = StateManager.connection;
    }

    run(client) {
        client.guilds.cache.forEach(guild => {
            this.connection.query(`select prefix from config where guildID = '${guild.id}'`).then(result => {
                guildPrefixes.set(guild.id, result[0][0].prefix);
                StateManager.emit('fetchedPrefix', guild.id, result[0][0].prefix);
            }).catch(err => console.log(err));
        });

        return console.log(`${client.user.tag}: Online`)
    }
};