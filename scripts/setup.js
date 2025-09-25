const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Setup script for DemoWebshop Playwright Cucumber framework
function createDirectories() {
  const directories = [
    'reports',
    'reports/screenshots',
    'reports/videos',
    'reports/traces',
    'reports/logs',
    'reports/allure-results',
    'dist',
    'temp'
  ];

  console.log('Creating directories...');
  
  directories.forEach(dir => {
    const dirPath = path.join(__dirname, '..', dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`Created directory: ${dir}`);
    } else {
      console.log(`Directory already exists: ${dir}`);
    }
  });
}

function createEnvFile() {
  const envPath = path.join(__dirname, '..', '.env');
  const envExamplePath = path.join(__dirname, '..', 'env.example');
  
  if (!fs.existsSync(envPath) && fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('Created .env file from env.example');
  } else if (fs.existsSync(envPath)) {
    console.log('.env file already exists');
  } else {
    console.log('No env.example file found');
  }
}

function installDependencies() {
  console.log('Installing dependencies...');
  
  try {
    execSync('npm install', { stdio: 'inherit' });
    console.log('Dependencies installed successfully');
  } catch (error) {
    console.error('Error installing dependencies:', error.message);
    process.exit(1);
  }
}

function installPlaywrightBrowsers() {
  console.log('Installing Playwright browsers...');
  
  try {
    execSync('npx playwright install', { stdio: 'inherit' });
    console.log('Playwright browsers installed successfully');
  } catch (error) {
    console.error('Error installing Playwright browsers:', error.message);
    process.exit(1);
  }
}

function buildProject() {
  console.log('Building project...');
  
  try {
    execSync('npm run build', { stdio: 'inherit' });
    console.log('Project built successfully');
  } catch (error) {
    console.error('Error building project:', error.message);
    process.exit(1);
  }
}

function runLinting() {
  console.log('Running linting...');
  
  try {
    execSync('npm run lint', { stdio: 'inherit' });
    console.log('Linting passed');
  } catch (error) {
    console.error('Linting failed:', error.message);
    // Don't exit on linting errors, just warn
  }
}

function createGitIgnore() {
  const gitignorePath = path.join(__dirname, '..', '.gitignore');
  const gitignoreContent = `# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Build outputs
dist/
build/
*.tsbuildinfo

# Test outputs
reports/
coverage/
.nyc_output/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Logs
logs/
*.log

# Runtime data
pids/
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# Temporary folders
tmp/
temp/

# Playwright
test-results/
playwright-report/
playwright/.cache/

# Allure
allure-results/
allure-report/

# Screenshots and videos
screenshots/
videos/
traces/
`;

  if (!fs.existsSync(gitignorePath)) {
    fs.writeFileSync(gitignorePath, gitignoreContent);
    console.log('Created .gitignore file');
  } else {
    console.log('.gitignore file already exists');
  }
}

function createReadme() {
  const readmePath = path.join(__dirname, '..', 'README.md');
  const readmeContent = `# DemoWebshop Playwright Cucumber Framework

A comprehensive testing framework for DemoWebshop using Playwright and Cucumber with TypeScript.

## Features

- **Playwright**: Modern browser automation
- **Cucumber**: Behavior-driven development (BDD)
- **TypeScript**: Type-safe development
- **Page Object Model**: Maintainable test structure
- **Multiple Browsers**: Chrome, Firefox, Safari, Edge
- **Parallel Execution**: Fast test execution
- **Rich Reporting**: HTML, JSON, and Allure reports
- **Screenshots & Videos**: Automatic capture on failures
- **CI/CD Ready**: GitHub Actions, Jenkins support

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

## Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd demowebshop-playwright-cucumber
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Install Playwright browsers:
\`\`\`bash
npx playwright install
\`\`\`

4. Setup the project:
\`\`\`bash
npm run setup
\`\`\`

## Configuration

Copy the example environment file and configure as needed:
\`\`\`bash
cp env.example .env
\`\`\`

Edit \`.env\` file to customize:
- Browser settings (headless, slowMo)
- Test URLs
- Timeouts
- Reporting options

## Running Tests

### Run all tests
\`\`\`bash
npm test
\`\`\`

### Run tests in headed mode
\`\`\`bash
npm run test:headed
\`\`\`

### Run tests in debug mode
\`\`\`bash
npm run test:debug
\`\`\`

### Run specific feature
\`\`\`bash
npx cucumber-js features/login.feature
\`\`\`

### Run with specific browser
\`\`\`bash
npx cucumber-js --world-parameters '{"browser": "firefox"}'
\`\`\`

## Test Structure

\`\`\`
├── features/                 # Feature files
│   ├── login.feature
│   ├── registration.feature
│   ├── shopping.feature
│   └── homepage.feature
├── src/
│   ├── pages/               # Page Object Models
│   │   ├── BasePage.ts
│   │   ├── HomePage.ts
│   │   ├── LoginPage.ts
│   │   ├── RegisterPage.ts
│   │   ├── ProductPage.ts
│   │   └── ShoppingCartPage.ts
│   ├── steps/               # Step Definitions
│   │   ├── common.steps.ts
│   │   ├── login.steps.ts
│   │   ├── registration.steps.ts
│   │   └── shopping.steps.ts
│   ├── utils/               # Utilities
│   │   ├── helpers.ts
│   │   ├── logger.ts
│   │   └── reporter.ts
│   ├── data/                # Test Data
│   │   └── testData.ts
│   └── config/              # Configuration
│       └── config.ts
├── reports/                 # Test Reports
├── scripts/                 # Utility Scripts
└── step-definitions/        # Additional Step Definitions
\`\`\`

## Writing Tests

### Feature Files
Create feature files in the \`features/\` directory using Gherkin syntax:

\`\`\`gherkin
Feature: User Login
  As a user of DemoWebshop
  I want to be able to login to my account
  So that I can access my personal information

  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I enter email "test@example.com"
    And I enter password "password123"
    And I click the login button
    Then I should be logged in successfully
\`\`\`

### Step Definitions
Implement step definitions in the \`src/steps/\` directory:

\`\`\`typescript
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

When('I enter email {string}', async function (email: string) {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.setEmail(email);
});
\`\`\`

### Page Objects
Create page objects in the \`src/pages/\` directory:

\`\`\`typescript
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get emailInput(): Locator {
    return this.page.locator('#Email');
  }

  async setEmail(email: string): Promise<void> {
    await this.fillField(this.emailInput, email);
  }
}
\`\`\`

## Reporting

### HTML Report
\`\`\`bash
npm run test:report
\`\`\`

### Allure Report
\`\`\`bash
npm run test:allure
\`\`\`

Reports are generated in the \`reports/\` directory.

## CI/CD Integration

### GitHub Actions
Create \`.github/workflows/test.yml\`:

\`\`\`yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npx playwright install --with-deps
      - run: npm test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: test-results
          path: reports/
\`\`\`

## Best Practices

1. **Use Page Object Model**: Keep page logic separate from test logic
2. **Data-Driven Tests**: Use test data files for different scenarios
3. **Wait Strategies**: Use proper waits instead of hard-coded delays
4. **Error Handling**: Implement proper error handling and recovery
5. **Parallel Execution**: Run tests in parallel for faster execution
6. **Cleanup**: Clean up test data after test execution
7. **Reporting**: Use comprehensive reporting for better visibility

## Troubleshooting

### Common Issues

1. **Browser not found**: Run \`npx playwright install\`
2. **Timeout errors**: Increase timeout values in configuration
3. **Element not found**: Check selectors and wait conditions
4. **Flaky tests**: Add proper waits and retry mechanisms

### Debug Mode
Run tests in debug mode to step through execution:
\`\`\`bash
npm run test:debug
\`\`\`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Write tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
`;

  if (!fs.existsSync(readmePath)) {
    fs.writeFileSync(readmePath, readmeContent);
    console.log('Created README.md file');
  } else {
    console.log('README.md file already exists');
  }
}

function main() {
  console.log('Setting up DemoWebshop Playwright Cucumber Framework...\n');
  
  try {
    createDirectories();
    createEnvFile();
    createGitIgnore();
    createReadme();
    installDependencies();
    installPlaywrightBrowsers();
    buildProject();
    runLinting();
    
    console.log('\n✅ Setup completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Copy env.example to .env and configure as needed');
    console.log('2. Run tests: npm test');
    console.log('3. Check reports in the reports/ directory');
    console.log('\nHappy testing! 🚀');
  } catch (error) {
    console.error('\n❌ Setup failed:', error.message);
    process.exit(1);
  }
}

main();
