"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const test_1 = require("@playwright/test");
(0, cucumber_1.setDefaultTimeout)(60 * 1000);
let browser;
let context;
let page;
(0, cucumber_1.BeforeAll)(async function () {
    browser = await test_1.chromium.launch({
        headless: process.env.HEADLESS !== 'false',
        slowMo: process.env.SLOW_MO ? parseInt(process.env.SLOW_MO) : 0,
    });
});
(0, cucumber_1.Before)(async function () {
    context = await browser.newContext({
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
    });
    page = await context.newPage();
    page.setDefaultTimeout(30000);
    this.page = page;
    this.context = context;
});
(0, cucumber_1.After)(async function () {
    if (this.result && this.result.status === 'FAILED') {
        const screenshot = await this.page.screenshot({
            path: `reports/screenshots/failed-${Date.now()}.png`,
            fullPage: true
        });
        this.attach(screenshot, 'image/png');
    }
    await context.close();
});
(0, cucumber_1.AfterAll)(async function () {
    await browser.close();
});
//# sourceMappingURL=hooks.js.map