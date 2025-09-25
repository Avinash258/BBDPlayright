Feature: User Registration
  As a new user of DemoWebshop
  I want to be able to register for an account
  So that I can access personalized features and make purchases

  Background:
    Given I am on the DemoWebshop home page

  Scenario: Successful registration with valid data
    When I click on the register link
    Then I should be on the registration page
    When I select gender "male"
    And I enter first name "John"
    And I enter last name "Doe"
    And I enter email "john.doe@example.com"
    And I enter password "password123"
    And I enter confirm password "password123"
    And I click the register button
    Then I should see the registration success message
    And I should be redirected to the home page

  Scenario: Registration with female gender
    When I click on the register link
    Then I should be on the registration page
    When I select gender "female"
    And I enter first name "Jane"
    And I enter last name "Smith"
    And I enter email "jane.smith@example.com"
    And I enter password "password123"
    And I enter confirm password "password123"
    And I click the register button
    Then I should see the registration success message
    And I should be redirected to the home page

  Scenario: Registration with mismatched passwords
    When I click on the register link
    Then I should be on the registration page
    When I select gender "male"
    And I enter first name "John"
    And I enter last name "Doe"
    And I enter email "john.doe@example.com"
    And I enter password "password123"
    And I enter confirm password "differentpassword"
    And I click the register button
    Then I should see validation errors
    And I should see the confirm password validation error "passwords do not match"

  Scenario: Registration with empty required fields
    When I click on the register link
    Then I should be on the registration page
    When I click the register button
    Then I should see validation errors
    And I should see the first name validation error "First name is required"
    And I should see the last name validation error "Last name is required"
    And I should see the email validation error "Email is required"
    And I should see the password validation error "Password is required"

  Scenario: Registration with invalid email format
    When I click on the register link
    Then I should be on the registration page
    When I select gender "male"
    And I enter first name "John"
    And I enter last name "Doe"
    And I enter email "invalid-email"
    And I enter password "password123"
    And I enter confirm password "password123"
    And I click the register button
    Then I should see validation errors
    And I should see the email validation error "Wrong email"

  Scenario: Registration with existing email
    When I click on the register link
    Then I should be on the registration page
    When I select gender "male"
    And I enter first name "John"
    And I enter last name "Doe"
    And I enter email "existing@example.com"
    And I enter password "password123"
    And I enter confirm password "password123"
    And I click the register button
    Then I should see validation errors
    And I should see the validation error "The specified email already exists"

  Scenario: Registration with short password
    When I click on the register link
    Then I should be on the registration page
    When I select gender "male"
    And I enter first name "John"
    And I enter last name "Doe"
    And I enter email "john.doe@example.com"
    And I enter password "123"
    And I enter confirm password "123"
    And I click the register button
    Then I should see validation errors
    And I should see the password validation error "The password should have at least 6 characters"

  Scenario: Registration form validation
    When I click on the register link
    Then I should be on the registration page
    And I should see the registration form
    And I should see the male gender option
    And I should see the female gender option
    And I should see the first name input field
    And I should see the last name input field
    And I should see the email input field
    And I should see the password input field
    And I should see the confirm password input field
    And I should see the register button

  Scenario: Clear registration form
    When I click on the register link
    Then I should be on the registration page
    When I select gender "male"
    And I enter first name "John"
    And I enter last name "Doe"
    And I enter email "john.doe@example.com"
    And I enter password "password123"
    And I enter confirm password "password123"
    And I clear the registration form
    Then I should see the first name field is empty
    And I should see the last name field is empty
    And I should see the email field is empty
    And I should see the password field is empty
    And I should see the confirm password field is empty

  Scenario: Registration with special characters in name
    When I click on the register link
    Then I should be on the registration page
    When I select gender "male"
    And I enter first name "José"
    And I enter last name "García-López"
    And I enter email "jose.garcia@example.com"
    And I enter password "password123"
    And I enter confirm password "password123"
    And I click the register button
    Then I should see the registration success message
    And I should be redirected to the home page

  Scenario: Registration with long email
    When I click on the register link
    Then I should be on the registration page
    When I select gender "male"
    And I enter first name "John"
    And I enter last name "Doe"
    And I enter email "very.long.email.address.for.testing.purposes@example.com"
    And I enter password "password123"
    And I enter confirm password "password123"
    And I click the register button
    Then I should see the registration success message
    And I should be redirected to the home page
