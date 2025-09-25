// Test data for DemoWebshop testing

export interface UserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: 'male' | 'female';
}

export interface ProductData {
  name: string;
  price: string;
  description: string;
  category: string;
  sku: string;
}

export interface ShippingData {
  country: string;
  state: string;
  zipCode: string;
  city: string;
  address: string;
}

// Test users
export const testUsers: UserData[] = [
  {
    email: 'testuser1@example.com',
    password: 'password123',
    firstName: 'John',
    lastName: 'Doe',
    gender: 'male'
  },
  {
    email: 'testuser2@example.com',
    password: 'password456',
    firstName: 'Jane',
    lastName: 'Smith',
    gender: 'female'
  },
  {
    email: 'admin@example.com',
    password: 'admin123',
    firstName: 'Admin',
    lastName: 'User',
    gender: 'male'
  }
];

// Invalid test users
export const invalidUsers: UserData[] = [
  {
    email: 'invalid@example.com',
    password: 'wrongpassword',
    firstName: 'Invalid',
    lastName: 'User',
    gender: 'male'
  },
  {
    email: 'test@example.com',
    password: 'wrongpassword',
    firstName: 'Test',
    lastName: 'User',
    gender: 'male'
  }
];

// Test products
export const testProducts: ProductData[] = [
  {
    name: '14.1-inch Laptop',
    price: '1590.00',
    description: '14.1-inch Laptop',
    category: 'Computers',
    sku: 'COMP_LAP_14'
  },
  {
    name: 'Build your own computer',
    price: '1200.00',
    description: 'Build your own computer',
    category: 'Computers',
    sku: 'COMP_CUSTOM'
  },
  {
    name: 'Digital Storm VANQUISH 3 Custom Performance PC',
    price: '1259.00',
    description: 'Digital Storm VANQUISH 3 Custom Performance PC',
    category: 'Computers',
    sku: 'COMP_DIGITAL'
  },
  {
    name: 'Lenovo IdeaCentre 600 All-in-One PC',
    price: '500.00',
    description: 'Lenovo IdeaCentre 600 All-in-One PC',
    category: 'Computers',
    sku: 'COMP_LENOVO'
  },
  {
    name: 'Simple Computer',
    price: '800.00',
    description: 'Simple Computer',
    category: 'Computers',
    sku: 'COMP_SIMPLE'
  }
];

// Test categories
export const testCategories = [
  'Computers',
  'Electronics',
  'Apparel & Shoes',
  'Digital downloads',
  'Books',
  'Jewelry',
  'Gift Cards'
];

// Test shipping data
export const testShippingData: ShippingData[] = [
  {
    country: 'United States',
    state: 'California',
    zipCode: '90210',
    city: 'Beverly Hills',
    address: '123 Main St'
  },
  {
    country: 'United States',
    state: 'New York',
    zipCode: '10001',
    city: 'New York',
    address: '456 Broadway'
  },
  {
    country: 'Canada',
    state: 'Ontario',
    zipCode: 'M5V 3A8',
    city: 'Toronto',
    address: '789 Queen St'
  }
];

// Test coupon codes
export const testCoupons = [
  {
    code: 'DISCOUNT10',
    description: '10% discount',
    value: '10%'
  },
  {
    code: 'SAVE20',
    description: '$20 off',
    value: '$20'
  },
  {
    code: 'FREESHIP',
    description: 'Free shipping',
    value: 'Free'
  }
];

// Test gift cards
export const testGiftCards = [
  {
    code: 'GIFTCARD50',
    description: '$50 gift card',
    value: '$50'
  },
  {
    code: 'GIFTCARD100',
    description: '$100 gift card',
    value: '$100'
  }
];

// Test search terms
export const testSearchTerms = [
  'laptop',
  'computer',
  'phone',
  'book',
  'jewelry',
  'shoes',
  'nonexistentproduct'
];

// Test poll options
export const testPollOptions = [
  'Excellent',
  'Very good',
  'Good',
  'Poor'
];

// Test newsletter emails
export const testNewsletterEmails = [
  'test@example.com',
  'newsletter@test.com',
  'invalid-email',
  'test@domain.com'
];

// Test validation messages
export const validationMessages = {
  required: {
    firstName: 'First name is required',
    lastName: 'Last name is required',
    email: 'Email is required',
    password: 'Password is required',
    confirmPassword: 'Password is required'
  },
  invalid: {
    email: 'Wrong email',
    password: 'The password should have at least 6 characters',
    confirmPassword: 'The password and confirmation password do not match'
  },
  existing: {
    email: 'The specified email already exists'
  }
};

// Test URLs
export const testUrls = {
  home: '/',
  login: '/login',
  register: '/register',
  cart: '/cart',
  checkout: '/checkout',
  account: '/customer',
  wishlist: '/wishlist',
  compare: '/compareproducts',
  passwordRecovery: '/passwordrecovery'
};

// Test page titles
export const testPageTitles = {
  home: 'Demo Web Shop',
  login: 'Welcome, Please Sign In!',
  register: 'Register',
  cart: 'Shopping cart',
  checkout: 'Checkout',
  account: 'My account',
  wishlist: 'Wishlist',
  compare: 'Compare products',
  passwordRecovery: 'Password recovery'
};

// Test error messages
export const testErrorMessages = {
  login: {
    invalidCredentials: 'Login was unsuccessful. Please correct the errors and try again.',
    emailRequired: 'Email is required',
    passwordRequired: 'Password is required'
  },
  registration: {
    emailExists: 'The specified email already exists',
    passwordMismatch: 'The password and confirmation password do not match',
    passwordTooShort: 'The password should have at least 6 characters'
  },
  cart: {
    empty: 'Your Shopping Cart is empty!',
    itemNotFound: 'Product not found in cart'
  }
};

// Test success messages
export const testSuccessMessages = {
  registration: 'Your registration completed',
  login: 'Welcome back!',
  newsletter: 'Thank you for signing up!',
  poll: 'Thank you for voting',
  addToCart: 'The product has been added to your shopping cart',
  addToWishlist: 'The product has been added to your wishlist',
  addToCompare: 'The product has been added to your product comparison'
};

// Test configuration
export const testConfig = {
  baseUrl: 'https://demowebshop.tricentis.com',
  timeout: 30000,
  retries: 2,
  headless: true,
  slowMo: 0,
  viewport: {
    width: 1280,
    height: 720
  }
};

// Test environment variables
export const testEnv = {
  development: {
    baseUrl: 'https://demowebshop.tricentis.com',
    headless: false,
    slowMo: 1000
  },
  staging: {
    baseUrl: 'https://staging.demowebshop.tricentis.com',
    headless: true,
    slowMo: 0
  },
  production: {
    baseUrl: 'https://demowebshop.tricentis.com',
    headless: true,
    slowMo: 0
  }
};
