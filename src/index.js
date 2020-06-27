require('dotenv').config();
const { BOT_TOKEN, DEV_TOKEN } = process.env
const ShieldClient = require('./structures/ShieldClient');
const client = new ShieldClient(DEV_TOKEN);

(async () => {
    return client.start();
})()