const Commando = require('discord.js-commando');
const request = require('request-promise');
const cheerio = require('cheerio');

/////////////////////////////
//		Myself Config     //
///////////////////////////
const MYSELFBBS_UPDATE_URL = 'https://myself-bbs.com/forum-133-1.html';
const MYSELFBBS_URL = 'https://myself-bbs.com'

module.exports = class MyselfBBSCommand extends Commando.Command {
    constructor(bot) {
        super(bot, {
            name: 'myself',
            aliases: ['myself', 'my'],
            group: 'myself',
            memberName: 'myself',
            description: 'Command for get myself-bbs information',
            examples: ['my ', ],
        });
    }

    async run(message, args) {
        let response = await get_update_animate();

        return message.reply(response);
    }
}

async function get_update_animate() {
    let response = '';
    await request({
            method: 'GET',
            uri: MYSELFBBS_UPDATE_URL,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36'
            },
            transform: (html) => {
                return cheerio.load(html);
            }
        })
        .then(($) => {
            $('.c.cl a').each((index, element) => {
                response += $(element).attr('title') + ' : ' + get_myselfbbs_url($(element).attr('href')) + '\n';
            })
        })
        .catch((error) => {
            console.error(error);
            response = 'Error!!!';
        });

    return response;
}

function get_myselfbbs_url(url) {
    return `${MYSELFBBS_URL}/${url}`;
}
