const commando = require('discord.js-commando');
const Discord = require('discord.js');

const axios = require('axios');
const cheerio = require('cheerio');

const randomize = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

module.exports = class FinderCommands extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'find',
			group: 'misc',
			memberName: 'find',
			description: 'Find the image from a link'
		});
	}

	async run(commands, info) {
		const url = 'https://nhentai.net/g/' + info;
		const base = 'https://nhentai.net';

		let mainArr = [];

		axios(url)
			.then((response) => {
				$('#bigcontainer', html).each(function() {
					let curLink = $(this).children('#cover').children('a').attr('href');
					let curImage = $(this).children('#cover').children('a').children('img').attr('data-src');
					let curTitle = $(this)
						.children('#info-block')
						.children('#info')
						.children('.title')
						.children('.pretty')
						.text();

					const embed = new Discord.MessageEmbed()
						.setDescription(curTitle)
						.addField('Link:', base + curLink, true)
						.setImage(curImage)
						.setColor(0x00ae86)
						.setTimestamp();

					return commands.embed(embed);
				});
			})
			.catch(function(err) {
				return commands.reply(`Ga nemu bosque, yakin linknya bener?`);
			});
	}
};
