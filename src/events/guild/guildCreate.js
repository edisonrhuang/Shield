const eventStructure = require('../../utils/structures/eventStructure');
const stateManager = require('../../utils/stateManager');

module.exports = class guildCreate extends eventStructure {
    constructor() {
        super('guildCreate');
        this.connection = stateManager.connection;
    }

    async run (client, guild) {
        this.connection = await require('../../database/connection');

        try {
            await this.connection.query(`insert into guilds values ('${guild.id}', '${guild.ownerID}'`);
            await this.connection.query(`insert into config (guildID) values ('${guild.id}')`);
        } catch (err) {
            return console.log(err)
        }
    }
};