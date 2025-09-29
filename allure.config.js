module.exports = {
  // Allure configuration for BDD Playwright framework
  resultsDir: 'reports/allure-results',
  reportDir: 'reports/allure-report',
  
  // Report configuration
  report: {
    // Report title
    title: 'BDD Playwright Test Report',
    
    // Report description
    description: 'Comprehensive test execution report for DemoWebshop BDD testing framework',
    
    // Environment information
    environment: {
      'Test Framework': 'Playwright + Cucumber',
      'Browser': process.env.BROWSER || 'chromium',
      'Node.js Version': process.version,
      'Platform': process.platform,
      'Headless Mode': process.env.HEADLESS || 'true',
      'Base URL': 'https://demowebshop.tricentis.com'
    },
    
    // Categories for test results
    categories: [
      {
        name: 'Test Failures',
        matchedStatuses: ['failed']
      },
      {
        name: 'Broken Tests',
        matchedStatuses: ['broken']
      },
      {
        name: 'Skipped Tests',
        matchedStatuses: ['skipped']
      },
      {
        name: 'Passed Tests',
        matchedStatuses: ['passed']
      }
    ],
    
    // Test result trends
    trends: {
      enabled: true,
      buildOrder: 'DESC'
    }
  }
};
