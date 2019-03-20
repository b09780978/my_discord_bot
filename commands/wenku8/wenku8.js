const Commando = require('discord.js-commando');

////////////////////////////////
//		WENKU8	Config		  //
////////////////////////////////
const WENKU8_NOVEL_URL = 'https://www.wenku8.net/book/'
const WENKU8_NOVEL_DOWNLOAD_URL = 'http://dl.wkcdn.com/txtgbk/';
const WENKU8_NOVEL_DOWNLOAD_TYPE = '.txt';

module.exports = class Wenku8Command extends Commando.Command {
    constructor(bot) {
        super(bot, {
            name: 'wenku8',
            aliases: ['wenku8', 'w8', ],
            group: 'wenku8',
            memberName: 'wenku8',
            description: 'Command for wenku8',
            examples: ['w8 ', ],
            args: [
                {
                    key: 'args',
                    label: 'novel',
                    prompt: 'Get wenku8 full novel content page',
                    type: 'string',
                    infinite: true,
				}
			],
        });
    }

    async run(message, args) {
        let arg1 = args.args[0];

        // Get full text page
        if (arg1.startsWith(WENKU8_NOVEL_URL)) {
            let novel_id = arg1.match(/\d{4}/);
            let response = `\n${WENKU8_NOVEL_DOWNLOAD_URL}1/${novel_id}${WENKU8_NOVEL_DOWNLOAD_TYPE}\n${WENKU8_NOVEL_DOWNLOAD_URL}2/${novel_id}${WENKU8_NOVEL_DOWNLOAD_TYPE}`;
            return message.reply(response);
        }

        return message.reply(`Unknown command ${arg1}`);
    }
}
