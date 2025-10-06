Feature: Homepage Functionality
  As a user of DemoWebshop
  I want to be able to navigate and interact with the homepage
  So that I can explore products and access different sections

  Background:
    Given I am on the DemoWebshop home page

  Scenario: Homepage loads successfully
    Then I should be on the home page
    And I should see the page title "Demo Web Shop"
    And I should see the header logo is visible
    And I should see the login link is visible
    And I should see the register link is visible
    And I should see the shopping cart link is visible
    And I should see the search box is visible

  Scenario: Featured products are displayed
    Then I should see the featured products
    And I should see 6 featured products

  Scenario: Newsletter subscription
    When I subscribe to newsletter with email "test@example.com"
    Then I should see the newsletter result "Thank you for signing up!"
    And I should see the newsletter subscription is successful

  Scenario: Newsletter subscription with invalid email
    When I subscribe to newsletter with email "invalid-email"
    Then I should see the newsletter result "Enter valid email"
    And I should not see the newsletter subscription is successful

  Scenario: Poll voting
    When I vote in poll with option "Excellent"
    Then I should see the poll results "Thank you for voting"
    And I should see the poll vote is successful

  Scenario: Search functionality
    When I search for "laptop"
    Then I should see the search results for "laptop"

  Scenario: Search with no results
    When I search for "nonexistentproduct"
    Then I should see the text "No products were found"

  Scenario: Category navigation
    When I navigate to category "Computers"
    Then I should see the products in "Computers" category

  Scenario: Product categories are displayed
    Then I should see the categories menu
    And I should see the category "Computers"
    And I should see the category "Electronics"
    And I should see the category "Apparel & Shoes"
    And I should see the category "Digital downloads"
    And I should see the category "Books"
    And I should see the category "Jewelry"
    And I should see the category "Gift Cards"

  Scenario: Featured products have required elements
    Then I should see the featured products
    And I should see the product titles
    And I should see the product prices
    And I should see the add to cart buttons
    And I should see the add to wishlist buttons
    And I should see the add to compare buttons

  Scenario: Product information display
    Then I should see the featured products
    And I should see the product "14.1-inch Laptop"
    And I should see the product "Build your own computer"
    And I should see the product "Digital Storm VANQUISH 3 Custom Performance PC"
    And I should see the product "Lenovo IdeaCentre 600 All-in-One PC"

  Scenario: Shopping cart link functionality
    When I click on the shopping cart link
    Then I should be on the shopping cart page

  Scenario: Login link functionality
    When I click on the login link
    Then I should be on the login page

  Scenario: Register link functionality
    When I click on the register link
    Then I should be on the registration page

  Scenario: Account link functionality for logged in user
    Given I am logged in as "test@example.com" with password "password123"
    When I click on the account link
    Then I should be on the account page

  Scenario: Logout functionality
    Given I am logged in as "test@example.com" with password "password123"
    When I click on the logout link
    Then I should not be logged in
    And I should see the login link is visible

  Scenario: Wishlist link functionality
    When I click on the wishlist link
    Then I should be on the wishlist page

  Scenario: Page refresh
    When I refresh the page
    Then I should be on the home page
    And I should see the featured products

  Scenario: Browser navigation
    When I click on the login link
    And I go back to the previous page
    Then I should be on the home page
    When I go forward to the next page
    Then I should be on the login page

  Scenario: Page load performance
    When I navigate to the home page
    Then I should see the page has loaded completely
    And I should see the page title "Demo Web Shop"

  Scenario: Responsive design elements
    Then I should see the header logo is visible
    And I should see the search box is visible
    And I should see the categories menu
    And I should see the featured products
    And I should see the newsletter subscription
    And I should see the community poll

  Scenario: Footer links
    Then I should see the information links
    And I should see the my account links
    And I should see the customer service links
    And I should see the follow us links

  Scenario: Product quick actions
    When I hover over the first product
    Then I should see the add to cart button is enabled
    And I should see the add to wishlist button is enabled
    And I should see the add to compare button is enabled

  Scenario: Product price display
    Then I should see the featured products
    And I should see the product price "1590.00"
    And I should see the product price "1200.00"
    And I should see the product price "1259.00"
    And I should see the product price "500.00"
