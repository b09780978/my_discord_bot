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
