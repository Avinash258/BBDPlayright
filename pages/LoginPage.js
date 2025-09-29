const { BasePage } = require('./BasePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
  }

  // Login page locators
  get emailInput() {
    return this.page.locator('#Email');
  }

  get passwordInput() {
    return this.page.locator('#Password');
  }

  get loginButton() {
    return this.page.locator('input[value="Log in"]');
  }

  get rememberMeCheckbox() {
    return this.page.locator('#RememberMe');
  }

  get forgotPasswordLink() {
    return this.page.locator('a[href="/passwordrecovery"]');
  }

  get registerLink() {
    return this.page.locator('a[href="/register"]');
  }

  get validationErrors() {
    return this.page.locator('.validation-summary-errors');
  }

  get successMessage() {
    return this.page.locator('.result');
  }

  // Login page methods
  async navigateToLoginPage() {
    await this.page.goto('https://demowebshop.tricentis.com/login');
    await this.waitForPageLoad();
  }

  async setEmail(email) {
    await this.emailInput.fill(email);
  }

  async setPassword(password) {
    await this.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
    await this.waitForPageLoad();
  }

  async checkRememberMe() {
    await this.rememberMeCheckbox.check();
  }

  async clickForgotPasswordLink() {
    await this.forgotPasswordLink.click();
    await this.waitForPageLoad();
  }

  async clickRegisterLink() {
    await this.registerLink.click();
    await this.waitForPageLoad();
  }

  async login(email, password) {
    await this.setEmail(email);
    await this.setPassword(password);
    await this.clickLoginButton();
  }

  async isLoginSuccessful() {
    return await this.page.url().includes('demowebshop.tricentis.com') && 
           !await this.page.url().includes('/login');
  }

  async getValidationErrors() {
    return await this.validationErrors.textContent();
  }

  async getSuccessMessage() {
    return await this.successMessage.textContent();
  }
}

module.exports = { LoginPage };
