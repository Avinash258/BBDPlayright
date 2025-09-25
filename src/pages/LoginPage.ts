import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Login page locators
  get emailInput(): Locator {
    return this.page.locator('#Email');
  }

  get passwordInput(): Locator {
    return this.page.locator('#Password');
  }

  get loginButton(): Locator {
    return this.page.locator('input[value="Log in"]');
  }

  get rememberMeCheckbox(): Locator {
    return this.page.locator('#RememberMe');
  }

  get forgotPasswordLink(): Locator {
    return this.page.locator('a[href="/passwordrecovery"]');
  }

  get registerButton(): Locator {
    return this.page.locator('input[value="Register"]');
  }

  get validationSummary(): Locator {
    return this.page.locator('.validation-summary-errors');
  }

  get validationSummaryText(): Locator {
    return this.page.locator('.validation-summary-errors ul li');
  }

  get emailValidationError(): Locator {
    return this.page.locator('#Email-error');
  }

  get passwordValidationError(): Locator {
    return this.page.locator('#Password-error');
  }

  get loginForm(): Locator {
    return this.page.locator('.login-page .form-fields');
  }

  get returnCustomerSection(): Locator {
    return this.page.locator('.returning-wrapper');
  }

  get newCustomerSection(): Locator {
    return this.page.locator('.new-wrapper');
  }

  get guestCheckoutButton(): Locator {
    return this.page.locator('input[value="Checkout as Guest"]');
  }

  // Login page methods
  async navigateToLoginPage(): Promise<void> {
    await this.navigateTo('/login');
  }

  async login(email: string, password: string, rememberMe: boolean = false): Promise<void> {
    await this.fillField(this.emailInput, email);
    await this.fillField(this.passwordInput, password);
    
    if (rememberMe) {
      await this.clickElement(this.rememberMeCheckbox);
    }
    
    await this.clickElement(this.loginButton);
    await this.waitForPageLoad();
  }

  async clickForgotPassword(): Promise<void> {
    await this.clickElement(this.forgotPasswordLink);
  }

  async clickRegisterButton(): Promise<void> {
    await this.clickElement(this.registerButton);
  }

  async clickGuestCheckout(): Promise<void> {
    await this.clickElement(this.guestCheckoutButton);
  }

  async getValidationSummaryErrors(): Promise<string[]> {
    const errorElements = this.validationSummaryText;
    const count = await errorElements.count();
    const errors: string[] = [];
    
    for (let i = 0; i < count; i++) {
      const errorText = await this.getElementText(errorElements.nth(i));
      errors.push(errorText);
    }
    
    return errors;
  }

  async getEmailValidationError(): Promise<string> {
    return await this.getElementText(this.emailValidationError);
  }

  async getPasswordValidationError(): Promise<string> {
    return await this.getElementText(this.passwordValidationError);
  }

  async isLoginFormVisible(): Promise<boolean> {
    return await this.isElementVisible(this.loginForm);
  }

  async isReturnCustomerSectionVisible(): Promise<boolean> {
    return await this.isElementVisible(this.returnCustomerSection);
  }

  async isNewCustomerSectionVisible(): Promise<boolean> {
    return await this.isElementVisible(this.newCustomerSection);
  }

  async isValidationErrorVisible(): Promise<boolean> {
    return await this.isElementVisible(this.validationSummary);
  }

  async clearLoginForm(): Promise<void> {
    await this.clearField(this.emailInput);
    await this.clearField(this.passwordInput);
  }

  async setEmail(email: string): Promise<void> {
    await this.fillField(this.emailInput, email);
  }

  async setPassword(password: string): Promise<void> {
    await this.fillField(this.passwordInput, password);
  }

  async toggleRememberMe(): Promise<void> {
    await this.clickElement(this.rememberMeCheckbox);
  }

  async isRememberMeChecked(): Promise<boolean> {
    return await this.rememberMeCheckbox.isChecked();
  }

  async isLoginButtonEnabled(): Promise<boolean> {
    return await this.loginButton.isEnabled();
  }

  async getCurrentEmailValue(): Promise<string> {
    return await this.emailInput.inputValue();
  }

  async getCurrentPasswordValue(): Promise<string> {
    return await this.passwordInput.inputValue();
  }

  async waitForLoginSuccess(): Promise<void> {
    // Wait for redirect to home page or account page
    await this.page.waitForURL(/\/$|\/customer/, { timeout: 10000 });
  }

  async waitForLoginError(): Promise<void> {
    await this.waitForElement(this.validationSummary, 5000);
  }

  async isLoggedIn(): Promise<boolean> {
    // Check if logout link is visible (indicates user is logged in)
    return await this.isElementVisible(this.logoutLink);
  }

  async getLoginFormTitle(): Promise<string> {
    const titleElement = this.page.locator('.page-title h1');
    return await this.getElementText(titleElement);
  }

  async getPageUrl(): Promise<string> {
    return await this.getCurrentUrl();
  }

  async isOnLoginPage(): Promise<boolean> {
    const url = await this.getCurrentUrl();
    return url.includes('/login');
  }
}
