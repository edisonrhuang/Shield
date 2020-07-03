const BaseCommand = require('../../structures/BaseCommand');
const { DEFAULT } = require('../../config/hexColors.json');
const { MessageEmbed } = require('discord.js');

module.exports = class SetupVerifyCommand extends BaseCommand {
    constructor() {
        super({
            name: 'setupverify',
            category: 'owner',
            aliases: ['verifysetup'],
            description: 'Sets up the verify message and reactions',
            userPermissions: ['BOT_OWNER'],
        });
    }

    async run (client, message) {
        await message.delete()

        const rulesChannel = message.guild.channels.cache.find(c => c.name === 'rules');
        const verifiedRole = message.guild.roles.cache.find(r => r.name === 'Verified');

        return message.channel.send(
            new MessageEmbed()
                .setColor(DEFAULT)
                .setTitle('Welcome!')
                .setDescription(`Welcome to Project Shield, the development server for Shield, a discord bot created using the Discord.js library.
                
                By reacting to the emoji below, you agree to follow and respect the rules stated in ${rulesChannel} and will receive the ${verifiedRole} Role
                `)
        ).then(m => m.react('✅'));
    }
}