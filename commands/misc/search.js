const commando = require('discord.js-commando');
const Discord = require('discord.js');

const axios = require('axios');
const cheerio = require('cheerio');

const randomize = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

module.exports = class SearchCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'search',
			group: 'misc',
			memberName: 'search',
			description: 'Search a random queries.'
		});
	}

	async run(commands, info) {
		const url = 'https://hentaifox.com/search/?q=' + info;
		const base = 'https://hentaifox.com';

		let mainArr = [];

		axios(url).then((response) => {
			const html = response.data;
			const $ = cheerio.load(html);
			// console.log($);
			$('.thumb', html).each(function() {
				let curTags = $(this).children('.g_type').children('.g_cat').find('a').text();
				let curImage = $(this).children('.inner_thumb').children('a').find('img').attr('src');
				let curLink = $(this).children('.inner_thumb').children('a').attr('href');
				let curCaption = $(this).children('.caption').children('.g_title').find('a').text();

				mainArr.push({
					tags: curTags,
					image: curImage,
					caption: curCaption,
					link: curLink
				});
			});

			let curLength = mainArr.length;
			let curPosition = randomize(1, curLength);

			const embed = new Discord.MessageEmbed()
				.setDescription(mainArr[curPosition].caption)
				.addField('Link:', base + mainArr[curPosition].link, true)
				.setImage(mainArr[curPosition].image)
				.setColor(0x00ae86)
				.setTimestamp();

			return commands.embed(embed);
		});
	}
};
