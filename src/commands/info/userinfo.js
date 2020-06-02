const commandStructure = require('../../utils/structures/commandStructure');
const { getUser, embed } = require('../../utils/functions');

module.exports = class userInfo extends commandStructure {
    constructor() {
        super('userinfo', 'info', ['user']);
    }

    async run (client, message, args) {
        await message.delete();

        const user = getUser(message, args.join(' '));
        if (!user) return message.channel.send('Please enter a valid user').then(m => m.delete({timeout:5000}));

        return message.channel.send(
            embed(client, message)
                .setAuthor(user.user.tag, user.user.displayAvatarURL())
                .setThumbnail(user.user.displayAvatarURL())
                .setDescription(`
                **Username:** ${user.user.username}
                **Discriminator:** ${user.user.discriminator}
                **ID:** ${user.user.id}
                **Icon:** [Image Link](${user.user.displayAvatarURL()})
                **Bot?** ${user.user.bot ? 'Yes' : 'No'}
                `)
        )
    }
}