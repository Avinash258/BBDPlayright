const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Generate HTML report from Cucumber JSON report
function generateHTMLReport() {
  try {
    const reportPath = path.join(__dirname, '..', 'reports', 'cucumber_report.json');
    const outputPath = path.join(__dirname, '..', 'reports', 'cucumber-report.html');
    
    if (!fs.existsSync(reportPath)) {
      console.log('No Cucumber JSON report found. Skipping HTML report generation.');
      return;
    }

    // Use cucumber-html-reporter to generate HTML report
    const command = `npx cucumber-html-reporter --jsonFile="${reportPath}" --output="${outputPath}" --reportSuiteAsScenarios=true`;
    
    execSync(command, { stdio: 'inherit' });
    console.log(`HTML report generated: ${outputPath}`);
  } catch (error) {
    console.error('Error generating HTML report:', error.message);
  }
}

// Generate Allure report
function generateAllureReport() {
  try {
    const allureResultsPath = path.join(__dirname, '..', 'reports', 'allure-results');
    const allureReportPath = path.join(__dirname, '..', 'reports', 'allure-report');
    
    if (!fs.existsSync(allureResultsPath)) {
      console.log('No Allure results found. Skipping Allure report generation.');
      return;
    }

    // Generate Allure report
    const command = `npx allure generate "${allureResultsPath}" --output "${allureReportPath}" --clean`;
    execSync(command, { stdio: 'inherit' });
    
    // Open Allure report
    const openCommand = `npx allure open "${allureReportPath}"`;
    execSync(openCommand, { stdio: 'inherit' });
    
    console.log(`Allure report generated: ${allureReportPath}`);
  } catch (error) {
    console.error('Error generating Allure report:', error.message);
  }
}

// Main function
function main() {
  const reportType = process.argv[2] || 'html';
  
  console.log('Generating test reports...');
  
  switch (reportType) {
    case 'html':
      generateHTMLReport();
      break;
    case 'allure':
      generateAllureReport();
      break;
    case 'all':
      generateHTMLReport();
      generateAllureReport();
      break;
    default:
      console.log('Usage: node generate-report.js [html|allure|all]');
  }
}

main();
