require('dotenv').config();
const { Client } = require('discord.js'); const client = new Client();

const stateManager = require('./utils/stateManager');

const { commandHandler, eventHandler } = require('./utils/handler');
client.commands = new Map();

client.login(process.env.DEV_TOKEN).then(r => console.log(`${client.user.tag}: Successfully logged in`));

commandHandler(client, '../commands');
eventHandler(client, '../events');
