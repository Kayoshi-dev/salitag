import puppeteer from "puppeteer";
import "dotenv/config";

/**
 * Script to parse a certain website and get some Tagalog words with it's definition.
 */

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();

  await page.goto(process.env.WEBSITE as string);

  await page.waitForSelector(".pages.center");

  const alphabetUrls = await page.$$eval(".pages.center > a", (anchors) =>
    anchors.map((anchor) => anchor.getAttribute("href"))
  );

  const promises = await Promise.all(
    alphabetUrls.map(async (url) => {
      const newLetterPage = await browser.newPage();
      await newLetterPage.goto(url!);

      await page.waitForSelector(".word-list");

      const wordGroup = await newLetterPage.$$eval(".word-group", (groups) =>
        groups.map((group) => {
          const word = group
            .querySelector(".word-entry a")
            ?.textContent?.trim();
          const definition = group
            .querySelector("div[data-language] em.normal:last-of-type")
            ?.nextSibling?.textContent?.trim();

          return {
            word,
            definition,
          };
        })
      );

      return wordGroup;
    })
  );

  console.log(promises);
})();
