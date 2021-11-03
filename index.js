const PORT = 8000;
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const app = express();
const url = 'https://hentaifox.com/search/?q=hypnotism';

let mainArr = [];

axios(url).then((response) => {
	const html = response.data;
	const $ = cheerio.load(html);
	// console.log($);
	$('.thumb', html).each(function() {
		let curTags = $(this).children('.g_type').children('.g_cat').find('a').text();
		let curImage = $(this).children('.inner_thumb').children('a').find('img').attr('src');

		let curCaption = $(this).children('.caption').children('.g_title').find('a').text();

		mainArr.push({
			tags: curTags,
			image: curImage,
			caption: curCaption
		});

		// console.log($(this).text());
		// console.log($(this).children('a').find('img').attr('src'));
		// console.log($(this).find('a').attr('src'));
	});

	console.log(mainArr.length);
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
