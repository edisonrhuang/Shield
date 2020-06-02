const { MessageEmbed } = require('discord.js');
const { DEFAULT } = require('../config/hexColors');

function getUser (message, user = '') {
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

function embed (client, message, title, color) {
    return new MessageEmbed()
        .setColor(color || DEFAULT)
        .setAuthor(title || client.user.tag, client.user.displayAvatarURL())
        .setFooter(message.author.tag, message.author.displayAvatarURL())
        .setTimestamp();
}

function noPermission (message) {
    return message.channel.send('You do not have permission to use this command').then(m => m.delete({timeout:5000}));
}

function formatDate (date) {
    return new Intl.DateTimeFormat('en-US').format(date);
}

function uptime (ms) {
    const sec = Math.floor(ms / 1000 % 60).toString();
    const min = Math.floor(ms / (1000 * 60) % 60).toString();
    const hrs = Math.floor(ms / (1000 * 60 * 60) % 60).toString();
    const days = Math.floor(ms / (1000 * 60 * 60 * 24) % 60).toString();

    return `${days.padStart(1, '0')} days, ${hrs.padStart(2, '0')} hours, ${min.padStart(2, '0')} minutes, ${sec.padStart(2, '0')} seconds`;
}

module.exports = { getUser, embed, noPermission, formatDate, uptime }