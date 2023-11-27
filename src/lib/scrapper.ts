import puppeteer, { Page } from 'puppeteer';
import 'dotenv/config';

/**
 * Script to parse a certain website and get some Tagalog words with it's definition.
 */
const booter = async () => {
	const browser = await puppeteer.launch({
		headless: true
	});

	const page = await browser.newPage();

	await page.goto(process.env.WEBSITE as string);

	await page.waitForSelector('.pages.center');

	const alphabetUrls = await page.$$eval('.pages.center > a', (anchors) =>
		anchors.map((anchor) => anchor.getAttribute('href'))
	);

	const getWords = async (newLetterPage: Page) => {
		const wordGroup = await newLetterPage.$$eval('.word-group', (groups) =>
			groups.map((group) => {
				const word = group.querySelector('.word-entry a')?.textContent?.trim();
				const type = [...group.querySelectorAll('em.normal')].map((em) => em.textContent).join('');
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

		await newLetterPage.close();
		return wordGroup;
	};

	for (const url of alphabetUrls) {
		console.log(url);
		const newLetterPage = await browser.newPage();
		await newLetterPage.goto(url!);

		await newLetterPage.waitForSelector('.word-list');

		newLetterPage.$eval('ins', (ad) => ad.remove());

		const nodesPagesSection = await newLetterPage.$('.pages.center');
		const lastLink = await nodesPagesSection?.$('a[title="Last Page"]');

		const maxUrl = await lastLink?.evaluate((x) => x.getAttribute('href'));

		if (maxUrl) {
			const objUrl = new URL(maxUrl);

			const [, , letter, maxPage] = objUrl.pathname.split('/');

			const arrayURL = [...Array(+maxPage).keys()].map(
				(x) => `${process.env.WEBSITE}list/${letter}/${x + 1}/`
			);

			for (const urlNumber of arrayURL) {
				console.log(`Visiting: ${urlNumber}`);

				const newNumberPage = await browser.newPage();
				await newNumberPage.goto(urlNumber);

				newNumberPage.$eval('ins', (ad) => ad.remove());

				await newLetterPage.waitForSelector('.word-list');

				const newWords = await getWords(newNumberPage);

				for (const word of newWords) {
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
		} else {
			console.log('Only one page!');
			const newWords = await getWords(newLetterPage);

			for (const word of newWords) {
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
	}
	await browser.close();
};

export default booter;
