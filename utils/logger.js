const { writeFileSync, mkdirSync, existsSync } = require('fs');
const { join } = require('path');

// Log levels
const LogLevel = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3
};

// Logger class for DemoWebshop testing
class Logger {
  constructor() {
    this.logLevel = this.getLogLevelFromEnv();
    this.logFile = this.getLogFile();
    this.logs = [];
    this.ensureLogDirectory();
  }

  static getInstance() {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  getLogLevelFromEnv() {
    const level = process.env.LOG_LEVEL || 'INFO';
    switch (level.toUpperCase()) {
      case 'ERROR': return LogLevel.ERROR;
      case 'WARN': return LogLevel.WARN;
      case 'INFO': return LogLevel.INFO;
      case 'DEBUG': return LogLevel.DEBUG;
      default: return LogLevel.INFO;
    }
  }

  getLogFile() {
    const timestamp = new Date().toISOString().split('T')[0];
    return join('reports', 'logs', `test-${timestamp}.log`);
  }

  ensureLogDirectory() {
    const logDir = join('reports', 'logs');
    if (!existsSync(logDir)) {
      mkdirSync(logDir, { recursive: true });
    }
  }

  log(level, message, context = null) {
    if (level <= this.logLevel) {
      const timestamp = new Date().toISOString();
      const levelName = Object.keys(LogLevel)[level];
      const logEntry = {
        timestamp,
        level: levelName,
        message,
        context
      };

      this.logs.push(logEntry);
      console.log(`[${levelName}] ${message}`, context ? context : '');
    }
  }

  error(message, context = null) {
    this.log(LogLevel.ERROR, message, context);
  }

  warn(message, context = null) {
    this.log(LogLevel.WARN, message, context);
  }

  info(message, context = null) {
    this.log(LogLevel.INFO, message, context);
  }

  debug(message, context = null) {
    this.log(LogLevel.DEBUG, message, context);
  }

  setLogLevel(level) {
    this.logLevel = level;
  }

  getLogs() {
    return [...this.logs];
  }

  clearLogs() {
    this.logs = [];
  }

  getLogFilePath() {
    return this.logFile;
  }

  exportLogs(filePath = null) {
    const exportPath = filePath || join('reports', 'exported-logs.json');
    const logData = {
      timestamp: new Date().toISOString(),
      logLevel: Object.keys(LogLevel)[this.logLevel],
      logs: this.logs
    };

    try {
      writeFileSync(exportPath, JSON.stringify(logData, null, 2));
      this.info(`Logs exported to: ${exportPath}`);
    } catch (error) {
      this.error('Failed to export logs:', error);
    }
  }

  // Test-specific logging methods
  logTestStart(testName) {
    this.info(`Test started: ${testName}`);
  }

  logTestEnd(testName, status) {
    this.info(`Test ended: ${testName} - Status: ${status}`);
  }

  logStep(stepName) {
    this.debug(`Executing step: ${stepName}`);
  }

  logAssertion(assertion, result) {
    this.debug(`Assertion: ${assertion} - Result: ${result}`);
  }

  logPageAction(action, element) {
    this.debug(`Page action: ${action} on ${element}`);
  }

  logError(message, error) {
    this.log(LogLevel.ERROR, message, {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
  }
}

module.exports = { Logger, LogLevel };
