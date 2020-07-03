const BaseEvent = require('../structures/BaseEvent');
const StateManager = require('../util/StateManager');

module.exports = class GuildCreateEvent extends BaseEvent {
    constructor() {
        super('guildCreate');
        this.connection = StateManager.connection;
    }

    async run (client, guild) {
        this.connection = await require('../database/connection');

        try {
            await this.connection.query(`insert into guilds values ('${guild.id}', '${guild.ownerID}')`);
            await this.connection.query(`insert into config (guildID) values ('${guild.id}')`);
        } catch (err) {
            return console.log(err)
        }
    }
};