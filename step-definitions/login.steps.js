const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

// Login step definitions for DemoWebshop

Given('I am on the login page', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigateToLoginPage();
  await this.loginPage.waitForPageLoad();
});

When('I enter email {string}', async function (email) {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.setEmail(email);
});

When('I enter password {string}', async function (password) {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.setPassword(password);
});

When('I enter login credentials {string} and {string}', async function (email, password) {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.setEmail(email);
  await this.loginPage.setPassword(password);
});

When('I check the remember me checkbox', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.checkRememberMe();
});

When('I click the login button', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.clickLoginButton();
});

When('I click the forgot password link', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.clickForgotPasswordLink();
});

Then('I should be on the login page', async function () {
  await expect(this.page).toHaveURL(/.*\/login/);
  await expect(this.page).toHaveTitle(/Demo Web Shop/);
});

Then('I should see the login email input field', async function () {
  this.loginPage = new LoginPage(this.page);
  await expect(this.loginPage.emailInput).toBeVisible();
});

Then('I should see the login password input field', async function () {
  this.loginPage = new LoginPage(this.page);
  await expect(this.loginPage.passwordInput).toBeVisible();
});

Then('I should see the login register button', async function () {
  this.loginPage = new LoginPage(this.page);
  await expect(this.loginPage.loginButton).toBeVisible();
});

Then('I should see the remember me checkbox', async function () {
  this.loginPage = new LoginPage(this.page);
  await expect(this.loginPage.rememberMeCheckbox).toBeVisible();
});

Then('I should see the forgot password link', async function () {
  this.loginPage = new LoginPage(this.page);
  await expect(this.loginPage.forgotPasswordLink).toBeVisible();
});

Then('I should be redirected to the home page', async function () {
  await expect(this.page).toHaveURL(/.*demowebshop\.tricentis\.com/);
  await expect(this.page).toHaveTitle(/Demo Web Shop/);
});

Then('I should see a login success message', async function () {
  await expect(this.page.locator('.success')).toBeVisible();
});

Then('I should see a login error message', async function () {
  await expect(this.page.locator('.error')).toBeVisible();
});

Then('I should see validation errors', async function () {
  await expect(this.page.locator('.validation-summary-errors')).toBeVisible();
});

Then('I should see the email field is empty', async function () {
  this.loginPage = new LoginPage(this.page);
  await expect(this.loginPage.emailInput).toHaveValue('');
});

Then('I should see the password field is empty', async function () {
  this.loginPage = new LoginPage(this.page);
  await expect(this.loginPage.passwordInput).toHaveValue('');
});
