const Commando = require('discord.js-commando');
const request = require('request-promise');
const cheerio = require('cheerio');

////////////////////////////////
//		PTT farm Config		  //
////////////////////////////////
const PTT_FARM_URL = 'https://www.ptt.cc/bbs/C_Chat/search?page=1&q=%E7%95%B0%E4%B8%96%E7%95%8C%E6%82%A0%E9%96%92%E8%BE%B2%E5%AE%B6';
const PTT_URL = 'https://www.ptt.cc';


module.exports = class FarmCommand extends Commando.Command {
    constructor(bot) {
        super(bot, {
            name: 'farm',
            aliases: ['farm', 'fa'],
            group: 'farm',
            memberName: 'farm',
            description: 'Command for read 異世界悠閒農家',
            examples: ['fa ', ],
        });
    }

    async run(message, args) {
        let response = 'search ptt\n';
        let title, url;

        request({
                method: 'GET',
                uri: PTT_FARM_URL,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36'
                },
                transform: (html) => {
                    return cheerio.load(html);
                }
            })
            .then(($) => {
                let response = '';
                let collection = {
                    collection: null,
                    newest: [],
                };
                $('.title a').each((index, element) => {
                    title = $(element).text();
                    url = $(element).attr('href');

                    // 找彙整文
                    if (collection['collection'] === null && title.match('Web彙整文') !== null) {
                        collection['collection'] = {
                            title: title,
                            url: get_ptt_url(url)
                        };
                    }
                    // 找最新翻譯
                    if (title.match(/#\d{3,}/) !== null) {
                        collection['newest'].push({
                            title: title,
                            url: get_ptt_url(url)
                        })
                    }
                });

                // 如果有彙整文先顯示
                if (collection['collection'] !== null) {
                    response += collection['collection']['title'] + ' : ' + collection['collection']['url'] + '\n';
                }

                collection['newest'].forEach((item, index, array) => {
                   response += item['title'] + ' : ' + item['url'] + '\n';
                });

                return message.reply(response);
            })
            .catch((error) => {
                console.error(error);
                return message.reply('Error!!!');
            });

    }
}

// Chagne url to full ptt url
function get_ptt_url(url){
    return `${PTT_URL}/${url}`;
}
