import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Product page locators
  get productTitle(): Locator {
    return this.page.locator('.product-name h1');
  }

  get productPrice(): Locator {
    return this.page.locator('.product-price');
  }

  get productDescription(): Locator {
    return this.page.locator('.full-description');
  }

  get productShortDescription(): Locator {
    return this.page.locator('.short-description');
  }

  get productImages(): Locator {
    return this.page.locator('.picture img');
  }

  get mainProductImage(): Locator {
    return this.page.locator('.picture img').first();
  }

  get quantityInput(): Locator {
    return this.page.locator('#addtocart_EnteredQuantity');
  }

  get addToCartButton(): Locator {
    return this.page.locator('#add-to-cart-button-13');
  }

  get addToWishlistButton(): Locator {
    return this.page.locator('#add-to-wishlist-button-13');
  }

  get addToCompareButton(): Locator {
    return this.page.locator('input[value="Add to compare list"]');
  }

  get emailAFriendButton(): Locator {
    return this.page.locator('input[value="Email a friend"]');
  }

  get productAttributes(): Locator {
    return this.page.locator('.attributes');
  }

  get productSpecifications(): Locator {
    return this.page.locator('.product-specs-box');
  }

  get productTags(): Locator {
    return this.page.locator('.product-tags-box');
  }

  get productReviews(): Locator {
    return this.page.locator('.product-reviews-page');
  }

  get addReviewButton(): Locator {
    return this.page.locator('input[value="Add your review"]');
  }

  get breadcrumb(): Locator {
    return this.page.locator('.breadcrumb');
  }

  get breadcrumbLinks(): Locator {
    return this.page.locator('.breadcrumb a');
  }

  get relatedProducts(): Locator {
    return this.page.locator('.product-grid .product-item');
  }

  get alsoPurchasedProducts(): Locator {
    return this.page.locator('.also-purchased-products .product-item');
  }

  get productAvailability(): Locator {
    return this.page.locator('.stock');
  }

  get productSku(): Locator {
    return this.page.locator('.sku');
  }

  get productManufacturer(): Locator {
    return this.page.locator('.manufacturer');
  }

  get productCategories(): Locator {
    return this.page.locator('.category');
  }

  // Product page methods
  async getProductTitle(): Promise<string> {
    return await this.getElementText(this.productTitle);
  }

  async getProductPrice(): Promise<string> {
    return await this.getElementText(this.productPrice);
  }

  async getProductDescription(): Promise<string> {
    return await this.getElementText(this.productDescription);
  }

  async getProductShortDescription(): Promise<string> {
    return await this.getElementText(this.productShortDescription);
  }

  async setQuantity(quantity: number): Promise<void> {
    await this.fillField(this.quantityInput, quantity.toString());
  }

  async getCurrentQuantity(): Promise<string> {
    return await this.quantityInput.inputValue();
  }

  async addToCart(quantity: number = 1): Promise<void> {
    if (quantity !== 1) {
      await this.setQuantity(quantity);
    }
    await this.clickElement(this.addToCartButton);
    await this.waitForPageLoad();
  }

  async addToWishlist(): Promise<void> {
    await this.clickElement(this.addToWishlistButton);
    await this.waitForPageLoad();
  }

  async addToCompare(): Promise<void> {
    await this.clickElement(this.addToCompareButton);
    await this.waitForPageLoad();
  }

  async emailAFriend(): Promise<void> {
    await this.clickElement(this.emailAFriendButton);
    await this.waitForPageLoad();
  }

  async addReview(): Promise<void> {
    await this.clickElement(this.addReviewButton);
    await this.waitForPageLoad();
  }

  async getProductAvailability(): Promise<string> {
    return await this.getElementText(this.productAvailability);
  }

  async getProductSku(): Promise<string> {
    return await this.getElementText(this.productSku);
  }

  async getProductManufacturer(): Promise<string> {
    return await this.getElementText(this.productManufacturer);
  }

  async getProductCategories(): Promise<string> {
    return await this.getElementText(this.productCategories);
  }

  async getBreadcrumbText(): Promise<string> {
    return await this.getElementText(this.breadcrumb);
  }

  async getBreadcrumbLinks(): Promise<string[]> {
    const breadcrumbElements = this.breadcrumbLinks;
    const count = await breadcrumbElements.count();
    const links: string[] = [];
    
    for (let i = 0; i < count; i++) {
      const linkText = await this.getElementText(breadcrumbElements.nth(i));
      links.push(linkText);
    }
    
    return links;
  }

  async clickBreadcrumbLink(linkText: string): Promise<void> {
    const breadcrumbLink = this.breadcrumbLinks.filter({ hasText: linkText });
    await this.clickElement(breadcrumbLink);
  }

  async getRelatedProductsCount(): Promise<number> {
    return await this.relatedProducts.count();
  }

  async getAlsoPurchasedProductsCount(): Promise<number> {
    return await this.alsoPurchasedProducts.count();
  }

  async clickRelatedProduct(index: number): Promise<void> {
    const relatedProduct = this.relatedProducts.nth(index);
    await this.clickElement(relatedProduct);
  }

  async clickAlsoPurchasedProduct(index: number): Promise<void> {
    const alsoPurchasedProduct = this.alsoPurchasedProducts.nth(index);
    await this.clickElement(alsoPurchasedProduct);
  }

  async getProductImageSrc(): Promise<string | null> {
    return await this.getElementAttribute(this.mainProductImage, 'src');
  }

  async getProductImageAlt(): Promise<string | null> {
    return await this.getElementAttribute(this.mainProductImage, 'alt');
  }

  async isProductInStock(): Promise<boolean> {
    const availability = await this.getProductAvailability();
    return availability.toLowerCase().includes('in stock') || 
           availability.toLowerCase().includes('available');
  }

  async isAddToCartButtonEnabled(): Promise<boolean> {
    return await this.addToCartButton.isEnabled();
  }

  async isAddToWishlistButtonEnabled(): Promise<boolean> {
    return await this.addToWishlistButton.isEnabled();
  }

  async isAddToCompareButtonEnabled(): Promise<boolean> {
    return await this.addToCompareButton.isEnabled();
  }

  async isEmailAFriendButtonEnabled(): Promise<boolean> {
    return await this.emailAFriendButton.isEnabled();
  }

  async isAddReviewButtonEnabled(): Promise<boolean> {
    return await this.addReviewButton.isEnabled();
  }

  async getProductAttributes(): Promise<string> {
    return await this.getElementText(this.productAttributes);
  }

  async getProductSpecifications(): Promise<string> {
    return await this.getElementText(this.productSpecifications);
  }

  async getProductTags(): Promise<string> {
    return await this.getElementText(this.productTags);
  }

  async getProductReviews(): Promise<string> {
    return await this.getElementText(this.productReviews);
  }

  async isProductPageLoaded(): Promise<boolean> {
    return await this.isElementVisible(this.productTitle);
  }

  async waitForProductPageLoad(): Promise<void> {
    await this.waitForElement(this.productTitle);
  }

  async navigateToProduct(productId: string): Promise<void> {
    await this.navigateTo(`/product/${productId}`);
    await this.waitForProductPageLoad();
  }

  async getProductUrl(): Promise<string> {
    return await this.getCurrentUrl();
  }

  async isOnProductPage(): Promise<boolean> {
    const url = await this.getCurrentUrl();
    return url.includes('/product/');
  }
}
