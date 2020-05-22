require('dotenv').config();
const { Client } = require('discord.js'); const client = new Client();

(async () => {
    await client.login(process.env.DEV_TOKEN);
})