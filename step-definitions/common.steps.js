const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { LoginPage } = require('../pages/LoginPage');
const { RegisterPage } = require('../pages/RegisterPage');
const { ProductPage } = require('../pages/ProductPage');
const { ShoppingCartPage } = require('../pages/ShoppingCartPage');

// Common step definitions for DemoWebshop

Given('I am on the DemoWebshop home page', async function () {
  this.homePage = new HomePage(this.page);
  await this.homePage.navigateToHomePage();
  await this.homePage.waitForPageLoad();
});

Given('I am on the login page', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigateToLoginPage();
  await this.loginPage.waitForPageLoad();
});

Given('I am on the registration page', async function () {
  this.registerPage = new RegisterPage(this.page);
  await this.registerPage.navigateToRegisterPage();
  await this.registerPage.waitForPageLoad();
});

Given('I am on the shopping cart page', async function () {
  this.shoppingCartPage = new ShoppingCartPage(this.page);
  await this.shoppingCartPage.navigateToShoppingCart();
  await this.shoppingCartPage.waitForPageLoad();
});

When('I navigate to the home page', async function () {
  this.homePage = new HomePage(this.page);
  await this.homePage.navigateToHomePage();
  await this.homePage.waitForPageLoad();
});

When('I navigate to the login page', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigateToLoginPage();
  await this.loginPage.waitForPageLoad();
});

When('I navigate to the registration page', async function () {
  this.registerPage = new RegisterPage(this.page);
  await this.registerPage.navigateToRegisterPage();
  await this.registerPage.waitForPageLoad();
});

When('I search for {string}', async function (searchTerm) {
  this.homePage = new HomePage(this.page);
  await this.homePage.searchForProduct(searchTerm);
});

When('I click on the search button', async function () {
  this.homePage = new HomePage(this.page);
  await this.homePage.clickSearchButton();
});

When('I click on the newsletter subscribe button', async function () {
  this.homePage = new HomePage(this.page);
  await this.homePage.subscribeToNewsletter();
});

When('I vote in the poll with option {string}', async function (pollOption) {
  this.homePage = new HomePage(this.page);
  await this.homePage.voteInPoll(pollOption);
});

Then('I should be on the home page', async function () {
  await expect(this.page).toHaveURL(/.*demowebshop\.tricentis\.com/);
  await expect(this.page).toHaveTitle(/Demo Web Shop/);
});

Then('I should be on the login page', async function () {
  await expect(this.page).toHaveURL(/.*\/login/);
  await expect(this.page).toHaveTitle(/Demo Web Shop/);
});

Then('I should be on the registration page', async function () {
  await expect(this.page).toHaveURL(/.*\/register/);
  await expect(this.page).toHaveTitle(/Demo Web Shop/);
});

Then('I should see the page title {string}', async function (expectedTitle) {
  await expect(this.page).toHaveTitle(expectedTitle);
});

Then('I should see the header logo is visible', async function () {
  this.homePage = new HomePage(this.page);
  await expect(this.homePage.headerLogo).toBeVisible();
});

Then('I should see the login link is visible', async function () {
  this.homePage = new HomePage(this.page);
  await expect(this.homePage.loginLink).toBeVisible();
});

Then('I should see the register link is visible', async function () {
  this.homePage = new HomePage(this.page);
  await expect(this.homePage.registerLink).toBeVisible();
});

Then('I should see the shopping cart link is visible', async function () {
  this.homePage = new HomePage(this.page);
  await expect(this.homePage.shoppingCartLink).toBeVisible();
});

Then('I should see the search box is visible', async function () {
  this.homePage = new HomePage(this.page);
  await expect(this.homePage.searchBox).toBeVisible();
});

Then('I should see search results', async function () {
  this.homePage = new HomePage(this.page);
  await expect(this.homePage.searchResults).toBeVisible();
});

Then('I should see the newsletter subscription form', async function () {
  this.homePage = new HomePage(this.page);
  await expect(this.homePage.newsletterForm).toBeVisible();
});

Then('I should see the poll section', async function () {
  this.homePage = new HomePage(this.page);
  await expect(this.homePage.pollSection).toBeVisible();
});

Then('I should see a success message', async function () {
  await expect(this.page.locator('.success')).toBeVisible();
});

Then('I should see an error message', async function () {
  await expect(this.page.locator('.error')).toBeVisible();
});
