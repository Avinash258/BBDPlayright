const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { RegisterPage } = require('../pages/RegisterPage');

// Registration step definitions for DemoWebshop

Given('I am on the registration page', async function () {
  this.registerPage = new RegisterPage(this.page);
  await this.registerPage.navigateToRegisterPage();
  await this.registerPage.waitForPageLoad();
});

When('I enter first name {string}', async function (firstName) {
  this.registerPage = new RegisterPage(this.page);
  await this.registerPage.setFirstName(firstName);
});

When('I enter last name {string}', async function (lastName) {
  this.registerPage = new RegisterPage(this.page);
  await this.registerPage.setLastName(lastName);
});

When('I enter email {string}', async function (email) {
  this.registerPage = new RegisterPage(this.page);
  await this.registerPage.setEmail(email);
});

When('I enter password {string}', async function (password) {
  this.registerPage = new RegisterPage(this.page);
  await this.registerPage.setPassword(password);
});

When('I enter confirm password {string}', async function (confirmPassword) {
  this.registerPage = new RegisterPage(this.page);
  await this.registerPage.setConfirmPassword(confirmPassword);
});

When('I enter registration details {string}, {string}, {string}, {string}, {string}', async function (firstName, lastName, email, password, confirmPassword) {
  this.registerPage = new RegisterPage(this.page);
  await this.registerPage.setFirstName(firstName);
  await this.registerPage.setLastName(lastName);
  await this.registerPage.setEmail(email);
  await this.registerPage.setPassword(password);
  await this.registerPage.setConfirmPassword(confirmPassword);
});

When('I click the register button', async function () {
  this.registerPage = new RegisterPage(this.page);
  await this.registerPage.clickRegisterButton();
});

When('I click the male gender radio button', async function () {
  this.registerPage = new RegisterPage(this.page);
  await this.registerPage.selectMaleGender();
});

When('I click the female gender radio button', async function () {
  this.registerPage = new RegisterPage(this.page);
  await this.registerPage.selectFemaleGender();
});

Then('I should be on the registration page', async function () {
  await expect(this.page).toHaveURL(/.*\/register/);
  await expect(this.page).toHaveTitle(/Demo Web Shop/);
});

Then('I should see the first name input field', async function () {
  this.registerPage = new RegisterPage(this.page);
  await expect(this.registerPage.firstNameInput).toBeVisible();
});

Then('I should see the last name input field', async function () {
  this.registerPage = new RegisterPage(this.page);
  await expect(this.registerPage.lastNameInput).toBeVisible();
});

Then('I should see the email input field', async function () {
  this.registerPage = new RegisterPage(this.page);
  await expect(this.registerPage.emailInput).toBeVisible();
});

Then('I should see the password input field', async function () {
  this.registerPage = new RegisterPage(this.page);
  await expect(this.registerPage.passwordInput).toBeVisible();
});

Then('I should see the confirm password input field', async function () {
  this.registerPage = new RegisterPage(this.page);
  await expect(this.registerPage.confirmPasswordInput).toBeVisible();
});

Then('I should see the register button', async function () {
  this.registerPage = new RegisterPage(this.page);
  await expect(this.registerPage.registerButton).toBeVisible();
});

Then('I should see the male gender radio button', async function () {
  this.registerPage = new RegisterPage(this.page);
  await expect(this.registerPage.maleGenderRadio).toBeVisible();
});

Then('I should see the female gender radio button', async function () {
  this.registerPage = new RegisterPage(this.page);
  await expect(this.registerPage.femaleGenderRadio).toBeVisible();
});

Then('I should be redirected to the home page', async function () {
  await expect(this.page).toHaveURL(/.*demowebshop\.tricentis\.com/);
  await expect(this.page).toHaveTitle(/Demo Web Shop/);
});

Then('I should see a registration success message', async function () {
  await expect(this.page.locator('.success')).toBeVisible();
});

Then('I should see a registration error message', async function () {
  await expect(this.page.locator('.error')).toBeVisible();
});

Then('I should see validation errors', async function () {
  await expect(this.page.locator('.validation-summary-errors')).toBeVisible();
});

Then('I should see the first name field is empty', async function () {
  this.registerPage = new RegisterPage(this.page);
  await expect(this.registerPage.firstNameInput).toHaveValue('');
});

Then('I should see the last name field is empty', async function () {
  this.registerPage = new RegisterPage(this.page);
  await expect(this.registerPage.lastNameInput).toHaveValue('');
});

Then('I should see the email field is empty', async function () {
  this.registerPage = new RegisterPage(this.page);
  await expect(this.registerPage.emailInput).toHaveValue('');
});

Then('I should see the password field is empty', async function () {
  this.registerPage = new RegisterPage(this.page);
  await expect(this.registerPage.passwordInput).toHaveValue('');
});

Then('I should see the confirm password field is empty', async function () {
  this.registerPage = new RegisterPage(this.page);
  await expect(this.registerPage.confirmPasswordInput).toHaveValue('');
});
