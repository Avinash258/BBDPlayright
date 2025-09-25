Feature: User Login
  As a user of DemoWebshop
  I want to be able to login to my account
  So that I can access my personal information and make purchases

  Background:
    Given I am on the DemoWebshop home page

  Scenario: Successful login with valid credentials
    When I click on the login link
    Then I should be on the login page
    When I enter email "test@example.com"
    And I enter password "password123"
    And I click the login button
    Then I should be logged in successfully
    And I should be redirected to the home page

  Scenario: Failed login with invalid email
    When I click on the login link
    Then I should be on the login page
    When I enter email "invalid@example.com"
    And I enter password "password123"
    And I click the login button
    Then I should see validation errors
    And I should not be logged in

  Scenario: Failed login with invalid password
    When I click on the login link
    Then I should be on the login page
    When I enter email "test@example.com"
    And I enter password "wrongpassword"
    And I click the login button
    Then I should see validation errors
    And I should not be logged in

  Scenario: Failed login with empty credentials
    When I click on the login link
    Then I should be on the login page
    When I enter email ""
    And I enter password ""
    And I click the login button
    Then I should see validation errors
    And I should see the email validation error "Email is required"
    And I should see the password validation error "Password is required"

  Scenario: Login with remember me option
    When I click on the login link
    Then I should be on the login page
    When I enter email "test@example.com"
    And I enter password "password123"
    And I check the remember me checkbox
    And I click the login button
    Then I should be logged in successfully
    And I should be redirected to the home page

  Scenario: Navigate to forgot password page
    When I click on the login link
    Then I should be on the login page
    When I click the forgot password link
    Then I should be redirected to the forgot password page

  Scenario: Navigate to registration page from login
    When I click on the login link
    Then I should be on the login page
    When I click the register button
    Then I should be redirected to the registration page

  Scenario: Guest checkout option
    When I click on the login link
    Then I should be on the login page
    When I click the guest checkout button
    Then I should be redirected to the checkout page

  Scenario: Login form validation
    When I click on the login link
    Then I should be on the login page
    And I should see the login form
    And I should see the return customer section
    And I should see the new customer section
    And I should see the email input field
    And I should see the password input field
    And I should see the login button
    And I should see the remember me checkbox
    And I should see the forgot password link
    And I should see the register button
    And I should see the guest checkout button

  Scenario: Clear login form
    When I click on the login link
    Then I should be on the login page
    When I enter email "test@example.com"
    And I enter password "password123"
    And I clear the login form
    Then I should see the email field is empty
    And I should see the password field is empty
