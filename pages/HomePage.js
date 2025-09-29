const { BasePage } = require('./BasePage');

class HomePage extends BasePage {
  constructor(page) {
    super(page);
  }

  // Home page specific locators
  get featuredProducts() {
    return this.page.locator('.product-item');
  }

  get productTitles() {
    return this.page.locator('.product-title a');
  }

  get productPrices() {
    return this.page.locator('.price');
  }

  get addToCartButtons() {
    return this.page.locator('input[value="Add to cart"]');
  }

  get addToWishlistButtons() {
    return this.page.locator('input[value="Add to wishlist"]');
  }

  get addToCompareButtons() {
    return this.page.locator('input[value="Add to compare list"]');
  }

  get searchBox() {
    return this.page.locator('#small-searchterms');
  }

  get searchButton() {
    return this.page.locator('input[value="Search"]');
  }

  get searchResults() {
    return this.page.locator('.search-results');
  }

  get newsletterEmail() {
    return this.page.locator('#newsletter-email');
  }

  get newsletterSubscribeButton() {
    return this.page.locator('#newsletter-subscribe-button');
  }

  get newsletterForm() {
    return this.page.locator('#newsletter-subscribe-block');
  }

  get pollSection() {
    return this.page.locator('.poll');
  }

  get pollOptions() {
    return this.page.locator('.poll-options input[type="radio"]');
  }

  get pollVoteButton() {
    return this.page.locator('#vote-poll-1');
  }

  get pollResults() {
    return this.page.locator('.poll-results');
  }

  get headerLogo() {
    return this.page.locator('.header-logo');
  }

  get loginLink() {
    return this.page.locator('a[href="/login"]');
  }

  get registerLink() {
    return this.page.locator('a[href="/register"]');
  }

  get shoppingCartLink() {
    return this.page.locator('a[href="/cart"]');
  }

  get wishlistLink() {
    return this.page.locator('a[href="/wishlist"]');
  }

  get compareListLink() {
    return this.page.locator('a[href="/compareproducts"]');
  }

  get accountLink() {
    return this.page.locator('a[href="/customer/info"]');
  }

  get logoutLink() {
    return this.page.locator('a[href="/logout"]');
  }

  get categoriesMenu() {
    return this.page.locator('.top-menu');
  }

  get categoryLinks() {
    return this.page.locator('.top-menu a');
  }

  get subcategoryLinks() {
    return this.page.locator('.sublist a');
  }

  get breadcrumb() {
    return this.page.locator('.breadcrumb');
  }

  get breadcrumbLinks() {
    return this.page.locator('.breadcrumb a');
  }

  get footerLinks() {
    return this.page.locator('.footer a');
  }

  get socialMediaLinks() {
    return this.page.locator('.social a');
  }

  get copyrightText() {
    return this.page.locator('.footer .copyright');
  }

  get poweredByText() {
    return this.page.locator('.footer .powered-by');
  }

  // Home page specific methods
  async navigateToHomePage() {
    await this.page.goto('https://demowebshop.tricentis.com/');
    await this.waitForPageLoad();
  }

  async searchForProduct(searchTerm) {
    await this.searchBox.fill(searchTerm);
    await this.searchButton.click();
    await this.waitForPageLoad();
  }

  async clickSearchButton() {
    await this.searchButton.click();
    await this.waitForPageLoad();
  }

  async subscribeToNewsletter(email) {
    await this.newsletterEmail.fill(email);
    await this.newsletterSubscribeButton.click();
    await this.waitForPageLoad();
  }

  async voteInPoll(optionText) {
    const option = this.page.locator(`.poll-options input[value="${optionText}"]`);
    await option.check();
    await this.pollVoteButton.click();
    await this.waitForPageLoad();
  }

  async addProductToCart(productName) {
    const product = this.page.locator(`.product-item:has-text("${productName}")`);
    const addToCartButton = product.locator('input[value="Add to cart"]');
    await addToCartButton.click();
    await this.waitForPageLoad();
  }

  async addProductToWishlist(productName) {
    const product = this.page.locator(`.product-item:has-text("${productName}")`);
    const addToWishlistButton = product.locator('input[value="Add to wishlist"]');
    await addToWishlistButton.click();
    await this.waitForPageLoad();
  }

  async addProductToCompare(productName) {
    const product = this.page.locator(`.product-item:has-text("${productName}")`);
    const addToCompareButton = product.locator('input[value="Add to compare list"]');
    await addToCompareButton.click();
    await this.waitForPageLoad();
  }

  async clickProductTitle(productName) {
    const product = this.page.locator(`.product-item:has-text("${productName}")`);
    const productTitle = product.locator('.product-title a');
    await productTitle.click();
    await this.waitForPageLoad();
  }

  async clickCategory(categoryName) {
    const category = this.page.locator(`.top-menu a:has-text("${categoryName}")`);
    await category.click();
    await this.waitForPageLoad();
  }

  async clickSubcategory(subcategoryName) {
    const subcategory = this.page.locator(`.sublist a:has-text("${subcategoryName}")`);
    await subcategory.click();
    await this.waitForPageLoad();
  }

  async getProductCount() {
    return await this.featuredProducts.count();
  }

  async getProductTitles() {
    const titles = [];
    const count = await this.productTitles.count();
    for (let i = 0; i < count; i++) {
      const title = await this.productTitles.nth(i).textContent();
      titles.push(title);
    }
    return titles;
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

  async isProductVisible(productName) {
    const product = this.page.locator(`.product-item:has-text("${productName}")`);
    return await product.isVisible();
  }

  async getSearchResultsCount() {
    return await this.searchResults.locator('.product-item').count();
  }

  async getSearchResultsTitles() {
    const titles = [];
    const results = this.searchResults.locator('.product-item .product-title a');
    const count = await results.count();
    for (let i = 0; i < count; i++) {
      const title = await results.nth(i).textContent();
      titles.push(title);
    }
    return titles;
  }

  async isNewsletterSubscriptionSuccessful() {
    const successMessage = this.page.locator('.newsletter-result-block .result');
    return await successMessage.isVisible();
  }

  async getNewsletterMessage() {
    const message = this.page.locator('.newsletter-result-block .result');
    return await message.textContent();
  }

  async isPollVoteSuccessful() {
    const pollResults = this.page.locator('.poll-results');
    return await pollResults.isVisible();
  }

  async getPollResults() {
    const results = [];
    const pollResults = this.page.locator('.poll-results .poll-answer');
    const count = await pollResults.count();
    for (let i = 0; i < count; i++) {
      const result = await pollResults.nth(i).textContent();
      results.push(result);
    }
    return results;
  }

  async getBreadcrumbText() {
    return await this.breadcrumb.textContent();
  }

  async getBreadcrumbLinks() {
    const links = [];
    const count = await this.breadcrumbLinks.count();
    for (let i = 0; i < count; i++) {
      const link = await this.breadcrumbLinks.nth(i).textContent();
      links.push(link);
    }
    return links;
  }

  async getFooterLinks() {
    const links = [];
    const count = await this.footerLinks.count();
    for (let i = 0; i < count; i++) {
      const link = await this.footerLinks.nth(i).textContent();
      links.push(link);
    }
    return links;
  }

  async getSocialMediaLinks() {
    const links = [];
    const count = await this.socialMediaLinks.count();
    for (let i = 0; i < count; i++) {
      const link = await this.socialMediaLinks.nth(i).textContent();
      links.push(link);
    }
    return links;
  }

  async getCopyrightText() {
    return await this.copyrightText.textContent();
  }

  async getPoweredByText() {
    return await this.poweredByText.textContent();
  }
}

module.exports = { HomePage };
