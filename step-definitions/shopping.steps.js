const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { ProductPage } = require('../pages/ProductPage');
const { ShoppingCartPage } = require('../pages/ShoppingCartPage');

// Shopping step definitions for DemoWebshop

Given('I am on the shopping cart page', async function () {
  this.shoppingCartPage = new ShoppingCartPage(this.page);
  await this.shoppingCartPage.navigateToShoppingCart();
  await this.shoppingCartPage.waitForPageLoad();
});

When('I add a product to the cart', async function () {
  this.productPage = new ProductPage(this.page);
  await this.productPage.addToCart();
});

When('I add product {string} to the cart', async function (productName) {
  this.productPage = new ProductPage(this.page);
  await this.productPage.addSpecificProductToCart(productName);
});

When('I remove a product from the cart', async function () {
  this.shoppingCartPage = new ShoppingCartPage(this.page);
  await this.shoppingCartPage.removeFirstItem();
});

When('I update the quantity to {string}', async function (quantity) {
  this.shoppingCartPage = new ShoppingCartPage(this.page);
  await this.shoppingCartPage.updateQuantity(quantity);
});

When('I proceed to checkout', async function () {
  this.shoppingCartPage = new ShoppingCartPage(this.page);
  await this.shoppingCartPage.proceedToCheckout();
});

When('I continue shopping', async function () {
  this.shoppingCartPage = new ShoppingCartPage(this.page);
  await this.shoppingCartPage.continueShopping();
});

Then('I should be on the shopping cart page', async function () {
  await expect(this.page).toHaveURL(/.*\/cart/);
  await expect(this.page).toHaveTitle(/Demo Web Shop/);
});

Then('I should see the product in the cart', async function () {
  this.shoppingCartPage = new ShoppingCartPage(this.page);
  await expect(this.shoppingCartPage.cartItems).toBeVisible();
});

Then('I should see the cart is empty', async function () {
  this.shoppingCartPage = new ShoppingCartPage(this.page);
  await expect(this.shoppingCartPage.emptyCartMessage).toBeVisible();
});

Then('I should see the total price', async function () {
  this.shoppingCartPage = new ShoppingCartPage(this.page);
  await expect(this.shoppingCartPage.totalPrice).toBeVisible();
});

Then('I should see the checkout button', async function () {
  this.shoppingCartPage = new ShoppingCartPage(this.page);
  await expect(this.shoppingCartPage.checkoutButton).toBeVisible();
});

Then('I should see the continue shopping button', async function () {
  this.shoppingCartPage = new ShoppingCartPage(this.page);
  await expect(this.shoppingCartPage.continueShoppingButton).toBeVisible();
});

Then('I should be redirected to the checkout page', async function () {
  await expect(this.page).toHaveURL(/.*\/checkout/);
  await expect(this.page).toHaveTitle(/Demo Web Shop/);
});

Then('I should see a success message', async function () {
  await expect(this.page.locator('.success')).toBeVisible();
});

Then('I should see an error message', async function () {
  await expect(this.page.locator('.error')).toBeVisible();
});
