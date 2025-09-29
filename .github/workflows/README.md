# 🚀 GitHub Actions Workflows

This directory contains comprehensive CI/CD workflows for the BDD Playwright framework.

## 📋 Available Workflows

### **1. Main Test Workflow** (`test.yml`)
- **Purpose**: Comprehensive cross-browser testing
- **Triggers**: Push to main/develop, Pull Requests
- **Browsers**: Chromium, Firefox, WebKit
- **Node.js**: 18.x, 20.x
- **Features**: Matrix testing, parallel execution, artifact uploads

### **2. Scheduled Tests** (`scheduled-tests.yml`)
- **Purpose**: Automated daily testing
- **Triggers**: Daily at 2 AM UTC, Manual dispatch
- **Test Types**: Smoke, Regression, Performance
- **Features**: Automated scheduling, manual test selection

### **3. Environment Testing** (`environment.yml`)
- **Purpose**: Environment-specific testing
- **Triggers**: Manual dispatch
- **Environments**: Development, Staging, Production
- **Features**: Environment validation, configurable URLs

### **4. Security & Dependencies** (`security.yml`)
- **Purpose**: Security scanning and dependency management
- **Triggers**: Weekly (Mondays), Push to main, PRs
- **Features**: Vulnerability scanning, dependency audit

### **5. Allure Report Generation** (`allure-report.yml`)
- **Purpose**: Enhanced HTML reporting
- **Triggers**: After successful test runs, Manual dispatch
- **Features**: Interactive dashboards, screenshot attachments, trends

### **6. Chrome Headed Tests** (`chrome-headed-tests.yml`) ⭐ **NEW**
- **Purpose**: Chrome-focused testing with visible browser
- **Triggers**: Push, PR, Manual dispatch
- **Browser**: Chrome (Chromium) only
- **Mode**: Headed (visible browser)
- **Features**: 
  - Fast execution (single browser)
  - Visual debugging
  - Screenshot capture
  - Smoke, regression, or all tests

### **7. Quick Chrome Test** (`quick-chrome-test.yml`) ⭐ **NEW**
- **Purpose**: Quick single-scenario testing
- **Triggers**: Manual dispatch only
- **Features**:
  - Custom scenario input
  - Headed or headless mode
  - Perfect for debugging
  - Fast execution (~15 minutes)

### **8. Deploy Reports** (`deploy.yml`)
- **Purpose**: Deploy test reports to GitHub Pages
- **Triggers**: Push to main
- **Features**: GitHub Pages deployment, report hosting

## 🎯 Chrome-Focused Workflows

### **Chrome Headed Tests**
```yaml
# Manual dispatch options
test_type:
  - smoke      # Critical functionality
  - regression # Full test suite  
  - all        # Complete testing
```

### **Quick Chrome Test**
```yaml
# Manual dispatch options
scenario: "Homepage loads successfully"  # Custom scenario
test_mode:
  - headed    # Visible browser
  - headless  # Background execution
```

## 🚀 Usage Examples

### **Running Chrome Tests Locally**
```bash
# Chrome headless
npm run test:chrome

# Chrome headed (visible browser)
npm run test:chrome:headed

# Chrome debug mode (slow motion)
npm run test:chrome:debug

# Specific scenario
npm run test:chrome:headed -- --name "Homepage loads successfully"
```

### **GitHub Actions Usage**

#### **1. Automatic Triggers**
- **Push to main/develop**: Runs Chrome headed tests
- **Pull Requests**: Runs Chrome headed tests
- **Daily at 2 AM**: Runs scheduled tests

#### **2. Manual Triggers**
- **Chrome Headed Tests**: Select test type (smoke/regression/all)
- **Quick Chrome Test**: Enter custom scenario and mode
- **Environment Tests**: Select environment (dev/staging/prod)

## 📊 Workflow Benefits

### **Chrome-Focused Benefits**
- ✅ **Fast Execution** - Single browser, optimized performance
- ✅ **Visual Debugging** - Watch tests run in real-time
- ✅ **Screenshot Capture** - Automatic failure screenshots
- ✅ **Flexible Testing** - Smoke, regression, or full suite
- ✅ **Quick Debugging** - Single scenario execution

### **CI/CD Benefits**
- ✅ **Automated Testing** - Runs on every push/PR
- ✅ **Manual Control** - Custom test selection
- ✅ **Artifact Storage** - Test results and screenshots
- ✅ **PR Integration** - Automatic comments with results
- ✅ **GitHub Pages** - Deployed reports

## 🔧 Configuration

### **Environment Variables**
```bash
HEADLESS=false          # Visible browser
BROWSER=chromium        # Chrome browser
SLOW_MO=1000           # Debug mode (milliseconds)
```

### **Test Commands**
```bash
# Standard commands
npm run test:chrome              # Chrome headless
npm run test:chrome:headed       # Chrome headed
npm run test:chrome:debug        # Chrome debug

# CI commands  
npm run ci:setup                 # Setup for CI
npm run ci:test                  # Run tests in CI
npm run ci:test:headed           # Run headed tests in CI
```

## 📈 Monitoring

### **Workflow Status**
- **Green**: All tests passed
- **Yellow**: Some tests failed (non-critical)
- **Red**: Critical tests failed
- **Gray**: Workflow cancelled or skipped

### **Artifacts**
- **Test Results**: Available for 30 days
- **Screenshots**: Available for 7 days
- **Reports**: Available for 30 days
- **Logs**: Available in workflow runs

### **Notifications**
- **PR Comments**: Automatic test result comments
- **Email Notifications**: Configure in GitHub settings
- **Slack Integration**: Available via webhooks

## 🛠️ Troubleshooting

### **Common Issues**
1. **Browser Installation**: Ensure Playwright browsers are installed
2. **Timeout Issues**: Increase timeout in workflow configuration
3. **Screenshot Failures**: Check file permissions and disk space
4. **Allure Errors**: Use Chrome-specific configuration without Allure

### **Debug Steps**
1. Check workflow logs for detailed error messages
2. Download artifacts to inspect test results
3. Run tests locally to reproduce issues
4. Check environment variables and configuration

## 📚 Documentation

- **Framework README**: [../README.md](../README.md)
- **Test Documentation**: [../docs/](../docs/)
- **API Reference**: [../docs/api/](../docs/api/)

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
3. **Make your changes**
4. **Test with Chrome workflows**
5. **Submit a pull request**

The Chrome-focused workflows will automatically run on your PR!