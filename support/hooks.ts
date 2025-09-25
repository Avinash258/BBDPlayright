import { Before, BeforeAll, AfterAll, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from '@playwright/test';

// Set default timeout to 60 seconds
setDefaultTimeout(60 * 1000);

let browser: Browser;
let context: BrowserContext;
let page: Page;

BeforeAll(async function () {
  // Launch browser before all tests
  browser = await chromium.launch({
    headless: process.env.HEADLESS !== 'false',
    slowMo: process.env.SLOW_MO ? parseInt(process.env.SLOW_MO) : 0,
  });
});

Before(async function () {
  // Create new context and page for each scenario
  context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  });
  
  page = await context.newPage();
  
  // Set page timeout
  page.setDefaultTimeout(30000);
  
  // Make page available to step definitions
  this.page = page;
  this.context = context;
});

After(async function () {
  // Take screenshot on failure
  if (this.result && this.result.status === 'FAILED') {
    const screenshot = await this.page.screenshot({ 
      path: `reports/screenshots/failed-${Date.now()}.png`,
      fullPage: true 
    });
    this.attach(screenshot, 'image/png');
  }
  
  // Close context after each scenario
  await context.close();
});

AfterAll(async function () {
  // Close browser after all tests
  await browser.close();
});
