import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';

// Registration step definitions for DemoWebshop

Given('I am on the registration page', async function () {
  this.registerPage = new RegisterPage(this.page);
  await this.registerPage.navigateToRegisterPage();
  await this.registerPage.waitForPageLoad();
});

When('I select gender {string}', async function (gender: 'male' | 'female') {
  this.registerPage = new RegisterPage(this.page);
  await this.registerPage.selectGender(gender);
});

When('I enter first name {string}', async function (firstName: string) {
  this.registerPage = new RegisterPage(this.page);
  await this.registerPage.setFirstName(firstName);
});

When('I enter last name {string}', async function (lastName: string) {
  this.registerPage = new RegisterPage(this.page);
  await this.registerPage.setLastName(lastName);
});

When('I enter email {string}', async function (email: string) {
  this.registerPage = new RegisterPage(this.page);
  await this.registerPage.setEmail(email);
});

When('I enter password {string}', async function (password: string) {
  this.registerPage = new RegisterPage(this.page);
  await this.registerPage.setPassword(password);
});

When('I enter confirm password {string}', async function (confirmPassword: string) {
  this.registerPage = new RegisterPage(this.page);
  await this.registerPage.setConfirmPassword(confirmPassword);
});

When('I enter registration details {string}, {string}, {string}, {string}, {string}', async function (
  firstName: string, lastName: string, email: string, password: string, confirmPassword: string
) {
  this.registerPage = new RegisterPage(this.page);
  await this.registerPage.setFirstName(firstName);
  await this.registerPage.setLastName(lastName);
  await this.registerPage.setEmail(email);
  await this.registerPage.setPassword(password);
  await this.registerPage.setConfirmPassword(confirmPassword);
});

When('I click the register button', async function () {
  this.registerPage = new RegisterPage(this.page);
  await this.registerPage.clickElement(this.registerPage.registerButton);
  await this.registerPage.waitForPageLoad();
});

When('I click the continue button', async function () {
  this.registerPage = new RegisterPage(this.page);
  await this.registerPage.clickContinue();
});

When('I clear the registration form', async function () {
  this.registerPage = new RegisterPage(this.page);
  await this.registerPage.clearRegistrationForm();
});

When('I register with gender {string}, first name {string}, last name {string}, email {string}, password {string}', async function (
  gender: 'male' | 'female', firstName: string, lastName: string, email: string, password: string
) {
  this.registerPage = new RegisterPage(this.page);
  await this.registerPage.register(gender, firstName, lastName, email, password);
});

When('I register with gender {string}, first name {string}, last name {string}, email {string}, password {string}, confirm password {string}', async function (
  gender: 'male' | 'female', firstName: string, lastName: string, email: string, password: string, confirmPassword: string
) {
  this.registerPage = new RegisterPage(this.page);
  await this.registerPage.register(gender, firstName, lastName, email, password, confirmPassword);
});

Then('I should be on the registration page', async function () {
  this.registerPage = new RegisterPage(this.page);
  const isOnRegistrationPage = await this.registerPage.isOnRegistrationPage();
  expect(isOnRegistrationPage).toBe(true);
});

Then('I should see the registration form', async function () {
  this.registerPage = new RegisterPage(this.page);
  const isVisible = await this.registerPage.isRegistrationFormVisible();
  expect(isVisible).toBe(true);
});

Then('I should see the male gender option', async function () {
  this.registerPage = new RegisterPage(this.page);
  const isVisible = await this.registerPage.isElementVisible(this.registerPage.genderMale);
  expect(isVisible).toBe(true);
});

Then('I should see the female gender option', async function () {
  this.registerPage = new RegisterPage(this.page);
  const isVisible = await this.registerPage.isElementVisible(this.registerPage.genderFemale);
  expect(isVisible).toBe(true);
});

Then('I should see the first name input field', async function () {
  this.registerPage = new RegisterPage(this.page);
  const isVisible = await this.registerPage.isElementVisible(this.registerPage.firstNameInput);
  expect(isVisible).toBe(true);
});

Then('I should see the last name input field', async function () {
  this.registerPage = new RegisterPage(this.page);
  const isVisible = await this.registerPage.isElementVisible(this.registerPage.lastNameInput);
  expect(isVisible).toBe(true);
});

Then('I should see the email input field', async function () {
  this.registerPage = new RegisterPage(this.page);
  const isVisible = await this.registerPage.isElementVisible(this.registerPage.emailInput);
  expect(isVisible).toBe(true);
});

Then('I should see the password input field', async function () {
  this.registerPage = new RegisterPage(this.page);
  const isVisible = await this.registerPage.isElementVisible(this.registerPage.passwordInput);
  expect(isVisible).toBe(true);
});

Then('I should see the confirm password input field', async function () {
  this.registerPage = new RegisterPage(this.page);
  const isVisible = await this.registerPage.isElementVisible(this.registerPage.confirmPasswordInput);
  expect(isVisible).toBe(true);
});

Then('I should see the register button', async function () {
  this.registerPage = new RegisterPage(this.page);
  const isVisible = await this.registerPage.isElementVisible(this.registerPage.registerButton);
  expect(isVisible).toBe(true);
});

Then('I should see the continue button', async function () {
  this.registerPage = new RegisterPage(this.page);
  const isVisible = await this.registerPage.isContinueButtonVisible();
  expect(isVisible).toBe(true);
});

Then('I should see the register button is enabled', async function () {
  this.registerPage = new RegisterPage(this.page);
  const isEnabled = await this.registerPage.isRegisterButtonEnabled();
  expect(isEnabled).toBe(true);
});

Then('I should see the register button is disabled', async function () {
  this.registerPage = new RegisterPage(this.page);
  const isEnabled = await this.registerPage.isRegisterButtonEnabled();
  expect(isEnabled).toBe(false);
});

Then('I should see the male gender is selected', async function () {
  this.registerPage = new RegisterPage(this.page);
  const isSelected = await this.registerPage.isGenderSelected('male');
  expect(isSelected).toBe(true);
});

Then('I should see the female gender is selected', async function () {
  this.registerPage = new RegisterPage(this.page);
  const isSelected = await this.registerPage.isGenderSelected('female');
  expect(isSelected).toBe(true);
});

Then('I should see the first name field contains {string}', async function (expectedFirstName: string) {
  this.registerPage = new RegisterPage(this.page);
  const actualFirstName = await this.registerPage.getCurrentFirstNameValue();
  expect(actualFirstName).toBe(expectedFirstName);
});

Then('I should see the last name field contains {string}', async function (expectedLastName: string) {
  this.registerPage = new RegisterPage(this.page);
  const actualLastName = await this.registerPage.getCurrentLastNameValue();
  expect(actualLastName).toBe(expectedLastName);
});

Then('I should see the email field contains {string}', async function (expectedEmail: string) {
  this.registerPage = new RegisterPage(this.page);
  const actualEmail = await this.registerPage.getCurrentEmailValue();
  expect(actualEmail).toBe(expectedEmail);
});

Then('I should see the password field contains {string}', async function (expectedPassword: string) {
  this.registerPage = new RegisterPage(this.page);
  const actualPassword = await this.registerPage.getCurrentPasswordValue();
  expect(actualPassword).toBe(expectedPassword);
});

Then('I should see the confirm password field contains {string}', async function (expectedConfirmPassword: string) {
  this.registerPage = new RegisterPage(this.page);
  const actualConfirmPassword = await this.registerPage.getCurrentConfirmPasswordValue();
  expect(actualConfirmPassword).toBe(expectedConfirmPassword);
});

Then('I should see the first name field is empty', async function () {
  this.registerPage = new RegisterPage(this.page);
  const firstNameValue = await this.registerPage.getCurrentFirstNameValue();
  expect(firstNameValue).toBe('');
});

Then('I should see the last name field is empty', async function () {
  this.registerPage = new RegisterPage(this.page);
  const lastNameValue = await this.registerPage.getCurrentLastNameValue();
  expect(lastNameValue).toBe('');
});

Then('I should see the email field is empty', async function () {
  this.registerPage = new RegisterPage(this.page);
  const emailValue = await this.registerPage.getCurrentEmailValue();
  expect(emailValue).toBe('');
});

Then('I should see the password field is empty', async function () {
  this.registerPage = new RegisterPage(this.page);
  const passwordValue = await this.registerPage.getCurrentPasswordValue();
  expect(passwordValue).toBe('');
});

Then('I should see the confirm password field is empty', async function () {
  this.registerPage = new RegisterPage(this.page);
  const confirmPasswordValue = await this.registerPage.getCurrentConfirmPasswordValue();
  expect(confirmPasswordValue).toBe('');
});

Then('I should see validation errors', async function () {
  this.registerPage = new RegisterPage(this.page);
  const hasErrors = await this.registerPage.isValidationErrorVisible();
  expect(hasErrors).toBe(true);
});

Then('I should not see validation errors', async function () {
  this.registerPage = new RegisterPage(this.page);
  const hasErrors = await this.registerPage.isValidationErrorVisible();
  expect(hasErrors).toBe(false);
});

Then('I should see the validation error {string}', async function (expectedError: string) {
  this.registerPage = new RegisterPage(this.page);
  const errors = await this.registerPage.getValidationSummaryErrors();
  const hasExpectedError = errors.some((error: string) => error.includes(expectedError));
  expect(hasExpectedError).toBe(true);
});

Then('I should see the first name validation error {string}', async function (expectedError: string) {
  this.registerPage = new RegisterPage(this.page);
  const error = await this.registerPage.getFirstNameError();
  expect(error).toContain(expectedError);
});

Then('I should see the last name validation error {string}', async function (expectedError: string) {
  this.registerPage = new RegisterPage(this.page);
  const error = await this.registerPage.getLastNameError();
  expect(error).toContain(expectedError);
});

Then('I should see the email validation error {string}', async function (expectedError: string) {
  this.registerPage = new RegisterPage(this.page);
  const error = await this.registerPage.getEmailError();
  expect(error).toContain(expectedError);
});

Then('I should see the password validation error {string}', async function (expectedError: string) {
  this.registerPage = new RegisterPage(this.page);
  const error = await this.registerPage.getPasswordError();
  expect(error).toContain(expectedError);
});

Then('I should see the confirm password validation error {string}', async function (expectedError: string) {
  this.registerPage = new RegisterPage(this.page);
  const error = await this.registerPage.getConfirmPasswordError();
  expect(error).toContain(expectedError);
});

Then('I should see the registration success message', async function () {
  this.registerPage = new RegisterPage(this.page);
  const isSuccessful = await this.registerPage.isRegistrationSuccessful();
  expect(isSuccessful).toBe(true);
});

Then('I should not see the registration success message', async function () {
  this.registerPage = new RegisterPage(this.page);
  const isSuccessful = await this.registerPage.isRegistrationSuccessful();
  expect(isSuccessful).toBe(false);
});

Then('I should see the registration result {string}', async function (expectedResult: string) {
  this.registerPage = new RegisterPage(this.page);
  const actualResult = await this.registerPage.getRegistrationResult();
  expect(actualResult).toContain(expectedResult);
});

Then('I should see the registration success message {string}', async function (expectedMessage: string) {
  this.registerPage = new RegisterPage(this.page);
  const actualMessage = await this.registerPage.getRegistrationSuccessMessage();
  expect(actualMessage).toContain(expectedMessage);
});


Then('I should be redirected to the home page', async function () {
  const currentUrl = await this.page.url();
  expect(currentUrl).toMatch(/\/$|\/home/);
});

Then('I should be redirected to the account page', async function () {
  const currentUrl = await this.page.url();
  expect(currentUrl).toContain('/customer');
});

Then('I should wait for registration success', async function () {
  this.registerPage = new RegisterPage(this.page);
  await this.registerPage.waitForRegistrationSuccess();
});

Then('I should wait for registration error', async function () {
  this.registerPage = new RegisterPage(this.page);
  await this.registerPage.waitForRegistrationError();
});
