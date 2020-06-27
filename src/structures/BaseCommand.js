module.exports = class Command {
    constructor (options) {
        this.name = options.name;
        this.category = options.category;
        this.aliases = options.aliases;
        this.description = options.description;
        this.channel = options.channel;
        this.args = options.args;
        this.userPermissions = options.userPermissions;
    }

    run () {
        throw new Error(`${this.name} has no run method`)
    }

    checkPermission(message) {
        if (!this.userPermissions) return true;
        return message.member.hasPermission([this.userPermissions]);
    }

    checkChannel(message) {
        if (!this.channel) return true;
        return message.channel.name === this.channel;
    }

    overwritePermission(message) {
        return message.author.id === process.env.BOT_OWNER_ID;
    }
};