const commando = require('discord.js-commando');
const Discord = require('discord.js');

const path = require('path');
require('dotenv').config();

const client = new commando.CommandoClient({
	owner: process.env.DISCORD_OWNER,
	commandPrefix: process.env.DISCORD_PREFIX
});

client.login(process.env.DISCORD_TOKEN);

client.registry
	.registerGroups([ [ 'mod', 'Mod Commands' ], [ 'misc', 'Misc Commands' ] ])
	.registerDefaults()
	.registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
	console.log('bot has logged on');
});
