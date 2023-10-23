import puppeteer from "puppeteer";

describe('show/hide event details', () => {
    let browser;
    let page;
    beforeAll(async () => {
        browser = await puppeteer.launch({
            // headless: false,
            // slowMo: 250, // slow down by 250ms,
            // timeout: 0 // removes puppeteer/browser timeout limitations (this isn't the same as the timeout of jest)
        });
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.event');
    });

    afterAll(() => {
        browser.close();
    });

    test('an event is collapsed by default', async () => {
        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeNull();
    });

    test('user can expand an event to see its details', async () => {
        await page.click('.event .details-btn');

        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeDefined();
    });

    test('user can collapse an event to hide details', async () => {
        await page.click('.event .details-btn');
        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeNull();
    });
});
