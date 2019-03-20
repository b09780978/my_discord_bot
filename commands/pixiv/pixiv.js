const Commando = require('discord.js-commando');
const request = require('request-promise');

////////////////////////////////
//		PIXIV	Config		  //
////////////////////////////////
const PIXIV_API_URL = 'https://api.imjad.cn/pixiv/v1/';
const PIXIV_IMAGE_URL = 'https://www.pixiv.net/member_illust.php?mode=medium&illust_id=';

module.exports = class PixivCommand extends Commando.Command {
    constructor(bot) {
        super(bot, {
            name: 'pixiv',
            aliases: ['pixiv', 'pi', ],
            group: 'pixiv',
            memberName: 'pixiv',
            description: 'Command for pixiv',
            examples: ['pi ', ],
            args: [
                {
                    key: 'args',
                    label: 'pixiv',
                    prompt: 'Get pixiv content page',
                    type: 'string',
                    infinite: true,
				}
			],
        });
    }

    async run(message, args) {
        let type = args.args[0];
        let image_url;
        let params;
        let option;
        let response;
        let date;
        let mode;

        switch (type) {
            // hot tags
            case 'tags':
                params = {
                    type: 'tags',
                };
                option = generate_option('GET', params);
                request(option)
                    .then((json) => {
                        response = '熱門tags\n';
                        for (let i = 0; i < 20; i++) {
                            response += `tag: ${json[i].name}, `;
                        }
                        return message.reply(response);
                    })
                    .catch((error) => {
                        console.error(error);
                        return message.reply('error!!!');
                    });
                break;

            // search
            case 'search':
                if (args.length < 3) {
                    return message.reply('need search word argument');
                }
                let word = args.args[1];
                params = {
                    type: 'search',
                    word: word,
                };
                option = generate_option('GET', params);
                request(option)
                    .then((json) => {
                        if (json.status != 'success') {
                            return message.reply('error!!!');
                        }
                        response = `搜尋${word}\n`;
                        for (let i = 0; i < 10; i++) {
                            image_url = get_pixiv_image_url(json.response[i].id);
                            response += `title: ${json.response[i].title}\n\n${image_url}\n\n`;
                        }
                        return message.reply(response);
                    })
                    .catch((error) => {
                        console.error(error);
                        return message.reply('error!!!');
                    })
                break;

                // Get rank page
            case 'rank':
                date = new Date();
                date = `${date.getFullYear()}-${date.getMonth()+1<10 ? '0'+(date.getMonth()+1) : date.getMonth()}-${date.getDate()<10 ? '0'+date.getDate() : date.getDate() }\n`;
                params = {
                    type: 'rank',
                    mode: 'male',
                    content: 'illust',
                    date: date,
                };
                option = generate_option('GET', params);

                request(option)
                    .then((json) => {
                        if (json.status != 'success') {
                            return message.reply('暫時無法查看');
                        }
                        response = 'rank:\n';
                        for (let i = 0; i < 10; i++) {
                            image_url = get_pixiv_image_url(json.response[0].works[i].work.id);
                            response += `${image_url}\n`;
                        }
                        return message.reply(response);
                    })
                    .catch((error) => {
                        console.error(error);
                        return message.reply('error!!!');
                    })
                break;

            default:
                return message.reply('https://www.pixiv.net/member_illust.php?mode=medium&illust_id=73698423');
                //return message.reply(`test pixiv command type = ${type}`);
        }
    }
}

// Generate restful api request payload
function generate_option(method, params) {
    return {
        method: method,
        uri: PIXIV_API_URL,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36'
        },
        qs: params,
        json: true,
    };
}

// Return pixiv image url
function get_pixiv_image_url(pixiv_id) {
    return `${PIXIV_IMAGE_URL}${pixiv_id}`;
}
