const { expect } = require('@playwright/test');

class BasePage {
  constructor(page) {
    this.page = page;
  }

  // Common locators
  get headerLogo() {
    return this.page.locator('.header-logo');
  }

  get shoppingCartLink() {
    return this.page.locator('#topcartlink a').first();
  }

  get wishlistLink() {
    return this.page.locator('.wishlist-qty');
  }

  get accountLink() {
    return this.page.locator('.account');
  }

  get loginLink() {
    return this.page.locator('.ico-login');
  }

  get registerLink() {
    return this.page.locator('.ico-register');
  }

  get logoutLink() {
    return this.page.locator('.ico-logout');
  }

  get searchBox() {
    return this.page.locator('#small-searchterms');
  }

  get searchButton() {
    return this.page.locator('input[value="Search"]');
  }

  get categoriesMenu() {
    return this.page.locator('.top-menu');
  }

  get footerLinks() {
    return this.page.locator('.footer a');
  }

  // Common methods
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async waitForElement(selector, timeout = 30000) {
    await this.page.waitForSelector(selector, { timeout });
  }

  async clickElement(selector) {
    await this.page.click(selector);
  }

  async fillInput(selector, value) {
    await this.page.fill(selector, value);
  }

  async getText(selector) {
    return await this.page.textContent(selector);
  }

  async isVisible(selector) {
    return await this.page.isVisible(selector);
  }

  async navigateTo(url) {
    await this.page.goto(url);
    await this.waitForPageLoad();
  }

  async takeScreenshot(name) {
    await this.page.screenshot({ path: `reports/screenshots/${name}.png` });
  }
}

module.exports = { BasePage };
