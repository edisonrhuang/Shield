require('dotenv').config();
const { Client } = require('discord.js'); const client = new Client();
const { ErelaClient } = require('erela.js');
const stateManager = require('./utils/stateManager');
const { commandHandler, eventHandler } = require('./utils/handler');
client.commands = new Map();

(async () => {
    await client.login(process.env.BOT_TOKEN);

    client.music = new ErelaClient(client, [{
        host: process.env.HOST,
        port: process.env.PORT,
        password: process.env.PASSWORD
    }]);

    await eventHandler(client.music, '../events/erela');
    await commandHandler(client, '../commands');
})();

eventHandler(client, '../events').then();