const Commando = require('discord.js-commando');
const request = require('request-promise');

////////////////////////////////
//		youtube	Config		  //
////////////////////////////////


module.exports = class YoutubeCommand extends Commando.Command {
    constructor(bot) {
        super(bot, {
            name: 'youtube',
            aliases: ['youtube', 'yo', ],
            group: 'youtube',
            memberName: 'youtube',
            description: 'Command for play youtube music',
            examples: ['yo ', ],
            args: [
                {
                    key: 'args',
                    label: 'youtube',
                    prompt: 'play youtube music',
                    type: 'string',
                    infinite: true,
				}
			],
        });
    }

    async run(message, args) {
        message.reply('test music command');
    }
}
