const { BasePage } = require('./BasePage');

class ShoppingCartPage extends BasePage {
  constructor(page) {
    super(page);
  }

  // Shopping cart page locators
  get cartItems() {
    return this.page.locator('.cart-item-row');
  }

  get emptyCartMessage() {
    return this.page.locator('.order-summary-content');
  }

  get totalPrice() {
    return this.page.locator('.order-total');
  }

  get checkoutButton() {
    return this.page.locator('#checkout');
  }

  get continueShoppingButton() {
    return this.page.locator('input[value="Continue shopping"]');
  }

  get updateCartButton() {
    return this.page.locator('input[name="updatecart"]');
  }

  get removeItemButtons() {
    return this.page.locator('input[name="removefromcart"]');
  }

  get quantityInputs() {
    return this.page.locator('input[name="itemquantity"]');
  }

  get productNames() {
    return this.page.locator('.product-name a');
  }

  get productPrices() {
    return this.page.locator('.product-unit-price');
  }

  get productSubtotals() {
    return this.page.locator('.product-subtotal');
  }

  // Shopping cart page methods
  async navigateToShoppingCart() {
    await this.page.goto('https://demowebshop.tricentis.com/cart');
    await this.waitForPageLoad();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
    await this.waitForPageLoad();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
    await this.waitForPageLoad();
  }

  async updateCart() {
    await this.updateCartButton.click();
    await this.waitForPageLoad();
  }

  async removeFirstItem() {
    const firstRemoveButton = this.removeItemButtons.first();
    await firstRemoveButton.click();
    await this.waitForPageLoad();
  }

  async updateQuantity(index, quantity) {
    const quantityInput = this.quantityInputs.nth(index);
    await quantityInput.fill(quantity.toString());
    await this.updateCart();
  }

  async getCartItemsCount() {
    return await this.cartItems.count();
  }

  async getProductNames() {
    const names = [];
    const count = await this.productNames.count();
    for (let i = 0; i < count; i++) {
      const name = await this.productNames.nth(i).textContent();
      names.push(name);
    }
    return names;
  }

  async getProductPrices() {
    const prices = [];
    const count = await this.productPrices.count();
    for (let i = 0; i < count; i++) {
      const price = await this.productPrices.nth(i).textContent();
      prices.push(price);
    }
    return prices;
  }

  async getTotalPrice() {
    return await this.totalPrice.textContent();
  }

  async isCartEmpty() {
    return await this.emptyCartMessage.isVisible();
  }

  async getEmptyCartMessage() {
    return await this.emptyCartMessage.textContent();
  }
}

module.exports = { ShoppingCartPage };
