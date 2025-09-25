import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ShoppingCartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Shopping cart locators
  get cartItems(): Locator {
    return this.page.locator('.cart-item-row');
  }

  get cartItemNames(): Locator {
    return this.page.locator('.product-name a');
  }

  get cartItemPrices(): Locator {
    return this.page.locator('.product-unit-price');
  }

  get cartItemQuantities(): Locator {
    return this.page.locator('.qty-input');
  }

  get cartItemSubtotals(): Locator {
    return this.page.locator('.product-subtotal');
  }

  get removeItemButtons(): Locator {
    return this.page.locator('input[name="removefromcart"]');
  }

  get updateCartButton(): Locator {
    return this.page.locator('input[name="updatecart"]');
  }

  get continueShoppingButton(): Locator {
    return this.page.locator('input[name="continueshopping"]');
  }

  get estimateShippingButton(): Locator {
    return this.page.locator('input[name="estimateshipping"]');
  }

  get applyDiscountCouponButton(): Locator {
    return this.page.locator('input[name="applydiscountcouponcode"]');
  }

  get applyGiftCardButton(): Locator {
    return this.page.locator('input[name="applygiftcardcouponcode"]');
  }

  get discountCouponInput(): Locator {
    return this.page.locator('#discountcouponcode');
  }

  get giftCardInput(): Locator {
    return this.page.locator('#giftcardcouponcode');
  }

  get checkoutButton(): Locator {
    return this.page.locator('input[name="checkout"]');
  }

  get cartTotal(): Locator {
    return this.page.locator('.cart-total');
  }

  get orderTotal(): Locator {
    return this.page.locator('.order-total');
  }

  get subtotal(): Locator {
    return this.page.locator('.cart-total-left .cart-total');
  }

  get shippingCost(): Locator {
    return this.page.locator('.shipping-cost');
  }

  get tax(): Locator {
    return this.page.locator('.tax-cost');
  }

  get discount(): Locator {
    return this.page.locator('.discount');
  }

  get giftCardDiscount(): Locator {
    return this.page.locator('.gift-card-discount');
  }

  get rewardPoints(): Locator {
    return this.page.locator('.reward-points');
  }

  get emptyCartMessage(): Locator {
    return this.page.locator('.order-summary-content');
  }

  get cartQuantity(): Locator {
    return this.page.locator('.cart-qty');
  }

  get countrySelect(): Locator {
    return this.page.locator('#CountryId');
  }

  get stateProvinceSelect(): Locator {
    return this.page.locator('#StateProvinceId');
  }

  get zipPostalCodeInput(): Locator {
    return this.page.locator('#ZipPostalCode');
  }

  get termsOfServiceCheckbox(): Locator {
    return this.page.locator('#termsofservice');
  }

  // Shopping cart methods
  async navigateToShoppingCart(): Promise<void> {
    await this.navigateTo('/cart');
  }

  async getCartItemsCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async getCartItemName(index: number): Promise<string> {
    const itemName = this.cartItemNames.nth(index);
    return await this.getElementText(itemName);
  }

  async getCartItemPrice(index: number): Promise<string> {
    const itemPrice = this.cartItemPrices.nth(index);
    return await this.getElementText(itemPrice);
  }

  async getCartItemQuantity(index: number): Promise<string> {
    const itemQuantity = this.cartItemQuantities.nth(index);
    return await itemQuantity.inputValue();
  }

  async getCartItemSubtotal(index: number): Promise<string> {
    const itemSubtotal = this.cartItemSubtotals.nth(index);
    return await this.getElementText(itemSubtotal);
  }

  async setCartItemQuantity(index: number, quantity: number): Promise<void> {
    const quantityInput = this.cartItemQuantities.nth(index);
    await this.fillField(quantityInput, quantity.toString());
  }

  async removeCartItem(index: number): Promise<void> {
    const removeButton = this.removeItemButtons.nth(index);
    await this.clickElement(removeButton);
    await this.clickElement(this.updateCartButton);
    await this.waitForPageLoad();
  }

  async updateCart(): Promise<void> {
    await this.clickElement(this.updateCartButton);
    await this.waitForPageLoad();
  }

  async continueShopping(): Promise<void> {
    await this.clickElement(this.continueShoppingButton);
    await this.waitForPageLoad();
  }

  async estimateShipping(country: string, stateProvince: string, zipCode: string): Promise<void> {
    await this.selectOption(this.countrySelect, country);
    await this.selectOption(this.stateProvinceSelect, stateProvince);
    await this.fillField(this.zipPostalCodeInput, zipCode);
    await this.clickElement(this.estimateShippingButton);
    await this.waitForPageLoad();
  }

  async applyDiscountCoupon(couponCode: string): Promise<void> {
    await this.fillField(this.discountCouponInput, couponCode);
    await this.clickElement(this.applyDiscountCouponButton);
    await this.waitForPageLoad();
  }

  async applyGiftCard(giftCardCode: string): Promise<void> {
    await this.fillField(this.giftCardInput, giftCardCode);
    await this.clickElement(this.applyGiftCardButton);
    await this.waitForPageLoad();
  }

  async proceedToCheckout(): Promise<void> {
    await this.clickElement(this.termsOfServiceCheckbox);
    await this.clickElement(this.checkoutButton);
    await this.waitForPageLoad();
  }

  async getCartTotal(): Promise<string> {
    return await this.getElementText(this.cartTotal);
  }

  async getOrderTotal(): Promise<string> {
    return await this.getElementText(this.orderTotal);
  }

  async getSubtotal(): Promise<string> {
    return await this.getElementText(this.subtotal);
  }

  async getShippingCost(): Promise<string> {
    return await this.getElementText(this.shippingCost);
  }

  async getTax(): Promise<string> {
    return await this.getElementText(this.tax);
  }

  async getDiscount(): Promise<string> {
    return await this.getElementText(this.discount);
  }

  async getGiftCardDiscount(): Promise<string> {
    return await this.getElementText(this.giftCardDiscount);
  }

  async getRewardPoints(): Promise<string> {
    return await this.getElementText(this.rewardPoints);
  }

  async getEmptyCartMessage(): Promise<string> {
    return await this.getElementText(this.emptyCartMessage);
  }

  async getCartQuantity(): Promise<string> {
    return await this.getElementText(this.cartQuantity);
  }

  async isCartEmpty(): Promise<boolean> {
    const message = await this.getEmptyCartMessage();
    return message.includes('Your Shopping Cart is empty!') || 
           message.includes('cart is empty');
  }

  async isCartItemPresent(productName: string): Promise<boolean> {
    const itemNames = this.cartItemNames;
    const count = await itemNames.count();
    
    for (let i = 0; i < count; i++) {
      const name = await this.getElementText(itemNames.nth(i));
      if (name.includes(productName)) {
        return true;
      }
    }
    
    return false;
  }

  async getCartItemIndex(productName: string): Promise<number> {
    const itemNames = this.cartItemNames;
    const count = await itemNames.count();
    
    for (let i = 0; i < count; i++) {
      const name = await this.getElementText(itemNames.nth(i));
      if (name.includes(productName)) {
        return i;
      }
    }
    
    return -1;
  }

  async isUpdateCartButtonEnabled(): Promise<boolean> {
    return await this.updateCartButton.isEnabled();
  }

  async isCheckoutButtonEnabled(): Promise<boolean> {
    return await this.checkoutButton.isEnabled();
  }

  async isTermsOfServiceChecked(): Promise<boolean> {
    return await this.termsOfServiceCheckbox.isChecked();
  }

  async acceptTermsOfService(): Promise<void> {
    await this.clickElement(this.termsOfServiceCheckbox);
  }

  async isOnShoppingCartPage(): Promise<boolean> {
    const url = await this.getCurrentUrl();
    return url.includes('/cart');
  }

  async waitForCartPageLoad(): Promise<void> {
    await this.waitForPageLoad();
  }

  async clearDiscountCoupon(): Promise<void> {
    await this.clearField(this.discountCouponInput);
  }

  async clearGiftCard(): Promise<void> {
    await this.clearField(this.giftCardInput);
  }

  async getCurrentDiscountCoupon(): Promise<string> {
    return await this.discountCouponInput.inputValue();
  }

  async getCurrentGiftCard(): Promise<string> {
    return await this.giftCardInput.inputValue();
  }

  async getCurrentCountry(): Promise<string> {
    return await this.countrySelect.inputValue();
  }

  async getCurrentStateProvince(): Promise<string> {
    return await this.stateProvinceSelect.inputValue();
  }

  async getCurrentZipCode(): Promise<string> {
    return await this.zipPostalCodeInput.inputValue();
  }
}
