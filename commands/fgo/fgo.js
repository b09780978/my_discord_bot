const Commando = require('discord.js-commando');
const request = require('request-promise');
const cheerio = require('cheerio');

////////////////////////////
//		FGO	 Config      //
///////////////////////////
const FGO_JAPAN_URL = 'https://forum.gamer.com.tw/B.php?bsn=26742&subbsn=25';
const FGO_TAIWAN_URL = 'https://forum.gamer.com.tw/B.php?bsn=26742&subbsn=26';
const FGO_WIKI_URL = 'https://appmedia.jp/fategrandorder';
const BAHA_URL = 'https://forum.gamer.com.tw';

module.exports = class FgoCommand extends Commando.Command {
    constructor(bot) {
        super(bot, {
            name: 'fgo',
            aliases: ['fgo', ],
            group: 'fgo',
            memberName: 'fgo',
            description: 'Command for get fgo activity information',
            examples: ['fgo ', ],
            args: [
                {
                    key: 'args',
                    label: 'fgo',
                    prompt: 'get fgo information',
                    type: 'string',
                    infinite: true,
				}
			],
        });
    }

    async run(message, args) {
        let response = '';
        let type = args.args[0];
        switch (type) {
            case 'j':
            case 'J':
            case 'Japan':
            case 'japan':
                response = await get_japan_url();
                break;

            case 't':
            case 'T':
            case 'Taiwan':
            case 'taiwan':
                response = await get_taiwan_url();
                break;

            default:
                response = await get_japan_url();
                break;
        }
        return message.reply(response);
    }
}

// 取得巴哈日板前10筆資料
async function get_japan_url() {
    let response = '';
    await request({
        method: 'GET',
        uri: FGO_JAPAN_URL,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36'
        },
        transform: (html) => {
            return cheerio.load(html);
        }
    }).then(($) => {
        $('.b-list__main__title').each((index, element) => {
            if (index < 10) {
                response += $(element).text() + ' : ' + get_baha_url($(element).attr('href')) + '\n';
            }
            response += 'FGO wiki : https://appmedia.jp/fategrandorder\n';
            response += '茹西嫁王 : https://kazemai.github.io/fgo-vz/';
        })
    }).catch((error) => {
        console.error(error);
        response = 'Error!!!';
    });

    return response;
}

// // 取得巴哈台板前10筆資料 + fgo攻略wiki + 茹西嫁王
async function get_taiwan_url() {
    let response = '';
    await request({
        method: 'GET',
        uri: FGO_TAIWAN_URL,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36'
        },
        transform: (html) => {
            return cheerio.load(html);
        }
    }).then(($) => {
        $('.b-list__main__title').each((index, element) => {
            if (index < 10) {
                response += $(element).text() + ' : ' + get_baha_url($(element).attr('href')) + '\n';
            }
        })
        response += '茹西嫁王 : https://kazemai.github.io/fgo-vz/';
    }).catch((error) => {
        console.error(error);
        response = 'Error!!!';
    });

    return response;
}

// Get full 巴哈姆特 url
function get_baha_url(url) {
    return `${BAHA_URL}/${url}`;
}
