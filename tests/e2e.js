const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    console.log("Browser opened.");

    const page = await browser.newPage();
    await page.goto('http://localhost:10000/');

    console.log("Page opened! Taking an screenshot...");

    await page.screenshot({ path: './tests/01.png' });

    const [response] = await Promise.all([
        page.waitForNavigation(),
        page.click("body > main > main > div:nth-child(4) > div > div > div > a:nth-child(1)"),
    ]);

    console.log("Clicked \"Contact table\" link, waiting for contacts...");

    await page.waitForTimeout(1000);

    console.log("Timeout! Taking an screenshot...");

    await page.screenshot({ path: './tests/02.png' });

    await browser.close();

    console.log("Browser closed!");

})();