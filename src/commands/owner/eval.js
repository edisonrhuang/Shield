const BaseCommand = require('../../structures/BaseCommand');
const { embed } = require('../../util/Util');

module.exports = class EvalCommand extends BaseCommand {
    constructor() {
        super({
            name: 'eval',
            category: 'owner',
            aliases: null,
            description: 'Evaluates arbitrary javascript code',
            args: '[code]',
        });
    }

    async run (client, message, args) {
        await message.delete();

        if (!args[0]) return message.channel.send('Please enter a valid statement to execute').then(m => m.delete({timeout:5000}));

        const toEval = args.join(' ');
        try {
            if (toEval.toLowerCase().includes('token')) return;

            const evaluated = eval(toEval);

            return message.channel.send(
                embed(client, message, 'Eval Executed')
                    .setDescription(`
                    \`\`\`js\n${toEval}\n\`\`\`
                    Evaluated:
                    ${evaluated}
                    
                    Type of:
                    ${typeof(evaluated)}
                    `)
            )
        } catch (err) {
            return message.channel.send(err);
        }
    }
}