import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class RegisterPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Registration form locators
  get genderMale(): Locator {
    return this.page.locator('#gender-male');
  }

  get genderFemale(): Locator {
    return this.page.locator('#gender-female');
  }

  get firstNameInput(): Locator {
    return this.page.locator('#FirstName');
  }

  get lastNameInput(): Locator {
    return this.page.locator('#LastName');
  }

  get emailInput(): Locator {
    return this.page.locator('#Email');
  }

  get passwordInput(): Locator {
    return this.page.locator('#Password');
  }

  get confirmPasswordInput(): Locator {
    return this.page.locator('#ConfirmPassword');
  }

  get registerButton(): Locator {
    return this.page.locator('#register-button');
  }

  get continueButton(): Locator {
    return this.page.locator('input[value="Continue"]');
  }

  // Validation error locators
  get validationSummary(): Locator {
    return this.page.locator('.validation-summary-errors');
  }

  get validationSummaryText(): Locator {
    return this.page.locator('.validation-summary-errors ul li');
  }

  get firstNameError(): Locator {
    return this.page.locator('#FirstName-error');
  }

  get lastNameError(): Locator {
    return this.page.locator('#LastName-error');
  }

  get emailError(): Locator {
    return this.page.locator('#Email-error');
  }

  get passwordError(): Locator {
    return this.page.locator('#Password-error');
  }

  get confirmPasswordError(): Locator {
    return this.page.locator('#ConfirmPassword-error');
  }

  // Success message locators
  get registrationResult(): Locator {
    return this.page.locator('.result');
  }

  get registrationSuccessMessage(): Locator {
    return this.page.locator('.result .title');
  }

  get registrationForm(): Locator {
    return this.page.locator('.register-page .form-fields');
  }

  get pageTitle(): Locator {
    return this.page.locator('.page-title h1');
  }

  // Registration methods
  async navigateToRegisterPage(): Promise<void> {
    await this.navigateTo('/register');
  }

  async register(
    gender: 'male' | 'female',
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword?: string
  ): Promise<void> {
    // Select gender
    if (gender === 'male') {
      await this.clickElement(this.genderMale);
    } else {
      await this.clickElement(this.genderFemale);
    }

    // Fill form fields
    await this.fillField(this.firstNameInput, firstName);
    await this.fillField(this.lastNameInput, lastName);
    await this.fillField(this.emailInput, email);
    await this.fillField(this.passwordInput, password);
    
    const confirmPass = confirmPassword || password;
    await this.fillField(this.confirmPasswordInput, confirmPass);

    // Submit registration
    await this.clickElement(this.registerButton);
    await this.waitForPageLoad();
  }

  async clickContinue(): Promise<void> {
    await this.clickElement(this.continueButton);
    await this.waitForPageLoad();
  }

  async selectGender(gender: 'male' | 'female'): Promise<void> {
    if (gender === 'male') {
      await this.clickElement(this.genderMale);
    } else {
      await this.clickElement(this.genderFemale);
    }
  }

  async setFirstName(firstName: string): Promise<void> {
    await this.fillField(this.firstNameInput, firstName);
  }

  async setLastName(lastName: string): Promise<void> {
    await this.fillField(this.lastNameInput, lastName);
  }

  async setEmail(email: string): Promise<void> {
    await this.fillField(this.emailInput, email);
  }

  async setPassword(password: string): Promise<void> {
    await this.fillField(this.passwordInput, password);
  }

  async setConfirmPassword(confirmPassword: string): Promise<void> {
    await this.fillField(this.confirmPasswordInput, confirmPassword);
  }

  async clearRegistrationForm(): Promise<void> {
    await this.clearField(this.firstNameInput);
    await this.clearField(this.lastNameInput);
    await this.clearField(this.emailInput);
    await this.clearField(this.passwordInput);
    await this.clearField(this.confirmPasswordInput);
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

  async getFirstNameError(): Promise<string> {
    return await this.getElementText(this.firstNameError);
  }

  async getLastNameError(): Promise<string> {
    return await this.getElementText(this.lastNameError);
  }

  async getEmailError(): Promise<string> {
    return await this.getElementText(this.emailError);
  }

  async getPasswordError(): Promise<string> {
    return await this.getElementText(this.passwordError);
  }

  async getConfirmPasswordError(): Promise<string> {
    return await this.getElementText(this.confirmPasswordError);
  }

  async getRegistrationResult(): Promise<string> {
    await this.waitForElement(this.registrationResult);
    return await this.getElementText(this.registrationResult);
  }

  async getRegistrationSuccessMessage(): Promise<string> {
    await this.waitForElement(this.registrationSuccessMessage);
    return await this.getElementText(this.registrationSuccessMessage);
  }

  async isRegistrationFormVisible(): Promise<boolean> {
    return await this.isElementVisible(this.registrationForm);
  }

  async isValidationErrorVisible(): Promise<boolean> {
    return await this.isElementVisible(this.validationSummary);
  }

  async isRegistrationSuccessful(): Promise<boolean> {
    const result = await this.getRegistrationResult();
    return result.includes('Your registration completed') || result.includes('successful');
  }

  async isOnRegistrationPage(): Promise<boolean> {
    const url = await this.getCurrentUrl();
    return url.includes('/register');
  }

  async getPageTitle(): Promise<string> {
    return await this.getElementText(this.pageTitle);
  }

  async isRegisterButtonEnabled(): Promise<boolean> {
    return await this.registerButton.isEnabled();
  }

  async isContinueButtonVisible(): Promise<boolean> {
    return await this.isElementVisible(this.continueButton);
  }

  async getCurrentFirstNameValue(): Promise<string> {
    return await this.firstNameInput.inputValue();
  }

  async getCurrentLastNameValue(): Promise<string> {
    return await this.lastNameInput.inputValue();
  }

  async getCurrentEmailValue(): Promise<string> {
    return await this.emailInput.inputValue();
  }

  async getCurrentPasswordValue(): Promise<string> {
    return await this.passwordInput.inputValue();
  }

  async getCurrentConfirmPasswordValue(): Promise<string> {
    return await this.confirmPasswordInput.inputValue();
  }

  async isGenderSelected(gender: 'male' | 'female'): Promise<boolean> {
    if (gender === 'male') {
      return await this.genderMale.isChecked();
    } else {
      return await this.genderFemale.isChecked();
    }
  }

  async waitForRegistrationSuccess(): Promise<void> {
    await this.waitForElement(this.registrationResult, 10000);
  }

  async waitForRegistrationError(): Promise<void> {
    await this.waitForElement(this.validationSummary, 5000);
  }
}
