import { Page } from '@playwright/test';

// Utility functions for DemoWebshop testing

export class TestHelpers {
  /**
   * Generate a random email address
   */
  static generateRandomEmail(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `testuser${timestamp}${random}@example.com`;
  }

  /**
   * Generate a random string
   */
  static generateRandomString(length: number = 8): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Generate a random number
   */
  static generateRandomNumber(min: number = 1, max: number = 100): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Wait for a specific amount of time
   */
  static async wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Format date to string
   */
  static formatDate(date: Date, format: string = 'YYYY-MM-DD'): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return format
      .replace('YYYY', year.toString())
      .replace('MM', month)
      .replace('DD', day);
  }

  /**
   * Get current timestamp
   */
  static getCurrentTimestamp(): string {
    return new Date().toISOString();
  }

  /**
   * Generate a unique test ID
   */
  static generateTestId(): string {
    return `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Validate email format
   */
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate password strength
   */
  static isValidPassword(password: string): boolean {
    return password.length >= 6;
  }

  /**
   * Sanitize string for file names
   */
  static sanitizeFileName(fileName: string): string {
    return fileName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  }

  /**
   * Convert string to title case
   */
  static toTitleCase(str: string): string {
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  /**
   * Truncate string to specified length
   */
  static truncateString(str: string, length: number): string {
    if (str.length <= length) return str;
    return str.substring(0, length) + '...';
  }

  /**
   * Check if string contains only numbers
   */
  static isNumeric(str: string): boolean {
    return /^\d+$/.test(str);
  }

  /**
   * Check if string contains only letters
   */
  static isAlpha(str: string): boolean {
    return /^[a-zA-Z]+$/.test(str);
  }

  /**
   * Check if string contains only alphanumeric characters
   */
  static isAlphaNumeric(str: string): boolean {
    return /^[a-zA-Z0-9]+$/.test(str);
  }

  /**
   * Remove special characters from string
   */
  static removeSpecialCharacters(str: string): string {
    return str.replace(/[^a-zA-Z0-9\s]/g, '');
  }

  /**
   * Capitalize first letter of string
   */
  static capitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * Convert string to camel case
   */
  static toCamelCase(str: string): string {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
  }

  /**
   * Convert string to kebab case
   */
  static toKebabCase(str: string): string {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase();
  }

  /**
   * Convert string to snake case
   */
  static toSnakeCase(str: string): string {
    return str.replace(/([a-z])([A-Z])/g, '$1_$2')
      .replace(/[\s-]+/g, '_')
      .toLowerCase();
  }

  /**
   * Generate a random phone number
   */
  static generateRandomPhoneNumber(): string {
    const areaCode = this.generateRandomNumber(200, 999);
    const exchange = this.generateRandomNumber(200, 999);
    const number = this.generateRandomNumber(1000, 9999);
    return `${areaCode}-${exchange}-${number}`;
  }

  /**
   * Generate a random address
   */
  static generateRandomAddress(): string {
    const streetNumber = this.generateRandomNumber(1, 9999);
    const streetNames = ['Main St', 'Oak Ave', 'Pine Rd', 'Cedar Ln', 'Maple Dr'];
    const streetName = streetNames[Math.floor(Math.random() * streetNames.length)];
    return `${streetNumber} ${streetName}`;
  }

  /**
   * Generate a random city
   */
  static generateRandomCity(): string {
    const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];
    return cities[Math.floor(Math.random() * cities.length)];
  }

  /**
   * Generate a random state
   */
  static generateRandomState(): string {
    const states = ['California', 'Texas', 'Florida', 'New York', 'Pennsylvania', 'Illinois', 'Ohio', 'Georgia', 'North Carolina', 'Michigan'];
    return states[Math.floor(Math.random() * states.length)];
  }

  /**
   * Generate a random zip code
   */
  static generateRandomZipCode(): string {
    return this.generateRandomNumber(10000, 99999).toString();
  }

  /**
   * Generate a random credit card number (for testing purposes only)
   */
  static generateRandomCreditCardNumber(): string {
    const cardNumbers = [
      '4111111111111111', // Visa
      '5555555555554444', // Mastercard
      '378282246310005',  // American Express
      '6011111111111117'  // Discover
    ];
    return cardNumbers[Math.floor(Math.random() * cardNumbers.length)];
  }

  /**
   * Generate a random CVV
   */
  static generateRandomCVV(): string {
    return this.generateRandomNumber(100, 999).toString();
  }

  /**
   * Generate a random expiration date
   */
  static generateRandomExpirationDate(): string {
    const currentYear = new Date().getFullYear();
    const year = this.generateRandomNumber(currentYear, currentYear + 10);
    const month = this.generateRandomNumber(1, 12).toString().padStart(2, '0');
    return `${month}/${year}`;
  }

  /**
   * Check if a date is in the future
   */
  static isFutureDate(date: Date): boolean {
    return date > new Date();
  }

  /**
   * Check if a date is in the past
   */
  static isPastDate(date: Date): boolean {
    return date < new Date();
  }

  /**
   * Get days between two dates
   */
  static getDaysBetween(date1: Date, date2: Date): number {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  /**
   * Add days to a date
   */
  static addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  /**
   * Subtract days from a date
   */
  static subtractDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() - days);
    return result;
  }

  /**
   * Get a random item from an array
   */
  static getRandomItem<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  /**
   * Shuffle an array
   */
  static shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  /**
   * Remove duplicates from an array
   */
  static removeDuplicates<T>(array: T[]): T[] {
    return [...new Set(array)];
  }

  /**
   * Check if two arrays are equal
   */
  static arraysEqual<T>(array1: T[], array2: T[]): boolean {
    if (array1.length !== array2.length) return false;
    return array1.every((value, index) => value === array2[index]);
  }

  /**
   * Merge two objects
   */
  static mergeObjects<T extends Record<string, any>>(obj1: T, obj2: Partial<T>): T {
    return { ...obj1, ...obj2 };
  }

  /**
   * Deep clone an object
   */
  static deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }

  /**
   * Check if an object is empty
   */
  static isEmpty(obj: any): boolean {
    if (obj == null) return true;
    if (Array.isArray(obj)) return obj.length === 0;
    if (typeof obj === 'object') return Object.keys(obj).length === 0;
    return false;
  }

  /**
   * Get nested property value safely
   */
  static getNestedProperty(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  /**
   * Set nested property value safely
   */
  static setNestedProperty(obj: any, path: string, value: any): void {
    const keys = path.split('.');
    const lastKey = keys.pop()!;
    const target = keys.reduce((current, key) => {
      if (!(key in current)) current[key] = {};
      return current[key];
    }, obj);
    target[lastKey] = value;
  }
}
