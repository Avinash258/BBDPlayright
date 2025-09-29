const { BasePage } = require('./BasePage');

class ProductPage extends BasePage {
  constructor(page) {
    super(page);
  }

  // Product page locators
  get productTitle() {
    return this.page.locator('.product-name h1');
  }

  get productPrice() {
    return this.page.locator('.product-price');
  }

  get addToCartButton() {
    return this.page.locator('input[value="Add to cart"]');
  }

  get addToWishlistButton() {
    return this.page.locator('input[value="Add to wishlist"]');
  }

  get addToCompareButton() {
    return this.page.locator('input[value="Add to compare list"]');
  }

  get quantityInput() {
    return this.page.locator('#addtocart_EnteredQuantity_TextBox');
  }

  get productImages() {
    return this.page.locator('.product-picture img');
  }

  get productDescription() {
    return this.page.locator('.product-description');
  }

  get productAttributes() {
    return this.page.locator('.product-attributes');
  }

  get productReviews() {
    return this.page.locator('.product-reviews');
  }

  // Product page methods
  async addToCart() {
    await this.addToCartButton.click();
    await this.waitForPageLoad();
  }

  async addToWishlist() {
    await this.addToWishlistButton.click();
    await this.waitForPageLoad();
  }

  async addToCompare() {
    await this.addToCompareButton.click();
    await this.waitForPageLoad();
  }

  async setQuantity(quantity) {
    await this.quantityInput.fill(quantity.toString());
  }

  async addSpecificProductToCart(productName) {
    // Navigate to product page first
    await this.page.goto(`https://demowebshop.tricentis.com/${productName.toLowerCase().replace(/\s+/g, '-')}`);
    await this.waitForPageLoad();
    await this.addToCart();
  }

  async getProductTitle() {
    return await this.productTitle.textContent();
  }

  async getProductPrice() {
    return await this.productPrice.textContent();
  }

  async isProductInStock() {
    return await this.addToCartButton.isEnabled();
  }

  async getProductImages() {
    const images = [];
    const count = await this.productImages.count();
    for (let i = 0; i < count; i++) {
      const src = await this.productImages.nth(i).getAttribute('src');
      images.push(src);
    }
    return images;
  }

  async getProductDescription() {
    return await this.productDescription.textContent();
  }
}

module.exports = { ProductPage };
