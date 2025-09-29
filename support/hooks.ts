import { Before, BeforeAll, AfterAll, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from '@playwright/test';
import { AllureRuntime, AllureConfig } from 'allure-cucumberjs';

// Set default timeout to 60 seconds
setDefaultTimeout(60 * 1000);

let browser: Browser;
let context: BrowserContext;
let page: Page;

// Allure configuration
const allureConfig: AllureConfig = {
  resultsDir: 'reports/allure-results'
};

const allureRuntime = new AllureRuntime(allureConfig);

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
  
  // Initialize Allure test (if available)
  this.allure = allureRuntime;
  
  // Add environment information (if Allure is available)
  if (this.allure && typeof this.allure.addEnvironment === 'function') {
    this.allure.addEnvironment('Browser', process.env.BROWSER || 'chromium');
    this.allure.addEnvironment('Headless', process.env.HEADLESS || 'true');
    this.allure.addEnvironment('Node.js', process.version);
    this.allure.addEnvironment('Platform', process.platform);
  }
});

After(async function () {
  // Take screenshot on failure and attach to Allure
  if (this.result && this.result.status === 'FAILED') {
    const screenshot = await this.page.screenshot({ 
      path: `reports/screenshots/failed-${Date.now()}.png`,
      fullPage: true 
    });
    this.attach(screenshot, 'image/png');
    
    // Attach to Allure report (if available)
    if (this.allure && typeof this.allure.addAttachment === 'function') {
      this.allure.addAttachment('Failure Screenshot', screenshot, 'image/png');
    }
  }
  
  // Always take a final screenshot for Allure
  try {
    const finalScreenshot = await this.page.screenshot({ 
      path: `reports/screenshots/final-${Date.now()}.png`,
      fullPage: true 
    });
    
    if (this.allure && typeof this.allure.addAttachment === 'function') {
      this.allure.addAttachment('Final Screenshot', finalScreenshot, 'image/png');
    }
  } catch (error) {
    console.warn('Could not take final screenshot:', (error as Error).message);
  }
  
  // Close context after each scenario
  await context.close();
});

AfterAll(async function () {
  // Close browser after all tests
  await browser.close();
});
