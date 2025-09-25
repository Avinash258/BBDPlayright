Feature: Shopping Cart Functionality
  As a user of DemoWebshop
  I want to be able to add products to my cart and manage them
  So that I can purchase items I want

  Background:
    Given I am on the DemoWebshop home page

  Scenario: Add first product to cart
    When I add the first product to cart
    Then I should see the cart has 1 items
    And I should not see the cart is empty

  Scenario: Add specific product to cart
    When I add the product "14.1-inch Laptop" to cart
    Then I should see the cart has 1 items
    And I should see the product "14.1-inch Laptop" in cart

  Scenario: Add multiple products to cart
    When I add the first product to cart
    And I add the product at index 1 to cart
    Then I should see the cart has 2 items

  Scenario: Add product to wishlist
    When I add the first product to wishlist
    Then I should see the product "14.1-inch Laptop" in cart

  Scenario: Add product to compare list
    When I add the first product to compare
    And I add the product at index 1 to compare
    Then I should see the product "14.1-inch Laptop" in cart

  Scenario: View product details
    When I click on the first product
    Then I should be on a product page
    And I should see the product title "14.1-inch Laptop"
    And I should see the product is in stock
    And I should see the add to cart button is enabled

  Scenario: Add product to cart from product page
    When I click on the first product
    Then I should be on a product page
    When I add the current product to cart
    Then I should see the cart has 1 items

  Scenario: Add product to cart with specific quantity
    When I click on the first product
    Then I should be on a product page
    When I set product quantity to 3
    And I add the current product to cart
    Then I should see the cart has 1 items

  Scenario: Remove product from cart
    When I add the first product to cart
    And I navigate to the shopping cart page
    Then I should see the cart has 1 items
    When I remove the first item from cart
    Then I should see the cart is empty

  Scenario: Update cart item quantity
    When I add the first product to cart
    And I navigate to the shopping cart page
    Then I should see the cart has 1 items
    When I set cart item quantity at index 0 to 5
    And I update the cart
    Then I should see the cart has 1 items

  Scenario: Continue shopping from cart
    When I add the first product to cart
    And I navigate to the shopping cart page
    Then I should see the cart has 1 items
    When I continue shopping
    Then I should be on the home page

  Scenario: Apply discount coupon
    When I add the first product to cart
    And I navigate to the shopping cart page
    Then I should see the cart has 1 items
    When I apply discount coupon "DISCOUNT10"
    Then I should see the discount "10%"

  Scenario: Apply gift card
    When I add the first product to cart
    And I navigate to the shopping cart page
    Then I should see the cart has 1 items
    When I apply gift card "GIFTCARD50"
    Then I should see the gift card discount "50"

  Scenario: Estimate shipping
    When I add the first product to cart
    And I navigate to the shopping cart page
    Then I should see the cart has 1 items
    When I estimate shipping with country "United States", state "California", zip code "90210"
    Then I should see the shipping cost "10.00"

  Scenario: Proceed to checkout
    When I add the first product to cart
    And I navigate to the shopping cart page
    Then I should see the cart has 1 items
    When I accept terms of service
    And I proceed to checkout
    Then I should be redirected to the checkout page

  Scenario: Search for products
    When I search for "laptop"
    Then I should see the product "14.1-inch Laptop"

  Scenario: Navigate to category
    When I navigate to category "Computers"
    Then I should see the product "14.1-inch Laptop"

  Scenario: Empty cart validation
    When I navigate to the shopping cart page
    Then I should see the cart is empty
    And I should see the update cart button is disabled
    And I should see the checkout button is disabled

  Scenario: Cart total calculation
    When I add the first product to cart
    And I navigate to the shopping cart page
    Then I should see the cart has 1 items
    And I should see the subtotal "1590.00"
    And I should see the cart total "1590.00"

  Scenario: Product availability check
    When I click on the first product
    Then I should be on a product page
    And I should see the product is in stock
    And I should see the add to cart button is enabled
    And I should see the add to wishlist button is enabled
    And I should see the add to compare button is enabled

  Scenario: Product page navigation
    When I click on the first product
    Then I should be on a product page
    And I should see the product title "14.1-inch Laptop"
    And I should see the product price "1590.00"
    And I should see the current quantity is 1

  Scenario: Add product to wishlist from product page
    When I click on the first product
    Then I should be on a product page
    When I add the current product to wishlist
    Then I should see the product "14.1-inch Laptop" in cart

  Scenario: Add product to compare from product page
    When I click on the first product
    Then I should be on a product page
    When I add the current product to compare
    Then I should see the product "14.1-inch Laptop" in cart

  Scenario: Email a friend about product
    When I click on the first product
    Then I should be on a product page
    When I email a friend about the current product
    Then I should be redirected to the checkout page

  Scenario: Add review for product
    When I click on the first product
    Then I should be on a product page
    When I add a review for the current product
    Then I should be redirected to the checkout page
