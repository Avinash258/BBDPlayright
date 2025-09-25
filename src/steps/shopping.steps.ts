import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { ShoppingCartPage } from '../pages/ShoppingCartPage';

// Shopping step definitions for DemoWebshop

Given('I am on the home page', async function () {
  this.homePage = new HomePage(this.page);
  await this.homePage.navigateToHomePage();
  await this.homePage.waitForPageLoad();
});

Given('I am on the shopping cart page', async function () {
  this.shoppingCartPage = new ShoppingCartPage(this.page);
  await this.shoppingCartPage.navigateToShoppingCart();
  await this.shoppingCartPage.waitForPageLoad();
});

When('I add the first product to cart', async function () {
  this.homePage = new HomePage(this.page);
  await this.homePage.addProductToCartByIndex(0);
});

When('I add the product at index {int} to cart', async function (index: number) {
  this.homePage = new HomePage(this.page);
  await this.homePage.addProductToCartByIndex(index);
});

When('I add the product {string} to cart', async function (productName: string) {
  this.homePage = new HomePage(this.page);
  const productIndex = await this.homePage.getProductIndexByName(productName);
  if (productIndex >= 0) {
    await this.homePage.addProductToCartByIndex(productIndex);
  } else {
    throw new Error(`Product "${productName}" not found`);
  }
});

When('I add the first product to wishlist', async function () {
  this.homePage = new HomePage(this.page);
  await this.homePage.addProductToWishlistByIndex(0);
});

When('I add the product at index {int} to wishlist', async function (index: number) {
  this.homePage = new HomePage(this.page);
  await this.homePage.addProductToWishlistByIndex(index);
});

When('I add the product {string} to wishlist', async function (productName: string) {
  this.homePage = new HomePage(this.page);
  const productIndex = await this.homePage.getProductIndexByName(productName);
  if (productIndex >= 0) {
    await this.homePage.addProductToWishlistByIndex(productIndex);
  } else {
    throw new Error(`Product "${productName}" not found`);
  }
});

When('I add the first product to compare', async function () {
  this.homePage = new HomePage(this.page);
  await this.homePage.addProductToCompareByIndex(0);
});

When('I add the product at index {int} to compare', async function (index: number) {
  this.homePage = new HomePage(this.page);
  await this.homePage.addProductToCompareByIndex(index);
});

When('I add the product {string} to compare', async function (productName: string) {
  this.homePage = new HomePage(this.page);
  const productIndex = await this.homePage.getProductIndexByName(productName);
  if (productIndex >= 0) {
    await this.homePage.addProductToCompareByIndex(productIndex);
  } else {
    throw new Error(`Product "${productName}" not found`);
  }
});

When('I click on the first product', async function () {
  this.homePage = new HomePage(this.page);
  await this.homePage.clickProductByIndex(0);
});

When('I click on the product at index {int}', async function (index: number) {
  this.homePage = new HomePage(this.page);
  await this.homePage.clickProductByIndex(index);
});

When('I click on the product {string}', async function (productName: string) {
  this.homePage = new HomePage(this.page);
  const productIndex = await this.homePage.getProductIndexByName(productName);
  if (productIndex >= 0) {
    await this.homePage.clickProductByIndex(productIndex);
  } else {
    throw new Error(`Product "${productName}" not found`);
  }
});

When('I navigate to category {string}', async function (categoryName: string) {
  this.homePage = new HomePage(this.page);
  await this.homePage.navigateToCategory(categoryName);
});

When('I search for {string}', async function (searchTerm: string) {
  this.homePage = new HomePage(this.page);
  await this.homePage.searchForProduct(searchTerm);
});

When('I set product quantity to {int}', async function (quantity: number) {
  this.productPage = new ProductPage(this.page);
  await this.productPage.setQuantity(quantity);
});

When('I add the current product to cart', async function () {
  this.productPage = new ProductPage(this.page);
  await this.productPage.addToCart();
});

When('I add the current product to cart with quantity {int}', async function (quantity: number) {
  this.productPage = new ProductPage(this.page);
  await this.productPage.addToCart(quantity);
});

When('I add the current product to wishlist', async function () {
  this.productPage = new ProductPage(this.page);
  await this.productPage.addToWishlist();
});

When('I add the current product to compare', async function () {
  this.productPage = new ProductPage(this.page);
  await this.productPage.addToCompare();
});

When('I email a friend about the current product', async function () {
  this.productPage = new ProductPage(this.page);
  await this.productPage.emailAFriend();
});

When('I add a review for the current product', async function () {
  this.productPage = new ProductPage(this.page);
  await this.productPage.addReview();
});

When('I remove the first item from cart', async function () {
  this.shoppingCartPage = new ShoppingCartPage(this.page);
  await this.shoppingCartPage.removeCartItem(0);
});

When('I remove the item at index {int} from cart', async function (index: number) {
  this.shoppingCartPage = new ShoppingCartPage(this.page);
  await this.shoppingCartPage.removeCartItem(index);
});

When('I remove the item {string} from cart', async function (productName: string) {
  this.shoppingCartPage = new ShoppingCartPage(this.page);
  const itemIndex = await this.shoppingCartPage.getCartItemIndex(productName);
  if (itemIndex >= 0) {
    await this.shoppingCartPage.removeCartItem(itemIndex);
  } else {
    throw new Error(`Product "${productName}" not found in cart`);
  }
});

When('I update the cart', async function () {
  this.shoppingCartPage = new ShoppingCartPage(this.page);
  await this.shoppingCartPage.updateCart();
});

When('I continue shopping', async function () {
  this.shoppingCartPage = new ShoppingCartPage(this.page);
  await this.shoppingCartPage.continueShopping();
});

When('I set cart item quantity at index {int} to {int}', async function (index: number, quantity: number) {
  this.shoppingCartPage = new ShoppingCartPage(this.page);
  await this.shoppingCartPage.setCartItemQuantity(index, quantity);
});

When('I estimate shipping with country {string}, state {string}, zip code {string}', async function (
  country: string, state: string, zipCode: string
) {
  this.shoppingCartPage = new ShoppingCartPage(this.page);
  await this.shoppingCartPage.estimateShipping(country, state, zipCode);
});

When('I apply discount coupon {string}', async function (couponCode: string) {
  this.shoppingCartPage = new ShoppingCartPage(this.page);
  await this.shoppingCartPage.applyDiscountCoupon(couponCode);
});

When('I apply gift card {string}', async function (giftCardCode: string) {
  this.shoppingCartPage = new ShoppingCartPage(this.page);
  await this.shoppingCartPage.applyGiftCard(giftCardCode);
});

When('I proceed to checkout', async function () {
  this.shoppingCartPage = new ShoppingCartPage(this.page);
  await this.shoppingCartPage.proceedToCheckout();
});

When('I accept terms of service', async function () {
  this.shoppingCartPage = new ShoppingCartPage(this.page);
  await this.shoppingCartPage.acceptTermsOfService();
});


Then('I should see the product {string}', async function (productName: string) {
  this.homePage = new HomePage(this.page);
  const isPresent = await this.homePage.isProductInFeaturedList(productName);
  expect(isPresent).toBe(true);
});

Then('I should not see the product {string}', async function (productName: string) {
  this.homePage = new HomePage(this.page);
  const isPresent = await this.homePage.isProductInFeaturedList(productName);
  expect(isPresent).toBe(false);
});

Then('I should see the product title {string}', async function (expectedTitle: string) {
  this.productPage = new ProductPage(this.page);
  const actualTitle = await this.productPage.getProductTitle();
  expect(actualTitle).toContain(expectedTitle);
});

Then('I should see the product price {string}', async function (expectedPrice: string) {
  this.productPage = new ProductPage(this.page);
  const actualPrice = await this.productPage.getProductPrice();
  expect(actualPrice).toContain(expectedPrice);
});

Then('I should see the product is in stock', async function () {
  this.productPage = new ProductPage(this.page);
  const isInStock = await this.productPage.isProductInStock();
  expect(isInStock).toBe(true);
});

Then('I should see the product is out of stock', async function () {
  this.productPage = new ProductPage(this.page);
  const isInStock = await this.productPage.isProductInStock();
  expect(isInStock).toBe(false);
});

Then('I should see the add to cart button is enabled', async function () {
  this.productPage = new ProductPage(this.page);
  const isEnabled = await this.productPage.isAddToCartButtonEnabled();
  expect(isEnabled).toBe(true);
});

Then('I should see the add to cart button is disabled', async function () {
  this.productPage = new ProductPage(this.page);
  const isEnabled = await this.productPage.isAddToCartButtonEnabled();
  expect(isEnabled).toBe(false);
});

Then('I should see the add to wishlist button is enabled', async function () {
  this.productPage = new ProductPage(this.page);
  const isEnabled = await this.productPage.isAddToWishlistButtonEnabled();
  expect(isEnabled).toBe(true);
});

Then('I should see the add to wishlist button is disabled', async function () {
  this.productPage = new ProductPage(this.page);
  const isEnabled = await this.productPage.isAddToWishlistButtonEnabled();
  expect(isEnabled).toBe(false);
});

Then('I should see the add to compare button is enabled', async function () {
  this.productPage = new ProductPage(this.page);
  const isEnabled = await this.productPage.isAddToCompareButtonEnabled();
  expect(isEnabled).toBe(true);
});

Then('I should see the add to compare button is disabled', async function () {
  this.productPage = new ProductPage(this.page);
  const isEnabled = await this.productPage.isAddToCompareButtonEnabled();
  expect(isEnabled).toBe(false);
});

Then('I should see the current quantity is {int}', async function (expectedQuantity: number) {
  this.productPage = new ProductPage(this.page);
  const actualQuantity = await this.productPage.getCurrentQuantity();
  expect(parseInt(actualQuantity)).toBe(expectedQuantity);
});

Then('I should be on a product page', async function () {
  this.productPage = new ProductPage(this.page);
  const isOnProductPage = await this.productPage.isOnProductPage();
  expect(isOnProductPage).toBe(true);
});

Then('I should see the cart has {int} items', async function (expectedCount: number) {
  this.shoppingCartPage = new ShoppingCartPage(this.page);
  const actualCount = await this.shoppingCartPage.getCartItemsCount();
  expect(actualCount).toBe(expectedCount);
});

Then('I should see the cart is empty', async function () {
  this.shoppingCartPage = new ShoppingCartPage(this.page);
  const isEmpty = await this.shoppingCartPage.isCartEmpty();
  expect(isEmpty).toBe(true);
});

Then('I should see the cart is not empty', async function () {
  this.shoppingCartPage = new ShoppingCartPage(this.page);
  const isEmpty = await this.shoppingCartPage.isCartEmpty();
  expect(isEmpty).toBe(false);
});

Then('I should see the product {string} in cart', async function (productName: string) {
  this.shoppingCartPage = new ShoppingCartPage(this.page);
  const isPresent = await this.shoppingCartPage.isCartItemPresent(productName);
  expect(isPresent).toBe(true);
});

Then('I should not see the product {string} in cart', async function (productName: string) {
  this.shoppingCartPage = new ShoppingCartPage(this.page);
  const isPresent = await this.shoppingCartPage.isCartItemPresent(productName);
  expect(isPresent).toBe(false);
});

Then('I should see the cart total {string}', async function (expectedTotal: string) {
  this.shoppingCartPage = new ShoppingCartPage(this.page);
  const actualTotal = await this.shoppingCartPage.getCartTotal();
  expect(actualTotal).toContain(expectedTotal);
});

Then('I should see the order total {string}', async function (expectedTotal: string) {
  this.shoppingCartPage = new ShoppingCartPage(this.page);
  const actualTotal = await this.shoppingCartPage.getOrderTotal();
  expect(actualTotal).toContain(expectedTotal);
});

Then('I should see the subtotal {string}', async function (expectedSubtotal: string) {
  this.shoppingCartPage = new ShoppingCartPage(this.page);
  const actualSubtotal = await this.shoppingCartPage.getSubtotal();
  expect(actualSubtotal).toContain(expectedSubtotal);
});

Then('I should see the shipping cost {string}', async function (expectedShipping: string) {
  this.shoppingCartPage = new ShoppingCartPage(this.page);
  const actualShipping = await this.shoppingCartPage.getShippingCost();
  expect(actualShipping).toContain(expectedShipping);
});

Then('I should see the tax {string}', async function (expectedTax: string) {
  this.shoppingCartPage = new ShoppingCartPage(this.page);
  const actualTax = await this.shoppingCartPage.getTax();
  expect(actualTax).toContain(expectedTax);
});

Then('I should see the discount {string}', async function (expectedDiscount: string) {
  this.shoppingCartPage = new ShoppingCartPage(this.page);
  const actualDiscount = await this.shoppingCartPage.getDiscount();
  expect(actualDiscount).toContain(expectedDiscount);
});

Then('I should see the gift card discount {string}', async function (expectedDiscount: string) {
  this.shoppingCartPage = new ShoppingCartPage(this.page);
  const actualDiscount = await this.shoppingCartPage.getGiftCardDiscount();
  expect(actualDiscount).toContain(expectedDiscount);
});

Then('I should see the update cart button is enabled', async function () {
  this.shoppingCartPage = new ShoppingCartPage(this.page);
  const isEnabled = await this.shoppingCartPage.isUpdateCartButtonEnabled();
  expect(isEnabled).toBe(true);
});

Then('I should see the update cart button is disabled', async function () {
  this.shoppingCartPage = new ShoppingCartPage(this.page);
  const isEnabled = await this.shoppingCartPage.isUpdateCartButtonEnabled();
  expect(isEnabled).toBe(false);
});

Then('I should see the checkout button is enabled', async function () {
  this.shoppingCartPage = new ShoppingCartPage(this.page);
  const isEnabled = await this.shoppingCartPage.isCheckoutButtonEnabled();
  expect(isEnabled).toBe(true);
});

Then('I should see the checkout button is disabled', async function () {
  this.shoppingCartPage = new ShoppingCartPage(this.page);
  const isEnabled = await this.shoppingCartPage.isCheckoutButtonEnabled();
  expect(isEnabled).toBe(false);
});

Then('I should see the terms of service is checked', async function () {
  this.shoppingCartPage = new ShoppingCartPage(this.page);
  const isChecked = await this.shoppingCartPage.isTermsOfServiceChecked();
  expect(isChecked).toBe(true);
});

Then('I should see the terms of service is not checked', async function () {
  this.shoppingCartPage = new ShoppingCartPage(this.page);
  const isChecked = await this.shoppingCartPage.isTermsOfServiceChecked();
  expect(isChecked).toBe(false);
});

Then('I should be on the shopping cart page', async function () {
  this.shoppingCartPage = new ShoppingCartPage(this.page);
  const isOnShoppingCartPage = await this.shoppingCartPage.isOnShoppingCartPage();
  expect(isOnShoppingCartPage).toBe(true);
});

Then('I should be redirected to the checkout page', async function () {
  const currentUrl = await this.page.url();
  expect(currentUrl).toContain('/checkout');
});

Then('I should be redirected to the home page', async function () {
  const currentUrl = await this.page.url();
  expect(currentUrl).toMatch(/\/$|\/home/);
});

Then('I should not see the cart is empty', async function () {
  this.shoppingCartPage = new ShoppingCartPage(this.page);
  const isEmpty = await this.shoppingCartPage.isCartEmpty();
  expect(isEmpty).toBe(false);
});
