const Commando = require('discord.js-commando');
const request = require('request-promise');
const cheerio = require('cheerio');

////////////////////////////////
//		Comic Config		  //
////////////////////////////////
const COMIC_URL = 'https://www.manhuagui.com';
const COMIC_UPDATE_URL = 'https://www.manhuagui.com/list/update.html';


module.exports = class ComicCommand extends Commando.Command {
    constructor(bot) {
        super(bot, {
            name: 'comic',
            aliases: ['comic', 'co'],
            group: 'comic',
            memberName: 'comic',
            description: 'Command for get new update comic',
            examples: ['co ', ],
            args: [
                {
                    key: 'args',
                    label: 'comic',
                    prompt: 'Get comic data page',
                    type: 'string',
                    infinite: true,
				}
			],
        });
    }

    async run(message, args) {
        let response = '';
        let type = args.args[0];
        let queryString;

        switch (type) {
            case 'new':
            case 'NEW':
            case 'n':
            case 'N':
            case 'update':
            case 'UPDATE':
            case 'u':
            case 'U':
                response = await get_update_comics();
                break;

            case 'search':
            case 'SEARCH':
            case 's':
            case 'S':
                if(args.args.length<2){
                    response = '請輸入查詢關鍵字';
                    break;
                }
                queryString = args.args[1];
                response = `${COMIC_URL}/s/${queryString}.html`;
                break;

            default:
                response = await get_update_comics();
                break;
        }

        return message.reply(response);
    }
}

async function get_update_comics() {
    let response = '';
    await request({
            method: 'GET',
            uri: COMIC_UPDATE_URL,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36'
            },
            transform: (html) => {
                return cheerio.load(html);
            }
        })
        .then(($) => {
            $('.bcover').each((index, element) => {
                if (index < 30) {
                    response += $(element).attr('title') + ' : ' + get_comic_url($(element).attr('href')) + '\n';
                }
            });
        })
        .catch((error) => {
            console.error(error);
            response = 'Error!!!';
        });

    return response;
}

// Chagne url to full manhuagui url
function get_comic_url(url) {
    return `${COMIC_URL}${url}`;
}
