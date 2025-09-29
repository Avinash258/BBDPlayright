const { BasePage } = require('./BasePage');

class RegisterPage extends BasePage {
  constructor(page) {
    super(page);
  }

  // Registration page locators
  get firstNameInput() {
    return this.page.locator('#FirstName');
  }

  get lastNameInput() {
    return this.page.locator('#LastName');
  }

  get emailInput() {
    return this.page.locator('#Email');
  }

  get passwordInput() {
    return this.page.locator('#Password');
  }

  get confirmPasswordInput() {
    return this.page.locator('#ConfirmPassword');
  }

  get registerButton() {
    return this.page.locator('input[value="Register"]');
  }

  get maleGenderRadio() {
    return this.page.locator('#gender-male');
  }

  get femaleGenderRadio() {
    return this.page.locator('#gender-female');
  }

  get validationErrors() {
    return this.page.locator('.validation-summary-errors');
  }

  get successMessage() {
    return this.page.locator('.result');
  }

  // Registration page methods
  async navigateToRegisterPage() {
    await this.page.goto('https://demowebshop.tricentis.com/register');
    await this.waitForPageLoad();
  }

  async setFirstName(firstName) {
    await this.firstNameInput.fill(firstName);
  }

  async setLastName(lastName) {
    await this.lastNameInput.fill(lastName);
  }

  async setEmail(email) {
    await this.emailInput.fill(email);
  }

  async setPassword(password) {
    await this.passwordInput.fill(password);
  }

  async setConfirmPassword(confirmPassword) {
    await this.confirmPasswordInput.fill(confirmPassword);
  }

  async clickRegisterButton() {
    await this.registerButton.click();
    await this.waitForPageLoad();
  }

  async selectMaleGender() {
    await this.maleGenderRadio.check();
  }

  async selectFemaleGender() {
    await this.femaleGenderRadio.check();
  }

  async register(firstName, lastName, email, password, confirmPassword) {
    await this.setFirstName(firstName);
    await this.setLastName(lastName);
    await this.setEmail(email);
    await this.setPassword(password);
    await this.setConfirmPassword(confirmPassword);
    await this.clickRegisterButton();
  }

  async isRegistrationSuccessful() {
    return await this.page.url().includes('demowebshop.tricentis.com') && 
           !await this.page.url().includes('/register');
  }

  async getValidationErrors() {
    return await this.validationErrors.textContent();
  }

  async getSuccessMessage() {
    return await this.successMessage.textContent();
  }
}

module.exports = { RegisterPage };
