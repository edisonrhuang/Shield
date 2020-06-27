const { MessageEmbed } = require('discord.js');
const path = require('path');
const fs = require('fs').promises;
const BaseCommand = require('../structures/BaseCommand');
const BaseEvent = require('../structures/BaseEvent');
const { DEFAULT, YELLOW } = require('../config/hexColors');

module.exports = class Util {
    static getUser (message, user = '') {
        user = user.toLowerCase();
        let findUser = message.guild.members.cache.get(user);
        if (!findUser && message.mentions.member) findUser = message.mentions.members.first();
        if (!findUser && user) {
            findUser = message.guild.members.cache.find(member => {
                return member.displayName.toLowerCase().includes(user) || member.user.tag.toLowerCase().includes(user);
            })
        }
        return findUser;
    }

    static embed (client, message, title, color) {
        return new MessageEmbed()
            .setColor(color || DEFAULT)
            .setAuthor(title || client.user.tag, client.user.displayAvatarURL())
            .setFooter(message.author.tag, message.author.displayAvatarURL())
            .setTimestamp();
    }

    static formatDate (date) {
        return new Intl.DateTimeFormat('en-US').format(date);
    }

    static uptime (ms) {
        const sec = Math.floor(ms / 1000 % 60).toString();
        const min = Math.floor(ms / (1000 * 60) % 60).toString();
        const hrs = Math.floor(ms / (1000 * 60 * 60) % 60).toString();
        const days = Math.floor(ms / (1000 * 60 * 60 * 24) % 60).toString();

        return `${days.padStart(1, '0')} days, ${hrs.padStart(2, '0')} hours, ${min.padStart(2, '0')} minutes, ${sec.padStart(2, '0')} seconds`;
    }

    static missingChannel (client, message, channel) {
        return message.channel.send(this.embed(client, message, 'Missing Channel', YELLOW)
            .setDescription(`Please create a #${channel} channel for this command to function properly`)
        ).then(m => m.delete({ timeout: 5000 }))
    }

    static incorrectChannel (client, message, channel) {
        return message.channel.send(this.embed(client, message, 'Incorrect Channel', YELLOW)
            .setDescription(`Please use this command in ${channel}`)
        ).then(m => m.delete({ timeout: 5000 }))
    }

    static async commandHandler(client, dir = '') {
        const filePath = path.join(__dirname, dir);
        const files = await fs.readdir(filePath);
        for (const file of files) {
            const stat = await fs.lstat(path.join(filePath, file));
            if (stat.isDirectory()) await this.commandHandler(client, path.join(dir, file));
            if (file.endsWith('.js')) {
                const command = require(path.join(filePath, file));
                if (command.prototype instanceof BaseCommand) {
                    const cmd = new command();
                    client.commands.set(cmd.name, cmd);
                    if (cmd.aliases) cmd.aliases.forEach(a => client.aliases.set(a, cmd))
                }
            }
        }
    }

    static async eventHandler(client, dir = '') {
        const filePath = path.join(__dirname, dir);
        const files = await fs.readdir(filePath);
        for (const file of files) {
            const stat = await fs.lstat(path.join(filePath, file));
            if (stat.isDirectory()) await this.eventHandler(client, path.join(dir, file));
            if (file.endsWith('.js')) {
                const event = require(path.join(filePath, file));
                if (event.prototype instanceof BaseEvent) {
                    const evt = new event();
                    client.on(evt.name, evt.run.bind(evt, client));
                }
            }
        }
    }
}