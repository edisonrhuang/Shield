const path = require('path');
const fs = require('fs').promises;
const commandStructure = require('./structures/commandStructure');
const eventStructure = require('./structures/eventStructure');

async function commandHandler(client, dir = '') {
    const filePath = path.join(__dirname, dir);
    const files = await fs.readdir(filePath);
    for (const file of files) {
        const stat = await fs.lstat(path.join(filePath, file));
        if (stat.isDirectory()) await commandHandler(client, path.join(dir, file));
        if (file.endsWith('.js')) {
            const command = require(path.join(filePath, file));
            if (command.prototype instanceof commandStructure) {
                const cmd = new command();
                client.commands.set(cmd.name, cmd);
                if (cmd.aliases) cmd.aliases.forEach(a => client.commands.set(a, cmd))
            }
        }
    }
}

async function eventHandler(client, dir = '') {
    const filePath = path.join(__dirname, dir);
    const files = await fs.readdir(filePath);
    for (const file of files) {
        const stat = await fs.lstat(path.join(filePath, file));
        if (stat.isDirectory()) await eventHandler(client, path.join(dir, file));
        if (file.endsWith('.js')) {
            const event = require(path.join(filePath, file));
            if (event.prototype instanceof eventStructure) {
                const evt = new event();
                client.on(evt.name, evt.run.bind(evt, client));
            }
        }
    }
}

module.exports = { commandHandler, eventHandler };