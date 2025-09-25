import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Common locators
  get headerLogo(): Locator {
    return this.page.locator('.header-logo');
  }

  get shoppingCartLink(): Locator {
    return this.page.locator('#topcartlink a');
  }

  get wishlistLink(): Locator {
    return this.page.locator('.wishlist-qty');
  }

  get accountLink(): Locator {
    return this.page.locator('.account');
  }

  get loginLink(): Locator {
    return this.page.locator('.ico-login');
  }

  get registerLink(): Locator {
    return this.page.locator('.ico-register');
  }

  get logoutLink(): Locator {
    return this.page.locator('.ico-logout');
  }

  get searchBox(): Locator {
    return this.page.locator('#small-searchterms');
  }

  get searchButton(): Locator {
    return this.page.locator('input[type="submit"][value="Search"]');
  }

  // Common methods
  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
    await this.page.waitForLoadState('networkidle');
  }

  async clickElement(locator: Locator): Promise<void> {
    await locator.click();
    await this.page.waitForLoadState('networkidle');
  }

  async fillField(locator: Locator, text: string): Promise<void> {
    await locator.clear();
    await locator.fill(text);
  }

  async selectOption(locator: Locator, value: string): Promise<void> {
    await locator.selectOption(value);
  }

  async waitForElement(locator: Locator, timeout: number = 30000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  async isElementVisible(locator: Locator): Promise<boolean> {
    try {
      await locator.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async getElementText(locator: Locator): Promise<string> {
    return await locator.textContent() || '';
  }

  async getElementAttribute(locator: Locator, attribute: string): Promise<string | null> {
    return await locator.getAttribute(attribute);
  }

  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ 
      path: `reports/screenshots/${name}-${Date.now()}.png`,
      fullPage: true 
    });
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  async scrollToElement(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  async hoverElement(locator: Locator): Promise<void> {
    await locator.hover();
  }

  async doubleClickElement(locator: Locator): Promise<void> {
    await locator.dblclick();
  }

  async rightClickElement(locator: Locator): Promise<void> {
    await locator.click({ button: 'right' });
  }

  async pressKey(key: string): Promise<void> {
    await this.page.keyboard.press(key);
  }

  async typeText(text: string): Promise<void> {
    await this.page.keyboard.type(text);
  }

  async clearField(locator: Locator): Promise<void> {
    await locator.clear();
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  async refreshPage(): Promise<void> {
    await this.page.reload();
    await this.waitForPageLoad();
  }

  async goBack(): Promise<void> {
    await this.page.goBack();
    await this.waitForPageLoad();
  }

  async goForward(): Promise<void> {
    await this.page.goForward();
    await this.waitForPageLoad();
  }

  async waitForUrl(url: string, timeout: number = 30000): Promise<void> {
    await this.page.waitForURL(url, { timeout });
  }

  async waitForTitle(title: string, timeout: number = 30000): Promise<void> {
    await this.page.waitForFunction(
      (expectedTitle) => document.title === expectedTitle,
      title,
      { timeout }
    );
  }

  async acceptAlert(): Promise<void> {
    this.page.on('dialog', dialog => dialog.accept());
  }

  async dismissAlert(): Promise<void> {
    this.page.on('dialog', dialog => dialog.dismiss());
  }

  async getAlertText(): Promise<string> {
    return new Promise((resolve) => {
      this.page.on('dialog', dialog => {
        resolve(dialog.message());
        dialog.accept();
      });
    });
  }
}
