import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Home page specific locators
  get featuredProducts(): Locator {
    return this.page.locator('.product-item');
  }

  get productTitles(): Locator {
    return this.page.locator('.product-title a');
  }

  get productPrices(): Locator {
    return this.page.locator('.price');
  }

  get addToCartButtons(): Locator {
    return this.page.locator('input[value="Add to cart"]');
  }

  get addToWishlistButtons(): Locator {
    return this.page.locator('input[value="Add to wishlist"]');
  }

  get addToCompareButtons(): Locator {
    return this.page.locator('input[value="Add to compare list"]');
  }

  get categoriesMenu(): Locator {
    return this.page.locator('.top-menu');
  }

  get categoryLinks(): Locator {
    return this.page.locator('.top-menu a');
  }

  get newsletterEmailInput(): Locator {
    return this.page.locator('#newsletter-email');
  }

  get newsletterSubscribeButton(): Locator {
    return this.page.locator('#newsletter-subscribe-button');
  }

  get newsletterResult(): Locator {
    return this.page.locator('#newsletter-result-block');
  }

  get pollOptions(): Locator {
    return this.page.locator('#pollanswers-1 input[type="radio"]');
  }

  get pollVoteButton(): Locator {
    return this.page.locator('#vote-poll-1');
  }

  get pollResults(): Locator {
    return this.page.locator('.poll-results');
  }

  get communityPoll(): Locator {
    return this.page.locator('.block-poll');
  }

  get informationLinks(): Locator {
    return this.page.locator('.footer .column a');
  }

  get myAccountLinks(): Locator {
    return this.page.locator('.account-navigation a');
  }

  get customerServiceLinks(): Locator {
    return this.page.locator('.customer-service a');
  }

  get followUsLinks(): Locator {
    return this.page.locator('.follow-us a');
  }

  // Home page specific methods
  async navigateToHomePage(): Promise<void> {
    await this.navigateTo('https://demowebshop.tricentis.com/');
  }

  async getFeaturedProductsCount(): Promise<number> {
    return await this.featuredProducts.count();
  }

  async getProductTitleByIndex(index: number): Promise<string> {
    const productTitle = this.productTitles.nth(index);
    return await this.getElementText(productTitle);
  }

  async getProductPriceByIndex(index: number): Promise<string> {
    const productPrice = this.productPrices.nth(index);
    return await this.getElementText(productPrice);
  }

  async addProductToCartByIndex(index: number): Promise<void> {
    const addToCartButton = this.addToCartButtons.nth(index);
    await this.clickElement(addToCartButton);
  }

  async addProductToWishlistByIndex(index: number): Promise<void> {
    const addToWishlistButton = this.addToWishlistButtons.nth(index);
    await this.clickElement(addToWishlistButton);
  }

  async addProductToCompareByIndex(index: number): Promise<void> {
    const addToCompareButton = this.addToCompareButtons.nth(index);
    await this.clickElement(addToCompareButton);
  }

  async clickProductByIndex(index: number): Promise<void> {
    const productLink = this.productTitles.nth(index);
    await this.clickElement(productLink);
  }

  async navigateToCategory(categoryName: string): Promise<void> {
    const categoryLink = this.categoryLinks.filter({ hasText: categoryName });
    await this.clickElement(categoryLink);
  }

  async subscribeToNewsletter(email: string): Promise<void> {
    await this.fillField(this.newsletterEmailInput, email);
    await this.clickElement(this.newsletterSubscribeButton);
  }

  async getNewsletterResult(): Promise<string> {
    await this.waitForElement(this.newsletterResult);
    return await this.getElementText(this.newsletterResult);
  }

  async voteInPoll(optionIndex: number): Promise<void> {
    const pollOption = this.pollOptions.nth(optionIndex);
    await this.clickElement(pollOption);
    await this.clickElement(this.pollVoteButton);
  }

  async getPollResults(): Promise<string> {
    await this.waitForElement(this.pollResults);
    return await this.getElementText(this.pollResults);
  }

  async searchForProduct(searchTerm: string): Promise<void> {
    await this.fillField(this.searchBox, searchTerm);
    await this.clickElement(this.searchButton);
  }

  async getCategoryNames(): Promise<string[]> {
    const categoryElements = this.categoryLinks;
    const count = await categoryElements.count();
    const categories: string[] = [];
    
    for (let i = 0; i < count; i++) {
      const categoryText = await this.getElementText(categoryElements.nth(i));
      categories.push(categoryText);
    }
    
    return categories;
  }

  async isProductInFeaturedList(productName: string): Promise<boolean> {
    const productTitles = this.productTitles;
    const count = await productTitles.count();
    
    for (let i = 0; i < count; i++) {
      const title = await this.getElementText(productTitles.nth(i));
      if (title.includes(productName)) {
        return true;
      }
    }
    
    return false;
  }

  async getProductIndexByName(productName: string): Promise<number> {
    const productTitles = this.productTitles;
    const count = await productTitles.count();
    
    for (let i = 0; i < count; i++) {
      const title = await this.getElementText(productTitles.nth(i));
      if (title.includes(productName)) {
        return i;
      }
    }
    
    return -1;
  }

  async isNewsletterSubscriptionSuccessful(): Promise<boolean> {
    const result = await this.getNewsletterResult();
    return result.includes('Thank you for signing up!') || result.includes('successfully');
  }

  async isPollVoteSuccessful(): Promise<boolean> {
    const results = await this.getPollResults();
    return results.includes('Thank you for voting') || results.includes('vote');
  }

  async getCartItemCount(): Promise<number> {
    try {
      const cartQuantity = this.page.locator('.cart-qty');
      const countText = await this.getElementText(cartQuantity);
      return parseInt(countText) || 0;
    } catch {
      return 0;
    }
  }
}
