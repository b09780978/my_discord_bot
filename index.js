const Commando = require('discord.js-commando');
const path = require('path');

/////////////////////////////////////////
//		Need put at setting.json ///////
///////////////////////////////////////

/////////////////////////////////
//     Discord Bot             //
////////////////////////////////
const DISCORD_TOKEN = require('./settings.json').DISCORD_BOT_TOKEN;
const DISCORD_OWNER_ID = require('./settings.json').DISCORD_BOT_OWNER_ID;
const DISCORD_COMMAND_DIR = require('./settings.json').DISCORD_BOT_COMMAND_DIR;

const bot = new Commando.Client({
    owner: DISCORD_OWNER_ID,
});

bot.on('error', console.error)
    .on('warn', console.warn)
    .on('debug', console.debug)
    .on('ready', () => {
        console.log(`Start bot ${bot.user.tag}\nOwner: ${bot.user.username}`);
    })
    .on('disconnect', () => {
        console.warn('Bot disconnect');
    })
    .on('reconnecting', () => {
        console.log('Bot reconnecting');
    })
    .on('CommandError', (command, error) => {
        if (error instanceof Commando.FriendlyError) return;
        console.error(`Bot error in command ${command.groupId}: ${command.memberName}`);
    });

// bot registry commands
bot.registry
    .registerGroups([
		['wenku8', 'wenku8'],
        ['pixiv', 'pixiv'],
	])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, DISCORD_COMMAND_DIR));

// bot login
bot.login(DISCORD_TOKEN);

/*
bot.on('message', (message) => {
	// Do not reply message from bot
	if(message.author.bot){
		return;
	}
	let content = message.content;
	if(content.startsWith(WENKU8_NOVEL_URL)){
		let novel_id = content.match(/\d{4}/);
		let response = WENKU8_NOVEL_DOWNLOAD_URL + '1/' + novel_id + WENKU8_NOVEL_DOWNLOAD_TYPE;
		let response2 = WENKU8_NOVEL_DOWNLOAD_URL + '2/' + novel_id + WENKU8_NOVEL_DOWNLOAD_TYPE;
		message.reply(`全本觀看\n1: ${response}\n2: ${response2}`);
		return;
	}

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
	}

	message.reply(`${message.author.id}:` + message.content);
});
*/
