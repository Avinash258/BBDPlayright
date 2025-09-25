import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

// Login step definitions for DemoWebshop

Given('I am on the login page', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigateToLoginPage();
  await this.loginPage.waitForPageLoad();
});

When('I enter email {string}', async function (email: string) {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.setEmail(email);
});

When('I enter password {string}', async function (password: string) {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.setPassword(password);
});

When('I enter login credentials {string} and {string}', async function (email: string, password: string) {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.setEmail(email);
  await this.loginPage.setPassword(password);
});

When('I check the remember me checkbox', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.toggleRememberMe();
});

When('I uncheck the remember me checkbox', async function () {
  this.loginPage = new LoginPage(this.page);
  const isChecked = await this.loginPage.isRememberMeChecked();
  if (isChecked) {
    await this.loginPage.toggleRememberMe();
  }
});

When('I click the login button', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.clickElement(this.loginPage.loginButton);
  await this.loginPage.waitForPageLoad();
});

When('I click the forgot password link', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.clickForgotPassword();
});

When('I click the register button', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.clickRegisterButton();
});

When('I click the guest checkout button', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.clickGuestCheckout();
});

When('I clear the login form', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.clearLoginForm();
});

When('I login with email {string} and password {string}', async function (email: string, password: string) {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.login(email, password);
});

When('I login with email {string} and password {string} and remember me', async function (email: string, password: string) {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.login(email, password, true);
});


Then('I should see the login form', async function () {
  this.loginPage = new LoginPage(this.page);
  const isVisible = await this.loginPage.isLoginFormVisible();
  expect(isVisible).toBe(true);
});

Then('I should see the return customer section', async function () {
  this.loginPage = new LoginPage(this.page);
  const isVisible = await this.loginPage.isReturnCustomerSectionVisible();
  expect(isVisible).toBe(true);
});

Then('I should see the new customer section', async function () {
  this.loginPage = new LoginPage(this.page);
  const isVisible = await this.loginPage.isNewCustomerSectionVisible();
  expect(isVisible).toBe(true);
});

Then('I should see the login email input field', async function () {
  this.loginPage = new LoginPage(this.page);
  const isVisible = await this.loginPage.isElementVisible(this.loginPage.emailInput);
  expect(isVisible).toBe(true);
});

Then('I should see the login password input field', async function () {
  this.loginPage = new LoginPage(this.page);
  const isVisible = await this.loginPage.isElementVisible(this.loginPage.passwordInput);
  expect(isVisible).toBe(true);
});

Then('I should see the login button', async function () {
  this.loginPage = new LoginPage(this.page);
  const isVisible = await this.loginPage.isElementVisible(this.loginPage.loginButton);
  expect(isVisible).toBe(true);
});

Then('I should see the remember me checkbox', async function () {
  this.loginPage = new LoginPage(this.page);
  const isVisible = await this.loginPage.isElementVisible(this.loginPage.rememberMeCheckbox);
  expect(isVisible).toBe(true);
});

Then('I should see the forgot password link', async function () {
  this.loginPage = new LoginPage(this.page);
  const isVisible = await this.loginPage.isElementVisible(this.loginPage.forgotPasswordLink);
  expect(isVisible).toBe(true);
});

Then('I should see the register button', async function () {
  this.loginPage = new LoginPage(this.page);
  const isVisible = await this.loginPage.isElementVisible(this.loginPage.registerButton);
  expect(isVisible).toBe(true);
});

Then('I should see the guest checkout button', async function () {
  this.loginPage = new LoginPage(this.page);
  const isVisible = await this.loginPage.isElementVisible(this.loginPage.guestCheckoutButton);
  expect(isVisible).toBe(true);
});

Then('I should see the login button is enabled', async function () {
  this.loginPage = new LoginPage(this.page);
  const isEnabled = await this.loginPage.isLoginButtonEnabled();
  expect(isEnabled).toBe(true);
});

Then('I should see the login button is disabled', async function () {
  this.loginPage = new LoginPage(this.page);
  const isEnabled = await this.loginPage.isLoginButtonEnabled();
  expect(isEnabled).toBe(false);
});

Then('I should see the remember me checkbox is checked', async function () {
  this.loginPage = new LoginPage(this.page);
  const isChecked = await this.loginPage.isRememberMeChecked();
  expect(isChecked).toBe(true);
});

Then('I should see the remember me checkbox is not checked', async function () {
  this.loginPage = new LoginPage(this.page);
  const isChecked = await this.loginPage.isRememberMeChecked();
  expect(isChecked).toBe(false);
});

Then('I should see the email field contains {string}', async function (expectedEmail: string) {
  this.loginPage = new LoginPage(this.page);
  const actualEmail = await this.loginPage.getCurrentEmailValue();
  expect(actualEmail).toBe(expectedEmail);
});

Then('I should see the password field contains {string}', async function (expectedPassword: string) {
  this.loginPage = new LoginPage(this.page);
  const actualPassword = await this.loginPage.getCurrentPasswordValue();
  expect(actualPassword).toBe(expectedPassword);
});

Then('I should see the email field is empty', async function () {
  this.loginPage = new LoginPage(this.page);
  const emailValue = await this.loginPage.getCurrentEmailValue();
  expect(emailValue).toBe('');
});

Then('I should see the password field is empty', async function () {
  this.loginPage = new LoginPage(this.page);
  const passwordValue = await this.loginPage.getCurrentPasswordValue();
  expect(passwordValue).toBe('');
});

Then('I should see validation errors', async function () {
  this.loginPage = new LoginPage(this.page);
  const hasErrors = await this.loginPage.isValidationErrorVisible();
  expect(hasErrors).toBe(true);
});

Then('I should not see validation errors', async function () {
  this.loginPage = new LoginPage(this.page);
  const hasErrors = await this.loginPage.isValidationErrorVisible();
  expect(hasErrors).toBe(false);
});

Then('I should see the validation error {string}', async function (expectedError: string) {
  this.loginPage = new LoginPage(this.page);
  const errors = await this.loginPage.getValidationSummaryErrors();
  const hasExpectedError = errors.some((error: string) => error.includes(expectedError));
  expect(hasExpectedError).toBe(true);
});

Then('I should see the email validation error {string}', async function (expectedError: string) {
  this.loginPage = new LoginPage(this.page);
  const error = await this.loginPage.getEmailValidationError();
  expect(error).toContain(expectedError);
});

Then('I should see the password validation error {string}', async function (expectedError: string) {
  this.loginPage = new LoginPage(this.page);
  const error = await this.loginPage.getPasswordValidationError();
  expect(error).toContain(expectedError);
});

Then('I should be logged in successfully', async function () {
  this.loginPage = new LoginPage(this.page);
  const isLoggedIn = await this.loginPage.isLoggedIn();
  expect(isLoggedIn).toBe(true);
});

Then('I should not be logged in', async function () {
  this.loginPage = new LoginPage(this.page);
  const isLoggedIn = await this.loginPage.isLoggedIn();
  expect(isLoggedIn).toBe(false);
});

Then('I should see the login form title {string}', async function (expectedTitle: string) {
  this.loginPage = new LoginPage(this.page);
  const actualTitle = await this.loginPage.getLoginFormTitle();
  expect(actualTitle).toContain(expectedTitle);
});

Then('I should be redirected to the home page', async function () {
  const currentUrl = await this.page.url();
  expect(currentUrl).toMatch(/\/$|\/home/);
});

Then('I should be redirected to the account page', async function () {
  const currentUrl = await this.page.url();
  expect(currentUrl).toContain('/customer');
});

Then('I should be redirected to the forgot password page', async function () {
  const currentUrl = await this.page.url();
  expect(currentUrl).toContain('/passwordrecovery');
});

Then('I should be redirected to the registration page', async function () {
  const currentUrl = await this.page.url();
  expect(currentUrl).toContain('/register');
});

Then('I should be redirected to the checkout page', async function () {
  const currentUrl = await this.page.url();
  expect(currentUrl).toContain('/checkout');
});

Then('I should wait for login success', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.waitForLoginSuccess();
});

Then('I should wait for login error', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.waitForLoginError();
});
