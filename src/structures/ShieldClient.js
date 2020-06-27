const { Client, Collection } = require('discord.js');
const Util = require('../util/Util');
const { ErelaClient } = require('erela.js');
const StateManager = require('../util/StateManager');

module.exports = class ShieldClient extends Client {
    constructor(token) {
        super({ disableMentions: 'everyone' });

        this.token = token;
        this.commands = new Collection(); this.aliases = new Collection();
    }

    async start(token = this.token) {
        await Util.eventHandler(this, '../events');
        await Util.commandHandler(this, '../commands');

        await super.login(token);

        this.music = new ErelaClient(this, [{
            host: process.env.HOST,
            port: process.env.PORT,
            password: process.env.PASSWORD
        }]);

        return Util.eventHandler(this.music, '../events/erela');
    }
}