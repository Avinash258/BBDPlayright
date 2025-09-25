import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { ProductPage } from '../pages/ProductPage';
import { ShoppingCartPage } from '../pages/ShoppingCartPage';

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

When('I navigate to the shopping cart page', async function () {
  this.shoppingCartPage = new ShoppingCartPage(this.page);
  await this.shoppingCartPage.navigateToShoppingCart();
  await this.shoppingCartPage.waitForPageLoad();
});

When('I click on the login link', async function () {
  this.homePage = new HomePage(this.page);
  await this.homePage.clickElement(this.homePage.loginLink);
});

When('I click on the register link', async function () {
  this.homePage = new HomePage(this.page);
  await this.homePage.clickElement(this.homePage.registerLink);
});

When('I click on the shopping cart link', async function () {
  this.homePage = new HomePage(this.page);
  await this.homePage.clickElement(this.homePage.shoppingCartLink);
});

When('I click on the wishlist link', async function () {
  this.homePage = new HomePage(this.page);
  await this.homePage.clickElement(this.homePage.wishlistLink);
});

When('I click on the account link', async function () {
  this.homePage = new HomePage(this.page);
  await this.homePage.clickElement(this.homePage.accountLink);
});

When('I click on the logout link', async function () {
  this.homePage = new HomePage(this.page);
  await this.homePage.clickElement(this.homePage.logoutLink);
});

When('I search for {string}', async function (searchTerm: string) {
  this.homePage = new HomePage(this.page);
  await this.homePage.searchForProduct(searchTerm);
});

When('I wait for {int} seconds', async function (seconds: number) {
  await this.page.waitForTimeout(seconds * 1000);
});

When('I take a screenshot named {string}', async function (screenshotName: string) {
  this.homePage = new HomePage(this.page);
  await this.homePage.takeScreenshot(screenshotName);
});

When('I refresh the page', async function () {
  this.homePage = new HomePage(this.page);
  await this.homePage.refreshPage();
});

When('I go back to the previous page', async function () {
  this.homePage = new HomePage(this.page);
  await this.homePage.goBack();
});

When('I go forward to the next page', async function () {
  this.homePage = new HomePage(this.page);
  await this.homePage.goForward();
});

Then('I should be on the home page', async function () {
  const currentUrl = await this.page.url();
  expect(currentUrl).toContain('demowebshop.tricentis.com');
  expect(currentUrl).toMatch(/\/$|\/home/);
});

Then('I should be on the login page', async function () {
  this.loginPage = new LoginPage(this.page);
  const isOnLoginPage = await this.loginPage.isOnLoginPage();
  expect(isOnLoginPage).toBe(true);
});

Then('I should be on the registration page', async function () {
  this.registerPage = new RegisterPage(this.page);
  const isOnRegistrationPage = await this.registerPage.isOnRegistrationPage();
  expect(isOnRegistrationPage).toBe(true);
});

Then('I should be on the shopping cart page', async function () {
  this.shoppingCartPage = new ShoppingCartPage(this.page);
  const isOnShoppingCartPage = await this.shoppingCartPage.isOnShoppingCartPage();
  expect(isOnShoppingCartPage).toBe(true);
});

Then('I should see the page title {string}', async function (expectedTitle: string) {
  const actualTitle = await this.page.title();
  expect(actualTitle).toContain(expectedTitle);
});

Then('I should see the URL contains {string}', async function (expectedUrl: string) {
  const currentUrl = await this.page.url();
  expect(currentUrl).toContain(expectedUrl);
});

Then('I should see the text {string}', async function (expectedText: string) {
  const pageContent = await this.page.textContent('body');
  expect(pageContent).toContain(expectedText);
});

Then('I should not see the text {string}', async function (unexpectedText: string) {
  const pageContent = await this.page.textContent('body');
  expect(pageContent).not.toContain(unexpectedText);
});

Then('I should see the element {string}', async function (selector: string) {
  const element = this.page.locator(selector);
  await expect(element).toBeVisible();
});

Then('I should not see the element {string}', async function (selector: string) {
  const element = this.page.locator(selector);
  await expect(element).not.toBeVisible();
});

Then('I should see the element {string} contains {string}', async function (selector: string, expectedText: string) {
  const element = this.page.locator(selector);
  const elementText = await element.textContent();
  expect(elementText).toContain(expectedText);
});

Then('I should see the element {string} is enabled', async function (selector: string) {
  const element = this.page.locator(selector);
  await expect(element).toBeEnabled();
});

Then('I should see the element {string} is disabled', async function (selector: string) {
  const element = this.page.locator(selector);
  await expect(element).toBeDisabled();
});

Then('I should see the element {string} is checked', async function (selector: string) {
  const element = this.page.locator(selector);
  await expect(element).toBeChecked();
});

Then('I should see the element {string} is not checked', async function (selector: string) {
  const element = this.page.locator(selector);
  await expect(element).not.toBeChecked();
});

Then('I should see the element {string} has the value {string}', async function (selector: string, expectedValue: string) {
  const element = this.page.locator(selector);
  const actualValue = await element.inputValue();
  expect(actualValue).toBe(expectedValue);
});

Then('I should see the element {string} has the attribute {string} with value {string}', async function (selector: string, attribute: string, expectedValue: string) {
  const element = this.page.locator(selector);
  const actualValue = await element.getAttribute(attribute);
  expect(actualValue).toBe(expectedValue);
});

Then('I should see the page has loaded completely', async function () {
  await this.page.waitForLoadState('networkidle');
  const readyState = await this.page.evaluate(() => document.readyState);
  expect(readyState).toBe('complete');
});

Then('I should see the login link is visible', async function () {
  this.homePage = new HomePage(this.page);
  const isVisible = await this.homePage.isElementVisible(this.homePage.loginLink);
  expect(isVisible).toBe(true);
});

Then('I should see the register link is visible', async function () {
  this.homePage = new HomePage(this.page);
  const isVisible = await this.homePage.isElementVisible(this.homePage.registerLink);
  expect(isVisible).toBe(true);
});

Then('I should see the shopping cart link is visible', async function () {
  this.homePage = new HomePage(this.page);
  const isVisible = await this.homePage.isElementVisible(this.homePage.shoppingCartLink);
  expect(isVisible).toBe(true);
});

Then('I should see the search box is visible', async function () {
  this.homePage = new HomePage(this.page);
  const isVisible = await this.homePage.isElementVisible(this.homePage.searchBox);
  expect(isVisible).toBe(true);
});

Then('I should see the header logo is visible', async function () {
  this.homePage = new HomePage(this.page);
  const isVisible = await this.homePage.isElementVisible(this.homePage.headerLogo);
  expect(isVisible).toBe(true);
});

// Additional homepage step definitions
When('I subscribe to newsletter with email {string}', async function (email: string) {
  this.homePage = new HomePage(this.page);
  await this.homePage.subscribeToNewsletter(email);
  await this.page.waitForTimeout(2000); // Wait for subscription result
});

When('I vote in poll with option {string}', async function (option: string) {
  this.homePage = new HomePage(this.page);
  // Find the option index by text
  const pollOptions = this.homePage.pollOptions;
  const count = await pollOptions.count();
  let optionIndex = -1;
  
  for (let i = 0; i < count; i++) {
    const optionText = await this.homePage.getElementText(pollOptions.nth(i));
    if (optionText.includes(option)) {
      optionIndex = i;
      break;
    }
  }
  
  if (optionIndex >= 0) {
    await this.homePage.voteInPoll(optionIndex);
  } else {
    throw new Error(`Poll option "${option}" not found`);
  }
});

When('I hover over the first product', async function () {
  this.homePage = new HomePage(this.page);
  const firstProduct = this.homePage.featuredProducts.first();
  await this.homePage.hoverElement(firstProduct);
});

Then('I should see the featured products', async function () {
  this.homePage = new HomePage(this.page);
  const productsCount = await this.homePage.getFeaturedProductsCount();
  expect(productsCount).toBeGreaterThan(0);
});

Then('I should see {int} featured products', async function (expectedCount: number) {
  this.homePage = new HomePage(this.page);
  const actualCount = await this.homePage.getFeaturedProductsCount();
  expect(actualCount).toBe(expectedCount);
});

Then('I should see the newsletter result {string}', async function (expectedResult: string) {
  this.homePage = new HomePage(this.page);
  const actualResult = await this.homePage.getNewsletterResult();
  expect(actualResult).toContain(expectedResult);
});

Then('I should see the newsletter subscription is successful', async function () {
  this.homePage = new HomePage(this.page);
  const isSuccessful = await this.homePage.isNewsletterSubscriptionSuccessful();
  expect(isSuccessful).toBe(true);
});

Then('I should not see the newsletter subscription is successful', async function () {
  this.homePage = new HomePage(this.page);
  const isSuccessful = await this.homePage.isNewsletterSubscriptionSuccessful();
  expect(isSuccessful).toBe(false);
});

Then('I should see the poll results {string}', async function (expectedResult: string) {
  this.homePage = new HomePage(this.page);
  const actualResult = await this.homePage.getPollResults();
  expect(actualResult).toContain(expectedResult);
});

Then('I should see the poll vote is successful', async function () {
  this.homePage = new HomePage(this.page);
  const isSuccessful = await this.homePage.isPollVoteSuccessful();
  expect(isSuccessful).toBe(true);
});

Then('I should see the search results for {string}', async function (searchTerm: string) {
  // Wait for search results to load
  await this.page.waitForTimeout(2000);
  const pageContent = await this.page.textContent('body');
  expect(pageContent).toContain(searchTerm);
});

Then('I should see the products in {string} category', async function (categoryName: string) {
  const currentUrl = await this.page.url();
  expect(currentUrl).toContain(categoryName.toLowerCase());
});

Then('I should see the categories menu', async function () {
  this.homePage = new HomePage(this.page);
  const isVisible = await this.homePage.isElementVisible(this.homePage.categoriesMenu);
  expect(isVisible).toBe(true);
});

Then('I should see the category {string}', async function (categoryName: string) {
  this.homePage = new HomePage(this.page);
  const categories = await this.homePage.getCategoryNames();
  const hasCategory = categories.some((cat: string) => cat.includes(categoryName));
  expect(hasCategory).toBe(true);
});

Then('I should see the product titles', async function () {
  this.homePage = new HomePage(this.page);
  const productTitles = this.homePage.productTitles;
  const count = await productTitles.count();
  expect(count).toBeGreaterThan(0);
});

Then('I should see the product prices', async function () {
  this.homePage = new HomePage(this.page);
  const productPrices = this.homePage.productPrices;
  const count = await productPrices.count();
  expect(count).toBeGreaterThan(0);
});

Then('I should see the add to cart buttons', async function () {
  this.homePage = new HomePage(this.page);
  const addToCartButtons = this.homePage.addToCartButtons;
  const count = await addToCartButtons.count();
  expect(count).toBeGreaterThan(0);
});

Then('I should see the add to wishlist buttons', async function () {
  this.homePage = new HomePage(this.page);
  const addToWishlistButtons = this.homePage.addToWishlistButtons;
  const count = await addToWishlistButtons.count();
  expect(count).toBeGreaterThan(0);
});

Then('I should see the add to compare buttons', async function () {
  this.homePage = new HomePage(this.page);
  const addToCompareButtons = this.homePage.addToCompareButtons;
  const count = await addToCompareButtons.count();
  expect(count).toBeGreaterThan(0);
});

Then('I should see the newsletter subscription', async function () {
  this.homePage = new HomePage(this.page);
  const isVisible = await this.homePage.isElementVisible(this.homePage.newsletterEmailInput);
  expect(isVisible).toBe(true);
});

Then('I should see the community poll', async function () {
  this.homePage = new HomePage(this.page);
  const isVisible = await this.homePage.isElementVisible(this.homePage.communityPoll);
  expect(isVisible).toBe(true);
});

Then('I should see the information links', async function () {
  this.homePage = new HomePage(this.page);
  const isVisible = await this.homePage.isElementVisible(this.homePage.informationLinks);
  expect(isVisible).toBe(true);
});

Then('I should see the my account links', async function () {
  this.homePage = new HomePage(this.page);
  const isVisible = await this.homePage.isElementVisible(this.homePage.myAccountLinks);
  expect(isVisible).toBe(true);
});

Then('I should see the customer service links', async function () {
  this.homePage = new HomePage(this.page);
  const isVisible = await this.homePage.isElementVisible(this.homePage.customerServiceLinks);
  expect(isVisible).toBe(true);
});

Then('I should see the follow us links', async function () {
  this.homePage = new HomePage(this.page);
  const isVisible = await this.homePage.isElementVisible(this.homePage.followUsLinks);
  expect(isVisible).toBe(true);
});

Then('I should be on the wishlist page', async function () {
  const currentUrl = await this.page.url();
  expect(currentUrl).toContain('wishlist');
});

Then('I should be on the account page', async function () {
  const currentUrl = await this.page.url();
  expect(currentUrl).toContain('/customer');
});

Given('I am logged in as {string} with password {string}', async function (email: string, password: string) {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigateToLoginPage();
  await this.loginPage.login(email, password);
  await this.page.waitForTimeout(2000); // Wait for login to complete
});
