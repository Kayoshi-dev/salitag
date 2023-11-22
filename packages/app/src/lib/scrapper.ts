import puppeteer from 'puppeteer';
import 'dotenv/config';

/**
 * Script to parse a certain website and get some Tagalog words with it's definition.
 */

const booter = async () => {
	const browser = await puppeteer.launch({
		headless: false
	});

	const page = await browser.newPage();

	await page.goto(process.env.WEBSITE as string);

	await page.waitForSelector('.pages.center');

	const alphabetUrls = await page.$$eval('.pages.center > a', (anchors) =>
		anchors.map((anchor) => anchor.getAttribute('href'))
	);

	const letterWords = await Promise.all(
		alphabetUrls.map(async (url) => {
			const newLetterPage = await browser.newPage();
			await newLetterPage.goto(url!);

			await page.waitForSelector('.word-list');

			const wordGroup = await newLetterPage.$$eval('.word-group', (groups) =>
				groups.map((group) => {
					const word = group.querySelector('.word-entry a')?.textContent?.trim();
					const type = [...group.querySelectorAll('em.normal')]
						.map((em) => em.textContent)
						.join('');
					const definition = group
						.querySelector('div[data-language] em.normal:last-of-type')
						?.nextSibling?.textContent?.trim();

					const newWord = {
						word,
						type,
						definition
					};

					return newWord;
				})
			);

			return wordGroup;
		})
	);

	for (const letterWord of letterWords) {
		for (const word of letterWord) {
			try {
				await fetch('http://localhost:5173/api/', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(word)
				});
			} catch (e) {
				console.log('error', e);
			}
		}
	}

	await browser.close();
};

export default booter;
