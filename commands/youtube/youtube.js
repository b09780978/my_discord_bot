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
/*
    	if(message.guild){
		if(message.content.startsWith('!join')){
			if(message.member.voiceChannel){
				message.member.voiceChannel.join()
						.then( (connection) => {
							message.reply('Join');
						})
						.catch( (error) => {
							message.reply(error.message);
						});
			}
		}

		if(message.content.startsWith('!play')){
			let song = message.content.split(' ')[1];
			const dispatcher = message.guild.voiceConnection.playStream(ytdl(song));
			dispatcher.on('end', () => {
				message.reply('end');
			});
			dispatcher.on('error', (error) => {
				message.reply(error.message);
			})
		}
*/
