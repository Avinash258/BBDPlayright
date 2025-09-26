# GitHub Actions Workflows

This directory contains all the GitHub Actions workflows for the BDD Playwright testing framework.

## 📋 Workflow Overview

| Workflow | File | Trigger | Purpose |
|----------|------|---------|---------|
| **Main Tests** | `test.yml` | Push, PR | Cross-browser testing with matrix |
| **Scheduled Tests** | `scheduled-tests.yml` | Daily, Manual | Automated testing schedules |
| **Environment Tests** | `environment.yml` | Manual | Environment-specific testing |
| **Security** | `security.yml` | Weekly, Push, PR | Security scanning & dependencies |
| **Deploy** | `deploy.yml` | Main branch | Deploy test reports to GitHub Pages |

## 🔄 Workflow Details

### 1. Main Test Workflow (`test.yml`)
- **Matrix Testing**: Node.js 18.x, 20.x × Chromium, Firefox, WebKit
- **Quality Checks**: ESLint, TypeScript compilation
- **Artifacts**: Test results, screenshots, reports
- **Notifications**: PR comments with test results

### 2. Scheduled Tests (`scheduled-tests.yml`)
- **Smoke Tests**: Critical functionality validation
- **Regression Tests**: Full test suite execution
- **Performance Tests**: Load and performance validation
- **Manual Dispatch**: Select test type via workflow dispatch

### 3. Environment Testing (`environment.yml`)
- **Multi-Environment**: Development, Staging, Production
- **Environment-Specific**: Different test suites per environment
- **Configurable URLs**: Dynamic base URL configuration

### 4. Security & Dependencies (`security.yml`)
- **Vulnerability Scanning**: npm audit with moderate level
- **Dependency Updates**: Outdated package detection
- **Weekly Schedule**: Automated security checks
- **Update Summaries**: Automated dependency update reports

### 5. Deploy Reports (`deploy.yml`)
- **GitHub Pages**: Deploy test reports to GitHub Pages
- **Test Summaries**: Generate comprehensive test summaries
- **Artifact Management**: Long-term storage of test results

## 🚀 Usage

### Manual Workflow Dispatch
```bash
# Trigger scheduled tests manually
gh workflow run scheduled-tests.yml

# Trigger environment tests
gh workflow run environment.yml --field environment=staging

# Trigger security scan
gh workflow run security.yml
```

### Workflow Status Monitoring
- **Badges**: Add status badges to README
- **Notifications**: Configure team notifications
- **Artifacts**: Download test results and reports

## 📊 Artifact Retention

| Artifact Type | Retention Period | Purpose |
|---------------|------------------|---------|
| Test Results | 30 days | Detailed test execution data |
| Screenshots | 7 days | Failure debugging |
| HTML Reports | 30 days | Human-readable reports |
| Security Reports | 30 days | Vulnerability tracking |
| Performance Data | 7 days | Performance monitoring |

## 🔧 Configuration

### Environment Variables
- `HEADLESS`: Browser mode (true/false)
- `BROWSER`: Target browser (chromium/firefox/webkit)
- `ENVIRONMENT`: Test environment (dev/staging/production)
- `BASE_URL`: Application base URL

### Secrets (if needed)
- `GITHUB_TOKEN`: For GitHub Pages deployment
- `TEST_ENV_VARS`: Environment-specific test variables

## 📈 Performance Optimization

### Parallel Execution
- **Matrix Strategy**: Multiple Node.js versions and browsers
- **Job Parallelization**: Independent test execution
- **Resource Optimization**: Efficient resource usage

### Caching
- **Node Modules**: npm cache for faster installs
- **Playwright Browsers**: Browser binary caching
- **Build Artifacts**: TypeScript compilation caching

## 🛠️ Maintenance

### Regular Updates
- **Dependencies**: Weekly security scans
- **Node.js Versions**: Update supported versions
- **Playwright**: Keep browser versions current

### Monitoring
- **Workflow Success Rate**: Track test reliability
- **Execution Time**: Monitor performance trends
- **Artifact Usage**: Manage storage efficiently

## 📝 Best Practices

1. **Test Isolation**: Each test runs in clean environment
2. **Resource Management**: Efficient use of GitHub Actions minutes
3. **Error Handling**: Comprehensive error reporting
4. **Documentation**: Clear workflow documentation
5. **Security**: Regular vulnerability scanning

## 🔍 Troubleshooting

### Common Issues
- **Browser Installation**: Ensure Playwright browsers are installed
- **Timeout Issues**: Adjust timeout values for long-running tests
- **Memory Issues**: Optimize test execution for resource constraints
- **Network Issues**: Handle flaky network conditions

### Debug Mode
```bash
# Enable debug logging
ACTIONS_STEP_DEBUG=true
ACTIONS_RUNNER_DEBUG=true
```
